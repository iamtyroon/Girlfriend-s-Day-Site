"use client";
/* eslint-disable react/no-unknown-property */
import React, { useMemo, useEffect } from "react";
import { Canvas, useThree, CanvasProps, ThreeEvent } from "@react-three/fiber";
import { shaderMaterial, useTrailTexture } from "@react-three/drei";
import * as THREE from "three";

interface GooeyFilterProps {
  id?: string;
  strength?: number;
}

interface DotMaterialUniforms {
  resolution: THREE.Vector2;
  mouseTrail: THREE.Texture | null;
  gridSize: number;
  pixelColor: THREE.Color;
}

interface SceneProps {
  gridSize: number;
  trailSize: number;
  maxAge: number;
  interpolate: number;
  easingFunction: (x: number) => number;
  pixelColor: string;
}

interface PixelTrailProps {
  gridSize?: number;
  trailSize?: number;
  maxAge?: number;
  interpolate?: number;
  easingFunction?: (x: number) => number;
  canvasProps?: Partial<CanvasProps>;
  glProps?: WebGLContextAttributes & { powerPreference?: string };
  gooeyFilter?: { id: string; strength: number };
  color?: string;
  className?: string;
}

const GooeyFilter: React.FC<GooeyFilterProps> = ({
  id = "goo-filter",
  strength = 10,
}) => {
  return (
    <svg className="absolute overflow-hidden z-1">
      <defs>
        <filter id={id}>
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation={strength}
            result="blur"
          />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
};

const DotMaterial = shaderMaterial(
  {
    resolution: new THREE.Vector2(),
    mouseTrail: null,
    gridSize: 100,
    pixelColor: new THREE.Color("#ffffff"),
  },
  /* glsl vertex shader */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,
  /* glsl fragment shader */ `
  uniform vec2 resolution;
  uniform sampler2D mouseTrail;
  uniform float gridSize;
  uniform vec3 pixelColor;

  // Map to "contain" so the grid is uniform and centered, matching reactbits look.
  vec2 containUv(vec2 uv, vec2 res) {
    float s = min(res.x, res.y);
    vec2 pad = (res - vec2(s)) * 0.5;
    vec2 uvPx = uv * res;
    vec2 contained = (uvPx - pad) / s;
    return clamp(contained, 0.0, 1.0);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / resolution;
    uv = containUv(uv, resolution);

    // Snap to grid cell center to create discrete "pixels"
    vec2 gridUvCenter = (floor(uv * gridSize) + 0.5) / gridSize;

    // Sample trail alpha from the mouse trail texture
    float a = texture2D(mouseTrail, gridUvCenter).r;

    // Output plain color with alpha from trail (normal blending, transparent true)
    gl_FragColor = vec4(pixelColor, a);
    if (gl_FragColor.a <= 0.001) discard;
  }
`
);

function Scene({
  gridSize,
  trailSize,
  maxAge,
  interpolate,
  easingFunction,
  pixelColor,
}: SceneProps) {
  const size = useThree((s) => s.size);
  const viewport = useThree((s) => s.viewport);
  const gl = useThree((s) => s.gl);

  const dotMaterial = useMemo(() => {
    const mat = new DotMaterial();
    // ReactBits-style: normal blending with transparency; no additive bloom
    mat.transparent = true;
    mat.depthWrite = false;
    mat.blending = THREE.NormalBlending;
    return mat;
  }, []);

  const [trail, onMove] = useTrailTexture({
    size: 512,
    radius: trailSize,
    maxAge: maxAge,
    interpolate: interpolate || 0.1,
    ease: easingFunction || ((x: number) => x),
  }) as [THREE.Texture | null, (e: ThreeEvent<PointerEvent>) => void];

  if (trail) {
    trail.minFilter = THREE.NearestFilter;
    trail.magFilter = THREE.NearestFilter;
    trail.wrapS = THREE.ClampToEdgeWrapping;
    trail.wrapT = THREE.ClampToEdgeWrapping;
    console.log('Trail texture created:', trail);
  }
  
  // Update uniforms (resolution in physical pixels using devicePixelRatio)
  useEffect(() => {
    if (dotMaterial) {
      dotMaterial.uniforms.pixelColor.value = new THREE.Color(pixelColor);
      dotMaterial.uniforms.gridSize.value = gridSize;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      // Ensure we're using the correct canvas dimensions
      const canvas = gl.domElement;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        dotMaterial.uniforms.resolution.value.set(
          rect.width * dpr,
          rect.height * dpr
        );
      } else {
        dotMaterial.uniforms.resolution.value.set(
          size.width * dpr,
          size.height * dpr
        );
      }
      if (trail) {
        dotMaterial.uniforms.mouseTrail.value = trail;
      }
    }
  }, [dotMaterial, pixelColor, gridSize, size, trail, gl]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (dotMaterial) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const canvas = gl.domElement;
        if (canvas) {
          const rect = canvas.getBoundingClientRect();
          dotMaterial.uniforms.resolution.value.set(
            rect.width * dpr,
            rect.height * dpr
          );
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dotMaterial, gl]);

  // Update trail texture when size changes
  useEffect(() => {
    if (trail) {
      trail.needsUpdate = true;
    }
  }, [size, trail]);

  const scale = Math.max(viewport.width, viewport.height) / 2;

  // Ensure the mesh covers the entire viewport
  const meshScale = [viewport.width / 2, viewport.height / 2, 1];

  // Debug logging
  console.log('Scene rendering with:', {
    gridSize,
    scale,
    viewport,
    size,
    trail: !!trail
  });

  // Handle pointer move with precise client->canvas UV mapping to avoid offsets
  const handlePointerMove = (e: ThreeEvent<PointerEvent>) => {
    const canvas = gl.domElement;
    const rect = canvas.getBoundingClientRect();

    // Use clientX/clientY (scroll-safe). Avoid Math.random/Date.now during render to prevent hydration issues.
    const clientX = e.nativeEvent.clientX;
    const clientY = e.nativeEvent.clientY;

    // Canvas-local normalized [0..1] with proper inversion for WebGL coordinate system
    const u = (clientX - rect.left) / rect.width;
    // Invert Y coordinate for WebGL (top-left vs bottom-left origin)
    const v = 1.0 - (clientY - rect.top) / rect.height;

    const uvx = Math.min(1, Math.max(0, u));
    const uvy = Math.min(1, Math.max(0, v));

    // Build a synthetic event that mirrors R3F ThreeEvent but with corrected coords.
    const synthetic = {
      ...e,
      clientX,
      clientY,
      // some consumers read from nativeEvent
      nativeEvent: {
        ...e.nativeEvent,
        clientX,
        clientY,
        pageX: clientX + window.scrollX,
        pageY: clientY + window.scrollY,
        offsetX: uvx * rect.width,
        offsetY: (1.0 - uvy) * rect.height, // Convert back for DOM consistency
      },
      // Provide a pointer-like tuple if downstream uses it
      // Note: useTrailTexture expects [x, y] in normalized coordinates
      pointer: [uvx, uvy],
      stopPropagation: () => e.stopPropagation(),
    } as unknown as ThreeEvent<PointerEvent>;

    onMove(synthetic);
  };

  return (
    <mesh scale={meshScale} onPointerMove={handlePointerMove}>
      <planeGeometry args={[2, 2]} />
      <primitive object={dotMaterial} attach="material" />
    </mesh>
  );
}

export default function PixelTrail({
  // Tuned toward the ReactBits reference:
  // - slightly higher gridSize => smaller cells, crisper dots
  // - smaller trailSize => tighter dot footprint
  // - shorter maxAge => faster fade, less clumping
  gridSize = 64,
  trailSize = 0.06,
  maxAge = 140,
  interpolate = 5,
  easingFunction = (x: number) => x,
  canvasProps = {},
  glProps = {
    antialias: false,
    powerPreference: "high-performance",
    alpha: true,
    // premultipliedAlpha false pairs better with NormalBlending when we control alpha in shader
    premultipliedAlpha: false,
  },
  gooeyFilter,
  color = "#ffffff",
  className = "",
}: PixelTrailProps) {
  useEffect(() => {
    console.log('PixelTrail mounted with props:', {
      gridSize,
      trailSize,
      maxAge,
      interpolate,
      color,
      gooeyFilter
    });
  }, []);

  return (
    <>
      {gooeyFilter && (
        <GooeyFilter id={gooeyFilter.id} strength={gooeyFilter.strength} />
      )}
      <Canvas
        {...canvasProps}
        gl={glProps}
        className={`absolute inset-0 ${className}`}
        style={{
          ...(gooeyFilter ? { filter: `url(#${gooeyFilter.id})` } : {}),
          pointerEvents: "auto"
        }}
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        onPointerMove={(e) => {
          // Allow mesh to receive events; keep Canvas handler minimal
          e.stopPropagation();
        }}
        onCreated={({ gl, size, camera }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
          const ctx = gl.getContext();
          // Disable dithering for more predictable flat colors
          // @ts-ignore
          ctx?.disable?.(ctx.DITHER);
        }}
      >
        <Scene
          gridSize={gridSize}
          trailSize={trailSize}
          maxAge={maxAge}
          interpolate={interpolate}
          easingFunction={easingFunction}
          pixelColor={color}
        />
      </Canvas>
    </>
  );
}

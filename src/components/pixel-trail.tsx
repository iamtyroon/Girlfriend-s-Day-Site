"use client";

import React, { useEffect } from 'react';

const PixelTrail = () => {
  useEffect(() => {
    const pixels: HTMLElement[] = [];
    const numPixels = 50;
    let pixelIndex = 0;

    for (let i = 0; i < numPixels; i++) {
      const pixel = document.createElement('div');
      pixel.style.position = 'fixed';
      pixel.style.width = '5px';
      pixel.style.height = '5px';
      pixel.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 75%)`;
      pixel.style.borderRadius = '50%';
      pixel.style.pointerEvents = 'none';
      pixel.style.left = '-10px';
      pixel.style.top = '-10px';
      pixel.style.zIndex = '9999';
      pixel.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
      pixel.style.opacity = '0';
      document.body.appendChild(pixel);
      pixels.push(pixel);
    }

    const onMouseMove = (e: MouseEvent) => {
      const pixel = pixels[pixelIndex];
      pixel.style.left = `${e.clientX}px`;
      pixel.style.top = `${e.clientY}px`;
      pixel.style.opacity = '1';
      pixel.style.transform = 'scale(1)';

      setTimeout(() => {
        pixel.style.opacity = '0';
        pixel.style.transform = 'scale(0)';
      }, 500);

      pixelIndex = (pixelIndex + 1) % numPixels;
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      pixels.forEach(pixel => pixel.remove());
    };
  }, []);

  return null;
};

export default PixelTrail;

"use client";

import { useEffect } from 'react';

const PixelTrail = () => {
  useEffect(() => {
    const dots: HTMLElement[] = [];
    const cursor = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    for (let i = 0; i < 20; i++) {
      const dot = document.createElement('div');
      dot.style.position = 'absolute';
      dot.style.width = '8px';
      dot.style.height = '8px';
      dot.style.backgroundColor = '#ff00ff'; // Fuchsia color for a pixelated feel
      dot.style.borderRadius = '0'; // Square pixels
      dot.style.left = '-20px'; // Start off-screen
      dot.style.pointerEvents = 'none';
      dot.style.zIndex = '9999';
      document.body.appendChild(dot);
      dots.push(dot);
    }

    const draw = () => {
      let x = cursor.x;
      let y = cursor.y;

      dots.forEach((dot, index) => {
        const nextDot = dots[index + 1] || dots[0];

        dot.style.left = x + 'px';
        dot.style.top = y + 'px';

        const nextX = parseFloat(nextDot.style.left);
        const nextY = parseFloat(nextDot.style.top);

        x += (nextX - x) * 0.5;
        y += (nextY - y) * 0.5;
      });
    };

    const animationFrame = () => {
      draw();
      requestAnimationFrame(animationFrame);
    };

    const frameId = requestAnimationFrame(animationFrame);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
      dots.forEach(dot => document.body.removeChild(dot));
    };
  }, []);

  return null;
};

export default PixelTrail;

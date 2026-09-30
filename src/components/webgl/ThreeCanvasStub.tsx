'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Loader2 } from 'lucide-react';

interface ThreeCanvasStubProps {
  color?: string; // Hex color code e.g. '#22d3ee'
  particleCount?: number;
}

export const ThreeCanvasStub: React.FC<ThreeCanvasStubProps> = ({
  color = '#22d3ee',
  particleCount = 800
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Initialize Scene, Camera, and Renderer
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#000000', 0.015);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 25;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    setIsLoading(false);

    // 2. Generate procedural rotating particle cloud
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Golden spiral distribution / Spherical distribution
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 8 + Math.random() * 4; // sphere radius range

      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Custom circular points shader representation using Canvas point drawing
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 16, 16);
    }
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      color: new THREE.Color(color),
      size: 0.35,
      map: texture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 3. Grid line overlays
    const gridHelper = new THREE.GridHelper(30, 30, color, '#1e293b');
    gridHelper.position.y = -8;
    (gridHelper.material as any).opacity = 0.15;
    (gridHelper.material as any).transparent = true;
    scene.add(gridHelper);

    // 4. Animation loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Slow orbital rotations
      particles.rotation.y = elapsedTime * 0.05;
      particles.rotation.x = elapsedTime * 0.02;

      // Small oscillation ripples
      const posArr = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < posArr.length; i += 3) {
        const x = posArr[i];
        const y = posArr[i + 1];
        // Apply sinusoidal noise based on coordinate distances
        posArr[i + 2] += Math.sin(elapsedTime + x * 0.1) * 0.005;
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    // 5. Resize handler
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 6. Clean up resources
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [color, particleCount]);

  return (
    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center bg-black/90 rounded-lg overflow-hidden border border-slate-900 select-none">
      {isLoading && (
        <div className="absolute flex flex-col items-center gap-2 text-slate-500 font-mono text-xs z-10">
          <Loader2 className="w-6 h-6 animate-spin text-cyan-400" />
          <span>INITIALIZING 3D CANVAS MATRIX...</span>
        </div>
      )}
      <div ref={mountRef} className="w-full h-full absolute inset-0" />
      {/* Viewport scanlines overlay */}
      <div className="absolute inset-0 pointer-events-none border border-slate-800/20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px]" />
    </div>
  );
};

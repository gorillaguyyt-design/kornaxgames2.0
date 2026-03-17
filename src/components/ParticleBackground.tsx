import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseX: number;
  baseY: number;
  density: number;
}

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 1000, isClicked: false });
  const { accentColor } = useTheme();
  const accentColorRef = useRef(accentColor);

  useEffect(() => {
    accentColorRef.current = accentColor;
  }, [accentColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Set radius to be a large portion of the screen
      mouseRef.current.radius = Math.max(canvas.width, canvas.height) * 0.8;
      init();
    };

    const init = () => {
      particles = [];
      const numberOfParticles = (canvas.width * canvas.height) / 10000;
      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          baseX: x,
          baseY: y,
          density: (Math.random() * 30) + 1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        // Mouse interaction
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (mouseRef.current.isClicked && distance < mouseRef.current.radius && distance > 0) {
          // Use a smoother falloff for the large radius
          const force = Math.pow((mouseRef.current.radius - distance) / mouseRef.current.radius, 1.5);
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const movementX = forceDirectionX * force * p.density * 1.2;
          const movementY = forceDirectionY * force * p.density * 1.2;
          
          p.x -= movementX;
          p.y -= movementY;
        }

        // Return to base movement (Elasticity)
        const dxBase = p.baseX - p.x;
        const dyBase = p.baseY - p.y;
        const distBase = Math.sqrt(dxBase * dxBase + dyBase * dyBase);
        
        if (distBase > 0.1) {
          p.x += dxBase * 0.05;
          p.y += dyBase * 0.05;
        }

        // Subtle floating jitter
        p.x += p.vx;
        p.y += p.vy;

        // Boundary check for base positions
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw
        ctx.fillStyle = accentColorRef.current + '99'; // Add some transparency (99 is ~60% in hex)
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseDown = () => {
      mouseRef.current.isClicked = true;
    };

    const handleMouseUp = () => {
      mouseRef.current.isClicked = false;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
    />
  );
};

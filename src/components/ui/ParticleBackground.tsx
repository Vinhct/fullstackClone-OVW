"use client";

import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
}

interface ParticleBackgroundProps {
  className?: string;
  particleColor?: string;
  particleCount?: number;
  particleSpeed?: number;
  connectParticles?: boolean;
  responsive?: boolean;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  className = '',
  particleColor = 'var(--primary-blue)',
  particleCount = 50,
  particleSpeed = 0.5,
  connectParticles = true,
  responsive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, radius: 150 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * particleSpeed,
          speedY: (Math.random() - 0.5) * particleSpeed,
          color: particleColor,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    // Handle mouse leave
    const handleMouseLeave = () => {
      mouseRef.current.x = undefined as any;
      mouseRef.current.y = undefined as any;
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updateParticles();
      if (connectParticles) {
        connectNearbyParticles();
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    // Update particles position
    const updateParticles = () => {
      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        
        // Check for mouse interaction
        if (mouseRef.current.x !== undefined) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouseRef.current.radius) {
            const angle = Math.atan2(dy, dx);
            const force = (mouseRef.current.radius - distance) / mouseRef.current.radius;
            
            p.x -= Math.cos(angle) * force * 2;
            p.y -= Math.sin(angle) * force * 2;
          }
        }
        
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Boundary check
        if (p.x < 0 || p.x > canvas.width) {
          p.speedX = -p.speedX;
        }
        if (p.y < 0 || p.y > canvas.height) {
          p.speedY = -p.speedY;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(p.color)}, ${p.opacity})`;
        ctx.fill();
      }
    };

    // Connect nearby particles with lines
    const connectNearbyParticles = () => {
      const maxDistance = 150;
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${hexToRgb(particleColor)}, ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    // Helper function to convert hex to rgb
    const hexToRgb = (hex: string): string => {
      // Handle CSS variables
      if (hex.startsWith('var(')) {
        // Get computed style
        const value = getComputedStyle(document.documentElement).getPropertyValue(hex.slice(4, -1).trim());
        hex = value.trim();
      }
      
      // Remove # if present
      hex = hex.replace('#', '');
      
      // Handle shorthand hex
      if (hex.length === 3) {
        hex = hex.split('').map(c => c + c).join('');
      }
      
      // Parse hex
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);
      
      return `${r}, ${g}, ${b}`;
    };

    // Initialize
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    // Start animation
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', setCanvasSize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [particleColor, particleCount, particleSpeed, connectParticles]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default ParticleBackground;

"use client";

import React, { useEffect, useState, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  dx: number;
  dy: number;
  age: number;
  opacity: number;
}

interface MouseTrailEffectProps {
  color?: string;
  particleCount?: number;
  particleSize?: number;
  particleLifetime?: number;
  particleSpeed?: number;
  particleOpacity?: number;
  className?: string;
}

const MouseTrailEffect: React.FC<MouseTrailEffectProps> = ({
  color = '#218ffe', 
  particleCount = 20,
  particleSize = 6,
  particleLifetime = 40,
  particleSpeed = 0.3,
  particleOpacity = 0.6,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState<{ x: number, y: number } | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const pointsRef = useRef<Point[]>([]);
  const requestRef = useRef<number>();
  const previousTimeRef = useRef<number>();

  // Initialize canvas dimensions
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const animate = (time: number) => {
      if (previousTimeRef.current === undefined) {
        previousTimeRef.current = time;
      }
      const deltaTime = time - previousTimeRef.current;
      previousTimeRef.current = time;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new point if mouse has moved
      if (mousePosition) {
        // Add random offset to create a more natural effect
        const randomOffsetX = (Math.random() - 0.5) * 10;
        const randomOffsetY = (Math.random() - 0.5) * 10;
        
        // Random direction
        const angle = Math.random() * Math.PI * 2;
        const dx = Math.cos(angle) * particleSpeed;
        const dy = Math.sin(angle) * particleSpeed;
        
        pointsRef.current.push({
          x: mousePosition.x + randomOffsetX,
          y: mousePosition.y + randomOffsetY,
          dx,
          dy,
          age: 0,
          opacity: particleOpacity,
        });
        
        // Limit number of points
        if (pointsRef.current.length > particleCount) {
          pointsRef.current = pointsRef.current.slice(-particleCount);
        }
      }

      // Update and draw points
      pointsRef.current.forEach((point, index) => {
        // Update position
        point.x += point.dx;
        point.y += point.dy;
        
        // Update age
        point.age += 1;
        
        // Update opacity based on age
        point.opacity = Math.max(0, particleOpacity * (1 - point.age / particleLifetime));
        
        // Draw point
        const size = particleSize * (1 - point.age / particleLifetime);
        
        // Draw glow effect
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, size * 2
        );
        gradient.addColorStop(0, color);
        gradient.addColorStop(1, color.replace(')', ', 0)').replace('rgb', 'rgba'));
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.globalAlpha = point.opacity;
        ctx.arc(point.x, point.y, size * 2, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw core
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.globalAlpha = point.opacity * 1.5;
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.globalAlpha = 1;
      });

      // Remove old points
      pointsRef.current = pointsRef.current.filter(point => point.age < particleLifetime);

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [dimensions, mousePosition, color, particleCount, particleSize, particleLifetime, particleSpeed, particleOpacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-50 ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default MouseTrailEffect;

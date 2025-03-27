"use client";

import React, { useState, useRef, useEffect } from 'react';

interface MagneticEffectProps {
  children: React.ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
  disabled?: boolean;
}

const MagneticEffect: React.FC<MagneticEffectProps> = ({
  children,
  strength = 0.5,
  radius = 100,
  className = '',
  disabled = false,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const elementRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [elementSize, setElementSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (elementRef.current) {
      const { width, height } = elementRef.current.getBoundingClientRect();
      setElementSize({ width, height });
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    if (distance < radius) {
      // Calculate magnetic pull based on distance from center
      const pull = (radius - distance) / radius;
      
      // Apply strength factor
      const moveX = distanceX * pull * strength;
      const moveY = distanceY * pull * strength;
      
      setPosition({ x: moveX, y: moveY });
      setIsHovered(true);
    } else {
      handleMouseLeave();
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div 
      className={`relative ${className}`}
      style={{ 
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={elementRef}
        style={{
          transform: isHovered 
            ? `translate(${position.x}px, ${position.y}px)` 
            : 'translate(0, 0)',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default MagneticEffect;

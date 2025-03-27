"use client";

import React, { useState, useRef, MouseEvent } from 'react';
import Image from 'next/image';

interface TiltCardProps {
  children?: React.ReactNode;
  image?: string;
  alt?: string;
  className?: string;
  tiltAmount?: number;
  glareAmount?: number;
  perspective?: number;
  scale?: number;
  transitionSpeed?: number;
  imageClassName?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({
  children,
  image,
  alt = '',
  className = '',
  tiltAmount = 20,
  glareAmount = 0.5,
  perspective = 1000,
  scale = 1.05,
  transitionSpeed = 400,
  imageClassName = '',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate rotation based on mouse position
    const rotateX = (-mouseY / (rect.height / 2)) * tiltAmount;
    const rotateY = (mouseX / (rect.width / 2)) * tiltAmount;
    
    // Update transform
    setTransform(`
      perspective(${perspective}px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(${scale}, ${scale}, ${scale})
    `);
    
    // Update glare position
    const glareX = (mouseX / rect.width) * 100 + 50;
    const glareY = (mouseY / rect.height) * 100 + 50;
    setGlarePosition({ x: glareX, y: glareY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform('');
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-lg ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transform,
        transition: isHovered ? 'none' : `transform ${transitionSpeed}ms ease-out`,
      }}
    >
      {/* Image */}
      {image && (
        <div className="relative w-full h-full">
          <Image
            src={image}
            alt={alt}
            fill
            className={`object-cover transition-transform duration-300 ${imageClassName}`}
          />
        </div>
      )}
      
      {/* Glare effect */}
      {glareAmount > 0 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,${glareAmount}), transparent 70%)`,
            opacity: isHovered ? 1 : 0,
            transition: isHovered ? 'none' : 'opacity 300ms ease-out',
          }}
        />
      )}
      
      {/* Content */}
      {children}
    </div>
  );
};

export default TiltCard;

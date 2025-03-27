"use client";

import React, { useState, useEffect } from 'react';

interface RippleProps {
  x: number;
  y: number;
  size: number;
}

interface RippleButtonProps {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  color?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const RippleButton: React.FC<RippleButtonProps> = ({
  children,
  onClick,
  className = '',
  color = 'rgba(255, 255, 255, 0.7)',
  disabled = false,
  type = 'button',
}) => {
  const [ripples, setRipples] = useState<RippleProps[]>([]);

  useEffect(() => {
    // Clean up ripples after animation completes
    const timeoutIds: NodeJS.Timeout[] = [];
    
    ripples.forEach((_, i) => {
      const timeoutId = setTimeout(() => {
        setRipples((prevRipples) => prevRipples.filter((_, index) => index !== 0));
      }, 800); // Match this with the CSS animation duration
      
      timeoutIds.push(timeoutId);
    });
    
    return () => {
      timeoutIds.forEach(clearTimeout);
    };
  }, [ripples]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    
    // Calculate ripple position and size
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2;
    
    // Add new ripple
    setRipples([...ripples, { x, y, size }]);
    
    // Call the provided onClick handler
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <button
      type={type}
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {/* Ripple effects */}
      {ripples.map((ripple, index) => (
        <span
          key={index}
          style={{
            position: 'absolute',
            left: ripple.x - ripple.size / 2,
            top: ripple.y - ripple.size / 2,
            width: ripple.size,
            height: ripple.size,
            borderRadius: '50%',
            backgroundColor: color,
            opacity: 0.5,
            transform: 'scale(0)',
            animation: 'ripple 800ms ease-out forwards',
            pointerEvents: 'none',
          }}
        />
      ))}
      
      {/* Button content */}
      {children}
      
      {/* Inline styles for the ripple animation */}
      <style jsx>{`
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 0.5;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>
    </button>
  );
};

export default RippleButton;

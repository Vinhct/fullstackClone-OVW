"use client";

import React, { useState } from 'react';

interface Button3DProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  color?: 'blue' | 'orange' | 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
}

const Button3D: React.FC<Button3DProps> = ({
  children,
  onClick,
  className = '',
  color = 'blue',
  size = 'md',
  disabled = false,
  type = 'button',
  fullWidth = false,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  // Color variants
  const colorVariants = {
    blue: {
      top: 'bg-[var(--primary-blue)]',
      side: 'bg-[var(--primary-blue)]/70',
      shadow: 'shadow-[var(--primary-blue)]/30',
      text: 'text-white',
    },
    orange: {
      top: 'bg-[var(--accent-orange)]',
      side: 'bg-[var(--accent-orange)]/70',
      shadow: 'shadow-[var(--accent-orange)]/30',
      text: 'text-white',
    },
    dark: {
      top: 'bg-[var(--dark-blue)]',
      side: 'bg-[var(--dark-blue)]/70',
      shadow: 'shadow-black/20',
      text: 'text-white',
    },
    light: {
      top: 'bg-white',
      side: 'bg-white/70',
      shadow: 'shadow-black/10',
      text: 'text-[var(--dark-blue)]',
    },
  };

  // Size variants
  const sizeVariants = {
    sm: {
      padding: 'px-4 py-2',
      fontSize: 'text-xs',
      height: 'h-8',
      depth: 'h-1',
    },
    md: {
      padding: 'px-6 py-3',
      fontSize: 'text-sm',
      height: 'h-10',
      depth: 'h-2',
    },
    lg: {
      padding: 'px-8 py-4',
      fontSize: 'text-base',
      height: 'h-12',
      depth: 'h-3',
    },
  };

  const handleMouseDown = () => {
    if (!disabled) {
      setIsPressed(true);
    }
  };

  const handleMouseUp = () => {
    if (!disabled) {
      setIsPressed(false);
    }
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <div 
      className={`
        relative inline-block
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setIsPressed(false)}
      onClick={handleClick}
    >
      {/* Button top */}
      <div 
        className={`
          ${colorVariants[color].top}
          ${colorVariants[color].text}
          ${sizeVariants[size].padding}
          ${sizeVariants[size].fontSize}
          rounded-md font-bold uppercase tracking-wider
          transform transition-transform duration-100 ease-in-out
          ${isPressed ? 'translate-y-2' : 'translate-y-0'}
          relative z-10
          flex items-center justify-center
          ${className}
        `}
      >
        {children}
      </div>
      
      {/* Button depth/side */}
      <div 
        className={`
          ${colorVariants[color].side}
          absolute bottom-0 left-0 right-0
          ${sizeVariants[size].depth}
          rounded-b-md
          transform transition-all duration-100 ease-in-out
          ${isPressed ? 'h-0' : ''}
        `}
      ></div>
      
      {/* Button shadow */}
      <div 
        className={`
          absolute -inset-1 rounded-md ${colorVariants[color].shadow}
          opacity-0 group-hover:opacity-100 transition-opacity
          ${isPressed ? 'opacity-0' : ''}
          -z-10 blur-md
        `}
      ></div>
    </div>
  );
};

export default Button3D;

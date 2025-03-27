"use client";

import React, { useState } from 'react';

interface NeonButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  color?: 'blue' | 'orange' | 'purple' | 'green';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'solid' | 'outline' | 'ghost';
  pulse?: boolean;
}

const NeonButton: React.FC<NeonButtonProps> = ({
  children,
  onClick,
  className = '',
  color = 'blue',
  size = 'md',
  disabled = false,
  type = 'button',
  variant = 'solid',
  pulse = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Color variants
  const colorVariants = {
    blue: {
      bg: 'bg-[var(--primary-blue)]',
      border: 'border-[var(--primary-blue)]',
      text: 'text-white',
      glow: 'shadow-[0_0_10px_rgba(33,143,254,0.7),_0_0_20px_rgba(33,143,254,0.4),_0_0_30px_rgba(33,143,254,0.1)]',
      pulse: 'animate-pulse-blue',
    },
    orange: {
      bg: 'bg-[var(--accent-orange)]',
      border: 'border-[var(--accent-orange)]',
      text: 'text-white',
      glow: 'shadow-[0_0_10px_rgba(255,158,44,0.7),_0_0_20px_rgba(255,158,44,0.4),_0_0_30px_rgba(255,158,44,0.1)]',
      pulse: 'animate-pulse-orange',
    },
    purple: {
      bg: 'bg-purple-600',
      border: 'border-purple-600',
      text: 'text-white',
      glow: 'shadow-[0_0_10px_rgba(147,51,234,0.7),_0_0_20px_rgba(147,51,234,0.4),_0_0_30px_rgba(147,51,234,0.1)]',
      pulse: 'animate-pulse-purple',
    },
    green: {
      bg: 'bg-green-500',
      border: 'border-green-500',
      text: 'text-white',
      glow: 'shadow-[0_0_10px_rgba(34,197,94,0.7),_0_0_20px_rgba(34,197,94,0.4),_0_0_30px_rgba(34,197,94,0.1)]',
      pulse: 'animate-pulse-green',
    },
  };

  // Size variants
  const sizeVariants = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-7 py-3.5 text-base',
  };

  // Variant styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'solid':
        return `${colorVariants[color].bg} ${colorVariants[color].text}`;
      case 'outline':
        return `bg-transparent ${colorVariants[color].border} ${colorVariants[color].text}`;
      case 'ghost':
        return `bg-transparent border-transparent ${colorVariants[color].text}`;
      default:
        return `${colorVariants[color].bg} ${colorVariants[color].text}`;
    }
  };

  return (
    <button
      type={type as 'button' | 'submit' | 'reset'}
      className={`
        relative overflow-hidden
        rounded-md border-2 font-bold uppercase tracking-wider
        transition-all duration-300 ease-in-out
        ${sizeVariants[size]}
        ${getVariantStyles()}
        ${isHovered || pulse ? colorVariants[color].glow : ''}
        ${pulse ? colorVariants[color].pulse : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
    >
      {/* Glow effect */}
      <span className={`
        absolute inset-0 
        ${isHovered ? 'opacity-20' : 'opacity-0'} 
        transition-opacity duration-300
        bg-white
      `}></span>
      
      {/* Button content */}
      <span className="relative z-10">{children}</span>
      
      {/* Animation styles */}
      <style jsx>{`
        @keyframes pulse-blue {
          0%, 100% { box-shadow: 0 0 10px rgba(33,143,254,0.7), 0 0 20px rgba(33,143,254,0.4), 0 0 30px rgba(33,143,254,0.1); }
          50% { box-shadow: 0 0 15px rgba(33,143,254,0.9), 0 0 25px rgba(33,143,254,0.6), 0 0 35px rgba(33,143,254,0.3); }
        }
        @keyframes pulse-orange {
          0%, 100% { box-shadow: 0 0 10px rgba(255,158,44,0.7), 0 0 20px rgba(255,158,44,0.4), 0 0 30px rgba(255,158,44,0.1); }
          50% { box-shadow: 0 0 15px rgba(255,158,44,0.9), 0 0 25px rgba(255,158,44,0.6), 0 0 35px rgba(255,158,44,0.3); }
        }
        @keyframes pulse-purple {
          0%, 100% { box-shadow: 0 0 10px rgba(147,51,234,0.7), 0 0 20px rgba(147,51,234,0.4), 0 0 30px rgba(147,51,234,0.1); }
          50% { box-shadow: 0 0 15px rgba(147,51,234,0.9), 0 0 25px rgba(147,51,234,0.6), 0 0 35px rgba(147,51,234,0.3); }
        }
        @keyframes pulse-green {
          0%, 100% { box-shadow: 0 0 10px rgba(34,197,94,0.7), 0 0 20px rgba(34,197,94,0.4), 0 0 30px rgba(34,197,94,0.1); }
          50% { box-shadow: 0 0 15px rgba(34,197,94,0.9), 0 0 25px rgba(34,197,94,0.6), 0 0 35px rgba(34,197,94,0.3); }
        }
        .animate-pulse-blue { animation: pulse-blue 2s infinite; }
        .animate-pulse-orange { animation: pulse-orange 2s infinite; }
        .animate-pulse-purple { animation: pulse-purple 2s infinite; }
        .animate-pulse-green { animation: pulse-green 2s infinite; }
      `}</style>
    </button>
  );
};

export default NeonButton;

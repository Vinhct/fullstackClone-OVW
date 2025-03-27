"use client";

import React from 'react';

interface GradientHeadingProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  gradient?: 'blue' | 'orange' | 'multi' | 'custom';
  customGradient?: string;
  animate?: boolean;
}

const GradientHeading: React.FC<GradientHeadingProps> = ({
  text,
  as = 'h2',
  className = '',
  gradient = 'blue',
  customGradient,
  animate = false,
}) => {
  const getGradientClass = () => {
    if (gradient === 'custom' && customGradient) {
      return customGradient;
    }

    switch (gradient) {
      case 'blue':
        return 'bg-gradient-to-r from-[var(--primary-blue)] to-[var(--secondary-blue)]';
      case 'orange':
        return 'bg-gradient-to-r from-[var(--accent-orange)] to-[var(--primary-blue)]';
      case 'multi':
        return 'bg-gradient-to-r from-[var(--primary-blue)] via-[var(--secondary-blue)] to-[var(--accent-orange)]';
      default:
        return 'bg-gradient-to-r from-[var(--primary-blue)] to-[var(--secondary-blue)]';
    }
  };

  const animationClass = animate 
    ? 'bg-size-200 animate-gradient-x' 
    : '';

  const gradientClass = `text-transparent bg-clip-text ${getGradientClass()} ${animationClass}`;
  
  const Component = as;

  return (
    <Component className={`${gradientClass} ${className}`}>
      {text}
      {animate && (
        <style jsx>{`
          @keyframes gradient-x {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
          .animate-gradient-x {
            animation: gradient-x 8s ease infinite;
          }
          .bg-size-200 {
            background-size: 200% 200%;
          }
        `}</style>
      )}
    </Component>
  );
};

export default GradientHeading;

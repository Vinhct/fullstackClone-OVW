import React, { useState } from 'react';
import Image from 'next/image';

interface HoverImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  hoverEffect?: 'zoom' | 'glow' | 'shine' | 'tilt' | 'none';
  priority?: boolean;
}

const HoverImage: React.FC<HoverImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  hoverEffect = 'none',
  priority = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getHoverEffectStyles = () => {
    switch (hoverEffect) {
      case 'zoom':
        return 'group-hover:scale-110 transition-transform duration-500';
      case 'glow':
        return 'transition-all duration-300';
      case 'shine':
        return 'transition-all duration-300';
      case 'tilt':
        return 'transition-transform duration-300';
      default:
        return '';
    }
  };

  const getContainerStyles = () => {
    let styles = 'relative overflow-hidden';
    
    if (hoverEffect === 'glow') {
      styles += ' after:absolute after:inset-0 after:opacity-0 group-hover:after:opacity-100 after:transition-opacity after:duration-300 after:bg-gradient-to-tr after:from-[var(--primary-blue)]/0 after:to-[var(--primary-blue)]/30 after:pointer-events-none';
    }
    
    if (hoverEffect === 'shine') {
      styles += ' before:absolute before:inset-0 before:w-[200%] before:h-full before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent before:translate-x-[-100%] group-hover:before:translate-x-[100%] before:transition-transform before:duration-1000 before:ease-in-out before:pointer-events-none before:z-10';
    }
    
    return styles;
  };

  return (
    <div 
      className={`group ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={getContainerStyles()}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`w-full h-full object-cover ${getHoverEffectStyles()}`}
          style={
            hoverEffect === 'tilt' && isHovered
              ? {
                  transform: 'perspective(1000px) rotateX(5deg) rotateY(5deg)',
                  transition: 'transform 0.3s ease',
                }
              : {}
          }
          priority={priority}
        />
      </div>
    </div>
  );
};

export default HoverImage;

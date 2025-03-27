"use client";

import React, { useState, useEffect } from 'react';

interface CustomCursorProps {
  variant?: 'default' | 'dot' | 'ring' | 'overwatch';
  color?: string;
  size?: number;
  trailEffect?: boolean;
  pulseEffect?: boolean;
  blendMode?: 'normal' | 'multiply' | 'screen' | 'overlay' | 'darken' | 'lighten';
}

const CustomCursor: React.FC<CustomCursorProps> = ({
  variant = 'overwatch',
  color = '#218ffe', 
  size = 24,
  trailEffect = false,
  pulseEffect = true,
  blendMode = 'normal',
}) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<{ x: number, y: number, opacity: number }[]>([]);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      if (trailEffect) {
        setTrail(prev => [
          { x: e.clientX, y: e.clientY, opacity: 1 },
          ...prev.slice(0, 5).map(point => ({ ...point, opacity: point.opacity * 0.8 }))
        ]);
      }
    };

    const updateCursorType = () => {
      const target = document.elementFromPoint(position.x, position.y);
      if (target) {
        const computedStyle = window.getComputedStyle(target);
        setIsPointer(computedStyle.cursor === 'pointer');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousemove', updateCursorType);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousemove', updateCursorType);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      // Restore default cursor
      document.body.style.cursor = 'auto';
    };
  }, [position.x, position.y, trailEffect]);

  const getCursorStyle = () => {
    const baseSize = isPointer ? size * 1.5 : size;
    const clickSize = isClicking ? baseSize * 0.8 : baseSize;
    
    const baseStyle = {
      position: 'fixed',
      pointerEvents: 'none',
      zIndex: 9999,
      mixBlendMode: blendMode,
      transition: 'width 0.2s, height 0.2s, transform 0.1s',
      transform: `translate(${position.x}px, ${position.y}px)`,
    } as React.CSSProperties;

    switch (variant) {
      case 'dot':
        return {
          ...baseStyle,
          width: `${clickSize}px`,
          height: `${clickSize}px`,
          backgroundColor: color,
          borderRadius: '50%',
          transform: `translate(${position.x - clickSize/2}px, ${position.y - clickSize/2}px)`,
        };
      case 'ring':
        return {
          ...baseStyle,
          width: `${clickSize}px`,
          height: `${clickSize}px`,
          border: `2px solid ${color}`,
          borderRadius: '50%',
          transform: `translate(${position.x - clickSize/2}px, ${position.y - clickSize/2}px)`,
        };
      case 'overwatch':
        return {
          ...baseStyle,
          width: `${clickSize}px`,
          height: `${clickSize}px`,
          backgroundColor: 'transparent',
          border: `2px solid ${color}`,
          borderRadius: '50%',
          boxShadow: `0 0 10px ${color}`,
          transform: `translate(${position.x - clickSize/2}px, ${position.y - clickSize/2}px)`,
        };
      default:
        return {
          ...baseStyle,
          width: `${clickSize}px`,
          height: `${clickSize}px`,
          backgroundColor: color,
          opacity: 0.5,
          borderRadius: '50%',
          transform: `translate(${position.x - clickSize/2}px, ${position.y - clickSize/2}px)`,
        };
    }
  };

  const getInnerDotStyle = () => {
    const dotSize = size / 4;
    return {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: `${dotSize}px`,
      height: `${dotSize}px`,
      backgroundColor: color,
      borderRadius: '50%',
      transform: 'translate(-50%, -50%)',
    } as React.CSSProperties;
  };

  return (
    <>
      {/* Trail effect */}
      {trailEffect && trail.map((point, index) => (
        <div
          key={index}
          style={{
            position: 'fixed',
            width: `${size * (1 - index * 0.15)}px`,
            height: `${size * (1 - index * 0.15)}px`,
            backgroundColor: color,
            borderRadius: '50%',
            opacity: point.opacity * 0.3,
            transform: `translate(${point.x - size/2}px, ${point.y - size/2}px)`,
            pointerEvents: 'none',
            zIndex: 9998,
            mixBlendMode: blendMode,
          }}
        />
      ))}
      
      {/* Main cursor */}
      <div style={getCursorStyle()}>
        {(variant === 'ring' || variant === 'overwatch') && (
          <div style={getInnerDotStyle()} />
        )}
        
        {/* Pulse effect */}
        {pulseEffect && (variant === 'ring' || variant === 'overwatch') && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100%',
              height: '100%',
              border: `2px solid ${color}`,
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              animation: 'pulse 1.5s infinite',
            }}
          />
        )}
      </div>
      
      {/* Styles for animations */}
      <style jsx global>{`
        @keyframes pulse {
          0% {
            width: 100%;
            height: 100%;
            opacity: 1;
          }
          100% {
            width: 200%;
            height: 200%;
            opacity: 0;
          }
        }
        
        /* Hide cursor on elements */
        * {
          cursor: none !important;
        }
        
        /* But show cursor for inputs and textareas */
        input, textarea, select, [contenteditable="true"] {
          cursor: text !important;
        }
        
        /* And show pointer for buttons and links */
        button, a, [role="button"], .clickable {
          cursor: pointer !important;
        }
      `}</style>
    </>
  );
};

export default CustomCursor;

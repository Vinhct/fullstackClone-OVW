"use client";

import React, { useState, useEffect } from 'react';

interface ParallaxEffectProps {
  intensity?: number; // 0-100
}

const ParallaxEffect: React.FC<ParallaxEffectProps> = ({
  intensity = 20,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Tính toán vị trí chuột so với trung tâm màn hình
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Tính toán vị trí tương đối (-1 đến 1)
      const relativeX = (e.clientX - centerX) / centerX;
      const relativeY = (e.clientY - centerY) / centerY;
      
      setMousePosition({ x: relativeX, y: relativeY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Tính toán giá trị transform dựa trên vị trí chuột và cường độ
  const getTransform = (depth: number) => {
    const factor = (intensity / 100) * depth;
    const translateX = -mousePosition.x * factor;
    const translateY = -mousePosition.y * factor;
    
    return `translate(${translateX}px, ${translateY}px)`;
  };
  
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <style jsx global>{`
        /* Hiệu ứng parallax cho các phần tử có class parallax */
        .parallax-item-1 {
          transition: transform 0.1s ease-out;
          transform: ${getTransform(10)};
        }
        
        .parallax-item-2 {
          transition: transform 0.15s ease-out;
          transform: ${getTransform(20)};
        }
        
        .parallax-item-3 {
          transition: transform 0.2s ease-out;
          transform: ${getTransform(30)};
        }
        
        /* Hiệu ứng parallax cho các phần tử có data attribute */
        [data-parallax="slow"] {
          transition: transform 0.1s ease-out;
          transform: ${getTransform(10)};
        }
        
        [data-parallax="medium"] {
          transition: transform 0.15s ease-out;
          transform: ${getTransform(20)};
        }
        
        [data-parallax="fast"] {
          transition: transform 0.2s ease-out;
          transform: ${getTransform(30)};
        }
        
        /* Đảm bảo các phần tử tương tác không bị ảnh hưởng */
        nav, header, button, a, [role="button"], .interactive, .clickable, 
        input, select, textarea, form, .no-parallax {
          transform: none !important;
          transition: none !important;
        }
      `}</style>
    </div>
  );
};

export default ParallaxEffect;

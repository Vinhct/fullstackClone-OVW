"use client";

import React, { useState, useEffect } from 'react';

interface GlitchEffectProps {
  intensity?: number; // 0-100
  frequency?: number; // milliseconds
  glitchChance?: number; // 0-1
  text?: string; // Thêm prop text
  className?: string; // Thêm prop className
  children?: React.ReactNode; // Thêm prop children
}

const GlitchEffect: React.FC<GlitchEffectProps> = ({
  intensity = 8, // Giảm cường độ
  frequency = 6000, // Tăng thời gian giữa các lần glitch
  glitchChance = 0.08, // Giảm xác suất xảy ra glitch
  text,
  className,
  children
}) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [glitchOffset, setGlitchOffset] = useState({ x: 0, y: 0, r: 0, g: 0, b: 0 });
  const [glitchType, setGlitchType] = useState(0); // Loại hiệu ứng glitch
  
  // Tạo hiệu ứng glitch ngẫu nhiên
  useEffect(() => {
    // Hàm tạo glitch
    const createGlitch = () => {
      // Xác suất xảy ra glitch
      if (Math.random() > glitchChance) return;
      
      setIsGlitching(true);
      
      // Chọn loại glitch ngẫu nhiên
      const type = Math.floor(Math.random() * 4);
      setGlitchType(type);
      
      // Tạo offset ngẫu nhiên cho hiệu ứng glitch
      const offset = {
        x: (Math.random() - 0.5) * intensity * 0.08,
        y: (Math.random() - 0.5) * intensity * 0.08,
        r: Math.random() * intensity * 0.008,
        g: Math.random() * intensity * 0.008,
        b: Math.random() * intensity * 0.008,
      };
      
      setGlitchOffset(offset);
      
      // Kết thúc hiệu ứng glitch sau một khoảng thời gian ngắn
      const glitchDuration = 50 + Math.random() * 100; // Giảm thời gian glitch tối đa
      setTimeout(() => {
        setIsGlitching(false);
      }, glitchDuration);
      
      // Có thể tạo thêm nhiều glitch liên tiếp (giảm xác suất)
      if (Math.random() < 0.2) { // Giảm từ 40% xuống 20%
        setTimeout(() => {
          createGlitch();
        }, glitchDuration + Math.random() * 200);
      }
    };
    
    // Tạo glitch theo tần suất
    const intervalId = setInterval(createGlitch, frequency);
    
    // Thêm hiệu ứng glitch khi có sự kiện trên trang (giảm xác suất)
    const randomGlitch = () => {
      if (Math.random() < 0.02) { // Giảm từ 5% xuống 2%
        createGlitch();
      }
    };
    
    window.addEventListener('mousemove', randomGlitch);
    
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('mousemove', randomGlitch);
    };
  }, [intensity, frequency, glitchChance]);
  
  // Nếu có text prop, hiển thị text với hiệu ứng glitch
  if (text) {
    return (
      <div className={className}>
        <span className="glitch-text" data-text={text}>
          {text}
        </span>
        
        <style jsx>{`
          .glitch-text {
            position: relative;
            display: inline-block;
            animation: glitch-skew 1s infinite linear alternate-reverse;
          }
          
          .glitch-text::before,
          .glitch-text::after {
            content: attr(data-text);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0.8;
          }
          
          .glitch-text::before {
            animation: glitch-anim-1 5s infinite linear alternate-reverse;
            clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
            transform: translate(${isGlitching ? glitchOffset.x * 10 : 0}px, ${isGlitching ? glitchOffset.y * 10 : 0}px);
            text-shadow: ${isGlitching ? `0.05em 0 0 rgba(255,0,0,${glitchOffset.r}), -0.05em -0.025em 0 rgba(0,255,0,${glitchOffset.g})` : 'none'};
          }
          
          .glitch-text::after {
            animation: glitch-anim-2 5s infinite linear alternate-reverse;
            clip-path: polygon(0 80%, 100% 20%, 100% 100%, 0 100%);
            transform: translate(${isGlitching ? -glitchOffset.x * 5 : 0}px, ${isGlitching ? -glitchOffset.y * 5 : 0}px);
            text-shadow: ${isGlitching ? `-0.05em 0 0 rgba(255,0,0,${glitchOffset.r}), 0.05em 0.025em 0 rgba(0,0,255,${glitchOffset.b})` : 'none'};
          }
          
          @keyframes glitch-anim-1 {
            0% { clip-path: polygon(0 2%, 100% 2%, 100% 5%, 0 5%); }
            20% { clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%); }
            40% { clip-path: polygon(0 10%, 100% 10%, 100% 20%, 0 20%); }
            60% { clip-path: polygon(0 1%, 100% 1%, 100% 2%, 0 2%); }
            80% { clip-path: polygon(0 33%, 100% 33%, 100% 33%, 0 33%); }
            100% { clip-path: polygon(0 44%, 100% 44%, 100% 44%, 0 44%); }
          }
          
          @keyframes glitch-anim-2 {
            0% { clip-path: polygon(0 25%, 100% 25%, 100% 30%, 0 30%); }
            15% { clip-path: polygon(0 3%, 100% 3%, 100% 3%, 0 3%); }
            25% { clip-path: polygon(0 5%, 100% 5%, 100% 20%, 0 20%); }
            52% { clip-path: polygon(0 40%, 100% 40%, 100% 40%, 0 40%); }
            70% { clip-path: polygon(0 80%, 100% 80%, 100% 80%, 0 80%); }
            100% { clip-path: polygon(0 15%, 100% 15%, 100% 15%, 0 15%); }
          }
          
          @keyframes glitch-skew {
            0% { transform: skew(${isGlitching ? glitchOffset.x * 0.5 : 0}deg); }
            20% { transform: skew(${isGlitching ? glitchOffset.y * 0.5 : 0}deg); }
            40% { transform: skew(0deg); }
            60% { transform: skew(${isGlitching ? -glitchOffset.x * 0.5 : 0}deg); }
            80% { transform: skew(${isGlitching ? -glitchOffset.y * 0.5 : 0}deg); }
            100% { transform: skew(0deg); }
          }
        `}</style>
      </div>
    );
  }
  
  // Nếu có children prop, hiển thị children
  if (children) {
    return <>{children}</>;
  }
  
  // Nếu không có text và children, hiển thị hiệu ứng glitch toàn màn hình
  if (!isGlitching) return null;
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <div className="glitch-container">
        <div className={`glitch-overlay glitch-type-${glitchType}`}></div>
        {glitchType === 3 && (
          <div className="glitch-scanlines"></div>
        )}
      </div>
      
      <style jsx global>{`
        /* Hiệu ứng glitch đa dạng */
        .glitch-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 999;
          overflow: hidden;
        }
        
        .glitch-overlay {
          position: absolute;
          top: ${glitchOffset.y}px;
          left: ${glitchOffset.x}px;
          width: 100%;
          height: 100%;
          pointer-events: none;
          opacity: 0.7; /* Giảm độ đậm */
        }
        
        /* Các kiểu glitch khác nhau */
        .glitch-type-0 {
          background-color: rgba(255, ${Math.floor(255 * (1 - glitchOffset.r))}, ${Math.floor(255 * (1 - glitchOffset.b))}, 0.05);
          mix-blend-mode: difference;
          transform: translate(${glitchOffset.x * 1.5}px, 0);
        }
        
        .glitch-type-1 {
          background-color: rgba(${Math.floor(255 * (1 - glitchOffset.g))}, 255, ${Math.floor(255 * (1 - glitchOffset.r))}, 0.05);
          mix-blend-mode: screen;
          transform: translate(0, ${glitchOffset.y * 1.5}px);
        }
        
        .glitch-type-2 {
          background-color: rgba(${Math.floor(255 * (1 - glitchOffset.b))}, ${Math.floor(255 * (1 - glitchOffset.g))}, 255, 0.05);
          mix-blend-mode: overlay;
          transform: scale(${1 + glitchOffset.r * 0.03}, ${1 - glitchOffset.g * 0.03});
        }
        
        .glitch-type-3 {
          background-color: rgba(255, 255, 255, 0.03);
          mix-blend-mode: color-dodge;
          transform: skew(${glitchOffset.x * 0.7}deg, ${glitchOffset.y * 0.7}deg);
        }
        
        .glitch-scanlines {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0%,
            transparent 50%,
            rgba(255, 255, 255, 0.05) 50%,
            rgba(255, 255, 255, 0.05) 51%,
            transparent 51%,
            transparent 100%
          );
          background-size: 100% 3px;
          pointer-events: none;
          mix-blend-mode: overlay;
          opacity: 0.5;
        }
        
        /* Loại trừ các phần tử tương tác khỏi hiệu ứng glitch */
        nav, header, button, a, [role="button"], .interactive, .clickable, 
        input, select, textarea, form, .no-glitch {
          position: relative;
          z-index: 1000;
          mix-blend-mode: normal !important;
        }
      `}</style>
    </div>
  );
};

export default GlitchEffect;

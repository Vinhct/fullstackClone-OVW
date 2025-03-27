"use client";

import React from 'react';

interface ScanLineEffectProps {
  opacity?: number; // 0-1
  speed?: number; // 1-10
  color?: string;
  linesCount?: number;
  flickerIntensity?: number; // 1-10
}

const ScanLineEffect: React.FC<ScanLineEffectProps> = ({
  opacity = 0.05, // Giảm độ mờ đục
  speed = 2, // Giảm tốc độ
  color = '#ffffff',
  linesCount = 30,
  flickerIntensity = 2, // Giảm cường độ nhấp nháy
}) => {
  // Tính toán các giá trị dựa trên props
  const animationDuration = 11 - speed; // Tốc độ ngược với thởi gian
  const scanLineHeight = 100 / linesCount; // Chiều cao mỗi dòng
  
  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {/* Đường quét ngang */}
      <div className="scan-line-moving"></div>
      
      {/* Hiệu ứng nhấp nháy nhẹ */}
      <div className="crt-flicker"></div>
      
      {/* Tất cả style được gộp vào một thẻ duy nhất */}
      <style jsx global>{`
        /* Đường quét ngang */
        .scan-line-moving {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            transparent 49.9%,
            ${color} 49.9%,
            ${color} 50.1%,
            transparent 50.1%,
            transparent 100%
          );
          opacity: ${opacity * 1.2};
          pointer-events: none;
          animation: scanline ${animationDuration * 1.5}s linear infinite;
        }
        
        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
        
        /* Hiệu ứng nhấp nháy toàn màn hình */
        .crt-flicker {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: ${color};
          opacity: 0;
          pointer-events: none;
          animation: flicker ${15 - flickerIntensity}s step-end infinite;
        }
        
        @keyframes flicker {
          0% { opacity: 0; }
          1% { opacity: ${opacity}; }
          2% { opacity: 0; }
          ${flickerIntensity >= 3 ? '49% { opacity: 0; } 50% { opacity: ' + opacity * 0.8 + '; } 51% { opacity: 0; }' : ''}
          99% { opacity: 0; }
          100% { opacity: 0; }
        }
        
        /* Đảm bảo các phần tử tương tác không bị ảnh hưởng */
        nav, header, button, a, [role="button"], .interactive, .clickable, 
        input, select, textarea, form, .no-scanline {
          position: relative;
          z-index: 45;
        }
      `}</style>
    </div>
  );
};

export default ScanLineEffect;

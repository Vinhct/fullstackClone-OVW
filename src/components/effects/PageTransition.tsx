"use client";

import React, { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface PageTransitionProps {
  duration?: number; // milliseconds
  color?: string;
  type?: 'fade' | 'slide' | 'glitch';
}

const PageTransition: React.FC<PageTransitionProps> = ({
  duration = 800,
  color = '#ff4655', // Màu chủ đạo của Valorant
  type = 'glitch',
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionStep, setTransitionStep] = useState(0); // 0: không chuyển, 1: đang ẩn, 2: đang hiện
  
  // Theo dõi thay đổi đường dẫn để kích hoạt hiệu ứng chuyển trang
  useEffect(() => {
    // Khi đường dẫn thay đổi, kích hoạt hiệu ứng
    setIsTransitioning(true);
    setTransitionStep(1); // Bắt đầu ẩn trang hiện tại
    
    // Sau nửa thời gian, chuyển sang hiệu ứng hiện trang mới
    const halfDuration = Math.floor(duration / 2);
    const timer1 = setTimeout(() => {
      setTransitionStep(2); // Bắt đầu hiện trang mới
    }, halfDuration);
    
    // Sau toàn bộ thời gian, kết thúc hiệu ứng
    const timer2 = setTimeout(() => {
      setIsTransitioning(false);
      setTransitionStep(0);
    }, duration);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [pathname, searchParams, duration]);
  
  if (!isTransitioning) return null;
  
  // Xác định loại hiệu ứng chuyển trang
  let transitionClass = '';
  let transitionStyle = {};
  
  switch (type) {
    case 'fade':
      transitionClass = 'transition-fade';
      break;
    case 'slide':
      transitionClass = 'transition-slide';
      break;
    case 'glitch':
    default:
      transitionClass = 'transition-glitch';
      break;
  }
  
  return (
    <div className={`fixed inset-0 z-[9999] pointer-events-none ${transitionClass} ${transitionStep === 1 ? 'step-out' : 'step-in'}`}>
      {type === 'glitch' && (
        <div className="glitch-lines"></div>
      )}
      <div className="transition-overlay"></div>
      
      <style jsx global>{`
        /* Hiệu ứng fade */
        .transition-fade .transition-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: ${color};
          opacity: ${transitionStep === 1 ? '0' : '1'};
          transition: opacity ${duration / 2}ms ease-in-out;
        }
        
        .transition-fade.step-out .transition-overlay {
          opacity: 1;
        }
        
        .transition-fade.step-in .transition-overlay {
          opacity: 0;
        }
        
        /* Hiệu ứng slide */
        .transition-slide .transition-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: ${color};
          transform: ${transitionStep === 1 ? 'translateX(-100%)' : 'translateX(0)'};
          transition: transform ${duration / 2}ms cubic-bezier(0.83, 0, 0.17, 1);
        }
        
        .transition-slide.step-out .transition-overlay {
          transform: translateX(0);
        }
        
        .transition-slide.step-in .transition-overlay {
          transform: translateX(100%);
        }
        
        /* Hiệu ứng glitch */
        .transition-glitch .transition-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: ${color};
          clip-path: ${transitionStep === 1 
            ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' 
            : 'polygon(0 0, 0 0, 0 100%, 0 100%)'};
          transition: clip-path ${duration / 2}ms steps(10, end);
        }
        
        .transition-glitch.step-out .transition-overlay {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
        }
        
        .transition-glitch.step-in .transition-overlay {
          clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
        }
        
        .transition-glitch .glitch-lines {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0px,
            transparent 2px,
            rgba(255, 255, 255, 0.2) 2px,
            rgba(255, 255, 255, 0.2) 4px
          );
          mix-blend-mode: overlay;
          opacity: ${transitionStep === 1 ? '1' : '0'};
          transition: opacity ${duration / 4}ms ease-in-out;
          pointer-events: none;
          z-index: 10000;
        }
        
        .transition-glitch.step-out .glitch-lines {
          animation: glitch-transition ${duration / 2}ms steps(10, end);
        }
        
        @keyframes glitch-transition {
          0% {
            transform: translateX(0);
            opacity: 0;
          }
          10% {
            transform: translateX(-5px);
            opacity: 0.8;
          }
          20% {
            transform: translateX(5px);
            opacity: 0.4;
          }
          30% {
            transform: translateX(-3px);
            opacity: 0.6;
          }
          40% {
            transform: translateX(3px);
            opacity: 0.2;
          }
          50% {
            transform: translateX(-1px);
            opacity: 0.9;
          }
          60% {
            transform: translateX(1px);
            opacity: 0.3;
          }
          70% {
            transform: translateX(-2px);
            opacity: 0.7;
          }
          80% {
            transform: translateX(2px);
            opacity: 0.5;
          }
          90% {
            transform: translateX(-1px);
            opacity: 0.6;
          }
          100% {
            transform: translateX(0);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default PageTransition;

"use client";

import React, { useState, useEffect } from 'react';

interface BulletHole {
  x: number;
  y: number;
  size: number;
  rotation: number;
  createdAt: number;
}

interface SmokeEffect {
  x: number;
  y: number;
  size: number;
  opacity: number;
  createdAt: number;
}

interface BulletTracer {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  createdAt: number;
}

interface BulletHolesProps {
  maxHoles?: number;
  holeLifetime?: number;
  holeSize?: number;
}

const BulletHoles: React.FC<BulletHolesProps> = ({
  maxHoles = 20,
  holeLifetime = 5000, // 5 seconds
  holeSize = 20,
}) => {
  const [bulletHoles, setBulletHoles] = useState<BulletHole[]>([]);
  const [smokeEffects, setSmokeEffects] = useState<SmokeEffect[]>([]);
  const [bulletTracers, setBulletTracers] = useState<BulletTracer[]>([]);
  const [isShaking, setIsShaking] = useState(false);
  
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // Không tạo vết đạn khi click vào các phần tử tương tác
      const target = e.target as HTMLElement;
      if (target.tagName === 'BUTTON' || 
          target.tagName === 'A' || 
          target.tagName === 'INPUT' || 
          target.closest('[role="button"]') ||
          target.closest('.clickable') ||
          target.closest('nav') ||
          target.closest('header') ||
          target.closest('a') ||
          target.closest('button') ||
          target.closest('.interactive')) {
        return;
      }
      
      // Lấy vị trí trung tâm màn hình (điểm bắn đầu)
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Tạo vết đạn mới
      const newHole: BulletHole = {
        x: e.clientX,
        y: e.clientY,
        size: holeSize * (0.8 + Math.random() * 0.4), // Kích thước ngẫu nhiên
        rotation: Math.random() * 360, // Góc xoay ngẫu nhiên
        createdAt: Date.now(),
      };
      
      // Thêm vết đạn mới và giới hạn số lượng
      setBulletHoles(prev => [newHole, ...prev].slice(0, maxHoles));
      
      // Tạo hiệu ứng khói
      createSmokeEffect(e.clientX, e.clientY);
      
      // Tạo hiệu ứng đạn bay
      const newBulletTracer: BulletTracer = {
        startX: centerX,
        startY: centerY,
        endX: e.clientX,
        endY: e.clientY,
        createdAt: Date.now(),
      };
      setBulletTracers(prev => [newBulletTracer, ...prev].slice(0, 5));
      
      // Tạo hiệu ứng giật
      createRecoilEffect();
    };
    
    // Xóa vết đạn cũ
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setBulletHoles(prev => prev.filter(hole => now - hole.createdAt < holeLifetime));
      setSmokeEffects(prev => prev.filter(smoke => now - smoke.createdAt < 1000)); // Khói tồn tại 1 giây
      setBulletTracers(prev => prev.filter(tracer => now - tracer.createdAt < 200)); // Đạn bay tồn tại 200ms
    }, 100);
    
    document.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('click', handleClick);
      clearInterval(cleanupInterval);
    };
  }, [maxHoles, holeLifetime, holeSize]);
  
  // Tạo hiệu ứng khói
  const createSmokeEffect = (x: number, y: number) => {
    // Tạo 5-8 đám khói nhỏ
    const numSmokePuffs = 5 + Math.floor(Math.random() * 4);
    const newSmokeEffects: SmokeEffect[] = [];
    
    for (let i = 0; i < numSmokePuffs; i++) {
      // Vị trí ngẫu nhiên xung quanh điểm bắn
      const offsetX = (Math.random() - 0.5) * 20;
      const offsetY = (Math.random() - 0.5) * 20;
      
      newSmokeEffects.push({
        x: x + offsetX,
        y: y + offsetY,
        size: 5 + Math.random() * 15,
        opacity: 0.7 + Math.random() * 0.3,
        createdAt: Date.now() + i * 50, // Khói xuất hiện theo thứ tự
      });
    }
    
    setSmokeEffects(prev => [...newSmokeEffects, ...prev].slice(0, 50));
  };
  
  // Tạo hiệu ứng giật
  const createRecoilEffect = () => {
    if (isShaking) return;
    
    setIsShaking(true);
    
    // Sau 300ms, tắt hiệu ứng giật
    setTimeout(() => {
      setIsShaking(false);
    }, 300);
  };
  
  return (
    <>
      {/* Hiệu ứng giật */}
      <div 
        className={`fixed inset-0 pointer-events-none ${isShaking ? 'animate-recoil' : ''}`} 
        style={{ zIndex: 9999 }}
      >
        <div className="fixed inset-0 pointer-events-none z-40">
          {/* Hiệu ứng đạn bay */}
          {bulletTracers.map((tracer, index) => {
            const age = Date.now() - tracer.createdAt;
            const progress = Math.min(1, age / 200); // Hoàn thành trong 200ms
            
            // Tính toán vị trí hiện tại của đạn dựa trên tiến trình
            const currentX = tracer.startX + (tracer.endX - tracer.startX) * progress;
            const currentY = tracer.startY + (tracer.endY - tracer.startY) * progress;
            
            // Tính toán góc của đạn
            const angle = Math.atan2(tracer.endY - tracer.startY, tracer.endX - tracer.startX) * 180 / Math.PI;
            
            // Tính toán độ dài của đạn
            const distance = Math.sqrt(
              Math.pow(tracer.endX - tracer.startX, 2) + 
              Math.pow(tracer.endY - tracer.startY, 2)
            );
            
            const bulletLength = Math.min(30, distance * 0.1);
            
            return (
              <div
                key={`tracer-${tracer.createdAt}-${index}`}
                className="absolute"
                style={{
                  left: `${currentX}px`,
                  top: `${currentY}px`,
                  width: `${bulletLength}px`,
                  height: '2px',
                  backgroundColor: '#ffcc00',
                  boxShadow: '0 0 5px #ffcc00, 0 0 10px #ffcc00',
                  transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                  opacity: 1 - progress, // Mờ dần khi đến đích
                  pointerEvents: 'none',
                }}
              />
            );
          })}
          
          {/* Hiệu ứng khói */}
          {smokeEffects.map((smoke, index) => {
            const age = Date.now() - smoke.createdAt;
            const fadeOpacity = Math.max(0, 1 - age / 1000); // Mờ dần trong 1 giây
            const growSize = smoke.size * (1 + age / 500); // Lớn dần lên
            
            return (
              <div
                key={`smoke-${smoke.x}-${smoke.y}-${index}`}
                className="absolute rounded-full"
                style={{
                  left: `${smoke.x}px`,
                  top: `${smoke.y}px`,
                  width: `${growSize}px`,
                  height: `${growSize}px`,
                  backgroundColor: `rgba(200, 200, 200, ${fadeOpacity * smoke.opacity})`,
                  transform: 'translate(-50%, -50%)',
                  pointerEvents: 'none',
                  transition: 'all 0.1s ease-out',
                  boxShadow: `0 0 ${growSize/2}px rgba(200, 200, 200, ${fadeOpacity * 0.5})`,
                }}
              />
            );
          })}
          
          {/* Vết đạn */}
          {bulletHoles.map((hole, index) => (
            <div
              key={`hole-${hole.x}-${hole.y}-${index}`}
              className="absolute"
              style={{
                left: `${hole.x}px`,
                top: `${hole.y}px`,
                width: `${hole.size}px`,
                height: `${hole.size}px`,
                transform: `translate(-50%, -50%) rotate(${hole.rotation}deg)`,
                pointerEvents: 'none',
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Lỗ đen chính giữa */}
                <circle cx="12" cy="12" r="5" fill="black" />
                
                {/* Viền ngoài */}
                <circle cx="12" cy="12" r="8" fill="rgba(30,30,30,0.6)" />
                
                {/* Vết nứt */}
                <path 
                  d="M12,2 L12,5 M12,19 L12,22 M5,12 L2,12 M19,12 L22,12
                     M6,6 L8,8 M18,6 L16,8 M6,18 L8,16 M18,18 L16,16"
                  stroke="rgba(40,40,40,0.8)" 
                  strokeWidth="1.5" 
                  strokeLinecap="round"
                />
              </svg>
            </div>
          ))}
        </div>
      </div>
      
      {/* CSS cho hiệu ứng giật */}
      <style jsx global>{`
        @keyframes recoil {
          0% { transform: translate(0, 0); }
          25% { transform: translate(-5px, -10px); }
          50% { transform: translate(3px, -5px); }
          75% { transform: translate(-2px, -2px); }
          100% { transform: translate(0, 0); }
        }
        
        .animate-recoil {
          animation: recoil 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default BulletHoles;

'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface BackgroundEffectProps {
  primaryColor?: string;
  secondaryColor?: string;
  speed?: number;
  density?: number;
}

const BackgroundEffect: React.FC<BackgroundEffectProps> = ({
  primaryColor = '#ff4655',
  secondaryColor = '#0ff',
  speed = 1,
  density = 20
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Đặt kích thước canvas bằng kích thước cửa sổ
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Tạo các đối tượng hình học
    const shapes: Shape[] = [];
    const shapeCount = Math.floor(density * (window.innerWidth / 1000));
    
    for (let i = 0; i < shapeCount; i++) {
      shapes.push(new Shape(
        canvas.width,
        canvas.height,
        primaryColor,
        secondaryColor,
        speed
      ));
    }
    
    // Animation loop
    let animationFrameId: number;
    
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      shapes.forEach(shape => {
        shape.update();
        shape.draw(ctx);
      });
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [primaryColor, secondaryColor, speed, density]);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 pointer-events-none z-0"
    >
      <canvas ref={canvasRef} className="w-full h-full" />
    </motion.div>
  );
};

// Lớp Shape để tạo và quản lý các hình dạng
class Shape {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  secondaryColor: string;
  opacity: number;
  type: 'circle' | 'square' | 'triangle';
  rotation: number;
  rotationSpeed: number;
  canvasWidth: number;
  canvasHeight: number;
  
  constructor(
    canvasWidth: number,
    canvasHeight: number,
    primaryColor: string,
    secondaryColor: string,
    speedFactor: number
  ) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.size = Math.random() * 10 + 5;
    this.speedX = (Math.random() - 0.5) * speedFactor;
    this.speedY = (Math.random() - 0.5) * speedFactor;
    this.color = primaryColor;
    this.secondaryColor = secondaryColor;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.type = ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'triangle';
    this.rotation = 0;
    this.rotationSpeed = (Math.random() - 0.5) * 0.02 * speedFactor;
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotationSpeed;
    
    // Xử lý va chạm với biên
    if (this.x < 0 || this.x > this.canvasWidth) {
      this.speedX *= -1;
    }
    
    if (this.y < 0 || this.y > this.canvasHeight) {
      this.speedY *= -1;
    }
  }
  
  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    
    // Tạo gradient
    const gradient = ctx.createLinearGradient(-this.size, -this.size, this.size, this.size);
    gradient.addColorStop(0, this.color);
    gradient.addColorStop(1, this.secondaryColor);
    
    ctx.fillStyle = gradient;
    
    // Vẽ hình dạng khác nhau
    switch (this.type) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
        break;
        
      case 'square':
        ctx.fillRect(-this.size, -this.size, this.size * 2, this.size * 2);
        break;
        
      case 'triangle':
        ctx.beginPath();
        ctx.moveTo(0, -this.size);
        ctx.lineTo(-this.size, this.size);
        ctx.lineTo(this.size, this.size);
        ctx.closePath();
        ctx.fill();
        break;
    }
    
    ctx.restore();
  }
}

export default BackgroundEffect;

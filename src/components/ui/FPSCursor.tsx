"use client";

import React, { useState, useEffect, useRef } from 'react';

interface FPSCursorProps {
  crosshairColor?: string;
  crosshairSize?: number;
  crosshairThickness?: number;
  crosshairGap?: number;
  showHitMarker?: boolean;
  hitMarkerColor?: string;
  hitMarkerDuration?: number;
  crosshairStyle?: 'default' | 'dot' | 'cross' | 'circle' | 'triangle';
  showHoverEffect?: boolean;
}

const FPSCursor: React.FC<FPSCursorProps> = ({
  crosshairColor = '#218ffe',
  crosshairSize = 12,
  crosshairThickness = 2,
  crosshairGap = 4,
  showHitMarker = true,
  hitMarkerColor = '#ff4655',
  hitMarkerDuration = 150,
  crosshairStyle = 'default',
  showHoverEffect = true,
}) => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [showHitEffect, setShowHitEffect] = useState(false);
  const [isAiming, setIsAiming] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverTarget, setHoverTarget] = useState<string>('');

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Kiểm tra xem chuột có đang hover trên phần tử tương tác không
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.tagName === 'INPUT' || 
        target.closest('[role="button"]') ||
        target.closest('.clickable') ||
        target.closest('.interactive');
      
      setIsHovering(Boolean(isInteractive));
      
      // Lấy text của phần tử đang hover (nếu có)
      if (isInteractive) {
        let hoverText = '';
        if (target.title) {
          hoverText = target.title;
        } else if (target.tagName === 'BUTTON' || target.tagName === 'A') {
          hoverText = target.textContent || '';
        } else if (target.closest('button') || target.closest('a')) {
          const parent = target.closest('button') || target.closest('a');
          hoverText = parent?.textContent || '';
        }
        
        // Giới hạn độ dài text
        if (hoverText.length > 20) {
          hoverText = hoverText.substring(0, 20) + '...';
        }
        
        setHoverTarget(hoverText);
      } else {
        setHoverTarget('');
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      if (e.button === 0 && showHitMarker) { // Left click
        setShowHitEffect(true);
        setTimeout(() => {
          setShowHitEffect(false);
        }, hitMarkerDuration);
      }
      if (e.button === 2) { // Right click
        setIsAiming(true);
      }
    };

    const handleMouseUp = (e: MouseEvent) => {
      setIsClicking(false);
      if (e.button === 2) { // Right click
        setIsAiming(false);
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault(); // Prevent context menu on right-click
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('contextmenu', handleContextMenu);

    // Hide default cursor
    document.body.style.cursor = 'none';

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('contextmenu', handleContextMenu);
      
      // Restore default cursor
      document.body.style.cursor = 'auto';
    };
  }, [showHitMarker, hitMarkerDuration]);

  // Calculate crosshair dimensions
  const actualSize = isAiming ? crosshairSize * 0.7 : crosshairSize;
  const actualGap = isAiming ? crosshairGap * 0.5 : crosshairGap;
  const actualThickness = crosshairThickness;

  // Render different crosshair styles
  const renderCrosshair = () => {
    switch (crosshairStyle) {
      case 'dot':
        return (
          <div
            style={{
              position: 'absolute',
              width: `${actualThickness * 2}px`,
              height: `${actualThickness * 2}px`,
              backgroundColor: '#ff0000',
              borderRadius: '50%',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      case 'cross':
        return (
          <>
            {/* Horizontal line */}
            <div
              style={{
                position: 'absolute',
                width: `${actualSize * 2}px`,
                height: `${actualThickness}px`,
                backgroundColor: crosshairColor,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
            {/* Vertical line */}
            <div
              style={{
                position: 'absolute',
                width: `${actualThickness}px`,
                height: `${actualSize * 2}px`,
                backgroundColor: crosshairColor,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </>
        );
      case 'circle':
        return (
          <div
            style={{
              position: 'absolute',
              width: `${actualSize * 2}px`,
              height: `${actualSize * 2}px`,
              border: `${actualThickness}px solid ${crosshairColor}`,
              borderRadius: '50%',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      case 'triangle':
        return (
          <div
            style={{
              position: 'absolute',
              width: 0,
              height: 0,
              borderLeft: `${actualSize}px solid transparent`,
              borderRight: `${actualSize}px solid transparent`,
              borderBottom: `${actualSize * 1.5}px solid ${crosshairColor}`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        );
      case 'default':
      default:
        return (
          <>
            {/* Outer circle */}
            <div
              style={{
                position: 'absolute',
                width: `${actualSize * 2}px`,
                height: `${actualSize * 2}px`,
                border: `${actualThickness}px solid ${crosshairColor}`,
                borderRadius: '50%',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 2px rgba(0, 0, 0, 0.5)',
              }}
            />
            
            {/* Vertical line - top */}
            <div
              style={{
                position: 'absolute',
                width: `${actualThickness}px`,
                height: `${actualSize * 0.6}px`,
                backgroundColor: crosshairColor,
                top: `calc(50% - ${actualSize * 0.6 + actualGap}px)`,
                left: '50%',
                transform: 'translateX(-50%)',
                boxShadow: '0 0 2px rgba(0, 0, 0, 0.5)',
              }}
            />
            
            {/* Vertical line - bottom */}
            <div
              style={{
                position: 'absolute',
                width: `${actualThickness}px`,
                height: `${actualSize * 0.6}px`,
                backgroundColor: crosshairColor,
                bottom: `calc(50% - ${actualSize * 0.6 + actualGap}px)`,
                left: '50%',
                transform: 'translateX(-50%)',
                boxShadow: '0 0 2px rgba(0, 0, 0, 0.5)',
              }}
            />
            
            {/* Horizontal line - left */}
            <div
              style={{
                position: 'absolute',
                width: `${actualSize * 0.6}px`,
                height: `${actualThickness}px`,
                backgroundColor: crosshairColor,
                top: '50%',
                left: `calc(50% - ${actualSize * 0.6 + actualGap}px)`,
                transform: 'translateY(-50%)',
                boxShadow: '0 0 2px rgba(0, 0, 0, 0.5)',
              }}
            />
            
            {/* Horizontal line - right */}
            <div
              style={{
                position: 'absolute',
                width: `${actualSize * 0.6}px`,
                height: `${actualThickness}px`,
                backgroundColor: crosshairColor,
                top: '50%',
                right: `calc(50% - ${actualSize * 0.6 + actualGap}px)`,
                transform: 'translateY(-50%)',
                boxShadow: '0 0 2px rgba(0, 0, 0, 0.5)',
              }}
            />
            
            {/* Center dot */}
            <div
              style={{
                position: 'absolute',
                width: `${actualThickness * 2.5}px`,
                height: `${actualThickness * 2.5}px`,
                backgroundColor: '#ff0000',
                borderRadius: '50%',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                boxShadow: '0 0 3px rgba(0, 0, 0, 0.7)',
              }}
            />
          </>
        );
    }
  };

  // Render hit marker effect
  const renderHitMarker = () => {
    if (!showHitEffect) return null;

    return (
      <>
        {/* Top-right to bottom-left line */}
        <div
          style={{
            position: 'absolute',
            width: `${actualSize * 1.5}px`,
            height: `${actualThickness}px`,
            backgroundColor: hitMarkerColor,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(45deg)',
            opacity: 0.8,
            animation: 'hitmarker-fade 150ms ease-out',
          }}
        />
        {/* Top-left to bottom-right line */}
        <div
          style={{
            position: 'absolute',
            width: `${actualSize * 1.5}px`,
            height: `${actualThickness}px`,
            backgroundColor: hitMarkerColor,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-45deg)',
            opacity: 0.8,
            animation: 'hitmarker-fade 150ms ease-out',
          }}
        />
      </>
    );
  };

  // Render recoil effect
  const renderRecoilEffect = () => {
    if (!isClicking) return null;

    return (
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: `${actualSize * 3}px`,
          height: `${actualSize * 3}px`,
          borderRadius: '50%',
          border: `1px solid ${crosshairColor}`,
          opacity: 0.3,
          transform: 'translate(-50%, -50%)',
          animation: 'recoil-pulse 150ms ease-out',
        }}
      />
    );
  };

  // Hiệu ứng hover
  const renderHoverEffect = () => {
    if (!showHoverEffect || !isHovering) return null;
    
    return (
      <>
        {/* Vòng tròn hover */}
        <div
          style={{
            position: 'absolute',
            width: `${actualSize * 3}px`,
            height: `${actualSize * 3}px`,
            border: `${actualThickness}px solid rgba(255, 255, 255, 0.3)`,
            borderRadius: '50%',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.2s ease-out',
          }}
        />
        
        {/* Text hiển thị khi hover */}
        {hoverTarget && (
          <div
            style={{
              position: 'absolute',
              top: `calc(50% + ${actualSize * 2}px)`,
              left: '50%',
              transform: 'translate(-50%, 0)',
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            {hoverTarget}
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: position.y,
          left: position.x,
          width: `${actualSize * 3}px`,
          height: `${actualSize * 3}px`,
          pointerEvents: 'none',
          zIndex: 9999,
          transition: isClicking ? 'none' : 'transform 0.1s ease-out',
          transform: isClicking 
            ? `translate(-50%, -50%) translateY(${isAiming ? 1 : 3}px)` 
            : 'translate(-50%, -50%)',
        }}
      >
        {renderCrosshair()}
        {renderHitMarker()}
        {renderRecoilEffect()}
        {renderHoverEffect()}
      </div>

      <style jsx global>{`
        @keyframes hitmarker-fade {
          0% { 
            opacity: 1; 
            transform: translate(-50%, -50%) rotate(45deg) scale(1.2); 
          }
          50% { 
            opacity: 0.5; 
            transform: translate(-50%, -50%) rotate(45deg) scale(1); 
          }
          100% { 
            opacity: 0; 
            transform: translate(-50%, -50%) rotate(45deg) scale(0.8); 
          }
        }
        
        @keyframes recoil-pulse {
          0% { 
            opacity: 0.5; 
            transform: translate(-50%, -50%) scale(0.8); 
          }
          50% { 
            opacity: 0.3; 
            transform: translate(-50%, -50%) scale(1.2); 
          }
          100% { 
            opacity: 0; 
            transform: translate(-50%, -50%) scale(1.5); 
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

export default FPSCursor;

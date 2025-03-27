"use client";

import React from 'react';

interface NeonGlowEffectProps {
  primaryColor?: string;
  secondaryColor?: string;
  intensity?: number; // 1-10
  children?: React.ReactNode; 
}

const NeonGlowEffect: React.FC<NeonGlowEffectProps> = ({
  primaryColor = '#ff4655', 
  secondaryColor = '#0ff',
  intensity = 5,
  children
}) => {
  const glowSize = `${intensity * 5}px`;
  const glowIntensity = intensity * 0.1;
  
  return (
    <>
      {children && (
        <div className="neon-text">
          {children}
          <style jsx>{`
            .neon-text {
              color: white;
              text-shadow: 
                0 0 5px ${primaryColor},
                0 0 10px ${primaryColor},
                0 0 20px ${primaryColor},
                0 0 40px ${primaryColor},
                0 0 80px ${primaryColor};
              animation: neon-pulse 2s infinite alternate;
            }
            
            @keyframes neon-pulse {
              0% { text-shadow: 
                0 0 5px ${primaryColor},
                0 0 10px ${primaryColor},
                0 0 20px ${primaryColor},
                0 0 40px ${primaryColor},
                0 0 80px ${primaryColor}; 
              }
              100% { text-shadow: 
                0 0 10px ${primaryColor},
                0 0 20px ${primaryColor},
                0 0 40px ${primaryColor},
                0 0 80px ${primaryColor},
                0 0 120px ${primaryColor}; 
              }
            }
          `}</style>
        </div>
      )}
      
      <div className="fixed inset-0 pointer-events-none z-20">
        <style jsx global>{`
          /* Hiệu ứng neon cho các phần tử có class neon-glow */
          .neon-glow {
            box-shadow: 0 0 ${glowSize} ${primaryColor};
            text-shadow: 0 0 ${glowSize} ${primaryColor};
            transition: all 0.3s ease;
          }
          
          .neon-glow:hover {
            box-shadow: 0 0 ${parseInt(glowSize) * 2}px ${primaryColor};
            text-shadow: 0 0 ${parseInt(glowSize) * 2}px ${primaryColor};
          }
          
          /* Hiệu ứng neon cho các button */
          button, 
          .btn,
          [role="button"],
          a {
            position: relative;
            transition: all 0.3s ease;
          }
          
          button:hover, 
          .btn:hover,
          [role="button"]:hover,
          a:hover {
            text-shadow: 0 0 ${glowSize} ${primaryColor};
          }
          
          button::before,
          .btn::before,
          [role="button"]::before,
          a::before {
            content: '';
            position: absolute;
            inset: -3px;
            background: ${primaryColor};
            z-index: -1;
            filter: blur(${glowSize});
            opacity: 0;
            transition: opacity 0.3s ease;
          }
          
          button:hover::before,
          .btn:hover::before,
          [role="button"]:hover::before,
          a:hover::before {
            opacity: ${glowIntensity};
          }
          
          /* Hiệu ứng neon cho các heading */
          h1, h2, h3, h4, h5, h6 {
            position: relative;
          }
          
          h1::after,
          h2::after,
          h3::after {
            content: attr(data-text);
            position: absolute;
            left: 0;
            top: 0;
            text-shadow: 0 0 ${glowSize} ${secondaryColor};
            opacity: 0;
            z-index: -1;
            transition: opacity 0.3s ease;
          }
          
          h1:hover::after,
          h2:hover::after,
          h3:hover::after {
            opacity: ${glowIntensity};
          }
          
          /* Hiệu ứng đường viền neon */
          .neon-border {
            position: relative;
          }
          
          .neon-border::before {
            content: '';
            position: absolute;
            inset: 0;
            border: 1px solid ${primaryColor};
            box-shadow: 0 0 ${glowSize} ${primaryColor}, inset 0 0 ${glowSize} ${primaryColor};
            opacity: ${glowIntensity * 0.5};
            z-index: -1;
            pointer-events: none;
            transition: all 0.3s ease;
          }
          
          .neon-border:hover::before {
            opacity: ${glowIntensity};
          }
          
          /* Hiệu ứng neon pulse */
          .neon-pulse {
            animation: neon-pulse 2s infinite;
          }
          
          @keyframes neon-pulse {
            0% { filter: brightness(1); }
            50% { filter: brightness(1.2); }
            100% { filter: brightness(1); }
          }
        `}</style>
      </div>
    </>
  );
};

export default NeonGlowEffect;

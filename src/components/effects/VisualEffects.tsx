"use client";

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Sử dụng dynamic import để tránh lỗi khi build
const PageTransition = dynamic(() => import('./PageTransition'), { ssr: false });
const AmbientSound = dynamic(() => import('./AmbientSound'), { ssr: false });

interface VisualEffectsProps {
  enableParallax?: boolean;
  enableGlitch?: boolean;
  enableNeonGlow?: boolean;
  enableParticles?: boolean;
  enableScanLine?: boolean;
  enablePageTransition?: boolean;
  enableAmbientSound?: boolean;
  pageTransitionType?: 'fade' | 'slide' | 'glitch';
  ambientSoundVolume?: number;
}

const VisualEffects: React.FC<VisualEffectsProps> = ({
  enableParallax = true,
  enableGlitch = true,
  enableNeonGlow = true,
  enableParticles = true,
  enableScanLine = true,
  enablePageTransition = true,
  enableAmbientSound = true,
  pageTransitionType = 'glitch',
  ambientSoundVolume = 0.2,
}) => {
  return (
    <>
    
      {enablePageTransition && <PageTransition type={pageTransitionType} />}
      {enableAmbientSound && <AmbientSound volume={ambientSoundVolume} />}
    </>
  );
};

export default VisualEffects;

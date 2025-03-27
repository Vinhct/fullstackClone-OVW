"use client";

import React, { useState, useEffect, lazy, Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import LoadingScreen from "@/components/LoadingScreen";
import FPSCursor from "@/components/ui/FPSCursor";
import BulletHoles from "@/components/ui/BulletHoles";

// Lazy load components that are not needed immediately
const NewsSection = lazy(() => import("@/components/NewsSection"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const AgentsSection = lazy(() => import("@/components/AgentsSection"));
const MapsSection = lazy(() => import("@/components/MapsSection"));
const ParticleBackground = lazy(() => import("@/components/ui/ParticleBackground"));
const ScrollReveal = lazy(() => import("@/components/ui/ScrollReveal"));
const VisualEffects = lazy(() => import("@/components/effects/VisualEffects"));

// Prefetch important routes
const prefetchRoutes = () => {
  const routes = ['/heroes', '/game-info', '/news'];
  routes.forEach(route => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    document.head.appendChild(link);
  });
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isContentLoaded, setIsContentLoaded] = useState(false);

  useEffect(() => {
    // Reduce loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Prefetch routes after main content is loaded
      prefetchRoutes();
    }, 1000); // Reduced from 2000ms to 1000ms

    // Track when content is fully loaded
    const handleLoad = () => {
      setIsContentLoaded(true);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  // Optimize effects by only loading them when needed
  const shouldLoadEffects = !isLoading && isContentLoaded;

  return (
    <div className="relative">
      {/* Custom Mouse Effects - Only load when page is ready */}
      {shouldLoadEffects && (
        <>
          <FPSCursor />
          <BulletHoles 
            maxHoles={5} // Reduced from 10 to 5
            holeLifetime={3000} // Reduced from 5000ms to 3000ms
            holeSize={20}
          />
          <Suspense fallback={null}>
            <VisualEffects 
              enableParallax={true}
              enableGlitch={false} // Disable glitch effect for better performance
              enableNeonGlow={true}
              enableParticles={true}
              enableScanLine={false} // Disable scan line for better performance
              enablePageTransition={true}
              enableAmbientSound={false}
              pageTransitionType="fade" // Changed from "glitch" to "fade" for better performance
              ambientSoundVolume={0}
            />
          </Suspense>
        </>
      )}

      {/* Loading Screen */}
      <LoadingScreen isLoading={isLoading} />

      {/* Background Particles - Lazy loaded */}
      {shouldLoadEffects && (
        <div className="fixed inset-0 z-0 pointer-events-none opacity-30">
          <Suspense fallback={null}>
            <ParticleBackground 
              particleCount={20} // Reduced from 30 to 20
              connectParticles={true}
            />
          </Suspense>
        </div>
      )}

      {/* Main Content */}
      <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Hero section is loaded immediately */}
        <HeroSection />
        
        {/* Other sections are lazy loaded */}
        <Suspense fallback={<div className="h-96 flex items-center justify-center"><div className="animate-pulse text-primary-blue">Loading...</div></div>}>
          {!isLoading && (
            <>
              <ScrollReveal 
                direction="up" 
                threshold={0.1} 
                delay={50} // Reduced from 100ms to 50ms
                distance={30} // Reduced from 50px to 30px
              >
                <AboutSection />
              </ScrollReveal>
              
              <ScrollReveal 
                direction="up" 
                threshold={0.1} 
                delay={50}
                distance={30}
              >
                <AgentsSection />
              </ScrollReveal>
              
              <ScrollReveal 
                direction="up" 
                threshold={0.1} 
                delay={50}
                distance={30}
              >
                <MapsSection />
              </ScrollReveal>
              
              <ScrollReveal 
                direction="up" 
                threshold={0.1} 
                delay={50}
                distance={30}
              >
                <NewsSection />
              </ScrollReveal>
            </>
          )}
        </Suspense>
      </div>
    </div>
  );
}

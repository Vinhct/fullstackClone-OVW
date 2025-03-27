'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ParticlesEffect from '@/components/effects/ParticlesEffect';

export default function GameInfo() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden h-[70vh]">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image 
            src="/images/game-info/game-info-banner.jpg" 
            alt="Game Info Banner" 
            fill 
            className="object-cover object-center opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900"></div>
          
          {/* Overlay geometric shapes - Overwatch style */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 border-4 border-primary-blue/30 rounded-full opacity-50 animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 border-2 border-secondary-blue/20 rounded-full opacity-30 animate-ping" style={{animationDuration: '3s'}}></div>
            <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-accent-orange/10 rounded-full blur-xl animate-pulse" style={{animationDuration: '4s'}}></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center">
          <div 
            className="valorant-container z-10 transition-all duration-1000"
            style={{paddingTop: '80px'}}
          >
            <h1 className="overwatch-heading text-6xl md:text-7xl lg:text-8xl mb-4 text-white drop-shadow-lg">
              GAME <span className="text-primary-blue">INFO</span>
            </h1>
            <div className="max-w-xl transition-all duration-1000 delay-300">
              <p className="text-lg md:text-xl text-gray-200 mb-8 drop-shadow-md">
                Discover everything you need to know about Overwatch, from game modes to heroes and more
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-1000 ${scrollY > 50 ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex flex-col items-center animate-bounce">
            <span className="text-white text-sm mb-2">SCROLL DOWN</span>
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-900">
        <div className="valorant-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <h2 className="overwatch-heading text-3xl md:text-4xl text-white mb-6">EXPLORE THE WORLD OF <span className="text-primary-blue">OVERWATCH</span></h2>
              <p className="text-gray-300 mb-4">
                Dive into the rich universe of Overwatch, a team-based shooter where heroes do battle in a world of conflict.
              </p>
              <p className="text-gray-300 mb-6">
                Choose your hero from a diverse cast of soldiers, scientists, adventurers, and oddities, each with their own unique set of abilities.
              </p>
              <div className="flex gap-4">
                <a href="/game-info/overview" className="px-6 py-3 bg-primary-blue hover:bg-primary-blue/90 text-white font-bold rounded-md transition-colors">
                  OVERVIEW
                </a>
                <a href="/game-info/media" className="px-6 py-3 border border-primary-blue text-primary-blue hover:bg-primary-blue/10 font-bold rounded-md transition-colors">
                  MEDIA
                </a>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-lg overflow-hidden"
            >
              <Image 
                src="/images/game-info/game-info-1.jpg" 
                alt="Overwatch Gameplay" 
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-lg overflow-hidden"
            >
              <div className="relative h-48">
                <Image 
                  src="/images/game-info/game-mode-1.jpg" 
                  alt="Game Mode" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl text-white font-bold mb-2">GAME MODES</h3>
                <p className="text-gray-300 mb-4">
                  From Escort to Control, discover the various game modes available in Overwatch.
                </p>
                <a href="/game-info/overview#game-modes" className="text-primary-blue hover:underline font-semibold">
                  Learn More →
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-lg overflow-hidden"
            >
              <div className="relative h-48">
                <Image 
                  src="/images/game-info/heroes-card.jpg" 
                  alt="Heroes" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl text-white font-bold mb-2">HEROES</h3>
                <p className="text-gray-300 mb-4">
                  Explore the diverse roster of heroes, each with unique abilities and playstyles.
                </p>
                <a href="/heroes" className="text-primary-blue hover:underline font-semibold">
                  View Heroes →
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-lg overflow-hidden"
            >
              <div className="relative h-48">
                <Image 
                  src="/images/game-info/media-card.jpg" 
                  alt="Media" 
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl text-white font-bold mb-2">MEDIA</h3>
                <p className="text-gray-300 mb-4">
                  Watch trailers, cinematics, and other media content from the world of Overwatch.
                </p>
                <a href="/game-info/media" className="text-primary-blue hover:underline font-semibold">
                  View Media →
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Particles Effect */}
      <ParticlesEffect />
    </div>
  );
}

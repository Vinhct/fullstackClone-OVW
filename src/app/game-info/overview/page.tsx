'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ParticlesEffect from '@/components/effects/ParticlesEffect';

export default function GameInfoOverview() {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('about');

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
      <section className="relative w-full overflow-hidden h-[50vh]">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image 
            src="/images/game-info/overview-banner.jpg" 
            alt="Game Overview Banner" 
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
          >
            <h1 className="overwatch-heading text-5xl md:text-6xl lg:text-7xl mb-4 text-white drop-shadow-lg" style={{paddingTop: '100px'}}>
              GAME <span className="text-primary-blue">OVERVIEW</span>
            </h1>
            <div className="max-w-xl transition-all duration-1000 delay-300">
              <p className="text-lg md:text-xl text-gray-200 mb-8 drop-shadow-md">
                Everything you need to know about Overwatch's gameplay, heroes, and more
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

      {/* Navigation Tabs */}
      <section className="bg-gray-800 sticky top-[80px] z-40 border-b border-gray-700">
        <div className="valorant-container">
          <div className="flex overflow-x-auto scrollbar-hide">
            <button 
              onClick={() => setActiveTab('about')}
              className={`px-6 py-4 text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${activeTab === 'about' ? 'text-primary-blue border-b-2 border-primary-blue' : 'text-gray-300 hover:text-white'}`}
            >
              About the Game
            </button>
            <button 
              onClick={() => setActiveTab('game-modes')}
              className={`px-6 py-4 text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${activeTab === 'game-modes' ? 'text-primary-blue border-b-2 border-primary-blue' : 'text-gray-300 hover:text-white'}`}
              id="game-modes"
            >
              Game Modes
            </button>
            <button 
              onClick={() => setActiveTab('maps')}
              className={`px-6 py-4 text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${activeTab === 'maps' ? 'text-primary-blue border-b-2 border-primary-blue' : 'text-gray-300 hover:text-white'}`}
            >
              Maps
            </button>
            <button 
              onClick={() => setActiveTab('roles')}
              className={`px-6 py-4 text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${activeTab === 'roles' ? 'text-primary-blue border-b-2 border-primary-blue' : 'text-gray-300 hover:text-white'}`}
            >
              Hero Roles
            </button>
            <button 
              onClick={() => setActiveTab('progression')}
              className={`px-6 py-4 text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${activeTab === 'progression' ? 'text-primary-blue border-b-2 border-primary-blue' : 'text-gray-300 hover:text-white'}`}
            >
              Progression
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-900">
        <div className="valorant-container">
          {/* About the Game */}
          {activeTab === 'about' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="overwatch-heading text-3xl md:text-4xl text-white mb-6">WHAT IS <span className="text-primary-blue">OVERWATCH</span>?</h2>
                  <p className="text-gray-300 mb-4">
                    Overwatch is a vibrant team-based shooter set in a near-future Earth. Every match is an intense 6v6 battle between a cast of unique heroes, each with their own incredible abilities and playstyles.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Whether you're teleporting across the battlefield as Tracer, deflecting projectiles as Genji, or shielding your allies as Reinhardt, every hero brings something unique to the table.
                  </p>
                  <p className="text-gray-300">
                    Team up with friends and compete in a variety of game modes across diverse maps from around the globe.
                  </p>
                </div>
                <div className="relative h-[300px] rounded-lg overflow-hidden">
                  <Image 
                    src="/images/game-info/overview-1.jpg" 
                    alt="Overwatch Gameplay" 
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-8">
                <h3 className="text-2xl text-white font-bold mb-4">KEY FEATURES</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col">
                    <div className="bg-primary-blue/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h4 className="text-white font-bold mb-2">TEAM-BASED GAMEPLAY</h4>
                    <p className="text-gray-300">
                      Work together with your team to secure objectives and achieve victory through coordinated teamwork.
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <div className="bg-primary-blue/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                      </svg>
                    </div>
                    <h4 className="text-white font-bold mb-2">DIVERSE HEROES</h4>
                    <p className="text-gray-300">
                      Choose from a roster of 30+ heroes, each with unique abilities and playstyles to master.
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <div className="bg-primary-blue/20 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-white font-bold mb-2">GLOBAL BATTLEGROUNDS</h4>
                    <p className="text-gray-300">
                      Battle across the world in diverse maps set in futuristic versions of real-world locations.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Game Modes */}
          {activeTab === 'game-modes' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              <div>
                <h2 className="overwatch-heading text-3xl md:text-4xl text-white mb-6">GAME <span className="text-primary-blue">MODES</span></h2>
                <p className="text-gray-300 mb-8 max-w-3xl">
                  Overwatch features a variety of game modes, each offering a unique gameplay experience. From escorting payloads to capturing objectives, there's something for every type of player.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="relative h-48">
                    <Image 
                      src="/images/game-info/escort-mode.jpg" 
                      alt="Escort Mode" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl text-white font-bold mb-2">ESCORT</h3>
                    <p className="text-gray-300 mb-4">
                      Attackers escort a payload to a delivery point, while defenders try to stop them. The payload moves when attackers are near it and stops when defenders contest it.
                    </p>
                    <div className="flex items-center text-sm text-gray-400">
                      <span className="mr-4">Maps: 6</span>
                      <span>Time: ~8 min</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="relative h-48">
                    <Image 
                      src="/images/game-info/control-mode.jpg" 
                      alt="Control Mode" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl text-white font-bold mb-2">CONTROL</h3>
                    <p className="text-gray-300 mb-4">
                      Teams fight to capture and hold a single objective. The first team to reach 100% control wins the round. Best of three rounds.
                    </p>
                    <div className="flex items-center text-sm text-gray-400">
                      <span className="mr-4">Maps: 5</span>
                      <span>Time: ~10 min</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="relative h-48">
                    <Image 
                      src="/images/game-info/hybrid-mode.jpg" 
                      alt="Hybrid Mode" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl text-white font-bold mb-2">HYBRID</h3>
                    <p className="text-gray-300 mb-4">
                      Attackers capture a point, then escort a payload to a delivery point. Defenders must stop them before time runs out.
                    </p>
                    <div className="flex items-center text-sm text-gray-400">
                      <span className="mr-4">Maps: 7</span>
                      <span>Time: ~8 min</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg overflow-hidden">
                  <div className="relative h-48">
                    <Image 
                      src="/images/game-info/assault-mode.jpg" 
                      alt="Assault Mode" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl text-white font-bold mb-2">ASSAULT</h3>
                    <p className="text-gray-300 mb-4">
                      Attackers capture two points on the map, while defenders try to hold them for as long as possible.
                    </p>
                    <div className="flex items-center text-sm text-gray-400">
                      <span className="mr-4">Maps: 4</span>
                      <span>Time: ~8 min</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Maps */}
          {activeTab === 'maps' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              <div>
                <h2 className="overwatch-heading text-3xl md:text-4xl text-white mb-6">GLOBAL <span className="text-primary-blue">BATTLEGROUNDS</span></h2>
                <p className="text-gray-300 mb-8 max-w-3xl">
                  Overwatch features maps set in stylized versions of real-world locations, each with unique layouts, hazards, and strategic opportunities.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div key={index} className="bg-gray-800 rounded-lg overflow-hidden">
                    <div className="relative h-48">
                      <Image 
                        src={`/images/game-info/map-${index}.jpg`} 
                        alt={`Overwatch Map ${index}`} 
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg text-white font-bold mb-1">MAP NAME {index}</h3>
                      <p className="text-sm text-gray-400 mb-2">Location • Game Mode</p>
                      <p className="text-gray-300 text-sm">
                        Brief description of the map, its unique features and strategic elements.
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <a href="#" className="px-6 py-3 bg-primary-blue hover:bg-primary-blue/90 text-white font-bold rounded-md transition-colors">
                  VIEW ALL MAPS
                </a>
              </div>
            </motion.div>
          )}

          {/* Hero Roles */}
          {activeTab === 'roles' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              <div>
                <h2 className="overwatch-heading text-3xl md:text-4xl text-white mb-6">HERO <span className="text-primary-blue">ROLES</span></h2>
                <p className="text-gray-300 mb-8 max-w-3xl">
                  Heroes in Overwatch are divided into three roles, each with a unique purpose on the battlefield. Understanding these roles is key to forming effective team compositions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-gray-800 rounded-lg overflow-hidden border-t-4 border-[#FF6B6B]">
                  <div className="relative h-48">
                    <Image 
                      src="/images/game-info/dps-role.jpg" 
                      alt="DPS Role" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl text-white font-bold mb-2">DAMAGE</h3>
                    <p className="text-gray-300 mb-4">
                      Damage heroes are responsible for dealing damage to the enemy team and securing eliminations. They typically have high mobility or burst damage capabilities.
                    </p>
                    <p className="text-gray-300 mb-4">
                      Examples: Tracer, Soldier: 76, Widowmaker, Genji
                    </p>
                    <a href="/heroes" className="text-primary-blue hover:underline font-semibold">
                      View DPS Heroes →
                    </a>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg overflow-hidden border-t-4 border-[#4D79FF]">
                  <div className="relative h-48">
                    <Image 
                      src="/images/game-info/tank-role.jpg" 
                      alt="Tank Role" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl text-white font-bold mb-2">TANK</h3>
                    <p className="text-gray-300 mb-4">
                      Tanks create space for their team and absorb damage. They have high health pools and abilities that protect themselves and allies.
                    </p>
                    <p className="text-gray-300 mb-4">
                      Examples: Reinhardt, D.Va, Winston, Zarya
                    </p>
                    <a href="/heroes" className="text-primary-blue hover:underline font-semibold">
                      View Tank Heroes →
                    </a>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg overflow-hidden border-t-4 border-[#43D24C]">
                  <div className="relative h-48">
                    <Image 
                      src="/images/game-info/support-role.jpg" 
                      alt="Support Role" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl text-white font-bold mb-2">SUPPORT</h3>
                    <p className="text-gray-300 mb-4">
                      Support heroes heal and buff their allies while providing utility. They can turn the tide of battle with well-timed abilities.
                    </p>
                    <p className="text-gray-300 mb-4">
                      Examples: Mercy, Lucio, Ana, Zenyatta
                    </p>
                    <a href="/heroes" className="text-primary-blue hover:underline font-semibold">
                      View Support Heroes →
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Progression */}
          {activeTab === 'progression' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="space-y-12"
            >
              <div>
                <h2 className="overwatch-heading text-3xl md:text-4xl text-white mb-6">PLAYER <span className="text-primary-blue">PROGRESSION</span></h2>
                <p className="text-gray-300 mb-8 max-w-3xl">
                  As you play Overwatch, you'll earn experience, level up, and unlock various cosmetic items to customize your heroes.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl text-white font-bold mb-4">LEVELING SYSTEM</h3>
                  <p className="text-gray-300 mb-4">
                    Gain experience points (XP) by playing matches, earning medals, and completing matches. Every time you level up, you'll receive a loot box containing cosmetic items.
                  </p>
                  <div className="bg-gray-700 rounded-lg p-4 mb-4">
                    <h4 className="text-white font-bold mb-2">XP SOURCES</h4>
                    <ul className="text-gray-300 space-y-2">
                      <li className="flex items-center">
                        <span className="w-4 h-4 bg-primary-blue/20 rounded-full flex items-center justify-center mr-2">
                          <span className="w-2 h-2 bg-primary-blue rounded-full"></span>
                        </span>
                        Match Completion: 250 XP
                      </li>
                      <li className="flex items-center">
                        <span className="w-4 h-4 bg-primary-blue/20 rounded-full flex items-center justify-center mr-2">
                          <span className="w-2 h-2 bg-primary-blue rounded-full"></span>
                        </span>
                        Match Victory: 500 XP
                      </li>
                      <li className="flex items-center">
                        <span className="w-4 h-4 bg-primary-blue/20 rounded-full flex items-center justify-center mr-2">
                          <span className="w-2 h-2 bg-primary-blue rounded-full"></span>
                        </span>
                        Medals: 50-150 XP
                      </li>
                      <li className="flex items-center">
                        <span className="w-4 h-4 bg-primary-blue/20 rounded-full flex items-center justify-center mr-2">
                          <span className="w-2 h-2 bg-primary-blue rounded-full"></span>
                        </span>
                        Consecutive Matches: 200 XP
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl text-white font-bold mb-4">COSMETIC ITEMS</h3>
                  <p className="text-gray-300 mb-4">
                    Customize your heroes with a variety of cosmetic items, including skins, emotes, victory poses, voice lines, and more.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h4 className="text-white font-bold mb-2">SKINS</h4>
                      <p className="text-gray-300 text-sm">
                        Change your hero's appearance with unique skins, ranging from simple recolors to complete model changes.
                      </p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h4 className="text-white font-bold mb-2">EMOTES</h4>
                      <p className="text-gray-300 text-sm">
                        Express yourself with character-specific animations that can be triggered during gameplay.
                      </p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h4 className="text-white font-bold mb-2">VICTORY POSES</h4>
                      <p className="text-gray-300 text-sm">
                        Customize how your hero appears on the victory screen after winning a match.
                      </p>
                    </div>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <h4 className="text-white font-bold mb-2">VOICE LINES</h4>
                      <p className="text-gray-300 text-sm">
                        Unlock unique voice lines that you can trigger during gameplay to communicate with your team.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Particles Effect */}
      <ParticlesEffect />
    </div>
  );
}

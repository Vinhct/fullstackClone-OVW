'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Character, CharacterRole } from '@/data/characters';
import { motion, AnimatePresence } from 'framer-motion';
import ParticlesEffect from '@/components/effects/ParticlesEffect';
import NeonGlowEffect from '@/components/effects/NeonGlowEffect';
import BackgroundEffect from '@/components/effects/BackgroundEffect';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import React from 'react';

// Flag để disable các hiệu ứng motion tránh lỗi khi không kết nối được Supabase Realtime
const SAFE_MODE = true;

// Định nghĩa interface cho hero từ Supabase
interface HeroFromDB {
  id: string;
  name: string;
  role: string;
  difficulty: number;
  bio: string;
  origin: string;
  quote: string;
  portrait_url: string;
  banner_url: string;
  video_url: string;
  bust_portrait_url: string;
  full_portrait_url: string;
  background_gradient: string[];
  role_icon_url?: string;
  ability_icons?: {
    [key: string]: string;
  };
  section_thumbnails?: {
    [key: string]: string;
  };
}

// Hàm chuyển đổi từ dữ liệu Supabase sang định dạng Character
function convertToCharacter(hero: HeroFromDB): Character {
  return {
    id: hero.id,
    name: hero.name,
    role: hero.role as CharacterRole,
    difficulty: hero.difficulty as 1 | 2 | 3,
    biography: hero.bio,
    origin: hero.origin,
    quote: hero.quote,
    abilities: [],
    bustPortrait: hero.bust_portrait_url || hero.portrait_url || '/images/valorant-hero-bg.jpg',
    fullPortrait: hero.full_portrait_url || hero.portrait_url || '/images/valorant-hero-bg.jpg',
    background: hero.banner_url || '/images/valorant-hero-bg.jpg',
    backgroundGradient: hero.background_gradient || ['#ff4655', '#1E3A8A'],
    roleIcon: hero.role_icon_url || `/images/roles/${hero.role.toLowerCase()}.png`,
    abilityIcons: hero.ability_icons || {},
    sectionThumbnails: hero.section_thumbnails || {}
  };
}

// Add this function before your component
const getImagePath = (path: string | null | undefined, characterId: string) => {
  if (!path || path.trim() === '') {
    return '/images/valorant-hero-bg.jpg';
  }
  
  // Handle special cases for default heroes
  if (characterId === 'jett' || characterId.includes('jett')) {
    return '/images/agents/jett/jett-full.png';
  }
  
  if (characterId === 'sage' || characterId.includes('sage')) {
    return '/images/agents/sage/sage-full.png';
  }
  
  if (path.startsWith('http')) return path;
  if (path.startsWith('/image/')) {
    const correctedPath = path.replace('/image/', '/images/');
    return correctedPath;
  }
  
  return path;
};

// Mock data for Jett
const mockJett = {
  id: 'jett',
  name: 'Jett',
  role: 'Duelist' as CharacterRole,
  difficulty: 2 as 1 | 2 | 3,
  origin: 'South Korea',
  biography: 'Representing her home country of South Korea, Jett\'s agile and evasive fighting style lets her take risks no one else can.',
  abilities: [],
  bustPortrait: '/images/agents/jett/jett-bust.png',
  fullPortrait: '/images/agents/jett/jett-full.png',
  background: '/images/valorant-hero-bg.jpg',
  backgroundGradient: ['#5ACEAE', '#7A95E1'],
  quote: 'They\'ll never know what hit them.',
  roleIcon: '/images/roles/duelist.png',
  abilityIcons: {
    'Q': '/images/abilities/jett/updraft.png',
    'E': '/images/abilities/jett/tailwind.png',
    'C': '/images/abilities/jett/cloudburst.png',
    'X': '/images/abilities/jett/blade-storm.png'
  },
  sectionThumbnails: {
    'overview': '/images/sections/jett/overview.jpg',
    'abilities': '/images/sections/jett/abilities.jpg'
  }
};

// Mock data for Sage
const mockSage = {
  id: 'sage',
  name: 'Sage',
  role: 'Sentinel' as CharacterRole,
  difficulty: 1 as 1 | 2 | 3,
  origin: 'China',
  biography: 'The stronghold of China, Sage creates safety for herself and her team wherever she goes.',
  abilities: [],
  bustPortrait: '/images/agents/sage/sage-bust.png',
  fullPortrait: '/images/agents/sage/sage-full.png',
  background: '/images/valorant-hero-bg.jpg',
  backgroundGradient: ['#33AACC', '#5580E7'],
  quote: 'I am both shield and sword.',
  roleIcon: '/images/roles/sentinel.png',
  abilityIcons: {
    'Q': '/images/abilities/sage/slow-orb.png',
    'E': '/images/abilities/sage/healing-orb.png',
    'C': '/images/abilities/sage/barrier-orb.png',
    'X': '/images/abilities/sage/resurrection.png'
  },
  sectionThumbnails: {
    'overview': '/images/sections/sage/overview.jpg',
    'abilities': '/images/sections/sage/abilities.jpg'
  }
};

// Mock data for Phoenix
const mockPhoenix = {
  id: 'phoenix',
  name: 'Phoenix',
  role: 'Duelist' as CharacterRole,
  difficulty: 1 as 1 | 2 | 3,
  origin: 'United Kingdom',
  biography: 'Hailing from the U.K., Phoenix\'s star power shines through in his fighting style, igniting the battlefield with flash and flare.',
  abilities: [],
  bustPortrait: '/images/valorant-hero-bg.jpg',
  fullPortrait: '/images/valorant-hero-bg.jpg',
  background: '/images/valorant-hero-bg.jpg',
  backgroundGradient: ['#FF9E4C', '#FF5A5A'],
  quote: 'Just take a deep breath, yeah?',
  roleIcon: '/images/roles/duelist.png',
  abilityIcons: {
    'Q': '/images/abilities/phoenix/curveball.png',
    'E': '/images/abilities/phoenix/hot-hands.png',
    'C': '/images/abilities/phoenix/blaze.png',
    'X': '/images/abilities/phoenix/run-it-back.png'
  },
  sectionThumbnails: {
    'overview': '/images/sections/phoenix/overview.jpg',
    'abilities': '/images/sections/phoenix/abilities.jpg'
  }
};

export default function HeroDetail({ params }: { params: { id: string } }) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [disableMotion, setDisableMotion] = useState(SAFE_MODE);
  const [connectionError, setConnectionError] = useState<boolean>(false);
  
  // Thêm một ref để kiểm tra xem component có còn mounted không
  const isMounted = useRef(true);

  useEffect(() => {
    // Đặt isMounted thành true khi component được mount
    isMounted.current = true;
    
    // Reset isMounted khi component unmount
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        if (!isMounted.current) return;
        
        setIsLoading(true);
        setError(null);
        const lowercaseId = params.id.toLowerCase();
        
        // Check connection to Supabase
        try {
          const { data, error } = await supabase.auth.getSession();
          if (error) {
            console.error('Supabase connection failed:', error);
            if (isMounted.current) {
              setConnectionError(true);
            }
          }
        } catch (connectionErr) {
          console.error('Supabase connection check failed:', connectionErr);
          if (isMounted.current) {
            setConnectionError(true);
          }
        }
        
        // Kiểm tra và lấy giá trị từ localStorage
        const cachedHeroes = localStorage.getItem('cached_heroes');
        if (cachedHeroes && isMounted.current) {
          try {
            const heroes = JSON.parse(cachedHeroes);
            
            // Tìm hero trong cache bằng nhiều cách (id chính xác, một phần của id, hoặc tên)
            const cachedHero = heroes.find((h: any) => 
              h.id?.toLowerCase() === lowercaseId || 
              h.id?.toLowerCase().includes(lowercaseId) ||
              lowercaseId.includes(h.id?.toLowerCase()) ||
              h.name?.toLowerCase() === lowercaseId ||
              h.name?.toLowerCase().includes(lowercaseId)
            );
            
            if (cachedHero && isMounted.current) {
              setCharacter(cachedHero);
              // Vẫn tiếp tục gọi API, nhưng đã hiển thị dữ liệu từ cache trước
            }
          } catch (e) {
            // Bỏ qua lỗi parsing
          }
        }
        
        try {
          // Lấy dữ liệu từ Supabase - thử với nhiều cách khác nhau
          
          // Method 1: Tìm chính xác theo id
          let { data, error } = await supabase
            .from('heroes')
            .select('*')
            .eq('id', lowercaseId)
            .maybeSingle();
            
          // Method 2: Nếu không có kết quả, thử tìm kiếm tương đối với ilike
          if (!data && !error) {
            const response = await supabase
              .from('heroes')
              .select('*')
              .ilike('id', `%${lowercaseId}%`)
              .limit(1);
              
            data = response.data?.[0];
            error = response.error;
          }
          
          // Method 3: Nếu vẫn không có, thử tìm kiếm theo name
          if (!data && !error) {
            const response = await supabase
              .from('heroes')
              .select('*')
              .ilike('name', `%${lowercaseId}%`)
              .limit(1);
              
            data = response.data?.[0];
            error = response.error;
          }
          
          // Method 4: Thử lấy bất kỳ hero nào để hiển thị
          if (!data && !error) {
            const response = await supabase
              .from('heroes')
              .select('*')
              .limit(1);
              
            data = response.data?.[0];
            error = response.error;
          }
          
          if (error) {
            throw error;
          }
          
          if (data && isMounted.current) {
            // Chuyển đổi từ dữ liệu Supabase sang định dạng Character
            const characterData = convertToCharacter(data);
            setCharacter(characterData);
            setIsLoading(false);
            return;
          }
        } catch (dbError) {
          console.error('Error fetching from Supabase:', dbError);
          if (isMounted.current) {
            setConnectionError(true);
          }
        }
        
        // Nếu vẫn không tìm thấy dữ liệu và chưa hiển thị từ cache
        if (!character && isMounted.current) {
          // Try to use static mock data
          if (lowercaseId === 'jett' || lowercaseId.includes('jett')) {
            setCharacter(mockJett);
            setIsLoading(false);
            return;
          }
          
          if (lowercaseId === 'sage' || lowercaseId.includes('sage')) {
            setCharacter(mockSage);
            setIsLoading(false);
            return;
          }
          
          if (lowercaseId === 'phoenix' || lowercaseId.includes('phoenix')) {
            setCharacter(mockPhoenix);
            setIsLoading(false);
            return;
          }
          
          // Ultimate fallback - create a generic hero
          const genericHero = {
            id: lowercaseId,
            name: lowercaseId.charAt(0).toUpperCase() + lowercaseId.slice(1),
            role: 'Unknown' as CharacterRole,
            difficulty: 1 as 1 | 2 | 3,
            origin: 'Unknown',
            biography: 'No information available for this character.',
            abilities: [],
            bustPortrait: '/images/valorant-hero-bg.jpg',
            fullPortrait: '/images/valorant-hero-bg.jpg',
            background: '/images/valorant-hero-bg.jpg',
            backgroundGradient: ['#3C7DFF', '#1E3A8A'],
            quote: ''
          };
          
          if (isMounted.current) {
            setCharacter(genericHero);
            setError('Hero not found in database. Displaying generic information.');
            setIsLoading(false);
          }
          return;
        }
      } catch (error) {
        console.error('Failed to fetch character:', error);
        if (isMounted.current) {
          setError('Failed to load character data');
          setConnectionError(true);
        
          // Nếu trong trường hợp lỗi mà chưa có character nào, hiển thị generic
          if (!character) {
            const genericHero = {
              id: params.id,
              name: params.id.charAt(0).toUpperCase() + params.id.slice(1),
              role: 'Unknown' as CharacterRole,
              difficulty: 1 as 1 | 2 | 3,
              origin: 'Unknown',
              biography: 'Error loading character information. Please try again later.',
              abilities: [],
              bustPortrait: '/images/valorant-hero-bg.jpg',
              fullPortrait: '/images/valorant-hero-bg.jpg',
              background: '/images/valorant-hero-bg.jpg',
              backgroundGradient: ['#FF4655', '#1E3A8A'],
              quote: ''
            };
            
            setCharacter(genericHero);
          }
        }
      } finally {
        // Thêm một chút độ trễ để tạo hiệu ứng loading
        if (isMounted.current) {
          setTimeout(() => {
            if (isMounted.current) {
              setIsLoading(false);
            }
          }, 800);
        }
      }
    };

    fetchCharacter();
    
    // Thiết lập realtime subscription để cập nhật khi hero thay đổi
    let channel: ReturnType<typeof supabase.channel> | undefined;
    try {
      channel = supabase
        .channel('hero-detail-changes')
        .on('postgres_changes', 
          { 
            event: '*',
            schema: 'public', 
            table: 'heroes',
            filter: `id=eq.${params.id}`
          }, 
          () => {
            if (isMounted.current) {
              fetchCharacter();
            }
          }
        )
        .subscribe((status) => {
          console.log('Realtime subscription status:', status);
          if (status === 'CHANNEL_ERROR' && isMounted.current) {
            console.error('Realtime channel error detected - switching to safe mode');
            setDisableMotion(true);
            setConnectionError(true);
          }
          if (status === 'SUBSCRIBED' && isMounted.current) {
            // Kết nối thành công, đặt connectionError về false
            setConnectionError(false);
            
            // Vẫn giữ chế độ an toàn nếu đã bật
            if (!SAFE_MODE) {
              setDisableMotion(false);
            }
          }
        });
    } catch (error) {
      console.error('Error setting up realtime subscription:', error);
      if (isMounted.current) {
        setDisableMotion(true);
        setConnectionError(true);
      }
    }

    return () => {
      // Đánh dấu component đã unmount
      isMounted.current = false;
      
      if (channel) {
        try {
          supabase.removeChannel(channel);
        } catch (error) {
          console.error('Error removing channel:', error);
        }
      }
    };
  }, [params.id]);

  // Tạo một component wrapper an toàn để xử lý motion
  const SafeMotionComponent = ({ children, ...props }: any) => {
    if (disableMotion) {
      // Nếu đã disabled motion, trả về children trong một div đơn giản
      return <div {...props}>{children}</div>;
    }
    
    // Nếu không, render với motion effect đầy đủ
    return <motion.div {...props}>{children}</motion.div>;
  };

  // Safe Wrapper for motion.div with background effect
  const BackgroundEffectSafe = ({ primaryColor }: { primaryColor: string }) => {
    if (disableMotion) return null;
    
    try {
      return (
        <div className="fixed inset-0 pointer-events-none -z-10">
          {React.createElement(() => {
            try {
              return (
                <BackgroundEffect 
                  primaryColor={primaryColor} 
                  secondaryColor="#000" 
                  speed={0.3} 
                  density={10} 
                />
              );
            } catch (error) {
              console.error("Error in BackgroundEffect render:", error);
              return null;
            }
          })}
        </div>
      );
    } catch (error) {
      console.error("Error rendering BackgroundEffectSafe:", error);
      return null;
    }
  };

  // Safe Wrapper for motion.div with particles effect
  const ParticlesEffectSafe = ({ primaryColor }: { primaryColor: string }) => {
    if (disableMotion) return null;
    
    try {
      return (
        <div className="fixed inset-0 pointer-events-none -z-10">
          {React.createElement(() => {
            try {
              return <ParticlesEffect count={20} color={primaryColor} />;
            } catch (error) {
              console.error("Error in ParticlesEffect render:", error);
              return null;
            }
          })}
        </div>
      );
    } catch (error) {
      console.error("Error rendering ParticlesEffectSafe:", error);
      return null;
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-900">
        <SafeMotionComponent
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="text-4xl font-bold text-white mb-4">
            LOADING HERO
          </div>
          <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
            <SafeMotionComponent
              className="h-full bg-overwatch-blue"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5 }}
            />
          </div>
        </SafeMotionComponent>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-900">
        <div className="text-center p-8 bg-gray-800 rounded-lg shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <p className="text-white mb-6">Character not found</p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-overwatch-blue text-white rounded hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <a href="/heroes" className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors inline-block">
              Back to Heroes
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Role colors mapping
  const roleColors: Record<string, string> = {
    'Tank': '#3C7DFF',
    'Damage': '#FF5C5C',
    'Support': '#44CC55',
    'Duelist': '#FF9E4C',
    'Sentinel': '#33AACC',
    'Controller': '#8C5EFF',
    'Initiator': '#FFD24C'
  };

  const primaryColor = character?.role ? roleColors[character.role] || '#ff4655' : '#ff4655';

  // Sử dụng SafeMotionComponent để render phần UI

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-24">
      {connectionError && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-red-900 text-white py-2 px-4 text-center">
          ❌ Supabase connection failed - realtime updates may not work
        </div>
      )}
      
      {/* Top Navigation Spacer */}
      <div className={`h-16 ${connectionError ? 'mt-8' : ''}`}></div>

      {/* Hero Banner Section */}
      <div className="relative h-[70vh] w-full overflow-hidden">
        {/* Background gradient overlay */}
        <div 
          className="absolute inset-0 z-0" 
          style={{ 
            background: `linear-gradient(to bottom, transparent, #000), 
                        linear-gradient(to right, ${character.backgroundGradient[0]}90, transparent)` 
          }}
        />
        
        {/* Hero background image */}
        <img 
          src={character.background} 
          alt={`${character.name} background`}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center top' }}
          loading="eager"
          onError={(e) => {
            e.currentTarget.src = '/images/valorant-hero-bg.jpg';
          }}
        />
        
        <div className="container mx-auto px-4 h-full relative z-10 flex flex-col justify-end pb-16">
          <div className="flex flex-col md:flex-row items-end gap-8">
            {/* Hero portrait/icon */}
            <SafeMotionComponent
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 shadow-lg"
              style={{ borderColor: primaryColor }}
            >
              <img
                src={character.bustPortrait}
                alt={character.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/images/valorant-hero-bg.jpg';
                }}
              />
            </SafeMotionComponent>
            
            <div>
              {/* Origin */}
              <SafeMotionComponent
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-sm font-medium uppercase tracking-widest mb-1"
                style={{ color: primaryColor }}
              >
                {character.origin || 'Unknown Origin'}
              </SafeMotionComponent>
              
              {/* Hero name with glow effect */}
              <SafeMotionComponent
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <NeonGlowEffect primaryColor={primaryColor} intensity={8}>
                  <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter">{character.name}</h1>
                </NeonGlowEffect>
              </SafeMotionComponent>
              
              {/* Role and difficulty */}
              <SafeMotionComponent
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center gap-4 mt-3"
              >
                <div 
                  className="px-4 py-1 rounded-md text-sm uppercase tracking-wider font-bold flex items-center gap-2"
                  style={{ backgroundColor: `${primaryColor}40`, border: `2px solid ${primaryColor}` }}
                >
                  <img 
                    src={character.roleIcon} 
                    alt={character.role}
                    className="w-4 h-4 object-contain"
                    onError={(e) => {
                      e.currentTarget.src = `/images/roles/${character.role.toLowerCase()}.png`;
                    }}
                  />
                  {character.role}
                </div>

                {character.difficulty !== undefined && (
                  <div className="flex items-center">
                    <span className="text-xs uppercase mr-2">Difficulty:</span>
                    <div className="flex">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div 
                          key={i}
                          className="w-2.5 h-2.5 rounded-sm mx-0.5"
                          style={{ 
                            backgroundColor: character.difficulty && i < character.difficulty ? primaryColor : 'rgba(255,255,255,0.2)',
                            boxShadow: character.difficulty && i < character.difficulty ? `0 0 8px ${primaryColor}` : 'none' 
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </SafeMotionComponent>
              
              {/* Quote */}
              {character.quote && (
                <SafeMotionComponent 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-lg italic mt-4 text-gray-300 max-w-2xl"
                >
                  "{character.quote}"
                </SafeMotionComponent>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-900 relative z-10">
        <div className="container mx-auto px-4 py-12">
          {/* Overview Section with Thumbnail */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold uppercase pb-2 border-b-2" style={{ borderColor: primaryColor }}>
                <span style={{ color: primaryColor }}>HERO</span> OVERVIEW
              </h2>
              {character.sectionThumbnails?.overview && (
                <img 
                  src={character.sectionThumbnails.overview}
                  alt="Overview thumbnail"
                  className="w-12 h-12 rounded-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/images/valorant-hero-bg.jpg';
                  }}
                />
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Biography */}
              <div className="md:col-span-2">
                <SafeMotionComponent 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 shadow-xl h-full"
                >
                  <h3 className="text-xl font-bold mb-4 uppercase" style={{ color: primaryColor }}>Biography</h3>
                  <p className="text-gray-300 leading-relaxed">{character.biography || 'No biography available for this hero.'}</p>
                </SafeMotionComponent>
              </div>
              
              {/* Hero Details - Stats Card */}
              <SafeMotionComponent
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 shadow-xl h-full">
                  <h3 className="text-xl font-bold mb-6 uppercase" style={{ color: primaryColor }}>Hero Details</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="text-sm text-gray-400 uppercase mb-1">Role</div>
                      <div className="font-bold text-lg" style={{ color: primaryColor }}>
                        {character.role}
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-400 uppercase mb-1">Origin</div>
                      <div className="font-bold">{character.origin || 'Unknown'}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-400 uppercase mb-1">Difficulty</div>
                      <div className="flex items-center">
                        <div className="flex mr-3">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <div 
                              key={i}
                              className="w-3 h-3 rounded-sm mx-0.5"
                              style={{ 
                                backgroundColor: character.difficulty && i < character.difficulty ? primaryColor : 'rgba(255,255,255,0.2)',
                                boxShadow: character.difficulty && i < character.difficulty ? `0 0 8px ${primaryColor}` : 'none' 
                              }}
                            />
                          ))}
                        </div>
                        <span>
                          {character.difficulty === 1 ? 'Easy' : 
                           character.difficulty === 2 ? 'Medium' : 
                           character.difficulty === 3 ? 'Hard' : 'Unknown'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </SafeMotionComponent>
            </div>
          </div>

          {/* Abilities Section with Thumbnail */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold uppercase pb-2 border-b-2" style={{ borderColor: primaryColor }}>
                <span style={{ color: primaryColor }}>HERO</span> ABILITIES
              </h2>
              {character.sectionThumbnails?.abilities && (
                <img 
                  src={character.sectionThumbnails.abilities}
                  alt="Abilities thumbnail"
                  className="w-12 h-12 rounded-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.src = '/images/valorant-hero-bg.jpg';
                  }}
                />
              )}
            </div>
            
            {character.abilities && character.abilities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {character.abilities.map((ability, index) => (
                  <SafeMotionComponent 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl"
                  >
                    <div className="flex">
                      <div 
                        className="w-24 h-24 flex items-center justify-center bg-gray-900" 
                        style={{ backgroundColor: `${primaryColor}20` }}
                      >
                        <div 
                          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
                          style={{ backgroundColor: primaryColor }}
                        >
                          {character.abilityIcons && character.abilityIcons[ability.key] ? (
                            <img 
                              src={character.abilityIcons[ability.key]} 
                              alt={ability.name}
                              className="w-10 h-10 object-contain"
                              onError={(e) => {
                                e.currentTarget.src = '/images/valorant-hero-bg.jpg';
                              }}
                            />
                          ) : (
                            <span>{ability.key}</span>
                          )}
                        </div>
                      </div>
                      <div className="p-4 flex-1">
                        <h3 className="font-bold text-lg uppercase" style={{ color: primaryColor }}>
                          {ability.name}
                        </h3>
                        <p className="text-gray-300 text-sm mt-2">
                          {ability.description}
                        </p>
                        {ability.cooldown && (
                          <div className="mt-3 text-sm text-gray-400">
                            Cooldown: {ability.cooldown}s
                          </div>
                        )}
                      </div>
                    </div>
                  </SafeMotionComponent>
                ))}
              </div>
            ) : (
              // Placeholder items
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Array.from({ length: 4 }).map((_, index) => (
                  <SafeMotionComponent 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl"
                  >
                    <div className="flex">
                      <div 
                        className="w-24 h-24 flex items-center justify-center bg-gray-900" 
                        style={{ backgroundColor: `${primaryColor}20` }}
                      >
                        <div 
                          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold"
                          style={{ backgroundColor: primaryColor }}
                        >
                          {index + 1}
                        </div>
                      </div>
                      <div className="p-4 flex-1">
                        <h3 className="font-bold text-lg uppercase" style={{ color: primaryColor }}>
                          {index === 0 ? 'Primary Ability' : 
                           index === 1 ? 'Secondary Ability' : 
                           index === 2 ? 'Special Ability' : 
                           'Ultimate Ability'}
                        </h3>
                        <p className="text-gray-300 text-sm mt-2">
                          Information not available for this ability
                        </p>
                      </div>
                    </div>
                  </SafeMotionComponent>
                ))}
              </div>
            )}
          </div>

          {/* Error Banner - Only shown when there's an error */}
          {error && (
            <SafeMotionComponent
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-4 bg-red-500/20 border border-red-500 rounded-lg text-center"
            >
              <p className="text-red-300">{error}</p>
              <p className="text-sm text-gray-400 mt-2">This is sample data. Connect to Supabase for real-time hero information.</p>
            </SafeMotionComponent>
          )}
          
          {/* Safe Mode Notice - Only shown when safe mode is active */}
          {disableMotion && (
            <div className="text-center mt-8 p-4 bg-blue-500/20 border border-blue-500 rounded-lg">
              <p className="text-blue-300">Running in safe mode with reduced animations due to Realtime connection issues</p>
            </div>
          )}
        </div>
      </div>

      {!disableMotion && (
        <>
          {/* Particle effects in background - chỉ hiển thị khi không ở safe mode */}
          <ParticlesEffect count={20} color={primaryColor} />
          
          {/* Floating geometric shapes in background - chỉ hiển thị khi không ở safe mode */}
          <BackgroundEffect primaryColor={primaryColor} secondaryColor="#000" speed={0.3} density={10} />
        </>
      )}
    </div>
  );
}

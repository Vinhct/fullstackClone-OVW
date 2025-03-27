'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ParticlesEffect from '@/components/effects/ParticlesEffect';
import GlitchEffect from '@/components/effects/GlitchEffect';
import NeonGlowEffect from '@/components/effects/NeonGlowEffect';
import { Character, CharacterRole, CHARACTERS } from '@/data/characters';
import { supabase, checkSupabaseConnection, checkHeroesTable, createSampleHero, reconnectRealtime, resetRealtimeConnection, pingSupabase, supabaseUrl, supabaseAnonKey, getHeroesDirectly } from '@/lib/supabase';
import HeroCard from './components/HeroCard';
import PageHeader from '@/components/PageHeader';
import mockHeroes from '@/data/mock-heroes.json';
import { MockApiService, isSupabaseAvailable } from '@/lib/mock-api-service';
import { initializeSupabase } from '@/lib/create-tables-api';

// Định nghĩa interface cho hero từ Supabase
interface HeroFromDB {
  id: string;
  name: string;
  role: string;
  difficulty: number;
  bio?: string;
  portrait_url?: string;
  banner_url?: string;
  video_url?: string;
}

// Hàm chuyển đổi từ dữ liệu Supabase sang định dạng Character
const convertToCharacter = (hero: HeroFromDB): Character => {
  // Xác định role hợp lệ
  let role: CharacterRole;
  const validRoles: CharacterRole[] = ['Tank', 'Damage', 'Support', 'Duelist', 'Sentinel', 'Controller', 'Initiator'];
  
  if (hero.role && validRoles.includes(hero.role as CharacterRole)) {
    role = hero.role as CharacterRole;
  } else {
    role = 'Duelist';
  }
  
  // Xác định difficulty hợp lệ
  let difficulty: 1 | 2 | 3;
  if (hero.difficulty && hero.difficulty >= 1 && hero.difficulty <= 3) {
    difficulty = hero.difficulty as 1 | 2 | 3;
  } else {
    difficulty = 1;
  }
  
  // Đảm bảo các URL hình ảnh có giá trị mặc định
  const portraitUrl = hero.portrait_url && hero.portrait_url.trim() !== '' 
    ? hero.portrait_url.trim() 
    : '/images/valorant-hero-bg.jpg';
    
  const bannerUrl = hero.banner_url && hero.banner_url.trim() !== ''
    ? hero.banner_url.trim()
    : '/images/valorant-hero-bg.jpg';
  
  // Tạo dữ liệu hero đã chuyển đổi
  return {
    id: hero.id || `unknown-${Math.random().toString(36).substring(2, 9)}`,
    name: hero.name || 'Unknown Hero',
    role: role,
    difficulty: difficulty,
    origin: 'Unknown',
    biography: hero.bio && hero.bio.trim() !== '' ? hero.bio : 'No biography available',
    abilities: [],
    bustPortrait: portraitUrl,
    fullPortrait: portraitUrl,
    background: bannerUrl,
    backgroundGradient: ['#3C7DFF', '#1E3A8A'],
    quote: ''
  };
};

export default function Heroes() {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCharacter, setHoveredCharacter] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error' | 'none'>('none');
  const [databaseStatus, setDatabaseStatus] = useState<'checking' | 'ready' | 'error' | 'none'>('none');
  const [debugMessage, setDebugMessage] = useState<string | null>(null);
  const [realtimeStatus, setRealtimeStatus] = useState<string>('UNKNOWN');

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

  // Hàm để tải dữ liệu hero từ Supabase
  const fetchHeroes = async () => {
    setIsLoading(true);
    setError(null);
    
    // Kiểm tra nếu có dữ liệu được lưu trong localStorage
    const savedHeroes = localStorage.getItem('cached_heroes');
    if (savedHeroes) {
      try {
        const parsedHeroes = JSON.parse(savedHeroes);
        if (Array.isArray(parsedHeroes) && parsedHeroes.length > 0) {
          setAllCharacters(parsedHeroes);
        }
      } catch (e) {
        localStorage.removeItem('cached_heroes');
      }
    }
    
    try {
      // Lấy dữ liệu từ Supabase
      const { data, error } = await supabase
        .from('heroes')
        .select('*');
      
      if (error) {
        throw error;
      }
      
      if (data && data.length > 0) {
        // Chuyển đổi dữ liệu
      const convertedCharacters = data.map((hero: HeroFromDB) => {
        return convertToCharacter(hero);
      });
      
        // Lưu dữ liệu vào localStorage
        try {
          localStorage.setItem('cached_heroes', JSON.stringify(convertedCharacters));
        } catch (e) {
          // Bỏ qua lỗi localStorage
        }
        
      setAllCharacters(convertedCharacters);
      } else if (allCharacters.length === 0) {
        // Nếu không có dữ liệu từ Supabase và không có dữ liệu cache, sử dụng dữ liệu mẫu
        addDefaultHeroes();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(`Lỗi: ${errorMessage}`);
      
      // Nếu không có dữ liệu cache, sử dụng dữ liệu mẫu
      if (allCharacters.length === 0) {
        addDefaultHeroes();
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  // Hàm thêm heroes mặc định
  const addDefaultHeroes = () => {
    const defaultHeroes: Character[] = [
      {
        id: 'jett',
        name: 'Jett',
        role: 'Duelist',
        difficulty: 2,
        origin: 'South Korea',
        biography: 'Representing her home country of South Korea, Jett\'s agile and evasive fighting style lets her take risks no one else can.',
        abilities: [],
        bustPortrait: '/images/agents/jett/jett-bust.png',
        fullPortrait: '/images/agents/jett/jett-full.png',
        background: '/images/valorant-hero-bg.jpg',
        backgroundGradient: ['#5ACEAE', '#7A95E1'],
        quote: 'They\'ll never know what hit them.'
      },
      {
        id: 'sage',
        name: 'Sage',
        role: 'Sentinel',
        difficulty: 1,
        origin: 'China',
        biography: 'The stronghold of China, Sage creates safety for herself and her team wherever she goes.',
        abilities: [],
        bustPortrait: '/images/agents/sage/sage-bust.png',
        fullPortrait: '/images/agents/sage/sage-full.png',
        background: '/images/valorant-hero-bg.jpg',
        backgroundGradient: ['#33AACC', '#5580E7'],
        quote: 'I am both shield and sword.'
      },
      {
        id: 'phoenix',
        name: 'Phoenix',
        role: 'Duelist',
        difficulty: 1,
        origin: 'United Kingdom',
        biography: 'Hailing from the U.K., Phoenix\'s star power shines through in his fighting style, igniting the battlefield with flash and flare.',
        abilities: [],
        bustPortrait: '/images/valorant-hero-bg.jpg',
        fullPortrait: '/images/valorant-hero-bg.jpg',
        background: '/images/valorant-hero-bg.jpg',
        backgroundGradient: ['#FF9E4C', '#FF5A5A'],
        quote: 'Just take a deep breath, yeah?'
      }
    ];
    
    setAllCharacters(defaultHeroes);
    try {
      localStorage.setItem('cached_heroes', JSON.stringify(defaultHeroes));
    } catch (e) {
      // Bỏ qua lỗi localStorage
    }
  };

  useEffect(() => {
    fetchHeroes();
    
    // Thiết lập realtime subscription để cập nhật khi dữ liệu thay đổi
    const channel = supabase
      .channel('heroes-changes')
      .on('postgres_changes', 
        { 
          event: '*',
          schema: 'public', 
          table: 'heroes'
        }, 
        () => {
          fetchHeroes();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Lọc heroes dựa trên vai trò và từ khóa tìm kiếm
  const filteredCharacters = allCharacters.filter(character => {
    const roleMatch = selectedRole ? character.role === selectedRole : true;
    const searchMatch = searchQuery.trim() === '' ? true : 
      character.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (character.biography && character.biography.toLowerCase().includes(searchQuery.toLowerCase()));
    return roleMatch && searchMatch;
  });

  // Lấy danh sách các vai trò duy nhất
  const uniqueRoles = Array.from(new Set(allCharacters.map(character => character.role))).sort();

  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="text-4xl font-bold text-white mb-4">
            LOADING HEROES
          </div>
          <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-overwatch-blue"
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5 }}
            />
          </div>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-900">
        <div className="text-center p-8 bg-gray-800 rounded-lg shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
          <p className="text-white mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-overwatch-blue text-white rounded hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Loại bỏ PageHeader */}

      <div className="min-h-screen bg-gray-900 text-white relative">
        {/* Particles effect */}
        <ParticlesEffect count={15} color="#3C7DFF" />
        
        {/* Hero Banner styled like Home section */}
        <section className="relative w-full overflow-hidden min-h-[60vh]">
          {/* Video Background */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="relative w-full h-full">
              <div 
                className="absolute inset-0 bg-center bg-cover"
                style={{
                  backgroundImage: "url('/images/overwatch-heroes-banner.jpg')",
                  backgroundSize: 'cover',
                  backgroundPosition: 'center top'
                }}
              ></div>
            </div>
            <div className="absolute inset-0 bg-overwatch-blue-dark/60 mix-blend-multiply"></div>
              
              {/* Overlay geometric shapes - Overwatch style */}
              <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 border-4 border-primary-blue/30 rounded-full opacity-50 animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/4 w-96 h-96 border-2 border-secondary-blue/20 rounded-full opacity-30 animate-ping" style={{animationDuration: '3s'}}></div>
                <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-accent-orange/10 rounded-full blur-xl animate-pulse" style={{animationDuration: '4s'}}></div>
              </div>
            </div>

            {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="valorant-container z-10 transition-all duration-1000 container mx-auto px-4 pt-20">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="overwatch-heading text-5xl md:text-6xl lg:text-7xl mb-4 text-white drop-shadow-lg"
              >
                OVER<span className="text-overwatch-blue">WATCH</span> <span className="text-overwatch-red">HEROES</span>
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="max-w-2xl"
              >
                <p className="text-base md:text-lg text-gray-200 mb-6 drop-shadow-md">
                  Choose your hero and master their unique abilities. Form teams and execute powerful strategies in this team-based action game.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Heroes section with Search & Filter + Grid */}
        <div className="bg-gray-900 pb-24">
          <div className="container mx-auto px-4">
            <div id="heroes-list" className="py-8">
              <div className="max-w-4xl mx-auto mb-8">
                {/* Search input */}
                <div className="flex mb-4">
                  <div className="flex-grow relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search heroes by name..."
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:border-overwatch-blue"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    </div>
                  </div>
                </div>

                {/* Role filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-6">
                  <button 
                    onClick={() => setSelectedRole(null)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedRole === null 
                        ? 'bg-overwatch-blue text-white' 
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    All
                  </button>
                  {uniqueRoles.map(role => (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedRole === role 
                          ? 'bg-overwatch-blue text-white' 
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Số lượng kết quả trả về */}
              <div className="text-sm text-gray-400 mb-6 flex items-center justify-between">
                <span>Hiển thị {filteredCharacters.length} heroes</span>
                <span className="text-xs">
                  {selectedRole ? `Bộ lọc: ${selectedRole}` : ''}
                  {searchQuery ? `${selectedRole ? ' | ' : ''}Tìm kiếm: "${searchQuery}"` : ''}
                </span>
            </div>
            
              <AnimatePresence>
                {filteredCharacters.length > 0 ? (
                <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.1
                        }
                      }
                    }}
                  >
                    {filteredCharacters.map((character, index) => (
                      <motion.div
                        key={character.id + index}
                        variants={{
                          hidden: { opacity: 0, y: 30 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.6 }}
                      >
                        <HeroCard
                          character={character}
                          roleColor={roleColors[character.role] || '#FF4655'}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-24"
                  >
                    <h3 className="text-2xl font-bold text-gray-400 mb-6">Không tìm thấy hero nào phù hợp</h3>
                      <button 
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedRole(null);
                        }}
                      className="px-6 py-3 bg-overwatch-blue hover:bg-blue-600 text-white rounded-md transition-colors"
                      >
                        Xóa bộ lọc
                      </button>
                  </motion.div>
                  )}
              </AnimatePresence>
              </div>
                        </div>
                      </div>
                      
        {/* Footer with links */}
        <div className="bg-gray-900 border-t border-gray-800 py-12">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-500 mb-4">Khám phá thêm về Valorant và các tựa game khác</p>
            <div className="flex justify-center space-x-8">
              <a href="https://playvalorant.com" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity">
                <img src="/images/valorant-logo.svg" alt="Valorant" className="h-8" />
              </a>
              <a href="https://blizzard.com" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 transition-opacity">
                <img src="/images/blizzard-logo.svg" alt="Blizzard" className="h-8" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

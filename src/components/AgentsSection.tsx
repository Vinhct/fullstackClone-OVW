'use client';

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { RealtimeChannel } from "@supabase/supabase-js";

interface Hero {
  id: string;
  name: string;
  role: string;
  difficulty: number;
  bio?: string;
  portrait_url?: string;
  banner_url?: string;
  video_url?: string;
}

const AgentsSection = () => {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);
  const [realtimeStatus, setRealtimeStatus] = useState<'connecting' | 'connected' | 'error' | 'none'>('none');

  // Định nghĩa fetchHeroes như một callback để có thể sử dụng lại
  const fetchHeroes = useCallback(async () => {
    try {
      console.log("Fetching heroes data...");
      setLoading(true);
      
      const { data, error } = await supabase
        .from('heroes')
        .select('*')
        .limit(3)
        .order('id', { ascending: false }); // Lấy 3 hero mới nhất
      
      if (error) {
        throw error;
      }
      
      console.log("Heroes data fetched:", data);
      setHeroes(data || []);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu heroes:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Định nghĩa setupRealtimeSubscription như một callback
  const setupRealtimeSubscription = useCallback(() => {
    console.log("Setting up realtime subscription...");
    setRealtimeStatus('connecting');
    
    let realtimeChannel: RealtimeChannel;
    
    try {
      realtimeChannel = supabase
        .channel('heroes-changes')
        .on('postgres_changes', 
          { 
            event: '*', // Lắng nghe tất cả các sự kiện (INSERT, UPDATE, DELETE)
            schema: 'public', 
            table: 'heroes' 
          }, 
          (payload) => {
            console.log('Nhận được thay đổi từ Supabase:', payload);
            
            // Khi có thay đổi, tải lại dữ liệu ngay lập tức
            fetchHeroes();
          }
        )
        .subscribe((status) => {
          console.log("Realtime subscription status:", status);
          
          if (status === 'SUBSCRIBED') {
            setRealtimeStatus('connected');
            console.log("Successfully subscribed to realtime changes!");
          } else if (status === 'CHANNEL_ERROR') {
            setRealtimeStatus('error');
            console.error("Failed to subscribe to realtime changes");
          }
        });
      
      return realtimeChannel;
    } catch (error) {
      console.error("Error setting up realtime subscription:", error);
      setRealtimeStatus('error');
      return null;
    }
  }, [fetchHeroes]);

  useEffect(() => {
    // Tải dữ liệu khi component mount
    fetchHeroes();
    
    // Thiết lập kênh realtime
    const realtimeChannel = setupRealtimeSubscription();

    // Thiết lập polling dự phòng (cứ 10 giây tải lại dữ liệu một lần)
    const pollingInterval = setInterval(() => {
      fetchHeroes();
    }, 10000);

    // Dọn dẹp subscription khi component unmount
    return () => {
      console.log("Cleaning up realtime subscription...");
      if (realtimeChannel) {
        supabase.removeChannel(realtimeChannel);
      }
      clearInterval(pollingInterval);
    };
  }, [fetchHeroes, setupRealtimeSubscription]);

  // Hàm lấy màu dựa trên vai trò
  const getRoleColor = (role: string) => {
    const roleColors: Record<string, string> = {
      'Tank': 'bg-yellow-500',
      'Damage': 'bg-red-500',
      'Support': 'bg-green-500'
    };
    return roleColors[role] || 'bg-blue-500';
  };

  // Test realtime function manually - Chỉ để kiểm tra
  const testRealtime = async () => {
    try {
      const randomHeroName = `Test Hero ${Math.floor(Math.random() * 1000)}`;
      const { data, error } = await supabase
        .from('heroes')
        .insert([{
          name: randomHeroName,
          role: 'Damage',
          difficulty: 1,
          bio: 'Test hero for realtime',
          portrait_url: '',
          banner_url: '',
          video_url: ''
        }])
        .select();
      
      if (error) throw error;
      console.log("Test hero created:", data);
      
      // Realtime should handle this, but we'll trigger a refresh anyway
      setTimeout(() => fetchHeroes(), 1000);
    } catch (error) {
      console.error("Error testing realtime:", error);
    }
  };

  // Hàm thử lại kết nối realtime
  const retryRealtimeConnection = () => {
    setupRealtimeSubscription();
  };

  // Phần còn lại của component (với một số thay đổi để hiển thị trạng thái)
  return (
    <section className="py-20 bg-overwatch-blue-dark text-white relative overflow-hidden">
      {/* Background geometric elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-overwatch-blue opacity-10 rounded-full transform -translate-y-1/4 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-overwatch-blue-light opacity-10 rounded-full transform translate-y-1/4 -translate-x-1/4"></div>
      
      {/* Hexagon patterns - Overwatch style */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-10 left-1/4 w-32 h-32 border-2 border-overwatch-blue rotate-45"></div>
        <div className="absolute bottom-20 right-1/3 w-40 h-40 border-2 border-overwatch-blue rotate-12"></div>
        <div className="absolute top-1/2 left-10 w-24 h-24 border-2 border-overwatch-blue rotate-30"></div>
      </div>

      <div className="valorant-container relative z-10">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 mb-10 lg:mb-0 order-2 lg:order-1">
            <h2 className="overwatch-heading text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight leading-none mb-8">
              YOUR HEROES
            </h2>
            <p className="overwatch-subheading uppercase text-lg mb-6">
              THE WORLD NEEDS HEROES
            </p>
            <p className="mb-8 text-white/90 leading-relaxed max-w-lg">
              Join the fight for the future in a world where every battle counts. Choose your hero from a diverse cast of soldiers, scientists, adventurers, and oddities. Bend time, defy physics, and unleash a dizzying array of extraordinary powers and weapons.
            </p>
            <div className="flex space-x-4">
              <Link href="/heroes" className="overwatch-btn-secondary">
                VIEW ALL HEROES
              </Link>
              
              {/* Hiển thị trạng thái realtime - chỉ để debug */}
              {process.env.NODE_ENV === 'development' && (
                <>
                  <button 
                    onClick={testRealtime} 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                  >
                    Test Realtime
                  </button>
                  
                  {realtimeStatus === 'error' && (
                    <button 
                      onClick={retryRealtimeConnection} 
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                    >
                      Retry Connection
                    </button>
                  )}
                </>
              )}
            </div>
            
            {/* Hiển thị trạng thái debug - chỉ trong môi trường development */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-4 p-2 bg-gray-800/50 rounded text-xs text-gray-300">
                <p>Realtime status: {realtimeStatus}</p>
                <p>Heroes count: {heroes.length}</p>
                <p>Last update: {new Date().toLocaleTimeString()}</p>
              </div>
            )}
          </div>
          <div className="lg:w-1/2 order-1 lg:order-2 flex justify-center lg:justify-end">
            {loading ? (
              <div className="w-full max-w-md h-[500px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : heroes.length > 0 ? (
              <div className="relative w-full max-w-md">
                <div className="grid grid-cols-1 gap-6">
                  {heroes.map((hero, index) => (
                    <div key={hero.id} className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 flex items-center transform hover:scale-105 transition-transform">
                      <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700 mr-4 flex-shrink-0">
                        {hero.portrait_url ? (
                          <Image
                            src={hero.portrait_url}
                            alt={hero.name}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No img
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-xl">{hero.name}</h3>
                        <div className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${getRoleColor(hero.role)}`}>
                          {hero.role}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Hero ability visual effects */}
                <div className="absolute top-1/4 -left-10 w-20 h-20 bg-overwatch-blue opacity-30 blur-lg rounded-full"></div>
                <div className="absolute bottom-1/3 right-0 w-16 h-16 bg-overwatch-orange opacity-30 blur-lg rounded-full"></div>
              </div>
            ) : (
              <div className="relative w-full max-w-md">
                <Image
                  src="/images/agents-group.png"
                  alt="Overwatch Heroes"
                  width={600}
                  height={700}
                  className="object-contain"
                />

                {/* Hero ability visual effects */}
                <div className="absolute top-1/4 -left-10 w-20 h-20 bg-overwatch-blue opacity-30 blur-lg rounded-full"></div>
                <div className="absolute bottom-1/3 right-0 w-16 h-16 bg-overwatch-orange opacity-30 blur-lg rounded-full"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AgentsSection;

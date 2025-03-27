'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { PlusCircle, Edit, Trash2, Search, Map, Gamepad2, Info } from 'lucide-react';
import Link from 'next/link';

interface GameInfo {
  id: string;
  type: string;
  title: string;
  description?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export default function GameInfoManagementPage() {
  const [gameInfoItems, setGameInfoItems] = useState<GameInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchGameInfo();
  }, []);

  async function fetchGameInfo() {
    setLoading(true);
    try {
      // Trong môi trường thực tế, bạn sẽ thay thế dữ liệu mẫu này bằng dữ liệu từ Supabase
      // const { data, error } = await supabase.from('game_info').select('*');
      // if (error) throw error;
      // setGameInfoItems(data || []);
      
      // Dữ liệu mẫu cho demo
      setGameInfoItems([
        {
          id: '1',
          type: 'map',
          title: 'King\'s Row',
          description: 'Bản đồ tấn công/hộ tống ở London, Anh Quốc với kiến trúc cổ điển và khu phố Omnic',
          image_url: '/images/maps/kings-row.jpg',
          created_at: '2025-01-15T10:30:00Z',
          updated_at: '2025-02-20T14:45:00Z'
        },
        {
          id: '2',
          type: 'map',
          title: 'Hanamura',
          description: 'Bản đồ tấn công ở Nhật Bản với lâu đài truyền thống và vườn hoa anh đào',
          image_url: '/images/maps/hanamura.jpg',
          created_at: '2025-01-18T09:15:00Z',
          updated_at: '2025-02-22T11:30:00Z'
        },
        {
          id: '3',
          type: 'gamemode',
          title: 'Escort',
          description: 'Chế độ chơi nơi đội tấn công phải hộ tống một phương tiện đến đích, trong khi đội phòng thủ cố gắng ngăn chặn',
          image_url: '/images/gamemodes/escort.jpg',
          created_at: '2025-01-20T13:45:00Z',
          updated_at: '2025-02-25T16:20:00Z'
        },
        {
          id: '4',
          type: 'gamemode',
          title: 'Control',
          description: 'Chế độ chơi nơi hai đội chiến đấu để kiểm soát một điểm trung tâm trên bản đồ',
          image_url: '/images/gamemodes/control.jpg',
          created_at: '2025-01-22T15:30:00Z',
          updated_at: '2025-02-27T10:15:00Z'
        },
        {
          id: '5',
          type: 'overview',
          title: 'Giới thiệu Game',
          description: 'Tổng quan về Overwatch, một tựa game bắn súng đội nhóm với nhiều anh hùng có khả năng độc đáo',
          image_url: '/images/overview/intro.jpg',
          created_at: '2025-01-25T11:00:00Z',
          updated_at: '2025-03-01T09:30:00Z'
        }
      ]);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu game info:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredItems = gameInfoItems.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && item.type === filter;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'map':
        return <Map className="w-5 h-5 text-blue-500" />;
      case 'gamemode':
        return <Gamepad2 className="w-5 h-5 text-purple-500" />;
      case 'overview':
        return <Info className="w-5 h-5 text-green-500" />;
      default:
        return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Game Info</h1>
        <Link 
          href="/admin/game-info/create" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Thêm thông tin mới
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Tìm kiếm theo tiêu đề hoặc mô tả..."
              className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md ${filter === 'all' ? 'bg-gray-200 text-gray-800' : 'bg-white text-gray-600 border'}`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setFilter('map')}
              className={`px-4 py-2 rounded-md flex items-center ${filter === 'map' ? 'bg-blue-100 text-blue-800' : 'bg-white text-gray-600 border'}`}
            >
              <Map className="w-4 h-4 mr-1" /> Maps
            </button>
            <button
              onClick={() => setFilter('gamemode')}
              className={`px-4 py-2 rounded-md flex items-center ${filter === 'gamemode' ? 'bg-purple-100 text-purple-800' : 'bg-white text-gray-600 border'}`}
            >
              <Gamepad2 className="w-4 h-4 mr-1" /> Game Modes
            </button>
            <button
              onClick={() => setFilter('overview')}
              className={`px-4 py-2 rounded-md flex items-center ${filter === 'overview' ? 'bg-green-100 text-green-800' : 'bg-white text-gray-600 border'}`}
            >
              <Info className="w-4 h-4 mr-1" /> Overview
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 overflow-hidden">
                  {item.image_url ? (
                    <img 
                      src={item.image_url} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    {getTypeIcon(item.type)}
                    <span className={`ml-2 text-xs font-semibold px-2 py-1 rounded-full ${
                      item.type === 'map' ? 'bg-blue-100 text-blue-800' :
                      item.type === 'gamemode' ? 'bg-purple-100 text-purple-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  {item.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                  )}
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Cập nhật: {formatDate(item.updated_at)}</span>
                    <div className="flex space-x-2">
                      <Link href={`/admin/game-info/edit/${item.id}`} className="text-indigo-600 hover:text-indigo-900">
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button 
                        onClick={() => {
                          if (window.confirm('Bạn có chắc chắn muốn xóa mục này?')) {
                            // Xử lý xóa game info
                            console.log('Xóa game info:', item.id);
                          }
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

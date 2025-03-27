'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { PlusCircle, Edit, Trash2, Search } from 'lucide-react';
import Link from 'next/link';

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

export default function HeroesManagementPage() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHeroes();
  }, []);

  async function fetchHeroes() {
    setLoading(true);
    setError(null);
    try {
      // Lấy dữ liệu từ Supabase
      const { data, error } = await supabase.from('heroes').select('*');
      
      if (error) {
        throw error;
      }
      
      setHeroes(data || []);
    } catch (err: any) {
      console.error('Lỗi khi tải dữ liệu heroes:', err);
      setError(err.message || 'Có lỗi xảy ra khi tải dữ liệu heroes');
    } finally {
      setLoading(false);
    }
  }

  async function deleteHero(id: string) {
    if (!window.confirm('Bạn có chắc chắn muốn xóa hero này?')) {
      return;
    }
    
    try {
      console.log("Đang xóa hero có ID:", id);
      
      // Thử ping trước khi xóa
      console.log("Kiểm tra kết nối Supabase trước khi xóa...");
      const pingResponse = await supabase.from('heroes').select('id').limit(1);
      console.log("Kết nối Supabase:", pingResponse.status ? "OK" : "Lỗi");
      
      // Thêm các tùy chọn chi tiết hơn cho request DELETE
      const { error, status, statusText, data } = await supabase
        .from('heroes')
        .delete()
        .eq('id', id)
        .select(); // Thêm select để nhận phản hồi đầy đủ
      
      console.log("Kết quả xóa hero:", { status, statusText, error, data });
      
      if (error) {
        throw error;
      }
      
      console.log("Hero đã được xóa thành công.");
      
      // Cập nhật UI ngay lập tức
      setHeroes(prev => prev.filter(hero => hero.id !== id));
      
      // Force re-fetch để đảm bảo dữ liệu đồng bộ
      setTimeout(() => {
        fetchHeroes();
      }, 500);
    } catch (err: any) {
      console.error('Lỗi khi xóa hero:', err);
      alert(`Lỗi khi xóa hero: ${err.message || 'Không xác định'}`);
      // Tải lại dữ liệu để đảm bảo UI đồng bộ với DB
      fetchHeroes();
    }
  }

  const filteredHeroes = heroes.filter(hero => 
    hero.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hero.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDifficultyStars = (difficulty: number) => {
    return '★'.repeat(difficulty) + '☆'.repeat(3 - difficulty);
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Heroes</h1>
        <Link 
          href="/admin/heroes/create" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Thêm Hero mới
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc vai trò..."
            className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : heroes.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500 mb-4">Chưa có hero nào. Hãy thêm hero đầu tiên!</p>
            <Link 
              href="/admin/heroes/create" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Thêm Hero mới
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hình ảnh
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tên
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vai trò
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Độ khó
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mô tả
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredHeroes.map((hero) => (
                  <tr key={hero.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-12 w-12 rounded-md overflow-hidden bg-gray-100">
                        {hero.portrait_url ? (
                          <img 
                            src={hero.portrait_url} 
                            alt={hero.name} 
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-400">
                            No image
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{hero.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        hero.role === 'Tank' ? 'bg-yellow-100 text-yellow-800' :
                        hero.role === 'Damage' ? 'bg-red-100 text-red-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {hero.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{getDifficultyStars(hero.difficulty)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 truncate max-w-xs">{hero.bio}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <Link href={`/admin/heroes/edit/${hero.id}`} className="text-indigo-600 hover:text-indigo-900">
                          <Edit className="w-5 h-5" />
                        </Link>
                        <button 
                          onClick={() => deleteHero(hero.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

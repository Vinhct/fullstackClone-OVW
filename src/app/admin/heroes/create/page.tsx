'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import MediaGallery from '@/components/admin/MediaGallery';
import { STORAGE_BUCKETS } from '@/lib/supabase-storage';

interface HeroFormData {
  name: string;
  role: string;
  difficulty: number;
  bio: string;
  portrait_url: string;
  banner_url: string;
  video_url: string;
}

export default function CreateHeroPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<HeroFormData>({
    name: '',
    role: 'Damage',
    difficulty: 1,
    bio: '',
    portrait_url: '',
    banner_url: '',
    video_url: ''
  });
  const [showMediaGallery, setShowMediaGallery] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'difficulty' ? parseInt(value) : value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      console.log("Tạo hero mới:", formData);
      
      // Kiểm tra kết nối Supabase trước
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError) {
        throw new Error(`Kết nối Supabase thất bại: ${sessionError.message}`);
      }

      // Thêm dữ liệu vào Supabase
      const { data, error } = await supabase
        .from('heroes')
        .insert([{
          name: formData.name,
          role: formData.role,
          difficulty: formData.difficulty,
          bio: formData.bio,
          portrait_url: formData.portrait_url || null,
          banner_url: formData.banner_url || null,
          video_url: formData.video_url || null
        }])
        .select();
      
      if (error) {
        console.error('Lỗi Supabase:', error);
        throw new Error(`Lỗi khi tạo hero: ${error.message}`);
      }

      if (!data || data.length === 0) {
        throw new Error('Không nhận được dữ liệu phản hồi từ Supabase');
      }

      console.log('Hero đã được tạo:', data);
      
      // Chuyển hướng về trang quản lý heroes
      router.push('/admin/heroes');
    } catch (err: any) {
      console.error('Lỗi khi tạo hero:', err);
      setError(err.message || 'Có lỗi xảy ra khi tạo hero. Vui lòng thử lại.');
      
      // Hiển thị thông báo lỗi chi tiết hơn
      if (err.message.includes('duplicate key')) {
        setError('Hero với tên này đã tồn tại. Vui lòng chọn tên khác.');
      } else if (err.message.includes('connection')) {
        setError('Không thể kết nối đến cơ sở dữ liệu. Vui lòng kiểm tra kết nối internet và thử lại.');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Create New Hero</h1>
          <Link href="/admin/heroes" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors">
            Back to Heroes
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg">
          {error && (
            <div className="p-3 bg-red-500/20 border border-red-500 rounded-md text-red-200">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-medium">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="Tank">Tank</option>
                <option value="Damage">Damage</option>
                <option value="Support">Support</option>
                <option value="Duelist">Duelist</option>
                <option value="Sentinel">Sentinel</option>
                <option value="Controller">Controller</option>
                <option value="Initiator">Initiator</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Difficulty (1-3)</label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value={1}>1 - Easy</option>
                <option value={2}>2 - Medium</option>
                <option value={3}>3 - Hard</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Portrait URL</label>
              <div className="flex">
                <input
                  type="text"
                  name="portrait_url"
                  value={formData.portrait_url}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="button"
                  onClick={() => setShowMediaGallery('portrait')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                >
                  Browse
                </button>
              </div>
              {formData.portrait_url && (
                <div className="mt-2 relative w-32 h-32 border border-gray-600 rounded-md overflow-hidden">
                  <Image 
                    src={formData.portrait_url} 
                    alt="Portrait preview" 
                    fill 
                    className="object-cover" 
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium">Banner URL</label>
              <div className="flex">
                <input
                  type="text"
                  name="banner_url"
                  value={formData.banner_url}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="button"
                  onClick={() => setShowMediaGallery('banner')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                >
                  Browse
                </button>
              </div>
              {formData.banner_url && (
                <div className="mt-2 relative w-full h-24 border border-gray-600 rounded-md overflow-hidden">
                  <Image 
                    src={formData.banner_url} 
                    alt="Banner preview" 
                    fill 
                    className="object-cover" 
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block mb-2 font-medium">Video URL</label>
              <div className="flex">
                <input
                  type="text"
                  name="video_url"
                  value={formData.video_url}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="button"
                  onClick={() => setShowMediaGallery('video')}
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
                >
                  Browse
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <div className="flex justify-end space-x-4">
            <Link
              href="/admin/heroes"
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
              disabled={saving}
            >
              {saving ? 'Creating...' : 'Create Hero'}
            </button>
          </div>
        </form>
      </div>

      {/* Media Gallery Modal */}
      {showMediaGallery && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg w-full max-w-4xl max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-xl font-bold">Media Gallery</h3>
              <button 
                onClick={() => setShowMediaGallery(null)}
                className="text-gray-400 hover:text-white"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[calc(80vh-80px)]">
              <MediaGallery 
                bucket={STORAGE_BUCKETS.HEROES}
                onSelect={(url) => {
                  if (showMediaGallery === 'portrait') {
                    setFormData({...formData, portrait_url: url});
                  } else if (showMediaGallery === 'banner') {
                    setFormData({...formData, banner_url: url});
                  } else if (showMediaGallery === 'video') {
                    setFormData({...formData, video_url: url});
                  }
                  setShowMediaGallery(null);
                }}
                showUploader={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

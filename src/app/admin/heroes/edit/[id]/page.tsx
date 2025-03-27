'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import MediaGallery from '@/components/admin/MediaGallery';
import { STORAGE_BUCKETS } from '@/lib/supabase-storage';

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

export default function EditHeroPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMediaGallery, setShowMediaGallery] = useState<string | null>(null);
  const [formData, setFormData] = useState<Hero>({
    id: '',
    name: '',
    role: 'Damage',
    difficulty: 1,
    bio: '',
    portrait_url: '',
    banner_url: '',
    video_url: ''
  });

  useEffect(() => {
    if (id) {
      fetchHero(id);
    }
  }, [id]);

  async function fetchHero(heroId: string) {
    setLoading(true);
    setError(null);
    try {
      // Lấy dữ liệu từ Supabase
      const { data, error } = await supabase.from('heroes').select('*').eq('id', heroId).single();
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setFormData(data);
      } else {
        setError('Không tìm thấy hero với ID này');
        setTimeout(() => {
          router.push('/admin/heroes');
        }, 2000);
      }
    } catch (err: any) {
      console.error('Lỗi khi tải dữ liệu hero:', err);
      setError(err.message || 'Có lỗi xảy ra khi tải dữ liệu hero');
      setTimeout(() => {
        router.push('/admin/heroes');
      }, 2000);
    } finally {
      setLoading(false);
    }
  }

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
      console.log("Cập nhật hero:", id);
      console.log("Dữ liệu gửi đi:", formData);
      
      // Cập nhật dữ liệu vào Supabase
      const { data, error } = await supabase
        .from('heroes')
        .update({
          name: formData.name,
          role: formData.role,
          difficulty: formData.difficulty,
          bio: formData.bio,
          portrait_url: formData.portrait_url,
          banner_url: formData.banner_url,
          video_url: formData.video_url
        })
        .eq('id', id)
        .select();
      
      if (error) {
        throw error;
      }

      console.log('Hero đã được cập nhật:', data);
      console.log('Đã gửi sự kiện Realtime cho hero với ID:', id);
      
      // Chuyển hướng về trang quản lý heroes
      router.push('/admin/heroes');
    } catch (err: any) {
      console.error('Lỗi khi cập nhật hero:', err);
      setError(err.message || 'Có lỗi xảy ra khi cập nhật hero. Vui lòng thử lại.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex items-center mb-6">
        <Link href="/admin/heroes" className="mr-4">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold">Chỉnh sửa Hero: {formData.name}</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Tên Hero <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>

              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                  Vai trò <span className="text-red-500">*</span>
                </label>
                <select
                  id="role"
                  name="role"
                  required
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
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
                <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                  Độ khó <span className="text-red-500">*</span>
                </label>
                <select
                  id="difficulty"
                  name="difficulty"
                  required
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                >
                  <option value={1}>★☆☆ (Dễ)</option>
                  <option value={2}>★★☆ (Trung bình)</option>
                  <option value={3}>★★★ (Khó)</option>
                </select>
              </div>

              <div>
                <label htmlFor="portrait_url" className="block text-sm font-medium text-gray-700 mb-1">
                  URL Hình chân dung
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="portrait_url"
                    name="portrait_url"
                    value={formData.portrait_url || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="https://example.com/image.jpg"
                  />
                  <button
                    type="button"
                    className="bg-gray-100 border border-l-0 rounded-r-md px-3 hover:bg-gray-200"
                    onClick={() => setShowMediaGallery('portrait')}
                  >
                    <Upload className="w-5 h-5" />
                  </button>
                </div>
                {formData.portrait_url && (
                  <div className="mt-2 relative w-32 h-32 border border-gray-300 rounded-md overflow-hidden">
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
                <label htmlFor="banner_url" className="block text-sm font-medium text-gray-700 mb-1">
                  URL Hình banner
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="banner_url"
                    name="banner_url"
                    value={formData.banner_url || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="https://example.com/banner.jpg"
                  />
                  <button
                    type="button"
                    className="bg-gray-100 border border-l-0 rounded-r-md px-3 hover:bg-gray-200"
                    onClick={() => setShowMediaGallery('banner')}
                  >
                    <Upload className="w-5 h-5" />
                  </button>
                </div>
                {formData.banner_url && (
                  <div className="mt-2 relative w-full h-24 border border-gray-300 rounded-md overflow-hidden">
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
                <label htmlFor="video_url" className="block text-sm font-medium text-gray-700 mb-1">
                  URL Video
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="video_url"
                    name="video_url"
                    value={formData.video_url || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                    placeholder="https://example.com/video.mp4"
                  />
                  <button
                    type="button"
                    className="bg-gray-100 border border-l-0 rounded-r-md px-3 hover:bg-gray-200"
                    onClick={() => setShowMediaGallery('video')}
                  >
                    <Upload className="w-5 h-5" />
                  </button>
                </div>
                {formData.video_url && (
                  <div className="mt-2">
                    <div className="text-sm text-blue-600 truncate">
                      {formData.video_url.split('/').pop()}
                    </div>
                    {formData.video_url.toLowerCase().endsWith('.mp4') && (
                      <div className="mt-1 relative w-full h-24 border border-gray-300 rounded-md overflow-hidden">
                        <video
                          src={formData.video_url}
                          controls
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                Tiểu sử
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={10}
                value={formData.bio || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Link
              href="/admin/heroes"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 mr-2 hover:bg-gray-50"
            >
              Hủy
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
            >
              {saving ? (
                <span className="inline-block mr-2 h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
              ) : (
                <Save className="w-5 h-5 mr-2" />
              )}
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>

      {/* Media Gallery Modal */}
      {showMediaGallery && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-xl font-bold">Thư viện Media</h3>
              <button 
                onClick={() => setShowMediaGallery(null)}
                className="text-gray-500 hover:text-gray-700"
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

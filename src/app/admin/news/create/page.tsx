'use client';

import React, { useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Image, Calendar, Upload, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function CreateNewsPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    category: '',
    image_url: '',
    published: false,
    publish_date: new Date().toISOString().slice(0, 16) // Format: "YYYY-MM-DDThh:mm"
  });
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Kiểm tra kích thước tệp tin (giới hạn 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setUploadError('Kích thước tệp tin quá lớn. Vui lòng chọn tệp nhỏ hơn 2MB.');
      return;
    }
    
    // Kiểm tra loại tệp tin
    if (!file.type.startsWith('image/')) {
      setUploadError('Vui lòng chọn tệp hình ảnh hợp lệ (JPG, PNG, GIF).');
      return;
    }

    setUploading(true);
    setUploadError(null);

    try {
      // Tạo URL xem trước
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);

      // Tạo đường dẫn lưu trữ với thời gian hiện tại để tránh trùng lặp
      const timestamp = new Date().getTime();
      const fileExt = file.name.split('.').pop();
      const fileName = `${timestamp}-${Math.random().toString(36).substring(2, 11)}.${fileExt}`;
      const filePath = `news/${fileName}`;

      // Tải lên Storage
      const { data, error } = await supabase.storage
        .from('news-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) throw error;

      // Lấy URL công khai
      const { data: publicURL } = supabase.storage
        .from('news-images')
        .getPublicUrl(filePath);

      // Cập nhật URL hình ảnh trong form
      setFormData(prev => ({ ...prev, image_url: publicURL.publicUrl }));
    } catch (error) {
      console.error('Lỗi khi tải hình ảnh:', error);
      setUploadError(`Lỗi khi tải hình ảnh: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setUploading(false);
    }
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Chuẩn bị dữ liệu
      const newsData = {
        ...formData,
        // Đảm bảo publish_date là một chuỗi ISO nếu đã cung cấp
        publish_date: formData.publish_date ? new Date(formData.publish_date).toISOString() : null
      };

      // Thêm dữ liệu vào Supabase
      const { data, error } = await supabase
        .from('news')
        .insert([newsData])
        .select();

      if (error) throw error;

      // Chuyển hướng về trang quản lý tin tức
      router.push('/admin/news');
      router.refresh();
    } catch (error) {
      console.error('Lỗi khi tạo tin tức:', error);
      setError(`Lỗi khi tạo tin tức: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  // Danh sách các danh mục
  const categories = [
    'Heroes',
    'Maps',
    'Events',
    'Game Updates',
    'Esports',
    'Community'
  ];

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-6">
        <Link href="/admin/news" className="text-blue-600 hover:text-blue-800 flex items-center">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Quay lại trang quản lý
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">Thêm bài viết mới</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tiêu đề <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              placeholder="Nhập tiêu đề bài viết"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tóm tắt
            </label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleInputChange}
              rows={2}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              placeholder="Nhập tóm tắt nội dung bài viết"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Danh mục
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hình ảnh
            </label>
            <div className="space-y-3">
              <div className="flex">
                <input
                  type="text"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  placeholder="/images/news/your-image.jpg"
                />
                <button
                  type="button"
                  onClick={handleImageUploadClick}
                  disabled={uploading}
                  className="bg-gray-100 px-3 py-2 border-t border-r border-b rounded-r-md flex items-center hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {uploading ? <Loader2 className="w-5 h-5 text-gray-500 animate-spin" /> : <Upload className="w-5 h-5 text-gray-500" />}
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              {/* Xem trước hình ảnh đã chọn */}
              {imagePreview && (
                <div className="mt-2 relative">
                  <img 
                    src={imagePreview} 
                    alt="Xem trước" 
                    className="h-40 w-auto object-contain border rounded-md" 
                  />
                </div>
              )}

              {/* Hiển thị lỗi upload nếu có */}
              {uploadError && (
                <div className="text-sm text-red-600">
                  {uploadError}
                </div>
              )}
              
              <p className="text-xs text-gray-500">
                Bạn có thể nhập URL trực tiếp hoặc tải lên hình ảnh từ máy tính (JPG, PNG, tối đa 2MB)
              </p>
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nội dung <span className="text-red-500">*</span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
              rows={10}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              placeholder="Nhập nội dung bài viết (hỗ trợ HTML cơ bản)"
            />
            <p className="text-xs text-gray-500 mt-1">
              Tip: Bạn có thể sử dụng các thẻ HTML cơ bản như &lt;p&gt;, &lt;h2&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;a&gt;
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ngày đăng
            </label>
            <div className="flex">
              <input
                type="datetime-local"
                name="publish_date"
                value={formData.publish_date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
              />
              <div className="bg-gray-100 px-3 py-2 border-t border-r border-b rounded-r-md flex items-center">
                <Calendar className="w-5 h-5 text-gray-500" />
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Để trống nếu chưa muốn lên lịch đăng bài
            </p>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              name="published"
              checked={formData.published}
              onChange={handleCheckboxChange}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
              Đăng ngay
            </label>
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-3">
          <Link 
            href="/admin/news"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Hủy
          </Link>
          <button
            type="submit"
            disabled={loading || uploading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Đang lưu...' : 'Lưu bài viết'}
          </button>
        </div>
      </form>
    </div>
  );
} 
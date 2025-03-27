'use client';

import React, { useState, useEffect } from 'react';
import { supabase, insertSampleNews } from '@/lib/supabase';
import { PlusCircle, Edit, Trash2, Search, Eye, Calendar, Database } from 'lucide-react';
import Link from 'next/link';

interface News {
  id: string;
  title: string;
  summary?: string;
  category?: string;
  image_url?: string;
  published: boolean;
  publish_date?: string;
  created_at: string;
}

export default function NewsManagementPage() {
  const [newsItems, setNewsItems] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importMessage, setImportMessage] = useState<{type: 'success' | 'error', message: string} | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    setLoading(true);
    try {
      // Lấy dữ liệu thực tế từ Supabase thay vì dữ liệu mẫu
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Lỗi khi tải tin tức:", error);
        // Nếu có lỗi (có thể do bảng chưa tồn tại), sử dụng dữ liệu mẫu
        setNewsItems([
          {
            id: '1',
            title: 'Ra mắt Hero mới: Echo',
            summary: 'Echo, robot tiên tiến với khả năng nhân bản kỹ năng của đối thủ, chính thức gia nhập đội hình Overwatch',
            category: 'Heroes',
            image_url: '/images/news/echo.jpg',
            published: true,
            publish_date: '2025-03-20T10:00:00Z',
            created_at: '2025-03-18T15:30:00Z'
          },
          {
            id: '2',
            title: 'Cập nhật bản đồ mới: Havana',
            summary: 'Khám phá bản đồ Havana đầy nắng với kiến trúc Cuba cổ điển và những góc chiến đấu thú vị',
            category: 'Maps',
            image_url: '/images/news/havana.jpg',
            published: true,
            publish_date: '2025-03-15T14:00:00Z',
            created_at: '2025-03-10T09:45:00Z'
          },
          {
            id: '3',
            title: 'Sự kiện mùa hè sắp diễn ra',
            summary: 'Chuẩn bị cho sự kiện mùa hè với nhiều skin mới và chế độ chơi đặc biệt',
            category: 'Events',
            image_url: '/images/news/summer-event.jpg',
            published: false,
            publish_date: '2025-04-01T08:00:00Z',
            created_at: '2025-03-25T11:20:00Z'
          }
        ]);
      } else {
        setNewsItems(data || []);
      }
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu tin tức:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleImportSampleNews() {
    setIsImporting(true);
    setImportMessage(null);
    
    try {
      const result = await insertSampleNews();
      
      if (result.success) {
        setImportMessage({ type: 'success', message: result.message });
        // Tải lại dữ liệu sau khi nhập thành công
        fetchNews();
      } else {
        setImportMessage({ type: 'error', message: result.message });
      }
    } catch (error) {
      console.error('Lỗi khi nhập dữ liệu mẫu:', error);
      setImportMessage({ 
        type: 'error', 
        message: `Lỗi khi nhập dữ liệu mẫu: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    } finally {
      setIsImporting(false);
    }
  }

  async function handleDeleteNews(id: string) {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      try {
        const { error } = await supabase
          .from('news')
          .delete()
          .eq('id', id);
        
        if (error) {
          throw error;
        }
        
        // Cập nhật danh sách tin tức sau khi xóa
        setNewsItems(newsItems.filter(news => news.id !== id));
      } catch (error) {
        console.error('Lỗi khi xóa tin tức:', error);
        alert('Không thể xóa tin tức. Vui lòng thử lại sau.');
      }
    }
  }

  const filteredNews = newsItems.filter(news => 
    news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (news.category && news.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (news.summary && news.summary.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý Tin tức</h1>
        <div className="flex space-x-2">
          <button 
            onClick={handleImportSampleNews}
            disabled={isImporting}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center disabled:opacity-50"
          >
            <Database className="w-5 h-5 mr-2" />
            {isImporting ? 'Đang thêm...' : 'Thêm dữ liệu mẫu'}
          </button>
          <Link 
            href="/admin/news/create" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Thêm bài viết mới
          </Link>
        </div>
      </div>

      {importMessage && (
        <div className={`mb-4 p-3 rounded ${importMessage.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {importMessage.message}
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm theo tiêu đề, danh mục hoặc tóm tắt..."
            className="pl-10 pr-4 py-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {newsItems.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-gray-500 mb-4">Chưa có bài viết nào trong cơ sở dữ liệu</p>
                <button
                  onClick={handleImportSampleNews}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Thêm dữ liệu mẫu ngay
                </button>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Hình ảnh
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tiêu đề
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Danh mục
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ngày đăng
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredNews.map((news) => (
                    <tr key={news.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="h-12 w-20 rounded-md overflow-hidden bg-gray-100">
                          {news.image_url ? (
                            <img 
                              src={news.image_url} 
                              alt={news.title} 
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                              No image
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{news.title}</div>
                        {news.summary && (
                          <div className="text-sm text-gray-500 truncate max-w-xs">{news.summary}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {news.category && (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {news.category}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          news.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {news.published ? 'Đã đăng' : 'Chưa đăng'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {news.publish_date ? formatDate(news.publish_date) : 'Chưa lên lịch'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Link href={`/news/${news.id}`} className="text-blue-600 hover:text-blue-900" target="_blank">
                            <Eye className="w-5 h-5" />
                          </Link>
                          <Link href={`/admin/news/edit/${news.id}`} className="text-indigo-600 hover:text-indigo-900">
                            <Edit className="w-5 h-5" />
                          </Link>
                          <button 
                            onClick={() => handleDeleteNews(news.id)}
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
            )}
          </div>
        )}
      </div>
    </div>
  );
}

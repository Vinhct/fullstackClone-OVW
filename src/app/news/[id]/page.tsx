'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, Tag, Share2, Calendar } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Kiểu dữ liệu cho tin tức
interface NewsItem {
  id: string;
  title: string;
  summary?: string;
  content?: string;
  category?: string;
  image_url?: string;
  published: boolean;
  publish_date?: string;
  created_at: string;
}

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    async function fetchNewsById() {
      try {
        setLoading(true);
        // Tìm tin tức theo ID
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Lỗi khi tải tin tức:', error);
          setError('Không thể tải tin tức. Vui lòng thử lại sau.');
          return;
        }

        if (!data) {
          setError('Không tìm thấy tin tức với ID này.');
          return;
        }

        setNewsItem(data);

        // Tải tin tức liên quan (cùng danh mục)
        if (data.category) {
          const { data: relatedData, error: relatedError } = await supabase
            .from('news')
            .select('*')
            .eq('category', data.category)
            .eq('published', true)
            .neq('id', id) // Loại bỏ tin tức hiện tại
            .order('publish_date', { ascending: false })
            .limit(3);

          if (!relatedError && relatedData) {
            setRelatedNews(relatedData);
          }
        }
      } catch (err) {
        console.error('Lỗi khi tải tin tức:', err);
        setError('Đã xảy ra lỗi không mong muốn.');
      } finally {
        setLoading(false);
      }
    }

    fetchNewsById();
  }, [id]);

  // Format ngày cho dễ đọc
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return format(new Date(dateString), 'dd/MM/yyyy');
  };

  // Kiểm tra nếu đang tải
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-blue"></div>
      </div>
    );
  }

  // Kiểm tra nếu có lỗi hoặc không tìm thấy tin tức
  if (error || !newsItem) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-24">
          <div className="max-w-3xl mx-auto bg-gray-800/50 rounded-lg p-8 border border-gray-700">
            <h1 className="text-2xl font-bold text-red-400 mb-4">
              {error || 'Không tìm thấy tin tức'}
            </h1>
            <p className="text-gray-300 mb-6">
              Tin tức bạn đang tìm kiếm có thể đã bị xóa hoặc không tồn tại.
            </p>
            <Link
              href="/news"
              className="inline-flex items-center text-primary-blue hover:text-primary-blue/80 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại trang tin tức
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      {/* Hero Banner */}
      <div className="relative w-full h-[50vh] overflow-hidden">
        {/* Banner Image */}
        <div className="absolute inset-0">
          <Image
            src={newsItem.image_url || '/images/news/default.jpg'}
            alt={newsItem.title}
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="max-w-4xl">
              {/* Category & Date */}
              <div className="flex items-center space-x-4 mb-4">
                {newsItem.category && (
                  <span className="bg-primary-blue/90 text-white text-sm font-medium px-3 py-1 rounded-full flex items-center">
                    <Tag className="w-4 h-4 mr-1" />
                    {newsItem.category}
                  </span>
                )}
                <span className="text-gray-300 text-sm flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDate(newsItem.publish_date)}
                </span>
              </div>

              {/* Title */}
              <h1 className="overwatch-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6">
                {newsItem.title}
              </h1>

              {/* Summary */}
              {newsItem.summary && (
                <p className="text-lg text-gray-300 max-w-3xl">
                  {newsItem.summary}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back Link */}
          <Link
            href="/news"
            className="inline-flex items-center text-primary-blue hover:text-primary-blue/80 transition-colors mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại trang tin tức
          </Link>

          {/* Content */}
          <div className="bg-gray-800/30 border border-gray-700/50 rounded-lg p-6 md:p-8">
            {/* Main Content */}
            <div className="prose prose-lg prose-invert max-w-none">
              {newsItem.content ? (
                <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
              ) : (
                <p className="text-gray-400">Không có nội dung chi tiết cho bài viết này.</p>
              )}
            </div>

            {/* Share Links */}
            <div className="mt-12 pt-8 border-t border-gray-700">
              <div className="flex items-center space-x-2">
                <span className="text-gray-400">Chia sẻ:</span>
                <div className="flex space-x-3">
                  <button className="text-gray-400 hover:text-primary-blue transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                    </svg>
                  </button>
                  <button className="text-gray-400 hover:text-primary-blue transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                    </svg>
                  </button>
                  <button className="text-gray-400 hover:text-primary-blue transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Related News */}
          {relatedNews.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Tin tức liên quan</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedNews.map((item) => (
                  <Link key={item.id} href={`/news/${item.id}`} className="block group">
                    <div className="bg-gray-800 rounded-lg overflow-hidden h-full transition-all duration-300 transform group-hover:translate-y-[-5px] group-hover:shadow-lg group-hover:shadow-primary-blue/20">
                      {/* Image */}
                      <div className="relative h-44 overflow-hidden">
                        <Image
                          src={item.image_url || '/images/news/default.jpg'}
                          alt={item.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
                        
                        {/* Category badge */}
                        {item.category && (
                          <div className="absolute top-3 left-3 bg-primary-blue/90 text-white text-xs font-semibold px-2 py-1 rounded-full">
                            {item.category}
                          </div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="p-4">
                        <h3 className="text-white text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary-blue transition-colors">
                          {item.title}
                        </h3>
                        <div className="text-gray-400 text-sm flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {formatDate(item.publish_date)}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
} 
'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { PlusCircle, Edit, Trash2, Search, ChevronUp, ChevronDown, MessageSquare } from 'lucide-react';
import Link from 'next/link';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order_number?: number;
  created_at: string;
  updated_at: string;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  created_at: string;
}

export default function FAQSupportManagementPage() {
  const [activeTab, setActiveTab] = useState<'faqs' | 'contact'>('faqs');
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  useEffect(() => {
    if (activeTab === 'faqs') {
      fetchFaqs();
    } else {
      fetchContactSubmissions();
    }
  }, [activeTab]);

  async function fetchFaqs() {
    setLoading(true);
    try {
      // Trong môi trường thực tế, bạn sẽ thay thế dữ liệu mẫu này bằng dữ liệu từ Supabase
      // const { data, error } = await supabase.from('faqs').select('*').order('order_number', { ascending: true });
      // if (error) throw error;
      // setFaqs(data || []);
      
      // Dữ liệu mẫu cho demo
      setFaqs([
        {
          id: '1',
          question: 'Overwatch Clone là gì?',
          answer: 'Overwatch Clone là một dự án game bắn súng đội nhóm lấy cảm hứng từ Overwatch, nơi người chơi có thể chọn các anh hùng với khả năng độc đáo để tham gia vào các trận đấu chiến thuật.',
          category: 'General',
          order_number: 1,
          created_at: '2025-02-10T09:30:00Z',
          updated_at: '2025-02-15T14:45:00Z'
        },
        {
          id: '2',
          question: 'Làm thế nào để tải game?',
          answer: 'Bạn có thể tải game từ trang chủ chính thức của chúng tôi. Chỉ cần nhấp vào nút "Download" và làm theo hướng dẫn để cài đặt game trên máy tính của bạn.',
          category: 'Installation',
          order_number: 2,
          created_at: '2025-02-12T11:15:00Z',
          updated_at: '2025-02-18T10:30:00Z'
        },
        {
          id: '3',
          question: 'Cấu hình tối thiểu để chơi game là gì?',
          answer: 'Cấu hình tối thiểu bao gồm: CPU Intel Core i3 hoặc AMD Phenom X3 8650, GPU NVIDIA GeForce GTX 460 hoặc ATI Radeon HD 4850, RAM 4GB, và 30GB dung lượng ổ cứng trống.',
          category: 'Technical',
          order_number: 3,
          created_at: '2025-02-15T13:45:00Z',
          updated_at: '2025-02-20T09:15:00Z'
        },
        {
          id: '4',
          question: 'Làm thế nào để báo cáo lỗi trong game?',
          answer: 'Bạn có thể báo cáo lỗi thông qua mục "Support" trên trang web chính thức hoặc sử dụng tính năng báo cáo trong game. Vui lòng cung cấp càng nhiều thông tin chi tiết càng tốt để giúp chúng tôi khắc phục vấn đề.',
          category: 'Support',
          order_number: 4,
          created_at: '2025-02-18T15:30:00Z',
          updated_at: '2025-02-22T11:45:00Z'
        }
      ]);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu FAQs:', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchContactSubmissions() {
    setLoading(true);
    try {
      // Trong môi trường thực tế, bạn sẽ thay thế dữ liệu mẫu này bằng dữ liệu từ Supabase
      // const { data, error } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });
      // if (error) throw error;
      // setContactSubmissions(data || []);
      
      // Dữ liệu mẫu cho demo
      setContactSubmissions([
        {
          id: '1',
          name: 'Nguyễn Văn A',
          email: 'nguyenvana@example.com',
          subject: 'Vấn đề đăng nhập',
          message: 'Tôi không thể đăng nhập vào tài khoản của mình sau khi cập nhật game. Đã thử đặt lại mật khẩu nhưng vẫn không được.',
          status: 'unread',
          created_at: '2025-03-25T10:15:00Z'
        },
        {
          id: '2',
          name: 'Trần Thị B',
          email: 'tranthib@example.com',
          subject: 'Góp ý về hero mới',
          message: 'Tôi nghĩ hero mới có khả năng hơi mạnh so với các hero khác. Có thể cân nhắc điều chỉnh lại sát thương của kỹ năng chính.',
          status: 'read',
          created_at: '2025-03-24T14:30:00Z'
        },
        {
          id: '3',
          name: 'Lê Văn C',
          email: 'levanc@example.com',
          subject: 'Báo cáo lỗi đồ họa',
          message: 'Khi chơi trên bản đồ Hanamura, tôi gặp lỗi đồ họa ở khu vực điểm B. Các texture bị nhấp nháy và đôi khi biến mất hoàn toàn.',
          status: 'replied',
          created_at: '2025-03-23T09:45:00Z'
        }
      ]);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu liên hệ:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (faq.category && faq.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredSubmissions = contactSubmissions.filter(submission => 
    submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (submission.subject && submission.subject.toLowerCase().includes(searchTerm.toLowerCase())) ||
    submission.message.toLowerCase().includes(searchTerm.toLowerCase())
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'unread':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Chưa đọc</span>;
      case 'read':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">Đã đọc</span>;
      case 'replied':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Đã trả lời</span>;
      default:
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý FAQ & Support</h1>
        {activeTab === 'faqs' && (
          <Link 
            href="/admin/faqs/create" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            Thêm FAQ mới
          </Link>
        )}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex border-b">
          <button
            className={`px-6 py-3 font-medium text-sm focus:outline-none ${
              activeTab === 'faqs' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('faqs')}
          >
            Câu hỏi thường gặp
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm focus:outline-none ${
              activeTab === 'contact' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('contact')}
          >
            Liên hệ & Hỗ trợ
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={activeTab === 'faqs' ? "Tìm kiếm câu hỏi, câu trả lời..." : "Tìm kiếm theo tên, email, nội dung..."}
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
            <>
              {activeTab === 'faqs' ? (
                <div className="space-y-4">
                  {filteredFaqs.map((faq) => (
                    <div key={faq.id} className="border rounded-lg overflow-hidden">
                      <div 
                        className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100"
                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      >
                        <div className="flex-1">
                          <div className="font-medium">{faq.question}</div>
                          {faq.category && (
                            <div className="text-xs text-gray-500 mt-1">
                              Danh mục: <span className="font-medium">{faq.category}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="text-gray-400">
                            {expandedFaq === faq.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </div>
                          <div className="flex space-x-2">
                            <Link href={`/admin/faqs/edit/${faq.id}`} className="text-indigo-600 hover:text-indigo-900" onClick={(e) => e.stopPropagation()}>
                              <Edit className="w-5 h-5" />
                            </Link>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                if (window.confirm('Bạn có chắc chắn muốn xóa FAQ này?')) {
                                  // Xử lý xóa FAQ
                                  console.log('Xóa FAQ:', faq.id);
                                }
                              }}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                      {expandedFaq === faq.id && (
                        <div className="p-4 bg-white border-t">
                          <div className="text-gray-700 whitespace-pre-line">{faq.answer}</div>
                          <div className="mt-3 text-xs text-gray-500">
                            Cập nhật lần cuối: {formatDate(faq.updated_at)}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {filteredFaqs.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Không tìm thấy câu hỏi nào phù hợp với tìm kiếm của bạn.
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredSubmissions.map((submission) => (
                    <div key={submission.id} className="border rounded-lg overflow-hidden">
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-medium">{submission.name}</h3>
                            <div className="text-sm text-gray-500">{submission.email}</div>
                          </div>
                          <div className="flex space-x-3 items-center">
                            {getStatusBadge(submission.status)}
                            <div className="text-xs text-gray-500">
                              {formatDate(submission.created_at)}
                            </div>
                          </div>
                        </div>
                        {submission.subject && (
                          <div className="font-medium mb-2">{submission.subject}</div>
                        )}
                        <div className="text-gray-700 whitespace-pre-line mb-4">{submission.message}</div>
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                            {submission.status !== 'replied' && (
                              <button 
                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm flex items-center"
                                onClick={() => {
                                  // Xử lý trả lời liên hệ
                                  console.log('Trả lời liên hệ:', submission.id);
                                }}
                              >
                                <MessageSquare className="w-4 h-4 mr-1" />
                                Trả lời
                              </button>
                            )}
                            {submission.status === 'unread' && (
                              <button 
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-md text-sm"
                                onClick={() => {
                                  // Xử lý đánh dấu đã đọc
                                  console.log('Đánh dấu đã đọc:', submission.id);
                                }}
                              >
                                Đánh dấu đã đọc
                              </button>
                            )}
                          </div>
                          <button 
                            onClick={() => {
                              if (window.confirm('Bạn có chắc chắn muốn xóa liên hệ này?')) {
                                // Xử lý xóa liên hệ
                                console.log('Xóa liên hệ:', submission.id);
                              }
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {filteredSubmissions.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      Không tìm thấy liên hệ nào phù hợp với tìm kiếm của bạn.
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

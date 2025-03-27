'use client';

import React from 'react';
import Link from 'next/link';
import { Folder, Image, Newspaper, Gamepad2, Users, HelpCircle, BarChart3 } from 'lucide-react';

const AdminDashboard = () => {
  const adminModules = [
    {
      title: 'Quản lý Heroes',
      description: 'Thêm, sửa, xóa thông tin nhân vật, thuộc tính, hình ảnh, video',
      icon: <Users className="w-10 h-10 text-blue-500" />,
      href: '/admin/heroes',
      available: true
    },
    {
      title: 'Quản lý News',
      description: 'Đăng, chỉnh sửa, xóa bài viết, phân loại, lên lịch đăng',
      icon: <Newspaper className="w-10 h-10 text-green-500" />,
      href: '/admin/news',
      available: true
    },
    {
      title: 'Media Gallery',
      description: 'Upload và quản lý hình ảnh, video, artwork',
      icon: <Image className="w-10 h-10 text-purple-500" />,
      href: '/admin/media',
      available: true
    },
    {
      title: 'Game Info',
      description: 'Cập nhật thông tin về game modes, maps, nội dung trang Overview',
      icon: <Gamepad2 className="w-10 h-10 text-red-500" />,
      href: '/admin/game-info',
      available: true
    },
    {
      title: 'FAQ & Support',
      description: 'Quản lý câu hỏi thường gặp và phản hồi từ người dùng',
      icon: <HelpCircle className="w-10 h-10 text-amber-500" />,
      href: '/admin/faqs',
      available: true
    },
    {
      title: 'Quản lý người dùng',
      description: 'Quản lý danh sách, phân quyền admin',
      icon: <Users className="w-10 h-10 text-indigo-500" />,
      href: '/admin/users',
      available: true
    },
    {
      title: 'Analytics',
      description: 'Theo dõi lượt truy cập và tương tác',
      icon: <BarChart3 className="w-10 h-10 text-cyan-500" />,
      href: '/admin/analytics',
      available: true
    }
  ];

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Quản lý nội dung cho Overwatch Clone</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminModules.map((module, index) => (
          <Link 
            key={index} 
            href={module.href}
            className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg hover:border-blue-300`}
          >
            <div className="p-6">
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-4">
                  {module.icon}
                  <h2 className="text-xl font-semibold ml-3">{module.title}</h2>
                </div>
                <p className="text-gray-600 flex-grow">{module.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-blue-600 font-medium">Truy cập</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    module.available 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {module.available ? 'Khả dụng' : 'Đang phát triển'}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;

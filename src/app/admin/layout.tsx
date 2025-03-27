'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { 
  Users, 
  Newspaper, 
  Image as ImageIcon, 
  Gamepad2, 
  HelpCircle, 
  BarChart3, 
  LogOut, 
  ChevronRight, 
  Home,
  Menu,
  X,
  ArrowLeft 
} from 'lucide-react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

const AdminNavigation = ({ isOpen, toggleSidebar }: { isOpen: boolean; toggleSidebar: () => void }) => {
  const pathname = usePathname();
  const { signOut, profile, isLoading } = useAuth();
  const router = useRouter();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: <Home className="w-5 h-5" /> },
    { name: 'Heroes', href: '/admin/heroes', icon: <Users className="w-5 h-5" /> },
    { name: 'News', href: '/admin/news', icon: <Newspaper className="w-5 h-5" /> },
    { name: 'Media', href: '/admin/media', icon: <ImageIcon className="w-5 h-5" /> },
    { name: 'Game Info', href: '/admin/game-info', icon: <Gamepad2 className="w-5 h-5" /> },
    { name: 'FAQs & Support', href: '/admin/faqs', icon: <HelpCircle className="w-5 h-5" /> },
    { name: 'Users', href: '/admin/users', icon: <Users className="w-5 h-5" /> },
    { name: 'Analytics', href: '/admin/analytics', icon: <BarChart3 className="w-5 h-5" /> },
  ];

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const handleBackToSite = () => {
    router.push('/');
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" 
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full z-30 bg-gray-900 shadow-lg transition-all duration-300 ${
        isOpen ? "w-72" : "w-0 md:w-20 overflow-hidden"
      }`}>
        <div className={`p-4 border-b border-gray-700 flex ${isOpen ? "justify-between" : "justify-center"} items-center`}>
          {isOpen ? (
            <>
              <div className="flex items-center">
                <div className="w-8 h-8 relative">
                  <Image 
                    src="/images/valorant-logo.svg"
                    alt="Logo"
                    width={32}
                    height={32}
                    className="filter brightness-0 invert"
                  />
                </div>
                <h1 className="text-xl font-bold text-white ml-2">Admin Panel</h1>
              </div>
              <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </>
          ) : (
            <button onClick={toggleSidebar} className="text-gray-400 hover:text-white">
              <Menu className="w-5 h-5" />
            </button>
          )}
        </div>
        
        {/* User info */}
        {isOpen && (
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-semibold">
                {profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : 'A'}
              </div>
              <div>
                <p className="font-medium text-white">{profile?.full_name || 'Admin User'}</p>
                <p className="text-sm text-gray-400">{profile?.email}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Navigation */}
        <nav className="p-4 mt-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center ${isOpen ? 'px-3 py-2' : 'px-0 py-4 justify-center'} rounded-md transition-all ${
                    pathname === item.href || pathname.startsWith(item.href + '/')
                      ? 'bg-blue-600/20 text-blue-400'
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                  onClick={isOpen ? undefined : toggleSidebar}
                  title={!isOpen ? item.name : undefined}
                >
                  <div className={isOpen ? '' : 'flex justify-center w-full'}>
                    {item.icon}
                  </div>
                  {isOpen && <span className="ml-3">{item.name}</span>}
                  {isOpen && pathname === item.href && (
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Bottom Actions */}
        <div className="p-4 mt-auto border-t border-gray-700 absolute bottom-0 left-0 right-0">
          {isOpen ? (
            <>
              <button
                onClick={handleBackToSite}
                className="flex items-center w-full px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-md mb-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="ml-3">Quay lại trang chủ</span>
              </button>
              <button
                onClick={signOut}
                className="flex items-center w-full px-3 py-2 text-gray-400 hover:bg-gray-800 hover:text-white rounded-md"
              >
                <LogOut className="w-5 h-5" />
                <span className="ml-3">Đăng xuất</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleBackToSite}
                className="flex justify-center w-full py-4 text-gray-400 hover:bg-gray-800 hover:text-white"
                title="Quay lại trang chủ"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                onClick={signOut}
                className="flex justify-center w-full py-4 text-gray-400 hover:bg-gray-800 hover:text-white"
                title="Đăng xuất"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

// Wrapper component để kiểm tra xác thực
const AuthCheck = ({ children }: { children: React.ReactNode }) => {
  const { user, profile, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isLoading) {
        if (!user && !isLoginPage) {
          // Nếu không có người dùng và không ở trang đăng nhập, chuyển hướng đến trang đăng nhập
          router.push('/admin/login');
        } else if (user && !profile?.role && !isLoginPage) {
          // Nếu có người dùng nhưng không có quyền admin, đăng xuất và chuyển hướng đến trang đăng nhập
          await supabase.auth.signOut();
          router.push('/admin/login');
        } else if (user && profile?.role === 'admin' && isLoginPage) {
          // Nếu đã đăng nhập với quyền admin nhưng đang ở trang đăng nhập, chuyển hướng đến trang admin
          router.push('/admin');
        }
        setChecking(false);
      }
    };

    checkAuth();
  }, [user, profile, isLoading, isLoginPage, router]);

  if (isLoading || checking) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-800">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  return <>{children}</>;
};

// Component để ẩn navbar của trang chính
const AdminPageWrapper = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Ẩn navbar khi vào trang admin
    const navbar = document.querySelector('header');
    const footer = document.querySelector('footer');
    
    if (navbar) {
      navbar.style.display = 'none';
    }
    
    if (footer) {
      footer.style.display = 'none';
    }
    
    // Khôi phục khi component unmount
    return () => {
      if (navbar) {
        navbar.style.display = 'block';
      }
      if (footer) {
        footer.style.display = 'block'; 
      }
    };
  }, []);
  
  return <>{children}</>;
};

// Tách AdminLayout thành 2 component
const AdminLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [connectionError, setConnectionError] = useState(false);
  const [realtimeStatus, setRealtimeStatus] = useState<string>('UNKNOWN');
  const { signOut, profile } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Thêm useEffect để quản lý kết nối Realtime
  useEffect(() => {
    let monitorChannel: any = null;
    let reconnectTimeout: NodeJS.Timeout;

    const setupRealtimeMonitoring = async () => {
      try {
        // Kiểm tra kết nối Supabase
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.error('Supabase connection failed:', sessionError);
          setConnectionError(true);
          return;
        }

        // Tạo channel monitor
        monitorChannel = supabase.channel('admin-monitor');
        
        // Lắng nghe các sự kiện hệ thống
        monitorChannel
          .on('system', { event: 'connected' }, () => {
            console.log('Admin monitor connected');
            setRealtimeStatus('CONNECTED');
            setConnectionError(false);
          })
          .on('system', { event: 'disconnected' }, () => {
            console.log('Admin monitor disconnected');
            setRealtimeStatus('DISCONNECTED');
            setConnectionError(true);
            
            // Thử kết nối lại sau 5 giây
            reconnectTimeout = setTimeout(() => {
              console.log('Attempting to reconnect...');
              setupRealtimeMonitoring();
            }, 5000);
          })
          .subscribe((status: string) => {
            console.log('Admin monitor subscription status:', status);
            setRealtimeStatus(status);
            if (status === 'CHANNEL_ERROR') {
              setConnectionError(true);
            }
          });
      } catch (error) {
        console.error('Failed to setup realtime monitoring:', error);
        setConnectionError(true);
      }
    };

    // Thiết lập monitoring khi component mount
    setupRealtimeMonitoring();

    // Cleanup khi component unmount
    return () => {
      if (monitorChannel) {
        console.log('Cleaning up admin monitor channel');
        supabase.removeChannel(monitorChannel);
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Connection Status Banner */}
      {connectionError && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-red-900 text-white py-2 px-4 text-center">
          ❌ Supabase connection failed - realtime updates may not work
        </div>
      )}
      
      {/* Top Navigation Spacer */}
      <div className={`h-16 ${connectionError ? 'mt-8' : ''}`}></div>

      <AdminNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`transition-all duration-300 ${isSidebarOpen ? "md:ml-72" : "md:ml-20"}`}>
        <div className="p-4 md:py-8 md:px-8">
          <div className="mb-6 flex items-center">
            <button onClick={toggleSidebar} className="md:hidden mr-4 p-2 rounded-md hover:bg-gray-200">
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex flex-col">
              <h1 className="text-2xl font-bold text-gray-800">
                {pathname === '/admin' ? 'Dashboard' : ''}
                {pathname.includes('/admin/heroes') && 'Quản lý nhân vật'}
                {pathname.includes('/admin/news') && 'Quản lý tin tức'}
                {pathname.includes('/admin/media') && 'Thư viện media'}
                {pathname.includes('/admin/game-info') && 'Thông tin game'}
                {pathname.includes('/admin/faqs') && 'Hỗ trợ & FAQ'}
                {pathname.includes('/admin/users') && 'Quản lý người dùng'}
                {pathname.includes('/admin/analytics') && 'Thống kê'}
                
                {pathname.includes('/create') && ' - Tạo mới'}
                {pathname.includes('/edit') && ' - Chỉnh sửa'}
              </h1>
              <div className="text-sm text-gray-500 mt-1">
                {pathname === '/admin' && 'Tổng quan hệ thống quản trị'}
                {pathname.includes('/admin/heroes') && 'Quản lý thông tin nhân vật trong game'}
                {pathname.includes('/admin/news') && 'Đăng và quản lý tin tức mới nhất'}
                {pathname.includes('/admin/media') && 'Upload và quản lý hình ảnh, video'}
                {pathname.includes('/admin/game-info') && 'Cập nhật thông tin về game'}
                {pathname.includes('/admin/faqs') && 'Quản lý câu hỏi thường gặp'}
                {pathname.includes('/admin/users') && 'Quản lý tài khoản và phân quyền'}
                {pathname.includes('/admin/analytics') && 'Theo dõi lượt truy cập và tương tác'}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Component chính AdminLayout
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${inter.variable}`}>
      <style jsx global>{`
        body {
          padding: 0 !important;
          margin: 0 !important;
          overflow-x: hidden;
        }
      `}</style>
      
      <AdminPageWrapper>
        <AuthProvider>
          <AuthCheck>
            {children}
          </AuthCheck>
        </AuthProvider>
      </AdminPageWrapper>
    </div>
  );
};

// Component để render nội dung admin
const AdminContent = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  
  return pathname === '/admin/login' ? (
    <div className="min-h-screen font-sans">{children}</div>
  ) : (
    <AdminLayoutContent>{children}</AdminLayoutContent>
  );
};

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayout>
      <AdminContent>{children}</AdminContent>
    </AdminLayout>
  );
}

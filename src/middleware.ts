import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';

// Sử dụng URL và key mặc định cho môi trường development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dyuvxmueqeiwrpeoxubp.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5dXZ4bXVlcWVpd3JwZW94dWJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY3OTY3NDUsImV4cCI6MjAzMjM3Mjc0NX0.mJ7s9y_2lAYwFsEVZhvKkOXQFD_aYKjkYfTitBkH3WY';

export async function middleware(req: NextRequest) {
  // Tạm thời bỏ qua middleware để tránh lỗi chuyển hướng vô hạn
  // Chúng ta sẽ triển khai xác thực phía client thay vì sử dụng middleware
  return NextResponse.next();
  
  /* Đoạn code bên dưới đang gây lỗi chuyển hướng vô hạn
  const res = NextResponse.next();
  
  // Tạo Supabase client sử dụng cookies từ request
  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get: (name) => {
          const cookie = req.cookies.get(name)?.value;
          return cookie;
        },
        set: (name, value, options) => {
          res.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove: (name, options) => {
          res.cookies.delete({
            name,
            ...options,
          });
        },
      },
    }
  );

  // Kiểm tra session hiện tại
  const { data: { session } } = await supabase.auth.getSession();

  // URL hiện tại
  const url = req.nextUrl.clone();
  const isAdminRoute = url.pathname.startsWith('/admin');
  const isLoginRoute = url.pathname === '/admin/login';

  // Nếu không có session và đang truy cập trang admin (không phải trang login)
  if (!session && isAdminRoute && !isLoginRoute) {
    // Chuyển hướng đến trang đăng nhập
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  // Nếu có session, kiểm tra quyền admin
  if (session && isAdminRoute && !isLoginRoute) {
    try {
      // Lấy thông tin vai trò của người dùng
      const { data: userData, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (error || userData?.role !== 'admin') {
        // Nếu không phải admin, chuyển hướng đến trang đăng nhập
        url.pathname = '/admin/login';
        return NextResponse.redirect(url);
      }
    } catch (error) {
      console.error('Lỗi kiểm tra quyền admin:', error);
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  // Nếu đã đăng nhập và là admin, nhưng đang ở trang login, chuyển hướng đến trang admin
  if (session && isLoginRoute) {
    try {
      const { data: userData, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (!error && userData?.role === 'admin') {
        url.pathname = '/admin';
        return NextResponse.redirect(url);
      }
    } catch (error) {
      console.error('Lỗi kiểm tra quyền admin:', error);
    }
  }

  return res;
  */
}

// Chỉ áp dụng middleware cho các route admin
export const config = {
  matcher: ['/admin/:path*'],
};

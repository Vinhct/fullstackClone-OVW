'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

interface UserProfile {
  id: string;
  role: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  isAdmin: boolean;
  error: Error | null;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Lấy session hiện tại khi component được mount
    const getSession = async () => {
      setIsLoading(true);
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        setSession(session);
        setUser(session?.user || null);

        if (session?.user) {
          // Lấy thông tin profile của người dùng
          const { data, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profileError) {
            console.error('Lỗi khi lấy thông tin profile:', profileError);
            setError(new Error(profileError.message));
          } else {
            setProfile(data);
            setError(null);
          }
        }
      } catch (error: any) {
        console.error('Lỗi khi lấy session:', error);
        setError(new Error(error.message || 'Lỗi xác thực không xác định'));
      } finally {
        setIsLoading(false);
      }
    };

    getSession();

    // Đăng ký lắng nghe sự thay đổi của auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user || null);

        if (session?.user) {
          // Lấy thông tin profile của người dùng
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (error) {
            console.error('Lỗi khi lấy thông tin profile:', error);
            setError(new Error(error.message));
          } else {
            setProfile(data);
            setError(null);
          }
        } else {
          setProfile(null);
        }

        setIsLoading(false);
      }
    );

    // Cleanup subscription khi component unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        const authError = new Error(error.message || 'Đăng nhập không thành công');
        setError(authError);
        return { error: authError };
      }

      // Kiểm tra quyền admin
      if (data.user) {
        const { data: userData, error: userError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (userError) {
          const profileError = new Error(userError.message || 'Không thể lấy thông tin người dùng');
          setError(profileError);
          return { error: profileError };
        }

        if (userData?.role !== 'admin') {
          const accessError = new Error('Bạn không có quyền truy cập vào trang quản trị');
          setError(accessError);
          
          // Đăng xuất nếu không phải admin
          await supabase.auth.signOut();
          
          return { error: accessError };
        }
      }

      return { error: null };
    } catch (error: any) {
      const unknownError = new Error(error.message || 'Đã xảy ra lỗi không xác định');
      setError(unknownError);
      return { error: unknownError };
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
      router.push('/admin/login');
    } catch (error: any) {
      console.error('Lỗi khi đăng xuất:', error);
      setError(new Error(error.message || 'Lỗi khi đăng xuất'));
    } finally {
      setIsLoading(false);
    }
  };

  const isAdmin = profile?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        isLoading,
        isAdmin,
        error,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth phải được sử dụng trong AuthProvider');
  }
  return context;
}

-- Xóa tất cả các policy hiện tại trên bảng profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
DROP POLICY IF EXISTS "All users can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "All users can update all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can insert profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can delete profiles" ON public.profiles;

-- Tạm thởi tắt RLS trên bảng profiles để cho phép truy cập không bị hạn chế
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Cập nhật vai trò admin cho người dùng cụ thể
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'vinhct@gmail.com';

-- Hiển thị danh sách người dùng có vai trò admin để kiểm tra
SELECT * FROM public.profiles WHERE role = 'admin';

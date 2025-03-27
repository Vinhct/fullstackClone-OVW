-- Tạo bảng profiles để lưu trữ thông tin người dùng
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Tạo RLS (Row Level Security) để bảo vệ dữ liệu
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Tạo policy cho phép người dùng xem thông tin của chính họ
CREATE POLICY "Users can view their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

-- Tạo policy cho phép người dùng cập nhật thông tin của chính họ
CREATE POLICY "Users can update their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Tạo policy cho phép admin xem tất cả profiles
CREATE POLICY "Admins can view all profiles" 
  ON public.profiles 
  FOR SELECT 
  USING (
    (SELECT role FROM auth.users LEFT JOIN public.profiles ON auth.users.id = public.profiles.id WHERE auth.users.id = auth.uid()) = 'admin'
  );

-- Tạo policy cho phép admin cập nhật tất cả profiles
CREATE POLICY "Admins can update all profiles" 
  ON public.profiles 
  FOR UPDATE 
  USING (
    (SELECT role FROM auth.users LEFT JOIN public.profiles ON auth.users.id = public.profiles.id WHERE auth.users.id = auth.uid()) = 'admin'
  );

-- Tạo trigger để tự động tạo profile khi người dùng đăng ký
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Tạo trigger khi có người dùng mới được tạo
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Tạo function để cập nhật thông tin profile khi người dùng cập nhật
CREATE OR REPLACE FUNCTION public.handle_user_update() 
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.profiles
  SET 
    email = new.email,
    full_name = COALESCE(new.raw_user_meta_data->>'full_name', profiles.full_name),
    updated_at = now()
  WHERE id = new.id;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Tạo trigger khi thông tin người dùng được cập nhật
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_user_update();

-- Lưu ý: Không thể tạo người dùng trực tiếp qua SQL
-- Thay vào đó, hãy sử dụng Supabase Dashboard để tạo người dùng
-- Sau đó, cập nhật vai trò thành admin bằng câu lệnh SQL sau:
/*
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'admin@example.com';
*/

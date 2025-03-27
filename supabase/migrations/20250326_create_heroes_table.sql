-- Tạo bảng heroes để lưu trữ thông tin nhân vật
CREATE TABLE IF NOT EXISTS public.heroes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  difficulty INTEGER NOT NULL DEFAULT 1,
  bio TEXT,
  portrait_url TEXT,
  abilities JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tạo RLS policies cho bảng heroes
ALTER TABLE public.heroes ENABLE ROW LEVEL SECURITY;

-- Policy cho phép đọc công khai
CREATE POLICY "Heroes are viewable by everyone" 
  ON public.heroes 
  FOR SELECT 
  USING (true);

-- Policy cho phép admin thêm mới
CREATE POLICY "Admins can insert heroes" 
  ON public.heroes 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Policy cho phép admin cập nhật
CREATE POLICY "Admins can update heroes" 
  ON public.heroes 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Policy cho phép admin xóa
CREATE POLICY "Admins can delete heroes" 
  ON public.heroes 
  FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- Thêm dữ liệu mẫu vào bảng heroes hiện có
INSERT INTO public.heroes (name, role, difficulty, bio, portrait_url)
VALUES 
  ('Tracer', 'Damage', 2, 'Trang bị súng xung và khả năng di chuyển nhanh trong thời gian', 'https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt28d1b279eb7cdf7e/6165ee5ac7341d4e31d0dc11/tracer-concept.jpg'),
  ('Reinhardt', 'Tank', 1, 'Hiệp sĩ giáp với khiên năng lượng lớn và búa chiến', 'https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt5440cbe6b11ce725/6165e7e989d1d74e3a2d2176/reinhardt-concept.jpg'),
  ('Mercy', 'Support', 1, 'Thiên thần hộ mệnh với khả năng hồi máu và tăng sát thương', 'https://images.blz-contentstack.com/v3/assets/blt2477dcaf4ebd440c/blt10c8aedf02f2d2b5/6165e6c1ee85ad6486b5b4c0/mercy-concept.jpg')
ON CONFLICT (id) DO NOTHING;

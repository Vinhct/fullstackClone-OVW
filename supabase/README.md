# Cấu hình Supabase cho dự án

## Bật tính năng Realtime

Để đảm bảo tính năng cập nhật dữ liệu theo thời gian thực hoạt động đúng, bạn cần cấu hình Supabase như sau:

### 1. Bật tính năng Realtime trong Supabase Dashboard

1. Đăng nhập vào [Supabase Dashboard](https://app.supabase.io)
2. Chọn dự án của bạn
3. Vào mục **Database** > **Replication**
4. Chuyển đến tab **Realtime**
5. Bật tính năng Realtime cho bảng `heroes` bằng cách:
   - Chọn "Enable Realtime for specific tables"
   - Chọn bảng `heroes` trong danh sách
   - Nhấn Save

### 2. Cấu hình RLS (Row Level Security) cho tính năng Realtime

Để cho phép người dùng nhận các cập nhật real-time, bạn cần tạo policy cho phép đọc:

1. Vào mục **Authentication** > **Policies**
2. Tìm đến bảng `heroes`
3. Thêm policy mới:
   - Tên: `Allow realtime for all users`
   - Hành động: `SELECT`
   - Điều kiện: `true` (cho phép tất cả)
   - Nhấn Save

### 3. Kiểm tra cấu hình

Để kiểm tra xem Realtime đã hoạt động chưa:

1. Vào trang admin và thêm/sửa/xóa một hero
2. Kiểm tra trang home để xem dữ liệu có được cập nhật tự động không
3. Kiểm tra console log để xem thông báo "Nhận được thay đổi từ Supabase"

## Cấu hình Bucket Storage

Để lưu trữ hình ảnh của heroes, đảm bảo bạn đã tạo các bucket sau:

- `heroes-media`: Lưu trữ hình ảnh của heroes
- `news-images`: Lưu trữ hình ảnh cho tin tức
- `media-gallery`: Lưu trữ thư viện media
- `game-assets`: Lưu trữ tài sản game

## Cấu hình RLS cho Storage

Để cho phép tải lên và truy cập file, cấu hình RLS cho storage buckets:

1. Vào mục **Storage**
2. Chọn bucket cần cấu hình
3. Vào tab **Policies**
4. Thêm policy cho phép đọc cho tất cả người dùng 
# React Native & Sendbird Chatbot 


## 1. Giới thiệu

- **Mục tiêu**: Xây dựng ứng dụng chatbot với tính năng nhắn tin thời gian thực và phản hồi tự động từ AI.
- **Công cụ chính**:
  - **React Native**: Framework của ReactJS.
  - **BotPress**: Cung cấp cơ sở hạ tầng nhắn tin thời gian thực và tích hợp chatbot AI.
  - **BotPress AI**: Xử lý phản hồi tự động.
  - **API service**: Quản lý các service thông qua Frontend và BotPress API .
  - **Realm**: Database Mobile
---

## 2. Tính năng 

Dưới đây là danh sách các tính năng cần thiết và các hàm tương ứng:

### a. Xác thực người dùng ✅ (Đã hoàn thành)
- **Tính năng**:
  - Đăng nhập/Đăng ký.
  - Hồ sơ người dùng (hình đại diện, tên hiển thị, v.v.).

### b. Giao diện chat (Đã hoàn thành)
- **Tính năng**:
  - Nhắn tin thời gian thực.
  - Phản hồi từ chatbot AI.
  - Hiển thị trạng thái đang nhập và tin nhắn đã đọc.

### c. Tích hợp chatbot AI 🛠 (Đã hoàn thành)
- **Tính năng**:
  - Phản hồi tự động cho câu hỏi của người dùng.
  - Tùy chỉnh hành vi chatbot qua bảng điều khiển Sendbird.

### d. Quản lý kênh chat (Đã hoàn thành)
- **Tính năng**:
  - Tham gia hoặc tạo kênh chat.
  - Hỗ trợ kênh công khai và riêng tư.(đang phát triển)

### f. Cài đặt người dùng
- **Tính năng**:
  - Chỉnh sửa hồ sơ cá nhân.
  - Đăng xuất.

---

## 3. Thiết kế cấu trúc ứng dụng

Dưới đây là các màn hình cần có trong ứng dụng:

1. **Màn hình Đăng nhập/Đăng ký**: Quản lý xác thực người dùng. (2 màn hình)
2. **Màn hình chính**: Hiển thị danh sách các kênh chat.
3. **Màn hình chat**: Hiển thị giao diện chat và xử lý tin nhắn.
4. **Màn hình hồ sơ**: Cho phép người dùng chỉnh sửa thông tin cá nhân.

---

## 5. Các bước triển khai chi tiết

1. **Cài đặt cơ bản**: Tạo dự án React Native và tích hợp SDK Sendbird.
2. **Xác thực**: Thêm chức năng đăng nhập và đăng ký.
3. **Tính năng chat**: Xây dựng giao diện chat và kích hoạt chatbot AI.
4. **Cài đặt và quản lý hồ sơ**: Thêm tính năng chỉnh sửa hồ sơ và cài đặt.
5. **Kiểm tra và khắc phục lỗi**: Đảm bảo mọi tính năng hoạt động trơn tru.
66. **Triển khai**: Build và phát hành ứng dụng trên Android và iOS.

---

## 6. Nâng cấp tính năng (Tùy chọn)
- **Logic AI tùy chỉnh**: Tạo dịch vụ backend xử lý chatbot thông minh hơn.
- **Chia sẻ tệp**: Hỗ trợ gửi hình ảnh, video và tài liệu.
- **Phân tích dữ liệu**: Theo dõi hành vi người dùng và hiệu suất ứng dụng.

## 7.Test Account:
- **User ID**: Cukcu1
- **Nickname**: Cukcu

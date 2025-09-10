# React Native & BotPress Open-Source


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

### a. Xác thực người dùng (Đã hoàn thành)
- **Tính năng**:
  - Đăng nhập/Đăng ký.
  - Hồ sơ người dùng (hình đại diện, tên hiển thị, v.v.).

### b. Giao diện chat (Đã hoàn thành)
- **Tính năng**:
  - Nhắn tin thời gian thực.
  - Phản hồi từ chatbot AI.
  - Hiển thị trạng thái đang nhập và tin nhắn đã đọc.

### c. Tích hợp chatbot AI  (Đã hoàn thành)
- **Tính năng**:
  - Phản hồi tự động cho câu hỏi của người dùng.

### d. Quản lý kênh chat (Đã hoàn thành)
- **Tính năng**:
  - Tham gia hoặc tạo kênh chat.
  - Hỗ trợ kênh công khai và riêng tư.(tính năng đang phát triển)

### f. Cài đặt người dùng
- **Tính năng**:
  - Chỉnh sửa hồ sơ cá nhân.(tính năng đang phát triển)
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

1. **Cài đặt cơ bản**: Tạo dự án React Native và tích hợp BotPress Open Source.
2. **Xác thực**: Thêm chức năng đăng nhập và đăng ký.
3. **Tính năng chat**: Xây dựng giao diện chat và kích hoạt chatbot AI.
4. **Cài đặt và quản lý hồ sơ**: Thêm tính năng chỉnh sửa hồ sơ và cài đặt.
5. **Kiểm tra và khắc phục lỗi**: Đảm bảo mọi tính năng hoạt động trơn tru.
6. **Triển khai**: Build ứng dụng trên Android .

---

## 6. Nâng cấp tính năng (Các tính năng có thể được phát triển trong tương lai)
- **Logic AI tùy chỉnh**: Tạo dịch vụ backend xử lý chatbot thông minh hơn.
- **Chia sẻ tệp**: Hỗ trợ gửi hình ảnh, video và tài liệu.
- **Phân tích dữ liệu**: Theo dõi hành vi người dùng và hiệu suất ứng dụng.
- **Chat real-time giữa các user với nhau**: Theo dõi data real-time.
- **Chia sẻ thông tin, dữ liệu**: Chia sẻ thông tin và dữ liệu người dùng.
- **Xây dựng work-flow**: Xây dựng 1 kịch bản riêng cho bot phù hợp với nhu cầu.

## 7. Ảnh minh họa giao diện:

<img width="200" height="400" alt="login" src="https://github.com/user-attachments/assets/94cd7af1-b8cc-4d1b-8644-96f3ddee10ec" />
<img width="200" height="400" alt="login" src="https://github.com/user-attachments/assets/898c5224-f412-4ff5-9480-848b3d3284e8" />
<img width="200" height="400" alt="login" src="https://github.com/user-attachments/assets/f99ab58a-ad07-42a1-be3a-456b41e951e2" />
<img width="200" height="400" alt="login(1)" src="https://github.com/user-attachments/assets/cc892d49-b94c-4da6-beb9-56e1e9eb43aa" />



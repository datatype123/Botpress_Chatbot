# React Native & Sendbird Chatbot 


## 1. Giới thiệu

- **Mục tiêu**: Xây dựng ứng dụng chatbot với tính năng nhắn tin thời gian thực và phản hồi tự động từ AI.
- **Công cụ chính**:
  - **React Native**: Framework của ReactJS.
  - **Sendbird**: Cung cấp cơ sở hạ tầng nhắn tin thời gian thực và tích hợp chatbot AI.
  - **Sendbird AI**: Xử lý phản hồi tự động.
  - **API service**: Quản lý các service thông qua Frontend và Sendbird .
  - **Realm**: Database Mobile
  - **FireBase** : Open_source Services 
---

## 2. Tính năng 

Dưới đây là danh sách các tính năng cần thiết và các hàm tương ứng:

### a. Xác thực người dùng ✅ (Đã hoàn thành)
- **Tính năng**:
  - Đăng nhập/Đăng ký.
  - Hồ sơ người dùng (hình đại diện, tên hiển thị, v.v.).
- **Hàm**:
  - `loginUser(username, password,confirm_password)`
  - `signupUser(username, password, confirm_password,choose_image_account,phone(developing) )`
  - `fetchUserProfile(userId)`

### b. Giao diện chat (Đã hoàn thành)
- **Tính năng**:
  - Nhắn tin thời gian thực.
  - Xem lại lịch sử tin nhắn.
  - Phản hồi từ chatbot AI.
  - Hiển thị trạng thái đang nhập và tin nhắn đã đọc.
- **Hàm**:
  - `fetchMessages(channelId)`: Lấy lịch sử tin nhắn.()
  - `sendMessage(text)`: Gửi tin nhắn.
  - `receiveMessage()`: Xử lý tin nhắn đến.
  - `markMessageAsRead(messageId)`: Đánh dấu tin nhắn đã đọc.

### c. Tích hợp chatbot AI 🛠 (Đang phát triển)
- **Tính năng**:
  - Phản hồi tự động cho câu hỏi của người dùng.
  - Tùy chỉnh hành vi chatbot qua bảng điều khiển Sendbird.
- **Hàm**:
  - `choose_modelAI`: Lựa chọn AI chatbot và AI model 
  - `choose_source` : Lựa chọn Bot truyền thống 

### d. Quản lý kênh chat (Đang phát triển)
- **Tính năng**:
  - Tham gia hoặc tạo kênh chat.
  - Hỗ trợ kênh công khai và riêng tư.
- **Hàm**:
  - `createChannel(channelData)`: Tạo kênh mớimới
  - `joinChannel(channelId)`: Tham gia vào 1 kênh đã có
  - `fetchChannels()`: Hiển thị các kênh đang tham gia 

### e. Thông báo đẩy (Đang phát triển )
- **Tính năng**:
  - Gửi thông báo khi có tin nhắn mới.
- **Hàm**:
  - `configurePushNotifications()`: Cài đặt thông tin phiên bản và các permissions cho thiết bị
  - `sendNotification(userId, message)`: Gửi thông báobáo

### f. Cài đặt người dùng
- **Tính năng**:
  - Chỉnh sửa hồ sơ cá nhân.
  - Đăng xuất.
- **Hàm**:
  - `updateProfile(userData)`: Thông tin của người dùngdùng
  - `logoutUser()`: Đăng xuất tài khoản 

---

## 3. Thiết kế cấu trúc ứng dụng

Dưới đây là các màn hình cần có trong ứng dụng:

1. **Màn hình Đăng nhập/Đăng ký**: Quản lý xác thực người dùng. (2 màn hình)
2. **Màn hình chính**: Hiển thị danh sách các kênh chat.
3. **Màn hình chat**: Hiển thị giao diện chat và xử lý tin nhắn.
4. **Màn hình hồ sơ**: Cho phép người dùng chỉnh sửa thông tin cá nhân.
5. **Màn hình cài đặt**: Quản lý tùy chọn ứng dụng và đăng xuất.

---

## 4. Quy trình triển khai

### a. Thiết lập và khởi tạo
- Tạo dự án React Native.
- Cài đặt và cấu hình SDK Sendbird.

### b. Xác thực người dùng
- Thêm form đăng nhập và đăng ký.
- Xác thực người dùng qua Sendbird hoặc backend tùy chỉnh.

### c. Tích hợp tính năng chat
- Kết nối đến kênh chat trên Sendbird.
- Xây dựng các hàm gửi, nhận và hiển thị tin nhắn.
- Kích hoạt chatbot AI thông qua bảng điều khiển Sendbird.

### d. Thiết kế giao diện
- Sử dụng thư viện **react-native-gifted-chat** hoặc tự xây dựng các thành phần giao diện tùy chỉnh.
- Thêm các tính năng như avatar, thời gian gửi tin nhắn và trạng thái đang nhập.

### e. Thông báo
- Cấu hình thông báo đẩy để nhận cảnh báo khi có tin nhắn mới.

### f. Kiểm tra
- Kiểm tra tính năng chat (nhắn tin thời gian thực, phản hồi AI).
- Đảm bảo chuyển đổi màn hình mượt mà.
- Khắc phục lỗi và tối ưu hiệu suất.

---

## 5. Các bước triển khai chi tiết

1. **Cài đặt cơ bản**: Tạo dự án React Native và tích hợp SDK Sendbird.
2. **Xác thực**: Thêm chức năng đăng nhập và đăng ký.
3. **Tính năng chat**: Xây dựng giao diện chat và kích hoạt chatbot AI.
4. **Thông báo đẩy**: Tích hợp thông báo đẩy.
5. **Cài đặt và quản lý hồ sơ**: Thêm tính năng chỉnh sửa hồ sơ và cài đặt.
6. **Kiểm tra và khắc phục lỗi**: Đảm bảo mọi tính năng hoạt động trơn tru.
7. **Triển khai**: Build và phát hành ứng dụng trên Android và iOS.

---

## 6. Nâng cấp tính năng (Tùy chọn)
- **Logic AI tùy chỉnh**: Tạo dịch vụ backend xử lý chatbot thông minh hơn.
- **Chia sẻ tệp**: Hỗ trợ gửi hình ảnh, video và tài liệu.
- **Phân tích dữ liệu**: Theo dõi hành vi người dùng và hiệu suất ứng dụng.

---

## 7. Công cụ và công nghệ cần thiết
| Thành phần    | Công nghệ |
|--------------|------------|
| **Frontend** | React Native |
| **Backend** (tùy chọn) | Sendbird Admin Panel |
| **Cơ sở dữ liệu** | Realm  |
| **Thư viện giao diện** | React Navigation |
| **Thông báo** | Firebase Cloud Messaging (FCM) |

---

## 8.User test case:
- **User ID**: Astra
- **Nickname**: VIper

## 9.Note:
- docker 
- CI/CD
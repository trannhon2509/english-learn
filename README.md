# English Learn - Website học tiếng Anh

Một ứng dụng web hiện đại để học tiếng Anh được xây dựng với React, React Router DOM và Ant Design với hỗ trợ responsive hoàn toàn cho mobile.

## 🚀 Tính năng

- **Responsive Design**: Hoạt động tối ưu trên mọi thiết bị (desktop, tablet, mobile)
- **React Router DOM**: Điều hướng mượt mà giữa các trang
- **Ant Design**: UI components hiện đại và đẹp mắt
- **Hai loại Layout**:
  - **BasicLayout**: Header + Content + Footer
  - **ListLayout**: Header + Sidebar + Content (responsive)
- **Mobile-First**: Thiết kế ưu tiên mobile với navigation drawer
- **Touch-Friendly**: Tối ưu cho thiết bị cảm ứng

## 📱 Layouts

### BasicLayout
- **Sử dụng cho**: Trang chủ, Profile
- **Bao gồm**: 
  - Header với navigation menu
  - Content area cho nội dung chính
  - Footer với thông tin bản quyền
- **Responsive**: Menu collapse thành hamburger menu trên mobile

### ListLayout  
- **Sử dụng cho**: Trang học tập với danh sách khóa học
- **Bao gồm**:
  - Header với navigation menu
  - Sidebar với categories và thống kê (ẩn trên mobile, hiện dưới dạng card)
  - Content area cho danh sách khóa học
- **Responsive**: Sidebar chuyển thành mobile-friendly cards

## 🛠️ Công nghệ sử dụng

- **React 19.1.0**: Framework chính
- **React Router DOM**: Routing
- **Ant Design (antd)**: UI Component Library
- **@ant-design/icons**: Icon library
- **Vite**: Build tool và dev server
- **CSS3**: Custom responsive styles

## 📦 Cài đặt

1. Clone repository:
```bash
git clone <repository-url>
cd english-learn
```

2. Cài đặt dependencies:
```bash
npm install
```

3. Chạy development server:
```bash
npm run dev
```

4. Mở trình duyệt tại `http://localhost:5173`

## 📁 Cấu trúc thư mục

```
src/
├── layouts/
│   ├── BasicLayout.jsx     # Layout cơ bản
│   ├── ListLayout.jsx      # Layout với sidebar
│   ├── layout.css          # CSS responsive cho layouts
│   └── index.js            # Export layouts
├── pages/
│   ├── HomePage.jsx        # Trang chủ
│   ├── LearnPage.jsx       # Trang học tập
│   └── ProfilePage.jsx     # Trang hồ sơ
├── components/             # Thành phần tái sử dụng (có thể mở rộng)
├── App.jsx                 # Router configuration
├── App.css                 # CSS chính
├── index.css               # CSS cơ sở + Ant Design import
└── main.jsx                # Entry point
```

## 🎨 Responsive Design

### Breakpoints
- **Mobile**: ≤ 768px
- **Tablet**: 769px - 992px  
- **Desktop**: ≥ 993px

### Mobile Features
- Hamburger menu thay thế horizontal navigation
- Touch-friendly buttons (min-height: 44px)
- Sidebar collapse thành cards
- Optimized typography scaling
- Safe area support cho devices có notch

### Desktop Features
- Full horizontal navigation
- Fixed sidebar cho ListLayout
- Hover effects
- Larger touch targets

## 🔧 Customization

### Thêm trang mới
1. Tạo component trong `src/pages/`
2. Import vào `App.jsx`
3. Thêm route với layout phù hợp:

```jsx
<Route
  path="/new-page"
  element={
    <BasicLayout> {/* hoặc ListLayout */}
      <NewPage />
    </BasicLayout>
  }
/>
```

### Tùy chỉnh Layout
- Chỉnh sửa CSS trong `src/layouts/layout.css`
- Modify components trong `src/layouts/`
- Update navigation items trong layout files

### Thêm sidebar content cho ListLayout
```jsx
<ListLayout sidebarContent={<CustomSidebar />}>
  <YourPage />
</ListLayout>
```

## 🌟 Scripts

- `npm run dev`: Development server
- `npm run build`: Production build
- `npm run preview`: Preview production build
- `npm run lint`: ESLint checking

## 📧 Liên hệ

Dự án được tạo bởi GitHub Copilot cho mục đích học tập và phát triển ứng dụng web hiện đại.

---
⭐ Nếu bạn thấy dự án hữu ích, hãy cho một star!+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

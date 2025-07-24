import React from 'react';
import { Layout, Menu, Button, Drawer } from 'antd';
import { MenuOutlined, HomeOutlined, BookOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './layout.css';

const { Header, Content, Footer } = Layout;

const BasicLayout = ({ children }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: <Link to="/">Trang chủ</Link>,
    },
    {
      key: '/learn',
      icon: <BookOutlined />,
      label: <Link to="/learn">Học tập</Link>,
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: <Link to="/profile">Hồ sơ</Link>,
    },
  ];

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <Layout className="layout-content-wrapper" style={{ minHeight: '100vh' }}>
      <Header className="basic-layout-header">
        <Link to="/" className="brand-logo">
          English Learn
        </Link>

        {/* Desktop Menu */}
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{
            flex: 1,
            minWidth: 0,
            marginLeft: '24px',
          }}
          className="desktop-menu"
        />

        {/* Mobile Menu Button */}
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={showDrawer}
          className="mobile-menu-button"
        />

        {/* Mobile Drawer */}
        <Drawer
          title="Menu"
          placement="right"
          closable={true}
          onClose={closeDrawer}
          open={drawerVisible}
          className="mobile-nav-drawer"
        >
          <Menu
            mode="vertical"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={closeDrawer}
          />
        </Drawer>
      </Header>

      <Content className="basic-layout-content">
        {children}
      </Content>

      <Footer className="basic-layout-footer">
        English Learn ©{new Date().getFullYear()} - Học tiếng Anh hiệu quả
      </Footer>
    </Layout>
  );
};

export default BasicLayout;

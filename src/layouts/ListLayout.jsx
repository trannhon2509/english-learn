import React from 'react';
import { Layout, Menu, Button, Drawer } from 'antd';
import { MenuOutlined, HomeOutlined, BookOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './layout.css';

const { Header, Content, Sider } = Layout;

const ListLayout = ({ children, sidebarContent }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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

      <Layout style={{ marginTop: 64 }}>
        {/* Desktop Sidebar */}
        <Sider
          width={300}
          className="desktop-sidebar list-layout-sidebar"
          breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={(broken) => {
            setSidebarCollapsed(broken);
          }}
          style={{
            overflow: 'auto',
            height: 'calc(100vh - 64px)',
            position: 'fixed',
            left: 0,
            top: 64,
            backgroundColor: '#fff',
            borderRight: '1px solid #f0f0f0',
          }}
        >
          <div style={{ padding: '16px' }}>
            {sidebarContent || (
              <div>
                <h3>Danh sách mục</h3>
                <p>Nội dung sidebar mặc định</p>
              </div>
            )}
          </div>
        </Sider>

        <Layout>
          <Content className="list-layout-content" style={{
            marginLeft: sidebarCollapsed ? 0 : 300,
            transition: 'margin-left 0.2s'
          }}>
            {/* Mobile Sidebar Content */}
            <div className="mobile-sidebar" style={{
              display: 'block',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'block' }}>
                <div className="ant-mobile-sidebar" style={{ 
                  display: 'none',
                  '@media (max-width: 991px)': {
                    display: 'block'
                  }
                }}>
                  {sidebarContent}
                </div>
              </div>
            </div>
            
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ListLayout;
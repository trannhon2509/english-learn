
import React, { useState, useEffect } from 'react';
import { Layout, Menu, FloatButton } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  BookOutlined,
  MessageOutlined,
  AudioOutlined,
  SoundOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { ROUTES } from '../constants/routes';
import styles from './Sidebar.module.css';

const { Sider } = Layout;

const menuItems = [
  {
    key: ROUTES.VOCABULARY,
    icon: <BookOutlined />,
    label: 'Từ vựng',
    description: 'Học và luyện tập từ vựng'
  },
  {
    key: ROUTES.GRAMMAR,
    icon: <MessageOutlined />,
    label: 'Ngữ pháp',
    description: 'Học ngữ pháp tiếng Anh'
  },
  {
    key: ROUTES.LISTENING,
    icon: <AudioOutlined />,
    label: 'Luyện nghe',
    description: 'Cải thiện kỹ năng nghe'
  },
  {
    key: ROUTES.PRONUNCIATION,
    icon: <SoundOutlined />,
    label: 'Phát âm',
    description: 'Luyện tập phát âm'
  }
];

function useScreenSize() {
  const [size, setSize] = useState({ width: window.innerWidth });
  useEffect(() => {
    const handleResize = () => setSize({ width: window.innerWidth });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return size;
}

const Sidebar = ({ collapsed = false, onCollapse }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { width } = useScreenSize();
  const [fabOpen, setFabOpen] = useState(false);

  // sm: <=576px, md: <=768px
  const isMobile = width <= 768;

  const getSelectedKeys = () => {
    const currentPath = location.pathname;
    return [currentPath];
  };

  if (isMobile) {
    // Hiển thị FloatButton
    return (
      <div>
        <FloatButton
          icon={<MenuOutlined />}
          type="primary"
          size="large"
          style={{ right: 16, bottom: 32, zIndex: 2000, width: 64, height: 64 }}
          onClick={() => setFabOpen(!fabOpen)}
        />
        {fabOpen && (
          <div className={styles.fabMenuWrapper}>
            {menuItems.map((item, idx) => (
              <FloatButton
                key={item.key}
                icon={item.icon}
                description={item.label}
                shape="circle"
                size="large"
                style={{
                  right: 16,
                  bottom: 100 + idx * 80,
                  zIndex: 2001,
                  background: '#fff',
                  boxShadow: '0 6px 24px rgba(24,144,255,0.18)',
                  width: 64,
                  height: 64,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={() => {
                  setFabOpen(false);
                  navigate(item.key);
                }}
                tooltip={item.label}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  // Desktop: Hiển thị Sidebar như cũ
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      className={styles.sidebar}
      width={250}
      collapsedWidth={80}
      breakpoint="lg"
    >
      <Menu
        mode="inline"
        selectedKeys={getSelectedKeys()}
        items={menuItems.map(item => ({
          key: item.key,
          icon: item.icon,
          label: <Link to={item.key}>{item.label}</Link>,
          title: item.description,
        }))}
        className={styles.sidebarMenu}
      />
    </Sider>
  );
};

export default Sidebar;

import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import {
  BookOutlined,
  MessageOutlined,
  AudioOutlined,
  SoundOutlined,
} from '@ant-design/icons';
import { ROUTES } from '../constants/routes';
import styles from './Sidebar.module.css';

const { Sider } = Layout;

const Sidebar = ({ collapsed = false, onCollapse }) => {
  const location = useLocation();

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

  // Function to determine if a menu item should be selected
  const getSelectedKeys = () => {
    const currentPath = location.pathname;
    return [currentPath];
  };

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

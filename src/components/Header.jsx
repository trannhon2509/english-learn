import React, { useState } from 'react';
import { Layout, Menu, Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { getMenuItems } from '../config/navigation.jsx';
import { APP_CONFIG } from '../constants';
import styles from '@css/Header.module.css';

const { Header: AntHeader } = Layout;

const Header = ({ showSidebar = false, title = APP_CONFIG.NAME }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const location = useLocation();

  const desktopMenuItems = getMenuItems(false);
  const mobileMenuItems = getMenuItems(true);

  // Function to determine if a menu item should be selected
  const getSelectedKeys = () => {
    const currentPath = location.pathname;
    
    // Exact match for home page
    if (currentPath === '/') {
      return ['/'];
    }
    
    // For learn routes, highlight the learn menu item
    if (currentPath.startsWith('/learn')) {
      return ['/learn'];
    }
    
    // For other routes, try exact match
    return [currentPath];
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const handleMenuClick = () => {
    closeDrawer();
  };

  return (
    <AntHeader className={styles.header}>
      <Link to="/" className={styles.brandLogo}>
        {title}
      </Link>

      {!showSidebar && (
        <>
          {/* Desktop Menu */}
          <Menu
            mode="horizontal"
            selectedKeys={getSelectedKeys()}
            items={desktopMenuItems.map(item => ({
              ...item,
              label: item.children ? item.label : <Link to={item.key}>{item.label}</Link>,
              children: item.children?.map(child => ({
                ...child,
                label: <Link to={child.key}>{child.label}</Link>,
              })),
            }))}
            className={styles.desktopMenu}
          />

          {/* Mobile Menu Button */}
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={showDrawer}
            className={styles.mobileMenuButton}
          />

          {/* Mobile Drawer */}
          <Drawer
            title="Menu"
            placement="right"
            closable={true}
            onClose={closeDrawer}
            open={drawerVisible}
            className={styles.mobileNavDrawer}
          >
            <Menu
              mode="vertical"
              selectedKeys={getSelectedKeys()}
              items={mobileMenuItems.map(item => ({
                ...item,
                label: item.children ? item.label : <Link to={item.key}>{item.label}</Link>,
                children: item.children?.map(child => ({
                  ...child,
                  label: <Link to={child.key}>{child.label}</Link>,
                })),
              }))}
              onClick={handleMenuClick}
            />
          </Drawer>
        </>
      )}
    </AntHeader>
  );
};

export default Header;

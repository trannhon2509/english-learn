import React, { useState, useMemo, useCallback } from 'react';
import { Layout, Menu, Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';
import { getMenuItems } from '../config/navigation.jsx';
import { APP_CONFIG } from '../constants';
import styles from '@css/Header.module.css';

const { Header: AntHeader } = Layout;


const mapMenuItems = (items) =>
  items.map(item => ({
    ...item,
    label: item.children ? item.label : <Link to={item.key}>{item.label}</Link>,
    children: item.children?.map(child => ({
      ...child,
      label: <Link to={child.key}>{child.label}</Link>,
    })),
  }));

const DesktopMenu = React.memo(({ items, selectedKeys }) => (
  <Menu
    mode="horizontal"
    selectedKeys={selectedKeys}
    items={items}
    className={styles.desktopMenu}
  />
));

const MobileDrawerMenu = React.memo(({ visible, onClose, items, selectedKeys, onMenuClick }) => (
  <Drawer
    title="Menu"
    placement="right"
    closable={true}
    onClose={onClose}
    open={visible}
    className={styles.mobileNavDrawer}
  >
    <Menu
      mode="vertical"
      selectedKeys={selectedKeys}
      items={items}
      onClick={onMenuClick}
    />
  </Drawer>
));

const Header = ({ showSidebar = false, title = APP_CONFIG.NAME }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const location = useLocation();

  // Memoize menu items
  const desktopMenuItems = useMemo(() => mapMenuItems(getMenuItems(false)), []);
  const mobileMenuItems = useMemo(() => mapMenuItems(getMenuItems(true)), []);

  // Memoize selected keys
  const selectedKeys = useMemo(() => {
    const currentPath = location.pathname;
    if (currentPath === '/') return ['/'];
    if (currentPath.startsWith('/learn')) return ['/learn'];
    return [currentPath];
  }, [location.pathname]);

  // Memoize handlers
  const showDrawer = useCallback(() => setDrawerVisible(true), []);
  const closeDrawer = useCallback(() => setDrawerVisible(false), []);
  const handleMenuClick = useCallback(() => setDrawerVisible(false), []);

  return (
    <AntHeader className={styles.header}>
      <Link to="/" className={styles.brandLogo}>
        {title}
      </Link>

      {!showSidebar && (
        <>
          <DesktopMenu items={desktopMenuItems} selectedKeys={selectedKeys} />
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={showDrawer}
            className={styles.mobileMenuButton}
          />
          <MobileDrawerMenu
            visible={drawerVisible}
            onClose={closeDrawer}
            items={mobileMenuItems}
            selectedKeys={selectedKeys}
            onMenuClick={handleMenuClick}
          />
        </>
      )}
    </AntHeader>
  );
};

export default React.memo(Header);

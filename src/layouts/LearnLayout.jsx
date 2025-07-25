import React, { Suspense, useState } from 'react';
import { Layout, Spin } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from '@components/Header';
import Sidebar from '@components/Sidebar';
import styles from '@css/LearnLayout.module.css';

const { Content } = Layout;

const LearnLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout className={styles.layoutWrapper}>
      <Header />
      <Layout>
        <Sidebar collapsed={collapsed} onCollapse={onCollapse} />
        <Content className={styles.content}>
          <div className={styles.contentInner}>
            <Suspense fallback={
              <div style={{ textAlign: 'center', padding: '50px 0' }}>
                <Spin size="large" />
              </div>
            }>
                   
              <Outlet />
            </Suspense>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LearnLayout;

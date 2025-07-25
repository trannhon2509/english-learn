import React, { Suspense } from 'react';
import { Layout, Spin } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from '@components/Header';
import Footer from '@components/Footer';
import styles from '@css/BasicLayout.module.css';

const { Content } = Layout;

const BasicLayout = () => {
  return (
    <Layout className={styles.layoutWrapper}>
      <Header />

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

      <Footer />
    </Layout>
  );
};

export default BasicLayout;

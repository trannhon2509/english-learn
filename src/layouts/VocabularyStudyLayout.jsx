import React, { Suspense } from 'react';
import { Layout, Spin } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from '@components/Header';
import SidebarStudy from '@components/SidebarStudy';
import styles from '@css/VocabularyStudyLayout.module.css';

const { Content } = Layout;

const VocabularyStudyLayout = () => {

  return (
    <Layout className={styles.layoutWrapper}>
      <Header />
      <Layout>
        <SidebarStudy />
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

export default VocabularyStudyLayout;

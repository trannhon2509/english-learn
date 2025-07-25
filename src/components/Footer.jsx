import React from 'react';
import { Layout } from 'antd';
import { APP_CONFIG } from '../constants';
import styles from './Footer.module.css';

const { Footer: AntFooter } = Layout;

const Footer = ({ text = `${APP_CONFIG.NAME} ©${new Date().getFullYear()} - ${APP_CONFIG.DESCRIPTION}` }) => {
  return (
    <AntFooter className={styles.footer}>
      {text}
    </AntFooter>
  );
};

export default Footer;

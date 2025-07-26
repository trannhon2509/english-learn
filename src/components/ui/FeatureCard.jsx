import React from 'react';
import { Typography } from 'antd';
import styles from '@css/HomePage.module.css';

const { Title, Paragraph } = Typography;

const FeatureCard = React.memo(({ icon, title, description }) => (
  <div className={styles.featureCard}>
    {icon}
    <Title level={4} className={styles.featureTitle}>{title}</Title>
    <Paragraph className={styles.featureDescription}>{description}</Paragraph>
  </div>
));

export default FeatureCard;

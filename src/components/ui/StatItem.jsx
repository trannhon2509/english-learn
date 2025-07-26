import React from 'react';
import styles from '@css/HomePage.module.css';

const StatItem = React.memo(({ number, label }) => (
  <div className={styles.statItem}>
    <span className={styles.statNumber}>{number}</span>
    <span className={styles.statLabel}>{label}</span>
  </div>
));

export default StatItem;

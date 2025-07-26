import React from 'react';
import { Card, Progress } from 'antd';
import { FireOutlined, CheckCircleOutlined, HourglassOutlined } from '@ant-design/icons';
import styles from '@css/SidebarStudy.module.css';

const SidebarStudy = () => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.sidebarStudyWrapper}>
                <h2 className={styles.sidebarStudyTitle}>
                    Thống kê học từ vựng
                </h2>
                <Card
                    styles={{ body: { padding: 0 } }}
                    className={styles.sidebarStudyCard}
                >
                    <div className={styles.sidebarStudyStats}>
                        <div className={styles.statLearned}>
                            <CheckCircleOutlined className={styles.statIcon} />
                            <div className={styles.statLabel}>Từ đã học</div>
                            <div className={styles.statValue}>120 <span className={styles.statValueSub}>/ 200</span></div>
                        </div>
                        <div className={styles.statRemaining}>
                            <HourglassOutlined className={styles.statIcon} />
                            <div className={styles.statLabel}>Từ còn lại</div>
                            <div className={styles.statValue}>80</div>
                        </div>
                    </div>
                    <div className={styles.sidebarStudyProgress}>
                        <div className={styles.progressLabel}>Tiến độ tổng thể</div>
                        <Progress percent={60} strokeColor="#fff" trailColor="#e6f7ff" showInfo={false} className={styles.progressBar} />
                        <div className={styles.progressPercent}>60%</div>
                    </div>
                </Card>
            </div>
        </aside>
    );
};

export default React.memo(SidebarStudy);

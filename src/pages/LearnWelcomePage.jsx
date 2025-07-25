import React from 'react';
import { Card, Typography, Button, Row, Col, Progress } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  BookOutlined,
  MessageOutlined,
  AudioOutlined,
  SoundOutlined,
  RocketOutlined,
  TrophyOutlined
} from '@ant-design/icons';
import { ROUTES } from '../constants/routes';
import styles from './LearnWelcomePage.module.css';

const { Title, Paragraph } = Typography;

const LearnWelcomePage = () => {
  const navigate = useNavigate();

  const learningStats = {
    totalWords: 1250,
    learnedWords: 680,
    streak: 15,
    level: 'Trung cấp'
  };

  const quickActions = [
    {
      id: 'vocabulary',
      title: 'Học từ vựng',
      description: 'Mở rộng vốn từ vựng với hơn 10,000 từ',
      icon: <BookOutlined />,
      route: ROUTES.VOCABULARY,
      color: '#1890ff',
      progress: 65
    },
    {
      id: 'grammar',
      title: 'Ngữ pháp',
      description: 'Nắm vững các quy tắc ngữ pháp',
      icon: <MessageOutlined />,
      route: ROUTES.GRAMMAR,
      color: '#52c41a',
      progress: 40
    },
    {
      id: 'listening',
      title: 'Luyện nghe',
      description: 'Cải thiện kỹ năng nghe hiểu',
      icon: <AudioOutlined />,
      route: ROUTES.LISTENING,
      color: '#fa8c16',
      progress: 30
    },
    {
      id: 'pronunciation',
      title: 'Phát âm',
      description: 'Luyện tập phát âm chuẩn',
      icon: <SoundOutlined />,
      route: ROUTES.PRONUNCIATION,
      color: '#eb2f96',
      progress: 25
    }
  ];

  const handleStartLearning = (route) => {
    navigate(route);
  };

  return (
    <div className={styles.container}>
      {/* Welcome Section */}
      <div className={styles.welcomeSection}>
        <div className={styles.welcomeContent}>
          <Title level={2} className={styles.welcomeTitle}>
            <RocketOutlined className={styles.welcomeIcon} />
            Chào mừng đến với học tập!
          </Title>
          <Paragraph className={styles.welcomeDesc}>
            Bắt đầu hành trình học tiếng Anh của bạn. Chọn một trong các phương pháp học bên dưới để bắt đầu.
          </Paragraph>
        </div>
        
        {/* Stats Cards */}
        <Row gutter={[16, 16]} className={styles.statsRow}>
          <Col xs={12} sm={6}>
            <Card className={styles.statCard}>
              <div className={styles.statNumber}>{learningStats.learnedWords}</div>
              <div className={styles.statLabel}>Từ đã học</div>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className={styles.statCard}>
              <div className={styles.statNumber}>{learningStats.streak}</div>
              <div className={styles.statLabel}>Ngày liên tiếp</div>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className={styles.statCard}>
              <div className={styles.statNumber}>{learningStats.totalWords}</div>
              <div className={styles.statLabel}>Tổng từ vựng</div>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className={styles.statCard}>
              <div className={styles.statNumber}>{learningStats.level}</div>
              <div className={styles.statLabel}>Cấp độ</div>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Learning Methods */}
      <div className={styles.methodsSection}>
        <Title level={3} className={styles.sectionTitle}>
          <TrophyOutlined /> Chọn phương pháp học
        </Title>
        
        <Row gutter={[24, 24]}>
          {quickActions.map((action) => (
            <Col xs={24} sm={12} lg={6} key={action.id}>
              <Card 
                className={styles.methodCard}
                hoverable
                onClick={() => handleStartLearning(action.route)}
              >
                <div className={styles.methodIcon} style={{ color: action.color }}>
                  {action.icon}
                </div>
                <Title level={4} className={styles.methodTitle}>
                  {action.title}
                </Title>
                <Paragraph className={styles.methodDesc}>
                  {action.description}
                </Paragraph>
                <div className={styles.progressSection}>
                  <div className={styles.progressLabel}>
                    Tiến độ: {action.progress}%
                  </div>
                  <Progress 
                    percent={action.progress} 
                    strokeColor={action.color}
                    showInfo={false}
                    size="small"
                  />
                </div>
                <Button 
                  type="primary" 
                  block 
                  className={styles.startButton}
                  style={{ backgroundColor: action.color, borderColor: action.color }}
                >
                  Bắt đầu học
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default LearnWelcomePage;

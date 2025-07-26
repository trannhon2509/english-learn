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
import { ROUTES } from '@constants/routes';
import styles from '@css/LearnWelcomePage.module.css';

const { Title, Paragraph } = Typography;

// 1. StatCard Component
const StatCard = React.memo(({ value, label }) => (
  <Card className={styles.statCard}>
    <div className={styles.statNumber}>{value}</div>
    <div className={styles.statLabel}>{label}</div>
  </Card>
));

// 2. LearningMethodCard Component
const LearningMethodCard = React.memo(({ action, onClick }) => (
  <Card 
    className={styles.methodCard}
    hoverable
    onClick={onClick}
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
));

// 3. WelcomeSection Component
const WelcomeSection = React.memo(({ learningStats }) => (
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
        <StatCard value={learningStats.learnedWords} label="Từ đã học" />
      </Col>
      <Col xs={12} sm={6}>
        <StatCard value={learningStats.streak} label="Ngày liên tiếp" />
      </Col>
      <Col xs={12} sm={6}>
        <StatCard value={learningStats.totalWords} label="Tổng từ vựng" />
      </Col>
      <Col xs={12} sm={6}>
        <StatCard value={learningStats.level} label="Cấp độ" />
      </Col>
    </Row>
  </div>
));

// 4. LearningMethodsSection Component
const LearningMethodsSection = React.memo(({ quickActions, onStartLearning }) => (
  <div className={styles.methodsSection}>
    <Title level={3} className={styles.sectionTitle}>
      <TrophyOutlined /> Chọn phương pháp học
    </Title>
    
    <Row gutter={[24, 24]}>
      {quickActions.map((action) => (
        <Col xs={24} sm={12} lg={6} key={action.id}>
          <LearningMethodCard 
            action={action} 
            onClick={() => onStartLearning(action.route)} 
          />
        </Col>
      ))}
    </Row>
  </div>
));

// 5. Main Page Component
const LearnWelcomePage = () => {
  const navigate = useNavigate();

  const learningStats = React.useMemo(() => ({
    totalWords: 1250,
    learnedWords: 680,
    streak: 15,
    level: 'Trung cấp'
  }), []);

  const quickActions = React.useMemo(() => [
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
  ], []);

  const handleStartLearning = React.useCallback((route) => {
    navigate(route);
  }, [navigate]);

  return (
    <div className={styles.container}>
      <WelcomeSection learningStats={learningStats} />
      <LearningMethodsSection 
        quickActions={quickActions} 
        onStartLearning={handleStartLearning} 
      />
    </div>
  );
};

export default LearnWelcomePage;
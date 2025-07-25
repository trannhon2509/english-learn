import React from 'react';
import { Card, Button, Typography, Space, Row, Col } from 'antd';
import { 
  ArrowLeftOutlined, 
  PlayCircleOutlined, 
  EditOutlined, 
  TranslationOutlined, 
  UnorderedListOutlined,
  BookOutlined
} from '@ant-design/icons';
import styles from './VocabularyMethods.module.css';

const { Title, Paragraph } = Typography;

const VocabularyMethods = ({ vocabulary, onSelectMethod, onBack }) => {
  const methods = [
    {
      key: 'flashcard',
      title: 'Học theo Flashcard',
      description: 'Học từ vựng qua thẻ ghi nhớ với hình ảnh và âm thanh',
      icon: <PlayCircleOutlined style={{ fontSize: '48px', color: '#1890ff' }} />,
      color: '#1890ff',
      gradient: 'linear-gradient(135deg, #1890ff, #096dd9)',
      features: ['Lật thẻ để xem nghĩa', 'Phát âm chuẩn', 'Hình ảnh minh họa', 'Theo dõi tiến độ']
    },
    {
      key: 'english-input',
      title: 'Nhập nghĩa tiếng Anh',
      description: 'Luyện tập bằng cách nhập định nghĩa tiếng Anh của từ vựng',
      icon: <EditOutlined style={{ fontSize: '48px', color: '#52c41a' }} />,
      color: '#52c41a',
      gradient: 'linear-gradient(135deg, #52c41a, #389e0d)',
      features: ['Nhập nghĩa tiếng Anh', 'Kiểm tra chính xác', 'Gợi ý từ khóa', 'Cải thiện từ vựng']
    },
    {
      key: 'vietnamese-input',
      title: 'Nhập nghĩa tiếng Việt',
      description: 'Luyện tập bằng cách nhập nghĩa tiếng Việt của từ vựng',
      icon: <TranslationOutlined style={{ fontSize: '48px', color: '#fa8c16' }} />,
      color: '#fa8c16',
      gradient: 'linear-gradient(135deg, #fa8c16, #d46b08)',
      features: ['Nhập nghĩa tiếng Việt', 'Dễ dàng cho người mới', 'Kiểm tra tức thì', 'Củng cố kiến thức']
    },
    {
      key: 'word-list',
      title: 'Xem danh sách từ vựng',
      description: 'Xem và ôn tập toàn bộ danh sách từ vựng trong kho',
      icon: <UnorderedListOutlined style={{ fontSize: '48px', color: '#722ed1' }} />,
      color: '#722ed1',
      gradient: 'linear-gradient(135deg, #722ed1, #531dab)',
      features: ['Danh sách đầy đủ', 'Tìm kiếm nhanh', 'Phân loại theo chủ đề', 'Đánh dấu yêu thích']
    }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={onBack}
          className={styles.backButton}
        >
          Quay lại danh sách kho từ vựng
        </Button>
        
        <Title level={2} className={styles.title}>
          <BookOutlined className={styles.titleIcon} />
          {vocabulary.title}
        </Title>
        <Paragraph className={styles.description}>
          {vocabulary.description}
        </Paragraph>
        
        <div className={styles.statsCard}>
          <Space size="large" wrap>
            <span><strong>Tổng số từ:</strong> {vocabulary.totalWords}</span>
            <span><strong>Đã học:</strong> {vocabulary.learnedWords}</span>
            <span><strong>Còn lại:</strong> {vocabulary.totalWords - vocabulary.learnedWords}</span>
            <span><strong>Tiến độ:</strong> {Math.round((vocabulary.learnedWords / vocabulary.totalWords) * 100)}%</span>
          </Space>
        </div>
      </div>

      <Title level={3} className={styles.methodsTitle}>
        Chọn phương pháp học
      </Title>

      <Row gutter={[24, 24]}>
        {methods.map(method => (
          <Col xs={24} sm={12} lg={12} xl={12} key={method.key}>
            <Card
              hoverable
              className={styles.methodCard}
              style={{ 
                borderColor: method.color,
              }}
              bodyStyle={{ 
                display: 'flex', 
                flexDirection: 'column', 
                height: '100%',
                padding: '24px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = method.color;
                e.currentTarget.style.boxShadow = `0 8px 30px ${method.color}30`;
                e.currentTarget.style.transform = 'translateY(-4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(24, 144, 255, 0.3)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div className={styles.iconContainer}>
                {method.icon}
              </div>
              
              <Title level={4} className={styles.methodTitle}>
                {method.title}
              </Title>
              
              <Paragraph className={styles.methodDescription}>
                {method.description}
              </Paragraph>

              <div className={styles.featuresContainer}>
                <Title level={5} className={styles.featuresTitle}>Tính năng:</Title>
                <ul className={styles.featuresList}>
                  {method.features.map((feature, index) => (
                    <li key={index} className={styles.featureItem}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                type="primary" 
                size="large"
                block
                className={styles.startButton}
                style={{ 
                  background: method.gradient,
                  borderColor: 'transparent',
                }}
                onClick={() => onSelectMethod(method.key)}
              >
                Bắt đầu học
              </Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default VocabularyMethods;

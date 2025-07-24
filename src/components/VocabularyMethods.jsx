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

const { Title, Paragraph } = Typography;

const VocabularyMethods = ({ vocabulary, onSelectMethod, onBack }) => {
  const methods = [
    {
      key: 'flashcard',
      title: 'Học theo Flashcard',
      description: 'Học từ vựng qua thẻ ghi nhớ với hình ảnh và âm thanh',
      icon: <PlayCircleOutlined style={{ fontSize: '48px', color: '#1890ff' }} />,
      color: '#1890ff',
      features: ['Lật thẻ để xem nghĩa', 'Phát âm chuẩn', 'Hình ảnh minh họa', 'Theo dõi tiến độ']
    },
    {
      key: 'english-input',
      title: 'Nhập nghĩa tiếng Anh',
      description: 'Luyện tập bằng cách nhập định nghĩa tiếng Anh của từ vựng',
      icon: <EditOutlined style={{ fontSize: '48px', color: '#52c41a' }} />,
      color: '#52c41a',
      features: ['Nhập nghĩa tiếng Anh', 'Kiểm tra chính xác', 'Gợi ý từ khóa', 'Cải thiện từ vựng']
    },
    {
      key: 'vietnamese-input',
      title: 'Nhập nghĩa tiếng Việt',
      description: 'Luyện tập bằng cách nhập nghĩa tiếng Việt của từ vựng',
      icon: <TranslationOutlined style={{ fontSize: '48px', color: '#fa8c16' }} />,
      color: '#fa8c16',
      features: ['Nhập nghĩa tiếng Việt', 'Dễ dàng cho người mới', 'Kiểm tra tức thì', 'Củng cố kiến thức']
    },
    {
      key: 'word-list',
      title: 'Xem danh sách từ vựng',
      description: 'Xem và ôn tập toàn bộ danh sách từ vựng trong kho',
      icon: <UnorderedListOutlined style={{ fontSize: '48px', color: '#722ed1' }} />,
      color: '#722ed1',
      features: ['Danh sách đầy đủ', 'Tìm kiếm nhanh', 'Phân loại theo chủ đề', 'Đánh dấu yêu thích']
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={onBack}
          style={{ marginBottom: '16px' }}
        >
          Quay lại danh sách kho từ vựng
        </Button>
        
        <Title level={2}>
          <BookOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
          {vocabulary.title}
        </Title>
        <Paragraph style={{ fontSize: '16px', color: '#666' }}>
          {vocabulary.description}
        </Paragraph>
        
        <div style={{ 
          padding: '16px', 
          backgroundColor: '#f0f8ff', 
          borderRadius: '8px',
          marginBottom: '24px'
        }}>
          <Space size="large">
            <span><strong>Tổng số từ:</strong> {vocabulary.totalWords}</span>
            <span><strong>Đã học:</strong> {vocabulary.learnedWords}</span>
            <span><strong>Còn lại:</strong> {vocabulary.totalWords - vocabulary.learnedWords}</span>
            <span><strong>Tiến độ:</strong> {Math.round((vocabulary.learnedWords / vocabulary.totalWords) * 100)}%</span>
          </Space>
        </div>
      </div>

      <Title level={3} style={{ marginBottom: '24px' }}>
        Chọn phương pháp học
      </Title>

      <Row gutter={[16, 16]}>
        {methods.map(method => (
          <Col xs={24} sm={12} lg={12} xl={12} key={method.key}>
            <Card
              hoverable
              style={{ 
                height: '100%',
                borderColor: method.color,
                transition: 'all 0.3s'
              }}
              bodyStyle={{ 
                display: 'flex', 
                flexDirection: 'column', 
                height: '100%',
                padding: '24px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = method.color;
                e.currentTarget.style.boxShadow = `0 4px 20px ${method.color}30`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#d9d9d9';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                {method.icon}
              </div>
              
              <Title level={4} style={{ textAlign: 'center', marginBottom: '12px' }}>
                {method.title}
              </Title>
              
              <Paragraph style={{ 
                textAlign: 'center', 
                color: '#666',
                flexGrow: 1,
                marginBottom: '16px'
              }}>
                {method.description}
              </Paragraph>

              <div style={{ marginBottom: '20px' }}>
                <Title level={5} style={{ marginBottom: '8px' }}>Tính năng:</Title>
                <ul style={{ margin: 0, paddingLeft: '20px' }}>
                  {method.features.map((feature, index) => (
                    <li key={index} style={{ marginBottom: '4px', color: '#666' }}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                type="primary" 
                size="large"
                block
                style={{ 
                  backgroundColor: method.color,
                  borderColor: method.color,
                  marginTop: 'auto'
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

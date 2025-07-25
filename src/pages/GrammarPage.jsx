import React from 'react';
import { Typography, Card, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import { 
  BookOutlined, 
  SoundOutlined,
  TrophyOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { ROUTES } from '../constants/routes';

const { Title, Paragraph } = Typography;

const GrammarPage = () => {
  const grammarTopics = [
    {
      id: 1,
      title: 'Thì hiện tại đơn',
      description: 'Cách sử dụng và ví dụ về thì hiện tại đơn (Present Simple)',
      level: 'Cơ bản',
      lessons: 5,
      completed: false,
    },
    {
      id: 2,
      title: 'Thì quá khứ đơn',
      description: 'Học cách sử dụng thì quá khứ đơn và động từ bất quy tắc',
      level: 'Cơ bản',
      lessons: 6,
      completed: true,
    },
    {
      id: 3,
      title: 'Thì hiện tại hoàn thành',
      description: 'Hiểu và sử dụng thì hiện tại hoàn thành trong giao tiếp',
      level: 'Trung cấp',
      lessons: 8,
      completed: false,
    },
    {
      id: 4,
      title: 'Câu điều kiện',
      description: 'Các loại câu điều kiện và cách sử dụng trong tiếng Anh',
      level: 'Nâng cao',
      lessons: 10,
      completed: false,
    },
  ];

  return (
    <div style={{ padding: '20px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <Title level={1} style={{ color: '#1890ff' }}>
          Ngữ pháp tiếng Anh
        </Title>
        <Paragraph style={{ fontSize: '16px', color: '#666' }}>
          Học ngữ pháp một cách có hệ thống từ cơ bản đến nâng cao
        </Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        {grammarTopics.map((topic) => (
          <Col xs={24} sm={12} lg={8} key={topic.id}>
            <Card
              hoverable
              style={{ 
                height: '100%',
                borderRadius: '12px',
                border: '1px solid rgba(24, 144, 255, 0.1)',
              }}
              cover={
                <div style={{ 
                  padding: '30px', 
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, rgba(24, 144, 255, 0.1), rgba(114, 46, 209, 0.1))',
                }}>
                  <BookOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                </div>
              }
              actions={[
                <Button 
                  type="primary" 
                  icon={<SoundOutlined />}
                  style={{ width: '90%' }}
                >
                  {topic.completed ? 'Ôn tập' : 'Bắt đầu học'}
                </Button>
              ]}
            >
              <Card.Meta
                title={
                  <div>
                    <div style={{ color: '#1890ff', marginBottom: '4px' }}>
                      {topic.title}
                    </div>
                    <div style={{ 
                      fontSize: '12px', 
                      color: '#666',
                      fontWeight: 'normal',
                    }}>
                      {topic.level} • {topic.lessons} bài học
                    </div>
                  </div>
                }
                description={
                  <div>
                    <Paragraph 
                      style={{ 
                        color: '#666', 
                        fontSize: '14px',
                        marginBottom: '16px',
                        lineHeight: '1.5',
                      }}
                    >
                      {topic.description}
                    </Paragraph>
                    {topic.completed && (
                      <div style={{ color: '#52c41a', fontSize: '12px' }}>
                        <TrophyOutlined /> Đã hoàn thành
                      </div>
                    )}
                  </div>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>

      <div style={{ 
        textAlign: 'center', 
        marginTop: '60px',
        padding: '40px',
        background: 'linear-gradient(135deg, #1890ff, #722ed1)',
        borderRadius: '12px',
        color: 'white',
      }}>
        <Title level={2} style={{ color: 'white', marginBottom: '16px' }}>
          Luyện tập ngay hôm nay
        </Title>
        <Paragraph style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '16px' }}>
          Hãy bắt đầu với một chủ đề ngữ pháp để cải thiện kỹ năng tiếng Anh của bạn
        </Paragraph>
        <div style={{ marginTop: '24px' }}>
          <Link to={ROUTES.LEARN}>
            <Button 
              size="large" 
              icon={<ClockCircleOutlined />}
              style={{ 
                marginRight: '16px',
                background: 'rgba(255, 255, 255, 0.9)',
                borderColor: 'transparent',
                color: '#1890ff',
              }}
            >
              Quay lại học tập
            </Button>
          </Link>
          <Link to={ROUTES.VOCABULARY}>
            <Button 
              size="large" 
              icon={<BookOutlined />}
              style={{ 
                background: 'transparent',
                borderColor: 'rgba(255, 255, 255, 0.5)',
                color: 'white',
              }}
            >
              Học từ vựng
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GrammarPage;

import React from 'react';
import { Typography, Card, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import { 
  AudioOutlined, 
  PlayCircleOutlined,
  TrophyOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { ROUTES } from '../constants/routes';

const { Title, Paragraph } = Typography;

const ListeningPage = () => {
  const listeningExercises = [
    {
      id: 1,
      title: 'Giao tiếp hàng ngày',
      description: 'Luyện nghe các cuộc hội thoại thường gặp trong cuộc sống',
      level: 'Cơ bản',
      duration: '10 phút',
      completed: true,
    },
    {
      id: 2,
      title: 'Tin tức và thời sự',
      description: 'Cải thiện khả năng nghe hiểu tin tức và các chương trình thời sự',
      level: 'Trung cấp',
      duration: '15 phút',
      completed: false,
    },
    {
      id: 3,
      title: 'Phim và giải trí',
      description: 'Luyện nghe qua các đoạn phim và chương trình giải trí',
      level: 'Trung cấp',
      duration: '20 phút',
      completed: false,
    },
    {
      id: 4,
      title: 'Học thuật và khoa học',
      description: 'Nâng cao khả năng nghe hiểu các chủ đề học thuật và khoa học',
      level: 'Nâng cao',
      duration: '25 phút',
      completed: false,
    },
  ];

  return (
    <div style={{ padding: '20px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <Title level={1} style={{ color: '#1890ff' }}>
          Luyện nghe tiếng Anh
        </Title>
        <Paragraph style={{ fontSize: '16px', color: '#666' }}>
          Cải thiện kỹ năng nghe hiểu với các bài tập đa dạng
        </Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        {listeningExercises.map((exercise) => (
          <Col xs={24} sm={12} lg={8} key={exercise.id}>
            <Card
              hoverable
              style={{ 
                height: '100%',
                borderRadius: '12px',
                border: '1px solid rgba(114, 46, 209, 0.1)',
              }}
              cover={
                <div style={{ 
                  padding: '30px', 
                  textAlign: 'center',
                  background: 'linear-gradient(135deg, rgba(114, 46, 209, 0.1), rgba(24, 144, 255, 0.1))',
                }}>
                  <AudioOutlined style={{ fontSize: '48px', color: '#722ed1' }} />
                </div>
              }
              actions={[
                <Button 
                  type="primary" 
                  icon={<PlayCircleOutlined />}
                  style={{ 
                    width: '90%',
                    background: 'linear-gradient(135deg, #722ed1, #9254de)',
                    borderColor: 'transparent',
                  }}
                >
                  {exercise.completed ? 'Luyện lại' : 'Bắt đầu'}
                </Button>
              ]}
            >
              <Card.Meta
                title={
                  <div>
                    <div style={{ color: '#722ed1', marginBottom: '4px' }}>
                      {exercise.title}
                    </div>
                    <div style={{ 
                      fontSize: '12px', 
                      color: '#666',
                      fontWeight: 'normal',
                    }}>
                      {exercise.level} • {exercise.duration}
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
                      {exercise.description}
                    </Paragraph>
                    {exercise.completed && (
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
        background: 'linear-gradient(135deg, #722ed1, #1890ff)',
        borderRadius: '12px',
        color: 'white',
      }}>
        <Title level={2} style={{ color: 'white', marginBottom: '16px' }}>
          Tips luyện nghe hiệu quả
        </Title>
        <Row gutter={[24, 24]} style={{ marginTop: '32px' }}>
          <Col xs={24} md={8}>
            <div style={{ textAlign: 'center' }}>
              <AudioOutlined style={{ fontSize: '32px', marginBottom: '12px' }} />
              <Title level={4} style={{ color: 'white' }}>Nghe thường xuyên</Title>
              <Paragraph style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Luyện nghe mỗi ngày ít nhất 15-20 phút để cải thiện khả năng nghe hiểu
              </Paragraph>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div style={{ textAlign: 'center' }}>
              <PlayCircleOutlined style={{ fontSize: '32px', marginBottom: '12px' }} />
              <Title level={4} style={{ color: 'white' }}>Lặp lại nhiều lần</Title>
              <Paragraph style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Nghe lại các đoạn khó nhiều lần để làm quen với giọng điệu và phát âm
              </Paragraph>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div style={{ textAlign: 'center' }}>
              <TrophyOutlined style={{ fontSize: '32px', marginBottom: '12px' }} />
              <Title level={4} style={{ color: 'white' }}>Ghi chú từ mới</Title>
              <Paragraph style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                Ghi lại các từ vựng mới gặp trong quá trình luyện nghe để mở rộng vốn từ
              </Paragraph>
            </div>
          </Col>
        </Row>
        <div style={{ marginTop: '32px' }}>
          <Link to={ROUTES.LEARN}>
            <Button 
              size="large" 
              icon={<ClockCircleOutlined />}
              style={{ 
                marginRight: '16px',
                background: 'rgba(255, 255, 255, 0.9)',
                borderColor: 'transparent',
                color: '#722ed1',
              }}
            >
              Quay lại học tập
            </Button>
          </Link>
          <Link to={ROUTES.PRONUNCIATION}>
            <Button 
              size="large" 
              icon={<AudioOutlined />}
              style={{ 
                background: 'transparent',
                borderColor: 'rgba(255, 255, 255, 0.5)',
                color: 'white',
              }}
            >
              Luyện phát âm
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ListeningPage;

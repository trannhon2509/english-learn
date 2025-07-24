import React from 'react';
import { Card, Row, Col, Button, Typography } from 'antd';
import { BookOutlined, PlayCircleOutlined, TrophyOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const HomePage = () => {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <Title level={1}>Chào mừng đến với English Learn</Title>
        <Paragraph style={{ fontSize: '18px', color: '#666' }}>
          Nền tảng học tiếng Anh hiệu quả và thú vị
        </Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={8}>
          <Card
            hoverable
            style={{ textAlign: 'center', height: '100%' }}
            cover={
              <div style={{ padding: '40px', fontSize: '48px', color: '#1890ff' }}>
                <BookOutlined />
              </div>
            }
          >
            <Card.Meta
              title="Học từ vựng"
              description="Khám phá hàng ngàn từ vựng với phương pháp học hiệu quả"
            />
            <Button type="primary" style={{ marginTop: '16px' }}>
              Bắt đầu học
            </Button>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card
            hoverable
            style={{ textAlign: 'center', height: '100%' }}
            cover={
              <div style={{ padding: '40px', fontSize: '48px', color: '#52c41a' }}>
                <PlayCircleOutlined />
              </div>
            }
          >
            <Card.Meta
              title="Luyện nghe"
              description="Cải thiện kỹ năng nghe với các bài tập tương tác"
            />
            <Button type="primary" style={{ marginTop: '16px' }}>
              Luyện tập
            </Button>
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card
            hoverable
            style={{ textAlign: 'center', height: '100%' }}
            cover={
              <div style={{ padding: '40px', fontSize: '48px', color: '#faad14' }}>
                <TrophyOutlined />
              </div>
            }
          >
            <Card.Meta
              title="Thành tích"
              description="Theo dõi tiến trình học tập và nhận thưởng"
            />
            <Button type="primary" style={{ marginTop: '16px' }}>
              Xem thành tích
            </Button>
          </Card>
        </Col>
      </Row>

      <div style={{ marginTop: '48px', textAlign: 'center' }}>
        <Title level={2}>Tại sao chọn English Learn?</Title>
        <Row gutter={[24, 24]} style={{ marginTop: '32px' }}>
          <Col xs={24} md={8}>
            <Title level={4}>🎯 Học tập có mục tiêu</Title>
            <Paragraph>
              Đặt mục tiêu rõ ràng và theo dõi tiến trình học tập của bạn
            </Paragraph>
          </Col>
          <Col xs={24} md={8}>
            <Title level={4}>📱 Học mọi lúc, mọi nơi</Title>
            <Paragraph>
              Tương thích với mọi thiết bị, học tập linh hoạt theo thời gian của bạn
            </Paragraph>
          </Col>
          <Col xs={24} md={8}>
            <Title level={4}>🏆 Phương pháp hiệu quả</Title>
            <Paragraph>
              Sử dụng các phương pháp học tập hiện đại và đã được chứng minh
            </Paragraph>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HomePage;

import React from 'react';
import { Card, Row, Col, Avatar, Button, Progress, List, Tag, Typography, Statistic } from 'antd';
import { UserOutlined, EditOutlined, TrophyOutlined, CalendarOutlined, BookOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const ProfilePage = () => {
  const achievements = [
    { title: 'Học viên tích cực', description: 'Học 7 ngày liên tiếp', icon: '🔥', earned: true },
    { title: 'Bậc thầy từ vựng', description: 'Học 1000 từ vựng', icon: '📚', earned: true },
    { title: 'Người nghe giỏi', description: 'Hoàn thành 50 bài nghe', icon: '👂', earned: false },
    { title: 'Siêu sao', description: 'Đạt 30 ngày streak', icon: '⭐', earned: false }
  ];

  const recentActivity = [
    { action: 'Hoàn thành bài học', course: 'Từ vựng cơ bản', time: '2 giờ trước' },
    { action: 'Đạt thành tích', achievement: 'Học viên tích cực', time: '1 ngày trước' },
    { action: 'Luyện tập', course: 'Ngữ pháp nâng cao', time: '2 ngày trước' },
    { action: 'Hoàn thành bài test', course: 'Luyện nghe', time: '3 ngày trước' }
  ];

  return (
    <div>
      <Row gutter={[24, 24]}>
        {/* Profile Info */}
        <Col xs={24} lg={8}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <Avatar size={80} icon={<UserOutlined />} />
              <Title level={3} style={{ marginTop: '16px', marginBottom: '8px' }}>
                Nguyễn Văn An
              </Title>
              <Text type="secondary">Học viên tích cực</Text>
              <div style={{ marginTop: '16px' }}>
                <Button type="primary" icon={<EditOutlined />}>
                  Chỉnh sửa hồ sơ
                </Button>
              </div>
            </div>
            
            <div style={{ marginTop: '24px' }}>
              <Row gutter={16}>
                <Col span={12}>
                  <Statistic title="Ngày học" value={45} prefix={<CalendarOutlined />} />
                </Col>
                <Col span={12}>
                  <Statistic title="Điểm số" value={1250} prefix={<TrophyOutlined />} />
                </Col>
              </Row>
            </div>
          </Card>
        </Col>

        {/* Progress & Stats */}
        <Col xs={24} lg={16}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <Card>
                <Statistic
                  title="Từ vựng đã học"
                  value={750}
                  suffix="/ 1000"
                  prefix={<BookOutlined />}
                />
                <Progress percent={75} strokeColor="#52c41a" />
              </Card>
            </Col>
            <Col xs={24} sm={12}>
              <Card>
                <Statistic
                  title="Chuỗi học tập"
                  value={12}
                  suffix="ngày"
                  prefix={<TrophyOutlined />}
                />
                <Progress percent={40} strokeColor="#1890ff" />
              </Card>
            </Col>
            <Col span={24}>
              <Card title="Tiến trình học tập tuần này">
                <Row gutter={8}>
                  {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day, index) => (
                    <Col span={3} key={day} style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          backgroundColor: index < 4 ? '#52c41a' : '#f0f0f0',
                          color: index < 4 ? 'white' : '#999',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          margin: '0 auto 8px'
                        }}
                      >
                        {index < 4 ? '✓' : ''}
                      </div>
                      <Text style={{ fontSize: '12px' }}>{day}</Text>
                    </Col>
                  ))}
                </Row>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        {/* Achievements */}
        <Col xs={24} lg={12}>
          <Card title="Thành tích" extra={<TrophyOutlined />}>
            <List
              dataSource={achievements}
              renderItem={item => (
                <List.Item>
                  <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <div style={{ fontSize: '24px', marginRight: '12px' }}>
                      {item.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 'bold', color: item.earned ? '#000' : '#999' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        {item.description}
                      </div>
                    </div>
                    <Tag color={item.earned ? 'green' : 'default'}>
                      {item.earned ? 'Đã đạt' : 'Chưa đạt'}
                    </Tag>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Recent Activity */}
        <Col xs={24} lg={12}>
          <Card title="Hoạt động gần đây">
            <List
              dataSource={recentActivity}
              renderItem={item => (
                <List.Item>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>{item.action}</div>
                    <div style={{ color: '#666', fontSize: '14px' }}>
                      {item.course || item.achievement}
                    </div>
                    <div style={{ color: '#999', fontSize: '12px' }}>
                      {item.time}
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;

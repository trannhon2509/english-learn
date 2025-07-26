import React from 'react';
import { Typography, Card, Row, Col, Button, Avatar, Progress, Statistic } from 'antd';
import { 
  UserOutlined, 
  TrophyOutlined,
  CalendarOutlined,
  BookOutlined,
  ClockCircleOutlined,
  SettingOutlined,
  EditOutlined,
  StarOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

// 1. ProfileHeader Component
const ProfileHeader = ({ userData }) => (
  <Card 
    style={{ 
      marginBottom: '32px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, rgba(24, 144, 255, 0.1), rgba(114, 46, 209, 0.1))',
      border: '1px solid rgba(24, 144, 255, 0.2)',
    }}
  >
    <Row gutter={[24, 24]} align="middle">
      <Col xs={24} sm={8} md={6}>
        <div style={{ textAlign: 'center' }}>
          <Avatar 
            size={120} 
            icon={<UserOutlined />}
            style={{ 
              background: 'linear-gradient(135deg, #1890ff, #722ed1)',
              marginBottom: '16px',
            }}
          />
          <Button 
            icon={<EditOutlined />}
            style={{ borderRadius: '20px' }}
          >
            Chỉnh sửa ảnh
          </Button>
        </div>
      </Col>
      <Col xs={24} sm={16} md={18}>
        <Title level={2} style={{ color: '#1890ff', marginBottom: '8px' }}>
          {userData.name}
        </Title>
        <Paragraph style={{ fontSize: '16px', color: '#666', marginBottom: '16px' }}>
          {userData.email}
        </Paragraph>
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={6}>
            <Statistic 
              title="Cấp độ" 
              value={userData.level} 
              valueStyle={{ color: '#1890ff' }}
            />
          </Col>
          <Col xs={12} sm={6}>
            <Statistic 
              title="Ngày tham gia" 
              value="9 tháng"
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Col>
          <Col xs={12} sm={6}>
            <Statistic 
              title="Streak" 
              value={userData.streak}
              suffix="ngày"
              prefix={<StarOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Col>
          <Col xs={12} sm={6}>
            <Button 
              type="primary" 
              icon={<SettingOutlined />}
              style={{ borderRadius: '8px' }}
            >
              Cài đặt
            </Button>
          </Col>
        </Row>
      </Col>
    </Row>
  </Card>
);

// 2. LearningStats Component
const LearningStats = ({ userData }) => (
  <Card 
    title={
      <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
        <BookOutlined /> Thống kê học tập
      </Title>
    }
    style={{ borderRadius: '12px', marginBottom: '24px' }}
  >
    <Row gutter={[24, 24]}>
      <Col xs={12} sm={6}>
        <Statistic 
          title="Tổng thời gian học"
          value={userData.totalLearningTime}
          suffix="giờ"
          prefix={<ClockCircleOutlined />}
          valueStyle={{ color: '#1890ff', fontSize: '20px' }}
        />
      </Col>
      <Col xs={12} sm={6}>
        <Statistic 
          title="Từ vựng đã học"
          value={userData.wordsLearned}
          prefix={<BookOutlined />}
          valueStyle={{ color: '#52c41a', fontSize: '20px' }}
        />
      </Col>
      <Col xs={12} sm={6}>
        <Statistic 
          title="Bài học hoàn thành"
          value={userData.lessonsCompleted}
          prefix={<TrophyOutlined />}
          valueStyle={{ color: '#faad14', fontSize: '20px' }}
        />
      </Col>
      <Col xs={12} sm={6}>
        <Statistic 
          title="Tuần này"
          value="4.5"
          suffix="giờ"
          valueStyle={{ color: '#722ed1', fontSize: '20px' }}
        />
      </Col>
    </Row>
  </Card>
);

// 3. SkillProgress Component
const SkillProgress = ({ skillProgress }) => (
  <Card 
    title={
      <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
        Tiến độ kỹ năng
      </Title>
    }
    style={{ borderRadius: '12px' }}
  >
    <Row gutter={[16, 24]}>
      {Object.entries(skillProgress).map(([skill, percent]) => {
        const colors = {
          vocabulary: '#1890ff',
          grammar: '#52c41a',
          listening: '#722ed1',
          pronunciation: '#fa541c'
        };
        
        const labels = {
          vocabulary: 'Từ vựng',
          grammar: 'Ngữ pháp',
          listening: 'Nghe',
          pronunciation: 'Phát âm'
        };

        return (
          <Col xs={24} sm={12} key={skill}>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: '500' }}>{labels[skill]}</span>
                <span style={{ color: colors[skill] }}>{percent}%</span>
              </div>
              <Progress 
                percent={percent} 
                strokeColor={colors[skill]}
                trailColor={`rgba(${parseInt(colors[skill].slice(1, 3), 16)}, ${parseInt(colors[skill].slice(3, 5), 16)}, ${parseInt(colors[skill].slice(5, 7), 16)}, 0.1)`}
                strokeWidth={8}
                showInfo={false}
              />
            </div>
          </Col>
        );
      })}
    </Row>
  </Card>
);

// 4. AchievementItem Component
const AchievementItem = ({ achievement }) => (
  <div 
    style={{
      display: 'flex',
      alignItems: 'center',
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '8px',
      background: achievement.earned 
        ? 'linear-gradient(135deg, rgba(82, 196, 26, 0.1), rgba(115, 209, 61, 0.1))'
        : 'rgba(0, 0, 0, 0.05)',
      border: achievement.earned 
        ? '1px solid rgba(82, 196, 26, 0.3)'
        : '1px solid rgba(0, 0, 0, 0.1)',
    }}
  >
    <TrophyOutlined 
      style={{ 
        fontSize: '20px',
        color: achievement.earned ? '#52c41a' : '#d9d9d9',
        marginRight: '12px',
      }}
    />
    <div style={{ flex: 1 }}>
      <div style={{ 
        fontWeight: '500',
        color: achievement.earned ? '#333' : '#999',
        marginBottom: '2px',
      }}>
        {achievement.name}
      </div>
      <div style={{ 
        fontSize: '12px',
        color: achievement.earned ? '#666' : '#bbb',
      }}>
        {achievement.description}
      </div>
    </div>
  </div>
);

// 5. Achievements Component
const Achievements = ({ achievements }) => (
  <Card 
    title={
      <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
        <TrophyOutlined /> Thành tựu
      </Title>
    }
    style={{ borderRadius: '12px', marginBottom: '24px' }}
  >
    {achievements.map((achievement, index) => (
      <AchievementItem key={index} achievement={achievement} />
    ))}
  </Card>
);

// 6. WeeklyActivity Component
const WeeklyActivity = ({ weeklyStats }) => (
  <Card 
    title={
      <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
        Hoạt động tuần này
      </Title>
    }
    style={{ borderRadius: '12px' }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
      {weeklyStats.map((stat, index) => (
        <div key={index} style={{ textAlign: 'center', flex: 1 }}>
          <div 
            style={{
              height: `${Math.max(stat.minutes / 2, 10)}px`,
              background: 'linear-gradient(135deg, #1890ff, #722ed1)',
              borderRadius: '4px 4px 0 0',
              marginBottom: '8px',
              transition: 'all 0.3s ease',
            }}
          />
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>
            {stat.day}
          </div>
          <div style={{ fontSize: '10px', color: '#999' }}>
            {stat.minutes}p
          </div>
        </div>
      ))}
    </div>
    <div style={{ 
      textAlign: 'center', 
      marginTop: '16px',
      padding: '12px',
      background: 'rgba(24, 144, 255, 0.1)',
      borderRadius: '8px',
    }}>
      <Paragraph style={{ margin: 0, color: '#1890ff', fontWeight: '500' }}>
        Mục tiêu tuần: 300 phút
      </Paragraph>
      <Progress 
        percent={68} 
        strokeColor="#1890ff"
        trailColor="rgba(24, 144, 255, 0.2)"
        strokeWidth={6}
        showInfo={false}
        style={{ marginTop: '8px' }}
      />
    </div>
  </Card>
);

// Main ProfilePage Component
const ProfilePage = () => {
  // Mock user data
  const userData = {
    name: 'Nguyễn Văn An',
    email: 'nguyenvanan@example.com',
    avatar: null,
    level: 'Trung cấp',
    joinDate: '2024-01-15',
    streak: 12,
    totalLearningTime: 156, // hours
    wordsLearned: 1250,
    lessonsCompleted: 45,
    achievements: [
      { name: 'Người mới bắt đầu', description: 'Hoàn thành bài học đầu tiên', earned: true },
      { name: 'Học giả', description: 'Học 100 từ vựng', earned: true },
      { name: 'Kiên trì', description: 'Học liên tục 7 ngày', earned: true },
      { name: 'Chuyên gia', description: 'Hoàn thành 50 bài học', earned: false },
    ],
    weeklyStats: [
      { day: 'T2', minutes: 30 },
      { day: 'T3', minutes: 45 },
      { day: 'T4', minutes: 25 },
      { day: 'T5', minutes: 60 },
      { day: 'T6', minutes: 35 },
      { day: 'T7', minutes: 40 },
      { day: 'CN', minutes: 20 },
    ],
    skillProgress: {
      vocabulary: 75,
      grammar: 60,
      listening: 45,
      pronunciation: 30,
    }
  };

  return (
    <div style={{ padding: '20px 0' }}>
      <ProfileHeader userData={userData} />
      
      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <LearningStats userData={userData} />
          <SkillProgress skillProgress={userData.skillProgress} />
        </Col>
        
        <Col xs={24} lg={8}>
          <Achievements achievements={userData.achievements} />
          <WeeklyActivity weeklyStats={userData.weeklyStats} />
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
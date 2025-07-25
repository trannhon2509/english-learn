import React, { useState } from 'react';
import { Grid } from 'antd';
import { Typography, Card, Row, Col, Button, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { 
  SoundOutlined, 
  AudioOutlined,
  TrophyOutlined,
  PlayCircleOutlined
} from '@ant-design/icons';
import { ROUTES } from '@constants/routes';
import GridList from '@components/ui/GridList';
import PronunciationLessonCard from '@components/PronunciationLessonCard';

const { Title, Paragraph } = Typography;

// 👉 Section: Header
const HeaderSection = () => (
  <div style={{ textAlign: 'center', marginBottom: '40px' }}>
    <Title level={1} style={{ color: '#1890ff' }}>Luyện phát âm</Title>
    <Paragraph style={{ fontSize: '16px', color: '#666' }}>
      Cải thiện phát âm tiếng Anh với công nghệ nhận dạng giọng nói
    </Paragraph>
  </div>
);

// 👉 Section: Tiến độ luyện tập
const ProgressOverview = () => (
  <Card style={{
    marginBottom: '32px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, rgba(250, 84, 28, 0.1), rgba(250, 173, 20, 0.1))',
    border: '1px solid rgba(250, 84, 28, 0.2)'
  }}>
    <Row gutter={[24, 24]} align="middle">
      <Col xs={24} md={8}>
        <div style={{ textAlign: 'center' }}>
          <Avatar size={80} icon={<AudioOutlined />} style={{
            background: 'linear-gradient(135deg, #fa541c, #faad14)',
            marginBottom: '16px'
          }} />
          <Title level={3} style={{ color: '#fa541c', margin: 0 }}>Tiến độ phát âm</Title>
        </div>
      </Col>
      <Col xs={24} md={16}>
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={6}><div style={{ textAlign: 'center' }}><Title level={2} style={{ color: '#fa541c', margin: 0 }}>78</Title><Paragraph style={{ margin: 0, color: '#666' }}>Từ đã luyện</Paragraph></div></Col>
          <Col xs={12} sm={6}><div style={{ textAlign: 'center' }}><Title level={2} style={{ color: '#52c41a', margin: 0 }}>85%</Title><Paragraph style={{ margin: 0, color: '#666' }}>Độ chính xác</Paragraph></div></Col>
          <Col xs={12} sm={6}><div style={{ textAlign: 'center' }}><Title level={2} style={{ color: '#1890ff', margin: 0 }}>12</Title><Paragraph style={{ margin: 0, color: '#666' }}>Ngày streak</Paragraph></div></Col>
          <Col xs={12} sm={6}><div style={{ textAlign: 'center' }}><Title level={2} style={{ color: '#722ed1', margin: 0 }}>4</Title><Paragraph style={{ margin: 0, color: '#666' }}>Cấp độ</Paragraph></div></Col>
        </Row>
      </Col>
    </Row>
  </Card>
);

// 👉 Section: Grid bài học phát âm
const LessonGridSection = ({
  items, renderItem, filters,
  filterValues, setFilterValues,
  searchTerm, setSearchTerm, columns
}) => (
  <div style={{ marginBottom: '40px' }}>
    <GridList
      items={items}
      renderItem={renderItem}
      filters={filters}
      filterValues={filterValues}
      onFilterChange={(key, value) => setFilterValues(prev => ({ ...prev, [key]: value }))}
      searchTerm={searchTerm}
      onSearch={setSearchTerm}
      columns={columns}
    />
  </div>
);

// 👉 Section: Thành tựu
const AchievementsSection = ({ achievements }) => (
  <Card
    title={<Title level={3} style={{ color: '#1890ff', margin: 0 }}><TrophyOutlined /> Thành tựu</Title>}
    style={{ borderRadius: '12px', marginBottom: '40px' }}
  >
    <Row gutter={[16, 16]}>
      {achievements.map((a, idx) => (
        <Col xs={12} sm={6} key={idx}>
          <div style={{
            textAlign: 'center',
            padding: '16px',
            borderRadius: '8px',
            background: a.earned ? 'linear-gradient(135deg, rgba(82, 196, 26, 0.1), rgba(115, 209, 61, 0.1))' : 'rgba(0, 0, 0, 0.05)',
            border: a.earned ? '1px solid rgba(82, 196, 26, 0.3)' : '1px solid rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>{a.icon}</div>
            <Paragraph style={{
              fontSize: '12px', margin: 0,
              color: a.earned ? '#52c41a' : '#999',
              fontWeight: a.earned ? '600' : 'normal'
            }}>{a.name}</Paragraph>
          </div>
        </Col>
      ))}
    </Row>
  </Card>
);

// 👉 Section: Call to Action cuối trang
const CallToAction = () => (
  <div style={{
    textAlign: 'center',
    padding: '40px',
    background: 'linear-gradient(135deg, #fa541c, #faad14)',
    borderRadius: '12px',
    color: 'white'
  }}>
    <Title level={2} style={{ color: 'white', marginBottom: '16px' }}>
      Bắt đầu luyện phát âm ngay hôm nay
    </Title>
    <Paragraph style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '16px' }}>
      Sử dụng công nghệ AI để cải thiện phát âm và giao tiếp tự tin hơn
    </Paragraph>
    <div style={{ marginTop: '24px' }}>
      <Link to={ROUTES.LEARN}>
        <Button size="large" icon={<PlayCircleOutlined />} style={{ marginRight: '16px', background: 'rgba(255, 255, 255, 0.9)', borderColor: 'transparent', color: '#fa541c' }}>
          Quay lại học tập
        </Button>
      </Link>
      <Link to={ROUTES.LISTENING}>
        <Button size="large" icon={<SoundOutlined />} style={{ background: 'transparent', borderColor: 'rgba(255, 255, 255, 0.5)', color: 'white' }}>
          Luyện nghe
        </Button>
      </Link>
    </div>
  </div>
);

// 👉 Main Component
const PronunciationPage = () => {
  const screens = Grid.useBreakpoint();
  const columns = screens.lg ? 3 : screens.md ? 2 : 1;

  const [searchTerm, setSearchTerm] = useState('');
  const [filterValues, setFilterValues] = useState({ difficulty: '', completed: '' });

  const pronunciationLessons = [
    { id: 1, title: 'Âm /θ/ và /ð/', description: 'Luyện tập phát âm âm th trong tiếng Anh', difficulty: 'Cơ bản', words: 15, completed: true, accuracy: 85 },
    { id: 2, title: 'Âm /r/ và /l/', description: 'Phân biệt và phát âm đúng âm r và l', difficulty: 'Cơ bản', words: 20, completed: false, accuracy: 0 },
    { id: 3, title: 'Âm /v/ và /w/', description: 'Luyện tập phát âm chính xác âm v và w', difficulty: 'Trung cấp', words: 18, completed: false, accuracy: 0 },
    { id: 4, title: 'Trọng âm từ', description: 'Học cách đặt trọng âm đúng trong các từ nhiều âm tiết', difficulty: 'Nâng cao', words: 25, completed: false, accuracy: 0 },
  ];

  const achievements = [
    { name: 'Người mới bắt đầu', icon: '🎯', earned: true },
    { name: 'Phát âm chuẩn', icon: '🎤', earned: true },
    { name: 'Luyện tập chăm chỉ', icon: '⭐', earned: false },
    { name: 'Chuyên gia phát âm', icon: '🏆', earned: false },
  ];

  const filters = [
    {
      label: 'Trình độ',
      value: 'difficulty',
      options: [
        { value: '', label: 'Tất cả' },
        { value: 'Cơ bản', label: 'Cơ bản' },
        { value: 'Trung cấp', label: 'Trung cấp' },
        { value: 'Nâng cao', label: 'Nâng cao' },
      ],
    },
    {
      label: 'Trạng thái',
      value: 'completed',
      options: [
        { value: '', label: 'Tất cả' },
        { value: true, label: 'Hoàn thành' },
        { value: false, label: 'Chưa hoàn thành' },
      ],
    },
  ];

  const filteredLessons = pronunciationLessons.filter(lesson => {
    const matchSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) || lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDifficulty = !filterValues.difficulty || lesson.difficulty === filterValues.difficulty;
    const matchCompleted = filterValues.completed === '' || lesson.completed === filterValues.completed;
    return matchSearch && matchDifficulty && matchCompleted;
  });

  return (
    <div style={{ padding: '20px 0' }}>
      <HeaderSection />
      <ProgressOverview />
      <LessonGridSection
        items={filteredLessons}
        renderItem={lesson => <PronunciationLessonCard lesson={lesson} />}
        filters={filters}
        filterValues={filterValues}
        setFilterValues={setFilterValues}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        columns={columns}
      />
      <AchievementsSection achievements={achievements} />
      <CallToAction />
    </div>
  );
};

export default PronunciationPage;

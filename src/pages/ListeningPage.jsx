import React, { useCallback, useMemo, useState } from 'react';
import { Grid, Typography, Card, Row, Col, Button } from 'antd';
import { Link } from 'react-router-dom';
import { 
  AudioOutlined, 
  PlayCircleOutlined,
  TrophyOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import { ROUTES } from '@constants/routes';
import GridList from '@components/ui/GridList';
import ListeningExerciseCard from '@components/ListeningExerciseCard';

const { Title, Paragraph } = Typography;

// 1. Header Component
const ListeningHeader = React.memo(() => (
  <div style={{ textAlign: 'center', marginBottom: '40px' }}>
    <Title level={1} style={{ color: '#1890ff' }}>Luyện nghe tiếng Anh</Title>
    <Paragraph style={{ fontSize: '16px', color: '#666' }}>
      Cải thiện kỹ năng nghe hiểu với các bài tập đa dạng
    </Paragraph>
  </div>
));

// 2. Listening Tips Component
const ListeningTips = React.memo(() => {
  const tips = [
    {
      icon: <AudioOutlined style={{ fontSize: '32px', marginBottom: '12px' }} />,
      title: 'Nghe thường xuyên',
      content: 'Luyện nghe mỗi ngày ít nhất 15-20 phút để cải thiện khả năng nghe hiểu'
    },
    {
      icon: <PlayCircleOutlined style={{ fontSize: '32px', marginBottom: '12px' }} />,
      title: 'Lặp lại nhiều lần',
      content: 'Nghe lại các đoạn khó nhiều lần để làm quen với giọng điệu và phát âm'
    },
    {
      icon: <TrophyOutlined style={{ fontSize: '32px', marginBottom: '12px' }} />,
      title: 'Ghi chú từ mới',
      content: 'Ghi lại các từ vựng mới gặp trong quá trình luyện nghe để mở rộng vốn từ'
    }
  ];

  return (
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
        {tips.map((tip, index) => (
          <Col xs={24} md={8} key={index}>
            <div style={{ textAlign: 'center' }}>
              {tip.icon}
              <Title level={4} style={{ color: 'white' }}>{tip.title}</Title>
              <Paragraph style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
                {tip.content}
              </Paragraph>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
});

// 3. Call To Action Component
const ListeningCTA = React.memo(() => (
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
));

// 4. Main Page Component
const ListeningPage = () => {
  const screens = Grid.useBreakpoint();
  const columns = useMemo(() => {
    if (screens.lg) return 3;
    if (screens.md) return 2;
    return 1;
  }, [screens]);

  // Data
  const listeningExercises = useMemo(() => [
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
  ], []);

  // State cho search/filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValues, setFilterValues] = useState({ level: '', completed: '' });

  // Filter options
  const filters = useMemo(() => [
    {
      label: 'Trình độ',
      value: 'level',
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
        { value: 'true', label: 'Đã hoàn thành' },
        { value: 'false', label: 'Chưa hoàn thành' },
      ],
    },
  ], []);

  // Xử lý search/filter
  const filteredExercises = useMemo(() => 
    listeningExercises.filter(ex => {
      const matchSearch = ex.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         ex.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchLevel = !filterValues.level || ex.level === filterValues.level;
      const matchCompleted = !filterValues.completed || String(ex.completed) === filterValues.completed;
      return matchSearch && matchLevel && matchCompleted;
    }),
    [listeningExercises, searchTerm, filterValues]
  );

  const handleSearch = value => setSearchTerm(value);
  const handleFilterChange = (key, value) => setFilterValues(prev => ({ ...prev, [key]: value }));

  // Hàm render từng item cho GridList
  const renderListeningItem = useCallback(exercise => (
    <ListeningExerciseCard exercise={exercise} />
  ), []);

  return (
    <div style={{ padding: '20px 0' }}>
      <ListeningHeader />
      
      {/* GridList với search/filter */}
      <div style={{ marginBottom: 40 }}>
        <GridList
          items={filteredExercises}
          renderItem={renderListeningItem}
          searchTerm={searchTerm}
          onSearch={handleSearch}
          filters={filters}
          filterValues={filterValues}
          onFilterChange={handleFilterChange}
          columns={columns}
          emptyText="Không có bài luyện nghe phù hợp"
        />
      </div>

      <ListeningTips />
      <ListeningCTA />
    </div>
  );
};

export default ListeningPage;
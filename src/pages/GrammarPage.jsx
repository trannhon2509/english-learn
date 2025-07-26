import React, { useState, useMemo, useCallback } from 'react';
import { Typography, Button, Grid } from 'antd';
import { Link } from 'react-router-dom';
import { BookOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { ROUTES } from '@constants/routes';
import GridList from '@components/ui/GridList';
import TopicCard from '@components/TopicCard';

const { Title, Paragraph } = Typography;
const { useBreakpoint } = Grid;

// 1. Header Component
const GrammarHeader = React.memo(() => (
  <div style={{ textAlign: 'center', marginBottom: '40px' }}>
    <Title level={1} style={{ color: '#1890ff' }}>
      Ngữ pháp tiếng Anh
    </Title>
    <Paragraph style={{ fontSize: '16px', color: '#666' }}>
      Học ngữ pháp một cách có hệ thống từ cơ bản đến nâng cao
    </Paragraph>
  </div>
));

// 2. Practice CTA Component
const PracticeCTA = React.memo(() => (
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
));

// 3. Main Page Component
const GrammarPage = () => {
  const screens = useBreakpoint();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValues, setFilterValues] = useState({ level: '', completed: '' });

  // Data
  const grammarTopics = useMemo(() => [
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
  ], []);

  // Filters
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

  // Filter logic
  const filteredTopics = useMemo(() => 
    grammarTopics.filter(topic => {
      const matchSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         topic.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchLevel = !filterValues.level || topic.level === filterValues.level;
      const matchCompleted = !filterValues.completed || String(topic.completed) === filterValues.completed;
      return matchSearch && matchLevel && matchCompleted;
    }),
    [grammarTopics, searchTerm, filterValues]
  );

  // Responsive columns
  const columns = useMemo(() => {
    if (screens.lg) return 3;
    if (screens.md) return 2;
    return 1;
  }, [screens]);

  // Render function
  const renderItem = useCallback((topic) => <TopicCard topic={topic} />, []);

  return (
    <div style={{ padding: '20px 0' }}>
      <GrammarHeader />
      
      <GridList
        items={filteredTopics}
        renderItem={renderItem}
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        filters={filters}
        filterValues={filterValues}
        onFilterChange={(key, value) => setFilterValues(fv => ({ ...fv, [key]: value }))}
        columns={columns}
      />

      <PracticeCTA />
    </div>
  );
};

export default GrammarPage;
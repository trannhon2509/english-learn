import React, { useState } from 'react';
import { Typography, Button, Grid, Card } from 'antd';
const { useBreakpoint } = Grid;
import { Link } from 'react-router-dom';
import { 
  BookOutlined, 
  SoundOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  FilterOutlined
} from '@ant-design/icons';
import { ROUTES } from '../constants/routes';
import GridList from '../components/ui/GridList';

const { Title, Paragraph } = Typography;

const GrammarPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValues, setFilterValues] = useState({ level: '', completed: '' });
  const screens = useBreakpoint();
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

  // Các bộ lọc
  const filters = [
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
  ];

  // Lọc dữ liệu
  const filteredTopics = grammarTopics.filter(topic => {
    const matchSearch = topic.title.toLowerCase().includes(searchTerm.toLowerCase()) || topic.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchLevel = !filterValues.level || topic.level === filterValues.level;
    const matchCompleted = !filterValues.completed || String(topic.completed) === filterValues.completed;
    return matchSearch && matchLevel && matchCompleted;
  });

  // Card component for each topic
  const TopicCard = ({ topic }) => {
    // Chiều cao cố định cho card và cover
    const CARD_HEIGHT = 320;
    const COVER_HEIGHT = 80;
    return (
      <div key={topic.id} style={{ padding: 12, height: CARD_HEIGHT }}>
        <Card
          hoverable
          style={{ borderRadius: 16, boxShadow: '0 2px 8px rgba(24,144,255,0.08)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          cover={
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'linear-gradient(135deg, rgba(24, 144, 255, 0.1), rgba(114, 46, 209, 0.1))',
              borderRadius: '16px 16px 0 0',
              height: COVER_HEIGHT
            }}>
              <BookOutlined style={{ fontSize: 40, color: '#1890ff' }} />
            </div>
          }
          bodyStyle={{ padding: 16, height: CARD_HEIGHT - COVER_HEIGHT - 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div>
            <div style={{ color: '#1890ff', fontWeight: 600, fontSize: 18, marginBottom: 4 }}>{topic.title}</div>
            <div style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>{topic.level} • {topic.lessons} bài học</div>
            <div style={{ color: '#666', fontSize: 14, marginBottom: 8 }}>{topic.description}</div>
            {topic.completed && (
              <div style={{ color: '#52c41a', fontSize: 13, marginBottom: 8 }}>
                <TrophyOutlined /> Đã hoàn thành
              </div>
            )}
          </div>
          <Button
            type={topic.completed ? 'default' : 'primary'}
            icon={<SoundOutlined />}
            style={{ width: '100%', marginTop: 8 }}
          >
            {topic.completed ? 'Ôn tập' : 'Bắt đầu học'}
          </Button>
        </Card>
      </div>
    );
  };

  // Hàm render từng item
  const renderItem = (topic) => <TopicCard topic={topic} />;

  // Xác định số cột dựa trên breakpoint
  let columns = 1;
  if (screens.lg) {
    columns = 3;
  } else if (screens.md) {
    columns = 2;
  } else if (screens.sm) {
    columns = 1;
  }

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

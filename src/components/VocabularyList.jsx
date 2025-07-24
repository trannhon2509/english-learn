import React, { useState } from 'react';
import { Card, Button, Input, Typography, Space, List, Tag, Badge, Tooltip, message } from 'antd';
import { 
  ArrowLeftOutlined, 
  SoundOutlined, 
  SearchOutlined,
  HeartOutlined,
  HeartFilled,
  EyeOutlined,
  BookOutlined,
  FilterOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

const VocabularyList = ({ vocabulary, onBack }) => {
  const [searchText, setSearchText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [favorites, setFavorites] = useState(new Set([1, 3, 5])); // Mock favorites

  // Extended vocabulary data
  const words = [
    {
      id: 1,
      word: 'Beautiful',
      phonetic: '/ˈbjuː.tɪ.fəl/',
      meaning: 'Đẹp, xinh đẹp',
      definition: 'Having qualities that give pleasure to the senses',
      example: 'She has a beautiful smile.',
      exampleTranslation: 'Cô ấy có nụ cười đẹp.',
      level: 'basic',
      category: 'adjective',
      image: '🌸',
      learned: true
    },
    {
      id: 2,
      word: 'Adventure',
      phonetic: '/ədˈven.tʃər/',
      meaning: 'Cuộc phiêu lưu',
      definition: 'An exciting or dangerous experience',
      example: 'Their trip to the mountains was a great adventure.',
      exampleTranslation: 'Chuyến đi lên núi của họ là một cuộc phiêu lưu tuyệt vời.',
      level: 'intermediate',
      category: 'noun',
      image: '🏔️',
      learned: false
    },
    {
      id: 3,
      word: 'Knowledge',
      phonetic: '/ˈnɒl.ɪdʒ/',
      meaning: 'Kiến thức',
      definition: 'Information and skills acquired through experience or education',
      example: 'Reading books increases your knowledge.',
      exampleTranslation: 'Đọc sách làm tăng kiến thức của bạn.',
      level: 'intermediate',
      category: 'noun',
      image: '📚',
      learned: true
    },
    {
      id: 4,
      word: 'Friendship',
      phonetic: '/ˈfrend.ʃɪp/',
      meaning: 'Tình bạn',
      definition: 'A close relationship between friends',
      example: 'Their friendship has lasted for many years.',
      exampleTranslation: 'Tình bạn của họ đã kéo dài nhiều năm.',
      level: 'basic',
      category: 'noun',
      image: '🤝',
      learned: true
    },
    {
      id: 5,
      word: 'Courage',
      phonetic: '/ˈkʌr.ɪdʒ/',
      meaning: 'Lòng dũng cảm',
      definition: 'The ability to do something dangerous or difficult without fear',
      example: 'It takes courage to speak in public.',
      exampleTranslation: 'Cần có lòng dũng cảm để nói trước công chúng.',
      level: 'advanced',
      category: 'noun',
      image: '🦁',
      learned: false
    },
    {
      id: 6,
      word: 'Brilliant',
      phonetic: '/ˈbrɪl.jənt/',
      meaning: 'Xuất sắc, tuyệt vời',
      definition: 'Extremely intelligent or exceptionally clever',
      example: 'She came up with a brilliant solution.',
      exampleTranslation: 'Cô ấy đã nghĩ ra một giải pháp xuất sắc.',
      level: 'advanced',
      category: 'adjective',
      image: '💡',
      learned: false
    },
    {
      id: 7,
      word: 'Happy',
      phonetic: '/ˈhæp.i/',
      meaning: 'Vui vẻ, hạnh phúc',
      definition: 'Feeling pleasure and contentment',
      example: 'I am happy to see you again.',
      exampleTranslation: 'Tôi rất vui khi gặp lại bạn.',
      level: 'basic',
      category: 'adjective',
      image: '😊',
      learned: true
    },
    {
      id: 8,
      word: 'Challenge',
      phonetic: '/ˈtʃæl.ɪndʒ/',
      meaning: 'Thách thức',
      definition: 'A demanding or stimulating situation',
      example: 'Learning a new language is a challenge.',
      exampleTranslation: 'Học một ngôn ngữ mới là một thách thức.',
      level: 'intermediate',
      category: 'noun',
      image: '⚡',
      learned: false
    }
  ];

  const filters = [
    { key: 'all', label: 'Tất cả', color: 'default' },
    { key: 'learned', label: 'Đã học', color: 'green' },
    { key: 'unlearned', label: 'Chưa học', color: 'orange' },
    { key: 'favorites', label: 'Yêu thích', color: 'red' },
    { key: 'basic', label: 'Cơ bản', color: 'blue' },
    { key: 'intermediate', label: 'Trung bình', color: 'purple' },
    { key: 'advanced', label: 'Nâng cao', color: 'gold' }
  ];

  const filteredWords = words.filter(word => {
    const matchesSearch = word.word.toLowerCase().includes(searchText.toLowerCase()) ||
                         word.meaning.toLowerCase().includes(searchText.toLowerCase());
    
    if (!matchesSearch) return false;

    switch (selectedFilter) {
      case 'learned':
        return word.learned;
      case 'unlearned':
        return !word.learned;
      case 'favorites':
        return favorites.has(word.id);
      case 'basic':
      case 'intermediate':
      case 'advanced':
        return word.level === selectedFilter;
      default:
        return true;
    }
  });

  const toggleFavorite = (wordId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(wordId)) {
      newFavorites.delete(wordId);
      message.success('Đã xóa khỏi danh sách yêu thích');
    } else {
      newFavorites.add(wordId);
      message.success('Đã thêm vào danh sách yêu thích');
    }
    setFavorites(newFavorites);
  };

  const playPronunciation = (word) => {
    message.info(`Phát âm: ${word.phonetic}`);
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'basic': return 'blue';
      case 'intermediate': return 'purple';
      case 'advanced': return 'gold';
      default: return 'default';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'noun': return 'green';
      case 'adjective': return 'orange';
      case 'verb': return 'blue';
      default: return 'default';
    }
  };

  const statistics = {
    total: words.length,
    learned: words.filter(w => w.learned).length,
    favorites: favorites.size,
    byLevel: {
      basic: words.filter(w => w.level === 'basic').length,
      intermediate: words.filter(w => w.level === 'intermediate').length,
      advanced: words.filter(w => w.level === 'advanced').length
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={onBack}
          style={{ marginBottom: '16px' }}
        >
          Quay lại phương pháp học
        </Button>
        
        <Title level={2}>
          <BookOutlined style={{ marginRight: '8px', color: '#722ed1' }} />
          Danh sách từ vựng - {vocabulary.title}
        </Title>
      </div>

      {/* Statistics */}
      <Card style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1890ff' }}>
              {statistics.total}
            </div>
            <div>Tổng số từ</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#52c41a' }}>
              {statistics.learned}
            </div>
            <div>Đã học</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff4d4f' }}>
              {statistics.favorites}
            </div>
            <div>Yêu thích</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#fa8c16' }}>
              {statistics.total - statistics.learned}
            </div>
            <div>Chưa học</div>
          </div>
        </div>
      </Card>

      {/* Search and Filters */}
      <Card style={{ marginBottom: '24px' }}>
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          <Search
            placeholder="Tìm kiếm từ vựng..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: '100%' }}
            prefix={<SearchOutlined />}
            allowClear
          />
          
          <div>
            <Text strong style={{ marginRight: '12px' }}>
              <FilterOutlined /> Bộ lọc:
            </Text>
            <Space wrap>
              {filters.map(filter => (
                <Tag
                  key={filter.key}
                  color={selectedFilter === filter.key ? filter.color : 'default'}
                  style={{ 
                    cursor: 'pointer',
                    border: selectedFilter === filter.key ? `2px solid` : '1px solid #d9d9d9'
                  }}
                  onClick={() => setSelectedFilter(filter.key)}
                >
                  {filter.label}
                </Tag>
              ))}
            </Space>
          </div>
        </Space>
      </Card>

      {/* Word List */}
      <div style={{ marginBottom: '16px' }}>
        <Text>
          Hiển thị {filteredWords.length} / {words.length} từ
          {selectedFilter !== 'all' && ` (đã lọc: ${filters.find(f => f.key === selectedFilter)?.label})`}
        </Text>
      </div>

      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 1,
          lg: 2,
          xl: 2,
          xxl: 2,
        }}
        dataSource={filteredWords}
        renderItem={word => (
          <List.Item>
            <Card
              style={{ 
                height: '100%',
                borderLeft: `4px solid ${word.learned ? '#52c41a' : '#fa8c16'}`
              }}
              actions={[
                <Tooltip title="Phát âm">
                  <Button 
                    icon={<SoundOutlined />} 
                    onClick={() => playPronunciation(word)}
                  />
                </Tooltip>,
                <Tooltip title={favorites.has(word.id) ? 'Bỏ yêu thích' : 'Yêu thích'}>
                  <Button 
                    icon={favorites.has(word.id) ? <HeartFilled /> : <HeartOutlined />}
                    onClick={() => toggleFavorite(word.id)}
                    style={{ 
                      color: favorites.has(word.id) ? '#ff4d4f' : 'inherit'
                    }}
                  />
                </Tooltip>,
                <Badge dot={!word.learned}>
                  <Button icon={<EyeOutlined />}>
                    Chi tiết
                  </Button>
                </Badge>
              ]}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ fontSize: '32px', minWidth: '40px' }}>
                  {word.image}
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: '8px' }}>
                    <Title level={4} style={{ margin: 0, color: '#1890ff' }}>
                      {word.word}
                    </Title>
                    <Text type="secondary" style={{ fontSize: '14px' }}>
                      {word.phonetic}
                    </Text>
                  </div>

                  <div style={{ marginBottom: '8px' }}>
                    <Space wrap>
                      <Tag color={getLevelColor(word.level)}>
                        {word.level === 'basic' && 'Cơ bản'}
                        {word.level === 'intermediate' && 'Trung bình'}
                        {word.level === 'advanced' && 'Nâng cao'}
                      </Tag>
                      <Tag color={getCategoryColor(word.category)}>
                        {word.category === 'noun' && 'Danh từ'}
                        {word.category === 'adjective' && 'Tính từ'}
                        {word.category === 'verb' && 'Động từ'}
                      </Tag>
                      {word.learned && <Tag color="green">Đã học</Tag>}
                      {favorites.has(word.id) && <Tag color="red">❤️ Yêu thích</Tag>}
                    </Space>
                  </div>

                  <Paragraph style={{ margin: 0, marginBottom: '8px', fontWeight: 'bold' }}>
                    {word.meaning}
                  </Paragraph>

                  <Paragraph style={{ margin: 0, marginBottom: '8px', fontSize: '14px' }}>
                    <Text italic>{word.definition}</Text>
                  </Paragraph>

                  <div style={{ 
                    backgroundColor: '#f6ffed', 
                    padding: '8px', 
                    borderRadius: '4px',
                    fontSize: '13px'
                  }}>
                    <div style={{ marginBottom: '2px' }}>
                      <Text strong>VD:</Text> {word.example}
                    </div>
                    <div style={{ color: '#666' }}>
                      <Text strong>Dịch:</Text> {word.exampleTranslation}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />

      {filteredWords.length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px',
          backgroundColor: '#fafafa',
          borderRadius: '8px'
        }}>
          <Title level={4} type="secondary">
            Không tìm thấy từ vựng nào
          </Title>
          <Paragraph type="secondary">
            Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
          </Paragraph>
        </div>
      )}
    </div>
  );
};

export default VocabularyList;

import React, { useState } from 'react';
import { Button, Select, Input, Typography } from 'antd';
import { 
  SoundOutlined, 
  HeartOutlined, 
  BookOutlined,
  SearchOutlined,
  FilterOutlined
} from '@ant-design/icons';
import styles from './VocabularyPage.module.css';

const { Title, Paragraph } = Typography;
const { Option } = Select;

const VocabularyPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock vocabulary data
  const vocabularies = [
    {
      id: 1,
      word: 'Achievement',
      pronunciation: '/əˈtʃiːvmənt/',
      meaning: 'Thành tựu, thành quả',
      example: 'Her academic achievements were impressive.',
      level: 'intermediate',
      category: 'education',
      learned: true,
    },
    {
      id: 2,
      word: 'Brilliant',
      pronunciation: '/ˈbrɪljənt/',
      meaning: 'Rực rỡ, xuất sắc, tài ba',
      example: 'She has a brilliant mind for mathematics.',
      level: 'intermediate',
      category: 'adjective',
      learned: false,
    },
    {
      id: 3,
      word: 'Consequence',
      pronunciation: '/ˈkɒnsɪkwəns/',
      meaning: 'Hậu quả, kết quả',
      example: 'The consequence of his actions was severe.',
      level: 'advanced',
      category: 'general',
      learned: true,
    },
    {
      id: 4,
      word: 'Dedication',
      pronunciation: '/ˌdedɪˈkeɪʃn/',
      meaning: 'Sự cống hiến, sự tận tâm',
      example: 'His dedication to the project was remarkable.',
      level: 'intermediate',
      category: 'general',
      learned: false,
    },
    {
      id: 5,
      word: 'Enthusiasm',
      pronunciation: '/ɪnˈθjuːziæzəm/',
      meaning: 'Sự nhiệt tình, hăng hái',
      example: 'She showed great enthusiasm for the new project.',
      level: 'intermediate',
      category: 'emotion',
      learned: true,
    },
    {
      id: 6,
      word: 'Fascinating',
      pronunciation: '/ˈfæsɪneɪtɪŋ/',
      meaning: 'Hấp dẫn, cuốn hút',
      example: 'The documentary was absolutely fascinating.',
      level: 'intermediate',
      category: 'adjective',
      learned: false,
    },
  ];

  const stats = {
    total: vocabularies.length,
    learned: vocabularies.filter(v => v.learned).length,
    mastered: vocabularies.filter(v => v.learned).length,
    reviewing: vocabularies.filter(v => !v.learned).length,
  };

  const filteredVocabularies = vocabularies.filter(vocab => {
    const matchesSearch = vocab.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vocab.meaning.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || vocab.level === selectedLevel;
    const matchesCategory = selectedCategory === 'all' || vocab.category === selectedCategory;
    
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const handlePlayAudio = (pronunciation) => {
    // Simulate audio playback
    console.log('Playing audio for:', pronunciation);
  };

  return (
    <div className={styles.vocabularyContainer}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <Title level={1} className={styles.pageTitle}>
          Từ vựng tiếng Anh
        </Title>
        <Paragraph className={styles.pageSubtitle}>
          Khám phá và học các từ vựng tiếng Anh theo cấp độ và chủ đề
        </Paragraph>
      </div>

      {/* Filter Section */}
      <div className={styles.filterSection}>
        <div className={styles.filterGrid}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Tìm kiếm
            </label>
            <Input
              placeholder="Tìm từ vựng..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="large"
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Cấp độ
            </label>
            <Select
              value={selectedLevel}
              onChange={setSelectedLevel}
              style={{ width: '100%' }}
              size="large"
            >
              <Option value="all">Tất cả cấp độ</Option>
              <Option value="beginner">Cơ bản</Option>
              <Option value="intermediate">Trung cấp</Option>
              <Option value="advanced">Nâng cao</Option>
            </Select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Chủ đề
            </label>
            <Select
              value={selectedCategory}
              onChange={setSelectedCategory}
              style={{ width: '100%' }}
              size="large"
            >
              <Option value="all">Tất cả chủ đề</Option>
              <Option value="general">Tổng quát</Option>
              <Option value="education">Giáo dục</Option>
              <Option value="emotion">Cảm xúc</Option>
              <Option value="adjective">Tính từ</Option>
            </Select>
          </div>
          <div>
            <Button
              type="primary"
              size="large"
              icon={<FilterOutlined />}
              style={{ width: '100%' }}
            >
              Lọc
            </Button>
          </div>
        </div>
      </div>

      {/* Vocabulary Grid */}
      {filteredVocabularies.length > 0 ? (
        <div className={styles.vocabularyGrid}>
          {filteredVocabularies.map((vocab) => (
            <div key={vocab.id} className={styles.vocabularyCard}>
              <div className={styles.wordHeader}>
                <div>
                  <div className={styles.word}>{vocab.word}</div>
                  <div className={styles.pronunciation}>{vocab.pronunciation}</div>
                </div>
                <Button
                  className={styles.playButton}
                  icon={<SoundOutlined />}
                  onClick={() => handlePlayAudio(vocab.pronunciation)}
                />
              </div>
              
              <div className={styles.meaning}>{vocab.meaning}</div>
              
              <div className={styles.example}>
                <strong>Ví dụ:</strong> {vocab.example}
              </div>
              
              <div className={styles.cardActions}>
                <Button
                  className={`${styles.actionButton} ${styles.learnButton}`}
                  icon={<BookOutlined />}
                >
                  {vocab.learned ? 'Ôn tập' : 'Học'}
                </Button>
                <Button
                  className={`${styles.actionButton} ${styles.reviewButton}`}
                  icon={<BookOutlined />}
                >
                  Luyện tập
                </Button>
                <Button
                  className={`${styles.actionButton} ${styles.favoriteButton}`}
                  icon={<HeartOutlined />}
                >
                  Yêu thích
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <SearchOutlined className={styles.emptyIcon} />
          <div className={styles.emptyText}>
            Không tìm thấy từ vựng nào phù hợp với bộ lọc của bạn
          </div>
          <Button
            type="primary"
            onClick={() => {
              setSearchTerm('');
              setSelectedLevel('all');
              setSelectedCategory('all');
            }}
          >
            Xóa bộ lọc
          </Button>
        </div>
      )}

      {/* Statistics Section */}
      <div className={styles.statsSection}>
        <Title level={2} style={{ color: 'white', marginBottom: '16px' }}>
          Thống kê học tập
        </Title>
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{stats.total}</span>
            <span className={styles.statLabel}>Tổng từ vựng</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{stats.learned}</span>
            <span className={styles.statLabel}>Đã học</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{stats.mastered}</span>
            <span className={styles.statLabel}>Thành thạo</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>{stats.reviewing}</span>
            <span className={styles.statLabel}>Đang ôn tập</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VocabularyPage;

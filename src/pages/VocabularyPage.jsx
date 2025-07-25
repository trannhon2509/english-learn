import React, { useState } from 'react';
import { Button, Typography } from 'antd';
import { SoundOutlined, HeartOutlined, BookOutlined } from '@ant-design/icons';
import styles from './VocabularyPage.module.css';
import GridList from '../components/ui/GridList';

const { Title, Paragraph } = Typography;

const VocabularyPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValues, setFilterValues] = useState({
    level: 'all',
    category: 'all',
  });

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

  const filters = [
    {
      label: 'Cấp độ',
      value: 'level',
      options: [
        { value: 'all', label: 'Tất cả cấp độ' },
        { value: 'beginner', label: 'Cơ bản' },
        { value: 'intermediate', label: 'Trung cấp' },
        { value: 'advanced', label: 'Nâng cao' },
      ],
    },
    {
      label: 'Chủ đề',
      value: 'category',
      options: [
        { value: 'all', label: 'Tất cả chủ đề' },
        { value: 'general', label: 'Tổng quát' },
        { value: 'education', label: 'Giáo dục' },
        { value: 'emotion', label: 'Cảm xúc' },
        { value: 'adjective', label: 'Tính từ' },
      ],
    },
  ];

  const filteredVocabularies = vocabularies.filter(vocab => {
    const matchesSearch = vocab.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vocab.meaning.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterValues.level === 'all' || vocab.level === filterValues.level;
    const matchesCategory = filterValues.category === 'all' || vocab.category === filterValues.category;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const handlePlayAudio = (pronunciation) => {
    // Simulate audio playback
    console.log('Playing audio for:', pronunciation);
  };

  const handleFilterChange = (filterKey, value) => {
    setFilterValues(prev => ({ ...prev, [filterKey]: value }));
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterValues({ level: 'all', category: 'all' });
  };

  // Component tách riêng cho renderItem
  const VocabularyCard = ({ vocab }) => (
    <div className={styles.vocabularyCard}>
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
  );

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

      {/* Vocabulary GridList */}
      <GridList
        items={filteredVocabularies}
        renderItem={<VocabularyCard />}
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        filters={filters}
        filterValues={filterValues}
        onFilterChange={handleFilterChange}
        onFilter={null}
        emptyText={
          <>
            Không tìm thấy từ vựng nào phù hợp với bộ lọc của bạn<br />
            <Button type="primary" onClick={handleClearFilters} style={{ marginTop: 12 }}>
              Xóa bộ lọc
            </Button>
          </>
        }
      />

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

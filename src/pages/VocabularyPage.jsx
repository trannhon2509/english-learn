import React, { useState, useCallback, useMemo } from 'react';
import { Grid } from 'antd';
import { Button, Typography } from 'antd';
import styles from '@css/VocabularyPage.module.css';
import GridList from '@components/ui/GridList';
import VocabularyCard from '@components/VocabularyCard';

// Header Section
const VocabularyHeader = React.memo(() => {
  const { Title, Paragraph } = Typography;
  return (
    <div className={styles.pageHeader}>
      <Title level={1} className={styles.pageTitle}>
        Từ vựng tiếng Anh
      </Title>
      <Paragraph className={styles.pageSubtitle}>
        Khám phá và học các từ vựng tiếng Anh theo cấp độ và chủ đề
      </Paragraph>
    </div>
  );
});

// Statistics Section
const VocabularyStats = React.memo(({ stats }) => {
  const { Title } = Typography;
  return (
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
  );
});

// Grid Section
const VocabularyGridSection = React.memo(({
  filteredVocabularies,
  renderVocabularyItem,
  searchTerm,
  setSearchTerm,
  filters,
  filterValues,
  handleFilterChange,
  handleClearFilters,
  columns
}) => (
  <GridList
    items={filteredVocabularies}
    renderItem={renderVocabularyItem}
    searchTerm={searchTerm}
    onSearch={setSearchTerm}
    filters={filters}
    filterValues={filterValues}
    onFilterChange={handleFilterChange}
    onFilter={null}
    columns={columns}
    emptyText={
      <>
        Không tìm thấy từ vựng nào phù hợp với bộ lọc của bạn<br />
        <Button type="primary" onClick={handleClearFilters} style={{ marginTop: 12 }}>
          Xóa bộ lọc
        </Button>
      </>
    }
  />
));

const { Title, Paragraph } = Typography;

const VocabularyPage = () => {
  const screens = Grid.useBreakpoint();
  let columns = 1;
  if (screens.lg) {
    columns = 3;
  } else if (screens.md) {
    columns = 2;
  } else if (screens.sm) {
    columns = 1;
  }
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValues, setFilterValues] = useState({
    level: 'all',
    category: 'all',
  });

  // Mock vocabulary data
  const vocabularies = useMemo(() => [
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
  ], []);

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

  const filteredVocabularies = useMemo(() => vocabularies.filter(vocab => {
    const matchesSearch = vocab.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vocab.meaning.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterValues.level === 'all' || vocab.level === filterValues.level;
    const matchesCategory = filterValues.category === 'all' || vocab.category === filterValues.category;
    return matchesSearch && matchesLevel && matchesCategory;
  }), [vocabularies, searchTerm, filterValues]);

  const handlePlayAudio = useCallback((pronunciation) => {
    // Simulate audio playback
    console.log('Playing audio for:', pronunciation);
  }, []);

  const handleFilterChange = useCallback((filterKey, value) => {
    setFilterValues(prev => ({ ...prev, [filterKey]: value }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setSearchTerm('');
    setFilterValues({ level: 'all', category: 'all' });
  }, []);

  const renderVocabularyItem = useCallback(vocab => (
    <VocabularyCard vocab={vocab} onPlayAudio={handlePlayAudio} />
  ), [handlePlayAudio]);

  return (
    <div className={styles.vocabularyContainer}>
      <VocabularyHeader />
      <VocabularyGridSection
        filteredVocabularies={filteredVocabularies}
        renderVocabularyItem={renderVocabularyItem}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filters={filters}
        filterValues={filterValues}
        handleFilterChange={handleFilterChange}
        handleClearFilters={handleClearFilters}
        columns={columns}
      />
      <VocabularyStats stats={stats} />
    </div>
  );
};

export default VocabularyPage;

import React, { useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setStudyVocabularies } from '@store/learningSlice';
import { Grid } from 'antd';
import { Button, Typography, Card, Row, Col } from 'antd';
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

// Vocabulary Set Card
const VocabularySetCard = React.memo(({ set, onViewSet, onStudyNow }) => (
  <div className={styles.setCard}>
    <div className={styles.wordHeader}>
      <div>
        <div className={styles.word}>{set.name}</div>
        <ul className={styles.pronunciation} style={{ listStyle: 'disc', paddingLeft: 20, margin: 0 }}>
          <li>{`Cấp độ: ${set.level}`}</li>
          <li>{`Chủ đề: ${set.category}`}</li>
        </ul>
      </div>
      <div className={styles.setWordCount} style={{ backgroundColor: set.color, color: '#fff', padding: '8px 16px', borderRadius: '8px', fontWeight: 600 }}>
        {set.wordCount} từ
      </div>
    </div>
    <div className={styles.cardActions}>
      <Button
        className={`${styles.actionButton} ${styles.learnButton}`}
        onClick={() => onStudyNow(set.id)}
      >
        Học ngay
      </Button>
      <Button
        className={`${styles.actionButton} ${styles.reviewButton}`}
        onClick={() => onViewSet(set.id)}
      >
        Xem bộ từ vựng
      </Button>
    </div>
  </div>
));

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
  columns,
  onBackToSets
}) => (
  <div>
    <Button 
      onClick={onBackToSets} 
      style={{ marginBottom: 16 }}
    >
      ← Quay lại danh sách bộ từ vựng
    </Button>
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
  </div>
));

const VocabularyPage = () => {
  const screens = Grid.useBreakpoint();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState('sets'); // 'sets' or 'vocabularies'
  const [selectedSetId, setSelectedSetId] = useState(null);
  
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

  // Mock vocabulary sets data
  const vocabularySets = useMemo(() => [
    {
      id: 1,
      name: 'Từ vựng học thuật',
      level: 'intermediate',
      category: 'education',
      wordCount: 120,
      color: '#1890ff',
    },
    {
      id: 2,
      name: 'Tính từ thông dụng',
      level: 'beginner',
      category: 'adjective',
      wordCount: 80,
      color: '#52c41a',
    },
    {
      id: 3,
      name: 'Từ vựng nâng cao',
      level: 'advanced',
      category: 'general',
      wordCount: 200,
      color: '#f5222d',
    },
    {
      id: 4,
      name: 'Từ vựng cảm xúc',
      level: 'intermediate',
      category: 'emotion',
      wordCount: 60,
      color: '#faad14',
    },
  ], []);

  // Mock vocabulary data
  const allVocabularies = useMemo(() => [
    {
      id: 1,
      word: 'Achievement',
      pronunciation: '/əˈtʃiːvmənt/',
      meaning: 'Thành tựu, thành quả',
      example: 'Her academic achievements were impressive.',
      level: 'intermediate',
      category: 'education',
      learned: true,
      setId: 1,
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
      setId: 2,
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
      setId: 3,
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
      setId: 1,
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
      setId: 4,
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
      setId: 2,
    },
  ], []);

  const stats = {
    total: allVocabularies.length,
    learned: allVocabularies.filter(v => v.learned).length,
    mastered: allVocabularies.filter(v => v.learned).length,
    reviewing: allVocabularies.filter(v => !v.learned).length,
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

  const currentVocabularies = useMemo(() => 
    selectedSetId 
      ? allVocabularies.filter(v => v.setId === selectedSetId) 
      : allVocabularies,
    [allVocabularies, selectedSetId]
  );

  const filteredVocabularies = useMemo(() => currentVocabularies.filter(vocab => {
    const matchesSearch = vocab.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vocab.meaning.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = filterValues.level === 'all' || vocab.level === filterValues.level;
    const matchesCategory = filterValues.category === 'all' || vocab.category === filterValues.category;
    return matchesSearch && matchesLevel && matchesCategory;
  }), [currentVocabularies, searchTerm, filterValues]);

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

  const handleViewSet = useCallback((setId) => {
    setSelectedSetId(setId);
    setCurrentView('vocabularies');
  }, []);

  const handleStudyNow = useCallback((setId) => {
    // Lấy danh sách từ vựng của bộ
    const setVocabularies = allVocabularies.filter(v => v.setId === setId);
    dispatch(setStudyVocabularies(setVocabularies));
    navigate('/study');
  }, [allVocabularies, dispatch, navigate]);

  const handleBackToSets = useCallback(() => {
    setCurrentView('sets');
    setSelectedSetId(null);
  }, []);

  // Render function for VocabularySetCard in GridList
  const renderSetItem = useCallback(
    set => (
      <VocabularySetCard 
        set={set} 
        onViewSet={handleViewSet}
        onStudyNow={handleStudyNow}
      />
    ), [handleViewSet, handleStudyNow]
  );

  return (
    <div className={styles.vocabularyContainer}>
      <VocabularyHeader />

      {currentView === 'sets' ? (
        <div className={styles.setsContainer}>
          <GridList
            items={vocabularySets}
            renderItem={renderSetItem}
            columns={columns}
            emptyText={<span>Không có bộ từ vựng nào.</span>}
          />
        </div>
      ) : (
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
          onBackToSets={handleBackToSets}
        />
      )}

      <VocabularyStats stats={stats} />
    </div>
  );
};

export default VocabularyPage;
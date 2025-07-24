import React, { useState } from 'react';
import { Card, List, Button, Tag, Progress, Typography, Space, Divider } from 'antd';
import { BookOutlined, PlayCircleOutlined, EditOutlined, TranslationOutlined, UnorderedListOutlined, ArrowLeftOutlined, CheckCircleOutlined } from '@ant-design/icons';
import VocabularyMethods from '../components/VocabularyMethods';
import FlashcardLearning from '../components/FlashcardLearning';
import EnglishInputLearning from '../components/EnglishInputLearning';
import VietnameseInputLearning from '../components/VietnameseInputLearning';
import VocabularyList from '../components/VocabularyList';

const { Title } = Typography;

const VocabularyPage = () => {
  const [selectedVocabulary, setSelectedVocabulary] = useState(null);
  const [learningMethod, setLearningMethod] = useState(null);

  const vocabularies = [
    {
      id: 1,
      title: 'Từ vựng cơ bản hàng ngày',
      description: 'Những từ vựng thiết yếu được sử dụng trong cuộc sống hàng ngày',
      totalWords: 500,
      learnedWords: 245,
      level: 'Cơ bản',
      color: 'green',
      image: '📚'
    },
    {
      id: 2,
      title: 'Từ vựng công việc',
      description: 'Từ vựng chuyên ngành dành cho môi trường làm việc',
      totalWords: 350,
      learnedWords: 120,
      level: 'Trung bình',
      color: 'blue',
      image: '💼'
    },
    {
      id: 3,
      title: 'Từ vựng du lịch',
      description: 'Từ vựng hữu ích khi đi du lịch và giao tiếp với người nước ngoài',
      totalWords: 400,
      learnedWords: 180,
      level: 'Cơ bản',
      color: 'green',
      image: '✈️'
    },
    {
      id: 4,
      title: 'Từ vựng học thuật',
      description: 'Từ vựng chuyên sâu phục vụ cho việc học tập và nghiên cứu',
      totalWords: 600,
      learnedWords: 85,
      level: 'Nâng cao',
      color: 'orange',
      image: '🎓'
    },
    {
      id: 5,
      title: 'Từ vựng gia đình',
      description: 'Từ vựng về các mối quan hệ gia đình và hoạt động trong nhà',
      totalWords: 250,
      learnedWords: 200,
      level: 'Cơ bản',
      color: 'green',
      image: '🏠'
    },
    {
      id: 6,
      title: 'Từ vựng thể thao',
      description: 'Từ vựng liên quan đến các môn thể thao và hoạt động thể chất',
      totalWords: 300,
      learnedWords: 95,
      level: 'Trung bình',
      color: 'blue',
      image: '⚽'
    }
  ];

  const handleSelectVocabulary = (vocabulary) => {
    setSelectedVocabulary(vocabulary);
    setLearningMethod(null);
  };

  const handleSelectMethod = (method) => {
    setLearningMethod(method);
  };

  const handleBackToVocabularies = () => {
    setSelectedVocabulary(null);
    setLearningMethod(null);
  };

  const handleBackToMethods = () => {
    setLearningMethod(null);
  };

  // Render learning component based on selected method
  const renderLearningComponent = () => {
    if (!selectedVocabulary || !learningMethod) return null;

    switch (learningMethod) {
      case 'flashcard':
        return <FlashcardLearning vocabulary={selectedVocabulary} onBack={handleBackToMethods} />;
      case 'english-input':
        return <EnglishInputLearning vocabulary={selectedVocabulary} onBack={handleBackToMethods} />;
      case 'vietnamese-input':
        return <VietnameseInputLearning vocabulary={selectedVocabulary} onBack={handleBackToMethods} />;
      case 'word-list':
        return <VocabularyList vocabulary={selectedVocabulary} onBack={handleBackToMethods} />;
      default:
        return null;
    }
  };

  // If a learning method is selected, show the learning component
  if (learningMethod && selectedVocabulary) {
    return renderLearningComponent();
  }

  // If a vocabulary is selected, show learning methods
  if (selectedVocabulary) {
    return (
      <VocabularyMethods 
        vocabulary={selectedVocabulary}
        onSelectMethod={handleSelectMethod}
        onBack={handleBackToVocabularies}
      />
    );
  }

  // Default view: show vocabulary list
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>
          <BookOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
          Kho từ vựng
        </Title>
        <p>Chọn một kho từ vựng để bắt đầu học tập</p>
      </div>

      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
          xxl: 3,
        }}
        dataSource={vocabularies}
        renderItem={vocabulary => {
          const progress = Math.round((vocabulary.learnedWords / vocabulary.totalWords) * 100);
          
          return (
            <List.Item>
              <Card
                hoverable
                style={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                bodyStyle={{ 
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
                cover={
                  <div style={{ 
                    height: '120px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    fontSize: '48px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white'
                  }}>
                    {vocabulary.image}
                  </div>
                }
                actions={[
                  <Button 
                    type="primary" 
                    icon={<PlayCircleOutlined />}
                    onClick={() => handleSelectVocabulary(vocabulary)}
                    block
                  >
                    Bắt đầu học
                  </Button>
                ]}
              >
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Card.Meta
                    title={vocabulary.title}
                    description={
                      <div style={{ 
                        minHeight: '48px',
                        display: 'flex',
                        alignItems: 'flex-start'
                      }}>
                        {vocabulary.description}
                      </div>
                    }
                  />
                  <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <Tag color={vocabulary.color}>{vocabulary.level}</Tag>
                      <span>{vocabulary.learnedWords}/{vocabulary.totalWords} từ</span>
                    </div>
                    <Progress 
                      percent={progress} 
                      strokeColor={{
                        '0%': '#108ee9',
                        '100%': '#87d068',
                      }}
                    />
                    <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
                      Tiến độ: {progress}%
                    </div>
                    <div style={{ height: '32px', marginTop: '8px', display: 'flex', alignItems: 'flex-start' }}>
                      {progress === 100 && (
                        <Tag color="success" icon={<CheckCircleOutlined />}>
                          Đã hoàn thành
                        </Tag>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </List.Item>
          );
        }}
      />
    </div>
  );
};

// Sidebar content for vocabulary page
VocabularyPage.sidebarContent = (
  <div>
    <Title level={4}>Thống kê từ vựng</Title>
    
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span>Tổng từ đã học:</span>
        <strong>925 từ</strong>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span>Từ mới hôm nay:</span>
        <strong>25 từ</strong>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span>Chuỗi học liên tiếp:</span>
        <strong>7 ngày</strong>
      </div>
    </div>

    <Divider />

    <Title level={5}>Mức độ thành thạo</Title>
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span>Thành thạo:</span>
        <Tag color="green">520 từ</Tag>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span>Đang học:</span>
        <Tag color="blue">280 từ</Tag>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span>Cần ôn:</span>
        <Tag color="orange">125 từ</Tag>
      </div>
    </div>

    <Divider />

    <div style={{ padding: '16px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
      <Title level={5}>Mục tiêu tuần</Title>
      <p>Học 100 từ mới</p>
      <Progress percent={65} size="small" />
      <p style={{ fontSize: '12px', margin: '4px 0 0 0' }}>65/100 từ (65%)</p>
    </div>
  </div>
);

export default VocabularyPage;

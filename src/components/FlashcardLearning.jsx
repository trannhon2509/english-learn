import React, { useState } from 'react';
import { Card, Button, Typography, Space, Progress, Tag, message } from 'antd';
import { 
  ArrowLeftOutlined, 
  SoundOutlined, 
  ReloadOutlined,
  CheckOutlined,
  CloseOutlined,
  EyeOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const FlashcardLearning = ({ vocabulary, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [showResult, setShowResult] = useState(false);

  // Sample vocabulary data
  const words = [
    {
      id: 1,
      word: 'Beautiful',
      phonetic: '/ˈbjuː.tɪ.fəl/',
      meaning: 'Đẹp, xinh đẹp',
      definition: 'Having qualities that give pleasure to the senses',
      example: 'She has a beautiful smile.',
      exampleTranslation: 'Cô ấy có nụ cười đẹp.',
      image: '🌸'
    },
    {
      id: 2,
      word: 'Adventure',
      phonetic: '/ədˈven.tʃər/',
      meaning: 'Cuộc phiêu lưu',
      definition: 'An exciting or dangerous experience',
      example: 'Their trip to the mountains was a great adventure.',
      exampleTranslation: 'Chuyến đi lên núi của họ là một cuộc phiêu lưu tuyệt vời.',
      image: '🏔️'
    },
    {
      id: 3,
      word: 'Knowledge',
      phonetic: '/ˈnɒl.ɪdʒ/',
      meaning: 'Kiến thức',
      definition: 'Information and skills acquired through experience or education',
      example: 'Reading books increases your knowledge.',
      exampleTranslation: 'Đọc sách làm tăng kiến thức của bạn.',
      image: '📚'
    },
    {
      id: 4,
      word: 'Friendship',
      phonetic: '/ˈfrend.ʃɪp/',
      meaning: 'Tình bạn',
      definition: 'A close relationship between friends',
      example: 'Their friendship has lasted for many years.',
      exampleTranslation: 'Tình bạn của họ đã kéo dài nhiều năm.',
      image: '🤝'
    },
    {
      id: 5,
      word: 'Courage',
      phonetic: '/ˈkʌr.ɪdʒ/',
      meaning: 'Lòng dũng cảm',
      definition: 'The ability to do something dangerous or difficult without fear',
      example: 'It takes courage to speak in public.',
      exampleTranslation: 'Cần có lòng dũng cảm để nói trước công chúng.',
      image: '🦁'
    }
  ];

  const currentWord = words[currentIndex];
  const progress = ((currentIndex + 1) / words.length) * 100;

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleAnswer = (isCorrect) => {
    setScore(prev => ({
      ...prev,
      [isCorrect ? 'correct' : 'incorrect']: prev[isCorrect ? 'correct' : 'incorrect'] + 1
    }));

    if (currentIndex < words.length - 1) {
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setIsFlipped(false);
      }, 1000);
    } else {
      setShowResult(true);
    }
  };

  const playPronunciation = () => {
    // In a real app, this would use text-to-speech API
    message.info(`Phát âm: ${currentWord.phonetic}`);
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setScore({ correct: 0, incorrect: 0 });
    setShowResult(false);
  };

  if (showResult) {
    const totalQuestions = words.length;
    const correctPercentage = Math.round((score.correct / totalQuestions) * 100);
    
    return (
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <Title level={2}>🎉 Hoàn thành!</Title>
        
        <div style={{ 
          maxWidth: '400px', 
          margin: '0 auto',
          padding: '24px',
          backgroundColor: '#f0f8ff',
          borderRadius: '12px',
          marginBottom: '24px'
        }}>
          <Title level={3}>Kết quả của bạn</Title>
          <div style={{ fontSize: '18px', marginBottom: '16px' }}>
            <div>✅ Đúng: <strong>{score.correct}/{totalQuestions}</strong></div>
            <div>❌ Sai: <strong>{score.incorrect}/{totalQuestions}</strong></div>
            <div style={{ marginTop: '8px' }}>
              Điểm số: <strong>{correctPercentage}%</strong>
            </div>
          </div>
          
          <Progress 
            percent={correctPercentage} 
            strokeColor={correctPercentage >= 70 ? '#52c41a' : '#fa8c16'}
          />
          
          <div style={{ marginTop: '16px' }}>
            {correctPercentage >= 70 ? (
              <Tag color="green" style={{ fontSize: '14px', padding: '4px 8px' }}>
                🌟 Xuất sắc!
              </Tag>
            ) : (
              <Tag color="orange" style={{ fontSize: '14px', padding: '4px 8px' }}>
                💪 Cần luyện tập thêm
              </Tag>
            )}
          </div>
        </div>

        <Space size="large">
          <Button 
            type="primary" 
            icon={<ReloadOutlined />} 
            onClick={resetQuiz}
            size="large"
          >
            Học lại
          </Button>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={onBack}
            size="large"
          >
            Quay lại
          </Button>
        </Space>
      </div>
    );
  }

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
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={2}>📚 Flashcard - {vocabulary.title}</Title>
          <div style={{ fontSize: '16px' }}>
            <span>{currentIndex + 1}/{words.length}</span>
          </div>
        </div>
        
        <Progress percent={progress} strokeColor="#1890ff" />
        
        <div style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
          ✅ Đúng: {score.correct} | ❌ Sai: {score.incorrect}
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '400px'
      }}>
        <div 
          style={{ 
            perspective: '1000px',
            width: '100%',
            maxWidth: '500px'
          }}
        >
          <Card
            style={{
              width: '100%',
              height: '350px',
              cursor: 'pointer',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.6s',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
              position: 'relative'
            }}
            onClick={handleFlip}
            bodyStyle={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '24px',
              backfaceVisibility: 'hidden',
              position: 'absolute',
              width: '100%',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
          >
            {!isFlipped ? (
              // Front side - Word
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '64px', marginBottom: '16px' }}>
                  {currentWord.image}
                </div>
                <Title level={1} style={{ marginBottom: '8px', color: '#1890ff' }}>
                  {currentWord.word}
                </Title>
                <div style={{ 
                  fontSize: '18px', 
                  color: '#666',
                  marginBottom: '16px'
                }}>
                  {currentWord.phonetic}
                </div>
                <Button 
                  icon={<SoundOutlined />} 
                  onClick={(e) => {
                    e.stopPropagation();
                    playPronunciation();
                  }}
                  style={{ marginBottom: '24px' }}
                >
                  Phát âm
                </Button>
                <div style={{ 
                  fontSize: '14px', 
                  color: '#999',
                  marginTop: '20px'
                }}>
                  <EyeOutlined /> Nhấp để xem nghĩa
                </div>
              </div>
            ) : (
              // Back side - Meaning
              <div style={{ 
                textAlign: 'center',
                transform: 'rotateY(180deg)'
              }}>
                <Title level={2} style={{ color: '#52c41a', marginBottom: '16px' }}>
                  {currentWord.meaning}
                </Title>
                <Paragraph style={{ fontSize: '16px', marginBottom: '16px' }}>
                  <strong>Definition:</strong> {currentWord.definition}
                </Paragraph>
                <div style={{ 
                  backgroundColor: '#f0f8ff',
                  padding: '12px',
                  borderRadius: '8px',
                  marginBottom: '16px'
                }}>
                  <div style={{ marginBottom: '4px' }}>
                    <strong>Example:</strong> {currentWord.example}
                  </div>
                  <div style={{ color: '#666' }}>
                    <strong>Ví dụ:</strong> {currentWord.exampleTranslation}
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {isFlipped && (
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Title level={4} style={{ marginBottom: '16px' }}>
            Bạn có nhớ nghĩa của từ này không?
          </Title>
          <Space size="large">
            <Button 
              type="primary"
              size="large"
              icon={<CheckOutlined />}
              onClick={() => handleAnswer(true)}
              style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
            >
              Biết rồi
            </Button>
            <Button 
              size="large"
              icon={<CloseOutlined />}
              onClick={() => handleAnswer(false)}
              style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f', color: 'white' }}
            >
              Chưa nhớ
            </Button>
          </Space>
        </div>
      )}
    </div>
  );
};

export default FlashcardLearning;

import React, { useState } from 'react';
import { Card, Button, Input, Typography, Space, Progress, Tag, message, Alert } from 'antd';
import { 
  ArrowLeftOutlined, 
  SoundOutlined, 
  CheckOutlined,
  ReloadOutlined,
  BulbOutlined
} from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const VietnameseInputLearning = ({ vocabulary, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState('');

  // Sample vocabulary data
  const words = [
    {
      id: 1,
      word: 'Beautiful',
      phonetic: '/ˈbjuː.tɪ.fəl/',
      meaning: 'Đẹp, xinh đẹp',
      definition: 'Having qualities that give pleasure to the senses',
      acceptedAnswers: [
        'đẹp',
        'xinh đẹp',
        'đẹp đẽ',
        'tuyệt đẹp',
        'lộng lẫy',
        'quyến rũ',
        'hấp dẫn'
      ],
      hint: 'Từ này mô tả về vẻ ngoài hấp dẫn, thường dùng để khen ngợi',
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
      acceptedAnswers: [
        'cuộc phiêu lưu',
        'phiêu lưu',
        'mạo hiểm',
        'cuộc mạo hiểm',
        'hành trình thú vị',
        'trải nghiệm thú vị'
      ],
      hint: 'Từ này chỉ một trải nghiệm thú vị và đầy mạo hiểm',
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
      acceptedAnswers: [
        'kiến thức',
        'tri thức',
        'học thức',
        'hiểu biết',
        'sự hiểu biết',
        'trình độ'
      ],
      hint: 'Từ này chỉ những gì bạn học được và hiểu biết qua học tập',
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
      acceptedAnswers: [
        'tình bạn',
        'tình bạn bè',
        'tình cảm bạn bè',
        'mối quan hệ bạn bè',
        'bạn bè'
      ],
      hint: 'Từ này chỉ mối quan hệ thân thiết giữa những người bạn',
      example: 'Their friendship has lasted for many years.',
      exampleTranslation: 'Tình bạn của họ đã kéo dài nhiều năm.',
      image: '🤝'
    }
  ];

  const currentWord = words[currentIndex];
  const progress = ((currentIndex + 1) / words.length) * 100;

  const checkAnswer = () => {
    const normalizedInput = userInput.toLowerCase().trim()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // Remove Vietnamese accents for comparison
    
    const isCorrect = currentWord.acceptedAnswers.some(answer => {
      const normalizedAnswer = answer.toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      return normalizedInput.includes(normalizedAnswer) || 
             normalizedAnswer.includes(normalizedInput);
    });

    if (isCorrect) {
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
      setFeedback('correct');
      message.success('Chính xác! Bạn đã dịch đúng từ này.');
    } else {
      setScore(prev => ({ ...prev, incorrect: prev.incorrect + 1 }));
      setFeedback('incorrect');
      message.error('Chưa chính xác. Hãy xem đáp án đúng bên dưới.');
    }
    
    setShowAnswer(true);
  };

  const nextWord = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserInput('');
      setShowAnswer(false);
      setFeedback('');
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setUserInput('');
    setShowAnswer(false);
    setScore({ correct: 0, incorrect: 0 });
    setShowResult(false);
    setFeedback('');
  };

  const playPronunciation = () => {
    message.info(`Phát âm: ${currentWord.phonetic}`);
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
          <Title level={2}>🇻🇳 Nhập nghĩa tiếng Việt - {vocabulary.title}</Title>
          <div style={{ fontSize: '16px' }}>
            <span>{currentIndex + 1}/{words.length}</span>
          </div>
        </div>
        
        <Progress percent={progress} strokeColor="#fa8c16" />
        
        <div style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
          ✅ Đúng: {score.correct} | ❌ Sai: {score.incorrect}
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Word Card */}
        <Card style={{ marginBottom: '24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>
              {currentWord.image}
            </div>
            <Title level={1} style={{ marginBottom: '8px', color: '#1890ff' }}>
              {currentWord.word}
            </Title>
            <div style={{ fontSize: '18px', color: '#666', marginBottom: '16px' }}>
              {currentWord.phonetic}
            </div>
            <Button 
              icon={<SoundOutlined />} 
              onClick={playPronunciation}
            >
              Phát âm
            </Button>
          </div>

          <div style={{ 
            backgroundColor: '#f0f8ff', 
            padding: '16px', 
            borderRadius: '8px',
            marginBottom: '16px'
          }}>
            <Title level={5} style={{ marginBottom: '8px' }}>Định nghĩa tiếng Anh:</Title>
            <Paragraph style={{ fontSize: '16px', margin: 0 }}>
              {currentWord.definition}
            </Paragraph>
          </div>

          {/* Hint */}
          <Alert
            message="Gợi ý"
            description={currentWord.hint}
            type="info"
            icon={<BulbOutlined />}
            style={{ marginBottom: '20px' }}
          />
        </Card>

        {/* Input Area */}
        <Card title="Nhập nghĩa tiếng Việt của từ này">
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Nhập nghĩa tiếng Việt..."
            size="large"
            style={{ marginBottom: '16px' }}
            disabled={showAnswer}
            onPressEnter={!showAnswer ? checkAnswer : undefined}
          />
          
          {!showAnswer ? (
            <Button 
              type="primary" 
              onClick={checkAnswer}
              disabled={!userInput.trim()}
              icon={<CheckOutlined />}
              size="large"
            >
              Kiểm tra đáp án
            </Button>
          ) : (
            <Button 
              type="primary" 
              onClick={nextWord}
              size="large"
            >
              {currentIndex < words.length - 1 ? 'Từ tiếp theo' : 'Hoàn thành'}
            </Button>
          )}
        </Card>

        {/* Answer Feedback */}
        {showAnswer && (
          <Card 
            style={{ 
              marginTop: '24px',
              borderColor: feedback === 'correct' ? '#52c41a' : '#ff4d4f'
            }}
          >
            <div style={{ marginBottom: '16px' }}>
              {feedback === 'correct' ? (
                <Alert
                  message="Chính xác! 🎉"
                  description="Bạn đã dịch đúng từ này sang tiếng Việt."
                  type="success"
                  showIcon
                />
              ) : (
                <Alert
                  message="Chưa chính xác 📝"
                  description="Đừng lo lắng, hãy xem đáp án đúng để học thêm."
                  type="error"
                  showIcon
                />
              )}
            </div>

            <div style={{ marginBottom: '16px' }}>
              <Title level={5}>Nghĩa chính xác:</Title>
              <Paragraph style={{ 
                fontSize: '18px', 
                backgroundColor: '#f0f8ff', 
                padding: '12px',
                borderRadius: '6px',
                fontWeight: 'bold',
                color: '#1890ff'
              }}>
                {currentWord.meaning}
              </Paragraph>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <Title level={5}>Ví dụ:</Title>
              <div style={{ 
                backgroundColor: '#f6ffed',
                padding: '12px',
                borderRadius: '6px'
              }}>
                <Paragraph style={{ margin: 0, marginBottom: '4px' }}>
                  <strong>English:</strong> {currentWord.example}
                </Paragraph>
                <Paragraph style={{ margin: 0, color: '#666' }}>
                  <strong>Tiếng Việt:</strong> {currentWord.exampleTranslation}
                </Paragraph>
              </div>
            </div>

            {feedback === 'incorrect' && (
              <div>
                <Title level={5}>Các đáp án được chấp nhận:</Title>
                <div>
                  {currentWord.acceptedAnswers.map((answer, index) => (
                    <Tag 
                      key={index} 
                      color="blue"
                      style={{ 
                        marginBottom: '4px', 
                        fontSize: '14px',
                        padding: '4px 8px'
                      }}
                    >
                      {answer}
                    </Tag>
                  ))}
                </div>
              </div>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

export default VietnameseInputLearning;

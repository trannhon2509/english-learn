import React, { useState, useRef, useEffect } from 'react';
import { Card, List, Button, Tag, Progress, Typography, Space, Row, Col, Slider, Radio, Divider } from 'antd';
import { PlayCircleOutlined, PauseCircleOutlined, ArrowLeftOutlined, SoundOutlined, CheckCircleOutlined, ReloadOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const ListeningPage = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(50);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const audioRef = useRef(null);

  const listeningLessons = [
    {
      id: 1,
      title: 'Hội thoại hàng ngày - Ở cửa hàng',
      description: 'Luyện nghe đoạn hội thoại mua sắm tại cửa hàng',
      level: 'Cơ bản',
      color: 'green',
      duration: '2:30',
      completed: true,
      exercises: 5,
      completedExercises: 5,
      image: '🛒',
      audioUrl: '/audio/daily-conversation-shop.mp3', // Placeholder URL
      transcript: `
Customer: Excuse me, how much is this shirt?
Shop assistant: It's $25.
Customer: Do you have it in blue?
Shop assistant: Let me check... Yes, we do. What size do you need?
Customer: Medium, please.
Shop assistant: Here you are. Would you like to try it on?
Customer: Yes, please. Where's the fitting room?
Shop assistant: It's over there, next to the cashier.
Customer: Thank you.
      `,
      questions: [
        {
          question: "How much does the shirt cost?",
          options: ["$20", "$25", "$30", "$35"],
          correct: 1,
          timeStart: 5
        },
        {
          question: "What color does the customer want?",
          options: ["Red", "Green", "Blue", "Yellow"],
          correct: 2,
          timeStart: 15
        },
        {
          question: "What size does the customer need?",
          options: ["Small", "Medium", "Large", "Extra Large"],
          correct: 1,
          timeStart: 25
        },
        {
          question: "Where is the fitting room?",
          options: ["Near the entrance", "Next to the cashier", "Upstairs", "In the basement"],
          correct: 1,
          timeStart: 35
        }
      ]
    },
    {
      id: 2,
      title: 'Tin tức thời tiết',
      description: 'Nghe và hiểu bản tin dự báo thời tiết',
      level: 'Cơ bản',
      color: 'green',
      duration: '1:45',
      completed: false,
      exercises: 4,
      completedExercises: 2,
      image: '🌤️',
      audioUrl: '/audio/weather-forecast.mp3',
      transcript: `
Good morning, this is the weather forecast for today, March 15th.

It will be mostly sunny with some clouds in the afternoon. The temperature will reach a high of 24 degrees Celsius and a low of 16 degrees. There's a 20% chance of rain in the evening.

Winds will be light, coming from the southeast at 10 kilometers per hour. Tomorrow will be similar, with sunny skies and temperatures around 25 degrees.

Have a great day!
      `,
      questions: [
        {
          question: "What will the weather be like today?",
          options: ["Rainy", "Mostly sunny", "Cloudy", "Stormy"],
          correct: 1,
          timeStart: 10
        },
        {
          question: "What's the highest temperature today?",
          options: ["16°C", "20°C", "24°C", "25°C"],
          correct: 2,
          timeStart: 20
        },
        {
          question: "When might it rain?",
          options: ["Morning", "Afternoon", "Evening", "Never"],
          correct: 2,
          timeStart: 30
        },
        {
          question: "What's tomorrow's temperature?",
          options: ["Around 24°C", "Around 25°C", "Around 26°C", "Around 23°C"],
          correct: 1,
          timeStart: 50
        }
      ]
    },
    {
      id: 3,
      title: 'Phỏng vấn xin việc',
      description: 'Nghe đoạn hội thoại phỏng vấn xin việc làm',
      level: 'Trung bình',
      color: 'blue',
      duration: '3:20',
      completed: false,
      exercises: 6,
      completedExercises: 1,
      image: '💼',
      audioUrl: '/audio/job-interview.mp3',
      transcript: `
Interviewer: Good morning, please have a seat. Can you tell me about yourself?
Candidate: Good morning. My name is Sarah Johnson. I graduated from university two years ago with a degree in marketing. I've been working as a marketing assistant at ABC Company for the past year.

Interviewer: That's great. Why are you interested in this position?
Candidate: I'm looking for new challenges and opportunities to grow. Your company has an excellent reputation, and I believe my skills would be valuable here.

Interviewer: What are your strengths?
Candidate: I'm very organized, detail-oriented, and I work well in teams. I'm also good at problem-solving and meeting deadlines.

Interviewer: Do you have any questions for us?
Candidate: Yes, what would a typical day look like in this role?
      `,
      questions: [
        {
          question: "What's the candidate's name?",
          options: ["Sarah Johnson", "Sarah Jackson", "Sara Johnson", "Sarah Jones"],
          correct: 0,
          timeStart: 15
        },
        {
          question: "How long has she been working at ABC Company?",
          options: ["Six months", "One year", "Two years", "Three years"],
          correct: 1,
          timeStart: 25
        },
        {
          question: "What degree does she have?",
          options: ["Business", "Marketing", "Economics", "Management"],
          correct: 1,
          timeStart: 20
        },
        {
          question: "What is one of her strengths?",
          options: ["Creative", "Organized", "Ambitious", "Competitive"],
          correct: 1,
          timeStart: 60
        }
      ]
    },
    {
      id: 4,
      title: 'Thuyết trình học thuật',
      description: 'Nghe bài thuyết trình về môi trường',
      level: 'Nâng cao',
      color: 'orange',
      duration: '4:15',
      completed: false,
      exercises: 8,
      completedExercises: 0,
      image: '🎓',
      audioUrl: '/audio/academic-presentation.mp3',
      transcript: `
Today I'm going to talk about climate change and its impact on our planet.

Climate change refers to long-term changes in global temperatures and weather patterns. While climate change is natural, scientific evidence shows that human activities have been the main driver since the mid-20th century.

The primary cause is the emission of greenhouse gases, particularly carbon dioxide from burning fossil fuels. These gases trap heat in the atmosphere, causing global temperatures to rise.

The effects are already visible: melting ice caps, rising sea levels, extreme weather events, and changes in rainfall patterns. If we don't take action now, these problems will become much worse.

However, there are solutions. We can reduce emissions by using renewable energy, improving energy efficiency, and changing transportation habits. Governments, businesses, and individuals all have a role to play.
      `,
      questions: [
        {
          question: "What is the main topic of the presentation?",
          options: ["Weather patterns", "Climate change", "Renewable energy", "Global warming"],
          correct: 1,
          timeStart: 5
        },
        {
          question: "What is the primary cause of recent climate change?",
          options: ["Natural causes", "Solar activity", "Human activities", "Ocean currents"],
          correct: 2,
          timeStart: 40
        },
        {
          question: "Which gas is mentioned as a major greenhouse gas?",
          options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"],
          correct: 2,
          timeStart: 60
        },
        {
          question: "What is mentioned as an effect of climate change?",
          options: ["Decreased population", "Rising sea levels", "More forests", "Cooler temperatures"],
          correct: 1,
          timeStart: 90
        }
      ]
    }
  ];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [selectedLesson]);

  const handleLessonSelect = (lesson) => {
    setSelectedLesson(lesson);
    setUserAnswers({});
    setShowResults(false);
    setShowTranscript(false);
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (value) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.currentTime = value;
    setCurrentTime(value);
  };

  const handleVolumeChange = (value) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.volume = value / 100;
    setVolume(value);
  };

  const handlePlaybackRateChange = (value) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.playbackRate = value;
    setPlaybackRate(value);
  };

  const jumpToTime = (time) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleSubmitAnswers = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    if (!selectedLesson) return 0;
    const questions = selectedLesson.questions;
    let correct = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correct) {
        correct++;
      }
    });
    return Math.round((correct / questions.length) * 100);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const renderLessonList = () => (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>
          <SoundOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
          Luyện nghe
        </Title>
        <p>Cải thiện kỹ năng nghe hiểu tiếng Anh qua các bài học thực tế</p>
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
        dataSource={listeningLessons}
        renderItem={lesson => {
          const progress = Math.round((lesson.completedExercises / lesson.exercises) * 100);
          
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
                    {lesson.image}
                  </div>
                }
                actions={[
                  <Button 
                    type="primary" 
                    icon={<PlayCircleOutlined />}
                    onClick={() => handleLessonSelect(lesson)}
                    block
                  >
                    Bắt đầu nghe
                  </Button>
                ]}
              >
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Card.Meta
                    title={lesson.title}
                    description={
                      <div style={{ 
                        minHeight: '48px',
                        display: 'flex',
                        alignItems: 'flex-start'
                      }}>
                        {lesson.description}
                      </div>
                    }
                  />
                  <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <Tag color={lesson.color}>{lesson.level}</Tag>
                      <span>
                        {lesson.completedExercises}/{lesson.exercises} câu hỏi
                      </span>
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
                      {lesson.completed && (
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

  const renderLessonDetail = () => (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Button 
          icon={<ArrowLeftOutlined />}
          onClick={() => setSelectedLesson(null)}
          style={{ marginBottom: '16px' }}
        >
          Quay lại danh sách
        </Button>
        <Title level={2}>{selectedLesson.title}</Title>
        <Tag color={selectedLesson.color}>{selectedLesson.level}</Tag>
        <Text style={{ marginLeft: '8px' }}>• {selectedLesson.duration}</Text>
      </div>

      <Row gutter={24}>
        <Col xs={24} lg={16}>
          <Card title="Trình phát âm thanh" style={{ marginBottom: '24px' }}>
            <audio
              ref={audioRef}
              src={selectedLesson.audioUrl}
              preload="metadata"
            />
            
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <Button
                type="primary"
                size="large"
                icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                onClick={togglePlayPause}
                style={{ marginRight: '16px' }}
              >
                {isPlaying ? 'Tạm dừng' : 'Phát'}
              </Button>
              
              <Button
                icon={<ReloadOutlined />}
                onClick={() => handleSeek(0)}
              >
                Phát lại
              </Button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration || 0)}</span>
              </div>
              <Slider
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                tooltip={{ formatter: (value) => formatTime(value) }}
              />
            </div>

            <Row gutter={16}>
              <Col span={12}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <SoundOutlined style={{ marginRight: '8px' }} />
                  <Slider
                    min={0}
                    max={100}
                    value={volume}
                    onChange={handleVolumeChange}
                    style={{ flex: 1 }}
                  />
                </div>
              </Col>
              <Col span={12}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '8px' }}>Tốc độ:</span>
                  <Radio.Group
                    value={playbackRate}
                    onChange={(e) => handlePlaybackRateChange(e.target.value)}
                    size="small"
                  >
                    <Radio.Button value={0.75}>0.75x</Radio.Button>
                    <Radio.Button value={1}>1x</Radio.Button>
                    <Radio.Button value={1.25}>1.25x</Radio.Button>
                  </Radio.Group>
                </div>
              </Col>
            </Row>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <Button
                type={showTranscript ? 'primary' : 'default'}
                onClick={() => setShowTranscript(!showTranscript)}
              >
                {showTranscript ? 'Ẩn script' : 'Hiển thị script'}
              </Button>
            </div>

            {showTranscript && (
              <Card size="small" style={{ marginTop: '16px' }}>
                <Paragraph style={{ whiteSpace: 'pre-line', fontSize: '14px', lineHeight: '1.6' }}>
                  <strong>Bản ghi âm:</strong>
                  {selectedLesson.transcript}
                </Paragraph>
              </Card>
            )}
          </Card>

          <Card title="Câu hỏi theo dõi" style={{ marginBottom: '24px' }}>
            <div style={{ marginBottom: '16px' }}>
              <Text>Nghe và trả lời các câu hỏi dưới đây. Bạn có thể click vào thời gian để nhảy đến phần tương ứng trong audio.</Text>
            </div>

            {showResults && (
              <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f0f8ff', borderRadius: '6px' }}>
                <Text strong>
                  Kết quả: {calculateScore()}% ({Object.values(userAnswers).filter((answer, index) => answer === selectedLesson.questions[index].correct).length}/{selectedLesson.questions.length} câu đúng)
                </Text>
              </div>
            )}

            <Space direction="vertical" style={{ width: '100%' }}>
              {selectedLesson.questions.map((question, index) => (
                <Card 
                  key={index} 
                  size="small"
                  title={
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Câu {index + 1}</span>
                      <Button 
                        size="small" 
                        type="link"
                        onClick={() => jumpToTime(question.timeStart)}
                      >
                        {formatTime(question.timeStart)}
                      </Button>
                    </div>
                  }
                  style={{ 
                    border: showResults ? 
                      (userAnswers[index] === question.correct ? '2px solid #52c41a' : '2px solid #ff4d4f') : 
                      undefined 
                  }}
                >
                  <p><strong>{question.question}</strong></p>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {question.options.map((option, optionIndex) => (
                      <Button
                        key={optionIndex}
                        type={userAnswers[index] === optionIndex ? 'primary' : 'default'}
                        block
                        onClick={() => !showResults && handleAnswerSelect(index, optionIndex)}
                        disabled={showResults}
                        style={{
                          textAlign: 'left',
                          backgroundColor: showResults ? 
                            (optionIndex === question.correct ? '#f6ffed' : 
                             userAnswers[index] === optionIndex && optionIndex !== question.correct ? '#fff2f0' : undefined) :
                            undefined,
                          borderColor: showResults ?
                            (optionIndex === question.correct ? '#52c41a' :
                             userAnswers[index] === optionIndex && optionIndex !== question.correct ? '#ff4d4f' : undefined) :
                            undefined
                        }}
                      >
                        {String.fromCharCode(65 + optionIndex)}. {option}
                        {showResults && optionIndex === question.correct && (
                          <CheckCircleOutlined style={{ color: '#52c41a', marginLeft: '8px' }} />
                        )}
                      </Button>
                    ))}
                  </Space>
                </Card>
              ))}
            </Space>

            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              {!showResults ? (
                <Button 
                  type="primary" 
                  size="large"
                  onClick={handleSubmitAnswers}
                  disabled={Object.keys(userAnswers).length !== selectedLesson.questions.length}
                >
                  Nộp bài ({Object.keys(userAnswers).length}/{selectedLesson.questions.length})
                </Button>
              ) : (
                <Button 
                  type="primary" 
                  size="large"
                  icon={<ReloadOutlined />}
                  onClick={() => {
                    setUserAnswers({});
                    setShowResults(false);
                  }}
                >
                  Làm lại
                </Button>
              )}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Hướng dẫn" size="small">
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Text strong>📝 Cách làm bài:</Text>
                <ol style={{ paddingLeft: '20px', margin: '8px 0' }}>
                  <li>Nghe audio từ đầu đến cuối</li>
                  <li>Trả lời các câu hỏi</li>
                  <li>Có thể nghe lại nhiều lần</li>
                  <li>Click thời gian để nhảy đến phần cụ thể</li>
                </ol>
              </div>
              
              <div>
                <Text strong>🎧 Các tính năng:</Text>
                <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                  <li>Điều chỉnh âm lượng</li>
                  <li>Thay đổi tốc độ phát</li>
                  <li>Xem bản ghi âm</li>
                  <li>Nhảy đến thời điểm cụ thể</li>
                </ul>
              </div>

              <div>
                <Text strong>💡 Mẹo học tập:</Text>
                <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                  <li>Nghe mà không xem script trước</li>
                  <li>Nghe chậm nếu cần thiết</li>
                  <li>Ghi chú từ khóa quan trọng</li>
                  <li>Lặp lại nhiều lần</li>
                </ul>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );

  return (
    <div>
      {selectedLesson ? renderLessonDetail() : renderLessonList()}
    </div>
  );
};

// Sidebar content for listening page
ListeningPage.sidebarContent = (
  <div>
    <Title level={4}>Thống kê luyện nghe</Title>
    
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span>Tổng bài đã học:</span>
        <strong>2/4 bài</strong>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span>Câu hỏi đúng:</span>
        <strong>85%</strong>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span>Thời gian nghe:</span>
        <strong>45 phút</strong>
      </div>
    </div>

    <Divider />

    <Title level={5}>Trình độ nghe</Title>
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span>Cơ bản:</span>
        <Tag color="green">Hoàn thành</Tag>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span>Trung bình:</span>
        <Tag color="blue">Đang học</Tag>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span>Nâng cao:</span>
        <Tag color="orange">Chưa bắt đầu</Tag>
      </div>
    </div>

    <Divider />

    <div style={{ padding: '16px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
      <Title level={5}>Mục tiêu tuần</Title>
      <p>Hoàn thành 3 bài nghe</p>
      <Progress percent={67} size="small" />
      <p style={{ fontSize: '12px', margin: '4px 0 0 0' }}>2/3 bài (67%)</p>
    </div>
  </div>
);

export default ListeningPage;

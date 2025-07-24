import React, { useState } from 'react';
import { Card, List, Button, Tag, Progress, Typography, Space, Divider, Row, Col } from 'antd';
import { BookOutlined, PlayCircleOutlined, EditOutlined, CheckCircleOutlined, ArrowLeftOutlined, QuestionCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const GrammarPage = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const grammarLessons = [
    {
      id: 1,
      title: 'Thì hiện tại đơn (Present Simple)',
      description: 'Học cách sử dụng thì hiện tại đơn trong giao tiếp hàng ngày',
      level: 'Cơ bản',
      color: 'green',
      completed: true,
      exercises: 15,
      completedExercises: 15,
      image: '📝',
      content: {
        theory: `
**Thì hiện tại đơn (Present Simple)**

**Cấu trúc:**
- Khẳng định: S + V(s/es) + O
- Phủ định: S + don't/doesn't + V + O  
- Nghi vấn: Do/Does + S + V + O?

**Cách dùng:**
1. Diễn tả thói quen, hành động lặp đi lặp lại
2. Chân lý, sự thật hiển nhiên
3. Lịch trình, thời gian biểu

**Ví dụ:**
- I go to school every day. (Tôi đi học hàng ngày)
- The sun rises in the east. (Mặt trời mọc ở phía đông)
- The train leaves at 8 AM. (Tàu khởi hành lúc 8 giờ sáng)
        `,
        exercises: [
          {
            question: "She _____ to work by bus every morning.",
            options: ["go", "goes", "going", "went"],
            correct: 1,
            explanation: "Với chủ ngữ số ít 'She', động từ phải thêm 's/es'"
          },
          {
            question: "_____ you like coffee?",
            options: ["Do", "Does", "Are", "Is"],
            correct: 0,
            explanation: "Với chủ ngữ 'you', sử dụng 'Do' trong câu hỏi"
          },
          {
            question: "The earth _____ around the sun.",
            options: ["move", "moves", "moving", "moved"],
            correct: 1,
            explanation: "Đây là chân lý, sự thật hiển nhiên, dùng thì hiện tại đơn"
          }
        ]
      }
    },
    {
      id: 2,
      title: 'Thì hiện tại tiếp diễn (Present Continuous)',
      description: 'Học cách diễn tả hành động đang diễn ra tại thời điểm nói',
      level: 'Cơ bản',
      color: 'green',
      completed: false,
      exercises: 12,
      completedExercises: 8,
      image: '⏰',
      content: {
        theory: `
**Thì hiện tại tiếp diễn (Present Continuous)**

**Cấu trúc:**
- Khẳng định: S + am/is/are + V-ing + O
- Phủ định: S + am/is/are + not + V-ing + O
- Nghi vấn: Am/Is/Are + S + V-ing + O?

**Cách dùng:**
1. Hành động đang diễn ra tại thời điểm nói
2. Hành động xảy ra trong khoảng thời gian hiện tại
3. Kế hoạch trong tương lai gần

**Ví dụ:**
- I am studying English now. (Tôi đang học tiếng Anh bây giờ)
- She is working on a project this week. (Cô ấy đang làm dự án tuần này)
- We are meeting tomorrow. (Chúng tôi sẽ gặp nhau ngày mai)
        `,
        exercises: [
          {
            question: "Look! The children _____ in the garden.",
            options: ["play", "plays", "are playing", "played"],
            correct: 2,
            explanation: "Dùng thì hiện tại tiếp diễn với 'Look!' để chỉ hành động đang xảy ra"
          },
          {
            question: "I _____ my homework right now.",
            options: ["do", "does", "am doing", "did"],
            correct: 2,
            explanation: "Với 'right now', sử dụng thì hiện tại tiếp diễn"
          }
        ]
      }
    },
    {
      id: 3,
      title: 'Thì quá khứ đơn (Past Simple)',
      description: 'Học cách diễn tả hành động đã xảy ra và kết thúc trong quá khứ',
      level: 'Trung bình',
      color: 'blue',
      completed: false,
      exercises: 18,
      completedExercises: 5,
      image: '📅',
      content: {
        theory: `
**Thì quá khứ đơn (Past Simple)**

**Cấu trúc:**
- Khẳng định: S + V2/V-ed + O
- Phủ định: S + didn't + V + O
- Nghi vấn: Did + S + V + O?

**Cách dùng:**
1. Hành động đã xảy ra và hoàn thành trong quá khứ
2. Chuỗi hành động liên tiếp trong quá khứ
3. Thói quen trong quá khứ

**Ví dụ:**
- I visited London last year. (Tôi đã đến London năm ngoái)
- She didn't come to the party. (Cô ấy đã không đến bữa tiệc)
- Did you see the movie? (Bạn đã xem bộ phim chưa?)
        `,
        exercises: [
          {
            question: "She _____ to Paris last summer.",
            options: ["go", "goes", "went", "going"],
            correct: 2,
            explanation: "Với 'last summer', sử dụng thì quá khứ đơn"
          },
          {
            question: "_____ you finish your homework yesterday?",
            options: ["Do", "Does", "Did", "Are"],
            correct: 2,
            explanation: "Câu hỏi ở thì quá khứ đơn dùng 'Did'"
          }
        ]
      }
    },
    {
      id: 4,
      title: 'Modal Verbs (Động từ khuyết thiếu)',
      description: 'Học cách sử dụng can, could, may, might, must, should',
      level: 'Trung bình',
      color: 'blue',
      completed: false,
      exercises: 20,
      completedExercises: 0,
      image: '🔀',
      content: {
        theory: `
**Modal Verbs (Động từ khuyết thiếu)**

**Các động từ khuyết thiếu:**
- Can/Could: khả năng, xin phép
- May/Might: khả năng, xin phép (lịch sự hơn)
- Must: bắt buộc, chắc chắn
- Should: nên, khuyên bảo
- Will/Would: tương lai, lịch sự

**Cấu trúc:** S + Modal + V + O

**Ví dụ:**
- I can speak English. (Tôi có thể nói tiếng Anh)
- You should study harder. (Bạn nên học chăm chỉ hơn)
- It must be true. (Điều đó chắc chắn đúng)
        `,
        exercises: [
          {
            question: "You _____ wear a helmet when riding a motorcycle.",
            options: ["can", "could", "must", "might"],
            correct: 2,
            explanation: "'Must' diễn tả sự bắt buộc"
          },
          {
            question: "_____ you help me with this problem?",
            options: ["Can", "Must", "Should", "Might"],
            correct: 0,
            explanation: "'Can' được dùng để xin giúp đỡ"
          }
        ]
      }
    },
    {
      id: 5,
      title: 'Câu điều kiện (Conditional Sentences)',
      description: 'Học các loại câu điều kiện trong tiếng Anh',
      level: 'Nâng cao',
      color: 'orange',
      completed: false,
      exercises: 25,
      completedExercises: 0,
      image: '🔄',
      content: {
        theory: `
**Câu điều kiện (Conditional Sentences)**

**Loại 0:** If + Simple Present, Simple Present
- Chân lý, sự thật hiển nhiên
- Ví dụ: If you heat water, it boils.

**Loại 1:** If + Simple Present, Simple Future
- Điều kiện có thể xảy ra ở hiện tại/tương lai
- Ví dụ: If it rains, I will stay home.

**Loại 2:** If + Simple Past, would + V
- Điều kiện không có thật ở hiện tại
- Ví dụ: If I were rich, I would travel the world.

**Loại 3:** If + Past Perfect, would have + V3
- Điều kiện không có thật trong quá khứ
- Ví dụ: If I had studied harder, I would have passed the exam.
        `,
        exercises: [
          {
            question: "If it _____ tomorrow, we will cancel the picnic.",
            options: ["rain", "rains", "rained", "will rain"],
            correct: 1,
            explanation: "Câu điều kiện loại 1: If + Simple Present, Simple Future"
          },
          {
            question: "If I _____ you, I would apologize.",
            options: ["am", "was", "were", "will be"],
            correct: 2,
            explanation: "Câu điều kiện loại 2: dùng 'were' cho tất cả các ngôi"
          }
        ]
      }
    }
  ];

  const handleLessonSelect = (lesson) => {
    setSelectedLesson(lesson);
    setUserAnswers({});
    setShowResults(false);
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleSubmitExercises = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    if (!selectedLesson) return 0;
    const exercises = selectedLesson.content.exercises;
    let correct = 0;
    exercises.forEach((exercise, index) => {
      if (userAnswers[index] === exercise.correct) {
        correct++;
      }
    });
    return Math.round((correct / exercises.length) * 100);
  };

  const renderLessonList = () => (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>
          <BookOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
          Học ngữ pháp
        </Title>
        <p>Nắm vững các quy tắc ngữ pháp tiếng Anh cơ bản đến nâng cao</p>
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
        dataSource={grammarLessons}
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
                    Bắt đầu học
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
                        {lesson.completedExercises}/{lesson.exercises} bài tập
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
      </div>

      <Row gutter={24}>
        <Col xs={24} lg={12}>
          <Card title="Lý thuyết" style={{ marginBottom: '24px' }}>
            <div style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}>
              {selectedLesson.content.theory}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card 
            title={`Bài tập (${selectedLesson.content.exercises.length} câu)`}
            extra={
              !showResults && (
                <Button 
                  type="primary" 
                  onClick={handleSubmitExercises}
                  disabled={Object.keys(userAnswers).length !== selectedLesson.content.exercises.length}
                >
                  Nộp bài
                </Button>
              )
            }
          >
            {showResults && (
              <div style={{ marginBottom: '16px', padding: '12px', backgroundColor: '#f0f8ff', borderRadius: '6px' }}>
                <Text strong>Kết quả: {calculateScore()}% ({Object.values(userAnswers).filter((answer, index) => answer === selectedLesson.content.exercises[index].correct).length}/{selectedLesson.content.exercises.length} câu đúng)</Text>
              </div>
            )}

            <Space direction="vertical" style={{ width: '100%' }}>
              {selectedLesson.content.exercises.map((exercise, index) => (
                <Card 
                  key={index} 
                  size="small" 
                  title={`Câu ${index + 1}`}
                  style={{ 
                    border: showResults ? 
                      (userAnswers[index] === exercise.correct ? '2px solid #52c41a' : '2px solid #ff4d4f') : 
                      undefined 
                  }}
                >
                  <p><strong>{exercise.question}</strong></p>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    {exercise.options.map((option, optionIndex) => (
                      <Button
                        key={optionIndex}
                        type={userAnswers[index] === optionIndex ? 'primary' : 'default'}
                        block
                        onClick={() => !showResults && handleAnswerSelect(index, optionIndex)}
                        disabled={showResults}
                        style={{
                          textAlign: 'left',
                          backgroundColor: showResults ? 
                            (optionIndex === exercise.correct ? '#f6ffed' : 
                             userAnswers[index] === optionIndex && optionIndex !== exercise.correct ? '#fff2f0' : undefined) :
                            undefined,
                          borderColor: showResults ?
                            (optionIndex === exercise.correct ? '#52c41a' :
                             userAnswers[index] === optionIndex && optionIndex !== exercise.correct ? '#ff4d4f' : undefined) :
                            undefined
                        }}
                      >
                        {String.fromCharCode(65 + optionIndex)}. {option}
                        {showResults && optionIndex === exercise.correct && (
                          <CheckCircleOutlined style={{ color: '#52c41a', marginLeft: '8px' }} />
                        )}
                      </Button>
                    ))}
                  </Space>
                  {showResults && (
                    <div style={{ marginTop: '12px', padding: '8px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                      <Text type="secondary">
                        <QuestionCircleOutlined /> {exercise.explanation}
                      </Text>
                    </div>
                  )}
                </Card>
              ))}
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

// Sidebar content for grammar page
GrammarPage.sidebarContent = (
  <div>
    <Title level={4}>Thống kê ngữ pháp</Title>
    
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span>Tổng bài đã học:</span>
        <strong>1/6 bài</strong>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span>Bài tập đúng:</span>
        <strong>92%</strong>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span>Chuỗi học liên tiếp:</span>
        <strong>5 ngày</strong>
      </div>
    </div>

    <Divider />

    <Title level={5}>Trình độ ngữ pháp</Title>
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
      <p>Hoàn thành 3 chủ đề ngữ pháp</p>
      <Progress percent={33} size="small" />
      <p style={{ fontSize: '12px', margin: '4px 0 0 0' }}>1/3 chủ đề (33%)</p>
    </div>
  </div>
);

export default GrammarPage;

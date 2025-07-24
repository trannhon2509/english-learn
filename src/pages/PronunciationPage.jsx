import React, { useState, useRef, useEffect } from 'react';
import { Card, List, Button, Tag, Progress, Typography, Space, Row, Col, message, Modal, Divider } from 'antd';
import { PlayCircleOutlined, AudioOutlined, ArrowLeftOutlined, CheckCircleOutlined, ReloadOutlined, SoundOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

const PronunciationPage = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userRecordings, setUserRecordings] = useState({});
  const [practiceScores, setPracticeScores] = useState({});
  const [showIPA, setShowIPA] = useState(true);
  const audioRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordingChunksRef = useRef([]);

  const pronunciationLessons = [
    {
      id: 1,
      title: 'Nguyên âm cơ bản (Basic Vowels)',
      description: 'Học phát âm các nguyên âm tiếng Anh chuẩn',
      level: 'Cơ bản',
      color: 'green',
      completed: true,
      totalWords: 20,
      practiceWords: 20,
      image: '🗣️',
      words: [
        {
          word: 'cat',
          ipa: '/kæt/',
          meaning: 'con mèo',
          audioUrl: '/audio/pronunciation/cat.mp3',
          tips: 'Âm /æ/ được phát âm bằng cách mở miệng rộng, lưỡi ở vị trí thấp',
          phoneticFocus: '/æ/'
        },
        {
          word: 'bit',
          ipa: '/bɪt/',
          meaning: 'cắn',
          audioUrl: '/audio/pronunciation/bit.mp3',
          tips: 'Âm /ɪ/ ngắn và nhanh, lưỡi hơi nâng lên',
          phoneticFocus: '/ɪ/'
        },
        {
          word: 'bet',
          ipa: '/bet/',
          meaning: 'đặt cược',
          audioUrl: '/audio/pronunciation/bet.mp3',
          tips: 'Âm /e/ là âm trung bình, không quá mở không quá đóng',
          phoneticFocus: '/e/'
        },
        {
          word: 'but',
          ipa: '/bʌt/',
          meaning: 'nhưng',
          audioUrl: '/audio/pronunciation/but.mp3',
          tips: 'Âm /ʌ/ được phát âm ở giữa miệng, lưỡi thả lỏng',
          phoneticFocus: '/ʌ/'
        },
        {
          word: 'boot',
          ipa: '/buːt/',
          meaning: 'ủng, khởi động',
          audioUrl: '/audio/pronunciation/boot.mp3',
          tips: 'Âm /uː/ dài và tròn, môi thu tròn lại',
          phoneticFocus: '/uː/'
        }
      ]
    },
    {
      id: 2,
      title: 'Phụ âm khó (Difficult Consonants)',
      description: 'Luyện tập các phụ âm thường gây khó khăn cho người Việt',
      level: 'Trung bình',
      color: 'blue',
      completed: false,
      totalWords: 25,
      practiceWords: 10,
      image: '👄',
      words: [
        {
          word: 'think',
          ipa: '/θɪŋk/',
          meaning: 'nghĩ',
          audioUrl: '/audio/pronunciation/think.mp3',
          tips: 'Đặt lưỡi giữa răng, thổi nhẹ để tạo âm /θ/',
          phoneticFocus: '/θ/'
        },
        {
          word: 'this',
          ipa: '/ðɪs/',
          meaning: 'cái này',
          audioUrl: '/audio/pronunciation/this.mp3',
          tips: 'Tương tự /θ/ nhưng có rung thanh quản',
          phoneticFocus: '/ð/'
        },
        {
          word: 'ship',
          ipa: '/ʃɪp/',
          meaning: 'con tàu',
          audioUrl: '/audio/pronunciation/ship.mp3',
          tips: 'Môi hơi chu ra, lưỡi cong lên để tạo âm /ʃ/',
          phoneticFocus: '/ʃ/'
        },
        {
          word: 'chip',
          ipa: '/tʃɪp/',
          meaning: 'mảnh vụn',
          audioUrl: '/audio/pronunciation/chip.mp3',
          tips: 'Âm /tʃ/ là kết hợp của /t/ và /ʃ/',
          phoneticFocus: '/tʃ/'
        },
        {
          word: 'very',
          ipa: '/ˈveri/',
          meaning: 'rất',
          audioUrl: '/audio/pronunciation/very.mp3',
          tips: 'Răng trên chạm vào môi dưới, rung thanh quản',
          phoneticFocus: '/v/'
        }
      ]
    },
    {
      id: 3,
      title: 'Nguyên âm đôi (Diphthongs)',
      description: 'Thực hành các nguyên âm đôi trong tiếng Anh',
      level: 'Trung bình',
      color: 'blue',
      completed: false,
      totalWords: 18,
      practiceWords: 5,
      image: '🔄',
      words: [
        {
          word: 'time',
          ipa: '/taɪm/',
          meaning: 'thời gian',
          audioUrl: '/audio/pronunciation/time.mp3',
          tips: 'Bắt đầu với /a/, trượt lên /ɪ/',
          phoneticFocus: '/aɪ/'
        },
        {
          word: 'house',
          ipa: '/haʊs/',
          meaning: 'ngôi nhà',
          audioUrl: '/audio/pronunciation/house.mp3',
          tips: 'Từ /a/ trượt đến /ʊ/, môi tròn dần',
          phoneticFocus: '/aʊ/'
        },
        {
          word: 'boy',
          ipa: '/bɔɪ/',
          meaning: 'cậu bé',
          audioUrl: '/audio/pronunciation/boy.mp3',
          tips: 'Từ /ɔ/ mở trượt lên /ɪ/',
          phoneticFocus: '/ɔɪ/'
        },
        {
          word: 'make',
          ipa: '/meɪk/',
          meaning: 'làm',
          audioUrl: '/audio/pronunciation/make.mp3',
          tips: 'Từ /e/ trượt lên /ɪ/, không quá dài',
          phoneticFocus: '/eɪ/'
        },
        {
          word: 'go',
          ipa: '/goʊ/',
          meaning: 'đi',
          audioUrl: '/audio/pronunciation/go.mp3',
          tips: 'Từ /o/ trượt đến /ʊ/, môi tròn',
          phoneticFocus: '/oʊ/'
        }
      ]
    },
    {
      id: 4,
      title: 'Trọng âm và nhịp điệu',
      description: 'Luyện tập trọng âm từ và nhịp điệu câu',
      level: 'Nâng cao',
      color: 'orange',
      completed: false,
      totalWords: 30,
      practiceWords: 0,
      image: '🎵',
      words: [
        {
          word: 'photograph',
          ipa: '/ˈfoʊtəɡræf/',
          meaning: 'bức ảnh',
          audioUrl: '/audio/pronunciation/photograph.mp3',
          tips: 'Trọng âm rơi vào âm tiết đầu: PHO-to-graph',
          phoneticFocus: 'stress pattern'
        },
        {
          word: 'photography',
          ipa: '/fəˈtɑɡrəfi/',
          meaning: 'nhiếp ảnh',
          audioUrl: '/audio/pronunciation/photography.mp3',
          tips: 'Trọng âm rơi vào âm tiết thứ hai: pho-TO-gra-phy',
          phoneticFocus: 'stress pattern'
        },
        {
          word: 'photographer',
          ipa: '/fəˈtɑɡrəfər/',
          meaning: 'nhiếp ảnh gia',
          audioUrl: '/audio/pronunciation/photographer.mp3',
          tips: 'Trọng âm rơi vào âm tiết thứ hai: pho-TO-gra-pher',
          phoneticFocus: 'stress pattern'
        },
        {
          word: 'university',
          ipa: '/ˌjunɪˈvɜrsɪti/',
          meaning: 'đại học',
          audioUrl: '/audio/pronunciation/university.mp3',
          tips: 'Trọng âm chính ở âm tiết thứ tư: u-ni-ver-SI-ty',
          phoneticFocus: 'stress pattern'
        }
      ]
    },
    {
      id: 5,
      title: 'Âm cuối khó phát âm',
      description: 'Luyện tập các âm cuối thường bị nuốt hoặc phát âm sai',
      level: 'Nâng cao',
      color: 'orange',
      completed: false,
      totalWords: 22,
      practiceWords: 0,
      image: '🔚',
      words: [
        {
          word: 'walked',
          ipa: '/wɔkt/',
          meaning: 'đã đi bộ',
          audioUrl: '/audio/pronunciation/walked.mp3',
          tips: 'Âm cuối /t/ phải được phát âm rõ ràng',
          phoneticFocus: 'final /t/'
        },
        {
          word: 'lived',
          ipa: '/lɪvd/',
          meaning: 'đã sống',
          audioUrl: '/audio/pronunciation/lived.mp3',
          tips: 'Âm cuối /d/ không được nuốt',
          phoneticFocus: 'final /d/'
        },
        {
          word: 'lengths',
          ipa: '/leŋθs/',
          meaning: 'độ dài',
          audioUrl: '/audio/pronunciation/lengths.mp3',
          tips: 'Chuỗi phụ âm /ŋθs/ cần được phát âm đầy đủ',
          phoneticFocus: 'consonant clusters'
        },
        {
          word: 'sixth',
          ipa: '/sɪksθ/',
          meaning: 'thứ sáu',
          audioUrl: '/audio/pronunciation/sixth.mp3',
          tips: 'Chuỗi /ksθ/ rất khó, cần luyện tập từ từ',
          phoneticFocus: 'consonant clusters'
        }
      ]
    }
  ];

  useEffect(() => {
    // Initialize Web Audio API for recording
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => {
        console.log('Microphone access granted');
      })
      .catch((err) => {
        console.error('Error accessing microphone:', err);
        message.error('Không thể truy cập microphone. Hãy cho phép quyền ghi âm để sử dụng tính năng này.');
      });
  }, []);

  const handleLessonSelect = (lesson) => {
    setSelectedLesson(lesson);
    setCurrentWordIndex(0);
    setUserRecordings({});
    setPracticeScores({});
  };

  const playAudio = (audioUrl) => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error('Error playing audio:', err);
          message.info('Audio demo không khả dụng. Bạn vẫn có thể luyện tập phát âm.');
        });
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      recordingChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        recordingChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordingChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(blob);
        
        setUserRecordings(prev => ({
          ...prev,
          [currentWordIndex]: audioUrl
        }));

        // Simulate pronunciation scoring (in real app, this would use speech recognition)
        const randomScore = Math.floor(Math.random() * 30) + 70; // 70-100%
        setPracticeScores(prev => ({
          ...prev,
          [currentWordIndex]: randomScore
        }));

        message.success(`Đã ghi âm xong! Điểm số: ${randomScore}%`);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      message.info('Đang ghi âm... Hãy phát âm từ này!');
    } catch (err) {
      console.error('Error starting recording:', err);
      message.error('Không thể bắt đầu ghi âm. Hãy kiểm tra quyền microphone.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop all tracks to release microphone
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const playUserRecording = (audioUrl) => {
    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.play();
    }
  };

  const nextWord = () => {
    if (currentWordIndex < selectedLesson.words.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };

  const prevWord = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return '#52c41a';
    if (score >= 80) return '#faad14';
    if (score >= 70) return '#fa8c16';
    return '#ff4d4f';
  };

  const renderLessonList = () => (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>
          <AudioOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
          Học phát âm
        </Title>
        <p>Luyện phát âm chuẩn xác với hệ thống nhận diện giọng nói</p>
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
        dataSource={pronunciationLessons}
        renderItem={lesson => {
          const progress = Math.round((lesson.practiceWords / lesson.totalWords) * 100);
          
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
                    icon={<AudioOutlined />}
                    onClick={() => handleLessonSelect(lesson)}
                    block
                  >
                    Bắt đầu luyện
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
                        {lesson.practiceWords}/{lesson.totalWords} từ
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

  const renderLessonDetail = () => {
    const currentWord = selectedLesson.words[currentWordIndex];
    const hasRecording = userRecordings[currentWordIndex];
    const score = practiceScores[currentWordIndex];

    return (
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
          <Text style={{ marginLeft: '8px' }}>
            • Từ {currentWordIndex + 1}/{selectedLesson.words.length}
          </Text>
        </div>

        <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />

        <Row gutter={24}>
          <Col xs={24} lg={16}>
            <Card title="Luyện phát âm" style={{ marginBottom: '24px' }}>
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>
                  {currentWord.word}
                </div>
                
                {showIPA && (
                  <div style={{ fontSize: '24px', color: '#1890ff', marginBottom: '8px' }}>
                    {currentWord.ipa}
                  </div>
                )}
                
                <div style={{ fontSize: '16px', color: '#666', marginBottom: '24px' }}>
                  {currentWord.meaning}
                </div>

                <Space size="large">
                  <Button
                    type="primary"
                    icon={<SoundOutlined />}
                    onClick={() => playAudio(currentWord.audioUrl)}
                    loading={isPlaying}
                    size="large"
                  >
                    Nghe mẫu
                  </Button>

                  <Button
                    type={isRecording ? 'danger' : 'default'}
                    icon={<AudioOutlined />}
                    onClick={isRecording ? stopRecording : startRecording}
                    size="large"
                    loading={isRecording}
                  >
                    {isRecording ? 'Dừng ghi âm' : 'Ghi âm'}
                  </Button>

                  {hasRecording && (
                    <Button
                      icon={<PlayCircleOutlined />}
                      onClick={() => playUserRecording(hasRecording)}
                      size="large"
                    >
                      Nghe lại
                    </Button>
                  )}
                </Space>

                {score && (
                  <div style={{ 
                    marginTop: '24px', 
                    padding: '16px', 
                    backgroundColor: '#f9f9f9', 
                    borderRadius: '8px',
                    border: `2px solid ${getScoreColor(score)}`
                  }}>
                    <div style={{ fontSize: '20px', fontWeight: 'bold', color: getScoreColor(score) }}>
                      Điểm số: {score}%
                    </div>
                    <div style={{ marginTop: '8px' }}>
                      {score >= 90 ? '🎉 Xuất sắc!' : 
                       score >= 80 ? '👍 Tốt lắm!' : 
                       score >= 70 ? '✌️ Khá ổn!' : '💪 Cần cố gắng thêm!'}
                    </div>
                  </div>
                )}
              </div>

              <Divider />

              <div style={{ marginBottom: '24px' }}>
                <Title level={4}>💡 Mẹo phát âm</Title>
                <Paragraph style={{ fontSize: '16px', lineHeight: '1.6' }}>
                  <strong>Âm trọng tâm:</strong> {currentWord.phoneticFocus}
                  <br />
                  <strong>Hướng dẫn:</strong> {currentWord.tips}
                </Paragraph>
              </div>

              <div style={{ textAlign: 'center' }}>
                <Space size="large">
                  <Button 
                    onClick={prevWord}
                    disabled={currentWordIndex === 0}
                    size="large"
                  >
                    ← Từ trước
                  </Button>
                  
                  <Button
                    icon={<ReloadOutlined />}
                    onClick={() => {
                      if (userRecordings[currentWordIndex]) {
                        const url = userRecordings[currentWordIndex];
                        URL.revokeObjectURL(url);
                      }
                      setUserRecordings(prev => {
                        const newRecordings = { ...prev };
                        delete newRecordings[currentWordIndex];
                        return newRecordings;
                      });
                      setPracticeScores(prev => {
                        const newScores = { ...prev };
                        delete newScores[currentWordIndex];
                        return newScores;
                      });
                    }}
                  >
                    Luyện lại
                  </Button>

                  <Button 
                    onClick={nextWord}
                    disabled={currentWordIndex === selectedLesson.words.length - 1}
                    size="large"
                  >
                    Từ tiếp →
                  </Button>
                </Space>
              </div>
            </Card>

            <Card title="Tiến độ bài học">
              <Progress 
                percent={Math.round(((currentWordIndex + 1) / selectedLesson.words.length) * 100)}
                status="active"
                strokeColor="#52c41a"
              />
              <div style={{ marginTop: '16px' }}>
                <Row gutter={8}>
                  {selectedLesson.words.map((word, index) => (
                    <Col key={index} style={{ marginBottom: '8px' }}>
                      <Button
                        type={index === currentWordIndex ? 'primary' : 'default'}
                        size="small"
                        onClick={() => setCurrentWordIndex(index)}
                        style={{
                          backgroundColor: practiceScores[index] ? getScoreColor(practiceScores[index]) : undefined,
                          borderColor: practiceScores[index] ? getScoreColor(practiceScores[index]) : undefined,
                          color: practiceScores[index] ? '#fff' : undefined
                        }}
                      >
                        {word.word}
                        {practiceScores[index] && (
                          <span style={{ marginLeft: '4px', fontSize: '12px' }}>
                            {practiceScores[index]}%
                          </span>
                        )}
                      </Button>
                    </Col>
                  ))}
                </Row>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="Hướng dẫn" size="small" style={{ marginBottom: '16px' }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <Text strong>🎯 Cách luyện tập:</Text>
                  <ol style={{ paddingLeft: '20px', margin: '8px 0' }}>
                    <li>Nghe mẫu chuẩn nhiều lần</li>
                    <li>Chú ý vào ký hiệu IPA</li>
                    <li>Đọc mẹo phát âm</li>
                    <li>Ghi âm giọng nói của bạn</li>
                    <li>So sánh và cải thiện</li>
                  </ol>
                </div>

                <div>
                  <Text strong>📊 Thang điểm:</Text>
                  <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                    <li>90-100%: Xuất sắc 🎉</li>
                    <li>80-89%: Tốt 👍</li>
                    <li>70-79%: Khá ✌️</li>
                    <li>Dưới 70%: Cần cải thiện 💪</li>
                  </ul>
                </div>

                <div>
                  <Button 
                    type={showIPA ? 'primary' : 'default'}
                    onClick={() => setShowIPA(!showIPA)}
                    block
                  >
                    {showIPA ? 'Ẩn IPA' : 'Hiện IPA'}
                  </Button>
                </div>
              </Space>
            </Card>

            <Card title="Từ khóa phiên âm" size="small">
              <Space direction="vertical" style={{ width: '100%', fontSize: '12px' }}>
                <Text strong>Ký hiệu IPA thường gặp:</Text>
                <div>
                  <Text code>/æ/</Text> - cat, hat, bag
                </div>
                <div>
                  <Text code>/ɪ/</Text> - sit, bit, hit
                </div>
                <div>
                  <Text code>/ə/</Text> - about, sofa (schwa)
                </div>
                <div>
                  <Text code>/θ/</Text> - think, thank
                </div>
                <div>
                  <Text code>/ð/</Text> - this, that
                </div>
                <div>
                  <Text code>/ʃ/</Text> - ship, fish
                </div>
                <div>
                  <Text code>/tʃ/</Text> - chair, match
                </div>
                <div>
                  <Text code>/aɪ/</Text> - time, like
                </div>
                <div>
                  <Text code>/aʊ/</Text> - house, now
                </div>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <div>
      {selectedLesson ? renderLessonDetail() : renderLessonList()}
    </div>
  );
};

// Sidebar content for pronunciation page
PronunciationPage.sidebarContent = (
  <div>
    <Title level={4}>Thống kê phát âm</Title>
    
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span>Tổng từ đã luyện:</span>
        <strong>20/60 từ</strong>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span>Điểm trung bình:</span>
        <strong>88%</strong>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <span>Từ phát âm tốt:</span>
        <strong>18/20 từ</strong>
      </div>
    </div>

    <Divider />

    <Title level={5}>Trình độ phát âm</Title>
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span>Nguyên âm:</span>
        <Tag color="green">Hoàn thành</Tag>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span>Phụ âm:</span>
        <Tag color="blue">Đang học</Tag>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span>Âm đôi:</span>
        <Tag color="orange">Chưa bắt đầu</Tag>
      </div>
    </div>

    <Divider />

    <div style={{ padding: '16px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
      <Title level={5}>Mục tiêu tuần</Title>
      <p>Luyện 30 từ mới</p>
      <Progress percent={67} size="small" />
      <p style={{ fontSize: '12px', margin: '4px 0 0 0' }}>20/30 từ (67%)</p>
    </div>
  </div>
);

export default PronunciationPage;

import React from 'react';
import { Card, Button, Typography } from 'antd';
import { SoundOutlined, AudioOutlined, PlayCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;

const PronunciationLessonCard = React.memo(({ lesson }) => (
  <Card
    hoverable
    style={{ height: '100%', borderRadius: '12px', border: '1px solid rgba(250, 84, 28, 0.1)' }}
    cover={
      <div style={{ padding: '30px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(250, 84, 28, 0.1), rgba(250, 173, 20, 0.1))' }}>
        <SoundOutlined style={{ fontSize: '48px', color: '#fa541c' }} />
      </div>
    }
    actions={[
      <Button 
        type="primary" 
        icon={lesson.completed ? <PlayCircleOutlined /> : <AudioOutlined />}
        style={{ width: '90%', background: 'linear-gradient(135deg, #fa541c, #faad14)', borderColor: 'transparent' }}
      >
        {lesson.completed ? 'Luyện lại' : 'Bắt đầu'}
      </Button>
    ]}
    key={lesson.id}
  >
    <Card.Meta
      title={
        <div>
          <div style={{ color: '#fa541c', marginBottom: '4px' }}>{lesson.title}</div>
          <div style={{ fontSize: '12px', color: '#666', fontWeight: 'normal' }}>{lesson.difficulty} • {lesson.words} từ</div>
        </div>
      }
      description={
        <div>
          <Paragraph style={{ color: '#666', fontSize: '14px', marginBottom: '16px', lineHeight: '1.5' }}>{lesson.description}</Paragraph>
          {lesson.completed ? (
            <div style={{ color: '#52c41a', fontSize: '12px' }}><CheckCircleOutlined /> Hoàn thành - {lesson.accuracy}% chính xác</div>
          ) : (
            <div style={{ color: '#faad14', fontSize: '12px' }}>Chưa hoàn thành</div>
          )}
        </div>
      }
    />
  </Card>
));

export default PronunciationLessonCard;

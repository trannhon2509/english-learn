import React from 'react';
import { Card, Button, Typography } from 'antd';
import { AudioOutlined, PlayCircleOutlined, TrophyOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;

const ListeningExerciseCard = React.memo(({ exercise }) => (
  <Card
    hoverable
    style={{ height: '100%', borderRadius: '12px', border: '1px solid rgba(114, 46, 209, 0.1)' }}
    cover={
      <div style={{ padding: '30px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(114, 46, 209, 0.1), rgba(24, 144, 255, 0.1))' }}>
        <AudioOutlined style={{ fontSize: '48px', color: '#722ed1' }} />
      </div>
    }
    actions={[
      <Button 
        type="primary" 
        icon={<PlayCircleOutlined />} 
        style={{ width: '90%', background: 'linear-gradient(135deg, #722ed1, #9254de)', borderColor: 'transparent' }}
      >
        {exercise.completed ? 'Luyện lại' : 'Bắt đầu'}
      </Button>
    ]}
    key={exercise.id}
  >
    <Card.Meta
      title={
        <div>
          <div style={{ color: '#722ed1', marginBottom: '4px' }}>{exercise.title}</div>
          <div style={{ fontSize: '12px', color: '#666', fontWeight: 'normal' }}>{exercise.level} • {exercise.duration}</div>
        </div>
      }
      description={
        <div>
          <Paragraph style={{ color: '#666', fontSize: '14px', marginBottom: '16px', lineHeight: '1.5' }}>{exercise.description}</Paragraph>
          {exercise.completed && (
            <div style={{ color: '#52c41a', fontSize: '12px' }}><TrophyOutlined /> Đã hoàn thành</div>
          )}
        </div>
      }
    />
  </Card>
));

export default ListeningExerciseCard;

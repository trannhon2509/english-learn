import React from 'react';
import { Card, Button } from 'antd';
import { BookOutlined, SoundOutlined, TrophyOutlined } from '@ant-design/icons';

const CARD_HEIGHT = 320;
const COVER_HEIGHT = 80;

const TopicCard = ({ topic }) => (
  <div style={{ padding: 12, height: CARD_HEIGHT }}>
    <Card
      hoverable
      style={{ borderRadius: 16, boxShadow: '0 2px 8px rgba(24,144,255,0.08)', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
      cover={
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, rgba(24, 144, 255, 0.1), rgba(114, 46, 209, 0.1))',
          borderRadius: '16px 16px 0 0',
          height: COVER_HEIGHT
        }}>
          <BookOutlined style={{ fontSize: 40, color: '#1890ff' }} />
        </div>
      }
      bodyStyle={{ padding: 16, height: CARD_HEIGHT - COVER_HEIGHT - 24, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
    >
      <div>
        <div style={{ color: '#1890ff', fontWeight: 600, fontSize: 18, marginBottom: 4 }}>{topic.title}</div>
        <div style={{ fontSize: 13, color: '#666', marginBottom: 8 }}>{topic.level} • {topic.lessons} bài học</div>
        <div style={{ color: '#666', fontSize: 14, marginBottom: 8 }}>{topic.description}</div>
        {topic.completed && (
          <div style={{ color: '#52c41a', fontSize: 13, marginBottom: 8 }}>
            <TrophyOutlined /> Đã hoàn thành
          </div>
        )}
      </div>
      <Button
        type={topic.completed ? 'default' : 'primary'}
        icon={<SoundOutlined />}
        style={{ width: '100%', marginTop: 8 }}
      >
        {topic.completed ? 'Ôn tập' : 'Bắt đầu học'}
      </Button>
    </Card>
  </div>
);

export default React.memo(TopicCard);

import React from 'react';
import { Button } from 'antd';
import { SoundOutlined, HeartOutlined, BookOutlined } from '@ant-design/icons';
import styles from '@css/VocabularyPage.module.css';

const VocabularyCard = React.memo(({ vocab, onPlayAudio }) => (
  <div className={styles.vocabularyCard}>
    <div className={styles.wordHeader}>
      <div>
        <div className={styles.word}>{vocab.word}</div>
        <div className={styles.pronunciation}>{vocab.pronunciation}</div>
      </div>
      <Button
        className={styles.playButton}
        icon={<SoundOutlined />}
        onClick={() => onPlayAudio(vocab.pronunciation)}
      />
    </div>
    <div className={styles.meaning}>{vocab.meaning}</div>
    <div className={styles.example}>
      <strong>Ví dụ:</strong> {vocab.example}
    </div>
    <div className={styles.cardActions}>
      <Button
        className={`${styles.actionButton} ${styles.learnButton}`}
        icon={<BookOutlined />}
      >
        {vocab.learned ? 'Ôn tập' : 'Học'}
      </Button>
      <Button
        className={`${styles.actionButton} ${styles.reviewButton}`}
        icon={<BookOutlined />}
      >
        Luyện tập
      </Button>
      <Button
        className={`${styles.actionButton} ${styles.favoriteButton}`}
        icon={<HeartOutlined />}
      >
        Yêu thích
      </Button>
    </div>
  </div>
));

export default VocabularyCard;

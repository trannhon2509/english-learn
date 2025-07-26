
import React, { useState } from 'react';
import styles from '../../assets/css/FlashCard.module.css';

const FlashCard = ({ vocab, onKnown, onStudy }) => {
  const [flipped, setFlipped] = useState(false);
  if (!vocab) return null;
  return (
    <div>
      <div className={styles.cardActions} style={{ justifyContent: 'center', marginBottom: 16 }}>
        <button
          className={styles.knownBtn}
          onClick={onKnown}
          style={{
            background: 'linear-gradient(90deg,#22c55e 60%,#bbf7d0 100%)',
            color: '#fff',
            borderRadius: 10,
            border: 'none',
            padding: '10px 22px',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span role="img" aria-label="known">✅</span> Đã biết
        </button>
        <button
          className={styles.studyBtn}
          onClick={onStudy}
          style={{
            background: 'linear-gradient(90deg,#3b82f6 60%,#bae6fd 100%)',
            color: '#fff',
            borderRadius: 10,
            border: 'none',
            padding: '10px 22px',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span role="img" aria-label="study">📚</span> Học từ này
        </button>
      </div>
      <div
        className={styles.flashCardContainer}
        onClick={() => setFlipped(f => !f)}
        style={{ cursor: 'pointer', maxWidth: 340, margin: '0 auto' }}
      >
        <div className={`${styles.flashCard} ${flipped ? styles.flipped : ''}`} style={{ fontFamily: 'Segoe UI, Arial, sans-serif' }}>
          {/* Front Face */}
          <div className={`${styles.flashCardFace} ${styles.front}`} style={{ fontSize: '2.2rem', letterSpacing: 1 }}>
            <div className={styles.word}>{vocab.word}</div>
          </div>
          {/* Back Face */}
          <div className={`${styles.flashCardFace} ${styles.back}`} style={{ fontSize: '1.1rem' }}>
            <div className={styles.word}>{vocab.word}</div>
            <div className={styles.meaning}>{vocab.meaning}</div>
            <div className={styles.example}><strong>Ví dụ:</strong> {vocab.example ? vocab.example : 'Chưa có ví dụ.'}</div>
            <div className={styles.pronunciation}><strong>Phát âm:</strong> {vocab.pronunciation ? vocab.pronunciation : 'Chưa có phát âm.'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashCard;

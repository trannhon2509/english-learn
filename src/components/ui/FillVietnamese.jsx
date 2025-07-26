
import React, { useState } from 'react';
import { Input, Button, Alert } from 'antd';
import styles from '../../assets/css/FillVietnamese.module.css';
import { getHint } from '../../utils/hintUtil';

const FillVietnamese = ({ vocab }) => {
  const [answer, setAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const isCorrect = answer.trim() === vocab.meaning;

  const handleInputChange = (e) => {
    setAnswer(e.target.value);
    setShowHint(false);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.word}>{vocab.word}</h2>
      <Input
        className={styles.input}
        placeholder="Nhập nghĩa tiếng Việt"
        value={answer}
        onChange={handleInputChange}
        style={{
          borderRadius: 8,
          border: '1.5px solid #1677ff',
          fontSize: '1.1rem',
          padding: '10px 14px',
          marginBottom: 16,
        }}
      />
      <div className={styles.buttonGroup}>
        <Button
          onClick={() => setShowResult(true)}
          type="primary"
          icon={<span role="img" aria-label="check">✔️</span>}
          style={{
            background: '#1677ff',
            borderRadius: 8,
            fontWeight: 600,
            padding: '8px 18px',
            border: 'none',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >Kiểm tra</Button>
        <Button
          onClick={() => setShowHint(true)}
          icon={<span role="img" aria-label="hint">💡</span>}
          style={{
            background: '#e6f7ff',
            color: '#1677ff',
            borderRadius: 8,
            fontWeight: 600,
            padding: '8px 18px',
            border: 'none',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >Gợi ý</Button>
      </div>
      {showResult && (
        <Alert
          className={styles.result}
          message={isCorrect ? '🎉 Chính xác!' : `❌ Sai. Đáp án: ${vocab.meaning}`}
          type={isCorrect ? 'success' : 'error'}
          style={{
            borderRadius: 8,
            fontSize: '1.1rem',
            marginTop: 18,
          }}
        />
      )}
      {showHint && !showResult && (
        <div className={styles.hint} style={{
          background: '#e6f7ff',
          color: '#1677ff',
          borderRadius: 8,
          fontSize: '1rem',
          padding: '10px 14px',
          marginTop: 10,
        }}>
          <strong>Gợi ý:</strong> {getHint(vocab.meaning)}
        </div>
      )}
    </div>
  );
};

export default FillVietnamese;

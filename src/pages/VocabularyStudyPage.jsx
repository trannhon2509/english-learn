import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Select, Button, Modal } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import styles from '@css/VocabularyPage.module.css';
import FlashCard from '@components/ui/FlashCard';
import FillVietnamese from '@components/ui/FillVietnamese';
import FillEnglish from '@components/ui/FillEnglish';

const displayOptions = [
  { label: 'Flash Card', value: 'flashcard' },
  { label: 'Điền nghĩa tiếng Việt', value: 'fillVietnamese' },
  { label: 'Điền nghĩa tiếng Anh', value: 'fillEnglish' },
];

const VocabularyStudyPage = () => {
  const studyVocabularies = useSelector(state => state.learning.studyVocabularies || []);
  const [displayTypes, setDisplayTypes] = useState(['flashcard']);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1 < studyVocabularies.length ? prev + 1 : prev));
  };
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleChangeType = (values) => {
    setDisplayTypes(values.length ? values : ['flashcard']);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentIndex(0);
  };

  const vocab = studyVocabularies[currentIndex];

  // Chọn ngẫu nhiên một type trong các lựa chọn đã chọn
  const randomType = displayTypes[Math.floor(Math.random() * displayTypes.length)];
  let DisplayComponent = null;
  if (randomType === 'flashcard') DisplayComponent = FlashCard;
  if (randomType === 'fillVietnamese') DisplayComponent = FillVietnamese;
  if (randomType === 'fillEnglish') DisplayComponent = FillEnglish;

  return (
    <div className={styles.vocabularyContainer}>
      <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'flex-end' }}>
        <Button type="text" icon={<SettingOutlined style={{ fontSize: '20px' }} />} onClick={handleOpenModal} />
        <Modal
          title="Cài đặt hiển thị từ vựng"
          open={isModalOpen}
          onOk={handleCloseModal}
          onCancel={handleCloseModal}
          okText="Xác nhận"
          cancelText="Đóng"
        >
          <div style={{ marginBottom: 16 }}>
            <span style={{ fontWeight: 500 }}>Chọn kiểu hiển thị:</span>
          </div>
          <Select
            mode="multiple"
            value={displayTypes}
            onChange={handleChangeType}
            options={displayOptions}
            style={{ width: '100%' }}
          />
        </Modal>
      </div>
      {studyVocabularies.length === 0 ? (
        <div>Không có từ vựng nào để học.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {DisplayComponent && vocab && <DisplayComponent vocab={vocab} type={randomType} />}
          <div style={{ marginTop: 16 }}>
            {currentIndex + 1} / {studyVocabularies.length}
          </div>
           <div style={{ marginBottom: 16 }}>
            <Button onClick={handlePrev} disabled={currentIndex === 0} style={{ marginRight: 8 }}>Trước</Button>
            <Button onClick={handleNext} disabled={currentIndex === studyVocabularies.length - 1}>Tiếp</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VocabularyStudyPage;

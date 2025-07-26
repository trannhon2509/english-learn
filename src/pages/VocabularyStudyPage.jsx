import { useSelector } from 'react-redux';
import styles from '@css/VocabularyPage.module.css';
import VocabularyCard from '@components/VocabularyCard';

const VocabularyStudyPage = () => {
    const studyVocabularies = useSelector(state => state.learning.studyVocabularies || []);

    return (
        <div className={styles.vocabularyContainer}>
            <h1 style={{ color: '#1890ff', marginBottom: 24 }}>Học từ vựng</h1>
            {studyVocabularies.length === 0 ? (
                <div>Không có từ vựng nào để học.</div>
            ) : (
                <div className={styles.setsContainer}>
                    {studyVocabularies.map(vocab => (
                        <VocabularyCard key={vocab.id} vocab={vocab} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default VocabularyStudyPage;

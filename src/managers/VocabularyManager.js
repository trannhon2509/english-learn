import { Vocabulary } from '../models/Vocabulary.js';
import { Word } from '../models/Word.js';

/**
 * VocabularyManager - Quản lý các kho từ vựng
 */
export class VocabularyManager {
  constructor() {
    this.vocabularies = new Map(); // Map để lưu trữ vocabularies theo ID
  }

  // Thêm kho từ vựng mới
  addVocabulary(vocabData) {
    const vocabulary = vocabData instanceof Vocabulary ? vocabData : new Vocabulary(vocabData);
    this.vocabularies.set(vocabulary.id, vocabulary);
    this.saveToStorage();
    return vocabulary;
  }

  // Cập nhật kho từ vựng
  updateVocabulary(vocabId, updates) {
    const vocabulary = this.vocabularies.get(vocabId);
    if (!vocabulary) {
      throw new Error(`Vocabulary with ID ${vocabId} not found`);
    }

    Object.assign(vocabulary, updates);
    vocabulary.touch();
    this.saveToStorage();
    return vocabulary;
  }

  // Xóa kho từ vựng
  deleteVocabulary(vocabId) {
    const deleted = this.vocabularies.delete(vocabId);
    if (deleted) {
      this.saveToStorage();
    }
    return deleted;
  }

  // Lấy kho từ vựng theo ID
  getVocabulary(vocabId) {
    return this.vocabularies.get(vocabId);
  }

  // Lấy tất cả kho từ vựng
  getAllVocabularies() {
    return Array.from(this.vocabularies.values());
  }

  // Tìm kiếm kho từ vựng
  searchVocabularies(query, filters = {}) {
    let vocabularies = this.getAllVocabularies();

    // Tìm kiếm theo từ khóa
    if (query) {
      const lowerQuery = query.toLowerCase();
      vocabularies = vocabularies.filter(vocab => 
        vocab.title.toLowerCase().includes(lowerQuery) ||
        vocab.description.toLowerCase().includes(lowerQuery)
      );
    }

    // Áp dụng bộ lọc
    if (filters.level) {
      vocabularies = vocabularies.filter(vocab => vocab.level === filters.level);
    }

    return vocabularies;
  }

  // Lọc theo level
  getVocabulariesByLevel(level) {
    return this.getAllVocabularies().filter(vocab => vocab.level === level);
  }

  // Thêm từ vào kho từ vựng
  addWordToVocabulary(vocabId, wordData) {
    const vocabulary = this.getVocabulary(vocabId);
    if (!vocabulary) {
      throw new Error(`Vocabulary with ID ${vocabId} not found`);
    }

    const word = wordData instanceof Word ? wordData : new Word(wordData);
    vocabulary.addWord(word);
    this.saveToStorage();
    return word;
  }

  // Xóa từ khỏi kho từ vựng
  removeWordFromVocabulary(vocabId, wordId) {
    const vocabulary = this.getVocabulary(vocabId);
    if (!vocabulary) {
      throw new Error(`Vocabulary with ID ${vocabId} not found`);
    }

    vocabulary.removeWord(wordId);
    this.saveToStorage();
    return true;
  }

  // Lấy từ từ kho từ vựng
  getWordsFromVocabulary(vocabId, filters = {}) {
    const vocabulary = this.getVocabulary(vocabId);
    if (!vocabulary) {
      return [];
    }

    let words = vocabulary.words;

    // Áp dụng bộ lọc
    if (filters.level) {
      words = words.filter(word => word.level === filters.level);
    }

    if (filters.category) {
      words = words.filter(word => word.category === filters.category);
    }

    if (filters.learned !== undefined) {
      words = words.filter(word => word.learned === filters.learned);
    }

    if (filters.query) {
      const lowerQuery = filters.query.toLowerCase();
      words = words.filter(word => 
        word.word.toLowerCase().includes(lowerQuery) ||
        word.meaning.toLowerCase().includes(lowerQuery)
      );
    }

    return words;
  }

  // Lấy từ ngẫu nhiên từ kho từ vựng
  getRandomWordsFromVocabulary(vocabId, count = 10) {
    const vocabulary = this.getVocabulary(vocabId);
    if (!vocabulary) {
      return [];
    }

    return vocabulary.getRandomWords(count);
  }

  // Lấy từ cần ôn tập từ kho từ vựng
  getWordsToReviewFromVocabulary(vocabId) {
    const vocabulary = this.getVocabulary(vocabId);
    if (!vocabulary) {
      return [];
    }

    return vocabulary.getWordsToReview();
  }

  // Cập nhật tiến độ từ trong kho từ vựng
  updateWordProgress(vocabId, wordId, isCorrect) {
    const vocabulary = this.getVocabulary(vocabId);
    if (!vocabulary) {
      return false;
    }

    const word = vocabulary.findWord(wordId);
    if (!word) {
      return false;
    }

    word.updateReview(isCorrect);
    if (isCorrect && !word.learned) {
      word.markAsLearned();
    }

    vocabulary.touch();
    this.saveToStorage();
    return true;
  }

  // Lấy thống kê của kho từ vựng
  getVocabularyStatistics(vocabId) {
    const vocabulary = this.getVocabulary(vocabId);
    if (!vocabulary) {
      return null;
    }

    return {
      id: vocabulary.id,
      title: vocabulary.title,
      totalWords: vocabulary.getTotalWords(),
      learnedWords: vocabulary.getLearnedWords(),
      unlearnedWords: vocabulary.getUnlearnedWords(),
      progressPercentage: vocabulary.getProgressPercentage(),
      statsByLevel: vocabulary.getStatsByLevel(),
      statsByCategory: vocabulary.getStatsByCategory()
    };
  }

  // Lấy thống kê tổng quan tất cả kho từ vựng
  getOverallStatistics() {
    const vocabularies = this.getAllVocabularies();
    
    let totalWords = 0;
    let totalLearned = 0;
    const byLevel = { basic: 0, intermediate: 0, advanced: 0 };
    const byCategory = {};

    vocabularies.forEach(vocab => {
      totalWords += vocab.getTotalWords();
      totalLearned += vocab.getLearnedWords();
      
      const levelStats = vocab.getStatsByLevel();
      Object.keys(levelStats).forEach(level => {
        if (byLevel[level] !== undefined) {
          byLevel[level] += levelStats[level].total;
        }
      });

      const categoryStats = vocab.getStatsByCategory();
      Object.keys(categoryStats).forEach(category => {
        byCategory[category] = (byCategory[category] || 0) + categoryStats[category].total;
      });
    });

    return {
      totalVocabularies: vocabularies.length,
      totalWords,
      totalLearned,
      totalUnlearned: totalWords - totalLearned,
      overallProgress: totalWords > 0 ? Math.round((totalLearned / totalWords) * 100) : 0,
      byLevel,
      byCategory
    };
  }

  // Sao chép kho từ vựng
  duplicateVocabulary(vocabId, newTitle = null) {
    const originalVocab = this.getVocabulary(vocabId);
    if (!originalVocab) {
      throw new Error(`Vocabulary with ID ${vocabId} not found`);
    }

    const newVocab = new Vocabulary({
      id: Date.now(), // Simple ID generation
      title: newTitle || `${originalVocab.title} (Copy)`,
      description: originalVocab.description,
      image: originalVocab.image,
      level: originalVocab.level,
      color: originalVocab.color,
      words: originalVocab.words.map(word => new Word({
        ...word.toJSON(),
        id: Date.now() + Math.random(), // New ID for each word
        learned: false, // Reset learned status
        reviewCount: 0,
        correctCount: 0
      }))
    });

    this.addVocabulary(newVocab);
    return newVocab;
  }

  // Merge hai kho từ vựng
  mergeVocabularies(vocabId1, vocabId2, newTitle) {
    const vocab1 = this.getVocabulary(vocabId1);
    const vocab2 = this.getVocabulary(vocabId2);

    if (!vocab1 || !vocab2) {
      throw new Error('One or both vocabularies not found');
    }

    const mergedWords = [...vocab1.words, ...vocab2.words];
    // Remove duplicates based on word text
    const uniqueWords = mergedWords.filter((word, index, array) => 
      array.findIndex(w => w.word.toLowerCase() === word.word.toLowerCase()) === index
    );

    const newVocab = new Vocabulary({
      id: Date.now(),
      title: newTitle,
      description: `Merged from ${vocab1.title} and ${vocab2.title}`,
      level: vocab1.level, // Use first vocabulary's level
      color: vocab1.color,
      words: uniqueWords
    });

    this.addVocabulary(newVocab);
    return newVocab;
  }

  // Lưu vào localStorage
  saveToStorage() {
    try {
      const data = {
        vocabularies: Array.from(this.vocabularies.values()).map(vocab => vocab.toJSON())
      };
      localStorage.setItem('vocabularyManager', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving vocabularies to storage:', error);
    }
  }

  // Tải từ localStorage
  loadFromStorage() {
    try {
      const data = localStorage.getItem('vocabularyManager');
      if (data) {
        const parsed = JSON.parse(data);
        
        this.vocabularies.clear();
        if (parsed.vocabularies) {
          parsed.vocabularies.forEach(vocabData => {
            const vocabulary = Vocabulary.fromJSON(vocabData);
            this.vocabularies.set(vocabulary.id, vocabulary);
          });
        }
      }
    } catch (error) {
      console.error('Error loading vocabularies from storage:', error);
    }
  }

  // Import dữ liệu
  importVocabularies(vocabulariesData) {
    vocabulariesData.forEach(vocabData => {
      this.addVocabulary(vocabData);
    });
    return vocabulariesData.length;
  }

  // Export dữ liệu
  exportVocabularies() {
    return this.getAllVocabularies().map(vocab => vocab.toJSON());
  }

  // Reset tất cả dữ liệu
  reset() {
    this.vocabularies.clear();
    this.saveToStorage();
  }

  // Khởi tạo với dữ liệu mẫu
  initializeSampleData() {
    const sampleVocabularies = [
      {
        id: 1,
        title: 'Từ vựng cơ bản hàng ngày',
        description: 'Những từ vựng thiết yếu được sử dụng trong cuộc sống hàng ngày',
        level: 'basic',
        color: 'green',
        image: '📚',
        words: [
          {
            id: 1,
            word: 'Beautiful',
            phonetic: '/ˈbjuː.tɪ.fəl/',
            meaning: 'Đẹp, xinh đẹp',
            definition: 'Having qualities that give pleasure to the senses',
            example: 'She has a beautiful smile.',
            exampleTranslation: 'Cô ấy có nụ cười đẹp.',
            level: 'basic',
            category: 'adjective',
            image: '🌸'
          },
          {
            id: 2,
            word: 'Happy',
            phonetic: '/ˈhæp.i/',
            meaning: 'Vui vẻ, hạnh phúc',
            definition: 'Feeling pleasure and contentment',
            example: 'I am happy to see you again.',
            exampleTranslation: 'Tôi rất vui khi gặp lại bạn.',
            level: 'basic',
            category: 'adjective',
            image: '😊'
          }
        ]
      },
      {
        id: 2,
        title: 'Từ vựng công việc',
        description: 'Từ vựng chuyên ngành dành cho môi trường làm việc',
        level: 'intermediate',
        color: 'blue',
        image: '💼',
        words: [
          {
            id: 3,
            word: 'Meeting',
            phonetic: '/ˈmiː.tɪŋ/',
            meaning: 'Cuộc họp',
            definition: 'A gathering of people for discussion',
            example: 'We have a meeting at 3 PM.',
            exampleTranslation: 'Chúng ta có cuộc họp lúc 3 giờ chiều.',
            level: 'intermediate',
            category: 'noun',
            image: '👥'
          }
        ]
      }
    ];

    this.importVocabularies(sampleVocabularies);
  }
}

import { Word } from '../models/Word.js';

/**
 * WordManager - Quản lý từ vựng
 */
export class WordManager {
  constructor() {
    this.words = new Map(); // Map để lưu trữ words theo ID
    this.favorites = new Set(); // Set để lưu từ yêu thích
  }

  // Thêm từ mới
  addWord(wordData) {
    const word = wordData instanceof Word ? wordData : new Word(wordData);
    this.words.set(word.id, word);
    this.saveToStorage();
    return word;
  }

  // Cập nhật từ
  updateWord(wordId, updates) {
    const word = this.words.get(wordId);
    if (!word) {
      throw new Error(`Word with ID ${wordId} not found`);
    }

    Object.assign(word, updates);
    word.updatedAt = new Date();
    this.saveToStorage();
    return word;
  }

  // Xóa từ
  deleteWord(wordId) {
    const deleted = this.words.delete(wordId);
    if (deleted) {
      this.favorites.delete(wordId);
      this.saveToStorage();
    }
    return deleted;
  }

  // Lấy từ theo ID
  getWord(wordId) {
    return this.words.get(wordId);
  }

  // Lấy tất cả từ
  getAllWords() {
    return Array.from(this.words.values());
  }

  // Tìm kiếm từ
  searchWords(query, filters = {}) {
    let words = this.getAllWords();

    // Tìm kiếm theo từ khóa
    if (query) {
      const lowerQuery = query.toLowerCase();
      words = words.filter(word => 
        word.word.toLowerCase().includes(lowerQuery) ||
        word.meaning.toLowerCase().includes(lowerQuery) ||
        word.definition.toLowerCase().includes(lowerQuery)
      );
    }

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

    if (filters.favorites) {
      words = words.filter(word => this.favorites.has(word.id));
    }

    return words;
  }

  // Lọc từ theo level
  getWordsByLevel(level) {
    return this.getAllWords().filter(word => word.level === level);
  }

  // Lọc từ theo category
  getWordsByCategory(category) {
    return this.getAllWords().filter(word => word.category === category);
  }

  // Lấy từ đã học
  getLearnedWords() {
    return this.getAllWords().filter(word => word.learned);
  }

  // Lấy từ chưa học
  getUnlearnedWords() {
    return this.getAllWords().filter(word => !word.learned);
  }

  // Lấy từ yêu thích
  getFavoriteWords() {
    return this.getAllWords().filter(word => this.favorites.has(word.id));
  }

  // Thêm/xóa từ yêu thích
  toggleFavorite(wordId) {
    if (this.favorites.has(wordId)) {
      this.favorites.delete(wordId);
      this.saveToStorage();
      return false;
    } else {
      this.favorites.add(wordId);
      this.saveToStorage();
      return true;
    }
  }

  // Đánh dấu từ đã học
  markWordAsLearned(wordId) {
    const word = this.getWord(wordId);
    if (word) {
      word.markAsLearned();
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Đánh dấu từ chưa học
  markWordAsUnlearned(wordId) {
    const word = this.getWord(wordId);
    if (word) {
      word.markAsUnlearned();
      this.saveToStorage();
      return true;
    }
    return false;
  }

  // Cập nhật kết quả ôn tập
  updateWordReview(wordId, isCorrect) {
    const word = this.getWord(wordId);
    if (word) {
      word.updateReview(isCorrect);
      if (isCorrect && !word.learned) {
        word.markAsLearned();
      }
      this.saveToStorage();
      return word;
    }
    return null;
  }

  // Lấy từ ngẫu nhiên
  getRandomWords(count = 10, filters = {}) {
    let words = this.searchWords('', filters);
    return words.sort(() => 0.5 - Math.random()).slice(0, count);
  }

  // Lấy từ cần ôn tập
  getWordsForReview(count = 20) {
    const needReview = this.getAllWords()
      .filter(word => word.learned && word.getAccuracyRate() < 70)
      .sort((a, b) => a.getAccuracyRate() - b.getAccuracyRate());
    
    const unlearned = this.getUnlearnedWords()
      .sort(() => 0.5 - Math.random());

    return [...needReview, ...unlearned].slice(0, count);
  }

  // Thống kê tổng quan
  getStatistics() {
    const words = this.getAllWords();
    const learned = this.getLearnedWords();
    const favorites = this.getFavoriteWords();

    const byLevel = {
      basic: words.filter(w => w.level === 'basic').length,
      intermediate: words.filter(w => w.level === 'intermediate').length,
      advanced: words.filter(w => w.level === 'advanced').length
    };

    const byCategory = {};
    words.forEach(word => {
      byCategory[word.category] = (byCategory[word.category] || 0) + 1;
    });

    const averageAccuracy = learned.length > 0 
      ? Math.round(learned.reduce((sum, word) => sum + word.getAccuracyRate(), 0) / learned.length)
      : 0;

    return {
      total: words.length,
      learned: learned.length,
      unlearned: words.length - learned.length,
      favorites: favorites.length,
      byLevel,
      byCategory,
      averageAccuracy
    };
  }

  // Lưu vào localStorage
  saveToStorage() {
    try {
      const data = {
        words: Array.from(this.words.values()).map(word => word.toJSON()),
        favorites: Array.from(this.favorites)
      };
      localStorage.setItem('wordManager', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving words to storage:', error);
    }
  }

  // Tải từ localStorage
  loadFromStorage() {
    try {
      const data = localStorage.getItem('wordManager');
      if (data) {
        const parsed = JSON.parse(data);
        
        // Load words
        this.words.clear();
        if (parsed.words) {
          parsed.words.forEach(wordData => {
            const word = Word.fromJSON(wordData);
            this.words.set(word.id, word);
          });
        }

        // Load favorites
        this.favorites.clear();
        if (parsed.favorites) {
          parsed.favorites.forEach(id => this.favorites.add(id));
        }
      }
    } catch (error) {
      console.error('Error loading words from storage:', error);
    }
  }

  // Import dữ liệu từ array
  importWords(wordsData) {
    wordsData.forEach(wordData => {
      this.addWord(wordData);
    });
    return wordsData.length;
  }

  // Export dữ liệu
  exportWords() {
    return this.getAllWords().map(word => word.toJSON());
  }

  // Reset tất cả dữ liệu
  reset() {
    this.words.clear();
    this.favorites.clear();
    this.saveToStorage();
  }

  // Khởi tạo với dữ liệu mẫu
  initializeSampleData() {
    const sampleWords = [
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
        word: 'Adventure',
        phonetic: '/ədˈven.tʃər/',
        meaning: 'Cuộc phiêu lưu',
        definition: 'An exciting or dangerous experience',
        example: 'Their trip to the mountains was a great adventure.',
        exampleTranslation: 'Chuyến đi lên núi của họ là một cuộc phiêu lưu tuyệt vời.',
        level: 'intermediate',
        category: 'noun',
        image: '🏔️'
      },
      {
        id: 3,
        word: 'Knowledge',
        phonetic: '/ˈnɒl.ɪdʒ/',
        meaning: 'Kiến thức',
        definition: 'Information and skills acquired through experience or education',
        example: 'Reading books increases your knowledge.',
        exampleTranslation: 'Đọc sách làm tăng kiến thức của bạn.',
        level: 'intermediate',
        category: 'noun',
        image: '📚'
      }
    ];

    this.importWords(sampleWords);
  }
}

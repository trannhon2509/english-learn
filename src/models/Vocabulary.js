/**
 * Vocabulary Model - Đại diện cho một kho từ vựng
 */
export class Vocabulary {
  constructor({
    id,
    title,
    description,
    image = '📚',
    level = 'basic',
    color = 'blue',
    words = [],
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.image = image;
    this.level = level;
    this.color = color;
    this.words = words; // Array of Word instances
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Thêm từ vào kho từ vựng
  addWord(word) {
    if (!(word instanceof Word)) {
      throw new Error('Word must be an instance of Word class');
    }
    this.words.push(word);
    this.updatedAt = new Date();
  }

  // Xóa từ khỏi kho từ vựng
  removeWord(wordId) {
    this.words = this.words.filter(word => word.id !== wordId);
    this.updatedAt = new Date();
  }

  // Tìm từ theo ID
  findWord(wordId) {
    return this.words.find(word => word.id === wordId);
  }

  // Lấy tổng số từ
  getTotalWords() {
    return this.words.length;
  }

  // Lấy số từ đã học
  getLearnedWords() {
    return this.words.filter(word => word.learned).length;
  }

  // Lấy số từ chưa học
  getUnlearnedWords() {
    return this.words.filter(word => !word.learned).length;
  }

  // Tính tỷ lệ hoàn thành
  getProgressPercentage() {
    if (this.words.length === 0) return 0;
    return Math.round((this.getLearnedWords() / this.getTotalWords()) * 100);
  }

  // Lọc từ theo level
  getWordsByLevel(level) {
    return this.words.filter(word => word.level === level);
  }

  // Lọc từ theo category
  getWordsByCategory(category) {
    return this.words.filter(word => word.category === category);
  }

  // Tìm kiếm từ
  searchWords(query) {
    const lowerQuery = query.toLowerCase();
    return this.words.filter(word => 
      word.word.toLowerCase().includes(lowerQuery) ||
      word.meaning.toLowerCase().includes(lowerQuery) ||
      word.definition.toLowerCase().includes(lowerQuery)
    );
  }

  // Lấy từ ngẫu nhiên để học
  getRandomWords(count = 10) {
    const shuffled = [...this.words].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Lấy từ chưa học để ôn tập
  getWordsToReview() {
    return this.words.filter(word => !word.learned);
  }

  // Lấy từ cần ôn tập lại (đã học nhưng độ chính xác thấp)
  getWordsNeedReview() {
    return this.words.filter(word => 
      word.learned && word.getAccuracyRate() < 70
    );
  }

  // Thống kê theo level
  getStatsByLevel() {
    const stats = {
      basic: { total: 0, learned: 0 },
      intermediate: { total: 0, learned: 0 },
      advanced: { total: 0, learned: 0 }
    };

    this.words.forEach(word => {
      if (stats[word.level]) {
        stats[word.level].total++;
        if (word.learned) {
          stats[word.level].learned++;
        }
      }
    });

    return stats;
  }

  // Thống kê theo category
  getStatsByCategory() {
    const stats = {};
    
    this.words.forEach(word => {
      if (!stats[word.category]) {
        stats[word.category] = { total: 0, learned: 0 };
      }
      stats[word.category].total++;
      if (word.learned) {
        stats[word.category].learned++;
      }
    });

    return stats;
  }

  // Cập nhật thời gian sửa đổi
  touch() {
    this.updatedAt = new Date();
  }

  // Chuyển đổi về object để lưu trữ
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      image: this.image,
      level: this.level,
      color: this.color,
      words: this.words.map(word => word.toJSON()),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  // Tạo từ object
  static fromJSON(data) {
    const words = data.words ? data.words.map(wordData => Word.fromJSON(wordData)) : [];
    return new Vocabulary({
      ...data,
      words
    });
  }
}

// Import Word class
import { Word } from './Word.js';

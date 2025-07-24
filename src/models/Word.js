/**
 * Word Model - Đại diện cho một từ vựng
 */
export class Word {
  constructor({
    id,
    word,
    phonetic,
    meaning,
    definition,
    example,
    exampleTranslation,
    level = 'basic',
    category = 'noun',
    image = '📝',
    learned = false,
    acceptedAnswers = [],
    hint = '',
    createdAt = new Date(),
    lastReviewed = null
  }) {
    this.id = id;
    this.word = word;
    this.phonetic = phonetic;
    this.meaning = meaning;
    this.definition = definition;
    this.example = example;
    this.exampleTranslation = exampleTranslation;
    this.level = level; // 'basic', 'intermediate', 'advanced'
    this.category = category; // 'noun', 'verb', 'adjective', 'adverb', etc.
    this.image = image;
    this.learned = learned;
    this.acceptedAnswers = acceptedAnswers.length > 0 ? acceptedAnswers : [meaning];
    this.hint = hint;
    this.createdAt = createdAt;
    this.lastReviewed = lastReviewed;
    this.reviewCount = 0;
    this.correctCount = 0;
  }

  // Đánh dấu từ đã học
  markAsLearned() {
    this.learned = true;
    this.lastReviewed = new Date();
  }

  // Đánh dấu từ chưa học
  markAsUnlearned() {
    this.learned = false;
  }

  // Cập nhật lần ôn tập
  updateReview(isCorrect = true) {
    this.reviewCount++;
    this.lastReviewed = new Date();
    if (isCorrect) {
      this.correctCount++;
    }
  }

  // Tính tỷ lệ đúng
  getAccuracyRate() {
    if (this.reviewCount === 0) return 0;
    return Math.round((this.correctCount / this.reviewCount) * 100);
  }

  // Kiểm tra đáp án có đúng không
  isAnswerCorrect(answer) {
    const normalizedAnswer = answer.toLowerCase().trim();
    return this.acceptedAnswers.some(accepted => 
      accepted.toLowerCase().trim() === normalizedAnswer
    );
  }

  // Lấy màu theo level
  getLevelColor() {
    const colors = {
      'basic': 'blue',
      'intermediate': 'purple', 
      'advanced': 'gold'
    };
    return colors[this.level] || 'default';
  }

  // Lấy màu theo category
  getCategoryColor() {
    const colors = {
      'noun': 'green',
      'verb': 'blue',
      'adjective': 'orange',
      'adverb': 'purple'
    };
    return colors[this.category] || 'default';
  }

  // Chuyển đổi về object thường để lưu trữ
  toJSON() {
    return {
      id: this.id,
      word: this.word,
      phonetic: this.phonetic,
      meaning: this.meaning,
      definition: this.definition,
      example: this.example,
      exampleTranslation: this.exampleTranslation,
      level: this.level,
      category: this.category,
      image: this.image,
      learned: this.learned,
      acceptedAnswers: this.acceptedAnswers,
      hint: this.hint,
      createdAt: this.createdAt,
      lastReviewed: this.lastReviewed,
      reviewCount: this.reviewCount,
      correctCount: this.correctCount
    };
  }

  // Tạo từ object
  static fromJSON(data) {
    return new Word(data);
  }
}

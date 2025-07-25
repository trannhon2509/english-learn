import { 
  WordManager, 
  VocabularyManager, 
  CourseManager, 
  UserManager 
} from '@managers/index.js';

/**
 * LearningService - Service tổng hợp quản lý toàn bộ hệ thống học tập
 */
export class LearningService {
  constructor() {
    // Khởi tạo các manager
    this.wordManager = new WordManager();
    this.vocabularyManager = new VocabularyManager();
    this.courseManager = new CourseManager();
    this.userManager = new UserManager();

    // Tải dữ liệu từ localStorage
    this.loadAllData();

    // Nếu chưa có dữ liệu, khởi tạo dữ liệu mẫu
    if (this.wordManager.getAllWords().length === 0) {
      this.initializeSampleData();
    }
  }

  // ==================== USER METHODS ====================
  
  // Đăng nhập
  login(userId) {
    return this.userManager.login(userId);
  }

  // Đăng xuất
  logout() {
    this.userManager.logout();
  }

  // Lấy user hiện tại
  getCurrentUser() {
    return this.userManager.getCurrentUser();
  }

  // Tạo user mới
  createUser(userData) {
    return this.userManager.createUser(userData);
  }

  // Cập nhật thống kê học tập
  updateLearningProgress(statsUpdate) {
    const updated = this.userManager.updateCurrentUserStats(statsUpdate);
    
    // Kiểm tra level up
    const leveledUp = this.userManager.checkCurrentUserLevelUp();
    
    return { stats: updated, leveledUp };
  }

  // ==================== VOCABULARY METHODS ====================
  
  // Lấy tất cả kho từ vựng
  getAllVocabularies() {
    return this.vocabularyManager.getAllVocabularies();
  }

  // Lấy kho từ vựng theo ID
  getVocabulary(vocabId) {
    return this.vocabularyManager.getVocabulary(vocabId);
  }

  // Lấy từ vựng từ kho
  getWordsFromVocabulary(vocabId, filters = {}) {
    return this.vocabularyManager.getWordsFromVocabulary(vocabId, filters);
  }

  // Lấy từ ngẫu nhiên từ kho từ vựng
  getRandomWordsFromVocabulary(vocabId, count = 10) {
    return this.vocabularyManager.getRandomWordsFromVocabulary(vocabId, count);
  }

  // ==================== WORD METHODS ====================
  
  // Tìm kiếm từ vựng
  searchWords(query, filters = {}) {
    return this.wordManager.searchWords(query, filters);
  }

  // Lấy từ yêu thích
  getFavoriteWords() {
    return this.wordManager.getFavoriteWords();
  }

  // Toggle từ yêu thích
  toggleFavoriteWord(wordId) {
    return this.wordManager.toggleFavorite(wordId);
  }

  // Cập nhật kết quả học từ
  updateWordReview(wordId, isCorrect) {
    const result = this.wordManager.updateWordReview(wordId, isCorrect);
    
    // Cập nhật thống kê user
    if (result && isCorrect) {
      this.updateLearningProgress({
        wordsLearned: result.learned ? 1 : 0,
        studyTime: 1 // 1 minute per word
      });
    }
    
    return result;
  }

  // Lấy từ cần ôn tập
  getWordsForReview(count = 20) {
    return this.wordManager.getWordsForReview(count);
  }

  // ==================== COURSE METHODS ====================
  
  // Lấy tất cả khóa học
  getAllCourses() {
    return this.courseManager.getAllCourses();
  }

  // Lấy khóa học theo ID
  getCourse(courseId) {
    return this.courseManager.getCourse(courseId);
  }

  // Lấy khóa học đang học
  getInProgressCourses() {
    return this.courseManager.getInProgressCourses();
  }

  // Hoàn thành bài học
  completeLesson(courseId, lessonId, score = null) {
    const result = this.courseManager.completeLesson(courseId, lessonId, score);
    
    // Cập nhật thống kê user
    this.updateLearningProgress({
      studyTime: result.lesson.estimatedTime,
      courseCompleted: result.isCourseCompleted,
      score: score
    });
    
    return result;
  }

  // Lấy bài học tiếp theo
  getNextLesson(courseId) {
    return this.courseManager.getNextLesson(courseId);
  }

  // ==================== LEARNING SESSION METHODS ====================
  
  // Tạo phiên học tập từ vựng
  createVocabularyLearningSession(vocabId, method = 'flashcard', wordCount = 10) {
    const vocabulary = this.getVocabulary(vocabId);
    if (!vocabulary) {
      throw new Error(`Vocabulary with ID ${vocabId} not found`);
    }

    let words;
    switch (method) {
      case 'review':
        words = this.vocabularyManager.getWordsToReviewFromVocabulary(vocabId);
        break;
      case 'random':
        words = this.getRandomWordsFromVocabulary(vocabId, wordCount);
        break;
      case 'unlearned':
        words = this.getWordsFromVocabulary(vocabId, { learned: false });
        break;
      default:
        words = this.getRandomWordsFromVocabulary(vocabId, wordCount);
    }

    return {
      id: Date.now(),
      vocabulary,
      words: words.slice(0, wordCount),
      method,
      startTime: new Date(),
      currentIndex: 0,
      score: { correct: 0, incorrect: 0 }
    };
  }

  // Cập nhật kết quả phiên học tập
  updateLearningSession(sessionId, wordId, isCorrect) {
    // Cập nhật kết quả từ
    this.updateWordReview(wordId, isCorrect);
    
    return {
      wordUpdated: true,
      isCorrect
    };
  }

  // Hoàn thành phiên học tập
  completeLearningSession(session) {
    const { score, words } = session;
    const totalWords = words.length;
    const percentage = totalWords > 0 ? Math.round((score.correct / totalWords) * 100) : 0;

    // Cập nhật thống kê
    this.updateLearningProgress({
      wordsLearned: score.correct,
      studyTime: Math.round((new Date() - session.startTime) / 60000) // minutes
    });

    return {
      totalWords,
      correct: score.correct,
      incorrect: score.incorrect,
      percentage,
      passed: percentage >= 70
    };
  }

  // ==================== STATISTICS METHODS ====================
  
  // Lấy thống kê tổng quan
  getOverallStatistics() {
    const user = this.getCurrentUser();
    const wordStats = this.wordManager.getStatistics();
    const vocabStats = this.vocabularyManager.getOverallStatistics();
    const courseStats = this.courseManager.getOverallStatistics();

    return {
      user: user ? {
        name: user.name,
        level: user.level,
        stats: user.stats,
        achievements: this.userManager.getAchievements(user.id)
      } : null,
      words: wordStats,
      vocabularies: vocabStats,
      courses: courseStats
    };
  }

  // Lấy thống kê hàng ngày
  getDailyStats() {
    const user = this.getCurrentUser();
    if (!user) return null;

    return this.userManager.getDailyStats(user.id);
  }

  // Lấy thống kê tuần
  getWeeklyStats() {
    const user = this.getCurrentUser();
    if (!user) return null;

    return this.userManager.getWeeklyStats(user.id);
  }

  // ==================== DATA MANAGEMENT METHODS ====================
  
  // Tải tất cả dữ liệu
  loadAllData() {
    this.wordManager.loadFromStorage();
    this.vocabularyManager.loadFromStorage();
    this.courseManager.loadFromStorage();
    this.userManager.loadFromStorage();
  }

  // Lưu tất cả dữ liệu
  saveAllData() {
    this.wordManager.saveToStorage();
    this.vocabularyManager.saveToStorage();
    this.courseManager.saveToStorage();
    this.userManager.saveToStorage();
  }

  // Export tất cả dữ liệu
  exportAllData() {
    return {
      words: this.wordManager.exportWords(),
      vocabularies: this.vocabularyManager.exportVocabularies(),
      courses: this.courseManager.exportCourses(),
      users: this.userManager.exportUsers()
    };
  }

  // Import tất cả dữ liệu
  importAllData(data) {
    const results = {};
    
    if (data.words) {
      results.words = this.wordManager.importWords(data.words);
    }
    
    if (data.vocabularies) {
      results.vocabularies = this.vocabularyManager.importVocabularies(data.vocabularies);
    }
    
    if (data.courses) {
      results.courses = this.courseManager.importCourses(data.courses);
    }
    
    if (data.users) {
      results.users = this.userManager.importUsers(data.users);
    }

    return results;
  }

  // Reset tất cả dữ liệu
  resetAllData() {
    this.wordManager.reset();
    this.vocabularyManager.reset();
    this.courseManager.reset();
    this.userManager.reset();
  }

  // Khởi tạo dữ liệu mẫu
  initializeSampleData() {
    // Khởi tạo dữ liệu mẫu cho từng manager
    this.wordManager.initializeSampleData();
    this.vocabularyManager.initializeSampleData();
    this.courseManager.initializeSampleData();
    this.userManager.initializeSampleData();

    console.log('✅ Sample data initialized successfully');
  }

  // ==================== UTILITY METHODS ====================
  
  // Tìm kiếm tổng hợp
  globalSearch(query) {
    const words = this.searchWords(query);
    const vocabularies = this.vocabularyManager.searchVocabularies(query);
    const courses = this.courseManager.searchCourses(query);

    return {
      words,
      vocabularies,
      courses,
      total: words.length + vocabularies.length + courses.length
    };
  }

  // Lấy đề xuất học tập
  getLearningRecommendations() {
    const user = this.getCurrentUser();
    if (!user) return null;

    const wordsToReview = this.getWordsForReview(5);
    const inProgressCourses = this.getInProgressCourses();
    const recommendedCourses = this.courseManager.getRecommendedCourses(user.level, 3);

    return {
      wordsToReview,
      continueOurses: inProgressCourses.slice(0, 3),
      recommendedCourses,
      dailyGoal: user.preferences.dailyGoal,
      currentProgress: this.getDailyStats()
    };
  }
}

// Tạo instance duy nhất cho toàn bộ ứng dụng
export const learningService = new LearningService();

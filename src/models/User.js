/**
 * User Model - Đại diện cho người dùng
 */
export class User {
  constructor({
    id,
    name,
    email,
    avatar = '👤',
    level = 'beginner', // beginner, intermediate, advanced
    joinDate = new Date(),
    lastLogin = new Date(),
    preferences = {},
    stats = {}
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.avatar = avatar;
    this.level = level;
    this.joinDate = joinDate;
    this.lastLogin = lastLogin;
    this.preferences = {
      language: 'vi',
      theme: 'light',
      notifications: true,
      dailyGoal: 50, // words per day
      ...preferences
    };
    this.stats = {
      totalWordsLearned: 0,
      currentStreak: 0,
      longestStreak: 0,
      totalStudyTime: 0, // minutes
      coursesCompleted: 0,
      averageScore: 0,
      ...stats
    };
  }

  // Cập nhật thống kê học tập
  updateStats({
    wordsLearned = 0,
    studyTime = 0,
    courseCompleted = false,
    score = null
  }) {
    this.stats.totalWordsLearned += wordsLearned;
    this.stats.totalStudyTime += studyTime;
    
    if (courseCompleted) {
      this.stats.coursesCompleted++;
    }

    if (score !== null) {
      // Cập nhật điểm trung bình
      const totalTests = this.getTotalTests();
      this.stats.averageScore = Math.round(
        ((this.stats.averageScore * (totalTests - 1)) + score) / totalTests
      );
    }

    this.updateStreak();
    this.lastLogin = new Date();
  }

  // Cập nhật chuỗi học liên tiếp
  updateStreak() {
    const today = new Date();
    const lastLogin = new Date(this.lastLogin);
    const diffTime = Math.abs(today - lastLogin);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      // Học liên tiếp
      this.stats.currentStreak++;
      this.stats.longestStreak = Math.max(this.stats.longestStreak, this.stats.currentStreak);
    } else if (diffDays > 1) {
      // Bị gián đoạn
      this.stats.currentStreak = 1;
    }
  }

  // Lấy tổng số bài test đã làm
  getTotalTests() {
    return Math.max(1, Math.floor(this.stats.totalStudyTime / 30)); // Ước tính 1 test mỗi 30 phút
  }

  // Kiểm tra đã đạt mục tiêu hàng ngày chưa
  isDailyGoalMet(wordsLearnedToday) {
    return wordsLearnedToday >= this.preferences.dailyGoal;
  }

  // Lấy level tiếp theo
  getNextLevel() {
    const levels = ['beginner', 'intermediate', 'advanced', 'expert'];
    const currentIndex = levels.indexOf(this.level);
    return currentIndex < levels.length - 1 ? levels[currentIndex + 1] : null;
  }

  // Kiểm tra có thể lên level không
  canLevelUp() {
    const requirements = {
      beginner: { wordsLearned: 100, coursesCompleted: 1 },
      intermediate: { wordsLearned: 500, coursesCompleted: 3 },
      advanced: { wordsLearned: 1000, coursesCompleted: 5 },
      expert: { wordsLearned: 2000, coursesCompleted: 10 }
    };

    const nextLevel = this.getNextLevel();
    if (!nextLevel) return false;

    const req = requirements[nextLevel];
    return this.stats.totalWordsLearned >= req.wordsLearned && 
           this.stats.coursesCompleted >= req.coursesCompleted;
  }

  // Lên level
  levelUp() {
    if (this.canLevelUp()) {
      this.level = this.getNextLevel();
      return true;
    }
    return false;
  }

  // Cập nhật preferences
  updatePreferences(newPreferences) {
    this.preferences = { ...this.preferences, ...newPreferences };
  }

  // Lấy thống kê tuần này
  getWeeklyStats() {
    // Trong thực tế sẽ tính từ database
    return {
      wordsLearned: Math.floor(this.stats.totalWordsLearned / 10),
      studyTime: Math.floor(this.stats.totalStudyTime / 7),
      streak: this.stats.currentStreak,
      goal: this.preferences.dailyGoal * 7
    };
  }

  // Chuyển đổi về object
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      avatar: this.avatar,
      level: this.level,
      joinDate: this.joinDate,
      lastLogin: this.lastLogin,
      preferences: this.preferences,
      stats: this.stats
    };
  }

  // Tạo từ object
  static fromJSON(data) {
    return new User(data);
  }
}

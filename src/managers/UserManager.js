import { User } from '../models/User.js';

/**
 * UserManager - Quản lý người dùng
 */
export class UserManager {
  constructor() {
    this.currentUser = null;
    this.users = new Map(); // Map để lưu trữ users theo ID
  }

  // Tạo user mới
  createUser(userData) {
    const user = userData instanceof User ? userData : new User(userData);
    this.users.set(user.id, user);
    this.saveToStorage();
    return user;
  }

  // Cập nhật user
  updateUser(userId, updates) {
    const user = this.users.get(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    Object.assign(user, updates);
    this.saveToStorage();
    return user;
  }

  // Xóa user
  deleteUser(userId) {
    const deleted = this.users.delete(userId);
    if (deleted && this.currentUser && this.currentUser.id === userId) {
      this.currentUser = null;
    }
    this.saveToStorage();
    return deleted;
  }

  // Lấy user theo ID
  getUser(userId) {
    return this.users.get(userId);
  }

  // Lấy tất cả users
  getAllUsers() {
    return Array.from(this.users.values());
  }

  // Đăng nhập
  login(userId) {
    const user = this.getUser(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    this.currentUser = user;
    user.lastLogin = new Date();
    this.saveToStorage();
    return user;
  }

  // Đăng xuất
  logout() {
    this.currentUser = null;
    this.saveToStorage();
  }

  // Lấy user hiện tại
  getCurrentUser() {
    return this.currentUser;
  }

  // Kiểm tra đã đăng nhập chưa
  isLoggedIn() {
    return this.currentUser !== null;
  }

  // Cập nhật thống kê học tập
  updateLearningStats(userId, statsUpdate) {
    const user = this.getUser(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    user.updateStats(statsUpdate);
    this.saveToStorage();
    return user.stats;
  }

  // Cập nhật thống kê cho user hiện tại
  updateCurrentUserStats(statsUpdate) {
    if (!this.currentUser) {
      throw new Error('No user is currently logged in');
    }

    return this.updateLearningStats(this.currentUser.id, statsUpdate);
  }

  // Cập nhật preferences
  updateUserPreferences(userId, preferences) {
    const user = this.getUser(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    user.updatePreferences(preferences);
    this.saveToStorage();
    return user.preferences;
  }

  // Cập nhật preferences cho user hiện tại
  updateCurrentUserPreferences(preferences) {
    if (!this.currentUser) {
      throw new Error('No user is currently logged in');
    }

    return this.updateUserPreferences(this.currentUser.id, preferences);
  }

  // Kiểm tra và cập nhật level
  checkLevelUp(userId) {
    const user = this.getUser(userId);
    if (!user) {
      return false;
    }

    const leveled = user.levelUp();
    if (leveled) {
      this.saveToStorage();
    }
    return leveled;
  }

  // Kiểm tra level up cho user hiện tại
  checkCurrentUserLevelUp() {
    if (!this.currentUser) {
      return false;
    }

    return this.checkLevelUp(this.currentUser.id);
  }

  // Lấy thống kê hàng ngày
  getDailyStats(userId, date = new Date()) {
    const user = this.getUser(userId);
    if (!user) {
      return null;
    }

    // Trong thực tế sẽ lấy từ database dựa trên ngày
    // Đây là dữ liệu mẫu
    return {
      date: date.toDateString(),
      wordsLearned: Math.floor(Math.random() * 50),
      studyTime: Math.floor(Math.random() * 120), // minutes
      lessonsCompleted: Math.floor(Math.random() * 5),
      goalMet: Math.random() > 0.3
    };
  }

  // Lấy thống kê tuần
  getWeeklyStats(userId) {
    const user = this.getUser(userId);
    if (!user) {
      return null;
    }

    return user.getWeeklyStats();
  }

  // Lấy thống kê tháng
  getMonthlyStats(userId) {
    const user = this.getUser(userId);
    if (!user) {
      return null;
    }

    // Trong thực tế sẽ tính từ database
    return {
      wordsLearned: Math.floor(user.stats.totalWordsLearned / 3),
      studyTime: Math.floor(user.stats.totalStudyTime / 3),
      coursesCompleted: Math.floor(user.stats.coursesCompleted / 2),
      averageScore: user.stats.averageScore,
      daysActive: Math.floor(Math.random() * 30) + 1
    };
  }

  // Lấy bảng xếp hạng
  getLeaderboard(limit = 10) {
    return this.getAllUsers()
      .sort((a, b) => b.stats.totalWordsLearned - a.stats.totalWordsLearned)
      .slice(0, limit)
      .map((user, index) => ({
        rank: index + 1,
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        level: user.level,
        wordsLearned: user.stats.totalWordsLearned,
        streak: user.stats.currentStreak
      }));
  }

  // Lấy bạn bè (giả lập)
  getFriends(userId) {
    // Trong thực tế sẽ có bảng quan hệ bạn bè
    return this.getAllUsers()
      .filter(user => user.id !== userId)
      .slice(0, 5)
      .map(user => ({
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        level: user.level,
        lastSeen: user.lastLogin
      }));
  }

  // So sánh với bạn bè
  compareWithFriends(userId) {
    const user = this.getUser(userId);
    if (!user) {
      return null;
    }

    const friends = this.getFriends(userId);
    return friends.map(friend => {
      const friendUser = this.getUser(friend.id);
      return {
        ...friend,
        comparison: {
          wordsLearned: {
            user: user.stats.totalWordsLearned,
            friend: friendUser ? friendUser.stats.totalWordsLearned : 0,
            difference: user.stats.totalWordsLearned - (friendUser ? friendUser.stats.totalWordsLearned : 0)
          },
          streak: {
            user: user.stats.currentStreak,
            friend: friendUser ? friendUser.stats.currentStreak : 0,
            difference: user.stats.currentStreak - (friendUser ? friendUser.stats.currentStreak : 0)
          }
        }
      };
    });
  }

  // Lấy thành tích
  getAchievements(userId) {
    const user = this.getUser(userId);
    if (!user) {
      return [];
    }

    const achievements = [];
    
    // Thành tích dựa trên số từ đã học
    if (user.stats.totalWordsLearned >= 100) {
      achievements.push({
        id: 'words_100',
        title: 'Người học tập',
        description: 'Đã học 100 từ vựng',
        icon: '🎓',
        unlockedAt: new Date()
      });
    }

    if (user.stats.totalWordsLearned >= 500) {
      achievements.push({
        id: 'words_500',
        title: 'Chuyên gia từ vựng',
        description: 'Đã học 500 từ vựng',
        icon: '📚',
        unlockedAt: new Date()
      });
    }

    // Thành tích dựa trên chuỗi học liên tiếp
    if (user.stats.currentStreak >= 7) {
      achievements.push({
        id: 'streak_7',
        title: 'Người kiên trì',
        description: 'Học liên tiếp 7 ngày',
        icon: '🔥',
        unlockedAt: new Date()
      });
    }

    if (user.stats.currentStreak >= 30) {
      achievements.push({
        id: 'streak_30',
        title: 'Siêu kiên trì',
        description: 'Học liên tiếp 30 ngày',
        icon: '⚡',
        unlockedAt: new Date()
      });
    }

    return achievements;
  }

  // Lưu vào localStorage
  saveToStorage() {
    try {
      const data = {
        users: Array.from(this.users.values()).map(user => user.toJSON()),
        currentUserId: this.currentUser ? this.currentUser.id : null
      };
      localStorage.setItem('userManager', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving users to storage:', error);
    }
  }

  // Tải từ localStorage
  loadFromStorage() {
    try {
      const data = localStorage.getItem('userManager');
      if (data) {
        const parsed = JSON.parse(data);
        
        // Load users
        this.users.clear();
        if (parsed.users) {
          parsed.users.forEach(userData => {
            const user = User.fromJSON(userData);
            this.users.set(user.id, user);
          });
        }

        // Load current user
        if (parsed.currentUserId) {
          this.currentUser = this.getUser(parsed.currentUserId);
        }
      }
    } catch (error) {
      console.error('Error loading users from storage:', error);
    }
  }

  // Import dữ liệu
  importUsers(usersData) {
    usersData.forEach(userData => {
      this.createUser(userData);
    });
    return usersData.length;
  }

  // Export dữ liệu
  exportUsers() {
    return this.getAllUsers().map(user => user.toJSON());
  }

  // Reset tất cả dữ liệu
  reset() {
    this.users.clear();
    this.currentUser = null;
    this.saveToStorage();
  }

  // Khởi tạo với dữ liệu mẫu
  initializeSampleData() {
    const sampleUser = {
      id: 1,
      name: 'Nguyễn Văn A',
      email: 'nguyenvana@example.com',
      avatar: '👨‍💼',
      level: 'intermediate',
      preferences: {
        dailyGoal: 30,
        notifications: true,
        theme: 'light'
      },
      stats: {
        totalWordsLearned: 250,
        currentStreak: 5,
        longestStreak: 12,
        totalStudyTime: 180,
        coursesCompleted: 2,
        averageScore: 85
      }
    };

    const user = this.createUser(sampleUser);
    this.login(user.id);
    return user;
  }
}

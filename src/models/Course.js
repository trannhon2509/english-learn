/**
 * Course Model - Đại diện cho một khóa học
 */
export class Course {
  constructor({
    id,
    title,
    description,
    level = 'basic',
    color = 'blue',
    image = '📚',
    lessons = [],
    progress = 0,
    completed = 0,
    totalLessons = 0,
    link = null,
    category = 'vocabulary',
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.level = level; // 'basic', 'intermediate', 'advanced'
    this.color = color;
    this.image = image;
    this.lessons = lessons; // Array of Lesson instances
    this.progress = progress; // 0-100
    this.completed = completed;
    this.totalLessons = totalLessons;
    this.link = link;
    this.category = category; // 'vocabulary', 'grammar', 'listening', 'pronunciation'
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  // Thêm bài học
  addLesson(lesson) {
    if (!(lesson instanceof Lesson)) {
      throw new Error('Lesson must be an instance of Lesson class');
    }
    this.lessons.push(lesson);
    this.totalLessons = this.lessons.length;
    this.updateProgress();
    this.updatedAt = new Date();
  }

  // Xóa bài học
  removeLesson(lessonId) {
    this.lessons = this.lessons.filter(lesson => lesson.id !== lessonId);
    this.totalLessons = this.lessons.length;
    this.updateProgress();
    this.updatedAt = new Date();
  }

  // Tìm bài học theo ID
  findLesson(lessonId) {
    return this.lessons.find(lesson => lesson.id === lessonId);
  }

  // Cập nhật tiến độ
  updateProgress() {
    const completedLessons = this.lessons.filter(lesson => lesson.completed).length;
    this.completed = completedLessons;
    this.progress = this.totalLessons > 0 ? Math.round((completedLessons / this.totalLessons) * 100) : 0;
    this.updatedAt = new Date();
  }

  // Đánh dấu bài học hoàn thành
  completeLesson(lessonId) {
    const lesson = this.findLesson(lessonId);
    if (lesson) {
      lesson.markAsCompleted();
      this.updateProgress();
    }
  }

  // Lấy bài học tiếp theo
  getNextLesson() {
    return this.lessons.find(lesson => !lesson.completed);
  }

  // Lấy bài học đã hoàn thành
  getCompletedLessons() {
    return this.lessons.filter(lesson => lesson.completed);
  }

  // Lấy bài học chưa hoàn thành
  getIncompleteLessons() {
    return this.lessons.filter(lesson => !lesson.completed);
  }

  // Kiểm tra khóa học đã hoàn thành chưa
  isCompleted() {
    return this.progress >= 100;
  }

  // Lấy thời gian ước tính hoàn thành
  getEstimatedTime() {
    const totalTime = this.lessons.reduce((sum, lesson) => sum + lesson.estimatedTime, 0);
    const completedTime = this.getCompletedLessons()
      .reduce((sum, lesson) => sum + lesson.estimatedTime, 0);
    return totalTime - completedTime;
  }

  // Lấy màu theo level
  getLevelColor() {
    const colors = {
      'basic': 'green',
      'intermediate': 'blue',
      'advanced': 'orange'
    };
    return colors[this.level] || 'default';
  }

  // Lấy biểu tượng theo category
  getCategoryIcon() {
    const icons = {
      'vocabulary': '📚',
      'grammar': '📝',
      'listening': '🎧', 
      'pronunciation': '🗣️'
    };
    return icons[this.category] || '📖';
  }

  // Reset tiến độ
  reset() {
    this.lessons.forEach(lesson => lesson.reset());
    this.updateProgress();
  }

  // Chuyển đổi về object
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      level: this.level,
      color: this.color,
      image: this.image,
      lessons: this.lessons.map(lesson => lesson.toJSON()),
      progress: this.progress,
      completed: this.completed,
      totalLessons: this.totalLessons,
      link: this.link,
      category: this.category,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  // Tạo từ object
  static fromJSON(data) {
    const lessons = data.lessons ? data.lessons.map(lessonData => Lesson.fromJSON(lessonData)) : [];
    return new Course({
      ...data,
      lessons
    });
  }
}

/**
 * Lesson Model - Đại diện cho một bài học
 */
export class Lesson {
  constructor({
    id,
    title,
    description,
    content = '',
    type = 'vocabulary', // vocabulary, grammar, listening, exercise
    difficulty = 'basic',
    estimatedTime = 10, // minutes
    completed = false,
    score = 0,
    maxScore = 100,
    attempts = 0,
    createdAt = new Date(),
    completedAt = null
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.content = content;
    this.type = type;
    this.difficulty = difficulty;
    this.estimatedTime = estimatedTime;
    this.completed = completed;
    this.score = score;
    this.maxScore = maxScore;
    this.attempts = attempts;
    this.createdAt = createdAt;
    this.completedAt = completedAt;
  }

  // Đánh dấu hoàn thành
  markAsCompleted(score = null) {
    this.completed = true;
    this.completedAt = new Date();
    if (score !== null) {
      this.score = Math.max(this.score, score);
    }
  }

  // Reset bài học
  reset() {
    this.completed = false;
    this.score = 0;
    this.attempts = 0;
    this.completedAt = null;
  }

  // Cập nhật điểm
  updateScore(newScore) {
    this.score = Math.max(this.score, newScore);
    this.attempts++;
  }

  // Tính phần trăm điểm
  getScorePercentage() {
    return Math.round((this.score / this.maxScore) * 100);
  }

  // Kiểm tra đã pass chưa (điểm >= 70%)
  isPassed() {
    return this.getScorePercentage() >= 70;
  }

  // Chuyển đổi về object
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      content: this.content,
      type: this.type,
      difficulty: this.difficulty,
      estimatedTime: this.estimatedTime,
      completed: this.completed,
      score: this.score,
      maxScore: this.maxScore,
      attempts: this.attempts,
      createdAt: this.createdAt,
      completedAt: this.completedAt
    };
  }

  // Tạo từ object
  static fromJSON(data) {
    return new Lesson(data);
  }
}

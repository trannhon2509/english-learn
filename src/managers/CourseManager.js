import { Course, Lesson } from '../models/Course.js';

/**
 * CourseManager - Quản lý các khóa học
 */
export class CourseManager {
  constructor() {
    this.courses = new Map(); // Map để lưu trữ courses theo ID
    this.userProgress = new Map(); // Map để lưu tiến độ của user
  }

  // Thêm khóa học mới
  addCourse(courseData) {
    const course = courseData instanceof Course ? courseData : new Course(courseData);
    this.courses.set(course.id, course);
    this.saveToStorage();
    return course;
  }

  // Cập nhật khóa học
  updateCourse(courseId, updates) {
    const course = this.courses.get(courseId);
    if (!course) {
      throw new Error(`Course with ID ${courseId} not found`);
    }

    Object.assign(course, updates);
    course.updatedAt = new Date();
    this.saveToStorage();
    return course;
  }

  // Xóa khóa học
  deleteCourse(courseId) {
    const deleted = this.courses.delete(courseId);
    if (deleted) {
      this.userProgress.delete(courseId);
      this.saveToStorage();
    }
    return deleted;
  }

  // Lấy khóa học theo ID
  getCourse(courseId) {
    return this.courses.get(courseId);
  }

  // Lấy tất cả khóa học
  getAllCourses() {
    return Array.from(this.courses.values());
  }

  // Tìm kiếm khóa học
  searchCourses(query, filters = {}) {
    let courses = this.getAllCourses();

    // Tìm kiếm theo từ khóa
    if (query) {
      const lowerQuery = query.toLowerCase();
      courses = courses.filter(course => 
        course.title.toLowerCase().includes(lowerQuery) ||
        course.description.toLowerCase().includes(lowerQuery)
      );
    }

    // Áp dụng bộ lọc
    if (filters.level) {
      courses = courses.filter(course => course.level === filters.level);
    }

    if (filters.category) {
      courses = courses.filter(course => course.category === filters.category);
    }

    if (filters.completed !== undefined) {
      courses = courses.filter(course => course.isCompleted() === filters.completed);
    }

    return courses;
  }

  // Lọc theo level
  getCoursesByLevel(level) {
    return this.getAllCourses().filter(course => course.level === level);
  }

  // Lọc theo category
  getCoursesByCategory(category) {
    return this.getAllCourses().filter(course => course.category === category);
  }

  // Lấy khóa học đã hoàn thành
  getCompletedCourses() {
    return this.getAllCourses().filter(course => course.isCompleted());
  }

  // Lấy khóa học đang học
  getInProgressCourses() {
    return this.getAllCourses().filter(course => 
      course.progress > 0 && !course.isCompleted()
    );
  }

  // Lấy khóa học chưa bắt đầu
  getNotStartedCourses() {
    return this.getAllCourses().filter(course => course.progress === 0);
  }

  // Thêm bài học vào khóa học
  addLessonToCourse(courseId, lessonData) {
    const course = this.getCourse(courseId);
    if (!course) {
      throw new Error(`Course with ID ${courseId} not found`);
    }

    const lesson = lessonData instanceof Lesson ? lessonData : new Lesson(lessonData);
    course.addLesson(lesson);
    this.saveToStorage();
    return lesson;
  }

  // Xóa bài học khỏi khóa học
  removeLessonFromCourse(courseId, lessonId) {
    const course = this.getCourse(courseId);
    if (!course) {
      throw new Error(`Course with ID ${courseId} not found`);
    }

    course.removeLesson(lessonId);
    this.saveToStorage();
    return true;
  }

  // Lấy bài học từ khóa học
  getLessonsFromCourse(courseId) {
    const course = this.getCourse(courseId);
    return course ? course.lessons : [];
  }

  // Lấy bài học tiếp theo
  getNextLesson(courseId) {
    const course = this.getCourse(courseId);
    return course ? course.getNextLesson() : null;
  }

  // Hoàn thành bài học
  completeLesson(courseId, lessonId, score = null) {
    const course = this.getCourse(courseId);
    if (!course) {
      throw new Error(`Course with ID ${courseId} not found`);
    }

    const lesson = course.findLesson(lessonId);
    if (!lesson) {
      throw new Error(`Lesson with ID ${lessonId} not found`);
    }

    lesson.markAsCompleted(score);
    course.updateProgress();
    this.saveToStorage();

    return {
      lesson,
      course,
      isNextAvailable: course.getNextLesson() !== null,
      isCourseCompleted: course.isCompleted()
    };
  }

  // Cập nhật điểm bài học
  updateLessonScore(courseId, lessonId, score) {
    const course = this.getCourse(courseId);
    if (!course) {
      throw new Error(`Course with ID ${courseId} not found`);
    }

    const lesson = course.findLesson(lessonId);
    if (!lesson) {
      throw new Error(`Lesson with ID ${lessonId} not found`);
    }

    lesson.updateScore(score);
    this.saveToStorage();
    return lesson;
  }

  // Reset tiến độ khóa học
  resetCourse(courseId) {
    const course = this.getCourse(courseId);
    if (!course) {
      throw new Error(`Course with ID ${courseId} not found`);
    }

    course.reset();
    this.saveToStorage();
    return course;
  }

  // Lấy thống kê khóa học
  getCourseStatistics(courseId) {
    const course = this.getCourse(courseId);
    if (!course) {
      return null;
    }

    const completedLessons = course.getCompletedLessons();
    const totalScore = completedLessons.reduce((sum, lesson) => sum + lesson.score, 0);
    const averageScore = completedLessons.length > 0 ? 
      Math.round(totalScore / completedLessons.length) : 0;

    return {
      id: course.id,
      title: course.title,
      totalLessons: course.totalLessons,
      completedLessons: course.completed,
      progress: course.progress,
      estimatedTimeRemaining: course.getEstimatedTime(),
      averageScore,
      isCompleted: course.isCompleted()
    };
  }

  // Lấy thống kê tổng quan
  getOverallStatistics() {
    const courses = this.getAllCourses();
    
    const total = courses.length;
    const completed = this.getCompletedCourses().length;
    const inProgress = this.getInProgressCourses().length;
    const notStarted = this.getNotStartedCourses().length;

    const byLevel = {
      basic: courses.filter(c => c.level === 'basic').length,
      intermediate: courses.filter(c => c.level === 'intermediate').length,
      advanced: courses.filter(c => c.level === 'advanced').length
    };

    const byCategory = {};
    courses.forEach(course => {
      byCategory[course.category] = (byCategory[course.category] || 0) + 1;
    });

    const totalLessons = courses.reduce((sum, course) => sum + course.totalLessons, 0);
    const completedLessons = courses.reduce((sum, course) => sum + course.completed, 0);

    const overallProgress = totalLessons > 0 ? 
      Math.round((completedLessons / totalLessons) * 100) : 0;

    return {
      totalCourses: total,
      completedCourses: completed,
      inProgressCourses: inProgress,
      notStartedCourses: notStarted,
      totalLessons,
      completedLessons,
      overallProgress,
      byLevel,
      byCategory
    };
  }

  // Lấy khóa học được đề xuất
  getRecommendedCourses(userLevel = 'basic', limit = 5) {
    return this.getAllCourses()
      .filter(course => course.level === userLevel && !course.isCompleted())
      .sort((a, b) => a.progress - b.progress) // Ưu tiên khóa đang học
      .slice(0, limit);
  }

  // Sao chép khóa học
  duplicateCourse(courseId, newTitle = null) {
    const originalCourse = this.getCourse(courseId);
    if (!originalCourse) {
      throw new Error(`Course with ID ${courseId} not found`);
    }

    const newCourse = new Course({
      id: Date.now(),
      title: newTitle || `${originalCourse.title} (Copy)`,
      description: originalCourse.description,
      level: originalCourse.level,
      color: originalCourse.color,
      image: originalCourse.image,
      category: originalCourse.category,
      lessons: originalCourse.lessons.map(lesson => new Lesson({
        ...lesson.toJSON(),
        id: Date.now() + Math.random(),
        completed: false,
        score: 0,
        attempts: 0,
        completedAt: null
      }))
    });

    this.addCourse(newCourse);
    return newCourse;
  }

  // Lưu vào localStorage
  saveToStorage() {
    try {
      const data = {
        courses: Array.from(this.courses.values()).map(course => course.toJSON()),
        userProgress: Array.from(this.userProgress.entries())
      };
      localStorage.setItem('courseManager', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving courses to storage:', error);
    }
  }

  // Tải từ localStorage
  loadFromStorage() {
    try {
      const data = localStorage.getItem('courseManager');
      if (data) {
        const parsed = JSON.parse(data);
        
        // Load courses
        this.courses.clear();
        if (parsed.courses) {
          parsed.courses.forEach(courseData => {
            const course = Course.fromJSON(courseData);
            this.courses.set(course.id, course);
          });
        }

        // Load user progress
        this.userProgress.clear();
        if (parsed.userProgress) {
          parsed.userProgress.forEach(([courseId, progress]) => {
            this.userProgress.set(courseId, progress);
          });
        }
      }
    } catch (error) {
      console.error('Error loading courses from storage:', error);
    }
  }

  // Import dữ liệu
  importCourses(coursesData) {
    coursesData.forEach(courseData => {
      this.addCourse(courseData);
    });
    return coursesData.length;
  }

  // Export dữ liệu
  exportCourses() {
    return this.getAllCourses().map(course => course.toJSON());
  }

  // Reset tất cả dữ liệu
  reset() {
    this.courses.clear();
    this.userProgress.clear();
    this.saveToStorage();
  }

  // Khởi tạo với dữ liệu mẫu
  initializeSampleData() {
    const sampleCourses = [
      {
        id: 1,
        title: 'Từ vựng cơ bản',
        description: 'Học 1000 từ vựng thiết yếu trong tiếng Anh',
        level: 'basic',
        color: 'green',
        category: 'vocabulary',
        link: '/vocabulary',
        lessons: [
          {
            id: 1,
            title: 'Từ vựng gia đình',
            description: 'Học từ vựng về gia đình',
            type: 'vocabulary',
            difficulty: 'basic',
            estimatedTime: 15
          },
          {
            id: 2,
            title: 'Từ vựng thực phẩm',
            description: 'Học từ vựng về thực phẩm',
            type: 'vocabulary',
            difficulty: 'basic',
            estimatedTime: 20
          }
        ]
      },
      {
        id: 2,
        title: 'Ngữ pháp nâng cao',
        description: 'Nắm vững các cấu trúc ngữ pháp phức tạp',
        level: 'advanced',
        color: 'orange',
        category: 'grammar',
        lessons: [
          {
            id: 3,
            title: 'Câu điều kiện',
            description: 'Học các loại câu điều kiện',
            type: 'grammar',
            difficulty: 'advanced',
            estimatedTime: 30
          }
        ]
      }
    ];

    this.importCourses(sampleCourses);
  }
}

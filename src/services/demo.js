import { learningService } from '../services';

/**
 * Demo các chức năng của hệ thống Model và Manager
 */
export const demoLearningSystem = () => {
  console.group('🎯 DEMO HỆ THỐNG HỌC TẬP');

  try {
    // ==================== DEMO USER ====================
    console.group('👤 Demo User Management');
    
    const currentUser = learningService.getCurrentUser();
    console.log('Current User:', currentUser);
    
    if (currentUser) {
      console.log('User Level:', currentUser.level);
      console.log('User Stats:', currentUser.stats);
      console.log('User Preferences:', currentUser.preferences);
    }
    
    console.groupEnd();

    // ==================== DEMO VOCABULARIES ====================
    console.group('📚 Demo Vocabulary Management');
    
    const vocabularies = learningService.getAllVocabularies();
    console.log('All Vocabularies:', vocabularies);
    
    if (vocabularies.length > 0) {
      const firstVocab = vocabularies[0];
      console.log('First Vocabulary:', firstVocab);
      console.log('Words in Vocabulary:', firstVocab.words);
      console.log('Vocabulary Progress:', firstVocab.getProgressPercentage() + '%');
    }
    
    console.groupEnd();

    // ==================== DEMO WORDS ====================
    console.group('📝 Demo Word Management');
    
    const allWords = learningService.searchWords('');
    console.log('All Words:', allWords);
    
    const learnedWords = learningService.searchWords('', { learned: true });
    console.log('Learned Words:', learnedWords);
    
    const favoriteWords = learningService.getFavoriteWords();
    console.log('Favorite Words:', favoriteWords);
    
    // Demo tìm kiếm
    const searchResults = learningService.searchWords('beautiful');
    console.log('Search "beautiful":', searchResults);
    
    console.groupEnd();

    // ==================== DEMO COURSES ====================
    console.group('🎓 Demo Course Management');
    
    const courses = learningService.getAllCourses();
    console.log('All Courses:', courses);
    
    const inProgressCourses = learningService.getInProgressCourses();
    console.log('In Progress Courses:', inProgressCourses);
    
    if (courses.length > 0) {
      const firstCourse = courses[0];
      console.log('First Course:', firstCourse);
      console.log('Course Lessons:', firstCourse.lessons);
      console.log('Next Lesson:', learningService.getNextLesson(firstCourse.id));
    }
    
    console.groupEnd();

    // ==================== DEMO LEARNING SESSION ====================
    console.group('🎯 Demo Learning Session');
    
    if (vocabularies.length > 0) {
      const session = learningService.createVocabularyLearningSession(
        vocabularies[0].id, 
        'flashcard', 
        5
      );
      console.log('Learning Session Created:', session);
      
      // Giả lập học một từ
      if (session.words.length > 0) {
        const firstWord = session.words[0];
        console.log('Learning Word:', firstWord);
        
        // Giả lập trả lời đúng
        const result = learningService.updateLearningSession(session.id, firstWord.id, true);
        console.log('Learning Result:', result);
        
        // Hoàn thành session
        session.score.correct = 3;
        session.score.incorrect = 2;
        const sessionResult = learningService.completeLearningSession(session);
        console.log('Session Completed:', sessionResult);
      }
    }
    
    console.groupEnd();

    // ==================== DEMO STATISTICS ====================
    console.group('📊 Demo Statistics');
    
    const overallStats = learningService.getOverallStatistics();
    console.log('Overall Statistics:', overallStats);
    
    const dailyStats = learningService.getDailyStats();
    console.log('Daily Statistics:', dailyStats);
    
    const weeklyStats = learningService.getWeeklyStats();
    console.log('Weekly Statistics:', weeklyStats);
    
    console.groupEnd();

    // ==================== DEMO RECOMMENDATIONS ====================
    console.group('💡 Demo Recommendations');
    
    const recommendations = learningService.getLearningRecommendations();
    console.log('Learning Recommendations:', recommendations);
    
    console.groupEnd();

    // ==================== DEMO SEARCH ====================
    console.group('🔍 Demo Global Search');
    
    const searchResults2 = learningService.globalSearch('basic');
    console.log('Global Search "basic":', searchResults2);
    
    console.groupEnd();

    // ==================== DEMO DATA EXPORT/IMPORT ====================
    console.group('💾 Demo Data Management');
    
    const exportedData = learningService.exportAllData();
    console.log('Exported Data Sample:', {
      wordsCount: exportedData.words?.length || 0,
      vocabulariesCount: exportedData.vocabularies?.length || 0,
      coursesCount: exportedData.courses?.length || 0,
      usersCount: exportedData.users?.length || 0
    });
    
    console.groupEnd();

    console.log('✅ Demo completed successfully!');
    
    return {
      success: true,
      message: 'Demo completed successfully',
      data: {
        user: currentUser,
        vocabulariesCount: vocabularies.length,
        wordsCount: allWords.length,
        coursesCount: courses.length,
        overallStats
      }
    };

  } catch (error) {
    console.error('❌ Demo failed:', error);
    return {
      success: false,
      message: 'Demo failed',
      error: error.message
    };
  } finally {
    console.groupEnd();
  }
};

/**
 * Demo tạo dữ liệu mới
 */
export const demoCreateData = () => {
  console.group('🆕 DEMO TẠO DỮ LIỆU MỚI');

  try {
    // Tạo từ vựng mới
    const newWord = {
      id: Date.now(),
      word: 'Awesome',
      phonetic: '/ˈɔː.səm/',
      meaning: 'Tuyệt vời, đáng kinh ngạc',
      definition: 'Extremely impressive or daunting; inspiring awe',
      example: 'The view from the mountain was awesome.',
      exampleTranslation: 'Quang cảnh từ trên núi thật tuyệt vời.',
      level: 'intermediate',
      category: 'adjective',
      image: '🌟'
    };

    // Thêm từ vào vocabulary đầu tiên
    const vocabularies = learningService.getAllVocabularies();
    if (vocabularies.length > 0) {
      learningService.vocabularyManager.addWordToVocabulary(vocabularies[0].id, newWord);
      console.log('✅ Added new word to vocabulary:', newWord);
    }

    // Tạo vocabulary mới
    const newVocabulary = {
      id: Date.now() + 1,
      title: 'Từ vựng công nghệ',
      description: 'Từ vựng liên quan đến công nghệ thông tin',
      level: 'intermediate',
      color: 'purple',
      image: '💻',
      words: [
        {
          id: Date.now() + 10,
          word: 'Technology',
          phonetic: '/tekˈnɒl.ə.dʒi/',
          meaning: 'Công nghệ',
          definition: 'The application of scientific knowledge for practical purposes',
          example: 'Technology has changed our lives.',
          exampleTranslation: 'Công nghệ đã thay đổi cuộc sống của chúng ta.',
          level: 'intermediate',
          category: 'noun',
          image: '🔬'
        }
      ]
    };

    learningService.vocabularyManager.addVocabulary(newVocabulary);
    console.log('✅ Created new vocabulary:', newVocabulary);

    // Tạo khóa học mới
    const newCourse = {
      id: Date.now() + 2,
      title: 'Tiếng Anh giao tiếp',
      description: 'Học tiếng Anh giao tiếp cơ bản trong cuộc sống hàng ngày',
      level: 'basic',
      color: 'cyan',
      category: 'speaking',
      lessons: [
        {
          id: Date.now() + 20,
          title: 'Chào hỏi và giới thiệu',
          description: 'Học cách chào hỏi và giới thiệu bản thân',
          type: 'speaking',
          difficulty: 'basic',
          estimatedTime: 25
        }
      ]
    };

    learningService.courseManager.addCourse(newCourse);
    console.log('✅ Created new course:', newCourse);

    console.log('✅ Data creation demo completed successfully!');
    
    return {
      success: true,
      message: 'Data creation completed',
      createdItems: {
        word: newWord,
        vocabulary: newVocabulary,
        course: newCourse
      }
    };

  } catch (error) {
    console.error('❌ Data creation demo failed:', error);
    return {
      success: false,
      message: 'Data creation failed',
      error: error.message
    };
  } finally {
    console.groupEnd();
  }
};

/**
 * Demo cập nhật tiến độ học tập
 */
export const demoLearningProgress = () => {
  console.group('📈 DEMO CẬP NHẬT TIẾN ĐỘ HỌC TẬP');

  try {
    const user = learningService.getCurrentUser();
    if (!user) {
      console.log('❌ No user logged in');
      return { success: false, message: 'No user logged in' };
    }

    console.log('Current User Stats Before:', user.stats);

    // Giả lập học 5 từ mới
    const progressUpdate = learningService.updateLearningProgress({
      wordsLearned: 5,
      studyTime: 30, // 30 minutes
      score: 85
    });

    console.log('Progress Update Result:', progressUpdate);
    console.log('Current User Stats After:', user.stats);

    if (progressUpdate.leveledUp) {
      console.log('🎉 User leveled up to:', user.level);
    }

    return {
      success: true,
      message: 'Learning progress updated',
      data: progressUpdate
    };

  } catch (error) {
    console.error('❌ Learning progress demo failed:', error);
    return {
      success: false,
      message: 'Learning progress update failed',
      error: error.message
    };
  } finally {
    console.groupEnd();
  }
};

// Export tất cả demo functions
export default {
  demoLearningSystem,
  demoCreateData,
  demoLearningProgress
};

import { useState, useEffect, useCallback } from 'react';
import { learningService } from '../services';

/**
 * Hook để quản lý learning service
 */
export const useLearningService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Helper function để xử lý async operations
  const handleAsync = useCallback(async (operation) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await operation();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    // State
    isLoading,
    error,
    
    // Learning Service Instance
    service: learningService,
    
    // Helper
    handleAsync,

    // Clear error
    clearError: () => setError(null)
  };
};

/**
 * Hook để quản lý vocabularies
 */
export const useVocabularies = () => {
  const [vocabularies, setVocabularies] = useState([]);
  const [selectedVocabulary, setSelectedVocabulary] = useState(null);
  const { isLoading, error, handleAsync, clearError } = useLearningService();

  // Load vocabularies
  const loadVocabularies = useCallback(() => {
    try {
      const data = learningService.getAllVocabularies();
      setVocabularies(data);
      return data;
    } catch (err) {
      console.error('Error loading vocabularies:', err);
      return [];
    }
  }, []);

  // Get vocabulary by ID
  const getVocabulary = useCallback((id) => {
    return learningService.getVocabulary(id);
  }, []);

  // Get words from vocabulary
  const getWordsFromVocabulary = useCallback((vocabId, filters = {}) => {
    return learningService.getWordsFromVocabulary(vocabId, filters);
  }, []);

  // Get random words
  const getRandomWords = useCallback((vocabId, count = 10) => {
    return learningService.getRandomWordsFromVocabulary(vocabId, count);
  }, []);

  // Update word progress
  const updateWordProgress = useCallback(async (wordId, isCorrect) => {
    return handleAsync(() => {
      const result = learningService.updateWordReview(wordId, isCorrect);
      loadVocabularies(); // Reload to get updated data
      return result;
    });
  }, [handleAsync, loadVocabularies]);

  // Toggle favorite
  const toggleFavorite = useCallback((wordId) => {
    const result = learningService.toggleFavoriteWord(wordId);
    loadVocabularies(); // Reload to get updated data
    return result;
  }, [loadVocabularies]);

  // Load data on mount
  useEffect(() => {
    loadVocabularies();
  }, [loadVocabularies]);

  return {
    // Data
    vocabularies,
    selectedVocabulary,
    
    // Actions
    loadVocabularies,
    getVocabulary,
    getWordsFromVocabulary,
    getRandomWords,
    updateWordProgress,
    toggleFavorite,
    setSelectedVocabulary,
    
    // State
    isLoading,
    error,
    clearError
  };
};

/**
 * Hook để quản lý courses
 */
export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { isLoading, error, handleAsync, clearError } = useLearningService();

  // Load courses
  const loadCourses = useCallback(() => {
    try {
      const data = learningService.getAllCourses();
      setCourses(data);
      return data;
    } catch (err) {
      console.error('Error loading courses:', err);
      return [];
    }
  }, []);

  // Get course by ID
  const getCourse = useCallback((id) => {
    return learningService.getCourse(id);
  }, []);

  // Get next lesson
  const getNextLesson = useCallback((courseId) => {
    return learningService.getNextLesson(courseId);
  }, []);

  // Complete lesson
  const completeLesson = useCallback(async (courseId, lessonId, score = null) => {
    return handleAsync(() => {
      const result = learningService.completeLesson(courseId, lessonId, score);
      loadCourses(); // Reload to get updated data
      return result;
    });
  }, [handleAsync, loadCourses]);

  // Get courses by status
  const getInProgressCourses = useCallback(() => {
    return learningService.getInProgressCourses();
  }, []);

  const getCompletedCourses = useCallback(() => {
    return learningService.courseManager.getCompletedCourses();
  }, []);

  // Load data on mount
  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  return {
    // Data
    courses,
    selectedCourse,
    
    // Actions
    loadCourses,
    getCourse,
    getNextLesson,
    completeLesson,
    getInProgressCourses,
    getCompletedCourses,
    setSelectedCourse,
    
    // State
    isLoading,
    error,
    clearError
  };
};

/**
 * Hook để quản lý user và statistics
 */
export const useUser = () => {
  const [user, setUser] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const { isLoading, error, handleAsync, clearError } = useLearningService();

  // Load user data
  const loadUser = useCallback(() => {
    try {
      const currentUser = learningService.getCurrentUser();
      setUser(currentUser);
      return currentUser;
    } catch (err) {
      console.error('Error loading user:', err);
      return null;
    }
  }, []);

  // Load statistics
  const loadStatistics = useCallback(() => {
    try {
      const stats = learningService.getOverallStatistics();
      setStatistics(stats);
      return stats;
    } catch (err) {
      console.error('Error loading statistics:', err);
      return null;
    }
  }, []);

  // Update learning progress
  const updateProgress = useCallback(async (progressData) => {
    return handleAsync(() => {
      const result = learningService.updateLearningProgress(progressData);
      loadUser(); // Reload user to get updated stats
      loadStatistics(); // Reload stats
      return result;
    });
  }, [handleAsync, loadUser, loadStatistics]);

  // Update preferences
  const updatePreferences = useCallback(async (preferences) => {
    return handleAsync(() => {
      const result = learningService.updateCurrentUserPreferences(preferences);
      loadUser(); // Reload user to get updated preferences
      return result;
    });
  }, [handleAsync, loadUser]);

  // Get daily stats
  const getDailyStats = useCallback(() => {
    return learningService.getDailyStats();
  }, []);

  // Get weekly stats
  const getWeeklyStats = useCallback(() => {
    return learningService.getWeeklyStats();
  }, []);

  // Get recommendations
  const getRecommendations = useCallback(() => {
    return learningService.getLearningRecommendations();
  }, []);

  // Load data on mount
  useEffect(() => {
    loadUser();
    loadStatistics();
  }, [loadUser, loadStatistics]);

  return {
    // Data
    user,
    statistics,
    
    // Actions
    loadUser,
    loadStatistics,
    updateProgress,
    updatePreferences,
    getDailyStats,
    getWeeklyStats,
    getRecommendations,
    
    // State
    isLoading,
    error,
    clearError
  };
};

/**
 * Hook để quản lý learning session
 */
export const useLearningSession = () => {
  const [session, setSession] = useState(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const { isLoading, error, handleAsync, clearError } = useLearningService();

  // Create session
  const createSession = useCallback((vocabId, method = 'flashcard', wordCount = 10) => {
    try {
      const newSession = learningService.createVocabularyLearningSession(vocabId, method, wordCount);
      setSession(newSession);
      setCurrentWordIndex(0);
      setScore({ correct: 0, incorrect: 0 });
      return newSession;
    } catch (err) {
      console.error('Error creating session:', err);
      return null;
    }
  }, []);

  // Answer word
  const answerWord = useCallback(async (wordId, isCorrect) => {
    return handleAsync(() => {
      const result = learningService.updateLearningSession(session?.id, wordId, isCorrect);
      
      // Update score
      setScore(prev => ({
        ...prev,
        [isCorrect ? 'correct' : 'incorrect']: prev[isCorrect ? 'correct' : 'incorrect'] + 1
      }));
      
      return result;
    });
  }, [handleAsync, session?.id]);

  // Next word
  const nextWord = useCallback(() => {
    if (session && currentWordIndex < session.words.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
      return true;
    }
    return false;
  }, [session, currentWordIndex]);

  // Previous word
  const previousWord = useCallback(() => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(prev => prev - 1);
      return true;
    }
    return false;
  }, [currentWordIndex]);

  // Complete session
  const completeSession = useCallback(async () => {
    if (!session) return null;

    return handleAsync(() => {
      const sessionWithScore = { ...session, score };
      const result = learningService.completeLearningSession(sessionWithScore);
      setSession(null);
      setCurrentWordIndex(0);
      setScore({ correct: 0, incorrect: 0 });
      return result;
    });
  }, [handleAsync, session, score]);

  // Reset session
  const resetSession = useCallback(() => {
    setSession(null);
    setCurrentWordIndex(0);
    setScore({ correct: 0, incorrect: 0 });
  }, []);

  // Get current word
  const getCurrentWord = useCallback(() => {
    return session?.words[currentWordIndex] || null;
  }, [session, currentWordIndex]);

  // Get progress
  const getProgress = useCallback(() => {
    if (!session) return 0;
    return Math.round(((currentWordIndex + 1) / session.words.length) * 100);
  }, [session, currentWordIndex]);

  return {
    // Data
    session,
    currentWordIndex,
    score,
    currentWord: getCurrentWord(),
    progress: getProgress(),
    
    // Actions
    createSession,
    answerWord,
    nextWord,
    previousWord,
    completeSession,
    resetSession,
    
    // State
    isLoading,
    error,
    clearError
  };
};

/**
 * Hook để tìm kiếm
 */
export const useSearch = () => {
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Global search
  const globalSearch = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults(null);
      return null;
    }

    setIsSearching(true);
    try {
      const results = learningService.globalSearch(query);
      setSearchResults(results);
      return results;
    } catch (err) {
      console.error('Error searching:', err);
      return null;
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Search words
  const searchWords = useCallback((query, filters = {}) => {
    return learningService.searchWords(query, filters);
  }, []);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchResults(null);
  }, []);

  return {
    // Data
    searchResults,
    
    // Actions
    globalSearch,
    searchWords,
    clearSearch,
    
    // State
    isSearching
  };
};

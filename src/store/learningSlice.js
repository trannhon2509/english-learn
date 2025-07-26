import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  vocabularies: [],
  studyVocabularies: [],
  currentVocabulary: null,
  learningSession: {
    active: false,
    startTime: null,
    endTime: null,
    score: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    type: null,
  },
  progress: {
    vocabulary: {
      totalWords: 0,
      learnedWords: 0,
      masteredWords: 0,
    },
    grammar: {
      totalLessons: 0,
      completedLessons: 0,
    },
    listening: {
      totalExercises: 0,
      completedExercises: 0,
    },
    pronunciation: {
      totalWords: 0,
      practicedWords: 0,
    },
  },
  statistics: {
    dailyGoal: 30, // minutes
    dailyProgress: 0,
    weeklyStats: [],
    monthlyStats: [],
  },
};

const learningSlice = createSlice({
  name: 'learning',
  initialState,
  reducers: {
    setVocabularies: (state, action) => {
      state.vocabularies = action.payload;
    },
    setStudyVocabularies: (state, action) => {
      state.studyVocabularies = action.payload;
    },
    addVocabulary: (state, action) => {
      state.vocabularies.push(action.payload);
    },
    updateVocabulary: (state, action) => {
      const index = state.vocabularies.findIndex(vocab => vocab.id === action.payload.id);
      if (index !== -1) {
        state.vocabularies[index] = { ...state.vocabularies[index], ...action.payload };
      }
    },
    setCurrentVocabulary: (state, action) => {
      state.currentVocabulary = action.payload;
    },
    startLearningSession: (state, action) => {
      state.learningSession = {
        active: true,
        startTime: new Date().toISOString(),
        endTime: null,
        score: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        type: action.payload.type,
      };
    },
    endLearningSession: (state, action) => {
      state.learningSession.active = false;
      state.learningSession.endTime = new Date().toISOString();
      state.learningSession = { ...state.learningSession, ...action.payload };
    },
    updateSessionProgress: (state, action) => {
      const { correct, total } = action.payload;
      state.learningSession.correctAnswers = correct;
      state.learningSession.totalQuestions = total;
      state.learningSession.score = total > 0 ? Math.round((correct / total) * 100) : 0;
    },
    updateProgress: (state, action) => {
      const { type, data } = action.payload;
      state.progress[type] = { ...state.progress[type], ...data };
    },
    updateDailyProgress: (state, action) => {
      state.statistics.dailyProgress = action.payload;
    },
    setDailyGoal: (state, action) => {
      state.statistics.dailyGoal = action.payload;
    },
    addWeeklyStats: (state, action) => {
      state.statistics.weeklyStats.push(action.payload);
    },
    resetLearningSession: (state) => {
      state.learningSession = initialState.learningSession;
    },
  },
});

export const {
  setVocabularies,
  setStudyVocabularies,
  addVocabulary,
  updateVocabulary,
  setCurrentVocabulary,
  startLearningSession,
  endLearningSession,
  updateSessionProgress,
  updateProgress,
  updateDailyProgress,
  setDailyGoal,
  addWeeklyStats,
  resetLearningSession,
} = learningSlice.actions;

export default learningSlice.reducer;

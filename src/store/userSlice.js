import { createSlice } from '@reduxjs/toolkit';
import { LOCAL_STORAGE_KEYS } from '../constants';

const initialState = {
  user: null,
  isAuthenticated: false,
  profile: {
    name: '',
    email: '',
    avatar: '',
    level: 'beginner',
    totalLearningTime: 0,
    streak: 0,
  },
  settings: {
    theme: 'light',
    language: 'vi',
    notifications: true,
    soundEnabled: true,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    updateSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
      // Save to localStorage
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER_SETTINGS, JSON.stringify(state.settings));
    },
    incrementStreak: (state) => {
      state.profile.streak += 1;
    },
    resetStreak: (state) => {
      state.profile.streak = 0;
    },
    addLearningTime: (state, action) => {
      state.profile.totalLearningTime += action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.profile = initialState.profile;
    },
    loadUserSettings: (state) => {
      const savedSettings = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_SETTINGS);
      if (savedSettings) {
        state.settings = { ...state.settings, ...JSON.parse(savedSettings) };
      }
    },
  },
});

export const {
  setUser,
  updateProfile,
  updateSettings,
  incrementStreak,
  resetStreak,
  addLearningTime,
  logout,
  loadUserSettings,
} = userSlice.actions;

export default userSlice.reducer;

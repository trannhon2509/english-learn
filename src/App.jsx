import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { useDispatch } from 'react-redux';
import viVN from 'antd/locale/vi_VN';
import { loadUserSettings } from './store/userSlice';
import { BasicLayout, LearnLayout } from './layouts';
import { ROUTES } from './constants/routes';
import { THEME_CONFIG } from './constants';
import HomePage from './pages/HomePage';
import LearnWelcomePage from './pages/LearnWelcomePage';
import VocabularyPage from './pages/VocabularyPage';
import GrammarPage from './pages/GrammarPage';
import ListeningPage from './pages/ListeningPage';
import PronunciationPage from './pages/PronunciationPage';
import ProfilePage from './pages/ProfilePage';
import './App.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserSettings());
  }, [dispatch]);

  const antdTheme = {
    token: {
      colorPrimary: THEME_CONFIG.PRIMARY_COLOR,
      borderRadius: parseInt(THEME_CONFIG.BORDER_RADIUS),
      boxShadow: THEME_CONFIG.BOX_SHADOW,
    },
    components: {
      Layout: {
        headerBg: 'rgba(255, 255, 255, 0.95)',
        bodyBg: 'transparent',
        footerBg: 'rgba(0, 0, 0, 0.8)',
      },
      Menu: {
        itemBg: 'transparent',
        subMenuItemBg: 'transparent',
        itemHoverBg: 'rgba(24, 144, 255, 0.1)',
        itemSelectedBg: THEME_CONFIG.PRIMARY_COLOR,
      },
      Button: {
        borderRadius: parseInt(THEME_CONFIG.BORDER_RADIUS),
        controlHeight: 40,
      },
      Card: {
        borderRadius: parseInt(THEME_CONFIG.BORDER_RADIUS),
        boxShadow: THEME_CONFIG.BOX_SHADOW,
      },
    },
  };

  return (
    <ConfigProvider locale={viVN} theme={antdTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<BasicLayout />}>
            <Route index element={<HomePage />} />
            <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          </Route>
          <Route path="/learn" element={<LearnLayout />}>
            <Route index element={<LearnWelcomePage />} />
            <Route path="vocabulary" element={<VocabularyPage />} />
            <Route path="grammar" element={<GrammarPage />} />
            <Route path="listening" element={<ListeningPage />} />
            <Route path="pronunciation" element={<PronunciationPage />} />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import viVN from 'antd/locale/vi_VN';
import { BasicLayout, ListLayout } from './layouts';
import HomePage from './pages/HomePage';
import LearnPage from './pages/LearnPage';
import VocabularyPage from './pages/VocabularyPage';
import GrammarPage from './pages/GrammarPage';
import ListeningPage from './pages/ListeningPage';
import PronunciationPage from './pages/PronunciationPage';
import ProfilePage from './pages/ProfilePage';
import './App.css';

function App() {
  return (
    <ConfigProvider locale={viVN}>
      <Router>
        <Routes>
          {/* Routes using BasicLayout */}
          <Route
            path="/"
            element={
              <BasicLayout>
                <HomePage />
              </BasicLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <BasicLayout>
                <ProfilePage />
              </BasicLayout>
            }
          />
          
          {/* Routes using ListLayout */}
          <Route
            path="/learn"
            element={
              <ListLayout sidebarContent={LearnPage.sidebarContent}>
                <LearnPage />
              </ListLayout>
            }
          />
          <Route
            path="/vocabulary"
            element={
              <ListLayout sidebarContent={VocabularyPage.sidebarContent}>
                <VocabularyPage />
              </ListLayout>
            }
          />
          <Route
            path="/grammar"
            element={
              <ListLayout sidebarContent={GrammarPage.sidebarContent}>
                <GrammarPage />
              </ListLayout>
            }
          />
          <Route
            path="/listening"
            element={
              <ListLayout sidebarContent={ListeningPage.sidebarContent}>
                <ListeningPage />
              </ListLayout>
            }
          />
          <Route
            path="/pronunciation"
            element={
              <ListLayout sidebarContent={PronunciationPage.sidebarContent}>
                <PronunciationPage />
              </ListLayout>
            }
          />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;

import { lazy } from 'react';
import { ROUTES } from '@constants/routes';
import VocabularyStudyPage from '@pages/VocabularyStudyPage';

// Lazy load components for better performance
const HomePage = lazy(() => import('@pages/HomePage'));
const LearnPage = lazy(() => import('@pages/LearnPage'));
const VocabularyPage = lazy(() => import('@pages/VocabularyPage'));
const GrammarPage = lazy(() => import('@pages/GrammarPage'));
const ListeningPage = lazy(() => import('@pages/ListeningPage'));
const PronunciationPage = lazy(() => import('@pages/PronunciationPage'));
const ProfilePage = lazy(() => import('@pages/ProfilePage'));

export const routeComponents = {
  [ROUTES.HOME]: HomePage,
  [ROUTES.LEARN]: LearnPage,
  [ROUTES.VOCABULARY]: VocabularyPage,
  [ROUTES.GRAMMAR]: GrammarPage,
  [ROUTES.LISTENING]: ListeningPage,
  [ROUTES.PRONUNCIATION]: PronunciationPage,
  [ROUTES.PROFILE]: ProfilePage,
  [ROUTES.STUDY]: VocabularyStudyPage,
};

export const routesConfig = [
  {
    path: ROUTES.HOME,
    component: HomePage,
    exact: true,
    title: 'Trang chủ',
    description: 'Trang chủ của ứng dụng học tiếng Anh',
  },
  {
    path: ROUTES.LEARN,
    component: LearnPage,
    exact: true,
    title: 'Học tập',
    description: 'Bắt đầu hành trình học tiếng Anh',
  },
  {
    path: ROUTES.HOME,
    element: <HomePage />,
  },
  {
    path: ROUTES.LEARN,
    element: <LearnPage />,
  },
  {
    path: ROUTES.VOCABULARY,
    element: <VocabularyPage />,
  },
  {
    path: ROUTES.GRAMMAR,
    element: <GrammarPage />,
  },
  {
    path: ROUTES.LISTENING,
    element: <ListeningPage />,
  },
  {
    path: ROUTES.PRONUNCIATION,
    element: <PronunciationPage />,
  },
  {
    path: ROUTES.PROFILE,
    element: <ProfilePage />,
  },
  {
    path: ROUTES.STUDY,
    element: <VocabularyStudyPage />,
  },
  {
    path: ROUTES.PROFILE,
    component: ProfilePage,
    exact: true,
    title: 'Hồ sơ',
    description: 'Quản lý thông tin cá nhân',
  },
];

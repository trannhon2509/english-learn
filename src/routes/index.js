import { lazy } from 'react';
import { ROUTES } from '@constants/routes';

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
    path: ROUTES.VOCABULARY,
    component: VocabularyPage,
    exact: true,
    title: 'Từ vựng',
    description: 'Học và luyện tập từ vựng tiếng Anh',
  },
  {
    path: ROUTES.GRAMMAR,
    component: GrammarPage,
    exact: true,
    title: 'Ngữ pháp',
    description: 'Học ngữ pháp tiếng Anh',
  },
  {
    path: ROUTES.LISTENING,
    component: ListeningPage,
    exact: true,
    title: 'Nghe',
    description: 'Luyện tập kỹ năng nghe tiếng Anh',
  },
  {
    path: ROUTES.PRONUNCIATION,
    component: PronunciationPage,
    exact: true,
    title: 'Phát âm',
    description: 'Luyện tập phát âm tiếng Anh',
  },
  {
    path: ROUTES.PROFILE,
    component: ProfilePage,
    exact: true,
    title: 'Hồ sơ',
    description: 'Quản lý thông tin cá nhân',
  },
];

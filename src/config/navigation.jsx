import { 
  HomeOutlined, 
  BookOutlined, 
  UserOutlined
} from '@ant-design/icons';
import { ROUTES } from '../constants/routes';

export const navigationConfig = [
  {
    key: ROUTES.HOME,
    path: ROUTES.HOME,
    icon: <HomeOutlined />,
    label: 'Trang chủ',
    showInMenu: true,
    showInMobile: true,
  },
  {
    key: ROUTES.LEARN,
    path: ROUTES.LEARN,
    icon: <BookOutlined />,
    label: 'Học tập',
    showInMenu: true,
    showInMobile: true,
  },
  {
    key: ROUTES.PROFILE,
    path: ROUTES.PROFILE,
    icon: <UserOutlined />,
    label: 'Hồ sơ',
    showInMenu: true,
    showInMobile: true,
  },
];

export const getMenuItems = (isMobile = false) => {
  return navigationConfig
    .filter(item => isMobile ? item.showInMobile : item.showInMenu)
    .map(item => ({
      key: item.key,
      icon: item.icon,
      label: item.label,
    }));
};

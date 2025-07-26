import React from 'react';
import { Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  BookOutlined,
  PlayCircleOutlined,
  RocketOutlined,
  HeartOutlined,
  StarOutlined,
  AudioOutlined,
  ReadOutlined,
  MessageOutlined,
  SoundOutlined,
  TrophyOutlined
} from '@ant-design/icons';
import { ROUTES } from '@constants/routes';
import styles from '@css/HomePage.module.css';
import FeatureCard from '@components/ui/FeatureCard';
import StatItem from '@components/ui/StatItem';

const { Title, Paragraph } = Typography;

// 1. Hero Section Component
const HeroSection = React.memo(() => (
  <section className={styles.heroSection}>
    <Title level={1} className={styles.heroTitle}>
      Nâng cao tiếng Anh của bạn
    </Title>
    <Paragraph className={styles.heroSubtitle}>
      Học tiếng Anh hiệu quả với phương pháp khoa học, công nghệ AI và trải nghiệm tương tác hấp dẫn.
      Từ cơ bản đến nâng cao, chúng tôi đồng hành cùng bạn trên mọi bước đường.
    </Paragraph>
    <div className={styles.heroButtons}>
      <Link to={ROUTES.LEARN}>
        <Button
          type="primary"
          size="large"
          icon={<RocketOutlined />}
          className={styles.primaryButton}
        >
          Bắt đầu học ngay
        </Button>
      </Link>
      <Link to={ROUTES.VOCABULARY}>
        <Button
          size="large"
          icon={<BookOutlined />}
          className={styles.secondaryButton}
        >
          Khám phá từ vựng
        </Button>
      </Link>
    </div>
  </section>
));

// 2. Features Section Component
const FeaturesSection = React.memo(() => {
  const { isAuthenticated } = useSelector((state) => state.user);

  const features = [
    {
      icon: <ReadOutlined className={styles.featureIcon} />,
      title: 'Học từ vựng thông minh',
      description: 'Hệ thống AI giúp bạn học từ vựng hiệu quả với phương pháp lặp lại ngắt quãng và thẻ ghi nhớ thông minh.',
    },
    {
      icon: <MessageOutlined className={styles.featureIcon} />,
      title: 'Ngữ pháp dễ hiểu',
      description: 'Học ngữ pháp qua các bài giảng sinh động với ví dụ thực tế và bài tập tương tác.',
    },
    {
      icon: <AudioOutlined className={styles.featureIcon} />,
      title: 'Luyện nghe chuyên sâu',
      description: 'Cải thiện kỹ năng nghe với âm thanh chuẩn từ người bản xứ và bài tập đa dạng.',
    },
    {
      icon: <SoundOutlined className={styles.featureIcon} />,
      title: 'Phát âm chuẩn xác',
      description: 'Công nghệ nhận dạng giọng nói giúp bạn luyện phát âm và sửa lỗi ngay lập tức.',
    },
    {
      icon: <TrophyOutlined className={styles.featureIcon} />,
      title: 'Theo dõi tiến độ',
      description: 'Thống kê chi tiết về quá trình học tập và đạt được các mục tiêu cá nhân.',
    },
    {
      icon: <HeartOutlined className={styles.featureIcon} />,
      title: 'Học tập vui vẻ',
      description: 'Gamification giúp việc học trở nên thú vị với điểm số, huy hiệu và thử thách.',
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Từ vựng' },
    { number: '500+', label: 'Bài học' },
    { number: '50,000+', label: 'Học viên' },
    { number: '95%', label: 'Hài lòng' },
  ];

  return (
    <section className={styles.featuresSection}>
      <Title level={2} className={styles.sectionTitle}>
        Tại sao chọn English Learn?
      </Title>
      <Paragraph className={styles.sectionSubtitle}>
        Chúng tôi cung cấp trải nghiệm học tập toàn diện với công nghệ hiện đại
      </Paragraph>
      <div className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
      <Paragraph style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '18px' }}>
        Những con số ấn tượng từ cộng đồng English Learn
      </Paragraph>
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <StatItem key={index} {...stat} />
        ))}
      </div>
      <Paragraph className={styles.ctaDescription}>
        Tham gia cùng hàng ngàn học viên đã cải thiện tiếng Anh với English Learn.
        Bắt đầu miễn phí ngay hôm nay!
      </Paragraph>
      <div className={styles.heroButtons}>
        <Link to={ROUTES.LEARN}>
          <Button
            type="primary"
            size="large"
            icon={<PlayCircleOutlined />}
            className={styles.primaryButton}
          >
            Học miễn phí
          </Button>
        </Link>
        {!isAuthenticated && (
          <Link to={ROUTES.PROFILE}>
            <Button
              size="large"
              icon={<StarOutlined />}
              className={styles.secondaryButton}
            >
              Tạo tài khoản
            </Button>
          </Link>
        )}
      </div>
    </section>
  );
});

// 3. Main Page Component
const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
    </div>
  );
};

export default HomePage;
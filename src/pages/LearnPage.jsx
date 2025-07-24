import React, { useState, useEffect } from 'react';
import { Card, List, Button, Tag, Progress, Typography } from 'antd';
import { BookOutlined, PlayCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { learningService } from '../services';

const { Title } = Typography;

const LearnPage = () => {
  const [learningOptions, setLearningOptions] = useState([]);
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    // Tải dữ liệu từ service
    const loadData = () => {
      try {
        const stats = learningService.getOverallStatistics();
        setStatistics(stats);

        // Tạo danh sách các lựa chọn học với thống kê
        const options = [
          {
            id: 'vocabulary',
            title: 'Học từ vựng',
            description: 'Mở rộng vốn từ vựng tiếng Anh',
            icon: <BookOutlined />,
            link: '/vocabulary',
            level: 'basic',
            completed: stats?.words?.learned || 0,
            totalLessons: stats?.words?.total || 0,
            progress: stats?.words?.total > 0 ? Math.round((stats.words.learned / stats.words.total) * 100) : 0
          },
          {
            id: 'grammar',
            title: 'Học ngữ pháp',
            description: 'Nắm vững các quy tắc ngữ pháp',
            icon: <CheckCircleOutlined />,
            link: '/grammar',
            level: 'intermediate',
            completed: stats?.courses?.byCategory?.grammar || 0,
            totalLessons: 50, // Giả định tổng số bài ngữ pháp
            progress: stats?.courses?.byCategory?.grammar ? Math.round((stats.courses.byCategory.grammar / 50) * 100) : 0
          },
          {
            id: 'listening',
            title: 'Luyện nghe',
            description: 'Cải thiện kỹ năng nghe hiểu',
            icon: <PlayCircleOutlined />,
            link: '/listening',
            level: 'intermediate',
            completed: stats?.courses?.byCategory?.listening || 0,
            totalLessons: 30, // Giả định tổng số bài nghe
            progress: stats?.courses?.byCategory?.listening ? Math.round((stats.courses.byCategory.listening / 30) * 100) : 0
          },
          {
            id: 'pronunciation',
            title: 'Học phát âm',
            description: 'Luyện phát âm chuẩn xác',
            icon: <BookOutlined />,
            link: '/pronunciation',
            level: 'advanced',
            completed: stats?.courses?.byCategory?.pronunciation || 0,
            totalLessons: 25, // Giả định tổng số bài phát âm
            progress: stats?.courses?.byCategory?.pronunciation ? Math.round((stats.courses.byCategory.pronunciation / 25) * 100) : 0
          }
        ];

        setLearningOptions(options);
      } catch (error) {
        console.error('Error loading learning data:', error);
      }
    };

    loadData();
  }, []);

  // Hàm lấy màu theo level
  const getLevelColor = (level) => {
    const colors = {
      'basic': 'green',
      'intermediate': 'blue', 
      'advanced': 'orange'
    };
    return colors[level] || 'default';
  };

  // Hàm lấy tên level tiếng Việt
  const getLevelName = (level) => {
    const names = {
      'basic': 'Cơ bản',
      'intermediate': 'Trung bình',
      'advanced': 'Nâng cao'
    };
    return names[level] || level;
  };



  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Title level={2}>Lựa chọn học tập</Title>
        <p>Chọn kỹ năng bạn muốn cải thiện</p>
      </div>

      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 2,
          xxl: 3,
        }}
        dataSource={learningOptions}
        renderItem={option => (
          <List.Item>
            <Card
              hoverable
              style={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
              bodyStyle={{ 
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
              actions={[
                option.link ? (
                  <Link to={option.link} key="learn-button">
                    <Button type="primary" icon={<PlayCircleOutlined />}>
                      Bắt đầu học
                    </Button>
                  </Link>
                ) : (
                  <Button key="learn-button" type="primary" icon={<PlayCircleOutlined />}>
                    Bắt đầu học
                  </Button>
                )
              ]}
            >
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Card.Meta
                  avatar={<div style={{ fontSize: '24px', color: '#1890ff' }}>{option.icon}</div>}
                  title={option.title}
                  description={
                    <div style={{ 
                      minHeight: '48px',
                      display: 'flex',
                      alignItems: 'flex-start'
                    }}>
                      {option.description}
                    </div>
                  }
                />
                <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <Tag color={getLevelColor(option.level)}>{getLevelName(option.level)}</Tag>
                    <span>{option.completed}/{option.totalLessons} bài</span>
                  </div>
                  <Progress percent={option.progress} />
                </div>
              </div>
            </Card>
          </List.Item>
        )}
      />

      <style jsx>{`
        .sidebar-item:hover {
          background-color: #f0f8ff;
          padding-left: 8px !important;
          padding-right: 8px !important;
        }
      `}</style>
    </div>
  );
};

// Export both the component and sidebar content
const SidebarContent = () => {
  const [sidebarStats, setSidebarStats] = useState(null);

  useEffect(() => {
    try {
      const stats = learningService.getOverallStatistics();
      setSidebarStats(stats);
    } catch (error) {
      console.error('Error loading sidebar stats:', error);
    }
  }, []);

  return (
    <div>
      <Title level={4}>Thống kê học tập</Title>
      <List
        size="small"
        dataSource={[
          { 
            name: 'Tổng từ vựng đã học', 
            count: sidebarStats?.words?.learned || 0, 
            total: sidebarStats?.words?.total || 0,
            icon: <BookOutlined />, 
            link: '/vocabulary' 
          },
          { 
            name: 'Ngữ pháp đã học', 
            count: sidebarStats?.courses?.byCategory?.grammar || 0, 
            total: 50, // Tổng số bài ngữ pháp
            icon: <CheckCircleOutlined /> 
          },
          { 
            name: 'Bài nghe đã hoàn thành', 
            count: sidebarStats?.courses?.byCategory?.listening || 0, 
            total: 30, // Tổng số bài nghe
            icon: <PlayCircleOutlined /> 
          },
          { 
            name: 'Phát âm đã học', 
            count: sidebarStats?.courses?.byCategory?.pronunciation || 0, 
            total: 25, // Tổng số bài phát âm
            icon: <BookOutlined /> 
          }
        ]}
        renderItem={item => (
          <List.Item
            style={{
              padding: '12px 0',
              cursor: item.link ? 'pointer' : 'default',
              borderRadius: '4px',
              marginBottom: '8px',
              borderLeft: '3px solid #1890ff',
              paddingLeft: '12px',
              backgroundColor: '#fafafa'
            }}
            className="sidebar-item"
          >
            {item.link ? (
              <Link to={item.link} style={{ display: 'block', width: '100%', textDecoration: 'none' }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ marginRight: '8px', color: '#1890ff' }}>
                      {item.icon}
                    </span>
                    <span style={{ flex: 1, color: 'inherit', fontWeight: '500' }}>{item.name}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#666' }}>
                      {item.count}/{item.total}
                    </span>
                    <Tag color="blue">{Math.round((item.count / item.total) * 100) || 0}%</Tag>
                  </div>
                </div>
              </Link>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ marginRight: '8px', color: '#1890ff' }}>
                    {item.icon}
                  </span>
                  <span style={{ flex: 1, fontWeight: '500' }}>{item.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#666' }}>
                    {item.count}/{item.total}
                  </span>
                  <Tag color="blue">{Math.round((item.count / item.total) * 100) || 0}%</Tag>
                </div>
              </div>
            )}
          </List.Item>
        )}
      />
      
      <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#f0f8ff', borderRadius: '8px' }}>
        <Title level={5}>Tổng quan tiến độ</Title>
        <div style={{ marginBottom: '12px' }}>
          <p style={{ margin: '0 0 4px 0' }}>Từ vựng: <strong>{sidebarStats?.words?.learned || 0}/{sidebarStats?.words?.total || 0}</strong></p>
          <Progress 
            percent={sidebarStats?.words?.total > 0 ? Math.round((sidebarStats.words.learned / sidebarStats.words.total) * 100) : 0} 
            size="small" 
            strokeColor="#52c41a"
          />
        </div>
        
        <div style={{ marginBottom: '12px' }}>
          <p style={{ margin: '0 0 4px 0' }}>Ngữ pháp: <strong>{sidebarStats?.courses?.byCategory?.grammar || 0}/50</strong></p>
          <Progress 
            percent={Math.round(((sidebarStats?.courses?.byCategory?.grammar || 0) / 50) * 100)} 
            size="small" 
            strokeColor="#1890ff"
          />
        </div>

        <div style={{ marginBottom: '12px' }}>
          <p style={{ margin: '0 0 4px 0' }}>Luyện nghe: <strong>{sidebarStats?.courses?.byCategory?.listening || 0}/30</strong></p>
          <Progress 
            percent={Math.round(((sidebarStats?.courses?.byCategory?.listening || 0) / 30) * 100)} 
            size="small" 
            strokeColor="#faad14"
          />
        </div>

        <div>
          <p style={{ margin: '0 0 4px 0' }}>Phát âm: <strong>{sidebarStats?.courses?.byCategory?.pronunciation || 0}/25</strong></p>
          <Progress 
            percent={Math.round(((sidebarStats?.courses?.byCategory?.pronunciation || 0) / 25) * 100)} 
            size="small" 
            strokeColor="#722ed1"
          />
        </div>
      </div>
    </div>
  );
};

LearnPage.sidebarContent = <SidebarContent />;

export default LearnPage;

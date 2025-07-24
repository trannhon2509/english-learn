# Hệ Thống Model và Manager - English Learning App

## 📋 Tổng Quan

Hệ thống này được xây dựng theo mô hình hướng đối tượng (OOP) để quản lý toàn bộ dữ liệu và logic của ứng dụng học tiếng Anh. Bao gồm các Models, Managers và Services để xử lý:

- **Từ vựng (Words)**
- **Kho từ vựng (Vocabularies)**  
- **Khóa học (Courses)**
- **Người dùng (Users)**
- **Phiên học tập (Learning Sessions)**

## 🏗️ Kiến Trúc

```
src/
├── models/           # Các class model
│   ├── Word.js
│   ├── Vocabulary.js
│   ├── Course.js
│   ├── User.js
│   └── index.js
├── managers/         # Các class quản lý
│   ├── WordManager.js
│   ├── VocabularyManager.js
│   ├── CourseManager.js
│   ├── UserManager.js
│   └── index.js
├── services/         # Service tổng hợp
│   ├── LearningService.js
│   ├── demo.js
│   └── index.js
└── hooks/           # React hooks
    ├── useLearningService.js
    └── index.js
```

## 📚 Models

### Word Model
Đại diện cho một từ vựng với các thuộc tính:
- `id`, `word`, `phonetic`, `meaning`, `definition`
- `example`, `exampleTranslation`, `level`, `category`
- `image`, `learned`, `acceptedAnswers`, `hint`
- `reviewCount`, `correctCount`

**Phương thức chính:**
- `markAsLearned()` - Đánh dấu đã học
- `updateReview(isCorrect)` - Cập nhật kết quả ôn tập
- `getAccuracyRate()` - Tính tỷ lệ đúng
- `isAnswerCorrect(answer)` - Kiểm tra đáp án

### Vocabulary Model
Đại diện cho một kho từ vựng:
- `id`, `title`, `description`, `image`, `level`, `color`
- `words[]` - Mảng các Word instances

**Phương thức chính:**
- `addWord(word)` - Thêm từ
- `getProgressPercentage()` - Tính tiến độ
- `searchWords(query)` - Tìm kiếm từ
- `getRandomWords(count)` - Lấy từ ngẫu nhiên

### Course & Lesson Models
Đại diện cho khóa học và bài học:
- Course: `id`, `title`, `description`, `lessons[]`, `progress`
- Lesson: `id`, `title`, `content`, `completed`, `score`

**Phương thức chính:**
- `updateProgress()` - Cập nhật tiến độ
- `getNextLesson()` - Lấy bài học tiếp theo
- `markAsCompleted()` - Đánh dấu hoàn thành

### User Model
Đại diện cho người dùng:
- `id`, `name`, `email`, `level`, `preferences`, `stats`

**Phương thức chính:**
- `updateStats(statsUpdate)` - Cập nhật thống kê
- `levelUp()` - Lên level
- `getWeeklyStats()` - Thống kê tuần

## 🔧 Managers

### WordManager
Quản lý tất cả từ vựng trong hệ thống:
- `addWord()`, `updateWord()`, `deleteWord()`
- `searchWords(query, filters)`
- `toggleFavorite(wordId)`
- `getWordsForReview()`

### VocabularyManager  
Quản lý các kho từ vựng:
- `addVocabulary()`, `updateVocabulary()`
- `addWordToVocabulary(vocabId, word)`
- `getRandomWordsFromVocabulary()`

### CourseManager
Quản lý khóa học:
- `addCourse()`, `updateCourse()`
- `completeLesson(courseId, lessonId, score)`
- `getInProgressCourses()`

### UserManager
Quản lý người dùng:
- `createUser()`, `login()`, `logout()`
- `updateLearningStats()`
- `getAchievements(userId)`

## 🎯 LearningService

Service tổng hợp tích hợp tất cả managers:

```javascript
import { learningService } from './src/services';

// Lấy tất cả từ vựng
const vocabularies = learningService.getAllVocabularies();

// Tạo phiên học tập
const session = learningService.createVocabularyLearningSession(
  vocabularyId, 
  'flashcard', 
  10
);

// Cập nhật tiến độ
learningService.updateLearningProgress({
  wordsLearned: 5,
  studyTime: 30,
  score: 85
});
```

## 🎣 React Hooks

### useVocabularies
```javascript
const {
  vocabularies,
  selectedVocabulary,
  getWordsFromVocabulary,
  updateWordProgress,
  toggleFavorite
} = useVocabularies();
```

### useCourses
```javascript
const {
  courses,
  selectedCourse,
  completeLesson,
  getNextLesson
} = useCourses();
```

### useUser
```javascript
const {
  user,
  statistics,
  updateProgress,
  getDailyStats
} = useUser();
```

### useLearningSession
```javascript
const {
  session,
  currentWord,
  score,
  createSession,
  answerWord,
  completeSession
} = useLearningSession();
```

## 💾 Lưu Trữ Dữ Liệu

Tất cả dữ liệu được tự động lưu vào `localStorage`:
- `wordManager` - Từ vựng và yêu thích
- `vocabularyManager` - Kho từ vựng
- `courseManager` - Khóa học và tiến độ
- `userManager` - Người dùng và thống kê

## 🚀 Cách Sử Dụng

### 1. Trong React Component

```javascript
import { useVocabularies, useUser } from '../hooks';
import { learningService } from '../services';

const MyComponent = () => {
  const { vocabularies, updateWordProgress } = useVocabularies();
  const { user, updateProgress } = useUser();

  const handleWordLearned = async (wordId) => {
    await updateWordProgress(wordId, true);
    await updateProgress({ wordsLearned: 1, studyTime: 2 });
  };

  return (
    <div>
      {vocabularies.map(vocab => (
        <div key={vocab.id}>{vocab.title}</div>
      ))}
    </div>
  );
};
```

### 2. Trực Tiếp Với Service

```javascript
import { learningService } from '../services';

// Lấy thống kê tổng quan
const stats = learningService.getOverallStatistics();

// Tìm kiếm toàn cục
const results = learningService.globalSearch('beautiful');

// Tạo phiên học tập
const session = learningService.createVocabularyLearningSession(1, 'flashcard', 10);
```

### 3. Demo và Test

```javascript
import { demoLearningSystem, demoCreateData } from '../services/demo';

// Chạy demo đầy đủ
const result = demoLearningSystem();

// Tạo dữ liệu mới
const created = demoCreateData();
```

## 📊 Thống Kê và Báo Cáo

Hệ thống cung cấp các loại thống kê:
- **Tổng quan**: Từ vựng, khóa học, tiến độ
- **Hàng ngày**: Từ đã học, thời gian học
- **Tuần/Tháng**: Xu hướng và mục tiêu
- **Cá nhân**: Level, thành tích, chuỗi học

## 🔄 Import/Export

```javascript
// Export tất cả dữ liệu
const allData = learningService.exportAllData();

// Import dữ liệu
learningService.importAllData(importedData);

// Reset hệ thống
learningService.resetAllData();
```

## 🎮 Tính Năng Gaming

- **Level System**: Beginner → Intermediate → Advanced → Expert
- **Achievements**: Badges cho các mốc học tập
- **Streak**: Chuỗi học liên tiếp
- **Leaderboard**: Bảng xếp hạng
- **Daily Goals**: Mục tiêu hàng ngày

## 🛠️ Mở Rộng

### Thêm Model Mới
1. Tạo class trong `src/models/`
2. Implement các phương thức cần thiết
3. Tạo Manager tương ứng trong `src/managers/`
4. Tích hợp vào `LearningService`
5. Tạo hook nếu cần trong `src/hooks/`

### Thêm Tính Năng
1. Thêm phương thức vào Model/Manager
2. Cập nhật Service
3. Tạo/cập nhật hook
4. Sử dụng trong component

## 🔍 Debug và Monitoring

Tất cả operations được log ra console khi development:
- ✅ Success operations  
- ❌ Error operations
- 📊 Statistics updates
- 🔄 Data changes

Console developer tools để xem:
```javascript
// Xem service instance
console.log(learningService);

// Xem dữ liệu localStorage
console.log(localStorage.getItem('wordManager'));
```

---

## 📝 Lưu Ý

1. **LocalStorage**: Dữ liệu được lưu tự động, không cần database
2. **Performance**: Sử dụng Map/Set cho tìm kiếm nhanh
3. **Type Safety**: Sử dụng instanceof để validate
4. **Error Handling**: Tất cả operations đều có try/catch
5. **Immutability**: Không trực tiếp mutate state, sử dụng spread operator

Hệ thống này cung cấp foundation mạnh mẽ cho việc quản lý dữ liệu học tập, dễ mở rộng và bảo trì. 🚀

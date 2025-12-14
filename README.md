# Quiz Application - Systèmes Embarqués ⚡

A **professional-grade** interactive quiz application for embedded systems learning, featuring 200 questions across multiple categories with advanced features including dark mode, keyboard shortcuts, performance analytics, and much more!

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Features](https://img.shields.io/badge/features-12+-orange.svg)
![Status](https://img.shields.io/badge/status-production-success.svg)

## ⚡ Quick Feature Overview

| Feature | Description |
|---------|-------------|
|  Dark Mode | Toggle-able theme with smooth transitions |
|  Keyboard Shortcuts | 10 shortcuts for lightning-fast navigation |
|  Auto-Save | Never lose progress (saves every 30s) |
|  Sound Effects | Audio feedback for engagement |
|  Analytics | Performance tracking & insights |
|  Bookmarks | Mark difficult questions |
|  Confetti | Celebration animations |
|  Export | Download results as text |
|  Notifications | Elegant toast messages |
|  Timer | Track study time |
|  Animations | Professional transitions |
|  Mobile | Fully responsive design |

## 🌟 Features

### Dual Quiz Modes
- **Main Quiz (200 Questions)**: Complete quiz with 200 questions covering all topics
- **Random Quiz (20 Questions)**: Quick practice mode with 20 randomly selected questions

### Smart Learning Tools
- ✅ **Category Filtering**: Filter questions by topic (Introduction, Architecture, Arduino, AI)
- 💡 **Hint System**: Get contextual hints for challenging questions
- 📊 **Real-time Statistics**: Track your progress, correct answers, and completion rate
- ⏭️ **Skip Option**: Move to next question when needed
- 🔄 **Review Mode**: Review all questions and answers after completion
- 🔖 **Bookmarks**: Mark important questions for later review
- 📈 **Performance Analytics**: Detailed time tracking and performance metrics

### Advanced Features ⚡
- 🌓 **Dark Mode**: Toggle between light and dark themes
- ⏱️ **Timer Mode**: Track time spent with built-in stopwatch
- ⌨️ **Keyboard Shortcuts**: Navigate using keyboard (Arrow keys, 1-4, H, S, B, D)
- 🔊 **Sound Effects**: Audio feedback for interactions (toggleable)
- 🎉 **Confetti Animations**: Celebration effects on quiz completion
- 💾 **Auto-Save Progress**: Automatically saves your progress every 30 seconds
- 📥 **Export Results**: Download your quiz results as a text file
- 🔔 **Toast Notifications**: Non-intrusive notifications for actions

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Progress Tracking**: Visual progress bars and detailed statistics
- **Instant Feedback**: Immediate visual and audio indication of correct/incorrect answers
- **Clean Interface**: Modern UI built with Tailwind CSS
- **Smooth Animations**: Professional transitions and effects
- **Accessibility**: Keyboard navigation and clear visual feedback

## 📋 Table of Contents

- [Features](#-features)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Technologies](#-technologies)
- [Question Categories](#-question-categories)
- [Development](#-development)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Installation

### Prerequisites
- Python 3.x (for local server)
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Quick Start

1. **Clone or download the project**
   ```bash
   cd /path/to/project
   ```

2. **Start a local server**
   ```bash
   python3 -m http.server 8080
   ```

3. **Open in browser**
   ```
   http://localhost:8080/se.html
   ```

### Alternative Server Options

Using Node.js:
```bash
npx http-server -p 8080
```

Using PHP:
```bash
php -S localhost:8080
```

## 📖 Usage

### Starting a Quiz

1. **Main Quiz**: The default view shows the main 200-question quiz
2. **Random Quiz**: Scroll down to start the 20-question random quiz
3. **Category Filter**: Click category badges to filter questions by topic

### Answering Questions

1. Click on an answer option to select it
2. The correct answer is highlighted in green
3. Incorrect selections are highlighted in red
4. Use the **Indice** button to view hints
5. Use **Passer** to skip questions
6. Navigate with **Précédent** and **Suivant** buttons

### Viewing Results

- Real-time statistics are displayed in the sidebar
- Toggle between Main Quiz and Random Quiz stats
- Complete the quiz to see detailed results with:
  - Final score and percentage
  - Number of correct, incorrect, and skipped questions
  - Performance analytics (average time, fastest/slowest questions)
  - Option to restart, review answers, or export results

### Keyboard Shortcuts ⌨️

The quiz supports the following keyboard shortcuts for faster navigation:

| Key | Action |
|-----|--------|
| `→` or `N` | Next question |
| `←` or `P` | Previous question |
| `H` | Show hint |
| `S` | Skip question |
| `1-4` | Select answer option (A-D) |
| `B` | Toggle bookmark |
| `D` | Toggle dark mode |
| `?` | Show keyboard shortcuts modal |

**Tip**: Click the keyboard icon (bottom right) or press `?` to view shortcuts anytime!

## 📁 Project Structure

```
SE/
├── se.html           # Main HTML file with quiz interface
├── index.css         # Custom styles for quiz interactions
├── index.js          # Core application logic and quiz functionality
├── data.json         # Question database (76 base questions, padded to 200)
└── README.md         # Project documentation
```

### File Descriptions

- **se.html**: Contains the complete HTML structure including both quiz sections, statistics card, and results display with enhanced header controls
- **index.css**: Comprehensive CSS including:
  - Custom hover effects and transitions
  - Dark mode theme variables
  - Progress bar animations
  - Answer state styling (correct/incorrect/selected)
  - Confetti particles
  - Responsive design rules
- **index.js**: Core JavaScript logic for:
  - Data fetching and initialization
  - Question rendering and navigation
  - Answer validation with sound feedback
  - Progress tracking and bookmarking
  - Statistics calculation
- **enhancements.js**: Advanced features module:
  - Dark mode implementation
  - Timer functionality
  - Sound effects system
  - Keyboard shortcuts handler
  - Local storage management
  - Bookmark system
  - Performance analytics
  - Confetti animations
  - Export functionality
- **toast.js**: Toast notification system for user feedback
- **data.json**: JSON database with question objects containing:
  - Question text
  - Multiple choice options
  - Correct answer index
  - Hint text
  - Category classification

## 🛠️ Technologies

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Custom styles + Tailwind CSS v3.4.1
- **JavaScript ES6+**: Vanilla JS, no frameworks

### Libraries & CDNs
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Font Awesome 6.4.0](https://fontawesome.com/) - Icon library
- [Google Fonts (Poppins)](https://fonts.google.com/) - Typography

### Architecture
- **MVC Pattern**: Separation of data (JSON), view (HTML), and logic (JS)
- **Event-Driven**: DOM event listeners for user interactions
- **Modular Functions**: Reusable functions for quiz operations

## 📚 Question Categories

The quiz covers four main categories:

| Category | Topic | Count |
|----------|-------|-------|
| **intro** | Introduction to Embedded Systems | ~19 questions |
| **archi** | System Architecture | ~19 questions |
| **arduino** | Arduino Programming | ~19 questions |
| **ai** | Artificial Intelligence | ~19 questions |

**Note**: The application pads the base 76 questions to 200 by creating revision copies prefixed with "[Révision]".

## 💻 Development

### Adding New Questions

Edit `data.json` and add question objects:

```json
{
  "question": "Your question text here?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correct": 0,
  "hint": "Helpful hint for this question",
  "category": "intro"
}
```

### Modifying Quiz Settings

In `index.js`, adjust these variables:

```javascript
const targetTotal = 200;           // Total questions in main quiz
const randomQuizCount = 20;        // Questions in random quiz
```

### Customizing Styles

- **Colors**: Edit Tailwind classes in `se.html`
- **Custom styles**: Modify `index.css` for hover effects and transitions
- **Layout**: Adjust grid classes in `se.html`

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Ideas
- Add more questions to `data.json`
- Implement timer functionality
- Add question difficulty levels
- Create export functionality for results
- Add dark mode theme
- Implement user authentication

## 📝 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 📞 Support

For questions or issues:
- Open an issue in the project repository
- Check existing documentation
- Review the code comments in `index.js`

## 🎯 Implemented Features

- [x] Timer mode with stopwatch
- [x] Dark mode toggle with smooth transitions
- [x] Question bookmarking system
- [x] Performance analytics dashboard
- [x] Export results functionality
- [x] Keyboard shortcuts
- [x] Sound effects
- [x] Progress auto-save
- [x] Toast notifications
- [x] Confetti animations

## 💡 Future Enhancement Ideas

- [ ] Countdown timer mode (X minutes per quiz)
- [ ] Difficulty levels (Easy, Medium, Hard)
- [ ] User profiles with authentication
- [ ] Full PDF export with charts (using jsPDF)
- [ ] Multi-language support (EN, FR, AR)
- [ ] Leaderboard system
- [ ] Question explanation mode
- [ ] Study streak tracking
- [ ] Spaced repetition algorithm

---

**Built with ❤️ for embedded systems learning**

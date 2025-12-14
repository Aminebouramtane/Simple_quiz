# Quiz Application - Systèmes Embarqués

A modern, interactive quiz application for embedded systems learning, featuring 200 questions across multiple categories with real-time progress tracking and dual quiz modes.

![Quiz Application](https://img.shields.io/badge/version-1.0.0-blue.svg)

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

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Progress Tracking**: Visual progress bars and detailed statistics
- **Instant Feedback**: Immediate visual indication of correct/incorrect answers
- **Clean Interface**: Modern UI built with Tailwind CSS

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
   http://localhost/index.html
   ```

### Alternative Server Options

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
  - Option to restart or review answers

## 📁 Project Structure

```
SE/
├── index.html        # Main HTML file with quiz interface
├── index.css         # Custom styles for quiz interactions
├── index.js          # Core application logic and quiz functionality
├── data.json         # Question database (76 base questions, padded to 200)
└── README.md         # Project documentation
```

### File Descriptions

- **se.html**: Contains the complete HTML structure including both quiz sections, statistics card, and results display
- **index.css**: Custom CSS for hover effects, progress bars, and answer states (correct/incorrect/selected)
- **index.js**: JavaScript logic for:
  - Data fetching and initialization
  - Question rendering and navigation
  - Answer validation
  - Progress tracking
  - Statistics calculation
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


## 📞 Support

For questions or issues:
- Open an issue in the project repository
- Check existing documentation
- Review the code comments in `index.js`

## 🎯 Future Enhancements

- [ ] Timer mode for timed quizzes
- [ ] Difficulty levels (Easy, Medium, Hard)
- [ ] User profiles and saved progress
- [ ] Export results to PDF
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Question bookmarking
- [ ] Performance analytics dashboard

---

**Built with ❤️ for embedded systems learning**

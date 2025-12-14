// Advanced Statistics Dashboard
class AdvancedStatsDashboard {
  constructor() {
    this.currentStreak = 0;
    this.maxStreak = 0;
    this.currentQuizType = 'main'; // 'main' or 'random'
    
    // Separate stats for main and random quizzes
    this.mainStats = {
      streak: 0,
      maxStreak: 0,
      categoryStats: {
        intro: { correct: 0, total: 0 },
        archi: { correct: 0, total: 0 },
        arduino: { correct: 0, total: 0 },
        ai: { correct: 0, total: 0 }
      }
    };
    
    this.randomStats = {
      streak: 0,
      maxStreak: 0,
      categoryStats: {
        intro: { correct: 0, total: 0 },
        archi: { correct: 0, total: 0 },
        arduino: { correct: 0, total: 0 },
        ai: { correct: 0, total: 0 }
      }
    };
    
    this.categoryStats = this.mainStats.categoryStats;
    this.init();
  }

  init() {
    // Refresh button
    const refreshBtn = document.getElementById('refresh-stats-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        this.update();
        if (window.toast) {
          window.toast.success('Statistiques actualisées!', 2000);
        }
      });
    }
  }

  setQuizType(type) {
    this.currentQuizType = type; // 'main' or 'random'
    if (type === 'main') {
      this.currentStreak = this.mainStats.streak;
      this.maxStreak = this.mainStats.maxStreak;
      this.categoryStats = this.mainStats.categoryStats;
    } else {
      this.currentStreak = this.randomStats.streak;
      this.maxStreak = this.randomStats.maxStreak;
      this.categoryStats = this.randomStats.categoryStats;
    }
    this.update();
  }

  update() {
    // This will be called from the main quiz logic
    this.updateSuccessRate();
    this.updateAverageTime();
    this.updateStreak();
    this.updateBookmarks();
    this.updateCategoryBreakdown();
    this.updateInsights();
  }

  updateSuccessRate() {
    const totalAnswered = window.userAnswersArray?.filter(a => a !== null).length || 0;
    const correct = window.questionStatusArray?.filter(s => s === 'correct').length || 0;
    const rate = totalAnswered > 0 ? Math.round((correct / totalAnswered) * 100) : 0;
    
    const elem = document.getElementById('dashboard-success-rate');
    if (elem) {
      elem.textContent = rate + '%';
      elem.classList.remove('text-blue-700', 'text-green-700', 'text-red-700');
      if (rate >= 80) elem.classList.add('text-green-700');
      else if (rate >= 60) elem.classList.add('text-blue-700');
      else elem.classList.add('text-red-700');
    }
  }

  updateAverageTime() {
    if (!window.quizEnhancements) return;
    
    const analytics = window.quizEnhancements.getPerformanceAnalytics();
    const elem = document.getElementById('dashboard-avg-time');
    if (elem && analytics) {
      elem.textContent = analytics.averageTime + 's';
    }
  }

  updateStreak() {
    const elem = document.getElementById('dashboard-streak');
    if (elem) {
      elem.textContent = this.maxStreak;
    }
  }

  calculateStreak(isCorrect) {
    if (isCorrect) {
      this.currentStreak++;
      this.maxStreak = Math.max(this.maxStreak, this.currentStreak);
    } else {
      this.currentStreak = 0;
    }
    
    // Save to correct quiz stats
    if (this.currentQuizType === 'main') {
      this.mainStats.streak = this.currentStreak;
      this.mainStats.maxStreak = this.maxStreak;
    } else {
      this.randomStats.streak = this.currentStreak;
      this.randomStats.maxStreak = this.maxStreak;
    }
    
    this.updateStreak();
  }

  updateBookmarks() {
    if (!window.quizEnhancements) return;
    
    const elem = document.getElementById('dashboard-bookmarks');
    if (elem) {
      const count = window.quizEnhancements.bookmarkedQuestions.size || 0;
      elem.textContent = count;
    }
  }

  updateCategoryStats(category, isCorrect) {
    if (this.categoryStats[category]) {
      this.categoryStats[category].total++;
      if (isCorrect) {
        this.categoryStats[category].correct++;
      }
    }
    this.updateCategoryBreakdown();
  }

  updateCategoryBreakdown() {
    const categories = ['intro', 'archi', 'arduino', 'ai'];
    
    categories.forEach(cat => {
      const stats = this.categoryStats[cat];
      const percent = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
      
      const percentElem = document.getElementById(`cat-${cat}-percent`);
      const barElem = document.getElementById(`cat-${cat}-bar`);
      
      if (percentElem) percentElem.textContent = percent + '%';
      if (barElem) barElem.style.width = percent + '%';
    });
  }

  updateInsights() {
    const insights = [];
    const totalAnswered = window.userAnswersArray?.filter(a => a !== null).length || 0;
    const correct = window.questionStatusArray?.filter(s => s === 'correct').length || 0;
    const rate = totalAnswered > 0 ? Math.round((correct / totalAnswered) * 100) : 0;

    if (totalAnswered === 0) {
      insights.push('• Commencez à répondre aux questions pour voir vos statistiques');
    } else {
      if (rate >= 90) {
        insights.push('🎉 Excellent! Vous maîtrisez très bien le sujet!');
      } else if (rate >= 70) {
        insights.push('👍 Bon travail! Continuez comme ça!');
      } else if (rate >= 50) {
        insights.push('💪 Pas mal! Revoyez les indices pour vous améliorer');
      } else {
        insights.push('📚 Prenez le temps de relire le cours');
      }

      if (this.maxStreak >= 10) {
        insights.push(`🔥 Série impressionnante de ${this.maxStreak} réponses correctes!`);
      }

      // Category-specific insights
      let weakestCat = null;
      let lowestPercent = 100;
      Object.entries(this.categoryStats).forEach(([cat, stats]) => {
        if (stats.total > 0) {
          const percent = Math.round((stats.correct / stats.total) * 100);
          if (percent < lowestPercent) {
            lowestPercent = percent;
            weakestCat = cat;
          }
        }
      });

      if (weakestCat && lowestPercent < 60) {
        const catNames = {
          intro: 'Introduction',
          archi: 'Architecture',
          arduino: 'Arduino',
          ai: 'IA'
        };
        insights.push(`💡 Concentrez-vous sur: ${catNames[weakestCat]} (${lowestPercent}%)`);
      }

      if (window.quizEnhancements) {
        const bookmarks = window.quizEnhancements.bookmarkedQuestions.size;
        if (bookmarks > 0) {
          insights.push(`📑 ${bookmarks} question(s) marquée(s) pour révision`);
        }
      }
    }

    const insightsElem = document.getElementById('dashboard-insights');
    if (insightsElem) {
      insightsElem.innerHTML = insights.map(i => `<p>${i}</p>`).join('');
    }
  }

  reset(quizType = 'main') {
    if (quizType === 'main') {
      this.mainStats = {
        streak: 0,
        maxStreak: 0,
        categoryStats: {
          intro: { correct: 0, total: 0 },
          archi: { correct: 0, total: 0 },
          arduino: { correct: 0, total: 0 },
          ai: { correct: 0, total: 0 }
        }
      };
    } else {
      this.randomStats = {
        streak: 0,
        maxStreak: 0,
        categoryStats: {
          intro: { correct: 0, total: 0 },
          archi: { correct: 0, total: 0 },
          arduino: { correct: 0, total: 0 },
          ai: { correct: 0, total: 0 }
        }
      };
    }
    
    this.setQuizType(quizType);
  }
}

// Initialize dashboard
window.advancedDashboard = new AdvancedStatsDashboard();

// Auto-update every 2 seconds
setInterval(() => {
  if (window.advancedDashboard) {
    window.advancedDashboard.update();
  }
}, 2000);

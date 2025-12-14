// Advanced Features Enhancement Module
// This file adds dark mode, timer, sound effects, bookmarks, keyboard shortcuts, and more

class QuizEnhancements {
  constructor() {
    this.darkMode = localStorage.getItem('darkMode') === 'true';
    this.soundEnabled = localStorage.getItem('soundEnabled') !== 'false';
    this.timerEnabled = false;
    this.timerSeconds = 0;
    this.timerInterval = null;
    this.bookmarkedQuestions = new Set(JSON.parse(localStorage.getItem('bookmarks') || '[]'));
    this.sessionStartTime = Date.now();
    this.questionTimes = {};
    this.init();
  }

  init() {
    this.initDarkMode();
    this.initSoundToggle();
    this.initTimerToggle();
    this.initKeyboardShortcuts();
    this.initLocalStorage();
    this.initConfetti();
    this.initTooltips();
  }

  // Dark Mode
  initDarkMode() {
    const toggle = document.getElementById('dark-mode-toggle');
    if (!toggle) return;

    if (this.darkMode) {
      this.enableDarkMode();
    }

    toggle.addEventListener('click', () => {
      this.darkMode = !this.darkMode;
      localStorage.setItem('darkMode', this.darkMode);
      if (this.darkMode) {
        this.enableDarkMode();
      } else {
        this.disableDarkMode();
      }
      this.playSound('click');
    });
  }

  enableDarkMode() {
    document.documentElement.classList.add('dark-mode');
    document.body.classList.add('dark-mode');
    const icon = document.querySelector('#dark-mode-toggle i');
    if (icon) icon.className = 'fas fa-sun';
    if (window.toast) window.toast.info('Mode sombre activé 🌙', 1500);
  }

  disableDarkMode() {
    document.documentElement.classList.remove('dark-mode');
    document.body.classList.remove('dark-mode');
    const icon = document.querySelector('#dark-mode-toggle i');
    if (icon) icon.className = 'fas fa-moon';
    if (window.toast) window.toast.info('Mode clair activé ☀️', 1500);
  }

  // Sound Effects
  initSoundToggle() {
    const toggle = document.getElementById('sound-toggle');
    if (!toggle) return;

    this.updateSoundIcon();

    toggle.addEventListener('click', () => {
      this.soundEnabled = !this.soundEnabled;
      localStorage.setItem('soundEnabled', this.soundEnabled);
      this.updateSoundIcon();
      if (this.soundEnabled) {
        this.playSound('success');
      }
    });
  }

  updateSoundIcon() {
    const icon = document.querySelector('#sound-toggle i');
    if (icon) {
      icon.className = this.soundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
    }
  }

  playSound(type) {
    if (!this.soundEnabled) return;

    const frequencies = {
      success: [523, 659, 784],
      error: [392, 330],
      click: [800],
      complete: [523, 659, 784, 1047]
    };

    const freq = frequencies[type] || [440];
    this.beep(freq);
  }

  beep(frequencies) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    let time = audioContext.currentTime;

    frequencies.forEach((freq, i) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = freq;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.1, time);
      gainNode.gain.exponentialRampToValueAtTime(0.01, time + 0.1);

      oscillator.start(time);
      oscillator.stop(time + 0.1);

      time += 0.1;
    });
  }

  // Timer
  initTimerToggle() {
    const toggle = document.getElementById('timer-toggle');
    const display = document.getElementById('timer-display');
    if (!toggle || !display) return;

    toggle.addEventListener('click', () => {
      this.timerEnabled = !this.timerEnabled;
      
      if (this.timerEnabled) {
        display.classList.remove('hidden');
        this.startTimer();
        toggle.classList.add('bg-white/40');
        this.playSound('click');
      } else {
        display.classList.add('hidden');
        this.stopTimer();
        toggle.classList.remove('bg-white/40');
      }
    });
  }

  startTimer() {
    this.timerSeconds = 0;
    this.updateTimerDisplay();

    this.timerInterval = setInterval(() => {
      this.timerSeconds++;
      this.updateTimerDisplay();
    }, 1000);
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  updateTimerDisplay() {
    const minutes = Math.floor(this.timerSeconds / 60);
    const seconds = this.timerSeconds % 60;
    const display = document.getElementById('timer-value');
    if (display) {
      display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
  }

  getElapsedTime() {
    return this.timerSeconds;
  }

  // Keyboard Shortcuts
  initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Don't trigger if typing in input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch(e.key) {
        case 'ArrowRight':
        case 'n':
        case 'N':
          e.preventDefault();
          document.getElementById('next-btn')?.click();
          break;
        case 'ArrowLeft':
        case 'p':
        case 'P':
          e.preventDefault();
          document.getElementById('prev-btn')?.click();
          break;
        case 'h':
        case 'H':
          e.preventDefault();
          document.getElementById('hint-btn')?.click();
          break;
        case 's':
        case 'S':
          e.preventDefault();
          document.getElementById('skip-btn')?.click();
          break;
        case '1':
        case '2':
        case '3':
        case '4':
          e.preventDefault();
          const index = parseInt(e.key) - 1;
          const options = document.querySelectorAll('.option-btn');
          if (options[index]) options[index].click();
          break;
        case 'b':
        case 'B':
          e.preventDefault();
          this.toggleBookmark();
          break;
        case 'd':
        case 'D':
          e.preventDefault();
          document.getElementById('dark-mode-toggle')?.click();
          break;
      }
    });

    // Add keyboard shortcuts help
    this.addKeyboardShortcutsHelp();
  }

  addKeyboardShortcutsHelp() {
    const helpHTML = `
      <div id="shortcuts-modal" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50" style="display: none;">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 max-w-md mx-4">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold">Raccourcis Clavier</h3>
            <button onclick="document.getElementById('shortcuts-modal').style.display='none'" class="text-gray-500 hover:text-gray-700">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between py-2 border-b">
              <span class="font-medium">→ ou N</span>
              <span class="text-gray-600">Question suivante</span>
            </div>
            <div class="flex justify-between py-2 border-b">
              <span class="font-medium">← ou P</span>
              <span class="text-gray-600">Question précédente</span>
            </div>
            <div class="flex justify-between py-2 border-b">
              <span class="font-medium">H</span>
              <span class="text-gray-600">Afficher l'indice</span>
            </div>
            <div class="flex justify-between py-2 border-b">
              <span class="font-medium">S</span>
              <span class="text-gray-600">Passer la question</span>
            </div>
            <div class="flex justify-between py-2 border-b">
              <span class="font-medium">1-4</span>
              <span class="text-gray-600">Sélectionner réponse</span>
            </div>
            <div class="flex justify-between py-2 border-b">
              <span class="font-medium">B</span>
              <span class="text-gray-600">Marquer/Démarquer</span>
            </div>
            <div class="flex justify-between py-2">
              <span class="font-medium">D</span>
              <span class="text-gray-600">Mode sombre</span>
            </div>
          </div>
        </div>
      </div>
      <button id="show-shortcuts" class="fixed bottom-4 right-4 bg-blue-600 text-white rounded-full w-12 h-12 shadow-lg hover:bg-blue-700 transition z-40" title="Raccourcis clavier (?)">
        <i class="fas fa-keyboard"></i>
      </button>
    `;

    document.body.insertAdjacentHTML('beforeend', helpHTML);

    document.getElementById('show-shortcuts')?.addEventListener('click', () => {
      document.getElementById('shortcuts-modal').style.display = 'flex';
    });

    // ? key to show shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === '?') {
        e.preventDefault();
        document.getElementById('shortcuts-modal').style.display = 'flex';
      }
    });
  }

  // Bookmarks
  toggleBookmark(questionIndex = null) {
    // This will be called from main quiz logic with current question index
    if (questionIndex === null) return;

    if (this.bookmarkedQuestions.has(questionIndex)) {
      this.bookmarkedQuestions.delete(questionIndex);
      this.playSound('click');
      if (window.toast) window.toast.info('Marque-page supprimé', 2000);
    } else {
      this.bookmarkedQuestions.add(questionIndex);
      this.playSound('success');
      if (window.toast) window.toast.success('Question marquée!', 2000);
    }

    localStorage.setItem('bookmarks', JSON.stringify([...this.bookmarkedQuestions]));
    this.updateBookmarkButton(questionIndex);
  }

  updateBookmarkButton(questionIndex) {
    const btn = document.getElementById('bookmark-btn');
    if (!btn) return;

    const isBookmarked = this.bookmarkedQuestions.has(questionIndex);
    const icon = btn.querySelector('i');
    if (icon) {
      icon.className = isBookmarked ? 'fas fa-bookmark' : 'far fa-bookmark';
    }
    btn.classList.toggle('text-yellow-600', isBookmarked);
  }

  isBookmarked(questionIndex) {
    return this.bookmarkedQuestions.has(questionIndex);
  }

  // Local Storage - Save Progress
  initLocalStorage() {
    window.addEventListener('beforeunload', () => {
      this.saveProgress();
    });

    // Auto-save every 30 seconds
    setInterval(() => this.saveProgress(), 30000);
  }

  saveProgress() {
    const progress = {
      currentQuestion: window.currentQuestionIndex || 0,
      score: window.currentScore || 0,
      userAnswers: window.userAnswersArray || [],
      timestamp: Date.now()
    };
    localStorage.setItem('quizProgress', JSON.stringify(progress));
  }

  loadProgress() {
    const saved = localStorage.getItem('quizProgress');
    if (!saved) return null;

    const progress = JSON.parse(saved);
    // Only restore if less than 24 hours old
    if (Date.now() - progress.timestamp < 24 * 60 * 60 * 1000) {
      return progress;
    }
    return null;
  }

  clearProgress() {
    localStorage.removeItem('quizProgress');
  }

  // Confetti Animation
  initConfetti() {
    // Will be triggered on quiz completion
  }

  launchConfetti() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      // Create confetti particles manually
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'confetti-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        document.body.appendChild(particle);

        setTimeout(() => particle.remove(), 3000);
      }
    }, 250);

    this.playSound('complete');
  }

  // Performance Analytics
  trackQuestionTime(questionIndex, startTime) {
    const endTime = Date.now();
    const timeSpent = (endTime - startTime) / 1000; // seconds
    this.questionTimes[questionIndex] = timeSpent;
  }

  getPerformanceAnalytics() {
    const times = Object.values(this.questionTimes);
    if (times.length === 0) return null;

    const totalTime = times.reduce((a, b) => a + b, 0);
    const avgTime = totalTime / times.length;
    const maxTime = Math.max(...times);
    const minTime = Math.min(...times);

    return {
      totalQuestions: times.length,
      totalTime: Math.round(totalTime),
      averageTime: Math.round(avgTime * 10) / 10,
      fastestTime: Math.round(minTime * 10) / 10,
      slowestTime: Math.round(maxTime * 10) / 10,
      sessionDuration: Math.round((Date.now() - this.sessionStartTime) / 1000)
    };
  }

  displayPerformanceReport() {
    const analytics = this.getPerformanceAnalytics();
    if (!analytics) return;

    const reportHTML = `
      <div class="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-6 mt-6">
        <h3 class="text-xl font-bold mb-4"><i class="fas fa-chart-line mr-2"></i>Analyse de Performance</h3>
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-white/20 rounded-lg p-3">
            <p class="text-2xl font-bold">${analytics.averageTime}s</p>
            <p class="text-sm opacity-90">Temps moyen</p>
          </div>
          <div class="bg-white/20 rounded-lg p-3">
            <p class="text-2xl font-bold">${Math.floor(analytics.sessionDuration / 60)}m</p>
            <p class="text-sm opacity-90">Durée totale</p>
          </div>
          <div class="bg-white/20 rounded-lg p-3">
            <p class="text-2xl font-bold">${analytics.fastestTime}s</p>
            <p class="text-sm opacity-90">Plus rapide</p>
          </div>
          <div class="bg-white/20 rounded-lg p-3">
            <p class="text-2xl font-bold">${analytics.slowestTime}s</p>
            <p class="text-sm opacity-90">Plus lent</p>
          </div>
        </div>
      </div>
    `;

    const resultsSection = document.getElementById('results-section');
    if (resultsSection) {
      resultsSection.insertAdjacentHTML('beforeend', reportHTML);
    }
  }

  // Tooltips
  initTooltips() {
    const tooltips = {
      'timer-toggle': 'Activer le chronomètre',
      'dark-mode-toggle': 'Basculer en mode sombre',
      'sound-toggle': 'Activer/désactiver les sons',
      'hint-btn': 'Afficher un indice (H)',
      'skip-btn': 'Passer cette question (S)',
      'prev-btn': 'Question précédente (←)',
      'next-btn': 'Question suivante (→)'
    };

    Object.entries(tooltips).forEach(([id, text]) => {
      const element = document.getElementById(id);
      if (element && !element.title) {
        element.title = text;
      }
    });
  }

  // Export Results to PDF
  exportToPDF(results) {
    // Simple text export (real PDF would need a library like jsPDF)
    const text = `
Quiz Results - ${new Date().toLocaleDateString()}
==========================================

Score: ${results.correct}/${results.total} (${results.percentage}%)

Correct: ${results.correct}
Incorrect: ${results.incorrect}
Skipped: ${results.skipped}

Performance:
- Average time per question: ${this.getPerformanceAnalytics()?.averageTime}s
- Total duration: ${Math.floor(this.getPerformanceAnalytics()?.sessionDuration / 60)} minutes

Generated by Quiz SE Application
    `.trim();

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `quiz-results-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    this.playSound('success');
    if (window.toast) window.toast.success('Résultats exportés!', 3000);
  }
}

// Initialize enhancements
window.quizEnhancements = new QuizEnhancements();

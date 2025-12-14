// Load quiz data
let quizData = [];

// Wait for DOM to be ready before fetching data
function initApp() {
  console.log('Starting to fetch data.json...');
  fetch('data.json')
    .then(r => {
      console.log('Fetch response status:', r.status);
      if (!r.ok) {
        throw new Error(`HTTP error! status: ${r.status}`);
      }
      return r.json();
    })
    .then(d => {
      console.log('Data received:', d);
      quizData = d.quizData || [];
      console.log('Quiz data length:', quizData.length);
      if (quizData.length === 0) {
        throw new Error('No questions found in data.json');
      }
      initializeApp();
    })
    .catch(err => {
      console.error('Failed to load data.json:', err);
      alert('Failed to load quiz data: ' + err.message + '\nCheck console for details.');
    });
}

function initializeApp() {
  // The original inline script logic from se.html should be here.
  // Due to brevity, we reference DOM and implement the same behavior.
  // Note: This stub expects the existing HTML IDs/classes.

  // Shuffle helper
  function shuffleArray(array) {
    if (!array || array.length === 0) {
      console.error('shuffleArray received invalid array:', array);
      return [];
    }
    const shuffled = array.slice(); // Use slice() instead of spread
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Ensure we have 200 questions by padding
  const targetTotal = 200;
  const currentCount = quizData.length;
  console.log('Current question count:', currentCount);
  
  if (currentCount > 0 && currentCount < targetTotal) {
    const questionsToAdd = targetTotal - currentCount;
    for (let i = 0; i < questionsToAdd; i++) {
      const baseIdx = i % currentCount;
      const template = quizData[baseIdx];
      const newQuestion = { ...template, question: `[Révision] ${template.question}`, category: template.category };
      quizData.push(newQuestion);
    }
  }

  let activeQuizData = quizData.slice(); // Use slice() to copy array
  console.log('Active quiz data length:', activeQuizData.length);

  // Initialize state (mirroring original)
  let currentQuestion = 0;
  let score = 0;
  let userAnswers = [];
  let questionStatus = [];
  let selectedOptions = [];
  
  // Initialize arrays after we have activeQuizData
  for (let i = 0; i < activeQuizData.length; i++) {
    userAnswers.push(null);
    questionStatus.push('unanswered');
    selectedOptions.push(null);
  }
  let currentCategory = 'all';

  // DOM elements (subset used initially)
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options-container');
  const questionNumber = document.getElementById('question-number');
  const totalQuestionsDisplay = document.getElementById('total-questions-display');
  const totalQuestions = document.getElementById('total-questions');
  const currentScore = document.getElementById('current-score');
  const maxScore = document.getElementById('max-score');
  const progressBar = document.getElementById('progress-bar');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const hintBtn = document.getElementById('hint-btn');
  const skipBtn = document.getElementById('skip-btn');
  const hintSection = document.getElementById('hint-section');
  const hintText = document.getElementById('hint-text');
  const resultsSection = document.getElementById('results-section');
  const finalScore = document.getElementById('final-score');
  const finalTotal = document.getElementById('final-total');
  const percentage = document.getElementById('percentage');
  const correctCount = document.getElementById('correct-count');
  const incorrectCount = document.getElementById('incorrect-count');
  const skippedCount = document.getElementById('skipped-count');
  const restartBtn = document.getElementById('restart-btn');
  const reviewBtn = document.getElementById('review-btn');
  const progressPercent = document.getElementById('progress-percent');
  const statsProgress = document.getElementById('stats-progress');
  const answeredCount = document.getElementById('answered-count');
  const remainingCount = document.getElementById('remaining-count');
  const categoryButtons = document.querySelectorAll('.category-btn');
  const statsSourceToggle = document.getElementById('stats-source-toggle');
  const statsSourceLabel = document.getElementById('stats-source-label');
  const statsDetailed = document.getElementById('stats-detailed');
  const statsCorrect = document.getElementById('stats-correct');
  const statsIncorrect = document.getElementById('stats-incorrect');
  const statsSkipped = document.getElementById('stats-skipped');
  let statsSource = 'main';

  // Random quiz elements
  const rQuestionText = document.getElementById('random-question-text');
  const rOptionsContainer = document.getElementById('random-options-container');
  const rQuestionNumber = document.getElementById('random-question-number');
  const rTotalQuestionsDisplay = document.getElementById('random-total-questions-display');
  const rProgressBar = document.getElementById('random-progress-bar');
  const rPrevBtn = document.getElementById('random-prev-btn');
  const rNextBtn = document.getElementById('random-next-btn');
  const rHintBtn = document.getElementById('random-hint-btn');
  const rSkipBtn = document.getElementById('random-skip-btn');
  const rHintSection = document.getElementById('random-hint-section');
  const rHintText = document.getElementById('random-hint-text');

  // Random quiz data (20 random questions from the full set)
  const randomQuizData = shuffleArray(activeQuizData).slice(0, 20);
  let rCurrent = 0;
  let rUserAnswers = new Array(randomQuizData.length).fill(null);
  let rSelectedOptions = new Array(randomQuizData.length).fill(null);
  let rQuestionStatus = new Array(randomQuizData.length).fill('unanswered');

  function getFilteredQuestions() {
    if (currentCategory === 'all') return activeQuizData;
    return activeQuizData.filter(q => q.category === currentCategory);
  }
  function getCurrentFilteredIndex() {
    const filtered = getFilteredQuestions();
    const currentQ = activeQuizData[currentQuestion];
    for (let i = 0; i < filtered.length; i++) {
      if (filtered[i] === currentQ) return i;
    }
    return 0;
  }

  function updateCategoryCounts() {
    const introCount = activeQuizData.filter(q => q.category === 'intro').length;
    const archiCount = activeQuizData.filter(q => q.category === 'archi').length;
    const arduinoCount = activeQuizData.filter(q => q.category === 'arduino').length;
    const aiCount = activeQuizData.filter(q => q.category === 'ai').length;
    document.getElementById('count-all').textContent = activeQuizData.length;
    document.getElementById('count-intro').textContent = introCount;
    document.getElementById('count-archi').textContent = archiCount;
    document.getElementById('count-arduino').textContent = arduinoCount;
    document.getElementById('count-ai').textContent = aiCount;
  }

  function loadQuestion(index) {
    const filteredQuestions = getFilteredQuestions();
    if (index < 0 || index >= filteredQuestions.length) return;
    currentQuestion = activeQuizData.indexOf(filteredQuestions[index]);
    const question = activeQuizData[currentQuestion];
    const filteredIndex = getCurrentFilteredIndex();
    questionNumber.textContent = filteredIndex + 1;
    questionText.textContent = question.question;
    optionsContainer.innerHTML = '';
    question.options.forEach((option, idx) => {
      const optionDiv = document.createElement('div');
      optionDiv.className = 'p-4 border-2 border-gray-200 rounded-lg cursor-pointer transition option-btn card-hover hover:border-blue-300 hover:bg-blue-50';
      optionDiv.textContent = `${String.fromCharCode(65 + idx)}) ${option}`;
      optionDiv.dataset.index = idx;
      if (selectedOptions[currentQuestion] && selectedOptions[currentQuestion].includes(idx)) {
        optionDiv.classList.add('option-selected');
      }
      if (userAnswers[currentQuestion] !== null) {
        if (Array.isArray(question.correct)) {
          if (question.correct.includes(idx)) {
            optionDiv.classList.add('option-correct');
          } else if (selectedOptions[currentQuestion] && selectedOptions[currentQuestion].includes(idx) && !question.correct.includes(idx)) {
            optionDiv.classList.add('option-incorrect');
          }
        } else {
          if (idx === question.correct) {
            optionDiv.classList.add('option-correct');
          } else if (selectedOptions[currentQuestion] && selectedOptions[currentQuestion].includes(idx) && idx !== question.correct) {
            optionDiv.classList.add('option-incorrect');
          }
        }
      }
      optionDiv.addEventListener('click', () => selectOption(idx));
      optionsContainer.appendChild(optionDiv);
    });
    hintSection.classList.add('hidden');
    updateButtonStates();
    updateProgress();
  }

  function selectOption(optionIndex) {
    if (userAnswers[currentQuestion] !== null) return;
    const question = activeQuizData[currentQuestion];
    const optionDivs = document.querySelectorAll('.option-btn');
    optionDivs.forEach(div => div.classList.remove('option-selected'));
    optionDivs[optionIndex].classList.add('option-selected');
    if (Array.isArray(question.correct)) {
      if (!selectedOptions[currentQuestion]) selectedOptions[currentQuestion] = [];
      const idx = selectedOptions[currentQuestion].indexOf(optionIndex);
      if (idx === -1) {
        selectedOptions[currentQuestion].push(optionIndex);
      } else {
        selectedOptions[currentQuestion].splice(idx, 1);
        optionDivs[optionIndex].classList.remove('option-selected');
      }
      return;
    } else {
      selectedOptions[currentQuestion] = [optionIndex];
      const isCorrect = optionIndex === question.correct;
      userAnswers[currentQuestion] = isCorrect;
      questionStatus[currentQuestion] = isCorrect ? 'correct' : 'incorrect';
      if (isCorrect) { score++; currentScore.textContent = score; }
      optionDivs.forEach((div, idx) => {
        if (idx === question.correct) div.classList.add('option-correct');
        else if (idx === optionIndex && idx !== question.correct) div.classList.add('option-incorrect');
      });
      updateProgress();
    }
  }

  function updateButtonStates() {
    const filteredQuestions = getFilteredQuestions();
    const filteredIndex = getCurrentFilteredIndex();
    prevBtn.disabled = filteredIndex === 0;
    nextBtn.textContent = filteredIndex === filteredQuestions.length - 1 ? 'Terminer' : 'Suivant';
    skipBtn.textContent = 'Passer';
  }

  function updateProgress() {
    const filteredQuestions = getFilteredQuestions();
    const filteredIndex = getCurrentFilteredIndex();
    const progress = ((filteredIndex + 1) / filteredQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
    updateStats();
  }

  function showHint() {
    const question = activeQuizData[currentQuestion];
    hintText.textContent = question.hint;
    hintSection.classList.remove('hidden');
  }

  function skipQuestion() {
    if (userAnswers[currentQuestion] === null) {
      userAnswers[currentQuestion] = false;
      questionStatus[currentQuestion] = 'skipped';
    }
    const filteredQuestions = getFilteredQuestions();
    const filteredIndex = getCurrentFilteredIndex();
    if (filteredIndex < filteredQuestions.length - 1) loadQuestion(filteredIndex + 1);
    else showResults();
  }

  function nextQuestion() {
    const filteredQuestions = getFilteredQuestions();
    const filteredIndex = getCurrentFilteredIndex();
    if (filteredIndex === filteredQuestions.length - 1) showResults();
    else loadQuestion(filteredIndex + 1);
  }
  function prevQuestion() {
    const filteredIndex = getCurrentFilteredIndex();
    if (filteredIndex > 0) loadQuestion(filteredIndex - 1);
  }

  function showResults() {
    document.querySelector('.lg\\:col-span-2 > div:first-child').classList.add('hidden');
    resultsSection.classList.remove('hidden');
    if (statsDetailed) statsDetailed.classList.remove('hidden');
    const correct = questionStatus.filter(status => status === 'correct').length;
    const incorrect = questionStatus.filter(status => status === 'incorrect').length;
    const skipped = questionStatus.filter(status => status === 'skipped').length;
    const percentageScore = Math.round((correct / activeQuizData.length) * 100);
    finalScore.textContent = correct;
    percentage.textContent = `${percentageScore}%`;
    correctCount.textContent = correct;
    incorrectCount.textContent = incorrect;
    skippedCount.textContent = skipped;
  }

  function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = new Array(activeQuizData.length).fill(null);
    questionStatus = new Array(activeQuizData.length).fill('unanswered');
    selectedOptions = new Array(activeQuizData.length).fill(null);
    currentScore.textContent = '0';
    resultsSection.classList.add('hidden');
    document.querySelector('.lg\\:col-span-2 > div:first-child').classList.remove('hidden');
    if (statsDetailed) statsDetailed.classList.add('hidden');
    loadQuestion(0);
    updateCategoryCounts();
  }

  function reviewAnswers() {
    currentQuestion = 0;
    resultsSection.classList.add('hidden');
    document.querySelector('.lg\\:col-span-2 > div:first-child').classList.remove('hidden');
    loadQuestion(0);
  }

  prevBtn.addEventListener('click', prevQuestion);
  nextBtn.addEventListener('click', nextQuestion);
  hintBtn.addEventListener('click', showHint);
  skipBtn.addEventListener('click', skipQuestion);
  restartBtn.addEventListener('click', restartQuiz);
  reviewBtn.addEventListener('click', reviewAnswers);

  // Random quiz rendering and logic
  if (rPrevBtn) rPrevBtn.addEventListener('click', prevRandomQuestion);
  if (rNextBtn) rNextBtn.addEventListener('click', nextRandomQuestion);
  if (rHintBtn) rHintBtn.addEventListener('click', showRandomHint);
  if (rSkipBtn) rSkipBtn.addEventListener('click', skipRandomQuestion);
  function renderRandomQuestion() {
    const q = randomQuizData[rCurrent];
    rQuestionNumber.textContent = rCurrent + 1;
    rTotalQuestionsDisplay.textContent = randomQuizData.length;
    rQuestionText.textContent = q.question;
    rOptionsContainer.innerHTML = '';
    const selected = rSelectedOptions[rCurrent] || [];
    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'block w-full text-left p-4 border-2 border-gray-200 rounded-lg cursor-pointer transition option-btn card-hover hover:border-indigo-300 hover:bg-indigo-50';
      btn.textContent = `${String.fromCharCode(65 + idx)}) ${opt}`;
      if (selected.includes(idx)) btn.classList.add('option-selected');
      btn.addEventListener('click', () => {
        if (!Array.isArray(q.correct)) {
          rSelectedOptions[rCurrent] = [idx];
        } else {
          const arr = rSelectedOptions[rCurrent] ? [...rSelectedOptions[rCurrent]] : [];
          const pos = arr.indexOf(idx);
          if (pos === -1) arr.push(idx);
          else arr.splice(pos, 1);
          rSelectedOptions[rCurrent] = arr;
        }
        renderRandomQuestion();
      });
      rOptionsContainer.appendChild(btn);
    });
    const progress = ((rCurrent + 1) / randomQuizData.length) * 100;
    rProgressBar.style.width = `${progress}%`;
    rPrevBtn.disabled = rCurrent === 0;
    rNextBtn.textContent = rCurrent === randomQuizData.length - 1 ? 'Terminer' : 'Suivant';
    if (rHintSection) rHintSection.classList.add('hidden');
    updateStats();
  }
  function checkRandomCurrent() {
    const q = randomQuizData[rCurrent];
    const sel = rSelectedOptions[rCurrent] || [];
    const correct = Array.isArray(q.correct) ? q.correct : [q.correct];
    const isCorrect = sel.length === correct.length && correct.every(c => sel.includes(c));
    rUserAnswers[rCurrent] = isCorrect;
    rQuestionStatus[rCurrent] = sel.length === 0 ? 'skipped' : (isCorrect ? 'correct' : 'incorrect');
  }
  function nextRandomQuestion() {
    checkRandomCurrent();
    if (rCurrent === randomQuizData.length - 1) {
      const correct = rQuestionStatus.filter(status => status === 'correct').length;
      const incorrect = rQuestionStatus.filter(status => status === 'incorrect').length;
      const skipped = rQuestionStatus.filter(status => status === 'skipped' || status === 'unanswered').length;
      // No alert; reveal detailed stats grid
      if (statsDetailed) statsDetailed.classList.remove('hidden');
      updateStats();
    } else {
      rCurrent += 1;
      renderRandomQuestion();
    }
  }
  function prevRandomQuestion() {
    if (rCurrent > 0) { rCurrent -= 1; renderRandomQuestion(); }
  }
  function skipRandomQuestion() {
    rSelectedOptions[rCurrent] = [];
    rQuestionStatus[rCurrent] = 'skipped';
    if (rCurrent < randomQuizData.length - 1) { rCurrent += 1; renderRandomQuestion(); }
  }
  function showRandomHint() {
    const q = randomQuizData[rCurrent];
    if (rHintText && rHintSection) {
      rHintText.textContent = q.hint || "Pas d'indice pour cette question.";
      rHintSection.classList.remove('hidden');
    }
  }

  function updateStats() {
    let total = 0, answered = 0, correct = 0, incorrect = 0, skipped = 0;
    if (statsSource === 'main') {
      total = activeQuizData.length;
      answered = userAnswers.filter(answer => answer !== null).length;
      correct = questionStatus.filter(status => status === 'correct').length;
      incorrect = questionStatus.filter(status => status === 'incorrect').length;
      skipped = questionStatus.filter(status => status === 'skipped').length;
    } else {
      total = randomQuizData.length;
      answered = rUserAnswers.filter(answer => answer !== null).length;
      correct = rQuestionStatus.filter(status => status === 'correct').length;
      incorrect = rQuestionStatus.filter(status => status === 'incorrect').length;
      skipped = rQuestionStatus.filter(status => status === 'skipped' || status === 'unanswered').length;
    }
    const remaining = total - answered;
    const totalProgress = total === 0 ? 0 : (answered / total) * 100;
    progressPercent.textContent = `${Math.round(totalProgress)}%`;
    statsProgress.style.width = `${totalProgress}%`;
    answeredCount.textContent = answered;
    remainingCount.textContent = remaining;
    statsCorrect.textContent = correct;
    statsIncorrect.textContent = incorrect;
    statsSkipped.textContent = skipped;
  }

  totalQuestionsDisplay.textContent = activeQuizData.length;
  totalQuestions.textContent = activeQuizData.length;
  maxScore.textContent = activeQuizData.length;
  finalTotal.textContent = activeQuizData.length;

  if (statsSourceToggle) {
    statsSourceToggle.addEventListener('click', () => {
      statsSource = statsSource === 'main' ? 'random' : 'main';
      statsSourceLabel.textContent = statsSource === 'main' ? 'Principal' : 'Aléatoire 20Q';
      updateStats();
    });
  }

  function changeCategory(category) {
    currentCategory = category;
    categoryButtons.forEach(btn => {
      if (btn.dataset.category === category) {
        btn.classList.add('ring-2', 'ring-offset-2', 'ring-blue-500');
      } else {
        btn.classList.remove('ring-2', 'ring-offset-2', 'ring-blue-500');
      }
    });
    loadQuestion(0);
  }

  categoryButtons.forEach(btn => { btn.addEventListener('click', () => { changeCategory(btn.dataset.category); }); });

  function initializeQuiz() {
    console.log('Initializing quiz with', quizData.length, 'questions');
    if (!questionText || !optionsContainer) {
      console.error('Quiz elements not found in DOM');
      return;
    }
    if (quizData.length === 0) {
      console.error('No quiz data loaded');
      return;
    }
    updateCategoryCounts();
    loadQuestion(0);
    changeCategory('all');
    if (rQuestionText && rOptionsContainer) {
      renderRandomQuestion();
    }
    updateStats();
  }

  initializeQuiz();
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

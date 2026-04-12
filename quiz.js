/* ============================================
   BERETTA PX4 STORM — Quiz JavaScript
   18 questions, 1 point from office, max grade 10
   Features: shuffle, timer, localStorage progress save
   ============================================ */

const quizData = [
    {
        id: 1,
        question: "Care este calibrul pistolului Beretta PX4 Storm?",
        answers: [
            { text: "9 × 19 mm", correct: true },
            { text: "7,65 × 25 mm", correct: false },
            { text: "10 × 20 mm", correct: false }
        ]
    },
    {
        id: 2,
        question: "Cât este capacitatea încărcătorului pistolului Beretta PX4 Storm?",
        answers: [
            { text: "15 cartușe", correct: false },
            { text: "17 cartușe", correct: true },
            { text: "20 cartușe", correct: false }
        ]
    },
    {
        id: 3,
        question: "Care este greutatea armei descărcate cu încărcătorul gol?",
        answers: [
            { text: "650 grame", correct: false },
            { text: "785 grame", correct: true },
            { text: "920 grame", correct: false }
        ]
    },
    {
        id: 4,
        question: "Din ce material este confecționat corpul pistolului Beretta PX4 Storm?",
        answers: [
            { text: "Oțel inoxidabil", correct: false },
            { text: "Tehnopolimer consolidat din fibră de sticlă", correct: true },
            { text: "Aluminiu anodizat", correct: false }
        ]
    },
    {
        id: 5,
        question: "Care este lungimea totală a pistolului Beretta PX4 Storm?",
        answers: [
            { text: "162 mm", correct: false },
            { text: "192 mm", correct: true },
            { text: "222 mm", correct: false }
        ]
    },
    {
        id: 6,
        question: "Care este lungimea țevii pistolului?",
        answers: [
            { text: "85 mm", correct: false },
            { text: "102 mm", correct: true },
            { text: "120 mm", correct: false }
        ]
    },
    {
        id: 7,
        question: "Care este grosimea totală a pistolului?",
        answers: [
            { text: "28 mm", correct: false },
            { text: "36 mm", correct: true },
            { text: "42 mm", correct: false }
        ]
    },
    {
        id: 8,
        question: "Cum se numește sistemul de închidere al pistolului?",
        answers: [
            { text: "Închidere cu culisant", correct: false },
            { text: "Închidere geometrică cu țeavă cu translatare rotativă", correct: true },
            { text: "Închidere cu întăritura frontală", correct: false }
        ]
    },
    {
        id: 9,
        question: "Cu cât se rotește țeava în momentul tragerii?",
        answers: [
            { text: "Aproximativ 15 de grade", correct: false },
            { text: "Aproximativ 30 de grade", correct: true },
            { text: "Aproximativ 45 de grade", correct: false }
        ]
    },
    {
        id: 10,
        question: "Ce dispozitiv împiedică orice mișcare a percutorului dacă trăgaciul nu este tras complet?",
        answers: [
            { text: "Siguranța ambidextră", correct: false },
            { text: "Dispozitivul de blocare", correct: true },
            { text: "Pârghia de oprire", correct: false }
        ]
    },
    {
        id: 11,
        question: "Pe ce parte a pistolului este poziționată siguranța ambidextră?",
        answers: [
            { text: "Pe trăgaci", correct: false },
            { text: "Pe manșonul închizător", correct: true },
            { text: "Pe mâner", correct: false }
        ]
    },
    {
        id: 12,
        question: "Cum se numește pârghia care ține deschis închizătorul după ce ultimul cartuș a fost tras?",
        answers: [
            { text: "Pârghia de acoperiș", correct: false },
            { text: "Pârghia de oprire a închizătorului (slide stop)", correct: true },
            { text: "Pârghia de blocare", correct: false }
        ]
    },
    {
        id: 13,
        question: "Cât de des se recomandă curățarea și ungerea pistolului?",
        answers: [
            { text: "O dată la 3 luni", correct: false },
            { text: "După fiecare folosire sau cel puțin o dată pe lună", correct: true },
            { text: "O dată pe an", correct: false }
        ]
    },
    {
        id: 14,
        question: "Care este prima operație în procesul de demontare?",
        answers: [
            { text: "Se apasă butonul de eliberare a încărcătorului și se extrage", correct: true },
            { text: "Se trage de manșonul închizător în spate", correct: false },
            { text: "Se apasă șurubul de montaj", correct: false }
        ]
    },
    {
        id: 15,
        question: "Ce înseamnă pentru utilizator când manșonul închizător se blochează în poziție din spate după ultimul cartuș?",
        answers: [
            { text: "Pistolul are o problemă mecanică", correct: false },
            { text: "Pistolul nu mai are cartuș în camera cartușului sau în încărcător", correct: true },
            { text: "Siguranța este defectă", correct: false }
        ]
    },
    {
        id: 16,
        question: "Ce se recomandă a se folosi pentru curățarea țevii?",
        answers: [
            { text: "Apă curată", correct: false },
            { text: "Curățătorul din dotare cu ulei pentru arme", correct: true },
            { text: "Benzina", correct: false }
        ]
    },
    {
        id: 17,
        question: "Care este poziția intermediară a cocoșului?",
        answers: [
            { text: "Garantează oprirea pe maneta de tragere", correct: true },
            { text: "Permite armarea rapidă", correct: false },
            { text: "Reduce zgomotul în timpul tragerii", correct: false }
        ]
    },
    {
        id: 18,
        question: "Ce se întâmplă dacă pistolul cade și este eliberat accidental din poziția de tragere?",
        answers: [
            { text: "Se trage automat", correct: false },
            { text: "Cocoșul se oprește pe maneta de tragere înainte de a lovi percutorul", correct: true },
            { text: "Siguranța se dezactivează", correct: false }
        ]
    }
];

const STORAGE_KEY = 'beretta-quiz-state';

let state = null;        // current quiz state object
let timerInterval = null;
let saveTimeout = null;

document.addEventListener('DOMContentLoaded', () => {
    setupThemeToggle();
    setupNavToggle();
    state = createNewState({ shuffle: true, timer: true });
    document.getElementById('timerWrapper').style.display = '';
    initializeQuiz();
    setupQuizEventListeners();
    startTimer();
});

// === STATE / STORAGE ===

function createNewState({ shuffle, timer }) {
    const ids = quizData.map(q => q.id);
    const questionOrder = shuffle ? shuffleArray(ids) : ids.slice();

    // For each question, build a permutation of answer indices
    const answerOrder = {};
    quizData.forEach(q => {
        const idx = q.answers.map((_, i) => i);
        answerOrder[q.id] = shuffle ? shuffleArray(idx) : idx;
    });

    return {
        questionOrder,
        answerOrder,
        userAnswers: {},  // questionId -> chosen index in shuffled answer order
        shuffleEnabled: shuffle,
        timerEnabled: timer,
        timerElapsed: 0,
        timerStart: timer ? Date.now() : null,
        completed: false,
        finalResults: null
    };
}

function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        // Sanity check that parsed has the expected shape
        if (!parsed.questionOrder || !parsed.answerOrder) return null;
        return parsed;
    } catch (e) {
        return null;
    }
}

function saveState() {
    if (!state) return;
    // If timer is running, store the live elapsed value before persisting
    if (state.timerEnabled && state.timerStart && !state.completed) {
        state.timerElapsed = Date.now() - state.timerStart;
    }
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        showSaveIndicator();
    } catch (e) {
        // localStorage may be unavailable (private mode)
    }
}

function debouncedSave() {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(saveState, 250);
}

function clearState() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
}


function showSaveIndicator() {
    const el = document.getElementById('saveIndicator');
    if (!el) return;
    el.classList.add('visible');
    clearTimeout(showSaveIndicator._t);
    showSaveIndicator._t = setTimeout(() => el.classList.remove('visible'), 1200);
}

// === RENDERING ===

function initializeQuiz() {
    const form = document.getElementById('quizForm');
    form.innerHTML = '';

    state.questionOrder.forEach((qid, displayIndex) => {
        const question = quizData.find(q => q.id === qid);
        if (!question) return;

        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-card';
        questionDiv.id = `question-${question.id}`;

        const questionHeader = document.createElement('div');
        questionHeader.innerHTML = `
            <div class="question-number">Întrebarea ${displayIndex + 1} din ${state.questionOrder.length}</div>
            <div class="question-text"></div>
        `;
        questionHeader.querySelector('.question-text').textContent = question.question;
        questionDiv.appendChild(questionHeader);

        const answersDiv = document.createElement('div');
        answersDiv.className = 'answer-options';

        const answerPermutation = state.answerOrder[question.id];
        answerPermutation.forEach((origIndex, displayAnswerIndex) => {
            const answer = question.answers[origIndex];
            const optionDiv = document.createElement('div');
            optionDiv.className = 'answer-option';

            const inputId = `q${question.id}_a${displayAnswerIndex}`;

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question-${question.id}`;
            input.id = inputId;
            input.value = displayAnswerIndex;
            if (state.userAnswers[question.id] === displayAnswerIndex) {
                input.checked = true;
            }

            const label = document.createElement('label');
            label.htmlFor = inputId;
            label.className = 'answer-label';
            const radioSpan = document.createElement('span');
            radioSpan.className = 'answer-radio';
            const textSpan = document.createElement('span');
            textSpan.textContent = answer.text;
            label.appendChild(radioSpan);
            label.appendChild(textSpan);

            optionDiv.appendChild(input);
            optionDiv.appendChild(label);
            answersDiv.appendChild(optionDiv);

            input.addEventListener('change', () => {
                state.userAnswers[question.id] = displayAnswerIndex;
                document.getElementById(`question-${question.id}`).classList.add('answered');
                updateProgress();
                debouncedSave();
            });
        });

        if (state.userAnswers[question.id] !== undefined) {
            questionDiv.classList.add('answered');
        }

        questionDiv.appendChild(answersDiv);
        form.appendChild(questionDiv);
    });

    updateProgress();
}

// === EVENT LISTENERS ===

function setupQuizEventListeners() {
    document.getElementById('submitBtn').addEventListener('click', submitQuiz);
    document.getElementById('resetBtn').addEventListener('click', resetAnswers);
    document.getElementById('retakeBtn').addEventListener('click', retakeQuiz);
}

function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || storedTheme === 'light') {
        root.setAttribute('data-theme', storedTheme);
    }
    if (!themeToggle) return;
    themeToggle.addEventListener('click', () => {
        const current = root.getAttribute('data-theme');
        let next;
        if (current === 'dark') next = 'light';
        else if (current === 'light') next = 'dark';
        else next = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        themeToggle.setAttribute('aria-label',
            next === 'dark' ? 'Schimbă la tema luminoasă' : 'Schimbă la tema întunecată');
    });
}

function setupNavToggle() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (!navToggle || !navMenu) return;
    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.setAttribute('aria-label', isOpen ? 'Închide meniul' : 'Deschide meniul');
    });
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Deschide meniul');
        });
    });
}

// === TIMER ===

function startTimer() {
    stopTimer();
    if (!state.timerStart) state.timerStart = Date.now() - (state.timerElapsed || 0);
    updateTimerDisplay(Date.now() - state.timerStart);
    timerInterval = setInterval(() => {
        const elapsed = Date.now() - state.timerStart;
        updateTimerDisplay(elapsed);
    }, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function updateTimerDisplay(ms) {
    const display = document.getElementById('timerDisplay');
    if (!display) return;
    const totalSec = Math.floor(ms / 1000);
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    display.textContent = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

// === PROGRESS ===

function updateProgress() {
    const totalQuestions = quizData.length;
    const answeredCount = Object.keys(state.userAnswers).length;
    const percentage = (answeredCount / totalQuestions) * 100;
    document.getElementById('progressFill').style.width = percentage + '%';
}

// === SUBMIT ===

function submitQuiz() {
    let correctAnswers = 0;
    const wrongAnswers = [];

    state.questionOrder.forEach((qid) => {
        const question = quizData.find(q => q.id === qid);
        const userIdx = state.userAnswers[qid];
        const permutation = state.answerOrder[qid];

        let userText = 'Nu a răspuns';
        let isCorrect = false;
        if (userIdx !== undefined) {
            const origIndex = permutation[userIdx];
            const chosen = question.answers[origIndex];
            userText = chosen.text;
            isCorrect = chosen.correct;
        }

        if (isCorrect) {
            correctAnswers++;
        } else {
            const correctOrigIndex = question.answers.findIndex(a => a.correct);
            wrongAnswers.push({
                id: question.id,
                question: question.question,
                userAnswer: userText,
                correctAnswer: question.answers[correctOrigIndex].text
            });
        }
    });

    const score = 1 + (correctAnswers * 0.5);
    const percentage = (correctAnswers / quizData.length) * 100;

    state.completed = true;
    state.finalResults = { score, percentage, correctAnswers, wrongAnswers };
    stopTimer();
    saveState();

    showResults(score, percentage, correctAnswers, wrongAnswers);
}

function showResults(score, percentage, correctAnswers, wrongAnswers) {
    document.getElementById('quizForm').classList.add('hidden');
    document.getElementById('quizActions').style.display = 'none';

    const resultsSection = document.getElementById('resultsSection');
    resultsSection.classList.add('show');

    document.getElementById('finalScore').textContent = score.toFixed(2);
    document.getElementById('scorePercentage').textContent = `${percentage.toFixed(1)}% corecte (${correctAnswers}/18)`;

    let message = '';
    if (score >= 9) message = 'Excelent!';
    else if (score >= 8) message = 'Foarte bine!';
    else if (score >= 7) message = 'Bine!';
    else if (score >= 6) message = 'Satisfăcător';
    else message = 'Încearcă din nou';

    if (state.timerEnabled && state.timerStart) {
        const totalSec = Math.floor((state.timerElapsed || (Date.now() - state.timerStart)) / 1000);
        const min = Math.floor(totalSec / 60);
        const sec = totalSec % 60;
        message += ` (timp: ${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')})`;
    }

    document.getElementById('scoreMessage').textContent = message;

    if (wrongAnswers.length > 0) {
        displayWrongAnswers(wrongAnswers);
    }
}

function displayWrongAnswers(wrongAnswers) {
    const resultsSection = document.getElementById('resultsSection');
    const existing = resultsSection.querySelector('#wrong-answers');
    if (existing) existing.remove();

    const wrap = document.createElement('div');
    wrap.id = 'wrong-answers';
    wrap.style.cssText = 'margin-top: 2rem; text-align: left;';

    const heading = document.createElement('h3');
    heading.style.cssText = 'font-size: 1.3rem; margin-bottom: 1.5rem; color: var(--text-primary);';
    heading.textContent = 'Răspunsuri greșite:';
    wrap.appendChild(heading);

    wrongAnswers.forEach((item) => {
        const card = document.createElement('div');
        card.style.cssText = 'background: var(--bg-alt); padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid var(--accent);';

        const q = document.createElement('div');
        q.style.cssText = 'font-weight: 600; color: var(--text-primary); margin-bottom: 0.75rem;';
        q.textContent = `Întrebarea ${item.id}: ${item.question}`;
        card.appendChild(q);

        const userRow = document.createElement('div');
        userRow.style.cssText = 'margin: 0.75rem 0; color: var(--text-secondary);';
        const userLbl = document.createElement('span');
        userLbl.style.fontWeight = '500';
        userLbl.textContent = 'Ce ai ales tu: ';
        const userVal = document.createElement('span');
        userVal.style.color = '#d9534f';
        userVal.textContent = item.userAnswer;
        userRow.appendChild(userLbl);
        userRow.appendChild(userVal);
        card.appendChild(userRow);

        const correctRow = document.createElement('div');
        correctRow.style.cssText = 'margin: 0.75rem 0; color: var(--text-secondary);';
        const correctLbl = document.createElement('span');
        correctLbl.style.fontWeight = '500';
        correctLbl.textContent = 'Răspunsul corect: ';
        const correctVal = document.createElement('span');
        correctVal.style.color = '#5cb85c';
        correctVal.textContent = item.correctAnswer;
        correctRow.appendChild(correctLbl);
        correctRow.appendChild(correctVal);
        card.appendChild(correctRow);

        wrap.appendChild(card);
    });

    resultsSection.insertBefore(wrap, resultsSection.querySelector('#retakeBtn'));
}

// === RESET ACTIONS ===

function resetAnswers() {
    // Clear the current selection but keep the same shuffled order
    state.userAnswers = {};
    document.getElementById('quizForm').reset();
    document.querySelectorAll('.question-card').forEach(card => {
        card.classList.remove('answered');
    });
    updateProgress();
    saveState();
}

function retakeQuiz() {
    state = createNewState({ shuffle: true, timer: true });
    showResultsHidden();
    initializeQuiz();
    startTimer();
    saveState();
}

function showResultsHidden() {
    const resultsSection = document.getElementById('resultsSection');
    resultsSection.classList.remove('show');
    document.getElementById('quizForm').classList.remove('hidden');
    document.getElementById('quizActions').style.display = 'flex';
    const wrong = document.getElementById('wrong-answers');
    if (wrong) wrong.remove();
}

// === UTIL ===

function shuffleArray(arr) {
    const copy = arr.slice();
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

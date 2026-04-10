/* ============================================
   BERETTA PX4 STORM — Quiz JavaScript
   18 questions, 1 point from office, max grade 10
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

document.addEventListener('DOMContentLoaded', () => {
    initializeQuiz();
    setupEventListeners();
});

function initializeQuiz() {
    const form = document.getElementById('quizForm');
    form.innerHTML = '';

    quizData.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-card';
        questionDiv.id = `question-${question.id}`;

        const questionHeader = document.createElement('div');
        questionHeader.innerHTML = `
            <div class="question-number">Întrebarea ${index + 1} din 18</div>
            <div class="question-text">${question.question}</div>
        `;
        questionDiv.appendChild(questionHeader);

        const answersDiv = document.createElement('div');
        answersDiv.className = 'answer-options';

        question.answers.forEach((answer, answerIndex) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'answer-option';

            const inputId = `q${question.id}_a${answerIndex}`;

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question-${question.id}`;
            input.id = inputId;
            input.value = answerIndex;

            const label = document.createElement('label');
            label.htmlFor = inputId;
            label.className = 'answer-label';
            label.innerHTML = `
                <span class="answer-radio"></span>
                <span>${answer.text}</span>
            `;

            optionDiv.appendChild(input);
            optionDiv.appendChild(label);
            answersDiv.appendChild(optionDiv);

            // Mark question as answered when selection changes
            input.addEventListener('change', () => {
                document.getElementById(`question-${question.id}`).classList.add('answered');
                updateProgress();
            });
        });

        questionDiv.appendChild(answersDiv);
        form.appendChild(questionDiv);
    });
}

function setupEventListeners() {
    document.getElementById('submitBtn').addEventListener('click', submitQuiz);
    document.getElementById('resetBtn').addEventListener('click', resetQuiz);
    document.getElementById('retakeBtn').addEventListener('click', retakeQuiz);

    // Mobile nav toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

function updateProgress() {
    const form = document.getElementById('quizForm');
    const totalQuestions = quizData.length;
    const answeredQuestions = form.querySelectorAll('input[type="radio"]:checked').length;
    const percentage = (answeredQuestions / totalQuestions) * 100;

    document.getElementById('progressFill').style.width = percentage + '%';
}

function submitQuiz() {
    const form = document.getElementById('quizForm');
    let correctAnswers = 0;
    const wrongAnswers = [];

    quizData.forEach((question) => {
        const selectedAnswer = form.querySelector(`input[name="question-${question.id}"]:checked`);
        const selectedIndex = selectedAnswer ? parseInt(selectedAnswer.value) : -1;
        const isCorrect = selectedIndex !== -1 && question.answers[selectedIndex].correct;

        if (isCorrect) {
            correctAnswers++;
        } else {
            // Collect wrong answers
            const correctIndex = question.answers.findIndex(a => a.correct);
            wrongAnswers.push({
                id: question.id,
                question: question.question,
                userAnswer: selectedIndex !== -1 ? question.answers[selectedIndex].text : 'Nu a răspuns',
                correctAnswer: question.answers[correctIndex].text
            });
        }
    });

    // Calculate score: 1 point from office + (correct answers × 0.5)
    const score = 1 + (correctAnswers * 0.5);
    const percentage = (correctAnswers / quizData.length) * 100;

    showResults(score, percentage, correctAnswers, wrongAnswers);
}

function showResults(score, percentage, correctAnswers, wrongAnswers) {
    document.getElementById('quizForm').classList.add('hidden');
    document.getElementById('quizActions').style.display = 'none';

    const resultsSection = document.getElementById('resultsSection');
    resultsSection.classList.add('show');

    document.getElementById('finalScore').textContent = score.toFixed(2);
    document.getElementById('scorePercentage').textContent = `${percentage.toFixed(1)}% corecte (${correctAnswers}/18)`;

    // Message based on score
    let message = '';
    if (score >= 9) {
        message = 'Excelent! 🎯';
    } else if (score >= 8) {
        message = 'Foarte bine! 👏';
    } else if (score >= 7) {
        message = 'Bine! ✓';
    } else if (score >= 6) {
        message = 'Satisfăcător';
    } else {
        message = 'Încearcă din nou';
    }

    document.getElementById('scoreMessage').textContent = message;

    // Show wrong answers if any
    if (wrongAnswers.length > 0) {
        displayWrongAnswers(wrongAnswers);
    }
}

function displayWrongAnswers(wrongAnswers) {
    let wrongAnswersHTML = '<div style="margin-top: 2rem; text-align: left;">';
    wrongAnswersHTML += '<h3 style="font-size: 1.3rem; margin-bottom: 1.5rem; color: var(--text-primary);">Răspunsuri greșite:</h3>';

    wrongAnswers.forEach((item, index) => {
        wrongAnswersHTML += `
            <div style="background: var(--bg-alt); padding: 1.5rem; border-radius: 8px; margin-bottom: 1rem; border-left: 4px solid var(--accent);">
                <div style="font-weight: 600; color: var(--text-primary); margin-bottom: 0.75rem;">Întrebarea ${item.id}: ${item.question}</div>
                <div style="margin: 0.75rem 0; color: var(--text-secondary);">
                    <span style="font-weight: 500;">Ce ai ales tu:</span>
                    <span style="color: #d9534f;">${item.userAnswer}</span>
                </div>
                <div style="margin: 0.75rem 0; color: var(--text-secondary);">
                    <span style="font-weight: 500;">Răspunsul corect:</span>
                    <span style="color: #5cb85c;">${item.correctAnswer}</span>
                </div>
            </div>
        `;
    });

    wrongAnswersHTML += '</div>';

    // Insert the wrong answers after the score section
    const resultsSection = document.getElementById('resultsSection');
    const existingWrongAnswers = resultsSection.querySelector('[id="wrong-answers"]');
    if (existingWrongAnswers) {
        existingWrongAnswers.remove();
    }

    const wrongAnswersDiv = document.createElement('div');
    wrongAnswersDiv.id = 'wrong-answers';
    wrongAnswersDiv.innerHTML = wrongAnswersHTML;
    resultsSection.insertBefore(wrongAnswersDiv, resultsSection.querySelector('#retakeBtn'));
}

function resetQuiz() {
    document.getElementById('quizForm').reset();
    document.querySelectorAll('.question-card').forEach(card => {
        card.classList.remove('answered');
    });
    document.getElementById('progressFill').style.width = '0%';
}

function retakeQuiz() {
    document.getElementById('resultsSection').classList.remove('show');
    document.getElementById('quizForm').classList.remove('hidden');
    document.getElementById('quizActions').style.display = 'flex';

    // Remove wrong answers display
    const wrongAnswersDiv = document.getElementById('wrong-answers');
    if (wrongAnswersDiv) {
        wrongAnswersDiv.remove();
    }

    resetQuiz();
}

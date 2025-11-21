// Game variables
let currentTable = 0;
let timeLeft = 120; // 2 minutes in seconds
let timerInterval;
let stars = 0;
let currentQuestion = 1;
let totalQuestions = 10;

// DOM Elements
const selectionScreen = document.getElementById('selectionScreen');
const studyScreen = document.getElementById('studyScreen');
const testScreen = document.getElementById('testScreen');
const tableSelect = document.getElementById('tableSelect');
const startBtn = document.getElementById('startBtn');
const timerDisplay = document.getElementById('timer');
const tableDisplay = document.getElementById('tableDisplay');
const testBtn = document.getElementById('testBtn');
const starCount = document.getElementById('starCount');
const questionContainer = document.getElementById('questionContainer');
const resultDisplay = document.getElementById('result');

// Initialize table options (2-20)
function initializeTables() {
    for (let i = 2; i <= 20; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Table of ${i}`;
        tableSelect.appendChild(option);
    }
}

// Start learning process
function startLearning() {
    currentTable = parseInt(tableSelect.value);
    
    if (!currentTable) {
        alert('Please select a table to learn!');
        return;
    }
    
    showScreen(studyScreen);
    displayTable();
    startTimer();
}

// Display multiplication table
function displayTable() {
    tableDisplay.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
        const row = document.createElement('div');
        row.textContent = `${currentTable} × ${i} = ${currentTable * i}`;
        tableDisplay.appendChild(row);
    }
}

// Timer functionality
function startTimer() {
    timeLeft = 120;
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            testBtn.style.display = 'block';
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Start test
function startTest() {
    showScreen(testScreen);
    stars = 0;
    currentQuestion = 1;
    updateStarDisplay();
    askQuestion();
}

// Ask a question
function askQuestion() {
    const multiplier = Math.floor(Math.random() * 10) + 1;
    const correctAnswer = currentTable * multiplier;
    
    questionContainer.innerHTML = `
        <div>Question ${currentQuestion}/${totalQuestions}</div>
        <div style="margin: 20px 0; font-size: 1.5em;">
            ${currentTable} × ${multiplier} = 
            <input type="number" id="userAnswer" placeholder="?">
        </div>
        <button onclick="checkAnswer(${correctAnswer})" class="btn-primary">
            Submit Answer
        </button>
    `;
}

// Check answer
function checkAnswer(correctAnswer) {
    const userAnswer = parseInt(document.getElementById('userAnswer').value);
    
    if (isNaN(userAnswer)) {
        alert('Please enter a number!');
        return;
    }
    
    if (userAnswer === correctAnswer) {
        stars++;
        showResult('Correct! 🎉 +1 Star', 'correct');
    } else {
        showResult(`Wrong! ❌ Correct answer: ${correctAnswer}`, 'wrong');
    }
    
    updateStarDisplay();
    currentQuestion++;
    
    // Next question or finish
    setTimeout(() => {
        if (currentQuestion <= totalQuestions) {
            askQuestion();
        } else {
            showFinalResults();
        }
    }, 2000);
}

// Show result message
function showResult(message, className) {
    resultDisplay.textContent = message;
    resultDisplay.className = `result ${className}`;
}

// Update star display
function updateStarDisplay() {
    starCount.textContent = stars;
}

// Show final results
function showFinalResults() {
    questionContainer.innerHTML = `
        <h3>Test Complete! 🏆</h3>
        <div style="font-size: 1.5em; margin: 20px 0;">
            You earned ${stars} out of ${totalQuestions} stars!
        </div>
        <div style="font-size: 3em; margin: 20px 0;">
            ${'⭐'.repeat(stars)}
        </div>
        <button onclick="restartGame()" class="btn-primary">
            Play Again
        </button>
    `;
    resultDisplay.textContent = '';
}

// Restart game
function restartGame() {
    showScreen(selectionScreen);
    clearInterval(timerInterval);
}

// Show specific screen
function showScreen(screen) {
    selectionScreen.classList.remove('active');
    studyScreen.classList.remove('active');
    testScreen.classList.remove('active');
    screen.classList.add('active');
}

// Event listeners
startBtn.addEventListener('click', startLearning);
testBtn.addEventListener('click', startTest);

// Skip study mode for testing (remove in final version)
testBtn.addEventListener('dblclick', () => {
    clearInterval(timerInterval);
    testBtn.style.display = 'block';
});

// Initialize game
initializeTables();

// In showFinalResults() function, replace the stars line with:
questionContainer.innerHTML = `
    <h3>Test Complete! 🏆</h3>
    <div style="font-size: 1.5em; margin: 20px 0;">
        You earned ${stars} out of ${totalQuestions} stars!
    </div>
    <div class="stars-container">
        ${'⭐'.repeat(stars)}
    </div>
    <button onclick="restartGame()" class="btn-primary">
        Play Again
    </button>
`;
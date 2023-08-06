const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('questions-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const timerEl = document.getElementById('js-timer');
const scoresPage = document.getElementById('scores-page')
const initials = document.getElementById('initials')
const submit = document.getElementById('submit')
const list = document.getElementById('list')
const gameOverScreen = document.getElementById('game-over')
const retryButton = document.getElementById('retry')
const userTime = JSON.parse (localStorage.getItem('Highscores')) || []

// Five questions to answer
const questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        answers: [
            { text: '<script>', correct: true },
            { text: '<scripting>', correct: false },
            { text: '<javascript>', correct: false },
            { text: '<js>', correct: false }
        ],
       
    },
    {
        question: 'Where is the correct place to insert a JavaScript file?',
        answers: [
            { text: 'Both the <head> section and the <body> section are correct', correct: true },
            { text: 'The <head> section', correct: false },
            { text: 'The <body> section', correct: false },
            { text: "You don't have to link your file", correct: false }
        ],
       
    },
    {
        question: 'How do you create a function in JavaScript?',
        answers: [
            { text: 'function myFunction() ', correct: true },
            { text: 'function:myFunction()', correct: false },
            { text: 'function = myFunction()', correct: false },
            { text: 'myFunction() = function', correct: false }
        ],

    },
    {
        question: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
        answers: [
            { text: 'if (i != 5)', correct: true },
            { text: 'if i <> 5', correct: false },
            { text: 'if i =! 5 then', correct: false },
            { text: 'if (i <> 5)', correct: false }
        ],
    
    },
    {
        question: 'What is the correct way to write a JavaScript array?',
        answers: [
            { text: 'var colors = ["red", "green", "blue"]', correct: true },
            { text: 'var colors = "red", "green", "blue"', correct: false },
            { text: 'var colors = (1:"red", 2:"green", 3:"blue")', correct: false },
            { text: 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")', correct: false }
        ],
    
    }
]

// How much time to countdown from
let timeLeft = 75;
let shuffledQuestions, currentQuestionIndex, timeInterval
// When start button is pressed, the game is started aka startGame function runs
startButton.addEventListener('click', startGame)

// When you click next, the next question is set
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

// When submit button is pressed, the score is saved to local storage 
submit.addEventListener('click', saveScores, )

// When timer starts, and timer is above 1, plural
// Timer === 1, singular
// When timer reaches 0, the timer stops, is hidden, and says alert 
function countdown() {
    timeInterval = setInterval(function () {
        console.log(timeLeft)
        if (timeLeft > 1) {
            timerEl.textContent = timeLeft + ' seconds remaining';
            timeLeft--;
        } else if (timeLeft === 1) {
            timerEl.textContent = timeLeft + ' second remaining';
            timeLeft--;
        } else {
        (timeLeft < 0) 
            clearInterval(timeInterval)
            timerEl.classList.add('hide')
            gameOver()
        }
    }, 1000); 
}
// Starts the game, hides start screen, displays questions
function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
    countdown()
}
// Shuffles questions each time quiz is played
function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])

}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}
// Allows quiz to continue to next question after pressing next
function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })

    //
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
            questionContainerElement.classList.add('hide')
            scoresPage.classList.remove('hide')
    }
}
// If selecting correct answer, green; else red
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
        // If answer is incorrect, -5 on time
        timeLeft -= 1
    }
}

// New question, screen goes back to neutral blue
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}


// Allows scores to be saved into local storage to be accessed for highscore list
function saveScores() {
    let userInitials = initials.value;
    userTime.push({initials: userInitials, score: timeLeft})
    localStorage.setItem('Highscores', JSON.stringify(userTime))
    // console.log(userInitials);

    if (localStorage.getItem('Highscores')) {
        const highScoresEl = document.getElementById('highscores')
        const highscoresLi = JSON.parse(localStorage.getItem('Highscores'))
        for (let i = 0; i < highscoresLi.length; i++) {
            highScoresEl.textContent = highscoresLi[i].userInitials + ":" + highscoresLi[i].userTime;
            console.log(highscoresLi[i])
            console.log(highscoresLi[i].initials, highscoresLi[i].score)

            // let list = document.getElementById('list')
            // list.append(highscoresLi[i])
        }
    }
}

// let list = document.getElementById('list')
// list.append(highscoresLi)
// let li = document.createElement('li')
// highscoresEl.append(li)

function gameOver() {
    if (timeLeft === 0) 
    questionContainerElement.classList.add('hide')
    gameOverScreen.classList.remove('hide')

}
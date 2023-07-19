const startButton = document.getElementById('start-btn')

const nextButton = document.getElementById('next-btn')

const questionContainerElement = document.getElementById('questions-container')

const questionElement = document.getElementById('question')

const answerButtonsElement = document.getElementById('answer-buttons')

const timerEl = document.getElementById('js-timer');

const endPage = document.getElementById('end-page')

const initials = document.getElementById('initials')

const submit = document.getElementById('submit')

const gameOver = document.getElementById('game-over')

const retryButton = document.getElementById('retry')

const scoreButton = document.getElementById('scores-btn')

const userInitials = initials.value

const userTime = JSON.parse (localStorage.getItem('Highscores')) || []

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

let timeLeft = 75;

let shuffledQuestions, currentQuestionIndex, timeInterval

startButton.addEventListener('click', startGame)

nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

submit.addEventListener('click', saveScores)

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
        //    saveScores() (
        //     clearInterval(countdown)
        //    ) 
        //     trying to stop clock when quiz is over
            
        }    //else {
            //timerEl.textContent = '';
            //clearInterval(timeInterval);
        //}
        //  this stops clock when timer reaches 0
    }, 1000); 
}

document.getElementById('wrong').addEventListener('click', function(){
    sec -= 5;
    // timerEl.innerHTML="00:"+sec;
});


function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
    countdown()
}

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

    
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
            questionContainerElement.classList.add('hide')
            endPage.classList.remove('hide')
            timerEl
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

function saveScores() {
    userTime.push({initials: userInitials, score: timeLeft})
    localStorage.setItem('Highscores', JSON.stringify(userTime))
    // console.log(userInitials);
}

function highscores() {
    const highScoresEl = document.getElementById('highscores')
    const highscoresLi = JSON.parse (localStorage.getItem ('Highscores')) || []

    let i;
    for (i = 0; i < highscoresLi.length; i++) {
        highscoresLi[i] + "<li>";
      }

      highScoresEl.textContent = highscoresLi[i].userInitials + ":" + highscoresLi[i].userTime;

      highscoresLi.append(highScoresEl)
}

highscores()
const questions = [
    {
        question: 'Which is largest animal in the world?',
        answers: [
            {text: 'Shark', correct: false},
            {text: 'Blue whale', correct: true},
            {text: 'Elephant', correct: false},
            {text: 'Lion', correct: false},
        ]
    },
    {
        question: 'The name of our planet is?',
        answers: [
            {text: 'Earth', correct: true},
            {text: 'Venus', correct: false},
            {text: 'Mars', correct: false},
            {text: 'Moon', correct: false},
        ]
    },
    {
        question: 'The most popular programming language is?',
        answers: [
            {text: 'Python', correct: false},
            {text: 'C++', correct: false},
            {text: 'JavaScript', correct: true},
            {text: 'Java', correct: false},
        ]
    },
    {
        question: 'Age of the planet Earth is?',
        answers: [
            {text: '800 millions', correct: false},
            {text: '2 billions', correct: false},
            {text: '4.4 billions', correct: true},
            {text: '14 billions', correct: false},
        ]
    },
];

const questionElement = document.querySelector('#question');
const answerButtons = document.querySelector('#answer-buttons');
const nextButton = document.querySelector('#next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = 'Next';
    showQuestion();
};

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
         const button = document.createElement('button');
         button.innerHTML = answer.text;
         button.classList.add('btn');
         answerButtons.appendChild(button); 
         if(answer.correct) {
            button.dataset.correct = answer.correct;
         }
         button.addEventListener('click', selectAnswer)
    });
}


function resetState(){
    nextButton.style.display = 'none';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === 'true') {
            button.classList.add('correct');
        }
        button.disabled = true;
    });
    nextButton.style.display = 'block';
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = 'Play again';
    nextButton.style.display = 'block';
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}


nextButton.addEventListener('click', () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
})


startQuiz();
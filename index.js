// //importing the database questions from qiestions.js
// import { questions } from './questions.js';


//connect a dom to the question for display
const question = document.getElementById('question')
//connect a dom to the choices for display
const choices = Array.from(document.querySelectorAll('.choice-text'))
//connect a dom to the progressText for updating the game.html hud progress text
const progressText = document.getElementById('progresstext')
//connect a dom to the progressbar id for updating the game.html UI
const progressBar = document.getElementById('progressBarFull')
//connect a dom to save score and updatee user Score
const ScoreText = document.getElementById('score')

let questionCounter = 0;
let currentQuestion = {}
let availableQuestions = []
let score = 0
let acceptingAnswers = true;



let questions = [];

//fetching the questions from questions.json
fetch('./questions.json').then(res => {
    console.log(res)
    return res.json()
}).then(loaddedQuestions => {
    console.log(loaddedQuestions)
    questions = loaddedQuestions
    startGame()
}).catch((err) => {
    console.error(err)
})


const SCORE_BONUS = 10;
const MAX_QUESTIONS = 3;


const startGame = () => {
    
    //reset the question counter to zero
    questionCounter = 0
    //resetting the score to zero
    score = 0;
    //add the question databaes into the array so that questions data can be manipulated without deleting important data
    availableQuestions = [...questions]


    //function to get new question has been triggered 
    getNewQuestion()    
}


const getNewQuestion = () => {
 if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
  localStorage.setItem('mostRecentScore', score);
  return window.location.assign('./end.html');
}



    //upon the excution of the get new question function, the question counter is first to be activated
    questionCounter++;

    //update various UIs such for progress text and progress bar
    progressText.innerText = `Question: ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBar.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    //indexing questions from the database and randomizing the question to prevent cheating
     let questionIndex = Math.floor(Math.random() * availableQuestions.length);
     currentQuestion = availableQuestions[questionIndex];

     //displaing the curent question that has been selected by the random method in our game.html question div
     question.innerText = currentQuestion.question;
     console.log(question.innerText);

     choices.forEach((choice) => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
        
     })

     //splicing out the question that has already been displayed to prevent repetition

     availableQuestions.splice(questionIndex, 1)
console.log(questionIndex);

     acceptingAnswers = true;
     

} 



choices.forEach((choice) => {
  choice.addEventListener('click', e => {
    if(!acceptingAnswers) return 
    
    acceptingAnswers = false;

        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];
       

         let classToApply = selectedAnswer === currentQuestion.Answer ? 'correct' : 'incorrect';
        if(classToApply === 'correct') {
            increaseScore(SCORE_BONUS)
        }
        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply)
        getNewQuestion()
}, 1000)
        
    
  }) 
  
})





const increaseScore = (num) => {
    score += num;
    ScoreText.innerText = score; 
}











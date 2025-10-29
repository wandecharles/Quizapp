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
//exit quiz button
const exitQuizBtn = document.getElementById('exit');

let questionCounter = 0;
let currentQuestion = {}
let availableQuestions = []
let score = 0
let acceptingAnswers = true;


question.innerText = "Loading Question";
choices.forEach(choice => {
choice.innerText = "Loading...";
});








// function decodeHTML(html) {
//     const txt = document.createElement('textarea');
//     txt.innerHTML = html;
//     return txt.value;
// }



let questions = [];





//fetching the questions from questions.json
fetch('https://opentdb.com/api.php?amount=50&category=9&type=multiple').then(res => {
    console.log(res)
    return res.json()
}).then(loaddedQuestions => {
    console.log(loaddedQuestions.results)
    questions = loaddedQuestions.results.map( (loaddedQuestion) => {
        const formatedQuestion = {
            //decoding html tags from questions 
            question: loaddedQuestion.question
            
        }
        const answerChoices = [...loaddedQuestion.incorrect_answers];
        formatedQuestion.answer = Math.floor(Math.random() * 4) + 1;
        answerChoices.splice(
            formatedQuestion.answer - 1, 0,  loaddedQuestion.correct_answer
        );

        answerChoices.forEach((choice, index) => {
            formatedQuestion['choice' + (index + 1)] = choice;
        });

        return formatedQuestion;
    
    });
  
    startGame()
}).catch((err) => {
    console.error(err)
    question.innerText = "Failed to load questions 😥";
    
})


const SCORE_BONUS = 10;
const MAX_QUESTIONS = 45;


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
        //parsed slected Answer as an integer
        const selectedAnswer = parseInt(selectedChoice.dataset['number']);
       

         let classToApply = selectedAnswer === currentQuestion.answer ? 'correct' : 'incorrect';
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


exitQuizBtn.addEventListener('click', () => {
    localStorage.setItem('mostRecentScore', score);
    return window.location.assign('./end.html');
})











// // Create a JS Quiz that includes:
// // 1. Landing Page with a start button 
// // 2. A timer of 3 minutes or 180 Seconds
// // 3. 10 Questions with the prompt of correct or incorrect
// // 4. Correct answers add to the score
// // 5. Incorrect answers subtracts from the timer


// Created an oveall closure fucntion for my quiz
(function(){

const cover = document.getElementById("cover");
const quizContainer = document.getElementById("quiz");
const quizControl = document.getElementById("quizControl");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");
const quizTimer = document.getElementById("time");
const timeContainer = document.getElementById("timeContainer");
  
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");
const startButton = document.getElementById("start");

submitButton.addEventListener("click", submitQuiz);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);
startButton.addEventListener("click", startQuiz);

const quizInterval = 1000;
const quizWrongAnswer = -15000;
const quizDuration = quizTimer.dataset.duration;
let currentSlide = 0;
let quizCurrent = 0;

// Created my questions as Objects
const myQuestions = [
    {
        question: "Which foundation and browser did Brendan Eich, the inventer of JavaScript, co-founded?",
        answers:{
            A: "Google Chrome",
            B: "Apple Safari",
            C: "Mozilla Firefox",
            D: "Opera",
        },
        correctAnswer: "C"
    },
    {
        question: "What is a 'String' in JavaScript?",
        answers:{
            A: "number",
            B: "text",
            C: "array",
            D: "function",
        },
        correctAnswer: "B"
    },
    {
        question: "What is another name for the JavaScript language",
        answers:{
            A: "ECMAScript",
            B: "Java",
            C: "Swift",
            D: "typeScript",
        },
        correctAnswer: "A"
    },
    {
        question: "What do the operators '=' and '===' do?",
        answers:{
            A: "=: Array | ====: Object",
            B: "=: Equality | ====: Assignment",
            C: "=: Balance | ====: Triple Balance",
            D: "=: Assignment | ====: Equality",
        },
        correctAnswer: "D"
    },
    {
        question: "What do you need to return a value from a custom function?",
        answers:{
            A: "You need to add two semicolons.",
            B: "You need to use the return keyword.",
            C: "You need to make it into an object.",
            D: "You need the use the dot notation.",
        },
        correctAnswer: "B"
    },
    {
        question: "JSON is what type of data format following JavaScript object syntax?",
        answers:{
            A: "Client-side web APIs",
            B: "Numeric-based",
            C: "Swift-based",
            D: "Text-based",
        },
        correctAnswer: "D"
    },
    {
        question: "What do you have to use to access an object's properties and methods?",
        answers:{
            A: "Brackets",
            B: "Forward Slash",
            C: "Back Slash",
            D: "Dot Notation",
        },
        correctAnswer: "D"
    },
    {
        question: "Hoisting is a default behavior in JavaScript that moves what to the top?",
        answers:{
            A: "Arrays",
            B: "Declarations",
            C: "Objects",
            D: "Functions",
        },
        correctAnswer: "B"
    },
    {
        question: "What does the acronyms 'DOM' stands for?",
        answers:{
            A: "Document Object Model",
            B: "Document Online Memory",
            C: "Dos Onject Mapping",
            D: "Divergent Object Model",
        },
        correctAnswer: "A"
    },
    {
        question: "What three arguments are invoked in a 'callback'?",
        answers:{
            A: "The name of the string, the index of the element, the Array object being traversed ",
            B: "The value of the element, the index of the element, the Array object being traversed",
            C: "The keyword of the binding, the keyword of the callback, dot notation",
            D: "The name of the element, all the operators being used, the Array being invoked",
        },
        correctAnswer: "B"
    }];

// Building cover page 
    // 1. Welcome text, 
    // 2. start button, 
    // 3. timer, 
    // 4. presing start starts the timer

// Building the quiz
function buildQuiz(){
const output = [];
myQuestions.forEach(
    (currentQuestion, questionNumber) => {
        const answers = [];
        for(letter in currentQuestion.answers){
        answers.push(
            `<label class="answer">
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
            </label>`
        );
        }
        output.push(
        `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join("")} </div>
        </div>`
        );
    }
    );
    quizContainer.innerHTML = output.join("");
}

    //Bulding the results from the quiz
function showResults(){
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0; 
    myQuestions.forEach( (currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
    if(userAnswer === currentQuestion.correctAnswer){
        numCorrect++;
    }
});

resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
}

function submitQuiz(){
    timeContainer.style.display = "none";
    showResults();
}


// Writing a check answer function that gets call when people select the wrong answer 
function checkAnswer (slide){
    // console.log(.correctAnswer);
    const currentCorrectAnswer = myQuestions[slide].correctAnswer;
    const currentUserAnswer = document.querySelectorAll('.active-slide')[0];
    const selector = `input[type='radio']:checked`;
    const userSelectedAnswer = (currentUserAnswer.querySelector(selector) || {}).value;
    return (currentCorrectAnswer === userSelectedAnswer);
    
    // const answerContainers = quizContainer.querySelectorAll('.answers');
    // myQuestions.forEach( (currentQuestion, questionNumber) => {
    //     const answerContainer = answerContainers[questionNumber];
    //     const selector = `input[name=question${questionNumber}]:checked`;
    //     const userAnswer = (answerContainer.querySelector(selector) || {}).value;
    // if(userAnswer === currentQuestion.correctAnswer){
    
    // }
};

// Creating each question as a slideshow and making in appear and disappear
function showSlide(n) {
    const slides = document.querySelectorAll(".slide");
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if(currentSlide === 0){
        previousButton.style.display = 'none';
    }
    else{
        previousButton.style.display = 'inline-block';
    }
    if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    }
    else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }
}

function showNextSlide(){
    if(!checkAnswer(currentSlide)){
        quizCurrent -= quizWrongAnswer;
    };
    showSlide(currentSlide + 1);
}

function showPreviousSlide(){
    showSlide(currentSlide - 1);
}

//I looked up how to convert milliseconds to standard time 
// https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript
function convertMsToStandardTime (ms){
    const min = Math.floor((ms/1000/60) << 0);
    let sec = Math.floor((ms/1000) % 60);
    if(sec < 10){
        sec = "0" + sec;
    }
    return (min + ':' + sec);
}

function startTimer(){
    let quizEnd = quizDuration;
    setInterval(() => {
        quizCurrent += 1000;
        quizEnd = quizDuration - quizCurrent;
        console.log(quizEnd);
        if (quizEnd > 0){
            quizTimer.innerHTML = convertMsToStandardTime(quizEnd);
        }
        else {
            timeContainer.innerHTML= "Time's up";
            showResults();
        }
        
    }, quizInterval);



    // Create a three minute timer for the quiz
    // Start the timer 
    // Once timer is up the quiz goes to the last slide with results

    console.log(quizTimer);
}

function startQuiz(){
    cover.style.display = 'none';
    quizControl.style.display = 'block';
    buildQuiz();
    showSlide(currentSlide);
    startTimer();
}

})();
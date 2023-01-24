var startbutton = document.querySelector("#start");
var timerCounter = document.querySelector("#time");
var startSetup = document.querySelector("#start-screen");
var question = document.querySelector("#question-title");
var answers = document.querySelector("#choices");
var questionDisplay = document.querySelector("#questions");
var finalScore = document.querySelector("#final-score");
var submitButton = document.querySelector("#submit");
var initials = document.querySelector("#initials");

var secondsLeft = 75;
var i = 0;
var rightWrong;
var assessmentTime = 0;
var assessmentLine;
var assessmentAnswer;
var timerInterval;

var score = document.querySelector("#end-screen");

var firstAnswer = document.createElement("button");
firstAnswer.setAttribute("data-index", "one");
var secondAnswer = document.createElement("button");
secondAnswer.setAttribute("data-index", "two");
var thirdAnswer = document.createElement("button");
thirdAnswer.setAttribute("data-index", "three");
var fourthAnswer = document.createElement("button");
fourthAnswer.setAttribute("data-index", "four");

var questionsAnswers = [
    {
        question: "Commonly used data types do not include:",
        answer1: ["1. strings", false],
        answer2: ["2. booleans", false],
        answer3: ["3. alerts", true],
        answer4: ["4. numbers", false]
    },
    {
        question: "Which of the following HTML tags is not considered a semantic element?",
        answer1: ["1. article", false],
        answer2: ["2. header", false],
        answer3: ["3. div", true],
        answer4: ["4. section", false]
    },
    {
        question: "Arrays in JavaScript can be used to store __________.",
        answer1: ["numbers and strings", false],
        answer2: ["other arrays", false],
        answer3: ["booleans", false],
        answer4: ["all of the above", true]
    },
    {
        question: "The condition in an if/else statement is enclosed within __________.",
        answer1: ["parentheses", true],
        answer2: ["curly brackets", false],
        answer3: ["quotes", false],
        answer4: ["square brackets", false]
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answer1: ["JavaScript", false],
        answer2: ["console.log", true],
        answer3: ["terminal/bash", false],
        answer4: ["for loops", false]
    }
];

timerCounter.textContent = secondsLeft;

startbutton.addEventListener("click", function(event) {
    event.preventDefault();
    startSetup.setAttribute("style", "display: none");
    questionDisplay.setAttribute("style", "display: initial");
    
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerCounter.textContent = secondsLeft;
        
        if(secondsLeft === 0 || i === 5) {
            clearInterval(timerInterval); 
            questionDisplay.setAttribute("style", "display: none");
            score.setAttribute("style", "display: initial");
            assessmentLine = document.createElement("p");
            score.appendChild(assessmentLine);
            assessmentLine.textContent = "___________________________________________";
            assessmentLine.setAttribute("style", "color: gray;");
            assessmentAnswer = document.createElement("p");
            score.appendChild(assessmentAnswer);
            assessmentAnswer.setAttribute("style", "font-style: italic; color: gray;");
            if (rightWrong === true) {
                assessmentAnswer.textContent = "Correct!";
            } else {
                assessmentAnswer.textContent = "Wrong!";
                secondsLeft -= 10;
            }
            timerCounter.textContent = secondsLeft;
            finalScore.textContent = secondsLeft;
            assessmentTime = 1;
            var assessmentInterval = setInterval(function() {
                assessmentTime--;
                            
                if (assessmentTime === 0) {
                  clearInterval(assessmentInterval); 
                  assessmentLine.remove ();
                  assessmentAnswer.remove ();
                  scoreStorage();
                }
            }, 1000);
        }
    }, 1000);
})

answers.appendChild(firstAnswer);
answers.appendChild(secondAnswer);
answers.appendChild(thirdAnswer);
answers.appendChild(fourthAnswer);

function askQuestion() {
    if (i < 5) {
    question.textContent = questionsAnswers[i].question;
    firstAnswer.textContent = questionsAnswers[i].answer1[0];
    secondAnswer.textContent = questionsAnswers[i].answer2[0];
    thirdAnswer.textContent = questionsAnswers[i].answer3[0];
    fourthAnswer.textContent = questionsAnswers[i].answer4[0];
    answerAssessment();
    }
}

function answerQuestion() {answers.addEventListener("click", function(event) {
    var answerButton = event.target;
    if (answerButton.matches("button") === true && assessmentTime === 0 && i < 5) {
        var index = answerButton.getAttribute("data-index");
        if (index === "one") {
            if (questionsAnswers[i].answer1[1] === true) {
                rightWrong = true;
            }   else {
                rightWrong = false;
            }
        }   else if (index === "two") {
            if (questionsAnswers[i].answer2[1] === true) {
                rightWrong = true;
            }   else {
                rightWrong = false;
            }
        }   else if (index === "three") {
            if (questionsAnswers[i].answer3[1] === true) {
                rightWrong = true;
            }   else {
                rightWrong = false;
            }
        }   else if (index === "four") { 
            if (questionsAnswers[i].answer4[1] === true) {
                rightWrong = true;
            }   else {
                rightWrong = false;
            }
        }
        i++;
        askQuestion();

    }
})}

askQuestion();
answerQuestion();

function answerAssessment() {
    if (i > 0) {
        assessmentLine = document.createElement("p");
        answers.appendChild(assessmentLine);
        assessmentLine.textContent = "___________________________________________";
        assessmentLine.setAttribute("style", "color: gray;");
        assessmentAnswer = document.createElement("p");
        answers.appendChild(assessmentAnswer);
        assessmentAnswer.setAttribute("style", "font-style: italic; color: gray;");
        if (rightWrong === true) {
        assessmentAnswer.textContent = "Correct!";
        } else {
            assessmentAnswer.textContent = "Wrong!";
            secondsLeft -= 10;
        }
        
        var assessmentInterval = setInterval(function() {
            assessmentTime--;
                        
            if (assessmentTime === 0) {
              clearInterval(assessmentInterval); 
              assessmentLine.remove ();
              assessmentAnswer.remove ();
            }
        }, 1000);
        assessmentTime = 1;
    }
}

function scoreStorage() {
    localStorage.setItem("score", secondsLeft);
        submitButton.addEventListener("click", function(event) {
            window.location.href = "./highscores.html";
                var initialsSave = initials.value;
                localStorage.setItem("initials", initialsSave);
        }
    )
}
//'id' for start button to begin quiz
var startbutton = document.querySelector("#start");

//timer to keep track of time left for quiz
var timerCounter = document.querySelector("#time");

//connects to 'div' which hold initial display before game begins; 
//this is set to 'display: none' using inline CSS when game begins 
var startSetup = document.querySelector("#start-screen");

//acts as a site to hold a question when the game begins using
//.textContent
var question = document.querySelector("#question-title");

//acts as a site to append multiple choice answers
var answers = document.querySelector("#choices");

//selects the entire 'div' where questions and answer are held;
//initially this is set to 'display: none'; when the game begins
//this must be set to 'display: initial' to become visible
var questionDisplay = document.querySelector("#questions");

//This is used to display the final score at the end of the game.
var finalScore = document.querySelector("#final-score");

//This button must be clicked to submit initials and final score.
var submitButton = document.querySelector("#submit");

//This textbox holds user initials when for storage when the 
//submit button is clicked.
var initials = document.querySelector("#initials");

//This selects a 'div' which will be used to display the score
//at the end of the game. When the game begins it is set to
//'diplay: none'. At game's end it must be set to 'display: initial'.
var score = document.querySelector("#end-screen");

//Sets the timer for when the game begins; the game ends when 
//the timer hits 0 or all the questions are answered.
var secondsLeft = 75;

//Used to track the questions in the 'questionsAnswers' array:
//the number increases by 1 every time an answer is selected,
//allowing the next question and answers to be displayed.
var i = 0;

//This holds the value which indicates whether the user's
//answer was 'Correct' or 'Wrong' by referencing true and false
//booleans for each answer in the 'questionsAnswers' array
var rightWrong;

//When a question is answered, "Correct!" or "Wrong!" will be
//displayed for one second in two 'p' elements below the answer 
//buttons. This variable, initially set to 0, holds the time
//for the setInterval () method
var assessmentTime = 0;

//This will be used to create an element holding a grey line as 
//part of the "Correct!"/"Wrong!" display
var assessmentLine;

//This will be used to create an element which will display  
//whether the answer was "Correct!" or "Wrong!"
var assessmentAnswer;

//Variables to create button elements to hold multiple choice
//answers; they are indexed one-four so that the user's answer
//may be determined and assessed.
var firstAnswer = document.createElement("button");
firstAnswer.setAttribute("data-index", "one");
var secondAnswer = document.createElement("button");
secondAnswer.setAttribute("data-index", "two");
var thirdAnswer = document.createElement("button");
thirdAnswer.setAttribute("data-index", "three");
var fourthAnswer = document.createElement("button");
fourthAnswer.setAttribute("data-index", "four");

//An array of objects. Each object holds with multiple choice 
//answers numbered 1-4. The answers are held in array within the
//object and paired with a boolean which indicates whether they
//are correct (true) or incorrect (false).
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

//Sets time-keeping element to 75 second
timerCounter.textContent = secondsLeft;

//Activates startbutton; when the button is clicked the game
//begins
startbutton.addEventListener("click", function(event) {
    event.preventDefault();
    //The start screen 'div' no longer displays; the question/
    //answer 'div' is now visible.
    startSetup.setAttribute("style", "display: none");
    questionDisplay.setAttribute("style", "display: initial");
    
    //Begins the timer countdown and updates the timer element.
    //The game ends when the timer hits 0 or when all the questions
    //have been anwered (i === 5).
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timerCounter.textContent = secondsLeft;
        
        //Prevents secondsLeft going below 0; If this were to
        //occur, conditions for the game to end could not be met. 
        if (secondsLeft < 0) {
            secondsLeft = 0
        }

        if(secondsLeft === 0 || i === 5) {
            clearInterval(timerInterval);
            
            //Once the game ends the question/answer 'div' is hidden;
            //and the score 'div' is displayed.
            questionDisplay.setAttribute("style", "display: none");
            score.setAttribute("style", "display: initial");
            
            //Provides an assessment of the last question answered 
            //before the end of the game and subtracts 10 from the
            //'secondsLeft'/score if the answer is wrong.
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

            //Prevents secondsLeft going below 0, thereby 
            //preventing a negative score.
            if (secondsLeft < 0) {
                secondsLeft = 0
            }
            
            //Pevents the display of negative time left.
            timerCounter.textContent = secondsLeft;
            
            //Displays final score, which is equal to the time
            //left after all the questions are answered.
            finalScore.textContent = secondsLeft;
            
            //A timer which deletes the 'Correct!'/'Wrong'
            //assessment for the last question to be displayed for 1 
            //second at the end of the game.
            assessmentTime = 1;
            var assessmentInterval = setInterval(function() {
                assessmentTime--;
                            
                if (assessmentTime === 0) {
                  clearInterval(assessmentInterval); 
                  assessmentLine.remove ();
                  assessmentAnswer.remove ();
                  
                  //Runs a function to store the game score and
                  //user initials.
                  scoreStorage();
                }
            }, 1000); //Sets timer internal to 1000 milliseconds
        }
    }, 1000); //Sets timer internal to 1000 milliseconds
})

//Appends the first-fourthAnswer element variables to the #choices 
//'div' to create four buttons that will hold multiple choice 
//answers.
answers.appendChild(firstAnswer);
answers.appendChild(secondAnswer);
answers.appendChild(thirdAnswer);
answers.appendChild(fourthAnswer);

//Sets the text for the questions and answers drawing from the
//'questionsAnswers' array; every time a question is answered 'i'
//increases by 1, allowing this function to cycle through the
//entire 'questionsAnswers' array.
function askQuestion() {
    if (i < 5) {
    question.textContent = questionsAnswers[i].question;
    firstAnswer.textContent = questionsAnswers[i].answer1[0];
    secondAnswer.textContent = questionsAnswers[i].answer2[0];
    thirdAnswer.textContent = questionsAnswers[i].answer3[0];
    fourthAnswer.textContent = questionsAnswers[i].answer4[0];
    
    //A function which indicates whether the user's answer
    //to the previous question was 'Correct!' or 'Wrong!'. This
    //is only displayed after the first question is answered (i > 0). 
    answerAssessment();
    }
}

//This function monitors whether an answer button has been clicked. Once a 
//button is clicked it uses the button's index to determine which 
//answer has been selected and then refers to the 'questionsAnswers' array
//to determine whether the answer is correct.
function answerQuestion() {answers.addEventListener("click", function(event) {
    var answerButton = event.target;
    //The conditions require that a button was clicked; that assessement === 0 
    //(this variable controls the amount of time the 'Correct!'/'Wrong!' assessment 
    //is displayed; the element which holds it cannot be removed if a new question
    //is called before it is deleted); and that i < 5 (as there are only 5 questions
    //in the quiz, this prevents a sixth question from being called).
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
        //Variable increases by 1 to allow the answerQuestion() function to move
        //onto the next set of answers in the answersQuestions array when it is next called.
        //This increase by 1 also moves the askQuestion() function to move onto the next 
        //question in the answersQuestions array.
        i++;
        
        //Calls the function leading to the display of another question and series of
        //answers.
        askQuestion();

    }
})}

//Functions called to display a question and to 'addEventListener' to wait for a click on 
//the multiple choice buttons.
askQuestion();
answerQuestion();

//Function to display whether or not the previous answer was 'Correct!' or 'Wrong!' This 
//will only display after the first question has been answered (i > 0).
function answerAssessment() {
    if (i > 0) {
        
        //Creates a line with either 'Correct!' or 'Wrong!' underneath depending
        //upon whether the previous answer was right or wrong. This is displayed
        //under the ensuing question. If the answer was 'Wrong!' 10 seoncs will
        //be subtracted from the time left ('secondsLeft'), which also serves
        //as a score.
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
        
        //Timer which allows the 'Correct!'/'Wrong!' assessment to be displayed for 
        //1 second. After this time has elapsed the elements containing it are removed.
        var assessmentInterval = setInterval(function() {
            assessmentTime--;
                        
            if (assessmentTime === 0) {
              clearInterval(assessmentInterval); 
              assessmentLine.remove ();
              assessmentAnswer.remove ();
            }
        }, 1000); //Sets timer internal to 1000 milliseconds
        assessmentTime = 1; //Resets the timer for the next iteration of the 'Correct!'/
        //'Wrong' assessment.
    }
}

//This function is called when the game has ended; either when 'timerInterval' === 0 or 
//when all the questions are answered (i === 5). It stores the user's score in 'localStorage'
//and activates a submit button to store the user's intials in 'localStorage' once it has been
//clicked. These will be used to list highscores in the 'scores.js' file.
function scoreStorage() {
    localStorage.setItem("score", secondsLeft);
        submitButton.addEventListener("click", function(event) {
            //Takes user to 'highscores.html' once button has been pressed.
            window.location.href = "./highscores.html";
                var initialsSave = initials.value;
                localStorage.setItem("initials", initialsSave);
        }
    )
}
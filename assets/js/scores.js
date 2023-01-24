//Variables to access 'localStorage' in order to retrieve the initials  
//and score from the most recent game of the Coding Quiz.
var highScore = localStorage.getItem("score");
var gamerInitials = localStorage.getItem("initials");

//Will be accessed as an element for appending an ordered list
//of user scores.
var scoresList = document.querySelector("#highscores");

//The clear button may be clicked to remove list elements 
//containing scores and to clear 'localStorage' where the scores
//are stored as an array of objects.
var clear = document.querySelector("#clear");

//A score which combines both the most recent score with older
//scores retained in 'localStorage'; this will be formed using the 
//concat() method.
var combinedScore;

//Used to hold old scores, once retrieved from 'localStorage', for 
//the purpose of combining this with a new score using the concat()
//method.
var oldScores;

//An object made from the initials and score for the most recent
//Coding Quiz game.
var scoresObject = {
    initials: gamerInitials,
    score: highScore
};

//An array to contain the most recent initials and score in order to
//concatonate these (concat() method) with 'oldScores'.
var scoresArray = [];

//A function to push the most recent initials and score ('scoresObject')
//into the 'scoresArray'. This sets a condition that there must be a new
//score for the push to take place, thereby preventing the new score from
//being added multiple times on refresh. 'highscore' is set to "" below and
//will only contain a new number once another game has been played.
function push() {
    if (highScore === "") {
        return;
        } else {
            scoresArray.push(scoresObject);
        };
}

push ();

//oldScores holds the value of the old scores held in 'localStorage'. These
//must be retrieve using JSON.parse() as they are contained in an array of 
//ojects and must be stored as a string using JSON.stringify().
oldScores = JSON.parse(localStorage.getItem("scorelist"));

//'oldScores' will be concatenated with the 'scoresArray' to form the 'combinedScore'
//variable, containing both old and new scores, provided that old scores have 
//been stored in 'localStorage'. This condition
//prevents null values being added to the 'combinedScore' array and later
//displayed as scores.
if (oldScores !== null) {
    combinedScore = oldScores.concat(scoresArray);
    } 

//If there are no old scores to add but there is a new score then 
//'combinedScore' will be equal to the new score values in 'scoresArray' (if a 
//score is being added to this file for the first time). The value
//of combinedScore will be retained in 'localStorage' below to be retrieved
//as var 'oldScores' upon further iterations of the 'scores.js' file.
if (oldScores === null && highScore !== null) {
    combinedScore = scoresArray; 
}

//This function adds 'li' elements for each set of initials and scores in 
//'combinedScore' by iterating through a 'for' loop. It will not run if 
//there are no values to be be held in 'combinedScore' (oldScores === null &&
//highScore === null).
function elements() {
    if (oldScores === null && highScore === null ) {
    return;
    } else {
        for (var i = 0; i < combinedScore.length; i++) {
            var scoreRecord = document.createElement("li");
            scoresList.appendChild(scoreRecord);
            scoreRecord.textContent = combinedScore[i].initials + ": " + combinedScore[i].score;
        }  
    }
}

elements();

//The value of 'combinedScore' is placed in 'localStorage'. As 'combinedScore' 
//is an array of objects this must be done using 'JSON.stringify'.

localStorage.setItem("scorelist", JSON.stringify(combinedScore));

//The stored value for "score" is set to null. This is done to prevent the new score
//being added to the 'combinedScore' multiple times upon refresh.
localStorage.setItem("score", "");

//The clear button is activated. When clicked this removes all score elements and 
//clears local storage so that old scores are wiped and can no longer be displayed.
clear.addEventListener("click", function(event) {
    scoresList.innerHTML = "";
    localStorage.clear();
})
var highScore = localStorage.getItem("score");
var gamerInitials = localStorage.getItem("initials");

var scoresList = document.querySelector("#highscores");
var clear = document.querySelector("#clear");
var combinedScore;
var oldScores;

var scoresObject = {
    initials: gamerInitials,
    score: highScore
};

var scoresArray = [];

function push() {
    if (highScore === "") {
        return;
        } else {
            scoresArray.push(scoresObject);
        };
}

push ();

oldScores = JSON.parse(localStorage.getItem("scorelist4"));

if (oldScores !== null) {
    combinedScore = oldScores.concat(scoresArray);
    } 

if (oldScores === null && highScore !== null) {
    combinedScore = scoresArray; 
}

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

localStorage.setItem("scorelist4", JSON.stringify(combinedScore));

localStorage.setItem("score", "");

clear.addEventListener("click", function(event) {
    scoresList.innerHTML = "";
    localStorage.clear();
})
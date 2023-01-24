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

//var stopScore;

//console.log(highScore);

function push() {
    if (highScore === "") {
        return;
        } else {
            scoresArray.push(scoresObject);
        };
}

push ();



oldScores = JSON.parse(localStorage.getItem("scorelist4"));

console.log(oldScores);



if (oldScores !== null) {
    combinedScore = oldScores.concat(scoresArray);
    } 

if (oldScores === null && highScore !== null) {
    combinedScore = scoresArray; 
}
 




console.log(combinedScore);



console.log(combinedScore);

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

//console.log()

clear.addEventListener("click", function(event) {
    alert("Are you sure you want to clear high scores?");
    scoresList.innerHTML = "";
    // element = document.getElementById("highscores");
    // element.remove();
    localStorage.clear();
    // event.preventDefault();
    // remove.scoresList();
    // localStorage.setItem("scorelist2", []);
})


// localStorage.setItem("score", "");
// localStorage.setItem("initials", "");
// console.log(highScore);

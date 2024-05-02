
var buttonColors = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var gamePattern = [];

var firstTime = false;

var level = 0;


$(document).keydown(function () {
    if(!firstTime){
        $("#level-title").text("Level " + level);
        nextSequence();
        firstTime = true;   
    }
});

$(".btn").click(function () {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
    }
);


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length == userClickedPattern.length) {
            setTimeout(function () {nextSequence();}, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over")}, 200);
        $("h1").text("Game Over, Press Any Key To Restart");
        startOver();  
            
    }  
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).animate({opacity: "0.1"}, 100).animate({opacity: "1"}, 100);


    playSound(randomChosenColor);

}


function playSound(name) {
var sound = new Audio("./sounds/" + name + ".mp3");
sound.play();
}

function animatePress(currentColor) {
$("#"+ currentColor).addClass("pressed");

setTimeout(function () {
    document.querySelector("#"+ currentColor).classList.remove("pressed")
}, 100);
}



function startOver () {
level = 0;
gamePattern = [];
firstTime = false;
}


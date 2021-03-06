(function(){

var SOUNDS = {
    blue: new Audio("media/cat.mp3"),
    yellow: new Audio("media/goat.mp3"),
    green: new Audio("media/turkey.mp3"),
    red: new Audio("media/dog.mp3"),
    incorrect: new Audio("media/fart.mp3")
};
var COLORS = ["yellow", "red", "blue", "green"];

var sequence = [];
var count = 0;
var isPlayerTurn = false;
var score = 0;

//Function that highlight a button
function toggleColorClass(element){
    var color = element.dataset.color;
    element.classList.toggle(color + "-dull");
    element.classList.toggle(color + "-highlight");
}

//Function that blinks a color button
function blinkButton(element){
    toggleColorClass(element);
    SOUNDS[element.dataset.color].play();
    setTimeout(function(){
        toggleColorClass(element);
    }, 350);
}

//Function that adds a color to the sequence
function addToSequence(){
    var randomIndex = Math.floor(Math.random() * 4);
    sequence.push(COLORS[randomIndex]);
}

//Function that plays the color sequence to a player
function playSequence(){
    var intervalCount = 0;
    var sequenceInterval = setInterval(function(){
        if(intervalCount === sequence.length){
            clearInterval(sequenceInterval);
            isPlayerTurn = true;
        } else {
            var color = sequence[intervalCount];
            blinkButton(document.querySelector("[data-color=\"" + color + "\"]"));
            intervalCount++;
        }
    }, 750);
}

//Function when player clicks the correct buttons
function handleCorrectClick(element){
    blinkButton(element);
    count++;
    if(count === sequence.length){
        addToSequence();
        setTimeout(playSequence, 1000);
        count = 0;
        isPlayerTurn = false;
        score++;
    }
}

//Function when the player clicks the incorrect button
function handleIncorrectClick(){
    isPlayerTurn = false;
    SOUNDS.incorrect.play();
    document.querySelector("button").classList.remove("hide");
    var correctButton = document.querySelector("[data-color=\"" + sequence[count] + "\"]");
    toggleColorClass(correctButton);
    setTimeout(function(){
        toggleColorClass(correctButton);
    }, 1500);
    document.querySelector("p").classList.remove("hide");
    document.querySelector("p").textContent = "Final Score: " + score;
}

//Function that is called when a player clicks a color button
function handleButtonClick(event){
    if(!isPlayerTurn){
        return;
    }
    var button = event.target;
    if(sequence[count] === button.dataset.color){
        handleCorrectClick(button);
    } else {
        handleIncorrectClick();
    }
}

//Function that starts a new game
function startGame(){
    document.querySelector("button").classList.add("hide");
    document.querySelector("p").classList.add("hide");
    sequence = [];
    count = 0;
    score = 0;
    addToSequence();
    playSequence();
}

//Add click listeners
var buttons = document.querySelectorAll("[data-color]");
for(var i = 0; i < buttons.length; i++){
    buttons[i].addEventListener("click", handleButtonClick);
}

document.querySelector("button").addEventListener("click", startGame);
})();

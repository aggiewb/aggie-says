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
        } else {
            var color = sequence[intervalCount];
            blinkButton(document.querySelector("[data-color=\"" + color + "\"]"));
            intervalCount++;
        }
    }, 750);
}

//Function when player clicks the correct buttons
function playCorrectSequence(element){
    blinkButton(element);
    count++;
    if(count === sequence.length){
        addToSequence();
        setTimeout(playSequence, 1000);
    }
}

//Function when the player clicks the incorrect button
function playIncorrectSequence(){
    SOUNDS.incorrect.play();
    document.querySelector("button").classList.remove("hide");
    var correctButton = document.querySelector("[data-color=\"" + sequence[count] + "\"]");
    toggleColorClass(correctButton);
    setTimeout(function(){
        toggleColorClass(correctButton);
    }, 1500);
}

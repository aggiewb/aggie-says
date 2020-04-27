var SOUNDS = {
    blue: new Audio("media/cat.mp3"),
    yellow: new Audio("media/goat.mp3"),
    green: new Audio("media/turkey.mp3"),
    red: new Audio("media/dog.mp3"),
    incorrect: new Audio("media/fart.mp3")
};

var COLORS = ["yellow", "red", "blue", "green"];

var sequence = [];

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

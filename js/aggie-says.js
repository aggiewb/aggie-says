var SOUNDS = {
    blue: new Audio("media/cat.mp3"),
    yellow: new Audio("media/goat.mp3"),
    green: new Audio("media/turkey.mp3"),
    red: new Audio("media/dog.mp3"),
    incorrect: new Audio("media/fart.mp3")
};

//Function that highlight a button
function toggleColorClass(element){
    var color = element.dataset.color;
    element.classList.toggle(color + "-dull");
    element.classList.toggle(color + "-highlight");
}
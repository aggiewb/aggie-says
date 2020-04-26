//Function that highlight a button
function toggleColorClass(element){
    var color = element.dataset.color;
    element.classList.toggle(color + "-dull");
    element.classList.toggle(color + "-highlight");
}
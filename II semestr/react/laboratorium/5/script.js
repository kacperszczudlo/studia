const colors = ["red","blue","green","orange","yellow","lightblue","gray","aqua","brown"];
const numb = ["1","2","3","4","5","6","7","8","9"];

const cardColors  = colors.flatMap(element => [element, element]);
const cardNumbers  = numb.flatMap(element => [element, element]);

let elements = document.querySelectorAll('div');

elements = [...elements];

let gamesLeft = cardColors.length / 2;
let activeCard = '';
const button = document.getElementById('restart');
const LiczbaPar = document.getElementById('pary');
const activeCards = [];

function IlePar() {
    LiczbaPar.textContent = `Pozostałe pary: ${gamesLeft}`;
}

const clickCard = function () {

    activeCard = this;
 
    console.log(activeCard);
 
    if (activeCard === activeCards[0]) {
        return;
    }
 
    activeCard.classList.remove('hidden');
 
    if (activeCards.length === 0) {
        activeCards[0] = activeCard;
        return;
   }
   
   else {
    elements.forEach(card => card.removeEventListener("click", clickCard));
    activeCards[1] = activeCard;
 
    setTimeout(function () {
        if (activeCards[0].className === activeCards[1].className) {
            activeCards.forEach(card => card.classList.add("off"))
            elements = elements.filter(card => !card.classList.contains("off"));
            gamesLeft--;
            IlePar();
        }
        else {
            activeCards.forEach(card => card.classList.add("hidden"))
        }
        activeCard = "";
        activeCards.length = 0;
        elements.forEach(card => card.addEventListener("click", clickCard))
 
 
        if (gamesLeft === 0) {
            location.reload();
        }
 
    }, 500)
 }
 
 }

const init = function () {

    elements.forEach(elem => {
        const position = Math.floor(Math.random() * cardColors.length);
        elem.classList.add(cardColors[position]);
        elem.innerHTML = cardNumbers[position]
        cardColors.splice(position, 1);
        cardNumbers.splice(position, 1);
    });
 
    setTimeout(function () {
        elements.forEach(card => {
            card.classList.add("hidden");
            card.addEventListener("click", clickCard);
        });
    }, 2000)

    IlePar();
 };
 
 init();

 button.addEventListener('click', () => {
    location.reload();
});
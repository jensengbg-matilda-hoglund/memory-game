const memoryCards = document.querySelectorAll('.memory-card');
const overlay = document.querySelector('.overlay');
const close = document.querySelector('.overlay .close');
let numberOfCardsPicked = 0;
let pickedCards = [];
let pickedAllCards = 0;


const resetAnimation = () => {
    pickedCards.forEach(pickedCard => {
        pickedCard.classList.toggle('flip');
    });
}

const resetCards = () => {
    pickedCards = [];
    numberOfCardsPicked = 0;
}

const hasWon = () => {
    if (pickedAllCards === 8) {
        overlay.classList.toggle('show');
    }
}

const checkMatch = () => {
    if (pickedCards[0].getAttribute('data-card') === pickedCards[1].getAttribute('data-card')) {
        pickedAllCards++;
        hasWon();
        resetCards();
    } else {
        setTimeout(() => {
            resetAnimation();
            resetCards();
        }, 1000);
    }
}

const addCards = (elem) => {
    numberOfCardsPicked++;

    if (numberOfCardsPicked <= 2) {
        pickedCards.push(elem);
        if(numberOfCardsPicked === 2) {
            checkMatch();
        }
    }
}


const flipCard = (event) => {
    if (event.target.innerHTML !== 'Memory') {
        event.target.classList.toggle('flip');

        addCards(event.target);
    }
}

const shuffle = () => {
    memoryCards.forEach(card => {
        const position = Math.floor(Math.random() * 16);
        card.style.order = position;
    });
}
  
memoryCards.forEach(card => {
    card.addEventListener('click', flipCard);
});

close.addEventListener('click', (event) => {
    event.target.parentElement.classList.toggle('show');
});

shuffle();
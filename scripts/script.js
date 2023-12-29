const formInputElem = document.forms[0];
const formSearchElem = document.forms[1];

let inputParam = JSON.parse(localStorage.getItem('cards')) || [];
const addCard = (card) => localStorage.setItem('cards', JSON.stringify(inputParam));

function setID(number) {
    let id = number;
    return function count() {
        return id++;
    }
}

let id = setID(1);

formInputElem.addEventListener('submit', event => {
    event.preventDefault();
    const {word, translation, color} = event.target;
    inputParam.push({
        word: word.value,
        translation: translation.value,
        color: color.value,
        state: true,
        id: id()
    });
    word.value = '';
    translation.value = '';
    color.value = '';
    render(inputParam);
    addCard();
})

formSearchElem.addEventListener('input', (event) => {
    let inputValue = event.target.value;
    const filteredParam = inputParam.filter(elem => {
        return elem.word.toLocaleLowerCase().startsWith(inputValue) ||
        elem.translation.toLocaleLowerCase().startsWith(inputValue)
    });
    render(filteredParam);
})

function render(param) {
    const cardBoxElem = document.querySelector('#cardboard');
    cardBoxElem.innerHTML = '';
    param.map(card => {
        let {word, translation, color, id, state} = card;
        const cardElem = document.createElement('div');
        cardElem.classList.add('card');
        const cardTitleElem = document.createElement('p');
        cardTitleElem.classList.add('card__Title');
        const closeCardElem = document.createElement('div');
        closeCardElem.classList.add('card__close');
        cardElem.append(cardTitleElem, closeCardElem);
        cardBoxElem.append(cardElem);
        cardElem.style.background = color;
        cardTitleElem.innerText = state ? word : translation;
        closeCardElem.innerText = '❌';
        cardElem.addEventListener('dblclick', () => {
            const cardInArray = inputParam.find(elem => elem.id === card.id);
            if (cardInArray.state) {
                cardInArray.state = false;
                cardTitleElem.innerText = translation;
            } else {
                cardInArray.state = true;
                cardTitleElem.innerText = word;
            }
            addCard();
        });

        closeCardElem.addEventListener('click', () => {
            inputParam = inputParam.filter(closingElem => closingElem.id !== id);
            addCard();
            render(inputParam);
        })
    })
};

render(inputParam);

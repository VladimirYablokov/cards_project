const formInputElem = document.forms[0]
const formSearchElem = document.forms[1]
const cardBoxElem = document.querySelector('#cardboard')
let inputParam = []

const getCard = () => {JSON.parse(localStorage.getItem('cards')) || []}
const addCard = (card) => {localStorage.setItem('cards', JSON.stringify([...getCard(), card]))}
const removeCard = (card) => {
    const new_list = getCard().filter(card => JSON.stringify(card) !== JSON.stringify(card))
    localStorage.setItem('card', JSON.stringify((new_list)))
}

function setID(number){
    let id = number
    return function count(){
        return id++
    }
}
let id = setID(1)

formInputElem.addEventListener('submit', event => {
    event.preventDefault()
    const {word, translation, color} = event.target
    inputParam.push({
        word: word.value,
        translation: translation.value,
        color: color.value,
        state: true,
        id: id()
    })
    word.value = ''
    translation.value = ''
    color.value = ''
    render(inputParam)
})

formSearchElem.addEventListener('input', (event)=>{
    let inputValue = event.target.value;
    const filteredParam = inputParam.filter(elem => elem.word.toLocaleLowerCase().startsWith(inputValue)
                                         || elem.translation.toLocaleLowerCase().startsWith(inputValue))
    render(filteredParam)
})

function render(param) {
    cardBoxElem.innerHTML = ''
    param.map(card => {
        const cardElem = document.createElement('div');
        cardElem.classList.add('card')
        const cardTitleElem = document.createElement('p')
        cardTitleElem.classList.add('card__Title')
        const closeCardElem = document.createElement('div')
        closeCardElem.classList.add('card__close')
        cardElem.append(cardTitleElem, closeCardElem)
        cardBoxElem.append(cardElem)
        cardElem.style.background = card.color
        cardTitleElem.innerText = card.word
        closeCardElem.innerText = '❌'

        cardElem.addEventListener('dblclick', () => {
            if (card.state){
                cardTitleElem.innerText = card.translation;
                card.state = false
            }else{
                cardTitleElem.innerText = card.word;
                card.state = true
            }
        })
        closeCardElem.addEventListener('click', () => {
            inputParam = inputParam.filter(closeCard => closeCard.id !== card.id);
            render(inputParam);
        })
    })
}
render(inputParam)

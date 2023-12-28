const formInputElem = document.forms[0]
const formSearchElem = document.forms[1]
let inputParam = JSON.parse(localStorage.getItem('cards')) || []

const addCard = (card) => localStorage.setItem('cards', JSON.stringify(inputParam))

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
    addCard()
    render(inputParam)
})

formSearchElem.addEventListener('input', (event)=>{
    let inputValue = event.target.value;
    const filteredParam = inputParam.filter(elem => elem.word.toLocaleLowerCase().startsWith(inputValue)
                                         || elem.translation.toLocaleLowerCase().startsWith(inputValue))
    render(filteredParam)
})

function render(param) {
    const cardBoxElem = document.querySelector('#cardboard')
    cardBoxElem.innerHTML = ''
    if(param.length){
        cardBoxElem.append(
            param.map(card => {
                const{word,translation,color,state,id} = card
                const cardElem = document.createElement('div');
                cardElem.classList.add('card')
                const cardTitleElem = document.createElement('p')
                cardTitleElem.classList.add('card__Title')
                const closeCardElem = document.createElement('div')
                closeCardElem.classList.add('card__close')
                cardElem.append(cardTitleElem, closeCardElem)
                cardBoxElem.append(cardElem)
                cardElem.style.background = color
                cardTitleElem.innerText = word
                closeCardElem.innerText = '❌'
                cardElem.addEventListener('dblclick', () => {
                    if (state){
                        cardTitleElem.innerText = card.translation;
                        card.state = false
                    }else{
                        cardTitleElem.innerText = word;
                        state = true
                    }
                })
                closeCardElem.addEventListener('click', () => {
                    inputParam = inputParam.filter(closeCard => closeCard.id !== card.id);
                    addCard()
                    render(inputParam);
                })
            })
        )
    }
}
render(inputParam)


console.log('init request');
const QTY_HOME_CHARACTERS = 3;
let TOTAL_CHARACTERS = 0;
let TOTAL_PAGES=0;
let nextPage = '';
let previusPage = '';
const charactersHomeContainer = document.getElementById('characters-home-div');
const showAllSection = document.getElementById('showAllSection');
const showAllButton = document.getElementById('button-showAll');

bootstrap()
renderCharactersContainers();
showAllButton.addEventListener('click', showAllCharacters);
const homeCharacters =  getRandomCharacters(QTY_HOME_CHARACTERS);
Promise.all(homeCharacters).then(data => renderCharacters(data))

function bootstrap(){
  const apiInfo = getCharacter();
  apiInfo.then( data =>  {
    TOTAL_CHARACTERS = data.info.count;
    TOTAL_PAGES = data.info.pages;
  })
}

function showAllCharacters(event){
  event.preventDefault();
  const requestCharactersList = getCharacter();
  requestCharactersList.then(receivedData => {
    removeAllCharacters();
    renderCharactersContainers(receivedData.results.length);
    renderCharacters(receivedData.results);
  });
  showAllSection.classList.add('d-none')
}

function removeAllCharacters(){
  var myNode = document.getElementById('characters-home-div');
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}

function renderCharactersContainers(qtyOfCharacters=QTY_HOME_CHARACTERS){
  for(let i = 0; i < qtyOfCharacters; i++){
    const container = document.createElement('div');
    const nameContainer = document.createElement('div');
    const img = document.createElement('img');
    const name = document.createElement('h4');
    container.classList.add('character-container');
    container.classList.add('character-name');
    nameContainer.classList.add('name-container');
    nameContainer.appendChild(name);
    img.src = './img/dummyImg.png';
    img.alt = 'dummy image';
    container.appendChild(img);
    container.append(nameContainer);
    charactersHomeContainer.appendChild(container);
  }
}


function renderCharacters(charactersArray){
  charactersArray.forEach( (element, index) => {
    const container = charactersHomeContainer.children[index]
    container.children[0].src = element.image;
    container.children[0].alt = element.name + ' image';
    container.children[1].innerHTML = element.name;
  });
}

function getRandomCharacters(qtyOfCharacter){
  let promises = [];
  for(let i = 0; i < qtyOfCharacter; i++){
    promises.push(getCharacter(randomNumber(493)))
  }
  return promises;
}  

function getCharacter(characterId = ''){
   return fetch('https://rickandmortyapi.com/api/character/' + characterId)
            .then(function(response) {
              return response.json();
            })
            .then(function(response) {
              return response;
            })
}


function randomNumber(maxLimit){
  return Math.floor(Math.random()*maxLimit) + 1;
}

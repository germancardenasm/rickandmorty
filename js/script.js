
console.log('init request');
const QTY_HOME_CHARACTERS = 3;
const showAllButton = document.getElementById('show-all');
const charactersHomeContainer = document.getElementById('characters-home-div');



render();

function render(){

  for(let i = 0; i < QTY_HOME_CHARACTERS; i++){
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
  const homeCharacters =  getRandomCharacters(QTY_HOME_CHARACTERS);
  Promise.all(homeCharacters).then(data => renderCharacters(data))
}


function renderCharacters(charactersArray){
  charactersArray.forEach( (element, index) => {
    const container = charactersHomeContainer.children[index]
    container.children[0].src = element.image;
    container.children[0].alt = element.name + ' image';
    container.children[1].innerHTML = element.name;
  });
  console.dir(charactersArray)
}

function getRandomCharacters(qtyOfCharacter){
  let promises = [];
  for(let i = 0; i < qtyOfCharacter; i++){
    promises.push(getCharacter(randomNumber(400)))
  }
  return promises;
}  

function getCharacter(characterId){
   return fetch('https://rickandmortyapi.com/api/character/'+characterId)
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

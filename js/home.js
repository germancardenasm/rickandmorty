const QTY_HOME_CHARACTERS = 3;
const charactersHomeContainer = document.getElementById("characters-home-div");
const charactersUrl = "https://rickandmortyapi.com/api/character/";

renderCharactersContainers();
getHomeCharacters();

function renderCharactersContainers(qtyOfCharacters = QTY_HOME_CHARACTERS) {
  for (let i = 0; i < qtyOfCharacters; i++) {
    const container = document.createElement("div");
    const nameContainer = document.createElement("div");
    const img = document.createElement("img");
    const name = document.createElement("h4");
    container.classList.add("character-container");
    container.classList.add("character-name");
    nameContainer.classList.add("name-container");
    nameContainer.appendChild(name);
    img.src = "./img/dummyImg.png";
    img.alt = "dummy image";
    container.appendChild(img);
    container.append(nameContainer);
    charactersHomeContainer.appendChild(container);
  }
}

function getHomeCharacters(){
  const homeCharacters = getRandomCharacters(QTY_HOME_CHARACTERS);
  Promise.all(homeCharacters).then(data => renderCharacters(data));
}

function renderCharacters(charactersArray) {
  charactersArray.forEach((element, index) => {
    const container = charactersHomeContainer.children[index];
    container.children[0].src = element.image;
    container.children[0].alt = element.name + " image";
    container.children[1].innerHTML = element.name;
  });
}

function getRandomCharacters(qtyOfCharacter) {
  let promises = [];
  let url = "https://rickandmortyapi.com/api/character/";
  for (let i = 0; i < qtyOfCharacter; i++) {
    promises.push(getCharacter(url, randomNumber(493)));
  }
  return promises;
}

function randomNumber(maxLimit) {
  return Math.floor(Math.random() * maxLimit) + 1;
}

function getCharacter(url, characterId = "") {
  return fetch(url + characterId)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      return response;
    });
}

function removeAllCharacters() {
  var myNode = document.getElementById("characters-home-div");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}



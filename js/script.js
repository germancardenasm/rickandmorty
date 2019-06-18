console.log("init request");
const QTY_HOME_CHARACTERS = 3;
let TOTAL_CHARACTERS = 0;
let TOTAL_PAGES = 0;
let nextPage = "";
let previusPage = "";
const charactersHomeContainer = document.getElementById("characters-home-div");
const showAllSection = document.getElementById("showAllSection");
const showAllButton = document.getElementById("button-showAll");
const pagination = document.getElementById("pagination");

bootstrap();
renderCharactersContainers();
const homeCharacters = getRandomCharacters(QTY_HOME_CHARACTERS);
Promise.all(homeCharacters).then(data => renderCharacters(data));


function addEventListeners(){
  showAllButton.addEventListener("click", showAllCharacters);
}

function bootstrap() {
  const apiInfo = getCharacter();
  apiInfo.then(data => {
    TOTAL_CHARACTERS = data.info.count;
    TOTAL_PAGES = data.info.pages;
    setUpPaginator();
  });
  addEventListeners();
 
}


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

function renderCharacters(charactersArray) {
  charactersArray.forEach((element, index) => {
    const container = charactersHomeContainer.children[index];
    container.children[0].src = element.image;
    container.children[0].alt = element.name + " image";
    container.children[1].innerHTML = element.name;
  });
}

function hideSection(sectionToHide) {
  document.getElementById(sectionToHide).classList.add("d-none");
}

function showSection(sectionToShow) {
  document.getElementById(sectionToShow).classList.remove("d-none");
}

function getRandomCharacters(qtyOfCharacter) {
  let promises = [];
  for (let i = 0; i < qtyOfCharacter; i++) {
    promises.push(getCharacter(randomNumber(493)));
  }
  return promises;
}

function randomNumber(maxLimit) {
  return Math.floor(Math.random() * maxLimit) + 1;
}

function getCharacter(characterId = "") {
  return fetch("https://rickandmortyapi.com/api/character/" + characterId)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      return response;
    });
}

function showAllCharacters(event) {
  event.preventDefault();
  const requestCharactersList = getCharacter();
  requestCharactersList.then(receivedData => {
    removeAllCharacters();
    renderCharactersContainers(receivedData.results.length);
    renderCharacters(receivedData.results);
  });
  hideSection("showAllSection");
  showSection('pagination')
}

function removeAllCharacters() {
  var myNode = document.getElementById("characters-home-div");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}

function setUpPaginator(){
  let paginatorList = document.getElementById('paginator-list');
  for(let i = 1; i <= TOTAL_PAGES; i++){
    addPage(i, paginatorList)
  }
  let li = paginatorList.getElementsByTagName('li')[1]
  paginatorList.appendChild(li);

}

function addPage(i, paginatorList){
    let li = document.createElement("li");
    let anchor = document.createElement("a");
    li.classList.add("page-item");
    anchor.classList.add("page-link");
    anchor.classList.add("page-link-num");
    anchor.innerHTML = i;
    li.appendChild(anchor);
    paginatorList.appendChild(li);
}
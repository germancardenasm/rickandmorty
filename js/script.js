console.log("init request");
const QTY_HOME_CHARACTERS = 3;
let TOTAL_CHARACTERS = 0;
let TOTAL_PAGES = 0;
let nextPage = "";
let prevPage = "";
let activePaginatorPage = 1;
let previosActivePaginatorPage = 1;
const charactersHomeContainer = document.getElementById("characters-home-div");
const showAllSection = document.getElementById("showAllSection");
const showAllButton = document.getElementById("button-showAll");
const pagination = document.getElementById("pagination");
const next = document.getElementById("previous");
const previous = document.getElementById("next");
const charactersUrl = "https://rickandmortyapi.com/api/character/";

bootstrap();
renderCharactersContainers();
const homeCharacters = getRandomCharacters(QTY_HOME_CHARACTERS);
Promise.all(homeCharacters).then(data => renderCharacters(data));

function addEventListeners() {
  showAllButton.addEventListener("click", showAllCharacters);
  next.addEventListener("click", changePage);
  previous.addEventListener("click", changePage);
}

function bootstrap() {
  const apiInfo = getCharacter(charactersUrl);
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

function showAllCharacters(event) {
  event.preventDefault();
  const requestCharactersList = getCharacter(charactersUrl);
  requestCharactersList.then(receivedData => {
    removeAllCharacters();
    renderCharactersContainers(receivedData.results.length);
    renderCharacters(receivedData.results);
    nextPage = receivedData.info.next;
    prevPage = receivedData.info.prev;
  });
  hideSection("showAllSection");
  showSection("pagination");
}

function removeAllCharacters() {
  var myNode = document.getElementById("characters-home-div");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}

function setUpPaginator() {
  const PREVIUOS_BUTTON = 1;
  const FIST_PAGE_BUTTON = 2;
  let paginatorList = document.getElementById("paginator-list");
  for (let i = 1; i <= TOTAL_PAGES; i++) {
    addPaginatorPageButton(i, paginatorList);
  }
  let li = paginatorList.getElementsByTagName("li");
  li[FIST_PAGE_BUTTON].classList.add("active");
  paginatorList.appendChild(li[PREVIUOS_BUTTON]);
}

function addPaginatorPageButton(i, paginatorList) {
  let li = document.createElement("li");
  let anchor = document.createElement("a");
  li.classList.add("page-item");
  anchor.classList.add("page-link");
  anchor.classList.add("page-link-num");
  anchor.innerHTML = i;
  li.appendChild(anchor);
  li.addEventListener("click", goToPage);
  paginatorList.appendChild(li);
}

function goToPage(e) {
  let apiInfo = {};
  const buttonPressed = e.target.innerHTML;
  let paginatorList = document.getElementById("paginator-list");
  previosActivePaginatorPage=activePaginatorPage;

  apiInfo = getCharacter(charactersUrl, `?page=${buttonPressed}`);
  activePaginatorPage=parseInt(buttonPressed);
  
  apiInfo.then(receivedData => {
    console.log(receivedData);
    removeAllCharacters();
    nextPage = receivedData.info.next;
    prevPage = receivedData.info.prev;
    renderCharactersContainers(receivedData.results.length);
    renderCharacters(receivedData.results);
  });
  
  setPaginatorActiveButton();
}

function changePage(e) {
  let apiInfo = {};
  const buttonPressed = e.target.parentElement.id;
  let paginatorList = document.getElementById("paginator-list");
  previosActivePaginatorPage=activePaginatorPage;

  if (buttonPressed === "next" && nextPage) {
    apiInfo = getCharacter(nextPage);
    activePaginatorPage++;
  } else if (buttonPressed === "previous" && prevPage) {
    apiInfo = getCharacter(prevPage);
    activePaginatorPage--;
  }else{
    return;
  }

  apiInfo.then(receivedData => {
    console.log(receivedData);
    removeAllCharacters();
    nextPage = receivedData.info.next;
    prevPage = receivedData.info.prev;
    renderCharactersContainers(receivedData.results.length);
    renderCharacters(receivedData.results);
  });
  
  setPaginatorActiveButton();
}



function setPaginatorActiveButton() {
  let paginatorList = document.getElementById("paginator-list");
  let li = paginatorList.getElementsByTagName("li");
  li[previosActivePaginatorPage].classList.remove("active");
  li[activePaginatorPage].classList.add("active");
}

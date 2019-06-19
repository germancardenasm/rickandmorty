const QTY_HOME_CHARACTERS = 3;
let TOTAL_CHARACTERS = 0;
let TOTAL_PAGES = 0;
const CHARACTERS_PER_PAGE=20;
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

function bootstrap() {
  renderCharactersContainers(20);
  const apiInfo = getCharacter(charactersUrl);
  apiInfo.then( receivedData => {
    TOTAL_CHARACTERS = receivedData.info.count;
    TOTAL_PAGES = receivedData.info.pages;
    if(CHARACTERS_PER_PAGE != receivedData.results.length){
      removeAllCharacters();
      renderCharactersContainers(receivedData.results.length);
    } 
    renderCharacters(receivedData.results)
    nextPage = receivedData.info.next;
    prevPage = receivedData.info.prev;
    setUpPaginator();
  });
  addEventListeners();
}

function addEventListeners() {
  next.addEventListener("click", changePage);
  previous.addEventListener("click", changePage);
}

function renderCharactersContainers(qtyOfCharacters = QTY_HOME_CHARACTERS) {
  for (let i = 0; i < qtyOfCharacters; i++) {
    const container = document.createElement("div");
    const nameContainer = document.createElement("div");
    const img = document.createElement("img");
    const name = document.createElement("h4");
    container.setAttribute("id", 1);
    container.classList.add("character-container");
    container.classList.add("character-name");
    nameContainer.classList.add("name-container");
    nameContainer.appendChild(name);
    img.src = "./img/dummyImg.png";
    img.alt = "dummy image";
    container.appendChild(img);
    container.append(nameContainer);
    container.addEventListener('click', getCharacterDetail);
    charactersHomeContainer.appendChild(container);
  }
}

function getCharacterDetail(e){
  sessionStorage.setItem('characterDetail', e.target.parentElement.id);
  window.location.href = "./detail.html";
}

function renderCharacters(charactersArray) {
  charactersArray.forEach((element, index) => {
    const container = charactersHomeContainer.children[index];
    container.setAttribute("id", element.id);
    container.children[0].src = element.image;
    container.children[0].alt = element.name + " image";
    container.children[1].innerHTML = element.name;
  });
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
  li.addEventListener("click", changePage);
  paginatorList.appendChild(li);
}


function changePage(e) {
  const buttonPressed = e.target.innerHTML;
  let apiInfo = {};

  if (
    (buttonPressed === "Next" && !nextPage) ||
    (buttonPressed === "Previous" && !prevPage)
  )
    return;

  previosActivePaginatorPage = activePaginatorPage;

  if (buttonPressed === "Next") {
    apiInfo = getCharacter(nextPage);
    activePaginatorPage++;
  } else if (buttonPressed === "Previous") {
    apiInfo = getCharacter(prevPage);
    activePaginatorPage--;
  } else {
    apiInfo = getCharacter(charactersUrl, `?page=${buttonPressed}`);
    activePaginatorPage = parseInt(buttonPressed);
  }
  renderPage(apiInfo);
  setPaginatorActiveButton();
}

function renderPage(promise) {
  promise.then(receivedData => {
    const qtyOfCharactersReceived = receivedData.results.length;
    const qtyCharacterOnScreen = charactersHomeContainer.childElementCount;
    if(qtyCharacterOnScreen != qtyOfCharactersReceived){
      removeAllCharacters();
      renderCharactersContainers(receivedData.results.length);
    } 
    nextPage = receivedData.info.next;
    prevPage = receivedData.info.prev;
    renderCharacters(receivedData.results);
    window.scrollTo(0, 0);
  });
}

function setPaginatorActiveButton() {
  let paginatorList = document.getElementById("paginator-list");
  let li = paginatorList.getElementsByTagName("li");
  li[previosActivePaginatorPage].classList.remove("active");
  li[activePaginatorPage].classList.add("active");
}

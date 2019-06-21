const QTY_HOME_CHARACTERS = 3;
const charactersUrl = "https://rickandmortyapi.com/api/character/";
let nextPage = "";
let prevPage = "";
let activePaginatorPage = 1;
let previosActivePaginatorPage = 1;
const showAllSection = document.getElementById("showAllSection");

const homePage = document.getElementById("home-page");
const characters = document.getElementById("characterPage");

const charactersPageTitle = document.getElementById("characters-page-title");
const pagination = document.getElementById("pagination");
const next = document.getElementById("previous");
const previous = document.getElementById("next");

initStorage();

function initStorage(){
  if(storageIsInit()) return
  getCharacter(charactersUrl).then((receivedData)=>{
    const apiConf={
      TOTAL_CHARACTERS:receivedData.info.count,
      TOTAL_PAGES: receivedData.info.pages
    }
    sessionStorage.setItem('apiConf', JSON.stringify(apiConf));
  })
}

function storageIsInit(){
  return sessionStorage.getItem('apiConf')
}

function redirectToHome(){
  location.hash = '/home';
  console.log('redirects to home');
}

function renderHome() {
  renderCharactersContainers();
  getHomeCharacters();
  setActiveLink('home-link');
  addEventListenersHome();
}

function setActiveLink(link) {
  let linksUl = getById('nav-links');
  for(let i = 0; i < linksUl.childElementCount; i++){
    linksUl.children[i].classList.remove("active")
  }
  if(link != 'none')
    getById(link).classList.add('active');
}


function addEventListenersHome() {
  const showAllButton = document.getElementById("button-showAll");
  showAllButton.addEventListener("click", showAllCharacters);
}

function renderCharactersContainers(
  qtyOfCharacters = QTY_HOME_CHARACTERS,
  sectionContainer = "home-page"
) {
  for (let i = 0; i < qtyOfCharacters; i++) {
    const page = document.getElementById(sectionContainer);
    const container = document.createElement("div");
    container.setAttribute("id", i);
    container.classList.add("character-container");
    const img = document.createElement("img");
    img.src = "./img/dummyImg.png";
    img.alt = "dummy image";
    container.appendChild(img);
    const nameContainer = document.createElement("div");
    nameContainer.classList.add("name-container");
    const name = document.createElement("h4");
    name.classList.add("character-name");
    nameContainer.appendChild(name);
    container.append(nameContainer);
    container.addEventListener("click", redirectToDetail);
    page.appendChild(container);
  }
}

function getHomeCharacters() {
  const homeCharacters = getRandomCharacters(QTY_HOME_CHARACTERS);
  Promise.all(homeCharacters).then(receivedData => {
    const formatedDataForRender = { results: receivedData };
    let promise = Promise.resolve(formatedDataForRender);
    renderPageWhendataAvailable(promise, "home-page");
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

function showAllCharacters(event) {
  if(!storageIsInit) initStorage()
  location.hash = '/characters';
}

function renderCharactersPage(){
  const charactersContainerPage = getById("characters-container-page");
  const requestCharactersList = getCharacter(charactersUrl, `?page=${activePaginatorPage}`);
  renderCharactersContainers(20, "characters-container-page");
  renderPageWhendataAvailable(requestCharactersList);
  setUpPaginator();
  charactersContainerPage.classList.add("d-flex");
  charactersContainerPage.classList.add("flex-wrap");
  setActiveLink('characters-link');
  addEventListenersCharacters(); 
}

function addEventListenersCharacters() {
  const nextButton = getById('next');
  const previousButton = getById('previous');
  nextButton.addEventListener("click", changePage);
  previousButton.addEventListener("click", changePage);
}

function getById(id){
  return document.getElementById(id);
}

function removeAllCharacters(section = "home-page") {
  var myNode = document.getElementById(section);
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}

function setUpPaginator() {
  const PREVIUOS_BUTTON = 1;
  let paginatorList = getById("paginator-list");
  let numOfPages = sessionStorage.getItem('apiConf');
  numOfPages = JSON.parse(numOfPages).TOTAL_PAGES;
 
  for (let i = 1; i <= numOfPages; i++) {
    addPaginatorPageButton(i, paginatorList);
  }
  let li = paginatorList.getElementsByTagName("li");
  paginatorList.appendChild(li[PREVIUOS_BUTTON]);
  li[activePaginatorPage].classList.add("active");
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
  e.preventDefault();
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
    activePaginatorPage = buttonPressed;
    apiInfo = getCharacter(charactersUrl, `?page=${buttonPressed}`);
    activePaginatorPage = parseInt(buttonPressed);
  }
  renderPageWhendataAvailable(apiInfo);
  setPaginatorActiveButton();
}

function renderPageWhendataAvailable(
  promise,
  section = "characters-container-page"
) {
  const container = document.getElementById(section);
  promise.then(receivedData => {
    const qtyOfCharactersReceived = receivedData.results.length;
    const qtyCharacterOnScreen = container.childElementCount;
    saveApiConfiguration(receivedData);
    if (qtyCharacterOnScreen != qtyOfCharactersReceived) {
      removeAllCharacters(section);
      renderCharactersContainers(receivedData.results.length, section);
    }
    if (receivedData.info) {
      nextPage = receivedData.info.next;
      prevPage = receivedData.info.prev;
    }
    renderCharacters(receivedData.results, section);
    window.scrollTo(0, 0);
    saveCharacters(receivedData.results);
    });
}

function saveApiConfiguration(receivedData){
  if(receivedData.info === undefined) return;
  const apiConf={
    TOTAL_CHARACTERS:receivedData.info.count,
    TOTAL_PAGES: receivedData.info.pages
  }
  sessionStorage.setItem('apiConf', JSON.stringify(apiConf));
}

function renderCharacters(charactersArray, sectionContainer = "home-page") {
  charactersArray.forEach((element, index) => {
    const container = document.getElementById(sectionContainer).children[index];
    container.setAttribute("id", element.id);
    container.children[0].src = element.image;
    container.children[0].alt = element.name + " image";
    container.children[1].innerHTML = element.name;
  });
}

function setPaginatorActiveButton() {
  let paginatorList = document.getElementById("paginator-list");
  let li = paginatorList.getElementsByTagName("li");
  li[previosActivePaginatorPage].classList.remove("active");
  li[activePaginatorPage].classList.add("active");
}

function saveCharacters(serverInfo = {}) {
  sessionStorage.setItem("charactersObject", JSON.stringify(serverInfo));
}

function redirectToDetail(e) {
  const characterIdtoShowDetail = parseInt(e.target.parentElement.id);
  sessionStorage.setItem('idToShowDetail', characterIdtoShowDetail)
  location.hash = '/detail';
}

async function renderDetail() {
  setActiveLink('none');
  const characterIdtoShowDetail = await parseInt(sessionStorage.getItem('idToShowDetail'));
  let charactersList = await JSON.parse(sessionStorage.getItem("charactersObject"));
  let characterToRender = charactersList.filter( character => character.id == characterIdtoShowDetail);
  renderCharacters(characterToRender, 'detail-container-page');
  renderCharacterDetail(characterToRender[0]);
}

function renderCharacterDetail(characterInfo){
  const table = document.getElementById('character-info-table');
  const labels = ['status', 'species', 'gender', 'origin'];
  const characterName = document.getElementById('character-name-detail');
  characterName.innerHTML = characterInfo.name;
  labels.forEach((element, index)=>{
    let row = table.insertRow(index);
    let cellLabel = row.insertCell(0);
    cellLabel.classList.add('table-label');
    let cellCharacterInfo = row.insertCell(1);
    cellLabel.innerHTML = element.toUpperCase()+' :';
    if(element!='origin')
      cellCharacterInfo.innerHTML = characterInfo[element].toUpperCase();
      else
      cellCharacterInfo.innerHTML = characterInfo[element].name.toUpperCase();
  })
}


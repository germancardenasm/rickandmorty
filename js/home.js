const QTY_HOME_CHARACTERS = 3;

const charactersUrl = "https://rickandmortyapi.com/api/character/";
let TOTAL_CHARACTERS = 0;
let TOTAL_PAGES = 0;
let nextPage = "";
let prevPage = "";
let activePaginatorPage = 1;
let previosActivePaginatorPage = 1;
const showAllSection = document.getElementById("showAllSection");
const showAllButton = document.getElementById("button-showAll");
const homePage = document.getElementById("home-page");
const characters = document.getElementById("characterPage");
const charactersContainerPage = document.getElementById(
  "characters-container-page"
);
const charactersPageTitle = document.getElementById("characters-page-title");
const pagination = document.getElementById("pagination");
const next = document.getElementById("previous");
const previous = document.getElementById("next");

bootstrap();
renderHome();

function bootstrap() {
  const apiInfo = getCharacter(charactersUrl);
  apiInfo.then(data => {
    TOTAL_CHARACTERS = data.info.count;
    TOTAL_PAGES = data.info.pages;
  });
  addEventListeners();
}

function renderHome() {
  renderCharactersContainers();
  getHomeCharacters();
}

function addEventListeners() {
  showAllButton.addEventListener("click", showAllCharacters);
  next.addEventListener("click", changePage);
  previous.addEventListener("click", changePage);
  window.addEventListener('hashchange', function() {
    console.log('The hash has changed!')
  }, false);
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
    container.addEventListener("click", getCharacterDetail);
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

function hideSection(sectionToHide) {
  document.getElementById(sectionToHide).classList.add("d-none");
}

function showSection(sectionToShow) {
  document.getElementById(sectionToShow).classList.remove("d-none");
}

function showAllCharacters(event) {
  event.preventDefault();
  const requestCharactersList = getCharacter(charactersUrl);
  setUpPaginator();
  hideSection("header");
  hideSection("home-page");
  hideSection("showAllSection");
  renderCharactersContainers(20, "characters-container-page");
  renderPageWhendataAvailable(requestCharactersList);
  charactersContainerPage.classList.add("d-flex");
  charactersContainerPage.classList.add("flex-wrap");
  showSection("characters-page");
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

function removeAllCharacters(section = "home-page") {
  var myNode = document.getElementById(section);
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

function getCharacterDetail(e) {
  hideSection('header');
  hideSection('home-page');
  hideSection('characters-page');
  hideSection('showAllSection');
  showSection('detail-page');
  const characterIdtoShowDetail = parseInt(e.target.parentElement.id);
  let charactersList = JSON.parse(sessionStorage.getItem("charactersObject"));
  let characterToRender = charactersList.filter( character => character.id == characterIdtoShowDetail);
  renderCharacters(characterToRender, 'detail-container-page');
  renderDetail(characterToRender[0]);
}


function renderDetail(characterInfo){
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

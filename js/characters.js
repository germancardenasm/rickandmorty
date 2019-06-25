import {renderCharactersContainers, getById, getCharacter, renderPageWhendataAvailable, setActiveLink, getStorageItems, initStorage, storageIsInit} from './mixins.js' 
import {redirectToDetail} from './detail.js'

let apiConf = {};
let paginatorConfig = {};

const redirectToCharacters = (event) => {
    location.hash = "/characters";
}

async function renderCharactersPage() {
  let a = await initStorage();
  apiConf = await getStorageItems('apiConf');
  paginatorConfig = await getStorageItems('paginatorConfig');
  const charactersContainerPage = getById("characters-container-page");
  const requestCharactersList = getCharacter(
        apiConf.charactersUrl,`?page=${paginatorConfig.activePaginatorPage}`
        );
  renderCharactersContainers(20, "characters-container-page");
  charactersContainerPage.addEventListener("click", redirectToDetail); //MOVE to characters & home
  renderPageWhendataAvailable(requestCharactersList);
  setUpPaginator();
  charactersContainerPage.classList.add("d-flex");
  charactersContainerPage.classList.add("flex-wrap");
  setActiveLink("characters-link");
}

const setUpPaginator = () => {
  const PREVIUOS_BUTTON = 1;
  let paginatorList = getById("paginator-list");
  paginatorList.addEventListener("click", changePage);

  for (let i = 1; i <= apiConf.TOTAL_PAGES; i++) {
    addPaginatorPageButton(i, paginatorList);
  }
  let li = paginatorList.getElementsByTagName("li");
  paginatorList.appendChild(li[PREVIUOS_BUTTON]);
  li[paginatorConfig.activePaginatorPage].classList.add("active");
}

const addPaginatorPageButton = (i, paginatorList) => {
  let li = document.createElement("li");
  let anchor = document.createElement("a");
  li.classList.add("page-item");
  li.setAttribute("id", "page-" + i);
  anchor.classList.add("page-link");
  anchor.classList.add("page-link-num");
  anchor.innerHTML = i;
  li.appendChild(anchor);
  paginatorList.appendChild(li);
}

const changePage = (e) => {
  e.preventDefault();
  if (!e.target.classList.contains("page-link")) return;
  const buttonPressed = e.target.innerHTML;
  let dataReceived = {};
  apiConf  = getStorageItems('apiConf');

  if (
    (buttonPressed === "Next" && paginatorConfig.activePaginatorPage === 25) ||
    (buttonPressed === "Previous" && paginatorConfig.activePaginatorPage== 1  )
  )
    return;

  paginatorConfig.previosActivePaginatorPage = paginatorConfig.activePaginatorPage;

  if (buttonPressed === "Next") {
    dataReceived = getCharacter(apiConf.nextPage);
    paginatorConfig.activePaginatorPage++;
  } else if (buttonPressed === "Previous") {
    dataReceived = getCharacter(apiConf.prevPage);
    paginatorConfig.activePaginatorPage--;
  } else {
    paginatorConfig.activePaginatorPage = buttonPressed;
    dataReceived = getCharacter(apiConf.charactersUrl, `?page=${buttonPressed}`);
    paginatorConfig.activePaginatorPage = parseInt(buttonPressed);
  }

  renderPageWhendataAvailable(dataReceived);
  sessionStorage.setItem('paginatorConfig', JSON.stringify(paginatorConfig));
  setPaginatorActiveButton();

}

const setPaginatorActiveButton = () => {
  let paginatorList = getById("paginator-list");
  let li = paginatorList.getElementsByTagName("li");
  li[paginatorConfig.previosActivePaginatorPage].classList.remove("active");
  li[paginatorConfig.activePaginatorPage].classList.add("active");
}


export {redirectToCharacters, renderCharactersPage}
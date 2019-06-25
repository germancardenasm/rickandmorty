
const API_URL = "https://rickandmortyapi.com/api/character/"

const initStorage = () => {
  
  return new Promise( (resolve, reject) =>{

    if (storageIsInit()) return  resolve();

    getCharacter(API_URL).then(receivedData => {
    const apiConf = {
      QTY_HOME_CHARACTERS: 3,
      TOTAL_CHARACTERS: receivedData.info.count,
      TOTAL_PAGES: receivedData.info.pages,
      charactersUrl: API_URL,
      nextPage: receivedData.info.next,
      prevPage:  receivedData.info.prev,
    };
    const paginatorConfig ={
      activePaginatorPage: 1,
      previosActivePaginatorPage: 1,
    }
    sessionStorage.setItem("apiConf", JSON.stringify(apiConf));
    sessionStorage.setItem("paginatorConfig", JSON.stringify(paginatorConfig));
    resolve();
  });  
  })
  
}

const getCharacter = (url, characterId = "") => {
  return fetch(url + characterId)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      return response;
    });
}

const renderCharactersContainers = (
  qtyOfCharacters,
  sectionContainer) => {
  const container = getById(sectionContainer);
  for (let i = 0; i < qtyOfCharacters; i++) {
    const page = getById(sectionContainer);
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
    page.appendChild(container);
  }
}

const getById = (id) => {
  return document.getElementById(id);
}

const saveCharacters = (serverInfo = {})  => {
  sessionStorage.setItem("charactersObject", JSON.stringify(serverInfo));
}

const saveConfig = (receivedData) =>{
  const apiConf = {
    QTY_HOME_CHARACTERS: 3,
    TOTAL_CHARACTERS: receivedData.count,
    TOTAL_PAGES: receivedData.pages,
    charactersUrl: API_URL,
    nextPage: receivedData.next,
    prevPage:  receivedData.prev,
  };
  sessionStorage.setItem('apiConf', JSON.stringify(apiConf));
}

const renderPageWhendataAvailable = (
  promise,
  section = "characters-container-page"
) => {
  const container = getById(section);
  promise.then(receivedData => {
    const qtyOfCharactersReceived = receivedData.results.length;
    const qtyCharacterOnScreen = container.childElementCount;
    if (qtyCharacterOnScreen != qtyOfCharactersReceived) {
      removeAllCharacters(section);
      renderCharactersContainers(receivedData.results.length, section);
    }
    renderCharacters(receivedData.results, section);
    window.scrollTo(0, 0);
    saveCharacters(receivedData.results);
    if(receivedData.info)
      saveConfig(receivedData.info);
  });
}

const removeAllCharacters = (section = "home-page") => {
  var myNode = getById(section);
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
}

const renderCharacters = (charactersArray, sectionContainer = "home-page") => {
  charactersArray.forEach((element, index) => {
    const container = getById(sectionContainer).children[index];
    container.setAttribute("id", element.id);
    container.children[0].src = element.image;
    container.children[0].alt = element.name + " image";
    container.children[1].innerHTML = element.name;
  });
}

const setActiveLink = (link) => {
  let linksUl = getById("nav-links");
  for (let i = 0; i < linksUl.childElementCount; i++) {
    linksUl.children[i].classList.remove("active");
  }
  if (link != "none") getById(link).classList.add("active");
}

const getStorageItems = (data) => {
  return JSON.parse(sessionStorage.getItem(data));
}

const storageIsInit = () => {
  return getStorageItems("apiConf");
}

export {renderCharactersContainers, getById, getCharacter, renderPageWhendataAvailable, setActiveLink, renderCharacters, getStorageItems, storageIsInit, initStorage};
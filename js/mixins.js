import config from "./config.js";

const API_URL = config.API_URL;

const initStorage = () => {
  return new Promise((resolve, reject) => {
    getCharacter(API_URL).then(receivedData => {
      const apiConf = {
        QTY_HOME_CHARACTERS: 3,
        TOTAL_CHARACTERS: receivedData.info.count,
        TOTAL_PAGES: receivedData.info.pages,
        charactersUrl: API_URL,
        nextPage: receivedData.info.next,
        prevPage: receivedData.info.prev
      };
      const paginatorConfig = {
        activePaginatorPage: 1,
        previosActivePaginatorPage: 1
      };
      sessionStorage.setItem("apiConf", JSON.stringify(apiConf));
      sessionStorage.setItem(
        "paginatorConfig",
        JSON.stringify(paginatorConfig)
      );
      resolve();
    });
  });
};

const getCharacter = (url, characterId = "") => {
  return fetch(url + characterId)
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      return response;
    });
};

const renderCharactersContainers = (qtyOfCharacters, sectionContainer) => {

  const page = getById(sectionContainer);

  for (let i = 0; i < qtyOfCharacters; i++) {
    /* const container = document.createElement("div");
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
    container.append(nameContainer); */
    let container = createImgContainer(i);
    page.appendChild(container);
  }
};

const createImgContainer = (i) => {
  const container = document.createElement("div");
  container.setAttribute("id", i);
  container.classList.add("character-container");
  const img = document.createElement("img");
  img.classList.add("img");
  img.src = "./img/dummyImg.png";
  img.alt = "dummy image";
  container.appendChild(img);
  const nameContainer = document.createElement("div");
  nameContainer.classList.add("name-container");
  const name = document.createElement("h4");
  name.classList.add("character-name");
  nameContainer.appendChild(name);
  container.append(nameContainer);
  return container
}

const getById = id => {
  return document.getElementById(id);
};

const saveCharacters = (serverInfo = {}) => {
  sessionStorage.setItem("charactersObject", JSON.stringify(serverInfo));
};

const saveConfig = receivedData => {
  const apiConf = {
    QTY_HOME_CHARACTERS: 3,
    TOTAL_CHARACTERS: receivedData.count,
    TOTAL_PAGES: receivedData.pages,
    charactersUrl: API_URL,
    nextPage: receivedData.next,
    prevPage: receivedData.prev
  };
  sessionStorage.setItem("apiConf", JSON.stringify(apiConf));
};

const renderPageWhendataAvailable = (
  promise,
  section = "characters-container-page"
) => {
  const container = getById(section);
  promise.then(receivedData => {
    const qtyOfCharactersReceived = receivedData.results.length;
    const qtyCharacterOnScreen = container.childElementCount;
    if (qtyCharacterOnScreen != qtyOfCharactersReceived) {
      //removeAllCharacters(section);
      //renderCharactersContainers(receivedData.results.length, section);
      addOrRemoveContainers(qtyOfCharactersReceived, qtyCharacterOnScreen,container);
    }
    renderCharacters(receivedData.results, section);
    window.scrollTo(0, 0);
    saveCharacters(receivedData.results);
    if (receivedData.info) saveConfig(receivedData.info);
  });
};

const addOrRemoveContainers = (qtyReceived, qtyScreen, container) => {
  const diff = qtyReceived - qtyScreen;
  const lastId = container.children[qtyScreen-1].id;
  for (let i = 0; i < Math.abs(diff); i++) {
    if (diff < 0) {
      container.childNodes[qtyScreen-i].remove()
    }else{
      container.appendChild(createImgContainer(lastId+i));
    }
  }
};

const removeAllCharacters = (section = "home-page") => {
  var myNode = getById(section);
  while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
  }
};

const renderCharacters = (charactersArray, sectionContainer = "home-page") => {
  const pageContainer = getById(sectionContainer);
  charactersArray.forEach((element, index) => {
    const imgContainer = pageContainer.children[index];
    imgContainer.setAttribute("id", element.id);
    imgContainer.children[0].src = element.image;
    imgContainer.children[0].alt = element.name + " image";
    imgContainer.children[1].innerHTML = element.name;
  });
};

const setActiveLink = link => {
  let linksUl = getById("nav-links");
  for (let i = 0; i < linksUl.childElementCount; i++) {
    linksUl.children[i].classList.remove("active");
  }
  if (link != "none") getById(link).classList.add("active");
};

const getStorageItems = data => {
  return JSON.parse(sessionStorage.getItem(data));
};

const storageIsInit = () => {
  return getStorageItems("apiConf");
};

const parseRequestURL = () => {
  let url =
    location.hash
      .slice(1)
      .toLowerCase()
      .toLowerCase() || "/";
  return url;
};

export {
  renderCharactersContainers,
  getById,
  getCharacter,
  renderPageWhendataAvailable,
  setActiveLink,
  renderCharacters,
  getStorageItems,
  storageIsInit,
  initStorage,
  parseRequestURL,
  removeAllCharacters
};

const QTY_HOME_CHARACTERS = 3;
const charactersHomeContainer = document.getElementById("characters-home-div");
const charactersUrl = "https://rickandmortyapi.com/api/character/";




bootstrap();

function bootstrap() {
  let id = sessionStorage.getItem('characterDetail');
  const apiInfo = getCharacter(charactersUrl, id);
  apiInfo.then( receivedData => {
    console.log('character id: ',id);
    renderCharacters([receivedData]);
    renderDetail(receivedData);
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
    img.classList.add("character-image");
    img.src = "./img/dummyImg.png";
    img.alt = "dummy image";
    container.appendChild(img);
    container.append(nameContainer);
    container.addEventListener('click', getCharacterDetail);
    charactersHomeContainer.appendChild(container);
  }
}

function renderCharacters(charactersArray) {
  charactersArray.forEach((element, index) => {
    const container = charactersHomeContainer.children[index];
    const containerId = container.getAttribute('id');
    const name = document.getElementById(containerId).getElementsByClassName('name-container')[0];
    const characterImage  = document.getElementById(containerId).getElementsByClassName('character-image')[0];
    characterImage.src = element.image;
    characterImage.alt = element.name + " image";
    name.innerHTML = element.name;
    container.setAttribute("id", element.id);
  });
}

function renderDetail(characterInfo){
    const table = document.getElementById('character-info-table')
    const labels = ['status', 'species', 'gender', 'origin'];
    const characterName = document.getElementById('character-name-detail');
    characterName.innerHTML = characterInfo.name;
    labels.forEach((element, index)=>{
      let row = table.insertRow(index);
      let cellLabel = row.insertCell(0)
      cellLabel.classList.add('table-label')
      let cellCharacterInfo = row.insertCell(1)
      cellLabel.innerHTML = element.toUpperCase()+' :';
      if(element!='origin')
        cellCharacterInfo.innerHTML = characterInfo[element].toUpperCase();
        else
        cellCharacterInfo.innerHTML = characterInfo[element].name.toUpperCase();
    })
}

function getCharacterDetail(){
  console.log('loaded');
}



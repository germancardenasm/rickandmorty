
const navBar = {
    render : async () => {
      let view =  `
          <nav class="navbar navbar-expand-sm navbar-light bg-light mb-4">
              <a class="navbar-brand" href="#">
                <img src="./img/logoSmall.png"   class="d-inline-block align-top" alt="">
              </a>
              <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul id="nav-links" class="navbar-nav mr-auto">
                  <li id="home-link" class="nav-item active">
                    <a class="nav-link" href="/#/home">Home <span class="sr-only">(current)</span></a>
                  </li>
                  <li class="nav-item">
                    <a id="characters-link" class="nav-link" href="/#/characters">Personajes</a>
                  </li>
                  
                </ul>
              </div>
          </nav>
      `
      return view
    },
    after_render: async () => {

      }

}

export default navBar;
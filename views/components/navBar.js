
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
                <ul class="navbar-nav mr-auto">
                  <li class="nav-item active">
                    <a class="nav-link" href="./home.html">Home <span class="sr-only">(current)</span></a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="./characters.html">Personajes</a>
                  </li>
                  
                </ul>
              </div>
          </nav>
      `
      return view
    },
    after_render: async () => {
          console.log('navbar!')
      }

}

export default navBar;
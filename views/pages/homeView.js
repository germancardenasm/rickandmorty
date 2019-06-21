const home = {
    render : async () => {
      let view =  `
        <div class="home">
          <header id='header' class="header text-center">
              <div id='home-page-title'><h1 class="display-3">Rick and Morty</h1></div>
              <blockquote class="blockquote px-5 mt-4  text-left">
                  <p class="mb-0">““So what if he’s the Devil, Rick? 
                    At least the Devil has a job. At least he’s active 
                    in the community.””.</p>
                  <footer class="blockquote-footer text-right">Summer</footer>
              </blockquote>
            </header>
            
          <div class='characters-home' id='home-page'>
          </div>

          <section id='showAllSection' class='show-all-section'>
              <div class="px-3 py-4 mx-auto d-flex justify-content-around align-content-end flex-wrap"> 
                <p class="lead align-middle">Just click the button to see the rest of the family.</p>
                <a id='button-showAll' class="btn btn-primary btn-lg" href="./characters.html" role="button">See All</a>
              </div>
            </section>
        </div>
      `
      return view
    },
    after_render: async () => {
      
          console.log('home!')
         
      }
}

export default home;
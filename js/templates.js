export default templates = {

home: "

    <div class='characters-home' id='home-page'>
    </div>
  
  ",

characters:' 
    <div class="characters-page d-none" id='characters-page'>
        <div id='characters-page-title' class='page-title line-down'><h3 class='display-5'>Characters</h3>
        </div>
        <div class="characters-container-page d-flex justify-content-center" id='characters-container-page'>
        </div>
        <nav id='pagination' class='paginator px-5'>
            <ul id='paginator-list' class="pagination d-flex flex-wrap justify-content-center ">
                <li id='previous' class="page-item disable"><a class="page-link" href="#">Previous</a></li>
                <li id='next' class="page-item "><a class="page-link" href="#" aria-disabled="true">Next</a></li>
            </ul>
        </nav>
    </div>

',

detail: '

'

}
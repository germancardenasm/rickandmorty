"use strict";
import navBar             from '../views/components/navBar.js'
import homeView           from '../views/pages/homeView.js'
import charactersView     from '../views/pages/charactersView.js'
import detailView         from '../views/pages/detailView.js'
import Error404           from '../views/pages/Error404.js'
import Utils              from './Utils.js'

// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
      '/    '            : homeView
    , '/index'           : homeView
    , '/home'            : homeView
    , '/characters'      : charactersView
    , '/detail'          : detailView
    ,
};

// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async (e) => {
    // Lazy load view element:
    const header = null || document.getElementById('header_container');
    const content = null || document.getElementById('page_container');
    
    // Render the Header and footer of the page
    header.innerHTML = await navBar.render();
    await navBar.after_render();


    // Get the parsed URl from the addressbar
    let parsedURL = Utils.parseRequestURL()
    
    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    content.innerHTML = await page.render();
    await page.after_render();
  
}

// Listen on hash change:
window.addEventListener('hashchange', router, false);

// Listen on page load:
window.addEventListener('load', router, false);

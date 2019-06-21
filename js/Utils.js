const Utils = { 
    // --------------------------------
    //  Parse a url and get the hash
    // --------------------------------
    parseRequestURL : () => {
        let url = location.hash.slice(1).toLowerCase().toLowerCase() || '/';
        return url
    }
}

export default Utils;
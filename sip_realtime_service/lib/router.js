"use strict";

module.exports = function (routes, method, url) {
    
    if(!routes[method] || !routes[method][url]){
        return routes.default ? routes.default : null;
    }
   
    return routes[method][url];
    
};
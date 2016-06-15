/**
 * Asterisk Realtime API
 * Main file
 */
"use strict";

/**
 * Modules
 */
const
    http = require('http'),
    co = require('co'),
    route = require(__dirname + '/routes'),
    exec = require(__dirname + '/lib/utils').exec;
    
/**
 * Constants
 */
const
    PORT = 3001;
    
let requestHandler = function requestHandler(req, res) {
    
    console.log('Request::', req.method, req.url);
    
    co(route(req, res));
            
};

let server = http.createServer(requestHandler);

server.listen(PORT);
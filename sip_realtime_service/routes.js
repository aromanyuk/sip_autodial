"use strict";

const
    monk = require('monk'),
    wrap = require('co-monk'),
    JSONStream = require('JSONStream');

let db = monk('127.0.0.1/sip_autodial'),
    Channel = wrap(db.get('channel'));

let router = require(__dirname + '/lib/router'), routes = {};

routes.GET = {};
routes.GET['/sippeers'] = function *(req, res) {
    
    let peers;
    
    peers = yield Channel.find({ status: 'idle', active: true });
    
    res.writeHead('Content-Type: application/json');
    res.pipe(JSONStream.parse(peers));
    
};

routes.default = function *(req, res) {
    res.statusCode = 404;
    res.statusMessage = 'Not Found';
    res.end();
};

module.exports = function (req, res) {
    return router(routes, req.method, req.url)(req, res);
};
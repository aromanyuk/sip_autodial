'use strict';

const User = require('../models/user');

function isGranted(ctx) {
    return ctx.session.auth && ctx.session.user.access === 'admin';
}

module.exports.usersPage = function *usersPage() {
    
    if(!isGranted(this)) {
        this.redirect('/login');
        return;
    }
    
    let users = yield User.read({});
    
    this.render('users', { 
        user: this.session.user, 
        data: users.data
    });
};

module.exports.read = function *read() {
    
    let query;
    
    if(!isGranted(this)) {
        return this.body = { error: "access_forbidden" };
    }
    
    query = this.request.query;
    this.body = yield User.read(query);
    
};

module.exports.create = function *create() {
    
    let body;
    
    if(!isGranted(this)) {
        return this.body = { error: "access_forbidden" };
    }
    
    body = this.request.body;
    this.body = yield User.create(body);
    
};

module.exports.update = function *update() {
    
    let query, body;
    
    if(!isGranted(this)) {
        return this.body = { error: "access_forbidden" };
    }
    
    query = this.request.query;
    body = this.request.body;
    this.body = yield User.update(query, body);
    
};

module.exports.remove = function *remove() {
    
    let query;
    
    if(!isGranted(this)) {
        return this.body = { error: "access_forbidden" };
    }
    
    query = this.request.query;
    this.body = yield User.remove(query);
    
};
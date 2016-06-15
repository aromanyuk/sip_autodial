'use strict';

const User = require('../models/user');

module.exports.loginPage = function *loginPage() {
    
    if(this.session.auth) {
        this.redirect('/');
        return;
    }
    
    this.render('login');
};

module.exports.login = function *login() {
    
    let body, user, query;
    
    body = this.request.body;
    
    if(!body.login || !body.password) {
        // this.body = { error: 'missing_required_data' };
        this.redirect('/login');
        return;
    }
    
    query = yield User.read({
        login: body.login,
        password: body.password
    });
    user = query.data[0] || null;
        
    if(user){
        this.session.auth = true;
        this.session.user = {
            login: user.login,
            id: user._id,
            numbers: user.numbers,
            access: user.access
        };
        this.redirect('/');
        return;
    }
    
    if(this.session.auth) {
        this.redirect('/');
        return;
    }
    
    this.redirect('/login');
};

module.exports.logout = function *logout() {
    this.session = null;
    this.redirect('/login');
};
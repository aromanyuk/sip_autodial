'use strict';

const route = require('koa-route');

//Controllers
const authController = require('./controllers/auth_controller'),
    channelsController = require('./controllers/channels_controller'),
    usersController = require('./controllers/users_controller');

let Routes;

Routes = (app) => {
    
    app.use(route.get('/', function *() {
        
        if(this.session.auth) {
            switch(this.session.user.access) {
                case 'admin':
                    this.redirect('/users');
                    break;
                case 'user':
                    this.redirect('/channels');
                    break;
                default:
                    this.redirect('/channels');
            }
            return;
        }
        
        this.redirect('/login');
        
    }));
    
    app.use(route.get('/login', authController.loginPage));
    app.use(route.post('/login', authController.login));
    app.use(route.get('/logout', authController.logout));
    
    app.use(route.get('/channels', channelsController.channelsPage));
    app.use(route.get('/channel', channelsController.read));
    app.use(route.post('/channel', channelsController.create));
    app.use(route.put('/channel', channelsController.update));
    app.use(route.delete('/channel', channelsController.remove));
    
    app.use(route.get('/users', usersController.usersPage));
    app.use(route.get('/user', usersController.read));
    app.use(route.post('/user', usersController.create));
    app.use(route.put('/user', usersController.update));
    app.use(route.delete('/user', usersController.remove));
};

module.exports = Routes;
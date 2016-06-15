'use strict';

const Channel = require('../models/channel'),
    User = require('../models/user');

function isGranted(ctx) {
    return ctx.session.auth;
}

module.exports.channelsPage = function *channelsPage() {
    
    let channels, owners, numbers;
    
    if(!isGranted(this)) {
        this.redirect('/login');
        return;
    }
    
    if(this.session.user.access === 'admin') {
        channels = yield Channel.read({});
        owners = yield User.native.find({ access: 'user' }, { fields: { _id: 1, login: 1 } });
        this.render('admin_channels', {
            user: this.session.user, 
            data: channels.data,
            owners: owners
        });
        return;
    }
    
    channels = yield Channel.read({ owner: this.session.user.id });
    numbers = this.session.user.numbers && this.session.user.numbers.split(',').map(el => el.trim());
    
    this.render('channels', {
        user: this.session.user,
        numbers: numbers || [],
        data: channels.data
    });
};

module.exports.read = function *read() {
    
    let query, opts;
    
    opts = {};
    
    if(!isGranted(this)) {
        return this.body = { error: "access_forbidden" };
    }
    
    if(this.session.user.access === 'user') opts.fields = {}, opts.fields.number = 1;
    query = this.request.query;
    this.body = yield Channel.read(query, opts);
    
};

module.exports.create = function *create() {
    
    let body;
    
    if(!isGranted(this)) {
        return this.body = { error: "access_forbidden" };
    }
    
    body = this.request.body;
    this.body = yield Channel.create(body);
    
};

module.exports.update = function *update() {
    
    let query, body;
    
    if(!isGranted(this)) {
        return this.body = { error: "access_forbidden" };
    }
    
    query = this.request.query;
    if(this.session.user.access !== 'admin') query.owner = this.session.user.id;
    body = this.request.body;
    this.body = yield Channel.update(query, body);
    
};

module.exports.remove = function *remove() {
    
    let query;
    
    if(!isGranted(this)) {
        return this.body = { error: "access_forbidden" };
    }
    
    query = this.request.query;
    if(this.session.user.access !== 'admin') query.owner = this.sessioon.user.id;
    this.body = yield Channel.remove(query);
    
};
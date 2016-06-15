'use strict';

const 
    config = require('../config')(process.env.NODE_ENV),
    normalize = require('../lib/utils').normalizeModel,
    monk = require('monk'),
    wrap = require('co-monk');

let db = monk(config.mongo),
    User = wrap(db.get('user'));

let schema = {
    _id: User.helper.id,
    login: String,
    password: String,
    access: String,
    channels: Number,
    numbers: String,
    pricePerChannel: Number,
    balance: Number
};

module.exports.native = User;

module.exports.create = function *create(data, opts) {

    let user, result;
    
    opts = opts || {};
    data = normalize(schema, data);
    
    if(!data.login || !data.password) {
        return { error: 'no_required_data' };
    }

    user = yield User.findOne({ login: data.login });

    if(user) {
        return { error: 'user_exists' };
    }
    
    data.create_at = Math.floor(Date.now() / 1000);
    result = yield User.insert(data);
    return { error: null, data: result };
};

module.exports.read = function *read(query, opts) {
    
    let result;
    
    opts = opts || {};
    query = normalize(schema, query);
    result = yield User.find(query);
    return { error: null, data: result };
    
};

module.exports.update = function *update(query, data, opts) {
    
    let result;
    
    opts = opts || {};
    query = normalize(schema, query);
    data = normalize(schema, data);
    
    console.log(query, data);
    result = yield User.update(query, { $set: data }); 
    return { error: null, data: true };
    
};

module.exports.remove = function *remove(query, opts) {
    
    let result;
    
    opts = opts || {};
    query = normalize(schema, query);
    result = yield User.remove(query);
    return { error: null, data: result };
    
};

module.exports.getByIds = function *getById(query, opts) {
    
    let result;
    
    opts = opts || {};
    result = yield User.find({ _id: { $in: query.map(User.helper.id) } });
    return { error: null, data: result };
    
};
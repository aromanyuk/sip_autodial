'use strict';

const 
    config = require('../config')(process.env.NODE_ENV),
    normalize = require('../lib/utils').normalizeModel,
    monk = require('monk'),
    wrap = require('co-monk');

let db = monk(config.mongo),
    Channel = wrap(db.get('channel'));

let schema = {
    _id: Channel.helper.id,
    name: String,
    provider: String,
    sipLogin: String,
    sipPassword: String,
    status: String,
    owner: String,
    ownerName: String,
    number: String,
};

module.exports.create = function *create(data, opts) {

    let channel, result;
    
    opts = opts || {};
    data = normalize(schema, data);
    
    if( !(data.provider && data.sipLogin && data.sipPassword) ) {
        return { error: 'no_required_data' };
    }

    channel = yield Channel.findOne({ provider: data.provider, sipLogin: data.sipLogin });

    if(channel) {
        return { error: 'channel_exists' };
    }
    
    data.create_at = Math.floor(Date.now() / 1000);
    result = yield Channel.insert(data, opts);
    return { error: null, data: result };
};

module.exports.read = function *read(query, opts) {
    
    let result;
    
    opts = opts || {};
    query = normalize(schema, query);
    
    result = yield Channel.find(query, opts);
    return { error: null, data: result };
    
};

module.exports.update = function *update(query, data, opts) {
    
    let result;
    
    opts = opts || {};
    query = normalize(schema, query);
    data = normalize(schema, data);
    result = yield Channel.update(query, { $set: data }, opts); 
    return { error: null, data: true };
    
};

module.exports.remove = function *remove(query, opts) {
    
    let result;
    
    opts = opts || {};
    query = normalize(schema, query);
    result = yield Channel.remove(query, opts);
    return { error: null, data: true };
    
};
'use strict';

module.exports.normalizeModel = function normalizeModel(schema, data) {
    
    let normalized = {};
    
    Object.keys(data).forEach(function (key) {
        if(schema[key]) normalized[key] = schema[key](data[key]);
    });
    
    return normalized;
} 
"use strict";

const
    exec = require('child_process').exec;
    
module.exports.exec = function (command) {
        
    return new Promise(function (resolve, reject) {
        
        exec(command, function () {
            resolve(arguments);
        });
        
    });
    
};
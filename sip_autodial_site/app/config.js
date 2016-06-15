'use strict';

let config = [
    
    {
        env: 'PRODUCTION',
        port: 80,
        pug: {
            viewPath: './views',
            noCache: false,
            debug: false,
            pretty: false,
            compileDebug: false,
            locals: {},
            basedir: '',
            helperPath: []
        },
        mongo: ''
    },
    {
        env: 'STAGING',
        port: 80,
        pug: {
            viewPath: './views',
            noCache: false,
            debug: false,
            pretty: false,
            compileDebug: false,
            locals: {},
            basedir: '',
            helperPath: []
        }
    },
    {
        env: 'DEVELOPMENT',
        port: 3000,
        pug: {
            viewPath: './views',
            noCache: true,
            debug: true,
            pretty: true,
            compileDebug: false,
            locals: {},
            basedir: '',
            helperPath: []
        },
        mongo: ''
    }
    
];

function buildConfig(env) {
    
    let currentConfig = {};
    env = env || 'DEVELOPMENT';
    for(let i = 0; i < config.length; i++) {
        if(env === config[i].env) {
            currentConfig = config[i];
            break;
        }
    }
    
    return currentConfig;
    
}

module.exports = buildConfig;
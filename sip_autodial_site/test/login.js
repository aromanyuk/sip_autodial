'use strict';
    
let
    request = require('supertest'),
    agent = require('supertest-koa-agent'),
    app = require('../app/index');
    
//app = agent(app);

console.log(app);

describe('login', function () {
    
    describe('success', function () {
        
        it('should redirect to / page', function (done) {
            
            request(app.listen())
                .get('/login')
                .expect(200, done);
        });
        
    });
    
});
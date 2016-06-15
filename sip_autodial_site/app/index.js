'use strict';

const 
  koa = require('koa'),
  logger = require('koa-logger'),
  Routes = require('./routes'),
  Pug = require('koa-pug'),
  serve = require('koa-static'),
  bodyParser = require('koa-bodyparser'),
  session = require('koa-generic-session'),
  sessionMongoStore = require('koa-generic-session-mongo'),
  config = require('./config')(process.env.NODE_ENV);
    
const 
  app = module.exports = koa(),
  pug = new Pug(Object.assign(config.pug, { app: app }));
  
app.keys = ['sfmafmskn32tgkrk', 'fm4n37fyefJKBYg'];

app.use(logger())
  .use(bodyParser())
  .use(session({
    store: new sessionMongoStore()
  }))
  .use(serve('public'))
  .use(serve('assets/bower_components'));
  
Routes(app);

const port = config.port;

app.listen(port, () => console.log(`Server listening on port ${port}`) );
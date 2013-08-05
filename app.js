
/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path'),
  env = process.env.NODE_ENV || 'development',
  config = require('./config'),
  mongoose = require('mongoose'),
  stylus = require('stylus'),
  nib = require('nib');

console.log('/**************')
console.log('**************')
console.log('**************')
console.log(env)
console.log('**************')
console.log('**************')
console.log('**************/')
mongoose.connect(config[env]['db']);


var app = module.exports = express();

/**
 * Configuration
 */

// all environments
function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(stylus.middleware(
  {
    src: __dirname + '/public',
    compile: compile
  }
))

app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
  app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
};


/**
 * Routes
 */

// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
app.get('/api/name', api.name);
app.get('/api/getallposts', api.getAllPosts);
app.post('/api/newpost', api.newPost);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

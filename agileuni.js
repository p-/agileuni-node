var express = require('express');
var servertime = require('./lib/servertime.js');

var app = express();

// setup handlebars for templating
var handlebars = require('express-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// setup static content folder
app.use(express.static(__dirname + '/public'));

// home page
app.get('/', function(req, res) {
	res.render('home');
});

// other page
app.get('/other', function(req,res){
	res.render('other', { servertime: servertime.getServertime() } );
});

// simple REST API
require('./rest-api.js')(app);

// page not found handler
app.use(function(req, res, next){
	res.status(404);
	res.send('404 - Not found');
});

// error handler
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.send('500 - Server error');
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function(){
	console.log( 'Running on http://localhost:' + app.get('port') + '; Stop with Ctrl-C.' );
});

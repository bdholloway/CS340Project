/*
    Uses express, dbcon for database connection, body parser to parse form data
    handlebars for HTML templates
*/

var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var path = require('path');


var app = express();
var handlebars = require('express-handlebars');

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.set('mysql', mysql);

app.get('/', (req, res) => {
  res.render('Login');
});

app.get('/Register', (req, res) => {
  res.render('Register');
});

app.get('/Home', (req, res) => {
  res.render('Home');
});

app.get('/AddWorkout', (req, res) => {
  res.render('AddWorkout');
});

app.get('/Rate', (req, res) => {
  res.render('Rate');
});

app.get('/index', (req, res) => {
  res.render('Index');
});

app.get('/AddSession', (req, res) => {
  res.render('AddSession');
});




app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.set('port', 64812);
app.listen(app.get('port'), function(){
  console.log('Express started on http://flipX.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});

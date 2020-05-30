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
app.use(bodyParser.text());

app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.set('mysql', mysql);

app.get('/', function(req, res){
  console.log('Inside login page');
  res.render('Login');
});

app.get('/Register', (req, res) => {
  res.render('Register');
});

//Route to users profile. 
app.get('/Home', function(req, res){
  var sessionQuery = 'SELECT * FROM WorkoutSession';
  mysql.pool.query(sessionQuery, function(error, results, fields){
    console.log(results);
  res.render('Home', {
    results: results
  });
});
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

//add session------------------------------------------------------

app.get('/AddSession', (req, res) => {
  var sessQuery = 'SELECT * FROM WorkoutSession';
  mysql.pool.query(sessQuery, function(error, results, fields){
    var sessRes = results

    sessQuery = 'SELECT `planName` FROM workoutPlan';
    mysql.pool.query(sessQuery, function(error, results, fields){
      console.log(error)
      var planRes = results

      console.log("sessRes")
      console.log(sessRes);

      console.log("planRes")
      console.log(planRes);

      res.render('AddSession', {
        sessRes: sessRes, 
        planRes: planRes
      });
    });
  });

  

  
});

app.post('/addNewSession', function(req, res){

  var sessQuery = req.body;

  console.log("Body is: " + sessQuery);

  mysql.pool.query(sessQuery, function(error, results, fields){
    console.log(error);
    console.log("inserted workout session");
  });
  
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

app.set('port', 64815);
app.listen(app.get('port'), function(){
  console.log('Express started on http://flipX.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
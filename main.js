/*
    Uses express, dbcon for database connection, body parser to parse form data
    handlebars for HTML templates
    */

   var express = require("express");
   var mysql = require("./dbcon.js");
   var bodyParser = require("body-parser");
   var path = require("path");
   var session = require("express-session");
   var app = express();
   var handlebars = require("express-handlebars");
   app.use(session({ secret: "super secret" }));
   app.use(express.static(path.join(__dirname, "public")));
   app.engine("handlebars", handlebars({ defaultLayout: "main"}));
   app.use(bodyParser.urlencoded({ extended: true }));
   const bcrypt = require("bcrypt");
   app.set("view engine", "handlebars");
   app.use(express.static(path.join(__dirname, "public")));
   app.set("mysql", mysql);
   const saltRounds = bcrypt.genSaltSync(10);

   app.get("/", (req, res) => {
     res.render("Login");
   });
   
   app.post("/login", (req, res, next) => {
     //console.log(req.user.name);
     if (req.body.userType == "Member") {
       mysql.pool.query(
         "SELECT * from Member where username = ?;",
         [req.body.username],
         function (error, rows) {
           if (error) {
             console.log(err);
           } else if (rows.length) {
             bcrypt.compare(req.body.password, rows[0].hashedPassword, function (
               err,
               blah
             ) {
               if (blah) {
                 console.log("WE DID IT!");
                 req.session.username = rows[0].username;
                 req.session.memberID = rows[0].memberID;
                 req.session.userType = req.body.userType;
                 console.log(req.session.userType);
                 //console.log(req.session.username);
                 //console.log(req.session.memberID);
                 req.session.save();
                 res.redirect("Rate");
               } else {
                 console.log("Passwords don't match");
               }
             });
           } else {
             console.log("Query didn't return any results.");
           }
         }
       );
     } else {
       mysql.pool.query(
         "SELECT * from Trainer where username = ?;",
         [req.body.username],
         function (error, rows) {
           if (error) {
             console.log(err);
           } else if (rows.length) {
             bcrypt.compare(req.body.password, rows[0].hashedPassword, function (
               err,
               blah
             ) {
               if (blah) {
                 console.log("WE DID IT!");
                 req.session.username = rows[0].username;
                 req.session.trainerID = rows[0].trainerID;
                 req.session.userType = req.body.userType;
                 console.log(req.session.userType);
                 //console.log(req.session.username);
                 //console.log(req.session.memberID);
                 req.session.save();
                 res.render("Register");
               } else {
                 console.log("Passwords don't match");
               }
             });
           } else {
             console.log("Query didn't return any results.");
           }
         }
       );
     }
   });
   
   app.post("/register", (req, res, next) => {
     bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
       mysql.pool.query(
         "INSERT INTO Member (username, firstName, lastName, hashedPassword) VALUES (?, ?, ?, ?);",
         [req.body.username, req.body.fname, req.body.lname, hash],
         function (error, rows) {
           if (error) {
             console.log(hash);
             console.log(err);
           } else {
             res.render("Login");
           }
         }
       );
     });
   });
   
   app.get("/register", (req, res) => {
     res.render("Register");
   });
   
   app.get("/rate", (req, res) => {
   var trainer;
   mysql.pool.query("SELECT trainerID, firstName, lastName, rating FROM Trainer;", function (error, trainer, fields) {
     if (error) {
       res.write(JSON.stringify(error));
       res.end();
     }
     
     res.render('Rate', {
       trainer: trainer
     });
   });
   
   });
   
   app.post("/rate", (req, res) => {
     console.log(req.session.memberID);
     console.log(req.body.trainerID);
     console.log(req.body.score);
     var trainer;
     mysql.pool.query(
       "INSERT INTO Rates (memberID, trainerID, rating) VALUES (?, ?, ?);",
       [req.session.memberID, req.body.trainerID, req.body.score],
       function (error, rating, fields) {
         if (error) {
           res.write(JSON.stringify(error));
           res.end();
         }
   
         res.redirect("Rate");
       }
     );
   });
app.use(bodyParser.json());

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
  if (!req.session.username) {
    res.redirect("/");
  } else if (req.session.userType != "Member") {
    res.redirect("/AddSession");
  } else {
    var sql = 'SELECT * FROM WorkoutSession JOIN Trainer ON WorkoutSession.tid = Trainer.trainerID \
    JOIN workoutPlan ON WorkoutSession.pName = workoutPlan.planName \
    WHERE WorkoutSession.sessionId NOT IN (SELECT sessionID FROM Takes WHERE memberID=?);';
    mysql.pool.query(sql, [req.session.memberID], function (err, rows, fields) {
      if (err) {
        console.log(err);
        res.status(500);
        res.render('500');
      } else {

        sql = 'SELECT * FROM WorkoutSession JOIN Trainer ON WorkoutSession.tid = Trainer.trainerID \
        JOIN workoutPlan ON WorkoutSession.pName = workoutPlan.planName \
        WHERE WorkoutSession.sessionId IN (SELECT sessionID FROM Takes WHERE memberID=?);';
        mysql.pool.query(sql, [req.session.memberID], function(err, mSessions, fields){
          if (err){
            console.log(err);
            res.status(500);
            res.render('500');
          } else{
            res.render('AddWorkout', { 
              data: rows,
              memSessions: mSessions
             });
          }
        });

      }
    });
  }
});


app.get('/index', (req, res) => {
  res.render('Index');
});

//add session------------------------------------------------------

app.get('/AddSession', (req, res) => {

  if (!req.session.username) {
    res.redirect("/");
  } else if (req.session.userType != "Trainer") {
      res.redirect("/AddWorkout");
  } else {

    var tid = req.session.trainerID;
    var sessQuery = 'SELECT * FROM WorkoutSession WHERE tid = ' + tid;
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
          planRes: planRes,
          tid: tid
        });
      });
    });
  }
});

app.post('/addNewSession', function(req, res){

  var sessQuery = req.body.sessQuery;
  console.log("Body is: " + sessQuery);

  mysql.pool.query(sessQuery, function(error, results, fields){
    console.log(error);
    console.log("inserted workout session");
  });
  
});

app.post('/addNewWorkout', function (req, res) {
  var sql = "INSERT INTO Takes (memberID, sessionID) VALUES ";
  console.log(req.body);
  var i;
  for(var i = 0; i < req.body.array.length; i++){
    sql += "("+req.session.memberID+", ?) ";
    if(i < req.body.array.length-1){
      sql+=",";
    }
  }
  sql += ";";
  console.log(sql);
  mysql.pool.query(sql, req.body.array, function (error, results, fields) {
    if(error){
      console.log(error);
      res.status(500).send("Error adding sessions");
    } else {
      console.log("inserted workout session");
      res.status(200).send("Success");
    }
  });
});

app.delete('/deleteWorkouts', function (req, res) {
  var sql = 'DELETE FROM Takes WHERE memberID = ?';
  console.log("Deleting workouts for ", req.session.memberID);
  mysql.pool.query(sql, [req.session.memberID], function (error, results, fields) {
    if (error) {
      console.log(error);
      res.status(500).send("Error deleting sessions");
    } else {
      console.log("Successfully deleted");
      res.status(200).send("Success");
    }
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

app.set('port', 64819);
app.listen(app.get('port'), function(){
  console.log('Express started on http://flipX.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});
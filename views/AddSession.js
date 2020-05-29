console.log("addsessionJS Loaded")
document.getElementById("newSessBtn").addEventListener("Click", function(){
    var sessDate = getElementById("sessDate").value;
    var sessTime = getElementById("sessTime").value;
    var numOfParticipants = getElementById("numOfParticipants").value;
    var duration = getElementById("duration").value;
    var tid = getElementById("tid").value;
    var pName = getElementById("pName").value;

    var sessQuery = 'INSERT INTO WorkoutSession (sessDate, numOfParticipants, sessTime, duration, tid, pName) VALUES ('+sessDate+', '+numOfParticipants+', '+sessTime+','+duration+','+tid+', '+pName+')';
    mysql.pool.query(sessQuery, function(error, results, fields){
        console.log(results);
        console.log("inserted workout session")
    });

    getElementById("sessDate").value="";
    getElementById("sessTime").value="";
    getElementById("numOfParticipants").value="";
    getElementById("duration").value="";
    getElementById("tid").value="";
    getElementById("pName").value="";
});
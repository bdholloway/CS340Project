// console.log("addsessionJS Loaded")

Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('ifnoteq', function (a, b, options) {
    if (a != b) { return options.fn(this); }
    return options.inverse(this);
});
// document.getElementById("newSessBtn").addEventListener("click", function(){
//     var sessDate = document.getElementById("sessDate").value;
//     var sessTime = document.getElementById("sessTime").value;
//     var numOfParticipants = document.getElementById("numOfParticipants").value;
//     var duration = document.getElementById("duration").value;
//     var tid = document.getElementById("tid").value;
//     var pName = document.getElementById("pName").value;

//     var sessQuery = "INSERT INTO WorkoutSession (sessDate, numOfParticipants, sessTime, duration, tid, pName) VALUES ('" + sessDate + "','" + numOfParticipants + "','" + sessTime + "','" + duration + "','" + tid + "','" + pName + "')";
  
//     var postRequest = new XMLHttpRequest();
//     var requestURL = "/addNewSession";
//     postRequest.open('POST', requestURL);
//     var requestBody = sessQuery;
//     console.log(requestBody);
//     postRequest.setRequestHeader('Content-Type', 'text/plain');
//     postRequest.send(requestBody);
    
//     alert("Inserted new session")

//     window.location.reload();
// });

// document.getElementById("upSessBtn").addEventListener("click", function(){
//     var sessID = document.getElementById("sessionID").value;
//     var sessDate = document.getElementById("sessDate2").value;
//     var sessTime = document.getElementById("sessTime2").value;
//     var numOfParticipants = document.getElementById("numOfParticipants2").value;
//     var duration = document.getElementById("duration2").value;
//     var tid = document.getElementById("tid").value;
//     var pName = document.getElementById("pName2").value;

//     var sessQuery = "UPDATE WorkoutSession SET sessDate=" + sessDate + ", numOfParticipants='" + numOfParticipants + "', sessTime='" + sessTime + "', duration='" + duration + "', pName='" + pName + "' WHERE sessionId='" + sessID + "'"
  
//     var postRequest = new XMLHttpRequest();
//     var requestURL = "/addNewSession";
//     postRequest.open('POST', requestURL);
//     var requestBody = sessQuery;
//     console.log(requestBody);
//     postRequest.setRequestHeader('Content-Type', 'text/plain');
//     postRequest.send(requestBody);
    
//     alert("Updated session")

//     window.location.reload();
// });
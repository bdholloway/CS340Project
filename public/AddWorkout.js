console.log("addsessionJS Loaded");

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("delete-all-btn").addEventListener("click", function () {
        console.log("Delete Everything");
        var deleteRequest = new XMLHttpRequest();
        var requestURL = "/deleteWorkouts";
        deleteRequest.open('DELETE', requestURL);
        deleteRequest.setRequestHeader('Content-Type', 'text/plain');
        deleteRequest.send();

        deleteRequest.addEventListener('load', function (event) {
            if (event.target.status === 200) {
                console.log("Success");
                location.reload();
            } else {
                console.log(event.target.status);
                alert("Error deleting Sessions: " + event.target.response);
            }
        });
    });

    document.getElementById("add-sessions-btn").addEventListener("click", function () {
        console.log("Add Sessions");
        var sessionIDs = document.getElementsByClassName("form-check-input");
        var i;
        var sessQuery = []; 
        for(i=0; i < sessionIDs.length; i++){
            if(sessionIDs[i].checked){
                sessQuery.push(sessionIDs[i].id);
            }
        }
        console.log(sessQuery);
        if(sessQuery.length > 0) {
            console.log("Sending a post request!");
            var postRequest = new XMLHttpRequest();
            var requestURL = "/addNewWorkout";
            postRequest.open('POST', requestURL);
            var requestBody = JSON.stringify({ array: sessQuery });
            console.log(requestBody);
            postRequest.addEventListener('load', function (event) {
                if (event.target.status === 200) {
                    console.log("Success");
                    location.reload();
                } else {
                    console.log(event.target.status);
                    alert("Error adding Sessions: " + event.target.response);
                }
            });
            postRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            postRequest.send(requestBody);
        } else {
            console.log("There are no checkboxes checked");
        }

    });
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
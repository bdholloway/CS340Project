console.log("addsessionJS Loaded")

document.getElementById("newSessBtn").addEventListener("click", function(){
    var sessDate = document.getElementById("sessDate").value;
    var sessTime = document.getElementById("sessTime").value;
    var numOfParticipants = document.getElementById("numOfParticipants").value;
    var duration = document.getElementById("duration").value;
    var tid = document.getElementById("tid").value;
    var pName = document.getElementById("pName").value;

    var sessQuery = "INSERT INTO WorkoutSession (sessDate, numOfParticipants, sessTime, duration, tid, pName) VALUES ('" + sessDate + "','" + numOfParticipants + "','" + sessTime + "','" + duration + "','" + tid + "','" + pName + "')";
  
    var postRequest = new XMLHttpRequest();
    var requestURL = "/addNewSession";
    postRequest.open('POST', requestURL);
    var requestBody = JSON.stringify({sessQuery: sessQuery});
    console.log(requestBody);
    postRequest.setRequestHeader('Content-Type', 'application/json');
    postRequest.send(requestBody);
    
    alert("Inserted new session")

    window.location.reload();
});

document.getElementById("upSessBtn").addEventListener("click", function(){
    var sessID = document.getElementById("sessionID").value;
    var sessDate = document.getElementById("sessDate2").value;
    var sessTime = document.getElementById("sessTime2").value;
    var numOfParticipants = document.getElementById("numOfParticipants2").value;
    var duration = document.getElementById("duration2").value;
    var tid = document.getElementById("tid").value;
    var pName = document.getElementById("pName2").value;

    var sessQuery = "UPDATE WorkoutSession SET sessDate='" + sessDate + "', numOfParticipants='" + numOfParticipants + "', sessTime='" + sessTime + "', duration='" + duration + "', pName='" + pName + "' WHERE sessionId='" + sessID + "'"
    console.log("Update session")
    console.log(sessQuery)

    var postRequest = new XMLHttpRequest();
    var requestURL = "/addNewSession";
    postRequest.open('POST', requestURL);
    var requestBody = JSON.stringify({sessQuery: sessQuery});
    console.log(requestBody);
    postRequest.setRequestHeader('Content-Type', 'application/json');
    postRequest.send(requestBody);
    
    alert("Updated session")

    window.location.reload();
});


document.getElementById("delSessBtn").addEventListener("click", function(){
    var sessID = document.getElementById("sessionID").value;
    
    var sessQuery = "DELETE FROM WorkoutSession WHERE sessionId =" + sessID
  
    var postRequest = new XMLHttpRequest();
    var requestURL = "/addNewSession";
    postRequest.open('POST', requestURL);
    var requestBody = JSON.stringify({sessQuery: sessQuery});
    console.log(requestBody);
    postRequest.setRequestHeader('Content-Type', 'application/json');
    postRequest.send(requestBody);
    
    alert("Deleted Session number: " + sessID)

    window.location.reload();
});
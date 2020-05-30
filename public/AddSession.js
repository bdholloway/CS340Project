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
    var requestBody = sessQuery;
    console.log(requestBody);
    postRequest.setRequestHeader('Content-Type', 'text/plain');
    postRequest.send(requestBody);
    
    alert("Inserted new session")

    document.getElementById("sessDate").value="";
    document.getElementById("sessTime").value="";
    document.getElementById("numOfParticipants").value="";
    document.getElementById("duration").value="";
    document.getElementById("tid").value="";
    document.getElementById("pName").value="";
});
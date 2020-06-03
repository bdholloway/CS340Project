console.log("addWorkoutjs Loaded");
var difficulty = ["Beginner", "Advanced", "Expert"];

document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("search-btn").addEventListener("click", function(){
        searchDB();
    });

    document.getElementById("search-content").addEventListener("keyup", function(e){
        if(e.keyCode === 13){
            e.preventDefault();
            document.getElementById("search-btn").click();
        }
    });

    document.getElementById("delete-all-btn").addEventListener("click", function () {
        console.log("Delete Everything");
        var deleteRequest = new XMLHttpRequest();
        var requestURL = "/deleteWorkouts";
        deleteRequest.open('DELETE', requestURL);
        deleteRequest.addEventListener('load', function (event) {
            if (event.target.status === 200) {
                console.log("Success");
                location.reload();
            } else {
                console.log(event.target.status);
                alert("Error deleting Sessions: " + event.target.response);
            }
        });
        deleteRequest.setRequestHeader('Content-Type', 'application/json');
        deleteRequest.send();
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
                    var message = JSON.parse(event.target.response);
                    console.log(message.sqlMessage);
                    alert("Error adding Sessions: " + message.sqlMessage);
                }
            });
            postRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            postRequest.send(requestBody);
        } else {
            console.log("There are no checkboxes checked");
        }
    });
});

function searchDB(){
    var text = document.getElementById("search-content").value;
    // window.location.href = "/search/" + text;
    // console.log(text);
    var getRequest = new XMLHttpRequest();
    var requestURL = "/search/" + text;
    getRequest.open('GET', requestURL);

    getRequest.addEventListener('load', function (event) {
        if (event.target.status === 200) {
            var body = JSON.parse(event.target.response);
            var enrolledSessions = body.memSessions;
            var otherSessions = body.data;
            console.log(body);
            var table = document.getElementsByClassName('search-results');
            table[0].innerHTML = "";
            table[1].innerHTML = "";

            console.log("Success");
            if (enrolledSessions.length > 0) {
                console.log(enrolledSessions);
                var rows1 = "";
                for (var i = 0; i < enrolledSessions.length; i++) {
                    rows1 += "<tr>";
                    rows1 += "<td>" + enrolledSessions[i].firstName + " " + enrolledSessions[i].lastName + "</td>";
                    rows1 += "<td>" + enrolledSessions[i].rating + "</td>";
                    rows1 += "<td>" + enrolledSessions[i].pName + "</td>";
                    rows1 += "<td>" + enrolledSessions[i].description + "</td>";
                    rows1 += "<td>" + enrolledSessions[i].difficulty + "</td>";
                    rows1 += "<td>" + enrolledSessions[i].sessDate + "</td>";
                    rows1 += "<td>" + enrolledSessions[i].duration + "</td>";
                    rows1 += "<td>" + enrolledSessions[i].Full+" </td>";
                    rows1 += "</tr>";
                }
                table[0].innerHTML = rows1;
            } else {
                console.log("No results from query");
            }

            if (otherSessions.length > 0) {
                console.log(otherSessions);
                var rows1 = "";
                for (var i = 0; i < otherSessions.length; i++) {
                    rows1 += "<tr>";
                    rows1 += "<td>" + otherSessions[i].firstName + " " + otherSessions[i].lastName + "</td>";
                    rows1 += "<td>" + otherSessions[i].rating + "</td>";
                    rows1 += "<td>" + otherSessions[i].pName + "</td>";
                    rows1 += "<td>" + otherSessions[i].description + "</td>";
                    rows1 += "<td>" + otherSessions[i].difficulty + "</td>";
                    rows1 += "<td>" + otherSessions[i].sessDate + "</td>";
                    rows1 += "<td>" + otherSessions[i].duration + "</td>";
                    rows1 += "<td>" + otherSessions[i].Full +" </td>";
                    rows1 += "<td><input type=\"checkbox\" class=\"form-check-input\" id=\"" + otherSessions[i].sessionId + "\"></td>";
                    rows1 += "</tr>";

                }
                table[1].innerHTML = rows1;
            } else {
                console.log("No results from query");
            }

        } else {
            console.log(event.target.status);
            alert("Error getting data Sessions: " + event.target.response);
        }
    });

    getRequest.setRequestHeader('Content-Type', 'application/json');
    getRequest.send();
}
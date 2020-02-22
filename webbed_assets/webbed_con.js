$(document).ready(function () {
    console.log("ready function run");
    leaderboard_update();
    getquestion_v2();
    //update_table("something");
});


function leaderboard_update() {
    console.log("inside leaderboard_update");

    $.ajax({
        url: "http://dhanak19-001-site4.htempurl.com/api/web/leader",
        //type:"GET",
        //dataType:'json',
        //headers:{'Access-Control-Allow-Origin':true},
        crossDomain: true,
        success: function (result) {
            console.log("ajax call run successfully");
            console.log(result);
            update_table(result);
        }
    });

    /*
        var xhr=new XMLHttpRequest;
        xhr.onreadystatechange = function () {
            if (this.readyState > 3 && (this.status == 200 || this.status == 500)) {
                var obj=this.responseText;
                console.log("inside if");
                console.log(obj);
    
            }
            else console.log("inside else");
        }
        xhr.open("GET", "http://dhanak19-001-site4.htempurl.com/api/web/leader", true);
        //xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
       */
}
// 


var list_start, list_end = 7, no_of_leaders;
function update_table(data) {
    no_of_leaders = data.length;
    var table_construct;
    var name, college, id, rank;
    for (i = 0; i < no_of_leaders; i++) {

        name = data[i].name;
        college = data[i].college;
        rank = data[i].stage;


        table_construct = "<tr><td>" + rank + "</td><td>" + name + "</td><td>" + college + "</td></tr>"
        $("#leaderboard_table").append(table_construct);
    }
}



function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}


function submit() {
    var cdata = getCookie("profdata");
    var ans = document.getElementById("ans");
    if (ans.value.length == 0)
        alert("Empty Answer");
    else {
        var obj = JSON.parse(cdata);
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: "http://dhanak19-001-site4.htempurl.com/api/web/answer/" + obj.DId + "/" + ans.value,
            success: function (data) {
                if (data.hasOwnProperty("message")) {
                    alert(data.message);
                    if (data.message == "Correct Answer")
                        location.reload();
                }
            }
        });
    }
}
/*

function getquestion() {
    console.log("inside get question");
    var cdata = getCookie("profdata");
    if (!(cdata == "")) {
        var obj = JSON.parse(cdata);
        
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: "http://dhanak19-001-site4.htempurl.com/api/web/ques/" + obj.DId,
            success: function (data) {
                console.log("ajax call for question successful");
                console.log(data);
                /*
                if (data.hasOwnProperty("message")) {
                    if (!(data.message == "Completed")) {
                        var url = data.message.split(" ");
                        var qimg = document.getElementById('question');
                        $("#question").attr("src", url[0]);
                        $("#stag").html("Stage " + url[1]);
                    }
                    else
                        $("#stag").html("FIN");
                
                }
            }
        });
    }
    else {
        alert("Please login first");
        location.href = "login_v3.html";
    }

}

*/

function getquestion_v2() {
    console.log("inside get question");
    var cdata = getCookie("profdata");
    if (!(cdata == "")) {
        var obj = JSON.parse(cdata);
        $.ajax({
            type: "GET",
            url: "http://dhanak19-001-site4.htempurl.com/api/web/ques/" + obj.DId,
            beforeSend:function(){console.log('starting getQues Request');},
            success: function (result) {
                console.log(result);
                $("#qimg1").attr("src", "data:image;base64," + result.i1);
                $("#qimg2").attr("src", "data:image;base64," + result.i2);
                $("#qimg3").attr("src", "data:image;base64," + result.i3);
                $("#level").html(result.stage);
                //$(".qs_loader").css("display","none");

            }
        });
    }
    else {
        alert("Login to play");
        window.location="login_v3.html";

    }
}
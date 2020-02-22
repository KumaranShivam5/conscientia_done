var shown_h = false;
var shown_lb = false;

function hide()
{
    document.getElementById('hint').style.display = 'none';
    document.getElementById('lb').style.display = 'none';
    shown_lb = false;
    shown_h = false;
}
function showhint()
{
    if (shown_lb) {
        document.getElementById('lb').style.display = 'none';
        shown_lb = false;
    }
    if (shown_h) {
        document.getElementById('hint').style.display = 'none';
        shown_h = false;
    }
    else {
        document.getElementById('hint').style.display = 'block';
        shown_h = true;
    }
}

function showlb() {
    if (shown_h) {
        document.getElementById('hint').style.display = 'none';
        shown_h = false;
    }
    if (shown_lb) {
        document.getElementById('lb').style.display = 'none';
        shown_lb = false;
    }
    else {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: "http://dhanak19-001-site4.htempurl.com/api/web/leader",
            success: function (data) {
                updatetable(data);
            }
        });
        document.getElementById('lb').style.display = 'block';
        shown_lb = true;
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

function getquestion() {
    var cdata = getCookie("profdata");
    if (!(cdata == "")) {
        var obj = JSON.parse(cdata);
        var menu = document.getElementById('menu-nav');
        var profl = document.createElement('li');
        profl.id = "profl";
        profl.className = "nav-item";
        var links = document.createElement('a');
        var fname = obj.Name.split(" ")[0];
        links.innerHTML = "Hi, " + fname + "<br>" + "Dhanak ID: " + obj.DId;
        links.className = "nav-link";
        links.href = "#";
        profl.appendChild(links);
        menu.insertBefore(profl, menu.childNodes[2]);
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: "http://dhanak19-001-site4.htempurl.com/api/web/ques/" + obj.DId,
            success: function (data) {
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
        location.href = "http://dhanak.co.in/login.aspx";
    }

}



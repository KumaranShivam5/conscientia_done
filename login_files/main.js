$(document).ready(function () {
    var trigger = $('.hamburger'),
        overlay = $('.overlay'),
        isClosed = false;
    var cdata = getCookie("profdata");
    if (!(cdata == "")) {
        var statusdisp = document.getElementById('statusl');
        statusdisp.style.color = "red";
        statusdisp.innerHTML = "Already Logged In";
        var logo = document.getElementById('logbut');
        logo.innerHTML = "Logout";
        var obj = JSON.parse(cdata);
        var menu = document.getElementById('menu');
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
    }

    function buttonSwitch() {

        if (isClosed === true) {
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
        } else {
            overlay.show();
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            isClosed = true;
        }
    }

    trigger.click(function () {
        buttonSwitch();
    });

    $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
    });
});

  function loadlogin()
  {
      var elem = document.getElementById("reg");
  var pos = 18;
  var id = setInterval(frame, 1);
  function frame() {
    if (pos == 0) {
      clearInterval(id);
      elem.style.visibility = "hidden";
      bringlogin();
    } else {
      pos-=0.5;
      elem.style.left = pos + 'vw'
    }
  }
  }

  function bringlogin() {
    var elem = document.getElementById("log");
    elem.style.visibility = "visible";
    var pos = 0;
    var id = setInterval(frame, 1);
    function frame() {
      if (pos == 18) {
        clearInterval(id);
      } else {
        pos+=0.5;
        elem.style.left = pos + 'vw';
      }
    }
  }

  function loadregister()
  {
    var elem = document.getElementById("log");
    var pos = 18;
    var id = setInterval(frame, 1);
    function frame() {
      if (pos == 0) {
        clearInterval(id);
        elem.style.visibility = "hidden";
        bringregister();
      } else {
        pos-=0.5;
        elem.style.left = pos + 'vw';
      }
    }
  }

  function bringregister() {
    var elem = document.getElementById("reg");
    elem.style.visibility = "visible";
    var pos = 0;
    var id = setInterval(frame, 1);
    function frame() {
      if (pos == 18) {
        clearInterval(id);
      } else {
        pos+=0.5;
        elem.style.left = pos + 'vw';
      }
    }
}

function showreg() {
    
}

function register() {
  var nameObj = document.getElementById('name');
var noObj = document.getElementById('no');
var emObj = document.getElementById('em');
var colObj = document.getElementById('col');
var pwdObj = document.getElementById('pwd');
    var cpwdObj = document.getElementById('cpwd');
    if (pwdObj.value != cpwdObj.value) {
        alert("Passwords do not match");
    }
    else if(pwdObj.value.length < 8) {
        alert("Password should be atleast 8 characters long");
    }
    else if (colObj.value.length > 50)
        alert("Shorten College Name");
    else {
        //var statusdisp = document.getElementById('statusr');
        //statusdisp.style.color = "#999";
        //statusdisp.innerHTML = "Requesting";
        var modpic = document.getElementById('picmod');
        var modtex = document.getElementById('modtext');
        modpic.innerHTML = "";
        modtex.innerHTML = "Registering...";
        modpic.classList.add("loader");
        $("#ex1").modal('show');
        var hashObj = new jsSHA("SHA-256", "TEXT", { numRounds: 1 });
        hashObj.update(pwdObj.value);
        var hash = hashObj.getHash("HEX");
        pwdObj.value = hash;
        var xhr = new XMLHttpRequest();
        xhr.responseType='text';
        xhr.onreadystatechange = function () {
            if (this.readyState > 3 && (this.status == 200 || this.status == 500)) {
                var statusdisp = document.getElementById('statusr');
                var obj = JSON.parse(this.responseText);
                $("#ex1").modal('show');
                if (!isNaN(obj.message)) {
                    var modpic = document.getElementById('picmod');
                    var modtex = document.getElementById('modtext');
                    modpic.classList.remove("loader");
                    var modi = document.getElementById('modimg');
                    if (modi == null) {
                        var modimg = document.createElement('img');
                        modimg.src = "images/checked.png";
                        modimg.id = "modimg";
                        modimg.style.height = "60px";
                        modimg.style.width = "60px";
                        modpic.appendChild(modimg);
                    }
                    else {
                        modi.src = "images/checked.png";
                    }
                    modtex.innerHTML = "Registered";
                } else if (obj.message == "fail") {
                    var modpic = document.getElementById('picmod');
                    var modtex = document.getElementById('modtext');
                    modpic.classList.remove("loader");
                    var modi = document.getElementById('modimg');
                    if (modi == null) {
                        var modimg = document.createElement('img');
                        modimg.src = "images/cancel.png";
                        modimg.id = "modimg";
                        modimg.style.height = "60px";
                        modimg.style.width = "60px";
                        modpic.appendChild(modimg);
                    }
                    else {
                        modi.src = "images/cancel.png";
                    }
                    modtex.innerHTML = "Email Already Registered";
                } else {
                    var modpic = document.getElementById('picmod');
                    var modtex = document.getElementById('modtext');
                    modpic.classList.remove("loader");
                    var modi = document.getElementById('modimg');
                    if (modi == null) {
                        var modimg = document.createElement('img');
                        modimg.src = "images/cancel.png";
                        modimg.id = "modimg";
                        modimg.style.height = "60px";
                        modimg.style.width = "60px";
                        modpic.appendChild(modimg);
                    }
                    else {
                        modi.src = "images/cancel.png";
                    }
                    modtex.innerHTML = "Registration Failed";
                }
            }
            
        };
        xhr.open("POST", "http://dhanak19-001-site4.htempurl.com/api/user/reg", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        console.log("Name=" + nameObj.value + "&Phone=" + noObj.value + "&Email=" + emObj.value + "&College=" + colObj.value + "&Password=" + pwdObj.value.slice(0,50));
        xhr.send("Name=" + nameObj.value + "&Phone=" + noObj.value + "&Email=" + emObj.value + "&College=" + colObj.value + "&Password=" + pwdObj.value.slice(0,50));
        
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

function login() {
  var emlObj = document.getElementById('eml');
var pwdlObj = document.getElementById('pwdl');
    var cdata = getCookie("profdata");
    if (!(cdata == "")) {
        document.cookie = "profdata=; expires= Sat, 5 Oct 1980 22:00:00 UTC; path=/ ";
        alert("Logged Out");
        var statusdisp = document.getElementById('statusl');
        statusdisp.style.color = "#999";
        statusdisp.innerHTML = "";
        var logo = document.getElementById('logbut');
        logo.innerHTML = "Login";
        var element = document.getElementById('profl');
        element.parentNode.removeChild(element);
    }
    else if(pwdlObj.value.length < 8) {
        alert("Password should be atleast 8 characters long");
    }
    else {
        var modpic = document.getElementById('picmod');
        var modtex = document.getElementById('modtext');
        modpic.innerHTML = "";
        modtex.innerHTML = "Logging In...";
        modpic.classList.add("loader");
        $("#ex1").modal('show');
        var hashObj = new jsSHA("SHA-256", "TEXT", {numRounds: 1});
        hashObj.update(pwdlObj.value);
        var hash = hashObj.getHash("HEX");
        pwdlObj.value = hash;
        var xhr = new XMLHttpRequest();
        xhr.responseType="json";
        xhr.onreadystatechange = function() {
            if (this.readyState > 3 && this.status == 200) { /*success(xhr.responseText); */
                var res = this.response;
                var statusdisp = document.getElementById('statusl');
                $("#ex1").modal('show');
                if (res.hasOwnProperty("DId")) {
                    var modpic = document.getElementById('picmod');
                    var modtex = document.getElementById('modtext');
                    modpic.classList.remove("loader");
                    var modi = document.getElementById('modimg');
                    if (modi == null) {
                        var modimg = document.createElement('img');
                        modimg.src = "images/checked.png";
                        modimg.id = "modimg";
                        modimg.style.height = "60px";
                        modimg.style.width = "60px";
                        modpic.appendChild(modimg);
                    }
                    else {
                        modi.src = "images/checked.png";
                    }
                    modtex.innerHTML = "Login Succesful";
                    var logo = document.getElementById('logbut');
                    logo.innerHTML = "Logout";
                    document.cookie = "profdata=" + JSON.stringify(res) + "; expires= Sat, 5 Oct 2019 22:00:00 UTC; path=/ ";
                    var menu = document.getElementById('menu');
                    var profl = document.createElement('li');
                    profl.id = "profl";
                    profl.className = "nav-item";
                    var links = document.createElement('a');
                    var fname = res.Name.split(" ")[0];
                    links.innerHTML = "Hi, " + fname + "<br>" + "Dhanak ID: " + res.DId;
                    links.className = "nav-link";
                    links.href = "#";
                    profl.appendChild(links);
                    menu.insertBefore(profl, menu.childNodes[2]);
                }
                else if (res.hasOwnProperty("message")) {
                    var modpic = document.getElementById('picmod');
                    var modtex = document.getElementById('modtext');
                    modpic.classList.remove("loader");
                    var modi = document.getElementById('modimg');
                    if (modi == null) {
                        var modimg = document.createElement('img');
                        modimg.src = "images/cancel.png";
                        modimg.id = "modimg";
                        modimg.style.height = "60px";
                        modimg.style.width = "60px";
                        modpic.appendChild(modimg);
                    }
                    else {
                        modi.src = "images/cancel.png";
                    }
                    modtex.innerHTML = res.message;
                }
                else {
                    var modpic = document.getElementById('picmod');
                    var modtex = document.getElementById('modtext');
                    modpic.classList.remove("loader");
                    var modi = document.getElementById('modimg');
                    if (modi == null) {
                        var modimg = document.createElement('img');
                        modimg.src = "images/cancel.png";
                        modimg.id = "modimg";
                        modimg.style.height = "60px";
                        modimg.style.width = "60px";
                        modpic.appendChild(modimg);
                    }
                    else {
                        modi.src = "images/cancel.png";
                    }
                    modtex.innerHTML = "Connection Error";
                }
            }
            
        };
        xhr.open("POST", "http://dhanak19-001-site4.htempurl.com/api/user/login", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        console.log("DId=" + emlObj.value + "&Password=" + pwdlObj.value.slice(0,50));
        xhr.send("DId=" + emlObj.value + "&Password=" + pwdlObj.value.slice(0,50));
        
    }
}

$(document).ready(function () {

    $("#register").click(function () {
        console.log("beofre openloader");

        open_loader();
        console.log("after openLoader");
        console.log("inside register function");
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'text';
        xhr.onreadystatechange = function () {
            if (this.readyState > 3 && (this.status == 200 || this.status == 500)) {
                var obj = this.responseText;
                console.log(obj);
                console.log("going to verify function");
                //verify();
                var data = JSON.parse(obj);
                console.log(data);
                if (data.message == "Registered")
                    {close_loader();verify();}
                else if (data.message == "fail") {
                    alert("email-id already registered. Please check your mail id for verification code");
                    close_loader();verify();
                }
                else { alert("incorrect emai-id provided"); close_loader();}
                ;
            };
        };
        var nameObj = document.getElementById('name');
        var noObj = document.getElementById('no');
        var emObj = document.getElementById('em');
        var colObj = document.getElementById('col');
        var pwdObj = document.getElementById('pwd');
        var cpwdObj = document.getElementById('cpwd');
        if (pwdObj.value != cpwdObj.value) {
            alert("Passwords do not match");
        }
        
        else if (colObj.value.length > 50)
            alert("Shorten College Name");
        else {
           
            //xhr.onprogress=alert("registering");
            //xhr.onerror=alert("incorrect email-id");
            //xhr.onload=close_loader();
            xhr.open("POST", "http://dhanak19-001-site4.htempurl.com/api/user/reg", true);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            console.log("Name=" + nameObj.value + "&Phone=" + noObj.value + "&Email=" + emObj.value + "&College=" + colObj.value + "&Password=" + pwdObj.value.slice(0, 50));
            xhr.send("Name=" + nameObj.value + "&Phone=" + noObj.value + "&Email=" + emObj.value + "&College=" + colObj.value + "&Password=" + pwdObj.value.slice(0, 50));
        };

    });



    $("#login").click(function () {
        var emlObj = document.getElementById('eml');
        var pwdlObj = document.getElementById('pwdl');
        //var cdata = getCookie("profdata");
       

        var xhr = new XMLHttpRequest();
        xhr.responseType = 'text';
        xhr.onreadystatechange = function () {
            if (this.readyState > 3 && (this.status == 200 || this.status == 500)) {
                var obj = this.responseText;
                console.log(obj);
                var data = JSON.parse(obj);

                if (data.message == "Invalid Email ID") {
                    alert("incorrect email ID or Password");
                }
                else if (data.message == "Invalid Password") {
                    alert("Incorrect Password");
                }
                else {
                    document.cookie = "profdata=" + obj + "; expires= Sat, 5 Oct 2020 22:00:00 UTC; path=/ ";

                    console.log(data);
                    createDash(data);
                }
            };
        };
        xhr.open("POST", "http://dhanak19-001-site4.htempurl.com/api/user/login", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        console.log("DId=" + emlObj.value + "&Password=" + pwdlObj.value.slice(0, 50));
        xhr.send("DId=" + emlObj.value + "&Password=" + pwdlObj.value.slice(0, 50));

    });


    $("#check_cookie").click(function () {
        var cookie = getCookie("profdata");
        if (cookie) {
            console.log("cookie exists");
            console.log(cookie);
        }
        else {
            console.log("cookie does not exist");
        };

    });

   


});


function verify() {
    // console.log("inside verify function");
    //var vcode = prompt("verification code sent to your mail ID || Enter verification code");
    var vcode = document.getElementById('verification').value;
    $(".center-popup-wrapper").css("left", "0px");
    var url = "http://dhanak19-001-site4.htempurl.com/api/user/veri/" + vcode;
    console.log(url),
        $.ajax({

            url: url,
            type: "GET",
            success: function (result) {
                console.log(result.message);
                if (result.message == "Invalid Verification Code") {
                    alert("wrong verification code");
                    //verify();
                }
                else {
                    alert("successfully verified");
                    //window.location.href = "http://conscientia.co.in";
                    loginLoad();
                };
            }
        });

}



function loginLoad() {
    $(".login-wrapper").css("display", "block");
    $(".reg-wrapper").css("display", "none");
    $(".center-popup-wrapper").css("left", "-100%");
};
function regLoad() {
    $(".login-wrapper").css("display", "none");
    $(".reg-wrapper").css("display", "block");
};


function logout() {
    document.cookie = "profdata=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

function createDash(data) {
    $("#dash-cell").attr("href", "dashboard.html");
    var name = data.Name.split(" ");
    console.log(name[0]);
    window.alert("Welcome to Portal Con20 !")
    window.location = "dashboard.html";
    $("#dash-cell span").html(name[0]);
}
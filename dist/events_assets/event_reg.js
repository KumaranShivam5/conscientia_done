$(document).ready(function(){
    var x=getCookie("profdata");
    //console.log(data);
    console.log("dash function run");
    if(x!=""){
        var data=JSON.parse(x);
        var name = data.Name.split(" ");
        $("#login span").html("<a href='dashboard.html'>"+name[0]+"</a>");
        console.log("function run inside if");
    }
    else {
        $("#login span").html("<a href='login_v3.html'>Login</a>");
        console.log("inside else");
    }
   
});
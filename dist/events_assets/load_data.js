$("#button-click").click(function(){
    $.ajax({url: "https://script.google.com/macros/s/AKfycbyL-2XWvbai_c_sXhtKiMyCFARLNKWw4KBFE1eiwg0w-lbaDbk/exec", success: function(result){
      $("#workshop-title").html(result);
    }});
  });

//document.getElementById("workshop-title").innerHTML = myObj.name;

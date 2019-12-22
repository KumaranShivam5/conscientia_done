 var time_left;
 
 // Set the date we're counting down to
 var countDownDate = new Date("feb 29, 2020 00:00:01").getTime();
  
 // Update the count down every 1 second
 var x = setInterval(function() {
 
   // Get today's date and time
   var now = new Date().getTime();
 
   // Find the distance between now and the count down date
   var distance = countDownDate - now;
 
   // Time calculations for days, hours, minutes and seconds
   var days = Math.floor(distance / (1000 * 60 * 60 * 24));
   var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
   var seconds = Math.floor((distance % (1000 * 60)) / 1000);
 
   // Display the result in the element with id="demo"

   //document.getElementById("timer").innerHTML = days + "d " + hours + "h "
   //+ minutes + "m " + seconds + "s ";
 
   time_left= days + "D:" + hours + "h: " + minutes + "m " ;
   // If the count down is finished, write some text
   if (distance < 0) {
     clearInterval(x);
     time_left= "FUTURE WOrld LOADED";
   }
 }, 1000);








$(document).ready(function () {

  function second_passed() {
    $('.clock').removeClass('is-off');
  }
  setTimeout(second_passed, 2000)

  $('.switcher').on('click', function(e) {
    e.preventDefault();
    $('.screen').toggleClass('glitch');
  });


  var newDate = new Date();
  newDate.setDate(newDate.getDate());

  setInterval( function() {

    var hours    = new Date().getHours();
    var seconds  = new Date().getSeconds();
    var minutes  = new Date().getMinutes();

    var realTime = ( hours < 10 ? '0' : '' ) + hours + ' : ' + ( minutes < 10 ? '0' : '' ) + minutes + ' : ' + ( seconds < 10 ? '0' : '' ) + seconds

    $('.time').html(time_left);
    $('.time').attr('data-time', time_left);

  }, 1000);

});



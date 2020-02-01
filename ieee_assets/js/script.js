var nav = document.getElementById('nav');
var navlinks = nav.getElementsByTagName('a');


if (screen.width <= 700) {

  document.getElementById('nav-icon').addEventListener('click', function (e) {
    e.preventDefault();
    toggleNav();
  });

  for (var i = 0; i < navlinks.length; i++) {
    navlinks[i].addEventListener('click', function () {
      toggleNav();
    });
  }

}
else {
  nav.classList.add('active');
}




function toggleNav() {
  (nav.classList.contains('active')) ? nav.classList.remove('active') : nav.classList.add('active');
}

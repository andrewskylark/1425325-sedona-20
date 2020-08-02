var nav = document.querySelector('.nav');
var navToggle = document.querySelector('.nav__toggle');

nav.classList.remove('nav--no-js');

navToggle.addEventListener('click', function() {
  if (nav.classList.contains('nav--closed')) {
    nav.classList.remove('nav--closed');
    nav.classList.add('nav--opened');
  } else {
    nav.classList.add('nav--closed');
    nav.classList.remove('nav--opened');
  }
});

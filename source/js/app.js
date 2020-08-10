// мобильное меню
var nav = document.querySelector('.nav');
var navToggle = document.querySelector('.nav__toggle');

nav.classList.remove('nav--no-js');

navToggle.addEventListener('click', function () {
  if (nav.classList.contains('nav--closed')) {
    nav.classList.remove('nav--closed');
    nav.classList.add('nav--opened');
  } else {
    nav.classList.add('nav--closed');
    nav.classList.remove('nav--opened');
  }
});

// карта
function initMap() {
  // локация
  var sedona = { lat: 34.833837, lng: -111.684529 };
  var infoContent = '<h3>City of Sedona</h3> <p>Welcome to the Gorgeous</p>';
  var markerIcon = 'img/icon-map-marker.svg';
  // создание карты, центр на локации
  var sedonaMap = new google.maps.Map(
    document.getElementById('map'), {
    zoom: 7, center: sedona
  });
  // маркер и его свойства
  var marker = new google.maps.Marker({
    position: sedona,
    map: sedonaMap,
    animation: google.maps.Animation.DROP,
    icon: markerIcon
  });
  // попап окошко и функция его открытия
  var infowindow = new google.maps.InfoWindow({
    content: infoContent
  });

  infowindow.open(sedonaMap, marker);
}

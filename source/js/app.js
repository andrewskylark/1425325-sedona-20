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

// модальные окна формы
var reviewForm = document.querySelector(".review__form");
var phone = document.querySelector(".form__input--phone");
var email = document.querySelector(".form__input--email");
var inputName = document.querySelector(".form__input--name");
var surName = document.querySelector(".form__input--surname");
var modalFail = document.querySelector(".modal--fail");
var modalSuccess = document.querySelector(".modal--success");
var closeSuccess = document.querySelector(".modal__button--success");
var closeFail = document.querySelector(".modal__button--fail");

//при незаполненных 4 полях - попап неудачи с фокусом на кнопку
//закрывается на esc, клик на кнопкку или вне окна
// иначе - попап удачи
if (reviewForm) {

  reviewForm.addEventListener("submit", function (evt) {

    if (!inputName.value || !email.value || !phone.value || !surName.value) {
      evt.preventDefault ();
      modalFail.classList.add("modal-show");
      closeFail.focus();

      closeFail.addEventListener ("click", function() {
      modalFail.classList.remove("modal-show");
      })

      window.addEventListener ("keydown", function(evt) {
        if (evt.keyCode === 27) {
          if (modalFail.classList.contains("modal-show")) {
              modalFail.classList.remove("modal-show");
          }
        }
      })
      // при клике во все без класса modal-show
      window.addEventListener ("click", function(evt) {
        if (evt.target.classList.contains("modal-show")) {
        } else {
          modalFail.classList.remove("modal-show");
        }
      })

    } else {
      modalSuccess.classList.add("modal-show");
      closeSuccess.focus();
    }
  })
};

if (typeof SimpleLightbox !== 'undefined') {
  var lightbox = new SimpleLightbox('.gallery__list a', { /* options */ });
};

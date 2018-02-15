'use strict';

(function () {
  var SYMBOL_OF_RUBLE = String.fromCharCode(8381);
  var userMap = document.querySelector('.map');
  var featureTemplate = document.querySelector('template').content.querySelector('.popup__features li');

  var renderFeature = function (feature) {
    var featureElement = featureTemplate.cloneNode();

    featureTemplate.textContent = feature;

    if (feature !== 'wifi') {
      featureElement.classList.remove('feature--wifi');
      featureElement.classList.add('feature--' + feature);
    }
    return featureElement;
  };

  var renderOfferFeatures = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.randomFeatures.length; i++) {
      fragment.appendChild(renderFeature(window.data.randomFeatures[i]));
    }
    return fragment;
  };

  var pictureItemTemplate = document.querySelector('template').content.querySelector('.popup__pictures li');

  var renderPicture = function (picture) {
    var pictureElement = pictureItemTemplate.cloneNode(true);
    pictureElement.querySelector('img').src = picture;
    return pictureElement;
  };

  var renderOfferPictures = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.OFFERS_PHOTOS.length; i++) {
      fragment.appendChild(renderPicture(window.data.OFFERS_PHOTOS[i]));
    }
    return fragment;
  };

  var offerTemplate = document.querySelector('template').content.querySelector('article.map__card');

  var renderOffer = function (userOffer) {
    var offerElement = offerTemplate.cloneNode(true);

    offerElement.querySelector('.popup__avatar').src = userOffer.author.avatar;
    offerElement.querySelector('.popup__features').innerHTML = '';
    offerElement.querySelector('.popup__pictures').innerHTML = '';
    offerElement.querySelector('h3').textContent = userOffer.offer.title;
    offerElement.querySelector('small').textContent = userOffer.offer.address;
    offerElement.querySelector('.popup__price').textContent = userOffer.offer.price + ' ' + SYMBOL_OF_RUBLE + '/ночь';
    offerElement.querySelector('h4').textContent = userOffer.offer.type;
    offerElement.querySelector('p:nth-of-type(3)').textContent = userOffer.offer.rooms + ' комнаты для ' + userOffer.offer.guests + ' гостей';
    offerElement.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + userOffer.offer.checkin + ', выезд до ' + userOffer.offer.checkout;
    offerElement.querySelector('.popup__features').appendChild(renderOfferFeatures(userOffer.offer.features));
    offerElement.querySelector('p:nth-of-type(5)').textContent = userOffer.offer.description;
    offerElement.querySelector('.popup__pictures').appendChild(renderOfferPictures(userOffer.offer.photos));

    return offerElement;
  };

  var filterContainerElement = document.querySelector('.map__filters-container');
  var offerElement = userMap.querySelector('.map__card');

  var onPopupClose = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var closePopup = function () {
    userMap.removeChild(offerElement);
    window.pin.removeActivePin();
    document.removeEventListener('keydown', onPopupClose);
  };

  var getPopup = function (userOffer) {
    offerElement = renderOffer(userOffer);
    var renderOfferElement = userMap.querySelector('.popup');
    if (renderOfferElement) {
      userMap.replaceChild(offerElement, renderOfferElement);
    } else {
      userMap.insertBefore(offerElement, filterContainerElement);
    }
    document.addEventListener('keydown', onPopupClose);
    var popupCloseButton = userMap.querySelector('.popup__close');
    popupCloseButton.addEventListener('click', function () {
      closePopup();
    });
    popupCloseButton.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, closePopup);
    });
  };
  window.card = {
    getPopup: getPopup,
    userMap: userMap
  };
})();


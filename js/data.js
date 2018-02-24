'use strict';

(function () {
  var SYMBOL_OF_RUBLE = String.fromCharCode(8381);
 
  var usersOffers = [];
  var successHandler = function (offers) {
    for (var i = 0; i < offers.length; i++) {
      var userOffer = {
        author: {
          avatar: offers[i].author.avatar
        },
        offer: {
          title: offers[i].offer.title,
          address: offers[i].location.x + ', ' + offers[i].location.y,
          price: offers[i].offer.price,
          type: offers[i].offer.type,
          rooms: offers[i].offer.rooms,
          guests: offers[i].offer.guests,
          checkin: offers[i].offer.checkin,
          checkout: offers[i].offer.checkout,
          features: offers[i].offer.features,
          description: offers[i].offer.description,
          photos: offers[i].offer.photos
        },
        location: {
          x: offers[i].location.x,
          y: offers[i].location.y
        }
      };
      usersOffers.push(userOffer);
    }
    return usersOffers;
  };
  window.backend.load(successHandler, window.backend.errorHandler);
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

  var renderOfferFeatures = function (offerFeatures) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offerFeatures.length; i++) {
      fragment.appendChild(renderFeature(offerFeatures[i]));
    }
    return fragment;
  };

  var pictureItemTemplate = document.querySelector('template').content.querySelector('.popup__pictures li');

  var renderPicture = function (picture) {
    var pictureElement = pictureItemTemplate.cloneNode(true);
    pictureElement.querySelector('img').src = picture;
    return pictureElement;
  };

  var renderOfferPictures = function (pictures) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderPicture(pictures[i]));
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
  window.data = {
    usersOffers: usersOffers,
    renderOffer: renderOffer
  };
})();

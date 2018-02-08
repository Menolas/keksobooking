'use strict';

var USERS_NUMBER = 8;
var OFFERS_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFERS_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var CHECKIN_CHECKOUT_TIME = ['12:30', '13:00', '14:00'];
var OFFERS_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;
var PIN_TAIL = 18;
var MIN_X = 300;
var MAX_X = 900;
var MIN_Y = 100;
var MAX_Y = 500;
var MIN_ROOMS_NUMBER = 1;
var MAX_ROOMS_NUMBER = 5;
var MIN_GUEST_NUMBER = 1;
var MAX_GUEST_NUMBER = 100;
var SYMBOL_OF_RUBLE = String.fromCharCode(8381);

var getTypeOfOffer = function (title) {
  var type;
  switch (title) {
    case 'Большая уютная квартира':
      type = 'flat';
      break;
    case 'Маленькая неуютная квартира':
      type = 'flat';
      break;
    case 'Уютное бунгало далеко от моря':
      type = 'bungalo';
      break;
    case 'Неуютное бунгало по колено в воде':
      type = 'bungalo';
      break;
    default:
      type = 'house';
      break;
  }
  return type;
};

var getRandomItem = function (array) {
  return array[Math.floor(Math.random()) * array.length];
};

var getRandomInt = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomFeatures = function () {
  var randomFeatures = [];
  for (var i = 0; i < getRandomInt(0, OFFERS_FEATURES.length); i++) {
    var randomFeature = OFFERS_FEATURES[i];
    randomFeatures.push(randomFeature);
  }
  return randomFeatures;
};

var randomFeatures = getRandomFeatures();

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
  for (var i = 0; i < randomFeatures.length; i++) {
    fragment.appendChild(renderFeature(randomFeatures[i]));
  }
  return fragment;
};

var userMap = document.querySelector('.map');
userMap.classList.remove('map--faded');

var generateUsersOffers = function () {
  var usersOffers = [];
  for (var i = 0; i < USERS_NUMBER; i++) {
    var xCoordinate = getRandomInt(MIN_X, MAX_X);
    var yCoordinate = getRandomInt(MIN_Y, MAX_Y);
    var userOffer = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },

      offer: {
        title: OFFERS_TITLES[i],
        address: xCoordinate + ', ' + yCoordinate,
        price: getRandomInt(MIN_PRICE, MAX_PRICE),
        type: getTypeOfOffer(OFFERS_TITLES[i]),
        rooms: getRandomInt(MIN_ROOMS_NUMBER, MAX_ROOMS_NUMBER),
        guests: getRandomInt(MIN_GUEST_NUMBER, MAX_GUEST_NUMBER),
        checkin: getRandomItem(CHECKIN_CHECKOUT_TIME),
        checkout: getRandomItem(CHECKIN_CHECKOUT_TIME),
        features: getRandomFeatures(),
        description: '',
        photos: OFFERS_PHOTOS
      },

      location: {
        x: xCoordinate,
        y: yCoordinate
      }
    };
    usersOffers.push(userOffer);
  }
  return usersOffers;
};

var usersOffers = generateUsersOffers();

var offerTemplate = document.querySelector('template').content.querySelector('article.map__card');

var renderOffer = function (userOffer) {
  var offerElement = offerTemplate.cloneNode(true);

  offerElement.querySelector('.popup__features').innerHTML = '';
  offerElement.querySelector('h3').textContent = userOffer.offer.title;
  offerElement.querySelector('small').textContent = userOffer.offer.address;
  offerElement.querySelector('.popup__price').textContent = userOffer.offer.price + ' ' + SYMBOL_OF_RUBLE + '/ночь';
  offerElement.querySelector('h4').textContent = getTypeOfOffer(userOffer.offer.title);
  offerElement.querySelector('p:nth-of-type(3)').textContent = userOffer.offer.rooms + ' комнаты для ' + userOffer.offer.guests + ' гостей';
  offerElement.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + userOffer.offer.checkin + ', выезд до ' + userOffer.offer.checkout;
  offerElement.querySelector('.popup__features').appendChild(renderOfferFeatures(userOffer.offer.features));
  offerElement.querySelector('p:nth-of-type(5)').textContent = userOffer.offer.description;
  offerElement.querySelector('.popup__avatar').src = userOffer.author.avatar;

  return offerElement;
};

var filterContainerElement = userMap.querySelector('.map__filters-container');
var offerElement = renderOffer(usersOffers[0]);
userMap.insertBefore(offerElement, filterContainerElement);

var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var similarPins = document.querySelector('.map__pins');

var renderPin = function (userOffer, position) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.style.left = (userOffer.location.x - PIN_WIDTH / 2) + 'px';
  pinElement.style.top = (userOffer.location.y - (PIN_HEIGHT + PIN_TAIL)) + 'px';
  pinElement.querySelector('img').src = userOffer.author.avatar;

  return pinElement;
};

var renderSimilarPins = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < USERS_NUMBER; i++) {
    fragment.appendChild(renderPin(usersOffers[i]));
  }
  similarPins.appendChild(fragment);
};

renderSimilarPins();

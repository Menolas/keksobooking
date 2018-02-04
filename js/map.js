'use strict';

var OFFERS_COUNT = 8;
var OFFERS_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFERS_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var CHECKIN_CHECKOUT_TIME = ['12:30', '13:00', '14:00'];
var OFFERS_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var getRandomInt = function (array) {
  return Math.floor(Math.random() * (array.length - 0)) + 0;
};

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomFeatures = function () {
  var randomFeatures = [];
  for (var i = 0; i < getRandomValue(OFFERS_FEATURES); i++) {
    var randomFeature = OFFERS_FEATURES[i];
    randomFeatures.push(randomFeature);
  }
  return randomFeatures;
};

var getTypeOfOffer = function () {
  var typeOfOffer;
  if (offersList.title === 'Большая уютная квартира' || 'Маленькая неуютная квартира') {
    typeOfOffer = 'flat';
  } else {
    if (offersList.type === 'Уютное бунгало далеко от моря' || 'Неуютное бунгало по колено в воде') {
      typeOfOffer = 'bungalo';
    } else {
      typeOfOffer = 'house';
    }
  }
  return typeOfOffer;
};

var generateOffers = function () {
  var offersList = [];
  for (var i = 0; i < OFFERS_COUNT; i++) {
    var offerExample = {
      author: {
        avatar: 'img/avatars/user0' + i++ + '.png'
      },

      offer: {
        title: OFFERS_TITLES[i],
        address: location.x + ', ' + location.y,
        // price: getRandomValue(1000, 1 000 000),
        type: getTypeOfOffer(),
        rooms: getRandomValue(1, 5),
        guests: getRandomValue(1, 100),
        checkin: getRandomInt(CHECKIN_CHECKOUT_TIME),
        checkout: getRandomInt(CHECKIN_CHECKOUT_TIME),
        features: getRandomFeatures(),
        description: '',
        photos: OFFERS_PHOTOS
      },

      location: {
        x: getRandomValue(300, 900),
        y: getRandomValue(150, 500)
      }
    };
    offersList.push(offerExample);
  }
  return offersList;
};

var offersList = generateOffers();

var userMap = document.querySelector('.map');
userMap.classList.remove('.map--faded');

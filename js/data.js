'use strict';

(function () {
  var USERS_NUMBER = 8;
  var OFFERS_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var OFFERS_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var CHECKIN_CHECKOUT_TIME = ['12:30', '13:00', '14:00'];
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MIN_X = 300;
  var MAX_X = 900;
  var MIN_Y = 100;
  var MAX_Y = 500;
  var MIN_ROOMS_NUMBER = 1;
  var MAX_ROOMS_NUMBER = 5;
  var MIN_GUEST_NUMBER = 1;
  var MAX_GUEST_NUMBER = 100;

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
        type = 'bungalow';
        break;
      case 'Неуютное бунгало по колено в воде':
        type = 'bungalow';
        break;
      default:
        type = 'house';
        break;
    }
    return type;
  };

  var getRandomFeatures = function () {
    var randomFeatures = [];
    for (var i = 0; i < window.util.getRandomInt(0, OFFERS_FEATURES.length); i++) {
      var randomFeature = OFFERS_FEATURES[i];
      randomFeatures.push(randomFeature);
    }
    return randomFeatures;
  };

  var randomFeatures = getRandomFeatures();

  var generateUsersOffers = function () {
    var usersOffers = [];
    for (var i = 0; i < USERS_NUMBER; i++) {
      var xCoordinate = window.util.getRandomInt(MIN_X, MAX_X);
      var yCoordinate = window.util.getRandomInt(MIN_Y, MAX_Y);
      var userOffer = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },

        offer: {
          title: OFFERS_TITLES[i],
          address: xCoordinate + ', ' + yCoordinate,
          price: window.util.getRandomInt(MIN_PRICE, MAX_PRICE),
          type: getTypeOfOffer(OFFERS_TITLES[i]),
          rooms: window.util.getRandomInt(MIN_ROOMS_NUMBER, MAX_ROOMS_NUMBER),
          guests: window.util.getRandomInt(MIN_GUEST_NUMBER, MAX_GUEST_NUMBER),
          checkin: window.util.getRandomItem(CHECKIN_CHECKOUT_TIME),
          checkout: window.util.getRandomItem(CHECKIN_CHECKOUT_TIME),
          features: randomFeatures,
          description: '',
          photos: window.card.OFFERS_PHOTOS
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
  window.data = {
    USERS_NUMBER: USERS_NUMBER,
    usersOffers: usersOffers,
    randomFeatures: getRandomFeatures,
    getTypeOfOffer: getTypeOfOffer
  };
})();

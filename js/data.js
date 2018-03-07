'use strict';

(function () {
  var MAP_PIN_TAIL_HEIGHT = 22;
  var MAP_PIN_ELEMENT_IMG = 58;
  var MAIN_PIN_HEIGHT = MAP_PIN_ELEMENT_IMG + MAP_PIN_TAIL_HEIGHT;
  var MAIN_PIN_WIDTH = 65;
  var MAP_PIN_ELEMENT_HEIGHT = 65;
  var MAP_PIN_TRANSLATE_X = MAIN_PIN_WIDTH / 2;
  var MAP_PIN_TRANSLATE_Y = MAP_PIN_ELEMENT_HEIGHT / 2;
  var MAP_PIN_TAIL_TRANSLATE = 6;
  var OFFER_HANDLE_CORRECT_X = Math.round(MAIN_PIN_WIDTH / 2 - MAP_PIN_TRANSLATE_X);
  var OFFER_HANDLE_CORRECT_Y = Math.round(MAIN_PIN_HEIGHT - MAP_PIN_TRANSLATE_Y - MAP_PIN_TAIL_TRANSLATE);

  var usersOffers = [];

  var getUsersOffers = function (offers) {
    for (var i = 0; i < offers.length; i++) {
      var userOffer = {
        author: {
          avatar: offers[i].author.avatar
        },
        location: {
          x: offers[i].location.x,
          y: offers[i].location.y
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
        }
      };
      usersOffers.push(userOffer);
    }
    return usersOffers;
  };

  window.data = {
    OFFER_HANDLE_CORRECT_X: OFFER_HANDLE_CORRECT_X,
    OFFER_HANDLE_CORRECT_Y: OFFER_HANDLE_CORRECT_Y,
    getUsersOffers: getUsersOffers,
    usersOffers: usersOffers
  };

})();

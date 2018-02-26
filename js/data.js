'use strict';

(function () {
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
  window.data = {
    usersOffers: usersOffers
  };
})();

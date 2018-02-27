'use strict';

(function () {
  var MAX_SIMILAR_OFFERS = 5;

  var usersOffers = [];
  var getUsersOffers = function (data) {
    var takeNumber = data.length > MAX_SIMILAR_OFFERS ? MAX_SIMILAR_OFFERS : data.length;
    for (var i = 0; i < takeNumber; i++) {
      var userOffer = {
        author: {
          avatar: data[i].author.avatar
        },
        offer: {
          title: data[i].offer.title,
          address: data[i].location.x + ', ' + data[i].location.y,
          price: data[i].offer.price,
          type: data[i].offer.type,
          rooms: data[i].offer.rooms,
          guests: data[i].offer.guests,
          checkin: data[i].offer.checkin,
          checkout: data[i].offer.checkout,
          features: data[i].offer.features,
          description: data[i].offer.description,
          photos: data[i].offer.photos
        },
        location: {
          x: data[i].location.x,
          y: data[i].location.y
        }
      };
      usersOffers.push(userOffer);
    }
    return usersOffers;
  };
  window.data = {
    usersOffers: usersOffers,
    getUsersOffers: getUsersOffers
  };
})();

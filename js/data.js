'use strict';

(function () {

  var usersOffers = [];
  var userOffersChanges = false;

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

  var successHandler = function (data) {
    getUsersOffers(data);
    userOffersChanges = true;
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'position: absolute; z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);

  window.data = {
    usersOffers: usersOffers,
    userOffersChanges: userOffersChanges
  };

})();

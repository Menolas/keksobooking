'use strict';

(function () {
  var usersOffers = [];

  var getUsersOffers = function (offers) {
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
  
  /*
  var updateUsersOffers = function () {
    var sameTypeHousings = usersOffers.filter(function (it) {
      return it.offer.type === housingType;
    });
    var samePriceHousings = usersOffers.filter(function (it) {
      return it.offer.price === housingPrice;
    })

    window.pin.renderSimilarPins(sameTypeHousings.concat(samePriceHousings));
  };
  */

  var filterContainerElement = document.querySelector('.map__filters-container');
  var updatedFilters = [];
  var filterObjKeys = [];
  var filterObjDescs = [];

  filterContainerElement.addEventListener('change', function (event) {
    var target = event.target;
    while (target !== event.currentTarget) {
      if (target.tagName.toLowerCase() === 'select' || target.tagName.toLowerCase() === 'input') {
        var filterObjKey = target.getAttribute('name');
        filterObjKeys.push(filterObjKey);
        var filterObjDesc = target.value;
        filterObjDescs.push(filterObjDesc);
      }
      target = target.parentNode;
    }
  });
  console.log(filterObjKeys, filterObjDescs);
  

  /*
  if (target.tagName.toLowerCase() === 'input') {
        filterObj = target.getAttribute('name');
        console.log(target.getAttribute('name'));
      }
      if (target.tagName.toLowerCase() === 'input') {
        filterObj = target.getAttribute('name');
        updatedFilters.push(filterObj);
      } else {
        updatedFilters = usersOffers;
      }
      */
  /*
  // настройка фильтров:

  var housingType;
  var housingTypeFilterElement = filterContainerElement.querySelector('select[name="housing-type"]');

  housingTypeFilterElement.addEventListener('change', function (event) {
    var newHousingType = event.currentTarget.value;
    housingType = newHousingType;

  });

  var housingPrice;
  var housingPriceFilterElement = filterContainerElement.querySelector('select[name="housing-price"]');

  housingPriceFilterElement.addEventListener('change', function (event) {
    var newHousingPrice = event.currentTarget.value;
    housingPrice = newHousingPrice;

  });

  var housingRooms;
  var housingRoomsFilterElement = filterContainerElement.querySelector('select[name="housing-rooms"]');

  housingRoomsFilterElement.addEventListener('change', function (event) {
    var newHousingRooms = event.currentTarget.value;
    housingRooms = newHousingRooms;

  });

  var housingGuests;
  var housingGuestsFilterElement = filterContainerElement.querySelector('select[name="housing-guests"]');

  housingGuestsFilterElement.addEventListener('change', function (event) {
    var newHousingGuests = event.currentTarget.value;
    housingGuests = newHousingGuests;

  });

  // настройка фильтра features:

  var housingFeatures = [];
  var housingFeaturesFilterElementContainer = filterContainerElement.querySelector('.features');

  housingFeaturesFilterElementContainer.addEventListener('change', function (event) {
    var target = event.target;
    while (target !== event.currentTarget) {
      if (target.tagName.toLowerCase() === 'input') {
        var housingFeature = event.currentTarget.value;
        housingFeatures.push(housingFeature);
      }
      target = target.parentNode;
    }
    updateUsersOffers();
    console.log(housingFeatures);
  });
  */

  var successHandler = function (data) {
    getUsersOffers(data);
  };

  window.backend.load(successHandler, window.backend.errorHandler);

  window.filters = {
    successHandler: successHandler,
    usersOffers: usersOffers,
    filterContainerElement: filterContainerElement
  };
})();

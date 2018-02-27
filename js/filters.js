'use strict';

(function () {
  /*
  var usersOffers = [];

  var updateUsersOffers = function () {
    window.data.getUsersOffers(usersOffers);
  };
  */

  var filterContainerElement = document.querySelector('.map__filters-container');

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
    console.log(housingFeatures);
  });

  var successHandler = function (offers) {
    window.data.getUsersOffers(offers);
  };

  window.backend.load(successHandler, window.backend.errorHandler);
  window.filters = {
    filterContainerElement: filterContainerElement
  };
})();

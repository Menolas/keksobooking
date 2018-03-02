'use strict';

(function () {
  var MIN_HOUSING_PRICE_LIMIT = 10000;
  var MIDDLE_HOUSING_PRICE_LIMIT = 50000;
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

  var successHandler = function (data) {
    getUsersOffers(data);
  };

  window.backend.load(successHandler, window.backend.errorHandler);
  var filteredOffers = [];

  var updateOffers = function (filterObj, isPriceField) {
    var filterKey = Object.keys(filterObj)[0];
    var filterValue = filterObj[Object.keys(filterObj)[0]];
    filterValue = (+filterValue) ? +filterValue : filterValue;

    if (filterValue === 'any') {
      filteredOffers = usersOffers;
      return;
    }

    if (isPriceField) {
      filteredOffers = usersOffers.filter(function (usersOffer) {
        if (filterValue === 'lower than 10000') {
          return usersOffer.offer.price <= MIN_HOUSING_PRICE_LIMIT;
        } else if (filterValue === 'from 10000 to 50000') {
          return usersOffer.offer.price >= MIN_HOUSING_PRICE_LIMIT && usersOffer.offer.price <= MIDDLE_HOUSING_PRICE_LIMIT;
        } else if (filterValue === 'from 50000') {
          return usersOffer.offer.price >= MIDDLE_HOUSING_PRICE_LIMIT;
        } else {
          return usersOffer.offer.price;
        }
      });
    } else {
      filteredOffers = usersOffers.filter(function (usersOffer) {
        if (Array.isArray(usersOffer.offer[filterKey])) {
          return usersOffer.offer[filterKey].indexOf(filterValue) !== -1;
        }

        return usersOffer.offer[filterKey] === filterValue;
      });
    }
  };

  var findDuplicateFilter = function (filters, filterToFind) {
    var index = -1;

    for (var i = 0; i < filters.length; i++) {
      if (filters[i][filterToFind]) {
        index = i;
        break;
      }
    }
    return index;
  };

  var filterForm = document.querySelector('.map__filters');
  var userFilters = [];

  var collectFilters = function (e) {
    var housingFeature = {};
    housingFeature[e.target.name] = e.target.value;

    if (e.target.tagName.toLowerCase() === 'select') {
      var duplicateIndex = findDuplicateFilter(userFilters, e.target.name);

      if (duplicateIndex !== -1) {
        userFilters.splice(duplicateIndex, 1, housingFeature);
        return;
      }
    } else if (e.target.type === 'checkbox' && !e.target.checked) {
      userFilters.splice(userFilters.indexOf(e.target.name), 1);
      return;
    }

    userFilters.push(housingFeature);
  };

  filterForm.addEventListener('change', function (event) {
    window.card.closePopup();
    var isPriceFieldChanged = false;

    if (event.target.name.toLowerCase() === 'price') {
      isPriceFieldChanged = true;
    }

    collectFilters(event);

    userFilters.forEach(function (userFilter) {
      window.debounce(updateOffers(userFilter, isPriceFieldChanged));
    });

    window.pin.removeOldPins();
    window.pin.renderSimilarPins(filteredOffers);
  });

  window.filters = {
    successHandler: successHandler,
    usersOffers: usersOffers
  };

})();

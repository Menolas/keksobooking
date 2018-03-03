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

  var updateOffers = function (arrToFilter, filterObj) {
    var filterKey = Object.keys(filterObj)[0];
    var filterValue = filterObj[Object.keys(filterObj)[0]];
    filterValue = (+filterValue) ? +filterValue : filterValue;

    if (filterValue === 'any') {
      filteredOffers = arrToFilter;
      return;
    }

    filteredOffers = arrToFilter.filter(function (item) {
      if (filterValue === 'lower than 10000') {
        return item.offer.price <= MIN_HOUSING_PRICE_LIMIT;
      } else if (filterValue === 'from 10000 to 50000') {
        return item.offer.price >= MIN_HOUSING_PRICE_LIMIT && item.offer.price <= MIDDLE_HOUSING_PRICE_LIMIT;
      } else if (filterValue === 'from 50000') {
        return item.offer.price >= MIDDLE_HOUSING_PRICE_LIMIT;
      } else if (Array.isArray(item.offer[filterKey])) {
        return item.offer[filterKey].indexOf(filterValue) !== -1;
      }

      return item.offer[filterKey] === filterValue;
    });
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

    collectFilters(event);

    for (var i = 0; i < userFilters.length; i++) {
      var hotels = (i === 0) ? usersOffers : filteredOffers;

      updateOffers(hotels, userFilters[i]);
    }

    console.log(filteredOffers);
    window.debounce(window.pin.removeOldPins());
    window.pin.similarPins.removeEventListener('click', window.map.renderPinCard);
    window.debounce(window.pin.renderSimilarPins(filteredOffers));
    window.map.renderPinCard(filteredOffers);
  });


  window.filters = {
    successHandler: successHandler,
    usersOffers: usersOffers
  };
})();

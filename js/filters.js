'use strict';

(function () {
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

  console.log(usersOffers);

  var updateOffers = function (filterObj, isPriceField) {
    var newOffers = [];
    var filterValue = filterObj[Object.keys(filterObj)[0]];

    if (isPriceField) {
      newOffers = usersOffers.filter(function (offer) {
        switch (filterValue) {
          case 'low':
            return offer.price < parseInt(filterValue, 10);
            break;

          case 'middle':
            return offer.price < 50000 && offer.price > 10000;
            break;

          default:
            return offer.price > 50000;
        }
      });
    } else {
      newOffers = usersOffers.filter(function (offer) {
        return offer[Object.keys(filterObj)[0]] === filterValue;
      });
    }
    return newOffers;
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

  var removeUncheckedFilter = function (filtersArr, filterName) {
    filtersArr.splice(filtersArr.indexOf(filterName), 1);
  };

  var filterForm = document.querySelector('.map__filters');
  var housingPriceFilterElement = filterForm.querySelector('select[name="housing-price"]');
  var updatedFilters = [];

  filterForm.addEventListener('change', function (event) {
    var target = event.target;
    var housingFeature = {};
    housingFeature[target.name] = target.value;

    if (target.tagName.toLowerCase() === 'select') {
      var duplicateIndex = findDuplicateFilter(updatedFilters, target.name);

      if (duplicateIndex !== -1) {
        updatedFilters.splice(duplicateIndex, 1, housingFeature);
        return;
      }
    } else if (target.type === 'checkbox' && !target.checked) {
      removeUncheckedFilter(updatedFilters, housingFeature);
      return;
    }

    updatedFilters.push(housingFeature);
    updateOffers(updatedFilters, housingPriceFilterElement);
    window.pin.removeOldPins();
    window.pin.renderSimilarPins(newOffers);
  });

  window.filters = {
    successHandler: successHandler,
    usersOffers: usersOffers
  };
})();

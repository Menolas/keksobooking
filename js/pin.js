'use strict';

(function () {
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;
  var PIN_TAIL = 18;

  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  var renderPin = function (userOffer, position) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = (userOffer.location.x - PIN_WIDTH / 2) + 'px';
    pinElement.style.top = (userOffer.location.y - (PIN_HEIGHT + PIN_TAIL)) + 'px';
    pinElement.querySelector('img').src = userOffer.author.avatar;
    pinElement.setAttribute('data-position', position);

    return pinElement;
  };

  var removeActivePin = function () {
    pinElementActive.classList.remove('map__pin--active');
  };

  var pinElementActive;
  window.pin = {
    removeActivePin: removeActivePin,
    getHighlight: function (node) {
      if (pinElementActive) {
        removeActivePin();
      }
      pinElementActive = node;
      pinElementActive.classList.add('map__pin--active');
    },
    renderSimilarPins: function () {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < window.data.usersOffers.lendth; i++) {
        fragment.appendChild(renderPin(window.data.usersOffers[i], i));
      }
      window.map.similarPins.appendChild(fragment);
    }
  };
})();

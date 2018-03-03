'use strict';

(function () {
  var MAX_SIMILAR_OFFERS = 5;
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;
  var PIN_TAIL = 18;
  var similarPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  var renderPin = function (userOffer, position) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = (userOffer.location.x - PIN_WIDTH / 2) + 'px';
    pinElement.style.top = (userOffer.location.y - (PIN_HEIGHT + PIN_TAIL)) + 'px';
    pinElement.querySelector('img').src = userOffer.author.avatar;
    pinElement.setAttribute('data-position', position);

    return pinElement;
  };

  var removeOldPins = function () {
    var pinsBtns = similarPins.querySelectorAll('[data-position]');
    if (similarPins && pinsBtns) {
      for (var i = 0; i < pinsBtns.length; i++) {
        pinsBtns[i].remove();
      }
    }
  };

  var pinElementActive;

  window.pin = {
    removeOldPins: removeOldPins,
    removeActivePin: function () {
      if (pinElementActive) {
        pinElementActive.classList.remove('map__pin--active');
      }
    },
    getHighlight: function (node) {
      if (pinElementActive) {
        pinElementActive.classList.remove('map__pin--active');
      }
      pinElementActive = node;
      pinElementActive.classList.add('map__pin--active');
    },
    renderSimilarPins: function (data) {
      var fragment = document.createDocumentFragment();
      var offersLimit = (data.length > MAX_SIMILAR_OFFERS) ? MAX_SIMILAR_OFFERS : data.length;
      for (var i = 0; i < offersLimit; i++) {
        fragment.appendChild(renderPin(data[i], i));
      }
      similarPins.appendChild(fragment);
    },
    similarPins: similarPins
  };

})();

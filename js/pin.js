'use strict';

(function () {
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
    var pinsBtns = similarPins.querySelectorAll('button[data-position]');
    console.log(pinsBtns);
    if (pinsBtns) {
      for (var i = 0; i < pinsBtns.length; i++) {
        similarPins.remove(pinsBtns[i]);
      }
    }
  };

  var pinElementActive;
  window.pin = {
    removeActivePin: function () {
      pinElementActive.classList.remove('map__pin--active');
    },
    getHighlight: function (node) {
      if (pinElementActive) {
        pinElementActive.classList.remove('map__pin--active');
      }
      pinElementActive = node;
      pinElementActive.classList.add('map__pin--active');
    },
    renderSimilarPins: function () {
      removeOldPins();
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < window.data.usersOffers.length; i++) {
        fragment.appendChild(renderPin(window.data.usersOffers[i], i));
      }
      similarPins.appendChild(fragment);
    },
    similarPins: similarPins
  };
})();

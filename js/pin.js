'use strict';

(function () {
  var MAP_PIN_TAIL_HEIGHT = 22;
  var MAP_PIN_ELEMENT_IMG = 58;
  var MAIN_PIN_HEIGHT = MAP_PIN_ELEMENT_IMG + MAP_PIN_TAIL_HEIGHT;
  var MAIN_PIN_WIDTH = 65;
  var MAP_PIN_ELEMENT_HEIGHT = 65;
  var MAP_PIN_TRANSLATE_X = MAIN_PIN_WIDTH / 2;
  var MAP_PIN_TRANSLATE_Y = MAP_PIN_ELEMENT_HEIGHT / 2;
  var MAP_PIN_TAIL_TRANSLATE = 6;
  var OFFER_HANDLE_CORRECT_X = Math.round(MAIN_PIN_WIDTH / 2 - MAP_PIN_TRANSLATE_X);
  var OFFER_HANDLE_CORRECT_Y = Math.round(MAIN_PIN_HEIGHT - MAP_PIN_TRANSLATE_Y - MAP_PIN_TAIL_TRANSLATE);
  var MAP_PIN_SMALL_WIDTH = 50;
  var MAP_PIN_SMALL_HEIGHT = 70;
  var MAP_PIN_SMALL_TRANSLATE_X = MAP_PIN_SMALL_WIDTH / 2;
  var MAP_PIN_SMALL_TRANSLATE_Y = MAP_PIN_SMALL_HEIGHT / 2;
  var MAP_PIN_SMALL_CORRECT_X = MAP_PIN_SMALL_WIDTH / 2 - MAP_PIN_SMALL_TRANSLATE_X;
  var MAP_PIN_SMALL_CORRECT_Y = MAP_PIN_SMALL_HEIGHT - MAP_PIN_SMALL_TRANSLATE_Y;
  var MAX_SIMILAR_OFFERS = 5;

  var similarPins = document.querySelector('.map__pins');
  var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');

  var renderPin = function (userOffer, position) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.style.left = userOffer.location.x - MAP_PIN_SMALL_CORRECT_X + 'px';
    pinElement.style.top = userOffer.location.y - MAP_PIN_SMALL_CORRECT_Y + 'px';
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
    similarPins: similarPins,
    OFFER_HANDLE_CORRECT_X: OFFER_HANDLE_CORRECT_X,
    OFFER_HANDLE_CORRECT_Y: OFFER_HANDLE_CORRECT_Y
  };

})();

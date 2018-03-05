'use strict';

(function () {
  var MAIN_PIN_WIDTH = 62;
  var MAIN_PIN_HEIGHT = 80;
  var MAX_Y = 500;
  var MIN_Y = 150;
  var MAX_X = 1200;
  var MIN_X = 0;
  var offerHandle = window.card.userMap.querySelector('.map__pin--main');
  var offerXCoord = offerHandle.offsetLeft;
  var offerYCoord = offerHandle.offsetTop;

  var successHandler = function (data) {
    window.data.getUsersOffers(data);
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

  var onMainPinClick = function () {
    window.card.userMap.classList.remove('map--faded');
    window.form.enableForm();
    window.filters.getFiltersStartValues();
    window.form.cleanFeatures(window.filters.filtersFeaturesElements);
  };
  /*
  offerHandle.addEventListener('mouseup', function () {
    onMainPinClick();
    window.pin.removeOldPins();
    window.pin.renderSimilarPins(window.data.usersOffers);
  });*/

  offerHandle.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, onMainPinClick);
  });

  var renderPinCard = function (evt, array) {
    var target = evt.target;
    while (target !== evt.currentTarget) {
      if (target.className === 'map__pin') {
        window.pin.getHighlight(target);
        var i = target.getAttribute('data-position');
        window.card.getPopup(array[i]);
        return;
      }
      target = target.parentNode;
    }
  };

  window.pin.similarPins.addEventListener('click', function (evt) {
    renderPinCard(evt, window.data.usersOffers);
  });

  offerHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var offerHandleTop = offerHandle.offsetTop - shift.y;
      var offerHandleLeft = offerHandle.offsetLeft - shift.x;
      if (offerHandleTop > MIN_Y && offerHandleTop < MAX_Y) {
        offerHandle.style.top = offerHandleTop + 'px';
      }
      if (offerHandleLeft > MIN_X && offerHandleLeft < MAX_X) {
        offerHandle.style.left = offerHandleLeft + 'px';
      }

      offerXCoord = offerHandleLeft + MAIN_PIN_WIDTH / 2;
      offerYCoord = offerHandleTop + MAIN_PIN_HEIGHT;
      window.form.offerAddressInput.value = offerXCoord + ', ' + offerYCoord;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      onMainPinClick();
      window.pin.removeOldPins();
      window.pin.renderSimilarPins(window.data.usersOffers);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();

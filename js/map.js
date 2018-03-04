'use strict';

(function () {

  var PIN_MAIN_WIDTH = 62;
  var PIN_MAIN_HEIGHT = 80;
  var MAX_Y = 500;
  var MIN_Y = 150;
  var MAX_X = 1200;
  var MIN_X = 0;
  var offerHandle = window.card.userMap.querySelector('.map__pin--main');
  var offerXCoord = offerHandle.offsetLeft;
  var offerYCoord = offerHandle.offsetTop;

  var onMainPinClick = function () {
    window.card.userMap.classList.remove('map--faded');
    window.form.enableForm();
    window.pin.renderSimilarPins(window.data.usersOffers);
    window.filters.getFiltersStartValues();
    window.form.cleanFeatures(window.filters.filtersFeaturesElements);
  };

  offerHandle.addEventListener('mouseup', function () {
    window.pin.removeOldPins();
    onMainPinClick();
  });

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

      offerXCoord = offerHandleLeft + PIN_MAIN_WIDTH / 2;
      offerYCoord = offerHandleTop + PIN_MAIN_HEIGHT;
      window.form.offerAddressInput.value = 'x: ' + offerXCoord + ', y: ' + offerYCoord;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();

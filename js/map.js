'use strict';

(function () {
  var PIN_MAIN_WIDTH = 62;
  var PIN_MAIN_HEIGHT = 80;
  var MAX_Y = 500;
  var MIN_Y = 100;
  var offerHandle = window.card.userMap.querySelector('.map__pin--main');
  var offerXCoord = offerHandle.offsetLeft;
  var offerYCoord = offerHandle.offsetTop;

  var onMainPinClick = function () {
    window.card.userMap.classList.remove('map--faded');
    window.form.enableForm();
    window.pin.renderSimilarPins(window.filters.usersOffers);
  };

  offerHandle.addEventListener('mouseup', function () {
    window.pin.removeOldPins();
    onMainPinClick();
  });

  offerHandle.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, onMainPinClick);
  });

  window.pin.similarPins.addEventListener('click', function (event) {
    var target = event.target;
    while (target !== event.currentTarget) {
      if (target.className === 'map__pin') {
        window.pin.getHighlight(target);
        var i = target.getAttribute('data-position');
        window.card.getPopup(window.filters.usersOffers[i]);
        return;
      }
      target = target.parentNode;
    }
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

      offerHandle.style.left = offerHandleLeft + 'px';

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

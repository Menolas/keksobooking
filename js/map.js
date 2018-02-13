'use strict';

(function () {
  var userMap = document.querySelector('.map');
  var similarPins = document.querySelector('.map__pins');
  var offerHandle = document.querySelector('.map__pin--main');
  var offerAddressInput = document.getElementById('address');
  var offerXCoord = offerHandle.offsetLeft;
  var offerYCoord = offerHandle.offsetTop;

  offerAddressInput.value = offerXCoord + ', ' + offerYCoord;

  var onMainPinClick = function () {
    userMap.classList.remove('map--faded');
    window.form.enableForm();
    window.pin.renderSimilarPins();
  };

  offerHandle.addEventListener('mouseup', function () {
    onMainPinClick();
  });

  offerHandle.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, onMainPinClick);
  });

  similarPins.addEventListener('click', function (event) {
    var target = event.target;
    while (target !== event.currentTarget) {
      if (target.className === 'map__pin') {
        window.pin.getHighlight(target);
        var i = target.getAttribute('data-position');
        window.card.getPopup(window.data.usersOffers[i]);
        return;
      }
      target = target.parentNode;
    }
  });
  window.map = {
    userMap: userMap,
    similarPins: similarPins
  };
})();

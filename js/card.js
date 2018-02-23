'use strict';

(function () {
  var userMap = document.querySelector('.map');
  var filterContainerElement = document.querySelector('.map__filters-container');
  var offerElement = userMap.querySelector('.map__card');

  var onPopupClose = function (evt) {
    window.util.isEscEvent(evt, closePopup);
  };

  var closePopup = function () {
    userMap.removeChild(offerElement);
    window.pin.removeActivePin();
    document.removeEventListener('keydown', onPopupClose);
  };

  var getPopup = function (userOffer) {
    offerElement = window.data.renderOffer(userOffer);
    var renderOfferElement = userMap.querySelector('.popup');
    if (renderOfferElement) {
      userMap.replaceChild(offerElement, renderOfferElement);
    } else {
      userMap.insertBefore(offerElement, filterContainerElement);
    }
    document.addEventListener('keydown', onPopupClose);
    var popupCloseButton = userMap.querySelector('.popup__close');
    popupCloseButton.addEventListener('click', function () {
      closePopup();
    });
    popupCloseButton.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, closePopup);
    });
  };
  window.card = {
    getPopup: getPopup,
    userMap: userMap
  };
})();


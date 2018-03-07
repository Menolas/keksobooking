'use strict';

(function () {

  var TYPES_AND_PRICES = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };
  var MAX_NUMBER_OF_ROOMS = 100;
  var MIN_NUMBER_OF_GUESTS = 0;
  var OFFER_CAPACITY = {
    '1': '1',
    '2': '2',
    '3': '3',
    '100': '0'
  };
  var RED_BORDER = '2px solid red';
  var NO_BORDER = '';
  var offerHandle = window.card.userMap.querySelector('.map__pin--main');
  var form = document.querySelector('.notice__form');
  var formElement = form.querySelectorAll('.form__element');
  var fillInputs = form.querySelectorAll('.fill-input');
  var offerTitleInput = form.querySelector('input[name="title"]');
  var checkInInput = form.querySelector('select[name="timein"]');
  var checkOutInput = form.querySelector('select[name="timeout"]');
  var offerTypeInput = form.querySelector('select[name="type"]');
  var offerPriceInput = form.querySelector('input[name="price"]');
  var offerRoomNumberInput = form.querySelector('select[name="rooms"]');
  var offerNumberOfGuestsInput = form.querySelector('select[name="capacity"]');
  var offerAddressInput = document.querySelector('input[name="address"]');
  var offerXCoord = offerHandle.offsetLeft + window.data.OFFER_HANDLE_CORRECT_X;
  var offerYCoord = offerHandle.offsetTop + window.data.OFFER_HANDLE_CORRECT_Y;

  offerAddressInput.value = offerXCoord + ', ' + offerYCoord;

  var startInputValues = [];

  var getStartInputValues = function () {
    [].forEach.call(fillInputs, function (input) {
      startInputValues.push(input.value);
    });

    return startInputValues;
  };

  var resetStartValues = function () {
    [].forEach.call(fillInputs, function (input, i) {
      input.value = startInputValues[i];
    });

    startInputValues.length = 0;
  };

  var setDisabled = function () {
    form.classList.add('notice__form--disabled');
    for (var i = 0; i < formElement.length; i++) {
      formElement[i].setAttribute('disabled', '');
    }
    getStartInputValues();
  };

  var onOfferTypeChanged = function () {
    offerPriceInput.min = TYPES_AND_PRICES[offerTypeInput.value];
  };

  var getStarted = function () {
    setDisabled();
  };

  getStarted();

  var enableForm = function () {
    form.classList.remove('notice__form--disabled');
    for (var i = 0; i < formElement.length; i++) {
      formElement[i].removeAttribute('disabled');
    }
    offerPriceInput.setAttribute('min', TYPES_AND_PRICES[offerTypeInput.value]);
    offerTypeInput.addEventListener('change', onOfferTypeChanged);
  };

  var getBorder = function (input, borderStyle) {
    input.style.border = borderStyle;
  };

  var checkTimeOfCheckIn = function () {
    checkOutInput.value = checkInInput.value;
  };
  var checkTimeOfCheckout = function () {
    checkInInput.value = checkOutInput.value;
  };
  checkInInput.addEventListener('change', checkTimeOfCheckIn);
  checkOutInput.addEventListener('change', checkTimeOfCheckout);

  var numberOfGuests = offerNumberOfGuestsInput.querySelectorAll('option');
  var removeHidden = function () {
    for (var i = 0; i < numberOfGuests.length; i++) {
      if (numberOfGuests[i].hasAttribute('hidden')) {
        numberOfGuests[i].removeAttribute('hidden');
      }
    }
  };
  var removeSelected = function () {
    for (var i = 0; i < numberOfGuests.length; i++) {
      if (numberOfGuests[i].hasAttribute('selected')) {
        numberOfGuests[i].removeAttribute('selected');
      }
    }
  };
  var setSelected = function () {
    for (var i = 0; i < numberOfGuests.length; i++) {
      if (numberOfGuests[i].value === OFFER_CAPACITY[offerRoomNumberInput.value]) {
        numberOfGuests[i].setAttribute('selected', '');
      }
    }
  };
  var setHidden = function (input) {
    input.setAttribute('hidden', '');
  };

  var setHiddenForValueOfGuests = function () {
    for (var i = 0; i < numberOfGuests.length; i++) {
      if (numberOfGuests[i].value > offerRoomNumberInput.value || numberOfGuests[i].value === '0') {
        setHidden(numberOfGuests[i]);
      }
    }
  };
  setHiddenForValueOfGuests();

  var setValidValueForGuest = function () {
    setSelected();
    if (Number(offerRoomNumberInput.value) === MAX_NUMBER_OF_ROOMS) {
      for (var i = 0; i < numberOfGuests.length; i++) {
        if (numberOfGuests[i].value > MIN_NUMBER_OF_GUESTS) {
          setHidden(numberOfGuests[i]);
        }
      }
    } else {
      setHiddenForValueOfGuests();
    }
  };

  offerRoomNumberInput.addEventListener('change', function () {
    removeSelected();
    removeHidden();
    setValidValueForGuest();
  });

  offerTitleInput.addEventListener('invalid', function () {
    getBorder(offerTitleInput, RED_BORDER);
    if (offerTitleInput.validity.tooShort) {
      offerTitleInput.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');
    } else if (offerTitleInput.validity.tooLong) {
      offerTitleInput.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
    } else if (offerTitleInput.validity.valueMissing) {
      offerTitleInput.setCustomValidity('Обязательное поле');
    } else {
      offerTitleInput.setCustomValidity('');
    }
  });

  offerPriceInput.addEventListener('invalid', function () {
    getBorder(offerPriceInput, RED_BORDER);
    if (offerPriceInput.validity.rangeUnderflow) {
      offerPriceInput.setCustomValidity('Цена на этот объект не может быть ниже ' + TYPES_AND_PRICES[offerTypeInput.value]);
    } else if (offerPriceInput.validity.valueMissing) {
      offerPriceInput.setCustomValidity('Обязательное поле');
    } else {
      offerPriceInput.setCustomValidity('');
    }
  });

  var features = form.querySelectorAll('.features input');

  var cleanFeatures = function (array) {
    for (var i = 0; i < array.length; i++) {
      array[i].checked = false;
    }
  };

  var setConditionBeforeActivation = function () {
    window.card.closePopup();
    offerHandle.style = '';
    resetStartValues();
    window.filters.getFiltersStartValues();
    cleanFeatures(features);
    cleanFeatures(window.filters.filtersFeaturesElements);
    getBorder(offerTitleInput, NO_BORDER);
    getBorder(offerPriceInput, NO_BORDER);
    window.card.userMap.classList.add('map--faded');
    window.pin.removeOldPins();
    setDisabled();
    offerTypeInput.removeEventListener('change', onOfferTypeChanged);
    window.map.loadCount = 0;
  };

  var submitErrorMessage = document.createElement('div');
  submitErrorMessage.classList.add('submit-error-message');

  var closeSubmitErrorMessage = document.createElement('div');
  closeSubmitErrorMessage.classList.add('node-close');
  closeSubmitErrorMessage.setAttribute('tabindex', '0');

  var onErrorMessageClose = function (evt) {
    window.util.isEscEvent(evt, closeErrorMessage);
  };

  var closeErrorMessage = function () {
    submitErrorMessage.remove();
    document.removeEventListener('keydown', onErrorMessageClose);
  };

  var submitErrorHandler = function (errorMessage) {
    form.insertAdjacentElement('afterbegin', submitErrorMessage);
    submitErrorMessage.textContent = errorMessage;
    submitErrorMessage.insertAdjacentElement('afterbegin', closeSubmitErrorMessage);
    document.addEventListener('keydown', onErrorMessageClose);
    closeSubmitErrorMessage.addEventListener('click', closeErrorMessage);
    closeSubmitErrorMessage.addEventListener('keydown', function (evt) {
      window.util.isEnterEvent(evt, closeErrorMessage);
    });
  };

  var formSuccessHandler = function () {
    location.reload();
  };

  form.addEventListener('submit', function (evt) {
    if (!form.checkValidity()) {
      return;
    }

    window.backend.save(new FormData(form), formSuccessHandler, submitErrorHandler);
    evt.preventDefault();
  });

  form.addEventListener('reset', function (evt) {
    setConditionBeforeActivation();
    evt.preventDefault();
  });

  window.form = {
    offerAddressInput: offerAddressInput,
    enableForm: enableForm,
    cleanFeatures: cleanFeatures
  };

})();

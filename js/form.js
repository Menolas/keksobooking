'use strict';

(function () {
  var offerHandle = window.card.userMap.querySelector('.map__pin--main');
  var offerXCoord = offerHandle.offsetLeft;
  var offerYCoord = offerHandle.offsetTop;
  var TYPES_AND_PRICES = {
    'bungalow': 0,
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
  var form = document.querySelector('.notice__form');
  var formElement = form.querySelectorAll('.form__element');
  var fillInput = form.querySelectorAll('.fill-input');
  var offerTitleInput = form.querySelector('input[name="title"]');
  var checkInInput = form.querySelector('select[name="timein"]');
  var checkOutInput = form.querySelector('select[name="timeout"]');
  var offerTypeInput = form.querySelector('select[name="type"]');
  var offerPriceInput = form.querySelector('input[name="price"]');
  var offerRoomNumberInput = form.querySelector('select[name="rooms"]');
  var offerNumberOfGuestsInput = form.querySelector('select[name="capacity"]');
  var offerAddressInput = form.querySelector('input[name="address"]');
  
  offerAddressInput.value = offerXCoord + ', ' + offerYCoord;
  
  var startInputValues = [];
  var getStartInputValues = function () {
    for (var i = 0; i < fillInput.length; i++) {
      var startInputValueItem = fillInput[i].value;
      startInputValues.push(startInputValueItem);
    }
    return startInputValues;
  };

  var putStartValues = function () {
    for (var i = 0; i < fillInput.length; i++) {
      fillInput[i].value = startInputValues[i];
    }
  };

  var putDisabled = function () {
    form.classList.add('notice__form--disabled');
    for (var i = 0; i < formElement.length; i++) {
      formElement[i].setAttribute('disabled', '');
    }
  };

  var getStarted = function () {
    getStartInputValues();
    putDisabled();
  };

  getStarted();
  console.log(startInputValues);

  var enableForm = function () {
    form.classList.remove('notice__form--disabled');
    for (var i = 0; i < formElement.length; i++) {
      formElement[i].removeAttribute('disabled');
    }
  };

  var checkMinPrice = function (event) {
    offerPriceInput.min = TYPES_AND_PRICES[event.currentTarget.value];
  };

  offerTypeInput.addEventListener('change', checkMinPrice);

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
    if (offerTitleInput.validity.tooShort) {
      offerTitleInput.setCustomValidity('Заголовок объявления должен состоять минимум из 30 символов');
    } else if (offerTitleInput.validity.tooLong) {
      offerTitleInput.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
    } else if (offerTitleInput.validity.valueMissing) {
      offerTitleInput.setCustomValidity('Обязательное поле');
    }
  });

  offerPriceInput.addEventListener('invalid', function () {
    if (offerPriceInput.validity.rangeUnderflow) {
      offerPriceInput.setCustomValidity('Цена на этот объект не может быть ниже ' + TYPES_AND_PRICES[offerTypeInput.value]);
    }
  });

  form.addEventListener('invalid', function (event) {
    var target = event.target;
    while (target !== event.currentTarget) {
      if (target.tagName === 'input') {
        target.classList.add('invalid');
      }
      target = target.parentNode;
    }
  });

  var features = form.querySelectorAll('.features input');
  var cleanFeatures = function () {
    for (var i = 0; i < features.length; i++) {
      features[i].checked = false;
    }
  };

  var getConditionBeforeActivation = function () {
    window.card.closePopup();
    offerHandle.style.left = offerXCoord;
    offerHandle.style.top = offerYCoord;
    putStartValues();
    cleanFeatures();
    window.card.userMap.classList.add('map--faded');
    window.pin.removeOldPins();
    putDisabled();
  };
  
  var formSuccessHandler = function () {
    getConditionBeforeActivation();
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), formSuccessHandler, window.backend.errorHandler);
    evt.preventDefault();
  });

  form.addEventListener('reset', function (evt) {
    getConditionBeforeActivation();
  });
  window.form = {
    offerAddressInput: offerAddressInput,
    form: form,
    enableForm: enableForm
  };
})();

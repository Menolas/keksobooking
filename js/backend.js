'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_SAVE = 'https://js.dump.academy/keksobooking';
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  window.backend = {
    load: function (onLoad, onError) {
      xhr.addEventListener('load', function () {
        if (xhr.status >= 200 && xhr.status <= 400) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = 20000;
      xhr.open('GET', URL_LOAD);
      xhr.send();
    },
    errorHandler: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'position: absolute; z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '30px';
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    },
    save: function (data, onLoad, onError) {
      xhr.addEventListener('load', function () {
        if (xhr.status >= 200 && xhr.status <= 400) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения, попробуйте заполнить форму еще раз через несколько минут');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });
      xhr.timeout = 20000;
      xhr.open('POST', URL_SAVE);
      xhr.send(data);
    }
  };

})();

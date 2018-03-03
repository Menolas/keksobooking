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

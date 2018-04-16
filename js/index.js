function Password(len) {
  this.lengthPassword = len; //сохраняем длину пароля
  that = this;

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min); // обрезает низ
    max = Math.floor(max); // обрезает верх
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let returnPropertyName = function(random) {
    let allocation = [30, 60, 90]; // 30% A-Z [0-30] 30% a-z [30-60] 30% 0-9 [60-90] 10% _ [90-100] отвечает за распределение
    switch (true) {
      case random >= 0 && random <= allocation[0]:
        return "upChar";
      case random > allocation[0] && random <= allocation[1]:
        return "smallChar";
      case random > allocation[1] && random <= allocation[2]:
        return "number";
      case random > allocation[2] && random <= 100:
        return "under";
    }
  };

  let generatePattern = function() {
    let pattern = [];
    for (let i = 0; i < that.lengthPassword; i++) {
      let rand = getRandomIntInclusive(0, 100); // случайное распределение от 0 до 1
      pattern[i] = returnPropertyName(rand); // получаем случайный шаблон для символа пароля
    }
    return pattern;
  };

  let validation = function(password) {
    // Проверяем, чтобы пароль содержал хотя бы одно число
    let isNumber = password.split("").some(function(index) {
      return isFinite(index);
    });
    // Проверяем, чтобы пароль содержал подчеркивание
    let isUnder = password.indexOf("_") >= 0;
    // возвращаем итог
    return isUnder && isNumber;
  };

  this.generatePrime = function() {
    let generatePassword = function() {
      let password = "";
      let pattern = generatePattern(); // получаем паттерн для пароля
      // объект который хранит интервалы кодов для паттерна
      let intervalCode = {
        upChar: [65, 90],
        smallChar: [97, 122],
        number: [48, 57],
        under: [95, 95]
      };
      // по патерну генерируем случайный пароль
      pattern.forEach(function(item) {
        let start = intervalCode[item][0];
        let end = intervalCode[item][1];
        let code = getRandomIntInclusive(start, end);
        password += String.fromCharCode(code);
      });
      return password;
    };
    let password = "";
    do {
      password = generatePassword();
    } while (!validation(password)); // если пароль прошел валидацию возвращаем его
    return password;
  };
}

let password = new Password(10);

let btn = document.querySelector("#gPass");
let result = document.querySelector("#result");

btn.addEventListener("click", e => {
  result.textContent = password.generatePrime();
});

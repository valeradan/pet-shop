let cardButtons = document.querySelectorAll(".btn-primary");
let basket = {}; // Инициализируем корзину как пустой объект
let counterBasket = document.querySelector(".counterBasket");

// Функция для обновления значения countOfBasket в localStorage
function updateCountOfBasket() {
    let countOfBasket = Object.values(basket).reduce((total, item) => total + item.quantity, 0);
    localStorage.setItem("countOfBasket", countOfBasket.toString());
}

// Восстанавливаем состояние корзины из localStorage при загрузке страницы
for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key.startsWith("cardinfo_")) {
        let cardInfo = JSON.parse(localStorage.getItem(key));
        let quantity = basket[key] ? basket[key].quantity : 0;
        basket[key] = {
            info: cardInfo,
            quantity: quantity + 1
        };
    }
}

// Обновляем значение countOfBasket в localStorage при загрузке страницы
updateCountOfBasket();

// Восстанавливаем состояние кнопки для каждой кнопки из localStorage
cardButtons.forEach((button, index) => {
    let buttonStatus = localStorage.getItem(`buttonStatus_${index}`);
    if (buttonStatus) {
        button.classList.remove("btn-primary");
    }

    // Добавляем обработчик клика для каждой кнопки
    button.addEventListener("click", () => {
        let card = document.querySelectorAll(".card")[index];
        let imgSrc = card.querySelector("img").src;
        let title = card.querySelector(".nameitem").textContent;
        let price = card.querySelector(".text-dark").textContent;

        let itemKey = `cardinfo_${index}`;
        let buttonStatus = `buttonStatus_${index}`;

        // Проверяем, есть ли запись в localStorage
        if (localStorage.getItem(itemKey)) {
            // Удаляем запись из localStorage
            localStorage.removeItem(itemKey);

            // Удалите соответствующий товар из корзины, если это необходимо
            if (basket[itemKey]) {
                delete basket[itemKey];
            }

            // Обновляем значение countOfBasket в localStorage
            updateCountOfBasket();

            // Возвращаем кнопке исходный класс (например, btn-primary)
            button.classList.toggle('btn-primary');

            // Меняем счетчик в хеддере
            let countOfBasket = parseInt(localStorage.getItem("countOfBasket")) || 0;
            if (countOfBasket > 0) {
                counterBasket.textContent = countOfBasket;
            } else {
                counterBasket.textContent = "";
                localStorage.removeItem(countOfBasket);
            }

            // Удаляем запись о состоянии кнопки из localStorage
            localStorage.removeItem(buttonStatus);

            // Обновляем отображение количества товаров в корзине в cardInfos
            updateCardInfos();
        } else {
            // Записываем информацию о товаре в localStorage
            let cardInfo = {
                imageitem: imgSrc,
                nameitem: title,
                priceitem: price
            };
            localStorage.setItem(itemKey, JSON.stringify(cardInfo));

            // Если товар нет в корзине, то добавляем его
            if (!basket[itemKey]) {
                basket[itemKey] = {
                    info: cardInfo,
                    quantity: 1
                };
            } else {
                basket[itemKey].quantity++; // Увеличиваем количество товара в корзине
            }

            // Обновляем значение countOfBasket в localStorage
            updateCountOfBasket();

            // Меняем класс кнопки (например, на другой, чтобы показать, что товар добавлен в корзину)
            button.classList.toggle('btn-primary');

            // Сохраняем состояние кнопки в localStorage
            localStorage.setItem(buttonStatus, 'btn-primary');

            // Меняем счетчик в хеддере
            let countOfBasket = parseInt(localStorage.getItem("countOfBasket")) || 0;
            if (countOfBasket > 0) {
                counterBasket.textContent = countOfBasket;
            }

            // Обновляем отображение количества товаров в корзине в cardInfos
            updateCardInfos();
        }
    });
});

let cardInfos = [];

// Функция для обновления отображения количества товаров в корзине в cardInfos
function updateCardInfos() {
    cardInfos = Object.values(basket).reduce((result, item) => {
        for (let i = 0; i < item.quantity; i++) {
            result.push(item.info);
        }
        return result;
    }, []);

    console.log(cardInfos);
}

// Вызываем функцию обновления при загрузке страницы
updateCardInfos();

// Загружаем значение countOfBasket из localStorage при загрузке страницы
let countOfBasket = parseInt(localStorage.getItem("countOfBasket")) || 0;
if (countOfBasket > 0) {
    counterBasket.textContent = countOfBasket;
}
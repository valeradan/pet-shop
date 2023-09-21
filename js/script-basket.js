
document.addEventListener('DOMContentLoaded', () => {
    let cardInfos = [];



    // Извлекаем все объекты cardInfo из localStorage и добавляем их в массив cardInfos
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.startsWith("cardinfo_")) {
            cardInfos.push(JSON.parse(localStorage.getItem(key)));
        }
    }


    // Извлекаем все объекты countOfBasket из localStorage и добавляем их в массив cardInfos
    let counterBasket = document.querySelector(".counterBasket")
    let countInfos = []
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key.startsWith("countOfBasket")) {
            countInfos.push(JSON.parse(localStorage.getItem(key)));
        }
    }
    counterBasket.textContent = countInfos.join();

    let basketContainer = document.getElementById("basket-container"); // Элемент, в который будем добавлять товары

    // Создаем элемент корзины для каждого объекта cardInfo и добавляем их на страницу
    cardInfos.forEach((cardInfo, index) => {
        let cardElement = createCardElement(cardInfo, index);
        basketContainer.appendChild(cardElement);
    });

    // Функция для создания элемента корзины для товара
    function createCardElement(cardInfo, index) {
        // Создаем элементы DOM, устанавливаем им текст и атрибуты на основе информации о товаре (cardInfo)
        let cardDiv = document.createElement("div"); // main div
        cardDiv.classList.add("basket-card");
        cardDiv.classList.add("row");
        cardDiv.classList.add("mb-4");
        cardDiv.classList.add("d-flex");
        cardDiv.classList.add("justify-content-between");
        cardDiv.classList.add("align-items-center");
        cardDiv.setAttribute("data-index", index);

        let cardDivHr = document.createElement("hr");
        cardDivHr.classList.add("my-4");

        let imgDiv = document.createElement("div") // new div for img
        imgDiv.classList.add("col-md-2");
        imgDiv.classList.add("col-lg-2");
        imgDiv.classList.add("col-xl-2");
        imgDiv.classList.add("d-flex");

        let titleDiv = document.createElement("div") // new div for name of item
        titleDiv.classList.add("col-md-3");
        titleDiv.classList.add("col-lg-3");
        titleDiv.classList.add("col-xl-3");

        let priceDiv = document.createElement("div")  // new div for price
        priceDiv.classList.add("col-md-3");
        priceDiv.classList.add("col-lg-2");
        priceDiv.classList.add("col-xl-2");
        priceDiv.classList.add("offset-lg-1");

        let hPrice = document.createElement("h6") // style h6 for price string
        hPrice.classList.add("mb-0");
        hPrice.classList.add("priceOfitem");
        hPrice.textContent = cardInfo.priceitem;

        let delitemDiv = document.createElement("div")
        delitemDiv.classList.add("col-md-1");
        delitemDiv.classList.add("col-lg-1");
        delitemDiv.classList.add("col-xl-1");
        delitemDiv.classList.add("text-end");

        let delitemA = document.createElement("a")
        delitemA.classList.add("text-muted");
        delitemA.classList.add("col-lg-1");
        delitemA.setAttribute("href", "#1")

        let delitemicon = document.createElement("a")
        delitemicon.classList.add("fas");
        delitemicon.classList.add("fa-times");

        let countItem = document.createElement("div") // new div for counter's item of basket
        countItem.classList.add("col-md-3");
        countItem.classList.add("col-lg-3");
        countItem.classList.add("col-xl-3");
        countItem.classList.add("d-flex");

        let buttonDown = document.createElement("button"); // button down of counter
        buttonDown.classList.add("btn");
        buttonDown.classList.add("btn-link");
        buttonDown.classList.add("px-2");
        buttonDown.classList.add("btn-down");

        let arrowDown = document.createElement("i"); // arrow Down of button
        arrowDown.classList.add("fas");
        arrowDown.classList.add("fa-minus");

        let countInput = document.createElement("input");
        countInput.classList.add("form-control");
        countInput.classList.add("form-control-sm");
        countInput.setAttribute("id", "form1")
        countInput.setAttribute("min", "0")
        countInput.setAttribute("name", "quantity")
        countInput.setAttribute("value", "1")
        countInput.setAttribute("type", "number")

        let buttonUp = document.createElement("button"); // button down of counter
        buttonUp.classList.add("btn");
        buttonUp.classList.add("btn-link");
        buttonUp.classList.add("px-2");
        buttonUp.classList.add("btn-up");

        let arrowUp = document.createElement("i"); // arrow Down of button
        arrowUp.classList.add("fas");
        arrowUp.classList.add("fa-plus");

        let itemName = document.createElement("span");
        itemName.textContent = cardInfo.nameitem;

        let itemImage = document.createElement("img");
        itemImage.src = cardInfo.imageitem;
        itemImage.classList.add("img-fluid");
        itemImage.classList.add("rounded-3");

        // Добавляем созданные элементы в cardDiv
        cardDiv.append(imgDiv)
        cardDiv.append(titleDiv)
        cardDiv.append(countItem)
        cardDiv.append(priceDiv)
        cardDiv.append(delitemDiv)

        // hr after carDiv
        cardDiv.append(cardDivHr)

        // counter
        buttonDown.append(arrowDown)
        countItem.append(buttonDown)
        countItem.append(countInput)
        countItem.append(buttonUp)
        buttonUp.append(arrowUp)

        titleDiv.append(itemName);
        priceDiv.append(hPrice);
        imgDiv.append(itemImage);

        delitemDiv.append(delitemA)
        delitemA.append(delitemicon)

        return cardDiv;
    }

    // Восстанавливаем значения инпутов из локального хранилища
    for (let i = 0; i < cardInfos.length; i++) {
        let quantity = localStorage.getItem(`quantity_${i}`);
        if (quantity !== null) {
            // Найденное значение сохраняем в соответствующий инпут
            let input = document.querySelectorAll('.form-control.form-control-sm')[i];
            input.value = quantity;
        }
    }

    // Восстанавливаем totalprice из локального хранилища
    let savedTotalPrice = localStorage.getItem("totalprice");
    if (savedTotalPrice !== null) {
        let initialTotal = parseInt(savedTotalPrice);
        // Установите значение totalprice в DOM
        let totalPrice = document.querySelector(".totalPrice");
        totalPrice.textContent = `${initialTotal} $`;
        // Обновите значение в локальном хранилище
        localStorage.setItem("totalprice", initialTotal.toString());
    } else {
        updatePrice();
    }


    // buttons raiting generated by storage
    let downButtons = document.querySelectorAll(".btn-down");
    let upButtons = document.querySelectorAll(".btn-up");

    // logic of up buttons raiting generated by storage
    upButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            let input = document.querySelectorAll('.form-control.form-control-sm')[index]; // Инпут для количества товара
            let quantity = parseInt(input.value);

            if (quantity < 15) {
                input.value = quantity + 1;
                let upPrice = document.querySelectorAll(".priceOfitem")[index];
                let priceHtml = parseInt(upPrice.textContent);
                let newPrice = priceHtml + parseInt(cardInfos[index].priceitem);
                upPrice.textContent = `${newPrice} $`;
                localStorage.setItem(`priceOfitem_${index}`, newPrice.toString());
            }

            // Обновляем значение в локальном хранилище
            localStorage.setItem(`quantity_${index}`, input.value);

            // После обновления цены товара, сохраните новое значение в локальное хранилище

            let allPrices = document.querySelectorAll('.priceOfitem'); // Все значения цен
            let total = 0; // Обнуляем total перед каждым пересчетом
            allPrices.forEach((priceElement) => {
                total += parseInt(priceElement.textContent);
            });

            updatePrice();
        });
    });

    // logic of down buttons raiting generated by storage
    downButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            let input = document.querySelectorAll('.form-control.form-control-sm')[index]; // Инпут для количества товара
            let quantity = parseInt(input.value);

            if (quantity > 1) {
                input.value = quantity - 1;
                let upPrice = document.querySelectorAll(".priceOfitem")[index];
                let priceHtml = parseInt(upPrice.textContent);
                let newPrice = priceHtml - parseInt(cardInfos[index].priceitem);
                upPrice.textContent = `${newPrice} $`;
                // После обновления цены товара, сохраните новое значение в локальное хранилище
                localStorage.setItem(`priceOfitem_${index}`, newPrice.toString());
            }

            // Обновляем значение в локальном хранилище
            localStorage.setItem(`quantity_${index}`, input.value);

            let allPrices = document.querySelectorAll('.priceOfitem'); // Все значения цен
            let total = 0; // Обнуляем total перед каждым пересчетом
            allPrices.forEach((priceElement) => {
                total -= parseInt(priceElement.textContent);
            });

            updatePrice();
        });
    });

    // buttons delete items in basket
    let deleteButtons = document.querySelectorAll(".fa-times");
    deleteButtons.forEach((el, index) => {
        el.addEventListener("click", () => {
            localStorage.removeItem(`cardinfo_${index}`);
            let basketCard = document.querySelector(`.basket-card[data-index="${index}"]`);
            if (basketCard) {
                basketCard.remove();
            }
            // удаляем состояние кнопок каталога из локального хранилища
            localStorage.removeItem(`buttonStatus_${index}`)

            // обновляем состояние счетчика товаров в хедере
            let counterBasket = document.querySelector(".counterBasket")
            let countInfos = []
            for (let i = 0; i < localStorage.length; i++) {
                let key = localStorage.key(i);
                if (key.startsWith("countOfBasket")) {
                    countInfos.push(JSON.parse(localStorage.getItem(key)));
                }
            }
            counterBasket.textContent = countInfos.join() - 1;
            let helpCounterBasket = counterBasket.textContent
            if (helpCounterBasket = 0) {
                counterBasket.textContent = "";
            }

            // Обновите общее количество товаров в корзине (если это необходимо)
            // Получите актуальное количество товаров из localStorage и обновите отображение на странице
            let countOfBasket = Object.keys(localStorage).filter(key => key.startsWith("cardinfo_")).length;
            localStorage.setItem("countOfBasket", countOfBasket);
            // Обновите отображение количества товаров в корзине на странице
            let basketCountElement = document.getElementById("basket-count");
            if (basketCountElement) {
                if (countOfBasket == 1) {
                    basketCountElement.textContent = `${countOfBasket.toString()} товар`;
                } else if (countOfBasket > 1 && countOfBasket < 5) {
                    basketCountElement.textContent = `${countOfBasket.toString()} товара`;
                } else if (countOfBasket >= 5) {
                    basketCountElement.textContent = `${countOfBasket.toString()} товаров`;
                } else {
                    basketCountElement.textContent = "Корзина пуста";
                }
            }
            updatePrice();
        });
    });

    // after downloading page value of basket
    let basketcount = document.getElementById("basket-count")
    let valuebasket = localStorage.getItem("countOfBasket")

    if (valuebasket == 1) {
        basketcount.textContent = `${valuebasket} товар`
    } else if (valuebasket > 1 && valuebasket < 5) {
        basketcount.textContent = `${valuebasket} товара`
    } else if (valuebasket > 5) {
        basketcount.textContent = `${valuebasket} товаров`
    } else {
        basketcount.textContent = "Корзина пуста"
    }

    function updatePrice() {
        let allPrices = document.querySelectorAll('.priceOfitem'); // Все значения цен
        let total = 0;

        allPrices.forEach((priceElement) => {
            total += parseInt(priceElement.textContent);
        });

        let totalPrice = document.querySelector(".totalPrice"); // Элемент, в который мы будем добавлять значения цены
        totalPrice.textContent = `${total} $`;

        // Обновляем значение total в локальном хранилище после его вычисления
        localStorage.setItem("totalprice", total);
    }


    // Восстанавливаем значения цен из локального хранилища
    for (let i = 0; i < cardInfos.length; i++) {
        let price = localStorage.getItem(`priceOfitem_${i}`);
        if (price !== null) {
            // Найденное значение сохраняем в соответствующий элемент с классом priceOfitem
            let priceElement = document.querySelectorAll('.priceOfitem')[i];
            priceElement.textContent = `${price} $`;
        }
    }

    updatePrice();
});
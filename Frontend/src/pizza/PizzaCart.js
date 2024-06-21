/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $(".cart-orders-container");

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок

    //Приклад реалізації, можна робити будь-яким іншим способом
    Cart.push({
        pizza: pizza,
        size: size,
        quantity: 1
    });

    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    //TODO: треба зробити

    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);
        
        var $node = $(html_code);

        if(cart_item.size == PizzaSize.Big){
            $node.find('.order-name-size').text(" (Велика)");
        } else if(cart_item.size == PizzaSize.Small){
            $node.find('.order-name-size').text(" (Мала)");
        }

        $node.find(".order-plus-button").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;

            //Оновлюємо відображення
            updateCart();
        });
        $node.find(".order-minus-button").click(function(){
          //Збільшуємо кількість замовлених піц
          if(cart_item.quantity == 1){
            removeFromCart(cart_item);
          }else{
            cart_item.quantity -= 1;
            //Оновлюємо відображення
            updateCart();
          }
        });
        $node.find(".order-remove-button").click(function(){
          removeFromCart(cart_item);
        });

        $cart.append($node);
        count = count + cart_item.quantity;
    }

    let count = 0;
    Cart.forEach(showOnePizzaInCart);

    document.querySelector('.cart-count-quantity').textContent = count;
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;
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

    const newItem = {
        pizza: pizza,
        size: size,
        quantity: 1
    };
    const prevItem = Cart.find(obj => (obj.pizza == newItem.pizza) && (obj.size == newItem.size));
    //Already exists
    if(prevItem != null ){
        prevItem.quantity += 1;
    }else{
        Cart.push(newItem);
    }

    //Оновити вміст кошика на сторінці
    updateCart();
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    Cart = Cart.filter(obj => (obj.pizza != cart_item.pizza) || (obj.size != cart_item.size));

    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    const storedCart = localStorage.getItem('cart');

    if (storedCart) {
        Cart = JSON.parse(storedCart);
    }

    $('.clear-cart-button').click(function(){
        Cart = [];
        updateCart();
    });

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}
function saveCart(){
    localStorage.setItem('cart', JSON.stringify(Cart));
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage
    
    //Очищаємо старі піци в кошику
    $cart.html("");

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        let curPrice = cart_item.quantity*cart_item.pizza[cart_item.size].price;
        //for setting up price
        const obj = structuredClone(cart_item);
        obj.pizza[obj.size].price = curPrice
        var html_code = Templates.PizzaCart_OneItem(obj);
        
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
        price = price + curPrice;
    }

    let count = 0;
    let price = 0;
    Cart.forEach(showOnePizzaInCart);

    document.querySelector('.cart-count-quantity').textContent = count;
    document.querySelector('.cart-total-price').childNodes[0].nodeValue = price;
    saveCart();
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;
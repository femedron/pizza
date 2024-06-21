const PizzaMenu = require('./pizza/PizzaMenu');

const $pizza_filter = $('.pizza-filter-container');

function initialise(){
    //add click handlers
    $pizza_filter.children('.pizza-filter-option').each(function(i, obj){
        const filterName = Array.from(obj.classList).find(x => x.startsWith('filter-')).substring('filter-'.length);
        $(this).click(function(el){
            activateFilterButton(obj);
            PizzaMenu.filterPizza(filterName);
        });
    });
}

function activateFilterButton(button){
    $pizza_filter.children('.pizza-filter-option').each(function(i, obj){
        if(JSON.stringify(button) == JSON.stringify(obj)){
            obj.classList.add('active');
        } else{
            obj.classList.remove('active');
        }
    });
}

exports.initialise = initialise;
/* global variables */

/* need to register where clicks are coming from */
var food_items = [];
var monsters = [];
var food_item_images_left = [];
var monster_images_left = [];

var fselected_food;
var fselected_mon;

var level = 10;
var array_level = level - 1

var random_array = [];

var correct = [level];
var counter = 0;
var num;

function start(HTfood_items, HTmonsters, HTfood_item_images_left, HT_monster_images_left) {
    declare(HTfood_items, HTmonsters, HTfood_item_images_left, HT_monster_images_left);
    document.getElementById("startbutton").disabled = false;
    reset(HTfood_item_images_left, HT_monster_images_left);
    progress();
    orders(level);
}

function declare(HTfood_items, HTmonsters, HTfood_item_images_left, HT_monster_images_left) {
    food_items = HTfood_items;
    monsters = HTmonsters;

    food_item_images_left = HTfood_item_images_left;

    monster_images_left = HT_monster_images_left;
}

function getRandomNumber(array_level) {
    var max = Math.ceil(array_level);
    return((Math.floor(Math.random() * (array_level + 1))));
}

function GenerateFoodItemsLeft() {
    for (i=0; i < level; i++) {
        random_array.push(getRandomNumber(array_level));
    }
    return(random_array);
}

function reset(HTfood_item_images_left, HT_monster_images_left) {
    document.getElementById("number_correct").innerHTML = 0;
    counter = 0;

    var selected_order_img = document.getElementById('selectedOrder');
    selected_order_img.src = 'ac_whitebox.png';

    var selected_mon_img = document.getElementById('selectedMonster');
    selected_mon_img.src = 'ac_whitebox.png';

    food_item_images_left = HTfood_item_images_left;
    monster_images_left = HT_monster_images_left;

    num = 0;
    random_array = [];
    progress();
}

/* level determines how long the recipe will be */
function orders(level) {
    var random_array_generated = GenerateFoodItemsLeft();
    var final_order1 = "";
    var final_order2 = "";
    var i;
    for (i = 0; i < (level/2); i++) {
        var order_num = random_array[i];
        final_order1 += monsters[i] + " wants " + food_items[order_num] + "<br>" + "<br>";
    }

    for (i = (level/2); i < level; i++) {
        var order_num = random_array[i];
        final_order2 += monsters[i] + " wants " + food_items[order_num] + "<br>" + "<br>";
    }

    document.getElementById("order1").innerHTML = final_order1;
    document.getElementById("order2").innerHTML = final_order2;
}


function progress() {
    document.getElementById("startbutton").disabled = true;
    var item = document.getElementById("progress_bar");
    var width = 100;
    var id = setInterval(frame, 200);

    function frame() {
        if (width <= 0 ){
            clearInterval(id);
            item.style.backgroundColor = "green";
            final_message();
        }

        else if (width <= 50 && width >= 20) {
            width--;
            item.style.backgroundColor = "orange";
            item.style.width = width + '%';
        }

        else if (width <= 20) {
            width--;
            item.style.backgroundColor = "red";
            item.style.width = width + '%';
            document.getElementById("startbutton").disabled = false;
        }

        else {
            width--;
            item.style.width = width + '%';
        }
    }
}

function selected(selected_item) {
    var selected_order_img = document.getElementById('selectedOrder');
    selected_order_img.src = selected_item;
    fselected_food = selected_item;

    check();
}

function selectedM(selected_mon) {
    var selected_mon_img = document.getElementById('selectedMonster');
    selected_mon_img.src = selected_mon;
    fselected_mon = selected_mon;

    check();
}

/* need to remove from list once they got it right */
function check() {
    for (i = 0; i < level; i++) {
        if(fselected_food == food_item_images_left[random_array[i]] && fselected_mon == monster_images_left[i]) {
            counter+=1;
            document.getElementById("number_correct").innerHTML = counter;
            if (counter == level) {
                final_message(1);
                }
            delete random_array[i];
            delete monster_item_images_left[i];
    }
}
}

function final_message(num) {
    if (num == 1){
        document.getElementById("order1").innerHTML = "Yay! Congrats";
        document.getElementById("order2").innerHTML = "";
    }

    else {
        document.getElementById("order1").innerHTML = "Press Start to play again.";
        document.getElementById("order2").innerHTML = "";
    }
}

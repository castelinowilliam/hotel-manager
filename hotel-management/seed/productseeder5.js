var Product5 = require('../models/drinks1');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/menus",{ useNewUrlParser: true});

var  drinks = [
    new Product5({
        title: 'Tea',
        price: 20
    }),
    new Product5({
        title: 'Black Tea',
        price: 25
    }),
    new Product5({
        title: 'Coffee',
        price: 25
    }),
    new Product5({
        title: 'Milk',
        price: 20
    }),
    new Product5({
        title: 'Cold drinks',
        price: 25
    }),
    new Product5({
        title: 'Sweet Lassi',
        price: 40
    }),
    new Product5({
        title: 'Khara Lassi',
        price: 35
    }),
    new Product5({
       title: 'Milkshakes',
        price: 50
    }),
];

var done = 0;
for (var i = 0; i < drinks.length; i++){
    drinks[i].save(function(err, result) {
        done++;
        if(done === drinks.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}

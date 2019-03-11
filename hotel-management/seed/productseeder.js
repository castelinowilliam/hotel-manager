var Product = require('../models/dish');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/menus",{ useNewUrlParser: true});

var dishes = [
    new Product({
        title: 'Stuffed Capsicum',
        price: 50.00
    }),
    new Product({
        title: 'Manchurian',
        price: 70.00
    }),
    new Product({
        title: 'Manchurian Gravy',
        price: 80.00
    }),
    new Product({
        title: 'Crispy Corn',
        price: 60.00
    }),
    new Product({
        title: 'Aloo Chat',
        price: 50.00
    }),
    new Product({
        title: 'Spring Rolls',
        price: 70.00
    }),
    new Product({
        title: 'Veg Momos',
        price: 70.00
    }),
    new Product({
        title: 'Veg Kebab',
        price: 100.00
    }),
    new Product({
        title: 'Moong Dal bhel',
        price: 50.00
    }),
    new Product({
        title: 'Veg Lollipop',
        price: 90.00
    }),
];

var done = 0;
for (var i = 0; i < dishes.length; i++){
    dishes[i].save(function(err, result) {
        done++;
        if(done === dishes.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}

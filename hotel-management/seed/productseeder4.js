var Product4 = require('../models/dish4');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/menus",{ useNewUrlParser: true});

var  main3 = [
    new Product4({
        title: 'Simple Rice',
        price: 50
    }),
    new Product4({
        title: 'Pulao Rice',
        price: 125
    }),
    new Product4({
        title: 'Veg Biryani',
        price: 150
    }),
    new Product4({
        title: 'Jeera Rice',
        price: 90
    }),
    new Product4({
        title: 'Spl Rice',
        price: 100
    }),
    new Product4({
        title: 'Sweet Rice',
        price: 60
    }),
    new Product4({
        title: 'Tawa pulao',
        price: 80
    }),
    new Product4({
        title: 'Tomato Rice',
        price: 130
    }),
    new Product4({
        title: 'Mushroom Rice',
        price: 150
    }),
    new Product4({
        title: 'Kichidi',
        price: 100
    }),
];

var done = 0;
for (var i = 0; i < main3.length; i++){
    main3[i].save(function(err, result) {
        done++;
        if(done === main3.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}

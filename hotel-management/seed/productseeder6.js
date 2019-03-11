var Product6 = require('../models/drinks2');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/menus",{ useNewUrlParser: true});

var  juices = [
    new Product6({
        title: 'Mango Juice',
        price: 30.50
    }),
    new Product6({
        title: 'Apple Juice',
        price: 35.00
    }),
    new Product6({
        title: 'Pineapple Juice',
        price: 35.50
    }),
    new Product6({
        title: 'Mosambi Juice',
        price: 50.00
    }),
    new Product6({
        title: 'Orange Juice',
        price: 40.00
    }),
    new Product6({
        title: 'Kokam Juice',
        price: 30.00
    }),
    new Product6({
        title: 'Lemon Juice',
        price: 30.50
    }),
    new Product6({
       title: 'Mixed Juice',
        price: 50.00
    }),
];

var done = 0;
for (var i = 0; i < juices.length; i++){
    juices[i].save(function(err, result) {
        done++;
        if(done === juices.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}

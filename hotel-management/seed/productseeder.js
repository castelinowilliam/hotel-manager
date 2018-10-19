var Product = require('../models/dish');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/menus",{ useNewUrlParser: true});

var dishes = [
    new Product({
        title: 'Palak Paneer',
        price: 250
    }),
    new Product({
        title: 'Paneer tikka',
        price: 350
    }),
    new Product({
        title: 'Dal Fry',
        price: 250
    }),
    new Product({
        title: 'Noodles',
        price: 200
    }),
    new Product({
        title: 'Kadai Paneer',
        price: 150
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

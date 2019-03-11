var Product7 = require('../models/desserts');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/menus",{ useNewUrlParser: true});

var  dessert = [
    new Product7({
        title: 'Icecream cup',
        price: 15.00
    }),
    new Product7({
        title: 'Family Pack',
        price: 40.00
    }),
    new Product7({
        title: 'Falooda',
        price: 35.00
    }),
    new Product7({
        title: 'Fruit salad',
        price: 50.50
    }),
    new Product7({
        title: 'Swirls',
        price: 30.50
    }),
    new Product7({
        title: 'Choco Cake',
        price: 50.00
    }),
    new Product7({
        title: 'Pastry',
        price: 30.50
    }),
    new Product7({
       title: 'Pudding',
        price: 35.00
    }),
];

var done = 0;
for (var i = 0; i < dessert.length; i++){
    dessert[i].save(function(err, result) {
        done++;
        if(done === dessert.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}

var Product2 = require('../models/dish2');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/menus",{ useNewUrlParser: true});

var  main1 = [
    new Product2({
        title: 'Normal Roti',
        price: 10.00
    }),
    new Product2({
        title: 'Butter Roti',
        price: 15.00
    }),
    new Product2({
        title: 'Tandoor Roti',
        price: 18.00
    }),
    new Product2({
        title: 'Ghee Roti',
        price: 15.00
    }),
    new Product2({
        title: 'Spl Roti',
        price: 20.00
    }),
    new Product2({
        title: 'Chappati',
        price: 10.00
    }),
    new Product2({
        title: 'Ghee Chappati',
        price: 15.00
    }),
    new Product2({
        title: 'Butter Chappati',
        price: 15.00
    }),
    new Product2({
        title: 'Puri (1 pc)',
        price: 7.00
    }),
    new Product2({
        title: 'Pav (1 pc)',
        price: 5.00
    }),
];

var done = 0;
for (var i = 0; i < main1.length; i++){
    main1[i].save(function(err, result) {
        done++;
        if(done === main1.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}

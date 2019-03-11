var Product3 = require('../models/dish3');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/menus",{ useNewUrlParser: true});

var  main2 = [
    new Product3({
        title: 'Paneer Masala',
        price: 200.00
    }),
    new Product3({
        title: 'Paneer tikka',
        price: 150.00
    }),
    new Product3({
        title: 'Palak Paneer',
        price: 180.00
    }),
    new Product3({
        title: 'Kadhai Paneer',
        price: 150.00
    }),
    new Product3({
        title: 'Paneer Spl',
        price: 170.50
    }),
    new Product3({
        title: 'Veg Kofta',
        price: 150.50
    }),
    new Product3({
        title: 'Channa Masala',
        price: 100.00
    }),
    new Product3({
        title: 'Aloo Jeera',
        price: 120.50
    }),
    new Product3({
        title: 'Veg Rajwadi',
        price: 250.00
    }),
    new Product3({
        title: 'Bhendi Fry',
        price: 100.00
    }),
];

var done = 0;
for (var i = 0; i < main2.length; i++){
    main2[i].save(function(err, result) {
        done++;
        if(done === main2.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}

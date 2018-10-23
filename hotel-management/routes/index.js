var express = require('express');
var router = express.Router();
var Product = require('../models/dish');
var Product2 = require('../models/dish2');
var Product3 = require('../models/dish3');
var Product4 = require('../models/dish4');
var Product5 = require('../models/drinks1');
var Product6 = require('../models/drinks2');
var Product7 = require('../models/desserts');

/* GET home page. */
router.get('/', function(req, res, next) {

  Product.find((err, docs) => {
    var dishes = docs;

    Product2.find((err, docs1) => {
       var main1 = docs1;

      Product3.find((err,docs2)=>{
        var main2 = docs2;

      Product4.find((err,docs3)=>{
        var main3 = docs3; 
      
      Product5.find((err,docs4)=>{
          var drinks = docs4;  

      Product6.find((err,docs5)=>{
        var juices = docs5;   
      
      Product7.find((err,docs6)=>{
        var dessert = docs6;  

       var data = {
        dishes,
        main1,
        main2,
        main3,
        drinks,
        juices,
        dessert
      }

      res.render('hotel/index', {
        data: data
      });

    });

  });

});

});
});
});

});

});
module.exports = router;

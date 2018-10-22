var express = require('express');
var router = express.Router();
var Product = require('../models/dish');
var Product2 = require('../models/dish2');
var Product3 = require('../models/dish3');
var Product4 = require('../models/dish4');

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

       var data = {
        dishes,
        main1,
        main2,
        main3
      }

      res.render('hotel/index', {
        data: data
      });

    });

  });

});

});

});
module.exports = router;

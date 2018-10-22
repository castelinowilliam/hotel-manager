var express = require('express');
var router = express.Router();
var Product = require('../models/dish');
var Product2 = require('../models/dish2')

/* GET home page. */
router.get('/', function(req, res, next) {

  var dishes, main1;
  Product.find((err, docs)=>{
      dishes= docs;
     });

  var main1;
  Product2.find((err,docs1)=>{
    main1=docs1;
  });
  
  var data ={
    dishes,
    main1
  }

  res.render('hotel/index',{data: data})
  });

module.exports = router;

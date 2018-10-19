var express = require('express');
var router = express.Router();
var Product = require('../models/dish');

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find(function(err, docs){
    res.render('hotel/index', { title: 'Express', dishes: docs });
  });
});

module.exports = router;

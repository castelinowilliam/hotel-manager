var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressHbs = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var validator = require('express-validator');
var MongoStore = require('connect-mongo')(session);

var indexRouter = require('./routes/index');
var userRoutes = require('./routes/user');

var app = express();

mongoose.connect("mongodb://localhost:27017/menus",{ useNewUrlParser: true});

require('./config/passport');

// view engine setup
app.engine('.hbs',expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

//app.set('views', path.join(__dirname, 'views'));

var Schema = mongoose.Schema;

var schema = new Schema({
    tableno: {type: Number, required:true},
    start1: {type: String},
    qty1: {type: Number},
    s1: {type: Number},
    start2: {type: String},
    qty2: {type: Number},
    s2: {type: Number},
    main1: {type: String},
    qty3: {type: Number},
    m1: {type: Number},
    main2: {type: String},
    qty4: {type: Number},
    m2: {type: Number},
    main3: {type: String},
    qty5: {type: Number},
    m3: {type: Number},
    drink1: {type: String},
    qty6: {type: Number},
    dr1: {type: Number},
    drink2: {type: String},
    qty7: {type: Number},
    dr2: {type: Number},
    des1: {type: String},
    qty8: {type: Number},
    de1: {type: Number},
    des2: {type: String},
    qty9: {type: Number},
    de2: {type: Number}
});

var order = mongoose.model('myform', schema);

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.urlencoded({ extended: false }));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection}),
  cookie: { maxAge: 180 * 60 * 1000 }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

app.post('/new', function(req, res){
  new order({
    tableno: req.body.tableno,
    start1: req.body.start1,
    qty1: req.body.qty1,
    s1: req.body.s1,
    start2: req.body.start2,
    qty2: req.body.qty2,
    s2: req.body.s2,
    main1: req.body.main1,
    qty3: req.body.qty3,
    m1: req.body.m1,
    main2: req.body.main2,
    qty4: req.body.qty4,
    m2: req.body.m2,
    main3: req.body.main3,
    qty5: req.body.qty5,
    m3: req.body.m3,
    drink1: req.body.drink1,
    qty6: req.body.qty6,
    dr1: req.body.dr1,
    drink2: req.body.drink2,
    qty7: req.body.qty7,
    dr2: req.body.dr2,
    des1: req.body.des1,
    qty8: req.body.qty8,
    de1: req.body.de1,
    des2: req.body.des2,
    qty9: req.body.qty9,
    de2: req.body.de2,
  }).save(function(err, result){
    if(err){
      res.json(err);
    }
    else{
      res.redirect('/');
    }
  });
});

app.get('/view', function(req, res){
  order.find({},function(err, docs){
    if(err){
      res.json(err);
    }
    else{
      res.render('hotel/kitchen',{orders: docs});
    }
  });
});

app.get('/manager', function(req, res){
  order.find({},function(err, doc){
    if(err){
      res.json(err);
    }
    else{
      res.render('hotel/manager',{ordersM: doc});
    }
  });
});


app.get('/manager/delete/:id', function(req, res, next){
  order.findByIdAndDelete({_id:req.params.id}, function(err,delData) {
    if(err){
      res.send('error');
    }else{
      res.redirect("/manager");
    }
  });
});

app.use('/user', userRoutes)
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

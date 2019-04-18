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
var cors = require('cors');
var fs = require('fs');
var templatetopdf = require('html-template-pdf');
let pdf = require('handlebars-pdf');
var DateOnly = require('mongoose-dateonly')(mongoose);
var stripe = require("stripe")("pk_test_I0WfvfmzFwTk2PverDJhYTuT");

var indexRouter = require('./routes/index');
var userRoutes = require('./routes/user');

var app = express();

mongoose.connect("mongodb://localhost:27017/menus",{ useNewUrlParser: true});

require('./config/passport');

// view engine setup
app.use(cors());
app.engine('.hbs',expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');

//app.set('views', path.join(__dirname, 'views'));

var Schema = mongoose.Schema;

var schema = new Schema({
    time: {type: Date, required:true},
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
    de2: {type: Number},
    finaltotal: {type: Number},
    fix:{type: Number}
});

var schema2 = new Schema({
    fn: {type: String},
    ln: {type: String},
    add: {type: String},
    city: {type: String},
    state: {type: String},
    pin: {type: Number},
    mob: {type: Number},
    email: {type: String},
    design: {type: String}
  });
  
var schema3 = new Schema({
  fn1: {type: String},
  ln1: {type: String},
  bid1: {type: String},
  dob1: {type: DateOnly},
  bg: {type: String},
  add1: {type: String},
  add12: {type: String},
  city1: {type: String},
  state1: {type: String},
  pin1: {type: Number},
  email1: {type: String},  
  mobile1: {type: Number},
  land1: {type: Number},
});

var employee = mongoose.model('employee', schema2);

var order = mongoose.model('myform', schema);

var manprof = mongoose.model('manager', schema3);

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
app.set('views', path.join(__dirname, 'views'));

app.use(function(req, res, next){
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

//add orders to database
app.post('/new', function(req, res){
  new order({
    time: new Date(),
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
    finaltotal: req.body.finaltotal,
    fix: req.body.fix,
  }).save(function(err, result){
    if(err){
      res.json(err);
    }
    else{
      res.redirect('/');
    }
  });
});

//adding employee details
app.post('/new2', function (req, res) {
  new employee({
    fn: req.body.fn,
    ln: req.body.ln,
    add: req.body.add,
    city: req.body.city,
    state: req.body.state,
    pin: req.body.pin,
    mob: req.body.mob,
    email: req.body.email,
    design: req.body.design,
  }).save(function(err, result){
    if(err){
      res.json(err);
    }else{
      res.redirect('/employee');
    }
  });
});

//adding manager details
app.post('/new3', (req, res)=>{
  if(req.body._id == ''){
    new manprof({
      fn1: req.body.fn1,
      ln1: req.body.ln1,
      bid1: req.body.bid1,
      dob1: req.body.dob1,
      bg: req.body.bg,
      add1: req.body.add1,
      add12: req.body.add12,
      city1: req.body.city1,
      state1: req.body.state1,
      pin1: req.body.pin1,
      email1: req.body.email1,
      mobile1: req.body.mobile1,
      land1: req.body.land1,
    }).save(function(err, result){
      if(err){
        res.json(err);
      }else{
        res.redirect('user/mprofile');
      }
    });
  }else{
    updateRecord(req, res);
  }
}); 


app.get('/api/profile', (req, res) => {

  console.log("Query date", req.query.date);
  let date = Date.parse(req.query.date);

  console.log(date);

  let date1 = new Date(date);
  let date2 = new Date(date);
  date2.setDate(date1.getDate()+1);

  console.log("Date", date1);
  console.log("Next Date", date2);

  order.find({
    'time': {"$gte": date1, "$lt": date2}
  }, (err, data) => {
    console.log("data", data);

    if(err){
     res.json({
        err
      });
    } else {
      res.json({
        orders: data
      });
    }
  })
})

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

//displaying bills on manager
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

//displaying employee details
app.get('/employee',function(req, res){
  employee.find({}, function (err, doc1) {
    if(err){
      res.json(err);
    }else{
      res.render('user/employee', {emp: doc1});
    }
  }); 
});

//full details of employees
app.get('/display/:id', function (req, res) {
  employee.findById(req.params.id,(err, doc2)=>{
      if(err){
        res.json(err);
      }else{
        res.render('user/display', {detail: doc2});
      }
  });
});

//displaying manager details
app.get('/mprofile',function(req, res){
  manprof.find({}, function (err, mdoc) {
    if(err){
      res.json(err);
    }else{
      res.render('user/mprofile', {man: mdoc});
    }
  }); 
});

//Display for update
app.get('/update/:id', (req, res)=>{
  manprof.findById(req.params.id, (err, doc)=>{
    if(!err){
      res.render('partials/mform',{
        viewTitle: "Update Details",
        prof: doc
      });
    }
  });
});

//Updating Manager Details
function updateRecord(req, res){
  manprof.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc)=>{
    if(!err){
      res.redirect('/mprofile');
    }else{
      console.log(err);
    }
  });
}


//deleting orders
app.get('/manager/delete/:id', function(req, res, next){
  order.findByIdAndDelete({_id:req.params.id}, function(err,delData) {
    if(err){
      res.send('error');
    }else{
      res.redirect("/manager");
    }
  });
});

//deleting employee
app.get('/employee/delete/:id', function(req, res, next){
  employee.findByIdAndDelete({_id:req.params.id}, function(err,delData) {
    if(err){
      res.send('error');
    }else{
      res.redirect("/employee");
    }
  });
});

//payment
app.get('/paysuccess', function (req, res) {
  res.render('partials/paysuccess');
});

app.post('/charge', function (req, res) {
  var token = req.body.stripeToken;
  var chargeAmount = req.body.chargeAmount;
  var charge = stripe.charges.create({
    amount: chargeAmount,
    currency: "inr",
    source: token
  },function (err, charge) {
      if(err & err.type === "StripeCardError"){
        console.log("Your card is declined");
      }
  });
  console.log("Successful");
  res.redirect('/paysuccess');
  //res.jsonp({success: true})
});

//printing the bill in pdf format
app.get('/manager/print/:id', function (req, res, next) {
  //console.log(req.params);
  let orderid = req.params.id;
  //console.log(orderid);
  order.findById(orderid,function(err, doc){
      if(err){
        res.json(err);
      }
      else{
        console.log('Orders', doc);
                let orderTemplate = '<div><center><h2>Indian Flavours</h2></center><hr>'+
                            '<p align="center">{{ doc.time }}</p>'+
                            '<table width="400" height="300" border="1" align="center" backgroundcolor="green">'+
                            '<tr>'+
                            '<th>Food items</th>'+
                            '<th>Quantity</th>'+
                            '<th>Price</th>'+
                            '</tr>'+
                            '<tr>'+
                            '<td>{{ doc.start1 }}</td>'+
                            '<td>{{ doc.qty1 }}</td>'+
                            '<td>{{ doc.s1 }}</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<td>{{ doc.start2 }}</td>'+
                            '<td>{{ doc.qty2 }}</td>'+
                            '<td>{{ doc.s2 }}</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<td>{{ doc.main1 }}</td>'+
                            '<td>{{ doc.qty3 }}</td>'+
                            '<td>{{ doc.m1 }}</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<td>{{ doc.main2 }}</td>'+
                            '<td>{{ doc.qty4 }}</td>'+
                            '<td>{{ doc.m2 }}</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<td>{{ doc.main3 }}</td>'+
                            '<td>{{ doc.qty5 }}</td>'+
                            '<td>{{ doc.m3 }}</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<td>{{ doc.drink1 }}</td>'+
                            '<td>{{ doc.qty6 }}</td>'+
                            '<td>{{ doc.dr1 }}</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<td>{{ doc.drink2 }}</td>'+
                            '<td>{{ doc.qty7 }}</td>'+
                            '<td>{{ doc.dr2 }}</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<td>{{ doc.des1 }}</td>'+
                            '<td>{{ doc.qty8 }}</td>'+
                            '<td>{{ doc.de1 }}</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<td>{{ doc.des2 }}</td>'+
                            '<td>{{ doc.qty9 }}</td>'+
                            '<td>{{ doc.de2 }}</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<td colspan="2">Total</td>'+
                            '<td id="food">{{ doc.finaltotal }}</td>'+
                            '</tr>'+
                            '</table'+
                            '</div>';

        let document = {
          template: orderTemplate,
          context: {
            doc
          },
          path: "./test.pdf"
      }
    
        pdf.create(document)
          .then(response => {
              res.download("test.pdf");
          })
          .catch(error => {
              console.error(error)
          })
        }
    });
  });

app.get('/seats',function(req, res){
  res.render('hotel/seats');
});

app.get('/mprofile',function(req, res){
  res.render('user/mprofile');
});

app.get('/profile',function(req, res){
  res.render('user/profile');
});

app.get('/employee',function(req, res){
  res.render('user/employee');
});

app.get('/form',function(req, res){
  res.render('partials/form');
});

app.get('/mform',function(req, res){
  res.render('partials/mform');
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

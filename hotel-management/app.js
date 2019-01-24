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

//var phantom = require('phantom');

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

/*htmlpdf.convertHTMLFile('hotel/manager.hbs', '../print.pdf',
  function(error, success){
    if(error){
      console.log('Error');
    }else{
      console.log('No Error');
    }
  }
);*/

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
    finaltotal: {type: Number}
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
app.set('views', path.join(__dirname, 'views'));

app.use(function(req, res, next){
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

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
  }).save(function(err, result){
    if(err){
      res.json(err);
    }
    else{
      res.redirect('/');
    }
  });
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

app.get('/manager/print/:id', function (req, res, next) {
  order.find({},function(err, docs){
      if(err){
        res.json(err);
      }
      else{
        //console.log('Orders', docs);

        let orderTemplate = '<div>{{#each docs}}<div>'+
                            '<center><h2>Indian Flavours</h2></center><hr>'+
                            '<p align="center">{{ this.time }}</p>'+
                            '<table style="border:1px solid black" border="1" align="center">'+
                            '<tr>'+
                            '<th>Food items</th>'+
                            '<th>Quantity</th>'+
                            '<th>Price</th>'+
                            '</tr>'+
                            '<tr>'+
                            '<td>{{ this.start1 }}</td>'+
                            '<td>{{ this.qty1 }}</td>'+
                            '<td>{{ this.s1 }}</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<td>{{ this.start2 }}</td>'+
                            '<td>{{ this.qty2 }}</td>'+
                            '<td>{{ this.s2 }}</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<td>{{ this.main1 }}</td>'+
                            '<td>{{ this.qty3 }}</td>'+
                            '<td>{{ this.m1 }}</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<td>{{ this.main2 }}</td>'+
                            '<td>{{ this.qty4 }}</td>'+
                            '<td>{{ this.m2 }}</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<td>{{ this.main3 }}</td>'+
                            '<td>{{ this.qty5 }}</td>'+
                            '<td>{{ this.m3 }}</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<td>{{ this.drink1 }}</td>'+
                            '<td>{{ this.qty6 }}</td>'+
                            '<td>{{ this.dr1 }}</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<td>{{ this.drink2 }}</td>'+
                            '<td>{{ this.qty7 }}</td>'+
                            '<td>{{ this.dr2 }}</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<td>{{ this.des1 }}</td>'+
                            '<td>{{ this.qty8 }}</td>'+
                            '<td>{{ this.de1 }}</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<td>{{ this.des2 }}</td>'+
                            '<td>{{ this.qty9 }}</td>'+
                            '<td>{{ this.de2 }}</td>'+
                            '</tr>'+
                            '<tr>'+
                            '<td colspan="2">Total</td>'+
                            '<td id="food">{{ this.finaltotal }}</td>'+
                            '</tr>'+
                            '</table'+
                            '</div><br><hr><br>{{/each}}</div>';
        // docs.forEach( doc => {
        //   msg = msg.concat(`${new Date(doc.time)}`);
        // });

        let document = {
          template: orderTemplate,
          context: {
            docs
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

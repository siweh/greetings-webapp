const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
let GreetMe = require('./greet');
let app = express();

const greetings = GreetMe(null);

// parse application in ->/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));

// parse application in -> / json
app.use(bodyParser.json());


app.use(session({
    secret : "flashes",
    resave: false,
    saveUninitialized: true
  }));

  app.use(flash());
app.engine('hbs', exphbs({ defaultLayout: false}));
app.set('view engine', 'hbs');

app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('index');
});

app.post('/greeted', function(req, res){
    //res.render('index', { name: req.body.name, language: req.body.language})
    greetings.greeting(req.body.name, req.body.language);
    let greet = greetings.getMessage();
    let errorMsg = greetings.getErrorMsg();
    let greetedPeeps = greetings.greetedPeopleCounter();
    //let reset = greetings.resetCounter();
    res.render('index', {greet, errorMsg, greetedPeeps})
});

// app.get('/', function(req, res){
//     let errorMsg = greetings.getErrorMsg();
//     res.render('index', {errorMsg});
// });

// app.post('/counter/:name', function(req, res){
//     greetings.greeting(req.body.name, req.body.language);

//     let greetedPeeps = greetings.greetedPeopleCounter();
//     res.render('index', {greetedPeeps});
// });

let PORT = process.env.PORT || 4008

app.listen(PORT, function(){
    console.log('App started on port: ', PORT);
});
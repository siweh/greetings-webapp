const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');

let GreetMe = require('./greet');
const { request } = require('express');
let app = express();

const greetings = GreetMe();

// parse application in ->/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));

// parse application in -> / json
app.use(bodyParser.json());

// app.set('trust proxy', 1);

app.use(session({
    cookie:{
        secure: true,
        maxAge:60000
           },
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  }));

  app.use(flash());
app.engine('hbs', exphbs({ defaultLayout: false}));
app.set('view engine', 'hbs');

app.use(express.static('public'));

app.get('/', async function(req, res){
    let greetedPeeps = await greetings.greetedPeopleCounter();
    let greet = greetings.getMessage();
    let errors = greetings.getErrorMsg();
    //console.log(errors);
    req.flash('info', errors);
    res.render('index', { greetedPeeps, errors, greet });
});

app.post('/', async function(req, res){
    await greetings.greeting(req.body.name, req.body.language);
    if (req.body.button === 'greet'){
        await greetings.greetedPeopleCounter();
    }
    if(req.body.button === 'reset'){
        await greetings.resetCounter();
        //console.log('counter refreshed');
        res.redirect('/');
    }
    
    res.redirect('/')
});

app.get('/greeted', async function(req, res){
     
    let greeted = await greetings.getGreetedPeople(); 
    //..console.log(greeted);
      
    res.render('greeted', {greeted});
});

app.get('/test', function(req, res){
    res.render('tests');
});

app.get('/counter/:name', async function(req, res){
    //console.log(req.params.name);
    let greetedPeeps = await greetings.getPersonCounter(req.params.name);
    res.render('userCounter', {greetedPeeps});
});

let PORT = process.env.PORT || 4008

app.listen(PORT, function(){
    console.log('App started on port: ', PORT);
});
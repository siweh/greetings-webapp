const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');

let GreetMe = require('./greet');
let app = express();

const greetings = GreetMe();

// parse application in ->/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true}));

// parse application in -> / json
app.use(bodyParser.json());

app.set('trust proxy', 1);

app.use(session({
    cookie:{
        secure: true,
        maxAge:60000
           },
    store: new RedisStore(),
    secret: 'secret',
    resave: false,
    saveUninitialized: true
  }));

  app.use(function(req,res,next){
    if(!req.session){
        return next(new Error('Oh no')) //handle error
    }
    next() //otherwise continue
    });

  app.use(flash());
app.engine('hbs', exphbs({ defaultLayout: false}));
app.set('view engine', 'hbs');

app.use(express.static('public'));

app.get('/', async function(req, res){
    let greetedPeeps = await greetings.greetedPeopleCounter();
    res.render('index', { greetedPeeps });
});

app.post('/', async function(req, res){
    //res.render('index', { name: req.body.name, language: req.body.language})
    await greetings.greeting(req.body.name, req.body.language);
    
    let greet = greetings.getMessage();
    let errors = greetings.getErrorMsg();
    
    let greetedPeeps = await greetings.greetedPeopleCounter();
    if (req.body.button === 'greet'){
        await greetings.greetedPeopleCounter();
        console.log('Iyayi updade kakuhle i counter now');
    }
    if(req.body.button === 'reset'){
        await greetings.resetCounter();
        //console.log('counter refreshed');
        res.render('index');
    }

    //let reset = greetings.resetCounter();
    //.flash('errorMsg', errors);
    res.render('index', {greet, greetedPeeps, errors})
});

app.get('/greeted', async function(req, res){
     
    let greeted = await greetings.getGreetedPeople(); 
    console.log(greeted);
      
    res.render('greeted', {greeted});
});

app.get('/counter/:name', async function(req, res){
    //console.log(req.params.name);
    let greetedPeeps = await greetings.getPersonCounter(req.params.name);
    res.render('userCounter', {greetedPeeps});
});
// .then(() => console.log('Connected successfully'))
// .catch(e => console.log())
// .finally(() => client.end())

let PORT = process.env.PORT || 4008

app.listen(PORT, function(){
    console.log('App started on port: ', PORT);
});
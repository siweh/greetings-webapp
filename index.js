const express = require('express');
const exphbs = require('express-handlebars');
const usersRoutes = require('./routes/routes');

let app = express();

app.engine('hbs', exphbs({ defaultLayout: false}));
app.set('view engine', 'hbs');

app.use("/", usersRoutes);

let PORT = process.env.PORT || 4008

app.listen(PORT, function(){
    console.log('App started on port: ', PORT);
});
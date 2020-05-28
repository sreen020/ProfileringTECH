const express = require('express');
const app = express();
const port = 8000;

const handlebars = require('express-handlebars');

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'index',
    partialsDir: __dirname + '/views/layouts/partials/',
}));

app.use(express.static(__dirname + '/static'));


app.get('/', home)
app.get('/filter', filter)

app.listen(port, function() {
    console.log('The server is running')
});

function home(req, res) {
    res.render('main');
};

function filter(req, res) {
    res.render('filter');
}




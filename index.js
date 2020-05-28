const express = require('express');
const app = express();
const port = 8000;

var bodyParser = require('body-parser')
const handlebars = require('express-handlebars');

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'index',
    partialsDir: __dirname + '/views/layouts/partials/',
}));

app.use(express.static(__dirname + '/static'));
app.use(bodyParser());

app.get('/', home);
app.get('/filter', filter);


var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/', function(req, resp) {
    resp.end(JSON.stringify(req.body));
});


app.listen(port, function() {
    console.log('The server is running')
});

function home(req, res) {
    res.render('main');
};

app.post('/', urlencodedParser, function(req, res) {
    console.log(req.body);
})

function filter(req, res) {
    res.render('filter');
}




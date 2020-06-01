const express = require('express');
const app = express();
const port = 8000;

let data = {};

var bodyParser = require('body-parser')
const handlebars = require('express-handlebars');

var mongodb = require('mongodb');

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
    searchdb();
    res.render('main', { data: data });
};

app.post('/', urlencodedParser, function(req, res) {
    console.log(req.body);
})

function filter(req, res) {
    res.render('filter');
}


// MONGODB
app.get('/datapage', function(req, res) {
    searchdb({ age: "72" });
})

function searchdb(query) {
    var MongoClient = mongodb.MongoClient;

    var url = 'mongodb://localhost:27017/profileringtech';

    const options = { useUnifiedTopology: true };

    MongoClient.connect(url, options, function(err, db) {
        if (err) {
            console.log("unable to connect", err);
        } else {
            console.log("connected");

            db.db('profileringtech').collection('interests').find(query).toArray(function(err, result) {
                if (err) {
                    res.send(err);
                } else if (result.length) {
                    console.log(result);
                    
                    data = result;
                } else {
                    res.send("No data found");
                }

                db.close();
            })
        }
    })
}

app.get('/newperson', function(req, res) {
    res.render('newperson', {title: 'Add Person'});
});

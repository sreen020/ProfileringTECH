const express = require('express');
const app = express();
const port = 8000;

let data = {};

var bodyParser = require('body-parser')
const handlebars = require('express-handlebars');

var mongodb = require('mongodb');
const objectId = mongodb.ObjectID;

const session = require('express-session');
const cookieParser = require('cookie-parser');

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'index',
    partialsDir: __dirname + '/views/layouts/partials/',
}));

app.use(express.static(__dirname + '/static'));
app.use(bodyParser());

app.use(cookieParser());
app.use(
    session({
      secret: 'amsterdam',
      resave: true,
      saveUninitialized: false,
      cookie: {
        maxAge: 3600000,
      },
    }),
);

// Routing
app.get('/', home);
app.get('/login', test);
app.get('/filter', filter);
app.get('/dashboard', dashboard);



var urlencodedParser = bodyParser.urlencoded({ extended: false })

// connecting to MONGODB
let db = null;
var url = 'mongodb://localhost:27017/profileringtech';

mongodb.MongoClient.connect(url, {
    useUnifiedTopology: true
},
(err, client) => {
    if (err) throw err;
    db = client.db('profileringtech');
    console.log('Connection is succesfully ' + db)
});


// Route functions
app.listen(port, function() {
    console.log('The server is running')
});

function home(req, res) {
    res.render('main', { data: data });
};

function test(req, res) {
    res.render('login')
};

function dashboard(req, res) {

    if (req.session.user) { 
        db.collection('interests').findOne({
            '_id': objectId('5ed0dd00596478196b996130'),
        }, (err, result) => {
            if (err) throw err;
            if (result) {
                console.log(result);
                res.render('dashboard', {
                    data: result
                })
                console.log('Results has been fetched');
            }else {
                console.log('nothing found');
            }
        })
    }
    else res.redirect('/');
};

app.post('/filtered', urlencodedParser, function(req, res) {
    const leetijd = req.body.age;
    console.log(`Dit is de leeftijd: ${leetijd}`);

    db.collection('interests').findOne({
        age: leetijd,
    }, (err, result) => {
        if (err) throw err;
        if (result) {
            console.log(result);
            res.render('filtered', {
                data: result
            })
            console.log('Results has been fetched');
        }else {
            console.log('nothing found');
        }
    })


});

app.post('/dashboard', (req, res) => {

    const data = {
        username: req.body.username,
        password: req.body.password,        
    }

    if(data.username == 'sjoerd' && data.password == 'Amsterdam') {
        req.session.user = data;
        console.log(req.body);
        res.redirect('/dashboard');
    }else {
        res.redirect('/');
    }

})

app.post('/edit', (req, res) => {
    const nieuwedata = {
        id: req.session.user._id,
        name: req.body.name,
        age: req.body.age,
        sex: req.body.sex,
        hobby: req.body.hobby
    };

    db.collection('interests').updateOne({
        '_id': objectId('5ed0dd00596478196b996130')
    }, {
        $set: {
            'name': nieuwedata.name,
            'age': nieuwedata.age,
            'sex': nieuwedata.sex,
            'hobby': nieuwedata.hobby,
        },
    }, (err, result) => {
        if (result) {
            res.redirect('/'); 
        }
    })
});


function filter(req, res) {
    res.render('filter');
}

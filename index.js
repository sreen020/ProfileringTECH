const express = require('express');
const app = express();
const port = 8000;

const handlebars = require('express-handlebars');

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
    layoutsDir: __dirname + '/views/layouts',
    extname: 'hbs',
    defaultLayout: 'planB',
    partialsDir: __dirname + '/views/layouts/partials/',
}));

app.use(express.static('public'))


fakeApi = () => {
    return [
      {
        name: 'Katarina',
        lane: 'midlaner'
      },
      {
        name: 'Jayce',
        lane: 'toplaner'
      },
      {
        name: 'Heimerdinger',
        lane: 'toplaner'
      },
      {
        name: 'Zed',
        lane: 'midlaner'
      },
      {
        name: 'Azir',
        lane: 'midlaner'
      }
    ];
  }

  const list = true;

app.get('/', home)
app.get('/profile', profile)

app.listen(port, function() {
    console.log('The server is running')
});

function home(req, res) {
    res.render('main', {layout: 'index', suggestedChamps: fakeApi(), listExists: true});
};

function profile(req, res) {
    res.send("hello");
}




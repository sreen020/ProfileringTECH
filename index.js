const express = require('express');
const app = express();
const port = 8000;

app.get('/', home)
app.get('/profile', profile)

app.listen(port, function() {
    console.log('The server is running')
});

function home(req, res) {
    res.send("hello world");
}

function profile(req, res) {
    res.send("hello GANGGGGG");
}

const express = require('express');
const app = express();
const port = 4000;
const db = require('./src/config/db/db')
const path = require('path');
const route = require('./src/routes/index');
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')
db.connect();
const phimchieuraps = require('./src/API/models/movies')
const phimbos = require('./src/API/models/phimbo')
app.get('/', function(req, res){
    res.render('partials/home', {layout: 'layouts/main'})
})
// mongoose.set('strictQuery', true);

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'src/resources/view'))
app.use(expressLayouts)
app.set('layout', path.join(__dirname, 'src/resources/view/layouts'))
// parse application/json
app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

route(app);
app.listen(port);
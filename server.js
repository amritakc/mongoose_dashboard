var express = require("express");

var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());
var path = require("path");
app.use(express.static(path.join(__dirname, './client/static')));
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');

require('./server/config/mongoose.js');
var routes_setter = require('./server/config/routes.js');
routes_setter(app);


// mongoose.model('Penguin', PenguinSchema); // We are setting this Schema in our Models as 'User'


app.listen(8000, function() {
    console.log("listening on port 8000");
})



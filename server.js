var express = require("express");
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/basic_penguin');
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded());
var path = require("path");
app.use(express.static(__dirname + "./static"));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var PenguinSchema = new mongoose.Schema({
 name: String,
 age: Number,
 hobby: String
})

mongoose.model('Penguin', PenguinSchema); // We are setting this Schema in our Models as 'User'
var Penguin = mongoose.model('Penguin')

app.get('/', function(req,res){
  Penguin.find({},function(err,penguins){
      res.render('index', {all_penguins:penguins});
    })
})

app.get('/penguins/new', function(req, res) {
    res.render('new');
})

app.post('/penguins', function(req, res) {
  console.log("POST DATA", req.body);
  // create a new User with the name and age corresponding to those from req.body
  var penguin = new Penguin({name: req.body.name, age: req.body.age, hobby: req.body.hobby});
  // Try to save that new user to the database (this is the method that actually inserts into the db) and run a callback function with an error (if any) from the operation.
  penguin.save(function(err) {
    // if there is an error console.log that something went wrong!
    if(err) {
      console.log('something went wrong');
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added a penguin!');
      res.redirect('/');
    }
  })
})

app.post('/penguins/:id', function(req, res) {
  // Penguin.findOne({_id:req.params.id},function(err,penguin){
      Penguin.update({_id:req.params.id},{name:req.body.name, age:req.body.age, hobby:req.body.hobby},function(err,penguin){
        // Penguin.update({name:penguin.name},{name:req.body.name},function(err,penguin){
        // Penguin.update({name:req.body.name},{name:penguin.age},function(err,penguin){
          res.redirect('/');
    })
  // })
})

app.post('/penguins/:id/destroy', function(req, res) {
  // Penguin.findOne({_id:req.params.id},function(err,penguin){
      Penguin.remove({_id:req.params.id},function(err){
        // Penguin.update({name:penguin.name},{name:req.body.name},function(err,penguin){
        // Penguin.update({name:req.body.name},{name:penguin.age},function(err,penguin){
          res.redirect('/');
    })
  // })
})

app.get('/penguins/:id', function(req,res){
  Penguin.findOne({_id:req.params.id},function(err,penguin){
      res.render('show', {penguin:penguin});
    })
})

app.get('/penguins/:id/edit',function(req,res){
  Penguin.findOne({_id:req.params.id},function(err,penguin){
      res.render('edit', {penguin:penguin});
    })
})

app.listen(8000, function() {
    console.log("listening on port 8000");
})



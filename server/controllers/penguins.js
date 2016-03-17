var mongoose = require('mongoose');
var Penguin = mongoose.model('Penguin')

module.exports = {
  show: function(req, res) {
   Penguin.find({},function(err,penguins){
      res.render('index', {all_penguins:penguins});
    })
  },
  create: function(req, res) {
    var penguin = new Penguin({name: req.body.name, age: req.body.age, hobby: req.body.hobby});
    penguin.save(function(err) {
    if(err) {
      console.log('something went wrong');
    } else { // else console.log that we did well and then redirect to the root route
      console.log('successfully added a penguin!');
      res.redirect('/');
     }
    })  
   },
   showone: function(req, res){
    Penguin.findOne({_id:req.params.id},function(err,penguin){
      res.render('show', {penguin:penguin});
    })
   },
   editone: function(req,res){
    Penguin.findOne({_id:req.params.id},function(err,penguin){
      res.render('edit', {penguin:penguin});
    })
   },
   update: function(req, res){
       Penguin.update({_id:req.params.id},{name:req.body.name, age:req.body.age, hobby:req.body.hobby},function(err,penguin){
          res.redirect('/');
    })
   },
   destroy: function(req, res){
      Penguin.remove({_id:req.params.id},function(err){
          res.redirect('/');
    })
   }
 }

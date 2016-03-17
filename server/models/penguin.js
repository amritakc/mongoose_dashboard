var mongoose = require('mongoose');

var PenguinSchema = new mongoose.Schema({
 name: String,
 age: Number,
 hobby: String
})

var Penguin = mongoose.model('Penguin', PenguinSchema)

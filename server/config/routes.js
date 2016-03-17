var penguins = require('../controllers/penguins.js');
module.exports = function(app) {

app.get('/', function(req,res) {
  penguins.show(req,res)
})

app.get('/penguins/new', function(req, res) {
    res.render('new');
})

app.post('/penguins', function(req, res) {
	penguins.create(req,res)
})


app.get('/penguins/:id', function(req,res) {
  	penguins.showone(req,res)
})

app.get('/penguins/:id/edit',function(req,res) {
  	penguins.editone(req, res)
})

app.post('/penguins/:id', function(req, res) {
  	penguins.update(req, res)
})

app.post('/penguins/:id/destroy', function(req, res) {
	penguins.destroy(req, res)    
})

}


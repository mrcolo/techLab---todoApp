const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('view engine', 'jade');

const dbURL = "mongodb://fcolo:hellotechlab@ds125906.mlab.com:25906/todoapp"
const Schema = mongoose.Schema;
var todo = mongoose.model('todo', new Schema({ todo: String }));

mongoose.Promise = global.Promise;
mongoose.connect(dbURL, function(err) {
    if(err) {
        console.log('Connection error');
    }
});
//VIEWS
//basic endpoint
app.get('/', (req, res) => {
  //renders our HTML page
	res.render("../public/home",{title: 'toDo'});
});

//-------------------------------------------------------

//API
//initialize Array
//get my chores
app.get('/getTODO', (req, res) => {
	todo.find({}, function(err, docs) {
    if (!err){
				console.log("Rendering " + docs + "...");
				res.send(docs);

    } else {throw err;}
});

});

app.post('/deleteTODO', (req, res) => {
  //delete todo at req.body.id and if length is 1 just set the element as undefined
	todo.deleteOne({_id: req.body.id}, function (err){
		if(err)
			console.log(err);
		else{
			res.send("Deleted" + req.body.id);
		}
	});
	console.log("Deleted" + req.body.id);

});

//add a todo
app.post('/addTODO', (req, res) => {

	var temp_todo = new todo({todo: req.body.todo})
	console.log(temp_todo)
	temp_todo.save(function(err) {
		if(err){
			console.log(err)
		}else{
			res.send("Added " + req.body.todo)
		}
	})
  console.log("Added " + req.body.todo)

});

//let's start the server
app.listen(3000, () => console.log('server started'));

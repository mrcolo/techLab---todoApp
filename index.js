const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('view engine', 'jade');

//VIEWS
//basic endpoint
app.get('/', (req, res) => {
  //renders our HTML page
	res.render("../public/home",{title: 'toDo'});
});

//-------------------------------------------------------

//API
//initialize Array
var myTODOs = [];
//get my chores
app.get('/getTODO', (req, res) => {
  console.log("Rendering " + myTODOs + "...");
  res.send(myTODOs)
});

app.post('/deleteTODO', (req, res) => {
  //delete todo at req.body.id and if length is 1 just set the element as undefined
  if(myTODOs.length != 1){
    
    myTODOs.splice(req.body.id,req.body.id);
    console.log("Deleted element number " + req.body.id);
    res.send("Deleted element number " + req.body.id);
    
  }
  else{
    
   myTODOs[0] = undefined;
   res.send("Cleared Array");
  }
  
});

//add a todo
app.post('/addTODO', (req, res) => {
  myTODOs.push(req.body.todo);
  console.log("Added " + req.body.todo)
  res.send("Added " + req.body.todo)
});

//let's start the server
app.listen(3000, () => console.log('server started'));
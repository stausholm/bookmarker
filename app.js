const express = require('express');
const homeController = require('./controllers/homeController');



//set up express app
const app = express();

//setup template engine
app.set('view engine', 'ejs');


//use middleware built into express, to serve static files such as css
app.use(express.static('./public'));




// fire controllers
homeController(app);


//error handling middleware
app.use(function(err, req, res, next) {
  console.log(err.message);
  //res.status(422).send({error: err.errors.title.message});
  res.status(422).send({error: err.message});
  //res.status(422).send({error: err});
  //res.status(422).send({errTitle: err.errors.title.message, errLink: err.errors.link.message});
});


//if there's a port specified by the environment (fx. heroku), use that. Else use port 3000
app.listen(process.env.port || 3000, function() {
  console.log('now listening for requests');
});

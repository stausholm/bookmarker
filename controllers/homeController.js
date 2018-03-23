const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Bookmark = require('../models/bookmark');

var urlencodedParser = bodyParser.urlencoded({ extended: false});
var jsonParser = bodyParser.json();

//connect to mongodb
mongoose.connect('mongodb://localhost/bookmarksNew');
//mongoose promises is depricated, so set it to ES6 promises
mongoose.Promise = global.Promise;


mongoose.connection.once('open', function(){
    console.log('connection has been made to boomarksNew DB');
}).on('error', function(error) {
  console.log('connection error:', error);
});

module.exports = function(app) {

//get all documents from db and pass them to the view
app.get('/', function(req, res, next) {
  Bookmark.find({}).then(function(data) {
    Bookmark.count(function(err, count) {
      if (err) throw err;

      var arr = [];
      // loop through all bookmarks and then loop through all their tags.
      // If the tag === -1 (there was no instance of it), push it to arr
      for (var i = 0; i < data.length; i++) {
        var tags = data[i].tags;
        for (var j = 0; j < tags.length; j++) {
          if (arr.indexOf(tags[j]) === -1) { arr.push(tags[j]); }
        }
      }
      // sort arr alphabetically without case sensitivity
      arr.sort(function(a,b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });

      res.render('index', {datas: data, count: count, uniqueTags: arr, title: 'a bookmarker tool'});
    });
  });
});


// find a specific document and pass it to the view, to populate an edit form
app.get('/:id', function(req, res, next) {
  Bookmark.findById({_id: req.params.id}).then(function(data) {
    res.send(data);
  }).catch(next);
});


// create a new document in db
app.post('/', jsonParser, function(req, res, next) {
  //get data from the view and add it to mongodb
  //console.log(req.body);
  // var newBookmark = Bookmark(req.body).save(function(err, data){
  //   if (err) throw err;
  //   res.json(data);
  //   //console.log(data);
  // });
  Bookmark.create(req.body).then(function(data) {
    res.send(data);
  }).catch(next);
  //data.push(req.body);
});


// delete a specific bookmark document from db
app.delete('/:id', function(req, res, next) {
  Bookmark.findByIdAndRemove({_id: req.params.id}).then(function(bookmark) {
    console.log('deleted bookmark');
    res.send(bookmark);
  }).catch(next);
});


// update a specific bookmark document from db. This is used for favoriting as well as updating title, link, and tags
app.put('/:id', jsonParser, function(req, res, next) {
  Bookmark.findByIdAndUpdate({_id: req.params.id}, req.body, {runValidators: true}).then(function(bookmark) {
    console.log('updated bookmark');
    res.send(bookmark);
  }).catch(next);
});
// runValidators: true is needed for schema validation on put requests
// https://stackoverflow.com/questions/15627967/why-mongoose-doesnt-validate-on-update
// http://mongoosejs.com/docs/validation.html#update-validators



} // end module.exports

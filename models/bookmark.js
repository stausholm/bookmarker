const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create bookmark Schema
const BookmarkSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Title field is required'],
    maxlength: [120, 'Title can be no longer than 120 characters'],
    trim: true
  },
  link: {
    type: String,
    required: [true, 'Link field is required'],
    match: [/\./, 'must contain a dot'],
    //https://www.regextester.com/1965
    //match: [/(http[s]?:\/\/)?[^\s\/(["<,>]+\.[^\s0-9[",><]+/g, 'must be a valid URL'],
    // if the value doesn't contain http:// or https:// at index 0, then add it in front of the value
    set: function(url) {
      if (!url) {
        return url;
      } else {
        if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
          url = 'http://' + url;
        }
        return url;
      }
    }
  },
  tags: {
    type: [String],
    default: []
    //match: [/[a-zA-Z0-9]+/g, 'Tags may only contain numbers and letters']
  },
  created: {
    type: Date,
    default: Date.now
  },
  favorite: {
    type: Boolean,
    default: false
  }
});


//create model called User (mongodb collection) based on schema. mongo converts User into users
const Bookmark = mongoose.model('Bookmark', BookmarkSchema);

module.exports = Bookmark;



// end result
//         {
// 	           "id" : new ObjectId(),
//             "title" : "How to make carrotcake - Tastemade",
//             "link" : "http://www.tastemade.com/how-to-carrotcake/",
//             "tags" : ["food","how to","dessert"],
//             "created" : new Date(),
//             "favourite" : false
//         },
//         {
// 	           "id" : new ObjectId(),
//             "title" : "Github Guides",
//             "link" : "https://guides.github.com/",
//             "tags" : ["how to","github"],
//             "created" : new Date(),
//             "favourite" : true
//         }

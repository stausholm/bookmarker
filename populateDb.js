const mongoose = require('mongoose');
const Bookmark = require('./models/bookmark');
mongoose.Promise = global.Promise;

var bookmarksToAdd = [
  {
      "title" : "Stausholm - GitHub",
      "link" : "https://github.com/stausholm",
      "tags" : [
          "Github",
          "Morten"
      ],
      "favorite" : false,
      "__v" : 0
  },
  {
      "title" : "Trianglify Generator",
      "link" : "http://qrohlf.com/trianglify-generator/",
      "tags" : [
          "tag1",
          "triangle"
      ],
      "favorite" : true,
      "__v" : 0
  },
  {
      "title" : "Delaunay triangle pattern maker",
      "link" : "http://msurguy.github.io/triangles/",
      "tags" : [
          "tag2",
          "tagalicious",
          "howTo",
          "triangle",
          "ascii"
      ],
      "favorite" : true,
      "__v" : 0
  },
  {
      "title" : "Favicon & App Icon Generator",
      "link" : "http://www.favicon-generator.org/",
      "tags" : [
          "tag1",
          "tag2",
          "generator"
      ],
      "favorite" : true,
      "__v" : 0
  },
  {
      "title" : "Box Shadow CSS Generator | CSSmatic",
      "link" : "http://www.cssmatic.com/box-shadow",
      "tags" : [
          "tag1",
          "tag3",
          "generator"
      ],
      "favorite" : false,
      "__v" : 0
  },
  {
      "title" : "Random User Generator | Home",
      "link" : "https://randomuser.me/",
      "tags" : [
          "tag1",
          "tag5",
          "user",
          "generator"
      ],
      "favorite" : false,
      "__v" : 0
  },
  {
      "title" : "TEXT-IMAGE.com :: Convert",
      "link" : "http://www.text-image.com/convert/matrix.html",
      "tags" : [
          "ascii",
          "generator",
          "tag1"
      ],
      "favorite" : true,
      "__v" : 0
  },
  {
      "title" : "primitive.js – drawing images with geometric primitives",
      "link" : "https://ondras.github.io/primitive.js/",
      "tags" : [
          "generator"
      ],
      "favorite" : false,
      "__v" : 0
  },
  {
      "title" : "Morten Stausholm on CodePen",
      "link" : "https://codepen.io/Stausholm/",
      "tags" : [
          "Codepen",
          "Morten",
          "tag1"
      ],
      "favorite" : false,
      "__v" : 0
  },
  {
      "title" : "Mortenstausholm.dk",
      "link" : "https://mortenstausholm.dk/",
      "tags" : [
          "Morten",
          "Portfolio"
      ],
      "favorite" : false,
      "__v" : 0
  },
  {
      "title" : "Unsplash - High Res Image DB",
      "link" : "https://unsplash.com/",
      "tags" : [
          "Unsplash",
          "Free",
          "images"
      ],
      "favorite" : false,
      "__v" : 0
  },
  {
      "title" : "nngroup",
      "link" : "https://www.nngroup.com/",
      "tags" : [
          "UX",
          "Research"
      ],
      "favorite" : false,
      "__v" : 0
  },
  {
      "title" : "Google fonts",
      "link" : "https://fonts.google.com/",
      "tags" : [
          "Free",
          "fonts"
      ],
      "favorite" : false,
      "__v" : 0
  }
];

module.exports = function() {
  Bookmark.find({}).then((data)=> {
    if (data.length == 0) {
      console.log('no bookmarks found. populating DB with test bookmarks');
      for (var i = 0; i < bookmarksToAdd.length; i++) {
        let bm = new Bookmark(bookmarksToAdd[i]);
        bm.save().then((x)=> {
          console.log('bookmark created: ' + x.title);
        });
      }
    }
  })
}

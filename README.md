# Node.js Bookmarker
Express application used for storing bookmarks with tags.  
  
:information_source: I started learning Js December 2017. This was created January 2018. Be warned.
  
The app uses ajax requests for all CRUD functions. Bookmarks are stored in a mongodb bookmarks collection.  
```
{
    "_id" : ObjectId("5a86ed87689ee02c4ca5b416"),
    "title" : "Delaunay triangle pattern maker",
    "link" : "http://msurguy.github.io/triangles/",
    "tags" : [ 
        "tag2", 
        "tagalicious", 
        "howTo", 
        "triangle", 
        "ascii"
    ],
    "created" : ISODate("2018-02-16T14:41:11.842Z"),
    "favorite" : true,
    "__v" : 0
}
```

## Setup
Install dependencies
```
npm install
```

Run app 
```
mongod
node app
```
goto http://localhost:3000

## Features
- Add new bookmarks
- Edit and Delete existing bookmarks
- Undo delete within 5 seconds
- Add tags to bookmarks
- Search for bookmarks by name
- Search for bookmarks by tags
- Change theme and layout with localstorage
- favorite bookmarks
- Add to homescreen on mobile with manifest.json
- Model validation
- Toasts to verify actions

## Screenshots
![gjif](https://user-images.githubusercontent.com/33398703/37847353-dde75a56-2ed0-11e8-943a-e8eebaca0d5c.gif)

![ghif](https://user-images.githubusercontent.com/33398703/37847389-fa203198-2ed0-11e8-92a8-6910fd58c40c.gif)

![gsif](https://user-images.githubusercontent.com/33398703/37847425-18ee9308-2ed1-11e8-98ac-4aea863258bf.gif)

![gqif](https://user-images.githubusercontent.com/33398703/37847434-1fa3ed1a-2ed1-11e8-95f4-e33cef122ce9.gif)


## ToDo / Bugs
- Refactor a ton of frontend js
- Tagtyper has a life of its own sometimes :poop:

var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var Article = require('./models/Article.js');

var app = express();
var PORT = process.env.PORT || 8080;

// Run Morgan for Logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));


var mongoDB = 'mongodb://localhost/nytreactDB'

mongoose.connect(mongoDB, function(err) {
// mongoose.connect(mongoDB, function(err) {
  if (err) {
    console.log ('Connection Error to MongoDB: ' + mongoDB + ' . ' + err);
  } else {
    console.log ('You have successfully connected to: ' + mongoDB);
  }
});
// mongoose.connect('mongodb://localhost/nytReactDB');

var db = mongoose.connection;

db.on('error', function (err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function () {
  console.log('Mongoose connection successful.');
});

app.get('/api/remove', function(req, res) {
  console.log('GET /api/remove');
  Article.remove({}, function(err) {
    if(err) {
      res.send('Error removing Article')
    } else {
      res.send('Article has been removed')
    }

  });
});

//this route will get the articles
app.get('/api/get', function(req, res) {
  console.log(' GET  /api/')
  Article.find({}, function(err, doc){
      if(err){
        console.log(err);
      } else {
        res.send(doc);
      }
    })
});

//this will post the articles that we are searching, and then save them
app.post('/api/post', function(req, res){
  var newArticle = new Article(req.body.article);
  console.log('newArticle', newArticle);
  console.log(req.body.article)
  Article.create(newArticle, function(err){
    if(err){
      console.log(err);
    } else {
      res.send('Article has been saved');
    }
  })
});

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
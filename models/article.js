//this will require mongoose to be able to run this fiñe
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//this will create a new schema with all it's components (date, title, url, id)
var ArticleSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now()
  },
  NYTTitle: {
     type:String
  },
  NYTDate: {
     type: String
  },
   NYTUrl: {
     type: String
  },
  NYTId: {
    type: String
  }
});

var Article = mongoose.model('Article', ArticleSchema);

//it will export this file to be able to be use somewhere else
module.exports = Article;
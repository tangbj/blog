var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  _ = require('lodash');

var PostSchema = new Schema({
  title: String,
  text: String,
  created: {
    type: Date,
    default: Date.now
  },
  postType: {
    type: String, 
    default: 'text'
  },
  categories: [],
  others: {type: Schema.Types.Mixed, default: []}
});

mongoose.model('Post', PostSchema);
console.log('creating Post')
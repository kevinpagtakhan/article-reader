var mongoose = require('mongoose');

var storySchema = mongoose.Schema({
  _by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  url: String,
  title: String,
  author: String,
  text: String,
  image: String,
  publishDate: String,
  sentences: [String]
}, {timestamps: true})

var Story = mongoose.model('Story', storySchema);

module.exports = Story;

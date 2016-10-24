var mongoose = require('mongoose');

var storySchema = mongoose.Schema({
  _by: {type: mongoose.Schema.Type.ObjectId, ref: 'User'},
  url: String,
  title: String,
  author: String,
  text: String,
  image: String,
  publishDate: String,
  sentences: [String];
}, {timestamps: true})

var Story = mongoose.model('Story', StorySchema);

module.exports = Story;

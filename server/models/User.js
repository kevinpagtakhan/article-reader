// user model
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var passportLocalMongoose = require('passport-local-mongoose')

var User = new Schema({
  username: String,
  password: String,
  stories: {type: mongoose.Schema.Types.ObjectId, ref: 'Story'}
})

User.plugin(passportLocalMongoose)


module.exports = mongoose.model('User', User)

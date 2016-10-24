var express = require('express');
var router = express.Router();
var User = require('../models/User.js');
var Story = require('../models/Story.js');

var AYLIENTextAPI = require('aylien_textapi');
var textapi = new AYLIENTextAPI({
  application_id: process.env.TA_APP_ID,
  application_key: process.env.TA_KEY
});

router.route('/')
  .get(function(req, res){
    Story.find({}).populate('_by').exec(function(err, stories){
      res.json(err || stories);
    })
  })
  .post(function(req, res){
    var currentUserId = req.user._id;
    textapi.combined({
      "url": req.body.url,
      "endpoint": ["summarize", "extract"]
    }, function(err, result) {
      if (err === null) {
        var article = result.results;
        var newStory = {
          url: req.body.url,
          title: article[0].result.title,
          author: article[0].result.author,
          text: article[0].result.article,
          image: article[0].result.image,
          publishDate: article[0].result.publishDate,
          sentences: article[1].result.sentences
        }

        Story.create(newStory, function(err, story){
          if(err){
            res.json(err);
          } else {
            User.findById(currentUserId, function(err, user){
              if(err) {
                res.json(err);
              } else {
                user.stories.push(story._id);
                user.save(function(err, updatedUser){
                  if(err) {
                    res.json(err);
                  } else {
                    res.json(story);
                  }
                })
              }
            })
          }
        })
      } else {
        res.json(err);
      }
    });
  })

module.exports = router;

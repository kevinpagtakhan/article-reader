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
    textapi.combined({
      "url": req.body.url,
      "endpoint": ["summarize", "extract"]
    }, function(err, result) {
      if (err === null) {
        result.results.forEach(function(r) {
          console.log(r.endpoint + ':');
          console.log(r.result);
        });
      } else {
        console.log(err)
      }
    });
  })

module.exports = router;

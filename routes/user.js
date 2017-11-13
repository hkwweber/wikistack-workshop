'use strict';
var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;


router.get('/', function(req, res, next) {
  User.findAll({})
  .then(function(users) {
    res.render('users', {users});
  })
  .catch(next);
  // res.send('im here!!!');
});

router.get('/:id', function(req, res, next) {

  var userPages = Page.findAll({
    where: {
      authorId: req.params.id
    }
  });
  var userInfo = User.findOne({
    where: {
      id: req.params.id
    }
  });
  Promise.all([userPages, userInfo])
  .then(function(values) {
    res.render('userpage', {
      userpages : values[0],
      userinfo : values[1]
    });
  })
})


module.exports = router;

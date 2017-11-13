'use strict';
var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next){
    res.redirect("/");
})

router.get('/add/', function(req, res, next){
    res.render("addpage");
})

router.get('/:urlTitle', function(req, res, next){
    Page.findOne({
        where: {
            urlTitle : req.params.urlTitle
        }
    })
    .then(function(foundPage){
        console.log(foundPage);
        res.render('wikipage', {foundPage});
    })
    .catch(next);
} )

router.post('/', function(req, res, next){
    // res.json(req.body);
    var page = Page.build({
      title: req.body.title,
      content: req.body.content
    });

    page.save().then(function(page) {
      //res.json(page);
      res.redirect(page.route);
    })

})


module.exports = {
    router: router,
    Page: Page,
    User: User
}


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
    // first we need to get the author name from user input
    // next, we need to see if the author already exists
    // then, if does not exist, create new user in table
    // if does exist, add to existing wiki entries
    User.findOrCreate({
        where: {
            name: req.body.authorName, 
            email: req.body.authorEmail
        }

    }).then(function(values) {
        let user = values[0];

        let page = Page.build({
            title: req.body.title,
            content: req.body.content
          });
      
        return page.save()
        .then(function(page) {
            return page.setAuthor(user);
          });
        })
        .then(function (page) {
          res.redirect(page.route);
        })
        .catch(next);   

})


module.exports = {
    router: router,
    Page: Page,
    User: User
}


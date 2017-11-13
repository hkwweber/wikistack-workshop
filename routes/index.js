'use strict';
var express = require('express');
var router = express.Router();
// var models = require('../models');
// var Page = models.Page;
// var User = models.User;
const wikiRouter = require('./wiki');
const userRouter = require('./user');

router.use('/wiki', wikiRouter.router);
router.use('/user', userRouter);

router.get('/', function(req, res, next){
    wikiRouter.Page.findAll({
    })
    .then(function(foundPages){
        res.render('index', {foundPages});
    })
    .catch(next);
})

module.exports = router;
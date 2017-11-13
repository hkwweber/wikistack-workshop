'use strict';
var express = require('express');
var router = express.Router();

const wikiRouter = require('./wiki');
const userRouter = require('./user');
router.use('/wiki', wikiRouter);
router.use('/user', userRouter);

module.exports = router;

router.get("/", function(req, res, next) {
    res.send("hello");
})
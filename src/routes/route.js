const express = require('express');
const router = express.Router();

const logger = require('../logger/logger')
const helper = require('../utilFile/helper')
const formatter = require('../validatorFile/formatter')

router.get('/test-me', function (req, res) {
    console.log("this is Logger problem ==>",logger.mywelcome());
    console.log("this is helper problem ==>",helper.myAllDate());
    console.log("this is helper problem2 ==>",helper.mygetinfo());
    console.log("this is formatter problem ==>",formatter.mytrim());
    console.log("this is formatter problem2 ==>",formatter.mytrim1());
    res.send('My first ever api!')
});





module.exports = router;
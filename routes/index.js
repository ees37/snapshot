var express = require('express');
var router = express.Router();
var sleep = require('sleep');
var blaster = require('pi-blaster.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
  for (d = 0.1; d < 1; d+=0.1)
  {
    console.log("hello");
    piblaster.setPwm(18,d);
    sleep.sleep(4);
    console.log("switching");
  }
});

module.exports = router;

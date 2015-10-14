var express = require('express');
var router = express.Router();
var blaster = require('pi-blaster.js');
var snap = require('snapshot')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
  snap.snapImage(function() {
    
  });
});

module.exports = router;

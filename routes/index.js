var express = require('express');
var router = express.Router();
var blaster = require('pi-blaster.js');
var snap = require('snapshot/snapshot.js')

/* GET home page. */
router.get('/', function(req, res) {
  snap.snapImage(snapshots, function() {

  });
  res.render('index', { photos: snapshots });
});

module.exports = router;

var express = require('express');
var router = express.Router();
var blaster = require('pi-blaster.js');
var snap = require('snapshot/snapshot.js')

/* GET home page. */
router.get('/', function(req, res) {
  snap.snapImage(function(snapshots) {
    res.contentType('application/json');
    console.log("displayng images");
    res.send('index', { photos: JSON.stringify(snapshots) });
  });
});

module.exports = router;

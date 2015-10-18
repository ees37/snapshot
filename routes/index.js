var express = require('express');
var router = express.Router();
var blaster = require('pi-blaster.js');
var snap = require('snapshot/snapshot.js')

/* GET home page. */
router.get('/', function(req, res) {
  snap.snapImage(function(snapshot) {
    res.contentType('application/json');
    console.log("displayng images");
    //res.render('index', { photo: "/home/snapshot/" + snapshot });
    res.writeHead('200', {'Content-Type': 'image/png'});
    res.end("/home/snapshot/" + snapshot,'binary');
  });
});

module.exports = router;

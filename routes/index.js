var express = require('express');
var app = express();
var router = express.Router();
var blaster = require('pi-blaster.js');
var snap = require('snapshot/snapshot.js');
var dateformat = require('dateformat');
var fs = require('fs');

var PLANT_IMG_FULL_PATH = "/home/ees37/workspace/snapshot/public/images/plants/";
var PLANT_REL_PATH = "/images/plants/";

/* GET home page. */
router.get('/', function(req, res) {
  // get the directory of images to show
  var today = dateformat(new Date(), "mm-dd-yyyy");
  var today_dir = PLANT_IMG_FULL_PATH + today;

  if (fs.existsSync(today_dir))
  {
      var plant_imgs = [];
      var files = fs.readdirSync(today_dir);
      for (i = 0; i < files.length; ++i)
      {
        console.log("adding: " + today_dir + files[i]);
        plant_imgs[i] = PLANT_REL_PATH + today + "/" + files[i];
      }

      res.render('index', {images: plant_imgs});
  }
  else
  {
    fs.mkdirSync("/home/ees37/workspace/snapshot/public/images/plants/" + today );
  }
  //res.render('index');
});

module.exports = router;

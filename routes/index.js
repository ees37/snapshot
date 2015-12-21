var express = require('express');
var app = express();
var router = express.Router();

var snap = require('snapshot/snapshot.js');
var dateformat = require('dateformat');
var fs = require('fs');

var PLANT_IMG_FULL_PATH = "/home/ees37/workspace/snapshot/public/images/plants/";
var PLANT_REL_PATH = "/images/plants/";

/* GET home page. */
router.get('/', function(req, res) {
  // show any images for todays date
    res.redirect('/' + getTodaysDate());
});

router.get(/-/, function(req, res) {
  // show images for the specified date
  showImagesForDate(res, req.url.substring(1));
});

router.get('/take', function(req, res) {
    snap.snapImage(PLANT_IMG_FULL_PATH + getTodaysDate() + "/temp/");
    snap.stitchPhotos(PLANT_IMG_FULL_PATH + getTodaysDate() + "/temp/",
      PLANT_IMG_FULL_PATH + getTodaysDate() + "/" + dateformat(new Date(), "mm-dd-yyyy_h:MM:ss"));

});

function showImagesForDate(res, date)
{
  var today_dir = PLANT_IMG_FULL_PATH + date;

  if (fs.existsSync(today_dir))
  {
      var plant_imgs = [];
      var files = fs.readdirSync(today_dir);
      for (i = 0; i < files.length; ++i)
      {
        console.log("adding: " + today_dir + files[i]);
        plant_imgs[i] = PLANT_REL_PATH + date + "/" + files[i];
      }

      res.render('index', {images: plant_imgs});
  }
  else
  {
    fs.mkdirSync(PLANT_IMG_FULL_PATH + getTodaysDate());
    showImagesForDate(getTodaysDate());
  }
}

function getTodaysDate()
{
  return dateformat(new Date(), "mm-dd-yyyy");
}

module.exports = router;

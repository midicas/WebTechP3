var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { pageTitle: 'Express'});
});

router.get('/description', function(req, res,next){
  res.render('description');
})

module.exports = router;

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users/:userID', function(req, res, next) {
  res.render('profile',{ title: req.params.userID });
});

router.get('/description', function(req, res,next){
  res.render('description');
})

module.exports = router;

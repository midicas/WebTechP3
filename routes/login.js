var express = require('express');
var router = express.Router();
const bcrypt = require("bcrypt")

router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', async function(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    const hash = await bcrypt.hash(password, 13)
    console.log(hash);
    res.render('index',{ title: username + hash});
});

module.exports = router;
const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/home', (req, res) => {
  const context = {
    message:'You are in the home page',
    from:'user'}

  res.render('home', context);
});

module.exports = router;

/* eslint-disable no-undef */
const router = require('express').Router();
const verify = require('./verifyEmail');

router.get('/:token', verify, (req, res) => {
  console.log('utilisateur vérifié');
});


module.exports = router;

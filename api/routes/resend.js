const router = require('express').Router();
const verify = require('./resendToken');

router.post('/', verify, (req, res) => {
  res.send(req.body.email);
  User.findbyOne({ _id: req.body.email })
  console.log('Token renvoyé, veuillez consulter votre email.');
});


module.exports = router;

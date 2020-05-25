const User = require('../models/User');
const Token = require('../models/Token');
const { emailValidation } = require('./validation');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

module.exports = async function (req, res, next) {
  //Validation de l'email et du statut de l'utilisateur avant de renvoyer le jeton de vérification
  const {error} = emailValidation(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  User.findOne({ email: req.body.email }, function (err, user) {
    if (!user) return res.status(400).send('We were unable to find a user with that email.');
    if (user.isVerified) return res.status(400).send('This account has already been verified. Please log in.');

    // Création et sauvegarde d'un jeton vérification + envoie d'un email
    const token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

    // Sauvegarde du jeton
    token.save(function (err) {
      if (err) { return res.status(500).send({ msg: err.message }); }

      // Envoie de l'email
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.NODEMAILER_MAIL,
          pass: process.env.NODEMAILER_MDP
          }
        });
      let mailOptions = {
        from: 'no-reply@disneyengine.com',
        to: user.email,
        subject: 'Verification Email utilisateur',
        text: 'Bonjour,\n\n' + 'Veuillez vérifier votre compte en cliquant sur ce lien: \nhttp:\/\/' + 'localhost:3000' + '\/emailConfirmation\/' + token.token + '\n'
      };
      transporter.sendMail(mailOptions, function (err) {
        if (err) { return res.status(500).send({ msg: err.message }); }
        res.status(200).send('A verification email has been sent to ' + user.email + '.');
      });
    });

  });
}

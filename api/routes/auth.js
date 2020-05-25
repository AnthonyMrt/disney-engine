/* eslint-disable no-unused-vars */
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Token = require('../models/Token');
const { registerValidation, loginValidation, emailValidation } = require('./validation');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const verifyTokenPassword = require('./verifyEmailNewPassword');
const auth = require('./verifyUser');
require('dotenv').config();


router.post('/register', async (req, res) => {
  //Validation des données avant de les utilisées
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Vérification si il n'y pas déjà un utilisateur avec cette adresse dans la base de données
  const emailExist = await User.findOne({ email: req.body.email })
  if (emailExist) return res.status(400).send('Email already exists');

  //Hachage du mot de passe
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //Création du nouvel utilisateur
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });
  try {
    const savedUser = await user.save();
    //res.send(user._id);
    console.log(user._id);
  } catch (err) {
    console.log('erreur');
    res.status(400).send(err);
  }

  const token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

  token.save(function (err) {
    if (err) { return res.status(500).send({ msg: err.message }); }

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
      subject: 'Verification email utilisateur',
      text: 'Bonjour,\n\n' + 'Veuillez vérifier votre compte en cliquant sur ce lien: \nhttp:\/\/' + 'localhost:3000' + '\/emailConfirmation\/' + token.token + '\n'
    };
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        return res.status(500).send({ msg: err.message })
      } else {
        res.send({ userId: user._id, confirmationToken: token.token });
      }
    });
  });
});


//
router.post('/login', async (req, res) => {
  //Validation des données reçues
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //Verification de l'existance de l'email
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send({ msg: 'Email inconnue, veuillez créer un compte pour vous connectez!', email: false});
  //Mot de passe correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send({msg: 'Mot de passe de incorrect!', mdp: false})
  //Verification que l'utilisateur à confirmer son compte
  if (!user.isVerified) {
    res.send({ verified: false })
  }




  //Créer et attribuer un jeton d'aquthentification
  console.log(user.id);
  const findUserToken = await Token.findOne({ _userId: user.id })
  if(!findUserToken) {
    const tokenUser = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
    tokenUser.save(function (err) {
      if (err) { return res.status(500).send({ msg: err.message }); }
    })
  }
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send({ user: user, token: token, name: user.name, verified: true });
  if (token) return console.log('connecté');
});

router.post('/askNewPassword', async (req, res) => {
  const { error } = emailValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send({ msg: 'Email inconnue, veuillez créer un compte pour vous connectez!', email: false });

  if (user.isVerified) {
    const token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });

    token.save(function (err) {
      if (err) { return res.status(500).send({ msg: err.message }); }

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
        subject: 'Demande de changement de mot de passe',
        text: 'Bonjour,\n\n' + 'vous avez demandez à réinitialiser votre mot de passe, veuillez cliquer sur ce lien: \nhttp:\/\/' + 'localhost:3000' + '\/redefinePassword\/' + token.token + ' pour en définir un nouveau' + '\n'
      };
      transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          return res.status(500).send({ msg: err.message })
        } else {
          res.send({ userId: user._id, confirmationToken: token.token });
        }
      });
    });
  }
});


router.post('/changePassword/:token', verifyTokenPassword, async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send({ msg: 'Email inconnue, veuillez créer un compte pour vous connectez!', email: false });

  if (user.isVerified) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    user.password = hashedPassword;
    try {
      const savedUser = await user.save();
      console.log("Mot de passe changez avec succès");
      res.status(200).send({ success: 'mot de passe changer avec succès' })
    } catch (err) {
      res.status(400).send(err);
    }
  }
});

router.get('/user', auth, (req, res) => {
  console.log('utilisateur vérifié');
});



module.exports = router;

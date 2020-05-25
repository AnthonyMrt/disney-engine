const User = require('../models/User');
const Token = require('../models/Token');

module.exports = async function (req, res, next) {
  const tokenValue = await req.params.token;
  console.log(tokenValue);
  try {
    const token = await Token.findOne({ token: tokenValue })
    if (!token) {
      return res.status(400).send({msg: "Aucun token valide n'a été trouvé veuillez. Il se peut qu'il est déjà expiré!", etat: 'noToken'})
    } else {
      console.log(token._userId);
    }
    const user = await User.findOne({ _id: token._userId})
    if (!user) return res.status(400).send({ msg: "Utilisateur introuvable, veuillez recommencer la procédure d'inscription", etat: 'noUser' });
    if (user.isVerified === true) {
      res.status(200).send({msg: "Votre compte à déjà été vérifier, veuillez vous connecter!", etat: 'alreadyDone'});
      console.log('alreadyDone');
    }
    // Vérification et sauvegarde du statut de l'utilisateur.
    user.isVerified = true;
    user.save()
    res.status(200).send({msg: "The account has been verified. Please log in.", etat: 'done'});
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
}

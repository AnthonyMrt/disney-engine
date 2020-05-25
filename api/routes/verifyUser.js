const User = require('../models/User');
const Token = require('../models/Token');

module.exports = async function(req, res, next){
  const tokenValue = await req.header('authToken');
  if(!tokenValue) return res.status(401).send('Accès refusé!');
  console.log(tokenValue);

  try {
    const token = await Token.findOne({ _userId: tokenValue })
    if (!token) {
      return res.status(400).send({msg: "Aucun token valide n'a été trouvez pour cet utilisateur. Il se peut qu'il est déjà expiré!", etat: 'noToken'})
    } else {
      console.log('Token valide');
    }
    const user = await User.findOne({ _id: token._userId})
    if (!user) {
      return res.status(400).send({msg: "utilisateur introuvable, veuillez recommencez la procédure d'inscription", etat:'userNotFind'})
    } else {
      user['password'] = undefined
      user['date'] = undefined
      user['__v'] = undefined
      delete user['password']
      delete user['date']
      delete user['__v']
      console.log(user);
      res.status(200).send({user:user})
      next();
    }
  } catch (err) {
    res.status(400).send('Identification failed')
  }
}

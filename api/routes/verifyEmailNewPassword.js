const User = require('../models/User');
const Token = require('../models/Token');

module.exports = async function (req, res, next) {
  const tokenValue = await req.params.token;
  console.log(tokenValue);
  try {
    const token = await Token.findOne({ token: tokenValue })
    if (!token) {
      return res.status(400).send('We were unable to find a valid token. Your token my have expired.')
    } else {
    }
    const user = await User.findOne({ _id: token._userId})
    if (!user) return res.status(400).send('We were unable to find a user for this token.');

    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
}

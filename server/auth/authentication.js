const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");


async function authentication(req, res, next) {

  try {
      const access_token = req.headers.authorization;
      console.log(access_token)
      if (!access_token) throw { name: 'Unauthenticated' };
      const dataToken = verifyToken(access_token.replace('Bearer ', ''));
      console.log(dataToken, "<<< ini token")
      if (!dataToken) throw { name: 'Unauthenticated' };
      const user = await User.findByPk(dataToken.id);
      if (!user) throw { name: 'Unauthenticated' };
      req.user = { id: user.id, email: user.email, role: user.role };
      next();
    } catch (error) {
      next(error);
    }
  }
module.exports = authentication;
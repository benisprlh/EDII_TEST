const { verifyPass } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async register(req, res, next) {
    const { email, password } = req.body;
    console.log(email, password)

    try {
      const user = await User.create({ email, password, role: "user" });

      res.status(201).json({ message: "Register berhasil" });
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      if (!email) {
        throw {
          name: "validationError",
          message: "Email or Password is wrong",
        };
      }
      if (!password) {
        throw {
          name: "validationError",
          message: "Email or Password is wrong",
        };
      }

      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "invalidUser", message: "Email or Password is Invalid" };
      }

      const isPassword = verifyPass(password, user.password);
      if (!isPassword) {
        throw { name: "invalidUser", message: "Email or Password is Invalid" };
      }

      const access_token = signToken({ id: user.id, role: user.role });

      res.status(201).json({ access_token });

      res.status(201).json({ message: "Login berhasil" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController

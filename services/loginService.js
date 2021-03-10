const mongoose = require("mongoose");
const BusinessError = require("../utils/errors/BusinessError");
mongoose.set("useFindAndModify", false);
const config = require("../config/auth.config");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

class LoginService {
  constructor() {
    if (!mongoose) {
      throw new BusinessError("Objeto mongoose informado não é válido!");
    }
    this.userModel = mongoose.model("userModel");
    this.roleModel = mongoose.model("roleModel");
  }

  /* Retorna lista LegalPerson com os dados NaturalPerson populados em progresso, caso exista o usuário */
  async getSignin(req, res) {
    await this.userModel
      .find({ username: req.body.username })
      .then((user) => {
        if (!user || user.length === 0) {
          res.status(404).json({
            "status": "401",
            "error": "Usuário inválido!"
          });
          return;
        }
        user = user[0];

        var passwordIsValid = bcrypt.compareSync(
          req.body.password,
          user.password
        );

        if (!passwordIsValid) {
          res.status(404).json({
            "status": "402",
            "error": "Senha inválida!"
          });
          return;
        }

        var token = jwt.sign({ id: user.code }, config.secret, {
          expiresIn: 86400, // 24 hours
        });

        var authorities = [];
        const rolesUser = this.roleModel
          .find({ _id_user: user._id.toString() })
          .then((roles) => {
            for (let i = 0; i < roles.length; i++) {
              authorities.push("ROLE_" + roles[i].name.toUpperCase());
            }
            res.status(200).json({
              id: user.id,
              username: user.username,
              email: user.email,
              roles: authorities,
              accessToken: token,
            });
            return;
          });
      })
      .catch((err) => {
        //res.status(500).send({ message: err.message });
        throw new BusinessError(err.message, 500);
      });
  }
}

module.exports = LoginService;

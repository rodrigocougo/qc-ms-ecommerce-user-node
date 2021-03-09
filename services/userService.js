const mongoose = require("mongoose");
const BusinessError = require("../utils/errors/BusinessError");
mongoose.set("useFindAndModify", false);

var bcrypt = require("bcryptjs");

class UserService {
  constructor() {
    if (!mongoose) {
      throw new BusinessError("Objeto mongoose informado não é válido!");
    }
    this.userModel = mongoose.model("userModel");
  }

  /* Retorna lista LegalPerson com os dados NaturalPerson populados em progresso, caso exista o usuário */
  async getAllRegisters() {
    let model = await this.userModel
      .find()
      .then(function (model) {
        /* for (let i = 0; i < model.length; i++) {          
          delete model["password"];
          console.log(111, model[i])
        }
        delete model["password"];
        console.log(222, model) */
        return model;
      })
      .catch(function (err) {
        throw new BusinessError("Falha na busca", 400);
      });
    return model;
  }

  async getRegister(id) {
    let model = await this.userModel
      .find({ _id: id })
      .then(function (model) {
        delete model["password"];
        return model;
      })
      .catch(function (err) {
        throw new BusinessError("Registro não encontrado", 400);
      });
    return model;
  }

  async insertRegister(body) {
    const roles = body.roles;
    delete body["roles"];
    body.password = bcrypt.hashSync(body.password, 8);
    const modelList = await await this.userModel
      .create(body)
      .then(function (modelList) {
        var authorities = [];
        //return modelList;
        /* await roles.forEach(element => { */
        for (const element of roles) {
          const roleModel = mongoose.model("roleModel");
          roleModel
            .create({
              name: element,
              _id_user: modelList._id,
            })
            .then(function (modelListRole) {
              //return modelList;
              console.log(1, modelListRole.name)
              authorities.push("ROLE_" + modelListRole.name.toUpperCase());
            })
            .catch(function (err) {
              throw new BusinessError("Erro ao inserir as roles", 400);
            });
        }
        modelList.roles = roles;
        return modelList;
      })
      .catch(function (err) {
        throw new BusinessError("Registro não encontrado", 400);
      });
    return modelList;
  }

  async updateRegister(id, body) {
    const model = await this.findRegister(id);
    if (!model || model.length != 1)
      throw new BusinessError("Erro ao carregar usuário", 400);
    const result = await this.userModel
      .findByIdAndUpdate(model[0]._id, body, { new: true })
      .then(function (result) {
        return result;
      })
      .catch(function (err) {
        throw new BusinessError("Registro não encontrado", 400);
      });
    return result;
  }

  /* Funções agregadas */
  async findRegister(id) {
    return await this.userModel.find({ _id: id });
  }

  async findRegisterFilter(filter) {
    return await this.userModel.find(filter);
  }
}

module.exports = UserService;

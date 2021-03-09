const UserService = require('../services/userService');
const BusinessError = require('../utils/errors/BusinessError');

class UserController {
  
  async getAllUserController(req, res) {
    try {
      const response = await new UserService().getAllRegisters();
      return res.json(response);
    } catch (error) {
      if (error instanceof BusinessError) {
        return res.status(error.status).json({ error: error.message });
      }
      throw error;
    }
  }

  async getUserController(req, res) {
    try {
      const response = await new UserService().getRegister(req.params.id);
      return res.json(response);
    } catch (error) {
      if (error instanceof BusinessError) {
        return res.status(error.status).json({ error: error.message });
      }
      throw error;
    }
  }

  async insertUserController(req, res) {
    try {
      const response = await new UserService().insertRegister(
        req.body
      );
      console.log(123, console)
      return res.json(response);
    } catch (error) {
      return res.json({ error: "erro ao inserir registro" });
      /* if (error instanceof BusinessError) {
        return res.status(error.status).json({ error: error.message });
      }
      throw error; */
    }
  }

  async updateUserController(req, res) {
    try {
      const response = await new UserService().updateRegister(
        req.query.id,
        req.body
      );
      return res.json(response);
    } catch (error) {
      return res.json({ error: "erro ao atualizar registro" });
      /* if (error instanceof BusinessError) {
        return res.status(error.status).json({ error: error.message });
      }
      throw error; */
    }
  }

}

module.exports = new UserController();
const LoginService = require('../services/loginService');
const BusinessError = require('../utils/errors/BusinessError');

class LoginController {
  
  async getAllLoginController(req, res) {
    try {
      const response = await new LoginService().getSignin(req, res);
      return response;
    } catch (error) {
      if (error instanceof BusinessError) {
        return res.status(error.status).json({ error: error.message });
      }
      throw error;
    }
  }

}

module.exports = new LoginController();
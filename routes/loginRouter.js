const express = require('express');
const LoginController = require('../controllers/loginController'); 

const router = express.Router();

router.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post('/signin', LoginController.getAllLoginController);                // - OK

module.exports = router;
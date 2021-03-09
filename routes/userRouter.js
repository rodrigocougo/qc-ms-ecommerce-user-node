const express = require("express");
const UserController = require("../controllers/userController");
const { authJwt } = require("../middleware");

const router = express.Router();

router.get("/registers", UserController.getAllUserController); // - OK
router.get("/register/:id", UserController.getUserController); // - OK
router.post("/register", UserController.insertUserController); // - OK
router.put("/register", UserController.updateUserController);
router.get("/test", [authJwt.verifyToken], (req, res) => {
  res.status(200).send("User Content.");
});

module.exports = router;

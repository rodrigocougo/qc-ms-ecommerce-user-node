const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Model para registro dos doadores
const schema = new Schema({
  username: String,
  email: String,
  password: String,
  code: String,
  roles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "roleModel",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("loginModel", schema);

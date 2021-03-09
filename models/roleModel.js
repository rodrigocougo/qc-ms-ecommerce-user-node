const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Model para registro dos doadores
const schema = new Schema({
  name: String,
  _id_user: String, 
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("roleModel", schema);

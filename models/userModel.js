const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Model para registro dos doadores
const schema = new Schema({
  code: {
    type: String,
    unique: [true, "Já existe este code em nossa base de dados"],
    size: 80,
    name: "user.label.id",
  },
  name: { type: String, size: 150, name: "user.label.name" },
  username: { type: String, size: 20, name: "user.label.username" },
  email: {
    type: String,
    unique: [true, "Já existe este e-mail em nossa base de dados"],
    size: 150,
    name: "user.label.email",
  },
  address: {
    street: { type: String, size: 150, name: "user.label.street" },
    suite: { type: String, size: 150, name: "user.label.suite" },
    city: { type: String, size: 150, name: "user.label.city" },
    zipcode: { type: String, size: 10, name: "user.label.zipcode" },
    geo: {
      lat: { type: String, size: 150, name: "user.label.lat" },
      lng: { type: String, size: 150, name: "user.label.lng" },
    },
  },
  phone: { type: String, size: 150, name: "user.label.phone" },
  website: { type: String, size: 150, name: "user.label.website" },
  company: {
    name: { type: String, size: 150, name: "user.label.name" },
    catchPhrase: { type: String, size: 150, name: "user.label.catchPhrase" },
    bs: { type: String, size: 150, name: "user.label.bs" },
  },
  password: { type: String, size: 11, name: "user.label.password" },
  roles: [],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("userModel", schema);

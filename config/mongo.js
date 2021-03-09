const mongoose = require("mongoose");

const { DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME } = process.env;

mongoose.connect(
  //`mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
  `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`,
  {
    /* useUnifiedTopology: true, */
  useNewUrlParser: true
  }
);

mongoose.connection.on("error", () => console.error("connection error:"));
mongoose.connection.once("open", () => console.log("database connected"));

/* const mongooseOptions = {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
};

mongoose.connect('mongodb://127.0.0.1:27017/db-ms-user-node', mongooseOptions);

mongoose.connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
}) */

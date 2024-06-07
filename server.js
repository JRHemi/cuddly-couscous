const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register.js");
const signin = require("./controllers/siginin.js");
const profile = require("./controllers/profile.js");
const image = require("./controllers/image.js");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1", //this is the address for local host
    port: 5432,
    user: "postgres",
    password: "test",
    database: "'smart-brain'",
  },
  debug: true,
});

db.select("*")
  .from("users")
  .then((data) => {
    // console.log(data);
  });

const app = express();
app.use(express.json());
app.use(cors());

app.post("/signin", (req, res) => {
  signin.handelSignin(req, res, db, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
})  

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.get("/profile/:id", (req, res) => {
  profile.handelProfileGet(req, res, db);
});

app.put("/image", (req, res) => {
  image.handelImage(req, res, db);
});

app.post('/imageurl', (req, res) => { 
  image.handleApiCall(req, res);
});

// bcrypt.hash("bacon", null, null, function (err, hash) {
//   // Store hash in your password DB.
// });

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function(err, res) {
//     // res = false
// });
const PORT = process.env.PORT
app.listen(PORT || 3000, () => {
  console.log(`App running: port ${PORT}`);
});

// --> res = this is woeking
// signin --> POST = success/fail
// register --> POST = user
// profile/:userId --> GET = user info
// image --> PUT --> user

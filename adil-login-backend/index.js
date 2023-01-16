const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect(
  "mongodb://127.0.0.1:27017/myloginapp",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Database Connected");
  }
);

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const productSchema = mongoose.Schema({
  id: Number,
  name: String,
});

const User = new mongoose.model("User", userSchema);
const Product = new mongoose.model("Product", productSchema);

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          //create and sign token
          const token = jwt.sign({ id: user._id }, SECRET_KEY);
          res.send({ message: "Login Successfull", user: user, token: token });
        } else {
          res.send({ message: "Incorrect Password" });
        }
      });
    } else {
      res.send({ message: "No user Found" });
    }
  });
});

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  User.findOne({ email: email }, (err, user) => {
    if (user) {
      res.send({ message: "User already registerd" });
    } else {
      bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hashedPassword) => {
          const user = new User({
            name,
            email,
            password: hashedPassword,
          });
          user.save((err) => {
            if (err) {
              res.send(err);
            } else {
              res.send({ message: "Regitered Successfully Now Login" });
            }
          });
        });
    }
  });
});

app.use((req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).send({ message: "Unauthorized" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
});

app.listen(4000, () => {
  console.log("Back End started at port 4000");
});

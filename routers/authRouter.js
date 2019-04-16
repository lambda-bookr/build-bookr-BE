const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../data/helpers/users-model.js");
const secret = process.env.SECRET || "It's a secret";

router.post("/register", async (req, res) => {
  let { username, password, firstName, lastName } = req.body;
  if (!username || !password || !firstName || !lastName) {
    res.status(401).json({ message: "Please enter valid credentials." });
  } else {
    password = bcrypt.hashSync(password, 8);
    try {
      const newUser = await db.create({
        username,
        password,
        first_name: firstName,
        last_name: lastName
      });
      if (newUser) {
        const token = generateToken(newUser.id, username);
        res
          .status(201)
          .json({ message: `Welcome ${username}!`, token, userID: newUser.id });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: `Your user could not be created ${error}.` });
    }
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(401).json({ message: "Please enter valid credentials." });
  } else {
    try {
      const user = await db.findByUser(username);
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user.id, username);
        res
          .status(201)
          .json({ message: `Welcome ${username}!`, token, userID: user.id });
      } else {
        res.status(401).json({ message: "Username or password is incorrect." });
      }
    } catch (error) {
      res.status(500).json({ message: `Login failed ${error}.` });
    }
  }
});

function generateToken(id, username) {
  const payload = {
    id,
    username
  };
  const options = {
    expiresIn: "7d"
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;

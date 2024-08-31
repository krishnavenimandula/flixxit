const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  addToLikedMovies,
  getLikedMovies,
  removeFromLikedMovies,
  addToPlan,
  getPlan,
  getUserProfile,
} = require("../controllers/UserController");

const SECRET_KEY = process.env.JWT_PRIVATE_KEY;
router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(409)
        .send({ message: "User with given email already exist" });
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

router.get("/liked/:email", async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token" });
    }
    try {
      const { email } = req.params;
      const user = await User.findOne({ email });
      if (user) {
        return res.json({ msg: "success", movies: user.likedMovies });
      } else {
        return res
          .status(404)
          .json({ msg: "User with given email not found." });
      }
    } catch (error) {
      return res.status(500).json({ msg: "Error fetching movies." });
    }
  });
});
router.post("/add", addToLikedMovies);
router.put("/remove", removeFromLikedMovies);
router.post("/add/plan", addToPlan);
router.get("/plan/:email", getPlan);
router.get("/profile/:email", getUserProfile);

module.exports = router;

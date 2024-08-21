const router = require("express").Router();
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const {
  addToLikedMovies,
  getLikedMovies,
  removeFromLikedMovies,
} = require("../controllers/UserController");

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
  try {
    const { email } = req.params;
    const user = await await User.findOne({ email });
    if (user) {
      return res.json({ msg: "success", movies: user.likedMovies });
    } else return res.json({ msg: "User with given email not found." });
  } catch (error) {
    return res.json({ msg: "Error fetching movies." });
  }
});
router.post("/add", addToLikedMovies);
router.put("/remove", removeFromLikedMovies);

module.exports = router;

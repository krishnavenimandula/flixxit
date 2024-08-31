const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_PRIVATE_KEY;

// Helper function to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Failed to authenticate token" });
    }

    req.user = decoded;
    next();
  });
};

module.exports.getLikedMovies = async (req, res) => {
  verifyToken(req, res, async () => {
    try {
      const { email } = req.params;
      const user = await User.findOne({ email });
      if (user) {
        return res.json({ msg: "success", movies: user.likedMovies });
      } else return res.json({ msg: "User with given email not found." });
    } catch (error) {
      return res.json({ msg: "Error fetching movies." });
    }
  });
};

module.exports.getPlan = async (req, res) => {
  verifyToken(req, res, async () => {
    try {
      const { email } = req.params;
      const user = await User.findOne({ email });
      if (user) {
        return res.json({ msg: "success", plan: user.plan });
      } else return res.json({ msg: "User with given email not found." });
    } catch (error) {
      return res.json({ msg: "Error fetching plan." });
    }
  });
};

module.exports.addToLikedMovies = async (req, res) => {
  verifyToken(req, res, async () => {
    try {
      const { userEmail, data } = req.body;
      const user = await User.findOne({ email: userEmail });
      if (user) {
        const { likedMovies } = user;
        const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id);
        if (!movieAlreadyLiked) {
          await User.findByIdAndUpdate(
            user._id,
            {
              likedMovies: [...user.likedMovies, data],
            },
            { new: true }
          );
        } else
          return res.json({ msg: "Movie already added to the liked list." });
      } else await User.create({ userEmail, likedMovies: [data] });
      return res.json({ msg: "Movie successfully added to liked list." });
    } catch (error) {
      console.log(error);
      return res.json({ msg: "Error adding movie to the liked list" });
    }
  });
};

module.exports.addToPlan = async (req, res) => {
  verifyToken(req, res, async () => {
    try {
      console.log(req.body);
      const { userEmail, data } = req.body;
      const user = await User.findOne({ email: userEmail });
      console.log(user);
      if (user) {
        const { plan } = user;
        const planData = plan.find((plan) => plan === data.planName);
        if (!planData) {
          await User.findByIdAndUpdate(
            user._id,
            {
              plan: [...user.plan, data],
            },
            { new: true }
          );
        } else return res.json({ msg: "Plan already added" });
      } else await User.create({ userEmail, plan: [data] });
      return res.json({ msg: "Plan successfully added." });
    } catch (error) {
      console.log(error);
      return res.json({ msg: "Error adding plan" });
    }
  });
};

module.exports.removeFromLikedMovies = async (req, res) => {
  verifyToken(req, res, async () => {
    try {
      const { email, movieId } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        const movies = user.likedMovies;
        const movieIndex = movies.findIndex(({ id }) => id === movieId);
        if (movieIndex === -1) {
          return res.status(400).send({ msg: "Movie not found." });
        }
        movies.splice(movieIndex, 1);
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: movies,
          },
          { new: true }
        );
        return res.json({ msg: "Movie successfully removed.", movies });
      } else return res.json({ msg: "User with given email not found." });
    } catch (error) {
      return res.json({ msg: "Error removing movie from the liked list" });
    }
  });
};

module.exports.getUserProfile = async (req, res) => {
  verifyToken(req, res, async () => {
    const { email } = req.params;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const planStartDate = user.plan[0]?.planDate
        ? new Date(user.plan[0].planDate)
        : null;
      console.log(planStartDate);
      let planEndDate;
      if (planStartDate != null) {
        planEndDate = new Date(planStartDate);
        planEndDate.setFullYear(planEndDate?.getFullYear() + 1);
      }

      res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        currentPlan: user.plan[0]?.planName,
        planStartDate:
          planStartDate != null ? planStartDate?.toISOString() : "",
        planEndDate: planEndDate != null ? planEndDate?.toISOString() : "",
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  });
};

require("dotenv").config();
const express = require("express");

const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const app = express();
// Database connection
connection();

// Middleware
const corsOptions = {
  origin: "https://flixxit-one.vercel.app", // Frontend origin, replace with your actual frontend URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  credentials: true, // Allow credentials if needed (e.g., cookies)
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

// // Handle preflight requests for all routes
app.options("*", cors(corsOptions));

// app.options("*", (req, res) => {
//   res.sendStatus(200);
// });

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));

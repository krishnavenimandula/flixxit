require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

// Database connection
connection();

// Middleware
const corsOptions = {
  origin: "*", // Frontend origin
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  //  credentials: true, // Allow credentials (cookies, authorization headers)
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options("*", cors(corsOptions));

app.options("*", (req, res) => {
  res.sendStatus(200);
});

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));

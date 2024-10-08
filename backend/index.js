require("dotenv").config();
const express = require("express");

const cors = require("cors");
const connection = require("./db.js");
const userRoutes = require("./routes/user.js");
const authRoutes = require("./routes/auth.js");
const app = express();
const port = process.env.PORT || 8080;
// Database connection

// Middleware
// const corsOptions = {
//   origin: "*", // Frontend origin, replace with your actual frontend URL
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed methods
//   allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
//   credentials: true, // Allow credentials if needed (e.g., cookies)
// };

// // Apply CORS middleware globally
// app.use(cors(corsOptions));

// // // Handle preflight requests for all routes
// app.options("*", cors(corsOptions));
app.use(express.json());
app.use(cors());

connection();
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*"); // Allow your frontend origin
//   res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.header("Access-Control-Allow-Credentials", "true"); // If you're using cookies or auth headers
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200); // Preflight request should end with 200
//   }
//   next();
// });

// app.options("*", (req, res) => {
//   res.sendStatus(200);
// });

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));

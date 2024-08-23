require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

// app.use(
//   cors({
//     origin: "*", // Allow requests from this origin
//     methods: "GET,POST,PUT,DELETE",
//     allowedHeaders: "Content-Type,Authorization",
//     credentials: true, // If you are sending cookies or authorization headers
//   })
// );

//connection

connection();

//middleware

app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://flixxit-one.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");
  res.sendStatus(200);
});

app.use(
  cors({
    origin: "https://flixxit-one.vercel.app", // Your frontend origin
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
    credentials: true, // Allow cookies/auth headers
  })
);

app.use(express.json());

//routes

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening on port ${port}`));

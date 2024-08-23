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

app.use(express.json());
app.use(
  cors({
    origin: "*", // Replace with your frontend domain for more security
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization",
  })
);

//routes

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening on port ${port}`));

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const users = require("./routes/api/users");
const stocks = require("./routes/api/stocks");

const app = express();

// Body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// DB config
const db = require("./config/keys").mongoURI;

// connect to mongoDb
mongoose
  .connect(db)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport.js")(passport);

// use routes
app.use("/api/users", users);
app.use("/api/stocks", stocks);

const port = process.env.PORT || 3030;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const express = require("express");
const { json } = require("express/lib/response");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load model
const Stock = require("../../models/Stock");

// @route GET api/stock/test
// @desc Test stocks route
// @access Public
router.get("/test", (req, res) => {
  res.json({
    status: 200,
    msg: "Test page",
  });
});

// @route GET api/stocks
// @desc Get all stock
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Stock.find()
      .sort({ date: -1 })
      .then((stocks) => {
        if (!stocks) {
          errors.nostocks = "No stocks found";
          return res.status(404).json(errors);
        }
        res.json(stocks);
      })
      .catch((err) => json.status(404).json({ nouser: "No user found" }));
  }
);

// @route   POST api/stocks/like/:id
// @desc    Like stock
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Stock.findById(req.params.id)
      .then((stock) => {
        if (
          stock.likes.filter((like) => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyliked: "User already liked this post" });
        }

        // Add user id to likes array
        stock.likes.unshift({ user: req.user.id });

        stock.save().then((stock) => res.json(stock));
      })
      .catch((err) =>
        res.status(404).json({ stocknotfound: "No stock found" })
      );
  }
);

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Stock.findById(req.params.id)
      .then((stock) => {
        if (
          stock.likes.filter((like) => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res
            .status(400)
            .json({ notliked: "You have not yet liked this stock" });
        }

        // Get remove index
        const removeIndex = stock.likes
          .map((item) => item.user.toString())
          .indexOf(req.user.id);

        // Splice out of array
        stock.likes.splice(removeIndex, 1);

        // Save
        stock.save().then((stock) => res.json(stock));
      })
      .catch((err) =>
        res.status(404).json({ stocknotfound: "No stock found" })
      );
  }
);

module.exports = router;

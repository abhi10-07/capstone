const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StockSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  logo: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Stock = mongoose.model("stock", StockSchema);

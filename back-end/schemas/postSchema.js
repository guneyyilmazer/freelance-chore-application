const mongoose = require("mongoose");
const jobTypes = new mongoose.Schema({
  cleaning: Boolean,
  cuttingGrass: Boolean,
  movingHeavyObjects: Boolean,
  walkingTheDog: Boolean,
  plumbering: Boolean,
});
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  type: { type: jobTypes, required: true },
  money: { type: Number, required: true },
});

module.exports = new mongoose.model("Post", postSchema);

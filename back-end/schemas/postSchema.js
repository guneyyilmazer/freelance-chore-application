const mongoose = require("mongoose");
const { jobTypes } = require("../jobTypes");
const jobTypesSchema = new mongoose.Schema({
  cleaning: Boolean,
  cuttingGrass: Boolean,
  movingHeavyObjects: Boolean,
  walkingTheDog: Boolean,
  plumbering: Boolean,
});
const postSchema = new mongoose.Schema({
  user: { type: String, required: true },
  title: { type: String, required: true },
  description: String,
  type: { type: jobTypesSchema, required: true },
  location: {
    state: String,
    city: String,
  },
  hourly: Number,
  price: Number,
  picture: String,
  pictures: [String],
});

postSchema.statics.createPost = async function (
  userId,
  title,
  description,
  type,
  price,
  picture,
  pictures,
  location,
  hourly
) {
  if (!jobTypes.filter((item) => item == type)) {
    throw new Error(process.env.JOB_TYPE_INVALID);
  }

  await this.create({
    user: userId,
    title,
    description,
    type,
    price: price != 0 ? Number(price) : -1,
    picture,
    pictures,
    location,
    hourly: hourly != 0 ? Number(hourly) : -1,
  });
};
postSchema.statics.deletePost = async function (userId, id) {
  const post = await this.findOne({ _id: id });
  if (!post) {
    throw new Error(process.env.POST_NOT_FOUND);
  }
  if (post.user != userId) {
    throw new Error(process.env.AUTHORIZATION_DENIED);
  }
  await this.deleteOne({ _id: id });
};
module.exports = new mongoose.model("Post", postSchema);

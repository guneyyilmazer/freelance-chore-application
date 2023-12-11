const PostModel = require("../schemas/postSchema");
const { jobTypes } = require("../jobTypes");
require("dotenv").config();

const getPosts = async (req, res) => {
  try {
    const { page, amount, type } = req.body;
    if (!jobTypes.filter((item) => item == Object.keys(type)[0])) {
      throw new Error("Job type is invalid");
    }
    const typeString = "type." + Object.keys(type)[0];
    const posts = await PostModel.find({
      [typeString]: true, // back ticks don't work, using property keys
    })
      .skip((page - 1) * amount)
      .limit(amount);
    res.status(200).json({ posts });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const getRandomPosts = async (req, res) => {
  try {
    const { page, amount } = req.body;

    const posts = await PostModel.find()
      .skip((page - 1) * amount)
      .limit(amount);
    console.log(posts);
    res.status(200).json({ posts });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const createPost = async (req, res) => {
  try {
    const { title, type, description, price, picture, pictures } = req.body;
    await PostModel.createPost(
      req.userId,
      title,
      description,
      type,
      price,
      picture,
      pictures
    );
    res.status(200).json({ msg: "Post has been created successfully." });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
const deletePost = async (req, res) => {
  try {
    const { id } = req.body;
    await PostModel.deletePost(req.userId, id);
    res.status(200).json({ msg: "Post has been deleted successfully." });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const changeTitle = async (req, res) => {
  try {
    const { id, newTitle } = req.body;
    const doesItExist = await PostModel.findOne({ _id: id });
    if (!doesItExist) {
      res.status(400).json({ error: "Post doesn't exist." });
    }
    if (doesItExist.user != req.userId) {
      res.status(401).json({ error: process.env.AUTHORIZATION_DENIED });
    }
    const post = await PostModel.findOneAndUpdate(
      { _id: id },
      { title: newTitle },
      { new: true }
    );
    res
      .status(200)
      .json({ msg: `Successfully updated title, new title: ${post.title}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const changeDescription = async (req, res) => {
  try {
    const { id, newDescription } = req.body;
    const doesItExist = await PostModel.findOne({ _id: id });
    if (!doesItExist) {
      res.status(400).json({ error: "Post doesn't exist." });
    }
    if (doesItExist.user != req.userId) {
      res.status(401).json({ error: process.env.AUTHORIZATION_DENIED });
    }
    const post = await PostModel.findOneAndUpdate(
      { _id: id },
      { description: newDescription },
      { new: true }
    );
    res.status(200).json({
      msg: `Successfully updated the description, new description: ${post.description}`,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const changePrice = async (req, res) => {
  try {
    const { id, newPrice } = req.body;
    const doesItExist = await PostModel.findOne({ _id: id });
    if (!doesItExist) {
      res.status(400).json({ error: "Post doesn't exist." });
    }
    if (doesItExist.user != req.userId) {
      res.status(401).json({ error: process.env.AUTHORIZATION_DENIED });
    }
    const post = await PostModel.findOneAndUpdate(
      { _id: id },
      { price: newPrice },
      { new: true }
    );
    res.status(200).json({
      msg: `Successfully updated the price, new price: ${post.price}`,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getPosts,
  getRandomPosts,
  createPost,
  deletePost,
  changeTitle,
  changeDescription,
  changePrice,
};

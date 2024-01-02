const PostModel = require("../schemas/postSchema");
const { jobTypes } = require("../jobTypes");
require("dotenv").config();

const getPosts = async (req, res) => {
  try {
    const { page, amount, type, city, state, price, hourly } = req.body;
    if (
      !jobTypes.filter((item) => item == Object.keys(type)[0]).length &&
      !type.random
    ) {
      throw new Error("Job type is invalid");
    }
    const typeString = "type." + Object.keys(type)[0];
    const posts = !type.random
      ? await PostModel.find({
          [typeString]: true,
          hourly: hourly > 0 ? hourly : hourly == 0 ? { $gt: 0 } : -1,
          price: price > 0 ? price : price == 0 ? { $gt: 0 } : -1,
          "location.state": state != "" ? state : { $not: /^0.*/ },
          "location.city": city != "" ? city : { $not: /^0.*/ },
        })
      : await PostModel.find({
        hourly: hourly && hourly != 0 ? hourly : { $gt: 0 },
        price: price && price != 0 ? price : { $gt: 0 },
        "location.state": state != "" ? state : { $not: /^0.*/ },
        "location.city": city != "" ? city : { $not: /^0.*/ },
        })
          .skip((page - 1) * amount)
          .limit(amount);
    const lastPosts = !type.random
      ? await PostModel.find({
          [typeString]: true,
          hourly: hourly && hourly != 0 ? hourly : { $gt: 0 },
          price: price && price != 0 ? price : { $gt: 0 },
          "location.state": state != "" ? state : { $not: /^0.*/ },
          "location.city": city != "" ? city : { $not: /^0.*/ },
        })
      : await PostModel.find({
        hourly: hourly && hourly != 0 ? hourly : { $gt: 0 },
        price: price && price != 0 ? price : { $gt: 0 },
        "location.state": state != "" ? state : { $not: /^0.*/ },
        "location.city": city != "" ? city : { $not: /^0.*/ },
        })
          .skip((page - 1) * amount)
          .select("title");
    const lastPage =
      lastPosts.length < amount || !lastPosts.length ? true : false;

    res.status(200).json({ posts, lastPage });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const getPost = async (req, res) => {
  try {
    const { _id } = req.body;
    const post = await PostModel.findOne({ _id });
    res.status(200).json({ post });
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
    res.status(200).json({ posts });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const createPost = async (req, res) => {
  try {
    const {
      userId,
      title,
      description,
      type,
      price,
      picture,
      pictures,
      location,
      hourly,
    } = req.body;
    await PostModel.createPost(
      req.userId,
      title,
      description,
      type,
      price,
      picture,
      pictures,
      location,
      hourly
    );
    res.status(200).json({ msg: "Post has been created successfully." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const deletePost = async (req, res) => {
  try {
    const { id } = req.body;
    await PostModel.deletePost(req.userId, id);
    res.status(200).json({ msg: "Post has been deleted successfully." });
  } catch (err) {
    res.status(400).json({ error: err.message });
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
const changeType = async (req, res) => {
  try {
    const { id, newType } = req.body;
    const doesItExist = await PostModel.findOne({ _id: id });
    if (!doesItExist) {
      res.status(400).json({ error: "Post doesn't exist." });
    }
    if (doesItExist.user != req.userId) {
      res.status(401).json({ error: process.env.AUTHORIZATION_DENIED });
    }
    const post = await PostModel.findOneAndUpdate(
      { _id: id },
      { type: newType },
      { new: true }
    );
    res.status(200).json({
      msg: "Successfully updated the type.",
    });
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
  getPost,
  getRandomPosts,
  createPost,
  deletePost,
  changeTitle,
  changeType,
  changeDescription,
  changePrice,
};

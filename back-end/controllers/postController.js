const PostModel = require("../schemas/postSchema");
require("dotenv").config();

const createPost = async (req, res) => {
  try {
    const { title, type, description, money } = req.body;
    await PostModel.createPost(req.userId, title, description, type, money);
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

module.exports = { createPost, deletePost };

const express = require("express");
const {
  getPosts,
  getRandomPosts,
  createPost,
  deletePost,
  changeTitle,
  changeDescription,
  changePrice,
} = require("../controllers/postController");
const withAuth = require("../middleware/withAuth");
const router = express.Router();

router.use(withAuth);
router.post("/", getPosts);
router.get("/", getRandomPosts);
router.post("/create", createPost);
router.post("/delete", deletePost);
router.patch("/changeTitle", changeTitle);
router.patch("/changeDescription", changeDescription);
router.patch("/changePrice", changePrice);
module.exports = router;

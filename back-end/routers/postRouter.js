const express = require("express");
const {
  getPosts,
  getPost,
  getRandomPosts,
  createPost,
  deletePost,
  changeTitle,
  changeType,
  changeDescription,
  changePrice,
  changeLocation
} = require("../controllers/postController");
const withAuth = require("../middleware/withAuth");
const router = express.Router();

router.post("/", getPosts);
router.post("/getPost", getPost);
router.get("/", getRandomPosts);
router.use(withAuth);
router.post("/create", createPost);
router.post("/delete", deletePost);
router.patch("/changeTitle", changeTitle);
router.patch("/changeType", changeType);
router.patch("/changeDescription", changeDescription);
router.patch("/changePrice", changePrice);
router.patch("/changeLocation", changeLocation);
module.exports = router;

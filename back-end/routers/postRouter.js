const express = require("express");
const { createPost, deletePost } = require("../controllers/postController");
const withAuth = require("../middleware/withAuth");
const router = express.Router();

router.use(withAuth);
router.post("/create", createPost);
router.post("/delete", deletePost);
module.exports = router;

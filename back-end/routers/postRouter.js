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
  changeLocation,
  getSavedPosts,
  applyToPost,
  getApplicants,
  changeAvailability,
  hire,
  leaveReview,
  completeContract,
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
router.patch("/changeAvailability", changeAvailability);
router.patch("/changeType", changeType);
router.patch("/changeDescription", changeDescription);
router.patch("/changePrice", changePrice);
router.patch("/changeLocation", changeLocation);
router.post("/applyToPost", applyToPost);
router.post("/getApplicants", getApplicants);
router.post("/hire", hire);
router.post("/leaveReview", leaveReview);
router.post("/completeContract", completeContract);
module.exports = router;

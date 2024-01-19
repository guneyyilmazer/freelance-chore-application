const express = require("express");
const {
  Signup,
  Login,
  getFreelancers,
  LoadUser,
  FindUsers,
  UpdateProfilePicture,
  UpdateUsername,
  UpdateEmail,
  ChangeProfile,
  getSavedPosts,
  savePost,
} = require("../controllers/userController");
const withAuth = require("../middleware/withAuth");
const router = express.Router();

router.post("/signup", Signup);

router.post("/login", Login);
router.post("/loadUser", LoadUser);
router.post("/loadFreelancers", getFreelancers);
router.post("/findUsers", FindUsers);
router.use(withAuth);
router.post("/getSavedPosts", getSavedPosts);
router.post("/savePost", savePost);

router.put("/changeProfile", ChangeProfile);
router.post("/updateEmail", UpdateEmail);
router.post("/updateProfilePicture", UpdateProfilePicture);
router.post("/updateUsername", UpdateUsername);
module.exports = router;

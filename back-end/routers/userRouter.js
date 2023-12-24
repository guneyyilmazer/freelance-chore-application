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
} = require("../controllers/userController");
const withAuth = require("../middleware/withAuth");
const router = express.Router();

router.post("/signup", Signup);

router.post("/login", Login);
router.use(withAuth);
router.post("/loadUser", LoadUser);
router.put("/changeProfile", ChangeProfile);
router.post("/loadFreelancers", getFreelancers);
router.post("/findUsers", FindUsers);
router.post("/updateEmail", UpdateEmail);
router.post("/updateProfilePicture", UpdateProfilePicture);
router.post("/updateUsername", UpdateUsername);
module.exports = router;

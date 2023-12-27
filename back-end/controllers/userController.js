const UserModel = require("../schemas/userSchema");
const jwt = require("jsonwebtoken");
const { jobTypes } = require("../jobTypes");
require("dotenv").config();

const genToken = (userId, username) => {
  return jwt.sign({ userId, username }, process.env.SECRET, {
    expiresIn: "7d",
  });
};

const Signup = async (req, res) => {
  try {
    const { type, location, freelancerDetails, username, email, password } =
      req.body;
    if (username.length > 4) {
      const userId = await UserModel.signup(
        type,
        location,
        freelancerDetails,
        username,
        email,
        password
      );
      const token = genToken(userId, username);
      res.status(200).json({ AuthValidation: token });
    } else {
      res
        .status(401)
        .json({ error: "Username must be atleast 5 characters long." });
    }
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ error: err.message });
  }
};

const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userId = await UserModel.login(username, password);
    const token = genToken(userId, username);
    res.status(200).json({ AuthValidation: token });
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ error: err.message });
  }
};
const getFreelancers = async (req, res) => {
  try {
    let { wage, state, city, page, amount, type } = req.body;
    if (
      !jobTypes.filter((item) => item == Object.keys(type)[0]).length &&
      !type.random
    ) {
      throw new Error("Job type is invalid");
    }
    const typeString = "freelancerDetails.jobType." + Object.keys(type)[0];
    const freelancers = !type.random
      ? await UserModel.find({
          [typeString]: true,
          "location.state": state != "" ? state : { $not: /^0.*/ },
          "location.city": city != "" ? city : { $not: /^0.*/ },
          "freelancerDetails.hourlyWage": wage != 0 ? wage : { $gt: 0 },
        }).select(
          "username _id profilePicture location freelancerDetails accountType"
        )
      : await UserModel.find({
          "location.state": state != "" ? state : { $not: /^0.*/ },
          "location.city": city != "" ? city : { $not: /^0.*/ },
          "freelancerDetails.hourlyWage": wage != 0 ? wage : { $gt: 0 },
        })
          .select(
            "username _id profilePicture location freelancerDetails accountType"
          )
          .skip((page - 1) * amount)
          .limit(amount);
    res.status(200).json({ freelancers });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const LoadUser = async (req, res) => {
  try {
    const { userId, token } = req.body;
    if (userId) {
      const inDB = await UserModel.findOne({ _id: userId });
      res.status(200).json({
        username: inDB.username,
        userId: inDB._id,
        profilePicture: inDB.profilePicture,
        location: inDB.location,
        freelancerDetails: inDB.freelancerDetails,
        accountType: inDB.accountType,
      });
    } else if (token) {
      const { userId } = await jwt.verify(token, process.env.SECRET);

      const inDB = await UserModel.findOne({ _id: userId });
      res.status(200).json({
        username: inDB.username,
        userId: inDB._id,
        profilePicture: inDB.profilePicture,
        location: inDB.location,
        freelancerDetails: inDB.freelancerDetails,
        accountType: inDB.accountType,
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ error: err.message });
  }
};

const FindUsers = async (req, res) => {
  try {
    const { username, freelancer } = req.body;

    const Users = await UserModel.find({
      username: {
        $regex: username,
        $options: "i",
      },
      "accountType.freelancer": freelancer,
    })
      .limit(50)
      .select("username")
      .select("profilePicture");
    const includes = Users.filter((item) => item.username.includes(username));
    res
      .status(200)
      .json({ users: includes, notFound: includes.length == 0 ? true : false });
  } catch (err) {
    console.log(err.message);

    res.status(401).json({ error: err.message });
  }
};

const UpdateProfilePicture = async (req, res) => {
  try {
    const { userId, profilePicture } = req.body;
    const auth = await UserModel.findOne({ _id: req.userId }); //already verifying the token with middleware, this is extra
    if (!auth) {
      throw new Error("Not verified.");
    }
    const inDB = await UserModel.findOneAndUpdate(
      { _id: userId },
      { profilePicture },
      { new: true }
    );
    res.status(200).json({ inDB });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const UpdateUsername = async (req, res) => {
  try {
    const { username, newUsername } = req.body;
    const doWeHaveUser = await UserModel.findOne({ username });
    if (doWeHaveUser._id == req.userId) {
      const response = await UserModel.findOneAndUpdate(
        { username },
        { username: newUsername },
        { new: true }
      );
      res.status(200).json({ response });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const UpdateEmail = async (req, res) => {
  try {
    const { userId, newEmail } = req.body;
    const doWeHaveUser = await UserModel.findOne({ userId });
    if (doWeHaveUser._id == req.userId) {
      const response = await UserModel.findOneAndUpdate(
        { userId },
        { email: newEmail },
        { new: true }
      );
      res.status(200).json({ response });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const ChangeProfile = async (req, res) => {
  try {
    const { location, freelancerDetails, username } = req.body;
    const checkDB = await UserModel.findOne({ username });
    console.log(checkDB._id.toString() != req.userId.toString());
    if (freelancerDetails.aboutMe > 100)
      throw new Error("About me needs to be under 100 characters");
    if (checkDB) {
      if (checkDB._id.toString() != req.userId.toString()) {
        throw new Error(process.env.ERR_TAKEN_USERNAME);
      } else {
        // if its the user's nickname
        const user = await UserModel.findOneAndUpdate(
          { _id: req.userId },
          { location, freelancerDetails, username }
        );
        res.status(200).json({ msg: "Profile updated successfully." });
      }
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log(err.message);
  }
};
module.exports = {
  Signup,
  Login,
  getFreelancers,
  LoadUser,
  FindUsers,
  UpdateProfilePicture,
  UpdateUsername,
  UpdateEmail,
  ChangeProfile,
};

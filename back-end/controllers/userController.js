const UserModel = require("../schemas/userSchema");
const jwt = require("jsonwebtoken");
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

const LoadUser = async (req, res) => {
  try {
    const { userId, token } = req.body;
    if (userId) {
      const inDB = await UserModel.findOne({ _id: userId });
      res.status(200).json({
        username: inDB.username,
        userId: inDB._id,
        profilePicture: inDB.profilePicture,
        location:inDB.location,
        freelancerDetails:inDB.freelancerDetails,
        accountType:inDB.accountType
      });
    } else if (token) {
      const { userId } = await jwt.verify(token, process.env.SECRET);

      const inDB = await UserModel.findOne({ _id: userId });
      res.status(200).json({
        username: inDB.username,
        userId: inDB._id,
        profilePicture: inDB.profilePicture,
        location:inDB.location,
        freelancerDetails:inDB.freelancerDetails,
        accountType:inDB.accountType
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ error: err.message });
  }
};

const FindUsers = async (req, res) => {
  try {
    const { username } = req.body;

    const Users = await UserModel.find({
      username: { $regex: username, $options: "i" },
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
module.exports = {
  Signup,
  Login,
  LoadUser,
  FindUsers,
  UpdateProfilePicture,
  UpdateUsername,
  UpdateEmail,
};

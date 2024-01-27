const UserModel = require("../schemas/userSchema");
const PostModel = require("../schemas/postSchema");
const jwt = require("jsonwebtoken");
const { getPostedTimeAgoText } = require("./postController");
const { jobTypes } = require("../jobTypes");
require("dotenv").config();

const genToken = (userId, username) => {
  return jwt.sign({ userId, username }, process.env.SECRET, {
    expiresIn: "7d",
  });
};

const Signup = async (req, res) => {
  try {
    let {
      type,
      location,
      freelancerDetails,
      username,
      email,
      password,
      profilePicture,
    } = req.body;
    if (type.freelancer) {
      if (!freelancerDetails.hourlyWage || freelancerDetails.hourlyWage == 0)
        freelancerDetails.hourlyWage = 15;
      if (username.length > 4) {
        const userId = await UserModel.signup(
          type,
          location,
          freelancerDetails,
          username,
          email,
          password,
          profilePicture
        );
        const token = genToken(userId, username);
        res.status(200).json({ AuthValidation: token });
      }
    } else if (type.hirer) {
      if (username.length > 4) {
        const userId = await UserModel.signup(
          type,
          location,
          freelancerDetails,
          username,
          email,
          password,
          profilePicture
        );
        const token = genToken(userId, username);
        res.status(200).json({ AuthValidation: token });
      }
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
    let { wage, hourlyBetween, username, state, city, page, amount, type } =
      req.body;
    if (
      !jobTypes.filter((item) => item == Object.keys(type)[0]).length &&
      !type.random
    ) {
      throw new Error("Job type is invalid");
    }

    const typeString = "freelancerDetails.jobType." + Object.keys(type)[0];
    const freelancers = !type.random
      ? await UserModel.find({
          accountType: { freelancer: true },
          [typeString]: true,
          "location.state": state != "" ? state : { $not: /^0.*/ },
          username: username
            ? { $regex: username, $options: "i" }
            : { $not: /^0.*/ },
          "location.city": city != "" ? city : { $not: /^0.*/ },
          "freelancerDetails.hourlyWage":
            wage && wage != 0 && wage != -1 && wage != -2
              ? wage
              : wage == -2
              ? { $gt: hourlyBetween[0], $lt: hourlyBetween[1] }
              : wage == 0 || !wage
              ? { $gt: 0 }
              : -1,
        })
          .select(
            "username _id profilePicture location freelancerDetails accountType"
          )
          .skip((page - 1) * amount)
          .limit(amount)
      : await UserModel.find({
          accountType: { freelancer: true },

          "location.state": state != "" ? state : { $not: /^0.*/ },
          username: username
            ? { $regex: username, $options: "i" }
            : { $not: /^0.*/ },

          "location.city": city != "" ? city : { $not: /^0.*/ },
          "freelancerDetails.hourlyWage":
            wage && wage != 0 && wage != -1 && wage != -2
              ? wage
              : wage == -2
              ? { $gt: hourlyBetween[0], $lt: hourlyBetween[1] }
              : wage == 0 || !wage
              ? { $gt: 0 }
              : -1,
        })
          .select(
            "username _id profilePicture location freelancerDetails accountType"
          )
          .skip((page - 1) * amount)
          .limit(amount);
    const lastFreelancers = !type.random
      ? await UserModel.find({
          accountType: { freelancer: true },
          [typeString]: true,
          "location.state": state != "" ? state : { $not: /^0.*/ },
          username: username
            ? { $regex: username, $options: "i" }
            : { $not: /^0.*/ },
          "location.city": city != "" ? city : { $not: /^0.*/ },
          "freelancerDetails.hourlyWage":
            wage && wage != 0 && wage != -1 && wage != -2
              ? wage
              : wage == -2
              ? { $gt: hourlyBetween[0], $lt: hourlyBetween[1] }
              : wage == 0 || !wage
              ? { $gt: 0 }
              : -1,
        })
          .select(
            "username _id profilePicture location freelancerDetails accountType"
          )
          .skip((page - 1) * amount)
      : await UserModel.find({
          accountType: { freelancer: true },
          "location.state": state != "" ? state : { $not: /^0.*/ },
          username: username
            ? { $regex: username, $options: "i" }
            : { $not: /^0.*/ },

          "location.city": city != "" ? city : { $not: /^0.*/ },
          "freelancerDetails.hourlyWage":
            wage && wage != 0 && wage != -1 && wage != -2
              ? wage
              : wage == -2
              ? { $gt: hourlyBetween[0], $lt: hourlyBetween[1] }
              : wage == 0 || !wage
              ? { $gt: 0 }
              : -1,
        })
          .select(
            "username _id profilePicture location freelancerDetails accountType"
          )
          .skip((page - 1) * amount);
    const freelancerWithStars = freelancers.map(async (freelancer) => {
      const posts = await PostModel.find({
        hiredFreelancer: freelancer._id,
      }).select("reviews");
      const postsWithStars = posts.filter(
        (post) => typeof post.reviews.hirerReview.star == "number"
      );
      const stars = postsWithStars.map((post) => post.reviews.hirerReview.star);
      const starAverage =
        posts.length != 0
          ? stars.reduce((acc, current) => acc + current) / stars.length
          : 0;
      return {
        username: freelancer.username,
        _id: freelancer._id,
        profilePicture: freelancer.profilePicture,
        location: freelancer.location,
        freelancerDetails: {
          jobType: freelancer.freelancerDetails.jobType,
          hourlyWage: freelancer.freelancerDetails.hourlyWage,
          aboutMe: freelancer.freelancerDetails.aboutMe,
          starAverage: starAverage,
        },
        accountType: freelancer.accountType,
      };
    });
    console.log("freelancers length" + freelancers.length);
    console.log("lastfreelancers length" + lastFreelancers.length);
    const lastPage =
      lastFreelancers.length < amount || !lastFreelancers.length ? true : false;
    const pagesCount =
      freelancers.length / amount < 1
        ? 1
        : Math.floor(freelancers.length / amount);
    const freelancersWithStarsFinal = await Promise.all(freelancerWithStars);
    res
      .status(200)
      .json({ freelancers: freelancersWithStarsFinal, lastPage, pagesCount });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const LoadUser = async (req, res) => {
  try {
    //only for freelancer
    const { userId, token } = req.body;
    if (userId) {
      //only this condition returns star average
      const inDB = await UserModel.findOne({ _id: userId });

      //change this if you want to change the endpoint to load hirer accounts as well
      const posts = await PostModel.find({ hiredFreelancer: userId });
      const postsWithStars = posts.filter(
        (post) => typeof post.reviews.hirerReview.star == "number"
      );
      const stars = postsWithStars.map((post) => post.reviews.hirerReview.star);
      const starAverage =
        posts.length != 0
          ? stars.reduce((acc, current) => acc + current) / stars.length
          : 0;

      res.status(200).json({
        username: inDB.username,
        userId: inDB._id,
        profilePicture: inDB.profilePicture,
        location: inDB.location,
        freelancerDetails: {
          jobType: inDB.freelancerDetails.jobType,
          hourlyWage: inDB.freelancerDetails.hourlyWage,
          aboutMe: inDB.freelancerDetails.aboutMe,
          starAverage: starAverage,
        },
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
        freelancerDetails: {
          jobType: inDB.freelancerDetails.jobType,
          hourlyWage: inDB.freelancerDetails.hourlyWage,
          aboutMe: inDB.freelancerDetails.aboutMe,
        },
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
    const { username } = req.body;

    const Users = await UserModel.find({
      username: {
        $regex: username,
        $options: "i",
      },
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
const getSavedPosts = async (req, res) => {
  try {
    const user = await UserModel.findOne({
      _id: req.userId,
    });
    const posts = user.freelancerDetails.savedPosts.map(async (id) => {
      const post = await PostModel.findOne({ _id: id });
      const postWithDates = {
        location: post.location,
        _id: post._id,
        user: post.user,
        title: post.title,
        description: post.description,
        type: post.type,
        skillLevel: post.skillLevel,
        hourly: post.hourly,
        price: post.price,
        picture: post.picture,
        pictures: post.pictures,
        availability: post.availability,
        applicants: post.applicants,
        completed: post.completed,
        hiredFreelancer: post.hiredFreelancer,
        hired: post.hired,
        reviews: post.reviews,
        createdAt: {
          year: post.createdAt.getFullYear(),
          month: post.createdAt.getMonth() + 1,
          day: post.createdAt.getDate(),
          hour: post.createdAt.getHours(),
          minutes: post.createdAt.getMinutes(),
        },
        updatedAt: {
          year: post.updatedAt.getFullYear(),
          month: post.updatedAt.getMonth() + 1,
          day: post.updatedAt.getDate(),
          hour: post.updatedAt.getHours(),
          minutes: post.updatedAt.getMinutes(),
        },
        postedTimeAgoText: getPostedTimeAgoText(post.createdAt),
      };
      return postWithDates;
    });
    const savedPosts = await Promise.all(posts);

    res.status(200).json({ posts: savedPosts });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const getAppliedPosts = async (req, res) => {
  try {
    const { page, amount } = req.body;
    const posts = await PostModel.find({
      applicants: req.userId,
    })
      .skip((page - 1) * amount)
      .limit(amount);

    const lastPosts = await PostModel.find({
      applicants: req.userId,
    })
      .skip((page - 1) * amount)
      .select("title");

    const lastPage =
      lastPosts.length < amount || !lastPosts.length ? true : false;
    const pagesCount = posts.length / amount;
    const postsWithDates = posts.map((post) => {
      return {
        location: post.location,
        _id: post._id,
        user: post.user,
        title: post.title,
        description: post.description,
        type: post.type,
        skillLevel: post.skillLevel,
        hourly: post.hourly,
        price: post.price,
        picture: post.picture,
        pictures: post.pictures,
        availability: post.availability,
        completed: post.completed,
        hired: post.hired,
        hiredFreelancer: post.hiredFreelancer,
        reviews: post.reviews,
        createdAt: {
          year: post.createdAt.getFullYear(),
          month: post.createdAt.getMonth() + 1,
          day: post.createdAt.getDate(),
          hour: post.createdAt.getHours(),
          minutes: post.createdAt.getMinutes(),
        },
        updatedAt: {
          year: post.updatedAt.getFullYear(),
          month: post.updatedAt.getMonth() + 1,
          day: post.updatedAt.getDate(),
          hour: post.updatedAt.getHours(),
          minutes: post.updatedAt.getMinutes(),
        },
        postedTimeAgoText: getPostedTimeAgoText(post.createdAt),
      };
    });
    res.status(200).json({
      posts: postsWithDates,
      lastPage,
      pagesCount: pagesCount < 1 ? 1 : Math.floor(pagesCount),
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const savePost = async (req, res) => {
  try {
    const { id } = req.body;
    const { freelancerDetails } = await UserModel.findOne({ _id: req.userId });
    if (freelancerDetails.savedPosts.filter((post) => post == id).length != 0) {
      throw new Error("Post is already saved!");
    }
    const newSavedPosts = [...freelancerDetails.savedPosts, id];
    await UserModel.findOneAndUpdate(
      { _id: req.userId },
      { "freelancerDetails.savedPosts": newSavedPosts }
    );
    res.status(200).json({ msg: "Successfully saved post." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const deleteSavedPost = async (req, res) => {
  try {
    const { id } = req.body;
    const { freelancerDetails } = await UserModel.findOne({ _id: req.userId });
    const newSavedPosts = freelancerDetails.savedPosts.filter(
      (post) => post != id
    );
    await UserModel.findOneAndUpdate(
      { _id: req.userId },
      { "freelancerDetails.savedPosts": newSavedPosts }
    );
    res.status(200).json({ msg: "Successfully deleted post from saved list." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const getPostsThisHirerShared = async (req, res) => {
  try {
    const { id, completed, hired, page, amount } = req.body;
    const posts = await PostModel.find({ user: id, completed, hired }).skip(
      (page - 1) * amount
    );
    const lastPosts = await PostModel.find({ user: id, completed, hired })
      .skip((page - 1) * amount)
      .select("title");
    const lastPage =
      lastPosts.length < amount || !lastPosts.length ? true : false;
    const pagesCount = posts.length / amount;

    const postsWithDates = posts.map((post) => {
      return {
        location: post.location,
        _id: post._id,
        user: post.user,
        title: post.title,
        description: post.description,
        type: post.type,
        skillLevel: post.skillLevel,
        hourly: post.hourly,
        price: post.price,
        picture: post.picture,
        pictures: post.pictures,
        availability: post.availability,
        applicants: post.applicants,
        completed: post.completed,
        hired: post.hired,
        hiredFreelancer: post.hiredFreelancer,
        reviews: post.reviews,
        createdAt: {
          year: post.createdAt.getFullYear(),
          month: post.createdAt.getMonth() + 1,
          day: post.createdAt.getDate(),
          hour: post.createdAt.getHours(),
          minutes: post.createdAt.getMinutes(),
        },
        updatedAt: {
          year: post.updatedAt.getFullYear(),
          month: post.updatedAt.getMonth() + 1,
          day: post.updatedAt.getDate(),
          hour: post.updatedAt.getHours(),
          minutes: post.updatedAt.getMinutes(),
        },
        postedTimeAgoText: getPostedTimeAgoText(post.createdAt),
      };
    });
    res.status(200).json({
      posts: postsWithDates,
      lastPage,
      pagesCount: pagesCount < 1 ? 1 : Math.floor(pagesCount),
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const getThisFreelancersHiredPosts = async (req, res) => {
  //posts that this freelancer has been hired in
  try {
    const { id, completed, page, amount } = req.body;
    const posts = await PostModel.find({
      hiredFreelancer: id,
      completed,
      hired: true,
    }).skip((page - 1) * amount);
    const lastPosts = await PostModel.find({
      hiredFreelancer: id,
      completed,
      hired: true,
    })
      .skip((page - 1) * amount)
      .select("title");
    const lastPage =
      lastPosts.length < amount || !lastPosts.length ? true : false;
    const pagesCount = posts.length / amount;

    const postsWithDates = posts.map((post) => {
      return {
        location: post.location,
        _id: post._id,
        user: post.user,
        title: post.title,
        description: post.description,
        type: post.type,
        skillLevel: post.skillLevel,
        hourly: post.hourly,
        price: post.price,
        picture: post.picture,
        pictures: post.pictures,
        availability: post.availability,
        applicants: post.applicants,
        hired: post.hired,
        completed: post.completed,
        hiredFreelancer: post.hiredFreelancer,
        reviews: post.reviews,
        createdAt: {
          year: post.createdAt.getFullYear(),
          month: post.createdAt.getMonth() + 1,
          day: post.createdAt.getDate(),
          hour: post.createdAt.getHours(),
          minutes: post.createdAt.getMinutes(),
        },
        updatedAt: {
          year: post.updatedAt.getFullYear(),
          month: post.updatedAt.getMonth() + 1,
          day: post.updatedAt.getDate(),
          hour: post.updatedAt.getHours(),
          minutes: post.updatedAt.getMinutes(),
        },
        postedTimeAgoText: getPostedTimeAgoText(post.createdAt),
      };
    });
    res.status(200).json({
      posts: postsWithDates,
      lastPage,
      pagesCount: pagesCount < 1 ? 1 : Math.floor(pagesCount),
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
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
  getSavedPosts,
  getAppliedPosts,
  savePost,
  deleteSavedPost,
  getPostsThisHirerShared,
  getThisFreelancersHiredPosts,
};

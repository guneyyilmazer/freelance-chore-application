const PostModel = require("../schemas/postSchema");
const UserModel = require("../schemas/userSchema");
const { jobTypes } = require("../jobTypes");
require("dotenv").config();

const getPostedTimeAgoText = (createdAt) => {
  const dateDifferenceInMonths = (dateInitial, dateFinal) =>
    Math.max(
      (dateFinal.getFullYear() - dateInitial.getFullYear()) * 12 +
        dateFinal.getMonth() -
        dateInitial.getMonth(),
      0
    );
  const dateDifferenceInDays = (dateInitial, dateFinal) =>
    (dateFinal - dateInitial) / 86_400_000;
  const dateDifferenceInHours = (dateInitial, dateFinal) =>
    (dateFinal - dateInitial) / 3_600_000;
  const dateDifferenceInMinutes = (dateInitial, dateFinal) =>
    (dateFinal - dateInitial) / 60_000;
  const rightNow = new Date();
  const postedMonthsAgo =
    dateDifferenceInMonths(createdAt, rightNow) < 1
      ? 0
      : Math.ceil(dateDifferenceInMonths(createdAt, rightNow));
  const postedDaysAgo =
    dateDifferenceInDays(createdAt, rightNow) < 1
      ? 0
      : Math.ceil(dateDifferenceInDays(createdAt, rightNow));
  const postedHoursAgo =
    dateDifferenceInHours(createdAt, rightNow) < 1
      ? 0
      : Math.ceil(dateDifferenceInHours(createdAt, rightNow));
  const postedMinutesAgo =
    dateDifferenceInMinutes(createdAt, rightNow) < 1
      ? 0
      : Math.ceil(dateDifferenceInMinutes(createdAt, rightNow));

  let postedTimeAgoText = "";
  if (postedMonthsAgo < 1 && postedDaysAgo < 1 && postedHoursAgo < 1) {
    postedTimeAgoText =
      postedMinutesAgo < 2
        ? " 1 Minute Ago"
        : postedMinutesAgo + " Minutes Ago";
  } else if (postedMonthsAgo < 1 && postedDaysAgo < 1) {
    postedTimeAgoText =
      postedHoursAgo < 2 ? " 1 Hour Ago" : postedHoursAgo + " Hours Ago";
  } else if (postedMonthsAgo < 1) {
    postedTimeAgoText =
      postedDaysAgo < 2 ? " 1 Day Ago" : postedDaysAgo + " Days Ago";
  } else {
    postedTimeAgoText =
      postedMonthsAgo < 2 ? " 1 Month Ago" : postedMonthsAgo + " Months Ago";
  }
  return postedTimeAgoText;
};
const getPosts = async (req, res) => {
  try {
    const {
      page,
      amount,
      hourlyBetween,
      priceBetween,
      type,
      city,
      state,
      price,
      hourly,
      availability,
      sort,
    } = req.body;
    if (
      !jobTypes.filter((item) => item == Object.keys(type)[0]).length &&
      !type.random
    ) {
      throw new Error(process.env.INVALID_JOB_TYPE);
    }

    const typeString = "type." + Object.keys(type)[0];
    const posts = !type.random
      ? await PostModel.find({
          [typeString]: true,
          hourly:
            hourly && hourly != 0 && hourly != -1 && hourly != -2
              ? hourly
              : hourly == -2
              ? { $gt: hourlyBetween[0], $lt: hourlyBetween[1] }
              : hourly == 0
              ? { $gt: 0 }
              : -1,

          price:
            price && price != 0 && price != -1 && price != -2
              ? price
              : price == -2
              ? { $gt: priceBetween[0], $lt: priceBetween[1] }
              : price == 0
              ? { $gt: 0 }
              : -1,

          "location.state": state != "" ? state : { $not: /^0.*/ },
          "location.city": city != "" ? city : { $not: /^0.*/ },
          hired: false,
          completed: false,
          availability: availability.random ? { $not: /^0.*/ } : availability,
        })
          .skip((page - 1) * amount)
          .limit(amount)

          .sort(sort != 0 ? { createdAt: sort }:{})
      : await PostModel.find({
          hourly:
            hourly && hourly != 0 && hourly != -1 && hourly != -2
              ? hourly
              : hourly == -2
              ? { $gt: hourlyBetween[0], $lt: hourlyBetween[1] }
              : hourly == 0
              ? { $gt: 0 }
              : -1,
          price:
            price && price != 0 && price != -1 && price != -2
              ? price
              : price == -2
              ? { $gt: priceBetween[0], $lt: priceBetween[1] }
              : price == 0
              ? { $gt: 0 }
              : -1,

          "location.state": state != "" ? state : { $not: /^0.*/ },
          "location.city": city != "" ? city : { $not: /^0.*/ },
          hired: false,
          completed: false,
          availability: availability.random ? { $not: /^0.*/ } : availability,
        })
          .skip((page - 1) * amount)
          .limit(amount)
          .sort(sort != 0 ? { createdAt: sort }:{});

    const lastPosts = !type.random
      ? await PostModel.find({
          [typeString]: true,
          hourly:
            hourly && hourly != 0 && hourly != -1 && hourly != -2
              ? hourly
              : hourly == -2
              ? { $gt: hourlyBetween[0], $lt: hourlyBetween[1] }
              : hourly == 0
              ? { $gt: 0 }
              : -1,

          price:
            price && price != 0 && price != -1 && price != -2
              ? price
              : price == -2
              ? { $gt: priceBetween[0], $lt: priceBetween[1] }
              : price == 0
              ? { $gt: 0 }
              : -1,

          "location.state": state != "" ? state : { $not: /^0.*/ },
          "location.city": city != "" ? city : { $not: /^0.*/ },
          hired: false,
          completed: false,
        })
          .skip((page - 1) * amount)
          .select("title")
      : await PostModel.find({
          hourly:
            hourly && hourly != 0 && hourly != -1 && hourly != -2
              ? hourly
              : hourly == -2
              ? { $gt: hourlyBetween[0], $lt: hourlyBetween[1] }
              : hourly == 0
              ? { $gt: 0 }
              : -1,

          price:
            price && price != 0 && price != -1 && price != -2
              ? price
              : price == -2
              ? { $gt: priceBetween[0], $lt: priceBetween[1] }
              : price == 0
              ? { $gt: 0 }
              : -1,

          "location.state": state != "" ? state : { $not: /^0.*/ },
          "location.city": city != "" ? city : { $not: /^0.*/ },
          hired: false,
          completed: false,
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
const getPost = async (req, res) => {
  try {
    const { _id } = req.body;
    let post = await PostModel.findOne({ _id });
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

    res.status(200).json({ post: postWithDates });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const getRandomPosts = async (req, res) => {
  try {
    const { page, amount } = req.body;

    const posts = await PostModel.find()
      .skip((page - 1) * amount)
      .limit(amount);
    res.status(200).json({ posts });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const createPost = async (req, res) => {
  try {
    const {
      userId,
      title,
      description,
      type,
      price,
      picture,
      pictures,
      location,
      hourly,
      skillLevel,
      availability,
    } = req.body;
    await PostModel.createPost(
      req.userId,
      title,
      description,
      type,
      price,
      picture,
      pictures,
      location,
      hourly,
      skillLevel,
      availability
    );
    res.status(200).json({ msg: "Post has been created successfully." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const deletePost = async (req, res) => {
  try {
    const { id } = req.body;
    await PostModel.deletePost(req.userId, id);
    res.status(200).json({ msg: "Post has been deleted successfully." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const changeTitle = async (req, res) => {
  try {
    const { id, title } = req.body;
    if (title == "") throw new Error("Title can't be empty.");
    const doesItExist = await PostModel.findOne({ _id: id });
    if (!doesItExist) {
      res.status(400).json({ error: "Post doesn't exist." });
    }
    if (doesItExist.user != req.userId) {
      res.status(401).json({ error: process.env.AUTHORIZATION_DENIED });
    }
    const post = await PostModel.findOneAndUpdate(
      { _id: id },
      { title },
      { new: true }
    );
    res
      .status(200)
      .json({ msg: `Successfully updated title, new title: ${post.title}` });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const changeAvailability = async (req, res) => {
  try {
    const { id, availability } = req.body;
    if (!availability.partTime && !availability.fullTime)
      throw new Error("Value can't be empty.");
    const doesItExist = await PostModel.findOne({ _id: id });
    if (!doesItExist) {
      res.status(400).json({ error: "Post doesn't exist." });
    }
    if (doesItExist.user != req.userId) {
      res.status(401).json({ error: process.env.AUTHORIZATION_DENIED });
    }
    const post = await PostModel.findOneAndUpdate(
      { _id: id },
      { availability },
      { new: true }
    );
    res.status(200).json({
      msg: `Successfully updated availability value, new value: ${post.availability}`,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const changeType = async (req, res) => {
  try {
    const { id, newType } = req.body;
    const doesItExist = await PostModel.findOne({ _id: id });
    if (!doesItExist) {
      res.status(400).json({ error: "Post doesn't exist." });
    }
    if (doesItExist.user != req.userId) {
      res.status(401).json({ error: process.env.AUTHORIZATION_DENIED });
    }
    const post = await PostModel.findOneAndUpdate(
      { _id: id },
      { type: newType },
      { new: true }
    );
    res.status(200).json({
      msg: "Successfully updated the type.",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const changeDescription = async (req, res) => {
  try {
    const { id, newDescription } = req.body;
    const doesItExist = await PostModel.findOne({ _id: id });
    if (!doesItExist) {
      res.status(400).json({ error: "Post doesn't exist." });
    }
    if (doesItExist.user != req.userId) {
      res.status(401).json({ error: process.env.AUTHORIZATION_DENIED });
    }
    const post = await PostModel.findOneAndUpdate(
      { _id: id },
      { description: newDescription },
      { new: true }
    );
    res.status(200).json({
      msg: `Successfully updated the description, new description: ${post.description}`,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const changePrice = async (req, res) => {
  try {
    const { id, hourly, price } = req.body;
    const doesItExist = await PostModel.findOne({ _id: id });
    if (!doesItExist) {
      res.status(400).json({ error: "Post doesn't exist." });
    }
    if (doesItExist.user != req.userId) {
      res.status(401).json({ error: process.env.AUTHORIZATION_DENIED });
    }
    const post = await PostModel.findOneAndUpdate(
      { _id: id },
      { hourly, price },
      { new: true }
    );
    res.status(200).json({
      msg: `Successfully updated the price, new price: ${post.price}`,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const changeLocation = async (req, res) => {
  try {
    const { id, location } = req.body;
    if (location.state == "") throw new Error("State can't be empty.");
    const doesItExist = await PostModel.findOne({ _id: id });
    if (!doesItExist) {
      res.status(400).json({ error: "Post doesn't exist." });
    }
    if (doesItExist.user != req.userId) {
      res.status(401).json({ error: process.env.AUTHORIZATION_DENIED });
    }
    const post = await PostModel.findOneAndUpdate(
      { _id: id },
      { location },
      { new: true }
    );
    res.status(200).json({
      msg: `Successfully updated the location, new location: ${
        post.location.state + "/" + post.location.city
      }`,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const applyToPost = async (req, res) => {
  try {
    const { id } = req.body;
    const post = await PostModel.findOne({ _id: id });
    if (post.applicants.filter((id) => id == req.userId).length > 0) {
      throw new Error("Already applied!");
    }
    if (req.userId == post.user)
      throw new Error("Can't apply to your own post!");
    const newApplicants = [...post.applicants, req.userId];
    await PostModel.findOneAndUpdate(
      { _id: id },
      { applicants: newApplicants }
    );
    res.status(200).json({ msg: "Successfully applied!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const getApplicants = async (req, res) => {
  try {
    const { id } = req.body;
    const { applicants } = await PostModel.findOne({ _id: id });
    const applicantsFromDB = applicants.map(async (_id) => {
      const user = await UserModel.findOne({ _id }).select(
        "username _id profilePicture location freelancerDetails accountType"
      );
      return user;
    });
    const applicantsWithData = await Promise.all(applicantsFromDB);
    res.status(200).json({ applicants: applicantsWithData });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const hire = async (req, res) => {
  try {
    const { postId, freelancerId } = req.body;
    const post = await PostModel.findOne({ _id: postId });
    if (!post) throw new Error("Post not found!");
    if (post.user != req.userId) {
      throw new Error(process.env.AUTHORIZATION_DENIED);
    } else if (post.hiredFreelancer) {
      throw new Error("Already hired someone!");
    } else {
      await PostModel.findOneAndUpdate(
        { _id: postId },
        { hired: true, hiredFreelancer: freelancerId }
      );
    }
    res.status(200).json({ msg: "Successfully hired!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const completeContract = async (req, res) => {
  try {
    const completedDate = new Date();
    const { postId, freelancerId } = req.body;
    const post = await PostModel.findOne({ _id: postId });
    if (!post) throw new Error("Post not found!");
    if (post.user != req.userId) {
      throw new Error(process.env.AUTHORIZATION_DENIED);
    } else {
      await PostModel.findOneAndUpdate(
        { _id: postId },
        { completed: true, completedDate }
      );
    }
    res.status(200).json({ msg: "Successfully closed the contract!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
const leaveReview = async (req, res) => {
  try {
    const { id, star, text } = req.body;
    const post = await PostModel.findOne({ _id: id });
    if (!post) throw new Error("Post not found!");
    if (post.user != req.userId && post.hiredFreelancer != req.userId) {
      throw new Error(process.env.AUTHORIZATION_DENIED);
    } else if (post.user == req.userId) {
      //if you are the hirer
      await PostModel.findOneAndUpdate(
        { _id: id },
        { "reviews.hirerReview": { star, text } }
      );
    } else if (post.hiredFreelancer == req.userId) {
      //if you are the freelancer
      await PostModel.findOneAndUpdate(
        { _id: id },
        { "reviews.freelancerReview": { star, text } }
      );
    }
    res.status(200).json({ msg: "Successfully left a review!" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = {
  getPosts,
  getPost,
  getRandomPosts,
  createPost,
  deletePost,
  changeTitle,
  changeAvailability,
  changeType,
  changeDescription,
  changePrice,
  changeLocation,
  applyToPost,
  getApplicants,
  getPostedTimeAgoText,
  hire,
  leaveReview,
  completeContract,
};

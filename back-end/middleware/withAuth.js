const jwt = require("jsonwebtoken");
const UserModel = require("../schemas/userSchema");
const withAuth = async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const token = bearerHeader.split(" ")[1];
      req.token = token;
    }
    const verified = await jwt.verify(req.token, process.env.SECRET);
    if (!verified) {
      throw new Error(process.env.ERR_NOT_VALID_TOKEN);
    }
    const { userId } = jwt.decode(req.token);
    const inDB = await UserModel.findOne({ _id: userId });
    if (!inDB) {
      throw new Error(process.env.ERR_NOT_FOUND_USER);
    }
    req.userId = inDB._id;
    req.username = inDB.username;
    next();
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
module.exports = withAuth;

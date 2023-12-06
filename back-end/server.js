const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRouter = require('./routers/userRouter')
require("dotenv").config();
const io = require("socket.io")(3001, {
  maxHttpBufferSize: 1e7,
  cors: {
    origin: "http://localhost:3000",
  },
});
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);
app.use(express.json({ limit: "10mb" }));
mongoose
  .connect(process.env.MONGODB_URI, { maxIdleTimeMS: 60000 })
  .then(() => console.log("db connected"));
app.use("/user", userRouter);
app.listen(process.env.PORT, () =>
  console.log("listening on port " + process.env.PORT)
);

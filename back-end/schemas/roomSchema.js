const mongoose = require("mongoose");
const roomSchema = mongoose.Schema({
  name: { required: true, type: String },
  privateRoom: { type: String, default: false },
  users: { 
    type: [
      {
       userId: String
      },
    ],
  },
  messages: {
    default: [],
    type: [
      {
        sender: {
          username: { type: String, required: true },
          userId: { type: String, required: true },
        },
        seenBy: [
          {
            userId: { type: String, required: true },
            time: { type: Date, required: true },
          },
        ],
        content: { required: true, type: String },
        pictures: [String],
        sent: { type: Date, default: Date.now() },
      },
    ],
  },
});

module.exports = new mongoose.model("Room", roomSchema);

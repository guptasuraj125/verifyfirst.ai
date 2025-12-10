import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ["user", "bot"],
    required: true
  },
  text: {
    type: String,
    default: ""
  },
  mediaUrl: {
    type: String,
    default: null
  },
  hasMedia: {
    type: Boolean,
    default: false
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("User", userSchema);
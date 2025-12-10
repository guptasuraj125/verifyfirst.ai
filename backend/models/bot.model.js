import mongoose from "mongoose";

const botSchema = new mongoose.Schema({
  sender: {
    type: String,
    default: "bot"
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Bot = mongoose.model("Bot", botSchema);
export default Bot;

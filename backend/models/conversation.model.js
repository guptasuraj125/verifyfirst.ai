// backend/models/conversation.model.js
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: String, // "user" | "bot"
      required: true
    },
    text: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    _id: false,
    timestamps: true
  }
);

const conversationSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    messages: [messageSchema],
    lastRiskStatus: {
      type: String,
      default: "NORMAL" // NORMAL | RISKY | EMERGENCY
    }
  },
  {
    timestamps: true
  }
);

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;

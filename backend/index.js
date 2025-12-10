import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import chatbotRoutes from "./routes/chatbot.routes.js";
import mediaRoutes from "./routes/media.routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("✅ VerifyFirst Backend is Live");
});

// Routes
app.use("/api/chat", chatbotRoutes);
app.use("/api/media", mediaRoutes);

// MongoDB Connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    try {
      const indexes = await mongoose.connection.db
        .collection("users")
        .indexes();
      const hasEmailIndex = indexes.find(i => i.name === "email_1");

      if (hasEmailIndex) {
        await mongoose.connection.db.collection("users").dropIndex("email_1");
        console.log("✅ AUTO-FIX: email_1 UNIQUE index DESTROYED");
      }
    } catch (err) {
      console.log("⚠️ Index cleanup skipped:", err.message);
    }
  })
  .catch((err) => {
    console.log("❌ Mongo Error:", err.message);
  });

// ❌ DO NOT USE app.listen() on Vercel
// ✔ INSTEAD EXPORT app

export default app;

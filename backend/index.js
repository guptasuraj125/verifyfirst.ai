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

// ✅ ROUTES
app.use("/api/chat", chatbotRoutes);
app.use("/api/media", mediaRoutes);

// ✅ MONGO + FORCE INDEX KILL + SERVER START
mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Connected to MongoDB");

    // ✅ FORCE DELETE BROKEN UNIQUE EMAIL INDEX (AUTO FIX)
    try {
      const indexes = await mongoose.connection.db
        .collection("users")
        .indexes();

      const hasEmailIndex = indexes.find(i => i.name === "email_1");

      if (hasEmailIndex) {
        await mongoose.connection.db
          .collection("users")
          .dropIndex("email_1");

        console.log("✅ AUTO-FIX: email_1 UNIQUE index DESTROYED");
      } else {
        console.log("✅ No email index found (SAFE)");
      }
    } catch (err) {
      console.log("⚠️ Index cleanup skipped:", err.message);
    }

    // ✅ FINALLY START SERVER
    const PORT = process.env.PORT || 4002;
    app.listen(PORT, () => {
      console.log(`✅ Server is Running on Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ Mongo Error:", err.message);
  });

import dotenv from "dotenv";
dotenv.config();
import Groq from "groq-sdk";

let groq = null;

if (process.env.GROQ_API_KEY && process.env.GROQ_API_KEY.length > 10) {
  groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
  });
  console.log("✅ GROQ KEY LOADED");
} else {
  console.log("❌ GROQ_API_KEY missing");
}

export default groq;

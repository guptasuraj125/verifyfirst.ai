// backend/utils/detectLanguage.js

// Simple India-focused language detector: english / hindi / marathi / hinglish

export function detectLanguage(text = "") {
  const input = (text || "").toLowerCase();

  // Hindi (pure Devanagari)
  const hindiRegex = /[\u0900-\u097F]/;
  if (hindiRegex.test(input)) {
    return "hindi";
  }

  const marathiKeywords = [
    "kay",
    "ahes",
    "ahe",
    "kasa",
    "kashi",
    "tumhi",
    "mi",
    "aamhi",
    "tumcha",
    "tumchi",
    "kuthay",
    "aaj",
    "udya",
    "kon",
    "kaay",
    "hota",
    "zala"
  ];

  const hinglishKeywords = [
    "bhai",
    "yaar",
    "kya",
    "kaise",
    "kyu",
    "paisa",
    "job",
    "scam",
    "fraud",
    "call",
    "msg",
    "message",
    "link",
    "verify",
    "sahi",
    "galat",
    "abhi",
    "jaldi",
    "report",
    "block",
    "number",
    "police",
    "bank",
    "otp",
    "offer",
    "chance"
  ];

  let marathiScore = 0;
  let hinglishScore = 0;

  for (const w of marathiKeywords) {
    if (input.includes(w)) marathiScore++;
  }
  for (const w of hinglishKeywords) {
    if (input.includes(w)) hinglishScore++;
  }

  if (marathiScore >= 2) return "marathi";
  if (hinglishScore >= 2) return "hinglish";

  return "english";
}

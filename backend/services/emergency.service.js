const EMERGENCY_KEYWORDS = [
  "otp de diya",
  "money sent",
  "paisa bhej diya",
  "suicide",
  "kill myself",
  "blackmail",
  "deepfake",
  "nude leak",
  "rape threat"
];

export function shouldTriggerEmergency(text = "") {
  const lower = text.toLowerCase();
  return EMERGENCY_KEYWORDS.some((kw) => lower.includes(kw));
}

export const EMERGENCY_BLOCK = `
🚨 INDIA EMERGENCY NUMBERS

Police / Ambulance : 112
Cyber Crime : 1930
Women Helpline : 1091
Mental Support : 9152987821

Your safety matters more than anything.
`.trim();

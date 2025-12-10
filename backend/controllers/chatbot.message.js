import groq from "../services/groq.service.js";
import { analyzeText } from "../services/keyword.engine.js";
import { detectImageText } from "../services/imageDetector.service.js";
import {
  shouldTriggerEmergency,
  EMERGENCY_BLOCK,
} from "../services/emergency.service.js";
import { detectLanguage } from "../utils/detectLanguage.js";

/* ───────────── EMERGENCY RESPONSE ───────────── */
function buildEmergencyStructuredResponse(userText = "") {
  return `
🚨 EMERGENCY ALERT – IMMEDIATE ACTION REQUIRED

Your message shows signs of money loss, blackmail, or serious risk.  
In such cases, acting quickly is more important than replying in chat.

WHAT YOU MUST DO NOW  
1️⃣ Call your bank or UPI support immediately and request them to block or freeze the suspicious transaction.  

2️⃣ File a complaint on the official National Cyber Crime Portal:  
   Website: https://cybercrime.gov.in  
   Helpline: 1930 (24x7)  

3️⃣ If there is any threat, blackmail or physical danger, go to the nearest police station with proof.  

IMPORTANT HELPLINES (INDIA)  
Police / Emergency: 112  
Cyber Crime: 1930  
Women Helpline: 1091  
Mental Health Support: 9152987821  

COLLECT STRONG EVIDENCE  
• Save screenshots of chats and profiles  
• Note down transaction IDs and bank details  
• Keep phone numbers, email IDs and links safely  

FINAL MESSAGE  
Do not blame yourself. Many people face online fraud.  
What matters now is: report strongly, act fast and protect others too 💪  

${EMERGENCY_BLOCK}
`.trim();
}

/* ───────────── CATEGORY PRIORITY ───────────── */
function resolveTopCategory(categories = []) {
  if (!categories.length) return null;
  const priority = { MENTAL: 3, CIVIC: 2, SCAM: 1 };

  return categories.sort(
    (a, b) => priority[b.type] - priority[a.type] || b.score - a.score
  )[0];
}

/* ───────────── FALLBACK RESPONSE (NO AI) ───────────── */
function buildKeywordFallbackResponse(top) {
  if (!top) {
    return `
Title  
Balanced Digital Behaviour  

2-Line Explanation  
This message does not clearly match any scam or civic category,  
but building healthy digital habits is still important for everyone.  

3 Practical Actions  
1️⃣ Pause and verify any link, offer or forward before acting on it.  
2️⃣ Avoid sharing personal or sensitive information in public chats.  
3️⃣ Keep your tone respectful, even during disagreements online.  

Civic Responsibility Line  
A calm, careful internet user makes the whole digital space safer for everyone 🇮🇳
`.trim();
  }

  const MAP = {
    WHATSAPP_SPAM: {
      title: "Cleaning Up WhatsApp Forwards",
      why:
        "Endless good morning images and random forwards fill your storage and waste everyone's time. " +
        "Thoughtful sharing keeps chats useful and light.",
      act: [
        "Mute or archive groups where only images and forwards keep coming.",
        "Regularly clear old media from WhatsApp storage settings.",
        "Forward only those messages that are useful, verified or genuinely meaningful.",
      ],
      tip:
        "When you forward less but better, you make everyone's digital morning lighter 🌞",
    },

    SCREEN_ADDICTION: {
      title: "Putting the Phone Down During Meals",
      why:
        "Using your phone while eating damages both your focus and your connection with people sitting with you. " +
        "Meals are the easiest time to reconnect offline.",
      act: [
        "Keep your phone on silent or in another room during meal time.",
        "Look at people, not the screen, and start small conversations at the table.",
        "Set a simple family rule: no scrolling during food, even for a few days as a experiment.",
      ],
      tip:
        "When you give full attention at the dining table, you show respect to both food and family 🍽️",
    },

    LOUD_PUBLIC_MEDIA: {
      title: "Keeping Public Spaces Peaceful",
      why:
        "Playing loud reels or videos in public can disturb people who are working, resting or already stressed. " +
        "Earphones are a simple way to be considerate.",
      act: [
        "Always use earphones in buses, trains, cafés and waiting rooms.",
        "If you need to show something to a friend, reduce the volume first.",
        "If someone looks uncomfortable, be the first one to lower the sound without argument.",
      ],
      tip:
        "Good citizens make sure their entertainment never becomes someone else's headache 🎧",
    },

    REEL_ETHICS: {
      title: "Responsible Reel Making In Sensitive Places",
      why:
        "Recording reels in temples, accident spots or hospitals can hurt people's emotions and privacy. " +
        "Not everything needs a camera or an audience.",
      act: [
        "Avoid filming where people are praying, injured, grieving or under treatment.",
        "If you must record, take permission and avoid showing identifiable faces.",
        "Ask yourself once: will this reel heal someone or hurt someone before you post.",
      ],
      tip:
        "Real respect for people and sacred places is more powerful than any viral reel 🙏",
    },

    SEEN_BEHAVIOUR: {
      title: "Handling Important Messages With Care",
      why:
        "Leaving someone on seen repeatedly, especially during serious conversations, can create anxiety and damage trust. " +
        "Clear replies, even short ones, show respect.",
      act: [
        "If you are busy, send a small line like: 'I saw this, will reply properly later.'",
        "Reply faster to messages about health, safety, money or emotional issues.",
        "If you cannot continue a conversation, say so honestly instead of disappearing.",
      ],
      tip:
        "Digital silence also sends a message, so choose silence carefully and kindly 💬",
    },

    JOB_SCAM: {
      title: "Recovering After a Fake Job Scam",
      why:
        "Scammers use attractive job offers and registration fees to cheat people who genuinely need work. " +
        "Reporting them helps you and protects the next victim.",
      act: [
        "Collect all proof: chats, emails, payment receipts, screenshots of profile and job post.",
        "File a complaint on https://cybercrime.gov.in under job or financial fraud and note the complaint ID.",
        "Inform your bank about the fraudulent transaction and request written acknowledgement of your complaint.",
      ],
      tip:
        "A strong complaint turns your loss into a warning signal that can save many others from the same trap 💼",
    },

    FINANCIAL_FRAUD: {
      title: "Protecting Your Money From OTP and UPI Fraud",
      why:
        "Anyone asking for your OTP, UPI PIN or card details is trying to control your money, not help you. " +
        "Banks never ask for these sensitive numbers on chat or calls.",
      act: [
        "Immediately stop the conversation and do not share any code, PIN or card number.",
        "Call your bank or UPI app only on the official helpline printed on your card or app.",
        "Change your passwords and enable SMS / app alerts for every transaction.",
      ],
      tip:
        "Treat your OTP and UPI PIN like your house keys – you never hand them over to a stranger 🔐",
    },
  };

  const data = MAP[top.id];
  if (!data) return buildKeywordFallbackResponse(null);

  return `
Title  
${data.title}

2-Line Explanation  
${data.why}

3 Practical Actions  
1️⃣ ${data.act[0]}  
2️⃣ ${data.act[1]}  
3️⃣ ${data.act[2]}  

Civic Responsibility Line  
${data.tip}
`.trim();
}

/* ───────────── IMAGE ANALYSIS FUNCTION ───────────── */
async function analyzeImageWithGroq(imageUrl, text = "") {
  try {
    const imagePrompt = `
You are VerifyFirst.ai - a Digital Safety and Civic Behaviour Assistant.

User ${text ? `said: "${text}" and also` : ''} uploaded an image.

Your task:
Analyze what this image likely represents. Consider:
- Scam or fraud indicators
- Police / Government impersonation
- Fake job offers or money schemes
- Accident or sensitive public places
- Loud public behavior
- WhatsApp spam / forward culture
- Digital behavior patterns
- Emergency situations (money loss, threats, blackmail)

Rules:
- Output STRICTLY in this format:
  Title  
  [Title here]
  
  2-Line Explanation  
  [First sentence]
  [Second sentence]
  
  3 Practical Actions  
  1️⃣ [Action 1]
  2️⃣ [Action 2]
  3️⃣ [Action 3]
  
  Civic Responsibility Line  
  [One strong, simple line]
- No star symbols
- Emojis allowed naturally
- Clear line gaps between sections
- No mention of AI providers
- No police-style accusations
- Be realistic and civic-focused
- If image shows emergency situation (money fraud, threats), mention immediate actions first

Image URL: ${imageUrl}
${text ? `\nUser's text context: ${text}` : ''}
`.trim();

    const imageChat = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        { role: "system", content: imagePrompt },
        { role: "user", content: "Analyze this image and provide safety guidance." }
      ],
      temperature: 0.7,
    });

    const imageResult = imageChat?.choices?.[0]?.message?.content?.trim();
    
    if (imageResult && imageResult.length > 50) {
      // Check if the image analysis indicates emergency
      const emergencyKeywords = ['emergency', 'scam', 'fraud', 'blackmail', 'threat', 
                                 'money loss', 'police', 'help', 'urgent', 'immediate action'];
      const hasEmergencyIndicators = emergencyKeywords.some(keyword => 
        imageResult.toLowerCase().includes(keyword.toLowerCase())
      );
      
      return {
        analysis: imageResult,
        isEmergency: hasEmergencyIndicators,
        source: 'image'
      };
    }
  } catch (err) {
    console.error("Image GROQ Analysis Failed:", err.message);
  }
  
  return null;
}

/* ───────────── MAIN CONTROLLER ───────────── */
export const chatBotReply = async (req, res) => {
  try {
    const { text, imageUrl } = req.body;
    let cleanText = text || "";
    
    // Clean the text
    cleanText = cleanText.trim();

    /* ✅ IDENTITY OVERRIDE — ALWAYS SHOW YOUR NAME ONLY */
    const identityTriggers = [
      "who built you",
      "who made you",
      "who created you",
      "your developer",
      "tumhe kisne banaya",
      "developer name",
      "who designed this bot",
    ];

    if (identityTriggers.some((q) => cleanText.toLowerCase().includes(q))) {
      return res.status(200).json({
        userMessage: cleanText,
        botMessage: `
Digital Identity  

Name: VerifyFirst.ai  
Created by: Gupta Suraj Krishna  
College: Sahyog College of IT and Management  

What I am designed to do  
• Detect scams and risky digital patterns  
• Promote healthy digital civic behaviour  
• Guide users in online safety situations  
• Support people in distress with practical steps  

Mission  
Make every chat a little safer, clearer and more responsible for the next person who goes online in India 🇮🇳
`.trim(),
        emergency: false,
      });
    }

    /* ✅ IMAGE ANALYSIS (with or without text) */
    let imageAnalysis = null;
    let emergencyFromImage = false;
    
    if (imageUrl) {
      imageAnalysis = await analyzeImageWithGroq(imageUrl, cleanText);
      if (imageAnalysis) {
        emergencyFromImage = imageAnalysis.isEmergency;
        
        // If we have image analysis without text, return it directly
        if (!cleanText && imageAnalysis.analysis) {
          return res.status(200).json({
            userMessage: "Image uploaded",
            botMessage: imageAnalysis.analysis,
            emergency: emergencyFromImage,
            mediaFlag: true,
            source: 'image'
          });
        }
      }
    }

    /* ✅ EMERGENCY DETECTION - Check both text and image analysis */
    let combinedTextForEmergency = cleanText;
    if (imageAnalysis && imageAnalysis.analysis) {
      // Add image analysis context for emergency detection
      combinedTextForEmergency += ` [Image context: ${imageAnalysis.analysis.substring(0, 100)}...]`;
    }

    if (shouldTriggerEmergency(combinedTextForEmergency) || emergencyFromImage) {
      const emergencyResponse = buildEmergencyStructuredResponse(cleanText);
      return res.status(200).json({
        userMessage: cleanText,
        botMessage: emergencyResponse,
        emergency: true,
        mediaFlag: !!imageUrl,
        source: imageUrl ? 'image+text' : 'text'
      });
    }

    /* ✅ KEYWORD ANALYSIS */
    const keywordInsight = analyzeText(cleanText);
    const topCategory = resolveTopCategory(keywordInsight.categories || []);

    /* ✅ COMBINE IMAGE AND TEXT ANALYSIS IF BOTH EXIST */
    let botResponse;
    
    if (imageAnalysis && imageAnalysis.analysis && cleanText) {
      // Combine image and text analysis
      botResponse = `
${imageAnalysis.analysis}

Additional context from your message:
${cleanText}

Based on both your image and text, here's comprehensive guidance:
`;
    } else if (imageAnalysis && imageAnalysis.analysis) {
      // Only image analysis
      botResponse = imageAnalysis.analysis;
    } else {
      // Fallback response (no AI)
      botResponse = buildKeywordFallbackResponse(topCategory);
    }

    /* ✅ ENHANCE WITH AI IF GROQ IS AVAILABLE (for text or combined) */
    if (groq && cleanText) {
      const matchedPreview = (keywordInsight.matchedKeywords || [])
        .slice(0, 6)
        .join(", ");

      const styleFlavours = [
        "short and punchy",
        "slightly formal but friendly",
        "coach-style motivation",
        "alert-style explanation",
      ];
      const randomStyle =
        styleFlavours[Math.floor(Math.random() * styleFlavours.length)];

      // Build system prompt considering image if available
      let systemPrompt = `
You are VerifyFirst.ai — a Digital Safety and Civic Behaviour Assistant built by an Indian student.

Hard Rules:
- Do not use star symbols or markdown formatting.
- Emojis are allowed but use them naturally.
- Keep clear line breaks, not big paragraphs.
- Never mention any AI provider, model name or company.
- Never say you are an AI model; focus only on being VerifyFirst.ai.
- Do not copy the same sentences every time. Vary wording and tone.
- Never directly accuse the sender; talk about risk and patterns.
${imageAnalysis ? '\n- The user also uploaded an image. Consider this in your analysis.' : ''}

Output format must ALWAYS be exactly this:

Title  
<one title line>  

2-Line Explanation  
<two short sentences about the situation and risk>  

3 Practical Actions  
1️⃣ <first clear, realistic step>  
2️⃣ <second practical step>  
3️⃣ <third step about reporting / better behaviour>  

Civic Responsibility Line  
<one strong, simple line about good digital behaviour>  

Context for this message:
Category: ${topCategory?.label || "General Digital Behaviour"}
Type: ${topCategory?.type || "CIVIC / SAFETY"}
Risk Level: ${keywordInsight.overallRisk} (${keywordInsight.riskScore}/100)
Matched Clues: ${matchedPreview || "no strong pattern"}
Tone style to follow: ${randomStyle}
Language: English
${imageAnalysis ? `\nImage Analysis Summary: ${imageAnalysis.analysis.substring(0, 150)}...` : ''}
`.trim();

      try {
        const chat = await groq.chat.completions.create({
          model: "openai/gpt-oss-20b",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: cleanText },
          ],
          temperature: 0.85,
        });

        const aiText = chat?.choices?.[0]?.message?.content?.trim();
        if (aiText && aiText.length > 40) {
          botResponse = aiText;
        }
      } catch (err) {
        console.error("Groq refine error:", err.message);
      }
    }

    return res.status(200).json({
      userMessage: cleanText,
      botMessage: botResponse,
      emergency: false,
      mediaFlag: !!imageUrl,
      keywordInsight: cleanText ? keywordInsight : null,
      source: imageUrl ? (cleanText ? 'image+text' : 'image') : 'text'
    });
  } catch (err) {
    console.error("Chatbot Error:", err.message);
    return res.status(500).json({ 
      error: "Server error",
      details: err.message 
    });
  }
};
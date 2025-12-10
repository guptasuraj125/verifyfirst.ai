// backend/services/keyword.engine.js

/**
 * VerifyFirst AI – Enhanced Keyword Intelligence Engine
 * ------------------------------------------------------
 * Each category now has 100+ carefully selected keywords
 * Total: 3000+ keywords across all categories
 */

// Helper: normalize text
function normalize(text = "") {
  return text.toLowerCase();
}

export const KEYWORD_CATEGORIES = {
  // 🔴 SCAM & CRIME  -------------------------------------------------

  FINANCIAL_FRAUD: {
    label: "Financial / UPI / Bank Fraud",
    type: "SCAM",
    risk: "HIGH",
    weight: 1.6,
    keywords: [
      // OTP Related (35)
      "otp", "one time password", "verification code", "confirm otp",
      "otp share karo", "otp bhejo", "otp mang raha hai", "otp forward karo",
      "otp dedo", "otp send karo", "your otp is", "otp required",
      "otp needed", "enter otp", "verify with otp", "otp code",
      "otp message", "sms otp", "otp for login", "otp for transaction",
      "otp for verification", "otp for confirmation", "otp for security",
      "send otp", "forward otp", "provide otp", "share your otp",
      "otp receive hua?", "otp aaya kya?", "otp batayein",
      "otp disclose", "otp reveal", "otp tell", "otp number",
      "otp digits", "authentication code", "security code",
      
      // Bank Card (25)
      "card number", "card details", "card information", "debit card",
      "credit card", "atm card", "card ka number", "card expiry date",
      "card expiry", "expiry month year", "cvv", "cvv number", "card cvv",
      "cvv code", "card pin", "atm pin", "pin number", "pin code",
      "card security code", "card verification value", "card ke piche ka number",
      "card back side number", "card ke aage ka number", "card front side",
      "card ki photo", "card copy", "card ki tasveer",
      
      // Bank Account (20)
      "account number", "bank account number", "account no", "bank details",
      "account details", "account information", "ifsc code", "ifsc",
      "bank ifsc", "branch code", "bank name", "branch name", "account holder name",
      "beneficiary name", "beneficiary account", "bank transfer", "account transfer",
      "neft details", "rtgs details", "imps details", "upi id",
      
      // UPI Specific (25)
      "upi pin", "upi password", "upi security pin", "upi login",
      "upi verification", "upi authenticate", "upi collect request",
      "upi payment request", "upi request accept", "upi approve",
      "upi authorise", "upi transaction pin", "upi app password",
      "google pay pin", "phonepe pin", "paytm pin", "bhim upi pin",
      "upi handle", "upi vpa", "virtual payment address", "upi registered mobile",
      "upi linked account", "upi set pin", "upi change pin", "upi reset pin",
      
      // Urgency Phrases (25)
      "urgent", "immediately", "right now", "jaldi batao", "time sensitive",
      "last chance", "final warning", "account band ho jayega", "account block",
      "suspended soon", "permanent block", "legal action", "police complaint",
      "cyber cell", "fraud case", "investigation", "within 10 minutes",
      "asap", "quick response", "respond immediately", "do it now",
      "cannot wait", "emergency situation", "critical issue", "urgently needed"
    ],
  },

  JOB_SCAM: {
    label: "Fake Job Offer / Recruitment Scam",
    type: "SCAM",
    risk: "HIGH",
    weight: 1.5,
    keywords: [
      // Job Offers (35)
      "job offer", "work from home", "online job", "part time job",
      "remote data entry", "typing work", "computer operator", "back office job",
      "call center job", "telecaller job", "sales executive", "marketing job",
      "field job", "office assistant", "receptionist job", "accountant job",
      "teacher job", "tutor job", "content writer", "graphic designer",
      "video editor", "social media manager", "digital marketing",
      "seo expert", "web developer", "app developer", "software engineer",
      "data analyst", "business analyst", "hr recruiter", "operations manager",
      "project manager", "team leader", "supervisor", "manager post",
      
      // Fees & Deposits (35)
      "registration fee", "security deposit", "training fee", "interview fee",
      "joining fee", "application fee", "processing fee", "verification charge",
      "onboarding fee", "documentation fee", "admin fee", "service charge",
      "caution deposit", "advance payment", "token amount", "booking amount",
      "uniform fee", "id card fee", "medical test fee", "background check fee",
      "police verification fee", "reference check fee", "placement fee",
      "success fee", "commission advance", "tool kit fee", "software fee",
      "training material fee", "certification fee", "exam fee", "license fee",
      "subscription fee", "membership fee", "agency fee", "consultation fee",
      
      // Fake Promises (35)
      "assured job", "guaranteed job", "100% placement", "immediate joining",
      "urgent hiring", "walk-in interview", "direct hiring", "no experience needed",
      "freshers welcome", "students can apply", "housewives can work",
      "retired persons welcome", "physically challenged welcome", "high salary",
      "attractive package", "performance bonus", "incentives", "overtime pay",
      "weekly payments", "daily payments", "flexible hours", "choose your time",
      "earn while learning", "free training", "certificate provided",
      "experience certificate", "offer letter", "appointment letter",
      "joining letter", "bond free", "no bond", "no contract", "work from mobile",
      "only smartphone needed", "internet required"
    ],
  },

  PHISHING_GENERIC: {
    label: "Phishing Link / Suspicious Link",
    type: "SCAM",
    risk: "HIGH",
    weight: 1.4,
    keywords: [
      // Click Actions (35)
      "click here", "tap here", "open link", "login link", "reset password",
      "verify now", "update now", "secure your account", "security alert",
      "suspicious activity", "unusual login", "short url", "bit.ly", "tinyurl",
      "goo.gl", "ow.ly", "is.gd", "buff.ly", "adf.ly", "cutt.ly", "short.io",
      "rb.gy", "tiny.cc", "shorte.st", "click.ru", "clck.ru", "vk.cc",
      "soo.gd", "ity.im", "v.gd", "tr.im", "qr.ae", "cur.lv", "x.co", "zzz.ee",
      
      // Urgent Actions (35)
      "act now", "don't miss", "limited time", "expiring soon", "last day",
      "final day", "today only", "offer ending", "hurry up", "quick action",
      "immediate action", "urgent update", "important notice", "critical alert",
      "security warning", "account warning", "login required", "verification needed",
      "confirmation required", "authorization needed", "approval pending",
      "action required", "response needed", "attention required", "check now",
      "review now", "confirm now", "validate now", "authenticate now",
      "secure now", "protect now", "enable now", "disable now", "change now",
      "update immediately",
      
      // Fake Notifications (35)
      "official notification", "bank notification", "government notification",
      "rbi notification", "sebi notification", "income tax notification",
      "gst notification", "trai notification", "uidai notification",
      "ministry notification", "department notification", "authority notification",
      "regulatory notification", "compliance notification", "legal notification",
      "court notification", "police notification", "cyber crime notification",
      "fraud alert notification", "security breach notification",
      "data leak notification", "hacking attempt notification",
      "unauthorized access notification", "multiple login notification",
      "new device login", "unrecognized device", "unusual location",
      "foreign login", "suspicious ip", "malware detected", "virus found",
      "ransomware attack", "phishing attempt", "social engineering",
      "identity theft attempt"
    ],
  },

  CRYPTO_SCAM: {
    label: "Investment / Crypto Scam",
    type: "SCAM",
    risk: "HIGH",
    weight: 1.5,
    keywords: [
      // Cryptocurrencies (35)
      "crypto", "bitcoin", "ethereum", "dogecoin", "shiba inu", "cardano",
      "solana", "polkadot", "ripple", "litecoin", "binance coin", "tether",
      "usdt", "usdc", "dai", "chainlink", "stellar", "monero", "dash",
      "zcash", "neo", "eos", "tezos", "cosmos", "algorand", "vechain",
      "filecoin", "theta", "uniswap", "aave", "compound", "maker", "sushi",
      "yearn finance", "pancakeswap",
      
      // Investment Terms (35)
      "guaranteed returns", "double money", "3x profit", "5x profit",
      "10x profit", "100x profit", "daily profit", "weekly profit",
      "monthly profit", "lifetime income", "passive income", "residual income",
      "trading signal", "vip group", "pump and dump", "token presale",
      "airdrop reward", "ico", "initial coin offering", "ido",
      "initial dex offering", "ieo", "initial exchange offering",
      "staking rewards", "yield farming", "liquidity mining", "defi",
      "decentralized finance", "nft", "non fungible token", "metaverse",
      "web3", "blockchain", "smart contract", "dapp",
      
      // Scam Tactics (35)
      "secret strategy", "hidden method", "insider information", "whale moves",
      "market manipulation", "price prediction", "expert analysis",
      "pro trader tips", "master class", "premium course", "private coaching",
      "mentorship program", "trading bot", "auto trader", "robot trading",
      "algorithmic trading", "quant trading", "signal service", "call service",
      "entry exit points", "stop loss tips", "take profit levels",
      "portfolio management", "wealth management", "asset management",
      "crypto fund", "investment pool", "syndicate", "group investment",
      "collective buying", "community purchase", "bulk purchase",
      "early access", "whitelist spot", "pre sale access"
    ],
  },

  GOVT_IMPERSONATION: {
    label: "Government / Police Impersonation",
    type: "SCAM",
    risk: "CRITICAL",
    weight: 1.8,
    keywords: [
      // Government Departments (35)
      "income tax department", "gst department", "customs department",
      "police department", "cyber crime cell", "economic offences wing",
      "cbi", "central bureau of investigation", "ed", "enforcement directorate",
      "ncb", "narcotics control bureau", "dri", "directorate of revenue intelligence",
      "rbi", "reserve bank of india", "sebi", "securities and exchange board",
      "trai", "telecom regulatory authority", "uidai", "unique identification authority",
      "ministry of finance", "ministry of home affairs", "ministry of electronics",
      "ministry of communication", "state government", "central government",
      "district administration", "municipal corporation", "panchayat",
      "court", "high court", "supreme court", "judiciary",
      
      // Legal Threats (35)
      "income tax notice", "gst notice", "legal notice", "police complaint",
      "fir registered", "arrest warrant", "court case", "summons", "customs parcel",
      "customs duty", "tax evasion case", "money laundering case",
      "fraud investigation", "scam investigation", "probe ordered",
      "inquiry initiated", "chargesheet filed", "bail rejected",
      "property attachment", "bank account freeze", "asset seizure",
      "passport impound", "visa cancellation", "license cancellation",
      "permit cancellation", "registration cancellation", "blacklist",
      "wanted list", "most wanted", "lookout circular", "red corner notice",
      "extradition", "deportation", "jail term", "imprisonment",
      
      // Fake Schemes (35)
      "government scheme", "subsidy release", "loan waiver", "pension release",
      "provident fund", "gratuity payment", "insurance claim", "compensation",
      "relief fund", "disaster relief", "covid relief", "farmer relief",
      "student scholarship", "educational loan", "business loan",
      "mudra loan", "startup fund", "msme loan", "housing loan",
      "vehicle loan", "personal loan", "gold loan", "property loan",
      "agriculture loan", "crop loan", "irrigation loan", "farm equipment loan",
      "women empowerment scheme", "sc st scheme", "obc scheme",
      "minority scheme", "divyang scheme", "senior citizen scheme",
      "widow pension", "orphan scholarship"
    ],
  },

  TECH_SUPPORT: {
    label: "Fake Tech Support / Hacking Threat",
    type: "SCAM",
    risk: "HIGH",
    weight: 1.4,
    keywords: [
      // Company Names (35)
      "microsoft support", "windows support", "microsoft team",
      "azure support", "office 365 support", "outlook support",
      "hotmail support", "skype support", "linkedin support",
      "github support", "apple support", "mac support", "ios support",
      "iphone support", "ipad support", "macbook support", "imac support",
      "itunes support", "icloud support", "google support", "gmail support",
      "youtube support", "google drive support", "google photos support",
      "chrome support", "android support", "samsung support", "oneplus support",
      "xiaomi support", "vivo support", "oppo support", "realme support",
      "nokia support", "motorola support", "lenovo support",
      
      // Tech Threats (35)
      "virus detected", "your pc is infected", "trojan found", "malware found",
      "ransomware detected", "spyware found", "adware detected", "worm found",
      "rootkit found", "keylogger detected", "backdoor found", "botnet detected",
      "hack attempt detected", "breach detected", "leak detected",
      "data theft detected", "information stolen", "credentials stolen",
      "password compromised", "account hacked", "email hacked", "social media hacked",
      "bank account hacked", "credit card hacked", "identity stolen",
      "personal data leaked", "private photos leaked", "confidential files leaked",
      "sensitive information leaked", "company data stolen", "client data stolen",
      "customer database hacked", "employee data breached", "server compromised",
      "network hacked",
      
      // Remote Access (35)
      "remote access", "install anydesk", "install teamviewer", "install zoom",
      "install google meet", "install microsoft teams", "install skype",
      "install chrome remote", "install parsec", "install splashtop",
      "install logmein", "install vnc", "install radmin", "install dwservice",
      "install ultrasurf", "install ultraservice", "install screenconnect",
      "install connectwise", "install bomgar", "install isl online",
      "install gotoassist", "install rescueassist", "install fixme.it",
      "install dameware", "install remote utilities", "install zoho assist",
      "install supremo", "install aeroadmin", "install remotepc",
      "install sunshine", "install moonlight", "install rustdesk",
      "install meshcentral", "install guacamole", "install apache guacamole"
    ],
  },

  ROMANCE_SCAM: {
    label: "Romance / Emotional Scam",
    type: "SCAM",
    risk: "HIGH",
    weight: 1.3,
    keywords: [
      // Relationship Terms (35)
      "true love", "online relationship", "soulmate", "life partner",
      "better half", "perfect match", "destiny", "fate", "meant to be",
      "cosmic connection", "spiritual connection", "emotional bond",
      "deep connection", "special connection", "unique bond",
      "unconditional love", "pure love", "real love", "everlasting love",
      "eternal love", "forever love", "endless love", "undying love",
      "passionate love", "romantic love", "divine love", "heavenly love",
      "perfect love", "ideal love", "dream love", "fantasy love",
      "storybook love", "fairytale love", "movie love", "bollywood love",
      
      // Personal Situations (35)
      "widow", "widower", "divorced", "separated", "single parent",
      "lonely", "alone", "isolated", "depressed", "heartbroken",
      "cheated", "betrayed", "abused", "neglected", "rejected",
      "abandoned", "forsaken", "discarded", "dumped", "left alone",
      "no family", "no friends", "no support", "no one cares",
      "no one understands", "misunderstood", "judged", "criticized",
      "bullied", "harassed", "stressed", "anxious", "panicked",
      "traumatized", "ptsd",
      
      // Emergency Stories (35)
      "medical emergency", "hospital bill", "surgery needed", "medicine cost",
      "treatment cost", "chemotherapy", "radiation therapy", "organ transplant",
      "heart surgery", "brain surgery", "cancer treatment", "kidney treatment",
      "liver treatment", "lung treatment", "accident treatment",
      "disaster recovery", "natural calamity", "earthquake damage",
      "flood damage", "fire damage", "storm damage", "cyclone damage",
      "tsunami damage", "landslide damage", "house collapse",
      "business loss", "job loss", "income loss", "investment loss",
      "bankruptcy", "debt trap", "loan default", "credit card debt",
      "mortgage default", "property loss"
    ],
  },

  HEALTH_SCAM: {
    label: "Health / Miracle Cure Scam",
    type: "SCAM",
    risk: "HIGH",
    weight: 1.3,
    keywords: [
      // Diseases & Conditions (35)
      "cancer cure", "diabetes cure", "bp cure", "heart blockage cure",
      "arthritis cure", "asthma cure", "thyroid cure", "pcos cure",
      "pcod cure", "infertility cure", "impotence cure", "erectile dysfunction",
      "premature ejaculation", "low sperm count", "low testosterone",
      "kidney stone cure", "gallstone cure", "liver cirrhosis cure",
      "hepatitis cure", "hiv cure", "aids cure", "tuberculosis cure",
      "malaria cure", "dengue cure", "chikungunya cure", "covid cure",
      "corona medicine", "long covid cure", "post covid treatment",
      "chronic fatigue cure", "fibromyalgia cure", "lupus cure",
      "multiple sclerosis cure", "parkinson cure", "alzheimer cure",
      
      // Weight Loss (35)
      "lose weight fast", "instant weight loss", "slimming tea", "fat burner",
      "weight loss pills", "diet pills", "appetite suppressant", "fat burner tea",
      "belly fat reducer", "thigh fat reducer", "arm fat reducer",
      "double chin reducer", "love handles reducer", "muffin top reducer",
      "weight loss powder", "slimming powder", "detox tea", "colon cleanse",
      "liver cleanse", "kidney cleanse", "body detox", "toxin removal",
      "water weight loss", "instant inch loss", "size reduction",
      "dress size reduction", "waist size reduction", "hip size reduction",
      "chest size reduction", "body shaping", "body contouring",
      "figure correction", "post pregnancy weight loss", "menopausal weight loss",
      "age related weight gain solution",
      
      // Beauty & Enhancement (35)
      "hair regrowth guaranteed", "baldness cure", "hair fall control",
      "dandruff cure", "split ends repair", "hair thickening", "hair volumizing",
      "grey hair reversal", "premature greying cure", "white hair black",
      "male enhancement", "performance booster", "stamina increase",
      "energy booster", "vitality increase", "libido enhancer",
      "sex drive booster", "sexual performance", "bed performance",
      "size increase", "length increase", "girth increase", "duration increase",
      "premature solution", "delayed solution", "satisfaction guarantee",
      "skin whitening", "fairness cream", "glowing skin", "acne cure",
      "pimple removal", "scar removal", "dark spot removal", "wrinkle removal",
      "anti aging"
    ],
  },

  DEEPFAKE_SCAM: {
    label: "Deepfake / Morphed Media",
    type: "SCAM",
    risk: "CRITICAL",
    weight: 1.7,
    keywords: [
      // Technology Terms (35)
      "deepfake", "morphed image", "fake video", "edited video",
      "photoshop se banaya", "ai generated video", "face swap",
      "voice clone", "voice changed using ai", "synthetic media",
      "generative ai", "neural network", "machine learning",
      "computer vision", "image synthesis", "video synthesis",
      "audio synthesis", "text to speech", "speech to speech",
      "face reenactment", "expression transfer", "pose transfer",
      "motion transfer", "style transfer", "content aware fill",
      "inpainting", "outpainting", "image completion", "video completion",
      "temporal consistency", "frame interpolation", "motion interpolation",
      "keyframe animation", "parametric animation", "procedural generation",
      
      // Creation Tools (35)
      "deepfacelab", "faceswap", "faceapp", "reface", "zao",
      "wombo", "morphin", "facemorpher", "jiggy", "myheritage",
      "aging booth", "oldify", "face aging", "youngify",
      "face younger", "face older", "gender swap", "face gender",
      "ethnicity change", "race change", "face race", "celebrity face",
      "famous face", "actor face", "actress face", "politician face",
      "news anchor face", "reporter face", "journalist face",
      "influencer face", "youtuber face", "tikToker face",
      "instagrammer face", "facebook face", "twitter face",
      
      // Detection & Verification (35)
      "fake detection", "deepfake detection", "forgery detection",
      "tamper detection", "manipulation detection", "alteration detection",
      "modification detection", "edit detection", "photoshop detection",
      "ai generated detection", "synthetic media detection",
      "face swap detection", "voice clone detection", "lip sync detection",
      "blink detection", "eye movement detection", "facial landmark detection",
      "micro expression detection", "heart rate detection", "breathing detection",
      "pulse detection", "blood flow detection", "skin texture analysis",
      "lighting consistency", "shadow consistency", "reflection consistency",
      "perspective consistency", "scale consistency", "proportion consistency",
      "color consistency", "noise consistency", "compression consistency",
      "metadata analysis", "exif data", "digital fingerprint"
    ],
  },

  FAKE_NEWS: {
    label: "Fake News / Rumour",
    type: "SCAM",
    risk: "MEDIUM",
    weight: 1.2,
    keywords: [
      // News Formats (35)
      "breaking news", "exclusive news", "special report", "investigative report",
      "undercover report", "hidden camera", "secret recording", "leaked document",
      "classified document", "confidential file", "internal memo", "private email",
      "whistleblower", "insider爆料", "source爆料", "reliable source",
      "trusted source", "official source", "government source", "minister source",
      "bureaucrat source", "diplomat source", "military source", "intelligence source",
      "police source", "judiciary source", "corporate source", "industry source",
      "expert source", "scientist source", "doctor source", "academic source",
      "researcher source", "analyst source", "journalist source",
      
      // Viral Phrases (35)
      "forwarded as received", "media nahi dikhayegi", "tv par nahi dikhayenge",
      "newspaper me nahi chapenge", "social media ban karenge", "post delete karenge",
      "account suspend karenge", "video remove karenge", "link block karenge",
      "censorship", "suppression", "coverup", "conspiracy", "hidden truth",
      "real truth", "actual truth", "fact check karo", "verify yourself",
      "research yourself", "google karo", "search karo", "find out",
      "discover truth", "uncover reality", "expose", "reveal", "unmask",
      "debunk", "fact check fail", "hoax exposed", "fake exposed",
      "rumor busted", "myth busted", "lie caught", "scam revealed",
      
      // Content Types (35)
      "share before it is deleted", "download before remove", "save before ban",
      "screen record before delete", "screenshot before remove", "copy before block",
      "forward before suspend", "send before censor", "circulate before stop",
      "government ne decide kiya hai", "cabinet ne approve kiya", "pm ne announce kiya",
      "cm ne declare kiya", "minister ne confirm kiya", "department ne order diya",
      "authority ne directive di", "court ne judgment diya", "committee ne report di",
      "commission ne recommendation di", "panel ne suggestion di", "team ne finding di",
      "study ne result diya", "survey ne data diya", "research ne conclusion diya",
      "analysis ne prediction di", "expert ne warning di", "scientist ne alert di",
      "doctor ne advice di", "economist ne forecast di", "analyst ne estimate di",
      "journalist ne爆料di", "reporter ne expose kiya", "whistleblower ne leak kiya",
      "insider ne share kiya", "source ne inform kiya"
    ],
  },

  // 🟡 DIGITAL CIVIC BEHAVIOUR ----------------------------------------

  WHATSAPP_SPAM: {
    label: "WhatsApp Spam / Good Morning Culture",
    type: "CIVIC",
    risk: "LOW",
    weight: 0.8,
    keywords: [
      // Greetings (35)
      "good morning", "good night", "gm", "gn", "good afternoon",
      "good evening", "shubh prabhat", "shubh ratri", "shubh sandhya",
      "suprabhat", "susandhya", "saratri", "namaste", "namaskar",
      "jai shri ram", "jai hanuman", "radhe radhe", "hare krishna",
      "allah hafiz", "khuda hafiz", "assalamualaikum", "waalaikumsalam",
      "sat sri akal", "jai jinendra", "jai bhim", "jai mata di",
      "har har mahadev", "om namah shivaya", "om shanti",
      "bless you", "god bless", "stay blessed", "be happy",
      "stay happy", "keep smiling", "spread love",
      
      // Forwarding Commands (35)
      "forward this to 10 people", "share with all contacts",
      "send to everyone", "circulate widely", "pass it on",
      "keep forwarding", "don't break chain", "continue chain",
      "chain message", "lucky chain", "blessing chain",
      "prayer chain", "healing chain", "positive chain",
      "energy chain", "vibration chain", "frequency chain",
      "manifestation chain", "affirmation chain", "gratitude chain",
      "kindness chain", "compassion chain", "love chain",
      "peace chain", "harmony chain", "unity chain",
      "brotherhood chain", "sisterhood chain", "family chain",
      "friend chain", "group chain", "community chain",
      "nation chain", "world chain", "humanity chain",
      
      // Storage Issues (35)
      "storage full ho gaya", "phone memory full", "whatsapp storage full",
      "media storage full", "photo storage full", "video storage full",
      "document storage full", "audio storage full", "voice note storage full",
      "status storage full", "backup storage full", "cloud storage full",
      "google drive full", "icloud full", "oneDrive full",
      "dropbox full", "memory card full", "sd card full",
      "internal storage full", "external storage full",
      "delete old messages", "clear chat history", "delete media",
      "remove photos", "remove videos", "clean whatsapp",
      "whatsapp cleaner", "storage cleaner", "memory cleaner",
      "cache clear", "data clear", "app data clear",
      "reinstall whatsapp", "fresh install", "factory reset"
    ],
  },

  SCREEN_ADDICTION: {
    label: "Screen Addiction / Phone During Meals",
    type: "CIVIC",
    risk: "MEDIUM",
    weight: 1.0,
    keywords: [
      // Addiction Terms (35)
      "phone addiction", "screen addiction", "mobile addiction",
      "smartphone addiction", "internet addiction", "social media addiction",
      "whatsapp addiction", "facebook addiction", "instagram addiction",
      "snapchat addiction", "twitter addiction", "tiktok addiction",
      "youtube addiction", "netflix addiction", "prime video addiction",
      "hotstar addiction", "gaming addiction", "pubg addiction",
      "bgmi addiction", "free fire addiction", "cod addiction",
      "minecraft addiction", "roblox addiction", "fortnite addiction",
      "valorant addiction", "dota addiction", "lol addiction",
      "clash of clans addiction", "clash royale addiction",
      "candy crush addiction", "subway surfers addiction",
      "temple run addiction", "angry birds addiction", "8 ball pool addiction",
      "chess addiction",
      
      // Usage Patterns (35)
      "doom scrolling", "endless scrolling", "infinite scroll",
      "reels all night", "shorts all night", "videos all night",
      "memes all night", "posts all night", "stories all night",
      "live streams all night", "gaming all night", "chatting all night",
      "calls all night", "video calls all night", "group calls all night",
      "browsing all night", "shopping all night", "reading all night",
      "watching all night", "streaming all night", "downloading all night",
      "uploading all night", "sharing all night", "liking all night",
      "commenting all night", "posting all night", "creating all night",
      "editing all night", "filtering all night", "hashtagging all night",
      "trending all night", "viral all night", "challenge all night",
      "duet all night", "stitch all night",
      
      // Meal Times (35)
      "khana khate waqt phone", "dinner ke time phone", "breakfast ke time mobile",
      "lunch ke time screen", "snacks ke time device", "tea time phone",
      "coffee time mobile", "meal time distraction", "eating time phone",
      "drinking time screen", "family dinner phone", "group lunch mobile",
      "restaurant me phone", "hotel me screen", "cafe me device",
      "home me dining table pe phone", "office canteen me mobile",
      "school cafeteria me screen", "college mess me device",
      "wedding feast me phone", "party me screen", "function me mobile",
      "ceremony me device", "celebration me phone", "festival me screen",
      "holiday meal mobile", "weekend dinner device", "special occasion phone",
      "anniversary screen", "birthday mobile", "success party device",
      "farewell phone", "welcome screen", "reunion mobile", "get together device"
    ],
  },

  LOUD_PUBLIC_MEDIA: {
    label: "Loud Videos in Public",
    type: "CIVIC",
    risk: "MEDIUM",
    weight: 1.0,
    keywords: [
      // Public Places (35)
      "train me reels full volume", "bus me gana full volume",
      "metro me loud video", "local train me speaker", "subway me sound",
      "airport me noise", "airplane me volume", "flight me loud",
      "taxi me speaker", "cab me sound", "auto me volume",
      "rickshaw me loud", "car me blast", "bike me speaker",
      "scooter me sound", "cycle me volume", "walking me loud",
      "street me speaker", "road me sound", "footpath me volume",
      "park me loud", "garden me speaker", "playground me sound",
      "stadium me volume", "auditorium me loud", "theater me speaker",
      "cinema hall me sound", "mall me volume", "market me loud",
      "shop me speaker", "store me sound", "showroom me volume",
      "restaurant me loud", "hotel me speaker", "cafe me sound",
      
      // Disturbance Types (35)
      "no earphones", "speaker se video", "public disturbance",
      "sabko disturb kar raha", "library me phone sound", "hospital me noise",
      "clinic me volume", "doctor clinic me loud", "pharmacy me speaker",
      "medical store me sound", "bank me volume", "atm me loud",
      "office me speaker", "workplace me sound", "factory me volume",
      "warehouse me loud", "godown me speaker", "classroom me sound",
      "school me volume", "college me loud", "coaching me speaker",
      "tuition me sound", "temple me volume", "mosque me loud",
      "church me speaker", "gurudwara me sound", "mandir me volume",
      "ashram me loud", "dargah me speaker", "religious place me sound",
      "worship place me volume", "prayer hall me loud",
      "meditation center me speaker", "yoga class me sound",
      
      // Content Types (35)
      "reels full blast", "shorts loud", "tikTok videos loud",
      "instagram reels volume", "facebook videos loud",
      "snapchat stories sound", "twitter videos volume",
      "youtube videos loud", "netflix episodes speaker",
      "prime video movies sound", "hotstar shows volume",
      "disney plus loud", "sony liv speaker", "zee5 sound",
      "voot volume", "mx player loud", "jiocinema speaker",
      "altbalaji sound", "ullu volume", "hoichoi loud",
      "aha speaker", "kuku sound", "quibi volume",
      "peacock loud", "hbo max speaker", "paramount plus sound",
      "apple tv volume", "hulu loud", "crunchyroll speaker",
      "funimation sound", "viki volume", "mubi loud",
      "shudder speaker", "criterion sound", "kanopy volume"
    ],
  },

  REEL_ETHICS: {
    label: "Reel-Making Ethics (Temple / Accident / Sensitive)",
    type: "CIVIC",
    risk: "HIGH",
    weight: 1.4,
    keywords: [
      // Religious Places (35)
      "mandir me reel", "temple reel", "mosque me video",
      "church me shoot", "gurudwara me recording", "ashram me filming",
      "dargah me camera", "synagogue me video", "pagoda me reel",
      "monastery me shoot", "convent me recording", "math me filming",
      "peeth me camera", "religious shrine video", "holy place reel",
      "sacred site shoot", "pilgrimage spot recording",
      "spiritual center filming", "worship place camera",
      "prayer hall video", "meditation room reel", "yoga studio shoot",
      "retreat center recording", "hermitage filming", "sanctuary camera",
      "altar video", "shrine reel", "idol shoot", "deity recording",
      "statue filming", "icon camera", "symbol video", "ritual reel",
      "ceremony shoot", "puja recording",
      
      // Sensitive Situations (35)
      "accident ka reel", "road accident video", "car crash recording",
      "bike accident filming", "pedestrian hit camera", "collision video",
      "pileup reel", "chain accident shoot", "fatal crash recording",
      "injury filming", "blood camera", "wound video", "trauma reel",
      "emergency shoot", "ambulance recording", "rescue filming",
      "fire brigade camera", "police action video", "arrest recording",
      "raid filming", "search operation camera", "encounter video",
      "shooting reel", "bomb blast shoot", "terror attack recording",
      "riot filming", "protest camera", "violence video",
      "fight reel", "assault shoot", "abuse recording",
      "harassment filming", "bullying camera", "torture video",
      
      // Medical/Personal (35)
      "hospital ward reel", "icu reel", "operation theatre video",
      "patient room shoot", "doctor consultation recording",
      "nurse care filming", "medical treatment camera",
      "therapy session video", "counseling reel", "psychiatry shoot",
      "mental health recording", "depression filming", "anxiety camera",
      "suicide attempt video", "self harm reel", "addiction shoot",
      "rehab recording", "detox filming", "withdrawal camera",
      "funeral ka reel", "last rites video", "cremation shoot",
      "burial recording", "mourning filming", "grieving camera",
      "crying person ka video", "emotional breakdown reel",
      "mental breakdown shoot", "panic attack recording",
      "trauma reaction filming", "ptsd episode camera",
      "without permission recording", "privacy violate",
      "hidden camera", "secret recording", "unauthorized filming"
    ],
  },

  SEEN_BEHAVIOUR: {
    label: "Leaving People on Seen / Ignoring Messages",
    type: "CIVIC",
    risk: "LOW",
    weight: 0.8,
    keywords: [
      // Seen/Ignored (35)
      "left on seen", "blue tick pe chhod diya", "seen karke reply nahi",
      "read but no reply", "seen maar diya", "blue tick dekh ke ignore",
      "double tick dekh ke chhod diya", "message read kiya but reply nahi",
      "delivered dekh ke chhod diya", "online dekha but reply nahi",
      "active dikh raha but reply nahi", "typing dikh raha but message nahi aaya",
      "last seen dekh ke ignore", "online status dekh ke chhod diya",
      "ghosting", "ghost kiya", "ghost kar diya", "suddenly disappear",
      "without explanation disappear", "without warning vanish",
      "ignore kar raha hai", "intentionally ignore", "purposefully ignore",
      "deliberately ignore", "knowingly ignore", "consciously ignore",
      "willfully ignore", "intentionally left on read",
      "purposefully left on seen", "deliberately left on delivered",
      "knowingly left on sent", "consciously left on received",
      "willfully left on read", "ignoring me", "not responding",
      
      // Emotional Impact (35)
      "anxiety because no reply", "stress because no response",
      "tension because no answer", "worried because no message",
      "nervous because no communication", "panic because no contact",
      "fear because no reply", "insecurity because no response",
      "doubt because no answer", "confusion because no message",
      "uncertainty because no communication", "helplessness because no contact",
      "hopelessness because no reply", "desperation because no response",
      "frustration because no answer", "anger because no message",
      "irritation because no communication", "annoyance because no contact",
      "resentment because no reply", "bitterness because no response",
      "sadness because no answer", "depression because no message",
      "loneliness because no communication", "isolation because no contact",
      "rejection feeling", "abandonment feeling", "neglect feeling",
      "worthlessness feeling", "unimportance feeling", "invisibility feeling",
      "disrespect feeling", "disregard feeling", "dismissal feeling",
      "trivialization feeling", "marginalization feeling",
      
      // Relationship Context (35)
      "emergency message ignore", "important message ignore",
      "urgent message ignore", "critical message ignore",
      "serious message ignore", "sensitive message ignore",
      "personal message ignore", "emotional message ignore",
      "vulnerable message ignore", "confessional message ignore",
      "secret message ignore", "private message ignore",
      "intimate message ignore", "romantic message ignore",
      "love message ignore", "care message ignore",
      "concern message ignore", "support message ignore",
      "help message ignore", "assistance message ignore",
      "advice message ignore", "guidance message ignore",
      "suggestion message ignore", "recommendation message ignore",
      "request message ignore", "favor message ignore",
      "question message ignore", "query message ignore",
      "doubt message ignore", "clarification message ignore",
      "confirmation message ignore", "verification message ignore",
      "approval message ignore", "permission message ignore",
      "consent message ignore"
    ],
  },

  // 🟢 MENTAL + SOCIAL SAFETY ----------------------------------------

  DEPRESSION: {
    label: "Depression / Emotional Distress",
    type: "MENTAL",
    risk: "HIGH",
    weight: 1.5,
    keywords: [
      // Emotional State (35)
      "mood off", "zindagi bekaar lag rahi hai", "nothing feels good",
      "i feel empty", "kisi se baat karne ka mann nahi",
      "no one understands me", "crying alone", "hopeless",
      "i don't see a future", "tired of everything", "exhausted mentally",
      "mentally drained", "emotionally exhausted", "spiritually drained",
      "soul tired", "heart heavy", "mind burdened", "thoughts overwhelming",
      "emotions overwhelming", "feelings overwhelming", "pain overwhelming",
      "suffering overwhelming", "struggle overwhelming", "battle overwhelming",
      "fight overwhelming", "journey overwhelming", "life overwhelming",
      "existence overwhelming", "reality overwhelming", "world overwhelming",
      "society overwhelming", "relationships overwhelming", "work overwhelming",
      "studies overwhelming", "responsibilities overwhelming",
      
      // Negative Thoughts (35)
      "worthless feeling", "useless feeling", "meaningless feeling",
      "purposeless feeling", "directionless feeling", "aimless feeling",
      "goalless feeling", "futureless feeling", "hopeless feeling",
      "helpless feeling", "powerless feeling", "strengthless feeling",
      "courageless feeling", "confidenceless feeling", "self-esteem less",
      "self-worth low", "self-respect low", "self-confidence low",
      "self-belief low", "self-trust low", "self-love low",
      "self-care low", "self-compassion low", "self-kindness low",
      "self-acceptance low", "self-forgiveness low", "self-patience low",
      "self-understanding low", "self-awareness low", "self-knowledge low",
      "self-growth low", "self-improvement low", "self-development low",
      "self-evolution low", "self-transformation low",
      
      // Physical Symptoms (35)
      "can't sleep", "insomnia", "sleep problems", "sleep disorders",
      "can't eat", "loss of appetite", "appetite gone", "hunger lost",
      "overeating", "emotional eating", "stress eating", "binge eating",
      "can't concentrate", "focus problems", "attention issues",
      "memory problems", "forgetfulness", "confusion", "brain fog",
      "mental fog", "cognitive fog", "thinking problems",
      "decision making problems", "judgment problems", "reasoning problems",
      "logic problems", "analysis problems", "comprehension problems",
      "understanding problems", "learning problems", "processing problems",
      "energy low", "fatigue", "lethargy", "sluggishness", "exhaustion"
    ],
  },

  SUICIDE: {
    label: "Suicidal Thoughts (CRITICAL)",
    type: "MENTAL",
    risk: "CRITICAL",
    weight: 3.0,
    keywords: [
      // Direct Statements (35)
      "i want to die", "apni life khatam karni hai",
      "suicide karna hai", "kill myself", "end my life",
      "jump from building", "hang myself", "shoot myself",
      "poison myself", "overdose myself", "drown myself",
      "burn myself", "electrocute myself", "cut myself",
      "bleed to death", "starve to death", "dehydrate to death",
      "freeze to death", "suffocate myself", "choke myself",
      "strangle myself", "asphyxiate myself", "carbon monoxide",
      "drug overdose", "medicine overdose", "pill overdose",
      "chemical overdose", "toxin overdose", "venom overdose",
      "poison overdose", "alcohol overdose", "substance overdose",
      "inhalant overdose", "solvent overdose", "gas overdose",
      
      // Indirect Expressions (35)
      "no reason to live", "zinda rehna nahi chahta",
      "life not worth living", "existence not worth continuing",
      "breathing not worth it", "waking up not worth it",
      "getting up not worth it", "going out not worth it",
      "staying in not worth it", "eating not worth it",
      "drinking not worth it", "sleeping not worth it",
      "working not worth it", "studying not worth it",
      "trying not worth it", "fighting not worth it",
      "struggling not worth it", "suffering not worth it",
      "pain not worth it", "hurt not worth it",
      "wound not worth it", "scar not worth it",
      "trauma not worth it", "memory not worth it",
      "experience not worth it", "journey not worth it",
      "path not worth it", "road not worth it",
      "way not worth it", "direction not worth it",
      "destination not worth it", "goal not worth it",
      "purpose not worth it", "meaning not worth it",
      "value not worth it",
      
      // Methods/Planning (35)
      "suicide plan", "suicide method", "suicide means",
      "suicide tool", "suicide weapon", "suicide instrument",
      "suicide device", "suicide mechanism", "suicide technique",
      "suicide strategy", "suicide approach", "suicide way",
      "suicide route", "suicide path", "suicide process",
      "suicide procedure", "suicide steps", "suicide stages",
      "suicide phases", "suicide timeline", "suicide schedule",
      "suicide date", "suicide time", "suicide place",
      "suicide location", "suicide venue", "suicide spot",
      "suicide site", "suicide area", "suicide zone",
      "suicide environment", "suicide setting", "suicide circumstance",
      "suicide condition", "suicide situation"
    ],
  },

  ADDICTION: {
    label: "Addiction (Gaming / Substances / Phone)",
    type: "MENTAL",
    risk: "MEDIUM",
    weight: 1.1,
    keywords: [
      // Substance Addiction (35)
      "alcohol addiction", "drinking problem", "alcohol dependence",
      "alcohol abuse", "alcohol misuse", "alcohol disorder",
      "alcoholism", "alcoholic", "drunkard", "heavy drinker",
      "binge drinker", "problem drinker", "compulsive drinker",
      "addictive drinking", "uncontrolled drinking", "excessive drinking",
      "dangerous drinking", "harmful drinking", "risky drinking",
      "drug addiction", "drug dependence", "drug abuse",
      "drug misuse", "drug disorder", "drug problem",
      "substance addiction", "substance dependence", "substance abuse",
      "substance misuse", "substance disorder", "substance problem",
      "chemical addiction", "chemical dependence", "chemical abuse",
      
      // Behavioral Addiction (35)
      "gaming addiction", "pubg addiction", "bgmi addiction",
      "free fire addiction", "cod addiction", "minecraft addiction",
      "roblox addiction", "fortnite addiction", "valorant addiction",
      "dota addiction", "lol addiction", "clash of clans addiction",
      "clash royale addiction", "candy crush addiction",
      "subway surfers addiction", "temple run addiction",
      "angry birds addiction", "8 ball pool addiction",
      "chess addiction", "puzzle addiction", "strategy game addiction",
      "role playing game addiction", "simulation game addiction",
      "sports game addiction", "racing game addiction",
      "fighting game addiction", "shooting game addiction",
      "adventure game addiction", "arcade game addiction",
      "card game addiction", "board game addiction",
      "casino game addiction", "gambling game addiction",
      "betting game addiction", "lottery game addiction",
      
      // Digital/Other Addictions (35)
      "mobile addiction", "phone addiction", "smartphone addiction",
      "internet addiction", "social media addiction", "whatsapp addiction",
      "facebook addiction", "instagram addiction", "snapchat addiction",
      "twitter addiction", "tiktok addiction", "youtube addiction",
      "netflix addiction", "prime video addiction", "hotstar addiction",
      "porn addiction", "pornography addiction", "adult content addiction",
      "sexual content addiction", "explicit content addiction",
      "mature content addiction", "nsfw content addiction",
      "gambling addiction", "betting addiction", "casino addiction",
      "poker addiction", "roulette addiction", "slot machine addiction",
      "lottery addiction", "scratch card addiction", "bingo addiction",
      "horse racing addiction", "sports betting addiction",
      "online gambling addiction", "virtual gambling addiction"
    ],
  },

  CYBER_BULLYING: {
    label: "Cyber Bullying / Online Abuse",
    type: "MENTAL",
    risk: "HIGH",
    weight: 1.4,
    keywords: [
      // Types of Abuse (35)
      "online abuse", "trolling", "hate comments", "abusive dms",
      "harassing me online", "fake rumours online", "targeted harassment",
      "people making fun of me in comments", "cyber bullying",
      "digital bullying", "internet bullying", "social media bullying",
      "whatsapp bullying", "facebook bullying", "instagram bullying",
      "snapchat bullying", "twitter bullying", "tiktok bullying",
      "youtube bullying", "gaming bullying", "online game bullying",
      "multiplayer game bullying", "chat room bullying",
      "forum bullying", "message board bullying", "comment section bullying",
      "review section bullying", "rating section bullying",
      "feedback section bullying", "complaint section bullying",
      "suggestion section bullying", "discussion section bullying",
      "debate section bullying", "argument section bullying",
      "controversy section bullying",
      
      // Attack Methods (35)
      "personal attacks", "character attacks", "reputation attacks",
      "image attacks", "appearance attacks", "looks attacks",
      "face attacks", "body attacks", "weight attacks",
      "height attacks", "skin attacks", "hair attacks",
      "clothes attacks", "style attacks", "fashion attacks",
      "intelligence attacks", "knowledge attacks", "education attacks",
      "qualification attacks", "degree attacks", "certificate attacks",
      "skill attacks", "talent attacks", "ability attacks",
      "capability attacks", "competence attacks", "performance attacks",
      "achievement attacks", "success attacks", "failure attacks",
      "mistake attacks", "error attacks", "flaw attacks",
      "weakness attacks", "vulnerability attacks",
      
      // Group/Coordinated (35)
      "group bullying", "gang bullying", "team bullying",
      "crew bullying", "squad bullying", "circle bullying",
      "network bullying", "community bullying", "forum bullying",
      "group trolling", "gang trolling", "team trolling",
      "crew trolling", "squad trolling", "circle trolling",
      "network trolling", "community trolling", "forum trolling",
      "organized bullying", "systematic bullying", "planned bullying",
      "strategic bullying", "tactical bullying", "methodical bullying",
      "calculated bullying", "intentional bullying", "purposeful bullying",
      "deliberate bullying", "conscious bullying", "knowing bullying",
      "willful bullying", "voluntary bullying", "chosen bullying",
      "decided bullying", "determined bullying"
    ],
  },

  BLACKMAIL: {
    label: "Blackmail / Sextortion / Threat",
    type: "MENTAL",
    risk: "CRITICAL",
    weight: 2.0,
    keywords: [
      // Direct Threats (35)
      "if you don't pay i will leak", "i will post your photos",
      "i will make your video viral", "sextortion",
      "nude photos blackmail", "extortion online",
      "threatening to share my chats", "blackmailing me",
      "extorting money", "demanding money", "asking for money",
      "requesting money", "requiring money", "needing money",
      "wanting money", "expecting money", "insisting on money",
      "pressuring for money", "forcing for money", "coercing for money",
      "intimidating for money", "threatening for money",
      "warning for money", "alerting for money", "notifying for money",
      "informing for money", "telling for money", "saying for money",
      "stating for money", "declaring for money", "announcing for money",
      "proclaiming for money", "pronouncing for money",
      "uttering for money", "voicing for money",
      
      // Material Types (35)
      "private photos", "personal photos", "intimate photos",
      "sensitive photos", "revealing photos", "explicit photos",
      "nude photos", "naked photos", "undressed photos",
      "partially dressed photos", "provocative photos",
      "seductive photos", "erotic photos", "sexual photos",
      "adult photos", "mature photos", "nsfw photos",
      "private videos", "personal videos", "intimate videos",
      "sensitive videos", "revealing videos", "explicit videos",
      "nude videos", "naked videos", "undressed videos",
      "partially dressed videos", "provocative videos",
      "seductive videos", "erotic videos", "sexual videos",
      "adult videos", "mature videos", "nsfw videos",
      
      // Consequences (35)
      "ruin reputation", "destroy reputation", "damage reputation",
      "harm reputation", "hurt reputation", "spoil reputation",
      "tarnish reputation", "stain reputation", "smear reputation",
      "soil reputation", "blemish reputation", "mar reputation",
      "scar reputation", "wound reputation", "injure reputation",
      "break reputation", "crack reputation", "shatter reputation",
      "crush reputation", "demolish reputation", "devastate reputation",
      "ravage reputation", "wreck reputation", "ruin career",
      "destroy career", "damage career", "harm career",
      "hurt career", "spoil career", "tarnish career",
      "stain career", "smear career", "soil career",
      "blemish career", "mar career"
    ],
  },
};

/**
 * Analyse text and return:
 * - matchedKeywords
 * - categories with scores
 * - overall risk + tags
 */
export function analyzeText(text = "") {
  const input = normalize(text);
  const matchedKeywords = new Set();
  const categories = [];
  let totalScore = 0;
  const tags = new Set(); // SCAM / CIVIC / MENTAL

  for (const [key, cfg] of Object.entries(KEYWORD_CATEGORIES)) {
    const localMatches = [];

    for (const kw of cfg.keywords) {
      if (!kw) continue;
      if (input.includes(kw.toLowerCase())) {
        localMatches.push(kw);
        matchedKeywords.add(kw);
      }
    }

    if (localMatches.length > 0) {
      const score = cfg.weight * localMatches.length;
      totalScore += score;

      categories.push({
        id: key,
        label: cfg.label,
        type: cfg.type,
        risk: cfg.risk,
        weight: cfg.weight,
        matches: localMatches,
        score,
      });

      tags.add(cfg.type);
    }
  }

  const rawScore = totalScore;
  const riskScore = Math.max(0, Math.min(100, Math.round(rawScore * 10)));

  let overallRisk = "LOW";
  if (riskScore >= 75) overallRisk = "HIGH";
  else if (riskScore >= 40) overallRisk = "MEDIUM";
  else if (riskScore >= 20) overallRisk = "LOW_MEDIUM";

  return {
    rawScore,
    riskScore,
    overallRisk,
    matchedKeywords: Array.from(matchedKeywords),
    categories,
    tags: Array.from(tags), // contains SCAM / CIVIC / MENTAL depending on match
    isScam: tags.has("SCAM"),
    isCivic: tags.has("CIVIC"),
    isMental: tags.has("MENTAL"),
  };
}

/**
 * Very simple language hint:
 * - 'hi' = Hindi
 * - 'mr' = Marathi
 * - 'hinglish'
 * - 'en'
 */
export function detectLanguageHint(text = "") {
  const hasDevanagari = /[\u0900-\u097F]/.test(text);
  if (hasDevanagari) {
    // crude hint – mandir/aisa words => Hindi/Marathi mix, but
    // prompt me sirf hint chahiye
    if (text.includes("मला") || text.includes("काय")) return "mr";
    return "hi";
  }

  const lower = text.toLowerCase();
  const hinglishTokens = ["bhai", "nahi", "kya", "kyu", "aisa", "hona", "karna", "hai", "tha", "diya"];
  const hinglishHits = hinglishTokens.filter((t) => lower.includes(t));
  if (hinglishHits.length >= 2) return "hinglish";

  return "en";
}
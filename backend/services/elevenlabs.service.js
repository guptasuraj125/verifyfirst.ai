import axios from "axios";

export async function generateVoice(text) {
  try {
    const res = await axios.post(
      "https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL",
      {
        text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.7
        }
      },
      {
        headers: {
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    return res.data.audio_url || null;
  } catch (err) {
    console.log("❌ ElevenLabs Error:", err.message);
    return null;
  }
}

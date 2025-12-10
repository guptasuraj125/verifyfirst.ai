import vision from "@google-cloud/vision";

const client = new vision.ImageAnnotatorClient({
  keyFilename: "google-vision-key.json" // service account file
});

export async function detectImageText(imageUrl) {
  try {
    const [result] = await client.textDetection(imageUrl);
    const detections = result.textAnnotations;

    if (!detections || detections.length === 0) {
      return "";
    }

    return detections[0].description; // full extracted text
  } catch (err) {
    console.error("Image Detection Error:", err.message);
    return "";
  }
}

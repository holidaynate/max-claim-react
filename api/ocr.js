import vision from '@google-cloud/vision';

const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { imageUrl } = req.body;
  
  try {
    // Perform OCR
    const [result] = await client.textDetection(imageUrl);
    const detections = result.textAnnotations;
    const text = detections.length > 0 ? detections[0].description : '';
    
    // Label detection for auto-captioning
    const [labelResult] = await client.labelDetection(imageUrl);
    const labels = labelResult.labelAnnotations.map(label => label.description);
    
    return res.status(200).json({
      text,
      labels,
      confidence: detections[0]?.confidence || 0
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Example Node.js backend for Gemini API proxy
// Deploy this to: Vercel, Netlify Functions, AWS Lambda, or your own server

import { GoogleGenAI, Type } from "@google/genai";

// Environment variable should be set on your backend server
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export default async function handler(req, res) {
  // CORS headers (adjust for production)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { dilemma, language } = req.body;

    if (!dilemma || !language) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Rate limiting check (implement your own logic)
    // checkRateLimit(req);

    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    
    const systemInstruction = language === 'tr' 
      ? "Sen bilge bir etik danışmanısın. Kullanıcının ikilemini Immanuel Kant (Ödev), J.S. Mill (Faydacılık) ve Aristoteles (Erdem Etiği) perspektiflerinden detaylıca analiz edersin. 'summary' kısmında ise bu üç perspektife ek olarak John Rawls (Adalet Teorisi), Bakım Etiği ve Varoluşçu perspektifleri de sentezleyerek bütüncül ve bilgece bir rehberlik sunarsın. Cevabın yapılandırılmış, tarafsız ve derinlemesine olmalıdır."
      : "You are a wise ethical advisor. Analyze the user's dilemma in detail from the perspectives of Immanuel Kant (Deontology), J.S. Mill (Utilitarianism), and Aristotle (Virtue Ethics). In the 'summary' part, provide holistic and wise guidance by synthesizing these three perspectives with John Rawls (Justice as Fairness), Care Ethics, and Existentialist lenses. Your response should be structured, neutral, and profound.";

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: dilemma,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            kant: { type: Type.STRING, description: "Analysis based on Deontology/Kant" },
            mill: { type: Type.STRING, description: "Analysis based on Utilitarianism/Mill" },
            aristotle: { type: Type.STRING, description: "Analysis based on Virtue Ethics/Aristotle" },
            summary: { type: Type.STRING, description: "A balanced summary or practical advice synthesizing all known frameworks" },
            microQuestions: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING },
              description: "3-5 thought-provoking questions to deepen the reflection"
            }
          },
          required: ["kant", "mill", "aristotle", "summary", "microQuestions"]
        }
      }
    });

    const result = JSON.parse(response.text.trim());
    return res.status(200).json(result);

  } catch (error) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({ error: 'Analysis failed' });
  }
}

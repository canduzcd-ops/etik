// Netlify Function for Gemini API Proxy
import { GoogleGenAI, Type } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function handler(event, context) {
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // Handle OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Only POST allowed
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { dilemma, language } = JSON.parse(event.body);

    if (!dilemma || !language) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

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
            kant: { type: Type.STRING },
            mill: { type: Type.STRING },
            aristotle: { type: Type.STRING },
            summary: { type: Type.STRING },
            microQuestions: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING }
            }
          },
          required: ["kant", "mill", "aristotle", "summary", "microQuestions"]
        }
      }
    });

    const result = JSON.parse(response.text.trim());
    
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(result)
    };

  } catch (error) {
    console.error('Gemini API Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Analysis failed' })
    };
  }
}

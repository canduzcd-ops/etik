// Firebase Function for Gemini API
const functions = require('firebase-functions');
const cors = require('cors')({origin: true});
const { GoogleGenAI, Type } = require('@google/genai');

exports.analyzeEthicalDilemma = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const { dilemma, language } = req.body;

      if (!dilemma || !language) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const apiKey = functions.config().gemini.apikey;
      const ai = new GoogleGenAI({ apiKey });
      
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
      return res.status(200).json(result);

    } catch (error) {
      console.error('Gemini API Error:', error);
      return res.status(500).json({ error: 'Analysis failed' });
    }
  });
});

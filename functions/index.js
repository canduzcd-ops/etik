/**
 * Firebase Cloud Function for ETİK - Gemini API Proxy
 */

const {onRequest} = require("firebase-functions/https");
const {setGlobalOptions} = require("firebase-functions");
const logger = require("firebase-functions/logger");

setGlobalOptions({maxInstances: 10});

let GoogleGenAI;
let Type;
let corsHandler;

exports.analyzeEthicalDilemma = onRequest(async (req, res) => {
  if (!corsHandler) {
    const cors = require("cors");
    corsHandler = cors({origin: true});
  }
  await new Promise((resolve) => corsHandler(req, res, resolve));

  if (req.method !== "POST") {
    return res.status(405).json({error: "Method not allowed"});
  }

  try {
    const {dilemma, language} = req.body;
    if (!dilemma || !language) {
      return res.status(400).json({error: "Missing required fields"});
    }

    if (!GoogleGenAI) {
      const geminiModule = require("@google/genai");
      GoogleGenAI = geminiModule.GoogleGenAI;
      Type = geminiModule.Type;
    }

    // Hardcoded for deployment
    const apiKey = "AIzaSyBCBIkfbyZtyp52VZJE23K9gleKjEdIYbw";
    if (!apiKey) {
      return res.status(500).json({error: "Configuration error"});
    }

    const ai = new GoogleGenAI({apiKey});
    const systemTR = "Sen bilge bir etik danışmanısın. " +
      "Kullanıcının ikilemini Immanuel Kant (Ödev), J.S. Mill " +
      "(Faydacılık) ve Aristoteles (Erdem Etiği) perspektiflerinden " +
      "detaylıca analiz edersin. 'summary' kısmında ise bu üç " +
      "perspektife ek olarak John Rawls (Adalet Teorisi), Bakım " +
      "Etiği ve Varoluşçu perspektifleri de sentezleyerek bütüncül " +
      "ve bilgece bir rehberlik sunarsın. Cevabın yapılandırılmış, " +
      "tarafsız ve derinlemesine olmalıdır.";
    const systemEN = "You are a wise ethical advisor. Analyze the " +
      "user's dilemma in detail from the perspectives of Immanuel " +
      "Kant (Deontology), J.S. Mill (Utilitarianism), and Aristotle " +
      "(Virtue Ethics). In the 'summary' part, provide holistic and " +
      "wise guidance by synthesizing these three perspectives with " +
      "John Rawls (Justice as Fairness), Care Ethics, and " +
      "Existentialist lenses. Your response should be structured, " +
      "neutral, and profound.";
    const systemInstruction = language === "tr" ? systemTR : systemEN;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: dilemma,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            kant: {
              type: Type.STRING,
              description: "Analysis based on Deontology/Kant",
            },
            mill: {
              type: Type.STRING,
              description: "Analysis based on Utilitarianism/Mill",
            },
            aristotle: {
              type: Type.STRING,
              description: "Analysis based on Virtue Ethics/Aristotle",
            },
            summary: {
              type: Type.STRING,
              description: "A balanced summary or practical advice" +
                " synthesizing all known frameworks",
            },
            microQuestions: {
              type: Type.ARRAY,
              items: {type: Type.STRING},
              description: "3-5 thought-provoking questions to" +
                " deepen the reflection",
            },
          },
          required: ["kant", "mill", "aristotle",
            "summary", "microQuestions"],
        },
      },
    });

    return res.status(200).json(JSON.parse(response.text.trim()));
  } catch (error) {
    logger.error("Error:", error);
    return res.status(500).json({
      error: "Analysis failed",
      details: error.message,
    });
  }
});

exports.health = onRequest((req, res) => {
  res.json({status: "healthy", service: "ETİK", version: "1.0.0"});
});

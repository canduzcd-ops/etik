# 🔥 Firebase Functions Deployment

## Kurulum

```bash
npm install -g firebase-tools
firebase login
firebase init functions
```

Setup sırasında:
- Language: JavaScript
- ESLint: No (opsiyonel)
- Install dependencies: Yes

## Dependencies

```bash
cd functions
npm install @google/genai cors
```

## Config

```bash
firebase functions:config:set gemini.apikey="YOUR_GEMINI_API_KEY"
```

## Deploy

```bash
firebase deploy --only functions
```

## URL

```
https://us-central1-YOUR-PROJECT.cloudfunctions.net/analyzeEthicalDilemma
```

## Maliyet

- **Ücretsiz tier:** 2M invocations/ay
- Yeterli!

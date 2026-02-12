# 🔐 API Güvenliği - Backend Proxy Kurulumu

## Neden Backend Proxy Gerekli?

**Güvenlik Riski:** API key'iniz client-side kodda bulunursa, herhangi biri uygulamanızı decompile edip key'i çalabilir ve kendi projelerinde kullanabilir. Bu da:
- API kotanızın tükenmesine
- Beklenmeyen maliyetlere
- Güvenlik ihlallerine yol açar

## Çözüm: Backend Proxy

```
[Mobil Uygulama] → [Sizin Backend API] → [Gemini API]
                   (API key burada)
```

## Hızlı Kurulum Seçenekleri

### Seçenek 1: Vercel (Önerilen - Ücretsiz)

1. **Vercel hesabı oluşturun:** https://vercel.com

2. **Backend klasörünü deploy edin:**
```bash
cd backend-example
npm init -y
npm install @google/genai
```

3. **vercel.json oluşturun:**
```json
{
  "functions": {
    "api/analyze.js": {
      "memory": 1024,
      "maxDuration": 30
    }
  }
}
```

4. **Deploy:**
```bash
npx vercel
```

5. **Environment variables ekleyin:**
Vercel Dashboard → Settings → Environment Variables:
- `GEMINI_API_KEY`: [Your Gemini API Key]

6. **Uygulamanızda güncelleyin:**
```typescript
// services/geminiServiceSecure.ts
const API_ENDPOINT = 'https://your-app.vercel.app/api/analyze';
```

### Seçenek 2: Netlify Functions

1. **netlify.toml oluşturun:**
```toml
[build]
  functions = "netlify/functions"

[functions]
  node_bundler = "esbuild"
```

2. **Function oluşturun:**
```bash
mkdir -p netlify/functions
# backend-example/api/analyze.js dosyasını buraya kopyalayın
```

3. **Deploy:**
```bash
npx netlify deploy
```

### Seçenek 3: Firebase Functions

```bash
firebase init functions
# backend-example/api/analyze.js kodunu functions/index.js'e taşıyın
firebase deploy --only functions
```

### Seçenek 4: AWS Lambda

AWS Console → Lambda → Create Function:
- Runtime: Node.js 18+
- Code: backend-example/api/analyze.js
- Environment Variables: GEMINI_API_KEY
- API Gateway trigger ekleyin

### Seçenek 5: Kendi Sunucunuz (Express.js)

```bash
npm install express @google/genai cors
```

```javascript
// server.js
const express = require('express');
const cors = require('cors');
const analyzeHandler = require('./api/analyze');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/analyze', analyzeHandler);

app.listen(3001, () => {
  console.log('Backend running on port 3001');
});
```

## Uygulamada Kullanım

### 1. Güvenli servisi import edin:

```typescript
// components/AskScreen.tsx
import { analyzeDilemmaSecure } from '../services/geminiServiceSecure';

// Eski:
// import { analyzeDilemma } from '../services/geminiService';
```

### 2. Kullanın:

```typescript
const response = await analyzeDilemmaSecure(dilemma, language);
```

## Güvenlik Özellikleri

### Rate Limiting Ekleyin

```javascript
// api/analyze.js içinde
const rateLimit = new Map();

function checkRateLimit(req) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const now = Date.now();
  const userRequests = rateLimit.get(ip) || [];
  
  // Son 1 dakikada 10'dan fazla istek varsa reddet
  const recentRequests = userRequests.filter(t => now - t < 60000);
  if (recentRequests.length >= 10) {
    throw new Error('Rate limit exceeded');
  }
  
  recentRequests.push(now);
  rateLimit.set(ip, recentRequests);
}
```

### Authentication Ekleyin

```javascript
// api/analyze.js
const APP_SECRET = process.env.APP_SECRET;

export default async function handler(req, res) {
  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${APP_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  // ... rest of code
}
```

```typescript
// services/geminiServiceSecure.ts
const APP_SECRET = 'your-app-secret'; // Bu da güvenli şekilde saklanmalı

const response = await fetch(API_ENDPOINT, {
  headers: {
    'Authorization': `Bearer ${APP_SECRET}`,
    'Content-Type': 'application/json'
  },
  // ...
});
```

## Maliyet Optimizasyonu

### Caching Ekleyin

```javascript
const cache = new Map();

export default async function handler(req, res) {
  const cacheKey = `${req.body.dilemma}-${req.body.language}`;
  
  // Cache'de varsa direkt dön
  if (cache.has(cacheKey)) {
    return res.status(200).json(cache.get(cacheKey));
  }
  
  const result = await callGeminiAPI(req.body);
  cache.set(cacheKey, result);
  
  return res.status(200).json(result);
}
```

## Test

```bash
curl -X POST https://your-backend.com/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "dilemma": "Test dilemma",
    "language": "tr"
  }'
```

## Backup Plan: Geçici Olarak Client-Side

Eğer backend kurulumu zaman alıyorsa, geçici olarak:

1. API key'i environment variable olarak ayarlayın
2. Uygulamayı sadece belirli kişilere test için verin
3. Production'a geçmeden backend'i mutlaka kurun

## Monitoring

Backend loglarını izleyin:
- Request sayısı
- Error rate
- Response time
- API maliyetleri

**ÖNEMLİ:** Production'a çıkmadan önce backend proxy'yi mutlaka kurun!

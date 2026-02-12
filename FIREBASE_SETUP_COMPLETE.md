# 🔥 Firebase Functions - ETİK API

## ✅ Kurulum Tamamlandı

Firebase Functions başarıyla kuruldu!

### 📍 Proje Bilgileri
- **Proje ID:** etik-de7f8
- **Proje Adı:** etik
- **Proje Numarası:** 784111522835

### 🔧 Yapılandırılan Dosyalar
- ✅ `functions/index.js` - Gemini API proxy
- ✅ `functions/package.json` - Dependencies (cors, @google/genai)
- ✅ `firebase.json` - Firebase config
- ✅ `.firebaserc` - Proje bağlantısı

---

## ⚠️ API Key Yapılandırması

Firebase Secrets için **Blaze Plan** (ücretli) gerekiyor.

### Seçenek 1: Environment Variable (Önerilen)

`.env` dosyası oluştur:
```bash
cd functions
echo "GEMINI_API_KEY=AIzaSyD9bsD4Dt0sTKCkAY0OTRr4fNw-hGCfZkk" > .env
```

**ÖNEMLİ:** `.env` dosyasını `.gitignore`'a ekle!

### Seçenek 2: Firebase Blaze Plan (Ücretli)

1. https://console.firebase.google.com/project/etik-de7f8/usage/details
2. Blaze plan'a geç (pay-as-you-go)
3. API key'i secret olarak ekle:
```bash
firebase functions:secrets:set GEMINI_API_KEY
# Prompt'ta API key'i yapıştır: AIzaSyD9bsD4Dt0sTKCkAY0OTRr4fNw-hGCfZkk
```

### Seçenek 3: Hardcode (Sadece Test İçin, ÖNERİLMEZ!)

`functions/index.js`'de:
```javascript
const apiKey = "AIzaSyD9bsD4Dt0sTKCkAY0OTRr4fNw-hGCfZkk";
```

---

## 🚀 Deploy

### 1. API Key'i Ayarla

**Environment Variable ile (ÖNERİLEN):**

`functions/.env` oluştur:
```env
GEMINI_API_KEY=AIzaSyD9bsD4Dt0sTKCkAY0OTRr4fNw-hGCfZkk
```

`functions/index.js`'de güncelle:
```javascript
// Değiştir:
const apiKey = process.env.GEMINI_API_KEY;

// Veya development için:
require('dotenv').config();
const apiKey = process.env.GEMINI_API_KEY;
```

### 2. Deploy Et

```bash
firebase deploy --only functions
```

### 3. URL'i Al

Deploy sonrası URL:
```
https://us-central1-etik-de7f8.cloudfunctions.net/analyzeEthicalDilemma
```

---

## 📱 Uygulamada Kullanım

### 1. Secure Service Oluştur

`services/geminiServiceSecure.ts`:
```typescript
const API_ENDPOINT = 'https://us-central1-etik-de7f8.cloudfunctions.net/analyzeEthicalDilemma';

export const analyzeDilemmaSecure = async (dilemma: string, lang: string) => {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dilemma,
        language: lang
      })
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Analysis failed:', error);
    throw error;
  }
};
```

### 2. AskScreen'de Kullan

`components/AskScreen.tsx`:
```typescript
import { analyzeDilemmaSecure } from '../services/geminiServiceSecure';

// Eski:
// const result = await analyzeDilemma(dilemma, language);

// Yeni:
const result = await analyzeDilemmaSecure(dilemma, language);
```

---

## 🧪 Test

### Local Test (Firebase Emulator)

```bash
firebase emulators:start --only functions
```

Endpoint: `http://localhost:5001/etik-de7f8/us-central1/analyzeEthicalDilemma`

### cURL ile Test

```bash
curl -X POST https://us-central1-etik-de7f8.cloudfunctions.net/analyzeEthicalDilemma \
  -H "Content-Type: application/json" \
  -d '{
    "dilemma": "Test dilemma",
    "language": "tr"
  }'
```

### Health Check

```bash
curl https://us-central1-etik-de7f8.cloudfunctions.net/health
```

---

## 💰 Maliyet

### Firebase Spark Plan (Ücretsiz)
- ❌ Secrets kullanamaz
- ✅ Functions kullanabilir (sınırlı)
- ✅ 2M invocations/ay
- ✅ ETİK için yeterli

### Firebase Blaze Plan (Ücretli)
- ✅ Secrets kullanabilir
- ✅ Unlimited functions
- ✅ Pay-as-you-go
- İlk 2M invocation ücretsiz

**Tahmini maliyet:** ~$0-5/ay (1000 kullanıcı için)

---

## 📊 Monitoring

Firebase Console'da:
1. Functions → Dashboard
2. Logs → View logs
3. Usage → Invocations, errors, duration

---

## 🔒 Güvenlik

### Firestore Rules

Firestore kullanmıyorsanız varsayılan kuralları bırakın:

`firestore.rules`:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### Functions CORS

CORS halihazırda yapılandırılmış:
```javascript
const cors = require("cors")({origin: true});
```

Production için:
```javascript
const cors = require("cors")({
  origin: ["https://your-app-domain.com", "capacitor://localhost"],
  methods: ["POST"],
});
```

---

## 🐛 Sorun Giderme

### Deploy Hatası

```bash
# Cache temizle
firebase functions:delete analyzeEthicalDilemma
firebase deploy --only functions

# Log kontrol
firebase functions:log
```

### API Key Hatası

```bash
# Environment variable kontrol
cd functions
cat .env

# Node version kontrol (>=18 gerekli)
node --version
```

### CORS Hatası

Functions'da CORS middleware'in aktif olduğundan emin olun.

---

## ✅ Sonraki Adımlar

1. **API Key'i yapılandır** (environment variable)
2. **Deploy et:** `firebase deploy --only functions`
3. **URL'i kopyala ve uygulamaya ekle**
4. **Test et**
5. **Build ve Play Store'a yükle!**

---

**API Key:** AIzaSyD9bsD4Dt0sTKCkAY0OTRr4fNw-hGCfZkk
**Endpoint:** https://us-central1-etik-de7f8.cloudfunctions.net/analyzeEthicalDilemma

🎉 Firebase backend hazır!

# 🚀 Netlify Deployment Kılavuzu

## Neden Netlify?

- ✅ **Ücretsiz** (100GB bandwidth/ay)
- ✅ **Kolay setup** (5 dakika)
- ✅ **Otomatik HTTPS**
- ✅ **Global CDN**
- ✅ **Serverless Functions**

## Adım 1: Netlify CLI Kurulumu

```bash
npm install -g netlify-cli
```

## Adım 2: Netlify Login

```bash
netlify login
# Browser'da Netlify hesabınıza giriş yapın
```

## Adım 3: Dependencies Yükle

```bash
cd netlify/functions
npm init -y
npm install @google/genai
```

## Adım 4: Deploy

```bash
# Ana klasörde
netlify init

# Sorulara cevaplar:
# - Create & configure a new site
# - Team: Your team
# - Site name: etik-api (veya benzeri)
# - Build command: npm run build
# - Publish directory: dist
# - Functions directory: netlify/functions
```

## Adım 5: Environment Variable Ekle

```bash
# Netlify dashboard'da:
# Site Settings → Environment Variables → Add variable

# Veya CLI ile:
netlify env:set GEMINI_API_KEY "your_api_key_here"
```

## Adım 6: Deploy

```bash
netlify deploy --prod
```

## Adım 7: API URL'i Kaydet

Deploy sonrası URL'i alın:
```
Your site is live: https://etik-api.netlify.app
API Endpoint: https://etik-api.netlify.app/.netlify/functions/analyze
```

## Adım 8: Uygulamada Kullan

`services/geminiServiceSecure.ts` dosyasına URL'i girin:

```typescript
const API_ENDPOINT = 'https://etik-api.netlify.app/.netlify/functions/analyze';
```

## Test

```bash
curl -X POST https://etik-api.netlify.app/.netlify/functions/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "dilemma": "Test dilemma",
    "language": "tr"
  }'
```

## Monitoring

Netlify Dashboard'da:
- Function calls
- Errors
- Performance metrics
- Logs

## Otomatik Deploy (Opsiyonel)

GitHub'a push ettiğinizde otomatik deploy için:

```bash
# GitHub repo'nuza connect edin
netlify link
```

Artık her push'ta otomatik deploy olur!

## Maliyet

**Ücretsiz tier:**
- 125K function requests/ay
- 100 hours runtime/ay
- Bandwidth: 100GB/ay

Bu limitler ETİK uygulaması için **fazlasıyla yeterli**!

---

**İletişim:** support@racalabs.com

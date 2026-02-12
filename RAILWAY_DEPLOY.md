# 🚂 Railway.app Deployment Kılavuzu

## Neden Railway?

- ✅ **Ücretsiz** ($5 credit/ay)  
- ✅ **Çok kolay** (GitHub'dan otomatik deploy)
- ✅ **25K requests/ay** ücretsiz
- ✅ **Otomatik HTTPS**
- ✅ **Database destekli** (ihtiyaç olursa)

## Adım 1: Railway Hesabı

1. https://railway.app adresine git
2. GitHub ile giriş yap

## Adım 2: Proje Hazırlığı

```bash
cd railway-server
npm install
```

## Adım 3: GitHub'a Push (Opsiyonel)

```bash
git init
git add .
git commit -m "Railway backend"
git remote add origin your-repo-url
git push -u origin main
```

## Adım 4: Railway'de Deploy

### A) GitHub üzerinden (Önerilen):

1. Railway Dashboard → New Project
2. Deploy from GitHub repo seç
3. Repository'yi seç
4. Root directory: `railway-server`
5. Environment Variables ekle:
   - `GEMINI_API_KEY`: your_api_key

### B) CLI ile:

```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

## Adım 5: Environment Variable

Railway Dashboard'da:
- Variables → Add Variable
- `GEMINI_API_KEY` = your_gemini_api_key

## Adım 6: URL Al

Deploy tamamlandıktan sonra:
```
Deployment URL: https://etik-api-production.up.railway.app
API Endpoint: https://etik-api-production.up.railway.app/api/analyze
```

## Adım 7: Uygulamada Kullan

`services/geminiServiceSecure.ts`:
```typescript
const API_ENDPOINT = 'https://your-app.up.railway.app/api/analyze';
```

## Test

```bash
curl -X POST https://your-app.up.railway.app/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "dilemma": "Test",
    "language": "tr"
  }'
```

## Monitoring

Railway Dashboard'da:
- Logs (real-time)
- Metrics
- Usage
- Deployments

## Maliyet

**Ücretsiz tier:**
- $5 credit/ay
- ~25K requests/ay
- 500 MB RAM
- 1 GB disk

Yeterli değilse **$5/ay** ile sınırsız.

---

**İletişim:** support@racalabs.com

# 🕊️ ETİK - Ethical Decision Making App

**ETİK**, yapay zeka destekli etik karar verme asistanıdır. Google Gemini AI ile güçlendirilmiş, gamification ve kapsamlı içerik kütüphanesiyle zenginleştirilmiştir.

## ✨ Özellikler

### 🎯 Ana Özellikler
- **AI Analizi**: Google Gemini 3 Flash Preview
- **Multi-Framework**: Kant, Mill, Aristotle, Rawls, Singer perspektifleri
- **37 Filozof Alıntısı**: Analiz sırasında dönen felsefe sözleri
- **Kişilik Testi**: 19 soruluk kişiselleştirilmiş profil

### 📊 Gamification
- **Puan Sistemi**: Analiz +10p, Paylaşım +3p
- **Streak**: Günlük kullanım takibi
- **10 Rozet**: İlk analiz, 7 gün streak, 100 puan vb.
- **Haftalık Grafik**: Son 4 hafta aktivite
- **Etik Dağılım**: Kant/Mill/Aristotle yüzdeleri

### 🎁 Paylaşım
- **Metin Kopyala**
- **Görsel Kart**: 9:16 Canvas (Instagram/WhatsApp)
- **WhatsApp**: Direkt paylaşım linki

### 📚 Kütüphane
- **11 Kategori**: İş, Tıp, Teknoloji Etiği vs.
- **67+ Vaka**: Gerçek hayat senaryoları
- **Arama & Filtre**: Arama + kategori filtreleme
- **Detay Modal**: Açıklama + "Analiz Et"

### 💎 Freemium
- **3 Ücretsiz/Gün**: Günlük limit
- **Premium Modal**: In-app purchase hazır

### 🎨 4 Tema
PURE (beyaz), SAGE (yeşil), SAND (kahve), SLATE (gri)

### 🔐 Backend
- **Firebase Auth**: Email, Google, Anonymous
- **Cloud Functions**: Gemini API proxy (güvenli)
- **Secure**: API key client'ta yok

## 🚀 Tech Stack

```
React 19 + TypeScript + Vite 6.4
Capacitor 8.0.2 (Android/iOS)
Firebase Functions + Gemini AI
Tailwind CSS
506KB minified (141KB gzip)
```

## 📦 Kurulum

```bash
git clone https://github.com/canduzcd-ops/etik.git
cd etik
npm install
npm run dev
```

## 🔧 Firebase Setup

1. Firebase Console'da proje oluştur
2. `services/firebaseConfig.ts` güncelle
3. Functions deploy: `cd functions && firebase deploy --only functions`
4. Gemini API key'i `functions/index.js`'e ekle

## 📱 Yapı

```
components/
  ├── AskScreen.tsx          # Ana analiz
  ├── LibraryScreen.tsx      # Kütüphane + arama
  ├── ProfileScreen.tsx      # Profil + gamification
  ├── SavedScreen.tsx        # Kaydedilenler
  ├── SettingsScreen.tsx     # Ayarlar
  ├── ShareSheet.tsx         # Paylaşım modal
  ├── PaywallScreen.tsx      # Premium
  └── AuthScreen.tsx         # Giriş
services/
  ├── gamification.ts        # Puan/rozet/streak
  ├── freemium.ts            # Günlük limit
  └── analytics.ts           # Event tracking
constants.tsx                # 67 vaka + temalar
```

## 📄 License

MIT

## 👨‍💻 Author

**Can Düz** - [canduzcd-ops](https://github.com/canduzcd-ops)

---

`com.racalabs.etik` v1.0.0 • Firebase: etik-de7f8

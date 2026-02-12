# 🚀 Google Play Store Yayınlama Kılavuzu

## ✅ Tamamlanan Hazırlıklar

### 1. Signing & Build Configuration
- ✅ Release keystore template oluşturuldu
- ✅ build.gradle signing config eklendi
- ✅ ProGuard/R8 optimizasyonları aktif
- ✅ .gitignore güvenlik ayarları yapıldı
- ✅ Version: 1.0.0 (versionCode: 1)

### 2. Güvenlik
- ✅ API key güvenliği için backend proxy çözümü hazır
- ✅ ProGuard rules Capacitor için optimize edildi
- ✅ Gereksiz permissions temizlendi

### 3. Yasal Dökümanlar
- ✅ Privacy Policy (TR & EN)
- ✅ KVKK & GDPR uyumlu
- ✅ Google AI data usage açıklamaları

### 4. Store Listing Materyalleri
- ✅ Kısa açıklama (TR & EN)
- ✅ Uzun açıklama (TR & EN)
- ✅ Release notes hazır
- ✅ Keywords belirlendi
- ✅ Kategori önerileri

---

## 📋 Yayınlama Adımları

### ADIM 1: Keystore Oluşturma

```bash
cd android
keytool -genkey -v -keystore etik-release.keystore \
  -alias etik-key \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

**Sonra:**
```bash
cp keystore.properties.template keystore.properties
# keystore.properties dosyasını düzenle ve şifrelerini gir
```

📖 Detaylı talimatlar: `KEYSTORE_INSTRUCTIONS.md`

---

### ADIM 2: Backend API (Güvenlik)

⚠️ **KRİTİK:** Production'a geçmeden backend proxy kurulumu **ZORUNLU**

**Hızlı Seçenek (Vercel - Ücretsiz):**
```bash
cd backend-example
npm init -y
npm install @google/genai
npx vercel
```

📖 Detaylı talimatlar: `API_SECURITY_GUIDE.md`

---

### ADIM 3: Privacy Policy Hosting

Privacy Policy'yi yayınlamanız gerekiyor. Seçenekler:

**A) GitHub Pages (Ücretsiz):**
```bash
# 1. GitHub repository oluştur
# 2. PRIVACY_POLICY.html ve PRIVACY_POLICY_EN.html dosyalarını yükle
# 3. Settings → Pages → Enable
# URL: https://username.github.io/repo-name/PRIVACY_POLICY.html
```

**B) Kendi web siteniz:**
- `PRIVACY_POLICY.html` dosyasını sitenize yükle
- https://racalabs.com/etik/privacy linkini kullan

**C) Google Sites (Ücretsiz):**
- Google Sites'ta yeni sayfa oluştur
- Privacy Policy içeriğini yapıştır

🔗 **Bu URL'yi Google Play Console'da kullanacaksınız**

---

### ADIM 4: Store Assets Hazırlama

#### A) Screenshot'lar Çekin

**Gerekli:**
- Minimum 2, önerilen 4-8 screenshot
- Format: PNG veya JPEG
- Boyut: En az 320px genişlik, en fazla 3840px

**Önerilen Ekranlar:**
1. Ana ekran (dilemma input)
2. Kütüphane görünümü
3. Analiz sonucu örneği
4. Kayıtlı analizler
5. Tema seçenekleri
6. Kişiselleştirilmiş test
7. Kategori detayı
8. Mikro sorular

**Screenshots nasıl çekilir:**
```bash
# Android emulator'de uygulamayı çalıştır
npm run mobile:android

# Emulator'de screenshot al (Cmd+S veya toolbar'dan)
# Veya gerçek cihazda test et ve screenshot al
```

#### B) Feature Graphic Tasarla

**Boyut:** 1024 x 500 px
**Format:** PNG veya JPEG

**İçerik önerileri:**
- 🕊️ App icon
- "ETİK" başlığı
- "AI-Powered Ethical Guidance" tagline
- Minimal, temiz tasarım

**Tasarım araçları:**
- Figma (ücretsiz)
- Canva (ücretsiz)
- Adobe Photoshop
- Online araçlar: Photopea.com

#### C) High-Res Icon

**Boyut:** 512 x 512 px
**Format:** PNG (transparency ile)

Mevcut app icon'unuzu 512x512 boyutunda export edin.

---

### ADIM 5: Release Build

```bash
# 1. Web build
npm run build

# 2. Capacitor sync
npm run cap:sync

# 3. Release AAB oluştur
cd android
./gradlew bundleRelease

# Çıktı: android/app/build/outputs/bundle/release/app-release.aab
```

**Build sorunları için:**
```bash
# Cache temizle
cd android
./gradlew clean

# Tekrar dene
./gradlew bundleRelease
```

---

### ADIM 6: Google Play Console Setup

#### 1. Google Play Console'a Git
https://play.google.com/console

#### 2. Yeni Uygulama Oluştur
- "Create app" tıkla
- **App name:** ETİK - Ethical Decision Making
- **Default language:** Turkish
- **App or game:** App
- **Free or paid:** Free
- Declarations'ları kabul et

#### 3. Dashboard Tamamla

##### A) App Access
- Default access (no login required)

##### B) Ads
- **Contains ads:** No

##### C) Content Rating
- IARC questionnaire doldur
- Violence: No
- Sexual content: No
- Bad language: No
- Controlled substances: No
- Gambling: No
- Expected rating: Everyone / 3+

##### D) Target Audience
- **Age groups:** 13+
- All demographics

##### E) News App
- **Is this a news app:** No

##### F) COVID-19 Contact Tracing
- **Is this a contact tracing app:** No

##### G) Data Safety
**Data collected:**
- User provided name (optional)
- Dilemma texts
- Test responses
- App preferences

**Data usage:**
- App functionality
- Personalization

**Data sharing:**
- Google Gemini AI (analysis only)

**Data security:**
- Encrypted in transit
- Users can request deletion
- Data stored locally on device

##### H) Government Apps
- **Government app:** No

#### 4. Store Listing Doldur

**Main Store Listing:**

1. **App name:** ETİK - Ethical Decision Making

2. **Short description:** (STORE_LISTING.md'den kopyala)
```
Yapay zeka destekli etik karar asistanı. Felsefi rehberlik sunar.
```

3. **Full description:** (STORE_LISTING.md'den kopyala)
```
🕊️ ETİK - Etik İkilemlerde Yapay Zeka Destekli Rehberlik
...
```

4. **App icon:** 512x512 PNG yükle

5. **Feature graphic:** 1024x500 PNG/JPEG yükle

6. **Phone screenshots:** En az 2, önerilen 4-8 screenshot yükle

7. **7-inch tablet screenshots:** (Opsiyonel ama önerilir)

8. **10-inch tablet screenshots:** (Opsiyonel ama önerilir)

9. **App category:**
   - **Category:** Education veya Lifestyle

10. **Store listing contact details:**
    - **Email:** support@racalabs.com
    - **Website:** https://racalabs.com
    - **Phone:** (Opsiyonel)

11. **Privacy Policy URL:** 
    ```
    [GitHub Pages veya kendi sitenizin URL'si]
    ```

**Translated Listings (İngilizce):**
- "Add language" → English (United States)
- Short description İngilizce versiyonunu gir
- Full description İngilizce versiyonunu gir

#### 5. Pricing & Distribution

1. **Countries:**
   - "Add countries" → Başlangıç için:
     - Turkey (primary)
     - United States
     - United Kingdom
     - Germany
     - Tüm ülkeler için: "Available in all countries"

2. **Pricing:**
   - Free
   - No in-app products

3. **Distribution channels:**
   - Google Play Store
   - Partner programs (isteğe bağlı)

4. **Marketing opt-out:**
   - İsteğe bağlı

#### 6. Production Release Oluştur

1. **Production track'e git**

2. **"Create new release"**

3. **App bundle yükle:**
   ```
   android/app/build/outputs/bundle/release/app-release.aab
   ```

4. **Release name:** 1.0.0

5. **Release notes:**

**Türkçe:**
```
🕊️ ETİK v1.0.0 - İlk Sürüm

✨ Özellikler:
• 77 gerçek yaşam etik ikilemli zengin kütüphane
• Google Gemini AI ile 3 felsefi perspektiften analiz
• Kişiselleştirilmiş mod ve felsefe eğilim testi
• Türkçe ve İngilizce tam destek
• 4 özel tasarımlı tema
• Offline kayıt ve geçmiş
• %100 reklamsız deneyim

Hoş geldiniz! Felsefi yolculuğunuza ETİK ile başlayın.
```

**İngilizce:**
```
🕊️ ETIK v1.0.0 - Initial Release

✨ Features:
• Rich library with 77 real-life ethical dilemmas
• Analysis from 3 philosophical perspectives with Google Gemini AI
• Personalized mode with philosophy tendency test
• Full Turkish and English support
• 4 custom-designed themes
• Offline save and history
• 100% ad-free experience

Welcome! Start your philosophical journey with ETIK.
```

6. **"Review release"**

7. **Release uyarılarını kontrol et**

8. **"Start rollout to Production"**

---

### ADIM 7: İnceleme Süreci

**Google'ın İncelemesi:**
- Süre: 1-7 gün (ortalama 1-3 gün)
- Pre-launch report otomatik oluşturulur
- Sorun varsa email ile bildirim gelir

**Reddedilme Sebepleri (dikkat):**
- Privacy policy eksik/geçersiz
- Store listing kuralsız içerik
- Icon/screenshot kalitesi düşük
- APK signing sorunu
- Repeated crashes
- Policy ihlalleri

---

### ADIM 8: Yayından Sonra

#### Monitoring

**Google Play Console:**
- Crash reports
- ANRs (App Not Responding)
- User feedback
- Installation stats

**Yapılacaklar:**
- İlk 24 saatte yakın takip
- Crash'leri hemen gider
- Kullanıcı yorumlarını yanıtla

#### Version Updates

```bash
# Versiyon yükselt:
# 1. package.json: "version": "1.0.1"
# 2. android/app/build.gradle:
#    versionCode = 2
#    versionName = "1.0.1"

# Build ve yükle
npm run build
npm run cap:sync
cd android && ./gradlew bundleRelease
```

---

## 🎯 Test Öncelikleri

### Internal Testing Track

Production öncesi internal testing önerilir:

1. **Internal test oluştur**
2. **Test kullanıcıları ekle** (email ile)
3. **AAB yükle**
4. **Test kullanıcıları uygulamayı 2-3 gün test etsin**
5. **Feedback topla**
6. **Düzelt ve production'a geç**

### Closed Testing (Beta)

Daha geniş test için:

1. **Closed testing track aç**
2. **Email listesi veya Google Groups ekle**
3. **Opt-in link paylaş**
4. **En az 20-50 kişi test etsin**
5. **Feedback ve crash reports incele**

---

## ⚠️ Önemli Notlar

### Keystore Güvenliği
- ✅ Keystore'u **mutlaka yedekle**
- ✅ Şifreleri güvenli yerde sakla (password manager)
- ❌ Keystore'u **ASLA** git'e commit etme
- ❌ Şifreleri **ASLA** paylaşma

### API Key Güvenliği
- ✅ Backend proxy kullan (production için zorunlu)
- ❌ Client-side'da API key **ASLA**
- ✅ Rate limiting ekle
- ✅ Request monitoring yap

### Privacy Compliance
- ✅ Privacy Policy güncel ve erişilebilir
- ✅ KVKK/GDPR uyumlu
- ✅ Data Safety form doğru
- ✅ User data deletion mekanizması var

---

## 📞 Yardım

### Google Play Console Sorunları
- **Help Center:** https://support.google.com/googleplay/android-developer
- **Community:** https://support.google.com/googleplay/android-developer/community

### Build Sorunları
- Gradle versiyonu: Check `android/gradle/wrapper/gradle-wrapper.properties`
- Android SDK: Minimum API 24, Target API 36
- Capacitor: v8.0.2

### İletişim
- **Email:** support@racalabs.com
- **Developer:** Raca Labs

---

## 🎉 Başarılar!

Yayınlama sürecinde başarılar dileriz. Sorularınız için support@racalabs.com adresinden bize ulaşabilirsiniz.

**Sonraki Adımlar:**
1. ✅ Keystore oluştur
2. ✅ Backend API kur
3. ✅ Privacy Policy yayınla
4. ✅ Screenshots hazırla
5. ✅ Release build al
6. ✅ Play Console'da uygulamayı oluştur
7. ✅ Internal test yap
8. ✅ Production'a yükle
9. 🎉 Yayın!

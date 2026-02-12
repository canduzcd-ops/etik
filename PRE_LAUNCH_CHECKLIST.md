# 🔍 Pre-Launch Checklist

Google Play Store'a yüklemeden önce bu listeyi tamamlayın.

## 🔐 Güvenlik ve Signing

- [ ] **Keystore oluşturuldu**
  - Dosya: `android/etik-release.keystore`
  - Şifreler güvenli yerde (password manager)

- [ ] **keystore.properties yapılandırıldı**
  - `android/keystore.properties` mevcut
  - `.gitignore` içinde listelenmiş

- [ ] **Keystore yedeklendi**
  - Güvenli lokasyonda backup var
  - Şifreler not edildi

- [ ] **API güvenliği sağlandı**
  - Backend proxy kuruldu (Vercel/Netlify)
  - Client-side API key temizlendi
  - Rate limiting aktif

## 📱 Uygulama Yapılandırması

- [ ] **Version bilgileri güncellendi**
  - `package.json`: version: "1.0.0"
  - `android/app/build.gradle`: versionCode 1, versionName "1.0.0"

- [ ] **App bilgileri doğru**
  - App ID: com.racalabs.etik
  - App Name: ETİK
  - Package name doğru

- [ ] **Permissions kontrolü**
  - Sadece INTERNET permission var
  - Gereksiz permissions temizlendi
  - metadata.json microphone permission kaldırıldı

- [ ] **ProGuard/R8 aktif**
  - minifyEnabled true
  - shrinkResources true
  - proguard-rules.pro optimize edildi

## 🎨 Store Assets

- [ ] **App Icon (512x512)**
  - Yüksek çözünürlüklü PNG
  - Transparency ile
  - Kaliteli ve net

- [ ] **Feature Graphic (1024x500)**
  - Professional tasarım
  - Brand identity'ye uygun
  - PNG veya JPEG

- [ ] **Screenshots (min 2, öneri 4-8)**
  - Ana ekran (Ask)
  - Kütüphane
  - Analiz sonucu
  - Kayıtlı analizler
  - Tema seçimi
  - Kişiselleştirilmiş test
  - Kampanya detay
  - Mikro sorular

- [ ] **Tablet Screenshots (opsiyonel)**
  - 7-inch tablet
  - 10-inch tablet

## 📝 Store Listing

- [ ] **Kısa açıklama hazır**
  - Türkçe (max 80 karakter)
  - İngilizce (max 80 karakter)

- [ ] **Uzun açıklama hazır**
  - Türkçe (detaylı, özellikleri içeren)
  - İngilizce (detaylı, özellikleri içeren)
  - STORE_LISTING.md'den kopyalandı

- [ ] **Kategori seçildi**
  - Primary: Education veya Lifestyle
  - Tags hazırlandı

- [ ] **İletişim bilgileri**
  - Email: support@racalabs.com
  - Website: https://racalabs.com (veya benzeri)

## 📜 Yasal Dökümanlar

- [ ] **Privacy Policy yayınlandı**
  - URL hazır ve erişilebilir
  - KVKK uyumlu
  - GDPR uyumlu
  - Türkçe ve İngilizce versiyonlar

- [ ] **Privacy Policy içeriği doğru**
  - Veri toplama açıklamaları
  - Gemini AI kullanımı belirtildi
  - Kullanıcı hakları açıklanmış
  - İletişim bilgileri güncel

- [ ] **Terms of Service (opsiyonel ama önerilir)**

## 🏗️ Build ve Test

- [ ] **Development build test edildi**
  - `npm run mobile:android`
  - Temel özellikler çalışıyor
  - Crash yok

- [ ] **Release build alındı**
  - `./build-release.sh` çalıştırıldı
  - AAB başarıyla oluşturuldu
  - APK test için oluşturuldu

- [ ] **Release APK test edildi**
  - Gerçek cihazda yüklendi
  - Tüm features çalışıyor
  - Performance sorunsuz
  - Crash yok

- [ ] **Multiple cihazlarda test edildi**
  - Farklı Android versiyonları
  - Farklı ekran boyutları
  - Farklı DPI'lar

- [ ] **Build imzası doğrulandı**
  ```bash
  apksigner verify --verbose app-release.apk
  ```

## 📊 Google Play Console

- [ ] **Developer hesabı aktif**
  - $25 registration fee ödendi
  - Kimlik doğrulandı

- [ ] **App oluşturuldu**
  - App name: ETİK - Ethical Decision Making
  - Default language: Turkish
  - Type: App
  - Free app

- [ ] **App Access tamamlandı**
  - No special access

- [ ] **Ads Declaration**
  - Contains ads: No

- [ ] **Content Rating tamamlandı**
  - IARC questionnaire dolduruldu
  - Rating: Everyone / 3+

- [ ] **Target Audience seçildi**
  - Age: 13+

- [ ] **Data Safety Form dolduruldu**
  - Toplanan veriler listelendi
  - Kullanım amaçları açıklandı
  - Gemini AI paylaşımı belirtildi
  - Güvenlik önlemleri açıklandı

- [ ] **Store Listing dolduruldu**
  - Tüm metinler girildi
  - Assets yüklendi
  - Screenshots yüklendi
  - Category seçildi
  - Privacy Policy URL eklendi
  - Contact details girildi

- [ ] **Pricing & Distribution ayarlandı**
  - Countries seçildi
  - Free app confirmmed
  - Distribution channels

## 🚀 Release

- [ ] **Internal Testing (önerilen)**
  - Test track oluşturuldu
  - Test kullanıcıları eklendi
  - En az 2-3 gün test edildi
  - Feedback toplandı

- [ ] **Closed Testing / Beta (önerilen)**
  - Beta track oluşturuldu
  - 20-50 kişi test etti
  - Major bugs düzeltildi

- [ ] **Production release notes hazır**
  - Türkçe release notes
  - İngilizce release notes
  - Version number: 1.0.0

- [ ] **AAB yüklendi**
  - Production track
  - app-release.aab uploaded

- [ ] **Review için gönderildi**
  - "Start rollout to Production"
  - Confirmation email alındı

## 📱 Post-Launch

- [ ] **Monitoring setup**
  - Crash monitoring aktif
  - ANR tracking
  - User feedback takibi

- [ ] **Response planı hazır**
  - Critical bugs için hotfix planı
  - User review response stratejisi
  - Support email monitoring

## ⚠️ Kritik Kontroller

### Teknik
- [ ] ❌ API key client-side'da yok
- [ ] ❌ Debug logs production'da yok
- [ ] ❌ Test data production'da yok
- [ ] ✅ HTTPS kullanılıyor
- [ ] ✅ ProGuard aktif
- [ ] ✅ Signing doğru

### Yasal
- [ ] ✅ Privacy Policy erişilebilir
- [ ] ✅ KVKK/GDPR uyumlu
- [ ] ✅ Data Safety doğru
- [ ] ✅ Content Rating uygun

### Assets
- [ ] ✅ Tüm görseller yüksek kalite
- [ ] ✅ Screenshots güncel
- [ ] ✅ Feature graphic profesyonel
- [ ] ✅ Icon net ve anlaşılır

### Store Listing
- [ ] ✅ Açıklamalar net ve çekici
- [ ] ✅ Keywords optimize edildi
- [ ] ✅ Kategori uygun
- [ ] ✅ İki dil desteği (TR & EN)

## 📋 Son Kontrol

Tüm checkboxlar ✅ olduktan sonra:

```bash
# Final build
./build-release.sh

# Output kontrol
ls -lh android/app/build/outputs/bundle/release/app-release.aab

# Play Console'a yükle
open https://play.google.com/console
```

## 🎉 Başarılar!

Tüm adımları tamamladıktan sonra Google'ın review sürecini bekleyin.

**Beklenen süre:** 1-7 gün (ortalama 1-3 gün)

**Review sırasında:**
- Email bildirimlerini takip edin
- Pre-launch report'u inceleyin
- İlk kullanıcı yorumlarını yanıtlayın

**İletişim:** support@racalabs.com

# 🔐 Keystore Oluşturma ve Signing Talimatları

## 1. Keystore Oluşturma

Android Studio Terminal'de aşağıdaki komutu çalıştırın:

```bash
cd android
keytool -genkey -v -keystore etik-release.keystore \
  -alias etik-key \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

### Sorulacak Bilgiler:
1. **Keystore password**: Güçlü bir şifre girin ve **SAKLAYIN**
2. **Re-enter password**: Aynı şifreyi tekrar girin
3. **What is your first and last name?**: Şirket/Kişi adı (örn: Raca Labs)
4. **What is the name of your organizational unit?**: Development
5. **What is the name of your organization?**: Raca Labs
6. **What is the name of your City or Locality?**: Şehir adı
7. **What is the name of your State or Province?**: İl/Eyalet
8. **What is the two-letter country code?**: TR
9. **Is this correct?**: yes
10. **Key password**: Enter tuşuna basın (keystore password ile aynı olsun)

## 2. Keystore Properties Dosyası Oluşturma

```bash
cd android
cp keystore.properties.template keystore.properties
```

`keystore.properties` dosyasını düzenleyin:
```properties
storeFile=etik-release.keystore
storePassword=ADIM_1_DE_GIRDIGINIZ_SIFRE
keyAlias=etik-key
keyPassword=ADIM_1_DE_GIRDIGINIZ_SIFRE
```

## 3. Güvenlik Uyarıları

⚠️ **ÖNEMLİ:**
- `keystore.properties` dosyasını **ASLA** git'e commit ETMEYİN
- `etik-release.keystore` dosyasını **ASLA** git'e commit ETMEYİN
- Bu dosyaları güvenli bir yerde yedekleyin (şifreli disk, password manager vb.)
- Keystore şifrenizi kaybederseniz, uygulamayı güncelleyemezsiniz!

## 4. Release Build Alma

Keystore oluşturulduktan sonra:

```bash
cd android
./gradlew bundleRelease
```

### Build Çıktısı:
- **AAB**: `android/app/build/outputs/bundle/release/app-release.aab`
- Bu AAB dosyasını Google Play Console'a yükleyin

## 5. APK Oluşturma (Test için)

```bash
cd android
./gradlew assembleRelease
```

### Output:
- **APK**: `android/app/build/outputs/apk/release/app-release.apk`

## 6. Keystore Yedekleme

Oluşturduğunuz keystore'u mutlaka yedekleyin:

```bash
# Güvenli bir konuma kopyalayın
cp android/etik-release.keystore ~/Dropbox/secure/etik-keystore-backup.keystore
# veya şifreli bir USB'ye
```

### Yedeklenmesi Gerekenler:
1. ✅ `etik-release.keystore` dosyası
2. ✅ Keystore password
3. ✅ Key alias (etik-key)
4. ✅ Key password

## 7. Build Kontrolü

Build başarılı olduktan sonra:

```bash
# AAB içeriğini kontrol et
bundletool build-apks --bundle=app/build/outputs/bundle/release/app-release.aab \
  --output=app.apks \
  --mode=universal
  
# APK imzasını kontrol et
apksigner verify --verbose app/build/outputs/apk/release/app-release.apk
```

## 8. Google Play Console'a Yükleme

1. Google Play Console → "All apps" → "Create app"
2. App detaylarını doldurun
3. "Production" track'e gidin
4. "Create new release"
5. `app-release.aab` dosyasını upload edin
6. Release notes ekleyin
7. "Review release" → "Start rollout"

## Sorun Giderme

### Keystore bulunamadı hatası:
```bash
ls -la android/etik-release.keystore
# Dosya yoksa keystore oluşturma adımını tekrar yapın
```

### Signing config hatası:
```bash
# keystore.properties dosyasını kontrol edin
cat android/keystore.properties
```

### Permission denied:
```bash
chmod +x android/gradlew
```

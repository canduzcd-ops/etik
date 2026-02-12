#!/bin/bash

# ETİK App - Release Build Script
# Bu script release build sürecini otomatikleştirir

set -e  # Hata durumunda dur

echo "🕊️  ETİK Release Build Script"
echo "================================"
echo ""

# Renkli output için
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Keystore kontrolü
echo "🔍 Checking keystore configuration..."
if [ ! -f "android/keystore.properties" ]; then
    echo -e "${RED}❌ Error: keystore.properties not found!${NC}"
    echo ""
    echo "Please create keystore first:"
    echo "  1. cd android"
    echo "  2. keytool -genkey -v -keystore etik-release.keystore [...]"
    echo "  3. cp keystore.properties.template keystore.properties"
    echo "  4. Edit keystore.properties with your passwords"
    echo ""
    echo "See KEYSTORE_INSTRUCTIONS.md for details"
    exit 1
fi

if [ ! -f "android/etik-release.keystore" ]; then
    echo -e "${RED}❌ Error: etik-release.keystore not found!${NC}"
    echo ""
    echo "Please create keystore first. See KEYSTORE_INSTRUCTIONS.md"
    exit 1
fi

echo -e "${GREEN}✅ Keystore configuration found${NC}"
echo ""

# Node modules kontrolü
echo "🔍 Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  Installing dependencies...${NC}"
    npm install
fi
echo -e "${GREEN}✅ Dependencies OK${NC}"
echo ""

# Clean build
echo "🧹 Cleaning previous builds..."
rm -rf dist/
cd android
./gradlew clean
cd ..
echo -e "${GREEN}✅ Clean complete${NC}"
echo ""

# Web build
echo "📦 Building web app..."
npm run build
echo -e "${GREEN}✅ Web build complete${NC}"
echo ""

# Capacitor sync
echo "🔄 Syncing with Capacitor..."
npm run cap:sync
echo -e "${GREEN}✅ Capacitor sync complete${NC}"
echo ""

# Android release build
echo "🤖 Building Android release AAB..."
cd android
./gradlew bundleRelease
cd ..
echo -e "${GREEN}✅ Android AAB build complete${NC}"
echo ""

# APK build (test için)
echo "📱 Building Android release APK (for testing)..."
cd android
./gradlew assembleRelease
cd ..
echo -e "${GREEN}✅ Android APK build complete${NC}"
echo ""

# Build output bilgileri
AAB_PATH="android/app/build/outputs/bundle/release/app-release.aab"
APK_PATH="android/app/build/outputs/apk/release/app-release.apk"

echo "================================"
echo "🎉 Build Successful!"
echo "================================"
echo ""
echo "📦 Build Outputs:"
echo ""
echo "  AAB (for Play Store):"
echo "    ${AAB_PATH}"
echo ""
echo "  APK (for testing):"
echo "    ${APK_PATH}"
echo ""

# File size
if [ -f "$AAB_PATH" ]; then
    AAB_SIZE=$(du -h "$AAB_PATH" | cut -f1)
    echo "  AAB Size: ${AAB_SIZE}"
fi

if [ -f "$APK_PATH" ]; then
    APK_SIZE=$(du -h "$APK_PATH" | cut -f1)
    echo "  APK Size: ${APK_SIZE}"
fi

echo ""
echo "================================"
echo "📋 Next Steps:"
echo "================================"
echo ""
echo "1. Test APK on device:"
echo "   adb install ${APK_PATH}"
echo ""
echo "2. Verify AAB:"
echo "   bundletool build-apks --bundle=${AAB_PATH} --output=app.apks --mode=universal"
echo ""
echo "3. Upload to Google Play Console:"
echo "   - Go to: https://play.google.com/console"
echo "   - Production → Create Release"
echo "   - Upload: ${AAB_PATH}"
echo ""
echo "4. Remember to:"
echo "   ✅ Test on multiple devices"
echo "   ✅ Check crash reports"
echo "   ✅ Review pre-launch report"
echo "   ✅ Update release notes"
echo ""
echo "Good luck! 🚀"
echo ""

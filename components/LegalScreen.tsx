import React, { useState } from 'react';

type LegalPage = 'privacy' | 'terms' | 'kvkk';

interface LegalScreenProps {
  onClose: () => void;
  initialPage?: LegalPage;
}

const LegalScreen: React.FC<LegalScreenProps> = ({ onClose, initialPage = 'privacy' }) => {
  const [page, setPage] = useState<LegalPage>(initialPage);

  const tabs: { id: LegalPage; label: string }[] = [
    { id: 'privacy', label: 'Gizlilik' },
    { id: 'terms', label: 'Kullanım' },
    { id: 'kvkk', label: 'KVKK' },
  ];

  return (
    <div className="fixed inset-0 z-[200] bg-gradient-to-br from-[#0F0F0F] to-[#1A1A2E] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-14 pb-4">
        <button onClick={onClose} className="text-white/50 hover:text-white/80 transition-colors text-sm">
          ← Geri
        </button>
        <h2 className="text-white/80 text-sm font-semibold tracking-wider">Yasal Bilgiler</h2>
        <div className="w-10" />
      </div>

      {/* Tabs */}
      <div className="flex mx-6 bg-white/[0.05] rounded-2xl p-1 mb-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setPage(tab.id)}
            className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 ${
              page === tab.id
                ? 'bg-white/15 text-white shadow-lg'
                : 'text-white/35 hover:text-white/55'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-12">
        <div className="bg-white/[0.04] backdrop-blur-xl rounded-3xl border border-white/10 p-6">
          {page === 'privacy' && <PrivacyContent />}
          {page === 'terms' && <TermsContent />}
          {page === 'kvkk' && <KVKKContent />}
        </div>

        {/* Company Info */}
        <div className="text-center mt-8 space-y-2">
          <p className="text-white/15 text-[10px] tracking-widest uppercase">ETİK</p>
          <p className="text-white/10 text-[9px]">Versiyon 1.0.0</p>
          <p className="text-white/10 text-[9px]">© 2026 Raca Labs. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </div>
  );
};

/* ————————————————————————— Privacy Policy ————————————————————————— */
const PrivacyContent = () => (
  <div className="space-y-6 text-white/60 text-[13px] leading-relaxed">
    <div className="space-y-1">
      <h3 className="text-white/90 text-lg font-bold" style={{ fontFamily: "'Georgia', serif" }}>
        Gizlilik Politikası
      </h3>
      <p className="text-white/30 text-[10px] tracking-wider">Son güncelleme: 12 Şubat 2026</p>
    </div>

    <p>
      ETİK ("Uygulama"), Raca Labs tarafından geliştirilmiş bir etik karar destek uygulamasıdır. 
      Kullanıcılarımızın gizliliğine büyük önem veriyoruz. Bu politika, uygulamanın veri işleme 
      pratiklerini açıklamaktadır.
    </p>

    <Section title="1. Toplanan Veriler">
      <p>ETİK, <strong className="text-white/80">minimum veri ilkesiyle</strong> çalışır:</p>
      <ul className="list-disc pl-5 space-y-2 mt-2">
        <li><strong className="text-white/80">Kimlik doğrulama bilgileri:</strong> E-posta adresi ve şifre (Firebase Authentication aracılığıyla). Google ile giriş yaparsanız Google hesap adınız ve e-postanız.</li>
        <li><strong className="text-white/80">Kullanıcı tercihleri:</strong> Tema, dil ve isim gibi uygulama ayarları yalnızca cihazınızda (localStorage) saklanır.</li>
        <li><strong className="text-white/80">Analiz içerikleri:</strong> Girdiğiniz etik ikilemler, yalnızca analiz süresi boyunca Google Gemini API'ye gönderilir ve kalıcı olarak saklanmaz.</li>
      </ul>
    </Section>

    <Section title="2. Veri Saklama ve İşleme">
      <ul className="list-disc pl-5 space-y-2">
        <li>Uygulama <strong className="text-white/80">kendi sunucusunda hiçbir kullanıcı verisi saklamaz</strong>.</li>
        <li>Kimlik doğrulama verileri Google Firebase altyapısında işlenir ve saklanır.</li>
        <li>Etik analiz istekleri Google Gemini AI tarafından işlenir; Google'ın veri politikaları geçerlidir.</li>
        <li>Kaydettiğiniz analizler yalnızca cihazınızda yerel olarak depolanır.</li>
      </ul>
    </Section>

    <Section title="3. Üçüncü Taraf Hizmetler">
      <ul className="list-disc pl-5 space-y-2">
        <li><strong className="text-white/80">Google Firebase:</strong> Kimlik doğrulama ve backend hizmetleri</li>
        <li><strong className="text-white/80">Google Gemini AI:</strong> Etik analiz motoru</li>
      </ul>
      <p className="mt-2">Bu hizmetlerin kendi gizlilik politikaları geçerlidir. Ayrıntılar için Google Gizlilik Politikası'nı inceleyebilirsiniz.</p>
    </Section>

    <Section title="4. Veri Güvenliği">
      <p>Tüm iletişim HTTPS/TLS şifreleme ile korunmaktadır. Kimlik doğrulama, endüstri standardı Firebase Authentication altyapısı üzerinden gerçekleştirilmektedir.</p>
    </Section>

    <Section title="5. Kullanıcı Hakları">
      <p>Hesabınızı istediğiniz zaman silebilir, verilerinizin kaldırılmasını talep edebilirsiniz. Yerel veriler cihaz üzerinden silinebilir. İletişim: <span className="text-white/80">canduz.cd@gmail.com</span></p>
    </Section>
  </div>
);

/* ————————————————————————— Terms of Use ————————————————————————— */
const TermsContent = () => (
  <div className="space-y-6 text-white/60 text-[13px] leading-relaxed">
    <div className="space-y-1">
      <h3 className="text-white/90 text-lg font-bold" style={{ fontFamily: "'Georgia', serif" }}>
        Kullanım Koşulları
      </h3>
      <p className="text-white/30 text-[10px] tracking-wider">Son güncelleme: 12 Şubat 2026</p>
    </div>

    <Section title="1. Hizmet Tanımı">
      <p>ETİK, yapay zeka destekli bir etik karar destek uygulamasıdır. Uygulama, kullanıcıların etik ikilemlerini çeşitli felsefi perspektiflerden analiz ederek düşünce süreçlerine katkıda bulunmayı amaçlar.</p>
    </Section>

    <Section title="2. Sorumluluk Reddi">
      <p>ETİK tarafından sağlanan analizler <strong className="text-white/80">yalnızca bilgilendirme ve düşünsel rehberlik amaçlıdır</strong>. Uygulama:</p>
      <ul className="list-disc pl-5 space-y-2 mt-2">
        <li>Profesyonel hukuki, tıbbi veya psikolojik danışmanlık yerine geçmez.</li>
        <li>Yapay zeka tarafından üretilen içerikler kesin veya bağlayıcı değildir.</li>
        <li>Kararlarınız ve sonuçları tamamen sizin sorumluluğunuzdadır.</li>
      </ul>
    </Section>

    <Section title="3. Kabul Edilebilir Kullanım">
      <p>Kullanıcılar şunları yapmamayı kabul eder:</p>
      <ul className="list-disc pl-5 space-y-2 mt-2">
        <li>Uygulamayı yasadışı amaçlarla kullanmak</li>
        <li>Sistemi kötüye kullanmak, manipüle etmek</li>
        <li>API'yi aşırı yüklemek veya otomatik sorgular göndermek</li>
        <li>Zararlı, nefret içeren veya uygunsuz içerik girmek</li>
      </ul>
    </Section>

    <Section title="4. Fikri Mülkiyet">
      <p>ETİK uygulaması, tasarımı, logosu ve içerikleri Raca Labs'a aittir. Uygulama tarafından üretilen analizler bilgilendirme amaçlı olup ticari kullanıma konu edilemez.</p>
    </Section>

    <Section title="5. Değişiklikler">
      <p>Bu koşullar önceden bildirimde bulunmaksızın güncellenebilir. Uygulamayı kullanmaya devam etmeniz, güncellenmiş koşulları kabul ettiğiniz anlamına gelir.</p>
    </Section>

    <Section title="6. İletişim">
      <p>Sorularınız için: <span className="text-white/80">canduz.cd@gmail.com</span></p>
    </Section>
  </div>
);

/* ————————————————————————— KVKK ————————————————————————— */
const KVKKContent = () => (
  <div className="space-y-6 text-white/60 text-[13px] leading-relaxed">
    <div className="space-y-1">
      <h3 className="text-white/90 text-lg font-bold" style={{ fontFamily: "'Georgia', serif" }}>
        KVKK Aydınlatma Metni
      </h3>
      <p className="text-white/30 text-[10px] tracking-wider">6698 Sayılı Kişisel Verilerin Korunması Kanunu</p>
    </div>

    <Section title="Veri Sorumlusu">
      <p>Raca Labs ("Şirket") olarak kişisel verilerinizin korunmasına azami özen göstermekteyiz.</p>
    </Section>

    <Section title="İşlenen Kişisel Veriler">
      <ul className="list-disc pl-5 space-y-2">
        <li><strong className="text-white/80">Kimlik verileri:</strong> Ad, e-posta adresi</li>
        <li><strong className="text-white/80">İşlem güvenliği verileri:</strong> Oturum bilgileri (Firebase tarafından yönetilir)</li>
      </ul>
    </Section>

    <Section title="İşleme Amaçları">
      <ul className="list-disc pl-5 space-y-2">
        <li>Kullanıcı hesabı oluşturulması ve oturum yönetimi</li>
        <li>Uygulama hizmetlerinin sunulması</li>
        <li>Kullanıcı deneyiminin kişiselleştirilmesi</li>
      </ul>
    </Section>

    <Section title="Veri İşlemenin Hukuki Sebebi">
      <p>Kişisel verileriniz, KVKK md. 5/2 (c) "Bir sözleşmenin kurulması veya ifasıyla ilgili olması" ve (f) "İlgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla veri sorumlusunun meşru menfaati" hukuki sebeplerine dayanılarak işlenmektedir.</p>
    </Section>

    <Section title="Veri Aktarımı">
      <p>Kişisel verileriniz yurtiçi ve yurtdışındaki Google LLC sunucularında (Firebase altyapısında) işlenmektedir. Google, AB-ABD Veri Gizliliği Çerçevesi kapsamında sertifikalıdır.</p>
    </Section>

    <Section title="Haklarınız (KVKK md. 11)">
      <ul className="list-disc pl-5 space-y-2">
        <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
        <li>İşlenmişse buna ilişkin bilgi talep etme</li>
        <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
        <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
        <li>KVKK md. 7 kapsamında silinmesini veya yok edilmesini isteme</li>
        <li>İşlenen verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
        <li>İşlenen verilerin aleyhine sonuç çıkmasına itiraz etme</li>
      </ul>
    </Section>

    <Section title="Başvuru">
      <p>Haklarınıza ilişkin taleplerinizi <span className="text-white/80">canduz.cd@gmail.com</span> adresine iletebilirsiniz. Başvurular en geç 30 gün içinde sonuçlandırılır.</p>
    </Section>
  </div>
);

/* ————————— Helper ————————— */
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-2">
    <h4 className="text-white/80 text-sm font-semibold">{title}</h4>
    {children}
  </div>
);

export default LegalScreen;

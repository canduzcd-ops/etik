
import React from 'react';
import { DilemmaCategory, LibraryItem, EthicalPrinciple, Theme, Language } from './types';

export const THEMES = {
  [Theme.PURE]: {
    bg: 'bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF]',
    text: 'text-[#1A1A1A]',
    primary: 'bg-white',
    accent: 'text-[#6C757D]',
    border: 'border-[#DEE2E6]',
    button: 'bg-gradient-to-r from-[#0066CC] to-[#0052A3] hover:from-[#0052A3] hover:to-[#004080] text-white font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200',
    nav: 'bg-white/95 backdrop-blur-lg shadow-sm',
    card: 'bg-white shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.12)] transition-shadow duration-300 border border-gray-100'
  },
  [Theme.SAGE]: {
    bg: 'bg-gradient-to-br from-[#F0F4F0] to-[#E6EDE6]',
    text: 'text-[#1A2E1A]',
    primary: 'bg-white',
    accent: 'text-[#4A6350]',
    border: 'border-[#C8D5C8]',
    button: 'bg-gradient-to-r from-[#2D5016] to-[#1F3A10] hover:from-[#1F3A10] hover:to-[#16280B] text-white font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200',
    nav: 'bg-white/95 backdrop-blur-lg shadow-sm',
    card: 'bg-white shadow-[0_8px_32px_rgba(45,80,22,0.10)] hover:shadow-[0_12px_48px_rgba(45,80,22,0.15)] transition-shadow duration-300 border border-green-100'
  },
  [Theme.SAND]: {
    bg: 'bg-gradient-to-br from-[#FAF7F2] to-[#F2EDE3]',
    text: 'text-[#2A2520]',
    primary: 'bg-white',
    accent: 'text-[#8B7355]',
    border: 'border-[#D9CCBA]',
    button: 'bg-gradient-to-r from-[#6B4E2B] to-[#533D21] hover:from-[#533D21] hover:to-[#3D2C18] text-white font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200',
    nav: 'bg-white/95 backdrop-blur-lg shadow-sm',
    card: 'bg-white shadow-[0_8px_32px_rgba(107,78,43,0.10)] hover:shadow-[0_12px_48px_rgba(107,78,43,0.15)] transition-shadow duration-300 border border-amber-100'
  },
  [Theme.SLATE]: {
    bg: 'bg-gradient-to-br from-[#F7F9FB] to-[#EDF2F7]',
    text: 'text-[#1A202C]',
    primary: 'bg-white',
    accent: 'text-[#4A5568]',
    border: 'border-[#CBD5E0]',
    button: 'bg-gradient-to-r from-[#1A365D] to-[#1C2E4A] hover:from-[#1C2E4A] hover:to-[#0F1A2E] text-white font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200',
    nav: 'bg-white/95 backdrop-blur-lg shadow-sm',
    card: 'bg-white shadow-[0_8px_32px_rgba(26,54,93,0.10)] hover:shadow-[0_12px_48px_rgba(26,54,93,0.15)] transition-shadow duration-300 border border-slate-100'
  }
};

export const TEST_QUESTIONS = [
  { id: 1, principle: 'utilitarianism', tr: 'Bir kararın doğruluğu, toplamda kaç kişiyi mutlu ettiğine bağlıdır.', en: 'The rightness of a decision depends on how many people it makes happy in total.' },
  { id: 2, principle: 'deontology', tr: 'Sonucu ne kadar iyi olursa olsun, bir kuralı çiğnemek veya yalan söylemek her zaman yanlıştır.', en: 'Lying or breaking a rule is always wrong, regardless of how good the outcome might be.' },
  { id: 3, principle: 'virtue', tr: 'Etik olmak kuralları takip etmek değil, erdemli ve dengeli bir karaktere sahip olmaktır.', en: 'Being ethical is not about following rules but having a virtuous and balanced character.' },
  { id: 4, principle: 'hedonism', tr: 'Hayatın temel amacı gereksiz acılardan kaçınmak ve ruhsal huzuru bulmaktır.', en: 'The main goal of life is to avoid unnecessary pain and find spiritual peace.' },
  { id: 5, principle: 'stoicism', tr: 'Kontrol edemediğim dış olaylar için üzülmek yerine, sadece kendi tepkilerime odaklanırım.', en: 'Instead of worrying about external events I cannot control, I focus only on my own reactions.' },
  { id: 6, principle: 'justice', tr: 'Bir sistem, toplumdaki en zayıf ve en dezavantajlı kişiyi korumuyorsa adil değildir.', en: 'A system is not just if it does not protect the weakest and most disadvantaged person in society.' },
  { id: 7, principle: 'care', tr: 'Karar verirken soyut mantıktan ziyade empatiyi ve kişisel bağlarımı ön planda tutarım.', en: 'I prioritize empathy and personal bonds over abstract logic when making decisions.' },
  { id: 8, principle: 'existentialism', tr: 'Değerlerimi kendim yaratırım; hayatımın anlamını sadece kendi seçimlerim belirler.', en: 'I create my own values; only my choices determine the meaning of my life.' },
  { id: 9, principle: 'pragmatism', tr: 'Bir fikrin doğruluğu, onun gerçek hayatta ne kadar işe yaradığına ve sorun çözdüğüne bağlıdır.', en: 'The truth of an idea depends on how well it works and solves problems in real life.' },
  { id: 10, principle: 'absurdism', tr: 'Dünyanın mantıksızlığını kabul edip yine de yaşamın tadını çıkarmaya bakarım.', en: 'I accept the irrationality of the world and try to enjoy life anyway.' },
  { id: 11, principle: 'contractarianism', tr: 'Etik, toplumun huzuru için hepimizin rasyonel olarak üzerinde anlaştığı bir sözleşmedir.', en: 'Ethics is a contract we all rationally agree on for the peace of society.' },
  { id: 12, principle: 'utilitarianism', tr: 'Azınlığın feda edilmesi çoğunluğun büyük bir felaketten kurtulması için gerekliyse kabul edilebilir.', en: 'Sacrificing the minority is acceptable if it is necessary to save the majority from a great disaster.' },
  { id: 13, principle: 'deontology', tr: 'İnsanları asla sadece bir araç olarak değil, her zaman kendinde bir değer olarak görmeliyiz.', en: 'Never treat people merely as a means, but always as an end in themselves.' },
  { id: 14, principle: 'virtue', tr: 'Aşırılıklardan kaçınıp her zaman iki uç arasındaki "altın orta"yı bulmaya çalışırım.', en: 'I always try to find the "golden mean" between extremes and avoid excess.' },
  { id: 15, principle: 'stoicism', tr: 'Başkalarının benim hakkımdaki düşünceleri veya başıma gelen talihsizlikler huzurumu bozamaz.', en: 'What others think of me or the misfortunes that happen to me cannot disturb my inner peace.' },
  { id: 16, principle: 'justice', tr: 'Fırsat eşitliği, toplumdaki adaletin en temel ve sarsılmaz şartıdır.', en: 'Equality of opportunity is the most fundamental and unshakable condition of justice in society.' },
  { id: 17, principle: 'care', tr: 'Birine yardım etmek bir "ödev" olduğu için değil, o kişiye ve ilişkiye değer verdiğim içindir.', en: 'I help someone because I value them and the relationship, not because it is a "duty".' },
  { id: 18, principle: 'pragmatism', tr: 'Etik kurallar katı olmamalı, zamanın ve durumun ihtiyaçlarına göre esnetilebilmelidir.', en: 'Ethical rules should not be rigid; they should be flexible according to the needs of the time and situation.' },
  { id: 19, principle: 'existentialism', tr: 'Verdiğim her kararın tüm sorumluluğunu dürüstçe üstlenirim; kaderi suçlamam.', en: 'I honestly take full responsibility for every decision I make; I do not blame fate.' }
];

export const CATEGORIES: DilemmaCategory[] = [
  { id: 'work', title: { tr: 'İş & Kariyer', en: 'Work & Career' }, description: { tr: 'Profesyonel dürüstlük, iş yeri adaleti ve liderlik sorumluluklarını kapsar.', en: 'Covers professional integrity, workplace justice, and leadership responsibilities.' }, icon: '💼' },
  { id: 'family', title: { tr: 'Aile & İlişkiler', en: 'Family & Relationships' }, description: { tr: 'Kişisel sadakat, bakım sorumlulukları ve yakın bağlardaki hakikatleri ele alır.', en: 'Deals with personal loyalty, caregiving responsibilities, and truths within close bonds.' }, icon: '🏠' },
  { id: 'friends', title: { tr: 'Dostluk', en: 'Friendship' }, description: { tr: 'Güven, sosyal sırlar ve arkadaşlık görevleri arasındaki dengeyi inceler.', en: 'Examines the balance between trust, social secrets, and duties of friendship.' }, icon: '🤝' },
  { id: 'finance', title: { tr: 'Finans', en: 'Finance' }, description: { tr: 'Maddi kaynakların adil kullanımı, dürüst ticaret ve finansal şeffaflıkla ilgilidir.', en: 'Relates to fair use of material resources, honest trade, and financial transparency.' }, icon: '💰' },
  { id: 'health', title: { tr: 'Sağlık', en: 'Health' }, description: { tr: 'Vücut bütünlüğü, tıbbi kararlar ve esenlik arayışındaki etik sınırları kapsar.', en: 'Covers bodily integrity, medical decisions, and ethical boundaries in pursuit of well-being.' }, icon: '🏥' },
  { id: 'edu', title: { tr: 'Eğitim', en: 'Education' }, description: { tr: 'Akademik dürüstlük, bilgi paylaşımı ve öğretmen-öğrenci ilişkilerini ele alır.', en: 'Deals with academic integrity, knowledge sharing, and teacher-student relationships.' }, icon: '🎓' },
  { id: 'society', title: { tr: 'Toplum & Adalet', en: 'Society & Justice' }, description: { tr: 'Haklar, yasalar ve kolektif sorumlulukların sivil yaşamdaki yansımalarını inceler.', en: 'Examines rights, laws, and the reflections of collective responsibilities in civic life.' }, icon: '⚖️' },
  { id: 'env', title: { tr: 'Çevre', en: 'Environment' }, description: { tr: 'Doğaya karşı sorumluluklarımız ve gelecek nesillerin yaşam hakkını savunur.', en: 'Defends our responsibilities toward nature and the right to life for future generations.' }, icon: '🌿' },
  { id: 'digital', title: { tr: 'Dijital & Teknoloji', en: 'Digital & Tech' }, description: { tr: 'Yapay zeka, veri gizliliği ve dijital dünyadaki varlığımızın etik sınırları.', en: 'Ethics of AI, data privacy, and our presence in the digital world.' }, icon: '📱' },
  { id: 'animals', title: { tr: 'Hayvan Hakları', en: 'Animal Rights' }, description: { tr: 'İnsan dışı canlılara karşı ahlaki sorumluluklarımız ve yaşam hakkı.', en: 'Moral responsibilities toward non-human beings and their right to life.' }, icon: '🐾' },
  { id: 'culture', title: { tr: 'Kültür & Kimlik', en: 'Culture & Identity' }, description: { tr: 'Gelenekler, toplumsal normlar ve kültürel mirasın bireysel seçimlerle çatışması.', en: 'Traditions, norms, and cultural heritage vs individual choices.' }, icon: '🎭' },
];

export const LIBRARY_DILEMMAS: Record<string, LibraryItem[]> = {
  work: [
    { id: 'w1', categoryId: 'work', title: { tr: 'Hatalı Rapor', en: 'Faulty Report' }, description: { tr: 'Yöneticiniz, projenin onay alması için rapordaki bazı verileri görmezden gelmenizi istedi.', en: 'Your manager asked you to ignore certain data in a report to ensure approval.' } },
    { id: 'w2', categoryId: 'work', title: { tr: 'Terfi ve Rekabet', en: 'Promotion and Competition' }, description: { tr: 'Rakibinizin terfi almasını engelleyecek ama etik olmayan bir bilgiyi paylaşmalı mısınız?', en: 'Should you share unethical info to stop a competitor from being promoted?' } },
    { id: 'w3', categoryId: 'work', title: { tr: 'Fikir Hırsızlığı', en: 'Idea Theft' }, description: { tr: 'Ekip arkadaşınızın toplantıda sizin fikrinizi kendi fikriymiş gibi sunduğunu fark ettiniz.', en: 'Teammate presented your idea as their own.' } },
    { id: 'w4', categoryId: 'work', title: { tr: 'Liyakat mi Sadakat mi?', en: 'Merit or Loyalty?' }, description: { tr: 'Boş pozisyon için en yetkin aday yerine, size çok yardımcı olan bir dostunuzu mu işe almalısınız?', en: 'Hire a friend who helped you or the most qualified candidate?' } },
    { id: 'w5', categoryId: 'work', title: { tr: 'Yanlış Harcama', en: 'Expense Misuse' }, description: { tr: 'Üst düzey bir yöneticinin şirket kartını kişisel harcamaları için kullandığını gördünüz.', en: 'Executive using company card for personal luxury.' } },
    { id: 'w6', categoryId: 'work', title: { tr: 'Zorunlu Fazla Mesai', en: 'Forced Overtime' }, description: { tr: 'Ekibinizdeki hamile bir çalışana, yasal sınırların üzerinde fazla mesai yaptırmanız isteniyor.', en: 'Ask a pregnant employee to work beyond legal overtime limits.' } },
    { id: 'w7', categoryId: 'work', title: { tr: 'İfşa Etmek', en: 'Whistleblowing' }, description: { tr: 'Şirketinizin çevreye zarar veren bir uygulamasını gizli tutmanız isteniyor, aksi halde işinizi kaybedebilirsiniz.', en: 'Hide environmental damage by your company or lose your job.' } }
  ],
  family: [
    { id: 'fa1', categoryId: 'family', title: { tr: 'Beyaz Yalan', en: 'White Lie' }, description: { tr: 'Eşinizin moralini bozmamak için önemli bir gerçeği saklamak etik midir?', en: 'Is it ethical to hide truth to avoid upsetting a spouse?' } },
    { id: 'fa2', categoryId: 'family', title: { tr: 'Miras Kavgası', en: 'Inheritance' }, description: { tr: 'Kardeşinizin borç içinde olduğunu biliyorsunuz, miras paylaşımında hak ettiğinizden vazgeçmeli misiniz?', en: 'Should you give up your inheritance share to a sibling in debt?' } },
    { id: 'fa3', categoryId: 'family', title: { tr: 'Ebeveyn Bakımı', en: 'Elderly Care' }, description: { tr: 'Annenizin huzurevine gitmek istememesi ama sizin ona evde bakacak vaktiniz olmaması.', en: 'Mother refuses nursing home but you cannot care for her at home.' }, },
    { id: 'fa4', categoryId: 'family', title: { tr: 'Gizli Tasarruf', en: 'Secret Savings' }, description: { tr: 'Eşinizden gizli, acil durumlar için bir birikim yapmanız evlilik güvenini sarsar mı?', en: 'Saving money secretly for emergencies: trust issue?' } },
    { id: 'fa5', categoryId: 'family', title: { tr: 'Kardeş Torpili', en: 'Sibling Favor' }, description: { tr: 'Kardeşinizin suç işlediğini biliyorsunuz, onu polise ihbar eder misiniz?', en: 'Report your sibling for a crime or protect them?' } },
    { id: 'fa6', categoryId: 'family', title: { tr: 'Yaşam Desteği', en: 'Life Support' }, description: { tr: 'Bitkisel hayattaki bir yakınınızın yaşam destek ünitesinden çekilmesine karar vermek.', en: 'Deciding to withdraw life support for a terminal relative.' } }
  ],
  friends: [
    { id: 'fr1', categoryId: 'friends', title: { tr: 'İhanete Tanık Olmak', en: 'Witnessing Betrayal' }, description: { tr: 'En yakın arkadaşınızın partnerini aldattığını öğrendiniz. Söylemeli misiniz?', en: 'Friend is cheating. Should you tell?' } },
    { id: 'fr2', categoryId: 'friends', title: { tr: 'Borç Meselesi', en: 'Debt Issue' }, description: { tr: 'Arkadaşınız size borcunu ödemiyor ama lüks harcamalarına devam ediyor.', en: 'Friend refuses to pay debt but spends on luxury.' } },
    { id: 'fr3', categoryId: 'friends', title: { tr: 'Sır Saklamak', en: 'Keeping Secrets' }, description: { tr: 'Arkadaşınızın işlediği küçük bir suçu saklamak dostluk görevi midir?', en: 'Is hiding a friend\'s minor crime a duty of friendship?' } },
    { id: 'fr4', categoryId: 'friends', title: { tr: 'Zararlı Alışkanlık', en: 'Harmful Habit' }, description: { tr: 'Dostunuzun sağlığına ciddi zarar veren bir bağımlılığını ailesine haber vermeli misiniz?', en: 'Inform friend\'s family about their dangerous addiction?' }, },
    { id: 'fr5', categoryId: 'friends', title: { tr: 'Kariyer Fırsatı', en: 'Career Opportunity' }, description: { tr: 'Arkadaşınızın çok istediği işi, ondan daha yetkin olduğunuz için almalı mısınız?', en: 'Take a job your friend desperately wants because you are better?' } },
    { id: 'fr6', categoryId: 'friends', title: { tr: 'Sosyal Medya Linci', en: 'SM Lynch' }, description: { tr: 'Arkadaşınızın sosyal medyada haksız yere linç edildiğini gördüğünüzde müdahale eder misiniz?', en: 'Defend a friend being unfairly lynched on social media?' } }
  ],
  finance: [
    { id: 'fi1', categoryId: 'finance', title: { tr: 'Vergi Kaçırma', en: 'Tax Evasion' }, description: { tr: 'Küçük işletmenizde fiş kesmeyerek vergi ödememek meşrulaşır mı?', en: 'Not issuing receipts for tax evasion?' } },
    { id: 'fi2', categoryId: 'finance', title: { tr: 'Fazla Para Üstü', en: 'Excess Change' }, description: { tr: 'Kasiyer size yanlışlıkla çok fazla para üstü verdi ve fark etmedi.', en: 'Cashier gave too much change by mistake. Keep it?' } },
    { id: 'fi3', categoryId: 'finance', title: { tr: 'Kripto Spekülasyonu', en: 'Crypto Hype' }, description: { tr: 'Değeri düşeceğini bildiğiniz bir varlığı başkalarına "fırsat" olarak sunmak.', en: 'Selling an asset you know will crash as an "opportunity".' } },
    { id: 'fi4', categoryId: 'finance', title: { tr: 'İçeriden Bilgi', en: 'Insider Info' }, description: { tr: 'Bir şirketin batacağını önceden öğrenip hisselerinizi satmak.', en: 'Selling shares knowing a company will fail before it\'s public.' } },
    { id: 'fi5', categoryId: 'finance', title: { tr: 'Bulunan Cüzdan', en: 'Found Wallet' }, description: { tr: 'İçinde yüklü miktar para olan ama kimlik olmayan bir cüzdan buldunuz.', en: 'Found a wallet with lots of cash but no ID. Keep it?' } },
    { id: 'fi6', categoryId: 'finance', title: { tr: 'Haksız Kazanç', en: 'Unfair Profit' }, description: { tr: 'Sistemdeki bir açığı kullanarak haksız ama "yasal" kazanç sağlamak.', en: 'Using a system loophole for unfair but "legal" profit.' } }
  ],
  health: [
    { id: 'h1', categoryId: 'health', title: { tr: 'Ötanazi Hakkı', en: 'Right to Euthanasia' }, description: { tr: 'Terminal safhadaki bir hastanın kendi hayatına son verme isteğine saygı duyulmalı mı?', en: 'Respect a terminal patient\'s wish to end their life?' } },
    { id: 'h2', categoryId: 'health', title: { tr: 'Hasta Gizliliği', en: 'Patient Privacy' }, description: { tr: 'Ünlü bir siyasetçinin ağır bir hastalığını halktan saklamak etik mi?', en: 'Hide a politician\'s severe illness from the public?' } },
    { id: 'h3', categoryId: 'health', title: { tr: 'Organ Bağışı', en: 'Organ Donation' }, description: { tr: 'Sıradaki hastanın kötü bir hayat tarzı varsa, organı başkasına mı vermeli?', en: 'Skip a patient with a bad lifestyle for an organ transplant?' } },
    { id: 'h4', categoryId: 'health', title: { tr: 'Genetik Düzenleme', en: 'Gene Editing' }, description: { tr: 'Bebeklerin fiziksel özelliklerini önceden belirlemek etik midir?', en: 'Is it ethical to choose a baby\'s physical traits?' } },
    { id: 'h5', categoryId: 'health', title: { tr: 'Kötü Teşhis', en: 'Bad News' }, description: { tr: 'Ölmek üzere olan birine gerçeği söylemek mi yoksa umut aşılamak mı?', en: 'Tell the truth to a dying patient or give false hope?' } },
    { id: 'h6', categoryId: 'health', title: { tr: 'İlaç Fiyatları', en: 'Drug Pricing' }, description: { tr: 'Hayat kurtaran bir ilacı çok yüksek fiyata satmak serbest piyasa hakkı mıdır?', en: 'Is high pricing for life-saving drugs a free market right?' } }
  ],
  edu: [
    { id: 'e1', categoryId: 'edu', title: { tr: 'Akademik Torpil', en: 'Academic Favor' }, description: { tr: 'Başarılı bir öğrencinin yerine, bağış yapan bir velinin çocuğuna öncelik verilmeli mi?', en: 'Favoring a donor\'s child over a high-achiever?' } },
    { id: 'e2', categoryId: 'edu', title: { tr: 'Kopya Çekmek', en: 'Cheating' }, description: { tr: 'Arkadaşınızın sınavda kopya çektiğini gördünüz, ihbar eder misiniz?', en: 'Report a friend for cheating in an exam?' } },
    { id: 'e3', categoryId: 'edu', title: { tr: 'Yapay Zeka Ödevi', en: 'AI Homework' }, description: { tr: 'Ödevi tamamen AI\'ya yaptırıp "kendi çalışmam" olarak sunmak etik mi?', en: 'Presenting AI-generated homework as your own work?' } },
    { id: 'e4', categoryId: 'edu', title: { tr: 'Not Kayırmacılığı', en: 'Grade Inflation' }, description: { tr: 'Zor durumda olan bir öğrenciye, hak etmediği halde geçer not vermek.', en: 'Giving a passing grade to a struggling student who failed.' } },
    { id: 'e5', categoryId: 'edu', title: { tr: 'Kaynak Paylaşımı', en: 'Resource Sharing' }, description: { tr: 'Sınavda avantaj sağlayacak bir kaynağı rakiplerinizden saklamak.', en: 'Hiding a helpful study resource from your classmates/rivals.' } },
    { id: 'e6', categoryId: 'edu', title: { tr: 'Özel Ders', en: 'Private Tutoring' }, description: { tr: 'Öğretmenin kendi öğrencilerine ücretli özel ders vermesi etik mi?', en: 'Is it ethical for a teacher to tutor their own students for money?' } }
  ],
  society: [
    { id: 's1', categoryId: 'society', title: { tr: 'Sessiz Kalma Hakkı', en: 'Right to Silence' }, description: { tr: 'Bir haksızlığa tanık olduğunuzda sessiz kalmak suç ortaklığı mıdır?', en: 'Does silence make you an accomplice to injustice?' } },
    { id: 's2', categoryId: 'society', title: { tr: 'İfade Özgürlüğü', en: 'Free Speech' }, description: { tr: 'Nefret söylemi içeren ama yasal olan bir içeriği engellemeli mi?', en: 'Should legal but hateful speech be censored?' } },
    { id: 's3', categoryId: 'society', title: { tr: 'Sivil İtaatsizlik', en: 'Civil Disobedience' }, description: { tr: 'Haksız olduğunu düşündüğünüz bir yasayı çiğnemek etik midir?', en: 'Is it ethical to break a law you consider unjust?' } },
    { id: 's4', categoryId: 'society', title: { tr: 'Gözetim Toplumu', en: 'Surveillance' }, description: { tr: 'Güvenlik için her köşeye kamera koymak mahremiyet ihlali midir?', en: 'Is mass surveillance for safety a violation of privacy?' } },
    { id: 's5', categoryId: 'society', title: { tr: 'Servet Sınırı', en: 'Wealth Cap' }, description: { tr: 'Aşırı zenginliğe bir sınır getirmek bireysel özgürlüğe aykırı mı?', en: 'Is a cap on extreme wealth a violation of freedom?' } },
    { id: 's6', categoryId: 'society', title: { tr: 'Zorunlu Aşı', en: 'Mandatory Vaccine' }, description: { tr: 'Toplum sağlığı için bireyleri aşıya zorlamak etik midir?', en: 'Is it ethical to mandate vaccines for public health?' } }
  ],
  env: [
    { id: 'en1', categoryId: 'env', title: { tr: 'Sürdürülebilir Lüks', en: 'Sustainable Luxury' }, description: { tr: 'Gelecek nesilleri tehlikeye atan ama bugün zenginlik getiren bir madene onay vermek.', en: 'Approve a mine that brings wealth but harms future generations?' } },
    { id: 'en2', categoryId: 'env', title: { tr: 'Hızlı Moda', en: 'Fast Fashion' }, description: { tr: 'Çok ucuz ama sömürü ve kirlilikle üretilen kıyafetleri almak.', en: 'Buying cheap clothes made via exploitation and pollution.' } },
    { id: 'en3', categoryId: 'env', title: { tr: 'Plastik Kullanımı', en: 'Plastic Use' }, description: { tr: 'Pratik olduğu için tek kullanımlık plastik kullanmaya devam etmek.', en: 'Using single-use plastics just because they are convenient.' } },
    { id: 'en4', categoryId: 'env', title: { tr: 'Karbon Ayak İzi', en: 'Carbon Footprint' }, description: { tr: 'Gereksiz ama keyifli olan uçak yolculuklarından vazgeçmeli mi?', en: 'Should one stop flying for leisure to save the planet?' } },
    { id: 'en5', categoryId: 'env', title: { tr: 'Su Tasarrufu', en: 'Water Saving' }, description: { tr: 'Kıtlık varken bahçenizi sulamaya devam etmek hakkınız mı?', en: 'Is it your right to water your lawn during a drought?' } },
    { id: 'en6', categoryId: 'env', title: { tr: 'Nükleer Enerji', en: 'Nuclear Energy' }, description: { tr: 'Atık riski olsa da temiz enerji için nükleer santral kurmalı mı?', en: 'Build nuclear plants for clean energy despite waste risks?' } }
  ],
  digital: [
    { id: 'd1', categoryId: 'digital', title: { tr: 'Veri Sızıntısı', en: 'Data Leak' }, description: { tr: 'Arkadaşınızın özel verilerini bir iş avantajı için kullanmak etik midir?', en: 'Using a friend\'s private data for business advantage?' } },
    { id: 'd2', categoryId: 'digital', title: { tr: 'AI ve Emek', en: 'AI and Labor' }, description: { tr: 'Verimlilik adına çalışanların işini tamamen AI\'ya devretmek.', en: 'Replacing employees with AI for efficiency?' } },
    { id: 'd3', categoryId: 'digital', title: { tr: 'Sosyal Medya Maskesi', en: 'SM Mask' }, description: { tr: 'Daha fazla takipçi için gerçek dışı bir yaşam tarzı sergilemek.', en: 'Faking a lifestyle for followers?' } },
    { id: 'd4', categoryId: 'digital', title: { tr: 'Algoritmik Önyargı', en: 'Algorithmic Bias' }, description: { tr: 'İşe alım yapan bir AI\'nın belirli grupları elediğini fark etmek.', en: 'Noticing a hiring AI discriminates against certain groups.' } },
    { id: 'd5', categoryId: 'digital', title: { tr: 'Deepfake Etiği', en: 'Deepfake Ethics' }, description: { tr: 'Eğlence amaçlı bile olsa birinin izinsiz dijital kopyasını üretmek.', en: 'Creating a digital twin of someone without consent for "fun".' } },
    { id: 'd6', categoryId: 'digital', title: { tr: 'Dijital Unutulma', en: 'Right to be Forgotten' }, description: { tr: 'Birinin geçmişteki hatalarının internetten silinmesi hakkı var mı?', en: 'Do people have a right to erase past mistakes from the web?' } }
  ],
  animals: [
    { id: 'a1', categoryId: 'animals', title: { tr: 'Tıbbi Deneyler', en: 'Medical Testing' }, description: { tr: 'İnsan hayatını kurtarmak için hayvanlar üzerinde deney yapılması.', en: 'Animal testing to save human lives?' } },
    { id: 'a2', categoryId: 'animals', title: { tr: 'Evcil Hayvan vs Yabancı', en: 'Pet vs Stranger' }, description: { tr: 'Yangında kendi evcil hayvanınızı mı yoksa yabancıyı mı kurtarırsınız?', en: 'Save your pet or a stranger in a fire?' } },
    { id: 'a3', categoryId: 'animals', title: { tr: 'Hayvanat Bahçeleri', en: 'Zoos' }, description: { tr: 'Eğitim amaçlı olsa da vahşi hayvanları kafeste tutmak etik mi?', en: 'Is keeping wild animals in cages for education ethical?' } },
    { id: 'a4', categoryId: 'animals', title: { tr: 'Sokak Hayvanları', en: 'Stray Animals' }, description: { tr: 'Sokak hayvanlarını popülasyon kontrolü için uyutmak kabul edilebilir mi?', en: 'Is euthanasia acceptable for controlling stray populations?' } },
    { id: 'a5', categoryId: 'animals', title: { tr: 'Avcılık', en: 'Hunting' }, description: { tr: 'Spor veya eğlence amaçlı avlanmak ahlaki midir?', en: 'Is hunting for sport or hobby moral?' } },
    { id: 'a6', categoryId: 'animals', title: { tr: 'Veganlık Zorunluluğu', en: 'Vegan Obligation' }, description: { tr: 'Hayvan endüstrisine katkıda bulunmak ahlaki bir suç mudur?', en: 'Is contributing to the animal industry a moral crime?' } }
  ],
  culture: [
    { id: 'c1', categoryId: 'culture', title: { tr: 'Geleneksel Baskı', en: 'Traditional Pressure' }, description: { tr: 'Kendi değerlerinize aykırı aile geleneğini sürdürmeli misiniz?', en: 'Follow family tradition even if it contradicts your values?' } },
    { id: 'c2', categoryId: 'culture', title: { tr: 'Kültürel Miras', en: 'Cultural Heritage' }, description: { tr: 'Tarihi eserin yurt dışında mı yoksa ait olduğu yerde mi kalması etiktir?', en: 'Artifact: stay in a foreign museum or return home?' } },
    { id: 'c3', categoryId: 'culture', title: { tr: 'Kültürel Kisve', en: 'Cultural Appropriation' }, description: { tr: 'Başka bir kültüre ait sembolleri moda için kullanmak saygısızlık mı?', en: 'Is using another culture\'s symbols for fashion disrespectful?' } },
    { id: 'c4', categoryId: 'culture', title: { tr: 'Dilin Korunması', en: 'Language Preservation' }, description: { tr: 'Küresel dil varken yerel dili zorla yaşatmak ne kadar anlamlı?', en: 'Is it worth forcing a local language to survive in a global era?' } },
    { id: 'c5', categoryId: 'culture', title: { tr: 'Geleneksel Tıp', en: 'Traditional Medicine' }, description: { tr: 'Bilimsel olmasa da kültürel inanç gereği tıbbi tedaviyi reddetmek.', en: 'Rejecting medical treatment for cultural/spiritual beliefs.' } },
    { id: 'c6', categoryId: 'culture', title: { tr: 'Modern Şehirleşme', en: 'Modern Urbanization' }, description: { tr: 'Tarihi bir mahalleyi, modern konutlar için yıkmak etik midir?', en: 'Destroying a historic neighborhood for modern housing?' } }
  ]
};

export const PRINCIPLES: EthicalPrinciple[] = [
  { 
    id: 'utilitarianism', 
    name: { tr: 'Faydacılık (Mill)', en: 'Utilitarianism' }, 
    description: { tr: 'En fazla sayıda insan için en büyük mutluluk.', en: 'Greatest happiness for the greatest number.' }, 
    fullDescription: { 
      tr: 'Jeremy Bentham ve John Stuart Mill tarafından geliştirilen Faydacılık, bir eylemin ahlaki değerinin, o eylemin sağladığı toplam mutluluk veya fayda miktarıyla ölçüldüğünü savunur. Bu görüşe göre, etik olarak doğru olan seçenek, olumsuz etkileri minimize ederken en fazla sayıda varlık için en yüksek pozitif sonucu üretendir. Faydacılık, kararları verirken niyetlerden ziyade somut sonuçlara odaklanmayı gerektirir. "Herkes bir sayılır ve hiç kimse birden fazla sayılmaz" ilkesiyle hareket ederek radikal bir eşitlikçilik sunar. Ancak bu yaklaşım, bazen "çoğunluğun iyiliği" adına azınlık haklarının feda edilmesi gibi zorlu etik paradokslara yol açabilir. Modern dünyada kamu politikaları ve kaynak dağılımı konularında en sık başvurulan çerçevelerden biridir.', 
      en: 'Developed by Jeremy Bentham and John Stuart Mill, Utilitarianism posits that the moral value of an action is measured by the total happiness or utility it produces. According to this framework, the ethically correct choice is the one that produces the greatest positive outcome for the greatest number of people while minimizing harm. Utilitarianism requires focusing on concrete results rather than intentions. By operating on the principle that "everyone counts for one, and no one for more than one," it offers a form of radical equality. However, this approach can lead to difficult ethical paradoxes, such as sacrificing minority rights for the "greater good." In the modern world, it remains one of the most frequently used frameworks for public policy and resource allocation.' 
    } 
  },
  { 
    id: 'deontology', 
    name: { tr: 'Ödev Etiği (Kant)', en: 'Deontology' }, 
    description: { tr: 'Eylem evrensel bir ahlaki kurala uygunsa doğrudur.', en: 'Action is right if it follows universal moral rules.' }, 
    fullDescription: { 
      tr: 'Immanuel Kant tarafından sistemleştirilen Ödev Etiği (Deontoloji), bir eylemin ahlakiliğinin sonuçlarına değil, o eylemin belirli bir ahlaki yasaya veya ödeve uygun olup olmadığına bağlı olduğunu savunur. Kant\'ın meşhur "Kategorik İmperatifi"ne göre, ancak herkesin uymasını isteyebileceğiniz kurallara göre hareket etmelisiniz. Bu yaklaşım, insanları asla sadece bir araç olarak değil, her zaman kendinde bir amaç olarak görmemiz gerektiğini söyler. Örneğin, sonuçları ne kadar iyi olursa olsun yalan söylemek her zaman yanlıştır, çünkü "yalan söylemek" evrensel bir kural haline getirilemez. Ödev etiği, bireysel onuru ve mutlak doğruları koruma konusunda çok güçlüdür ancak bazen katı kuralların hayattaki karmaşık gri alanlarla çatışmasına neden olabilir.', 
      en: 'Systematized by Immanuel Kant, Deontology (Duty Ethics) argues that the morality of an action depends not on its consequences but on whether it adheres to a specific moral law or duty. According to Kant\'s famous "Categorical Imperative," you should only act according to rules that you would want to become universal laws. This approach insists that human beings should never be treated merely as a means to an end, but always as ends in themselves. For instance, lying is considered inherently wrong regardless of how beneficial the outcome might be, because "lying" cannot be willed as a universal law. While Deontology is powerful in protecting individual dignity and absolute truths, its rigidity can sometimes cause conflict in the complex "gray areas" of real life.' 
    } 
  },
  { 
    id: 'virtue', 
    name: { tr: 'Erdem Etiği (Aristoteles)', en: 'Virtue Ethics' }, 
    description: { tr: 'Karakterin erdemli gelişimi ve denge arayışı.', en: 'Virtuous character development and balance.' }, 
    fullDescription: { 
      tr: 'Aristoteles\'in temellerini attığı Erdem Etiği, eylemlerin kendisinden ziyade eylemi gerçekleştiren kişinin karakterine odaklanır. "Ne yapmalıyım?" sorusundan ziyade "Nasıl bir insan olmalıyım?" sorusuna yanıt arar. Ahlakın özü, "Altın Orta"yı (The Golden Mean) bulmaktır; yani her türlü aşırılığın arasındaki dengeli yolu keşfetmek. Örneğin cesaret, korkaklık ile cahilce atılganlık arasındaki orta yoldur. Erdem, bir gecede kazanılan bir şey değil, pratik yaparak ve alışkanlık edinerek geliştirilen bir mükemmelliktir. Bu yaklaşım, etik kararların sadece kurallar veya hesaplamalarla değil, kişinin zamanla geliştirdiği "pratik bilgelik" (phronesis) ile verilmesi gerektiğini savunur. Erdem etiği, bireysel gelişimi ve bütünsel karakter inşasını merkeze alır.', 
      en: 'Founded by Aristotle, Virtue Ethics focuses on the character of the individual performing the action rather than the action itself. It seeks to answer the question "What kind of person should I be?" rather than just "What should I do?". The essence of morality is finding the "Golden Mean"—the balanced path between extremes. For example, courage is the middle ground between cowardice and recklessness. Virtue is not something acquired overnight but an excellence developed through practice and habit. This approach argues that ethical decisions should be guided by "practical wisdom" (phronesis) gained through experience, not just rigid rules or calculations. Virtue ethics centers on personal growth and the cultivation of a holistic, moral character.' 
    } 
  },
  { 
    id: 'hedonism', 
    name: { tr: 'Hazcılık (Epikür)', en: 'Hedonism' }, 
    description: { tr: 'Acının yokluğu ve ruhsal huzur.', en: 'Absence of pain and mental tranquility.' }, 
    fullDescription: { 
      tr: 'Epikürcü Hazcılık, sanıldığının aksine kontrolsüz bir zevk arayışı değil, acının yokluğu (aponia) ve ruhun karmaşadan kurtulmuş halini (ataraksiya) hedefleyen rafine bir yaklaşımdır. Epikür\'e göre en yüksek iyi, bedensel ve zihinsel acıdan uzak bir yaşam sürmektir. Bu felsefe, kısa vadeli ve geçici zevkler yerine, uzun vadeli huzuru ve basit bir yaşamın getirdiği tatmini savunur. Dostluk, felsefe yapmak ve gereksiz arzulardan kaçınmak, gerçek mutluluğun anahtarlarıdır. Etik kararlar, kişinin huzurunu bozacak korkulardan (ölüm korkusu, tanrı korkusu gibi) kurtulmasına ve doğal, gerekli zevklerle yetinmesine odaklanmalıdır. Modern tüketim kültürüne karşı "yeterlilik" ve "sadelik" üzerinden güçlü bir alternatif sunar.', 
      en: 'Epicurean Hedonism, contrary to popular belief, is not a pursuit of uncontrolled pleasure but a refined approach aimed at the absence of pain (aponia) and a state of mental tranquility (ataraxia). According to Epicurus, the highest good is a life free from physical and mental distress. This philosophy advocates for long-term peace and the satisfaction derived from a simple life rather than short-lived, transient pleasures. Friendship, philosophical reflection, and the avoidance of unnecessary desires are the keys to true happiness. Ethical decisions should focus on freeing oneself from anxieties (such as the fear of death) and finding contentment in natural, necessary pleasures. It offers a powerful alternative to modern consumer culture through the lenses of "sufficiency" and "simplicity."' 
    } 
  },
  { 
    id: 'stoicism', 
    name: { tr: 'Stoa Etiği (M. Aurelius)', en: 'Stoicism' }, 
    description: { tr: 'Sadece kontrol edebildiğin şeylere odaklan.', en: 'Focus only on what you can control.' }, 
    fullDescription: { 
      tr: 'Stoa felsefesi, Zeno tarafından kurulmuş ve Marcus Aurelius ile Epiktetos gibi düşünürlerle zirveye ulaşmıştır. Bu etik anlayışın merkezinde "kontrol dikotomisi" yer alır: Bazı şeyler bizim kontrolümüzdedir (düşüncelerimiz, niyetlerimiz, eylemlerimiz), bazıları ise değildir (dış olaylar, başkalarının fikirleri, geçmiş). Erdemli bir yaşam, sadece kontrol edebildiğimiz alanlara odaklanmak ve dışsal olan her şeye karşı rasyonel bir mesafe koymakla mümkündür. Stoacılar için "doğaya uygun yaşamak", akılcı bir varlık olarak evrensel düzenle uyumlu olmak demektir. Duyguların esiri olmak yerine, mantığın rehberliğinde sarsılmaz bir iç kale (inner citadel) inşa etmeyi hedeflerler. Zorluklar karşısında direnç (resilience) geliştirmek ve her türlü durumu karakteri güçlendirmek için bir fırsat olarak görmek bu etiğin temelidir.', 
      en: 'Stoicism, founded by Zeno and popularized by thinkers like Marcus Aurelius and Epictetus, centers on the "dichotomy of control." Some things are within our control (our thoughts, intentions, and actions), while others are not (external events, the opinions of others, the past). A virtuous life is possible only by focusing on what we can control and maintaining a rational distance from external factors. For Stoics, "living in accordance with nature" means aligning oneself with universal reason as a rational being. Rather than being slaves to our emotions, they aim to build an "inner citadel" guided by logic. Resilience in the face of adversity and viewing every situation as an opportunity to strengthen character are the pillars of Stoic ethics.' 
    } 
  },
  { 
    id: 'justice', 
    name: { tr: 'Adalet Teorisi (Rawls)', en: 'Theory of Justice' }, 
    description: { tr: 'En dezavantajlıyı gözeterek karar al.', en: 'Make decisions favoring the most disadvantaged.' }, 
    fullDescription: { 
      tr: 'John Rawls, adaleti "hakkaniyet olarak adalet" kavramı üzerinden kurgular. Onun en meşhur düşünce deneyi "Bilgisizlik Peçesi"dir (Veil of Ignorance). Bu deneye göre, bir toplumun kurallarını koyarken kendi cinsiyetinizi, ırkınızı, zekanızı veya sosyal statünüzü bilmediğinizi hayal etmelisiniz. Bu peçenin arkasında rasyonel insanlar, en kötü durumda olanların bile insanca bir yaşam sürebileceği adil kurallar üzerinde anlaşacaktır. Rawls\'un "Fark İlkesi"ne göre, sosyal ve ekonomik eşitsizlikler ancak toplumun en az avantajlı üyelerinin durumunu iyileştirdiği sürece kabul edilebilir. Bu etik yaklaşım, kurumsal adaleti, fırsat eşitliğini ve dezavantajlı grupların korunmasını birincil öncelik haline getirir. Bireysel çıkarların ötesinde, sistemin meşruiyetini sorgular.', 
      en: 'John Rawls constructs justice through the concept of "justice as fairness." His most famous thought experiment is the "Veil of Ignorance." He suggests that when establishing the rules of a society, you should imagine that you do not know your own gender, race, intelligence, or social status. Behind this veil, rational people would agree on fair rules where even those in the worst positions could lead a dignified life. According to Rawls\'s "Difference Principle," social and economic inequalities are acceptable only if they work to the benefit of the least advantaged members of society. This ethical approach prioritizes institutional justice, equality of opportunity, and the protection of vulnerable groups, questioning the legitimacy of a system beyond individual interests.' 
    } 
  },
  { 
    id: 'care', 
    name: { tr: 'Bakım Etiği (Gilligan)', en: 'Ethics of Care' }, 
    description: { tr: 'İlişkiler, empati ve sorumluluklar.', en: 'Relationships, empathy, and responsibilities.' }, 
    fullDescription: { 
      tr: 'Carol Gilligan ve Nel Noddings tarafından geliştirilen Bakım Etiği, geleneksel etiğin "soyut kurallar" ve "evrensel ilkeler" vurgusuna karşı çıkar. Bunun yerine, insanların birbirine bağlı olduğunu ve ahlakın gerçek ilişkiler, empati ve bakım verme sorumluluğu üzerinden kurulması gerektiğini savunur. Bu yaklaşımda doğru karar, sadece mantıksal bir hesaplamanın sonucu değil, paydaşlar arasındaki bağları koruyan ve ihtiyaçlara duyarlı olan karardır. Bakım etiği, bağlamsaldır; yani her durumun kendine özgü tarihini ve duygusal derinliğini önemser. Adalet odaklı "kimin hakkı?" sorusunun yanına, ilişki odaklı "kimin neye ihtiyacı var?" sorusunu koyar. Özellikle aile, sağlık ve toplumsal dayanışma alanlarında çok güçlü bir rehberlik sunar.', 
      en: 'Developed by Carol Gilligan and Nel Noddings, the Ethics of Care challenges traditional ethics\' emphasis on "abstract rules" and "universal principles." Instead, it argues that humans are inherently interdependent and that morality should be built on actual relationships, empathy, and the responsibility of caregiving. In this framework, the right decision is not just the result of a logical calculation but one that preserves the bonds between stakeholders and remains sensitive to their needs. Care ethics is contextual; it values the unique history and emotional depth of every situation. It complements the justice-oriented question "Who has what right?" with the relationship-oriented question "Who needs what?". It provides powerful guidance, especially in the realms of family, health, and social solidarity.' 
    } 
  },
  { 
    id: 'existentialism', 
    name: { tr: 'Varoluşçu Etik (Sartre)', en: 'Existentialist Ethics' }, 
    description: { tr: 'İnsan özgürdür; her seçim kendi özünü yaratır.', en: 'Humans are free; every choice creates one\'s essence.' }, 
    fullDescription: { 
      tr: 'Jean-Paul Sartre\'a göre, "varoluş özden önce gelir." Yani bizi tanımlayan hazır bir insan doğası veya kader yoktur; biz seçimlerimizle kendimizi her an yeniden yaratırız. Bu durum, insanı mutlak bir özgürlüğe ve beraberinde kaçınılmaz bir sorumluluğa mahkum eder. Bir karar verdiğinizde, aslında sadece kendiniz için değil, tüm insanlık adına bir değer yaratmış olursunuz. Varoluşçu etik, "kötü inanç" (bad faith) dediği şeyden kaçınmayı, yani sorumluluğu kadere, topluma veya kurallara yıkmadan, kararın ağırlığını dürüstçe üstlenmeyi emreder. Bu felsefe, dışsal rehberlerin yokluğunda bireyin kendi ahlaki pusulasını oluşturma cesaretini yüceltir. Her seçim bir eylemdir ve her eylem bir tanımdır.', 
      en: 'According to Jean-Paul Sartre, "existence precedes essence." There is no predefined human nature or destiny that defines us; we recreate ourselves at every moment through our choices. This state condemns humans to absolute freedom and, consequently, inescapable responsibility. When you make a decision, you are creating a value not just for yourself, but for all of humanity. Existentialist ethics commands us to avoid "bad faith"—the act of blaming destiny, society, or rules for our choices—and to honestly shoulder the weight of our decisions. In the absence of external guides, this philosophy celebrates the courage of the individual to create their own moral compass. Every choice is an act, and every act is a definition.' 
    } 
  },
  { 
    id: 'pragmatism', 
    name: { tr: 'Pragmatizm (Dewey)', en: 'Pragmatism' }, 
    description: { tr: 'Etik, hayatta en iyi sonuç veren pratik bir araçtır.', en: 'Ethics is a practical tool that works best in life.' }, 
    fullDescription: { 
      tr: 'John Dewey ve William James gibi düşünürlerin öncülüğünü yaptığı Pragmatizm, etik ilkeleri gökten inmiş dogmalar olarak değil, insan sorunlarını çözmek için geliştirilmiş pratik araçlar olarak görür. Bir fikrin veya kuralın "doğruluğu", onun gerçek hayatta ne kadar işe yaradığı ve insan deneyimini ne kadar iyileştirdiği ile ölçülür. Pragmatistler için etik, statik bir liste değil, bitmek bilmeyen bir sosyal laboratuvar ve deneysel bir süreçtir. Kararlar verilirken katı formüller yerine, o anki ihtiyacın ve olası pratik sonuçların esnek bir değerlendirmesi yapılır. Bu yaklaşım, değişen zamanın ruhuna ve yeni bilgilere uyum sağlamayı teşvik eder. "Eğer bir kural hayatı imkansız kılıyorsa, o kural yanlıştır" mantığıyla hareket eder.', 
      en: 'Led by thinkers like John Dewey and William James, Pragmatism views ethical principles not as dogmatic rules but as practical tools developed to solve human problems. The "truth" of an idea or rule is measured by how well it works in real life and how much it improves the human experience. For pragmatists, ethics is not a static list but a continuous social laboratory and an experimental process. When making decisions, they favor a flexible evaluation of the current need and potential practical outcomes over rigid formulas. This approach encourages adaptation to the changing spirit of the times and new information. It operates on the logic that "if a rule makes life impossible, the rule is wrong."' 
    } 
  },
  { 
    id: 'absurdism', 
    name: { tr: 'Absürdizm (Camus)', en: 'Absurdism' }, 
    description: { tr: 'Dünyanın anlamsızlığında kendi anlamını yarat.', en: 'Create meaning in a meaningless world.' }, 
    fullDescription: { 
      tr: 'Albert Camus tarafından geliştirilen Absürdizm, insanın anlam arayışı ile dünyanın sağır edici sessizliği arasındaki çatışmayı (uyumsuzluğu) temel alır. Hayatın rasyonel bir anlamı veya kozmik bir planı olmayabilir; ancak Camus\'ye göre bu bir umutsuzluk nedeni değil, tam tersine bir özgürlük alanıdır. Sisyphus efsanesinde olduğu gibi, taşı her gün tepeye çıkarmak anlamsız görünse de, bu çabayı bilerek ve isyan ederek sürdürmek insana kendi zaferini kazandırır. Absürt etik, hayatın kısalığını ve mantıksızlığını kabul ederek, her anı tutkuyla, dürüstçe ve başkalarının acısına duyarsız kalmadan (başkaldırarak) yaşamayı önerir. Bir "anlam" bulmak yerine, "yaşama arzusu"nun kendisini ahlaki bir duruş haline getirir.', 
      en: 'Absurdism, developed by Albert Camus, is based on the conflict (the absurdity) between the human search for meaning and the silent, indifferent universe. Life may not have a rational meaning or a cosmic plan, but for Camus, this is not a reason for despair; rather, it is a realm of freedom. Like the Myth of Sisyphus, even if pushing the rock uphill every day seems meaningless, continuing this effort with awareness and rebellion gives humanity its own victory. Absurd ethics suggests accepting life\'s brevity and irrationality while living every moment with passion, honesty, and a rebellious sensitivity to the suffering of others. Instead of finding "meaning," it turns the "will to live" itself into a moral stance.' 
    } 
  },
  { 
    id: 'contractarianism', 
    name: { tr: 'Sözleşmecilik (Hobbes)', en: 'Contractarianism' }, 
    description: { tr: 'Toplumsal barış için ortak kurallar üzerine anlaşmak.', en: 'Agreeing on rules for social peace.' }, 
    fullDescription: { 
      tr: 'Thomas Hobbes ile başlayan Sözleşmecilik, ahlakı bireylerin rasyonel bir şekilde üzerinde uzlaştığı kurallar bütünü olarak görür. Doğal durumda (kuralsızlık halinde) insan hayatı "yalnız, yoksul, kirli ve kısa" olacağı için, insanlar kendi güvenliklerini ve çıkarlarını korumak adına bazı özgürlüklerinden vazgeçerek bir "toplumsal sözleşme" imzalarlar. Bu etik yaklaşıma göre doğru olan, karşılıklı fayda sağlayan ve herkesin uyması durumunda düzeni koruyan kuraldır. Etik, kutsal bir kaynaktan değil, rasyonel bir ihtiyaçtan doğar. Kararlar verilirken "Eğer herkes bu kuralı ihlal etseydi, birlikte yaşamamız mümkün olur muydu?" sorusu hayati önem taşır. Güven, iş birliği ve toplumsal düzen bu etiğin en temel değerleridir.', 
      en: 'Starting with Thomas Hobbes, Contractarianism views morality as a set of rules that individuals rationally agree upon. Since life in a state of nature (without rules) would be "solitary, poor, nasty, brutish, and short," humans sign a "social contract," giving up some freedoms to protect their own security and interests. According to this ethical approach, the right choice is the rule that provides mutual benefit and preserves order when followed by everyone. Ethics arises not from a divine source, but from a rational necessity. When making decisions, the vital question is: "If everyone violated this rule, would our coexistence be possible?". Trust, cooperation, and social order are the core values of this ethical framework.' 
    } 
  },
];

export const UI_STRINGS = {
  tr: {
    askTab: 'Sor',
    libraryTab: 'Kütüphane',
    savedTab: 'Kayıtlı',
    profileTab: 'Profil',
    settingsTab: 'Ayarlar',
    askTitle: 'Zihnindekileri Paylaş',
    askPlaceholder: 'Karar vermekte zorlandığınız durumu buraya yazın...',
    analyzeBtn: 'Analiz Et',
    analyzing: 'Analiz Ediliyor...',
    results: 'Etik Analiz Raporu',
    summary: 'Sentez ve Rehberlik',
    kantPerspective: 'Ödev Etiği',
    millPerspective: 'Faydacılık',
    aristotlePerspective: 'Erdem Etiği',
    microQuestions: 'Derin Düşünce Soruları',
    saveAnalysis: 'Raporu Arşivle',
    languageLabel: 'Dil Tercihi',
    themeLabel: 'Görünüm',
    emptyLibrary: 'Kütüphaneyi keşfedin.',
    noSaved: 'Henüz arşivlenmiş analiziniz yok.',
    newDilemma: 'Yeni Bir İkilem',
    history: 'Analiz Geçmişi',
    back: 'Geri',
    scenarios: 'Senaryolar',
    noScenarios: 'Bu kategoride henüz senaryo bulunmuyor.',
    principleDetail: 'Ahlaki Prensip Detayı',
    profileModeLabel: 'Kullanım Modu',
    standardMode: 'Standart',
    personalizedMode: 'Kişiselleştirilmiş',
    startTest: 'Analize Başla',
    modeSelectionTitle: 'Pusulanızı Belirleyin',
    standardDesc: 'Genel etik çerçeveleri kullanın.',
    personalizedDesc: 'Kendi değerlerinize göre özel rehberlik alın.',
    resetWarning: 'Tüm test verileriniz kalıcı olarak silinecektir.',
    confirmReset: 'Sil ve Standart Moda Geç',
    cancel: 'Vazgeç',
    testProgress: 'İlerleme',
    testCompleted: 'Tamamlandı',
    calculating: 'Değerler Hesaplanıyor...',
    yourResults: 'Etik Profiliniz',
    topFive: 'Baskın 5 Ahlaki Eğilim',
    testTimeEstimate: 'Yaklaşık 3 dakika',
    continueBtn: 'Uygulamaya Dön',
    testStartTitle: 'Etik Pusula Analizi',
    exitTestConfirm: 'Analizden çıkılsın mı?',
    exitTestWarning: 'Tüm ilerlemeniz kaybolacak.',
    exitTestButton: 'Çıkış Yap',
    stayTestButton: 'Devam Et',
    shareBtn: 'Paylaş',
    shareText: 'Etik Analiz Sonucu:\n\nDurum: {dilemma}\n\nRehberlik: {summary}\n\n#ETİK #Felsefe #Karar'
  },
  en: {
    askTab: 'Ask',
    libraryTab: 'Library',
    savedTab: 'Saved',
    profileTab: 'Profile',
    settingsTab: 'Settings',
    askTitle: 'Share Your Thoughts',
    askPlaceholder: 'Describe the dilemma you are facing...',
    analyzeBtn: 'Analyze',
    analyzing: 'Analyzing...',
    results: 'Ethical Report',
    summary: 'Synthesis & Guidance',
    kantPerspective: 'Deontology',
    millPerspective: 'Utilitarianism',
    aristotlePerspective: 'Virtue Ethics',
    microQuestions: 'Deep Reflection',
    saveAnalysis: 'Archive Report',
    languageLabel: 'Language',
    themeLabel: 'Appearance',
    emptyLibrary: 'Explore the library.',
    noSaved: 'No archived reports yet.',
    newDilemma: 'New Dilemma',
    history: 'Report History',
    back: 'Back',
    scenarios: 'Scenarios',
    noScenarios: 'No scenarios found yet.',
    principleDetail: 'Moral Principle',
    profileModeLabel: 'Usage Mode',
    standardMode: 'Standard',
    personalizedMode: 'Personalized',
    startTest: 'Start Analysis',
    modeSelectionTitle: 'Set Your Compass',
    standardDesc: 'Use standard ethical frameworks.',
    personalizedDesc: 'Get guidance tailored to your values.',
    resetWarning: 'Your personalized data will be lost.',
    confirmReset: 'Switch to Standard',
    cancel: 'Cancel',
    testProgress: 'Progress',
    testCompleted: 'Completed',
    calculating: 'Calculating...',
    yourResults: 'Ethical Profile',
    topFive: 'Top 5 Moral Leanings',
    testTimeEstimate: 'Approx. 3 minutes',
    continueBtn: 'Return to App',
    testStartTitle: 'Ethical Compass',
    exitTestConfirm: 'Exit Analysis?',
    exitTestWarning: 'Progress will be lost.',
    exitTestButton: 'Exit',
    stayTestButton: 'Continue',
    shareBtn: 'Share',
    shareText: 'Ethical Analysis:\n\nSituation: {dilemma}\n\nGuidance: {summary}\n\n#ETİK #Philosophy'
  }
};

export const PHILOSOPHY_QUOTES = [
  {
    tr: '"Ahlak, özel bir zamanda, özel bir kişinin, özel bir sebeple doğru şeyi yapmasıdır." - Aristoteles',
    en: '"Virtue is doing the right thing, in the right way, at the right time, for the right reason." - Aristotle'
  },
  {
    tr: '"Eylemin maksimi, buna göre hareket etmek isteyeceğin evrensel yasaya dönüştürülebiliyorsa ahlaksal olandır." - Kant',
    en: '"An action is moral if its maxim could become a universal law without contradiction." - Kant'
  },
  {
    tr: '"En iyi toplum, en fazla sayıda insanın mutluluğunu sağlayan toplumdir." - Mill',
    en: '"The greatest happiness for the greatest number is the foundation of morality and legislation." - Mill'
  },
  {
    tr: '"İyi ve kötü arasındaki fark, sadece neyin getireceği sonuçlar değil, niyettir." - Kant',
    en: '"The distinction between good and evil lies not just in consequences, but in intention." - Kant'
  },
  {
    tr: '"Adalet, kişinin kendi durumunda başka birisinin olmasını istemediği şeyi başkasına yapmayı reddetmesidir." - Confucius',
    en: '"Justice is refraining from doing to others what you would not want done to yourself." - Confucius'
  },
  {
    tr: '"Özgürlük sorumluluğu getirir. Eğer yapamıyorsan, bunu yapmaktan kaçınmalısın." - Sartre',
    en: '"Freedom brings responsibility. If you cannot bear it, you must refrain from acting." - Sartre'
  },
  {
    tr: '"Akıl, ahlakın temeliyüre, yani yapılan eylemin doğru olup olmadığını belirler." - Aristoteles',
    en: '"Reason is the foundation of ethics - it determines whether an action is right or wrong." - Aristotle'
  },
  {
    tr: '"Sevgi, yerleme alanında en yüksek ahlak ilkesidir." - Confucius',
    en: '"Compassion is the highest moral principle in the realm of human relations." - Confucius'
  },
  {
    tr: '"Ahlak, kendini denetleyen bir olay değildir. İnsan, öyle yapmalıdır çünkü bu doğru olandır." - Kant',
    en: '"Morality is not self-interest in disguise. One must act because it is right." - Kant'
  },
  {
    tr: '"Acı çekmek ağırlaştırdığında, erdemli insana hiç çaba sarf etmeyen talihli kişiden daha değerli midir?" - Aristoteles',
    en: '"Is the virtuous person who overcomes hardship more admirable than one blessed with ease?" - Aristotle'
  },
  {
    tr: '"Her insanın içinde vicdanın sesi vardır. Onu dinlemek görevimiz." - Rousseau',
    en: '"There is a voice within each person - the voice of conscience. It is our duty to listen." - Rousseau'
  },
  {
    tr: '"Etiğe uygun yaşamak, kendimizi tamamen geliştirebilmemiz demektir." - Spinoza',
    en: '"To live ethically means to develop ourselves fully and completely." - Spinoza'
  },
  {
    tr: '"Doğru şeyi yapmak her zaman kolay değildir, ama bunu yapmamak kolay hale getiremeyiz." - MLK',
    en: '"Doing the right thing is not always easy, but we must never make not doing it easier." - MLK'
  },
  {
    tr: '"Karakter, iyilik karşılığında iyilikle değil, iyilik karşılığında doğru yapı ile ölçülür." - Aristoteles',
    en: '"Character is not measured by how you return good with good, but how you respond to wrong." - Aristotle'
  },
  {
    tr: '"Sorumluluğu kabul eden insan, aslında özgür olan insandır." - Sartre',
    en: '"The person who accepts responsibility is the one who is truly free." - Sartre'
  },
  {
    tr: '"Adalet, yalnızca kanunlar değil, insanların kalplerine yazılması gereken bir ilkedir." - Montesquieu',
    en: '"Justice is not merely written in laws, but must be inscribed in human hearts." - Montesquieu'
  },
  {
    tr: '"Iyilik, bilinçli tercih yapmanın bir sonucudur, tesadüf değildir." - Aristoteles',
    en: '"Goodness is the result of conscious choice, not accident." - Aristotle'
  },
  {
    tr: '"Bir başkasının acısından kurtulmak için, kendi rahatlığından fedakarlık etmek ahlaktır." - Schopenhauer',
    en: '"It is moral to sacrifice your own comfort to relieve the suffering of another." - Schopenhauer'
  },
  {
    tr: '"Hak ve yükümlülük bir madalyanın iki yüzüdür, birini seçemezsin." - Tagore',
    en: '"Rights and duties are two sides of the same coin - you cannot choose one without the other." - Tagore'
  },
  {
    tr: '"Farklı insanların farklı ihtiyaçları vardır, adalet herkese aynı şeyi vermek değildir." - Mill',
    en: '"Different people have different needs. Justice is not giving everyone the same thing." - Mill'
  },
  {
    tr: '"Bencillik ahlakın düşmanıdır, fedakarlık ise temelleridir." - Brandes',
    en: '"Selfishness is the enemy of ethics; sacrifice is its foundation." - Brandes'
  },
  {
    tr: '"İnsanın içinde bir çatışma varsa, dış dünyada da barış bulamayacağı." - Gandhi',
    en: '"If there is conflict within a person, they cannot find peace in the world." - Gandhi'
  },
  {
    tr: '"Gerçek güç, kötülüğü yapabilip yapmamak tercihini yapabilmektir." - Gerrard Winstanley',
    en: '"True strength is having the power to do evil, yet choosing not to." - Gerrard Winstanley'
  },
  {
    tr: '"Etik varolmayan bir hayat, yaşanmaya değer mi?" - Platon',
    en: '"Is a life without ethics worth living?" - Plato'
  },
  {
    tr: '"Merhamet olmayan adalet, acı verici bir şey olur. Adalet olmayan merhamet ise zayıf." - C.S. Lewis',
    en: '"Justice without mercy is cruel. Mercy without justice is weak." - C.S. Lewis'
  },
  {
    tr: '"Başkasını yargılarken, önce kendini yargıla." - Confucius',
    en: '"Before judging another, judge yourself first." - Confucius'
  },
  {
    tr: '"Erdem, pratiğe geçirilmediği sürece sadece bir fikirdir." - Aristoteles',
    en: '"Virtue is merely an idea until it is put into practice." - Aristotle'
  },
  {
    tr: '"Toplumun iyiliği, bireysel çıkardan daha önemliyse de, birey hiçbir zaman tam olarak göz ardı edilmemelidir." - Bentham',
    en: '"While the good of society matters more than individual interests, the individual must never be entirely ignored." - Bentham'
  },
  {
    tr: '"Cesaret istikrarlı bir davranış değildir, korkunun üstesinden gelmektir." - Aristoteles',
    en: '"Courage is not the absence of fear, but overcoming it." - Aristotle'
  },
  {
    tr: '"Mutluluğun yolu bilgedir, bilginin yolu ise sorulardır." - Sokrates',
    en: '"The path to wisdom is through questioning." - Socrates'
  },
  {
    tr: '"Sessiz kalmak, kötülüğe katılmaktır." - Kierkegaard',
    en: '"Silence in the face of evil is complicity." - Kierkegaard'
  },
  {
    tr: '"Her birimiz, bir başkasının yaşamını değiştirebilecek gücümüz var." - Helen Keller',
    en: '"Each of us has the power to change another person\'s life." - Helen Keller'
  },
  {
    tr: '"Hiç kimse adaletsizliğin bir parçası olmak için yaratılmamıştır." - MLK',
    en: '"No one is born to be a part of injustice." - MLK'
  },
  {
    tr: '"Kendine saygı, görevini yapması ile başlar." - Kant',
    en: '"Self-respect begins with fulfilling your duty." - Kant'
  },
  {
    tr: '"Etik bir karar vermek, imkansız seçimler arasında en az kötüyü seçmektir." - Trolley Problemi\'nden ilham',
    en: '"Making an ethical decision often means choosing the lesser of evils." - Inspired by ethical dilemmas'
  },
  {
    tr: '"Vicdan, doğru ve yanlış arasındaki fark hakkında hiç yanılmayan içsel rehberdir." - Rosseau',
    en: '"Conscience is the inner guide that never errs about right and wrong." - Rousseau'
  },
  {
    tr: '"Mutluluğun bizi bulmasını bekleme, sen avı kovalamaya git." - James Hunt',
    en: '"Do not wait for happiness to find you; go out and pursue virtue." - James Hunt'
  },
  {
    tr: '"Bağışlama, nekadar ama güçtür." - Mandela',
    en: '"Forgiveness is an act of immense strength." - Mandela'
  },
  {
    tr: '"Her sorunun etik yönü vardır; sadece teknoloji ya da para çözüm değildir." - Jonas',
    en: '"Every problem has an ethical dimension; technology and money alone are not solutions." - Jonas'
  }
];

import React from 'react';
import { Language, Theme } from '../types';
import { THEMES } from '../constants';
import { getDailyLimit, setPremium } from '../services/freemium';
import { trackEvent, Events } from '../services/analytics';

interface PaywallScreenProps {
  language: Language;
  theme: Theme;
  onClose: () => void;
  onPurchaseSuccess: () => void;
}

const PaywallScreen: React.FC<PaywallScreenProps> = ({ language, theme, onClose, onPurchaseSuccess }) => {
  const currentTheme = THEMES[theme];

  React.useEffect(() => { trackEvent(Events.PAYWALL_VIEW); }, []);

  const handlePurchase = () => {
    trackEvent(Events.PURCHASE_START);
    setPremium(true);
    trackEvent(Events.PURCHASE_SUCCESS);
    onPurchaseSuccess();
  };

  const handleRestore = () => {
    trackEvent(Events.PURCHASE_RESTORE);
    setPremium(true);
    onPurchaseSuccess();
  };

  const handleDismiss = () => {
    trackEvent(Events.PAYWALL_DISMISS);
    onClose();
  };

  const features = language === Language.TR
    ? [
        { icon: '♾️', text: 'Sınırsız günlük analiz' },
        { icon: '📊', text: 'Gelişmiş etik rapor' },
        { icon: '📈', text: 'Geçmiş karşılaştırma & trend' },
        { icon: '🎨', text: 'Özel tema paketleri' },
        { icon: '⚡', text: 'Öncelikli AI yanıt' },
      ]
    : [
        { icon: '♾️', text: 'Unlimited daily analyses' },
        { icon: '📊', text: 'Advanced ethics reports' },
        { icon: '📈', text: 'History comparison & trends' },
        { icon: '🎨', text: 'Exclusive theme packs' },
        { icon: '⚡', text: 'Priority AI responses' },
      ];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className={`w-full max-w-sm ${currentTheme.bg} rounded-[40px] p-10 space-y-8 shadow-2xl border ${currentTheme.border} animate-in zoom-in-95 duration-500`}>
        {/* Close */}
        <div className="flex justify-end">
          <button onClick={handleDismiss} className="p-2 opacity-30 hover:opacity-100 text-lg">✕</button>
        </div>

        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-6xl">✨</span>
          <h2 className="text-2xl font-bold serif">ETİK Premium</h2>
          <p className="text-xs opacity-50 italic leading-relaxed">
            {language === Language.TR
              ? `Bugünkü ${getDailyLimit()} ücretsiz analizini kullandın. Premium ile sınır olmadan devam et.`
              : `You've used your ${getDailyLimit()} free analyses today. Go unlimited with Premium.`}
          </p>
        </div>

        {/* Features */}
        <div className="space-y-3">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-xl">{f.icon}</span>
              <p className="text-sm font-medium">{f.text}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="space-y-3">
          <button onClick={handlePurchase} className={`w-full py-5 rounded-full font-bold shadow-xl active:scale-95 ${currentTheme.button}`}>
            {language === Language.TR ? '🚀 Premium\'a Geç' : '🚀 Go Premium'}
          </button>
          <button onClick={handleRestore} className="w-full py-3 text-xs opacity-30 hover:opacity-60 transition-all">
            {language === Language.TR ? 'Satın almayı geri yükle' : 'Restore Purchase'}
          </button>
          <p className="text-center text-[10px] opacity-20">
            {language === Language.TR ? '₺29.99/ay · İstediğin zaman iptal' : '$2.99/mo · Cancel anytime'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaywallScreen;

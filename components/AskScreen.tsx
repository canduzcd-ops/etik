
import React, { useState, useEffect } from 'react';
import { Language, Theme, AnalysisResult } from '../types';
import { UI_STRINGS, THEMES, PHILOSOPHY_QUOTES } from '../constants';
import { analyzeEthicalDilemma } from '../services/geminiServiceSecure';
import { canAnalyze, recordUsage, getRemainingAnalyses, isPremium as checkPremium } from '../services/freemium';
import { recordAnalysis } from '../services/gamification';
import { trackEvent, Events } from '../services/analytics';
import ShareSheet from './ShareSheet';
import PaywallScreen from './PaywallScreen';

const AskScreen: React.FC<any> = ({ language, theme, userName, onSave, prefilledDilemma, onClearPrefill, onBadgeEarned }) => {
  const [dilemma, setDilemma] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [showShare, setShowShare] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [remaining, setRemaining] = useState(getRemainingAnalyses());

  // Rotate philosophy quotes while analyzing
  useEffect(() => {
    if (!isAnalyzing) return;
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % PHILOSOPHY_QUOTES.length);
    }, 3500); // Change quote every 3.5 seconds
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  useEffect(() => {
    if (prefilledDilemma) {
      setDilemma(prefilledDilemma);
      setResult(null);
      if (onClearPrefill) onClearPrefill();
    }
  }, [prefilledDilemma]);

  const handleAnalyze = async () => {
    if (!dilemma.trim()) return;
    if (!canAnalyze()) { setShowPaywall(true); return; }
    setIsAnalyzing(true);
    setError(null);
    try {
      const data = await analyzeEthicalDilemma(dilemma, language);
      setResult({
        id: Date.now().toString(),
        dilemma,
        timestamp: Date.now(),
        frameworks: { kant: data.kant, mill: data.mill, aristotle: data.aristotle },
        summary: data.summary,
        microQuestions: data.microQuestions
      });
      recordUsage();
      const { newBadges } = recordAnalysis();
      if (newBadges.length > 0 && onBadgeEarned) onBadgeEarned(newBadges);
      trackEvent(Events.ANALYSIS_COMPLETE);
      setRemaining(getRemainingAnalyses());
    } catch (err) {
      setError(language === Language.TR ? 'Bağlantı hatası oluştu.' : 'Connection error occurred.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const t = UI_STRINGS[language];
  const currentTheme = THEMES[theme];

  if (result) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold serif">{t.results}</h2>
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-30 italic">"{result.dilemma}"</p>
          </div>
          <button onClick={() => { setShowShare(true); trackEvent(Events.SHARE_OPEN); }} className={`p-4 rounded-full ${currentTheme.primary} border ${currentTheme.border} shadow-sm active:scale-95`}>📤</button>
        </div>

        <section className={`p-8 squircle ${currentTheme.button} shadow-2xl shadow-blue-500/20`}>
          <h3 className="font-bold mb-4 uppercase tracking-[0.2em] text-[10px] opacity-70">{t.summary}</h3>
          <p className="text-xl leading-relaxed font-medium serif italic leading-snug">{result.summary}</p>
        </section>

        <div className="grid gap-4">
          <PerspectiveCard title={t.kantPerspective} content={result.frameworks.kant} icon="⚖️" theme={currentTheme} />
          <PerspectiveCard title={t.millPerspective} content={result.frameworks.mill} icon="📊" theme={currentTheme} />
          <PerspectiveCard title={t.aristotlePerspective} content={result.frameworks.aristotle} icon="🏺" theme={currentTheme} />
        </div>

        <section className="space-y-4">
          <h3 className="font-bold uppercase tracking-[0.2em] text-[10px] opacity-30">{t.microQuestions}</h3>
          {result.microQuestions.map((q, i) => (
            <div key={i} className={`p-6 squircle-sm border ${currentTheme.border} ${currentTheme.primary} italic text-sm shadow-sm`}>{q}</div>
          ))}
        </section>

        <div className="flex flex-col space-y-3 pt-6">
          <button onClick={() => { onSave(result); setResult(null); setDilemma(''); }} className={`w-full py-5 rounded-full font-bold shadow-xl active:scale-95 ${currentTheme.button}`}>
            {t.saveAnalysis}
          </button>
          <button onClick={() => setResult(null)} className="w-full py-4 opacity-40 font-bold text-xs uppercase tracking-widest">
            {t.newDilemma}
          </button>
        </div>

        {/* Share Sheet */}
        {showShare && result && (
          <ShareSheet result={result} language={language} theme={theme} onClose={() => setShowShare(false)} onBadgeEarned={onBadgeEarned} />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Analyzing State - Full Screen Quote Display */}
      {isAnalyzing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center space-y-8 px-6 max-w-2xl">
            {/* Spinner */}
            <div className="w-12 h-12 border-3 border-current border-t-transparent rounded-full animate-spin opacity-60"></div>
            
            {/* Quote Container */}
            <div className="h-40 flex items-center justify-center">
              <div 
                key={currentQuoteIndex} 
                className="text-lg italic leading-relaxed text-center px-6 opacity-80 animate-in fade-in duration-500"
              >
                {language === Language.TR 
                  ? PHILOSOPHY_QUOTES[currentQuoteIndex].tr 
                  : PHILOSOPHY_QUOTES[currentQuoteIndex].en}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3 pt-4">
        <h2 className="text-4xl font-bold serif tracking-tight">
          {userName ? (language === Language.TR ? `Hoş geldin, ${userName}` : `Welcome, ${userName}`) : t.askTitle}
        </h2>
        <p className="text-sm opacity-40 leading-relaxed max-w-[80%] italic">
          Zihnini meşgul eden ikilemi paylaş, farklı ahlaki pencerelerden birlikte bakalım.
        </p>
      </div>

      <div className="relative">
        <textarea
          value={dilemma} onChange={(e) => setDilemma(e.target.value)}
          placeholder={t.askPlaceholder}
          disabled={isAnalyzing}
          className={`w-full h-72 p-8 squircle border-2 border-transparent ${currentTheme.primary} focus:border-blue-500/20 outline-none transition-all resize-none text-lg serif italic leading-relaxed shadow-inner`}
        />
        <div className="absolute bottom-6 right-8 text-[9px] font-bold uppercase tracking-widest opacity-20">{dilemma.length} karakter</div>
      </div>

      {error && <p className="text-red-500 text-xs text-center font-bold animate-pulse">{error}</p>}

      <button
        onClick={handleAnalyze} disabled={isAnalyzing || !dilemma.trim()}
        className={`w-full py-6 rounded-full font-bold shadow-2xl transition-all active:scale-95 flex items-center justify-center space-x-3
          ${isAnalyzing ? 'bg-gray-100 text-gray-400' : currentTheme.button}
        `}
      >
        {isAnalyzing ? (
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <span className="text-lg tracking-wide">{t.analyzeBtn}</span>
        )}
      </button>

      {/* Remaining analyses counter */}
      {!checkPremium() && (
        <p className="text-center text-[10px] opacity-25 font-bold">
          {remaining === Infinity ? '' : `${remaining} / 3 ${language === Language.TR ? 'ücretsiz analiz kaldı' : 'free analyses left'}`}
        </p>
      )}

      <div className="grid grid-cols-2 gap-4 opacity-50">
        <div className={`p-4 squircle-sm ${currentTheme.primary} border ${currentTheme.border} text-[10px] font-bold uppercase tracking-widest text-center`}>🛡️ Gizli ve Güvenli</div>
        <div className={`p-4 squircle-sm ${currentTheme.primary} border ${currentTheme.border} text-[10px] font-bold uppercase tracking-widest text-center`}>🧠 Derin Analiz</div>
      </div>

      {/* Paywall */}
      {showPaywall && (
        <PaywallScreen language={language} theme={theme} onClose={() => setShowPaywall(false)} onPurchaseSuccess={() => { setShowPaywall(false); setRemaining(getRemainingAnalyses()); }} />
      )}
    </div>
  );
};

const PerspectiveCard = ({ title, content, icon, theme }: any) => (
  <div className={`p-8 squircle border ${theme.border} ${theme.primary} space-y-4 shadow-sm hover:shadow-md transition-all`}>
    <div className="flex items-center space-x-3 opacity-30">
      <span className="text-xl">{icon}</span>
      <h4 className="font-bold text-[9px] tracking-[0.2em] uppercase">{title}</h4>
    </div>
    <p className="text-md leading-relaxed opacity-80">{content}</p>
  </div>
);

export default AskScreen;

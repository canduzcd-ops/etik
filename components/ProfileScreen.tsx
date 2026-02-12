import React, { useState, useEffect } from 'react';
import { Language, Theme, AnalysisResult, PersonalityResult } from '../types';
import { THEMES } from '../constants';
import { getGameState, getAllBadges, getWeeklyTrend, type BadgeInfo } from '../services/gamification';
import { trackEvent, Events } from '../services/analytics';

interface ProfileScreenProps {
  language: Language;
  theme: Theme;
  savedAnalyses: AnalysisResult[];
  personalityResult: PersonalityResult | null;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ language, theme, savedAnalyses, personalityResult }) => {
  const currentTheme = THEMES[theme];
  const [gameState, setGameState] = useState(getGameState());
  const [badges, setBadges] = useState<BadgeInfo[]>(getAllBadges());
  const [weeklyTrend, setWeeklyTrend] = useState(getWeeklyTrend());

  useEffect(() => {
    trackEvent(Events.PROFILE_VIEW);
    trackEvent(Events.GAMIFICATION_VIEW);
    setGameState(getGameState());
    setBadges(getAllBadges());
    setWeeklyTrend(getWeeklyTrend());
  }, []);

  /* Ethics distribution derived from personality test or analyses */
  const ethics = (() => {
    if (personalityResult && personalityResult.topPrinciples.length > 0) {
      const kantIds = ['deontology', 'contractarianism'];
      const millIds = ['utilitarianism', 'hedonism', 'pragmatism'];
      const aristoIds = ['virtue', 'stoicism', 'care'];
      let k = 0, m = 0, a = 0;
      personalityResult.topPrinciples.forEach(p => {
        if (kantIds.includes(p.id)) k += p.percentage;
        else if (millIds.includes(p.id)) m += p.percentage;
        else if (aristoIds.includes(p.id)) a += p.percentage;
        else { k += p.percentage / 3; m += p.percentage / 3; a += p.percentage / 3; }
      });
      const t = k + m + a || 1;
      return { kant: Math.round((k / t) * 100), mill: Math.round((m / t) * 100), aristotle: Math.round((a / t) * 100) };
    }
    if (savedAnalyses.length === 0) return null;
    return { kant: 33, mill: 34, aristotle: 33 };
  })();

  const maxTrend = Math.max(...weeklyTrend.map(w => w.count), 1);
  const earnedBadges = badges.filter(b => b.earned);
  const lockedBadges = badges.filter(b => !b.earned);

  const handleShareProfile = async () => {
    trackEvent(Events.PROFILE_SHARE_CLICK);
    const text = language === Language.TR
      ? `🧠 Etik Profilim\n\n🔥 ${gameState.streak} gün seri\n⭐ ${gameState.points} puan\n📊 ${gameState.totalAnalyses} analiz\n🏅 ${earnedBadges.length}/${badges.length} rozet${ethics ? `\n\n⚖️ Kant %${ethics.kant}\n📊 Mill %${ethics.mill}\n🏺 Aristoteles %${ethics.aristotle}` : ''}\n\n#ETİK #EtikProfil`
      : `🧠 My Ethics Profile\n\n🔥 ${gameState.streak} day streak\n⭐ ${gameState.points} points\n📊 ${gameState.totalAnalyses} analyses\n🏅 ${earnedBadges.length}/${badges.length} badges${ethics ? `\n\n⚖️ Kant ${ethics.kant}%\n📊 Mill ${ethics.mill}%\n🏺 Aristotle ${ethics.aristotle}%` : ''}\n\n#ETİK #EthicsProfile`;
    try {
      if (navigator.share) await navigator.share({ title: 'ETİK', text });
      else await navigator.clipboard.writeText(text);
      trackEvent(Events.PROFILE_SHARE_SUCCESS);
    } catch { /* cancelled */ }
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Header */}
      <div className="space-y-2 pt-4">
        <h2 className="text-4xl font-bold serif tracking-tight">{language === Language.TR ? 'Profilim' : 'My Profile'}</h2>
        <p className="text-sm opacity-40 italic">{language === Language.TR ? 'Etik yolculuğunun özeti' : 'Summary of your ethical journey'}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { val: String(gameState.points), label: language === Language.TR ? 'Puan' : 'Points' },
          { val: `🔥 ${gameState.streak}`, label: language === Language.TR ? 'Seri' : 'Streak' },
          { val: String(gameState.totalAnalyses), label: language === Language.TR ? 'Analiz' : 'Analyses' },
        ].map((s, i) => (
          <div key={i} className={`p-5 rounded-[24px] ${currentTheme.primary} border ${currentTheme.border} text-center space-y-2 shadow-sm`}>
            <p className="text-2xl font-bold serif">{s.val}</p>
            <p className="text-[9px] font-bold uppercase tracking-widest opacity-30">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Ethics Distribution */}
      {ethics ? (
        <section className="space-y-5">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">{language === Language.TR ? 'ETİK PROFİLİN' : 'YOUR ETHICS PROFILE'}</h3>
          <div className={`p-8 rounded-[32px] ${currentTheme.primary} border ${currentTheme.border} space-y-6 shadow-sm`}>
            {[
              { key: 'kant', label: language === Language.TR ? 'Ödev Etiği (Kant)' : 'Deontology (Kant)', icon: '⚖️', val: ethics.kant },
              { key: 'mill', label: language === Language.TR ? 'Faydacılık (Mill)' : 'Utilitarianism (Mill)', icon: '📊', val: ethics.mill },
              { key: 'aristotle', label: language === Language.TR ? 'Erdem Etiği (Aristoteles)' : 'Virtue Ethics (Aristotle)', icon: '🏺', val: ethics.aristotle },
            ].map((f, idx) => (
              <div key={f.key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold">{f.icon} {f.label}</span>
                  <span className="text-xs font-bold opacity-40">%{f.val}</span>
                </div>
                <div className="h-2 w-full bg-black/[0.04] rounded-full overflow-hidden">
                  <div className="h-full bg-current rounded-full transition-all duration-1000" style={{ width: `${f.val}%`, opacity: 1 - idx * 0.15 }} />
                </div>
              </div>
            ))}
            <button onClick={handleShareProfile} className={`w-full py-4 rounded-full text-xs font-bold uppercase tracking-widest border ${currentTheme.border} opacity-40 hover:opacity-100 transition-all active:scale-95`}>
              📤 {language === Language.TR ? 'Profili Paylaş' : 'Share Profile'}
            </button>
          </div>
        </section>
      ) : (
        <section className={`p-8 rounded-[32px] ${currentTheme.primary} border ${currentTheme.border} text-center space-y-4 shadow-sm`}>
          <span className="text-5xl">🧭</span>
          <p className="text-sm opacity-50 italic">{language === Language.TR ? 'Etik profilini görmek için analiz yapmaya başla!' : 'Start analyzing to see your ethics profile!'}</p>
        </section>
      )}

      {/* Weekly Trend */}
      <section className="space-y-5">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">{language === Language.TR ? 'HAFTALIK AKTİVİTE' : 'WEEKLY ACTIVITY'}</h3>
        <div className={`p-6 rounded-[32px] ${currentTheme.primary} border ${currentTheme.border} shadow-sm`}>
          <div className="flex items-end justify-around h-24 gap-3">
            {weeklyTrend.map((w, i) => (
              <div key={i} className="flex flex-col items-center gap-2 flex-1">
                <div className="w-full flex justify-center">
                  <div className="w-8 bg-current rounded-lg transition-all duration-500" style={{ height: `${Math.max(8, (w.count / maxTrend) * 72)}px`, opacity: w.count > 0 ? 0.6 : 0.1 }} />
                </div>
                <span className="text-[9px] font-bold opacity-30">{w.week}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="space-y-5">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">
          {language === Language.TR ? `ROZETLER (${earnedBadges.length}/${badges.length})` : `BADGES (${earnedBadges.length}/${badges.length})`}
        </h3>
        {earnedBadges.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {earnedBadges.map(b => (
              <div key={b.id} className={`p-5 rounded-[24px] ${currentTheme.primary} border ${currentTheme.border} space-y-2 shadow-sm`}>
                <span className="text-3xl">{b.icon}</span>
                <p className="text-xs font-bold">{b.name[language]}</p>
                <p className="text-[10px] opacity-40">{b.description[language]}</p>
              </div>
            ))}
          </div>
        )}
        {lockedBadges.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {lockedBadges.map(b => (
              <div key={b.id} className={`p-5 rounded-[24px] ${currentTheme.primary} border ${currentTheme.border} space-y-2 opacity-30`}>
                <span className="text-3xl grayscale">🔒</span>
                <p className="text-xs font-bold">{b.name[language]}</p>
                <p className="text-[10px] opacity-60">{b.description[language]}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProfileScreen;

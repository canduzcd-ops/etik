
import React, { useState } from 'react';
import { Language, Theme, ProfileMode, PersonalityResult } from '../types';
import { UI_STRINGS, THEMES, PRINCIPLES } from '../constants';
import LegalScreen from './LegalScreen';

interface SettingsScreenProps {
  language: Language;
  theme: Theme;
  userName: string | null;
  profileMode: ProfileMode;
  personalityResult: PersonalityResult | null;
  onNameChange: (name: string) => void;
  onModeChange: (mode: ProfileMode) => void;
  onLanguageChange: (l: Language) => void;
  onThemeChange: (t: Theme) => void;
  onSignOut?: () => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ 
  language, theme, userName, profileMode, personalityResult, 
  onNameChange, onModeChange, onLanguageChange, onThemeChange, onSignOut 
}) => {
  const t = UI_STRINGS[language];
  const currentTheme = THEMES[theme];
  
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(userName || '');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showLegal, setShowLegal] = useState<'privacy' | 'terms' | 'kvkk' | null>(null);

  const handleSaveName = () => {
    if (newName.trim()) {
      onNameChange(newName.trim());
      setEditingName(false);
    }
  };

  const handleModeToggle = (targetMode: ProfileMode) => {
    if (profileMode === ProfileMode.PERSONALIZED && targetMode === ProfileMode.STANDARD) {
      setShowResetConfirm(true);
    } else {
      onModeChange(targetMode);
    }
  };

  return (
    <div className="space-y-12 pb-20">
      <h2 className="text-4xl font-bold serif">{t.settingsTab}</h2>

      {/* Profile Section */}
      <section className="space-y-6">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">
          {language === Language.TR ? 'KİMLİK' : 'IDENTITY'}
        </label>
        <div className={`p-8 rounded-[32px] border ${currentTheme.border} ${currentTheme.card} space-y-6 shadow-sm`}>
          {editingName ? (
            <div className="space-y-4">
              <input 
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className={`w-full p-4 rounded-xl border ${currentTheme.border} outline-none focus:ring-1 focus:ring-current bg-transparent font-bold`}
                autoFocus
              />
              <div className="flex space-x-2">
                <button onClick={handleSaveName} className={`flex-1 py-3 rounded-full text-xs font-bold uppercase tracking-widest ${currentTheme.button}`}>
                  {language === Language.TR ? 'KAYDET' : 'SAVE'}
                </button>
                <button onClick={() => setEditingName(false)} className={`px-6 py-3 rounded-full text-xs font-bold border ${currentTheme.border} opacity-50`}>
                  {t.cancel}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <p className="text-[10px] opacity-40 italic">{language === Language.TR ? 'İsminiz' : 'Your Name'}</p>
                <h4 className="text-xl font-bold serif">{userName || 'Misafir'}</h4>
              </div>
              <button onClick={() => setEditingName(true)} className={`p-3 rounded-full border ${currentTheme.border} hover:shadow-md transition-all active:scale-90`}>
                ✏️
              </button>
            </div>
          )}

          <div className="pt-6 border-t border-black/5 space-y-4">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">{t.profileModeLabel}</p>
            <div className="flex p-1.5 rounded-full border border-black/5 bg-black/[0.02]">
              <button 
                onClick={() => handleModeToggle(ProfileMode.STANDARD)}
                className={`flex-1 py-2.5 rounded-full text-[10px] font-bold transition-all
                  ${profileMode === ProfileMode.STANDARD ? 'bg-white shadow-sm' : 'opacity-40'}
                `}
              >
                {t.standardMode}
              </button>
              <button 
                onClick={() => handleModeToggle(ProfileMode.PERSONALIZED)}
                className={`flex-1 py-2.5 rounded-full text-[10px] font-bold transition-all
                  ${profileMode === ProfileMode.PERSONALIZED ? 'bg-white shadow-sm' : 'opacity-40'}
                `}
              >
                {t.personalizedMode}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Personality Result Visualization */}
      {profileMode === ProfileMode.PERSONALIZED && personalityResult && (
        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">{t.yourResults}</label>
          <div className={`p-8 rounded-[40px] border ${currentTheme.border} ${currentTheme.card} space-y-8 shadow-sm`}>
            <p className="text-xs italic opacity-50 text-center">{t.topFive}</p>
            <div className="space-y-6">
              {personalityResult.topPrinciples.map((p, idx) => {
                const principle = PRINCIPLES.find(pr => pr.id === p.id);
                return (
                  <div key={p.id} className="space-y-2">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="serif italic">{principle?.name[language]}</span>
                      <span className="opacity-40">{p.percentage}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-black/[0.03] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-current transition-all duration-1000"
                        style={{ width: `${p.percentage}%`, opacity: 1 - (idx * 0.15) }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <button 
              onClick={() => onModeChange(ProfileMode.PERSONALIZED)}
              className="w-full py-4 text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity"
            >
              {language === Language.TR ? 'Testi Tekrarla' : 'Retake Test'}
            </button>
          </div>
        </section>
      )}

      {/* Lang Section */}
      <section className="space-y-6">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">{t.languageLabel}</label>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => onLanguageChange(Language.TR)} 
            className={`p-5 rounded-2xl border transition-all active:scale-95 text-sm font-bold 
              ${language === Language.TR 
                ? 'border-current shadow-md ring-1 ring-current/20' 
                : `${currentTheme.border} opacity-40`}`}
          >
            Türkçe
          </button>
          <button 
            onClick={() => onLanguageChange(Language.EN)} 
            className={`p-5 rounded-2xl border transition-all active:scale-95 text-sm font-bold 
              ${language === Language.EN 
                ? 'border-current shadow-md ring-1 ring-current/20' 
                : `${currentTheme.border} opacity-40`}`}
          >
            English
          </button>
        </div>
      </section>

      {/* Theme Section */}
      <section className="space-y-6">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">{t.themeLabel}</label>
        <div className="grid grid-cols-2 gap-4">
          {(Object.entries(Theme) as [string, Theme][]).map(([key, val]) => (
            <button 
              key={val} 
              onClick={() => onThemeChange(val)} 
              className={`p-6 rounded-[28px] border flex flex-col items-center space-y-4 transition-all active:scale-95 
                ${theme === val 
                  ? 'border-current shadow-lg ring-1 ring-current/20' 
                  : `${currentTheme.border} opacity-40`}`}
            >
              <div className="flex space-x-1">
                <div className={`w-5 h-5 rounded-full border border-black/5 ${THEMES[val].bg}`}></div>
                <div className={`w-5 h-5 rounded-full border border-black/5 ${THEMES[val].primary}`}></div>
                <div className={`w-5 h-5 rounded-full border border-black/5 ${THEMES[val].button.split(' ')[0]}`}></div>
              </div>
              <span className="text-[11px] font-bold uppercase tracking-[0.1em]">{val.charAt(0).toUpperCase() + val.slice(1)}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
          <div className={`w-full max-w-sm ${currentTheme.bg} rounded-[40px] p-10 space-y-8 shadow-2xl border ${currentTheme.border}`}>
            <div className="text-center space-y-4">
              <span className="text-5xl">⚠️</span>
              <h3 className="text-xl font-bold serif">Emin misiniz?</h3>
              <p className="text-xs opacity-50 leading-relaxed italic">{t.resetWarning}</p>
            </div>
            <div className="space-y-3">
              <button 
                onClick={() => { onModeChange(ProfileMode.STANDARD); setShowResetConfirm(false); }}
                className={`w-full py-4 rounded-full font-bold text-xs uppercase tracking-widest bg-red-500 text-white shadow-lg active:scale-95 transition-all`}
              >
                {t.confirmReset}
              </button>
              <button 
                onClick={() => setShowResetConfirm(false)}
                className={`w-full py-4 rounded-full font-bold text-xs uppercase tracking-widest border ${currentTheme.border} opacity-50 active:scale-95 transition-all`}
              >
                {t.cancel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sign Out */}
      {onSignOut && (
        <div className="mt-8 pt-6 border-t border-current/5">
          <button
            onClick={onSignOut}
            className="w-full py-4 rounded-2xl border border-red-300/30 text-red-500 text-sm font-semibold hover:bg-red-50 active:scale-[0.98] transition-all duration-200"
          >
            🚪 {language === 'tr' ? 'Çıkış Yap' : 'Sign Out'}
          </button>
        </div>
      )}

      {/* Legal Section */}
      <section className="mt-8 pt-6 border-t border-current/5">
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] opacity-30 mb-4">
          {language === 'tr' ? '📋 Yasal' : '📋 Legal'}
        </h3>
        <div className="space-y-2">
          <button
            onClick={() => setShowLegal('privacy')}
            className={`w-full text-left py-3 px-4 rounded-2xl ${currentTheme.bg} border ${currentTheme.border} text-sm opacity-70 hover:opacity-100 transition-all duration-200 active:scale-[0.98]`}
          >
            🔒 {language === 'tr' ? 'Gizlilik Politikası' : 'Privacy Policy'}
          </button>
          <button
            onClick={() => setShowLegal('terms')}
            className={`w-full text-left py-3 px-4 rounded-2xl ${currentTheme.bg} border ${currentTheme.border} text-sm opacity-70 hover:opacity-100 transition-all duration-200 active:scale-[0.98]`}
          >
            📄 {language === 'tr' ? 'Kullanım Koşulları' : 'Terms of Use'}
          </button>
          <button
            onClick={() => setShowLegal('kvkk')}
            className={`w-full text-left py-3 px-4 rounded-2xl ${currentTheme.bg} border ${currentTheme.border} text-sm opacity-70 hover:opacity-100 transition-all duration-200 active:scale-[0.98]`}
          >
            📜 KVKK Aydınlatma Metni
          </button>
        </div>
        <p className="text-center text-[10px] opacity-20 mt-6 tracking-wider">
          © 2026 Raca Labs · v1.0.0
        </p>
      </section>

      {/* Legal Screen Overlay */}
      {showLegal && (
        <LegalScreen
          initialPage={showLegal}
          onClose={() => setShowLegal(null)}
        />
      )}
    </div>
  );
};

export default SettingsScreen;

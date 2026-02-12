
import React, { useState, useEffect, useCallback } from 'react';
import { Theme, Language, AnalysisResult, ProfileMode, PersonalityResult } from './types';
import { THEMES, UI_STRINGS } from './constants';
import AskScreen from './components/AskScreen';
import LibraryScreen from './components/LibraryScreen';
import SavedScreen from './components/SavedScreen';
import SettingsScreen from './components/SettingsScreen';
import PersonalityTest from './components/PersonalityTest';
import ProfileScreen from './components/ProfileScreen';
import SplashScreen from './components/SplashScreen';
import AuthScreen from './components/AuthScreen';
import { auth, onAuthStateChanged, signOut, type User } from './services/firebaseConfig';
import { getAllBadges } from './services/gamification';

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const [activeTab, setActiveTab] = useState<'ask' | 'library' | 'profile' | 'saved' | 'settings'>('ask');
  const [theme, setTheme] = useState<Theme>(Theme.PURE);
  const [language, setLanguage] = useState<Language>(Language.TR);
  const [userName, setUserName] = useState<string | null>(null);
  const [profileMode, setProfileMode] = useState<ProfileMode>(ProfileMode.STANDARD);
  const [personalityResult, setPersonalityResult] = useState<PersonalityResult | null>(null);
  const [savedAnalyses, setSavedAnalyses] = useState<AnalysisResult[]>([]);
  const [prefilledDilemma, setPrefilledDilemma] = useState<string | null>(null);
  const [badgeToast, setBadgeToast] = useState<{ icon: string; name: string } | null>(null);
  
  const [showNameModal, setShowNameModal] = useState(false);
  const [showModeModal, setShowModeModal] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [tempName, setTempName] = useState('');

  // Listen to Firebase auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      setAuthReady(true);
      if (user) {
        // User is signed in
        setShowAuth(false);
        // Set userName from Firebase profile if available
        if (user.displayName) {
          setUserName(user.displayName);
        }
      }
    });
    return () => unsub();
  }, []);

  // After splash completes, determine next screen
  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
    if (!firebaseUser) {
      setShowAuth(true);
    }
  }, [firebaseUser]);

  // After auth succeeds
  const handleAuthSuccess = (displayName: string | null) => {
    if (displayName) {
      setUserName(displayName);
    }
    setShowAuth(false);
    // Check if we need more onboarding (name/mode)
    const stored = localStorage.getItem('etik_state');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.theme) setTheme(parsed.theme);
        if (parsed.language) setLanguage(parsed.language);
        if (parsed.profileMode) setProfileMode(parsed.profileMode);
        if (parsed.personalityResult) setPersonalityResult(parsed.personalityResult);
        if (parsed.savedAnalyses) setSavedAnalyses(parsed.savedAnalyses);
        // If no userName from either Firebase or local, ask
        if (!displayName && !parsed.userName) {
          setShowNameModal(true);
        } else if (parsed.userName) {
          setUserName(parsed.userName);
        }
      } catch {
        if (!displayName) setShowNameModal(true);
      }
    } else {
      if (!displayName) setShowNameModal(true);
      else setShowModeModal(true);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setFirebaseUser(null);
    setUserName(null);
    setShowAuth(true);
  };

  useEffect(() => {
    // Load local state on mount (non-auth data)
    const stored = localStorage.getItem('etik_state');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.theme) setTheme(parsed.theme);
        if (parsed.language) setLanguage(parsed.language);
        if (parsed.profileMode) setProfileMode(parsed.profileMode);
        if (parsed.personalityResult) setPersonalityResult(parsed.personalityResult);
        if (parsed.savedAnalyses) setSavedAnalyses(parsed.savedAnalyses);
      } catch { /* ignore */ }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('etik_state', JSON.stringify({
      theme, language, userName, profileMode, personalityResult, savedAnalyses
    }));
  }, [theme, language, userName, profileMode, personalityResult, savedAnalyses]);

  const currentTheme = THEMES[theme];
  const t = UI_STRINGS[language];

  const handleBadgeEarned = (badges: string[]) => {
    const allBadges = getAllBadges();
    const badge = allBadges.find(b => b.id === badges[0]);
    if (badge) {
      setBadgeToast({ icon: badge.icon, name: badge.name[language] });
      setTimeout(() => setBadgeToast(null), 3500);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'ask':
        return <AskScreen 
          language={language} theme={theme} userName={userName}
          onSave={(a) => setSavedAnalyses(prev => [a, ...prev])} 
          prefilledDilemma={prefilledDilemma}
          onClearPrefill={() => setPrefilledDilemma(null)}
          onBadgeEarned={handleBadgeEarned}
        />;
      case 'library':
        return <LibraryScreen 
          language={language} theme={theme} 
          onAnalyzeRequest={(text: string) => { setPrefilledDilemma(text); setActiveTab('ask'); }}
        />;
      case 'profile':
        return <ProfileScreen 
          language={language} theme={theme}
          savedAnalyses={savedAnalyses}
          personalityResult={personalityResult}
        />;
      case 'saved':
        return <SavedScreen 
          language={language} theme={theme} 
          savedAnalyses={savedAnalyses} 
          onDelete={(id) => setSavedAnalyses(prev => prev.filter(a => a.id !== id))}
        />;
      case 'settings':
        return <SettingsScreen 
          language={language} theme={theme} userName={userName}
          profileMode={profileMode} personalityResult={personalityResult}
          onNameChange={setUserName}
          onModeChange={(mode) => {
            setProfileMode(mode);
            if (mode === ProfileMode.PERSONALIZED) setShowTest(true);
            else setPersonalityResult(null);
          }}
          onLanguageChange={setLanguage} onThemeChange={setTheme}
          onSignOut={handleSignOut}
        />;
      default: return null;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${currentTheme.bg} ${currentTheme.text} transition-all duration-500 overflow-x-hidden`}>
      {/* Splash Screen */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      {/* Auth Screen */}
      {!showSplash && showAuth && <AuthScreen onAuthSuccess={handleAuthSuccess} />}

      {/* Name Modal */}
      {showNameModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-md animate-in fade-in duration-500">
          <div className={`w-full max-w-sm ${currentTheme.bg} squircle p-10 space-y-8 shadow-2xl border ${currentTheme.border}`}>
            <div className="text-center space-y-4">
              <span className="text-6xl drop-shadow-sm">🕊️</span>
              <h2 className="text-3xl font-bold serif">Hoş Geldiniz</h2>
              <p className="text-sm opacity-50 italic">Sana nasıl hitap etmemizi istersin?</p>
            </div>
            <div className="space-y-4">
              <input 
                type="text" value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="İsminiz"
                className={`w-full p-5 rounded-2xl border ${currentTheme.border} ${currentTheme.primary} outline-none text-center font-bold`}
                onKeyDown={(e) => e.key === 'Enter' && tempName.trim() && (setUserName(tempName.trim()), setShowNameModal(false), setShowModeModal(true))}
              />
              <button 
                onClick={() => { setUserName(tempName.trim()); setShowNameModal(false); setShowModeModal(true); }}
                disabled={!tempName.trim()}
                className={`w-full py-5 rounded-full font-bold shadow-xl active:scale-95 disabled:opacity-30 ${currentTheme.button}`}
              >
                Devam Et
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mode Select Modal */}
      {showModeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-md animate-in fade-in duration-500">
          <div className={`w-full max-w-sm ${currentTheme.bg} squircle p-10 space-y-8 shadow-2xl border ${currentTheme.border}`}>
            <h2 className="text-2xl font-bold serif text-center">{t.modeSelectionTitle}</h2>
            <div className="space-y-4">
              {[ {id: ProfileMode.STANDARD, label: t.standardMode, desc: t.standardDesc, icon: '⚖️'},
                 {id: ProfileMode.PERSONALIZED, label: t.personalizedMode, desc: t.personalizedDesc, icon: '✨'}
              ].map(mode => (
                <button key={mode.id} onClick={() => { setProfileMode(mode.id); setShowModeModal(false); if(mode.id === ProfileMode.PERSONALIZED) setShowTest(true); }}
                  className={`w-full p-6 rounded-[30px] border ${currentTheme.border} ${currentTheme.primary} text-left space-y-2 hover:shadow-lg transition-all active:scale-95`}
                >
                  <div className="flex justify-between items-center"><span className="font-bold">{mode.label}</span><span>{mode.icon}</span></div>
                  <p className="text-[11px] opacity-40">{mode.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {showTest && (
        <PersonalityTest 
          language={language} theme={theme} 
          onComplete={(res) => { setPersonalityResult(res); setShowTest(false); }}
          onCancel={() => { setShowTest(false); setProfileMode(ProfileMode.STANDARD); }}
        />
      )}

      <header className={`py-8 px-6 safe-top transition-all duration-500 sticky top-0 z-30 ${currentTheme.bg}/80 backdrop-blur-md`}>
        <div className="max-w-md mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold italic serif tracking-tight">ETİK</h1>
          {profileMode === ProfileMode.PERSONALIZED && (
            <div className={`px-4 py-1.5 rounded-full text-[9px] font-bold tracking-widest uppercase ${currentTheme.button} shadow-lg shadow-blue-500/20`}>
              {t.personalizedMode}
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 max-w-md mx-auto w-full pt-8 pb-40 px-6">
        <div className="page-transition">
          {renderContent()}
        </div>
      </main>

      {/* Badge Toast */}
      {badgeToast && (
        <div className="fixed top-24 left-0 right-0 z-[200] flex justify-center animate-in slide-in-from-top-4 fade-in duration-500">
          <div className={`px-8 py-5 rounded-[30px] ${currentTheme.bg} border ${currentTheme.border} shadow-2xl flex items-center gap-4`}>
            <span className="text-4xl">{badgeToast.icon}</span>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-widest opacity-40">{language === Language.TR ? 'Rozet Kazanıldı!' : 'Badge Earned!'}</p>
              <p className="font-bold serif text-lg">{badgeToast.name}</p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Dock Navigation */}
      <nav className="fixed bottom-12 left-0 right-0 px-6 z-40">
        <div className={`max-w-sm mx-auto flex justify-around items-center glass-dock border ${currentTheme.border} rounded-[35px] py-4 px-2 shadow-2xl`}>
          <NavButton active={activeTab === 'ask'} onClick={() => setActiveTab('ask')} icon="🧠" label={t.askTab} />
          <NavButton active={activeTab === 'library'} onClick={() => setActiveTab('library')} icon="📚" label={t.libraryTab} />
          <NavButton active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon="👤" label={t.profileTab} />
          <NavButton active={activeTab === 'saved'} onClick={() => setActiveTab('saved')} icon="🔖" label={t.savedTab} />
          <NavButton active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} icon="⚙️" label={t.settingsTab} />
        </div>
      </nav>
    </div>
  );
};

const NavButton = ({ active, onClick, icon, label }: any) => (
  <button onClick={onClick} className={`flex flex-col items-center transition-all duration-500 px-4 ${active ? 'opacity-100 scale-110' : 'opacity-30 hover:opacity-50'}`}>
    <span className="text-2xl mb-1">{icon}</span>
    {active && <span className="text-[8px] font-bold uppercase tracking-widest">{label}</span>}
  </button>
);

export default App;

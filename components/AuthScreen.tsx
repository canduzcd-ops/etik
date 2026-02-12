import React, { useState } from 'react';
import {
  auth,
  googleProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signInAnonymously,
  updateProfile,
  getRedirectResult,
} from '../services/firebaseConfig';
import LegalScreen from './LegalScreen';

interface AuthScreenProps {
  onAuthSuccess: (displayName: string | null) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showLegal, setShowLegal] = useState<'privacy' | 'terms' | 'kvkk' | null>(null);

  // Check for redirect result (mobile Google Sign-In)
  React.useEffect(() => {
    getRedirectResult(auth).then((result) => {
      if (result?.user) {
        onAuthSuccess(result.user.displayName);
      }
    }).catch(() => { /* ignore */ });
  }, [onAuthSuccess]);

  // Load remembered credentials
  React.useEffect(() => {
    const saved = localStorage.getItem('etik_remembered');
    if (saved) {
      try {
        const { email: savedEmail, remember } = JSON.parse(saved);
        if (remember) {
          setEmail(savedEmail);
          setRememberMe(true);
        }
      } catch { /* ignore */ }
    }
  }, []);

  const handleRememberMe = (emailToSave: string) => {
    if (rememberMe) {
      localStorage.setItem('etik_remembered', JSON.stringify({
        email: emailToSave,
        remember: true
      }));
    } else {
      localStorage.removeItem('etik_remembered');
    }
  };

  const getErrorMessage = (code: string): string => {
    const messages: Record<string, string> = {
      'auth/user-not-found': 'Bu e-posta ile kayıtlı kullanıcı bulunamadı.',
      'auth/wrong-password': 'Şifre hatalı.',
      'auth/invalid-credential': 'E-posta veya şifre hatalı.',
      'auth/email-already-in-use': 'Bu e-posta zaten kullanımda.',
      'auth/weak-password': 'Şifre en az 6 karakter olmalıdır.',
      'auth/invalid-email': 'Geçersiz e-posta adresi.',
      'auth/too-many-requests': 'Çok fazla deneme. Lütfen biraz bekleyin.',
      'auth/network-request-failed': 'Bağlantı hatası. İnternet bağlantınızı kontrol edin.',
      'auth/popup-closed-by-user': 'Giriş penceresi kapatıldı.',
    };
    return messages[code] || 'Bir hata oluştu. Lütfen tekrar deneyin.';
  };

  const handleEmailAuth = async () => {
    if (!email.trim() || !password.trim()) {
      setError('E-posta ve şifre gerekli.');
      return;
    }
    if (mode === 'register' && !name.trim()) {
      setError('İsim gerekli.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      if (mode === 'register') {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name.trim() });
        handleRememberMe(email);
        onAuthSuccess(name.trim());
      } else {
        const cred = await signInWithEmailAndPassword(auth, email, password);
        handleRememberMe(email);
        onAuthSuccess(cred.user.displayName);
      }
    } catch (err: any) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      // Try popup first (works on web), fall back to redirect (mobile)
      try {
        const result = await signInWithPopup(auth, googleProvider);
        onAuthSuccess(result.user.displayName);
      } catch (popupErr: any) {
        if (popupErr.code === 'auth/popup-blocked' || 
            popupErr.code === 'auth/operation-not-supported-in-this-environment') {
          // Mobile/WebView: use redirect
          await signInWithRedirect(auth, googleProvider);
        } else {
          throw popupErr;
        }
      }
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user') {
        setError(getErrorMessage(err.code));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymous = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInAnonymously(auth);
      onAuthSuccess(null);
    } catch (err: any) {
      setError(getErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  if (showLegal) {
    return (
      <LegalScreen
        initialPage={showLegal}
        onClose={() => setShowLegal(null)}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-gradient-to-br from-[#0F0F0F] to-[#1A1A2E] overflow-y-auto">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(100,100,255,0.06),transparent_60%)]" />
      
      <div className="relative w-full max-w-sm mx-auto px-6 py-16 my-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-[0.25em] text-white/90 mb-2" style={{ fontFamily: "'Georgia', serif" }}>
            ETİK
          </h1>
          <p className="text-white/25 text-xs tracking-widest uppercase">
            Etik Karar Danışmanın
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white/[0.06] backdrop-blur-xl rounded-3xl border border-white/10 p-8 space-y-6">
          
          {/* Toggle Login/Register */}
          <div className="flex bg-white/[0.05] rounded-2xl p-1">
            <button
              onClick={() => { setMode('login'); setError(null); }}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                mode === 'login' 
                  ? 'bg-white/15 text-white shadow-lg' 
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              Giriş Yap
            </button>
            <button
              onClick={() => { setMode('register'); setError(null); }}
              className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                mode === 'register' 
                  ? 'bg-white/15 text-white shadow-lg' 
                  : 'text-white/40 hover:text-white/60'
              }`}
            >
              Kayıt Ol
            </button>
          </div>

          {/* Name field (register only) */}
          {mode === 'register' && (
            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="text-white/40 text-xs font-medium tracking-wider uppercase pl-1">
                İsim
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Adınız"
                className="w-full px-5 py-4 rounded-2xl bg-white/[0.07] border border-white/10 text-white placeholder:text-white/20 outline-none focus:border-white/30 focus:bg-white/[0.10] transition-all duration-300"
              />
            </div>
          )}

          {/* Email */}
          <div className="space-y-2">
            <label className="text-white/40 text-xs font-medium tracking-wider uppercase pl-1">
              E-posta
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@email.com"
              className="w-full px-5 py-4 rounded-2xl bg-white/[0.07] border border-white/10 text-white placeholder:text-white/20 outline-none focus:border-white/30 focus:bg-white/[0.10] transition-all duration-300"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-white/40 text-xs font-medium tracking-wider uppercase pl-1">
              Şifre
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-5 py-4 rounded-2xl bg-white/[0.07] border border-white/10 text-white placeholder:text-white/20 outline-none focus:border-white/30 focus:bg-white/[0.10] transition-all duration-300 pr-14"
                onKeyDown={(e) => e.key === 'Enter' && handleEmailAuth()}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setRememberMe(!rememberMe)}
              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                rememberMe 
                  ? 'bg-white/20 border-white/40' 
                  : 'border-white/15 hover:border-white/30'
              }`}
            >
              {rememberMe && (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <span className="text-white/40 text-sm">Beni hatırla</span>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-3 animate-in fade-in duration-300">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleEmailAuth}
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-white/20 to-white/10 hover:from-white/25 hover:to-white/15 text-white font-semibold text-sm tracking-wider border border-white/10 hover:border-white/20 shadow-lg active:scale-[0.98] transition-all duration-300 disabled:opacity-40"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Lütfen bekleyin...
              </span>
            ) : (
              mode === 'login' ? 'Giriş Yap' : 'Kayıt Ol'
            )}
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-[1px] bg-white/10" />
          <span className="text-white/20 text-xs tracking-widest">veya</span>
          <div className="flex-1 h-[1px] bg-white/10" />
        </div>

        {/* Social Login */}
        <div className="space-y-3">
          {/* Google */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-white/[0.06] hover:bg-white/[0.10] border border-white/10 hover:border-white/15 flex items-center justify-center gap-3 text-white/80 text-sm font-medium transition-all duration-300 active:scale-[0.98] disabled:opacity-40"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google ile Giriş Yap
          </button>

          {/* Anonymous */}
          <button
            onClick={handleAnonymous}
            disabled={loading}
            className="w-full py-3 rounded-2xl text-white/25 hover:text-white/40 text-xs tracking-wider transition-all duration-300 disabled:opacity-40"
          >
            🕶️ Anonim olarak devam et
          </button>
        </div>

        {/* Footer - Legal Links */}
        <div className="text-center mt-8 space-y-3">
          <p className="text-white/15 text-[10px] tracking-wider">
            Giriş yaparak{' '}
            <button onClick={() => setShowLegal('privacy')} className="underline text-white/30 hover:text-white/50 transition-colors">
              Gizlilik Politikası
            </button>
            {' '}ve{' '}
            <button onClick={() => setShowLegal('terms')} className="underline text-white/30 hover:text-white/50 transition-colors">
              Kullanım Koşulları
            </button>
            'nı kabul etmiş olursunuz.
          </p>
          <button 
            onClick={() => setShowLegal('kvkk')} 
            className="text-white/15 hover:text-white/30 text-[10px] tracking-wider underline transition-colors"
          >
            KVKK Aydınlatma Metni
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;

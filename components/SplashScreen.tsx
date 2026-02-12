import React, { useState, useEffect } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'logo' | 'text' | 'fadeOut'>('logo');

  useEffect(() => {
    // Phase 1: Logo appears (0-800ms)
    const t1 = setTimeout(() => setPhase('text'), 800);
    // Phase 2: Text visible (800-2800ms) 
    const t2 = setTimeout(() => setPhase('fadeOut'), 2800);
    // Phase 3: Fade out complete (3300ms)
    const t3 = setTimeout(() => onComplete(), 3300);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-gradient-to-br from-[#0F0F0F] to-[#1A1A2E] transition-opacity duration-500 ${phase === 'fadeOut' ? 'opacity-0' : 'opacity-100'}`}>

      {/* Subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(100,100,255,0.08),transparent_70%)]" />

      {/* Logo */}
      <div className={`relative transition-all duration-1000 ease-out ${phase === 'logo' ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}`}>
        {/* Scale icon */}
        <div className="w-24 h-24 mx-auto mb-8 relative">
          <svg viewBox="0 0 120 120" className="w-full h-full">
            {/* Pillar */}
            <rect x="56" y="30" width="8" height="64" rx="4" fill="url(#pillarGrad)" />
            {/* Base */}
            <rect x="36" y="88" width="48" height="6" rx="3" fill="url(#baseGrad)" />
            {/* Beam */}
            <rect x="20" y="28" width="80" height="5" rx="2.5" fill="url(#beamGrad)" />
            {/* Left pan */}
            <line x1="30" y1="33" x2="30" y2="52" stroke="#E2E8F0" strokeWidth="1.5" />
            <path d="M18 52 Q30 58 42 52" fill="none" stroke="url(#panGrad)" strokeWidth="2" strokeLinecap="round" />
            {/* Right pan */}
            <line x1="90" y1="33" x2="90" y2="48" stroke="#E2E8F0" strokeWidth="1.5" />
            <path d="M78 48 Q90 54 102 48" fill="none" stroke="url(#panGrad)" strokeWidth="2" strokeLinecap="round" />
            {/* Center gem */}
            <circle cx="60" cy="26" r="6" fill="url(#gemGrad)" />
            <circle cx="60" cy="26" r="3" fill="#F7FAFC" opacity="0.4" />
            {/* Gradients */}
            <defs>
              <linearGradient id="pillarGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A0AEC0"/>
                <stop offset="100%" stopColor="#718096"/>
              </linearGradient>
              <linearGradient id="baseGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#718096"/>
                <stop offset="100%" stopColor="#A0AEC0"/>
              </linearGradient>
              <linearGradient id="beamGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#CBD5E0"/>
                <stop offset="50%" stopColor="#F7FAFC"/>
                <stop offset="100%" stopColor="#CBD5E0"/>
              </linearGradient>
              <linearGradient id="panGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#A0AEC0"/>
                <stop offset="100%" stopColor="#CBD5E0"/>
              </linearGradient>
              <linearGradient id="gemGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#E2E8F0"/>
                <stop offset="100%" stopColor="#A0AEC0"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* ETİK text */}
        <h1 className="text-5xl font-bold tracking-[0.3em] text-white/90 text-center" style={{ fontFamily: "'Georgia', serif" }}>
          ETİK
        </h1>

        {/* Tagline */}
        <p className={`text-center text-white/30 text-xs tracking-[0.2em] uppercase mt-4 transition-all duration-1000 delay-300 ${phase !== 'logo' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          Etik Karar Danışmanın
        </p>
      </div>

      {/* Bottom subtle line */}
      <div className={`absolute bottom-16 w-12 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-1000 ${phase !== 'logo' ? 'opacity-100 w-24' : 'opacity-0 w-12'}`} />
    </div>
  );
};

export default SplashScreen;


import React, { useState } from 'react';
import { Language, Theme, PersonalityResult } from '../types';
import { UI_STRINGS, THEMES, TEST_QUESTIONS, PRINCIPLES } from '../constants';

interface PersonalityTestProps {
  language: Language;
  theme: Theme;
  onComplete: (result: PersonalityResult) => void;
  onCancel: () => void;
}

const PersonalityTest: React.FC<PersonalityTestProps> = ({ language, theme, onComplete, onCancel }) => {
  const [isStarted, setIsStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isFinishing, setIsFinishing] = useState(false);
  const [summaryResult, setSummaryResult] = useState<PersonalityResult | null>(null);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  const t = UI_STRINGS[language];
  const currentTheme = THEMES[theme];
  const question = TEST_QUESTIONS[currentIdx];

  const handleStart = () => {
    setIsStarted(true);
  };

  const handleAnswer = (val: number) => {
    const nextAnswers = { ...answers };
    const pId = question.principle;
    nextAnswers[pId] = (nextAnswers[pId] || 0) + val;
    setAnswers(nextAnswers);

    if (currentIdx < TEST_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      calculateResult(nextAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<string, number>) => {
    setIsFinishing(true);
    setTimeout(() => {
      const sorted = Object.entries(finalAnswers)
        .sort(([, a], [, b]) => b - a);

      const topFiveRaw = sorted.slice(0, 5);
      const totalRaw = topFiveRaw.reduce((sum, [, val]) => sum + val, 0);

      const topPrinciples = topFiveRaw.map(([id, val]) => ({
        id,
        percentage: Math.round((val / totalRaw) * 100)
      }));

      const sum = topPrinciples.reduce((s, p) => s + p.percentage, 0);
      if (sum !== 100 && topPrinciples.length > 0) {
        topPrinciples[0].percentage += (100 - sum);
      }

      const result: PersonalityResult = { scores: finalAnswers, topPrinciples };
      setSummaryResult(result);
      setIsFinishing(false);
    }, 2000);
  };

  const handleFinish = () => {
    if (summaryResult) {
      onComplete(summaryResult);
    }
  };

  const triggerExitRequest = () => {
    setShowExitConfirm(true);
  };

  // 1. Exit Confirmation Modal
  const renderExitConfirm = () => {
    if (!showExitConfirm) return null;
    return (
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
        <div className={`w-full max-w-sm ${currentTheme.bg} rounded-[40px] p-10 space-y-8 shadow-2xl border ${currentTheme.border} animate-in zoom-in-95 duration-500`}>
          <div className="text-center space-y-4">
            <span className="text-5xl">🛑</span>
            <h3 className="text-xl font-bold serif">{t.exitTestConfirm}</h3>
            <p className="text-xs opacity-50 leading-relaxed italic">{t.exitTestWarning}</p>
          </div>
          <div className="space-y-3">
            <button 
              onClick={onCancel}
              className={`w-full py-4 rounded-full font-bold text-xs uppercase tracking-widest bg-red-500 text-white shadow-lg active:scale-95 transition-all`}
            >
              {t.exitTestButton}
            </button>
            <button 
              onClick={() => setShowExitConfirm(false)}
              className={`w-full py-4 rounded-full font-bold text-xs uppercase tracking-widest border ${currentTheme.border} opacity-50 active:scale-95 transition-all`}
            >
              {t.stayTestButton}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 2. Initial Start Screen
  if (!isStarted) {
    return (
      <div className={`fixed inset-0 z-[110] flex flex-col ${currentTheme.bg} ${currentTheme.text} items-center justify-center p-8 animate-in fade-in duration-500`}>
        {renderExitConfirm()}
        <button 
          onClick={triggerExitRequest}
          className="absolute top-8 right-8 p-4 opacity-30 hover:opacity-100 transition-opacity z-10"
        >
          <span className="text-xl">✕</span>
        </button>

        <div className="max-w-sm w-full text-center space-y-10">
          <div className="space-y-4">
            <span className="text-7xl">🧩</span>
            <h2 className="text-4xl font-bold serif">{t.testStartTitle}</h2>
            <p className="text-sm opacity-50 italic leading-relaxed">
              {language === Language.TR 
                ? 'Sana özel etik rehberlik sunabilmemiz için temel değerlerini keşfetmeliyiz.' 
                : 'To provide personalized ethical guidance, we need to discover your core values.'}
            </p>
          </div>
          
          <div className={`p-6 rounded-3xl ${currentTheme.primary} border ${currentTheme.border} inline-block`}>
            <p className="text-xs font-bold uppercase tracking-widest opacity-60">
              ⏱️ {t.testTimeEstimate}
            </p>
          </div>

          <div className="space-y-4">
            <button 
              onClick={handleStart}
              className={`w-full py-5 rounded-full font-bold shadow-xl transition-all active:scale-95 ${currentTheme.button}`}
            >
              {t.startTest}
            </button>
            <button 
              onClick={triggerExitRequest}
              className="text-xs font-bold uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity"
            >
              {t.cancel}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Loading Screen
  if (isFinishing) {
    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-2xl">
        <div className="text-center space-y-8 animate-in zoom-in-95 duration-700">
          <div className="w-20 h-20 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto"></div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold serif text-white">{t.testCompleted}</h2>
            <p className="text-white/50 italic animate-pulse">{t.calculating}</p>
          </div>
        </div>
      </div>
    );
  }

  // 4. Results Screen
  if (summaryResult) {
    return (
      <div 
        className="fixed inset-0 z-[110] flex flex-col bg-black/80 backdrop-blur-xl animate-in fade-in duration-500 overflow-y-auto"
        onClick={(e) => e.target === e.currentTarget && handleFinish()}
      >
        <div className="flex-1 flex items-center justify-center p-6">
          <div className={`w-full max-w-sm ${currentTheme.bg} rounded-[40px] p-10 space-y-8 shadow-2xl border ${currentTheme.border} animate-in zoom-in-95 slide-in-from-bottom-10 duration-700`}>
            <div className="flex justify-between items-start">
              <div className="space-y-1 text-left">
                <span className="text-3xl">✨</span>
                <h2 className="text-3xl font-bold serif">{t.yourResults}</h2>
              </div>
              <button onClick={handleFinish} className="opacity-30 hover:opacity-100 transition-opacity p-2">✕</button>
            </div>

            <div className="space-y-6">
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 text-left border-b border-black/5 pb-2">
                {t.topFive}
              </p>
              <div className="space-y-6">
                {summaryResult.topPrinciples.map((p, idx) => {
                  const principle = PRINCIPLES.find(pr => pr.id === p.id);
                  return (
                    <div key={p.id} className="space-y-2 animate-in fade-in slide-in-from-left-4 duration-500" style={{ animationDelay: `${idx * 150}ms` }}>
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
            </div>

            <button 
              onClick={handleFinish}
              className={`w-full py-5 rounded-full font-bold shadow-xl transition-all active:scale-95 ${currentTheme.button}`}
            >
              {t.continueBtn}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 5. Question Screen
  return (
    <div className="fixed inset-0 z-[110] flex flex-col bg-white">
      {renderExitConfirm()}
      <div className={`flex-1 flex flex-col items-center justify-center p-8 ${currentTheme.bg} ${currentTheme.text}`}>
        <div className="max-w-sm w-full space-y-12">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-30">
                {t.testProgress} {currentIdx + 1} / {TEST_QUESTIONS.length}
              </p>
              <div className="w-48 h-1 bg-black/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-current transition-all duration-500"
                  style={{ width: `${((currentIdx + 1) / TEST_QUESTIONS.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <button onClick={triggerExitRequest} className="opacity-30 hover:opacity-100 transition-opacity p-2">✕</button>
          </div>

          {/* Question */}
          <div className="min-h-[200px] flex items-center justify-center text-center">
            <h3 className="text-2xl font-bold serif leading-relaxed animate-in slide-in-from-bottom-4 duration-500" key={currentIdx}>
              "{question[language]}"
            </h3>
          </div>

          {/* Scale */}
          <div className="space-y-8">
            <div className="grid grid-cols-5 gap-4">
              {[1, 2, 3, 4, 5].map(val => (
                <button 
                  key={val}
                  onClick={() => handleAnswer(val)}
                  className={`aspect-square rounded-full border-2 border-current transition-all active:scale-90 flex items-center justify-center font-bold text-xl
                    ${val === 1 ? 'opacity-30' : ''}
                    ${val === 2 ? 'opacity-50' : ''}
                    ${val === 3 ? 'opacity-70' : ''}
                    ${val === 4 ? 'opacity-85' : ''}
                    ${val === 5 ? 'opacity-100' : ''}
                    hover:bg-current hover:text-white
                  `}
                >
                  {val}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-[8px] font-bold uppercase tracking-widest opacity-40 px-2">
              <span>{language === Language.TR ? 'Asla Katılmam' : 'Strongly Disagree'}</span>
              <span>{language === Language.TR ? 'Tamamen Katılırım' : 'Strongly Agree'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalityTest;

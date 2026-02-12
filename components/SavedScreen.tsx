
import React from 'react';
import { Language, Theme, AnalysisResult } from '../types';
import { UI_STRINGS, THEMES } from '../constants';

interface SavedScreenProps {
  language: Language;
  theme: Theme;
  savedAnalyses: AnalysisResult[];
  onDelete: (id: string) => void;
}

const SavedScreen: React.FC<SavedScreenProps> = ({ language, theme, savedAnalyses, onDelete }) => {
  const t = UI_STRINGS[language];
  const currentTheme = THEMES[theme];

  const handleShare = async (analysis: AnalysisResult) => {
    const shareContent = t.shareText
      .replace('{dilemma}', analysis.dilemma)
      .replace('{summary}', analysis.summary);

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ETİK Analizi',
          text: shareContent,
        });
      } catch (err) {
        console.error('Sharing failed', err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareContent);
        alert(language === Language.TR ? 'Analiz panoya kopyalandı!' : 'Analysis copied to clipboard!');
      } catch (err) {
        console.error('Clipboard copy failed', err);
      }
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold serif">{t.savedTab}</h2>
      
      {savedAnalyses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 opacity-30 text-center">
          <span className="text-6xl mb-4">📭</span>
          <p className="font-medium italic">{t.noSaved}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {savedAnalyses.map(analysis => (
            <div 
              key={analysis.id} 
              className={`p-6 rounded-3xl border ${currentTheme.border} ${currentTheme.bg} space-y-4 shadow-sm animate-in slide-in-from-left-4`}
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1 flex-1 pr-4">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                    {new Date(analysis.timestamp).toLocaleDateString(language === Language.TR ? 'tr-TR' : 'en-US')}
                  </p>
                  <h4 className="font-bold text-lg leading-snug line-clamp-2">"{analysis.dilemma}"</h4>
                </div>
                <div className="flex space-x-1">
                  <button 
                    onClick={() => handleShare(analysis)}
                    className="p-2 opacity-30 hover:opacity-100 transition-all"
                    title={t.shareBtn}
                  >
                    📤
                  </button>
                  <button 
                    onClick={() => onDelete(analysis.id)}
                    className="p-2 opacity-30 hover:opacity-100 hover:text-red-500 transition-all"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              <div className="bg-white/50 p-4 rounded-2xl text-xs leading-relaxed italic border border-black/5">
                {analysis.summary}
              </div>

              <div className="flex items-center space-x-4 opacity-50">
                <span className="text-xs font-bold uppercase tracking-tighter">🧠 KNT</span>
                <span className="text-xs font-bold uppercase tracking-tighter">📊 MLL</span>
                <span className="text-xs font-bold uppercase tracking-tighter">🏺 ART</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedScreen;

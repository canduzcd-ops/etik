
import React, { useState, useEffect } from 'react';
import { Language, Theme } from '../types';
import { CATEGORIES, PRINCIPLES, UI_STRINGS, THEMES, LIBRARY_DILEMMAS } from '../constants';
import { trackEvent, Events } from '../services/analytics';

const LibraryScreen: React.FC<any> = ({ language, theme, onAnalyzeRequest }) => {
  const [selectedTab, setSelectedTab] = useState<'categories' | 'principles'>('categories');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [activeScenario, setActiveScenario] = useState<any>(null);
  const [activePrinciple, setActivePrinciple] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  
  const t = UI_STRINGS[language];
  const currentTheme = THEMES[theme];

  useEffect(() => { trackEvent(Events.LIBRARY_VIEW); }, []);

  const allItems = Object.values(LIBRARY_DILEMMAS).flat();
  const isFiltering = searchQuery.trim().length > 0 || activeTag !== null;

  const filteredItems = allItems.filter(item => {
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || item.title[language].toLowerCase().includes(q) || item.description[language].toLowerCase().includes(q);
    const matchTag = !activeTag || item.categoryId === activeTag;
    return matchSearch && matchTag;
  });

  const selectedCategory = CATEGORIES.find(c => c.id === selectedCategoryId);
  const scenarios = selectedCategoryId ? (LIBRARY_DILEMMAS[selectedCategoryId] || []) : [];

  if (selectedCategoryId && selectedCategory) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-500">
        <button onClick={() => setSelectedCategoryId(null)} className={`p-4 squircle-sm ${currentTheme.primary} border ${currentTheme.border} shadow-sm mb-4`}>←</button>
        <div className="space-y-2">
          <h2 className="text-4xl font-bold serif">{selectedCategory.title[language]}</h2>
          <p className="text-sm opacity-40 italic">{selectedCategory.description[language]}</p>
        </div>

        <div className="grid gap-4">
          {scenarios.map(s => (
            <button key={s.id} onClick={() => { trackEvent(Events.CASE_OPEN, { id: s.id }); setActiveScenario(s); }}
              className={`w-full text-left p-8 squircle border ${currentTheme.border} ${currentTheme.primary} shadow-sm hover:shadow-xl transition-all active:scale-[0.98] group`}
            >
              <h4 className="font-bold text-xl mb-2">{s.title[language]}</h4>
              <p className="text-sm opacity-50 line-clamp-2 italic">"{s.description[language]}"</p>
              <div className="mt-4 text-[9px] font-bold uppercase tracking-widest text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">{language === Language.TR ? 'Detayı Gör →' : 'View Detail →'}</div>
            </button>
          ))}
        </div>

        {/* Case Detail Modal */}
        {activeScenario && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in" onClick={() => setActiveScenario(null)}>
            <div className={`w-full max-w-md ${currentTheme.bg} rounded-t-[45px] sm:squircle p-10 space-y-6 shadow-2xl overflow-y-auto max-h-[80vh] border-t ${currentTheme.border}`} onClick={e => e.stopPropagation()}>
              <h3 className="text-2xl font-bold serif">{activeScenario.title[language]}</h3>
              <p className="text-md leading-relaxed opacity-80 serif italic">{activeScenario.description[language]}</p>
              <div className="space-y-3 pt-4">
                <button onClick={() => { trackEvent(Events.CASE_ANALYZE_START, { id: activeScenario.id }); onAnalyzeRequest(activeScenario.description[language]); setActiveScenario(null); setSelectedCategoryId(null); }} className={`w-full py-5 rounded-full font-bold shadow-xl active:scale-95 ${currentTheme.button}`}>
                  🧠 {language === Language.TR ? 'Bu Vakayı Analiz Et' : 'Analyze This Case'}
                </button>
                <button onClick={() => setActiveScenario(null)} className={`w-full py-4 rounded-full font-bold text-xs uppercase tracking-widest border ${currentTheme.border} opacity-50`}>
                  {language === Language.TR ? 'Kapat' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-6 pt-4">
        <h2 className="text-4xl font-bold serif tracking-tight">{t.libraryTab}</h2>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); if (e.target.value) trackEvent(Events.LIBRARY_SEARCH, { q: e.target.value }); }}
            placeholder={language === Language.TR ? '🔍 Vaka ara...' : '🔍 Search cases...'}
            className={`w-full p-4 pl-5 rounded-2xl border ${currentTheme.border} ${currentTheme.primary} outline-none text-sm font-medium`}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-40 hover:opacity-100">✕</button>
          )}
        </div>

        {/* Tag Chips */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
          <button
            onClick={() => { setActiveTag(null); trackEvent(Events.LIBRARY_FILTER, { tag: 'all' }); }}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all
              ${activeTag === null ? currentTheme.button : `border ${currentTheme.border} opacity-40 hover:opacity-70`}`}
          >
            {language === Language.TR ? 'Tümü' : 'All'}
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setActiveTag(activeTag === cat.id ? null : cat.id); trackEvent(Events.LIBRARY_FILTER, { tag: cat.id }); }}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all
                ${activeTag === cat.id ? currentTheme.button : `border ${currentTheme.border} opacity-40 hover:opacity-70`}`}
            >
              {cat.icon} {cat.title[language]}
            </button>
          ))}
        </div>

        {/* Tabs (only when not filtering) */}
        {!isFiltering && (
          <div className={`flex p-1.5 rounded-full ${currentTheme.primary} border ${currentTheme.border} shadow-inner`}>
            {['categories', 'principles'].map((tab: any) => (
              <button key={tab} onClick={() => setSelectedTab(tab)}
                className={`flex-1 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all
                  ${selectedTab === tab ? 'bg-white shadow-md scale-[1.05]' : 'opacity-30 hover:opacity-50'}
                `}
              >
                {tab === 'categories' ? (language === Language.TR ? 'Kategoriler' : 'Categories') : (language === Language.TR ? 'Prensipler' : 'Principles')}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Flat filtered results */}
      {isFiltering ? (
        <div className="space-y-4">
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-30">
            {filteredItems.length} {language === Language.TR ? 'sonuç' : 'results'}
          </p>
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 opacity-30">
              <span className="text-5xl">🔍</span>
              <p className="mt-4 italic">{language === Language.TR ? 'Sonuç bulunamadı' : 'No results found'}</p>
            </div>
          ) : (
            filteredItems.map(item => {
              const cat = CATEGORIES.find(c => c.id === item.categoryId);
              return (
                <button key={item.id} onClick={() => { trackEvent(Events.CASE_OPEN, { id: item.id }); setActiveScenario(item); }}
                  className={`w-full text-left p-6 squircle border ${currentTheme.border} ${currentTheme.primary} shadow-sm hover:shadow-xl transition-all active:scale-[0.98]`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{cat?.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-1">{item.title[language]}</h4>
                      <p className="text-sm opacity-50 line-clamp-2 italic">{item.description[language]}</p>
                      <p className="text-[9px] font-bold uppercase tracking-widest opacity-20 mt-2">{cat?.title[language]}</p>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      ) : selectedTab === 'categories' ? (
        <div className="grid grid-cols-2 gap-4">
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => setSelectedCategoryId(cat.id)}
              className={`p-6 squircle border ${currentTheme.border} ${currentTheme.primary} flex flex-col items-start shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group`}
            >
              <div className="text-4xl mb-6 group-hover:scale-125 transition-transform duration-500">{cat.icon}</div>
              <h4 className="font-bold text-lg leading-tight serif mb-2">{cat.title[language]}</h4>
              <p className="text-[8px] font-bold uppercase tracking-widest opacity-20">
                {LIBRARY_DILEMMAS[cat.id]?.length || 0} Senaryo
              </p>
            </button>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {PRINCIPLES.map(p => (
            <button key={p.id} onClick={() => setActivePrinciple(p)}
              className={`w-full text-left p-8 squircle border ${currentTheme.border} ${currentTheme.primary} shadow-sm hover:shadow-xl transition-all active:scale-[0.99] group`}
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold text-xl serif">{p.name[language]}</h4>
                <span className="text-xl opacity-10 group-hover:translate-x-1 transition-transform">→</span>
              </div>
              <p className="text-sm opacity-50 italic">{p.description[language]}</p>
            </button>
          ))}
        </div>
      )}

      {/* Principle Modal */}
      {activePrinciple && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in" onClick={() => setActivePrinciple(null)}>
          <div className={`w-full max-w-md ${currentTheme.bg} rounded-t-[45px] sm:squircle p-10 space-y-6 shadow-2xl overflow-y-auto max-h-[80vh] border-t ${currentTheme.border}`} onClick={e => e.stopPropagation()}>
            <h3 className="text-3xl font-bold serif border-b pb-4">{activePrinciple.name[language]}</h3>
            <div className="space-y-4 text-md leading-relaxed opacity-80 serif italic">
              {activePrinciple.fullDescription[language]}
            </div>
            <button onClick={() => setActivePrinciple(null)} className={`w-full py-5 rounded-full font-bold shadow-xl ${currentTheme.button}`}>{language === Language.TR ? 'Kapat' : 'Close'}</button>
          </div>
        </div>
      )}

      {/* Case Detail Modal (for flat search/filter results) */}
      {activeScenario && !selectedCategoryId && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in" onClick={() => setActiveScenario(null)}>
          <div className={`w-full max-w-md ${currentTheme.bg} rounded-t-[45px] sm:squircle p-10 space-y-6 shadow-2xl overflow-y-auto max-h-[80vh] border-t ${currentTheme.border}`} onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold serif">{activeScenario.title[language]}</h3>
            <p className="text-md leading-relaxed opacity-80 serif italic">{activeScenario.description[language]}</p>
            <div className="space-y-3 pt-4">
              <button onClick={() => { trackEvent(Events.CASE_ANALYZE_START, { id: activeScenario.id }); onAnalyzeRequest(activeScenario.description[language]); setActiveScenario(null); }} className={`w-full py-5 rounded-full font-bold shadow-xl active:scale-95 ${currentTheme.button}`}>
                🧠 {language === Language.TR ? 'Bu Vakayı Analiz Et' : 'Analyze This Case'}
              </button>
              <button onClick={() => setActiveScenario(null)} className={`w-full py-4 rounded-full font-bold text-xs uppercase tracking-widest border ${currentTheme.border} opacity-50`}>
                {language === Language.TR ? 'Kapat' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryScreen;

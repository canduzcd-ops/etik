/**
 * Gamification service — points, streaks, badges.
 * All data persisted in localStorage.
 */

export interface GameState {
  points: number;
  streak: number;
  lastAnalysisDate: string | null;
  totalAnalyses: number;
  totalShares: number;
  badges: string[];
  weeklyAnalyses: Record<string, number>;
}

const STORAGE_KEY = 'etik_gamification';

function today(): string {
  return new Date().toISOString().split('T')[0];
}

function weekKey(d: Date = new Date()): string {
  const start = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil(((d.getTime() - start.getTime()) / 86400000 + start.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${String(week).padStart(2, '0')}`;
}

function load(): GameState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch { /* ignore */ }
  return { points: 0, streak: 0, lastAnalysisDate: null, totalAnalyses: 0, totalShares: 0, badges: [], weeklyAnalyses: {} };
}

function save(state: GameState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function getGameState(): GameState {
  return load();
}

export function recordAnalysis(): { newBadges: string[] } {
  const state = load();
  const t = today();
  const wk = weekKey();

  state.points += 10;
  state.totalAnalyses += 1;

  if (state.lastAnalysisDate !== t) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const y = yesterday.toISOString().split('T')[0];
    state.streak = state.lastAnalysisDate === y ? state.streak + 1 : 1;
  }
  state.lastAnalysisDate = t;
  state.weeklyAnalyses[wk] = (state.weeklyAnalyses[wk] || 0) + 1;

  const newBadges = awardBadges(state);
  save(state);
  return { newBadges };
}

export function recordShare(): { newBadges: string[] } {
  const state = load();
  state.points += 3;
  state.totalShares += 1;
  const newBadges = awardBadges(state);
  save(state);
  return { newBadges };
}

function awardBadges(state: GameState): string[] {
  const checks: { id: string; ok: boolean }[] = [
    { id: 'first_analysis', ok: state.totalAnalyses >= 1 },
    { id: 'three_analyses', ok: state.totalAnalyses >= 3 },
    { id: 'ten_analyses', ok: state.totalAnalyses >= 10 },
    { id: 'twentyfive_analyses', ok: state.totalAnalyses >= 25 },
    { id: 'fifty_analyses', ok: state.totalAnalyses >= 50 },
    { id: 'first_share', ok: state.totalShares >= 1 },
    { id: 'streak_7', ok: state.streak >= 7 },
    { id: 'streak_30', ok: state.streak >= 30 },
    { id: 'century_points', ok: state.points >= 100 },
    { id: 'millennial_points', ok: state.points >= 1000 },
  ];
  const earned: string[] = [];
  for (const c of checks) {
    if (c.ok && !state.badges.includes(c.id)) {
      state.badges.push(c.id);
      earned.push(c.id);
    }
  }
  return earned;
}

export interface BadgeInfo {
  id: string;
  icon: string;
  name: { tr: string; en: string };
  description: { tr: string; en: string };
  earned: boolean;
}

const BADGE_META: Omit<BadgeInfo, 'earned'>[] = [
  { id: 'first_analysis', icon: '🌱', name: { tr: 'İlk Adım', en: 'First Step' }, description: { tr: 'İlk analizini tamamla', en: 'Complete your first analysis' } },
  { id: 'three_analyses', icon: '🔥', name: { tr: 'Meraklı Zihin', en: 'Curious Mind' }, description: { tr: '3 analiz tamamla', en: 'Complete 3 analyses' } },
  { id: 'ten_analyses', icon: '⚡', name: { tr: 'Etik Kaşif', en: 'Ethics Explorer' }, description: { tr: '10 analiz tamamla', en: 'Complete 10 analyses' } },
  { id: 'twentyfive_analyses', icon: '🏆', name: { tr: 'Etik Uzmanı', en: 'Ethics Expert' }, description: { tr: '25 analiz tamamla', en: 'Complete 25 analyses' } },
  { id: 'fifty_analyses', icon: '👑', name: { tr: 'Ahlak Filozofu', en: 'Moral Philosopher' }, description: { tr: '50 analiz tamamla', en: 'Complete 50 analyses' } },
  { id: 'first_share', icon: '📢', name: { tr: 'Paylaşımcı', en: 'Sharer' }, description: { tr: 'İlk paylaşımını yap', en: 'Make your first share' } },
  { id: 'streak_7', icon: '🔥', name: { tr: '7 Gün Seri', en: '7-Day Streak' }, description: { tr: '7 gün üst üste analiz yap', en: 'Analyze 7 days in a row' } },
  { id: 'streak_30', icon: '💎', name: { tr: '30 Gün Seri', en: '30-Day Streak' }, description: { tr: '30 gün üst üste analiz yap', en: 'Analyze 30 days in a row' } },
  { id: 'century_points', icon: '💯', name: { tr: 'Yüzüncü Puan', en: 'Century' }, description: { tr: '100 puan biriktir', en: 'Earn 100 points' } },
  { id: 'millennial_points', icon: '🌟', name: { tr: 'Bin Puan', en: 'Millennial' }, description: { tr: '1000 puan biriktir', en: 'Earn 1000 points' } },
];

export function getAllBadges(): BadgeInfo[] {
  const state = load();
  return BADGE_META.map(b => ({ ...b, earned: state.badges.includes(b.id) }));
}

export function getWeeklyTrend(): { week: string; count: number }[] {
  const state = load();
  const weeks: { week: string; count: number }[] = [];
  const now = new Date();
  for (let i = 3; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i * 7);
    const key = weekKey(d);
    weeks.push({ week: `H${4 - i}`, count: state.weeklyAnalyses[key] || 0 });
  }
  return weeks;
}

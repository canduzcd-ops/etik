/**
 * Freemium service — daily analysis limit for free users.
 * Premium state is stored locally (hook up to IAP later).
 */

const STORAGE_KEY = 'etik_freemium';
const FREE_DAILY_LIMIT = 3;

interface FreemiumState {
  dailyCount: number;
  lastResetDate: string;
  isPremium: boolean;
}

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function load(): FreemiumState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const state: FreemiumState = JSON.parse(stored);
      if (state.lastResetDate !== getToday()) {
        state.dailyCount = 0;
        state.lastResetDate = getToday();
        save(state);
      }
      return state;
    }
  } catch { /* ignore */ }
  return { dailyCount: 0, lastResetDate: getToday(), isPremium: false };
}

function save(state: FreemiumState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function canAnalyze(): boolean {
  const s = load();
  return s.isPremium || s.dailyCount < FREE_DAILY_LIMIT;
}

export function recordUsage() {
  const s = load();
  s.dailyCount += 1;
  save(s);
}

export function getRemainingAnalyses(): number {
  const s = load();
  if (s.isPremium) return Infinity;
  return Math.max(0, FREE_DAILY_LIMIT - s.dailyCount);
}

export function isPremium(): boolean {
  return load().isPremium;
}

export function setPremium(value: boolean) {
  const s = load();
  s.isPremium = value;
  save(s);
}

export function getDailyLimit(): number {
  return FREE_DAILY_LIMIT;
}

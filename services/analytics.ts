/**
 * Simple analytics event tracker.
 * Events logged locally; connect to Firebase Analytics later.
 */

interface AnalyticsEvent {
  name: string;
  params?: Record<string, any>;
  timestamp: number;
}

const STORAGE_KEY = 'etik_analytics';

function getEvents(): AnalyticsEvent[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch { return []; }
}

export function trackEvent(name: string, params?: Record<string, any>) {
  const events = getEvents();
  events.push({ name, params, timestamp: Date.now() });
  const trimmed = events.slice(-500);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
  if (typeof import.meta !== 'undefined' && (import.meta as any).env?.DEV) {
    console.log(`[Analytics] ${name}`, params || '');
  }
}

export const Events = {
  // Share
  SHARE_OPEN: 'share_open',
  SHARE_COPY: 'share_copy',
  SHARE_IMAGE: 'share_image',
  SHARE_WHATSAPP: 'share_whatsapp',
  SHARE_SUCCESS: 'share_success',
  // Gamification
  ANALYSIS_COMPLETE: 'analysis_complete',
  STREAK_INCREMENT: 'streak_increment',
  BADGE_EARNED: 'badge_earned',
  GAMIFICATION_VIEW: 'gamification_view',
  // Library
  LIBRARY_VIEW: 'library_view',
  LIBRARY_SEARCH: 'library_search',
  LIBRARY_FILTER: 'library_filter',
  CASE_OPEN: 'case_open',
  CASE_ANALYZE_START: 'case_analyze_start',
  // Profile
  PROFILE_VIEW: 'profile_view',
  PROFILE_SHARE_CLICK: 'profile_share_click',
  PROFILE_SHARE_SUCCESS: 'profile_share_success',
  // Paywall
  PAYWALL_VIEW: 'paywall_view',
  PAYWALL_DISMISS: 'paywall_dismiss',
  PURCHASE_START: 'purchase_start',
  PURCHASE_SUCCESS: 'purchase_success',
  PURCHASE_RESTORE: 'purchase_restore',
} as const;

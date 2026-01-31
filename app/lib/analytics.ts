// Simple analytics for demo - in production, replace with Mixpanel/Amplitude/etc.

export type EventType = 'quiz_start' | 'quiz_complete' | 'share_click' | 'email_signup';

export interface AnalyticsEvent {
  type: EventType;
  timestamp: string;
  data?: Record<string, string>;
}

const STORAGE_KEY = 'basecamp_analytics';

export function trackEvent(type: EventType, data?: Record<string, string>) {
  if (typeof window === 'undefined') return;

  const events = getEvents();
  events.push({
    type,
    timestamp: new Date().toISOString(),
    data,
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

export function getEvents(): AnalyticsEvent[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function getStats() {
  const events = getEvents();
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

  const todayEvents = events.filter(e => new Date(e.timestamp) >= today);
  const weekEvents = events.filter(e => new Date(e.timestamp) >= weekAgo);

  const countByType = (evts: AnalyticsEvent[], type: EventType) =>
    evts.filter(e => e.type === type).length;

  // Get personality distribution from completions
  const completions = events.filter(e => e.type === 'quiz_complete');
  const personalityCounts: Record<string, number> = {};
  completions.forEach(e => {
    const personality = e.data?.personality || 'unknown';
    personalityCounts[personality] = (personalityCounts[personality] || 0) + 1;
  });

  return {
    all: {
      starts: countByType(events, 'quiz_start'),
      completions: countByType(events, 'quiz_complete'),
      shares: countByType(events, 'share_click'),
      signups: countByType(events, 'email_signup'),
    },
    today: {
      starts: countByType(todayEvents, 'quiz_start'),
      completions: countByType(todayEvents, 'quiz_complete'),
      shares: countByType(todayEvents, 'share_click'),
      signups: countByType(todayEvents, 'email_signup'),
    },
    week: {
      starts: countByType(weekEvents, 'quiz_start'),
      completions: countByType(weekEvents, 'quiz_complete'),
      shares: countByType(weekEvents, 'share_click'),
      signups: countByType(weekEvents, 'email_signup'),
    },
    personalityCounts,
    completionRate: events.filter(e => e.type === 'quiz_start').length > 0
      ? Math.round((countByType(events, 'quiz_complete') / countByType(events, 'quiz_start')) * 100)
      : 0,
    shareRate: completions.length > 0
      ? Math.round((countByType(events, 'share_click') / completions.length) * 100)
      : 0,
    signupRate: completions.length > 0
      ? Math.round((countByType(events, 'email_signup') / completions.length) * 100)
      : 0,
  };
}

export function clearEvents() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

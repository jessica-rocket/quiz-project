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

export function loadDemoData() {
  if (typeof window === 'undefined') return;

  const now = new Date();
  const personalities = ['explorer', 'classic', 'adventurer', 'mindful'];
  const demoEvents: AnalyticsEvent[] = [];

  // Generate realistic demo data for past 7 days
  for (let daysAgo = 6; daysAgo >= 0; daysAgo--) {
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);

    // More activity on recent days
    const startsToday = Math.floor(Math.random() * 20) + 10 + (6 - daysAgo) * 3;

    for (let i = 0; i < startsToday; i++) {
      const eventTime = new Date(date);
      eventTime.setHours(Math.floor(Math.random() * 14) + 8); // 8am-10pm
      eventTime.setMinutes(Math.floor(Math.random() * 60));

      // Quiz start
      demoEvents.push({
        type: 'quiz_start',
        timestamp: eventTime.toISOString(),
      });

      // 85% completion rate
      if (Math.random() < 0.85) {
        const personality = personalities[Math.floor(Math.random() * personalities.length)];
        const completeTime = new Date(eventTime.getTime() + 60000); // 1 min later

        demoEvents.push({
          type: 'quiz_complete',
          timestamp: completeTime.toISOString(),
          data: { personality },
        });

        // 35% share rate
        if (Math.random() < 0.35) {
          demoEvents.push({
            type: 'share_click',
            timestamp: new Date(completeTime.getTime() + 5000).toISOString(),
            data: { personality },
          });
        }

        // 25% signup rate
        if (Math.random() < 0.25) {
          demoEvents.push({
            type: 'email_signup',
            timestamp: new Date(completeTime.getTime() + 10000).toISOString(),
            data: { personality },
          });
        }
      }
    }
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(demoEvents));
}

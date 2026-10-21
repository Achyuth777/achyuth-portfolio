export type Day = { date: string; count: number; level: number };
export function activityStats(days: Day[]) {
  let best = 0,
    run = 0;
  for (const day of days) {
    run = day.count > 0 ? run + 1 : 0;
    best = Math.max(best, run);
  }
  let i = days.length - 1;
  // An unfinished final day does not break yesterday's streak.
  if (i >= 0 && days[i].count === 0) i--;
  let current = 0;
  for (; i >= 0 && days[i].count > 0; i--) current++;
  return {
    total: days.reduce((n, d) => n + d.count, 0),
    active: days.filter((d) => d.count > 0).length,
    current,
    best,
  };
}

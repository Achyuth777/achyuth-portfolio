import { test } from "node:test";
import { strict as assert } from "node:assert";
import { activityStats } from "./github.ts";
const days = (counts: number[]) =>
  counts.map((count, i) => ({
    date: `2026-10-${String(i + 1).padStart(2, "0")}`,
    count,
    level: count ? 1 : 0,
  }));
test("current streak allows an unfinished final day, not a two-day gap", () => {
  assert.equal(activityStats(days([1, 2, 0])).current, 2);
  assert.equal(activityStats(days([1, 2, 0, 0])).current, 0);
});
test("activity distinguishes contribution total, active days and streaks", () => {
  assert.deepEqual(activityStats(days([3, 2, 0, 1])), {
    total: 6,
    active: 3,
    current: 1,
    best: 2,
  });
  assert.deepEqual(activityStats([]), {
    total: 0,
    active: 0,
    current: 0,
    best: 0,
  });
});

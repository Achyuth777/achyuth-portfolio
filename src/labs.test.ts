import { test } from "node:test";
import assert from "node:assert/strict";
import { runway, health, approvals, canSettle } from "./labs.ts";
test("stock shortfall and delay boundary", () => {
  assert.deepEqual(runway(600, 50, 12), { days: 12, shortfall: 0 });
  assert.equal(runway(600, 50, 15).shortfall, 150);
});
test("stress reduces health; repayment improves health", () => {
  assert.equal(health(10000, 5000, 0), 1.6);
  assert.equal(health(10000, 5000, 25), 1.2);
  assert.ok(health(10000, 5000, 25, 500) > 1.2);
  assert.equal(health(10000, 5000, 0, 5000), Infinity);
});
test("approval threshold and daily cap", () => {
  assert.equal(approvals(5000), 1);
  assert.equal(approvals(5001), 2);
  assert.equal(canSettle(6000, 1), false);
  assert.equal(canSettle(6000, 2), true);
  assert.equal(canSettle(26000, 2), false);
  assert.equal(canSettle(0, 2), false);
});

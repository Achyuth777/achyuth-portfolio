import { useState } from "react";
import { runway, health, approvals, canSettle } from "../labs";
export default function Lab({ slug }: { slug: string }) {
  const [demand, setDemand] = useState(50),
    [delay, setDelay] = useState(12),
    [shock, setShock] = useState(15),
    [repay, setRepay] = useState(0),
    [amount, setAmount] = useState(6000),
    [approved, setApproved] = useState(0),
    [settled, setSettled] = useState(false);
  const stock = runway(600, demand, delay);
  const hf = health(10000, 5000, shock, repay);
  return (
    <section className="lab" aria-label="Interactive explanatory model">
      <div className="label">
        <span className="status-dot" />
        INTERACTIVE FIELD STUDY /{" "}
        {slug === "supplylens"
          ? "INVENTORY"
          : slug === "treasuryflow"
            ? "AUTHORIZATION"
            : "EXPOSURE"}
      </div>
      {slug === "supplylens" ? (
        <>
          <div className="lab-reading">
            <strong>{stock.days.toFixed(1)}</strong>
            <span>
              days of inventory
              <br />
              600 units on hand
            </span>
          </div>
          <div className="runway" aria-hidden="true">
            {Array.from({ length: 24 }, (_, i) => (
              <i key={i} className={i < stock.days ? "filled" : ""} />
            ))}
          </div>
          <label>
            Daily demand <output>{demand} units</output>
            <input
              type="range"
              min="20"
              max="100"
              step="5"
              value={demand}
              onChange={(e) => setDemand(+e.target.value)}
            />
          </label>
          <label>
            Delivery lead time <output>{delay} days</output>
            <input
              type="range"
              min="3"
              max="24"
              value={delay}
              onChange={(e) => setDelay(+e.target.value)}
            />
          </label>
          <p className="lab-result" aria-live="polite">
            {stock.shortfall
              ? `${stock.shortfall} units short before delivery.`
              : "Stock covers this delivery window."}
          </p>
          <small>
            Illustrative constant-demand model, not SupplyLens’s forecasting
            engine. No incoming orders or safety stock are included.
          </small>
        </>
      ) : slug === "treasuryflow" ? (
        <>
          <div className="lab-reading">
            <strong>
              {approved}/{approvals(amount)}
            </strong>
            <span>
              required approvals
              <br />
              {amount.toLocaleString("en-US")} mUSD
            </span>
          </div>
          <div className="flow-steps">
            {["Request", "Approve", "Settle", "Reconcile"].map((x, i) => (
              <span
                key={x}
                className={
                  i <= (settled ? 3 : approved ? 1 : 0) ? "active" : ""
                }
              >
                {String(i + 1).padStart(2, "0")}
                <b>{x}</b>
              </span>
            ))}
          </div>
          <label>
            Payment amount{" "}
            <output>{amount.toLocaleString("en-US")} mUSD</output>
            <input
              type="range"
              min="1000"
              max="30000"
              step="1000"
              value={amount}
              onChange={(e) => {
                setAmount(+e.target.value);
                setApproved(0);
                setSettled(false);
              }}
            />
          </label>
          <div className="actions">
            <button
              className="button"
              disabled={approved >= approvals(amount) || settled}
              onClick={() => setApproved((v) => v + 1)}
            >
              Add simulated approval +
            </button>
            <button
              className="button primary"
              disabled={!canSettle(amount, approved) || settled}
              onClick={() => setSettled(true)}
            >
              Simulate settlement ↗
            </button>
            <button
              className="text-button"
              onClick={() => {
                setApproved(0);
                setSettled(false);
              }}
            >
              Reset
            </button>
          </div>
          <p className="lab-result" role="status">
            {amount > 25000
              ? "Blocked: exceeds the 25,000 mUSD daily limit."
              : settled
                ? "Simulation complete. Ledger and settlement agree."
                : `${approvals(amount) - approved} more approval(s) required.`}
          </p>
          <small>
            Educational state walkthrough. One manager up to 5,000 mUSD; two
            above. Assumes no earlier payments today; no wallet, funds or
            network requests.
          </small>
        </>
      ) : (
        <>
          <div className="lab-reading">
            <strong className={hf < 1.2 ? "danger" : ""}>
              {hf.toFixed(2)}
            </strong>
            <span>
              modeled health factor
              <br />
              liquidation boundary: 1.00
            </span>
          </div>
          <svg
            className="risk-chart"
            viewBox="0 0 600 100"
            role="img"
            aria-label={"Health factor " + hf.toFixed(2)}
          >
            <path
              d="M0 85H600M0 50H600M0 15H600"
              stroke="currentColor"
              opacity=".15"
            />
            <path
              d={`M0 15 Q180 15 300 40 T600 ${Math.max(5, Math.min(95, 100 - (hf - 0.6) * 70))}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <circle
              cx="600"
              cy={Math.max(5, Math.min(95, 100 - (hf - 0.6) * 70))}
              r="4"
              fill="currentColor"
            />
          </svg>
          <label>
            Collateral price shock <output>−{shock}%</output>
            <input
              type="range"
              min="0"
              max="50"
              value={shock}
              onChange={(e) => setShock(+e.target.value)}
            />
          </label>
          <label>
            Simulated repayment{" "}
            <output>${repay.toLocaleString("en-US")}</output>
            <input
              type="range"
              min="0"
              max="2000"
              step="100"
              value={repay}
              onChange={(e) => setRepay(+e.target.value)}
            />
          </label>
          <p className="lab-result" aria-live="polite">
            {hf <= 1
              ? "At or below the modeled liquidation boundary."
              : hf < 1.2
                ? "A narrow buffer remains in this scenario."
                : "Above the modeled liquidation boundary."}
          </p>
          <small>
            Illustrative $10,000 collateral, $5,000 debt, 80% liquidation LTV.
            HF = stressed collateral × 0.8 ÷ remaining debt. Stable debt,
            correlated collateral; no fees or execution. Not financial advice.
          </small>
        </>
      )}
    </section>
  );
}

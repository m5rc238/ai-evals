import { useMemo, useState } from 'react';
import { Calculator, GitBranch, ShieldCheck } from 'lucide-react';
import { VALIDITY_DIMENSIONS } from '../data/evalsData';

function logGamma(z: number): number {
  const g = 7;
  const c = [
    0.99999999999980993,
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.9843695780195716e-6,
    1.5056327351493116e-7,
  ];
  if (z < 0.5) {
    return Math.log(Math.PI) - Math.log(Math.sin(Math.PI * z)) - logGamma(1 - z);
  }
  const z1 = z - 1;
  let x = c[0];
  for (let i = 1; i < g + 2; i++) {
    x += c[i] / (z1 + i);
  }
  const t = z1 + g + 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (z1 + 0.5) * Math.log(t) - t + Math.log(x);
}

function binomCdf(k: number, n: number, p: number): number {
  if (p <= 0) return 1;
  if (p >= 1) return k >= n ? 1 : 0;
  const logN = logGamma(n + 1);
  let sum = 0;
  for (let i = 0; i <= k; i++) {
    const logCoef = logN - logGamma(i + 1) - logGamma(n - i + 1);
    const term = Math.exp(logCoef + i * Math.log(p) + (n - i) * Math.log(1 - p));
    sum += term;
  }
  return Math.min(1, sum);
}

function oneSided95UpperBound(k: number, n: number): number {
  if (n <= 0) return 1;
  if (k >= n) return 1;
  if (k === 0) {
    return 1 - Math.pow(0.05, 1 / n);
  }
  let lo = k / n;
  let hi = 1;
  for (let iter = 0; iter < 60; iter++) {
    const mid = (lo + hi) / 2;
    if (binomCdf(k, n, mid) > 0.05) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  return hi;
}

export function ValidityLab() {
  const [trials, setTrials] = useState(100);
  const [failures, setFailures] = useState(0);
  const [conversations, setConversations] = useState(5);
  const [turnsPerConv, setTurnsPerConv] = useState(60);

  const upperBoundPct = useMemo(() => {
    const safeFailures = Math.min(failures, trials);
    return (oneSided95UpperBound(safeFailures, trials) * 100).toFixed(2);
  }, [failures, trials]);

  const observedPct = trials > 0 ? ((Math.min(failures, trials) / trials) * 100).toFixed(2) : '0.00';

  return (
    <div className="space-y-8">
      {/* Rare-Failure Binomial Bound Explorer */}
      <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-stone-900">
            1. Rare-Failure Uncertainty Explorer (Exact Binomial 95% Upper Bound)
          </h2>
        </div>
        <p className="text-sm text-stone-600">
          Observing zero failures in finite testing does not establish a zero failure rate. Adjust independent trials (<em>N</em>) and observed failures (<em>k</em>) to inspect the exact one-sided 95% upper confidence bound.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <label className="block text-xs font-medium text-stone-700">
              Independent, representative trials (N): <span className="font-mono font-bold text-stone-900">{trials}</span>
              <input
                type="range"
                min={10}
                max={1000}
                step={10}
                value={trials}
                onChange={(e) => {
                  const nextN = Number(e.target.value);
                  setTrials(nextN);
                  if (failures > nextN) setFailures(nextN);
                }}
                className="mt-2 w-full accent-indigo-600"
              />
            </label>

            <label className="block text-xs font-medium text-stone-700">
              Observed failures (k): <span className="font-mono font-bold text-stone-900">{failures}</span>
              <input
                type="range"
                min={0}
                max={Math.min(50, trials)}
                step={1}
                value={failures}
                onChange={(e) => setFailures(Number(e.target.value))}
                className="mt-2 w-full accent-indigo-600"
              />
            </label>
          </div>

          <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-5 flex flex-col justify-center space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-medium text-stone-600">Observed failure rate:</span>
              <span className="font-mono text-lg font-bold text-stone-900">{observedPct}%</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-medium text-indigo-900">One-sided 95% upper bound:</span>
              <span className="font-mono text-2xl font-bold text-indigo-700">{upperBoundPct}%</span>
            </div>
            <p className="pt-2 border-t border-indigo-200/80 text-xs text-stone-700">
              <strong>Model assumptions:</strong> Independent Bernoulli trials, fixed failure rate, and accurate failure detection. Does <em>not</em> establish safety outside the tested conditions or account for rubric invalidity.
            </p>
          </div>
        </div>
      </section>

      {/* Dependence & Clustering */}
      <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <GitBranch className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-stone-900">
            2. Dependence & Effective Sample Size
          </h2>
        </div>
        <p className="text-sm text-stone-600">
          Turns within the same conversation or repeated attempts on the same task share underlying context and failure modes.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-3">
            <label className="block text-xs font-medium text-stone-700">
              Independent conversations: <span className="font-mono font-bold">{conversations}</span>
              <input
                type="range"
                min={1}
                max={50}
                value={conversations}
                onChange={(e) => setConversations(Number(e.target.value))}
                className="mt-1.5 w-full accent-indigo-600"
              />
            </label>
            <label className="block text-xs font-medium text-stone-700">
              Turns per conversation: <span className="font-mono font-bold">{turnsPerConv}</span>
              <input
                type="range"
                min={5}
                max={100}
                step={5}
                value={turnsPerConv}
                onChange={(e) => setTurnsPerConv(Number(e.target.value))}
                className="mt-1.5 w-full accent-indigo-600"
              />
            </label>
          </div>

          <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 text-xs space-y-2 text-stone-700">
            <div>
              Total turns logged: <strong className="font-mono text-stone-900">{conversations * turnsPerConv}</strong>
            </div>
            <div>
              Independent conversation clusters: <strong className="font-mono text-indigo-700">{conversations}</strong>
            </div>
            <p className="text-stone-600">
              Treating <strong>{conversations * turnsPerConv}</strong> turns as independent understates uncertainty. Repeated attempts estimate variability on those tasks—they do not expand task coverage.
            </p>
          </div>
        </div>
      </section>

      {/* 10-Point Validity & Quality Checklist */}
      <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-stone-900">
            3. Ten-Point Evaluation Quality & Validity Review
          </h2>
        </div>
        <p className="text-sm text-stone-600">
          Grounded in the <em>Standards for Educational and Psychological Testing</em>: validity belongs to specific score interpretations and intended uses, not to a benchmark in the abstract.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {VALIDITY_DIMENSIONS.map((v, i) => (
            <div key={v.name} className="rounded-lg border border-stone-200 p-3.5 text-xs space-y-1">
              <div className="font-semibold text-stone-900">
                {i + 1}. {v.name}
              </div>
              <p className="text-stone-600">{v.question}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

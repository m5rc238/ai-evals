import { useMemo, useState } from 'react';
import {
  AlertCircle,
  Calculator,
  Check,
  Clock,
  Copy,
  Eye,
  FileSearch,
  GitBranch,
  Scale,
  Shield,
  Users,
} from 'lucide-react';
import { PROTOCOL_FIELDS, REPORTING_CLAIMS } from '../data/curriculum';
import { VALIDITY_DIMENSIONS } from '../data/evalsData';

/* -------------------------------------------------------------------------- */
/* Lesson 6: Measuring Real Outcomes, Skill Erosion & Grading                 */
/* -------------------------------------------------------------------------- */
export function Lesson6OutcomesAndGrading() {
  const [studyIdx, setStudyIdx] = useState(0);
  const [showSeverityTrap, setShowSeverityTrap] = useState(false);

  const studies = [
    {
      title: 'Perceived vs. Actual Speed (METR RCT)',
      cite: '16 experienced developers · 246 complex tasks',
      finding:
        'Developers thought they were 20% faster with AI tools, but they were actually 19% slower when they had access to AI than when they did not.',
      lesson: 'Never substitute self-reported productivity (e.g., perception surveys) for measured task outcomes.',
    },
    {
      title: 'Skill Erosion (Anthropic RCT, 2026)',
      cite: 'Shen & Tamkin · 52 engineers learning a new Python library',
      finding:
        'AI users scored 17% lower on a follow-up mastery quiz (~two letter grades), with the gap most pronounced in debugging.',
      lesson: 'Measure skill retention alongside immediate task completion.',
    },
    {
      title: 'Opinion Drift (Jakesch et al., CHI 2023)',
      cite: 'Co-writing with opinionated language models',
      finding:
        'Opinionated suggestions shifted both participants’ written posts and their subsequent survey opinions—often without participants noticing the model’s bias.',
      lesson: 'Watch for output homogenization and subtle opinion drift in content tools.',
    },
    {
      title: 'Reliance & Offloading (Padmakumar et al., NeurIPS 2026)',
      cite: 'Offloading Score = fraction of counterfactual steps saved',
      finding:
        'Higher reliance (offloading) correlated negatively with code understanding—except for an outlier cluster of "appropriately reliant" users who used the model to learn and improvise.',
      lesson: 'Distinguish blind offloading from active learning when interpreting AI reliance.',
    },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-stone-200 bg-white p-5 space-y-3">
        <h3 className="text-sm font-semibold text-stone-900">
          1. Separate Output Quality, Task Success & Human Outcomes
        </h3>
        <div className="grid gap-2 sm:grid-cols-4 text-xs">
          {[
            ['1. Output quality', 'Summary accurately represents the paper.'],
            ['2. System task success', 'Assistant retrieves & organizes evidence.'],
            ['3. Human outcome', 'Researcher writes a better synthesis.'],
            ['4. Organizational', 'Workflow improves net of review & cost.'],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-lg border border-stone-200 bg-stone-50 p-2.5">
              <div className="font-semibold text-stone-900">{title}</div>
              <p className="mt-0.5 text-stone-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Empirical Case Studies */}
      <section className="rounded-xl border border-stone-200 bg-white p-5 space-y-3">
        <h3 className="text-sm font-semibold text-stone-900">
          2. Why Human-Outcome Measurement Matters (4 Empirical Cases)
        </h3>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {studies.map((st, idx) => (
            <button
              key={st.title}
              onClick={() => setStudyIdx(idx)}
              className={`rounded-lg border p-2.5 text-left text-xs transition ${
                studyIdx === idx
                  ? 'border-indigo-600 bg-indigo-50 font-semibold text-indigo-950'
                  : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
              }`}
            >
              {st.title}
            </button>
          ))}
        </div>
        <div className="rounded-lg border border-indigo-200 bg-indigo-50/40 p-4 text-xs space-y-1.5">
          <div className="font-semibold text-indigo-950">{studies[studyIdx].cite}</div>
          <p className="text-stone-800">{studies[studyIdx].finding}</p>
          <p className="font-medium text-indigo-900">
            Implication: {studies[studyIdx].lesson}
          </p>
        </div>
      </section>

      {/* Grading & Aggregation Trap */}
      <section className="rounded-xl border border-stone-200 bg-white p-5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Scale className="h-4 w-4 text-indigo-600" />
            <h3 className="text-sm font-semibold text-stone-900">
              3. Grading Validation & The Single-Score Aggregation Trap
            </h3>
          </div>
          <button
            onClick={() => setShowSeverityTrap((v) => !v)}
            className="rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-800"
          >
            {showSeverityTrap ? 'Show Disaggregated Profile' : 'Collapse to Single Score'}
          </button>
        </div>

        {showSeverityTrap ? (
          <div className="rounded-lg border border-rose-300 bg-rose-50 p-4 text-center space-y-1">
            <div className="text-2xl font-bold text-rose-900">95% Pass Rate</div>
            <p className="text-xs text-rose-800">
              Collapsing 4 minor formatting issues and 1 unauthorized data disclosure into one pass rate hides critical severity and recoverability.
            </p>
          </div>
        ) : (
          <div className="grid gap-2 sm:grid-cols-3 text-xs">
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
              <div className="font-semibold text-emerald-900">95 / 100 Passed</div>
              <p className="text-emerald-800">Met all criteria</p>
            </div>
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
              <div className="font-semibold text-amber-900">4 / 100 Formatting</div>
              <p className="text-amber-800">Low severity · easily recovered</p>
            </div>
            <div className="rounded-lg border border-rose-300 bg-rose-50 p-3 flex items-start gap-1.5">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-700 mt-0.5" />
              <div>
                <div className="font-semibold text-rose-900">1 / 100 Disclosure</div>
                <p className="text-rose-800">Critical · mandatory constraint</p>
              </div>
            </div>
          </div>
        )}

        <p className="text-xs text-stone-600">
          Validate evaluators too: test LLM judges on held-out data for missed rare failures and biases (position, verbosity, self-enhancement), and never treat human consensus as automatic ground truth.
        </p>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Lesson 7: Statistics, Clustering & Validity                                */
/* -------------------------------------------------------------------------- */
function logGamma(z: number): number {
  const g = 7;
  const c = [
    0.99999999999980993, 676.5203681218851, -1259.1392167224028,
    771.32342877765313, -176.61502916214059, 12.507343278686905,
    -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7,
  ];
  if (z < 0.5) return Math.log(Math.PI) - Math.log(Math.sin(Math.PI * z)) - logGamma(1 - z);
  const z1 = z - 1;
  let x = c[0];
  for (let i = 1; i < g + 2; i++) x += c[i] / (z1 + i);
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
    sum += Math.exp(logCoef + i * Math.log(p) + (n - i) * Math.log(1 - p));
  }
  return Math.min(1, sum);
}

function oneSided95UpperBound(k: number, n: number): number {
  if (n <= 0 || k >= n) return 1;
  if (k === 0) return 1 - Math.pow(0.05, 1 / n);
  let lo = k / n;
  let hi = 1;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (binomCdf(k, n, mid) > 0.05) lo = mid;
    else hi = mid;
  }
  return hi;
}

export function Lesson7StatisticsValidity() {
  const [trials, setTrials] = useState(100);
  const [failures, setFailures] = useState(0);
  const [convs, setConvs] = useState(5);
  const [turns, setTurns] = useState(60);

  const upperBoundPct = useMemo(
    () => (oneSided95UpperBound(Math.min(failures, trials), trials) * 100).toFixed(2),
    [failures, trials]
  );

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-stone-200 bg-white p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Calculator className="h-4 w-4 text-indigo-600" />
          <h3 className="text-sm font-semibold text-stone-900">
            1. Rare-Failure Uncertainty (Exact Binomial 95% Upper Bound)
          </h3>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3 text-xs">
            <label className="block font-medium text-stone-700">
              Independent trials (N): <strong className="font-mono">{trials}</strong>
              <input
                type="range"
                min={10}
                max={1000}
                step={10}
                value={trials}
                onChange={(e) => {
                  const next = Number(e.target.value);
                  setTrials(next);
                  if (failures > next) setFailures(next);
                }}
                className="mt-1.5 w-full accent-indigo-600"
              />
            </label>
            <label className="block font-medium text-stone-700">
              Observed failures (k): <strong className="font-mono">{failures}</strong>
              <input
                type="range"
                min={0}
                max={Math.min(50, trials)}
                value={failures}
                onChange={(e) => setFailures(Number(e.target.value))}
                className="mt-1.5 w-full accent-indigo-600"
              />
            </label>
          </div>

          <div className="rounded-lg border border-indigo-200 bg-indigo-50/50 p-4 space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span>One-sided 95% upper bound:</span>
              <span className="font-mono text-lg font-bold text-indigo-700">{upperBoundPct}%</span>
            </div>
            <p className="text-stone-600">
              Assumes independent Bernoulli trials, fixed rate, and accurate detection. Does not establish safety outside tested conditions.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-stone-200 bg-white p-5 space-y-3">
        <div className="flex items-center gap-2">
          <GitBranch className="h-4 w-4 text-indigo-600" />
          <h3 className="text-sm font-semibold text-stone-900">
            2. Clustering & Dependence
          </h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 text-xs">
          <div className="space-y-2">
            <label className="block font-medium text-stone-700">
              Conversations: <strong className="font-mono">{convs}</strong>
              <input
                type="range"
                min={1}
                max={40}
                value={convs}
                onChange={(e) => setConvs(Number(e.target.value))}
                className="mt-1 w-full accent-indigo-600"
              />
            </label>
            <label className="block font-medium text-stone-700">
              Turns per conversation: <strong className="font-mono">{turns}</strong>
              <input
                type="range"
                min={5}
                max={100}
                step={5}
                value={turns}
                onChange={(e) => setTurns(Number(e.target.value))}
                className="mt-1 w-full accent-indigo-600"
              />
            </label>
          </div>
          <div className="rounded-lg bg-stone-50 border border-stone-200 p-3 text-stone-700">
            <strong>{convs * turns}</strong> logged turns across <strong>{convs}</strong> conversations ≠ {convs * turns} independent tasks. Also remember: an inconclusive comparison does not establish equivalence.
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-stone-200 bg-white p-5 space-y-3">
        <h3 className="text-sm font-semibold text-stone-900">
          3. Validity Belongs to Specific Interpretations & Uses (10 Checks)
        </h3>
        <div className="grid gap-2 sm:grid-cols-2 text-xs">
          {VALIDITY_DIMENSIONS.map((v, i) => (
            <div key={v.name} className="rounded-lg border border-stone-200 p-2.5">
              <span className="font-semibold text-stone-900">{i + 1}. {v.name}: </span>
              <span className="text-stone-600">{v.question}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Lesson 8: When to Evaluate — Lifecycle, Long-Term & Governance             */
/* -------------------------------------------------------------------------- */
export function Lesson8TimeAndGovernance() {
  const [horizon, setHorizon] = useState<'short' | 'long'>('long');

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-stone-200 bg-white p-5 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-indigo-600" />
            <h3 className="text-sm font-semibold text-stone-900">
              1. Short-Term vs. Long-Term Evaluation
            </h3>
          </div>
          <div className="inline-flex rounded-lg border border-stone-200 bg-stone-100 p-0.5 text-xs">
            <button
              onClick={() => setHorizon('short')}
              className={`rounded-md px-2.5 py-1 font-medium ${
                horizon === 'short' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
              }`}
            >
              Short-Term (e.g., 1 hr)
            </button>
            <button
              onClick={() => setHorizon('long')}
              className={`rounded-md px-2.5 py-1 font-medium ${
                horizon === 'long' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
              }`}
            >
              Long-Term (e.g., 1+ week)
            </button>
          </div>
        </div>

        {horizon === 'short' ? (
          <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 text-xs text-stone-700 space-y-1.5">
            <div className="font-semibold text-stone-900">Immediate benefits—and blind spots</div>
            <p>Measures immediate speed or creativity in constrained sessions, but misses familiarization curves and delayed harms.</p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 text-xs">
            <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-3.5 space-y-1">
              <div className="font-semibold text-emerald-950">Familiarization Phase (Long, Gero & Chilton, 2024)</div>
              <p className="text-stone-700">
                After exploring a workflow, users anticipated outputs and customized prompts—rated utility rose <em>after</em> familiarization, showing perceived AI utility wasn’t just a novelty effect.
              </p>
            </div>
            <div className="rounded-lg border border-rose-200 bg-rose-50/60 p-3.5 space-y-1">
              <div className="font-semibold text-rose-950">Sycophancy Over Time (Ibrahim et al., arXiv:2605.07912)</div>
              <p className="text-stone-700">
                Users prefer sycophantic AI in the moment, but exposure over time reduces satisfaction with human interactions and shifts preference toward AI over humans.
              </p>
            </div>
          </div>
        )}
      </section>

      <section className="rounded-xl border border-stone-200 bg-white p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-indigo-600" />
          <h3 className="text-sm font-semibold text-stone-900">
            2. Concrete Governance & Reevaluation Triggers
          </h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 text-xs text-stone-700">
          <div className="rounded-lg border border-stone-200 bg-stone-50 p-3.5 space-y-1">
            <div className="font-semibold text-stone-900">Assign Clear Roles</div>
            <p>Name who owns the question, defines criteria, represents affected users (consultation vs. decision authority), reviews methods, accepts risk, and triggers reevaluation.</p>
            <p className="text-amber-900 flex items-center gap-1 pt-1">
              <Shield className="h-3.5 w-3.5 shrink-0" />
              Evaluate oversight itself: does the reviewer have time, expertise, and authority?
            </p>
          </div>
          <div className="rounded-lg border border-stone-200 bg-stone-50 p-3.5 space-y-1">
            <div className="font-semibold text-stone-900">Trigger Reevaluation Proportionately</div>
            <p>Reevaluate when models, prompts, retrieval, tools, users, rubrics, or incident patterns change. Version product and evaluator separately, and note that post-deployment monitoring methods remain evolving (NIST).</p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Lesson 9: Worked Example, Epistemic Reporting & Protocol Builder           */
/* -------------------------------------------------------------------------- */
export function Lesson9Practice() {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({ 0: true });
  const [copied, setCopied] = useState(false);
  const [protocolValues, setProtocolValues] = useState<Record<string, string>>({});
  const [stmt, setStmt] = useState({
    system: 'Research Assistant v2.1',
    targets: 'source fidelity and synthesis quality for empirical-paper comparison',
    baseline: 'existing manual synthesis workflow',
    methods: 'source-grounded claim review and a blinded comparative task study',
    finding: 'higher source-fidelity scores on supplied English empirical papers',
    untested: 'net productivity gains across routine multi-week workflows',
    action: 'a restricted pilot with mandatory source-passage links',
    owner: 'Evaluation & Product Lead',
  });

  const statementText = `We evaluated ${stmt.system} for ${stmt.targets}, compared with ${stmt.baseline}, using ${stmt.methods}.

The observations support ${stmt.finding}. Important limitations remain, and the evaluation does not establish ${stmt.untested}.

We recommend ${stmt.action}. Accountable decision-maker: ${stmt.owner}.`;

  const copyStatement = async () => {
    await navigator.clipboard.writeText(statementText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Worked Example */}
      <section className="rounded-xl border border-stone-200 bg-white p-5 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <FileSearch className="h-4 w-4 text-indigo-600" />
            <h3 className="text-sm font-semibold text-stone-900">
              1. Worked Example: Illustrative Research Assistant (Fictional Design)
            </h3>
          </div>
          <span className="text-[11px] text-stone-500">No empirical findings implied</span>
        </div>
        <p className="text-xs text-stone-700 leading-relaxed">
          To decide on a restricted pilot, combine <strong>intrinsic</strong> source-fidelity rubrics (catching observational-to-causal misrepresentations) with an <strong>extrinsic</strong> blinded comparative study of researchers’ completed syntheses—then tie decisions directly to what the evidence shows (e.g., if summaries improve but final syntheses do not, investigate workflow integration).
        </p>
      </section>

      {/* Claim Calibration */}
      <section className="rounded-xl border border-stone-200 bg-white p-5 space-y-3">
        <h3 className="text-sm font-semibold text-stone-900">
          2. Calibrate Overextended Claims (Click to reveal)
        </h3>
        <div className="space-y-2">
          {REPORTING_CLAIMS.slice(0, 5).map((item, idx) => {
            const open = !!revealed[idx];
            return (
              <div key={item.overextended} className="rounded-lg border border-stone-200 overflow-hidden">
                <button
                  onClick={() => setRevealed((p) => ({ ...p, [idx]: !p[idx] }))}
                  className="flex w-full items-center justify-between bg-stone-50 px-3.5 py-2.5 text-left text-xs hover:bg-stone-100"
                >
                  <span className="font-medium text-rose-900">Overextended: {item.overextended}</span>
                  <span className="inline-flex items-center gap-1 text-indigo-700 font-medium">
                    <Eye className="h-3.5 w-3.5" />
                    {open ? 'Hide' : 'Calibrate'}
                  </span>
                </button>
                {open && (
                  <div className="bg-white px-3.5 py-2.5 text-xs border-t border-stone-200 space-y-1">
                    <div className="text-emerald-900">
                      <strong>Defensible:</strong> {item.defensible}
                    </div>
                    <div className="text-stone-600">
                      <strong>Why:</strong> {item.why}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Decision Statement + Protocol */}
      <section className="rounded-xl border border-stone-200 bg-white p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-stone-900">
            3. Bounded Decision Statement & 12-Field Protocol
          </h3>
          <button
            onClick={copyStatement}
            className="inline-flex items-center gap-1 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-stone-800"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied' : 'Copy Statement'}
          </button>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2 text-xs">
          {(
            [
              ['system', 'System & Version'],
              ['baseline', 'Comparator'],
              ['finding', 'Bounded Finding'],
              ['untested', 'Material Untested Claim'],
            ] as const
          ).map(([k, label]) => (
            <label key={k} className="block font-medium text-stone-700">
              {label}
              <input
                value={stmt[k]}
                onChange={(e) => setStmt((s) => ({ ...s, [k]: e.target.value }))}
                className="mt-1 w-full rounded border border-stone-300 px-2.5 py-1 text-xs"
              />
            </label>
          ))}
        </div>

        <pre className="whitespace-pre-wrap rounded-lg border border-indigo-200 bg-indigo-50/40 p-3.5 font-sans text-xs leading-relaxed text-stone-800">
          {statementText}
        </pre>

        <details className="rounded-lg border border-stone-200 bg-stone-50 p-3 text-xs">
          <summary className="cursor-pointer font-semibold text-stone-900">
            Open 12-Field Companion Protocol Worksheet
          </summary>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {PROTOCOL_FIELDS.map((f) => (
              <label key={f.id} className="block">
                <span className="font-medium text-stone-800">{f.label}</span>
                <textarea
                  rows={2}
                  placeholder={f.placeholder}
                  value={protocolValues[f.id] ?? ''}
                  onChange={(e) => setProtocolValues((p) => ({ ...p, [f.id]: e.target.value }))}
                  className="mt-1 w-full rounded border border-stone-200 bg-white px-2 py-1 text-xs"
                />
              </label>
            ))}
          </div>
        </details>
      </section>
    </div>
  );
}

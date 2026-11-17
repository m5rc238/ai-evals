import { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Compass,
  Info,
  Layers,
  RefreshCw,
  ShieldAlert,
} from 'lucide-react';
import {
  EVIDENCE_METHODS,
  FLOW_NODES,
  SAMPLING_PURPOSES,
  SCOPES,
  STATEMENT_TYPES,
  TARGET_INVENTORY,
} from '../data/evalsData';

/* -------------------------------------------------------------------------- */
/* Lesson 1: Foundations & Epistemic Discipline                               */
/* -------------------------------------------------------------------------- */
export function Lesson1Foundations() {
  const [selectedId, setSelectedId] = useState('purpose');
  const [stmtIdx, setStmtIdx] = useState(0);
  const selectedNode = FLOW_NODES.find((n) => n.id === selectedId) ?? FLOW_NODES[0];

  const coreNodes = FLOW_NODES.filter((n) => n.layer === 'core');
  const crossNodes = FLOW_NODES.filter((n) => n.layer === 'cross-cutting');
  const outerNodes = FLOW_NODES.filter((n) => n.layer === 'outer');

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-stone-200 bg-white p-5 space-y-2 text-sm text-stone-700">
        <p className="font-medium text-stone-900">
          AI evaluation is the systematic collection and interpretation of evidence about an AI model, system, its use, or its effects, against explicit questions and criteria, to inform understanding or decisions.
        </p>
        <p className="text-xs text-stone-600 flex items-start gap-2">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
          <span>
            <strong>Framework status:</strong> This synthesis is an organizing guide—not a recognized standard, empirically validated taxonomy, or guarantee of completeness.
          </span>
        </p>
      </div>

      {/* Chunk 1: Three Statement Types */}
      <section className="space-y-2.5">
        <h3 className="text-sm font-semibold text-stone-900">
          1. Separate Three Kinds of Statements
        </h3>
        <div className="grid gap-2.5 sm:grid-cols-3">
          {STATEMENT_TYPES.map((st, idx) => (
            <button
              key={st.type}
              onClick={() => setStmtIdx(idx)}
              className={`rounded-xl border p-3.5 text-left transition ${
                stmtIdx === idx
                  ? 'border-indigo-500 bg-indigo-50/50 ring-1 ring-indigo-500'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <div className="text-xs font-semibold text-stone-900">{st.type}</div>
              <p className="mt-1 text-xs text-stone-600">{st.description}</p>
            </button>
          ))}
        </div>
        <div className="rounded-lg border border-stone-200 bg-stone-100/70 px-3.5 py-2.5 text-xs text-stone-700">
          <strong>Example ({STATEMENT_TYPES[stmtIdx].type}):</strong>{' '}
          <em>{STATEMENT_TYPES[stmtIdx].example}</em>
        </div>
      </section>

      {/* Chunk 2: Interactive Landscape Map */}
      <section className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-stone-900">
            2. Explore the 10-Element Landscape (Click any step)
          </h3>
          <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-0.5 text-[11px] font-medium text-stone-600">
            <RefreshCw className="h-3 w-3" />
            Iterative, not rigid
          </span>
        </div>

        <div className="rounded-xl border-2 border-dashed border-indigo-300 bg-indigo-50/30 p-3.5 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-800">
              Outer Layer: Evaluation Quality
            </span>
            {outerNodes.map((n) => (
              <button
                key={n.id}
                onClick={() => setSelectedId(n.id)}
                className={`rounded-md border px-2.5 py-1 text-xs font-medium ${
                  selectedId === n.id
                    ? 'border-indigo-600 bg-indigo-600 text-white'
                    : 'border-indigo-200 bg-white text-indigo-900'
                }`}
              >
                {n.number}. {n.title}
              </button>
            ))}
          </div>

          <div className="rounded-lg border border-amber-300 bg-amber-50/60 p-3 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-900">
                Cross-Cutting: Governance & Lifecycle
              </span>
              <div className="flex gap-1.5">
                {crossNodes.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => setSelectedId(n.id)}
                    className={`rounded-md border px-2.5 py-1 text-xs font-medium ${
                      selectedId === n.id
                        ? 'border-amber-600 bg-amber-600 text-white'
                        : 'border-amber-200 bg-white text-amber-900'
                    }`}
                  >
                    {n.number}. {n.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-stone-200 bg-white p-3 flex flex-wrap items-center gap-1.5">
              {coreNodes.map((n, i) => (
                <div key={n.id} className="flex items-center gap-1.5">
                  <button
                    onClick={() => setSelectedId(n.id)}
                    className={`rounded-md border px-2.5 py-1.5 text-xs font-medium transition ${
                      selectedId === n.id
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 bg-stone-50 text-stone-800 hover:bg-stone-100'
                    }`}
                  >
                    {n.number}. {n.title}
                  </button>
                  {i < coreNodes.length - 1 && (
                    <ArrowRight className="h-3 w-3 text-stone-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-stone-100 pb-2">
            <h4 className="font-semibold text-stone-900">
              {selectedNode.number}. {selectedNode.title}
            </h4>
            <span className="text-xs italic text-stone-600">“{selectedNode.question}”</span>
          </div>
          <p className="text-xs leading-relaxed text-stone-700">{selectedNode.summary}</p>
          <div className="grid gap-2.5 sm:grid-cols-2 text-xs">
            <div className="rounded-lg bg-emerald-50/70 border border-emerald-200 p-2.5 text-emerald-950">
              <div className="font-semibold flex items-center gap-1">
                <Layers className="h-3.5 w-3.5" /> Practical output
              </div>
              <p className="mt-1">{selectedNode.practicalOutput}</p>
            </div>
            <div className="rounded-lg bg-rose-50/70 border border-rose-200 p-2.5 text-rose-950">
              <div className="font-semibold flex items-center gap-1">
                <ShieldAlert className="h-3.5 w-3.5" /> Common pitfall
              </div>
              <p className="mt-1">{selectedNode.caution}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Lesson 2: Why Human-AI Interaction Changes Everything (CS 329X + SPHERE)   */
/* -------------------------------------------------------------------------- */
export function Lesson2HumanAI() {
  const [sphereIdx, setSphereIdx] = useState(0);
  const sphereItems = [
    {
      q: '1. How are we evaluating?',
      focus: 'Quantitative vs. Qualitative · Intrinsic vs. Extrinsic',
      detail: 'Track real interaction signals—not just offline benchmark accuracy. Pair fast intrinsic gates with extrinsic validation before deployment.',
    },
    {
      q: '2. What is being evaluated?',
      focus: 'Goals → Tasks → Data · Outcomes, Skill & Reliance',
      detail: 'Measure skill retention, offloading, opinion drift, and actual task outcomes—not just self-reported speed.',
    },
    {
      q: '3. Who is evaluating?',
      focus: 'Target Group · Experts · Lay Users · Simulated Users',
      detail: 'Systems are built for specific users. Whose values are encoded in feedback matters, and LLM-simulated users produce caricatures.',
    },
    {
      q: '4. When do we evaluate?',
      focus: 'Short-term vs. Long-term · Familiarization & Drift',
      detail: 'Evaluate over realistic horizons. Familiarization unlocks customization, while sycophancy liked in the moment erodes trust over time.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-stone-200 bg-white p-5 space-y-3">
        <h3 className="text-sm font-semibold text-stone-900">
          Interaction Is the New Interface
        </h3>
        <p className="text-sm text-stone-700">
          Most enterprise AI today is <strong>interaction</strong> (copilots, assistants, agents), not full autonomy. The interaction layer is where value is won or lost:
        </p>
        <div className="grid gap-3 sm:grid-cols-2 text-xs">
          <div className="rounded-lg border border-rose-200 bg-rose-50/70 p-3 text-rose-950">
            <div className="font-semibold">Bad interaction</div>
            <p className="mt-1">Quietly degrades decisions via <strong>sycophancy</strong> and <strong>deskilling</strong>.</p>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-3 text-emerald-950">
            <div className="font-semibold">Good interaction</div>
            <p className="mt-1">Produces <strong>augmented judgment</strong> and <strong>faster decisions</strong>.</p>
          </div>
        </div>
      </div>

      {/* SPHERE Framework */}
      <section className="rounded-xl border border-stone-200 bg-white p-5 space-y-3">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-sm font-semibold text-stone-900">
            The SPHERE Evaluation Card (Ma et al., 2025)
          </h3>
          <span className="text-[11px] text-stone-500">arXiv:2504.07971</span>
        </div>
        <div className="grid gap-2 sm:grid-cols-4">
          {sphereItems.map((item, idx) => (
            <button
              key={item.q}
              onClick={() => setSphereIdx(idx)}
              className={`rounded-lg border p-2.5 text-left text-xs transition ${
                sphereIdx === idx
                  ? 'border-indigo-600 bg-indigo-50 font-semibold text-indigo-950'
                  : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
              }`}
            >
              {item.q}
            </button>
          ))}
        </div>
        <div className="rounded-lg border border-indigo-200 bg-indigo-50/40 p-3.5 text-xs space-y-1">
          <div className="font-semibold text-indigo-900">{sphereItems[sphereIdx].focus}</div>
          <p className="text-stone-700">{sphereItems[sphereIdx].detail}</p>
        </div>
      </section>

      {/* Vaccaro et al. 2024 */}
      <section className="rounded-xl border border-stone-200 bg-white p-5 space-y-3">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-sm font-semibold text-stone-900">
            Empirical Reality Check: When Are Human–AI Combinations Useful?
          </h3>
          <span className="text-[11px] text-stone-500">
            Vaccaro, Almaatouq & Malone, Nature Human Behaviour (2024)
          </span>
        </div>
        <p className="text-xs text-stone-700 leading-relaxed">
          Across <strong>370 effect sizes</strong>, human–AI combinations outperformed humans alone on average (<em>g</em> = 0.64), <strong>but performed significantly worse than the best of humans or AI alone</strong> (<em>g</em> = −0.23).
        </p>
        <div className="grid gap-2.5 sm:grid-cols-2 text-xs">
          <div className="rounded-lg border border-rose-200 bg-rose-50/50 p-3">
            <div className="font-semibold text-rose-900">Where losses occurred</div>
            <p className="mt-1 text-stone-700">
              <strong>Decision-making tasks</strong>, and when <strong>AI alone outperformed humans</strong>.
            </p>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-3">
            <div className="font-semibold text-emerald-900">Where gains occurred</div>
            <p className="mt-1 text-stone-700">
              <strong>Content-creation tasks</strong>, and when <strong>humans outperformed AI alone</strong>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Lesson 3: Purpose, Scope, Targets & Modes                                  */
/* -------------------------------------------------------------------------- */
export function Lesson3Framing() {
  const [scopeId, setScopeId] = useState('product');
  const [targetName, setTargetName] = useState(TARGET_INVENTORY[1].name);
  const [mode, setMode] = useState<'exploratory' | 'confirmatory'>('confirmatory');
  const [system, setSystem] = useState('the research assistant v2.1');
  const [population, setPopulation] = useState('researchers comparing empirical papers');
  const [comparator, setComparator] = useState('their existing manual workflow');
  const [outcome, setOutcome] = useState('improve synthesis quality');

  const scope = SCOPES.find((s) => s.id === scopeId) ?? SCOPES[0];

  return (
    <div className="space-y-6">
      {/* Scope x Target */}
      <section className="rounded-xl border border-stone-200 bg-white p-5 space-y-4">
        <h3 className="text-sm font-semibold text-stone-900">
          1. Separate Scope from Target (and Define Agents as Model + Harness)
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            {SCOPES.map((s) => (
              <button
                key={s.id}
                onClick={() => setScopeId(s.id)}
                className={`w-full rounded-lg border px-3 py-2 text-left text-xs transition ${
                  scopeId === s.id
                    ? 'border-indigo-500 bg-indigo-50 font-semibold text-indigo-950'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap gap-1.5">
              {TARGET_INVENTORY.slice(0, 8).map((t) => (
                <button
                  key={t.name}
                  onClick={() => setTargetName(t.name)}
                  className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                    targetName === t.name
                      ? 'border-stone-900 bg-stone-900 text-white'
                      : 'border-stone-200 bg-stone-50 text-stone-700'
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>

            <div className="rounded-lg border border-stone-200 bg-stone-50 p-3 text-xs space-y-1.5">
              <div className="font-semibold text-stone-900">
                {scope.name} × {targetName}
              </div>
              <p className="text-stone-700"><strong>Boundary:</strong> {scope.boundary}</p>
              <div className="flex items-start gap-1.5 text-amber-900 bg-amber-50 border border-amber-200 rounded p-2">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-600" />
                <span>{scope.transferWarning}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exploratory vs Confirmatory */}
      <section className="rounded-xl border border-stone-200 bg-white p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-stone-900">
            2. Exploratory vs. Confirmatory Mode
          </h3>
          <div className="inline-flex rounded-lg border border-stone-200 bg-stone-100 p-0.5 text-xs">
            <button
              onClick={() => setMode('exploratory')}
              className={`rounded-md px-2.5 py-1 font-medium ${
                mode === 'exploratory' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
              }`}
            >
              Exploratory
            </button>
            <button
              onClick={() => setMode('confirmatory')}
              className={`rounded-md px-2.5 py-1 font-medium ${
                mode === 'confirmatory' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
              }`}
            >
              Confirmatory
            </button>
          </div>
        </div>
        <div className="rounded-lg bg-stone-50 p-3 text-xs text-stone-700 flex items-start gap-2">
          {mode === 'exploratory' ? (
            <>
              <Compass className="h-4 w-4 shrink-0 text-indigo-600 mt-0.5" />
              <span>
                <strong>Exploratory:</strong> Discover failures, needs, and explanations. Criteria may evolve as you inspect traces—just disclose it and do not present tuned runs as an independent confirmatory test.
              </span>
            </>
          ) : (
            <>
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 mt-0.5" />
              <span>
                <strong>Confirmatory:</strong> Test a specified claim or decision rule. Lock main outcomes, comparisons, analyses, and thresholds <em>before</em> inspecting confirmatory results.
              </span>
            </>
          )}
        </div>
      </section>

      {/* Compact Question Builder */}
      <section className="rounded-xl border border-stone-200 bg-white p-5 space-y-3">
        <h3 className="text-sm font-semibold text-stone-900">
          3. Formulate a Sharp Evaluation Question
        </h3>
        <div className="grid gap-2.5 sm:grid-cols-2 text-xs">
          <input
            value={population}
            onChange={(e) => setPopulation(e.target.value)}
            placeholder="Population & task"
            className="rounded-lg border border-stone-300 px-3 py-1.5"
          />
          <input
            value={system}
            onChange={(e) => setSystem(e.target.value)}
            placeholder="System & version"
            className="rounded-lg border border-stone-300 px-3 py-1.5"
          />
          <input
            value={outcome}
            onChange={(e) => setOutcome(e.target.value)}
            placeholder="Desired outcome"
            className="rounded-lg border border-stone-300 px-3 py-1.5"
          />
          <input
            value={comparator}
            onChange={(e) => setComparator(e.target.value)}
            placeholder="Comparator / baseline"
            className="rounded-lg border border-stone-300 px-3 py-1.5"
          />
        </div>
        <div className="rounded-lg border border-indigo-200 bg-indigo-50/40 p-3 text-xs font-medium text-stone-900">
          “For {population}, does {system} {outcome} compared with {comparator}?”
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Lesson 4: Who Evaluates & Context Coverage                                 */
/* -------------------------------------------------------------------------- */
export function Lesson4WhoAndContext() {
  const [group, setGroup] = useState<'target' | 'crowd' | 'simulated'>('simulated');

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-stone-200 bg-white p-5 space-y-3">
        <h3 className="text-sm font-semibold text-stone-900">
          1. Who Is Evaluating? (Click to compare)
        </h3>
        <p className="text-xs text-stone-600">
          Systems are built for specific users. Human factors (expertise, demographics, context) shape evaluation results—and results rarely transfer across groups.
        </p>

        <div className="grid gap-2 sm:grid-cols-3 text-xs">
          <button
            onClick={() => setGroup('target')}
            className={`rounded-lg border p-3 text-left font-medium ${
              group === 'target' ? 'border-indigo-600 bg-indigo-50 text-indigo-950' : 'border-stone-200'
            }`}
          >
            Target Users & Domain Experts
          </button>
          <button
            onClick={() => setGroup('crowd')}
            className={`rounded-lg border p-3 text-left font-medium ${
              group === 'crowd' ? 'border-indigo-600 bg-indigo-50 text-indigo-950' : 'border-stone-200'
            }`}
          >
            Crowd / Feedback Annotators
          </button>
          <button
            onClick={() => setGroup('simulated')}
            className={`rounded-lg border p-3 text-left font-medium ${
              group === 'simulated' ? 'border-indigo-600 bg-indigo-50 text-indigo-950' : 'border-stone-200'
            }`}
          >
            LLM-Simulated Users
          </button>
        </div>

        <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 text-xs text-stone-700 space-y-1.5">
          {group === 'target' && (
            <>
              <div className="font-semibold text-stone-900">Target Group & Domain Experts</div>
              <p>Recruit the actual intended users (e.g., teachers, clinicians, researchers). Results from lay users or general benchmarks do not transfer to specialist workflows.</p>
            </>
          )}
          {group === 'crowd' && (
            <>
              <div className="font-semibold text-stone-900">Whose Values Get Aligned?</div>
              <p>Human preferences can be noisy and value-laden. Audit whose values your feedback data represents—especially when feedback comes from underpaid crowd workers rather than affected users.</p>
            </>
          )}
          {group === 'simulated' && (
            <>
              <div className="font-semibold text-stone-900">Caricature Risk (CoMPosT, Cheng et al., EMNLP 2023)</div>
              <p>While Argyle et al. (2023) explored simulating human samples, CoMPosT showed LLM simulations of sociocultural groups (political ideology, race/ethnicity, marginalized personas) produce <strong>exaggerated caricatures</strong>. Use simulation only for early sanity checks—never as a replacement for real users.</p>
            </>
          )}
        </div>
      </section>

      <section className="rounded-xl border border-stone-200 bg-white p-5 space-y-2.5 text-xs text-stone-700">
        <h3 className="text-sm font-semibold text-stone-900">
          2. Document Context & Missing Coverage
        </h3>
        <p>
          Specify tasks, user expertise, languages, accessibility needs, input formats, tools/permissions, stakes, and plausible misuse. Following <strong>HELM</strong>, treat a map of <em>what remains untested</em> as part of the result.
        </p>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Lesson 5: How We Evaluate — Methods, Intrinsic/Extrinsic & Sampling        */
/* -------------------------------------------------------------------------- */
export function Lesson5Methods() {
  const [view, setView] = useState<'quant-qual' | 'intrinsic-extrinsic' | 'coding'>('intrinsic-extrinsic');

  return (
    <div className="space-y-6">
      <div className="inline-flex flex-wrap rounded-lg border border-stone-200 bg-white p-1 text-xs">
        <button
          onClick={() => setView('intrinsic-extrinsic')}
          className={`rounded-md px-3 py-1.5 font-medium ${
            view === 'intrinsic-extrinsic' ? 'bg-stone-900 text-white' : 'text-stone-700'
          }`}
        >
          Intrinsic vs. Extrinsic
        </button>
        <button
          onClick={() => setView('quant-qual')}
          className={`rounded-md px-3 py-1.5 font-medium ${
            view === 'quant-qual' ? 'bg-stone-900 text-white' : 'text-stone-700'
          }`}
        >
          Quantitative vs. Qualitative
        </button>
        <button
          onClick={() => setView('coding')}
          className={`rounded-md px-3 py-1.5 font-medium ${
            view === 'coding' ? 'bg-stone-900 text-white' : 'text-stone-700'
          }`}
        >
          Coding Agents: SWE-bench vs. ProgramBench
        </button>
      </div>

      {view === 'intrinsic-extrinsic' && (
        <div className="rounded-xl border border-stone-200 bg-white p-5 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2 text-xs">
            <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-3.5 space-y-1">
              <div className="font-semibold text-emerald-950">Intrinsic: How’s the model by itself?</div>
              <p className="text-stone-700">Automated (reference-based, LLM judge), human ranking/scoring, or engagement signals.</p>
              <p className="text-emerald-900"><strong>Pros:</strong> Fast feedback, easy comparison. <strong>Cons:</strong> Narrow scope, weak real-world prediction.</p>
            </div>
            <div className="rounded-lg border border-indigo-200 bg-indigo-50/60 p-3.5 space-y-1">
              <div className="font-semibold text-indigo-950">Extrinsic: How helpful in downstream tasks?</div>
              <p className="text-stone-700">Measures behavioral impacts, self-efficacy, and standardized assessments in real tasks.</p>
              <p className="text-indigo-900"><strong>Pros:</strong> Holistic, generalizable, user-aligned. <strong>Cons:</strong> Resource-intensive and slower.</p>
            </div>
          </div>
          <div className="rounded-lg bg-stone-50 p-3 text-xs text-stone-700">
            <strong>Case — Rehearsal (Shaikh et al., SIGCHI 2024):</strong> Intrinsic ecological validity (Interests-Rights-Power prompting) scored high on TrueSkill, while an extrinsic user study (<em>N</em> = 40) showed users used significantly more cooperative strategies in actual conflicts—even though declarative knowledge recall did not significantly differ.
          </div>
        </div>
      )}

      {view === 'quant-qual' && (
        <div className="rounded-xl border border-stone-200 bg-white p-5 grid gap-3 sm:grid-cols-2 text-xs">
          <div className="rounded-lg border border-stone-200 bg-stone-50 p-3.5 space-y-1">
            <div className="font-semibold text-stone-900">Quantitative (“What” & “How much”)</div>
            <p className="text-stone-700">Surveys, experiments, accuracy, completion rates, time. Establishes quantifiable relations via tables and statistics.</p>
          </div>
          <div className="rounded-lg border border-stone-200 bg-stone-50 p-3.5 space-y-1">
            <div className="font-semibold text-stone-900">Qualitative (“Why” & “How”)</div>
            <p className="text-stone-700">Interviews, observations, trace analysis. Explains frustrations, expectations, and processes through rich context.</p>
          </div>
        </div>
      )}

      {view === 'coding' && (
        <div className="rounded-xl border border-stone-200 bg-white p-5 grid gap-3 sm:grid-cols-2 text-xs">
          <div className="rounded-lg border border-stone-200 bg-stone-50 p-3.5 space-y-1">
            <div className="font-semibold text-stone-900">SWE-bench (Jimenez et al., 2023)</div>
            <p className="text-stone-700">Evaluates patches on real GitHub issues via unit tests—testing internal implementation details.</p>
          </div>
          <div className="rounded-lg border border-indigo-200 bg-indigo-50/50 p-3.5 space-y-1">
            <div className="font-semibold text-indigo-950">ProgramBench</div>
            <p className="text-stone-700">Evaluates against artifacts/docs via behavioral tests (e.g., running the compiled binary and diffing outputs)—implementation-agnostic.</p>
          </div>
        </div>
      )}

      {/* Sampling Purposes */}
      <section className="rounded-xl border border-stone-200 bg-white p-5 space-y-3">
        <h3 className="text-sm font-semibold text-stone-900">
          Keep Sampling Purposes & Methods Distinct ({EVIDENCE_METHODS.length} Methods · 4 Sampling Types)
        </h3>
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4 text-xs">
          {SAMPLING_PURPOSES.map((sp) => (
            <div key={sp.name} className="rounded-lg border border-stone-200 bg-stone-50 p-3 space-y-1">
              <div className="font-semibold text-stone-900">{sp.name}</div>
              <p className="text-stone-600">{sp.role}</p>
              <p className="font-medium text-amber-800">{sp.warning}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

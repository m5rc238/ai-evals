import { useState } from 'react';
import { AlertCircle, CheckSquare, Database, Scale, Layers } from 'lucide-react';
import { EVIDENCE_METHODS, SAMPLING_PURPOSES } from '../data/evalsData';

const CONSTRUCT_CHAIN = [
  { step: 'Construct', detail: 'Source fidelity' },
  { step: 'Criterion', detail: 'Material claims accurately represent the cited evidence.' },
  { step: 'Observable evidence', detail: 'Generated claims paired with relevant source passages.' },
  { step: 'Measurement procedure', detail: 'Review each claim against specified support rules.' },
  { step: 'Metric', detail: 'Proportion of applicable claims meeting those rules.' },
  { step: 'Interpretation', detail: 'Bounded conclusion about fidelity under evaluated conditions.' },
];

const GRADERS = [
  {
    name: 'Code-based checks',
    uses: 'Schemas, calculations, execution results, explicit state changes, defined constraints.',
    check: 'Does the check capture the requirement and accept valid alternatives?',
  },
  {
    name: 'Human assessment',
    uses: 'Domain correctness, contextual appropriateness, nuanced failures, lived experience.',
    check: 'Do reviewers have the needed evidence, expertise, and clear rubrics?',
  },
  {
    name: 'Model-based assessment',
    uses: 'Scaling defined judgments that can be validated for a specific use.',
    check: 'Does the judge detect consequential failures, avoid false alarms, and pass local bias checks (position, verbosity, self-enhancement)?',
  },
  {
    name: 'Hybrid assessment',
    uses: 'Combining direct verification, judgment, and escalation.',
    check: 'Are responsibilities and unresolved cases handled consistently?',
  },
];

export function MeasurementStudio() {
  const [chainIdx, setChainIdx] = useState(0);
  const [showSeverityTrap, setShowSeverityTrap] = useState(false);

  return (
    <div className="space-y-8">
      {/* Construct-to-Interpretation Stepper */}
      <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-stone-900">
            1. From Construct to Bounded Interpretation
          </h2>
          <p className="text-sm text-stone-600">
            Criteria define what matters; rubrics and metrics operationalize them. Click each step to trace the <em>Source Fidelity</em> example.
          </p>
        </div>

        <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {CONSTRUCT_CHAIN.map((item, idx) => (
            <button
              key={item.step}
              onClick={() => setChainIdx(idx)}
              className={`rounded-lg border p-3 text-left transition ${
                chainIdx === idx
                  ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600'
                  : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
              }`}
            >
              <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                Step {idx + 1}
              </div>
              <div className="mt-0.5 text-xs font-semibold text-stone-900">{item.step}</div>
            </button>
          ))}
        </div>

        <div className="rounded-lg border border-indigo-200 bg-indigo-50/40 p-4 text-sm text-stone-800">
          <span className="font-semibold text-indigo-900">{CONSTRUCT_CHAIN[chainIdx].step}: </span>
          {CONSTRUCT_CHAIN[chainIdx].detail}
        </div>

        <div className="rounded-lg border border-stone-200 bg-stone-50 p-4 text-xs text-stone-700 space-y-1">
          <div className="font-semibold text-stone-900">Three Criterion Lenses & 8 Documentation Fields</div>
          <p>
            Surface criteria using <strong>Technical</strong> (correctness, grounding, reliability), <strong>Policy & constraints</strong> (permissions, confidentiality, prohibited actions), and <strong>Human & contextual</strong> (goal achievement, clarity, effort, accessibility) lenses. Document each criterion’s <em>Definition, Importance, Observable evidence, Assessment unit, Scoring rule, Anchors, Applicability,</em> and <em>Limitations</em>.
          </p>
        </div>
      </section>

      {/* Evidence Collection & Sampling */}
      <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-stone-900">
            2. Evidence Methods & Sampling Purposes
          </h2>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {EVIDENCE_METHODS.map((m) => (
            <div key={m.name} className="rounded-lg border border-stone-200 p-3.5 space-y-1.5">
              <div className="text-sm font-semibold text-stone-900">{m.name}</div>
              <p className="text-xs text-stone-700">
                <strong>Establishes:</strong> {m.establishes}
              </p>
              <p className="text-xs text-rose-800">
                <strong>Limit:</strong> {m.limitation}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Keep Sampling Purposes Distinct
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SAMPLING_PURPOSES.map((sp) => (
              <div key={sp.name} className="rounded-lg border border-stone-200 bg-stone-50 p-3 text-xs space-y-1">
                <div className="font-semibold text-stone-900">{sp.name}</div>
                <p className="text-stone-700">{sp.role}</p>
                <p className="font-medium text-amber-800">{sp.warning}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Output Quality vs Task Success vs Human Outcomes */}
      <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-stone-900">
            3. Output Quality ≠ Task Success ≠ Human Outcomes
          </h2>
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          {[
            { t: 'Output quality', d: 'A summary accurately represents the supplied paper.' },
            { t: 'System task success', d: 'The assistant retrieves and organizes the required evidence correctly.' },
            { t: 'Human outcome', d: 'A researcher produces a more accurate or useful synthesis using the assistant.' },
            { t: 'Organizational outcome', d: 'The workflow improves after accounting for review, maintenance, and coordination.' },
          ].map((item, i) => (
            <div key={item.t} className="rounded-lg border border-stone-200 bg-stone-50 p-3.5 text-xs space-y-1">
              <div className="font-semibold text-stone-900">{i + 1}. {item.t}</div>
              <p className="text-stone-700">{item.d}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-stone-600">
          <strong>Precedent:</strong> METR’s randomized study of early-2025 coding tools with experienced developers assessed effects on completed work directly rather than inferring productivity from model benchmarks. Its findings concern that study’s specific tools, participants, tasks, and period—not all AI-assisted development.
        </p>
      </section>

      {/* Grading & Aggregation Trap */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-stone-900">
              4. Grading Mechanisms & Validation
            </h2>
          </div>
          <div className="space-y-2.5">
            {GRADERS.map((g) => (
              <div key={g.name} className="rounded-lg border border-stone-200 p-3 text-xs space-y-1">
                <div className="font-semibold text-stone-900">{g.name}</div>
                <p className="text-stone-700"><strong>Uses:</strong> {g.uses}</p>
                <p className="text-indigo-800"><strong>Check needed:</strong> {g.check}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-indigo-600" />
              <h2 className="text-lg font-semibold text-stone-900">
                5. The Single-Score Aggregation Trap
              </h2>
            </div>
            <button
              onClick={() => setShowSeverityTrap((v) => !v)}
              className="rounded-lg border border-indigo-300 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-800 hover:bg-indigo-100"
            >
              {showSeverityTrap ? 'View Disaggregated Profile' : 'Collapse into Single Score'}
            </button>
          </div>

          <p className="text-xs text-stone-600">
            Example: 100 evaluated tasks with 95 passes, 4 minor formatting issues, and 1 unauthorized data disclosure.
          </p>

          {showSeverityTrap ? (
            <div className="rounded-xl border border-rose-300 bg-rose-50 p-5 text-center space-y-2">
              <div className="text-3xl font-bold text-rose-900">95% Pass Rate</div>
              <p className="text-xs text-rose-800">
                <strong>Hidden risk:</strong> Treating every failure as “1 fail” makes 4 minor formatting issues look worse than 1 unauthorized disclosure, concealing severity, recoverability, and who bears the harm.
              </p>
            </div>
          ) : (
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                <span className="font-semibold text-emerald-900">Passed all criteria</span>
                <span className="font-mono font-bold text-emerald-900">95 / 100</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 p-3">
                <div>
                  <div className="font-semibold text-amber-900">Minor formatting issue</div>
                  <div className="text-amber-800">Low severity · easily detected & recovered</div>
                </div>
                <span className="font-mono font-bold text-amber-900">4 / 100</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-rose-300 bg-rose-50 p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-700" />
                  <div>
                    <div className="font-semibold text-rose-900">Unauthorized disclosure (Mandatory Constraint)</div>
                    <div className="text-rose-800">Critical severity · irreversible harm</div>
                  </div>
                </div>
                <span className="font-mono font-bold text-rose-900">1 / 100</span>
              </div>
            </div>
          )}

          <p className="text-xs text-stone-600">
            Keep <strong>frequency</strong>, <strong>severity</strong>, <strong>detectability/recoverability</strong>, <strong>affected subgroups</strong>, and <strong>retry policies</strong> explicit.
          </p>
        </section>
      </div>
    </div>
  );
}

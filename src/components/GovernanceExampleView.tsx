import { useState } from 'react';
import { Clock, FileSearch, Shield, Users } from 'lucide-react';

const CONDITIONAL_OUTCOMES = [
  {
    scenario: 'Output summaries improve, but researchers’ final syntheses do not',
    action: 'Investigate how researchers actually use and integrate the assistant into their workflow before claiming benefit.',
  },
  {
    scenario: 'Faster completion accompanies more consequential errors',
    action: 'Expose and evaluate that speed-vs.-accuracy trade-off before expanding use.',
  },
  {
    scenario: 'Benefits appear only for specific tasks or user groups',
    action: 'Consider a restricted pilot for those tasks/users and targeted investigation of the gaps.',
  },
  {
    scenario: 'Uncertainty remains large across key outcomes',
    action: 'Gather more informative evidence rather than declaring equivalence or rushing a release.',
  },
];

export function GovernanceExampleView() {
  const [selectedOutcome, setSelectedOutcome] = useState(0);

  return (
    <div className="space-y-8">
      {/* Governance & Lifecycle */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-stone-900">
              1. Concrete Governance Roles
            </h2>
          </div>
          <p className="text-sm text-stone-600">
            Consistent with NIST’s AI RMF, governance applies across the lifecycle. Explicitly assign who:
          </p>
          <ul className="space-y-2 text-xs text-stone-700">
            <li>• <strong>Owns</strong> the evaluation question and defines/revises criteria.</li>
            <li>• <strong>Supplies</strong> domain/user knowledge and represents affected interests (distinguishing consultation from decision authority).</li>
            <li>• <strong>Reviews</strong> methods and interpretations (noting degree of independence: peer, separate function, or external).</li>
            <li>• <strong>Challenges</strong> findings, <strong>accepts</strong> remaining risks, and <strong>authorizes</strong> action.</li>
            <li>• <strong>Investigates</strong> incidents and initiates reevaluation.</li>
          </ul>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-950">
            <div className="flex items-center gap-1.5 font-semibold">
              <Shield className="h-3.5 w-3.5" />
              Evaluate oversight itself
            </div>
            <p className="mt-1">
              Assigning a human reviewer does not establish that the reviewer has adequate time, expertise, visibility, or authority to intervene.
            </p>
          </div>
        </section>

        <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-stone-900">
              2. Lifecycle & Reevaluation Triggers
            </h2>
          </div>
          <p className="text-sm text-stone-600">
            Reevaluate proportionately when consequential conditions change:
          </p>
          <ul className="space-y-1.5 text-xs text-stone-700">
            <li>• Model, prompt, retrieval, memory, tool, or interface updates.</li>
            <li>• New data sources or changed source quality.</li>
            <li>• New users, tasks, languages, or operating conditions.</li>
            <li>• New failure patterns, incidents, or invalidated assumptions.</li>
            <li>• Changes to rubrics, judges, or reference labels.</li>
          </ul>
          <div className="rounded-lg border border-stone-200 bg-stone-50 p-3 text-xs text-stone-700 space-y-1">
            <div>
              <strong>Separate versioning:</strong> Track product and evaluator versions independently so measurement changes are not mistaken for system improvements.
            </div>
            <div>
              <strong>Post-deployment monitoring:</strong> Complements pre-deployment testing, though validated monitoring practices remain an evolving area (NIST).
            </div>
          </div>
        </section>
      </div>

      {/* Worked Example: Illustrative Research Assistant */}
      <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-xs space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-4">
          <div className="flex items-center gap-2">
            <FileSearch className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-stone-900">
              3. Worked Example: Illustrative Research Assistant
            </h2>
          </div>
          <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
            Fictional design example · no empirical findings implied
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 text-xs">
          <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
            <div className="font-semibold text-stone-900">Purpose</div>
            <p className="mt-1 text-stone-600">Decide whether a restricted pilot is justified and identify weaknesses.</p>
          </div>
          <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
            <div className="font-semibold text-stone-900">Scopes</div>
            <p className="mt-1 text-stone-600">Integrated product (retrieval + model + UI) and human–AI syntheses.</p>
          </div>
          <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
            <div className="font-semibold text-stone-900">Criteria</div>
            <p className="mt-1 text-stone-600">Source fidelity, methodological comparison, uncertainty, effort, synthesis quality.</p>
          </div>
          <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
            <div className="font-semibold text-stone-900">Evidence</div>
            <p className="mt-1 text-stone-600">Retrieval tests, source-grounded review, traces, observed use, comparative study.</p>
          </div>
          <div className="rounded-lg border border-stone-200 bg-stone-50 p-3">
            <div className="font-semibold text-stone-900">Study Design</div>
            <p className="mt-1 text-stone-600">Blinded specialist assessment of completed syntheses; account for expertise & learning.</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
            Explore Conditional Interpretations (Result → Bounded Decision)
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {CONDITIONAL_OUTCOMES.map((item, idx) => (
              <button
                key={item.scenario}
                onClick={() => setSelectedOutcome(idx)}
                className={`rounded-lg border p-3 text-left text-xs transition ${
                  selectedOutcome === idx
                    ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600'
                    : 'border-stone-200 hover:bg-stone-50'
                }`}
              >
                <div className="font-semibold text-stone-900">If: {item.scenario}</div>
              </button>
            ))}
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-4 text-sm text-emerald-950">
            <strong>Justified response: </strong>
            {CONDITIONAL_OUTCOMES[selectedOutcome].action}
          </div>
        </div>
      </section>
    </div>
  );
}

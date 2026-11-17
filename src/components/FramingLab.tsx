import { useState } from 'react';
import { AlertTriangle, CheckCircle2, Compass, FlaskConical, HelpCircle } from 'lucide-react';
import { SCOPES, TARGET_INVENTORY } from '../data/evalsData';

export function FramingLab() {
  const [selectedScopeId, setSelectedScopeId] = useState('product');
  const [selectedTarget, setSelectedTarget] = useState(TARGET_INVENTORY[1].name);
  const [mode, setMode] = useState<'exploratory' | 'confirmatory'>('confirmatory');

  // Question Builder State
  const [system, setSystem] = useState('the research assistant v2.1');
  const [population, setPopulation] = useState('researchers comparing empirical papers');
  const [comparator, setComparator] = useState('their existing manual workflow');
  const [outcome, setOutcome] = useState('improve evidence-synthesis quality');
  const [constraint, setConstraint] = useState('without increasing unsupported conclusions');

  const scope = SCOPES.find((s) => s.id === selectedScopeId) ?? SCOPES[0];

  return (
    <div className="space-y-8">
      {/* Scope vs Target Matrix */}
      <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-xs space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-stone-900">
            1. Separate Scope from Target
          </h2>
          <p className="text-sm text-stone-600">
            Select an evaluation <strong>scope</strong> (what arrangement is assessed) and a <strong>target</strong> (which property or outcome is measured). Evidence at one scope does not automatically establish claims at another.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Select Scope (Object & Boundary)
            </div>
            <div className="grid gap-2">
              {SCOPES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedScopeId(s.id)}
                  className={`rounded-lg border p-3 text-left transition ${
                    selectedScopeId === s.id
                      ? 'border-indigo-500 bg-indigo-50/50 ring-1 ring-indigo-500'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-stone-900">{s.name}</span>
                  </div>
                  <p className="mt-0.5 text-xs text-stone-600">{s.question}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                Select Target (Capability, Property, or Outcome)
              </div>
              <div className="flex flex-wrap gap-1.5">
                {TARGET_INVENTORY.map((t) => (
                  <button
                    key={t.name}
                    onClick={() => setSelectedTarget(t.name)}
                    className={`rounded-full border px-2.5 py-1 text-xs font-medium transition ${
                      selectedTarget === t.name
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 bg-stone-50 text-stone-700 hover:bg-stone-100'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-indigo-700">
                Selected Coordinate Pair
              </div>
              <div className="text-sm font-semibold text-stone-900">
                Scope: {scope.name} × Target: {selectedTarget}
              </div>
              <div className="text-xs text-stone-700">
                <strong>Boundary:</strong> {scope.boundary}
              </div>
              <div className="text-xs text-stone-700">
                <strong>Target concerns:</strong>{' '}
                {TARGET_INVENTORY.find((t) => t.name === selectedTarget)?.concerns}
              </div>
              <div className="flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 p-2.5 text-xs text-amber-900">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <span>
                  <strong>Scope-transfer warning:</strong> {scope.transferWarning}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Exploratory vs Confirmatory + Behavioral vs Mechanistic */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-stone-900">
              2. Exploratory vs. Confirmatory
            </h2>
            <div className="inline-flex rounded-lg border border-stone-200 bg-stone-100 p-0.5">
              <button
                onClick={() => setMode('exploratory')}
                className={`rounded-md px-3 py-1 text-xs font-medium transition ${
                  mode === 'exploratory' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
                }`}
              >
                Exploratory
              </button>
              <button
                onClick={() => setMode('confirmatory')}
                className={`rounded-md px-3 py-1 text-xs font-medium transition ${
                  mode === 'confirmatory' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600'
                }`}
              >
                Confirmatory
              </button>
            </div>
          </div>

          {mode === 'exploratory' ? (
            <div className="space-y-3 text-sm text-stone-700">
              <div className="flex items-center gap-2 font-medium text-indigo-700">
                <Compass className="h-4 w-4" />
                Purpose: Discover failures, user needs, and plausible explanations
              </div>
              <p>
                Criteria, definitions, and analyses may evolve as you inspect outputs and traces. Exploration is legitimate research.
              </p>
              <div className="rounded-lg bg-stone-50 p-3 text-xs text-stone-600">
                <strong>Rule of discipline:</strong> Disclose when exploratory findings shaped later criteria, and do not present tuned results as an independent confirmatory test.
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-sm text-stone-700">
              <div className="flex items-center gap-2 font-medium text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                Purpose: Test a specified claim or decision rule
              </div>
              <p>
                Main outcomes, comparisons, analyses, and decision thresholds must be fixed <em>before</em> inspecting the confirmatory results.
              </p>
              <div className="rounded-lg bg-stone-50 p-3 text-xs text-stone-600">
                <strong>Rule of discipline:</strong> “Thresholds set early” means locking decision rules before examining the confirmatory evidence to which they apply.
              </div>
            </div>
          )}
        </section>

        <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <FlaskConical className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-stone-900">
              3. Behavioral Capability vs. Mechanism
            </h2>
          </div>
          <p className="text-sm text-stone-700">
            Correct answers on a reasoning test are consistent with a bounded reasoning capability, but they can also reflect memorized examples, shortcuts, or tool assistance.
          </p>
          <div className="rounded-lg border border-stone-200 bg-stone-50 p-3 text-xs space-y-1.5 text-stone-700">
            <div><strong>1.</strong> Which conception of reasoning is relevant?</div>
            <div><strong>2.</strong> Which tasks provide evidence about it?</div>
            <div><strong>3.</strong> Which alternative explanations could produce similar performance?</div>
            <div><strong>4.</strong> What evidence would distinguish those explanations?</div>
          </div>
        </section>
      </div>

      {/* Evaluation Question Builder */}
      <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-stone-900">
            4. Evaluation Question Builder
          </h2>
        </div>
        <p className="text-sm text-stone-600">
          A well-formed question names the system, population/task, comparator, desired outcome, and constraints.
        </p>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <label className="block text-xs font-medium text-stone-700">
            Population & Task
            <input
              value={population}
              onChange={(e) => setPopulation(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-1.5 text-sm text-stone-900 focus:border-indigo-500 focus:outline-none"
            />
          </label>
          <label className="block text-xs font-medium text-stone-700">
            System & Version
            <input
              value={system}
              onChange={(e) => setSystem(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-1.5 text-sm text-stone-900 focus:border-indigo-500 focus:outline-none"
            />
          </label>
          <label className="block text-xs font-medium text-stone-700">
            Comparator / Baseline
            <input
              value={comparator}
              onChange={(e) => setComparator(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-1.5 text-sm text-stone-900 focus:border-indigo-500 focus:outline-none"
            />
          </label>
          <label className="block text-xs font-medium text-stone-700">
            Desired Outcome
            <input
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-1.5 text-sm text-stone-900 focus:border-indigo-500 focus:outline-none"
            />
          </label>
          <label className="block text-xs font-medium text-stone-700 sm:col-span-2">
            Relevant Constraints
            <input
              value={constraint}
              onChange={(e) => setConstraint(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-1.5 text-sm text-stone-900 focus:border-indigo-500 focus:outline-none"
            />
          </label>
        </div>

        <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-800">
            Generated Evaluation Question
          </div>
          <p className="mt-1.5 text-base font-medium text-stone-900">
            “For {population}, does {system} {outcome} compared with {comparator}, {constraint}?”
          </p>
        </div>
      </section>
    </div>
  );
}

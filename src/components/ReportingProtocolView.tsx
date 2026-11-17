import { useState } from 'react';
import { Check, ClipboardList, Copy, Eye, MessageSquareWarning } from 'lucide-react';
import { PROTOCOL_FIELDS, REPORTING_CLAIMS } from '../data/evalsData';

export function ReportingProtocolView() {
  const [revealedClaims, setRevealedClaims] = useState<Record<number, boolean>>({ 0: true });
  const [protocolValues, setProtocolValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  // Reusable Decision Statement fields
  const [stmt, setStmt] = useState({
    system: 'Research Assistant v2.1',
    targets: 'source fidelity and synthesis quality for empirical-paper comparison by domain researchers',
    baseline: 'existing manual synthesis workflow',
    methods: 'source-grounded claim review and a blinded comparative task study',
    construct: 'source fidelity',
    operational: 'proportion of material claims accurately citing study design, population, and limitations',
    justification: 'observational-to-causal misrepresentation was a primary failure mode in trace analysis',
    finding: 'higher source-fidelity scores on supplied English empirical papers under study conditions',
    broader: 'unsupervised multi-lingual synthesis in production',
    assumptions: 'representative multilingual validation and workflow integration studies',
    limitations: 'small specialist sample, English-only corpus, and unverified long-term learning effects',
    untested: 'net productivity gains across routine multi-week workflows',
    action: 'a restricted pilot with mandatory source-passage links',
    reason: 'source fidelity improved without observed harm, while workflow effects remain uncertain',
    owner: 'Evaluation & Product Lead',
    trigger: 'model/retrieval updates, new domains, or any unsupported-claim incident',
  });

  const toggleClaim = (idx: number) => {
    setRevealedClaims((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const generatedStatement = `We evaluated ${stmt.system} for ${stmt.targets}, compared with ${stmt.baseline}, using ${stmt.methods}.

We operationalized ${stmt.construct} as ${stmt.operational}, because ${stmt.justification}.

The observations and measurements support ${stmt.finding}. Extending that finding to ${stmt.broader} requires ${stmt.assumptions}.

Important limitations include ${stmt.limitations}. The evaluation does not establish ${stmt.untested}.

We recommend ${stmt.action} because ${stmt.reason}. The accountable decision-maker is ${stmt.owner}.

We will reconsider the interpretation or decision if ${stmt.trigger} occurs.`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedStatement);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Claim Calibration Trainer */}
      <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <MessageSquareWarning className="h-5 w-5 text-indigo-600" />
          <h2 className="text-lg font-semibold text-stone-900">
            1. Epistemic Discipline in Reporting: Claim Calibration
          </h2>
        </div>
        <p className="text-sm text-stone-600">
          Keep confidence proportionate to evidence and separate observations, estimates, interpretations, hypotheses, and recommendations. Click any overextended claim to reveal a defensible formulation.
        </p>

        <div className="space-y-2.5">
          {REPORTING_CLAIMS.map((item, idx) => {
            const open = !!revealedClaims[idx];
            return (
              <div key={item.overextended} className="rounded-lg border border-stone-200 overflow-hidden">
                <button
                  onClick={() => toggleClaim(idx)}
                  className="flex w-full items-center justify-between bg-stone-50 px-4 py-3 text-left hover:bg-stone-100"
                >
                  <span className="text-sm font-medium text-rose-900">
                    Overextended: {item.overextended}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-indigo-700">
                    <Eye className="h-3.5 w-3.5" />
                    {open ? 'Hide' : 'Calibrate'}
                  </span>
                </button>
                {open && (
                  <div className="border-t border-stone-200 bg-white px-4 py-3 text-xs space-y-1.5">
                    <div className="text-emerald-900">
                      <strong>Defensible formulation:</strong> {item.defensible}
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

      {/* Reusable Evaluation & Decision Statement Builder */}
      <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-indigo-600" />
            <h2 className="text-lg font-semibold text-stone-900">
              2. Reusable Evaluation & Decision Statement Builder
            </h2>
          </div>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-stone-800"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied!' : 'Copy Statement'}
          </button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-xs">
          {(
            [
              ['system', 'System & Version'],
              ['baseline', 'Comparator / Baseline'],
              ['targets', 'Targets, Tasks & Population'],
              ['methods', 'Methods & Evidence'],
              ['finding', 'Bounded Finding'],
              ['untested', 'Material Untested Claim'],
              ['action', 'Recommended Action'],
              ['owner', 'Accountable Decision-Maker'],
            ] as const
          ).map(([key, label]) => (
            <label key={key} className="block font-medium text-stone-700">
              {label}
              <input
                value={stmt[key]}
                onChange={(e) => setStmt((s) => ({ ...s, [key]: e.target.value }))}
                className="mt-1 w-full rounded-lg border border-stone-300 px-2.5 py-1.5 text-xs text-stone-900 focus:border-indigo-500 focus:outline-none"
              />
            </label>
          ))}
        </div>

        <pre className="whitespace-pre-wrap rounded-xl border border-indigo-200 bg-indigo-50/40 p-4 font-sans text-sm leading-relaxed text-stone-800">
          {generatedStatement}
        </pre>
      </section>

      {/* Companion 12-Field Protocol */}
      <section className="rounded-xl border border-stone-200 bg-white p-6 shadow-xs space-y-4">
        <h2 className="text-lg font-semibold text-stone-900">
          3. Companion Evaluation Protocol (12 Fields)
        </h2>
        <p className="text-sm text-stone-600">
          A proposed structure to make a specific evaluation inspectable. Scale detail to the decision’s consequences.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {PROTOCOL_FIELDS.map((field) => (
            <label key={field.id} className="block rounded-lg border border-stone-200 p-3 text-xs">
              <span className="font-semibold text-stone-900">{field.label}</span>
              <textarea
                rows={2}
                placeholder={field.placeholder}
                value={protocolValues[field.id] ?? ''}
                onChange={(e) =>
                  setProtocolValues((prev) => ({ ...prev, [field.id]: e.target.value }))
                }
                className="mt-1.5 w-full resize-y rounded border border-stone-200 bg-stone-50 px-2.5 py-1.5 text-xs text-stone-900 placeholder:text-stone-400 focus:border-indigo-500 focus:bg-white focus:outline-none"
              />
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}

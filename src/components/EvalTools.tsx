import { useState } from 'react';
import { Check, Copy, Download, RotateCcw, Sparkles, ExternalLink } from 'lucide-react';

function downloadFile(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function ToggleChips({
  options,
  selected,
  onToggle,
}: {
  options: string[];
  selected: string[];
  onToggle: (val: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => {
        const active = selected.includes(opt);
        return (
          <button
            type="button"
            key={opt}
            onClick={() => onToggle(opt)}
            className={`rounded-full border px-2.5 py-1 text-xs font-medium transition ${
              active
                ? 'border-indigo-600 bg-[#C8552D] text-[#FBF7EE] shadow-2xs'
                : 'border-stone-200 bg-[#EFE7D6] text-[#231F1A] hover:border-stone-300 hover:bg-stone-100'
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function toggleItem(list: string[], val: string): string[] {
  return list.includes(val) ? list.filter((x) => x !== val) : [...list, val];
}

/* -------------------------------------------------------------------------- */
/* Tool 1: SPHERE Evaluation Card Builder                                     */
/* -------------------------------------------------------------------------- */
interface SphereState {
  systemName: string;
  systemDesc: string;
  whatComponent: string[];
  whatGoals: string[];
  whatDetails: string;
  howApproach: string[];
  howMethods: string[];
  howDetails: string;
  whoParticipants: string[];
  whoDetails: string;
  whenHorizon: string[];
  whenDetails: string;
  metaValidation: string[];
  metaDetails: string;
}

const EMPTY_SPHERE: SphereState = {
  systemName: '',
  systemDesc: '',
  whatComponent: [],
  whatGoals: [],
  whatDetails: '',
  howApproach: [],
  howMethods: [],
  howDetails: '',
  whoParticipants: [],
  whoDetails: '',
  whenHorizon: [],
  whenDetails: '',
  metaValidation: [],
  metaDetails: '',
};

const EXAMPLE_SPHERE: SphereState = {
  systemName: 'Research Synthesis Copilot v2.1',
  systemDesc: 'Assists domain researchers in comparing empirical papers and drafting evidence syntheses.',
  whatComponent: ['Full Human–AI System', 'Underlying Model'],
  whatGoals: ['Effectiveness (synthesis quality)', 'Efficiency (time & verification effort)', 'Skill / Reliance'],
  whatDetails: 'Tasks: compare 3–5 empirical papers and draft a synthesis. Data: generated claims, source-passage links, edit traces, and completed syntheses.',
  howApproach: ['Intrinsic (automated / rubric)', 'Extrinsic (downstream task)'],
  howMethods: ['Quantitative (scores, time)', 'Qualitative (interviews, trace analysis)'],
  howDetails: 'Stage 1: source-fidelity rubric on generated summaries. Stage 2: comparative task study against existing manual workflow.',
  whoParticipants: ['Target End Users', 'Domain Experts'],
  whoDetails: '24 empirical researchers (mixed seniority) in English-language social/biomedical sciences. No synthetic users used for final claims.',
  whenHorizon: ['Short-term (1–2 hr session)', 'Long-term (multi-week deployment)'],
  whenDetails: '1-hour controlled comparison followed by a 2-week pilot to observe familiarization, prompt customization, and error-catching.',
  metaValidation: ['Randomized Control / Baseline', 'Blinding / Counterbalancing', 'Inter-rater Reliability'],
  metaDetails: 'Independent specialist assessors blinded to condition; task order counterbalanced; Cohen’s kappa reported for rubric ratings.',
};

export function SphereCardTool() {
  const [form, setForm] = useState<SphereState>(EXAMPLE_SPHERE);
  const [copied, setCopied] = useState(false);

  const markdown = `# SPHERE Evaluation Card: ${form.systemName || '[Untitled Human–AI System]'}

> ${form.systemDesc || '[Brief description of the Human–AI system and intended use]'}

## 1. What is being evaluated?
- **Component:** ${form.whatComponent.join(', ') || '—'}
- **Design Goals:** ${form.whatGoals.join(', ') || '—'}
- **Goals → Tasks → Data:** ${form.whatDetails || '—'}

## 2. How is the evaluation conducted?
- **Approach:** ${form.howApproach.join(', ') || '—'}
- **Methods:** ${form.howMethods.join(', ') || '—'}
- **Procedure & Metrics:** ${form.howDetails || '—'}

## 3. Who is participating in the evaluation?
- **Participant Groups:** ${form.whoParticipants.join(', ') || '—'}
- **Sampling & Context:** ${form.whoDetails || '—'}

## 4. When is the evaluation conducted?
- **Time Horizon:** ${form.whenHorizon.join(', ') || '—'}
- **Lifecycle & Duration Notes:** ${form.whenDetails || '—'}

## 5. (Meta) How is the evaluation validated?
- **Rigor & Controls:** ${form.metaValidation.join(', ') || '—'}
- **Validation Details:** ${form.metaDetails || '—'}

---
*Structured with the SPHERE Evaluation Card (Zhao et al., ACL 2025 Findings · https://doi.org/10.18653/v1/2025.findings-acl.70)*
`;

  const copyMd = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Tool Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 vintage-box rounded-md p-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#231F1A]">
              SPHERE Evaluation Card Builder
            </h2>
            <a
              href="https://sphere-eval.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-[#C8552D] hover:underline"
            >
              sphere-eval.github.io
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <p className="mt-0.5 text-xs text-[#5C5346]">
            Design and export a transparent 5-dimension evaluation card for your Human–AI system.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setForm(EXAMPLE_SPHERE)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-medium text-[#231F1A] hover:bg-stone-100"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#C8552D]" />
            Load Example
          </button>
          <button
            type="button"
            onClick={() => setForm(EMPTY_SPHERE)}
            className="inline-flex items-center gap-1.5 vintage-box rounded-md px-3 py-1.5 text-xs font-medium text-[#5C5346] hover:bg-stone-50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Clear
          </button>
        </div>
      </div>

      {/* 2-Column Builder + Live Card Preview */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Form Column */}
        <div className="space-y-5 lg:col-span-7">
          <div className="vintage-box rounded-md p-5 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              System Overview
            </div>
            <label className="block text-xs font-medium text-[#231F1A]">
              System Name &amp; Version
              <input
                value={form.systemName}
                onChange={(e) => setForm({ ...form, systemName: e.target.value })}
                placeholder="e.g., Clinical Triage Copilot v1.2"
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-1.5 text-sm text-[#231F1A] focus:border-indigo-500 focus:outline-none"
              />
            </label>
            <label className="block text-xs font-medium text-[#231F1A]">
              System Purpose
              <textarea
                rows={2}
                value={form.systemDesc}
                onChange={(e) => setForm({ ...form, systemDesc: e.target.value })}
                placeholder="What does the Human–AI system help people do?"
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-1.5 text-xs text-[#231F1A] focus:border-indigo-500 focus:outline-none"
              />
            </label>
          </div>

          {/* 1. What */}
          <div className="vintage-box rounded-md p-5 space-y-3">
            <div className="text-sm font-bold text-emerald-900">1. What is being evaluated?</div>
            <div className="space-y-1.5">
              <div className="text-xs font-medium text-[#5C5346]">Component</div>
              <ToggleChips
                options={['Full Human–AI System', 'Underlying Model', 'Agent Harness / Tools', 'UI / Interaction Layer']}
                selected={form.whatComponent}
                onToggle={(v) => setForm({ ...form, whatComponent: toggleItem(form.whatComponent, v) })}
              />
            </div>
            <div className="space-y-1.5">
              <div className="text-xs font-medium text-[#5C5346]">Design Goals</div>
              <ToggleChips
                options={[
                  'Effectiveness (synthesis quality)',
                  'Efficiency (time & verification effort)',
                  'Satisfaction / Trust',
                  'Skill / Reliance',
                  'Safety / Error Catching',
                ]}
                selected={form.whatGoals}
                onToggle={(v) => setForm({ ...form, whatGoals: toggleItem(form.whatGoals, v) })}
              />
            </div>
            <label className="block text-xs font-medium text-[#231F1A]">
              Goals → Tasks → Data
              <textarea
                rows={2}
                value={form.whatDetails}
                onChange={(e) => setForm({ ...form, whatDetails: e.target.value })}
                placeholder="What tasks do users perform, and what data/traces are collected?"
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-1.5 text-xs text-[#231F1A] focus:border-indigo-500 focus:outline-none"
              />
            </label>
          </div>

          {/* 2. How */}
          <div className="vintage-box rounded-md p-5 space-y-3">
            <div className="text-sm font-bold text-blue-900">2. How is the evaluation conducted?</div>
            <div className="space-y-1.5">
              <div className="text-xs font-medium text-[#5C5346]">Approach</div>
              <ToggleChips
                options={['Intrinsic (automated / rubric)', 'Extrinsic (downstream task)', 'Longitudinal Monitoring']}
                selected={form.howApproach}
                onToggle={(v) => setForm({ ...form, howApproach: toggleItem(form.howApproach, v) })}
              />
            </div>
            <div className="space-y-1.5">
              <div className="text-xs font-medium text-[#5C5346]">Methods</div>
              <ToggleChips
                options={[
                  'Quantitative (scores, time)',
                  'Qualitative (interviews, trace analysis)',
                  'Behavioral / Artifact Tests',
                  'LLM-as-a-Judge (calibrated)',
                ]}
                selected={form.howMethods}
                onToggle={(v) => setForm({ ...form, howMethods: toggleItem(form.howMethods, v) })}
              />
            </div>
            <label className="block text-xs font-medium text-[#231F1A]">
              Procedure &amp; Metrics
              <textarea
                rows={2}
                value={form.howDetails}
                onChange={(e) => setForm({ ...form, howDetails: e.target.value })}
                placeholder="Describe metrics, rubrics, and how qualitative + quantitative evidence combine."
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-1.5 text-xs text-[#231F1A] focus:border-indigo-500 focus:outline-none"
              />
            </label>
          </div>

          {/* 3. Who */}
          <div className="vintage-box rounded-md p-5 space-y-3">
            <div className="text-sm font-bold text-amber-900">3. Who is participating in the evaluation?</div>
            <ToggleChips
              options={['Target End Users', 'Domain Experts', 'Lay Users', 'Crowd Annotators', 'LLM-Simulated Users (early check only)']}
              selected={form.whoParticipants}
              onToggle={(v) => setForm({ ...form, whoParticipants: toggleItem(form.whoParticipants, v) })}
            />
            <label className="block text-xs font-medium text-[#231F1A]">
              Participant Context &amp; Recruitment
              <textarea
                rows={2}
                value={form.whoDetails}
                onChange={(e) => setForm({ ...form, whoDetails: e.target.value })}
                placeholder="Sample size, expertise, language/accessibility coverage, and whose values are represented."
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-1.5 text-xs text-[#231F1A] focus:border-indigo-500 focus:outline-none"
              />
            </label>
          </div>

          {/* 4. When */}
          <div className="vintage-box rounded-md p-5 space-y-3">
            <div className="text-sm font-bold text-rose-900">4. When is the evaluation conducted?</div>
            <ToggleChips
              options={['Immediate / Single-turn', 'Short-term (1–2 hr session)', 'Long-term (multi-week deployment)', 'Continuous Post-Deploy']}
              selected={form.whenHorizon}
              onToggle={(v) => setForm({ ...form, whenHorizon: toggleItem(form.whenHorizon, v) })}
            />
            <label className="block text-xs font-medium text-[#231F1A]">
              Time Horizon &amp; Lifecycle Notes
              <textarea
                rows={2}
                value={form.whenDetails}
                onChange={(e) => setForm({ ...form, whenDetails: e.target.value })}
                placeholder="How familiarization, novelty effects, sycophancy, or skill erosion are tracked over time."
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-1.5 text-xs text-[#231F1A] focus:border-indigo-500 focus:outline-none"
              />
            </label>
          </div>

          {/* 5. Meta Validation */}
          <div className="vintage-box rounded-md p-5 space-y-3">
            <div className="text-sm font-bold text-violet-900">5. (Meta) How is the evaluation validated?</div>
            <ToggleChips
              options={[
                'Randomized Control / Baseline',
                'Blinding / Counterbalancing',
                'Inter-rater Reliability',
                'Held-out Judge Calibration',
                'Construct / Ecological Validity',
              ]}
              selected={form.metaValidation}
              onToggle={(v) => setForm({ ...form, metaValidation: toggleItem(form.metaValidation, v) })}
            />
            <label className="block text-xs font-medium text-[#231F1A]">
              Validation Details &amp; Limitations
              <textarea
                rows={2}
                value={form.metaDetails}
                onChange={(e) => setForm({ ...form, metaDetails: e.target.value })}
                placeholder="Agreement metrics, blinding, sample-size/clustering checks, and remaining threats to validity."
                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-1.5 text-xs text-[#231F1A] focus:border-indigo-500 focus:outline-none"
              />
            </label>
          </div>
        </div>

        {/* Live Card Preview & Export Column */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 space-y-3">
            <div className="vintage-card rounded-md p-5 shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-2 border-b border-stone-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#C8552D]">
                    Live SPHERE Card
                  </span>
                  <h3 className="text-base font-bold text-[#231F1A]">
                    {form.systemName || 'Untitled Human–AI System'}
                  </h3>
                  <p className="mt-0.5 text-xs text-[#5C5346]">
                    {form.systemDesc || 'Add a brief system description on the left.'}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className="rounded-lg bg-emerald-50/70 p-2.5">
                  <div className="font-semibold text-emerald-950">1. What</div>
                  <div className="text-[#231F1A]">{form.whatComponent.join(' · ') || 'No component selected'}</div>
                  <div className="text-[#5C5346]">{form.whatGoals.join(', ')}</div>
                  {form.whatDetails && <p className="mt-1 text-[#231F1A]">{form.whatDetails}</p>}
                </div>

                <div className="rounded-lg bg-blue-50/70 p-2.5">
                  <div className="font-semibold text-blue-950">2. How</div>
                  <div className="text-[#231F1A]">{[...form.howApproach, ...form.howMethods].join(' · ') || 'No methods selected'}</div>
                  {form.howDetails && <p className="mt-1 text-[#231F1A]">{form.howDetails}</p>}
                </div>

                <div className="rounded-lg bg-amber-50/70 p-2.5">
                  <div className="font-semibold text-amber-950">3. Who</div>
                  <div className="text-[#231F1A]">{form.whoParticipants.join(' · ') || 'No participants selected'}</div>
                  {form.whoDetails && <p className="mt-1 text-[#231F1A]">{form.whoDetails}</p>}
                </div>

                <div className="rounded-lg bg-rose-50/70 p-2.5">
                  <div className="font-semibold text-rose-950">4. When</div>
                  <div className="text-[#231F1A]">{form.whenHorizon.join(' · ') || 'No horizon selected'}</div>
                  {form.whenDetails && <p className="mt-1 text-[#231F1A]">{form.whenDetails}</p>}
                </div>

                <div className="rounded-lg bg-violet-50/70 p-2.5">
                  <div className="font-semibold text-violet-950">5. Meta-Validation</div>
                  <div className="text-[#231F1A]">{form.metaValidation.join(' · ') || 'No validation selected'}</div>
                  {form.metaDetails && <p className="mt-1 text-[#231F1A]">{form.metaDetails}</p>}
                </div>
              </div>

              {/* Export Actions */}
              <div className="flex flex-wrap gap-2 border-t border-stone-100 pt-3">
                <button
                  type="button"
                  onClick={copyMd}
                  className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg vintage-btn bg-[#231F1A] px-3 py-2 text-xs font-medium text-[#FBF7EE]"
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? 'Copied Markdown' : 'Copy Markdown'}
                </button>
                <button
                  type="button"
                  onClick={() => downloadFile('sphere-evaluation-card.md', markdown, 'text/markdown')}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs font-medium text-[#231F1A] hover:bg-stone-50"
                >
                  <Download className="h-3.5 w-3.5" />
                  .md
                </button>
                <button
                  type="button"
                  onClick={() => downloadFile('sphere-evaluation-card.json', JSON.stringify(form, null, 2), 'application/json')}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs font-medium text-[#231F1A] hover:bg-stone-50"
                >
                  <Download className="h-3.5 w-3.5" />
                  .json
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Tool 2: AI-Eval Framework Protocol & Decision Statement Builder            */
/* -------------------------------------------------------------------------- */
interface FrameworkState {
  purpose: string;
  mode: 'Exploratory' | 'Confirmatory';
  conceptual: string;
  scope: string;
  unitOfAnalysis: string;
  contextExclusions: string;
  criteria: string;
  comparators: string;
  evidenceSampling: string;
  evaluatorValidation: string;
  analysisUncertainty: string;
  decisionRules: string;
  governance: string;
  reevaluation: string;
  boundedClaim: string;
  untestedClaim: string;
  recommendedAction: string;
  ownerRole: string;
}

const EMPTY_FRAMEWORK: FrameworkState = {
  purpose: '',
  mode: 'Confirmatory',
  conceptual: '',
  scope: '',
  unitOfAnalysis: '',
  contextExclusions: '',
  criteria: '',
  comparators: '',
  evidenceSampling: '',
  evaluatorValidation: '',
  analysisUncertainty: '',
  decisionRules: '',
  governance: '',
  reevaluation: '',
  boundedClaim: '',
  untestedClaim: '',
  recommendedAction: '',
  ownerRole: '',
};

const EXAMPLE_FRAMEWORK: FrameworkState = {
  purpose: 'Decide whether to launch a restricted pilot of Research Assistant v2.1 for comparing empirical papers.',
  mode: 'Confirmatory',
  conceptual: 'Source fidelity = material claims accurately represent cited study design, population, and limits; Synthesis quality = integration preserving differences and uncertainty.',
  scope: 'Complete AI product (retrieval + model + prompts + UI) and completed human–AI syntheses.',
  unitOfAnalysis: 'Individual claim (for source fidelity) and completed synthesis task (for human outcome).',
  contextExclusions: 'Included: English empirical papers, domain researchers. Excluded: multilingual full texts, non-empirical opinion pieces.',
  criteria: 'Source fidelity, methodological comparison, unsupported-conclusion rate, verification effort, and confidentiality (mandatory constraint).',
  comparators: 'Researchers’ existing manual synthesis workflow (same source PDFs and time limit).',
  evidenceSampling: 'Discovery trace analysis on 50 historical sessions; representative task sample (N=48 syntheses) for confirmatory comparison.',
  evaluatorValidation: 'Code checks for citation existence; blinded specialist review with independent initial ratings; LLM screening judge calibrated on held-out set.',
  analysisUncertainty: 'Clustered by researcher; exact binomial 95% upper bound for rare critical errors; exploratory vs. confirmatory separation preserved.',
  decisionRules: 'Approve restricted pilot if synthesis quality improves without increasing unsupported conclusions and zero confidentiality breaches occur.',
  governance: 'Product Lead owns question; Research Methodologist reviews design; VP Research authorizes pilot and accepts residual risk.',
  reevaluation: 'Trigger reevaluation on model/retrieval updates, new domains, rubric changes, or any unsupported-claim incident.',
  boundedClaim: 'higher source-fidelity scores on supplied English empirical papers under study conditions',
  untestedClaim: 'net productivity gains across routine multi-week workflows or multilingual literature',
  recommendedAction: 'a restricted 2-week pilot with mandatory source-passage links',
  ownerRole: 'VP of Research',
};

export function FrameworkProtocolTool() {
  const [form, setForm] = useState<FrameworkState>(EMPTY_FRAMEWORK);
  const [isFictionalExample, setIsFictionalExample] = useState(false);
  const [copied, setCopied] = useState(false);

  const hasFindings = Boolean(form.boundedClaim.trim() || form.untestedClaim.trim());
  const hasRecommendation = Boolean(form.recommendedAction.trim());
  const isCompletedReport = hasFindings || hasRecommendation;

  const prospectiveSummary = `We plan to evaluate ${form.scope.trim() || '[system & scope]'} (${form.mode} mode) for ${form.purpose.trim() || '[purpose, tasks & population]'}, compared with ${form.comparators.trim() || '[baseline comparator]'}, using ${form.evidenceSampling.trim() || '[planned methods & sampling]'}.

We will operationalize ${form.conceptual.trim() || '[constructs]'} via ${form.criteria.trim() || '[criteria & measurement procedure]'}. Planned exclusions: ${form.contextExclusions.trim() || '[to be specified]'}. Planned analysis: ${form.analysisUncertainty.trim() || '[to be specified]'}.

Pre-specified decision rules: ${form.decisionRules.trim() || '[to be specified before inspecting confirmatory results]'}. Governance & owner: ${form.governance.trim() || form.ownerRole.trim() || '[to be assigned]'}. Reevaluation triggers: ${form.reevaluation.trim() || '[to be specified]'}.`;

  const findingsAndDecisionBlock = isCompletedReport
    ? `${
        hasFindings
          ? `\nFindings: ${form.boundedClaim.trim() ? `The observations support ${form.boundedClaim.trim()}.` : ''}${
              form.untestedClaim.trim() ? ` They do not establish ${form.untestedClaim.trim()}.` : ''
            }`
          : ''
      }${
        hasRecommendation
          ? `\nRecommendation: ${form.recommendedAction.trim()}.${
              form.ownerRole.trim() ? ` Accountable owner: ${form.ownerRole.trim()}.` : ''
            }`
          : ''
      }`
    : '';

  const statement = `${prospectiveSummary}${findingsAndDecisionBlock ? `\n${findingsAndDecisionBlock}` : ''}`;

  const exampleBanner = isFictionalExample
    ? '> **NOTE: FICTIONAL ILLUSTRATIVE EXAMPLE** — The entries below are fictional design placeholders, not measured empirical results.\n\n'
    : '';

  const fullMarkdown = `# AI Evaluation ${isCompletedReport ? 'Protocol & Decision Report' : 'Study Protocol (Prospective Plan)'}

${exampleBanner}## ${isCompletedReport ? 'Evaluation & Decision Statement' : 'Prospective Study Summary (No Results Yet)'}
${statement}

---

## 12-Field Companion Protocol
1. **Purpose & Mode:** ${form.purpose || '—'} (*${form.mode}*)
2. **Conceptual Basis:** ${form.conceptual || '—'}
3. **System Identity, Scope & Unit:** ${form.scope || '—'} | Unit: ${form.unitOfAnalysis || '—'}
4. **Context & Exclusions:** ${form.contextExclusions || '—'}
5. **Criteria & Measurement:** ${form.criteria || '—'}
6. **Comparators & Design:** ${form.comparators || '—'}
7. **Evidence & Sampling:** ${form.evidenceSampling || '—'}
8. **Evaluator Validation:** ${form.evaluatorValidation || '—'}
9. **Analysis & Uncertainty:** ${form.analysisUncertainty || '—'}
10. **Decision Rules & Severity:** ${form.decisionRules || '—'}
11. **Governance & Accountability:** ${form.governance || '—'}
12. **Reevaluation Triggers:** ${form.reevaluation || '—'}
`;

  const exportJsonPayload = {
    status: isCompletedReport ? 'completed-report' : 'prospective-plan',
    isFictionalExample,
    planning: {
      mode: form.mode,
      purpose: form.purpose,
      conceptual: form.conceptual,
      scope: form.scope,
      unitOfAnalysis: form.unitOfAnalysis,
      contextExclusions: form.contextExclusions,
      criteria: form.criteria,
      comparators: form.comparators,
      evidenceSampling: form.evidenceSampling,
      evaluatorValidation: form.evaluatorValidation,
      analysisUncertainty: form.analysisUncertainty,
      decisionRules: form.decisionRules,
      governance: form.governance,
      reevaluation: form.reevaluation,
    },
    ...(isCompletedReport
      ? {
          reporting: {
            boundedClaim: form.boundedClaim,
            untestedClaim: form.untestedClaim,
            recommendedAction: form.recommendedAction,
            ownerRole: form.ownerRole,
          },
        }
      : {}),
  };

  const updateField = (k: keyof FrameworkState, val: string) => {
    setForm((prev) => ({ ...prev, [k]: val }));
  };

  const copyMd = async () => {
    await navigator.clipboard.writeText(fullMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 vintage-box rounded-md p-5">
        <div className="flex items-center gap-3">
          <img
            src="./exosphere-logo.png"
            alt="AI Evaluation Guide & Protocol"
            className="h-9 w-9 shrink-0 rounded-lg object-contain"
          />
          <div>
            <h2 className="text-lg font-bold text-[#231F1A]">
              AI Evaluation Protocol &amp; Decision Builder
            </h2>
            <p className="mt-0.5 text-xs text-[#5C5346]">
              Build an inspectable 12-field evaluation protocol and bounded decision statement ready for team review.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setForm(EXAMPLE_FRAMEWORK);
              setIsFictionalExample(true);
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 text-xs font-medium text-[#231F1A] hover:bg-stone-100"
          >
            <Sparkles className="h-3.5 w-3.5 text-[#C8552D]" />
            Load Example (Fictional)
          </button>
          <button
            type="button"
            onClick={() => {
              setForm(EMPTY_FRAMEWORK);
              setIsFictionalExample(false);
            }}
            className="inline-flex items-center gap-1.5 vintage-box rounded-md px-3 py-1.5 text-xs font-medium text-[#5C5346] hover:bg-stone-50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Clear
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Form Column */}
        <div className="space-y-4 lg:col-span-7">
          <div className="vintage-box rounded-md p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[#231F1A]">Framing &amp; Scope</span>
              <div className="inline-flex rounded-lg border border-stone-200 bg-stone-100 p-0.5 text-xs">
                {(['Exploratory', 'Confirmatory'] as const).map((m) => (
                  <button
                    type="button"
                    key={m}
                    onClick={() => setForm({ ...form, mode: m })}
                    className={`rounded-md px-2.5 py-1 font-medium ${
                      form.mode === m ? 'bg-white text-[#231F1A] shadow-xs' : 'text-[#5C5346]'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {(
              [
                ['purpose', '1. Purpose & Decision Question'],
                ['conceptual', '2. Conceptual Basis (definitions & alternatives)'],
                ['scope', '3. System Identity & Scope (model / harness / team)'],
                ['unitOfAnalysis', 'Unit of Analysis (claim / task / conversation / user)'],
                ['contextExclusions', '4. Context, Coverage & Explicit Exclusions'],
              ] as const
            ).map(([k, label]) => (
              <label key={k} className="block text-xs font-medium text-[#231F1A]">
                {label}
                <textarea
                  rows={2}
                  value={form[k]}
                  onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-1.5 text-xs text-[#231F1A] focus:border-indigo-500 focus:outline-none"
                />
              </label>
            ))}
          </div>

          <div className="vintage-box rounded-md p-5 space-y-3">
            <div className="text-sm font-bold text-[#231F1A]">Criteria, Evidence &amp; Rigor</div>
            {(
              [
                ['criteria', '5. Criteria, Rubrics & Mandatory Constraints'],
                ['comparators', '6. Comparators & Held-Equal Conditions'],
                ['evidenceSampling', '7. Evidence Methods & Sampling Purposes'],
                ['evaluatorValidation', '8. Grader / Judge Validation'],
                ['analysisUncertainty', '9. Statistical Analysis, Clustering & Uncertainty'],
                ['decisionRules', '10. Decision Rules & Severity Policy'],
                ['governance', '11. Governance Roles & Accountability'],
                ['reevaluation', '12. Monitoring & Reevaluation Triggers'],
              ] as const
            ).map(([k, label]) => (
              <label key={k} className="block text-xs font-medium text-[#231F1A]">
                {label}
                <textarea
                  rows={2}
                  value={form[k]}
                  onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-1.5 text-xs text-[#231F1A] focus:border-indigo-500 focus:outline-none"
                />
              </label>
            ))}
          </div>

          <div className="vintage-box rounded-md p-5 space-y-3">
            <div className="text-sm font-bold text-[#231F1A]">
              Post-Study Results &amp; Decision (Optional — Leave Blank When Planning)
            </div>
            <p className="text-xs text-[#5C5346]">
              Leave these fields blank to export a prospective study protocol before any results exist. Fill them in only after data collection is complete.
            </p>
            {(
              [
                ['boundedClaim', 'Observed Bounded Finding Supported'],
                ['untestedClaim', 'Material Untested Claim (What this does NOT establish)'],
                ['recommendedAction', 'Recommended Action & Conditions'],
                ['ownerRole', 'Accountable Decision-Maker (Role)'],
              ] as const
            ).map(([k, label]) => (
              <label key={k} className="block text-xs font-medium text-[#231F1A]">
                {label}
                <input
                  value={form[k]}
                  onChange={(e) => updateField(k, e.target.value)}
                  className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-1.5 text-xs text-[#231F1A] focus:border-indigo-500 focus:outline-none"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Live Protocol & Decision Statement Preview */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 vintage-card rounded-md p-5 shadow-sm space-y-4">
            <div className="border-b border-stone-100 pb-3">
              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C8552D]">
                  {isCompletedReport ? 'Completed Evaluation Report' : 'Prospective Study Protocol (Planning)'}
                </span>
                {isFictionalExample && (
                  <span className="rounded border border-[#D49B2A] bg-[#F6ECD5] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#6E4E12]">
                    FICTIONAL EXAMPLE
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-[#231F1A] mt-0.5">
                {form.mode} Evaluation {isCompletedReport ? 'Report' : 'Plan'}
              </h3>
            </div>

            <div className="rounded-md border border-[#335C81] bg-[#E3EAF0] p-3.5 text-xs leading-relaxed text-[#231F1A] whitespace-pre-wrap">
              {statement}
            </div>

            <div className="max-h-72 overflow-y-auto space-y-2 pr-1 text-xs">
              {[
                ['1. Purpose', form.purpose],
                ['2. Conceptual', form.conceptual],
                ['3. Scope & Unit', `${form.scope} (${form.unitOfAnalysis})`],
                ['4. Exclusions', form.contextExclusions],
                ['5. Criteria', form.criteria],
                ['6. Comparators', form.comparators],
                ['7. Evidence', form.evidenceSampling],
                ['8. Validation', form.evaluatorValidation],
                ['9. Analysis', form.analysisUncertainty],
                ['10. Decision Rules', form.decisionRules],
                ['11. Governance', form.governance],
                ['12. Reevaluation', form.reevaluation],
              ].map(([k, v]) => (
                <div key={k} className="rounded border border-stone-100 bg-stone-50 p-2">
                  <span className="font-semibold text-[#231F1A]">{k}: </span>
                  <span className="text-[#5C5346]">{v || '—'}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 border-t border-stone-100 pt-3">
              <button
                type="button"
                onClick={copyMd}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg vintage-btn bg-[#231F1A] px-3 py-2 text-xs font-medium text-[#FBF7EE]"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied Markdown' : 'Copy Markdown'}
              </button>
              <button
                type="button"
                onClick={() => downloadFile('ai-eval-protocol.md', fullMarkdown, 'text/markdown')}
                className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs font-medium text-[#231F1A] hover:bg-stone-50"
              >
                <Download className="h-3.5 w-3.5" />
                .md
              </button>
              <button
                type="button"
                onClick={() => downloadFile('ai-eval-protocol.json', JSON.stringify(exportJsonPayload, null, 2), 'application/json')}
                className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3 py-2 text-xs font-medium text-[#231F1A] hover:bg-stone-50"
              >
                <Download className="h-3.5 w-3.5" />
                .json
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Check,
  ClipboardList,
  Copy,
  Download,
  Filter,
  Plus,
  RotateCcw,
  Search,
  Trash2,
} from 'lucide-react';

export interface WorkbenchMetric {
  id: string;
  name: string;
  category: string;
  scope: string;
  unit: string;
  method: string;
  measure: string;
  procedure: string;
}

const RAW_DATA: [string, string, string, string, string, string, string, string][] = [
  ['answer-correct', 'Answer correctness', 'Generation quality', 'Model', 'Response', 'Reference check', 'Share of eligible responses that satisfy a task-specific correctness rubric.', 'Define acceptable answers and ambiguous cases in advance. Count skipped or invalid responses under a stated policy.'],
  ['faithfulness', 'Source faithfulness', 'Generation quality', 'Model', 'Claim', 'Human or model review', 'Share of assessable claims supported by the supplied evidence.', 'Mark supported, contradicted and insufficient-evidence claims. State how responses with no claims are handled and report claim counts.'],
  ['concise', 'Conciseness', 'Generation quality', 'Model', 'Response', 'Human or model review', 'Share of responses that cover required information without material redundancy.', 'Check required content before scoring redundancy. Keep total word count as a separate diagnostic.'],
  ['unsupported', 'Unsupported-claim rate', 'Safety and reliability', 'Model', 'Claim', 'Human or model review', 'Share of assessable claims with no adequate support in the designated evidence.', 'Separate contradiction from missing evidence. Keep claim-level counts and document which sources reviewers can use.'],
  ['harmful', 'Harmful-output rate', 'Safety and reliability', 'Model', 'Response', 'Human or model review', 'Share of tested responses meeting a defined harmful-content criterion.', 'Specify the rubric, severity categories and case mix. Report results by relevant category as well as overall.'],
  ['boundary', 'Policy boundary adherence', 'Safety and reliability', 'Workflow', 'Workflow run', 'Automated assertion', 'Share of controlled runs that respect specified access or action rules.', 'Use benign fixtures and approved test accounts. Compare observed actions and state changes with the allowed set.'],
  ['cost', 'Cost per run', 'Execution and efficiency', 'Workflow', 'Workflow run', 'Trace measurement', 'Total attributable execution cost divided by attempted workflow runs.', 'State pricing assumptions. Include failed attempts, tool expenses and retries under a consistent policy.'],
  ['model-latency', 'Latency', 'Execution and efficiency', 'Model', 'Request', 'Trace measurement', 'Elapsed time from model request to final token under a specified serving setup.', 'Report p50 and p95 with the serving setup, load and output length. Report timeout counts separately.'],
  ['run-latency', 'Latency', 'Execution and efficiency', 'Workflow', 'Workflow run', 'Trace measurement', 'Elapsed time from task submission to final result.', 'Record retried and failed runs. Report a timeout rate and a separate latency distribution for completed runs.'],
  ['loops', 'Iteration count', 'Execution and efficiency', 'Workflow', 'Workflow run', 'Trace measurement', 'Number of observable workflow cycles before termination.', 'Define what counts as one cycle, including planned repeats, retries and recovery loops.'],
  ['stability', 'Repeat-run stability', 'Execution and efficiency', 'Workflow', 'Test scenario', 'Repeated test', 'Share of scenarios that meet a predefined consistency rule across repeat runs.', 'Specify which inputs remain fixed, the number of repetitions and which result differences are acceptable.'],
  ['completion', 'Completion rate', 'Task completion', 'Workflow', 'Workflow run', 'Automated assertion', 'Share of started runs reaching a declared completion state.', 'Include failures and timeouts in the denominator. Define terminal status independently of task quality.'],
  ['contract', 'Output requirement pass rate', 'Task completion', 'Workflow', 'Workflow run', 'Automated assertion', 'Share of attempted runs meeting all stated output contract requirements.', 'Check schema, mandatory fields and domain invariants. Record individual failed checks for debugging.'],
  ['goal', 'Goal success rate', 'Task completion', 'Workflow', 'Workflow run', 'Reference check', 'Share of attempted runs that achieve the intended task outcome.', 'Verify the resulting state or artifact. Define partial success and how blocked attempts are reported.'],
  ['tool-selection', 'Tool selection and argument accuracy', 'Tool use and retrieval', 'Component', 'Tool decision', 'Reference check', 'Share of eligible tool decisions with an acceptable tool and compatible arguments.', 'List valid alternative tools and parameter ranges. Include decisions where the correct action requires no call.'],
  ['tool-errors', 'Tool-call error rate', 'Tool use and retrieval', 'Component', 'Tool call', 'Trace measurement', 'Share of attempted calls that fail, time out or return an invalid result.', 'Count raw attempts and report recovery after retries separately. Keep error types distinct.'],
  ['retrieval', 'Retrieval recall at k', 'Tool use and retrieval', 'Component', 'Retrieval query', 'Reference check', 'Share of labeled relevant items returned among the first k results, summarized across queries.', 'Fix k and the relevance policy. Report the aggregation rule and treatment of queries with no known relevant items.'],
  ['grounding', 'Grounding accuracy', 'Evidence use', 'Workflow', 'Claim', 'Human or model review', 'Share of material claims or decisions in observable outputs supported by retrieved evidence or tool results.', 'Give reviewers the final answer, relevant source snippets and logged tool actions. Score support claim by claim.'],
  ['logic', 'Observable consistency', 'Evidence use', 'Workflow', 'Workflow run', 'Human or model review', 'Share of runs whose recorded decisions and outputs satisfy explicit task invariants.', 'Check for contradictions across visible steps, outputs and state changes. Specify allowed plan revisions.'],
  ['reliance', 'Calibrated reliance', 'Human judgment', 'Human–AI interaction', 'Operator', 'Controlled user study', 'Correct-advice adoption and incorrect-advice rejection rates when the operator and AI initially disagree.', 'Record independent judgments before showing advice. Compute rates per operator and report both denominators.'],
  ['overreliance', 'Incorrect-advice acceptance', 'Human judgment', 'Human–AI interaction', 'Decision opportunity', 'Controlled user study', 'Share of eligible incorrect AI suggestions that users follow.', 'Define eligibility and what counts as following a suggestion. Account for repeated observations from the same participant.'],
  ['friction', 'Interaction friction', 'Human effort and control', 'Human–AI interaction', 'Task session', 'Controlled user study', 'Observable effort during a task, such as retries, extra turns or steps to recover.', 'Choose a primary measure in advance. Record failures and pair behavioral data with participant feedback when useful.'],
  ['verification', 'Verification cost', 'Human effort and control', 'Human–AI interaction', 'Task session', 'Controlled user study', 'Human time and rework required to reach a verified result.', 'Define acceptable final quality and include checking, corrections and unresolved sessions in the reporting policy.'],
  ['steering', 'Steering recovery rate', 'Human effort and control', 'Human–AI interaction', 'Task session', 'Controlled user study', 'Share of sessions in which the user successfully corrects a defined misunderstanding.', 'Give users equivalent recovery opportunities. Check whether earlier constraints survive the correction.'],
  ['artifact', 'Artifact quality', 'Task outcomes', 'Human–AI interaction', 'Artifact', 'Human review', 'Quality of the final artifact against a task-specific rubric.', 'Blind raters to the condition where feasible. Record required content, factual errors and other relevant criteria separately.'],
  ['mode', 'Collaboration-mode efficacy', 'Task outcomes', 'Human–AI interaction', 'Participant', 'Controlled user study', 'Difference in a predefined task outcome across collaboration modes.', 'Assign conditions explicitly. For within-participant studies, address ordering and practice effects.'],
  ['coverage', 'Input coverage', 'Data quality', 'Data and inputs', 'Input category', 'Dataset audit', 'Coverage of required input categories in the evaluation dataset.', 'Inventory representative languages, requests and failure cases. Compare counts with the target population or sampling plan.'],
  ['resolution', 'Time to resolution', 'Operational outcomes', 'Organizational outcomes', 'Ticket', 'A/B test', 'Elapsed time from opening to verified resolution under each rollout condition.', 'State the assignment unit, handle open tickets, and account for correlated outcomes if teams receive the same variant.'],
  ['disparity', 'Outcome disparity', 'Access and equity', 'Wider impacts', 'Customer group', 'Outcome audit', 'Difference in a defined outcome across customer groups, such as median waiting time.', 'Predefine groups, coverage requirements and uncertainty reporting. Report the underlying group outcomes and counts.'],
];

const DATA: WorkbenchMetric[] = RAW_DATA.map(
  ([id, name, category, scope, unit, method, measure, procedure]) => ({
    id,
    name,
    category,
    scope,
    unit,
    method,
    measure,
    procedure,
  }),
);

const SCOPES = [...new Set(DATA.map((item) => item.scope))].sort();
const UNITS = [...new Set(DATA.map((item) => item.unit))].sort();
const STORAGE_KEY = 'eval-workbench.plan.v1';

interface PlanState {
  ids: string[];
  decision: string;
  conditions: string;
  baseline: string;
  rule: string;
}

const EMPTY_PLAN: PlanState = {
  ids: [],
  decision: '',
  conditions: '',
  baseline: '',
  rule: '',
};

function loadSavedPlan(): { plan: PlanState; persistent: boolean } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { plan: EMPTY_PLAN, persistent: true };
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return { plan: EMPTY_PLAN, persistent: true };
    }
    const validIds = Array.isArray(parsed.ids)
      ? [...new Set<string>(parsed.ids.filter((id: unknown) => typeof id === 'string' && DATA.some((m) => m.id === id)))]
      : [];
    return {
      plan: {
        ids: validIds,
        decision: typeof parsed.decision === 'string' ? parsed.decision : '',
        conditions: typeof parsed.conditions === 'string' ? parsed.conditions : '',
        baseline: typeof parsed.baseline === 'string' ? parsed.baseline : '',
        rule: typeof parsed.rule === 'string' ? parsed.rule : '',
      },
      persistent: true,
    };
  } catch (err) {
    const isSyntax = err instanceof SyntaxError;
    return { plan: EMPTY_PLAN, persistent: isSyntax };
  }
}

function downloadFile(filename: string, content: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function scopeBadgeClasses(scope: string): string {
  switch (scope) {
    case 'Model':
      return 'border-[#C8552D]/35 bg-[#F7E4DC] text-[#7D3016]';
    case 'Component':
    case 'Workflow':
      return 'border-[#335C81]/35 bg-[#E3EAF0] text-[#1E3A54]';
    case 'Human–AI interaction':
      return 'border-[#4A6B4E]/35 bg-[#E6EDE2] text-[#2A422D]';
    default:
      return 'border-[#D49B2A]/45 bg-[#F6ECD5] text-[#6E4E12]';
  }
}

export function MetricsTaxonomyTool() {
  const [{ plan: initialPlan, persistent: initialPersistent }] = useState(loadSavedPlan);

  const [activeTab, setActiveTab] = useState<'catalog' | 'plan'>('catalog');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedScope, setSelectedScope] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(DATA[0].id);

  const [plan, setPlan] = useState<PlanState>(initialPlan);
  const [persistent, setPersistent] = useState(initialPersistent);
  const [detailStatus, setDetailStatus] = useState('');
  const [planStatus, setPlanStatus] = useState('');
  const [copied, setCopied] = useState(false);

  const detailTitleRef = useRef<HTMLHeadingElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
    } catch {
      setPersistent(false);
    }
  }, [plan]);

  const filteredMetrics = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return DATA.filter((metric) => {
      if (selectedScope && metric.scope !== selectedScope) return false;
      if (selectedUnit && metric.unit !== selectedUnit) return false;
      if (!query) return true;
      return Object.values(metric).some((val) => val.toLowerCase().includes(query));
    });
  }, [searchTerm, selectedScope, selectedUnit]);

  const effectiveSelectedId = useMemo(() => {
    if (selectedId && filteredMetrics.some((m) => m.id === selectedId)) {
      return selectedId;
    }
    return filteredMetrics[0]?.id ?? null;
  }, [filteredMetrics, selectedId]);

  const selectedMetric = useMemo(
    () => DATA.find((m) => m.id === effectiveSelectedId) ?? null,
    [effectiveSelectedId],
  );

  const selectedPlanMetrics = useMemo(
    () =>
      plan.ids
        .map((id) => DATA.find((m) => m.id === id))
        .filter((m): m is WorkbenchMetric => Boolean(m)),
    [plan.ids],
  );

  const hasFilters = Boolean(searchTerm.trim() || selectedScope || selectedUnit);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedScope('');
    setSelectedUnit('');
    searchInputRef.current?.focus();
  };

  const addMetricToPlan = (metric: WorkbenchMetric) => {
    if (plan.ids.includes(metric.id)) return;
    setPlan((prev) => ({ ...prev, ids: [...prev.ids, metric.id] }));
    setDetailStatus(`${metric.name} added to eval plan.`);
    detailTitleRef.current?.focus({ preventScroll: true });
  };

  const removeMetricFromPlan = (metric: WorkbenchMetric) => {
    setPlan((prev) => ({ ...prev, ids: prev.ids.filter((id) => id !== metric.id) }));
    setPlanStatus(`${metric.name} removed.`);
  };

  const buildMarkdown = () => {
    const missing = (text: string) => text.trim() || 'To be specified.';
    const sections = selectedPlanMetrics.map((metric) =>
      [
        `## ${metric.name}`,
        `- Scope: ${metric.scope}`,
        `- Unit of analysis: ${metric.unit}`,
        `- Suggested method: ${metric.method}`,
        `- Measure: ${metric.measure}`,
        `- Procedure: ${metric.procedure}`,
      ].join('\n'),
    );

    return (
      [
        '# Evaluation plan',
        `## Decision\n${missing(plan.decision)}`,
        `## Target population and conditions\n${missing(plan.conditions)}`,
        `## Comparison or baseline\n${missing(plan.baseline)}`,
        `## Decision rule\n${missing(plan.rule)}`,
        '# Selected measurements',
        ...sections,
      ].join('\n\n') + '\n'
    );
  };

  const handleExport = (format: 'md' | 'json') => {
    if (!selectedPlanMetrics.length) return;
    if (format === 'json') {
      const payload = {
        schemaVersion: 1,
        decision: plan.decision.trim(),
        conditions: plan.conditions.trim(),
        baseline: plan.baseline.trim(),
        rule: plan.rule.trim(),
        measurements: selectedPlanMetrics,
      };
      downloadFile('evaluation-plan.json', JSON.stringify(payload, null, 2) + '\n', 'application/json');
    } else {
      downloadFile('evaluation-plan.md', buildMarkdown(), 'text/markdown');
    }
    setPlanStatus(`Exported evaluation-plan.${format}.`);
  };

  const copyMarkdown = async () => {
    if (!selectedPlanMetrics.length) return;
    await navigator.clipboard.writeText(buildMarkdown());
    setCopied(true);
    setPlanStatus('Copied evaluation plan Markdown.');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header & Tabs */}
      <div className="vintage-box flex flex-wrap items-center justify-between gap-4 rounded-md p-5">
        <div className="space-y-1">
          <h2 className="font-display text-xl font-bold text-[#231F1A]">
            Eval Workbench &amp; Metrics Taxonomy
          </h2>
          <p className="max-w-3xl text-xs leading-relaxed text-[#5C5346]">
            Browse 29 operationalized evaluation metrics across Model, Component, Workflow,
            Human–AI interaction, Data, and Organizational scopes—then assemble and export an
            evaluation plan.
          </p>
        </div>

        <nav
          className="inline-flex rounded-md border border-[#231F1A] bg-[#EFE7D6] p-0.5 text-xs"
          aria-label="Workbench views"
        >
          <button
            type="button"
            aria-pressed={activeTab === 'catalog'}
            onClick={() => setActiveTab('catalog')}
            className={`inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 font-semibold transition ${
              activeTab === 'catalog'
                ? 'bg-[#231F1A] text-[#FBF7EE]'
                : 'text-[#231F1A] hover:bg-[#E5DBC5]'
            }`}
          >
            <Search className="h-3.5 w-3.5" />
            Metric catalog
          </button>
          <button
            type="button"
            aria-pressed={activeTab === 'plan'}
            onClick={() => setActiveTab('plan')}
            className={`inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 font-semibold transition ${
              activeTab === 'plan'
                ? 'bg-[#231F1A] text-[#FBF7EE]'
                : 'text-[#231F1A] hover:bg-[#E5DBC5]'
            }`}
          >
            <ClipboardList className="h-3.5 w-3.5" />
            Eval plan
            <span
              className={`rounded-full px-1.5 py-0.5 font-mono text-[10px] leading-none ${
                activeTab === 'plan'
                  ? 'bg-[#C8552D] text-[#FBF7EE]'
                  : 'bg-[#231F1A]/10 text-[#231F1A]'
              }`}
            >
              {selectedPlanMetrics.length}
            </span>
          </button>
        </nav>
      </div>

      {!persistent && (
        <div
          role="status"
          className="rounded-md border border-[#D49B2A] bg-[#F6ECD5] px-4 py-2 text-xs text-[#6E4E12]"
        >
          Browser storage is unavailable. Export your plan to keep it.
        </div>
      )}

      {activeTab === 'catalog' ? (
        <section
          className="grid items-start gap-6 lg:grid-cols-12"
          aria-label="Metric catalog"
        >
          {/* Left: Browse & Filter List */}
          <div className="vintage-card overflow-hidden rounded-md lg:col-span-7">
            <div className="border-b border-[#231F1A]/20 bg-[#FBF7EE] p-4 space-y-3">
              <div className="grid gap-3 sm:grid-cols-3">
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#5C5346] sm:col-span-1">
                  Search
                  <div className="relative mt-1">
                    <Search className="pointer-events-none absolute top-2.5 left-2.5 h-3.5 w-3.5 text-[#5C5346]" />
                    <input
                      ref={searchInputRef}
                      type="search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="e.g. grounding, latency"
                      className="w-full rounded-md border border-[#231F1A]/30 bg-white py-1.5 pr-2.5 pl-8 text-xs font-normal text-[#231F1A] focus:border-[#231F1A] focus:outline-none"
                    />
                  </div>
                </label>

                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#5C5346]">
                  Scope
                  <select
                    value={selectedScope}
                    onChange={(e) => setSelectedScope(e.target.value)}
                    className="mt-1 w-full rounded-md border border-[#231F1A]/30 bg-white px-2.5 py-1.5 text-xs font-normal text-[#231F1A] focus:border-[#231F1A] focus:outline-none"
                  >
                    <option value="">All scopes</option>
                    {SCOPES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#5C5346]">
                  Unit of analysis
                  <select
                    value={selectedUnit}
                    onChange={(e) => setSelectedUnit(e.target.value)}
                    className="mt-1 w-full rounded-md border border-[#231F1A]/30 bg-white px-2.5 py-1.5 text-xs font-normal text-[#231F1A] focus:border-[#231F1A] focus:outline-none"
                  >
                    <option value="">All units</option>
                    {UNITS.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="flex items-center justify-between gap-2 text-xs">
                <p className="font-mono text-[11px] text-[#5C5346]" role="status">
                  {filteredMetrics.length} of {DATA.length} measurements
                </p>
                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex items-center gap-1 font-medium text-[#C8552D] hover:underline"
                  >
                    <RotateCcw className="h-3 w-3" />
                    Clear filters
                  </button>
                )}
              </div>
            </div>

            {filteredMetrics.length > 0 ? (
              <ul className="divide-y divide-[#231F1A]/15 max-h-[42rem] overflow-y-auto">
                {filteredMetrics.map((metric) => {
                  const isSelected = metric.id === effectiveSelectedId;
                  const inPlan = plan.ids.includes(metric.id);
                  return (
                    <li key={metric.id}>
                      <button
                        type="button"
                        aria-current={isSelected ? 'true' : 'false'}
                        onClick={() => {
                          setSelectedId(metric.id);
                          setDetailStatus('');
                          if (window.matchMedia('(max-width: 1023px)').matches) {
                            setTimeout(() => detailTitleRef.current?.focus(), 0);
                          }
                        }}
                        className={`flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition ${
                          isSelected
                            ? 'bg-[#EFE7D6] shadow-[inset_4px_0_0_#231F1A]'
                            : 'bg-[#FBF7EE] hover:bg-[#F6ECD5]/70'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-[#231F1A]">
                              {metric.name}
                            </span>
                            {inPlan && (
                              <span className="rounded bg-[#E6EDE2] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#2A422D]">
                                In plan
                              </span>
                            )}
                          </div>
                          <div className="mt-0.5 text-[11px] text-[#5C5346]">
                            {metric.category} · {metric.unit}
                          </div>
                        </div>
                        <span
                          className={`shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${scopeBadgeClasses(
                            metric.scope,
                          )}`}
                        >
                          {metric.scope}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="px-6 py-12 text-center text-xs text-[#5C5346] space-y-2">
                <Filter className="mx-auto h-6 w-6 text-[#5C5346]/40" />
                <p className="font-semibold text-[#231F1A]">No matching metrics.</p>
                <p>Try a different term or clear the filters.</p>
              </div>
            )}
          </div>

          {/* Right: Sticky Metric Detail Panel */}
          <aside className="lg:col-span-5" aria-label="Selected metric">
            {selectedMetric && (
              <div className="vintage-card sticky top-24 rounded-md p-5 space-y-4">
                <div>
                  <span
                    className={`inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${scopeBadgeClasses(
                      selectedMetric.scope,
                    )}`}
                  >
                    {selectedMetric.scope} · {selectedMetric.category}
                  </span>
                  <h3
                    ref={detailTitleRef}
                    tabIndex={-1}
                    className="mt-2 font-display text-xl font-bold text-[#231F1A] focus:outline-none"
                  >
                    {selectedMetric.name}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#5C5346]">
                    {selectedMetric.measure}
                  </p>
                </div>

                <dl className="space-y-3 border-t border-[#231F1A]/15 pt-3 text-xs">
                  <div>
                    <dt className="font-semibold text-[#231F1A]">Unit of analysis</dt>
                    <dd className="mt-0.5 text-[#5C5346]">{selectedMetric.unit}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[#231F1A]">Suggested method</dt>
                    <dd className="mt-0.5 text-[#5C5346]">{selectedMetric.method}</dd>
                  </div>
                  <div>
                    <dt className="font-semibold text-[#231F1A]">How to measure</dt>
                    <dd className="mt-0.5 leading-relaxed text-[#5C5346]">
                      {selectedMetric.procedure}
                    </dd>
                  </div>
                </dl>

                <div className="border-t border-[#231F1A]/15 pt-3 space-y-2">
                  {plan.ids.includes(selectedMetric.id) ? (
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        disabled
                        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-[#4A6B4E] bg-[#E6EDE2] px-3 py-2 text-xs font-semibold text-[#2A422D] opacity-90"
                      >
                        <Check className="h-3.5 w-3.5" />
                        Added to eval plan
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab('plan')}
                        className="vintage-btn rounded-md bg-[#FBF7EE] px-3 py-2 text-xs font-semibold text-[#231F1A]"
                      >
                        View plan ({selectedPlanMetrics.length}) →
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => addMetricToPlan(selectedMetric)}
                      className="vintage-btn inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-[#231F1A] px-3 py-2 text-xs font-semibold text-[#FBF7EE]"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add to eval plan
                    </button>
                  )}
                  {detailStatus && (
                    <p className="text-[11px] font-medium text-[#2A422D]" role="status">
                      {detailStatus}
                    </p>
                  )}
                </div>
              </div>
            )}
          </aside>
        </section>
      ) : (
        /* Eval Plan Builder Tab */
        <section className="grid items-start gap-6 lg:grid-cols-12" aria-label="Evaluation plan">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="vintage-box rounded-md p-5 space-y-4 lg:col-span-6"
          >
            <div>
              <h3 className="font-display text-lg font-bold text-[#231F1A]">Define your eval</h3>
              <p className="mt-0.5 text-xs text-[#5C5346]">
                Describe the decision, then specify the evidence it requires.
              </p>
            </div>

            <label className="block text-xs font-semibold text-[#231F1A]">
              Decision
              <input
                value={plan.decision}
                onChange={(e) => setPlan((p) => ({ ...p, decision: e.target.value }))}
                placeholder="Ship a redesigned review interface?"
                className="mt-1 w-full rounded-md border border-[#231F1A]/30 bg-white px-3 py-2 text-xs font-normal text-[#231F1A] focus:border-[#231F1A] focus:outline-none"
              />
            </label>

            <label className="block text-xs font-semibold text-[#231F1A]">
              Target population and conditions
              <textarea
                rows={3}
                value={plan.conditions}
                onChange={(e) => setPlan((p) => ({ ...p, conditions: e.target.value }))}
                placeholder="Operators review representative tickets under ordinary time pressure."
                className="mt-1 w-full rounded-md border border-[#231F1A]/30 bg-white px-3 py-2 text-xs font-normal text-[#231F1A] focus:border-[#231F1A] focus:outline-none"
              />
            </label>

            <label className="block text-xs font-semibold text-[#231F1A]">
              Comparison or baseline
              <input
                value={plan.baseline}
                onChange={(e) => setPlan((p) => ({ ...p, baseline: e.target.value }))}
                placeholder="Current review interface"
                className="mt-1 w-full rounded-md border border-[#231F1A]/30 bg-white px-3 py-2 text-xs font-normal text-[#231F1A] focus:border-[#231F1A] focus:outline-none"
              />
            </label>

            <label className="block text-xs font-semibold text-[#231F1A]">
              Decision rule
              <textarea
                rows={3}
                value={plan.rule}
                onChange={(e) => setPlan((p) => ({ ...p, rule: e.target.value }))}
                placeholder="Set an acceptance threshold and state how you'll handle uncertainty."
                className="mt-1 w-full rounded-md border border-[#231F1A]/30 bg-white px-3 py-2 text-xs font-normal text-[#231F1A] focus:border-[#231F1A] focus:outline-none"
              />
            </label>
          </form>

          <section
            className="vintage-card rounded-md p-5 space-y-4 lg:col-span-6"
            aria-labelledby="selected-heading"
          >
            <div className="flex items-center justify-between gap-2">
              <h3 id="selected-heading" className="font-display text-lg font-bold text-[#231F1A]">
                Selected measurements ({selectedPlanMetrics.length})
              </h3>
              <button
                type="button"
                onClick={() => setActiveTab('catalog')}
                className="text-xs font-semibold text-[#C8552D] hover:underline"
              >
                + Browse catalog
              </button>
            </div>

            {selectedPlanMetrics.length === 0 ? (
              <div className="rounded-md border border-dashed border-[#231F1A]/25 bg-[#F5EFE2]/60 p-6 text-center text-xs text-[#5C5346]">
                Add a measurement from the metric catalog to build your plan.
              </div>
            ) : (
              <ul className="divide-y divide-[#231F1A]/15">
                {selectedPlanMetrics.map((metric) => (
                  <li key={metric.id} className="py-3 first:pt-1 last:pb-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-semibold text-[#231F1A]">
                        {metric.name} · <span className="text-[#5C5346]">{metric.scope}</span>
                      </h4>
                      <button
                        type="button"
                        aria-label={`Remove ${metric.name} (${metric.scope})`}
                        onClick={() => removeMetricFromPlan(metric)}
                        className="inline-flex shrink-0 items-center gap-1 text-[11px] font-medium text-[#7D3016] hover:underline"
                      >
                        <Trash2 className="h-3 w-3" />
                        Remove
                      </button>
                    </div>
                    <p className="font-mono text-[11px] text-[#5C5346]">
                      {metric.unit} · {metric.method}
                    </p>
                    <p className="text-xs text-[#5C5346]">{metric.measure}</p>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-wrap gap-2 border-t border-[#231F1A]/15 pt-3">
              <button
                type="button"
                disabled={selectedPlanMetrics.length === 0}
                onClick={copyMarkdown}
                className="vintage-btn inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-[#231F1A] px-3 py-2 text-xs font-semibold text-[#FBF7EE] disabled:opacity-50"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied Markdown' : 'Copy Markdown'}
              </button>
              <button
                type="button"
                disabled={selectedPlanMetrics.length === 0}
                onClick={() => handleExport('md')}
                className="inline-flex items-center gap-1.5 rounded-md border border-[#231F1A]/30 bg-white px-3 py-2 text-xs font-semibold text-[#231F1A] hover:bg-[#F5EFE2] disabled:opacity-50"
              >
                <Download className="h-3.5 w-3.5" />
                Export .md
              </button>
              <button
                type="button"
                disabled={selectedPlanMetrics.length === 0}
                onClick={() => handleExport('json')}
                className="inline-flex items-center gap-1.5 rounded-md border border-[#231F1A]/30 bg-white px-3 py-2 text-xs font-semibold text-[#231F1A] hover:bg-[#F5EFE2] disabled:opacity-50"
              >
                <Download className="h-3.5 w-3.5" />
                Export .json
              </button>
            </div>

            {planStatus && (
              <p className="text-[11px] font-medium text-[#2A422D]" role="status">
                {planStatus}
              </p>
            )}
          </section>
        </section>
      )}
    </div>
  );
}

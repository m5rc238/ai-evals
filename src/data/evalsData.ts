export const STATEMENT_TYPES = [
  {
    type: 'Empirical claims',
    description: 'Statements about what observations, tests, or studies actually show under specified conditions.',
    example: '"This version achieved 85/100 on the 100-item task set under these retrieval and prompt settings."',
  },
  {
    type: 'Conceptual & normative choices',
    description: 'Definitions, priorities, requirements, and value judgments about acceptable risks and consequences.',
    example: '"Material claims must cite supporting passages; any unauthorized data disclosure blocks release."',
  },
  {
    type: 'Practical recommendations',
    description: 'Proposed procedures whose suitability depends on the question, stakes, available evidence, and resources.',
    example: '"Use blinded specialist review for disputed claims and regression suites for previously observed failures."',
  },
] as const;

export const OPERATING_RULES = [
  {
    id: 'decision',
    number: 1,
    title: 'Start with the decision',
    rule: 'The decision determines the layer, the unit of analysis, and the required level of rigor.',
  },
  {
    id: 'spec',
    number: 2,
    title: 'Treat the eval as the spec',
    rule: 'Define failure modes and grading criteria on a small set of real examples before iterating on prompts or architecture (refine criteria during exploratory error analysis, then lock them before confirmatory tests).',
  },
  {
    id: 'contamination',
    number: 3,
    title: 'Account for benchmark contamination',
    rule: 'Public test cases can enter training data; for deployment decisions, use private, refreshed cases that reflect your domain.',
  },
  {
    id: 'goodhart',
    number: 4,
    title: 'Watch for Goodhart’s Law',
    rule: 'Optimizing a single metric can undermine the goal it represents; pair primary metrics with tradeoff measures such as latency, cost, or human audit time.',
  },
] as const;

export const JUDGE_MECHANISMS = [
  {
    name: 'Deterministic code checks',
    suitableFor: 'Schemas, calculations, exact tool arguments, execution results, and environment state changes.',
    checkNeeded: 'Verify the check matches the real requirement and does not reject valid alternative phrasing.',
  },
  {
    name: 'Human reviewers',
    suitableFor: 'Domain correctness, nuanced failures, contextual usefulness, and building the gold reference set.',
    checkNeeded: 'Give reviewers full source context, collect independent initial ratings, and tighten ambiguous rules.',
  },
  {
    name: 'LLM-as-a-judge',
    suitableFor: 'Scaling well-defined criteria across large batches once validated against human judgment.',
    checkNeeded: 'Calibrate on held-out human labels, audit rare-failure recall (false negatives), and test verbosity/position/self-preference biases.',
  },
  {
    name: 'Production telemetry + scoring rules',
    suitableFor: 'Observing real-world behavior in live use—such as whether an analyst edits or deletes a generated citation.',
    checkNeeded: 'Telemetry supplies raw behavioral evidence, not a score; define an explicit scoring rule for how that signal counts and watch for confounding.',
  },
] as const;

export const ESSENTIAL_GLOSSARY = [
  { term: 'Dataset (Stimulus)', def: 'The inputs, scenarios, or real-world logs used to elicit or observe system behavior.' },
  { term: 'Rubric (Criteria)', def: 'The explicit definition of what counts as accurate, useful, safe, or failing behavior.' },
  { term: 'Judge (Scorer)', def: 'The mechanism—deterministic code, LLM grader, or human reviewer—that applies the rubric to produce scores.' },
  { term: 'Telemetry', def: 'Production behavioral signals (e.g., citation edits, retries, abandonments) that supply raw evidence; a scoring rule still determines how that evidence counts.' },
  { term: 'Unit of analysis', def: 'What each item represents when aggregating or comparing results (e.g., claim, response, workflow run, task session, analyst, or team).' },
  { term: 'Model', def: 'The trained statistical/neural weights or API endpoint producing predictions or generations under given parameters.' },
  { term: 'System / Harness', def: 'The integrated arrangement—model plus prompts, retrieval, tools, memory, permissions, stopping rules, and UI.' },
  { term: 'Baseline', def: 'A reference condition (existing human workflow, simpler non-AI fix, or prior pinned version) used to interpret relative performance.' },
  { term: 'Ground truth', def: 'A verified reference standard or observation against which outputs are compared; often imperfect or disputed in open-ended tasks.' },
  { term: 'Metric', def: 'A quantitative summary rule (e.g., pass rate, recall, Brier score, cost per run) computed over scored units.' },
  { term: 'Construct validity', def: 'Whether the test measures the actual goal rather than an artifact such as polish, length, or surface phrasing.' },
  { term: 'External validity', def: 'How well results generalize beyond the studied sample to the real conditions, users, and distributions you care about.' },
  { term: 'Reliability', def: 'Consistency or stability of measurements across repeated runs, prompt paraphrases, or independent assessors.' },
  { term: 'Robustness', def: 'Ability of a system to maintain acceptable performance under perturbations, ambiguity, or distribution shift.' },
  { term: 'Calibration', def: 'Alignment between expressed confidence (or probability estimates) and actual empirical frequency of correctness.' },
  { term: 'Goodhart’s Law', def: 'When a metric becomes a target to optimize, it ceases to be a good measure—requiring paired tradeoff metrics to catch gaming.' },
] as const;

export const SCOPES = [
  {
    id: 'data',
    name: 'Data & Inputs',
    question: 'Do source packets cover the evidence analysts actually encounter?',
    unit: 'Source packet / input category',
    boundary: 'Evaluation datasets, source documents, logs, and case mix before model execution.',
    transferWarning: 'Clean, unrepresentative packets hide real-world parsing and coverage failures.',
  },
  {
    id: 'model',
    name: 'Isolated Model',
    question: 'Are the model’s claims supported by the sources it receives?',
    unit: 'Claim or response',
    boundary: 'Model weights/API under controlled prompts and parameters.',
    transferWarning: 'High model scores do not prove product success—and workflow verification can catch occasional model errors.',
  },
  {
    id: 'component',
    name: 'Component',
    question: 'Does retrieval surface the most relevant documents?',
    unit: 'Search query / tool call',
    boundary: 'Isolated subsystem (e.g., retriever, guardrail, tool router).',
    transferWarning: 'Good retrieval does not guarantee faithful synthesis or low user verification cost.',
  },
  {
    id: 'workflow',
    name: 'Workflow / Agent',
    question: 'Does the system preserve citations across a full brief revision?',
    unit: 'End-to-end run',
    boundary: 'Integrated system (model + execution harness: retrieval, prompts, tools, memory, permissions, stopping rules, UI).',
    transferWarning: 'Automated workflow completion does not prove users produce better final work or save total time.',
  },
  {
    id: 'human-ai',
    name: 'Human–AI Interaction',
    question: 'Can analysts catch and correct an unsupported conclusion?',
    unit: 'Task session or analyst',
    boundary: 'Human + system performing tasks together against an explicit comparator.',
    transferWarning: 'A factually accurate model can still fail if the interface makes verification too costly.',
  },
  {
    id: 'org',
    name: 'Organizational',
    question: 'Do teams produce verified briefs faster after adoption?',
    unit: 'Team or team-week',
    boundary: 'Team/institution workflows, oversight capacity, maintenance, and operational overhead.',
    transferWarning: 'Local team speedups can still add review bottlenecks, maintenance cost, or errors elsewhere.',
  },
  {
    id: 'wider',
    name: 'Wider Impacts',
    question: 'Does access to reliable research improve across language groups?',
    unit: 'Language community / group',
    boundary: 'Broader affected populations, institutions, equity, and resource footprints.',
    transferWarning: 'Product-level averages can conceal disparities across languages, regions, or affected groups.',
  },
] as const;

export const TARGET_INVENTORY = [
  { name: 'Reasoning & problem-solving', concerns: 'Mathematical, logical, causal, spatial, temporal, and planning performance.' },
  { name: 'Knowledge & factual calibration', concerns: 'Factual support, knowledge coverage, uncertainty, calibration, correction, and abstention.' },
  { name: 'Language & communication', concerns: 'Comprehension, generation, translation, summarization, pragmatics, instruction following.' },
  { name: 'Multimodal perception & generation', concerns: 'Image, audio, video, document, and cross-modal performance.' },
  { name: 'Learning & adaptation', concerns: 'Transfer, sample efficiency, adaptation, retention, and forgetting.' },
  { name: 'Coding & technical competence', concerns: 'Implementation, debugging, testing, maintenance, and execution correctness.' },
  { name: 'Behavioral characteristics & controllability', concerns: 'Consistency, permission adherence, response to correction, conflicting instructions.' },
  { name: 'Safety, security & privacy', concerns: 'Harmful assistance, vulnerabilities, unauthorized actions, information exposure.' },
  { name: 'Fairness & accessibility', concerns: 'Consequential disparities, representation, barriers, performance across populations.' },
  { name: 'Robustness & resilience', concerns: 'Performance under changed conditions, perturbations, failures, and recovery.' },
  { name: 'Operational performance', concerns: 'Latency, throughput, resource use, cost, availability, scalability.' },
  { name: 'Human & collective outcomes', concerns: 'Work quality, task completion, effort, learning, decision quality, downstream effects.' },
] as const;

export const EVIDENCE_METHODS = [
  { name: 'Benchmarks & executable tests', establishes: 'Performance on specified tasks or requirements.', limitation: 'Generalization beyond tested conditions requires justification.' },
  { name: 'Trace & error analysis', establishes: 'Recurring failures and possible points of breakdown (Husain & Shankar).', limitation: 'Logs may omit user intentions, abandoned work, or downstream consequences.' },
  { name: 'Adversarial testing & red teaming', establishes: 'Whether particular failure paths can be found.', limitation: 'Findings generally do not estimate ordinary-use prevalence.' },
  { name: 'Formal verification', establishes: 'Specified properties under explicit assumptions.', limitation: 'Delimited by specification, model, assumptions, and link to deployed system.' },
  { name: 'Interviews & qualitative inquiry', establishes: 'Needs, interpretations, expectations, and explanations of experience.', limitation: 'Reports do not directly establish causal effects or task performance.' },
  { name: 'Observed task studies', establishes: 'How people use the system and where interaction breaks down.', limitation: 'Study conditions may differ from routine use.' },
  { name: 'Comparative experiments', establishes: 'Effects of specified alternatives under the study design.', limitation: 'Conclusions depend on allocation, measurement, adherence, and assumptions.' },
  { name: 'Field studies & monitoring', establishes: 'Behavior and consequences in actual deployment.', limitation: 'Confounding, selection, missing data, and changing conditions complicate inference.' },
] as const;

export const SAMPLING_PURPOSES = [
  { name: 'Discovery sampling', role: 'Seeks informative or unusual cases to uncover failure modes.', warning: 'Cannot estimate production failure rates.' },
  { name: 'Representative sampling', role: 'Supports statistical estimates about a defined population.', warning: 'Only valid for the population and conditions actually sampled.' },
  { name: 'Challenge sampling', role: 'Deliberately stresses suspected weaknesses or edge cases.', warning: 'High failure rates here do not equal typical-use rates.' },
  { name: 'Regression collections', role: 'Preserves previously discovered failures to prevent backsliding.', warning: 'Passing regression tests does not prove new capabilities or unseen safety.' },
] as const;

export interface ValidityCategory {
  id: 'measurement' | 'design' | 'reliability';
  label: string;
  subtitle: string;
  corePrinciple: string;
  items: { name: string; question: string }[];
}

export const VALIDITY_CATEGORIES: ValidityCategory[] = [
  {
    id: 'measurement',
    label: 'Category A — Validity of Measurement & Interpretation',
    subtitle: 'Evidence and reasoning supporting a specific score interpretation and intended use (Standards for Educational and Psychological Testing, 2014).',
    corePrinciple:
      'Validity is not a single numerical score or universal property of a test; it is an argument linking constructs, indicators, instruments, scores, interpretations, and decisions for a specific use.',
    items: [
      { name: 'Construct validity', question: 'Do the observations and scores genuinely reflect the defined theoretical or practical construct rather than irrelevant artifacts?' },
      { name: 'Content validity', question: 'Do the test items, prompts, and tasks adequately represent the target domain and specification?' },
      { name: 'Criterion-related evidence', question: 'Do evaluation scores correlate with or predict relevant external criteria and downstream outcomes?' },
      { name: 'Consequential considerations', question: 'What are the intended and unintended social, operational, and human consequences of using these scores for decisions?' },
      { name: 'Argument-based validation', question: 'Is every inferential link—from observation to score, generalization, and decision—explicitly justified and stress-tested?' },
    ],
  },
  {
    id: 'design',
    label: 'Category B — Study Design, Causal Inference & Generalization',
    subtitle: 'Whether observed differences reflect causal effects of the system and generalize beyond the studied sample.',
    corePrinciple:
      'Internal, external, and ecological validity address distinct study-design and generalization questions—they are not interchangeable subtypes of one validity score.',
    items: [
      { name: 'Internal validity', question: 'Is the observed difference plausibly attributable to the AI intervention rather than confounding, selection bias, or attrition?' },
      { name: 'External validity & generalizability', question: 'How far can findings be generalized beyond the studied tasks, user population, prompts, and time period?' },
      { name: 'Ecological validity', question: 'Do study tasks, tools, time pressures, and incentives reflect the relevant real-world deployment context?' },
      { name: 'Randomization & causal inference', question: 'Does the design (e.g., randomized control, counterbalancing, or explicit observational assumptions) support a causal claim?' },
      { name: 'Distribution shift & context dependence', question: 'How sensitive are results to shifts in inputs, model versions, harnesses, or user populations?' },
    ],
  },
  {
    id: 'reliability',
    label: 'Category C — Reliability, Reproducibility & Traceability',
    subtitle: 'Consistency of measurement and transparency of the evaluation pipeline.',
    corePrinciple:
      'Reliability and validity are related but distinct. A measure can be highly reliable without supporting the intended interpretation or use; likewise, reproducibility and traceability are necessary for trustworthy evaluations but do not substitute for validity evidence.',
    items: [
      { name: 'Measurement & test-retest reliability', question: 'How consistent are scores across repeated runs, prompt paraphrases, or equivalent test forms?' },
      { name: 'Inter-rater reliability', question: 'How consistently do independent human assessors or calibrated judges score the same outputs?' },
      { name: 'Reproducibility & replicability', question: 'Can independent teams re-run the procedure on the same data (reproducibility) or new samples (replicability) and obtain consistent findings?' },
      { name: 'Version control & dataset provenance', question: 'Are model snapshots, harnesses, prompts, rubrics, and dataset origins pinned and documented?' },
      { name: 'Evaluation traceability & audit trails', question: 'Can reviewers inspect raw inputs, tool calls, retrieved passages, and scoring logs for any result?' },
    ],
  },
];

export const REPORTING_CLAIMS = [
  {
    overextended: '“The AI is accurate.”',
    defensible: '“This version achieved the reported accuracy on these tasks under these conditions.”',
    why: 'Accuracy is conditional on version, task distribution, prompt/harness, and scoring rules.',
  },
  {
    overextended: '“The model can reason.”',
    defensible: '“The results support this specified behavioral-capability claim, subject to these alternative explanations and limits.”',
    why: 'Correct answers underdetermine the mechanism (could reflect memorization, shortcuts, or tool use).',
  },
  {
    overextended: '“The system is safe.”',
    defensible: '“The specified tests found these failures and did not observe these other failures within the documented coverage; remaining risks and gaps are documented.”',
    why: 'Absence of observed failures in finite tests does not establish universal safety.',
  },
  {
    overextended: '“Users benefit.”',
    defensible: '“The study observed improvement in these outcomes for this population and comparator.”',
    why: 'Human benefit depends on the baseline workflow, user expertise, and measured outcome.',
  },
  {
    overextended: '“The judge is reliable.”',
    defensible: '“The judge showed this agreement and these error patterns on an independent assessment for this intended use.”',
    why: 'High overall agreement can conceal missed rare failures or systematic biases.',
  },
  {
    overextended: '“No subgroup bias exists.”',
    defensible: '“The assessment found these differences with these uncertainties; these groups or effects were not adequately assessed.”',
    why: 'Inconclusive subgroup differences or unmeasured groups do not prove parity.',
  },
  {
    overextended: '“The new version is better.”',
    defensible: '“The new version improved these outcomes under this comparison, with these trade-offs.”',
    why: 'Improvements on some metrics may accompany regressions in cost, latency, or rare errors.',
  },
] as const;

export const PROTOCOL_FIELDS = [
  { id: 'purpose', label: '1. Purpose & intended claims', placeholder: 'What is being investigated, why it matters, and what could change the decision.' },
  { id: 'conceptual', label: '2. Conceptual basis', placeholder: 'Definitions, relevant theory, normative choices, and alternative explanations.' },
  { id: 'scope', label: '3. System identity & scope', placeholder: 'Versions, configuration, tools, permissions, boundaries, and units of analysis.' },
  { id: 'context', label: '4. Targets & context', placeholder: 'Properties/outcomes, tasks, populations, environments, coverage, and exclusions.' },
  { id: 'criteria', label: '5. Criteria & measurement', placeholder: 'Definitions, rubrics, scales, applicability, missing-case handling, and limitations.' },
  { id: 'comparators', label: '6. Comparators & design', placeholder: 'Baselines, allocation, controls, and conditions held comparable.' },
  { id: 'evidence', label: '7. Evidence collection', placeholder: 'Sources, sampling purposes, provenance, and privacy arrangements.' },
  { id: 'validation', label: '8. Evaluator validation', placeholder: 'Independent checks, human/judge calibration, and consequential error patterns.' },
  { id: 'analysis', label: '9. Analysis & inference', placeholder: 'Estimates, dependence, uncertainty, subgroup analyses, and exploratory choices.' },
  { id: 'decisionRules', label: '10. Decision rules', placeholder: 'Thresholds, severity, trade-offs, escalation, and unresolved cases.' },
  { id: 'governance', label: '11. Governance', placeholder: 'Roles, participation, independence, conflicts, and accountability.' },
  { id: 'reevaluation', label: '12. Reporting & reevaluation', placeholder: 'Findings, limitations, traceable records, monitoring, triggers, and owners.' },
] as const;

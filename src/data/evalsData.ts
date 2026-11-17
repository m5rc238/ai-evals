export interface FlowNode {
  id: string;
  number: string;
  title: string;
  layer: 'core' | 'cross-cutting' | 'outer';
  question: string;
  summary: string;
  practicalOutput: string;
  caution: string;
}

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

export const FLOW_NODES: FlowNode[] = [
  {
    id: 'purpose',
    number: '1',
    title: 'Purpose & Decision',
    layer: 'core',
    question: 'What do we need to learn, and what decision will it inform?',
    summary: 'Name the specific uncertainty, system, task, population, comparator, desired outcome, and constraints.',
    practicalOutput: 'Short evaluation brief stating the decision, question, comparator, and evidence that could change your mind.',
    caution: 'Repeatedly tuning criteria to the same dataset and presenting the final run as an independent confirmatory test invalidates confirmation.',
  },
  {
    id: 'scope',
    number: '2',
    title: 'Scope & Unit',
    layer: 'core',
    question: 'What exactly are we evaluating?',
    summary: 'Define the system boundary (model, subsystem, harness, human–AI team, organization) and unit of analysis.',
    practicalOutput: 'System-boundary statement, versioned configuration, unit of analysis, and explicit exclusions.',
    caution: 'Evidence at one scope (e.g., model benchmark) does not automatically establish a claim at another (e.g., team productivity).',
  },
  {
    id: 'context',
    number: '3',
    title: 'Context & Coverage',
    layer: 'core',
    question: 'For whom, on which tasks, under which conditions?',
    summary: 'Document users, languages, inputs, tools, stakes, comparators, and what remains untested.',
    practicalOutput: 'Coverage matrix linking tasks and populations to test conditions, with explicit exclusions.',
    caution: 'Short English abstract tests do not establish performance on multilingual full-text synthesis.',
  },
  {
    id: 'criteria',
    number: '4',
    title: 'Criteria & Rubrics',
    layer: 'core',
    question: 'What would count as success, failure, benefit, or harm?',
    summary: 'Operationalize constructs into observable indicators, scoring rules, anchors, and limitations.',
    practicalOutput: 'Versioned criteria register and rubric with rationale, applicability, and known limitations.',
    caution: 'Avoid inferring hidden mental states (beliefs, intentions) when evidence only covers observable behavior.',
  },
  {
    id: 'evidence',
    number: '5',
    title: 'Collect Evidence',
    layer: 'core',
    question: 'Which observations, tests, or studies can answer the question?',
    summary: 'Match methods (benchmarks, traces, red teaming, user studies, RCTs) and sampling purposes to the question.',
    practicalOutput: 'Collection plan linking each evidence source, sampling frame, provenance, and privacy controls to its intended inference.',
    caution: 'Challenge or complaint-enriched sets are valuable for diagnosis, but their failure rates do not estimate production prevalence.',
  },
  {
    id: 'measurement',
    number: '6',
    title: 'Measure & Grade',
    layer: 'core',
    question: 'How will we turn evidence into interpretable judgments?',
    summary: 'Select and validate code checks, human review, or LLM judges; preserve severity and subgroup differences.',
    practicalOutput: 'Measurement specification, evaluator-validation record, and severity-preserving aggregation policy.',
    caution: 'Silently dropping missing evidence, nonapplicable criteria, or failed runs distorts denominators and conclusions.',
  },
  {
    id: 'decision',
    number: '10',
    title: 'Results to Decision',
    layer: 'core',
    question: 'Given the findings and limitations, what action is justified?',
    summary: 'Weigh established findings, conditions, remaining uncertainty, trade-offs, and reconsideration triggers.',
    practicalOutput: 'Bounded decision statement with accountable owner and reconsideration triggers.',
    caution: 'Urgency does not strengthen inconclusive evidence; narrow claims or restricted pilots are valid outcomes.',
  },
  {
    id: 'time',
    number: '7',
    title: 'Time & Lifecycle',
    layer: 'cross-cutting',
    question: 'When should we evaluate again, and what may have changed?',
    summary: 'Reevaluate proportionately when models, prompts, retrieval, users, rubrics, or failure patterns change.',
    practicalOutput: 'Monitoring plan, separate product/evaluator version histories, and reevaluation triggers.',
    caution: 'Stable inputs do not guarantee stable performance, and an input shift is not automatically a performance decline.',
  },
  {
    id: 'governance',
    number: 'G',
    title: 'Governance',
    layer: 'cross-cutting',
    question: 'Who sets the terms, participates, reviews, and remains accountable?',
    summary: 'Assign ownership for questions, criteria, affected-user participation, independent review, and risk acceptance.',
    practicalOutput: 'Named roles, consultation vs. decision authority, escalation routes, and oversight checks.',
    caution: 'Assigning a human reviewer does not prove they have adequate time, expertise, visibility, or authority to intervene.',
  },
  {
    id: 'quality',
    number: '8',
    title: 'Evaluation Quality & Validity',
    layer: 'outer',
    question: 'What conclusions can this evaluation credibly support?',
    summary: 'Assess validity as an argument supporting specific score interpretations and intended uses.',
    practicalOutput: 'Justification record linking each intended claim to supporting evidence, assumptions, and unresolved threats.',
    caution: 'A reliable rubric can consistently measure an inadequate proxy; confidence intervals do not measure rubric validity.',
  },
];

export const EVAL_TAXONOMY = [
  { name: 'Capability evaluation', focus: 'What tasks or problems a model or system can solve under specified conditions.' },
  { name: 'Behavioral evaluation', focus: 'Observable patterns of response (e.g., abstention, instruction adherence, sycophancy, refusal) without claiming internal mechanisms.' },
  { name: 'Safety evaluation', focus: 'Propensity for harmful assistance, policy violations, unauthorized actions, or unsafe failure modes.' },
  { name: 'Reliability & robustness evaluation', focus: 'Consistency across repetitions, perturbations, distribution shifts, missing data, and edge cases.' },
  { name: 'Human-centered evaluation', focus: 'How people interact with the system, trust/rely on it, experience workload, and achieve goals.' },
  { name: 'Task-based evaluation', focus: 'End-to-end completion and quality on realistic, contextualized user tasks rather than isolated snippets.' },
  { name: 'Benchmark-based evaluation', focus: 'Standardized, repeatable task suites enabling controlled comparisons across versions or models.' },
  { name: 'Deployment & production evaluation', focus: 'Live behavior, incidents, latency, cost, and drift in actual operational settings.' },
  { name: 'Comparative evaluation', focus: 'Controlled head-to-head assessment against explicit baselines (human alone, simpler tool, prior version).' },
  { name: 'Longitudinal evaluation', focus: 'Repeated measurement over days or weeks to observe familiarization, skill retention, trust calibration, and drift.' },
] as const;

export const ESSENTIAL_GLOSSARY = [
  { term: 'Model', def: 'The trained statistical/neural weights or API endpoint producing predictions or generations under given parameters.' },
  { term: 'System', def: 'The integrated arrangement—model plus prompts, retrieval, tools, memory, guardrails, permissions, and user interface.' },
  { term: 'Task', def: 'A defined unit of work or problem with inputs, constraints, and an intended goal.' },
  { term: 'Benchmark', def: 'A standardized collection of tasks, reference rules, and scoring procedures designed for repeatable comparison.' },
  { term: 'Dataset', def: 'A curated set of examples (inputs, contexts, and optional reference labels) used for testing or analysis.' },
  { term: 'Metric', def: 'A quantitative summary rule (e.g., F1, Brier score, task completion rate) computed over scored observations.' },
  { term: 'Criterion', def: 'An explicit standard or property (e.g., source fidelity) defining what counts as success, failure, benefit, or harm.' },
  { term: 'Evaluator', def: 'The mechanism—code check, human specialist, or calibrated model judge—that assigns judgments against criteria.' },
  { term: 'Ground truth', def: 'A verified reference standard or observation against which outputs are compared; often imperfect or disputed in open-ended tasks.' },
  { term: 'Baseline', def: 'A reference condition (existing human workflow, simpler heuristic, or prior version) used to interpret relative performance.' },
  { term: 'Generalization', def: 'The degree to which performance observed on tested examples holds on unseen tasks, users, or environments.' },
  { term: 'Reliability', def: 'Consistency or stability of measurements across repeated runs, prompts, or independent assessors.' },
  { term: 'Validity', def: 'The extent to which evidence and theory support a specific interpretation and intended use of evaluation scores.' },
  { term: 'Robustness', def: 'Ability of a system to maintain acceptable performance under perturbations, ambiguity, or distribution shift.' },
  { term: 'Calibration', def: 'Alignment between expressed confidence (or probability estimates) and actual empirical frequency of correctness.' },
] as const;

export const EVIDENCE_HIERARCHY = [
  { level: 'Systematic reviews & meta-analyses', role: 'Synthesize effect sizes and heterogeneity across multiple independent studies (e.g., Vaccaro et al., 2024).' },
  { level: 'Peer-reviewed empirical research', role: 'Experiments, RCTs, and user studies vetted through independent scholarly peer review.' },
  { level: 'Established standards', role: 'Consensus methodological documents such as the Standards for Educational and Psychological Testing (AERA/APA/NCME).' },
  { level: 'Technical reports & government frameworks', role: 'Institutional guidance and empirical reports (e.g., NIST AI RMF, METR technical reports).' },
  { level: 'Preprints', role: 'Recent manuscripts not yet peer-reviewed (e.g., arXiv papers); valuable early evidence requiring extra scrutiny.' },
  { level: 'Industry reports & model cards', role: 'Vendor-reported evaluations; useful for configuration details but subject to selection and framing incentives.' },
  { level: 'Expert commentary', role: 'Informed methodological proposals and critiques; generates hypotheses rather than empirical proof.' },
] as const;

export const DISCIPLINES = [
  { name: 'Cognitive science', role: 'Theories and evidence about cognition, learning, reasoning, perception, and behavior.' },
  { name: 'Logic & formal methods', role: 'Explicit accounts of inference, consistency, specifications, and proof obligations.' },
  { name: 'Linguistics (semantics, pragmatics & discourse)', role: 'Analysis of language structure, meaning, context, communicative intent, and sociolinguistic variation.' },
  { name: 'Ontology & domain modeling', role: 'Explicit domain concepts, distinctions, relations, and constraints.' },
  { name: 'Measurement theory & psychometrics', role: 'Relationships between constructs, observations, scores, and their interpretations.' },
  { name: 'Statistics & experimental design', role: 'Sampling, estimation, uncertainty, comparison, and design-based inference.' },
  { name: 'Causal inference', role: 'Assumptions and designs needed to investigate effects and alternative explanations.' },
  { name: 'Epistemology & philosophy of science', role: 'Analysis of evidence, justification, explanation, generalization, and competing hypotheses.' },
  { name: 'HCI & social research', role: 'Evidence about situated use, experience, collaboration, and organizational consequences.' },
  { name: 'Domain expertise, ethics & safety/security', role: 'Contextual requirements, consequential failure modes, affected interests, and acceptable constraints.' },
] as const;

export const SCOPES = [
  {
    id: 'model',
    name: 'Model',
    question: 'Can the model correctly interpret the methods described in a paper?',
    boundary: 'Model weights/API under controlled prompts and parameters.',
    transferWarning: 'High model scores do not guarantee retrieval, UI, or human workflow success.',
  },
  {
    id: 'component',
    name: 'Component or Subsystem',
    question: 'Does retrieval find the relevant methodological passages?',
    boundary: 'Isolated subsystem (e.g., retriever, guardrail, tool router).',
    transferWarning: 'Subsystem accuracy alone does not establish end-to-end product reliability.',
  },
  {
    id: 'product',
    name: 'Complete AI System / Application',
    question: 'Do model, retrieval, prompts, tools, memory, and UI work together appropriately?',
    boundary: 'Integrated system (for agents: model + execution harness, tools, permissions, memory, stopping rules).',
    transferWarning: 'System task success still does not prove human users benefit in real work.',
  },
  {
    id: 'human-ai',
    name: 'Human–AI Workflow / Team',
    question: 'Do researchers using the product produce better syntheses or catch errors more effectively?',
    boundary: 'Human + system performing tasks together against an explicit comparator.',
    transferWarning: 'Controlled task gains may shift under routine organizational review, time pressure, or maintenance.',
  },
  {
    id: 'org',
    name: 'Organizational Impact',
    question: 'Does the workflow improve overall, accounting for review effort, coordination, and costs?',
    boundary: 'Team/institution workflows, oversight capacity, and operational overhead.',
    transferWarning: 'Local workflow efficiency can still externalize costs or disparities onto other groups.',
  },
  {
    id: 'societal',
    name: 'Societal / Environmental Effects',
    question: 'How are benefits, harms, access, or resource demands distributed beyond individual users?',
    boundary: 'Broader affected populations, institutions, and environmental/resource footprints.',
    transferWarning: 'Requires longitudinal, multi-stakeholder evidence beyond product metrics.',
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

export const VALIDITY_DIMENSIONS = [
  { name: 'Conceptual adequacy', question: 'Is the target sufficiently defined for the intended claim?' },
  { name: 'Construct validity', question: 'Why do these observations and scores support the proposed meaning?' },
  { name: 'Content validity', question: 'Do the test items adequately represent the domain or task specification?' },
  { name: 'Criterion-related validity', question: 'Do scores correlate with or predict relevant external criteria or outcomes?' },
  { name: 'Internal (causal) validity', question: 'For causal claims, could alternative explanations account for the difference?' },
  { name: 'External validity (generalization)', question: 'Which other tasks, people, settings, or periods do the findings cover?' },
  { name: 'Ecological validity', question: 'Do study tasks, tools, and pressures reflect real-world deployment conditions?' },
  { name: 'Measurement reliability', question: 'How stable are scores across repetitions, prompts, or independent assessors?' },
  { name: 'Consequential validity', question: 'What are the intended and unintended downstream effects of using these scores?' },
  { name: 'Leakage, reproducibility & traceability', question: 'Is contamination ruled out and can others inspect the exact procedure?' },
] as const;

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

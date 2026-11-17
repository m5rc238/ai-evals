export interface FlowNode {
  id: string;
  number?: string;
  title: string;
  layer: 'core' | 'cross-cutting' | 'outer';
  question: string;
  summary: string;
  keyPoints: string[];
  practicalOutput: string;
  caution: string;
}

export const STATEMENT_TYPES = [
  {
    type: 'Empirical claims',
    description: 'Statements about what observations, tests, or studies actually show.',
    example: '"This version achieved 85/100 on the specified task set under these conditions."',
    color: 'emerald',
  },
  {
    type: 'Conceptual & normative choices',
    description: 'Definitions, priorities, requirements, and value judgments about acceptable consequences.',
    example: '"Material claims must cite supporting passages; a 2% false-positive rate is acceptable here."',
    color: 'amber',
  },
  {
    type: 'Practical recommendations',
    description: 'Proposed procedures whose suitability depends on the question, stakes, evidence, and resources.',
    example: '"Use blinded specialist review for difficult claims and regression checks for known failures."',
    color: 'indigo',
  },
] as const;

export const FLOW_NODES: FlowNode[] = [
  {
    id: 'purpose',
    number: '1',
    title: 'Purpose & Decision',
    layer: 'core',
    question: 'What do we need to learn, and what decision will it inform?',
    summary:
      'Replace broad prompts like "evaluate this AI" with the specific uncertainty that matters, naming the system, task, population, comparator, desired outcome, and constraints.',
    keyPoints: [
      'Distinguish exploratory mode (criteria evolve as evidence is examined) from confirmatory mode (outcomes, comparisons, and thresholds fixed before inspecting confirmatory results).',
      'Identify the user need and existing workflow; ask whether AI adds value over simpler alternatives (Google People + AI Guidebook).',
    ],
    practicalOutput: 'Short evaluation brief: decision, question, intended claim, comparator, constraints, and what evidence could change your mind.',
    caution: 'Repeatedly tuning criteria to the same dataset and presenting the final run as an independent confirmatory test invalidates the test.',
  },
  {
    id: 'scope',
    number: '2',
    title: 'Scope',
    layer: 'core',
    question: 'What exactly are we evaluating?',
    summary:
      'Define the system boundary and unit of analysis. Model performance, integrated system performance, and human outcomes are distinct scopes.',
    keyPoints: [
      'Six overlapping scopes: Model, Component/subsystem, Complete AI system/product, Human–AI team, Organizational deployment, Societal/environmental effects.',
      'For agents, evaluate the model together with its execution harness: tools, instructions, permissions, memory, stopping rules, and environment (Anthropic agent-evaluation guide).',
      'Specify the unit of analysis (claim, response, conversation, task attempt, user, team, organization).',
    ],
    practicalOutput: 'System-boundary statement, versioned configuration, unit of analysis, and explicit exclusions.',
    caution: 'Evidence at one scope does not establish a claim at another (e.g., a model coding score does not prove developer productivity).',
  },
  {
    id: 'context',
    number: '3',
    title: 'Context & Coverage',
    layer: 'core',
    question: 'For whom, on which tasks, under which conditions?',
    summary:
      'A score is interpretable only when its producing conditions—users, inputs, tools, stakes, and exclusions—are documented.',
    keyPoints: [
      'Specify tasks, domains, user expertise, languages, accessibility needs, input formats, tools/permissions, time pressure, and plausible misuse.',
      'Decide what comparators hold equal (token budgets, retries, information access) vs. when complete workflows should be compared.',
      'Make missing coverage explicit (HELM precedent).',
    ],
    practicalOutput: 'Coverage matrix linking tasks and populations to test conditions, with explicit exclusions.',
    caution: 'An evaluation of short English abstracts cannot, without additional evidence, establish performance on multilingual full-text synthesis.',
  },
  {
    id: 'criteria',
    number: '4',
    title: 'Criteria',
    layer: 'core',
    question: 'What would count as success, failure, benefit, or harm?',
    summary:
      'Criteria describe what matters; rubrics and metrics operationalize them through observable evidence.',
    keyPoints: [
      'Use technical, policy/constraint, and human/contextual lenses to surface relevant criteria.',
      'Document 8 fields per criterion: Definition, Importance, Observable evidence, Assessment unit, Scoring rule, Anchors, Applicability, Limitations.',
      'Account for criteria drift: examining outputs often refines what teams realize their requirements are.',
    ],
    practicalOutput: 'Versioned criteria register and rubric with rationale, applicability, and known limitations.',
    caution: 'Avoid inferring hidden mental states (beliefs, intentions) from observable behavior without additional justification.',
  },
  {
    id: 'evidence',
    number: '5',
    title: 'Collect Evidence',
    layer: 'core',
    question: 'Which observations, tests, or studies can answer the question?',
    summary:
      'Match evidence-collection methods and sampling strategies to the claim being examined.',
    keyPoints: [
      'Combine complementary methods where needed: benchmarks, trace/error analysis, red teaming, formal verification, interviews, observed task studies, comparative experiments, field monitoring (NIST ARIA complementarity).',
      'Keep sampling purposes distinct: Discovery, Representative, Challenge, and Regression.',
      'For agents, corroborate claimed actions against actual environment state changes.',
    ],
    practicalOutput: 'Collection plan linking each evidence source, sampling rule, provenance record, and privacy arrangement to its intended inference.',
    caution: 'A complaint-enriched or synthetic dataset can probe weaknesses, but its failure rate does not estimate production prevalence.',
  },
  {
    id: 'measurement',
    number: '6',
    title: 'Measurement',
    layer: 'core',
    question: 'How will we turn that evidence into interpretable judgments?',
    summary:
      'Measurement introduces its own assumptions. Consider grading mechanisms during study design and validate evaluators alongside the system.',
    keyPoints: [
      'Mechanisms: Code-based checks, Human assessment, Model-based assessment, Hybrid assessment (OpenAI evaluation guidance).',
      'Validate human reviewers (context, independent initial ratings, investigating disagreement) and LLM judges (held-out validation, missed failures vs. false alarms, testing for position/verbosity/self-enhancement biases).',
      'Preserve severity, frequency, detectability, and affected subgroups rather than hiding critical failures in a single average.',
    ],
    practicalOutput: 'Measurement specification, evaluator-validation record, and severity-preserving aggregation policy.',
    caution: 'Silently dropping missing evidence, nonapplicable criteria, or failed runs distorts denominators and conclusions.',
  },
  {
    id: 'decision',
    number: '10',
    title: 'Results to Decision',
    layer: 'core',
    question: 'Given the findings and limitations, what action is justified?',
    summary:
      'A result is an observation or estimate; a decision additionally weighs consequences, priorities, constraints, and remaining uncertainty.',
    keyPoints: [
      'Document 7 items: established findings, conditions, broader-interpretation assumptions, untested uncertainties, practical significance/trade-offs, recommended action & owner, and reconsideration triggers.',
      'Urgency does not increase the strength of evidence; inconclusive results justify narrower use or further study.',
    ],
    practicalOutput: 'Bounded decision statement with accountable owner and reconsideration triggers.',
    caution: 'Do not convert an inconclusive or narrow finding into a sweeping release claim.',
  },
  {
    id: 'time',
    number: '7',
    title: 'Time & Lifecycle',
    layer: 'cross-cutting',
    question: 'When should we evaluate again, and what may have changed?',
    summary:
      'An evaluation describes a specific configuration and context; relevance weakens when models, prompts, tools, data, users, or rubrics change.',
    keyPoints: [
      'Respond proportionately to change triggers (targeted regression checks vs. renewed contextual and outcome studies).',
      'Version product and evaluator separately so measurement changes are not mistaken for system improvements.',
      'Complement pre-deployment testing with deployment monitoring, recognizing validated monitoring remains an evolving area (NIST).',
    ],
    practicalOutput: 'Monitoring plan, version history, and explicit reevaluation triggers.',
    caution: 'Stable inputs do not guarantee stable performance, and an input shift is not automatically a performance decline.',
  },
  {
    id: 'governance',
    number: 'G',
    title: 'Governance',
    layer: 'cross-cutting',
    question: 'Who sets the terms, participates, reviews, and remains accountable?',
    summary:
      'Governance assigns concrete responsibilities for framing questions, defining criteria, reviewing methods, accepting risk, and triggering reevaluation.',
    keyPoints: [
      'Distinguish consultation from decision authority, and recognize degrees of reviewer independence.',
      'Evaluate oversight itself: assigning a human reviewer does not prove they have time, expertise, visibility, or authority to intervene.',
      'Treats governance as cross-cutting across the lifecycle (NIST AI RMF).',
    ],
    practicalOutput: 'Named roles, participation arrangements, escalation routes, and decision authority.',
    caution: 'When cost or access prevents an important assessment, document the uncertainty and narrow the permitted claim.',
  },
  {
    id: 'quality',
    number: '8',
    title: 'Evaluation Quality & Validity',
    layer: 'outer',
    question: 'What conclusions can this evaluation credibly support?',
    summary:
      'Validity belongs to specific score interpretations and intended uses (Standards for Educational and Psychological Testing), not to a test in the abstract.',
    keyPoints: [
      'Check 10 dimensions: Conceptual adequacy, Construct validity, Internal/causal validity, External validity, Statistical validity, Reliability, Coverage, Leakage/contamination, Evaluator limitations, Reproducibility/traceability.',
      'Confidence intervals quantify sampling uncertainty under assumptions—they do not measure rubric validity or untested harms.',
    ],
    practicalOutput: 'Justification record linking each intended claim to evidence, assumptions, and unresolved threats.',
    caution: 'A reliable rubric can consistently measure an inadequate proxy; human agreement can coexist with shared blind spots.',
  },
];

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
];

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
    name: 'Complete AI System / Product',
    question: 'Do model, retrieval, prompts, tools, memory, and UI work together appropriately?',
    boundary: 'Integrated system (for agents: model + execution harness, tools, permissions, memory, stopping rules).',
    transferWarning: 'System task success still does not prove human users benefit in real work.',
  },
  {
    id: 'human-ai',
    name: 'Human–AI Interaction / Team',
    question: 'Do researchers using the product produce better syntheses or catch errors more effectively?',
    boundary: 'Human + system performing tasks together against an explicit comparator.',
    transferWarning: 'Controlled task gains may shift under routine organizational review, time pressure, or maintenance.',
  },
  {
    id: 'org',
    name: 'Organizational Deployment',
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
];

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
];

export const EVIDENCE_METHODS = [
  { name: 'Benchmarks & executable tests', establishes: 'Performance on specified tasks or requirements.', limitation: 'Generalization beyond tested conditions requires justification.' },
  { name: 'Trace & error analysis', establishes: 'Recurring failures and possible points of breakdown (Husain & Shankar).', limitation: 'Logs may omit user intentions, abandoned work, or downstream consequences.' },
  { name: 'Adversarial testing & red teaming', establishes: 'Whether particular failure paths can be found.', limitation: 'Findings generally do not estimate ordinary-use prevalence.' },
  { name: 'Formal verification', establishes: 'Specified properties under explicit assumptions.', limitation: 'Delimited by specification, model, assumptions, and link to deployed system.' },
  { name: 'Interviews & qualitative inquiry', establishes: 'Needs, interpretations, expectations, and explanations of experience.', limitation: 'Reports do not directly establish causal effects or task performance.' },
  { name: 'Observed task studies', establishes: 'How people use the system and where interaction breaks down.', limitation: 'Study conditions may differ from routine use.' },
  { name: 'Comparative experiments', establishes: 'Effects of specified alternatives under the study design.', limitation: 'Conclusions depend on allocation, measurement, adherence, and assumptions.' },
  { name: 'Field studies & monitoring', establishes: 'Behavior and consequences in actual deployment.', limitation: 'Confounding, selection, missing data, and changing conditions complicate inference.' },
];

export const SAMPLING_PURPOSES = [
  { name: 'Discovery sampling', role: 'Seeks informative or unusual cases to uncover failure modes.', warning: 'Cannot estimate production failure rates.' },
  { name: 'Representative sampling', role: 'Supports statistical estimates about a defined population.', warning: 'Only valid for the population and conditions actually sampled.' },
  { name: 'Challenge sampling', role: 'Deliberately stresses suspected weaknesses or edge cases.', warning: 'High failure rates here do not equal typical-use rates.' },
  { name: 'Regression collections', role: 'Preserves previously discovered failures to prevent backsliding.', warning: 'Passing regression tests does not prove new capabilities or unseen safety.' },
];

export const VALIDITY_DIMENSIONS = [
  { name: 'Conceptual adequacy', question: 'Is the target sufficiently defined for the intended claim?' },
  { name: 'Construct validity', question: 'Why do these observations and scores support the proposed meaning?' },
  { name: 'Internal (causal) validity', question: 'For causal claims, could alternative explanations account for the difference?' },
  { name: 'External validity (generalization)', question: 'Which other tasks, people, settings, or periods do the findings cover?' },
  { name: 'Statistical validity', question: 'Are estimates and uncertainty appropriate to the design and data?' },
  { name: 'Reliability', question: 'How stable are measurements across relevant repetitions or assessors?' },
  { name: 'Coverage', question: 'Which material cases or consequences remain unexamined?' },
  { name: 'Leakage & contamination', question: 'Has evaluation data influenced training, tuning, or answer access?' },
  { name: 'Evaluator limitations', question: 'Which errors or biases affect scoring?' },
  { name: 'Reproducibility & traceability', question: 'Can others inspect the procedure and trace what generated the result?' },
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
];

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
];

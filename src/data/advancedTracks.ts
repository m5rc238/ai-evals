export const CAPSTONE_SCENARIO = {
  title: 'Final Capstone Project: Full Evaluation Proposal for the Meridian AI Research Assistant',
  description:
    'Integrate all seven modules by designing a complete, defensible evaluation study for the fictional Meridian AI Research Assistant—an internal tool that retrieves documents, summarizes findings, provides citations, and answers analyst questions.',
  note: 'All Meridian organizational details are fictional; your design should apply real methodological principles and cite limitations honestly.',
  requiredSections: [
    { num: 1, title: 'Evaluation purpose', detail: 'State the exact deployment or product decision the study informs and what evidence could change the decision.' },
    { num: 2, title: 'Research questions', detail: 'Formulate specific, answerable questions (exploratory and confirmatory kept distinct).' },
    { num: 3, title: 'Hypotheses', detail: 'State directional or non-inferiority hypotheses before inspecting confirmatory data.' },
    { num: 4, title: 'AI system & configuration', detail: 'Specify model version, retrieval index, prompts, tools, permissions, UI, and stopping rules.' },
    { num: 5, title: 'Target population', detail: 'Define intended users (e.g., junior vs. senior analysts), languages, and accessibility needs.' },
    { num: 6, title: 'Human–AI interaction model', detail: 'Describe interaction pattern (assistant, decision support, oversight) and reliance/verification affordances.' },
    { num: 7, title: 'Context & task', detail: 'Specify document types, task complexity, time pressure, stakes, and explicit exclusions.' },
    { num: 8, title: 'Baselines & comparators', detail: 'Justify comparators (existing manual workflow, simpler search tool, or solo AI).' },
    { num: 9, title: 'Dataset construction', detail: 'Detail inclusion/exclusion rules, provenance, and contamination checks.' },
    { num: 10, title: 'Sampling strategy', detail: 'Separate representative sampling (prevalence) from challenge/adversarial sampling (stress testing).' },
    { num: 11, title: 'Evaluation criteria', detail: 'Define constructs (e.g., source fidelity, synthesis quality, confidentiality) with observable indicators.' },
    { num: 12, title: 'Metrics', detail: 'Match retrieval (Recall@k, NDCG), generation, calibration, and operational metrics (latency, cost, verification time).' },
    { num: 13, title: 'Ground-truth methodology', detail: 'Explain dual specialist annotation, adjudication rules, and handling of ambiguous items.' },
    { num: 14, title: 'Human evaluation', detail: 'Specify rater training, blinding, initial independent ratings, and reliability (weighted kappa / Krippendorff’s alpha).' },
    { num: 15, title: 'LLM-judge validation (if used)', detail: 'Document held-out calibration, rare-failure false negatives, bias checks, and escalation rules.' },
    { num: 16, title: 'Experimental design', detail: 'Specify randomization, within- vs. between-subject structure, counterbalancing, and attrition controls.' },
    { num: 17, title: 'Statistical analysis plan', detail: 'State estimands, clustering/dependence adjustments, effect sizes, CIs, power, and multiple-comparison control.' },
    { num: 18, title: 'Validity arguments', detail: 'Address construct, internal, external, ecological, and consequential validity threats.' },
    { num: 19, title: 'Risk & governance considerations', detail: 'Assign named owners for criteria, oversight capacity, incident response, and risk acceptance.' },
    { num: 20, title: 'Deployment decision criteria', detail: 'Pre-specify mandatory constraints, severity thresholds, and trade-off rules.' },
    { num: 21, title: 'Limitations', detail: 'Document untested subgroups, contamination uncertainty, and generalization boundaries.' },
    { num: 22, title: 'Reporting plan', detail: 'Commit to calibrated evidence language separating observations, estimates, interpretations, and actions.' },
  ],
  rubric: [
    { criterion: 'Scientific rigor', expectation: 'Separates exploratory discovery from confirmatory testing; avoids overclaiming causality.' },
    { criterion: 'Measurement quality', expectation: 'Criteria operationalize constructs clearly; metrics match task types; ground truth is scrutinized.' },
    { criterion: 'Experimental design', expectation: 'Appropriate comparators, randomization/counterbalancing, and explicit confounder control.' },
    { criterion: 'Validity', expectation: 'Construct, internal, external, ecological, and consequential threats are argued—not treated as a checkbox.' },
    { criterion: 'Statistical reasoning', expectation: 'Accounts for clustering, uncertainty bounds, effect sizes, and practical vs. statistical significance.' },
    { criterion: 'Human-centered evaluation', expectation: 'Measures human task outcomes, verification effort, reliance, and skill retention alongside outputs.' },
    { criterion: 'Reproducibility', expectation: 'System/harness, dataset provenance, and evaluator versions are documented for independent inspection.' },
    { criterion: 'Ethical & governance considerations', expectation: 'Clear accountability, oversight capacity checks, privacy controls, and escalation triggers.' },
    { criterion: 'Clarity of communication', expectation: 'Justifies methodological trade-offs concisely rather than listing metrics mechanically.' },
  ],
} as const;

export interface AdvancedTrack {
  id: string;
  code: string;
  title: string;
  summary: string;
  topics: { name: string; detail: string }[];
  keyPitfall: string;
}

export const ADVANCED_TRACKS: AdvancedTrack[] = [
  {
    id: 'track-a',
    code: 'Track A',
    title: 'Retrieval-Augmented Generation (RAG) Evaluation',
    summary: 'Evaluate retrieval and generation separately and together so indexing failures are not misdiagnosed as model failures.',
    topics: [
      { name: 'Retrieval metrics', detail: 'Precision@k, Recall@k, Mean Reciprocal Rank (MRR), and NDCG@k against verified relevant passages.' },
      { name: 'Context relevance', detail: 'Whether retrieved chunks actually contain the evidence needed without burying it in distractors.' },
      { name: 'Groundedness & faithfulness', detail: 'Whether every material claim is entailed by the retrieved context rather than parametric memory.' },
      { name: 'Citation accuracy', detail: 'Verify both citation existence and whether the cited passage supports the exact claim.' },
      { name: '100-item RAG dataset exercise', detail: 'Design a 100-item RAG dataset: define sampling frame, split representative queries (e.g., 60) from challenge queries (e.g., 40 covering conflicting sources, unanswerable/out-of-corpus queries, and long contexts), specify dual-specialist ground truth, pair retrieval metrics (Recall@k, NDCG@k) with claim-level source fidelity, and document coverage exclusions.' },
    ],
    keyPitfall: 'Evaluating end-to-end answer quality without logging retrieved chunks makes it impossible to tell whether errors came from retrieval or generation.',
  },
  {
    id: 'track-b',
    code: 'Track B',
    title: 'AI Agents & Tool-Use Evaluation',
    summary: 'Treat the agent as the model working with its execution harness—tools, permissions, memory, and environment.',
    topics: [
      { name: 'Tool-use evaluation', detail: 'Correct tool selection, argument formatting, permission adherence, and handling tool errors.' },
      { name: 'Planning & multi-step completion', detail: 'Subgoal decomposition, unnecessary loops, and end-to-end state verification.' },
      { name: 'State management & recovery', detail: 'Whether the agent recovers gracefully from partial failures rather than hallucinating success.' },
      { name: 'Autonomy & human intervention', detail: 'Measuring escalation points, approval latency, and whether human checkpoints catch real errors.' },
      { name: 'Cost & latency', detail: 'Token, API, and wall-clock budgets per completed task—not just per single turn.' },
    ],
    keyPitfall: 'Trusting an agent’s text claim that an action succeeded instead of inspecting actual environment state changes.',
  },
  {
    id: 'track-c',
    code: 'Track C',
    title: 'AI Safety & Security Evaluation',
    summary: 'Probe adversarial failure paths and security boundaries while keeping prevalence and discovery distinct.',
    topics: [
      { name: 'Prompt injection & jailbreaks', detail: 'Direct and indirect (via retrieved docs/webpages) instruction hijacking.' },
      { name: 'Privacy leakage & data exfiltration', detail: 'Unauthorized disclosure of PII, secrets, or cross-tenant records across tool calls.' },
      { name: 'Harmful outputs & abuse scenarios', detail: 'Evaluating dual-use assistance, refusal calibration, and over-refusal on benign queries.' },
      { name: 'Red teaming & security boundaries', detail: 'Targeted adversarial discovery paired with mandatory non-compensatory constraints.' },
    ],
    keyPitfall: 'Using red-team attack success rates as estimates of ordinary-use prevalence, or averaging safety failures into a general quality score.',
  },
  {
    id: 'track-d',
    code: 'Track D',
    title: 'Multimodal Evaluation',
    summary: 'Assess vision, audio, video, and document systems where perception errors propagate into reasoning errors.',
    topics: [
      { name: 'Vision, audio & video', detail: 'OCR/chart/diagram parsing, speech transcription under noise, and video event localization.' },
      { name: 'Cross-modal reasoning', detail: 'Whether answers genuinely use visual/audio evidence vs. guessing from text priors.' },
      { name: 'Temporal consistency', detail: 'Tracking entities and state across video frames or multi-turn audio streams.' },
      { name: 'Perception vs. reasoning errors', detail: 'Decomposing failures between misread inputs and faulty downstream inference.' },
    ],
    keyPitfall: 'Benchmark items answerable from text priors alone without inspecting the image, audio, or video.',
  },
  {
    id: 'track-e',
    code: 'Track E',
    title: 'Advanced Measurement',
    summary: 'Move beyond mean accuracy to uncertainty calibration, selective abstention, and subgroup/rare-event rigor.',
    topics: [
      { name: 'Calibration, selective prediction & abstention', detail: 'Brier score, ECE, risk-coverage curves, and rewarding calibrated "I don’t know" responses.' },
      { name: 'Cost-sensitive & multi-objective evaluation', detail: 'Asymmetric error costs (false negatives vs. false positives) and Pareto frontiers across quality, cost, and latency.' },
      { name: 'Subgroup & intersectional analysis', detail: 'Disaggregating by language, domain, user expertise, and demographics with adequate subgroup power.' },
      { name: 'Rare-event evaluation', detail: 'Exact binomial confidence bounds, importance sampling, and severity-weighted incident tracking.' },
    ],
    keyPitfall: 'Reporting only aggregate accuracy when subgroup disparities or rare high-severity failures dominate real-world risk.',
  },
  {
    id: 'track-f',
    code: 'Track F',
    title: 'Organizational Evaluation',
    summary: 'Evaluate net institutional impact once verification burden, adoption, maintenance, and resource costs are included.',
    topics: [
      { name: 'Total cost of ownership & verification burden', detail: 'Compute/API costs plus human review, error-correction, and governance overhead.' },
      { name: 'Workflow integration & reliability', detail: 'Latency under peak load, fallback procedures, and handoffs between teams.' },
      { name: 'Productivity, adoption & change', detail: 'Distinguishing short-term novelty from sustained post-familiarization value.' },
      { name: 'Environmental & externalized costs', detail: 'Energy, water, and downstream impacts on stakeholders outside the immediate user group.' },
    ],
    keyPitfall: 'Declaring organizational ROI from faster first-draft generation while ignoring increased downstream review and error-remediation time.',
  },
] as const;

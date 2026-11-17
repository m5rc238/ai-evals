export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface LessonMeta {
  id: string;
  number: number;
  module: string;
  title: string;
  duration: string;
  objective: string;
  takeaway: string;
  quiz: QuizQuestion;
}

export const LESSONS: LessonMeta[] = [
  {
    id: 'foundations',
    number: 1,
    module: 'Module 1 · Foundations',
    title: 'What Is AI Evaluation & How It Works',
    duration: '4 min',
    objective: 'Distinguish empirical claims, normative choices, and practical recommendations, and read the 10-element evaluation landscape.',
    takeaway: 'Confidence in an evaluation should match the evidence and argument supporting a specific interpretation—not a generic "pass" label.',
    quiz: {
      id: 'q1',
      question: 'Which statement is a normative/conceptual choice rather than an empirical claim?',
      options: [
        'The model achieved 85/100 on the 100-item test set.',
        'Any unauthorized data disclosure is a critical failure that blocks release.',
        'Developers took 19% longer to complete tasks with the AI tool in the study.',
      ],
      correctIndex: 1,
      explanation: 'Deciding what counts as an unacceptable failure or threshold is a value/normative choice. Evidence informs consequences, but cannot by itself decide what risks people should accept.',
    },
  },
  {
    id: 'hai-interaction',
    number: 2,
    module: 'Module 1 · Foundations',
    title: 'Why Human–AI Interaction Changes Everything',
    duration: '5 min',
    objective: 'Understand why evaluating the interaction layer (SPHERE’s 4 questions) differs from evaluating a model in isolation.',
    takeaway: 'Most enterprise AI is interaction, not full autonomy. Bad interaction causes sycophancy and deskilling; human–AI teams can even underperform the best solo actor.',
    quiz: {
      id: 'q2',
      question: 'In Vaccaro et al.’s (2024) meta-analysis of 370 effect sizes, when did human–AI combinations show performance losses compared to the best solo actor?',
      options: [
        'In content-creation tasks where humans outperformed AI alone.',
        'In decision-making tasks, especially when AI alone outperformed humans.',
        'Only when users were given more than one hour to familiarize.',
      ],
      correctIndex: 1,
      explanation: 'Vaccaro et al. (Nature Human Behaviour, 2024) found human–AI synergy was negative on average (g = -0.23), with losses concentrated in decision-making tasks and when AI outperformed humans alone.',
    },
  },
  {
    id: 'framing',
    number: 3,
    module: 'Module 2 · Framing',
    title: 'Purpose, Scope, Targets & Evaluation Modes',
    duration: '5 min',
    objective: 'Separate scope (model, harness, human–AI team) from target, and distinguish exploratory discovery from confirmatory testing.',
    takeaway: 'Evidence at one scope (e.g., model coding score) never automatically establishes a claim at another (e.g., developer productivity).',
    quiz: {
      id: 'q3',
      question: 'Why must exploratory and confirmatory evaluation modes be kept distinct?',
      options: [
        'Exploratory work is unscientific and should be avoided.',
        'Repeatedly tuning criteria on a dataset and presenting the final run as an independent test overstates confirmation.',
        'Confirmatory mode prohibits documenting limitations.',
      ],
      correctIndex: 1,
      explanation: 'Both modes are legitimate. "Setting thresholds early" means locking main outcomes and decision rules before inspecting the confirmatory results.',
    },
  },
  {
    id: 'who-context',
    number: 4,
    module: 'Module 2 · Framing',
    title: 'Who Evaluates, For Whom & Context Coverage',
    duration: '4 min',
    objective: 'Identify whose values are represented in evaluations and recognize the limits of LLM-simulated users.',
    takeaway: 'LLM-simulated users can help with early sanity checks, but they produce exaggerated caricatures of sociocultural groups and cannot replace real target users.',
    quiz: {
      id: 'q4',
      question: 'What did the CoMPosT study (Cheng et al., EMNLP 2023) find about LLM simulations of sociocultural groups?',
      options: [
        'They accurately capture subtle intra-group variation across demographics.',
        'They produce exaggerated caricatures, especially for political ideology, race, and marginalized personas.',
        'They eliminate the need to recruit domain experts.',
      ],
      correctIndex: 1,
      explanation: 'CoMPosT showed LLM simulations amplify stereotypes into caricatures. Use synthetic users only for early checks, never as a substitute for the real target population.',
    },
  },
  {
    id: 'methods-intrinsic',
    number: 5,
    module: 'Module 3 · Methods & Measurement',
    title: 'How We Evaluate: Methods, Intrinsic vs. Extrinsic & Sampling',
    duration: '5 min',
    objective: 'Combine quantitative/qualitative and intrinsic/extrinsic evaluations, and keep sampling purposes distinct.',
    takeaway: 'Use a layered pipeline: fast intrinsic gates early (benchmarks, behavioral tests), then extrinsic user validation before deployment.',
    quiz: {
      id: 'q5',
      question: 'How does ProgramBench differ from SWE-bench’s unit-test approach?',
      options: [
        'ProgramBench tests internal implementation details and specific function names.',
        'ProgramBench uses behavioral tests against artifacts/outputs, remaining implementation-agnostic.',
        'ProgramBench only evaluates qualitative user interviews.',
      ],
      correctIndex: 1,
      explanation: 'SWE-bench relies on unit tests tied to internal implementation details, whereas ProgramBench checks the observable behavior of running the built program against a specification.',
    },
  },
  {
    id: 'outcomes-grading',
    number: 6,
    module: 'Module 3 · Methods & Measurement',
    title: 'Measuring Real Outcomes, Skill Erosion & Grading',
    duration: '6 min',
    objective: 'Separate output quality, task success, and human outcomes (skill, reliance, opinion drift), and avoid single-score aggregation traps.',
    takeaway: 'Perceived productivity ≠ actual productivity. Track real outcomes, skill retention, and severity separately.',
    quiz: {
      id: 'q6',
      question: 'In Anthropic’s RCT (Shen & Tamkin, 2026) on engineers learning a new Python library, what happened to the group using AI assistance?',
      options: [
        'They scored 17% lower on a follow-up mastery quiz, especially on debugging.',
        'They were 20% faster and scored higher on debugging.',
        'They showed no difference in mastery or task time.',
      ],
      correctIndex: 0,
      explanation: 'Using AI assistance led to a statistically significant 17% drop in mastery on the follow-up quiz, most pronounced in debugging.',
    },
  },
  {
    id: 'statistics-validity',
    number: 7,
    module: 'Module 4 · Rigor & Time',
    title: 'Statistical Uncertainty, Clustering & Validity',
    duration: '5 min',
    objective: 'Quantify rare-failure uncertainty, account for conversation clustering, and apply the 10-point validity review.',
    takeaway: 'Zero failures in 100 independent trials still leaves an ~3% one-sided 95% upper bound—and confidence intervals do not measure rubric validity.',
    quiz: {
      id: 'q7',
      question: 'If you collect 300 turns across 5 user conversations, why can’t you treat N = 300 as independent observations?',
      options: [
        'Turns in a conversation are clustered and may share the same underlying failure or user context.',
        'Statistical tests only work on binary outcomes.',
        '300 is below the universal minimum sample size.',
      ],
      correctIndex: 0,
      explanation: 'Turns within one conversation are dependent. Treating clustered turns as independent understates uncertainty; repeated attempts do not expand task coverage.',
    },
  },
  {
    id: 'time-governance',
    number: 8,
    module: 'Module 4 · Rigor & Time',
    title: 'When to Evaluate: Lifecycle, Long-Term Effects & Governance',
    duration: '5 min',
    objective: 'Contrast short-term vs. long-term evaluations (familiarization, sycophancy) and assign concrete governance roles.',
    takeaway: 'Sycophantic AI is preferred in one-session demos but erodes satisfaction with human interactions over time. Evaluate across realistic horizons.',
    quiz: {
      id: 'q8',
      question: 'What did Ibrahim et al. (arXiv:2605.07912) find about sycophantic AI over time?',
      options: [
        'Users reject sycophantic AI immediately in short-term rankings.',
        'Users prefer sycophantic AI in the moment, but exposure reduces satisfaction with human interactions over time.',
        'Sycophancy has no effect after the familiarization phase.',
      ],
      correctIndex: 1,
      explanation: 'Optimizing for instant user satisfaction can reward sycophancy, which degrades long-term trust and satisfaction with human interactions.',
    },
  },
  {
    id: 'practice-protocol',
    number: 9,
    module: 'Module 5 · Synthesis & Practice',
    title: 'Worked Example, Reporting Discipline & Protocol Builder',
    duration: '6 min',
    objective: 'Apply the full framework to a research-assistant case, calibrate overextended claims, and draft a bounded decision statement.',
    takeaway: 'Good evaluation reporting separates observations, estimates, interpretations, and recommendations so readers can scrutinize every link.',
    quiz: {
      id: 'q9',
      question: 'Which statement most accurately reports the results of passing a safety test suite?',
      options: [
        '“The system is safe for all users.”',
        '“The specified tests found these failures and did not observe these other failures within documented coverage; remaining gaps are listed.”',
        '“Zero failures in 100 trials proves a 0% failure rate.”',
      ],
      correctIndex: 1,
      explanation: 'Bounded reporting states exactly what was tested, what was observed, and what coverage gaps or uncertainties remain.',
    },
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

import { PROTOCOL_FIELDS, REPORTING_CLAIMS } from './evalsData';

export { PROTOCOL_FIELDS, REPORTING_CLAIMS };

export interface ResearchReference {
  citation: string;
  sourceType: 'Meta-analysis (Peer-reviewed)' | 'Peer-reviewed study' | 'Standards' | 'Technical report / Framework' | 'Preprint' | 'Conference paper (Peer-reviewed)';
  url?: string;
  sampleOrScope: string;
  finding: string;
  limitations: string;
  doesNotEstablish: string;
}

export interface KnowledgeCheckItem {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  correctExplanation: string;
  distractorNotes: string[];
}

export interface PracticalExercise {
  title: string;
  objective: string;
  scenario: string;
  instructions: string[];
  requiredOutput: string;
  evaluationCriteria: string[];
  strongExample: string;
  reflectionQuestion: string;
}

export interface ModuleCurriculum {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  integratedLessons: string;
  overview: string;
  objectives: string[];
  researchEvidence: ResearchReference[];
  caseStudy: {
    stageTitle: string;
    narrative: string;
    keyDecisions: string[];
  };
  misconceptions: { myth: string; reality: string }[];
  exercise: PracticalExercise;
  knowledgeChecks: KnowledgeCheckItem[];
  takeaways: string[];
  furtherReading: { label: string; type: string; url?: string }[];
  transition: string;
}

export const MODULES_CURRICULUM: ModuleCurriculum[] = [
  {
    id: 'm1',
    number: 1,
    title: 'The Full Picture: What AI Evals Are, Layers & Units',
    subtitle: 'What evals are vs. unit tests, the 3 components, 7 layers & units of analysis, validity, and your first hands-on eval',
    integratedLessons: 'Foundations',
    overview:
      'Get the complete map before diving into details: what an AI evaluation is, how it complements unit tests, the three explicit components (Dataset, Rubric, Judge), the seven layers and units of analysis from raw inputs to real-world impact, and four practical operating rules—anchored in a 5-minute hands-on test.',
    objectives: [
      'Define an AI eval using its three components—Dataset (Stimulus), Rubric (Criteria), and Judge (Scorer)—and explain how evals complement unit tests.',
      'Locate any evaluation question across the 7 layers (Data & Inputs through Wider Impacts) and pick the matching unit of analysis.',
      'Explain why passing a lower-layer eval does not guarantee higher-layer success, and how higher-layer verification can catch lower-layer errors.',
      'Spot a prompt regression hidden by a tied aggregate score and distinguish construct validity from external validity.',
    ],
    researchEvidence: [],
    caseStudy: {
      stageTitle: 'Stage 1 (Fictional Case Study): Mapping Meridian Across Layers Before Testing',
      narrative:
        'Meridian Corp wants an AI assistant to summarize empirical research papers for analysts. Before arguing over model leaderboards, you map the problem across layers: do our source packets represent real analyst PDFs (Data & Inputs), do generated claims match those sources (Isolated Model), does retrieval surface the right passages (Component), and can analysts catch unsupported claims without wasting time (Human–AI Interaction)? You start with one crisp Dataset + Rubric + Judge check on 5 real paper excerpts.',
      keyDecisions: [
        'Write an explicit observable rubric (every quantitative figure must match the source and keep its qualifiers) before iterating on prompts.',
        'Treat passing 5 excerpt checks as Layer 2 (Isolated Model) evidence on claims—not proof that analysts save time at Layer 5.',
      ],
    },
    misconceptions: [
      {
        myth: '“Unit tests already cover our AI features.”',
        reality:
          'Unit tests check fixed deterministic requirements such as JSON schema validity. Evals measure probabilistic performance across distributions of cases and repeated runs—even when each run is scored pass/fail.',
      },
      {
        myth: '“Passing a model benchmark means the product will work.”',
        reality:
          'Passing a lower-layer eval alone cannot establish higher-layer success: a factually accurate model can still fail in practice if retrieval misses key passages or the interface makes verification too costly.',
      },
    ],
    exercise: {
      title: 'Assignment 1: Write Case 3, Name the Layer & Unit, and Spot a Regression',
      objective: 'Add one new test case to the return-policy eval, identify its layer and unit of analysis, and state what a pass establishes.',
      scenario:
        'Using the return policy ("Unused items can be returned within 30 days"), you ran the interactive exercise above on Case 1 (12 days ago, condition unspecified) and Case 2 (12 days ago, item unused). Both Prompt v1 and Prompt v2 scored 1/2 overall, but v2 passed Case 1 and failed Case 2.',
      instructions: [
        'Write one new test case (Case 3) checking a different failure mode of this same policy (for example, an item bought 45 days ago, or an item the customer says they already wore).',
        'State the expected passing behavior, one failing answer, the evaluation layer (from the 7 layers), and the unit of analysis.',
        'In 2 sentences, explain why Prompt v2 is not automatically better than Prompt v1 despite fixing Case 1, and name one construct-validity or external-validity limit of passing all three return cases.',
      ],
      requiredOutput: 'Case 3 (message, pass rule, sample failure, layer + unit) plus a 2-sentence interpretation.',
      evaluationCriteria: [
        'Case 3 directly tests the stated 30-day / unused policy without inventing unstated rules and names the correct layer/unit (e.g., Workflow or Isolated Model / response).',
        'Identifies the Case 2 regression hidden by the tied 1/2 total score and bounds external validity to 30-day returns.',
      ],
      strongExample:
        'Case 3 — Customer: "I bought this 45 days ago and never opened it. Can I return it?" Pass rule: State the item is outside the 30-day window and do not promise a return. Sample failure: "Since it is unused, you can return it." Layer & Unit: Isolated Model / Workflow response (each customer reply is 1 unit). Interpretation: Prompt v2 fixed Case 1 by regressing on Case 2, so the tied 1/2 aggregate score hides a real trade-off; externally, passing 30-day return cases tells us nothing about lost accounts, billing disputes, or messy multi-turn chats.',
      reflectionQuestion: 'What single real input from your own system would expose a weak rubric or prompt regression if you tested it today?',
    },
    knowledgeChecks: [
      {
        id: 'm1-q1',
        question: 'Prompt v1 fails Case 1 and passes Case 2 (1/2). Prompt v2 passes Case 1 and fails Case 2 (1/2). What does the tied 1/2 score hide?',
        options: [
          'Nothing—identical total scores mean the two versions behave identically.',
          'Prompt v2 introduced a regression on Case 2 while fixing Case 1.',
          'Case 2 should be deleted so Prompt v2 scores 100%.',
        ],
        correctIndex: 1,
        correctExplanation: 'Inspecting case-level outcomes shows Prompt v2 broke a case that v1 handled correctly, even though both scored 1/2.',
        distractorNotes: [
          'A ignores per-case regressions hidden inside aggregate totals.',
          'C is cherry-picking, which destroys the diagnostic value of the eval.',
        ],
      },
      {
        id: 'm1-q2',
        question: 'Suppose 20 analysts each complete 10 brief-writing tasks, and you compare each analyst’s success rate across two interfaces. What is the unit of analysis for that comparison?',
        options: [
          'The 200 individual task outcomes treated as 200 independent analysts.',
          'The analyst (20 analysts, each summarizing 10 tasks).',
          'Individual words inside each brief.',
        ],
        correctIndex: 1,
        correctExplanation: 'Although you recorded 200 task outcomes, comparing each analyst’s rate across two interfaces makes the analyst the unit of analysis.',
        distractorNotes: [
          'A mistakes the number of logged task attempts (200) for independent analyst-level units (20).',
          'C is below the task/analyst comparison unit.',
        ],
      },
    ],
    takeaways: [
      'Evals complement unit tests by measuring performance across distributions of cases and repeated runs using explicit Datasets, Rubrics, and Judges.',
      'Choose the layer (Data & Inputs → Wider Impacts) and unit of analysis to match your decision; passing a lower layer never guarantees higher-layer success.',
      'Apply the 4 Operating Rules: start with the decision, treat the eval as the spec, defend against contamination with private refreshed sets, and watch for Goodhart’s Law.',
    ],
    furtherReading: [
      { label: 'Google People + AI Guidebook', type: 'Industry guidance', url: 'https://pair.withgoogle.com/guidebook/' },
    ],
    transition: 'Now that you have the full map, Module 2 starts at Operating Rule 1: scoping the exact decision, layer, unit of analysis, baseline, and harness.',
  },
  {
    id: 'm2',
    number: 2,
    title: 'Start With the Decision: Scoping Layer, Unit & Baseline',
    subtitle: 'Choosing the right layer, unit of analysis, comparator baseline, harness boundary, and contamination controls',
    integratedLessons: 'Scoping & Framing',
    overview:
      'Operating Rule 1 says start with the decision. Before writing prompts or buying tools, clarify what decision you are making, whether a simpler non-AI fix solves the problem, which layer and unit of analysis match the claim, how to pin the full system harness, and how to separate exploratory tuning from confirmatory testing.',
    objectives: [
      'Formulate a decision-driven evaluation question naming the layer, unit of analysis, system/harness, task, population, and baseline.',
      'Compare three legitimate product options: current workflow, a credible simpler non-AI change, and AI assistance.',
      'Keep exploratory discovery distinct from confirmatory testing so repeated prompt/rubric tuning does not invalidate results.',
      'Pin the full agent harness (prompts, retrieval, tools, permissions, memory, stopping rules) and defend against benchmark contamination using private, refreshed domain cases.',
    ],
    researchEvidence: [
      {
        citation: 'Liang, P., et al. (2022/2023). Holistic Evaluation of Language Models (HELM). TMLR.',
        sourceType: 'Peer-reviewed study',
        url: 'https://crfm.stanford.edu/helm/',
        sampleOrScope: 'Multi-scenario, multi-metric model evaluation framework.',
        finding: 'Demonstrated the value of separating scenarios from metrics, measuring multiple dimensions, and making missing coverage explicit.',
        limitations: 'Focused primarily on model-level scientific evaluation rather than workplace adoption decisions.',
        doesNotEstablish: 'Does not establish product effectiveness or whether AI beats a simpler workflow change.',
      },
      {
        citation: 'Anthropic (2026). Demystifying evals for AI agents. Engineering Guidance.',
        sourceType: 'Technical report / Framework',
        url: 'https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents',
        sampleOrScope: 'Practical engineering guidance for agent evaluation.',
        finding: 'Treats an agent as the model working together with its execution harness (tools, instructions, permissions, memory, stopping rules, environment).',
        limitations: 'Industry engineering guidance rather than a controlled empirical study.',
        doesNotEstablish: 'Does not replace domain-specific validity arguments or human outcome studies.',
      },
    ],
    caseStudy: {
      stageTitle: 'Stage 2 (Fictional Case Study): Scoping Meridian’s Decision & Baseline',
      narrative:
        'Meridian analysts spend 74 minutes writing a 5-paper brief. Interviews reveal 25 minutes are wasted hunting for PDFs in messy folders and guessing executive headings. Before deploying an AI assistant, you compare three legitimate baselines: (1) current workflow, (2) a simpler non-AI fix (full-text PDF search + a 1-page brief checklist), and (3) a pinned AI assistant harness tested against that upgraded baseline using private, newly collected Meridian source packets so training contamination cannot inflate scores.',
      keyDecisions: [
        'Treat keeping the current workflow, shipping search + a checklist, and testing AI as three equally legitimate outcomes.',
        'Pin the entire AI harness (model snapshot, retrieval index, prompts, tools, retry limit) and lock primary confirmatory thresholds before running the final test.',
      ],
    },
    misconceptions: [
      {
        myth: '“The goal of an AI eval is to justify deploying AI.”',
        reality: 'Concluding that better search, a checklist, or keeping the current workflow solves the problem faster and safer is a successful evaluation outcome.',
      },
      {
        myth: '“Testing the base model is enough when evaluating an agent or RAG product.”',
        reality: 'Prompts, retrieval, tool permissions, memory, and retry rules often change performance more than swapping base models—always pin and evaluate the full harness.',
      },
    ],
    exercise: {
      title: 'Assignment 2: Scope a Decision, Baseline & Contamination Defense',
      objective: 'Choose between current workflow, a simpler non-AI change, and AI, and define the layer, unit, and harness boundary.',
      scenario:
        'At Meridian, analysts complain that summarizing 5 empirical PDFs takes too long and briefs often omit study limitations. Two root causes appear in interviews: (a) PDFs are poorly indexed across shared drives, and (b) analysts have no standard template reminding them to include a Limitations section.',
      instructions: [
        'Describe three concrete options: (1) Current workflow, (2) A credible simpler non-AI change addressing the two root causes, and (3) AI assistance.',
        'State which layer (from the 7 layers) and unit of analysis you must test to decide whether AI improves on Option 2, and list two harness details you must pin before comparing runs.',
        'State what specific evidence would justify stopping at Option 2 versus testing AI, plus one rule to prevent contamination or exploratory overfitting.',
      ],
      requiredOutput: 'A 3-option scoping brief specifying layer, unit, pinned harness, decision rule, and contamination guard.',
      evaluationCriteria: [
        'Treats the non-AI option as a serious baseline directly addressing indexing and missing templates.',
        'Matches the layer (Workflow / Human–AI) and unit (brief / task session or analyst) to the deployment decision and keeps held-out private data separate from tuning.',
      ],
      strongExample:
        'Options: (1) Current manual folder search with no template; (2) Centralized full-text PDF search + mandatory 1-page brief template with a Limitations section; (3) Pinned RAG drafting assistant tested against Option 2. Layer & Unit: Layer 5 (Human–AI Interaction) with task session / analyst as the unit of analysis; pin the model snapshot, chunking/retrieval top-k, system prompt, and retry limit. Decision rule: Stop at Option 2 if search + checklist fixes retrieval delays and eliminated omitted Limitations without hallucination risk; test AI only if synthesis drafting remains the bottleneck. Guardrail: Use newly collected private Meridian packets held out from prompt tuning.',
      reflectionQuestion: 'In a project you work on, is AI currently being compared against a strong non-AI baseline—or only against a broken process?',
    },
    knowledgeChecks: [
      {
        id: 'm2-q1',
        question: 'Why compare an AI assistant against a credible simpler change (like better search or a checklist) instead of only a broken legacy workflow?',
        options: [
          'Because comparing only against a broken workflow can credit AI for gains a cheaper, lower-risk non-AI fix would already deliver.',
          'Because non-AI tools are always forbidden in confirmatory studies.',
          'Because base models cannot be tested at Layer 2 without a UI.',
        ],
        correctIndex: 0,
        correctExplanation: 'A credible simpler comparator tests whether AI adds genuine value beyond straightforward workflow improvements.',
        distractorNotes: [
          'B is false: simpler non-AI baselines are strong comparators.',
          'C is false: isolated model evals exist, though they only establish Layer 2 claims.',
        ],
      },
      {
        id: 'm2-q2',
        question: 'Why must exploratory and confirmatory evaluation modes be kept distinct?',
        options: [
          'Exploratory work is unscientific and should be avoided.',
          'Repeatedly tuning criteria or prompts on a dataset and presenting the final run as an independent test invalidates confirmatory inference.',
          'Confirmatory mode prohibits reporting limitations.',
        ],
        correctIndex: 1,
        correctExplanation: 'Explore traces to discover failures and refine your spec, then lock outcomes, criteria, and thresholds before inspecting a fresh private confirmatory set.',
        distractorNotes: [
          'A and C are false.',
        ],
      },
    ],
    takeaways: [
      'The decision sets your layer, unit of analysis, baseline, and rigor—and choosing a simpler non-AI fix is a strong, valid outcome.',
      'Pin the entire harness (model snapshot, retrieval, prompts, tools, permissions, retries) so comparisons isolate real changes.',
      'Separate exploratory tuning from confirmatory testing and rely on private, refreshed domain cases rather than public benchmarks that may be contaminated.',
    ],
    furtherReading: [],
    transition: 'With your decision, layer, and baseline locked, Module 3 shows Operating Rule 2 in action: treating the eval as the spec by inspecting real traces and building clean datasets.',
  },
  {
    id: 'm3',
    number: 3,
    title: 'Datasets & Error Analysis: Building Real Test Cases',
    subtitle: 'Treat the eval as the spec: trace analysis, ordinary/ambiguous/escalation cases, and sampling without bias',
    integratedLessons: 'Datasets & Sampling',
    overview:
      'Operating Rule 2 says treat the eval as the spec: inspect real traces and failure modes first, before iterating on prompts or architecture. Learn to build Datasets (Stimuli) covering ordinary, ambiguous, and escalation cases, and keep discovery/challenge sampling strictly separate from representative traffic samples.',
    objectives: [
      'Use trace and error analysis on real examples to surface recurring failure modes before writing automated evaluators or tuning prompts.',
      'Write concrete test cases and observable expected behavior across ordinary, ambiguous, and escalation/abstention situations.',
      'Separate four distinct sampling purposes—discovery, representative, challenge, and regression—so stress-test failure rates are never mistaken for production prevalence.',
      'Assess synthetic test cases honestly for realism and coverage without treating synthetic origin as proof of real-world prevalence.',
    ],
    researchEvidence: [
      {
        citation: 'NIST (2024). Assessing Risks and Impacts of AI (ARIA) Program.',
        sourceType: 'Technical report / Framework',
        url: 'https://ai-challenges.nist.gov/aria',
        sampleOrScope: 'Combines automated model testing, adversarial probing/red teaming, and user task testing.',
        finding: 'Illustrates methodological complementarity across automated checks, targeted failure discovery, and human-centered testing.',
        limitations: 'Programmatic evaluation methodology; specific findings depend on the participating systems and scenarios.',
        doesNotEstablish: 'Does not mandate a single fixed metric or dataset size across all domains.',
      },
    ],
    caseStudy: {
      stageTitle: 'Stage 3 (Fictional Case Study): Building Meridian’s Private Case Suite',
      narrative:
        'Before touching prompt templates, you read 40 real Meridian analyst queries and intermediate traces. Recurring failures jump out immediately: causal wording on observational studies, omitted limitations, and confident guesses when a paper is not in the folder. You organize Meridian’s private test suite into three case types—(1) ordinary randomized-trial summaries, (2) ambiguous observational abstracts, and (3) out-of-corpus confidential queries requiring refusal—and keep your hard challenge set separate from a representative weekly sample.',
      keyDecisions: [
        'Inspect raw traces and retrieved passages before deciding which automated checks to build.',
        'Report challenge-set failure rates separately from representative everyday failure rates.',
      ],
    },
    misconceptions: [
      {
        myth: '“A 40% failure rate on our edge-case challenge suite means 40% of real users see failures.”',
        reality: 'Challenge sets deliberately oversample hard or adversarial cases to expose weaknesses quickly. Only a representative sample estimates everyday prevalence.',
      },
      {
        myth: '“Synthetic LLM-generated test cases can replace real user logs and domain packets.”',
        reality: 'Synthetic cases are useful for probing targeted hypotheses, but they easily miss messy real-world inputs, formatting quirks, and true traffic distributions.',
      },
    ],
    exercise: {
      title: 'Assignment 3: Write Ordinary, Ambiguous & Escalation Cases',
      objective: 'Author three distinct test cases with observable pass/fail behavior and separate challenge sampling from prevalence estimation.',
      scenario:
        'You are expanding the Return-Policy Assistant ("Unused items can be returned within 30 days; damaged-on-arrival items and disputes over $500 must be escalated to a human agent").',
      instructions: [
        'Write 1 ordinary case (all policy conditions clear) and state the observable expected behavior.',
        'Write 1 ambiguous case (a key detail is missing or borderline, such as "opened the shipping box to check the color") and state the expected behavior.',
        'Write 1 escalation case (e.g., damaged-on-arrival or a $650 dispute) and state the expected behavior.',
        'In 2 sentences, explain why collecting 20 difficult/ambiguous cases is valuable—and why a 35% failure rate on those 20 cases cannot be reported as the everyday customer failure rate.',
      ],
      requiredOutput: 'Three test cases with observable expected behavior plus a 2-sentence sampling explanation.',
      evaluationCriteria: [
        'All three cases follow the supplied policy and state observable pass/fail behavior.',
        'Correctly distinguishes weakness discovery (challenge sampling) from prevalence estimation (representative sampling).',
      ],
      strongExample:
        '1) Ordinary: "Bought 10 days ago, sealed and unused. Can I return it?" Expected: Confirm eligibility directly without re-asking if it was used. 2) Ambiguous: "Bought 15 days ago; I opened the outer shipping box to look at the color, never used the item." Expected: Ask/clarify whether the product itself or inner seal was opened before promising a return. 3) Escalation: "My $650 monitor arrived with a cracked screen 3 days ago." Expected: Do not auto-approve or auto-deny; immediately escalate to a human agent per the damaged-on-arrival and >$500 rule. Sampling note: 20 deliberately hard cases expose brittle rules quickly, but because they oversample rare edge cases, a 35% failure rate on that challenge set cannot estimate everyday traffic failure rates.',
      reflectionQuestion: 'Need retrieval-specific metrics (Recall@k, NDCG@k) or a 100-item RAG dataset design? See Optional Advanced Track A (RAG Evaluation).',
    },
    knowledgeChecks: [
      {
        id: 'm3-q1',
        question: 'Your team builds a 25-case challenge set of tricky, ambiguous customer messages and the bot fails 10 of them (40%). What can you conclude?',
        options: [
          '40% of everyday production customer chats will fail.',
          'You discovered specific failure modes worth fixing, but the 40% rate does not estimate everyday production prevalence.',
          'The challenge set was useless because it was not randomly sampled.',
        ],
        correctIndex: 1,
        correctExplanation: 'Challenge sampling is designed to uncover weaknesses; estimating everyday failure rates requires a representative sample of production traffic.',
        distractorNotes: [
          'A confuses challenge-set failure rates with population prevalence.',
          'C is false: challenge sets are highly valuable for error discovery.',
        ],
      },
      {
        id: 'm3-q2',
        question: 'Which metric family measures whether an AI system’s stated probability or confidence ("80% sure") matches how often it is actually right?',
        options: [
          'Brier score or Expected Calibration Error (ECE).',
          'Cohen’s kappa.',
          'Raw pass rate alone.',
        ],
        correctIndex: 0,
        correctExplanation: 'Brier score, log loss, and ECE measure alignment between predicted probabilities and empirical frequencies.',
        distractorNotes: [
          'B measures inter-rater agreement.',
          'C ignores confidence probabilities entirely.',
        ],
      },
    ],
    takeaways: [
      'Inspect real inputs and traces first—treating the eval as the spec before optimizing prompts or architecture.',
      'Always include ordinary, ambiguous, and escalation/abstention cases with observable pass/fail expectations.',
      'Keep discovery, challenge, regression, and representative samples separate so you never report stress-test failure rates as everyday rates.',
    ],
    furtherReading: [
      { label: 'Husain & Shankar: Error & Trace Analysis Guidance', type: 'Industry guidance', url: 'https://hamel.dev/blog/posts/evals/' },
    ],
    transition: 'Once you have clean test cases, Module 4 tackles Rubrics & Judges: turning vague goals into observable rules, calibrating LLM judges, scoring telemetry, and preventing averages from hiding critical failures.',
  },
  {
    id: 'm4',
    number: 4,
    title: 'Rubrics & Judges: Scoring Without Fooling Yourself',
    subtitle: 'Observable criteria, code/LLM/human judges, telemetry scoring, and avoiding aggregation traps',
    integratedLessons: 'Rubrics, Judges & Aggregation',
    overview:
      'Even great test cases break down if two reviewers score the same output differently, if an unvalidated LLM judge silently misses critical failures, or if a high composite score hides a severe leak. Learn how to sharpen rubrics, choose and validate judges (including production telemetry), and aggregate without hiding risk.',
    objectives: [
      'Diagnose why two reviewers disagree on a concrete output, rewrite an ambiguous rule into an observable check, and rescore.',
      'Choose appropriately among deterministic code checks, human review, calibrated LLM judges, and telemetry + scoring rules.',
      'Validate an LLM-as-a-judge on held-out human labels for rare-failure false negatives and position/verbosity/self-preference biases.',
      'Prevent composite averages and Simpson’s paradox from burying critical safety or subgroup failures.',
    ],
    researchEvidence: [],
    caseStudy: {
      stageTitle: 'Stage 4 (Fictional Case Study): Tightening Meridian’s Rubric & Validating Judges',
      narrative:
        'Two Meridian reviewers grade the same AI summary of an observational survey: "Flexible hours boosted retention by 12%." Reviewer 1 marks PASS ("12% matches the paper"). Reviewer 2 marks FAIL ("\u2018boosted\u2019 implies causation from a survey"). Rewriting "be accurate" into "fail if causal verbs describe an observational study" resolves the disagreement before you ever prompt an LLM judge—and you keep any confidential data exposure as a mandatory release blocker separate from quality averages.',
      keyDecisions: [
        'Use reviewer disagreement to fix ambiguous rubrics before scaling up with an LLM judge.',
        'Treat confidential data leaks as non-compensatory release blockers rather than averaging them with minor formatting bugs.',
      ],
    },
    misconceptions: [
      {
        myth: '“When two reviewers disagree, average their scores and move on.”',
        reality: 'Disagreement usually exposes an underspecified rubric or missing source context. Tightening the rule into an observable check fixes the measurement.',
      },
      {
        myth: '“90% overall agreement means an LLM judge can replace human review.”',
        reality: 'High overall agreement can mask poor recall on rare, high-severity failures alongside position, verbosity, or self-preference bias. Always audit false negatives on held-out adjudicated data.',
      },
      {
        myth: '“Production telemetry is automatically an evaluation score.”',
        reality: 'Telemetry (e.g., user edits, thumbs-down, or citation overrides) supplies raw evidence—you still need an explicit scoring rule defining how that evidence counts and checking for confounders.',
      },
    ],
    exercise: {
      title: 'Assignment 4: Resolve a Reviewer Disagreement & Expose an Average Trap',
      objective: 'Rewrite an ambiguous scoring rule from a concrete disagreement, rescore the output, and fix misleading composite reporting.',
      scenario:
        'Source excerpt (fictional): "In a 2024 survey of 400 employees, teams with flexible hours reported 12% lower turnover than fixed-hour teams; no randomized assignment was used." AI summary: "Flexible hours reduced employee turnover by 12%." Original rubric rule: "Summary is accurate." Reviewer 1 scores PASS (12% matches). Reviewer 2 scores FAIL ("reduced" implies causation from a survey). Separately, across 100 runs, the system passes 95, has 4 minor formatting issues, and leaks 1 confidential client name (reported as "95% pass rate").',
      instructions: [
        'State why Reviewer 1 and Reviewer 2 reasonably disagreed under the vague rule "Summary is accurate."',
        'Rewrite the rubric into an observable pass/fail rule that resolves the ambiguity, and rescore the AI summary.',
        'Explain why reporting "95% pass rate" on the 100 runs misleads decision-makers, and show how to report those 100 runs instead.',
      ],
      requiredOutput: 'Diagnosis of disagreement, revised observable rule + rescore, and disaggregated reporting recommendation.',
      evaluationCriteria: [
        'Revised rule targets observable causal vs. associative wording grounded in the supplied excerpt.',
        'Separates the 1 confidential-name leak as a critical release blocker rather than averaging it with formatting issues.',
      ],
      strongExample:
        'Disagreement diagnosis: "accurate" did not specify whether matching the number (12%) is enough or whether non-randomized study design must be preserved. Revised rule: "Fail if the summary uses causal language (e.g., reduced, boosted, caused) for an observational or non-randomized finding." Rescore: FAIL ("reduced" asserts causation unsupported by the survey). Average trap: A "95% pass rate" treats 4 minor formatting bugs as equivalent to 1 confidential client-name leak. Report instead: 95/100 full passes, 4/100 low-severity formatting issues, and 1/100 critical confidentiality violation (release blocker).',
      reflectionQuestion: 'If you automate this revised rule with an LLM judge, what separate held-out dataset do you need before trusting the judge?',
    },
    knowledgeChecks: [
      {
        id: 'm4-q1',
        question: 'Two reviewers disagree on whether a summary is "accurate" because one checks numbers and the other checks causal wording. What is the best first step?',
        options: [
          'Average their scores so you get 0.5.',
          'Inspect their reasons, revise the rubric into explicit observable criteria, and rescore.',
          'Replace both reviewers with an unvalidated LLM judge.',
        ],
        correctIndex: 1,
        correctExplanation: 'Disagreement reveals an underspecified rubric; tightening the rule fixes the root cause of inconsistent grading.',
        distractorNotes: [
          'A hides rubric ambiguity.',
          'C transfers the same ambiguity into an automated judge.',
        ],
      },
      {
        id: 'm4-q2',
        question: 'Which reliability measure handles two or more raters with missing ratings across nominal, ordinal, or interval scales?',
        options: [
          'Raw percentage agreement.',
          'Krippendorff’s alpha.',
          'Brier score.',
        ],
        correctIndex: 1,
        correctExplanation: 'Krippendorff’s alpha corrects for chance agreement and generalizes across 2+ raters, missing labels, and multiple scale types.',
        distractorNotes: [
          'A does not correct for chance agreement.',
          'C measures probabilistic calibration.',
        ],
      },
    ],
    takeaways: [
      'Resolve reviewer disagreement by turning vague criteria into observable rules before automating with an LLM judge.',
      'Pair the right judge with the check (code, human, calibrated LLM, or telemetry + explicit scoring rule) and audit judges on held-out human labels.',
      'Never average away severe failures—report severity tiers, subgroup breakdowns, and mandatory release blockers separately.',
    ],
    furtherReading: [],
    transition: 'With reliable scoring in place, Module 5 shows how to compare two versions rigorously—accounting for your unit of analysis, uncertainty, Goodhart’s Law tradeoffs, and full validity checks.',
  },
  {
    id: 'm5',
    number: 5,
    title: 'Comparing Versions: Uncertainty, Tradeoffs & Goodhart’s Law',
    subtitle: 'Paired differences, clustered units of analysis, cost/latency tradeoffs, validity pillars, and statistical reference',
    integratedLessons: 'Comparisons, Statistics & Validity',
    overview:
      'Learn how to interpret a real A/B or version comparison without falling for statistical illusions or Goodhart’s Law: System B beats System A by +0.10 points on a 5-point scale, but costs 9× more and runs 5.4× slower. Compute direct paired differences, cluster uncertainty at the right unit of analysis, check subgroups, and verify all three validity pillars.',
    objectives: [
      'Compare two versions on the same tasks using a direct paired difference CI instead of eyeballing overlapping separate CIs.',
      'Align confidence intervals and standard errors with your unit of analysis (clustering repeated tasks per analyst or turns per session).',
      'Apply Operating Rule 4 (Goodhart’s Law) by weighing quality gains against cost, latency, audit time, and subgroup disparities.',
      'Separate Measurement Validity (Category A), Study Design & Generalization (Category B), and Reliability & Traceability (Category C).',
    ],
    researchEvidence: [
      {
        citation: 'AERA, APA, & NCME (2014). Standards for Educational and Psychological Testing.',
        sourceType: 'Standards',
        sampleOrScope: 'Consensus psychometric and measurement standards.',
        finding: 'Defines validity not as a property of a test in the abstract, but as the degree to which evidence and theory support specific score interpretations for intended uses.',
        limitations: 'Developed for human educational/psychological testing; requires thoughtful adaptation for stochastic AI systems.',
        doesNotEstablish: 'Does not provide AI-specific benchmark thresholds.',
      },
      {
        citation: 'NIST (2023). Artificial Intelligence Risk Management Framework (AI RMF 1.0). NIST AI 100-1.',
        sourceType: 'Technical report / Framework',
        url: 'https://www.nist.gov/itl/ai-risk-management-framework',
        sampleOrScope: 'National risk-management guidance across Govern, Map, Measure, and Manage functions.',
        finding: 'Treats measurement and governance as iterative, cross-cutting functions rather than a one-time pre-release checkbox.',
        limitations: 'Provides high-level organizational principles rather than task-specific statistical thresholds.',
        doesNotEstablish: 'Does not validate any specific vendor benchmark or proprietary evaluation score.',
      },
    ],
    caseStudy: {
      stageTitle: 'Stage 5 (Fictional Case Study): Interpreting Meridian’s Mixed Version Comparison',
      narrative:
        'Meridian’s 32-analyst crossover study (128 crossed sessions across 48 confirmatory packets) shows a +0.40 quality gain (cluster-robust 95% CI [+0.18, +0.62]) and 0/100 confidentiality breaches (~3% one-sided 95% upper bound under binomial assumptions)—but unsupported claims rose by +1.6 pp (95% CI [+0.2, +3.0]), failing the pre-specified +1.0 pp non-inferiority gate. Total task time changed inconclusively (−2.5 min). Honoring your pre-registered tradeoff rule, you withhold the pilot.',
      keyDecisions: [
        'Use direct within-analyst paired difference CIs clustered by analyst/packet rather than eyeballing separate CIs.',
        'Honor pre-specified tradeoff gates (unsupported-claim limit) even when average quality rises.',
      ],
    },
    misconceptions: [
      {
        myth: '“Overlapping 95% confidence intervals prove there is no real difference.”',
        reality: 'Overlap of separate CIs is not a formal test of the difference—especially on shared tasks where item difficulty cancels out. Estimate the difference CI directly.',
      },
      {
        myth: '“p < 0.05 means the improvement is worth shipping.”',
        reality: 'Large samples can detect tiny differences; practical worth depends on effect size relative to cost, latency, verification effort, and subgroup regressions.',
      },
    ],
    exercise: {
      title: 'Assignment 5: Decide Whether a +0.10 Gain Is Worth 9× the Cost',
      objective: 'Interpret a direct paired difference CI, weigh Goodhart’s Law tradeoff metrics, and handle an underpowered subgroup gap.',
      scenario:
        'Fictional paired comparison on N = 200 shared research tasks (25 analysts, 8 tasks each): System A mean 4.10/5 (SD 0.60, 95% CI [4.02, 4.18]), latency 1.2s, cost $0.02/task; Non-English subgroup (n = 15 tasks) mean 2.80/5. System B mean 4.20/5 (SD 0.70, 95% CI [4.10, 4.30]), latency 6.5s, cost $0.18/task; Non-English subgroup (n = 15 tasks) mean 3.90/5. Direct paired difference (B − A): +0.10 points (cluster-robust 95% CI [+0.01, +0.19]).',
      instructions: [
        'Explain why overlapping separate 95% CIs ([4.02, 4.18] and [4.10, 4.30]) do not establish "no difference," and what the cluster-robust paired difference CI ([+0.01, +0.19]) actually tells you (plus what rater/rubric noise it leaves out).',
        'Weigh the +0.10-point gain against 9× higher cost ($0.18 vs. $0.02) and 5.4× higher latency (6.5s vs. 1.2s) using Operating Rule 4 (Goodhart’s Law).',
        'Assess the Non-English subgroup (n = 15: 2.80 vs. 3.90) and state what evidence is needed before deploying System A to Non-English users.',
      ],
      requiredOutput: 'A concise decision memo covering the direct difference CI, cost/latency tradeoff, and Non-English subgroup plan.',
      evaluationCriteria: [
        'Uses the direct cluster-robust paired difference CI [+0.01, +0.19] rather than separate-CI overlap.',
        'Explicitly weighs +0.10 points against 9× cost and 5.4× latency, and flags n = 15 subgroup uncertainty.',
      ],
      strongExample:
        'Although the two separate 95% CIs overlap ([4.02, 4.18] and [4.10, 4.30]), the direct cluster-robust paired difference (accounting for 8 tasks per analyst) is +0.10 with 95% CI [+0.01, +0.19]—a statistically detectable but tiny gain (and it still excludes rubric/rater measurement error). For English tasks, chasing +0.10 on a 5-point scale at 9× cost ($0.18 vs. $0.02) and 5.4× latency (6.5s vs. 1.2s) risks Goodharting the quality score unless that 0.10 eliminates high-severity errors. For Non-English tasks, System A drops to 2.80 vs. B’s 3.90, but n = 15 is underpowered: block System A on Non-English queries and collect a larger stratified Non-English sample before deciding.',
      reflectionQuestion: 'Which paired tradeoff metrics (latency, dollar cost, audit minutes, or subgroup gap) guard your primary metric against Goodhart’s Law?',
    },
    knowledgeChecks: [
      {
        id: 'm5-q1',
        question: 'Two systems have separate 95% CIs of [4.02, 4.18] and [4.10, 4.30] on the same 200 paired test tasks. What is the right way to test their difference?',
        options: [
          'Conclude there is no statistically significant difference because the two separate 95% CIs overlap.',
          'Compute the paired difference on each task and construct a cluster-appropriate 95% CI for the difference directly.',
          'Run 20 subgroup t-tests without correction until one is significant.',
        ],
        correctIndex: 1,
        correctExplanation: 'Overlap of separate 95% CIs is not a valid hypothesis test—especially on paired tasks where shared item difficulty cancels out.',
        distractorNotes: [
          'A commits the overlapping-CI fallacy.',
          'C inflates false positives via multiple comparisons.',
        ],
      },
      {
        id: 'm5-q2',
        question: 'If you log 300 chat turns across 5 user sessions, why is treating N = 300 as independent observations statistically invalid?',
        options: [
          'Because 300 is too small for any confidence interval.',
          'Because turns within the same session share user/context dependencies, understating uncertainty when your unit is the session.',
          'Because chat turns can only be analyzed qualitatively.',
        ],
        correctIndex: 1,
        correctExplanation: 'Clustered observations within a session are correlated; standard errors must account for clustering at the session/user unit of analysis.',
        distractorNotes: [
          'A and C are false.',
        ],
      },
      {
        id: 'm5-q3',
        question: 'According to the Standards for Educational and Psychological Testing, what does validity apply to?',
        options: [
          'A fixed property of a benchmark dataset regardless of how it is used.',
          'The degree to which evidence and theory support specific interpretations of scores for intended uses.',
          'Having an inter-rater reliability kappa above 0.70.',
        ],
        correctIndex: 1,
        correctExplanation: 'Validity is an argument for a specific score interpretation and use; reliability is necessary for consistency but does not establish validity.',
        distractorNotes: [
          'A treats validity as context-free.',
          'C confuses reliability with validity.',
        ],
      },
      {
        id: 'm5-q4',
        question: 'A model produces 0 critical failures in 100 independent representative trials. Using the rule of three, what is the approximate one-sided 95% upper bound on the failure rate?',
        options: [
          '0%, proving the model is completely safe in production.',
          '~3% (3/100), assuming independent Bernoulli trials, a fixed failure rate, and accurate failure detection—and saying nothing about untested shifts.',
          '~30%, because 100 trials is always underpowered.',
        ],
        correctIndex: 1,
        correctExplanation: 'Under independent Bernoulli trials with accurate detection, 1 − 0.05^(1/100) ≈ 2.95% (~3% via 3/N). It does not guarantee safety under distribution shift.',
        distractorNotes: [
          'A confuses zero observed failures with zero true probability.',
          'C miscalculates the binomial bound.',
        ],
      },
    ],
    takeaways: [
      'Compare versions on shared tasks using a direct paired difference CI clustered at your unit of analysis—never judge by overlapping separate CIs.',
      'Pair primary quality metrics with cost, latency, audit time, and subgroup breakdowns so Goodhart’s Law does not hide regressions.',
      'Keep measurement validity, causal/external study design, and reliability/traceability distinct.',
    ],
    furtherReading: [
      { label: 'NIST Automated Benchmark Guidance (Draft)', type: 'Technical report / Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework' },
    ],
    transition: 'With version comparison mastered, Module 6 brings evals into live Layers 4–6: verifying end-to-end workflows, measuring real human task time, and governing production monitoring.',
  },
  {
    id: 'm6',
    number: 6,
    title: 'Real-World Performance: Workflows, Human–AI & Production Monitoring',
    subtitle: 'Testing Layers 4–6 in practice: end-to-end state checks, total human task time, and post-launch monitoring',
    integratedLessons: 'Workflows, Human–AI & Lifecycle',
    overview:
      'Passing lower-layer tests never proves real-world success. See how teams evaluate Layers 4–6 in practice: verifying actual environment state changes for workflows/agents, measuring whether real users do better work in less total time (drafting + checking + fixing), and running disciplined production monitoring with separate product/evaluator versioning.',
    objectives: [
      'Verify workflow and agent runs by checking actual environment/artifact state rather than trusting the model’s self-report.',
      'Design a practical two-condition user workflow comparison (current process vs. workflow + AI) measuring output quality and total task time (drafting + checking + correction).',
      'Recognize when a third AI-alone condition is required (claiming human–AI synergy) and why real users outperform simulated personas.',
      'Set up post-launch monitoring with telemetry + scoring rules, separate product/evaluator versions, named owners, and reevaluation triggers.',
    ],
    researchEvidence: [
      {
        citation: 'Becker, J., Rush, N., Barnes, E., & Rein, D. (2025). Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity. METR Technical Report.',
        sourceType: 'Technical report / Framework',
        url: 'https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/',
        sampleOrScope: 'RCT with 16 experienced open-source developers completing 246 tasks on large, complex repositories (~5 years prior experience).',
        finding: 'Developers forecasted a ~20% speedup with AI tools, yet observed total task time was 19% slower when AI tools were allowed.',
        limitations: 'Concerns early-2025 tools, experienced developers on familiar large repos, and specific task conditions.',
        doesNotEstablish: 'Does not generalize to all AI coding tools, novice developers, or greenfield projects.',
      },
      {
        citation: 'Vaccaro, M., Almaatouq, A., & Malone, T. W. (2024). When combinations of humans and AI are useful: A systematic review and meta-analysis. Nature Human Behaviour, 8(12), 2293–2303.',
        sourceType: 'Meta-analysis (Peer-reviewed)',
        url: 'https://doi.org/10.1038/s41562-024-02024-1',
        sampleOrScope: 'Synthesizes 106 studies and 370 effect sizes comparing Human+AI against Human alone and AI alone.',
        finding: 'Human–AI combinations outperformed humans alone on average (g = 0.64), but average synergy vs. the best solo actor was negative (g = -0.23), especially on decision-making tasks where AI outperformed humans alone.',
        limitations: 'Reflects historical tasks and mostly pre-frontier models across heterogeneous experimental designs.',
        doesNotEstablish: 'Does not establish that all future human–AI systems fail at decision-making or succeed at creation.',
      },
    ],
    caseStudy: {
      stageTitle: 'Stage 6 (Fictional Case Study): Meridian’s End-to-End Workflow & Monitoring Plan',
      narrative:
        'Before rolling out Meridian’s assistant, you verify Layer 4 (did citations survive a full brief edit without broken links?) and Layer 5 (two-condition check: Meridian analysts using their search+checklist baseline vs. using the AI assistant, timing drafting + citation verification + error fixing together). Post-launch, you turn live citation-edit telemetry into a weekly monitored metric with a named safety owner, pinned evaluator version, and clear rollback triggers.',
      keyDecisions: [
        'Measure total task time (drafting + citation checking + correction) on real analysts rather than drafting speed or simulated personas.',
        'Version the production system and the monitoring judge independently, with explicit reevaluation triggers on model, prompt, retrieval, or traffic shifts.',
      ],
    },
    misconceptions: [
      {
        myth: '“Faster AI drafting automatically saves the user time.”',
        reality: 'As METR (2025) showed, users often feel faster even when checking, prompting, and fixing errors makes total task time slower. Always time the whole workflow.',
      },
      {
        myth: '“LLM-simulated personas can replace real user tests—or you always need a 3-condition study.”',
        reality: 'Two conditions (current workflow vs. human+AI) answer practical adoption questions with real users; simulated personas miss real workflow friction and verification cost. Add an AI-alone condition only when claiming synergy over both solo baselines.',
      },
    ],
    exercise: {
      title: 'Assignment 6: Design a Workflow Time Check & Production Monitoring Plan',
      objective: 'Specify a practical two-condition Layer 5 workflow test plus two concrete post-launch monitoring and reevaluation triggers.',
      scenario:
        'Leadership wants to roll out an AI research drafting assistant to 40 support analysts because early offline tests passed 90% accuracy.',
      instructions: [
        'Design a two-condition workflow check (Current workflow vs. Analyst + AI) naming the participants, quality measure, and the exact time components summed into total task time.',
        'State when you would add a third AI-alone condition (and what a two-condition check alone cannot establish).',
        'Specify two post-launch monitoring signals (combining telemetry + an explicit scoring rule) and one change that triggers immediate reevaluation.',
      ],
      requiredOutput: 'A concise workflow test plan plus 2 monitoring rules and 1 reevaluation trigger.',
      evaluationCriteria: [
        'Includes drafting, checking, and error-correction time in total task time using real analysts.',
        'Defines explicit scoring rules for live telemetry and keeps product and evaluator versions separate.',
      ],
      strongExample:
        'Workflow test: Compare (1) analysts using the current search+template workflow vs. (2) the same analysts using the AI assistant on comparable real packets. Track blinded brief quality (1–5), unsupported claims, and total task time = drafting + citation verification + error correction. Add AI-alone only if claiming human+AI beats fully automated briefs. Monitoring: Track (a) analyst citation-override rate (telemetry scored as unsupported-claim flags via weekly stratified human audit of 30 sessions) and (b) weekly private regression suite pass rate. Version product and judge separately; trigger full reevaluation whenever the underlying model snapshot, retrieval index, or input language mix shifts.',
      reflectionQuestion: 'In an AI tool you use right now, how many minutes saved during drafting are spent back on verification and fixes?',
    },
    knowledgeChecks: [
      {
        id: 'm6-q1',
        question: 'When testing whether an AI copilot helps your team in practice, why must you sum drafting, checking, and correction time—and when do you add an AI-alone condition?',
        options: [
          'Because checking and fixing errors often erase drafting speedups; add AI-alone only when claiming human–AI synergy over both solo baselines.',
          'Because checking time is negligible; add AI-alone in every user test.',
          'Because user perception surveys are always more accurate than timing tasks.',
        ],
        correctIndex: 0,
        correctExplanation: 'Total task time captures the real net speedup (or slowdown), and two conditions suffice for workflow adoption unless you claim synergy over solo AI.',
        distractorNotes: [
          'B ignores verification cost and overcomplicates standard adoption tests.',
          'C is contradicted by empirical evidence (e.g., METR 2025).',
        ],
      },
      {
        id: 'm6-q2',
        question: 'Why must production systems and automated monitoring evaluators be versioned separately?',
        options: [
          'Because evaluator prompts cannot be stored in version control.',
          'So an intentional rubric or judge update is never mistaken for a system improvement or regression.',
          'So teams can delete raw production logs after scoring.',
        ],
        correctIndex: 1,
        correctExplanation: 'Separate versioning ensures shifts in measured pass rates can be attributed cleanly to system changes vs. measurement changes.',
        distractorNotes: [
          'A and C are false.',
        ],
      },
    ],
    takeaways: [
      'For workflows and agents (Layer 4), verify actual environment state changes rather than model self-reports.',
      'For Human–AI workflows (Layer 5), test real users against your current baseline and time drafting + checking + fixing together.',
      'In production, pair live telemetry with explicit scoring rules, separate product/evaluator versions, named owners, and reevaluation triggers.',
    ],
    furtherReading: [
      { label: 'Deep HCI Research & SPHERE Card Framework', type: 'Optional Advanced Track', url: undefined },
    ],
    transition: 'Finally, Module 7 uses everything from Modules 1–6 to call out hype—auditing public benchmarks, vendor decks, and overstated AI claims.',
  },
  {
    id: 'm7',
    number: 7,
    title: 'Calling Out Hype: Auditing Benchmarks & Vendor Claims',
    subtitle: 'Spotting contamination, undisclosed harnesses, Goodharted metrics, and rewriting overstated AI claims',
    integratedLessons: 'Auditing Public Claims',
    overview:
      'Public leaderboards, vendor decks, and press releases routinely stretch narrow Layer 2 scores into sweeping real-world claims. Audit any AI claim with four no-nonsense questions: what was tested (layer, unit, dataset), what comparison was made (and with what harness), what is missing or Goodharted, and what wording the supplied evidence actually supports.',
    objectives: [
      'Classify vendor and marketing statements as empirical, normative, predictive, mechanistic, comparative, or underspecified.',
      'Audit a public benchmark or press release across 8 dimensions: scope/saturation, comparator & version parity, harness parity, contamination risk, metric/aggregation choices, statistical uncertainty, generalization across layers, and missing safety/human-outcome evidence.',
      'Explain why scores from different benchmarks cannot be equated without shared anchors.',
      'Rewrite an overstated press release into a calibrated statement supported strictly by supplied facts.',
    ],
    researchEvidence: [],
    caseStudy: {
      stageTitle: 'Stage 7 (Fictional Case Study): Auditing a Competing Vendor’s Press Release',
      narrative:
        'A competing vendor pitches Meridian with a headline: "94% on LeadingQA—the most intelligent research AI!" Your audit exposes the gap: LeadingQA is an older public benchmark with contamination risk (Layer 2), the vendor omitted its retry/tool harness and baseline versions, and no uncertainty bounds, latency/cost tradeoffs, or analyst-workflow evidence (Layer 5) were supplied. Meridian declines to buy on leaderboard hype alone.',
      keyDecisions: [
        'Require exact model snapshot, full harness disclosure, comparators, tradeoffs, and uncertainty before weighting external scores.',
        'Verify candidate tools on Meridian’s own private held-out tasks and real analyst workflow.',
      ],
    },
    misconceptions: [
      {
        myth: '“Ranking #1 on a public leaderboard proves a tool is best for our team.”',
        reality: 'Public leaderboards frequently suffer from contamination, hidden retry/scaffold harnesses, Goodharting, and mismatched tasks—and tell you nothing about Layer 5 workflow benefit.',
      },
      {
        myth: '“Zero observed failures on a safety benchmark means zero production risk.”',
        reality: '0/100 independent trials still allows up to ~3% failure rate at 95% confidence (Rule of Three)—and says nothing about untested distribution shifts or prompt injection.',
      },
    ],
    exercise: {
      title: 'Assignment 7: Classify Vendor Claims & Audit the Apex-7 Press Release',
      objective: 'Classify individual claims by type, audit a press release across 8 dimensions, and write a calibrated revision using only supplied facts.',
      scenario:
        'Fictional vendor press release: "Our new model Apex-7 is the most intelligent AI system ever built, achieving #1 (92.4%) on ReasoningBench—proving it outperforms human experts and is safe for enterprise deployment." Also classify two companion pitch-deck bullets: (a) "Any hallucinated citation is unacceptable for client delivery," and (b) "Deploying Apex-7 will cut analyst research time by 40% next quarter."',
      instructions: [
        'Part A (Claim classification): Classify the two pitch-deck bullets (a and b) plus the press-release claims ("92.4% on ReasoningBench", "most intelligent", "outperforms human experts") as Empirical, Normative, Predictive, Mechanistic, Comparative, or Unsupported/Underspecified.',
        'Part B (8-point audit): Audit (1) benchmark scope & saturation, (2) comparator & version parity, (3) prompt/harness/retry disclosure, (4) contamination risk, (5) metric & aggregation details, (6) statistical uncertainty (sample size / CIs), (7) cross-layer generalization to enterprise workflows, and (8) missing safety & human-outcome evidence.',
        'Part C (Calibrated rewrite): Write a 2-sentence revision using ONLY facts supplied in the press release (do not invent prompt settings, sample sizes, or confidence intervals).',
      ],
      requiredOutput: 'Claim classifications, an 8-point audit list, and a strictly bounded 2-sentence rewrite.',
      evaluationCriteria: [
        'Accurately separates empirical claims from normative rules, predictions, and unsupported cross-layer extrapolations.',
        'Covers all 8 audit dimensions and does NOT invent undisclosed details in the rewrite.',
      ],
      strongExample:
        'Part A: Bullet (a) is Normative (acceptable-risk rule); Bullet (b) is Predictive/Unsupported (forecast without Layer 5 workflow evidence); "92.4% on ReasoningBench" is Empirical (though underspecified); "most intelligent" and "outperforms human experts" are Unsupported extrapolations. Part B (8-point audit): (1) ReasoningBench scope/saturation undisclosed; (2) comparator versions unnamed; (3) prompt, tool harness, and retry count undisclosed; (4) training contamination unaddressed; (5) metric definition and subgroup splits omitted; (6) sample size and CIs omitted; (7) narrow Layer 2 benchmark cannot establish enterprise workflow success; (8) zero human-expert comparison or safety testing reported. Part C (Calibrated rewrite): "The vendor reports that Apex-7 ranked #1 with a score of 92.4% on ReasoningBench, though the release omits the evaluation setup, comparator versions, sample size, and uncertainty interval. This single reported score does not establish general intelligence, superiority over human experts, or readiness and safety for enterprise deployment."',
      reflectionQuestion: 'What single missing detail in an AI press release makes you immediately skeptical of the headline number?',
    },
    knowledgeChecks: [
      {
        id: 'm7-q1',
        question: 'Which statement most accurately reports the results of passing a safety test suite?',
        options: [
          '“The system is safe for all enterprise users.”',
          '“The specified tests found these failures and did not observe these other failures within documented coverage; remaining risks and gaps are listed.”',
          '“Zero failures in 100 trials proves a 0% failure rate.”',
        ],
        correctIndex: 1,
        correctExplanation: 'Bounded reporting states exactly what was tested, what was observed, and what coverage gaps or uncertainties remain.',
        distractorNotes: [
          'A overgeneralizes beyond tested coverage.',
          'C misinterprets 0/100 trials (upper bound is ~3% at 95% confidence under binomial assumptions).',
        ],
      },
      {
        id: 'm7-q2',
        question: 'Why can comparing two models on the same benchmark still be misleading if their harnesses differ?',
        options: [
          'Because token budgets, tool access, retries, and system prompts can drive large score differences independent of the base model.',
          'Because harnesses only affect UI colors.',
          'Because statistical significance is impossible with harnesses.',
        ],
        correctIndex: 0,
        correctExplanation: 'Harness choices (e.g., 10 retries with code execution vs. single-shot generation) fundamentally alter the evaluated system.',
        distractorNotes: [
          'B and C are false.',
        ],
      },
    ],
    takeaways: [
      'Audit every public claim with four questions: what layer/unit was tested, what harness and baseline were used, what is hidden or Goodharted, and what the evidence actually supports.',
      'Never invent undisclosed setup details or confidence intervals when summarizing a third-party claim.',
      'Use calibrated phrasing: "The study found…", "The authors report…", "This remains uncertain…".',
    ],
    furtherReading: [],
    transition: 'Ready to integrate all seven modules into one complete evaluation plan? Open the Final Capstone Project, the Practice Tools, or Optional Advanced Tracks (A–G).',
  },
];

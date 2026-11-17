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
    title: 'Foundations & The Evaluation Landscape',
    subtitle: 'Core definitions, taxonomy, evidence hierarchy, and capability vs. mechanism',
    integratedLessons: 'Integrates Lesson 1 (What Is AI Evaluation & How It Works)',
    overview:
      'Evaluation is how we turn uncertainty about an AI system into defensible decisions. This module establishes shared vocabulary, distinguishes empirical observations from normative choices, maps the 10-element evaluation landscape, and introduces an evidence hierarchy.',
    objectives: [
      'Define AI evaluation and distinguish empirical claims, normative choices, and practical recommendations.',
      'Classify evaluation activities across capability, behavioral, safety, reliability, human-centered, benchmark, comparative, deployment, and longitudinal types.',
      'Differentiate model, system, application, human–AI workflow, and organizational impact evaluations.',
      'Explain why benchmark performance does not automatically equate to real-world usefulness, and separate observable behavior from mechanistic claims.',
    ],
    researchEvidence: [
      {
        citation: 'NIST (2023). Artificial Intelligence Risk Management Framework (AI RMF 1.0). NIST AI 100-1.',
        sourceType: 'Technical report / Framework',
        url: 'https://www.nist.gov/itl/ai-risk-management-framework',
        sampleOrScope: 'National risk-management guidance across Govern, Map, Measure, and Manage functions.',
        finding: 'Treats measurement and governance as iterative, cross-cutting functions rather than a single pre-release step.',
        limitations: 'Provides high-level organizational principles rather than task-specific statistical thresholds.',
        doesNotEstablish: 'Does not validate any specific vendor benchmark or proprietary evaluation score.',
      },
    ],
    caseStudy: {
      stageTitle: 'Stage 1 (Fictional Case Study): Auditing the Meridian Research Assistant',
      narrative:
        'Meridian Corp is considering deploying an internal AI Research Assistant that retrieves company/academic PDFs, summarizes findings, and provides citations. Management asks: "Is this AI accurate and ready to roll out?" Before running any test, you break their broad question into separate claims: retrieval accuracy (system component), citation fidelity (output behavior), and whether analysts write better briefs faster (human–AI workflow).',
      keyDecisions: [
        'Classify "must cite a real source passage for every numerical claim" as a normative requirement, not an empirical finding.',
        'Separate observable citation accuracy from claims about whether the model "understands" research methods.',
      ],
    },
    misconceptions: [
      {
        myth: '“A high benchmark score proves the AI is ready for our product.”',
        reality: 'Benchmarks test isolated capabilities under fixed prompts; real usefulness depends on retrieval, UI, user expertise, and error-recovery workflows.',
      },
      {
        myth: '“Evaluation is purely objective math—no value judgments involved.”',
        reality: 'Choosing which metrics matter, where to set failure thresholds, and which harms are unacceptable are normative decisions.',
      },
    ],
    exercise: {
      title: 'Assignment 1: Classify AI Claims & Identify Required Evidence',
      objective: 'Classify ambiguous AI statements by claim type and specify the evidence needed to substantiate each.',
      scenario: 'A vendor pitch deck makes five claims about an AI assistant. Audit each claim.',
      instructions: [
        'Classify each claim as Empirical, Normative, Predictive, Mechanistic, Comparative, or Unsupported/Underspecified:',
        '1) "Our model scored 88% on MMLU-Pro."',
        '2) "Any hallucinated legal citation is unacceptable for client delivery."',
        '3) "The model genuinely understands causal inference."',
        '4) "Deploying this assistant will cut analyst research time by 40% next quarter."',
        '5) "This assistant is better than our analysts’ current workflow."',
      ],
      requiredOutput: 'A 5-row table listing the classification and the specific evidence required to support each claim.',
      evaluationCriteria: [
        'Accurately distinguishes empirical observations from normative thresholds and mechanistic inferences.',
        'Identifies missing comparators, populations, or conditions in underspecified claims.',
      ],
      strongExample:
        'Claim 3 ("genuinely understands causal inference") is Mechanistic/Unsupported: benchmark accuracy alone underdetermines mechanism and requires perturbation, counterfactual, or mechanistic tests. Claim 5 is Comparative/Underspecified: requires a controlled comparison against the current workflow on defined tasks and outcomes.',
      reflectionQuestion: 'Which claim in your own team’s current AI roadmap is phrased as an empirical fact when it is actually a normative choice or prediction?',
    },
    knowledgeChecks: [
      {
        id: 'm1-q1',
        question: 'Which statement is a normative/conceptual choice rather than an empirical claim?',
        options: [
          'The model achieved 85/100 on the 100-item test set.',
          'Any unauthorized data disclosure is a critical failure that blocks release.',
          'Developers took 19% longer to complete tasks with the AI tool in the study.',
        ],
        correctIndex: 1,
        correctExplanation: 'Deciding what counts as an unacceptable failure or release threshold is a normative/value choice. Evidence informs consequences, but cannot by itself decide what risks people should accept.',
        distractorNotes: [
          'A reports an observed test score (empirical).',
          'C reports an observed timing measurement from a study (empirical).',
        ],
      },
      {
        id: 'm1-q2',
        question: 'Why does correct benchmark performance underdetermine a mechanistic claim like "the model reasons like a human"?',
        options: [
          'Because benchmarks only measure latency and cost.',
          'Because memorized examples, dataset shortcuts, or tool assistance can produce correct answers without human-like reasoning.',
          'Because preprints are never peer-reviewed.',
        ],
        correctIndex: 1,
        correctExplanation: 'Multiple distinct mechanisms (memorization, surface heuristics, tool calls, or bounded reasoning) can yield identical benchmark accuracy.',
        distractorNotes: [
          'A is false: benchmarks typically measure task accuracy or completion.',
          'C is irrelevant to the logical distinction between behavior and mechanism.',
        ],
      },
    ],
    takeaways: [
      'The 10-element evaluation architecture is a proposed organizing synthesis—not a universal standard.',
      'Always separate empirical observations, normative thresholds, and practical recommendations.',
      'Model performance, system performance, and human–AI workflow impact are distinct levels of evaluation.',
    ],
    furtherReading: [
      { label: 'NIST AI Risk Management Framework (AI RMF 1.0)', type: 'Technical report / Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework' },
      { label: 'Google People + AI Guidebook', type: 'Industry guidance', url: 'https://pair.withgoogle.com/guidebook/' },
    ],
    transition: 'With the evaluation landscape mapped, Module 2 examines what happens when real humans interact with AI systems.',
  },
  {
    id: 'm2',
    number: 2,
    title: 'Human–AI Interaction & SPHERE',
    subtitle: 'SPHERE’s 5 dimensions, appropriate reliance, human factors, and synergy evidence',
    integratedLessons: 'Integrates Lessons 2 & 4 (Why Human–AI Interaction Changes Everything; Who Evaluates)',
    overview:
      'Most real-world AI deployments are interactive collaborations rather than fully autonomous systems. This module introduces the proposed SPHERE evaluation card, distinguishes augmentation from synergy, and examines human factors such as automation bias, overreliance, and synthetic-user limits.',
    objectives: [
      'Apply SPHERE’s five proposed dimensions (What, How, Who, When, Meta-Validation) to structure a Human–AI evaluation.',
      'Distinguish human-alone, AI-alone, human-plus-AI, augmentation, synergy, and substitution.',
      'Analyze human factors including automation bias, algorithm aversion, over/underreliance, cognitive offloading, and skill retention.',
      'Explain why LLM-simulated personas cannot automatically replace real human participants.',
    ],
    researchEvidence: [
      {
        citation: 'Zhao, D., Ma, Q., Zhao, X., Si, C., Yang, C., Louie, R., Reiter, E., Yang, D., & Wu, T. (2025). SPHERE: An Evaluation Card for Human-AI Systems. Findings of the Association for Computational Linguistics: ACL 2025.',
        sourceType: 'Conference paper (Peer-reviewed)',
        url: 'https://doi.org/10.18653/v1/2025.findings-acl.70',
        sampleOrScope: 'Proposed organizing framework bridging HCI and NLP evaluation practices.',
        finding: 'Organizes Human–AI evaluation around What, How, Who, When, and Meta-Validation to improve methodological transparency.',
        limitations: 'A proposed organizing card/taxonomy, not an empirically validated universal standard.',
        doesNotEstablish: 'Does not guarantee study validity on its own without sound experimental design and measurement.',
      },
      {
        citation: 'Vaccaro, M., Almaatouq, A., & Malone, T. W. (2024). When combinations of humans and AI are useful: A systematic review and meta-analysis. Nature Human Behaviour, 8(12), 2293–2303.',
        sourceType: 'Meta-analysis (Peer-reviewed)',
        url: 'https://doi.org/10.1038/s41562-024-02024-1',
        sampleOrScope: 'Synthesizes 106 studies and 370 effect sizes comparing Human+AI against Human alone and AI alone.',
        finding: 'Human–AI combinations outperformed humans alone on average (g = 0.64), but average human–AI synergy vs. the best solo actor was negative (g = -0.23). Gains appeared in content-creation tasks; losses occurred in decision-making tasks, especially when AI outperformed humans alone.',
        limitations: 'Reflects historical tasks and mostly pre-frontier models across heterogeneous experimental designs.',
        doesNotEstablish: 'Does not establish that all future human–AI systems fail at decision-making or succeed at creation.',
      },
      {
        citation: 'Cheng, M., Piccardi, T., & Yang, D. (2023). CoMPosT: Characterizing & Evaluating Caricature in LLM Simulations. EMNLP 2023.',
        sourceType: 'Conference paper (Peer-reviewed)',
        sampleOrScope: 'Evaluates LLM-simulated personas across political ideology, race/ethnicity, age, and gender.',
        finding: 'LLM simulations of sociocultural groups produced exaggerated caricatures, particularly for marginalized personas and political/racial groups.',
        limitations: 'Tested specific models and prompting setups in 2023.',
        doesNotEstablish: 'Does not prove all synthetic simulation is useless for early pipeline sanity checks, but shows it cannot substitute for real human participants.',
      },
    ],
    caseStudy: {
      stageTitle: 'Stage 2 (Fictional Case Study): Mapping Meridian’s Human–AI Interaction',
      narrative:
        'Using SPHERE as an organizing card, you examine how Meridian analysts actually interact with the assistant. Instead of assuming "human-in-the-loop" guarantees accuracy, you check for automation bias: do analysts rubber-stamp plausible citations without opening the source PDF, or suffer algorithm aversion after seeing one error?',
      keyDecisions: [
        'Choose an assistant/decision-support interaction pattern with mandatory clickable passage links.',
        'Recruit real Meridian analysts (junior and senior) rather than LLM-simulated personas.',
      ],
    },
    misconceptions: [
      {
        myth: '“Adding a human-in-the-loop guarantees safer, better decisions than AI alone.”',
        reality: 'Vaccaro et al. (2024) found Human+AI underperformed the best solo actor on average across 370 effect sizes, especially when AI outperformed humans in decision tasks.',
      },
      {
        myth: '“LLM-simulated users can replace human user studies.”',
        reality: 'Simulated personas can help test pipeline mechanics early, but CoMPosT (2023) showed they caricature sociocultural groups and miss real workflow friction.',
      },
    ],
    exercise: {
      title: 'Assignment 2: Design a Three-Condition Human–AI Study',
      objective: 'Design a 3-condition study (Human alone, AI alone, Human+AI) specifying measures of performance, reliance, and skill retention.',
      scenario: 'Evaluate whether the Meridian Research Assistant improves evidence synthesis.',
      instructions: [
        'Define the task, target participants, and the three conditions (Human alone, AI alone, Human+AI).',
        'Specify exact measures for: (a) task quality, (b) completion + verification time, (c) error rates, (d) confidence, (e) appropriate reliance (when users accept vs. override), and (f) follow-up skill retention.',
        'State what conclusions the 3-way comparison can and cannot support.',
      ],
      requiredOutput: 'A structured 3-condition study design table plus a 1-paragraph scope-of-inference statement.',
      evaluationCriteria: [
        'Includes both solo baselines (Human alone and AI alone) to distinguish augmentation from synergy.',
        'Explicitly measures verification effort and reliance rather than only final output quality.',
      ],
      strongExample:
        'Conditions: (1) Analyst with PDFs only; (2) Assistant generating synthesis unassisted; (3) Analyst using Assistant. Measures: blinded rubric quality (0–5), unsupported-claim count, total time (draft + verify), override accuracy on seeded errors (appropriate reliance), and a 1-week delayed unassisted synthesis quiz. Conclusions apply to English empirical briefs by these analysts, not all company tasks.',
      reflectionQuestion: 'In your domain, when should a human reject an AI recommendation even if the AI has higher average benchmark accuracy?',
    },
    knowledgeChecks: [
      {
        id: 'm2-q1',
        question: 'In Vaccaro et al.’s (2024) meta-analysis of 106 studies (370 effect sizes), when were human–AI synergy losses most pronounced?',
        options: [
          'In content-creation tasks where humans outperformed AI alone.',
          'In decision-making tasks, especially when AI alone outperformed humans.',
          'Only when participants were domain experts.',
        ],
        correctIndex: 1,
        correctExplanation: 'Vaccaro et al. (Nature Human Behaviour, 2024) observed negative average synergy (g = -0.23) concentrated in decision-making tasks and cases where AI outperformed humans alone.',
        distractorNotes: [
          'A describes where gains occurred (content creation / human > AI).',
          'C is incorrect; task type and solo-baseline gap drove the pattern.',
        ],
      },
      {
        id: 'm2-q2',
        question: 'What did the CoMPosT study (Cheng et al., EMNLP 2023) demonstrate about LLM-simulated participants?',
        options: [
          'They eliminate demographic bias in user studies.',
          'They produce exaggerated caricatures of sociocultural groups, especially for marginalized personas and political/racial groups.',
          'They are legally equivalent to human IRB participants.',
        ],
        correctIndex: 1,
        correctExplanation: 'CoMPosT found LLM simulations amplify stereotypes into caricatures; they may aid early sanity checks but cannot replace real target users.',
        distractorNotes: [
          'A is the opposite of the finding.',
          'C is false.',
        ],
      },
    ],
    takeaways: [
      'SPHERE is a proposed organizing card (What, How, Who, When, Meta-Validation), not a universal standard.',
      'True synergy compares Human+AI against the best of Human alone and AI alone.',
      'Appropriate reliance requires measuring when humans accept correct outputs, verify uncertain ones, and reject errors.',
    ],
    furtherReading: [
      { label: 'Zhao et al. (2025), SPHERE: An Evaluation Card for Human-AI Systems (ACL 2025 Findings)', type: 'Conference paper (Peer-reviewed)', url: 'https://doi.org/10.18653/v1/2025.findings-acl.70' },
      { label: 'SPHERE Interactive Card Site', type: 'Research tool', url: 'https://sphere-eval.github.io/' },
      { label: 'Vaccaro, Almaatouq & Malone (2024), Nature Human Behaviour', type: 'Meta-analysis (Peer-reviewed)', url: 'https://doi.org/10.1038/s41562-024-02024-1' },
    ],
    transition: 'Once you know how humans and AI interact, Module 3 shows how to translate broad goals into a tightly scoped, leak-free evaluation question.',
  },
  {
    id: 'm3',
    number: 3,
    title: 'Framing: Purpose, Scope, Targets & Context',
    subtitle: 'Research questions, comparators, agent harnesses, contamination, and validity framing',
    integratedLessons: 'Integrates Lesson 3 & Context (Purpose, Scope, Targets & Modes)',
    overview:
      'A vague goal like "evaluate productivity" cannot guide data collection. This module teaches how to formulate testable research questions, pick appropriate comparators, define agent harnesses and units of analysis, and guard against dataset contamination.',
    objectives: [
      'Formulate a testable evaluation research question naming system, task, population, comparator, estimand, and constraints.',
      'Distinguish exploratory from confirmatory evaluation modes and pre-specify decision thresholds.',
      'Select appropriate comparators (human baseline, prior version, competing model, non-AI workflow) and explain how comparator choice shifts interpretation.',
      'Identify dataset contamination, test-set leakage, prompt leakage, temporal leakage, and evaluation gaming.',
    ],
    researchEvidence: [
      {
        citation: 'Liang, P., et al. (2022/2023). Holistic Evaluation of Language Models (HELM). TMLR.',
        sourceType: 'Peer-reviewed study',
        url: 'https://crfm.stanford.edu/helm/',
        sampleOrScope: 'Multi-scenario, multi-metric model evaluation framework.',
        finding: 'Demonstrated the importance of separating scenarios from metrics, evaluating multiple dimensions (accuracy, calibration, robustness, fairness, efficiency), and making missing coverage explicit.',
        limitations: 'Focused primarily on model-level evaluation rather than interactive human–AI workflows.',
        doesNotEstablish: 'Does not establish product effectiveness or human workflow benefit from model-level scores alone.',
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
      stageTitle: 'Stage 3 (Fictional Case Study): Framing Meridian’s Evaluation Question',
      narrative:
        'Instead of "Does Meridian’s AI work?", you formulate a confirmatory question: "For Meridian analysts synthesizing 4–6 empirical PDFs in English, does Assistant v2.1 (with RAG harness) improve blinded synthesis quality compared with their existing manual workflow, without increasing unsupported conclusions or total verification time?" You also audit the test PDFs to ensure none appeared in model pretraining or vendor prompt examples.',
      keyDecisions: [
        'Unit of analysis: completed synthesis brief (clustered by analyst).',
        'Explicit exclusion: multilingual legal contracts and proprietary spreadsheets are out of scope for this study.',
      ],
    },
    misconceptions: [
      {
        myth: '“Evaluating the underlying LLM tells us how the RAG agent will perform.”',
        reality: 'Results are conditional on the exact model version, prompt, retrieval index, tools, permissions, and environment.',
      },
      {
        myth: '“Any baseline is fine as long as we have a number to compare against.”',
        reality: 'Comparing a new AI system against a strawman baseline (e.g., unassisted novices under artificial time pressure) inflates apparent value.',
      },
    ],
    exercise: {
      title: 'Assignment 3: Transform a Broad Claim into an Evaluation Proposal',
      objective: 'Convert the vague claim "AI improves research productivity" into a complete, falsifiable evaluation framing.',
      scenario: 'Leadership wants to test whether "AI improves research productivity" across the organization.',
      instructions: [
        'Specify: target population, task, AI system & harness configuration, comparator, context/exclusions, primary & secondary outcome variables, measurement period, and directional hypothesis.',
        'List 3 key confounders (e.g., user experience, task difficulty, learning effects) and state the limits of generalization.',
      ],
      requiredOutput: 'A structured 10-field evaluation framing brief.',
      evaluationCriteria: [
        'Variables and estimand are operationally defined.',
        'Comparator reflects a realistic alternative (e.g., existing workflow or simpler search tool).',
        'Contamination and generalization limits are explicitly stated.',
      ],
      strongExample:
        'Population: 30 mid-level policy analysts. Task: 90-minute synthesis of 5 unfamiliar PDFs. System: Assistant v2.1 + citation UI. Comparator: existing PDF reader + keyword search. Outcomes: blinded quality score (primary), unsupported-claim count, and total time. Confounders: prior AI familiarity, topic difficulty, novelty effect. Generalizes only to short English synthesis tasks, not multi-week original research.',
      reflectionQuestion: 'How would your interpretation change if the comparator were a previous model version versus the existing human workflow?',
    },
    knowledgeChecks: [
      {
        id: 'm3-q1',
        question: 'Why must exploratory and confirmatory evaluation modes be kept distinct?',
        options: [
          'Exploratory work is unscientific and should be avoided.',
          'Repeatedly tuning criteria or prompts on a dataset and presenting the final run as an independent test invalidates confirmatory inference.',
          'Confirmatory mode prohibits reporting limitations.',
        ],
        correctIndex: 1,
        correctExplanation: 'Both modes are essential: explore traces to discover failures, then lock outcomes, comparisons, and thresholds before inspecting a fresh confirmatory set.',
        distractorNotes: [
          'A is false: exploratory error analysis is foundational.',
          'C is false: confirmatory studies must still document limitations.',
        ],
      },
      {
        id: 'm3-q2',
        question: 'Which scenario illustrates temporal leakage in evaluation?',
        options: [
          'Testing a financial forecasting model on 2024 market outcomes when its training/RAG corpus already contains 2024 news summaries.',
          'Using two human raters instead of one.',
          'Measuring latency in milliseconds.',
        ],
        correctIndex: 0,
        correctExplanation: 'Temporal leakage occurs when future information relative to the prediction time leaks into training data, prompts, or retrieval.',
        distractorNotes: [
          'B is an annotation design choice.',
          'C is an operational metric.',
        ],
      },
    ],
    takeaways: [
      'Results are always conditional on model version, harness, prompts, tools, context, and comparator.',
      'Distinguish internal validity (causal attribution in the study), external validity (generalization), and ecological validity (real-world realism).',
      'Audit for training, test-set, prompt, and temporal leakage before trusting benchmark scores.',
    ],
    furtherReading: [
      { label: 'HELM: Holistic Evaluation of Language Models', type: 'Peer-reviewed study', url: 'https://crfm.stanford.edu/helm/' },
      { label: 'Anthropic: Demystifying Evals for AI Agents', type: 'Technical report', url: 'https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents' },
    ],
    transition: 'With a sharp question and clean scope, Module 4 turns to operationalizing criteria, choosing task-appropriate metrics, and designing datasets.',
  },
  {
    id: 'm4',
    number: 4,
    title: 'Criteria, Evidence Collection & Sampling',
    subtitle: 'Operational criteria, task-specific metrics, dataset design, ground truth, and robustness',
    integratedLessons: 'Integrates Lesson 5 (Methods, Intrinsic vs. Extrinsic & Sampling)',
    overview:
      'Constructs like "helpfulness" or "groundedness" must be translated into observable indicators, matched to appropriate metrics, and tested on well-documented datasets. This module covers criteria engineering, metrics across task types, dataset sampling, imperfect ground truth, and robustness testing.',
    objectives: [
      'Distinguish construct, criterion, indicator, metric, measurement instrument, and score.',
      'Select appropriate metrics for classification, retrieval, generative tasks, uncertainty calibration, and operational performance.',
      'Design a sampling strategy (representative vs. stratified vs. challenge sets) with inclusion/exclusion rules and provenance.',
      'Explain why human ground-truth labels can be imperfect and design robustness/perturbation checks.',
    ],
    researchEvidence: [
      {
        citation: 'Jimenez, C. E., et al. (2024). SWE-bench: Can Language Models Resolve Real-World GitHub Issues? ICLR 2024.',
        sourceType: 'Conference paper (Peer-reviewed)',
        url: 'https://www.swebench.com/',
        sampleOrScope: '2,294 software engineering tasks from 12 Python repositories evaluated via unit tests.',
        finding: 'Showed that real-repository issue resolution is far harder than isolated function synthesis, while unit tests depend on internal implementation details.',
        limitations: 'Unit tests can be brittle to valid alternative implementations and do not measure human developer productivity.',
        doesNotEstablish: 'Does not establish end-to-end software engineering competence or team productivity.',
      },
      {
        citation: 'Shaikh, O., Chai, V., Gelfand, M. J., Yang, D., & Bernstein, M. S. (2024). Rehearsal: Simulating Conflict to Teach Conflict Resolution. CHI 2024.',
        sourceType: 'Conference paper (Peer-reviewed)',
        sampleOrScope: 'Intrinsic TrueSkill ecological validity eval + extrinsic user study (N = 40 vs. static training material).',
        finding: 'Participants practicing with Rehearsal used significantly more cooperative strategies in actual conflicts than control participants, though declarative knowledge recognition/recall scores did not significantly differ.',
        limitations: 'Short-term controlled study (N = 40) on conflict scenarios.',
        doesNotEstablish: 'Does not prove universal effectiveness across all interpersonal or workplace training domains.',
      },
      {
        citation: 'NIST (2024). Assessing Risks and Impacts of AI (ARIA) Program.',
        sourceType: 'Technical report / Framework',
        url: 'https://ai-challenges.nist.gov/aria',
        sampleOrScope: 'Combines model testing, red teaming, and user testing.',
        finding: 'Illustrates methodological complementarity across automated tests, adversarial probing, and human-centered evaluation.',
        limitations: 'Programmatic evaluation methodology; specific findings depend on the participating systems and scenarios.',
        doesNotEstablish: 'Does not mandate a single fixed metric across all domains.',
      },
    ],
    caseStudy: {
      stageTitle: 'Stage 4 (Fictional Case Study): Building Meridian’s 100-Item RAG Benchmark & Criteria',
      narrative:
        'You operationalize "source fidelity" for Meridian’s assistant: every material claim is checked against retrieved passages on a 3-level anchored scale (Supported, Partially Supported/Omitted Qualifier, Unsupported/Contradicted). You pair retrieval metrics (Recall@5, MRR) with a 100-item stratified test set (70 representative queries + 30 challenge queries with conflicting or missing evidence) and corroborate agent tool calls against actual retrieved doc IDs.',
      keyDecisions: [
        'Use multiple independent domain annotators with explicit adjudication rules for ambiguous claims.',
        'Keep the 30-item challenge set separate from the 70-item representative set when reporting baseline error rates.',
      ],
    },
    misconceptions: [
      {
        myth: '“One metric—like accuracy or ROUGE—can summarize overall AI quality.”',
        reality: 'Metrics are not interchangeable. High retrieval Recall@5 does not guarantee faithful synthesis, and accuracy ignores calibration and latency.',
      },
      {
        myth: '“Gold-standard human labels are objective and error-free.”',
        reality: 'Human annotators disagree on ambiguous or subjective items; consensus labels can still reflect shared blind spots.',
      },
    ],
    exercise: {
      title: 'Assignment 4: Design a 100-Item RAG Evaluation Dataset',
      objective: 'Specify sampling, query categories, ground truth, metrics, and edge cases for a RAG evaluation dataset.',
      scenario: 'Design the 100-item evaluation dataset for the Meridian Research Assistant.',
      instructions: [
        'Define the sampling frame, inclusion/exclusion criteria, and split between representative queries and challenge/edge-case queries.',
        'Specify query categories (e.g., single-doc fact, multi-doc synthesis, unanswerable/missing-evidence, conflicting findings) and difficulty levels.',
        'Choose retrieval metrics (e.g., Recall@k, NDCG), generation criteria (source fidelity, completeness), and ground-truth annotation/adjudication procedures.',
        'Document dataset provenance and 3 known limitations.',
      ],
      requiredOutput: 'A complete dataset specification sheet with sampling breakdown, metrics table, and limitations.',
      evaluationCriteria: [
        'Separates representative prevalence estimation from challenge stress-testing.',
        'Includes unanswerable/abstention cases and conflicting-source edge cases.',
        'Matches metrics to retrieval vs. generation constructs.',
      ],
      strongExample:
        '60 stratified representative queries across 4 research domains + 40 challenge queries (15 conflicting methods, 15 unanswerable/out-of-corpus, 10 long-context >20k tokens). Retrieval: Recall@5 & NDCG@5. Generation: claim-level source fidelity & abstention precision. Ground truth: dual specialist annotation with 3rd-expert adjudication. Limitation: English-only corpus from 2020–2025.',
      reflectionQuestion: 'Why would mixing your 40 challenge queries into the representative set distort your production failure-rate estimate?',
    },
    knowledgeChecks: [
      {
        id: 'm4-q1',
        question: 'Which pair correctly matches a task type to an appropriate uncertainty/calibration metric?',
        options: [
          'Probability calibration → Brier score or Expected Calibration Error (ECE).',
          'Information retrieval ranking → Cohen’s kappa.',
          'Classification under severe class imbalance → Raw accuracy alone.',
        ],
        correctIndex: 0,
        correctExplanation: 'Brier score, log loss, and ECE measure how well predicted probabilities match empirical frequencies.',
        distractorNotes: [
          'B is wrong: Cohen’s kappa measures inter-rater agreement, not retrieval ranking (use MRR, NDCG, or Recall@k).',
          'C is wrong: raw accuracy can look deceptively high under severe class imbalance (use precision, recall, F1, or AUROC/PR curves).',
        ],
      },
      {
        id: 'm4-q2',
        question: 'How does behavioral artifact testing (e.g., ProgramBench) differ from unit-test benchmarks like SWE-bench?',
        options: [
          'Behavioral testing checks observable program outputs against specifications regardless of internal code structure.',
          'Behavioral testing only evaluates qualitative user satisfaction.',
          'Behavioral testing requires no ground truth or specification.',
        ],
        correctIndex: 0,
        correctExplanation: 'Unit tests can fail valid alternative implementations that use different internal names; behavioral tests check end-to-end observable effects.',
        distractorNotes: [
          'B and C mischaracterize behavioral testing.',
        ],
      },
    ],
    takeaways: [
      'Keep construct, criterion, indicator, metric, instrument, and score distinct.',
      'Separate representative test sets (for prevalence estimates) from challenge sets (for stress-testing).',
      'Always test robustness to distribution shift, ambiguity, missing evidence, and prompt variation.',
    ],
    furtherReading: [
      { label: 'NIST ARIA Program', type: 'Technical report / Framework', url: 'https://ai-challenges.nist.gov/aria' },
      { label: 'Husain & Shankar: Error & Trace Analysis Guidance', type: 'Industry guidance', url: 'https://hamel.dev/blog/posts/evals/' },
    ],
    transition: 'Once you have criteria and evidence, Module 5 examines how to grade outputs reliably, validate LLM judges, and measure real human outcomes.',
  },
  {
    id: 'm5',
    number: 5,
    title: 'Real Human Outcomes, Grading & Aggregation',
    subtitle: '9 outcome levels, human/LLM-judge reliability, Simpson’s paradox, and severity-aware aggregation',
    integratedLessons: 'Integrates Lesson 6 (Measuring Real Outcomes, Skill Erosion & Grading)',
    overview:
      'Good outputs do not guarantee good human outcomes. This module distinguishes nine levels of outcomes, covers inter-rater reliability (Cohen’s kappa, weighted kappa, Krippendorff’s alpha, ICC), details LLM-as-a-judge validation, and shows how naive aggregation conceals critical failures.',
    objectives: [
      'Distinguish nine outcome levels from model output quality to long-term skill retention and organizational/social consequences.',
      'Select and interpret appropriate inter-rater reliability metrics (Cohen’s kappa, weighted kappa, Krippendorff’s alpha, ICC).',
      'Design a validation protocol for an LLM-as-a-judge evaluator and test for position, verbosity, self-preference, and family biases.',
      'Identify Simpson’s paradox and subgroup failures hidden inside aggregate averages.',
    ],
    researchEvidence: [
      {
        citation: 'Becker, J., Rush, N., Barnes, E., & Rein, D. (2025). Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity. METR Technical Report.',
        sourceType: 'Technical report / Framework',
        url: 'https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/',
        sampleOrScope: 'RCT with 16 experienced open-source developers completing 246 tasks on large, complex repositories (~5 years prior experience).',
        finding: 'Developers forecasted a ~20% speedup with AI tools, yet observed task completion was 19% slower when AI tools were allowed.',
        limitations: 'Concerns early-2025 tools, experienced developers on familiar large repos, and specific task conditions.',
        doesNotEstablish: 'Does not generalize to all AI coding tools, novice developers, or greenfield projects.',
      },
      {
        citation: 'Shen, J. H., & Tamkin, A. (January 29, 2026). How AI assistance impacts the formation of coding skills. Anthropic Research.',
        sourceType: 'Technical report / Framework',
        url: 'https://www.anthropic.com/research/AI-assistance-coding-skills',
        sampleOrScope: 'Randomized controlled trial of 52 software engineers learning a new Python library (Trio) with vs. without AI assistance.',
        finding: 'On a follow-up mastery quiz (measuring conceptual understanding, code reading, and debugging), the AI-assisted group averaged approximately 50% compared with approximately 67% for the hand-coding group—a 17-percentage-point difference (largest on debugging), while immediate task completion time showed no statistically significant difference.',
        limitations: 'Short-term experiment with 52 engineers learning one unfamiliar library; outcomes depend on how participants interacted with AI (passive offloading vs. active conceptual questioning).',
        doesNotEstablish: 'Does not establish universal or long-term skill degradation across all occupations, AI systems, user expertise levels, or learning contexts.',
      },
      {
        citation: 'Jakesch, M., Bhat, A., Buschek, D., Zalmanson, L., & Naaman, M. (2023). Co-writing with opinionated language models affects users’ views. CHI 2023.',
        sourceType: 'Conference paper (Peer-reviewed)',
        sampleOrScope: 'Controlled online co-writing experiment on social-media opinions.',
        finding: 'Co-writing with an opinionated model shifted participants’ written post stances and subsequent survey opinions, even though most participants rated the suggestions balanced.',
        limitations: 'Short-term online writing task on a single topic.',
        doesNotEstablish: 'Does not establish permanent long-term attitude change across all writing tools.',
      },
      {
        citation: 'Padmakumar, V., Ibrahim, L., Wang, Z. Z., Wang, J., Liao, Q. V., & Yang, D. (2026). Offloading Score: Measuring AI Reliance Through Counterfactual Workflows. NeurIPS 2026 (Oral) / Preprint.',
        sourceType: 'Conference paper (Peer-reviewed)',
        sampleOrScope: 'Workflow induction from interaction traces with counterfactual step estimation (>85% plausibility in content validity checks).',
        finding: 'Higher Offloading Score was generally associated with lower system/code recall, alongside an outlier cluster of appropriately reliant users who used the model to learn and improvise.',
        limitations: 'Observational correlation in coding workflows; counterfactual steps are LM-estimated.',
        doesNotEstablish: 'Does not prove offloading alone causes low understanding in every workflow.',
      },
    ],
    caseStudy: {
      stageTitle: 'Stage 5 (Fictional Case Study): Grading & Outcomes at Meridian',
      narrative:
        'You test an LLM judge to scale source-fidelity grading across 500 Meridian summaries. On a held-out set of 60 human-adjudicated summaries, the LLM judge achieves 88% overall agreement—but misses 40% of subtle causal-misrepresentation errors (high false negatives on rare critical errors) and favors longer summaries (verbosity bias). You restrict the LLM judge to first-pass screening and keep blinded specialists on all critical claims, while tracking analysts’ actual verification time and unassisted follow-up comprehension.',
      keyDecisions: [
        'Use weighted Cohen’s kappa for ordinal human rubric ratings.',
        'Treat unauthorized confidential-data exposure as a mandatory non-compensatory constraint rather than averaging it into a composite score.',
      ],
    },
    misconceptions: [
      {
        myth: '“90% agreement with humans means our LLM judge is ready to replace human review.”',
        reality: 'High overall agreement can mask severe false-negative rates on rare but critical errors, plus position, verbosity, and self-preference biases.',
      },
      {
        myth: '“A higher average score across all users means every subgroup improved.”',
        reality: 'Simpson’s paradox and subgroup disparities can hide regressions for specific user groups or task types inside an improved overall mean.',
      },
    ],
    exercise: {
      title: 'Assignment 5: Validate Human Raters & an LLM Judge',
      objective: 'Evaluate inter-rater reliability and audit an LLM judge against human ground truth.',
      scenario: 'You have 30 Meridian summaries rated on a 1–4 ordinal fidelity scale by two human experts and an LLM judge.',
      instructions: [
        'Select the right reliability metric for two raters on a 1–4 ordinal scale (and explain why unweighted percentage agreement is insufficient).',
        'Design a confusion matrix / error audit comparing the LLM judge against adjudicated human labels.',
        'Check for verbosity bias, position bias (if pairwise), and false negatives on score-1 critical failures.',
        'Write a "fit-for-purpose" recommendation specifying when the judge can be used and when human escalation is mandatory.',
      ],
      requiredOutput: 'Reliability metric justification, judge error-audit plan, and fit-for-purpose decision.',
      evaluationCriteria: [
        'Chooses weighted kappa (or Krippendorff’s alpha / ICC) over raw agreement.',
        'Separates false positives from consequential false negatives.',
      ],
      strongExample:
        'Use quadratic weighted Cohen’s kappa (accounts for chance agreement and penalizes 1-vs-4 disagreements more than 3-vs-4). For >2 raters or missing ratings, use Krippendorff’s alpha; for continuous scores, use ICC. Audit the LLM judge on held-out items by length quartile and error severity; if false negatives on score-1 errors exceed threshold, use the judge only for triage with mandatory human review on flagged/high-stakes briefs.',
      reflectionQuestion: 'When two human experts disagree on a summary’s quality, should you automatically average their scores or investigate why they disagreed?',
    },
    knowledgeChecks: [
      {
        id: 'm5-q1',
        question: 'In Anthropic’s study "How AI assistance impacts the formation of coding skills" (Shen & Tamkin, Jan 29, 2026), what is the accurate interpretation of the ~50% vs. ~67% quiz result?',
        options: [
          'AI tools universally destroy 17% of engineering skill across all occupations and workflows.',
          'In that RCT of 52 engineers learning a new Python library, the AI-assisted group scored 17 percentage points lower on a follow-up mastery quiz (conceptual understanding, code reading, and debugging) than the hand-coding group, which does not establish universal long-term deskilling.',
          'The AI-assisted group took 17 percentage points longer to finish the initial coding task.',
        ],
        correctIndex: 1,
        correctExplanation: 'Reporting the result as a 17-percentage-point difference (~50% vs. ~67%) scoped to 52 engineers learning an unfamiliar library distinguishes immediate task completion from learning/skill acquisition without overgeneralizing.',
        distractorNotes: [
          'A confuses a 17-percentage-point difference with a 17% relative reduction and overgeneralizes to all occupations.',
          'C misstates the measured outcome (mastery quiz score, not task time).',
        ],
      },
      {
        id: 'm5-q2',
        question: 'Which reliability measure is designed for two or more raters with missing data or mixed measurement levels (nominal/ordinal/interval)?',
        options: [
          'Raw percentage agreement.',
          'Krippendorff’s alpha.',
          'Brier score.',
        ],
        correctIndex: 1,
        correctExplanation: 'Krippendorff’s alpha generalizes across 2+ raters, handles missing ratings, and supports nominal, ordinal, interval, and ratio scales.',
        distractorNotes: [
          'A does not correct for chance agreement.',
          'C measures probabilistic calibration, not inter-rater reliability.',
        ],
      },
    ],
    takeaways: [
      'Track human outcomes (task accuracy, verification time, workload, skill retention) separately from model output quality.',
      'Validate LLM judges on held-out human labels and inspect rare-failure false negatives and systematic biases.',
      'Never let a composite average or Simpson’s paradox obscure critical subgroup or safety failures.',
    ],
    furtherReading: [
      { label: 'METR (2025), Early-2025 AI Experienced OS Developer Study', type: 'Technical report', url: 'https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/' },
      { label: 'Shen & Tamkin (Jan 29, 2026), How AI assistance impacts the formation of coding skills', type: 'Industry research report', url: 'https://www.anthropic.com/research/AI-assistance-coding-skills' },
    ],
    transition: 'Once outputs and human outcomes are measured, Module 6 teaches how to analyze statistical uncertainty, design causal studies, build validity arguments, and govern the lifecycle.',
  },
  {
    id: 'm6',
    number: 6,
    title: 'Statistics, Validity, Lifecycle & Protocol',
    subtitle: 'Statistical foundations, experimental design, argument-based validity, and lifecycle governance',
    integratedLessons: 'Integrates Lessons 7, 8 & 9 (Statistics & Validity; Time & Governance; Protocol)',
    overview:
      'Responsible interpretation requires statistical discipline, sound causal design, an explicit validity argument, and ongoing governance. This module is organized into four practical pillars: Statistical Foundations, Experimental Design, Validity, and Lifecycle/Protocol.',
    objectives: [
      'Calculate and interpret uncertainty (including exact binomial bounds for rare failures, confidence intervals, effect sizes, statistical power, and clustered observations).',
      'Distinguish between-subject, within-subject (counterbalanced), and observational designs and identify confounding, selection bias, and attrition.',
      'Construct an argument-based validity review across construct, content, criterion, internal, external, ecological, reliability, and consequential dimensions.',
      'Author a pre-registered evaluation protocol with versioning, drift monitoring, escalation criteria, and bounded deployment decisions.',
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
        citation: 'Long, T., Gero, K. I., & Chilton, L. B. (2024). Not Just Novelty: A Longitudinal Study on Utility and Customization of AI Workflows. arXiv preprint.',
        sourceType: 'Preprint',
        sampleOrScope: 'Longitudinal study of users working with AI chains over time.',
        finding: 'Identified a familiarization phase after which users understood the workflow, customized prompts, and rated utility higher—indicating perceived utility was not solely a short-lived novelty effect.',
        limitations: 'Preprint studying a specific AI-chain interface and participant group.',
        doesNotEstablish: 'Does not guarantee all AI tools improve with familiarity.',
      },
      {
        citation: 'Ibrahim, L., Hafner, F. S., Cheng, M., Lee, C., Anselmetti, R., Willer, R., Rocher, L., & Yang, D. (2026). Sycophantic AI Makes Human Interaction Feel More Effortful and Less Satisfying Over Time. arXiv:2605.07912.',
        sourceType: 'Preprint',
        url: 'https://arxiv.org/abs/2605.07912',
        sampleOrScope: 'Short-term preference ranking and longitudinal exposure study.',
        finding: 'Participants ranked sycophantic AI responses first in immediate comparisons, whereas extended exposure was associated with lower satisfaction with human interactions and higher preference for AI over humans.',
        limitations: 'Preprint; effects depend on the interaction setting and exposure duration studied.',
        doesNotEstablish: 'Does not establish identical effect sizes across every enterprise copilot.',
      },
    ],
    caseStudy: {
      stageTitle: 'Stage 6 (Fictional Case Study): Interpreting Meridian’s Results & Governance Plan',
      narrative:
        'Meridian’s 48-analyst counterbalanced within-subject experiment shows a +0.45-point gain on the 5-point synthesis rubric (95% CI: +0.15 to +0.75), but 0 confidentiality breaches in 100 audited runs (one-sided 95% upper bound ≈ 3%) and a +4-minute verification overhead for junior analysts. You write a bounded deployment decision: approve a monitored 4-week pilot for non-confidential research only, with separate product/judge versioning and automated drift alerts.',
      keyDecisions: [
        'Account for clustering (multiple briefs per analyst) in confidence intervals.',
        'Assign a named Product Owner for pilot authorization and a separate Risk Reviewer with authority to halt on incidents.',
      ],
    },
    misconceptions: [
      {
        myth: '“p < 0.05 means the improvement is practically important.”',
        reality: 'Large samples can make trivial differences statistically significant; always inspect effect sizes, confidence intervals, cost, and verification burden.',
      },
      {
        myth: '“0 failures in 100 tests means a 0% failure rate.”',
        reality: 'Under independent Bernoulli trials, 0/100 still permits up to a ~3% failure rate at the one-sided 95% upper confidence bound.',
      },
    ],
    exercise: {
      title: 'Assignment 6: Interpret Differences, Confidence Intervals & Subgroup Results',
      objective: 'Compare two AI systems directly using difference confidence intervals, effect sizes, subgroup checks, and practical significance.',
      scenario:
        'Fictional paired comparison on N = 200 shared research tasks (evaluated by 25 analysts, 8 tasks each): System A mean 4.10/5 (SD 0.60, 95% CI [4.02, 4.18]), latency 1.2s, cost $0.02/task; Non-English subgroup (n = 15 tasks) mean 2.80/5. System B mean 4.20/5 (SD 0.70, 95% CI [4.10, 4.30]), latency 6.5s, cost $0.18/task; Non-English subgroup (n = 15 tasks) mean 3.90/5. Direct paired difference (B − A): +0.10 points (cluster-robust 95% CI [+0.01, +0.19]).',
      instructions: [
        'Warning: The overlap or non-overlap of two separate 95% confidence intervals ([4.02, 4.18] vs. [4.10, 4.30]) is not, by itself, a formal statistical test of the difference between System A and System B.',
        'Explain why estimating the paired/clustered difference directly (+0.10, 95% CI [+0.01, +0.19]) is required rather than eyeballing separate CIs, and distinguish statistical uncertainty from measurement uncertainty (rater noise).',
        'Assess whether a +0.10-point overall difference (small effect size) is practically meaningful given 9× higher cost and 5.4× higher latency.',
        'Evaluate whether n = 15 Non-English tasks is sufficient and how the 1.10-point subgroup gap changes the deployment decision.',
      ],
      requiredOutput: 'A 4-part statistical & decision interpretation memo.',
      evaluationCriteria: [
        'Avoids the overlapping-CI fallacy and uses the direct difference CI and cluster-aware reasoning.',
        'Distinguishes statistical detectability from practical significance and cost/latency trade-offs.',
        'Flags the small subgroup sample (n = 15) and recommends targeted follow-up sampling before Non-English deployment.',
      ],
      strongExample:
        'Even though the two separate 95% CIs overlap ([4.02, 4.18] and [4.10, 4.30]), the direct paired difference is +0.10 with a cluster-robust 95% CI [+0.01, +0.19], showing a statistically detectable but small overall effect (d ≈ 0.15). Practically, +0.10 on a 5-point scale does not justify 9× cost and 5.4× latency for English tasks. However, System A drops to 2.80/5 on Non-English queries (n = 15, wide uncertainty). Decision: do not deploy System A for Non-English workflows; run a powered stratified evaluation (e.g., n ≥ 60 per language) before deciding.',
      reflectionQuestion: 'Why can two systems have overlapping individual 95% CIs yet still show a statistically detectable paired difference (and vice versa when observations are clustered)?',
    },
    knowledgeChecks: [
      {
        id: 'm6-q1',
        question: 'If you log 300 chat turns across 5 user sessions, why is treating N = 300 as independent observations statistically invalid?',
        options: [
          'Because 300 is too small for any confidence interval.',
          'Because turns within the same session are clustered and share user/context dependencies, understating uncertainty.',
          'Because chat turns can only be analyzed qualitatively.',
        ],
        correctIndex: 1,
        correctExplanation: 'Clustered observations within a conversation are correlated; standard errors must account for clustering at the session/user level.',
        distractorNotes: [
          'A is false: 300 independent observations would be sizeable; the issue is dependence.',
          'C is false: clustered quantitative analysis is standard.',
        ],
      },
      {
        id: 'm6-q2',
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
        id: 'm6-q3',
        question: 'Two systems have separate 95% CIs of [0.74, 0.82] and [0.78, 0.86] on the same 200 paired test items. What is the right way to test their difference?',
        options: [
          'Conclude there is no statistically significant difference because the two 95% CIs overlap.',
          'Compute the paired difference on each item and construct a 95% CI for the difference directly.',
          'Run 20 separate subgroup t-tests without correction until one is significant.',
        ],
        correctIndex: 1,
        correctExplanation: 'Overlap of separate 95% CIs is not a valid hypothesis test—especially for paired designs where item-level covariance reduces the variance of the difference.',
        distractorNotes: [
          'A commits the overlapping-CI fallacy.',
          'C introduces multiple-comparison false positives.',
        ],
      },
      {
        id: 'm6-q4',
        question: 'A model produces 0 critical failures in 100 independent representative trials. Using the rule of three, what is the approximate one-sided 95% upper bound on the failure rate, and what does it assume?',
        options: [
          '0%, proving the model is completely safe in production.',
          '~3% (3/100), assuming independent Bernoulli trials, a fixed failure rate, and accurate failure detection—and saying nothing about untested shifts.',
          '~30%, because 100 trials is always underpowered.',
        ],
        correctIndex: 1,
        correctExplanation: 'Under independent Bernoulli trials with accurate detection, 1 − 0.05^(1/100) ≈ 2.95% (~3% via the rule of three 3/N). It does not guarantee safety under distribution shift.',
        distractorNotes: [
          'A confuses zero observed failures with zero true probability.',
          'C miscalculates the binomial bound.',
        ],
      },
      {
        id: 'm6-q5',
        question: 'With N = 15,000 tasks, Model B beats Model A by +0.4 percentage points (82.4% vs. 82.0%, p = 0.02) but costs 4× more and adds 3 seconds of latency. How should you interpret this?',
        options: [
          'Model B must be deployed because p < 0.05 proves practical superiority.',
          'The difference is statistically detectable due to large N, but practically negligible relative to the 4× cost and latency trade-off.',
          'The p-value proves the measurement instrument is valid.',
        ],
        correctIndex: 1,
        correctExplanation: 'Statistical significance depends heavily on sample size and does not establish practical importance or net value.',
        distractorNotes: [
          'A conflates statistical significance with practical significance.',
          'C confuses p-values with measurement validity.',
        ],
      },
    ],
    takeaways: [
      'Report effect sizes, confidence intervals, clustering, and subgroup uncertainty—not just p-values or averages.',
      'Validity is an argument for a specific interpretation and use, not a universal badge.',
      'Lifecycle governance requires pre-registered protocols, separate product/evaluator versioning, and clear escalation triggers.',
    ],
    furtherReading: [
      { label: 'Standards for Educational and Psychological Testing (AERA/APA/NCME)', type: 'Standards' },
      { label: 'NIST AI RMF & Automated Benchmark Guidance', type: 'Technical report / Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework' },
    ],
    transition: 'With rigorous design and statistical foundations in place, Module 7 equips you to audit public benchmarks, leaderboards, and overclaimed AI announcements.',
  },
  {
    id: 'm7',
    number: 7,
    title: 'How AI Benchmarks and Leaderboards Can Mislead',
    subtitle: 'Goodhart’s law, contamination, overfitting, harness sensitivity, and auditing AI hype',
    integratedLessons: 'Integrates Module 7 Critical Auditing & Reporting Calibration',
    overview:
      'Public leaderboards and vendor announcements frequently overstate real-world readiness. This module examines 18 common benchmark and reporting pitfalls—from saturation and contamination to prompt/harness sensitivity, cherry-picking, and false equivalence across benchmarks.',
    objectives: [
      'Diagnose benchmark saturation, training/test contamination, overfitting, and prompt/harness sensitivity.',
      'Critique misleading averages, cherry-picked baselines, multiple-comparison searching, and synthetic benchmark limits.',
      'Explain why scores from two different benchmarks cannot be directly equated or averaged without justification.',
      'Rewrite an overstated AI performance claim into a scientifically defensible, bounded statement.',
    ],
    researchEvidence: [
      {
        citation: 'Goodhart, C. A. E. (1975) / Strathern, M. (1997). "When a measure becomes a target, it ceases to be a good measure."',
        sourceType: 'Technical report / Framework',
        sampleOrScope: 'Foundational principle in measurement and institutional evaluation.',
        finding: 'Optimizing directly for a proxy leaderboard score degrades its correlation with the underlying real-world capability or goal.',
        limitations: 'Conceptual principle; severity depends on how tightly benchmarks are gamed.',
        doesNotEstablish: 'Does not imply all benchmarks are useless—only that static public targets lose diagnostic power once optimized against.',
      },
    ],
    caseStudy: {
      stageTitle: 'Stage 7 (Fictional Case Study): Auditing a Vendor Press Release at Meridian',
      narrative:
        'A competing vendor claims: "Model X is the most intelligent research AI—94% on LeadingQA!" Using your audit checklist, you discover: (1) LeadingQA was released in 2022 and shows heavy web contamination; (2) Model X used a 10-retry agent harness while the baseline was zero-shot; (3) no confidence intervals, cost, or human-outcome tests were reported. You rewrite the claim accurately for Meridian’s executive committee.',
      keyDecisions: [
        'Reject uncalibrated leaderboard comparisons as a basis for procurement.',
        'Require held-out, harness-matched, and human-outcome evidence on Meridian’s own tasks.',
      ],
    },
    misconceptions: [
      {
        myth: '“If Model A scores 82% on Benchmark X and Model B scores 79% on Benchmark Y, Model A is better.”',
        reality: 'Different benchmarks measure different constructs, difficulties, and scoring rules; cross-benchmark comparisons without shared baselines are invalid.',
      },
      {
        myth: '“A saturated benchmark (95%+) means the AI has mastered the domain.”',
        reality: 'Saturation often reflects benchmark ceiling effects, memorization, or narrow phrasing rather than mastery of complex real-world edge cases.',
      },
    ],
    exercise: {
      title: 'Assignment 7: Audit a Fictional AI Press Release',
      objective: 'Audit a misleading AI announcement across 10 methodological dimensions and draft a defensible revision.',
      scenario: 'Press release: "Our new model Apex-7 is the most intelligent AI system ever built, achieving #1 (92.4%) on ReasoningBench—proving it outperforms human experts and is safe for enterprise deployment."',
      instructions: [
        'Audit the claim across: (1) benchmark scope & saturation, (2) comparison systems & version parity, (3) prompt/harness/retry parity, (4) contamination risk, (5) metric & aggregation choices, (6) statistical uncertainty, (7) generalization to enterprise deployment, and (8) missing safety/human-outcome evidence.',
        'Write a revised, scientifically defensible 3-sentence statement.',
      ],
      requiredOutput: 'A structured 8-point audit and a rewritten bounded statement.',
      evaluationCriteria: [
        'Identifies scope jumps (benchmark accuracy → general intelligence & deployment safety).',
        'Checks harness/retry fairness, contamination uncertainty, and missing human-expert comparator details.',
      ],
      strongExample:
        'Audit highlights: "most intelligent" extrapolates from one benchmark; safety and human-expert superiority are unsupported; retry/tool harness and contamination checks are undisclosed; no CIs or subgroup errors shown. Revised claim: "Under the disclosed zero-shot configuration, Apex-7 achieved 92.4% (±1.2%) on ReasoningBench, outperforming the tested baseline models on those items. These results do not establish general intelligence, superiority over human experts in practice, or enterprise deployment safety without domain-specific human and safety evaluations."',
      reflectionQuestion: 'What single question most quickly exposes whether a benchmark score is relevant to your actual decision?',
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
      'Scrutinize contamination, saturation, harness parity, multiple comparisons, and missing error bars.',
      'Never equate a narrow benchmark score with general intelligence or real-world deployment readiness.',
      'Use calibrated evidence language: "The study found...", "The evidence suggests...", "This remains uncertain...".',
    ],
    furtherReading: [
      { label: 'Standards for Educational and Psychological Testing (Validity & Score Use)', type: 'Standards' },
      { label: 'HELM: Transparency on Coverage & Scenarios', type: 'Peer-reviewed study', url: 'https://crfm.stanford.edu/helm/' },
    ],
    transition: 'Now apply all seven modules together in the Final Capstone Project—or explore the optional Advanced Learning Tracks (RAG, Agents, Safety, Multimodal, Advanced Measurement, Organizational Eval).',
  },
];

export interface LessonMappingRow {
  originalLesson: string;
  newModule: string;
  contentRetained: string;
  changesMade: string;
}

export const LESSON_CONSOLIDATION_MAP: LessonMappingRow[] = [
  {
    originalLesson: 'Lesson 1: What Is AI Evaluation & How It Works',
    newModule: 'Module 1: Foundations & The Evaluation Landscape',
    contentRetained: 'Definition, 3 statement types, 10-element landscape, capability vs. mechanism.',
    changesMade: 'Expanded with 10-type evaluation taxonomy, 5 scope levels, 15-term glossary, evidence hierarchy, and Claim Classification assignment.',
  },
  {
    originalLesson: 'Lesson 2: Why Human–AI Interaction Changes Everything',
    newModule: 'Module 2: Human–AI Interaction & SPHERE',
    contentRetained: 'Interaction vs. autonomy, SPHERE framework, Vaccaro et al. (2024) synergy meta-analysis.',
    changesMade: 'Corrected SPHERE citation to Zhao et al. (2025), added augmentation/synergy/substitution, appropriate reliance, human factors, and 3-condition study assignment.',
  },
  {
    originalLesson: 'Lesson 3: Purpose, Scope, Targets & Evaluation Modes',
    newModule: 'Module 3: Framing: Purpose, Scope, Targets & Context',
    contentRetained: 'Exploratory vs. confirmatory modes, 6 nested scopes, agent harnesses, target inventory, question framing.',
    changesMade: 'Added formal RQ/hypothesis/estimand framing, comparator selection, 7 contamination/leakage modes, and internal/external/ecological validity.',
  },
  {
    originalLesson: 'Lesson 4: Who Evaluates, For Whom & Context Coverage',
    newModule: 'Modules 2 & 3 (distributed by theme)',
    contentRetained: 'Target users vs. crowd annotators, CoMPosT caricature risks, HELM-style missing coverage.',
    changesMade: 'Merged participant/synthetic-persona topics into Module 2 and context/coverage exclusions into Module 3.',
  },
  {
    originalLesson: 'Lesson 5: How We Evaluate: Methods, Intrinsic vs. Extrinsic & Sampling',
    newModule: 'Module 4: Criteria, Evidence Collection & Sampling',
    contentRetained: 'Quantitative vs. qualitative, intrinsic vs. extrinsic, SWE-bench vs. ProgramBench, Rehearsal, 8 methods, 4 sampling purposes.',
    changesMade: 'Added 6-layer construct-to-score chain, metrics by task type, dataset design, imperfect ground truth, robustness testing, and 100-item RAG dataset assignment.',
  },
  {
    originalLesson: 'Lesson 6: Measuring Real Outcomes, Skill Erosion & Grading',
    newModule: 'Module 5: Real Human Outcomes, Grading & Aggregation',
    contentRetained: 'METR study, Anthropic coding-skills study, opinion drift, Offloading Score, grader validation, severity-preserving aggregation.',
    changesMade: 'Corrected Anthropic title & 17-percentage-point framing, added 9 outcome levels, κ/α/ICC reliability metrics, LLM-judge biases, Simpson’s paradox, and judge validation assignment.',
  },
  {
    originalLesson: 'Lesson 7: Statistical Uncertainty, Clustering & Validity',
    newModule: 'Module 6: Statistics, Validity, Lifecycle & Protocol',
    contentRetained: '0/100 rare-failure bound, conversation clustering, validity review.',
    changesMade: 'Reorganized validity into 3 distinct categories (A, B, C), added 12 step-by-step statistical worked examples, and corrected CI-overlap guidance.',
  },
  {
    originalLesson: 'Lesson 8: When to Evaluate: Lifecycle, Long-Term Effects & Governance',
    newModule: 'Module 6 (Section D: Lifecycle & Governance)',
    contentRetained: 'Short-term vs. long-term dynamics (familiarization, sycophancy), governance roles, oversight checks, reevaluation triggers.',
    changesMade: 'Consolidated into Module 6 Section D alongside pre-registered protocols, audit trails, and drift detection.',
  },
  {
    originalLesson: 'Lesson 9: Worked Example, Reporting Discipline & Protocol Builder',
    newModule: 'Modules 6 & 7 + Final Capstone Project',
    contentRetained: 'Research Assistant case study, Claim Calibration table, 12-field protocol, Decision Statement.',
    changesMade: 'Expanded the Research Assistant into the continuous Meridian case study across Modules 1–7, moved benchmark/claim auditing into Module 7, and built the full 22-element Capstone.',
  },
];

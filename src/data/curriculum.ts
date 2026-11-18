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
    title: 'Foundations: Run Your First Eval',
    subtitle: 'Test cases, scoring rules, version regressions, and what a pass actually establishes',
    integratedLessons: 'Lesson 1',
    overview:
      'Learn how AI evaluation works by running a small, complete test first—scoring outputs against a clear rule, comparing two prompt versions to catch a regression, and seeing what a passing score can and cannot tell you.',
    objectives: [
      'Define an AI eval in plain language using test cases, scoring criteria, and a scoring method.',
      'Score illustrative outputs against a concrete policy rule and spot a version regression even when total scores tie.',
      'Explain what passing a small task test establishes—and what it does not establish about other tasks.',
      'Distinguish empirical observations, normative choices, and practical recommendations.',
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
      stageTitle: 'Stage 1 (Fictional Case Study): First Check on the Meridian Research Assistant',
      narrative:
        'Meridian Corp is considering an AI assistant to summarize empirical papers. Before buying or launching anything, you run a small check on 5 real paper excerpts with one crisp rule: every quantitative finding in a summary must match the source passage and preserve key qualifiers. That small eval reveals whether basic faithfulness works before investing in a larger study.',
      keyDecisions: [
        'Write an explicit observable rule before scoring outputs.',
        'Treat passing 5 excerpt checks as evidence about excerpt fidelity only—not proof that analysts save time.',
      ],
    },
    misconceptions: [],
    exercise: {
      title: 'Assignment 1: Write One New Case & Interpret a Version Trade-Off',
      objective: 'Add one new test case to the return-policy eval and state what a pass establishes.',
      scenario:
        'Using the same return policy ("Unused items can be returned within 30 days"), you just tested Case 1 (customer bought 12 days ago, condition unspecified) and Case 2 (customer bought 12 days ago, item unused). Both Prompt v1 and Prompt v2 scored 1/2 overall, but v2 passed Case 1 and failed Case 2.',
      instructions: [
        'Write one new test case (Case 3) that checks a different failure mode of this same policy (for example, an item bought 45 days ago, or an item the customer says they already wore).',
        'State the expected passing behavior and one concrete failing answer for Case 3.',
        'In 2 sentences, explain why Prompt v2 is not automatically an improvement over Prompt v1 despite fixing Case 1, and name one topic (such as lost accounts) that passing all three return cases does not test.',
      ],
      requiredOutput: 'One new test case (customer message, pass rule, sample failure) plus a 2-sentence interpretation.',
      evaluationCriteria: [
        'Case 3 directly tests the stated 30-day / unused policy without inventing extra unstated rules.',
        'Identifies the Case 2 regression hidden by the tied 1/2 total score and limits the claim to returns.',
      ],
      strongExample:
        'Case 3 — Customer: "I bought this 45 days ago and never opened it. Can I return it?" Pass rule: Answer must state the item is outside the 30-day window and not promise a return. Sample failure: "Since it is unused, you can return it." Interpretation: Prompt v2 fixed Case 1 but regressed on Case 2, so the tied 1/2 total score hides a trade-off rather than clear progress; passing all three return cases only tests 30-day returns and tells us nothing about lost accounts or billing disputes.',
      reflectionQuestion: 'What single case in your own work would immediately expose a flawed prompt if you tested it today?',
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
        question: 'Which statement is a normative choice rather than an empirical observation?',
        options: [
          'Prompt v2 passed Case 1 and failed Case 2.',
          'Before promising a return, the assistant must verify any policy condition the customer left unspecified.',
          'Prompt v1 scored 1/2 on the two illustrative return cases.',
        ],
        correctIndex: 1,
        correctExplanation: 'Setting the policy rule for what counts as an acceptable response is a normative/product choice; pass/fail counts are empirical observations.',
        distractorNotes: [
          'A and C report observed test outcomes.',
        ],
      },
    ],
    takeaways: [
      'Every eval has three core parts: test cases, scoring criteria, and a scoring method.',
      'Compare prompt versions on the same cases to catch regressions hidden by tied total scores.',
      'Passing a small task eval tells you about that task—not unrelated tasks or real-world user benefit.',
    ],
    furtherReading: [
      { label: 'Google People + AI Guidebook', type: 'Industry guidance', url: 'https://pair.withgoogle.com/guidebook/' },
    ],
    transition: 'If you are following the "Run a first eval" route, jump to Module 4 (Cases & Criteria) next. Otherwise continue to Module 2 to test whether AI helps people on a real workflow.',
  },
  {
    id: 'm2',
    number: 2,
    title: 'Human–AI Interaction: Does AI Help People?',
    subtitle: 'Testing real work quality and total task time (drafting + checking + correction)',
    integratedLessons: 'Lessons 2, 4 & 6 (Human Outcomes)',
    overview:
      'Teach one central question: does a person using AI do better work or finish sooner than with the current workflow? Count checking and correction time, use two conditions for adoption questions, and add an AI-alone condition only when claiming synergy over both solo baselines.',
    objectives: [
      'Design a two-condition workflow comparison (current workflow vs. human with AI) measuring work quality and total task time.',
      'Explain when a third AI-alone condition is required (testing human–AI synergy vs. augmentation).',
      'Account for checking time, correction time, automation bias, and skill acquisition separately from immediate output quality.',
      'Apply the proposed SPHERE evaluation card (Zhao et al., 2025) as an optional organizing extension for Human–AI studies.',
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
        citation: 'Shen, J. H., & Tamkin, A. (January 29, 2026). How AI assistance impacts the formation of coding skills. Anthropic Research.',
        sourceType: 'Technical report / Framework',
        url: 'https://www.anthropic.com/research/AI-assistance-coding-skills',
        sampleOrScope: 'Randomized controlled trial of 52 software engineers learning a new Python library (Trio) with vs. without AI assistance.',
        finding: 'On a follow-up mastery quiz (measuring conceptual understanding, code reading, and debugging), the AI-assisted group averaged approximately 50% compared with approximately 67% for the hand-coding group—a 17-percentage-point difference (largest on debugging), while immediate task completion time showed no statistically significant difference.',
        limitations: 'Short-term experiment with 52 engineers learning one unfamiliar library; outcomes varied by interaction style (passive offloading vs. active questioning).',
        doesNotEstablish: 'Does not establish universal or long-term skill degradation across all occupations, AI systems, user expertise levels, or learning contexts.',
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
        citation: 'Zhao, D., Ma, Q., Zhao, X., Si, C., Yang, C., Louie, R., Reiter, E., Yang, D., & Wu, T. (2025). SPHERE: An Evaluation Card for Human-AI Systems. Findings of the Association for Computational Linguistics: ACL 2025.',
        sourceType: 'Conference paper (Peer-reviewed)',
        url: 'https://doi.org/10.18653/v1/2025.findings-acl.70',
        sampleOrScope: 'Proposed organizing framework bridging HCI and NLP evaluation practices.',
        finding: 'Organizes Human–AI evaluation around What, How, Who, When, and Meta-Validation to improve methodological transparency.',
        limitations: 'A proposed organizing card/taxonomy, not an empirically validated universal standard.',
        doesNotEstablish: 'Does not guarantee study validity on its own without sound experimental design and measurement.',
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
      stageTitle: 'Stage 2 (Fictional Case Study): Testing Meridian’s Analyst Workflow',
      narrative:
        'Meridian wants to know whether analysts using the AI assistant write better briefs or finish sooner than with their current manual workflow. You run a two-condition comparison (Current manual workflow vs. Analyst + AI), timing drafting, citation checking, and error correction together as total task time. You recruit real Meridian analysts—not simulated personas.',
      keyDecisions: [
        'Use two conditions to test practical workflow value; add an AI-alone condition only if claiming the human–AI team beats solo AI too.',
        'Measure total task time (drafting + checking + correction), not drafting speed alone.',
      ],
    },
    misconceptions: [
      {
        myth: '“You always need three conditions (Human, AI, Human+AI) to evaluate a tool.”',
        reality: 'To test whether AI improves on your team’s current workflow, two conditions (Current workflow vs. Human+AI) suffice. Add AI-alone when claiming true synergy over both solo options.',
      },
      {
        myth: '“LLM-simulated users can replace real human participants.”',
        reality: 'CoMPosT (2023) showed simulated personas caricature demographic groups and miss real workflow friction like checking citations under time pressure.',
      },
    ],
    exercise: {
      title: 'Assignment 2: Design a Two-Condition Workflow Comparison',
      objective: 'Design a practical workflow test measuring work quality and total task time, and identify when to add an AI-alone condition.',
      scenario: 'Your team wants to know if an AI drafting assistant helps support analysts write better research summaries or finish sooner than their current manual workflow.',
      instructions: [
        'Specify the two conditions (Current workflow vs. Analyst using AI) and who participates.',
        'List the exact time components you must measure (drafting, citation checking, error correction) to compute total task time, plus one work-quality metric.',
        'State one situation in which you would add a third AI-alone condition, and one conclusion a two-condition study cannot support.',
      ],
      requiredOutput: 'A brief 2-condition study plan plus a 2-sentence explanation of when to add AI-alone.',
      evaluationCriteria: [
        'Includes checking and correction time inside total task time.',
        'Accurately distinguishes a two-condition workflow adoption test from a three-condition synergy test.',
      ],
      strongExample:
        'Conditions: (1) Current manual workflow (analysts reading PDFs and writing briefs) vs. (2) Analysts using the AI assistant on comparable PDFs. Measures: blinded brief quality score (1–5), unsupported-claim count, and total task time broken into drafting time + citation-checking time + correction time. Add an AI-alone condition if leadership claims the human–AI team outperforms fully automated summaries; a two-condition test alone cannot establish whether the human adds value over solo AI.',
      reflectionQuestion: 'In a tool you use today, how much of the time saved during drafting is spent checking and fixing outputs?',
    },
    knowledgeChecks: [
      {
        id: 'm2-q1',
        question: 'When is a third AI-alone condition required alongside Current Workflow and Human+AI?',
        options: [
          'Always—two-condition workflow studies are never valid.',
          'When you want to claim human–AI synergy (that the team outperforms both the human alone and the AI alone).',
          'Only when using LLM-simulated personas.',
        ],
        correctIndex: 1,
        correctExplanation: 'Two conditions answer whether AI helps people improve on their current workflow; adding AI-alone tests whether the combined team outperforms solo AI as well.',
        distractorNotes: [
          'A is false: two conditions directly answer the workflow-improvement question.',
          'C is unrelated to condition design.',
        ],
      },
      {
        id: 'm2-q2',
        question: 'In Anthropic’s study "How AI assistance impacts the formation of coding skills" (Shen & Tamkin, Jan 29, 2026), what is the accurate interpretation of the ~50% vs. ~67% quiz result?',
        options: [
          'AI tools universally destroy 17% of engineering skill across all occupations and workflows.',
          'In that RCT of 52 engineers learning a new Python library, the AI-assisted group scored 17 percentage points lower on a follow-up mastery quiz (conceptual understanding, code reading, and debugging) than the hand-coding group, which does not establish universal long-term deskilling.',
          'The AI-assisted group took 17 percentage points longer to finish the initial coding task.',
        ],
        correctIndex: 1,
        correctExplanation: 'Reporting the result as a 17-percentage-point difference (~50% vs. ~67%) scoped to 52 engineers learning an unfamiliar library distinguishes immediate task completion from learning/skill acquisition without overgeneralizing.',
        distractorNotes: [
          'A confuses a 17-percentage-point difference with a 17% relative reduction and overgeneralizes.',
          'C misstates the measured outcome.',
        ],
      },
    ],
    takeaways: [
      'Ask one practical question first: does a person using AI do better work or finish sooner than with the current workflow?',
      'Always count checking and correction time inside total task time.',
      'Use two conditions for workflow improvement; add AI-alone when testing synergy over both solo baselines.',
    ],
    furtherReading: [
      { label: 'SPHERE Interactive Card Site', type: 'Research tool', url: 'https://sphere-eval.github.io/' },
    ],
    transition: 'Before building or testing an AI tool at all, Module 3 asks a prior question: what problem are we solving, and would a simpler non-AI change solve it better?',
  },
  {
    id: 'm3',
    number: 3,
    title: 'Framing: Do We Need AI for This Problem?',
    subtitle: 'Comparing current workflow, simpler non-AI changes, and AI assistance before building',
    integratedLessons: 'Lesson 3',
    overview:
      'Before designing an AI eval, ask: "What problem are we trying to solve, and do we need AI for it?" Compare your current workflow, a credible simpler change (such as better search or a checklist), and AI assistance—treating all three as legitimate outcomes.',
    objectives: [
      'Formulate a clear problem statement and compare three legitimate options: current workflow, a credible simpler non-AI change, and AI assistance.',
      'Identify the evidence that would justify choosing a simpler non-AI fix versus running a test of AI.',
      'Distinguish product-adoption evaluations from scientific capability studies, and keep exploratory discovery separate from confirmatory testing.',
      'Define system scope (including agent harnesses), unit of analysis, and contamination/leakage risks for formal studies.',
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
      stageTitle: 'Stage 3 (Fictional Case Study): Does Meridian Actually Need AI?',
      narrative:
        'Meridian analysts spend 74 minutes writing a 5-paper brief. Why? Interviews show 25 minutes are wasted hunting for PDFs in messy folders and guessing what headings executives want. Before testing an AI assistant, you put three legitimate options on the table: (1) keep the current workflow, (2) ship a simpler change—full-text search + a 1-page brief checklist, or (3) test AI assistance against that improved baseline.',
      keyDecisions: [
        'Treat keeping the current workflow, shipping better search + a checklist, and testing AI as three equally legitimate decisions.',
        'Specify that any AI test must beat the simpler search/checklist baseline—not a broken folder setup.',
      ],
    },
    misconceptions: [
      {
        myth: '“The goal of an AI evaluation is to prove AI should be deployed.”',
        reality: 'Concluding that better search, a template, or keeping the current workflow solves the problem faster and safer is a successful evaluation outcome.',
      },
      {
        myth: '“Every AI evaluation must be tied to a product launch.”',
        reality: 'A capability study can have a purely scientific purpose (e.g., testing how a model handles reasoning perturbations) independent of deployment.',
      },
    ],
    exercise: {
      title: 'Assignment 3: Choose Between Current Workflow, a Simpler Change, and AI',
      objective: 'Evaluate whether a simpler non-AI change solves the problem and state what evidence would justify testing AI.',
      scenario:
        'At Meridian, analysts complain that summarizing 5 empirical PDFs takes too long and briefs often omit study limitations. Two root causes appear in interviews: (a) PDFs are poorly indexed across shared drives, and (b) analysts have no standard template reminding them to include a Limitations section.',
      instructions: [
        'Describe three concrete options: (1) Current workflow, (2) A credible simpler non-AI change addressing the two root causes above, and (3) AI assistance.',
        'Explain why choosing Option 2 (the simpler change) could be the right decision without deploying AI.',
        'State what specific evidence (on total task time, omission of limitations, or brief quality) would justify moving on to test AI assistance against Option 2.',
      ],
      requiredOutput: 'A 3-option comparison plus a clear decision rule for when to stop at the simpler change vs. test AI.',
      evaluationCriteria: [
        'Directly addresses the supplied root causes (poor indexing and missing Limitations template).',
        'Treats the non-AI option as a legitimate decision and comparator rather than a formality.',
      ],
      strongExample:
        'Option 1 (Current): manual search across shared drives with no template. Option 2 (Simpler change): add centralized full-text PDF search plus a mandatory 1-page brief checklist with a "Study Limitations" section. Option 3 (AI): retrieval-backed drafting assistant. Choosing Option 2 is legitimate if search + the checklist cuts retrieval delays and eliminates omitted Limitations at near-zero cost and zero hallucination risk. Testing AI is justified only if—after Option 2 is in place—synthesis drafting itself remains the bottleneck and a controlled test shows AI improves brief quality or reduces total task time without raising unsupported claims.',
      reflectionQuestion: 'Think of an AI project you have seen recently: was it ever compared against a simpler non-AI improvement like better search or a checklist?',
    },
    knowledgeChecks: [
      {
        id: 'm3-q1',
        question: 'Why compare an AI assistant against a credible simpler change (like better search or a checklist) instead of only a broken legacy workflow?',
        options: [
          'Because comparing only against a broken workflow can attribute gains to AI that a cheaper, lower-risk non-AI fix would already deliver.',
          'Because non-AI tools are always forbidden in confirmatory studies.',
          'Because AI models cannot be evaluated scientifically without a product launch.',
        ],
        correctIndex: 0,
        correctExplanation: 'A credible simpler comparator tests whether AI adds genuine value beyond straightforward workflow improvements.',
        distractorNotes: [
          'B is false: simpler non-AI baselines are strong comparators.',
          'C is false: scientific capability studies can exist independent of deployment.',
        ],
      },
      {
        id: 'm3-q2',
        question: 'Why must exploratory and confirmatory evaluation modes be kept distinct?',
        options: [
          'Exploratory work is unscientific and should be avoided.',
          'Repeatedly tuning criteria or prompts on a dataset and presenting the final run as an independent test invalidates confirmatory inference.',
          'Confirmatory mode prohibits reporting limitations.',
        ],
        correctIndex: 1,
        correctExplanation: 'Explore traces to discover failures, then lock outcomes, comparisons, and thresholds before inspecting a fresh confirmatory set.',
        distractorNotes: [
          'A and C are false.',
        ],
      },
    ],
    takeaways: [
      'Always ask "What problem are we solving, and do we need AI?" before building an AI eval.',
      'Current workflow, a simpler non-AI fix, and AI assistance are all legitimate decisions.',
      'Keep formal 10-field framing briefs, agent harnesses, and contamination audits for formal studies.',
    ],
    furtherReading: [],
    transition: 'Once you know what problem you are testing, Module 4 shows how to write test cases—ordinary, ambiguous, and escalation cases—that actually test your rules.',
  },
  {
    id: 'm4',
    number: 4,
    title: 'Cases & Criteria: Writing Cases That Test Your Rules',
    subtitle: 'Ordinary, ambiguous, and escalation cases—and why challenge sets ≠ everyday failure rates',
    integratedLessons: 'Lesson 5',
    overview:
      'A good small eval tests more than happy-path prompts. Learn to write expected behavior for ordinary, ambiguous, and escalation cases, and see why deliberately difficult challenge cases are essential for finding flaws—yet cannot be read as your everyday failure rate.',
    objectives: [
      'Write concrete test cases and observable expected behavior for an ordinary case, an ambiguous case, and a case requiring escalation.',
      'Distinguish a construct, an observable criterion, and a scoring metric.',
      'Explain why challenge/edge-case sets are useful for finding weaknesses and why their failure rate does not equal everyday production prevalence.',
      'Select task-appropriate metrics without treating any single metric as overall quality.',
    ],
    researchEvidence: [
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
      stageTitle: 'Stage 4 (Fictional Case Study): Writing Meridian’s Case Types',
      narrative:
        'For Meridian’s paper-summary assistant, you design three case types: (1) an ordinary case (two clear randomized trials with matching endpoints), (2) an ambiguous case (an observational study whose abstract sounds causal, requiring careful wording), and (3) an escalation/abstention case (a question about a confidential M&A deal not in the corpus, where the assistant must refuse rather than guess). You keep stress-test challenge cases separate from representative daily queries.',
      keyDecisions: [
        'Write observable pass/fail expectations for ordinary, ambiguous, and escalation cases.',
        'Report challenge-set failure rates separately from representative everyday failure rates.',
      ],
    },
    misconceptions: [
      {
        myth: '“A 40% failure rate on our edge-case suite means 40% of real users see failures.”',
        reality: 'Challenge sets deliberately oversample hard, rare, or adversarial inputs. They find weaknesses, but only a representative sample estimates everyday prevalence.',
      },
      {
        myth: '“Gold-standard human labels are objective and error-free.”',
        reality: 'Annotators often disagree on ambiguous examples; clear expected-behavior rules and adjudication are needed.',
      },
    ],
    exercise: {
      title: 'Assignment 4: Write Ordinary, Ambiguous & Escalation Cases',
      objective: 'Author three distinct test cases with observable pass/fail criteria and explain sampling limits.',
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
        '1) Ordinary: "Bought 10 days ago, sealed and unused. Can I return it?" Expected: Confirm eligibility directly without re-asking if it was used. 2) Ambiguous: "Bought 15 days ago; I opened the outer shipping box to look at the color, never used the item." Expected: Ask/clarify whether the product packaging or item itself was used before promising a return, or cite exact policy rule on opened outer boxes. 3) Escalation: "My $650 monitor arrived with a cracked screen 3 days ago." Expected: Do not auto-approve or auto-deny; immediately escalate to a human agent per the damaged-on-arrival and >$500 policy. Sampling note: 20 deliberately hard cases expose brittle rules quickly, but because they oversample rare edge cases, a 35% failure rate on that challenge set cannot estimate the everyday failure rate across typical customer messages.',
      reflectionQuestion: 'Need retrieval-specific metrics (Recall@k, NDCG@k) or a 100-item RAG dataset assignment? See Optional Advanced Track A (RAG Evaluation).',
    },
    knowledgeChecks: [
      {
        id: 'm4-q1',
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
        id: 'm4-q2',
        question: 'Which metric family matches probabilistic confidence calibration (whether "80% confident" answers are right ~80% of the time)?',
        options: [
          'Brier score or Expected Calibration Error (ECE).',
          'Cohen’s kappa.',
          'Raw accuracy alone.',
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
      'Always test ordinary cases, ambiguous cases, and escalation/abstention cases.',
      'Challenge cases find failure modes; representative samples estimate everyday prevalence—never mix their rates.',
      'For retrieval-specific metrics (Recall@k, MRR, NDCG) and the 100-item RAG dataset exercise, see Advanced Track A.',
    ],
    furtherReading: [
      { label: 'Husain & Shankar: Error & Trace Analysis Guidance', type: 'Industry guidance', url: 'https://hamel.dev/blog/posts/evals/' },
    ],
    transition: 'Once you have cases and expected behaviors, Module 5 shows what happens when two human reviewers disagree on grading—and how to fix ambiguous rules and avoid average traps.',
  },
  {
    id: 'm5',
    number: 5,
    title: 'Grading: Resolving Disagreement & Average Traps',
    subtitle: 'Fixing ambiguous rubrics, rescoring concrete answers, and preventing averages from hiding critical errors',
    integratedLessons: 'Lesson 6 (Grading & Aggregation)',
    overview:
      'Even good test cases fail if two reviewers score the same answer differently or if one composite score hides a critical failure. Start with a concrete reviewer disagreement, tighten the scoring rule, rescore, and keep agreement statistics and LLM-judge validation ready when scaling up.',
    objectives: [
      'Diagnose why two reviewers disagree on a concrete output, rewrite an ambiguous rule into an observable check, and rescore.',
      'Explain how a high composite average or Simpson’s paradox can conceal serious safety or subgroup failures.',
      'Choose appropriate inter-rater reliability measures (Cohen’s κ, weighted κ, Krippendorff’s α, ICC) when scaling human review.',
      'Validate an LLM-as-a-judge against independently adjudicated human ratings for biases and rare-failure false negatives.',
    ],
    researchEvidence: [
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
      stageTitle: 'Stage 5 (Fictional Case Study): Fixing a Rubric Disagreement at Meridian',
      narrative:
        'Two Meridian reviewers grade the same AI summary of an observational study. The summary says: "Flexible hours boosted retention by 12%." Reviewer 1 marks it PASS ("the 12% number is in the paper"). Reviewer 2 marks it FAIL ("the paper was observational—saying it \'boosted\' retention implies causation"). Rewriting the vague rule "be accurate" into "do not use causal verbs for observational studies" resolves the disagreement before scaling to an LLM judge.',
      keyDecisions: [
        'Investigate reviewer disagreement as a clue to rubric ambiguity rather than averaging scores away.',
        'Treat confidential data exposure as a mandatory non-compensatory failure separate from quality averages.',
      ],
    },
    misconceptions: [
      {
        myth: '“When two reviewers disagree, just average their scores and move on.”',
        reality: 'Disagreement often signals an ambiguous rubric or missing context; fixing the rule improves measurement far more than averaging noise.',
      },
      {
        myth: '“90% agreement with humans means an LLM judge can replace human review.”',
        reality: 'High overall agreement can mask poor recall on rare critical errors, plus position, verbosity, and self-preference biases.',
      },
    ],
    exercise: {
      title: 'Assignment 5: Resolve a Two-Reviewer Disagreement & Expose an Average Trap',
      objective: 'Rewrite an ambiguous scoring rule from a concrete disagreement, rescore the answer, and critique a single composite score.',
      scenario:
        'Source excerpt (fictional): "In a 2024 survey of 400 employees, teams with flexible hours reported 12% lower turnover than fixed-hour teams; no randomized assignment was used." AI summary: "Flexible hours reduced employee turnover by 12%." Original rubric rule: "Summary is accurate." Reviewer 1 scores PASS (the 12% figure matches). Reviewer 2 scores FAIL ("reduced" implies causation from a survey). Separately, across 100 test runs, the system passes 95, has 4 minor formatting issues, and leaks 1 confidential client name (reported as "95% pass rate").',
      instructions: [
        'State why Reviewer 1 and Reviewer 2 reasonably disagreed under the vague rule "Summary is accurate."',
        'Rewrite the scoring rule into an observable pass/fail check that resolves the ambiguity, and rescore the AI summary under your revised rule.',
        'Explain why reporting "95% pass rate" on the 100 runs misleads decision-makers, and show how to report the results instead.',
      ],
      requiredOutput: 'Diagnosis of disagreement, revised observable rule + rescore, and disaggregated reporting recommendation.',
      evaluationCriteria: [
        'Revised rule targets observable causal vs. associative wording grounded in the supplied excerpt.',
        'Separates the 1 confidential-name leak as a critical/mandatory failure rather than averaging it with formatting issues.',
      ],
      strongExample:
        'Disagreement diagnosis: "accurate" did not specify whether matching the number (12%) is enough or whether study design (non-randomized survey) must be preserved. Revised rule: "Fail if the summary uses causal language (e.g., reduced, caused, boosted) to describe a non-randomized/observational finding." Rescore: FAIL ("reduced" states causation not supported by the survey). Average trap: A "95% pass rate" weights 4 minor formatting bugs equally with 1 confidential client-name leak. Report instead: 95/100 full passes, 4/100 low-severity formatting issues, and 1/100 critical confidentiality violation (release blocker).',
      reflectionQuestion: 'If you later automate this revised rule with an LLM judge, what separate dataset do you need before trusting the judge?',
    },
    knowledgeChecks: [
      {
        id: 'm5-q1',
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
        id: 'm5-q2',
        question: 'Which reliability measure handles two or more raters with missing ratings across nominal, ordinal, or interval scales?',
        options: [
          'Raw percentage agreement.',
          'Krippendorff’s alpha.',
          'Brier score.',
        ],
        correctIndex: 1,
        correctExplanation: 'Krippendorff’s alpha generalizes across 2+ raters, missing data, and multiple measurement levels.',
        distractorNotes: [
          'A does not correct for chance agreement.',
          'C measures probabilistic calibration.',
        ],
      },
    ],
    takeaways: [
      'Treat reviewer disagreement as a signal to clarify ambiguous rules into observable checks.',
      'Never bury rare critical failures inside a high composite pass rate.',
      'When scaling up, use chance-corrected reliability (κ, α, ICC) and validate LLM judges on independent held-out human labels.',
    ],
    furtherReading: [],
    transition: 'With reliable grades in hand, Module 6 teaches how to interpret a real version comparison—like a +0.10-point quality gain that costs 9× more.',
  },
  {
    id: 'm6',
    number: 6,
    title: 'Interpreting a Comparison: Gain, Uncertainty & Cost',
    subtitle: 'Comparing versions on the same cases, difference CIs, subgroups, validity, and formal protocols',
    integratedLessons: 'Lessons 7, 8 & 9',
    overview:
      'Build statistical intuition around one concrete decision: System B beats System A by +0.10 points on a 5-point scale, but costs 9× more and runs 5× slower. Learn to interpret uncertainty in the direct difference, weigh practical value, separate validity from reliability, and govern formal studies.',
    objectives: [
      'Compare two systems on the same cases using a direct difference confidence interval instead of eyeballing overlapping separate CIs.',
      'Distinguish statistical detectability from practical significance when weighing quality gains against cost, latency, and subgroup disparities.',
      'Separate measurement validity (Category A), study design & generalization (Category B), and reliability & traceability (Category C).',
      'Use pre-registered protocols, separate product/evaluator versioning, and longitudinal monitoring for formal deployment decisions.',
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
      stageTitle: 'Stage 6 (Fictional Case Study): Interpreting Meridian’s Mixed Results',
      narrative:
        'Meridian’s 32-analyst crossover study (128 crossed sessions across 48 confirmatory packets) shows a +0.40 quality gain (95% CI [+0.18, +0.62]) and 0/100 confidentiality breaches (~3% one-sided 95% upper bound under binomial assumptions)—but unsupported claims rose by +1.6 pp (95% CI [+0.2, +3.0]), failing the pre-specified +1.0 pp non-inferiority margin. Total task time changed inconclusively (−2.5 min). Consistent with the decision rule, you withhold the pilot.',
      keyDecisions: [
        'Use direct within-analyst difference CIs rather than comparing separate condition CIs by overlap.',
        'Honor the pre-specified +1.0 pp non-inferiority gate even when synthesis quality improves.',
      ],
    },
    misconceptions: [
      {
        myth: '“Overlapping 95% confidence intervals prove there is no real difference.”',
        reality: 'Overlap of separate CIs is not a formal test of the difference—especially on shared/paired cases. Estimate the difference CI directly.',
      },
      {
        myth: '“p < 0.05 means the gain is worth paying for.”',
        reality: 'Large samples detect tiny differences; practical value depends on effect magnitude relative to cost, latency, and error consequences.',
      },
    ],
    exercise: {
      title: 'Assignment 6: Decide Whether a +0.10 Gain Is Worth 9× the Cost',
      objective: 'Interpret a direct difference CI, weigh cost/latency trade-offs, and handle an underpowered subgroup gap.',
      scenario:
        'Fictional paired comparison on N = 200 shared research tasks (25 analysts, 8 tasks each): System A mean 4.10/5 (SD 0.60, 95% CI [4.02, 4.18]), latency 1.2s, cost $0.02/task; Non-English subgroup (n = 15 tasks) mean 2.80/5. System B mean 4.20/5 (SD 0.70, 95% CI [4.10, 4.30]), latency 6.5s, cost $0.18/task; Non-English subgroup (n = 15 tasks) mean 3.90/5. Direct paired difference (B − A): +0.10 points (cluster-robust 95% CI [+0.01, +0.19]).',
      instructions: [
        'Warning: The overlap of the two separate 95% CIs ([4.02, 4.18] and [4.10, 4.30]) is not a formal statistical test of the difference.',
        'Explain what the direct paired difference CI ([+0.01, +0.19]) establishes—and distinguish statistical uncertainty from measurement uncertainty (rater noise).',
        'Explain what would make a +0.10-point gain worthwhile (or not worthwhile) given 9× higher cost ($0.18 vs. $0.02) and 5.4× higher latency (6.5s vs. 1.2s).',
        'Assess the Non-English subgroup (n = 15: 2.80 vs. 3.90) and state what evidence is needed before deciding for Non-English users.',
      ],
      requiredOutput: 'A concise decision memo covering the direct difference CI, cost/latency trade-off, and Non-English subgroup plan.',
      evaluationCriteria: [
        'Uses the direct paired difference CI [+0.01, +0.19] rather than separate-CI overlap.',
        'Explicitly weighs +0.10 points against 9× cost and 5.4× latency, and flags n = 15 subgroup uncertainty.',
      ],
      strongExample:
        'Although the two separate 95% CIs overlap ([4.02, 4.18] and [4.10, 4.30]), the direct cluster-robust paired difference is +0.10 with 95% CI [+0.01, +0.19], indicating a statistically detectable but small overall gain (which still does not quantify rubric or rater measurement error). For English tasks, a +0.10-point shift on a 5-point scale is unlikely to justify 9× cost ($0.18 vs. $0.02) and 5.4× latency (6.5s vs. 1.2s) unless that 0.10 gain reflects preventing high-severity errors. For Non-English tasks, System A scored 2.80 vs. System B’s 3.90, but n = 15 is too small for a precise estimate: do not deploy System A for Non-English workflows yet; collect a larger stratified Non-English sample before choosing (or consider routing Non-English queries separately).',
      reflectionQuestion: 'What domain threshold would make a +0.10-point gain worth 9× higher cost in your own application?',
    },
    knowledgeChecks: [
      {
        id: 'm6-q1',
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
        id: 'm6-q2',
        question: 'If you log 300 chat turns across 5 user sessions, why is treating N = 300 as independent observations statistically invalid?',
        options: [
          'Because 300 is too small for any confidence interval.',
          'Because turns within the same session are clustered and share user/context dependencies, understating uncertainty.',
          'Because chat turns can only be analyzed qualitatively.',
        ],
        correctIndex: 1,
        correctExplanation: 'Clustered observations within a conversation are correlated; standard errors must account for clustering at the session/user level.',
        distractorNotes: [
          'A and C are false.',
        ],
      },
      {
        id: 'm6-q3',
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
        id: 'm6-q4',
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
      'Compare versions on the same cases and estimate a direct difference CI—do not judge significance by overlapping separate CIs.',
      'Weigh effect magnitude against cost, latency, verification burden, and subgroup disparities.',
      'Keep measurement validity, study design/generalization, and reliability/traceability distinct.',
    ],
    furtherReading: [
      { label: 'NIST Automated Benchmark Guidance (Draft)', type: 'Technical report / Framework', url: 'https://www.nist.gov/itl/ai-risk-management-framework' },
    ],
    transition: 'Finally, Module 7 applies everything you learned to audit public benchmark claims, vendor decks, and press releases.',
  },
  {
    id: 'm7',
    number: 7,
    title: 'Auditing a Public Claim: What Was Actually Tested?',
    subtitle: 'Classifying vendor claims, exposing benchmark pitfalls, and rewriting overstated press releases',
    integratedLessons: 'Module 7 & Claim Classification',
    overview:
      'Public leaderboards, vendor decks, and press releases routinely stretch narrow benchmark scores into sweeping deployment claims. Learn to audit any AI claim with four core questions: what was tested, what comparison was made, what is unknown, and what wording the evidence actually supports.',
    objectives: [
      'Classify vendor and marketing statements as empirical, normative, predictive, mechanistic, comparative, or underspecified.',
      'Audit a public benchmark or press release across 8 dimensions: benchmark scope/saturation, comparator & version parity, prompt/harness parity, contamination risk, metric/aggregation choices, statistical uncertainty, generalization, and missing safety/human-outcome evidence.',
      'Explain why scores from different benchmarks cannot be directly equated without shared anchors.',
      'Rewrite an overstated press release into a bounded statement supported strictly by the facts supplied.',
    ],
    researchEvidence: [],
    caseStudy: {
      stageTitle: 'Stage 7 (Fictional Case Study): Auditing a Competing Vendor’s Press Release',
      narrative:
        'A competing vendor pitches Meridian with a headline: "94% on LeadingQA—the most intelligent research AI!" Your audit shows LeadingQA is an older public benchmark with contamination risk, the vendor did not disclose its retry/tool harness or baseline versions, and no error bars, cost, or analyst-workflow results were supplied. Meridian declines to procure on the leaderboard claim alone.',
      keyDecisions: [
        'Require disclosure of exact model snapshot, harness, comparator, and uncertainty before weighting external scores.',
        'Test candidate tools on Meridian’s own held-out tasks and human workflow.',
      ],
    },
    misconceptions: [],
    exercise: {
      title: 'Assignment 7: Classify Vendor Claims & Audit the Apex-7 Press Release',
      objective: 'Classify individual claims by type, audit a press release across 8 dimensions, and write a defensible revision using only supplied facts.',
      scenario:
        'Fictional vendor press release: "Our new model Apex-7 is the most intelligent AI system ever built, achieving #1 (92.4%) on ReasoningBench—proving it outperforms human experts and is safe for enterprise deployment." Also classify two companion pitch-deck bullets: (a) "Any hallucinated citation is unacceptable for client delivery," and (b) "Deploying Apex-7 will cut analyst research time by 40% next quarter."',
      instructions: [
        'Part A (Claim classification): Classify the two pitch-deck bullets (a and b) plus the press-release claims ("92.4% on ReasoningBench", "most intelligent", "outperforms human experts") as Empirical, Normative, Predictive, Mechanistic, Comparative, or Unsupported/Underspecified.',
        'Part B (8-point audit of the press release): Audit (1) benchmark scope & saturation, (2) comparator & model version parity, (3) prompt/harness/retry disclosure, (4) contamination risk, (5) metric & aggregation details, (6) statistical uncertainty (missing sample size / CIs), (7) generalization to enterprise workflows, and (8) missing safety & human-expert evidence.',
        'Part C (Defensible rewrite): Write a 2-sentence scientifically defensible revision using ONLY facts actually supplied in the press release (do not invent prompt settings, sample sizes, or confidence intervals).',
      ],
      requiredOutput: 'Claim classifications, an 8-point audit list, and a strictly bounded 2-sentence rewrite.',
      evaluationCriteria: [
        'Accurately separates empirical claims from normative rules, predictions, and unsupported extrapolations.',
        'Covers all 8 audit dimensions and does NOT invent undisclosed details (like zero-shot prompts or ±1.2% CIs) in the rewrite.',
      ],
      strongExample:
        'Part A: Bullet (a) is Normative (acceptable-risk policy); Bullet (b) is Predictive/Unsupported (forecast without workflow evidence); "92.4% on ReasoningBench" is Empirical (though underspecified); "most intelligent" and "outperforms human experts" are Unsupported extrapolations. Part B (8-point audit): (1) ReasoningBench scope/saturation undisclosed; (2) comparator models & version snapshots unnamed; (3) prompt, tool harness, and retry count undisclosed; (4) training/test contamination unaddressed; (5) metric definition and subgroup breakdown omitted; (6) sample size and confidence interval omitted; (7) narrow benchmark cannot generalize to enterprise workflows; (8) zero human-expert comparison or safety testing reported. Part C (Defensible rewrite): "The vendor reports that Apex-7 ranked #1 with a score of 92.4% on ReasoningBench, though the release omits the evaluation setup, comparator versions, sample size, and uncertainty interval. This single reported score does not establish general intelligence, superiority over human experts, or readiness and safety for enterprise deployment."',
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
      'Ask four questions of every public claim: what was tested, what comparison was made, what is unknown, and what wording the evidence supports.',
      'Never invent undisclosed setup details or error bars when summarizing a third-party claim.',
      'Use calibrated language: "The study found…", "The authors report…", "This remains uncertain…".',
    ],
    furtherReading: [],
    transition: 'Ready to put all seven modules together into a formal study? Open the Final Capstone Project, the Eval Protocol Tool, or the Optional Advanced Tracks.',
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
    newModule: 'Module 1: Foundations: Run Your First Eval',
    contentRetained: 'Definition, 3 statement types, 10-element landscape, misconceptions, glossary & evidence hierarchy.',
    changesMade: 'Opened with the 5-minute return-policy chatbot eval before diagrams/taxonomy; moved vendor-claim classification to Module 7.',
  },
  {
    originalLesson: 'Lesson 2: Why Human–AI Interaction Changes Everything',
    newModule: 'Module 2: Human–AI Interaction: Does AI Help People?',
    contentRetained: 'Interaction vs. autonomy, SPHERE (Zhao et al., 2025), Vaccaro et al. (2024) synergy meta-analysis.',
    changesMade: 'Centered on the 2-condition workflow question (counting checking & correction time), with AI-alone synergy and SPHERE as extensions.',
  },
  {
    originalLesson: 'Lesson 3: Purpose, Scope, Targets & Evaluation Modes',
    newModule: 'Module 3: Framing: Do We Need AI for This Problem?',
    contentRetained: 'Exploratory vs. confirmatory modes, nested scopes, agent harnesses, contamination, and 10-field formal brief.',
    changesMade: 'Brought the practical adoption question ("do we need AI, or would better search/a checklist work?") to the front.',
  },
  {
    originalLesson: 'Lesson 4: Who Evaluates, For Whom & Context Coverage',
    newModule: 'Modules 2 & 3 (distributed by theme)',
    contentRetained: 'Target users vs. crowd annotators, CoMPosT caricature risks, HELM-style missing coverage.',
    changesMade: 'Merged participant/synthetic-persona topics into Module 2 and context/coverage exclusions into Module 3.',
  },
  {
    originalLesson: 'Lesson 5: How We Evaluate: Methods, Intrinsic vs. Extrinsic & Sampling',
    newModule: 'Module 4: Cases & Criteria: Writing Cases That Test Your Rules',
    contentRetained: 'Ordinary/ambiguous/escalation cases, challenge vs. representative sampling, intrinsic vs. extrinsic, 8 evidence methods.',
    changesMade: 'Moved 100-item RAG retrieval dataset assignment and retrieval-specific metrics (Recall@k, MRR, NDCG) to Advanced Track A.',
  },
  {
    originalLesson: 'Lesson 6: Measuring Real Outcomes, Skill Erosion & Grading',
    newModule: 'Modules 2 (Human Outcomes) & 5 (Grading)',
    contentRetained: 'METR study, Anthropic coding-skills study (17 pp), two-reviewer disagreement, aggregation trap, κ/α/ICC, LLM-judge validation.',
    changesMade: 'Consolidated human-outcomes studies (METR, Anthropic) into Module 2 and focused Module 5 on reviewer disagreement, rubric revision, and aggregation traps.',
  },
  {
    originalLesson: 'Lesson 7: Statistical Uncertainty, Clustering & Validity',
    newModule: 'Module 6: Interpreting a Comparison: Gain, Uncertainty & Cost',
    contentRetained: '0/100 rare-failure bound, conversation clustering, 3-category validity review, 12 worked examples.',
    changesMade: 'Built main lesson around the +0.10-point gain at 9× cost comparison and direct difference CIs.',
  },
  {
    originalLesson: 'Lesson 8: When to Evaluate: Lifecycle, Long-Term Effects & Governance',
    newModule: 'Module 6 (Deployment & Formal Study Material)',
    contentRetained: 'Short-term vs. long-term dynamics (familiarization, sycophancy), governance roles, oversight checks, reevaluation triggers.',
    changesMade: 'Placed in the formal-study/deployment section of Module 6 alongside pre-registered protocols.',
  },
  {
    originalLesson: 'Lesson 9: Worked Example, Reporting Discipline & Protocol Builder',
    newModule: 'Module 7 + Final Capstone Project',
    contentRetained: 'Meridian case study, Claim Calibration table, 12-field protocol, Decision Statement.',
    changesMade: 'Combined vendor-claim classification and press-release audit in Module 7; expanded Meridian into the 22-element Capstone with reproducible synthetic exercise.',
  },
];

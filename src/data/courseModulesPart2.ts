import type { CourseModule } from './courseTypes';

export const COURSE_MODULES_PART_2: CourseModule[] = [
  /* ========================================================================
   * MODULE 4: Comparing Versions, Statistics & Validity (Chapters 4.1 – 4.3)
   * ======================================================================== */
  {
    id: 'm4',
    number: 4,
    title: 'Comparing Versions, Statistics & Validity',
    subtitle: 'Paired differences, clustered units of analysis, Goodhart’s Law tradeoffs, Rule of Three, and 3 validity pillars',
    overview:
      'Make defensible ship/no-ship decisions when comparing two prompts, models, or harnesses. Across three focused chapters you will learn how to estimate paired differences and cluster uncertainty at your unit of analysis, weigh tradeoffs against Goodhart’s Law and rare-event bounds, and stress-test your evaluation across all three pillars of validity.',
    objectives: [
      'Compare two versions on shared tasks using a direct paired difference CI instead of eyeballing overlapping separate CIs.',
      'Align confidence intervals with your unit of analysis by clustering correlated tasks, turns, or analysts.',
      'Apply Goodhart’s Law tradeoffs (cost, latency, audit time), subgroup checks, and the Rule of Three (0/100 → ~3% bound).',
      'Distinguish Measurement Validity (Category A), Study Design & Generalization (Category B), and Reliability & Traceability (Category C).',
    ],
    chapters: [
      {
        id: '4.1',
        code: 'Chapter 4.1',
        title: 'Paired Comparisons & Clustered Uncertainty',
        readMinutes: 6,
        summary:
          'Why eyeballing overlapping 95% confidence intervals is wrong, why paired tests have far more statistical power, and how ignoring clustering creates fake significance.',
        sections: [
          {
            heading: 'Stop Eyeballing Overlapping Confidence Intervals',
            paragraphs: [
              'Suppose you run System A and System B on the exact same 200 research tasks (completed by 25 analysts, 8 tasks each; fictional example). System A averages 4.10/5 (95% CI [4.02, 4.18]). System B averages 4.20/5 (95% CI [4.10, 4.30]). Many teams glance at those two overlapping intervals and conclude "no significant difference." That conclusion is statistically wrong.',
              'The overlap of two separate 95% confidence intervals is never a formal test of the difference—especially on paired tasks where both systems answered the exact same items. Shared task difficulty cancels out when you compute the difference on each item (B − A) directly and build a confidence interval for that difference.',
            ],
            callout: {
              kind: 'rule',
              title: 'Always estimate the difference directly',
              body: 'When System A and System B are evaluated on shared tasks, compute per-task differences (B − A) first, then construct a single confidence interval for the mean difference (or use McNemar’s test / paired bootstrap for binary pass/fail).',
            },
          },
          {
            heading: 'Respecting Your Unit of Analysis: Why Clustering Matters',
            paragraphs: [
              'Remember Chapter 1.3: one layer can hold multiple units. In our 200-task comparison, 8 tasks belong to each of 25 analysts. Similarly, in a chatbot evaluation, 300 logged turns may come from just 5 user sessions. Observations within the same analyst, conversation, or document packet share context and are positively correlated.',
              'If you plug N = 200 tasks (or N = 300 turns) into a naive independent-samples formula, your standard error shrinks artificially and produces fake statistical significance. Clustering standard errors at the analyst or session level (e.g., cluster bootstrap or analyst-level paired summary) keeps uncertainty honest. In our fictional comparison, the cluster-robust 95% CI for B − A is [+0.01, +0.19]—narrow enough to detect a small difference above sampling noise, while still excluding rubric and rater measurement noise.',
            ],
            table: {
              headers: ['Situation', 'Naive Mistake', 'Correct Unit-Aware Analysis'],
              rows: [
                ['25 analysts × 8 tasks = 200 tasks', 'Treat N = 200 as independent draws', 'Cluster standard errors by analyst (or summarize per analyst, N = 25)'],
                ['5 chat sessions × 60 turns = 300 turns', 'Compute binomial CI with N = 300', 'Cluster at the session level (N = 5); collect more independent sessions'],
                ['100 prompts × 5 repeated runs', 'Treat 500 runs as 500 independent prompts', 'Average/model within prompt first; repeated runs measure stability, not task coverage'],
              ],
            },
          },
        ],
        keyTakeaways: [
          'Never judge significance by checking whether two separate 95% CIs overlap; compute the direct paired difference CI.',
          'Cluster standard errors at your unit of analysis—repeated turns, tasks per analyst, or repeated runs on the same prompt are not independent.',
          'Statistical CIs capture sampling uncertainty under stated assumptions; they never measure rubric validity or rater bias.',
        ],
      },
      {
        id: '4.2',
        code: 'Chapter 4.2',
        title: 'Tradeoffs, Subgroups & Rare Failures (Goodhart’s Law)',
        readMinutes: 6,
        summary:
          'Why statistical significance is not practical worth, how paired tradeoff metrics defeat Goodhart’s Law, and what 0/100 failures actually proves.',
        sections: [
          {
            heading: 'Statistical Detectability ≠ Practical Worth',
            paragraphs: [
              'Return to our fictional System A vs. System B comparison: System B beats System A by +0.10 points on a 5-point scale (cluster-robust 95% CI [+0.01, +0.19]). Statistically detectable? Yes. Worth shipping? Look at the paired tradeoff metrics:',
            ],
            table: {
              headers: ['Metric', 'System A', 'System B', 'Practical Takeaway'],
              rows: [
                ['Overall quality (1–5)', '4.10', '4.20 (+0.10)', 'Tiny shift on a 5-point scale'],
                ['Cost per task', '$0.02', '$0.18 (9×)', 'Major budget multiplier at scale'],
                ['Median latency', '1.2s', '6.5s (5.4×)', 'Noticeable user wait-time friction'],
                ['Non-English slice (n = 15)', '2.80', '3.90 (+1.10)', 'Strong warning sign—too small (n = 15) to deploy A blindly'],
              ],
            },
            callout: {
              kind: 'warning',
              title: 'Goodhart’s Law in ship/no-ship decisions',
              body: 'If your team optimizes solely for quality score, you can easily ship a model that is 9× more expensive, 5× slower, and harder for humans to audit for a negligible +0.10 gain. Always pair your primary metric with cost, latency, human audit time, and critical subgroup slices.',
            },
          },
          {
            heading: 'Inconclusive ≠ Equivalent, and the Rule of Three for Rare Failures',
            paragraphs: [
              'Two statistical misinterpretations show up constantly in launch reviews:',
            ],
            bullets: [
              {
                label: 'Inconclusive does not prove equivalence',
                text: 'When a difference CI crosses zero (for example, total time change −2.5 min, 95% CI [−7.0, +2.0]), you have NOT proven the two systems are equal. Proving non-inferiority or equivalence requires pre-specifying an acceptable margin (like +1.0 pp on unsupported claims) and showing the entire confidence bound stays safely inside it.',
              },
              {
                label: '0/100 failures ≠ 0% risk (Rule of Three)',
                text: 'Observing zero critical failures in N = 100 independent representative Bernoulli trials (assuming accurate detection) still leaves a one-sided 95% upper confidence bound of approximately 3 / N = 3 / 100 = 3% (exact binomial: 1 − 0.05^(1/100) ≈ 2.95%). And that bound says nothing about distribution shift, unmeasured subgroups, or adversarial attacks.',
              },
            ],
          },
        ],
        keyTakeaways: [
          'Always weigh effect magnitude against paired tradeoff metrics (cost, latency, human audit time) to avoid Goodhart’s Law.',
          'Disaggregate key subgroups (e.g., Non-English queries) and never treat underpowered slices as safe to ship.',
          '0/N failures yields an approximate 95% upper bound of 3/N—never 0% risk.',
        ],
      },
      {
        id: '4.3',
        code: 'Chapter 4.3',
        title: 'The Three Pillars of Evaluation Quality & Validity',
        readMinutes: 6,
        summary:
          'Expanding Chapter 1.4’s Construct and External Validity into the complete three-pillar validation framework grounded in measurement standards.',
        sections: [
          {
            heading: 'Validity Is an Argument, Not a Number',
            paragraphs: [
              'Grounded in the Standards for Educational and Psychological Testing (AERA, APA, & NCME, 2014), validity is not a static property of a test or a single number. It is the strength of the argument connecting your construct, test cases, rubric, judge, scores, and intended decision.',
              'To keep reviews crisp and prevent teams from confusing reproducibility with truth, organize evaluation quality into three distinct pillars:',
            ],
            diagram: 'validity',
            bullets: [
              {
                label: 'Pillar A — Validity of Measurement & Interpretation',
                text: 'Construct validity (measuring the actual goal rather than verbosity/polish), content validity (do tasks represent the real domain?), criterion evidence (do scores predict downstream outcomes?), consequential impacts, and argument-based validation.',
              },
              {
                label: 'Pillar B — Study Design, Causality & Generalization',
                text: 'Internal validity (is the difference caused by the AI rather than confounding or selection bias?), external validity (transfer to new populations/periods), ecological validity (do tasks and time pressures match real work?), randomization, and distribution shift.',
              },
              {
                label: 'Pillar C — Reliability, Reproducibility & Traceability',
                text: 'Test-retest stability across repeated runs, inter-rater reliability (κ, α, ICC), reproducibility on the same data and replicability on new samples, pinned versions/provenance, and inspectable audit trails.',
              },
            ],
            callout: {
              kind: 'rule',
              title: 'Reliability is necessary, never sufficient',
              body: 'A deterministic, version-pinned pipeline with κ = 0.95 can still consistently measure the wrong construct or fail to generalize to real users. Check all three pillars before staking a high-impact launch on a score.',
            },
          },
          {
            heading: 'Pre-Registering Formal Studies With a 12-Field Protocol',
            paragraphs: [
              'For high-stakes launches or formal comparative studies, write down your evaluation plan before running confirmatory tests: purpose & decision, conceptual basis, pinned system & harness, targets & exclusions, observable criteria, baselines, sampling plan, evaluator validation, analysis & clustering plan, decision rules/blockers, governance owners, and monitoring triggers. You can draft and export one interactively with the Eval Protocol Tool.',
            ],
          },
        ],
        keyTakeaways: [
          'Keep Measurement Validity (A), Study Design & Generalization (B), and Reliability & Traceability (C) separate.',
          'External validity (transfer across populations/distributions) and ecological validity (realistic tasks and time pressure) answer distinct generalization questions.',
          'Pre-register high-stakes decision rules, clustering plans, and release blockers before inspecting confirmatory data.',
        ],
        toolLink: {
          tool: 'framework-tool',
          label: 'Open Eval Protocol Builder',
          description: 'Draft and export a pre-registered 12-field evaluation protocol and bounded decision statement.',
        },
      },
    ],
    practiceLab: {
      title: 'Practice Lab 4: Interactive Statistical Workbench & Decision Memo',
      intro:
        'Explore the 12-question Statistical Worked Examples workbench below to build intuition for CIs, clustering, McNemar’s test, and non-inferiority, then write the "+0.10 Gain vs. 9× Cost" decision memo.',
      interactiveWidget: 'stats-workbench',
      caseStudy: {
        stageTitle: 'Meridian Workshop — Stage 5: Interpreting Mixed Crossover Results',
        narrative:
          'Meridian’s 32-analyst crossover study (128 sessions across 48 private confirmatory packets) shows a +0.40 quality gain (cluster-robust 95% CI [+0.18, +0.62]) and 0/100 confidentiality leaks (~3% one-sided 95% upper bound)—but unsupported claims rose by +1.6 pp (95% CI [+0.2, +3.0]), failing the pre-specified +1.0 pp non-inferiority margin, while total task time changed inconclusively (−2.5 min). Honoring your pre-registered gate, you withhold the pilot until grounding improves.',
        keyDecisions: [
          'Use within-analyst paired difference CIs clustered by analyst/packet rather than eyeballing separate CIs.',
          'Honor pre-specified non-inferiority gates even when average quality improves.',
        ],
      },
      misconceptions: [
        {
          myth: '“Overlapping 95% confidence intervals prove there is no real difference.”',
          reality: 'Overlap of separate CIs is not a valid test—especially on shared tasks where item difficulty cancels out. Estimate the paired difference CI directly.',
        },
        {
          myth: '“p < 0.05 means the new version is worth deploying.”',
          reality: 'Large samples detect tiny gains; practical worth depends on effect size relative to cost, latency, verification burden, and subgroup risks.',
        },
      ],
      exercises: [
        {
          title: 'Exercise 4: Decide Whether a +0.10 Gain Is Worth 9× the Cost',
          objective: 'Interpret a cluster-robust paired difference CI, weigh Goodhart’s Law tradeoffs, and handle an underpowered subgroup.',
          scenario:
            'Fictional paired comparison on N = 200 shared tasks (25 analysts, 8 tasks each): System A mean 4.10/5 (95% CI [4.02, 4.18]), 1.2s latency, $0.02/task; Non-English (n = 15) mean 2.80/5. System B mean 4.20/5 (95% CI [4.10, 4.30]), 6.5s latency, $0.18/task; Non-English (n = 15) mean 3.90/5. Direct paired difference (B − A): +0.10 (cluster-robust 95% CI [+0.01, +0.19]).',
          instructions: [
            'Explain why overlapping separate 95% CIs do not establish "no difference," and what the cluster-robust paired difference CI [+0.01, +0.19] establishes (plus what measurement noise it leaves out).',
            'Weigh the +0.10 gain against 9× cost and 5.4× latency using Goodhart’s Law.',
            'Assess the Non-English subgroup (n = 15: 2.80 vs. 3.90) and state what evidence is needed before deploying System A to Non-English users.',
          ],
          requiredOutput: 'A concise decision memo covering the direct difference CI, tradeoff analysis, and Non-English plan.',
          evaluationCriteria: [
            'Uses the direct cluster-robust difference CI [+0.01, +0.19] rather than separate-CI overlap.',
            'Explicitly weighs +0.10 against 9× cost / 5.4× latency and flags n = 15 subgroup uncertainty.',
          ],
          strongExample:
            'Although the two separate 95% CIs overlap, the direct cluster-robust paired difference (accounting for 8 tasks per analyst) is +0.10 with 95% CI [+0.01, +0.19]—statistically detectable above sampling noise, though excluding rubric/rater error. For English tasks, paying 9× cost ($0.18 vs. $0.02) and 5.4× latency (6.5s vs. 1.2s) for +0.10 on a 5-point scale risks Goodharting quality unless that 0.10 prevents severe failures. On Non-English tasks, System A drops sharply to 2.80 vs. 3.90, but n = 15 is underpowered: block System A for Non-English workflows and collect a larger stratified sample (or route Non-English queries separately).',
          reflectionQuestion: 'Which paired tradeoff metrics guard your primary quality score against Goodhart’s Law in your own system?',
        },
      ],
    },
    quiz: {
      intro: 'Test your mastery of Chapters 4.1–4.3 before moving to Module 5.',
      questions: [
        {
          id: 'm4-q1',
          question: 'Two systems have separate 95% CIs of [4.02, 4.18] and [4.10, 4.30] on the same 200 paired test tasks. What is the right way to test their difference?',
          options: [
            'Conclude there is no significant difference because the two separate CIs overlap.',
            'Compute the paired difference on each task and construct a cluster-appropriate 95% CI for the difference directly.',
            'Run 20 subgroup t-tests without correction until one is significant.',
          ],
          correctIndex: 1,
          correctExplanation: 'Overlap of separate CIs is not a valid hypothesis test—especially on paired tasks where shared item difficulty cancels out.',
          distractorNotes: [
            'A commits the overlapping-CI fallacy.',
            'C inflates false positives via multiple comparisons.',
          ],
        },
        {
          id: 'm4-q2',
          question: 'If you log 300 chat turns across 5 user sessions, why is treating N = 300 as independent observations statistically invalid?',
          options: [
            'Because 300 is too small for any confidence interval.',
            'Because turns within the same session share user/context dependencies, understating uncertainty when your unit is the session.',
            'Because chat turns can only be analyzed qualitatively.',
          ],
          correctIndex: 1,
          correctExplanation: 'Clustered turns within a conversation are correlated; standard errors must reflect session/user clustering.',
          distractorNotes: [
            'A and C are false.',
          ],
        },
        {
          id: 'm4-q3',
          question: 'According to the Standards for Educational and Psychological Testing, what does validity apply to?',
          options: [
            'A fixed property of a benchmark dataset regardless of how it is used.',
            'The degree to which evidence and theory support specific score interpretations for intended uses.',
            'Having an inter-rater reliability kappa above 0.70.',
          ],
          correctIndex: 1,
          correctExplanation: 'Validity is an argument supporting specific interpretations and uses; reliability is necessary but never sufficient for validity.',
          distractorNotes: [
            'A treats validity as context-free.',
            'C confuses reliability with validity.',
          ],
        },
        {
          id: 'm4-q4',
          question: 'A model produces 0 critical failures in 100 independent representative trials. Using the Rule of Three, what is the approximate one-sided 95% upper bound on the failure rate?',
          options: [
            '0%, proving the system is completely safe.',
            '~3% (3/100), assuming independent Bernoulli trials and accurate detection—and saying nothing about untested distribution shifts.',
            '~30%, because 100 trials is always underpowered.',
          ],
          correctIndex: 1,
          correctExplanation: 'Under independent Bernoulli trials with accurate detection, 1 − 0.05^(1/100) ≈ 2.95% (~3% via 3/N).',
          distractorNotes: [
            'A confuses zero observed failures with zero true risk.',
            'C miscalculates the binomial bound.',
          ],
        },
      ],
    },
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
  },

  /* ========================================================================
   * MODULE 5: Real-World Workflows & Production Monitoring (Chapters 5.1 – 5.3)
   * ======================================================================== */
  {
    id: 'm5',
    number: 5,
    title: 'Real-World Workflows & Production Monitoring',
    subtitle: 'Evaluating Layers 4–6 in practice: environment state, total human task time, live telemetry, and versioning',
    overview:
      'Bridge the gap between offline test scores and live production impact. Across three focused chapters you will learn how to verify end-to-end agent and workflow state (Layer 4), run practical user workflow checks that count total task time (Layer 5), and operate disciplined post-launch monitoring with separate product/evaluator versioning.',
    objectives: [
      'Evaluate workflows and agents (Layer 4) by inspecting actual environment state changes rather than trusting model self-reports.',
      'Design a practical two-condition Human–AI workflow test (Layer 5) measuring completed work quality and total task time (drafting + checking + fixing).',
      'Explain when a third AI-alone condition is required (human–AI synergy) and why real users outperform simulated personas.',
      'Operate production monitoring with telemetry + explicit scoring rules, separate product/evaluator versions, named owners, and reevaluation triggers.',
    ],
    chapters: [
      {
        id: '5.1',
        code: 'Chapter 5.1',
        title: 'Evaluating Workflows & Agents (Layer 4)',
        readMinutes: 5,
        summary:
          'Why grading an agent’s final chat message misses silent failures—and how to verify actual environment state, tool permissions, and end-to-end run integrity.',
        sections: [
          {
            heading: 'Verify Actual Environment State, Not the Model’s Self-Report',
            paragraphs: [
              'At Layer 4 (Workflow / Agent), the unit of analysis is the end-to-end run: a multi-step sequence of retrieval calls, tool executions, edits, and checks. A classic failure mode in agent evals is grading the agent’s final prose summary ("I updated the citation table and removed all unsupported claims") instead of inspecting the resulting artifact or environment state.',
              'Models routinely hallucinate successful tool execution or miss partial failures when a tool returns a soft warning. Deterministic post-run assertions—checking the saved file diff, verifying every citation link resolves to an actual retrieved passage, querying database rows, and checking permission boundaries—catch failures that text-only grading misses completely.',
            ],
            callout: {
              kind: 'rule',
              title: 'Log the full trace for debugging',
              body: 'Preserve inputs, retrieved passages, every tool call and raw tool response, retry counts, latency, token cost, and final environment state. Without full traces, an end-to-end failure cannot be diagnosed back to Layer 1 (data), Layer 2 (model), or Layer 3 (component).',
            },
          },
          {
            heading: 'Workflow Metrics Beyond Final Accuracy',
            paragraphs: [
              'End-to-end workflows fail in operational ways that isolated model tests never reveal. Track completion rate (including timeouts in the denominator), iteration/loop count (catching infinite retry spirals), policy boundary adherence (did the agent stay inside allowed read/write scopes?), and repeat-run stability across fixed scenarios.',
            ],
          },
        ],
        keyTakeaways: [
          'Assert against actual environment/artifact state changes rather than trusting an agent’s text claim of success.',
          'Log full intermediate traces so end-to-end failures can be attributed to data, retrieval, tools, or generation.',
          'Pair goal completion with retry counts, timeouts, permission adherence, and repeat-run stability.',
        ],
        trackLink: {
          label: 'Optional Advanced Track B: AI Agents & Tool-Use Evaluation',
          description: 'Explore multi-step planning, state recovery, autonomy checkpoints, and per-task token/wall-clock budgets.',
        },
      },
      {
        id: '5.2',
        code: 'Chapter 5.2',
        title: 'Human–AI Workflow Testing (Layer 5)',
        readMinutes: 6,
        summary:
          'How to test whether real users actually do better work or finish sooner—counting drafting, checking, and correction together.',
        sections: [
          {
            heading: 'One Practical Question: Better Work or Less Total Time?',
            paragraphs: [
              'Passing Layer 4 never proves Layer 5 success. If an AI assistant drafts a brief in 15 seconds, yet analysts spend 18 minutes hunting down subtle citation distortions and fixing tone, the tool slowed them down. At Layer 5, ask one grounded operational question: does a real user with this AI tool produce better completed work or finish sooner than with the current workflow?',
              'To answer that adoption question, run a two-condition comparison (Current workflow vs. Workflow + AI) with real target users—never LLM-simulated personas, which miss real verification friction and caricature user groups. Always measure blinded final artifact quality alongside total task time: drafting + reading + checking + error correction.',
            ],
            diagram: 'outcomes',
          },
          {
            heading: 'Two Conditions for Adoption vs. Three Conditions for Synergy',
            paragraphs: [
              'Teams often wonder whether they need an "AI-alone" arm in every user study. Keep the rule simple:',
            ],
            bullets: [
              {
                label: 'Two conditions (Current workflow vs. Human + AI)',
                text: 'Sufficient for practical adoption decisions ("Does giving our analysts this tool improve on how they work today?").',
              },
              {
                label: 'Add a third AI-alone condition only when claiming synergy',
                text: 'Required if you claim the human–AI team outperforms BOTH solo humans and solo AI. Across 106 studies (370 effect sizes), Vaccaro et al. (2024) found Human+AI beat humans alone (g = +0.64) while averaging negative synergy against the best solo actor (g = −0.23), especially in decision-making tasks.',
              },
              {
                label: 'Measure objective time—not perceived speedup',
                text: 'In METR’s RCT with 16 experienced open-source developers across 246 tasks (Becker et al., 2025), developers forecasted a ~20% speedup yet were observed 19% slower overall with early-2025 AI tools. Perceived speed is not ground truth.',
              },
            ],
          },
        ],
        keyTakeaways: [
          'Count drafting, verification, and error-correction time together inside total task time—never trust drafting speed or user perception alone.',
          'Use two conditions (Current vs. Human+AI) with real users for adoption decisions; add AI-alone only when claiming synergy.',
          'Never substitute LLM-simulated personas for real target users.',
        ],
        toolLink: {
          tool: 'sphere-tool',
          label: 'Optional HCI Tool: SPHERE Card Builder',
          description: 'Designing a formal Human–AI interaction study? Use the optional SPHERE Card Tool (and see Advanced Track G for deep HCI literature).',
        },
      },
      {
        id: '5.3',
        code: 'Chapter 5.3',
        title: 'Production Telemetry, Separate Versioning & Governance',
        readMinutes: 6,
        summary:
          'Why pre-launch evals decay over time—and how to combine live telemetry, explicit scoring rules, separate product/evaluator versions, and clear reevaluation triggers.',
        sections: [
          {
            heading: 'Short-Term Pilots vs. Multi-Week Production Reality',
            paragraphs: [
              'An evaluation only describes one pinned configuration on one traffic distribution at one moment in time. After launch, user behavior shifts, prompts evolve, upstream APIs update silently, and source documents age. Short-term trials can also mislead in both directions: users may need a familiarization phase before unlocking workflow value, or they may initially prefer agreeable/sycophantic outputs that erode trust over weeks.',
            ],
            diagram: 'horizon',
          },
          {
            heading: 'Four Practices for Durable Production Evaluation',
            paragraphs: [
              'Keep post-launch monitoring lightweight, inspectable, and actionable:',
            ],
            bullets: [
              {
                label: '1. Pair live telemetry with explicit scoring rules & audits',
                text: 'Track operational signals (overrides, citation edits, regenerations, escalations, timeouts, latency, cost) alongside weekly stratified human audits on small samples so you know what shifts in telemetry actually mean.',
              },
              {
                label: '2. Version product and evaluator separately',
                text: 'Track model/prompt/retrieval versions independently from rubric/judge versions. If you update the LLM judge and the pass rate jumps 6%, separate versioning prevents you from celebrating a fake product gain.',
              },
              {
                label: '3. Define concrete reevaluation triggers',
                text: 'Trigger proportionate re-testing whenever base model snapshots, prompts, retrieval indexes, source data quality, or user/language mixes change—or when incident rates spike.',
              },
              {
                label: '4. Assign named owners and verify oversight capacity',
                text: 'Name who owns criteria, who reviews findings, and who has authority to halt or roll back. Putting a "human in the loop" means nothing if that reviewer lacks the time, visibility, or authority to intervene.',
              },
            ],
          },
        ],
        keyTakeaways: [
          'Combine live telemetry with explicit scoring rules and periodic stratified human audits.',
          'Version the product and the evaluator independently so measurement changes never masquerade as system gains.',
          'Define explicit reevaluation triggers and assign named owners with real rollback authority.',
        ],
        trackLink: {
          label: 'Optional Advanced Track G: Deep Human–AI Research & SPHERE',
          description: 'Dive into the SPHERE 5-dimension card, synergy meta-analysis, skill formation, offloading scores, and persona simulation research.',
        },
      },
    ],
    practiceLab: {
      title: 'Practice Lab 5: Design a Workflow Time Check & Monitoring Plan',
      intro:
        'Design a practical Layer 5 workflow test that accounts for checking and correction time, paired with concrete post-launch telemetry scoring rules and reevaluation triggers.',
      caseStudy: {
        stageTitle: 'Meridian Workshop — Stage 6: End-to-End Workflow & Live Monitoring',
        narrative:
          'Before expanding Meridian’s assistant, you verify Layer 4 (citations survive full brief revisions without broken links) and Layer 5 (two-condition comparison of Meridian analysts using their search+checklist baseline vs. the AI assistant, timing drafting + citation verification + error fixing together). Post-launch, you pair live citation-override telemetry with a weekly 30-session human audit, independent product/judge versioning, and explicit rollback triggers.',
        keyDecisions: [
          'Measure total task time (drafting + verification + correction) with real analysts rather than drafting speed or simulated personas.',
          'Version product and monitoring judge independently and set clear reevaluation triggers on model, prompt, retrieval, or traffic shifts.',
        ],
      },
      misconceptions: [
        {
          myth: '“Faster AI drafting automatically saves the user time.”',
          reality: 'Users often feel faster even when checking, prompting, and fixing mistakes makes total task time slower (METR, 2025). Always time the full workflow.',
        },
        {
          myth: '“LLM-simulated personas can replace real user tests—or you always need a 3-condition study.”',
          reality: 'Two conditions with real target users answer practical adoption questions; simulated personas miss real verification friction. Add solo AI only when claiming synergy.',
        },
      ],
      exercises: [
        {
          title: 'Exercise 5: Design a Workflow Time Check & Production Monitoring Plan',
          objective: 'Specify a practical two-condition Layer 5 workflow check plus two live telemetry scoring rules and a reevaluation trigger.',
          scenario:
            'Leadership wants to roll out an AI research drafting assistant to 40 support analysts because early offline tests passed 90% accuracy.',
          instructions: [
            'Design a two-condition workflow check (Current workflow vs. Analyst + AI) naming participants, quality measure, and the exact time components summed into total task time.',
            'State when you would add a third AI-alone condition (and what a two-condition test alone cannot establish).',
            'Specify two post-launch monitoring signals (telemetry + explicit scoring rule) and one change that triggers immediate reevaluation.',
          ],
          requiredOutput: 'A concise workflow test plan plus 2 monitoring rules and 1 reevaluation trigger.',
          evaluationCriteria: [
            'Includes drafting, checking, and correction time inside total task time using real analysts.',
            'Defines explicit scoring rules for live telemetry and versions product and judge separately.',
          ],
          strongExample:
            'Workflow test: Compare (1) analysts using the current search+template workflow vs. (2) the same analysts using the AI assistant on comparable private packets. Measure blinded brief quality (1–5), unsupported claims, and total task time = drafting + citation verification + error correction. Add AI-alone only if claiming Human+AI beats fully automated briefs. Monitoring: Track (a) citation-override telemetry scored via weekly stratified human audit of 30 overridden citations (counting unsupported-claim errors separately from stylistic trims) and (b) weekly private regression suite pass rate. Version product and judge separately; trigger full reevaluation whenever the model snapshot, retrieval index, or language mix shifts.',
          reflectionQuestion: 'In an AI tool you use right now, how many minutes saved during drafting are spent back on verification and fixes?',
        },
      ],
    },
    quiz: {
      intro: 'Check your mastery of Chapters 5.1–5.3 before moving to Module 6.',
      questions: [
        {
          id: 'm5-q1',
          question: 'When evaluating a multi-step AI agent that updates records and citations, why is grading only its final chat message unreliable?',
          options: [
            'Because chat messages are always too short.',
            'Because agents can hallucinate success or miss partial tool failures; you must assert against actual environment/artifact state changes.',
            'Because Layer 4 evals cannot use deterministic code checks.',
          ],
          correctIndex: 1,
          correctExplanation: 'Verifying actual files, databases, and citation links catches silent execution failures that prose summaries hide.',
          distractorNotes: [
            'A and C are false.',
          ],
        },
        {
          id: 'm5-q2',
          question: 'When testing whether an AI copilot helps your team in practice, why must you sum drafting, checking, and correction time—and when do you add an AI-alone condition?',
          options: [
            'Because checking and fixing errors often erase drafting speedups; add AI-alone only when claiming human–AI synergy over both solo baselines.',
            'Because checking time is negligible; add AI-alone in every user test.',
            'Because self-reported speed surveys are always more accurate than timing tasks.',
          ],
          correctIndex: 0,
          correctExplanation: 'Total task time captures net workflow impact, and two conditions answer adoption questions unless you claim synergy over solo AI.',
          distractorNotes: [
            'B ignores verification cost and overcomplicates adoption tests.',
            'C is contradicted by empirical evidence (e.g., METR 2025).',
          ],
        },
        {
          id: 'm5-q3',
          question: 'Why must production systems and automated monitoring evaluators be versioned separately?',
          options: [
            'Because evaluator prompts cannot be stored in Git.',
            'So a rubric edit or judge-model update is never mistaken for a system improvement or regression.',
            'So teams can delete raw production traces after scoring.',
          ],
          correctIndex: 1,
          correctExplanation: 'Independent versioning cleanly separates system performance changes from measurement changes.',
          distractorNotes: [
            'A and C are false.',
          ],
        },
        {
          id: 'm5-q4',
          question: 'Why does assigning a "human in the loop" not automatically guarantee safe oversight in production?',
          options: [
            'Because human reviewers are never helpful.',
            'Because oversight itself must be evaluated: reviewers may lack the time, source visibility, expertise, or authority to catch and stop errors.',
            'Because oversight is only relevant at Layer 1.',
          ],
          correctIndex: 1,
          correctExplanation: 'Effective human oversight depends on verification affordances, workload, expertise, and real authority to intervene.',
          distractorNotes: [
            'A and C are false.',
          ],
        },
      ],
    },
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
        finding: 'Human–AI combinations outperformed humans alone on average (g = 0.64), but average synergy vs. the best solo actor was negative (g = −0.23), especially in decision-making tasks where AI outperformed humans alone.',
        limitations: 'Reflects historical tasks and mostly pre-frontier models across heterogeneous experimental designs.',
        doesNotEstablish: 'Does not establish that all future human–AI systems fail at decision-making or succeed at creation.',
      },
    ],
  },

  /* ========================================================================
   * MODULE 6: Human–AI Interaction (HAI) & Epistemic Risk (Chapters 6.1 – 6.4)
   * ======================================================================== */
  {
    id: 'm6',
    number: 6,
    title: 'Human–AI Interaction & Epistemic Risk',
    subtitle: 'Beyond the model/human binary, HAI constructs, Epistemia & the 7 fault lines, cognitive biases, and anti-epistemia evals',
    overview:
      'Evaluating a model in isolation answers a narrow technical question. In deployment, AI operates inside a feedback loop with human users, interfaces, and workflows. Across four focused chapters you will learn why "Model-Centric vs. Human-Centered" breaks down on the 7-layer stack, master core HAI constructs like calibrated reliance and error visibility, examine Epistemia and cognitive biases in users and judges, and design evals that catch fluent errors.',
    objectives: [
      'Move beyond the "Model-Centric vs. Human-Centered" binary by framing evaluations top-down from Layers 5–7 and instrumenting bottom-up across Layers 1–4.',
      'Operationalize four core HAI constructs: complementarity, calibrated reliance (over- vs. under-reliance), oversight cost, and error visibility & recovery.',
      'Explain Epistemia, the seven epistemological fault lines (Quattrociocchi et al., 2025), the 90%/10% Verification Trap, and cognitive biases in both users and evaluators.',
      'Design anti-epistemia evals: decoupling satisfaction from accuracy, testing abstention, seeding realistic fluent errors, and running sycophancy perturbation probes.',
    ],
    chapters: [
      {
        id: '6.1',
        code: 'Chapter 6.1',
        title: 'Beyond the Binary: Model-Centric vs. Human-Centered Evals',
        readMinutes: 6,
        summary:
          'Why "Model-Centric vs. Human-Centered" is a useful starting contrast but a weak operational model—and how to frame top-down and instrument bottom-up across the 7-layer stack.',
        sections: [
          {
            heading: 'The Starting Contrast',
            paragraphs: [
              'Traditional machine learning evaluation is model-centric: it treats the model as a self-contained input-output function evaluated against static benchmarks. Human–AI Interaction (HAI) evaluation is human-centered: it shifts the unit of analysis to the coupled human–AI system, measuring what happens when a real person tries to accomplish an ill-structured, multi-turn goal with an AI interface.',
            ],
            table: {
              headers: ['Dimension', 'Model-Centric Evals (Layers 1–2)', 'Human-Centered / HAI Evals (Layers 5–7)'],
              rows: [
                ['Unit of Analysis', 'The model in isolation (claim, response, prompt)', 'The joint system (Human + Interface + AI: task session, analyst, team)'],
                ['Task Structure', 'Static, single-turn, well-defined prompts', 'Dynamic, multi-turn, ambiguous real-world tasks'],
                ['Core Metrics', 'Accuracy, F1, pass@k, latency, refusal rate', 'Calibrated reliance, complementarity, cognitive load, error recovery'],
                ['Primary Failure Modes', 'Hallucination, instruction non-compliance, toxicity', 'Over-reliance, automation bias, verification fatigue, unrecoverable drift'],
                ['Primary Validity Risk', 'Benchmark saturation and data contamination', 'Weak construct validity (wrong proxy) and ecological validity (lab tasks lacking real stakes)'],
              ],
            },
          },
          {
            heading: 'Why the Binary Breaks Down',
            paragraphs: [
              'While "Model-Centric vs. Human-Centered" exposes classic engineering blind spots, treating it as a rigid binary fails operationally for three reasons:',
            ],
            bullets: [
              {
                label: '1. It erases the engineered system layers (Layers 3–4)',
                text: 'Production AI is rarely a raw model meeting a raw human. Between them sit retrieval pipelines (RAG), tool calls, prompt scaffolding, deterministic guardrails, and UI affordances. A binary forces you to shoehorn pipeline bugs into "model" or "human" when they belong to neither.',
              },
              {
                label: '2. It implies a false zero-sum trade-off',
                text: 'Teams do not trade model accuracy for human usability. Lower-layer reliability (Layers 1–4) and higher-layer interaction quality (Layers 5–7) are tightly coupled.',
              },
              {
                label: '3. It conflates what is measured with how it is measured',
                text: 'Isolated model outputs can be graded by human raters (side-by-side preference), while human interaction behavior can be measured automatically via telemetry (override rates, edit distance, abandonment) paired with scoring rules.',
              },
            ],
          },
          {
            heading: 'The Asymmetric Operating Principle on Our 7-Layer Stack',
            paragraphs: [
              'Instead of a binary, use our unified 7-layer stack from Chapter 1.3 (Data & Inputs → Isolated Model → Component → Workflow / Agent → Human–AI Interaction → Organizational → Wider Impacts) with one asymmetric operating principle:',
            ],
            callout: {
              kind: 'rule',
              title: 'Frame top-down; instrument bottom-up',
              body: 'Frame your evaluation top-down from the higher layers (Layers 5–7)—defining which human-system failure or organizational harm actually matters—then build instrumentation bottom-up across Layers 1–4, finding the cheapest automated checks that reliably predict higher-layer behavior.',
            },
          },
        ],
        keyTakeaways: [
          'Model-centric vs. human-centered is a helpful starting contrast, not an operational architecture.',
          'Never erase Layers 3–4 (retrieval, tools, harnesses, UI) or confuse what is measured with who scores it.',
          'Frame evaluations top-down from real human/outcome failures, then instrument bottom-up across Layers 1–4.',
        ],
      },
      {
        id: '6.2',
        code: 'Chapter 6.2',
        title: 'Core Constructs in HAI Evaluation',
        readMinutes: 6,
        summary:
          'Four analytical constructs that explain why a 95%-accurate model can still degrade real decisions—and why failing loudly is often safer than failing smoothly.',
        sections: [
          {
            heading: 'Four Constructs That Do the Analytical Work',
            paragraphs: [
              'When evaluating Layer 5 (Human–AI Interaction) and Layer 6 (Organizational outcomes), generic accuracy scores miss the dynamics of human judgment. Four constructs capture whether the coupled human–AI system actually works:',
            ],
            bullets: [
              {
                label: '1. Human–AI Complementarity',
                text: 'The gold standard of collaborative AI: the human–AI team outperforms BOTH the human working alone and the AI working alone. Empirical studies (including Vaccaro et al., 2024) repeatedly show that adding a high-accuracy AI assistant can still degrade joint decisions if users cannot tell when to override it.',
              },
              {
                label: '2. Calibrated Reliance (Over-Reliance vs. Under-Reliance)',
                text: 'Appropriate trust in action—accepting correct outputs and rejecting wrong ones. Failures split into two opposite regimes: over-reliance (accepting incorrect AI outputs without adequate verification) and under-reliance (ignoring or overriding correct AI outputs due to distrust, UI friction, or poor explanation).',
              },
              {
                label: '3. Oversight Cost & Cognitive Load',
                text: 'Supervising an AI is never free. If prompting, reading dense prose, and fact-checking subtle claims requires more cognitive effort than doing the work manually, the system shifts labor rather than reducing it.',
              },
              {
                label: '4. Error Visibility & Recovery',
                text: 'How quickly a user notices a subtle failure and how easily they can steer the system back on track. Systems that fail loudly (returning an error, flagging missing sources, or abstaining) are often far safer than systems that fail smoothly in confident prose.',
              },
            ],
            callout: {
              kind: 'example',
              title: 'Failing loudly vs. failing smoothly at Meridian',
              body: 'If Meridian’s retriever finds zero papers on a topic and returns "No matching sources found in the corpus," the analyst immediately knows to search manually (loud failure, near-zero harm). If the model instead synthesizes a polished two-paragraph answer from parametric memory with a plausible-looking citation, the error becomes invisible (smooth failure, high epistemic risk).',
            },
          },
        ],
        keyTakeaways: [
          'Track calibrated reliance in both directions: over-reliance on wrong outputs and under-reliance on right outputs.',
          'Measure oversight cost and error visibility explicitly—failing loudly is safer than failing smoothly.',
          'Complementarity requires beating both solo human and solo AI baselines.',
        ],
        toolLink: {
          tool: 'sphere-tool',
          label: 'Optional HCI Tool: SPHERE Card Builder',
          description: 'Need a structured 5-dimension card for a formal HAI study? Use the SPHERE Card Tool (or browse Layer 5 reliance/friction metrics in the Metrics Taxonomy Tool).',
        },
      },
      {
        id: '6.3',
        code: 'Chapter 6.3',
        title: 'Epistemia, the Seven Fault Lines & Cognitive Biases',
        readMinutes: 8,
        summary:
          'Why fluent prose tricks human judgment, how the 90%/10% Verification Trap collapses scrutiny, and how cognitive biases distort both end users and evaluators.',
        sections: [
          {
            heading: 'Epistemia: The Feeling of Knowing Without the Labor of Judgment',
            paragraphs: [
              'Most evaluation frameworks assume that if an AI output looks accurate and sounds helpful, it is aligned with human judgment. A cognitive science and epistemological lens reveals why surface polish can mask deep structural failure.',
              'In Epistemological Fault Lines Between Human and Artificial Intelligence (Quattrociocchi, Capraro, & Perc, 2025, arXiv:2512.19466), the authors note that traditional search engines filtered information—returning candidate sources and leaving credibility judgment to the user. Generative AI synthesizes a single, fluent, authoritative-sounding answer, collapsing search, selection, and explanation into one smooth surface. They call the resulting condition Epistemia:',
            ],
            callout: {
              kind: 'warning',
              title: 'Epistemia (Quattrociocchi, Capraro, & Perc, 2025)',
              body: 'A structural condition in which linguistic plausibility substitutes for epistemic evaluation, producing the feeling of knowing without the labor of judgment.',
            },
          },
          {
            heading: 'The Seven Epistemological Fault Lines',
            paragraphs: [
              'Even when human and AI answers look identical on the surface, their underlying pipelines diverge across seven fault lines:',
            ],
            table: {
              headers: ['Fault Line', 'Human Epistemic Pipeline', 'LLM Generative Pipeline', 'Evaluation Implication'],
              rows: [
                ['1. Grounding', 'Multimodal, embodied, social perception anchored in a shared world', 'Abstracted symbol sequences reconstructed statistically from text', 'Models miss pragmatic cues (sarcasm, stakes, physical context) humans register effortlessly.'],
                ['2. Parsing', 'Situational parsing into scenes, agents, intentions, and risks', 'Mechanical tokenization and formal partitioning of strings', 'Fragility to superficial prompt phrasing and structural perturbations.'],
                ['3. Experience', 'Episodic memory, intuitive physics/psychology, situated concepts', 'Relational similarity in high-dimensional embedding space', 'Brittle generalization outside training distributions despite fluent recall.'],
                ['4. Motivation', 'Goal-directed, stakes-sensitive judgment', 'Goal-agnostic conditional probability estimation', 'No intrinsic stake in truth; optimizes continuation likelihood or reward proxies.'],
                ['5. Causality', 'Mental models supporting interventions and counterfactuals', 'Surface statistical associations and co-occurrence patterns', 'Confuses correlation with causation; breaks under novel counterfactuals.'],
                ['6. Metacognition', 'Internal conflict detection, uncertainty monitoring, withholding judgment', 'Forced continuation without internal truth monitoring', 'Forced confidence: identical fluency when recalling verified facts or confabulating.'],
                ['7. Value', 'Normative commitments tied to ethics and accountability', 'Next-token prediction shaped externally by post-training alignment', 'Simulated normativity without genuine accountability or moral agency.'],
              ],
            },
            callout: {
              kind: 'rule',
              title: 'Epistemic scope note',
              body: 'Quattrociocchi et al. (2025, preprint) is a theoretical synthesis, not a closed empirical verdict. Engineering layers like RAG, deterministic tools, and abstention training actively mitigate symptoms of these fault lines—yet adding retrieval and citations often makes answers MORE convincing faster than it makes the underlying process more knowing, making rigorous evals harder, not easier.',
            },
          },
          {
            heading: 'Silent Epistemic Hazards & The 90%/10% Verification Trap',
            paragraphs: [
              'Mapping failures onto these fault lines separates obvious bugs from silent epistemic hazards:',
            ],
            bullets: [
              {
                label: 'Fluent confabulation (Metacognition)',
                text: 'Unlike a database returning NULL, an LLM generates false claims with the exact syntactic polish of true ones—breaking fluency as a cue for accuracy.',
              },
              {
                label: 'Sycophancy & preference hacking (Motivation & Value)',
                text: 'Models tuned on human preference ratings learn to mirror user beliefs and validate flawed premises. Naive "user satisfaction" evals actively reward this failure mode.',
              },
              {
                label: 'Spurious causal rationalizations (Causality)',
                text: 'Polished chain-of-thought explanations can sound logically rigorous while masking unfaithful internal shortcuts.',
              },
              {
                label: 'The Verification Trap (System–Human Coupling)',
                text: 'When an AI system is right 90% of the time and smoothly wrong 10% of the time, busy humans rationally down-regulate their scrutiny—causing error detection to collapse precisely on the hardest edge cases.',
              },
            ],
          },
          {
            heading: 'Cognitive Biases in Two Groups: End Users and Evaluators',
            paragraphs: [
              'Epistemia succeeds because generative fluency exploits well-documented human heuristics—distorting both the end users in deployment and the evaluators/judges scoring the system:',
            ],
            table: {
              headers: ['Group Distorted', 'Bias / Heuristic', 'How It Breaks AI Systems or Evals'],
              rows: [
                ['End Users (Layer 5)', 'Processing Fluency Heuristic', 'Ease of reading and clean formatting feel like truth even when claims are unsupported.'],
                ['End Users (Layer 5)', 'Automation Bias', 'Favoring automated suggestions and ignoring contradictory cues, especially under time pressure.'],
                ['End Users (Layer 5)', 'Illusion of Explanatory Depth (IoED)', 'A polished explanation creates the sensation of understanding, causing users to skip verification.'],
                ['End Users (Layer 5)', 'Anchoring, Anthropomorphism & Confirmation Bias', 'First drafts anchor subsequent reasoning; conversational tone implies self-awareness; sycophantic outputs confirm user priors.'],
                ['Evaluators & Judges (Measurement)', 'Verbosity, Polish & Position Bias', 'Both human raters and LLM judges prefer longer, better-formatted answers and exhibit A/B order effects.'],
                ['Evaluators & Judges (Measurement)', 'Self-Enhancement & Satisfaction Rubrics', 'LLM judges favor their own model family; asking raters "which feels more helpful?" without ground-truth checks selects directly for epistemia.'],
              ],
            },
          },
        ],
        keyTakeaways: [
          'Epistemia occurs when linguistic fluency substitutes for actual verification—creating the feeling of knowing without the labor of judgment.',
          'The 90%/10% Verification Trap explains why high-accuracy models that fail smoothly cause human oversight to collapse on edge cases.',
          'Cognitive biases distort both end users (fluency, automation bias, IoED, anchoring) and evaluators (verbosity, position, self-enhancement, helpfulness-only rubrics).',
        ],
      },
      {
        id: '6.4',
        code: 'Chapter 6.4',
        title: 'Designing Evals Against Epistemia',
        readMinutes: 6,
        summary:
          'Six concrete changes to how you construct datasets, run user trials, and score judges so your eval suite catches fluent errors instead of rewarding them.',
        sections: [
          {
            heading: 'Six Concrete Engineering & Study-Design Defenses',
            paragraphs: [
              'Moving from surface alignment to epistemic evaluation requires concrete changes in how tests are built and scored:',
            ],
            bullets: [
              {
                label: '1. Decouple satisfaction from decision quality',
                text: 'Never treat thumbs-up, CSAT, or "perceived helpfulness" as proxies for factual accuracy or complementarity. Always pair subjective ratings with objective task outcomes and error audits.',
              },
              {
                label: '2. Test calibration and abstention explicitly',
                text: 'Include unanswerable, underspecified, and out-of-corpus queries in your test suite. Score whether the system asks clarifying questions, hedges appropriately, or abstains rather than rewarding forced completion.',
              },
              {
                label: '3. Measure error detection under fluency',
                text: 'In user studies, intentionally seed realistic, high-fluency errors (or draw from real model failure traces) and measure whether users catch them. Compare detection rates across UI affordances such as inline passage highlights, uncertainty markers, and cognitive forcing functions.',
              },
              {
                label: '4. Run counterfactual, perturbation & sycophancy probes',
                text: 'Test whether model reasoning survives inverted premises, rephrased wording, or polite-but-false user assumptions ("I believe the study proved causation—can you summarize how?").',
              },
              {
                label: '5. Audit judges against blind human ground truth',
                text: 'Randomize A/B order to control position bias, strip unnecessary formatting/length advantages, and calibrate LLM judges regularly against blind expert review on a stratified sample of real failures (reinforcing Chapter 3.2).',
              },
              {
                label: '6. Track longitudinal trust drift & skill retention',
                text: 'Short lab sessions capture first-impression usability, not verification fatigue or skill atrophy. For high-stakes workflows, track override rates, edit depth, and independent human performance over weeks.',
              },
            ],
          },
        ],
        keyTakeaways: [
          'Always decouple user satisfaction from verified decision quality and explicitly reward calibrated abstention.',
          'Test human error detection on seeded high-fluency failures and stress-test models with polite false-premise sycophancy probes.',
          'Audit automated judges for order/verbosity bias against blind expert review and track override/edit depth longitudinally.',
        ],
        trackLink: {
          label: 'Optional Advanced Track G: Deep Human–AI Research & SPHERE',
          description: 'Explore empirical studies on sycophancy drift, cognitive offloading scores, skill formation, and persona simulation limits.',
        },
      },
    ],
    practiceLab: {
      title: 'Practice Lab 6: Epistemic Audit of an Eval Suite',
      intro:
        'Apply Chapters 6.1–6.4 by running a four-question epistemic audit on an existing AI workflow to expose where fluent errors can slip past both users and judges.',
      caseStudy: {
        stageTitle: 'Meridian Workshop — Stage 7: Epistemic Risk Audit',
        narrative:
          'Meridian’s internal pilot scores 4.7/5 on analyst satisfaction—yet a seeded fluent-error audit reveals that when the assistant smoothly fabricates a causal conclusion backed by a real-looking citation, analysts miss 68% of seeded errors under normal time pressure (the Verification Trap). You redesign the UI to show the exact source sentence inline with a mandatory "Check causal wording" prompt and add polite false-premise sycophancy probes to your CI suite.',
        keyDecisions: [
          'Stop treating 4.7/5 analyst satisfaction as evidence of calibrated reliance or factual safety.',
          'Add seeded fluent-error detection checks and sycophancy perturbation probes alongside inline source-passage verification.',
        ],
      },
      misconceptions: [
        {
          myth: '“High user satisfaction (4.7/5 or high thumbs-up) proves the AI improves decisions.”',
          reality: 'Fluent, agreeable answers trigger processing fluency and the Illusion of Explanatory Depth—often earning high satisfaction scores while increasing over-reliance on subtle errors.',
        },
        {
          myth: '“Adding RAG and clickable citations eliminates epistemia.”',
          reality: 'Citations can make wrong summaries look MORE authoritative faster than they make verification effortless—unless UI affordances keep oversight cost low and error visibility high.',
        },
      ],
      exercises: [
        {
          title: 'Exercise 6: Four-Question Epistemic Audit of an AI Feature',
          objective: 'Audit a real or prototype AI feature across the 7 layers, the 7 epistemological fault lines, fluent-error detection, and judge biases.',
          scenario:
            'Select an AI feature you use or build (or use the Meridian Research Assistant: RAG-backed paper summarization with clickable footnote links and a thumbs-up/down feedback button).',
          instructions: [
            '1. Layer Check: Which of the 7 layers (Data & Inputs → Wider Impacts) do your current metrics actually measure, and what unverified assumption connects your automated Layer 1–4 metrics to Layer 5–6 user outcomes?',
            '2. Fault-Line Mapping: Pick your system’s three most costly failure modes and map each to the driving epistemological fault line(s) (Grounding, Parsing, Experience, Motivation, Causality, Metacognition, Value).',
            '3. Epistemia Stress Test: If the system produces a completely wrong answer written in fluent, confident prose, what concrete mechanism—in the UI, workflow, or eval suite—would catch it?',
            '4. Judge Audit: Identify one way your current evaluation rubric (human or LLM-based) could inadvertently reward verbosity, polish, or sycophantic agreement over calibrated accuracy—and how you will fix it.',
          ],
          requiredOutput: 'A structured 4-part epistemic audit covering layers, fault lines, fluent-error defense, and judge bias mitigation.',
          evaluationCriteria: [
            'Clearly distinguishes what lower-layer metrics measure from the unverified jump to Layer 5–6 human outcomes.',
            'Maps concrete failure modes to fault lines, proposes an observable fluent-error detection mechanism, and fixes a specific judge bias.',
          ],
          strongExample:
            '1) Layer Check: Current metrics only measure Layer 3 retrieval Recall@5 and Layer 2 claim faithfulness on clean snippets; the unverified assumption is that 92% snippet faithfulness means analysts catch the remaining 8% of errors at Layer 5. 2) Fault-Line Mapping: (a) Confident answer when corpus lacks evidence → Metacognition (forced continuation); (b) Turning survey correlations into causal claims → Causality; (c) Agreeing with an analyst’s flawed leading prompt → Motivation/Value (sycophancy). 3) Epistemia Stress Test: Seed 10 realistic fluent errors into a blinded analyst trial to measure detection rate, surface exact quoted source sentences inline beside each claim, and add an explicit abstention test suite. 4) Judge Audit: Our current LLM judge uses "Which summary is more helpful?"—rewarding verbose prose. Replace with binary claim-entailment checks, randomize A/B order, and calibrate weekly against blind expert review.',
          reflectionQuestion: 'If your AI system were right 90% of the time and smoothly wrong 10% of the time, how many weeks would it take before your users stopped checking?',
        },
      ],
    },
    quiz: {
      intro: 'Test your mastery of Chapters 6.1–6.4 before moving to Module 7.',
      questions: [
        {
          id: 'm6-q1',
          question: 'What is the asymmetric operating principle for connecting high-level HAI goals with automated engineering evals across the 7-layer stack?',
          options: [
            'Pick the easiest Layer 2 benchmark first and assume it guarantees Layer 5 user benefit.',
            'Frame evaluation top-down from the higher human/outcome layers (which failure actually matters), then build instrumentation bottom-up across Layers 1–4.',
            'Replace all automated Layers 1–4 checks with user surveys.',
          ],
          correctIndex: 1,
          correctExplanation: 'Top-down framing keeps evaluations anchored to real human/workflow failures, while bottom-up instrumentation finds cheap automated proxies that actually predict them.',
          distractorNotes: [
            'A commits a classic cross-layer leap.',
            'C throws away fast regression checks and relies on weak subjective proxies.',
          ],
        },
        {
          id: 'm6-q2',
          question: 'Why are AI systems that "fail loudly" (e.g., abstaining or flagging missing sources) often safer in human–AI workflows than systems that "fail smoothly"?',
          options: [
            'Because loud failures increase error visibility and trigger human scrutiny, whereas smooth, fluent failures exploit processing fluency and the Verification Trap.',
            'Because loud failures never require any human oversight.',
            'Because smooth failures always have higher latency.',
          ],
          correctIndex: 0,
          correctExplanation: 'Visible errors allow fast human recovery; smooth, confident confabulations mask errors and induce over-reliance.',
          distractorNotes: [
            'B and C are false.',
          ],
        },
        {
          id: 'm6-q3',
          question: 'What is the "Verification Trap" in human–AI interaction?',
          options: [
            'When a deterministic unit test runs too slowly.',
            'When an AI is right ~90% of the time and smoothly wrong ~10% of the time, causing humans to down-regulate scrutiny and miss the hardest edge-case failures.',
            'When users refuse to use an AI tool at all.',
          ],
          correctIndex: 1,
          correctExplanation: 'High baseline accuracy paired with fluent errors lulls reviewers into automation bias, collapsing detection on the remaining errors.',
          distractorNotes: [
            'A is unrelated.',
            'C describes under-reliance, not the Verification Trap.',
          ],
        },
        {
          id: 'm6-q4',
          question: 'Which evaluation practice directly tests whether your system and UI defend against Epistemia?',
          options: [
            'Tracking only thumbs-up satisfaction ratings after each response.',
            'Seeding realistic, high-fluency errors in user trials to measure error-detection rates alongside explicit abstention and polite false-premise sycophancy probes.',
            'Removing all unanswerable questions from your test set.',
          ],
          correctIndex: 1,
          correctExplanation: 'Directly measuring fluent-error detection, abstention calibration, and resistance to sycophantic premises tests epistemic safety rather than surface polish.',
          distractorNotes: [
            'A rewards epistemia directly.',
            'C hides forced-continuation failures.',
          ],
        },
      ],
    },
    researchEvidence: [
      {
        citation: 'Quattrociocchi, W., Capraro, V., & Perc, M. (2025). Epistemological Fault Lines Between Human and Artificial Intelligence. arXiv:2512.19466.',
        sourceType: 'Preprint',
        url: 'https://arxiv.org/abs/2512.19466',
        sampleOrScope: 'Theoretical synthesis comparing human epistemic pipelines with generative LLM token-transition pipelines across seven fault lines.',
        finding: 'Defines Epistemia—where linguistic plausibility substitutes for epistemic evaluation, creating the feeling of knowing without the labor of judgment—and maps seven structural fault lines (Grounding, Parsing, Experience, Motivation, Causality, Metacognition, Value).',
        limitations: 'Theoretical preprint synthesis rather than a controlled empirical benchmark; retrieval, tools, and calibration training mitigate some symptoms.',
        doesNotEstablish: 'Does not prove that engineered RAG/tool systems cannot reduce error rates—rather warns that added polish can make answers more convincing faster than they become more knowing.',
      },
    ],
  },

  /* ========================================================================
   * MODULE 7: Auditing Benchmarks & Vendor Claims (Chapters 7.1 – 7.2)
   * ======================================================================== */
  {
    id: 'm7',
    number: 7,
    title: 'Auditing Benchmarks & Vendor Claims',
    subtitle: 'How leaderboards mislead, the 4-question audit, and calibrated evidence reporting',
    overview:
      'Put everything from Modules 1–6 together to call out hype. Across two sharp chapters you will learn the recurring mechanisms by which public benchmarks and vendor decks mislead—and how to audit any AI claim and rewrite it strictly within what the supplied evidence supports.',
    objectives: [
      'Recognize the major benchmark and reporting pitfalls: contamination, saturation, undisclosed harnesses, Goodharted proxies, and cross-layer leaps.',
      'Apply the 4-question audit to any press release, vendor pitch, or internal slide deck.',
      'Classify statements accurately as empirical, normative, predictive, mechanistic, comparative, or unsupported.',
      'Rewrite overstated claims into calibrated, evidence-matched language without inventing undisclosed details.',
    ],
    chapters: [
      {
        id: '7.1',
        code: 'Chapter 7.1',
        title: 'How Benchmarks & Leaderboards Mislead',
        readMinutes: 6,
        summary:
          'Why ranking #1 on a public leaderboard rarely predicts real-world workflow performance—and six concrete failure modes to check every time.',
        sections: [
          {
            heading: 'Four Families of Evaluation Fallacies',
            paragraphs: [
              'When a public benchmark becomes a marketing headline, Goodhart’s Law takes over almost immediately. Teams optimize prompts, retries, and training mixtures for leaderboard rank while leaving real-world reliability untouched. Most misleading AI claims fall into four recurring patterns:',
            ],
            diagram: 'fallacies',
          },
          {
            heading: 'Six Concrete Pitfalls to Check in Every Claim',
            paragraphs: [
              'Whenever you read a model release blog, vendor deck, or academic abstract, check for these six failure modes:',
            ],
            bullets: [
              {
                label: '1. Contamination, leakage & saturation',
                text: 'Public test items appearing in pretraining corpora or prompt templates, or ceiling scores (95%+) that hide real-world edge-case failures.',
              },
              {
                label: '2. Undisclosed harnesses & compute asymmetry',
                text: 'Comparing Model B with 10 retries, code execution, and custom scaffolding against Model A running single-shot—then crediting the base model.',
              },
              {
                label: '3. Version drift & environment mismatch',
                text: 'Unpinned API snapshots, differing timeouts/sandboxes, or broken grading scripts across compared runs.',
              },
              {
                label: '4. Selective reporting & multiple comparisons',
                text: 'Cherry-picking favorable benchmarks or slices while hiding regressions, or testing dozens of metrics without correction.',
              },
              {
                label: '5. Misleading averages & incompatible scales',
                text: 'Burying rare critical failures inside high composite means, or equating raw percentages across completely different benchmarks without shared anchors.',
              },
              {
                label: '6. Cross-layer & causal leaps',
                text: 'Claiming general intelligence, enterprise safety, or 40% team productivity gains (Layers 5–6) from narrow Layer 2 benchmark scores.',
              },
            ],
          },
        ],
        keyTakeaways: [
          'Public leaderboards routinely suffer from contamination, hidden harness advantages, saturation, and Goodharting.',
          'Never equate scores across incompatible benchmarks or extrapolate Layer 2 model accuracy into Layer 5/6 deployment claims.',
        ],
      },
      {
        id: '7.2',
        code: 'Chapter 7.2',
        title: 'The 4-Question Audit & Calibrated Reporting',
        readMinutes: 5,
        summary:
          'A four-question checklist to audit any vendor pitch in minutes—and exact phrasing patterns that match confidence to evidence.',
        sections: [
          {
            heading: 'Four Questions That Cut Through Any Pitch',
            paragraphs: [
              'You do not need an entire research team to audit an AI claim. Ask four concrete questions:',
            ],
            bullets: [
              {
                label: 'Question 1 — What layer, unit, and dataset were actually tested?',
                text: 'Was it isolated snippets (Layer 2) or real user workflows (Layer 5)? Private domain packets or a saturated public benchmark?',
              },
              {
                label: 'Question 2 — What comparison was made, and with what pinned harness?',
                text: 'What baseline was used, were versions pinned, and did both sides get the same retries, tools, and token budgets?',
              },
              {
                label: 'Question 3 — What is unknown, omitted, or Goodharted?',
                text: 'Are sample sizes, confidence intervals, cost/latency tradeoffs, subgroup breakdowns, and safety/failure modes reported—or missing?',
              },
              {
                label: 'Question 4 — What exact wording does the supplied evidence support?',
                text: 'Strip away marketing adjectives and state strictly what was observed, under what conditions, and what remains untested.',
              },
            ],
          },
          {
            heading: 'Calibrating Claims to Evidence',
            paragraphs: [
              'Use disciplined attribution when summarizing results: "The study found…" for verified empirical findings, "The authors report…" for unverified vendor claims, and "This remains uncertain…" wherever details are omitted. Never invent undisclosed setup parameters or error bars.',
            ],
            table: {
              headers: ['Overextended Claim', 'Evidence-Matched Formulation'],
              rows: [
                ['“The AI is accurate.”', '“This version achieved the reported accuracy on these tasks under these conditions.”'],
                ['“The model can reason.”', '“The results support this specified behavioral-capability claim, subject to these alternative explanations and limits.”'],
                ['“The system is safe.”', '“The specified tests found these failures and did not observe these other failures within documented coverage; remaining risks and gaps are listed.”'],
                ['“Users benefit.”', '“The study observed improvement in these outcomes for this population, baseline comparator, and total-time accounting.”'],
                ['“The judge is reliable.”', '“The judge showed this agreement and these error patterns on a held-out human-adjudicated assessment for this intended use.”'],
                ['“No subgroup bias exists.”', '“The assessment found these differences with these uncertainties; these groups or effects were not adequately assessed.”'],
                ['“The new version is better.”', '“The new version improved these outcomes under this comparison, with these cost, latency, or error tradeoffs.”'],
              ],
            },
          },
        ],
        keyTakeaways: [
          'Audit every claim across four questions: layer/dataset tested, baseline/harness parity, omitted tradeoffs/uncertainty, and strictly supported wording.',
          'Never invent undisclosed setup details or error bars when rewriting a third-party claim.',
        ],
      },
    ],
    practiceLab: {
      title: 'Practice Lab 7: Audit the Apex-7 Vendor Press Release',
      intro:
        'Apply the 4-question audit and claim-calibration table to dissect a fictional enterprise vendor pitch without inventing undisclosed details.',
      caseStudy: {
        stageTitle: 'Meridian Workshop — Stage 8: Auditing a Competing Vendor Pitch',
        narrative:
          'A competing vendor pitches Meridian with a headline: "94% on LeadingQA—the most intelligent research AI!" Your audit exposes the gaps: LeadingQA is an older public benchmark with contamination risk (Layer 2), the vendor omitted its retry/tool harness and baseline versions, and zero uncertainty bounds, cost/latency tradeoffs, or analyst-workflow results (Layer 5) were supplied. Meridian declines to buy on leaderboard hype alone.',
        keyDecisions: [
          'Require exact model snapshot, full harness disclosure, comparators, tradeoffs, and uncertainty before weighting external scores.',
          'Validate candidate tools on Meridian’s own private held-out packets and analyst workflow.',
        ],
      },
      misconceptions: [
        {
          myth: '“Ranking #1 on a public leaderboard proves a tool is best for our team.”',
          reality: 'Public leaderboards frequently suffer from contamination, hidden harnesses, Goodharting, and mismatched tasks—and establish nothing at Layer 5.',
        },
        {
          myth: '“Zero observed failures on a vendor safety check means zero production risk.”',
          reality: '0/100 independent trials still permits up to ~3% failure rate at 95% confidence and says nothing about unseen shifts or prompt injection.',
        },
      ],
      exercises: [
        {
          title: 'Exercise 7: Classify Claims & Audit the Apex-7 Press Release',
          objective: 'Classify individual statements, run an 8-point audit, and write a calibrated 2-sentence rewrite strictly bounded to supplied facts.',
          scenario:
            'Fictional vendor press release: "Our new model Apex-7 is the most intelligent AI system ever built, achieving #1 (92.4%) on ReasoningBench—proving it outperforms human experts and is safe for enterprise deployment." Also classify two companion pitch-deck bullets: (a) "Any hallucinated citation is unacceptable for client delivery," and (b) "Deploying Apex-7 will cut analyst research time by 40% next quarter."',
          instructions: [
            'Part A: Classify bullets (a) and (b) plus the press-release claims ("92.4% on ReasoningBench", "most intelligent", "outperforms human experts") as Empirical, Normative, Predictive, Mechanistic, Comparative, or Unsupported/Underspecified.',
            'Part B (8-point audit): Audit (1) scope & saturation, (2) comparator & version parity, (3) prompt/harness/retry disclosure, (4) contamination risk, (5) metric & aggregation details, (6) statistical uncertainty (N / CIs), (7) cross-layer transfer to enterprise workflows, and (8) missing safety & human-outcome evidence.',
            'Part C: Write a calibrated 2-sentence revision using ONLY facts supplied in the press release (do not invent prompt settings, sample sizes, or confidence intervals).',
          ],
          requiredOutput: 'Claim classifications, an 8-point audit list, and a strictly bounded 2-sentence rewrite.',
          evaluationCriteria: [
            'Accurately separates empirical claims from normative rules, predictions, and unsupported cross-layer leaps.',
            'Covers all 8 audit dimensions and does NOT invent undisclosed parameters in the rewrite.',
          ],
          strongExample:
            'Part A: Bullet (a) is Normative (acceptable-risk rule); Bullet (b) is Predictive/Unsupported (forecast without Layer 5 evidence); "92.4% on ReasoningBench" is Empirical (underspecified); "most intelligent" and "outperforms human experts" are Unsupported extrapolations. Part B: (1) scope/saturation undisclosed; (2) comparators & versions unnamed; (3) prompt, tool harness, and retries undisclosed; (4) contamination unaddressed; (5) metric/subgroups omitted; (6) N and CIs omitted; (7) Layer 2 benchmark cannot establish enterprise workflow readiness; (8) zero human-expert or safety evidence supplied. Part C: "The vendor reports that Apex-7 ranked #1 with a score of 92.4% on ReasoningBench, though the release omits the evaluation setup, comparator versions, sample size, and uncertainty interval. This single reported score does not establish general intelligence, superiority over human experts, or readiness and safety for enterprise deployment."',
          reflectionQuestion: 'What single missing detail in an AI press release makes you immediately skeptical of the headline number?',
        },
      ],
    },
    quiz: {
      intro: 'Complete the final module assessment for Module 7.',
      questions: [
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
            'C misinterprets 0/100 trials (~3% 95% upper bound under binomial assumptions).',
          ],
        },
        {
          id: 'm7-q2',
          question: 'Why can comparing two models on the same benchmark still be misleading if their harnesses differ?',
          options: [
            'Because token budgets, tool access, retries, and system prompts can drive large score differences independent of the base model.',
            'Because harnesses only affect UI styling.',
            'Because statistical uncertainty disappears when harnesses are used.',
          ],
          correctIndex: 0,
          correctExplanation: 'Harness choices (e.g., 10 retries with code execution vs. single-shot generation) fundamentally alter the evaluated system.',
          distractorNotes: [
            'B and C are false.',
          ],
        },
        {
          id: 'm7-q3',
          question: 'A pitch deck states: "Any hallucinated citation is unacceptable for client delivery." What type of statement is this?',
          options: [
            'An empirical test result.',
            'A normative / policy choice defining acceptable risk.',
            'A mechanistic explanation of how attention weights work.',
          ],
          correctIndex: 1,
          correctExplanation: 'Deciding which failures are unacceptable is a normative/product policy choice, not an empirical measurement.',
          distractorNotes: [
            'A and C are incorrect.',
          ],
        },
      ],
    },
    researchEvidence: [],
  },
];

import type { CourseModule } from './courseTypes';

export const COURSE_MODULES_PART_1: CourseModule[] = [
  /* ========================================================================
   * MODULE 1: Foundations of AI Evaluation (Chapters 1.1 – 1.4)
   * ======================================================================== */
  {
    id: 'm1',
    number: 1,
    title: 'Foundations of AI Evaluation',
    subtitle: 'What evals are, the 3 components, the 7 layers & units of analysis, validity, and the 4 operating rules',
    overview:
      'Build a rock-solid mental model of AI evaluation before touching tools or statistics. Across four focused chapters you will learn how evals complement unit tests, how Datasets, Rubrics, Judges, and telemetry work together, how the 7 layers and units of analysis bound every claim, and which four operating rules prevent teams from fooling themselves.',
    objectives: [
      'Explain what an AI eval is and how it complements deterministic unit tests across case distributions and repeated runs.',
      'Separate Dataset (Stimulus), Rubric (Criteria), Judge (Scorer), and production telemetry + scoring rules.',
      'Map any evaluation question to the right layer (Data & Inputs → Wider Impacts) and unit of analysis.',
      'Distinguish construct validity from external validity and apply the four operating rules from day one.',
    ],
    chapters: [
      {
        id: '1.1',
        code: 'Chapter 1.1',
        title: 'What an AI Eval Is (and How It Complements Unit Tests)',
        readMinutes: 5,
        summary:
          'Why traditional software tests are necessary but insufficient for stochastic AI systems—and how an eval measures behavior across cases and repeated runs.',
        sections: [
          {
            heading: 'A Clear, Operational Definition',
            paragraphs: [
              'An AI evaluation (eval) is a systematic process for judging how an AI model or AI-enabled system performs under defined conditions. You either give the system structured tasks or observe it in live use, collect concrete evidence of what happened, and apply explicit criteria to determine whether it met a goal.',
              'Notice two phrases that separate real evals from casual prompt tinkering: "under defined conditions" and "explicit criteria." Eyeballing three outputs in a playground tells you what happened on three lucky prompts. An eval freezes the inputs, system configuration, and pass/fail rules so you can compare versions honestly and detect regressions when you change a prompt, swap a model, or update a retriever.',
            ],
            callout: {
              kind: 'rule',
              title: 'Active testing vs. observing in use',
              body: 'Evals are not limited to offline test sets. You can elicit behavior proactively (offline task suites, red-team probes, controlled user trials) or observe behavior passively in production (logged conversations, citation edits, escalations). Both are evaluations as long as the conditions and scoring rules are explicit.',
            },
          },
          {
            heading: 'How Evals Complement Unit Tests',
            paragraphs: [
              'Engineers new to AI often ask: "Why can’t we just write unit tests?" The answer is that you still should—unit tests and evals do different jobs. Unit tests verify fixed, deterministic contracts: does the parser return valid JSON, does the tool reject negative quantities, does the API return HTTP 200?',
              'AI systems, however, operate over open-ended inputs and produce variable outputs. Even if you score every single output strictly as pass or fail, you still care about the pass rate across a distribution of realistic cases—and, when the model is non-deterministic, its stability across repeated runs of the same input. A single failing case in a unit test breaks the build immediately; in an AI eval, you inspect both the aggregate pass rate and the specific categories of failures to decide whether a change is a net improvement or introduced a hidden regression.',
            ],
            table: {
              headers: ['Dimension', 'Traditional Unit Test', 'AI Evaluation (Eval)'],
              rows: [
                ['Target', 'Fixed deterministic contracts (schemas, math, state invariants)', 'Quality, accuracy, safety, usefulness, or workflow impact under open-ended inputs'],
                ['Execution', 'Single deterministic run per assertion', 'Distribution of cases and, when outputs vary, repeated runs'],
                ['Scoring', 'Binary pass/fail on exact assertions', 'Binary pass/fail, anchored ordinal scales, pairwise comparisons, or task-time/cost metrics'],
                ['Decision signal', 'Any failure blocks merge', 'Pass rates, severity-weighted failure breakdowns, regressions, and cost/latency tradeoffs'],
              ],
            },
          },
          {
            heading: 'Why Aggregate Scores Alone Hide Regressions',
            paragraphs: [
              'One of the fastest ways to misread an eval is to look only at the headline percentage. Suppose Prompt v1 passes 1 of 2 return-policy cases (50%), and you edit the prompt to fix the failing case. Prompt v2 also scores 1 of 2 (50%)—not because nothing changed, but because v2 fixed Case 1 by blindly forcing a follow-up question that broke Case 2.',
              'Whenever you compare two versions, inspect case-level flips (passes that turned into failures and failures that turned into passes) alongside the overall rate. You will run this exact two-version comparison hands-on in Practice Lab 1.',
            ],
          },
        ],
        keyTakeaways: [
          'An AI eval judges a model or system under defined conditions using collected evidence and explicit criteria.',
          'Evals complement—never replace—unit tests by measuring performance across case distributions and repeated runs.',
          'Always inspect case-level regressions alongside aggregate pass rates when comparing versions.',
        ],
      },
      {
        id: '1.2',
        code: 'Chapter 1.2',
        title: 'The Three Components: Dataset, Rubric, and Judge',
        readMinutes: 6,
        summary:
          'Every credible evaluation makes three parts explicit—and separates raw production telemetry from the scoring rule that interprets it.',
        sections: [
          {
            heading: 'Making All Three Parts Explicit',
            paragraphs: [
              'When an evaluation feels vague or argumentative, one of three pieces is usually implicit. Every eval—from a 10-minute prompt check to a multi-week enterprise pilot—should state its Dataset, Rubric, and Judge explicitly.',
            ],
            bullets: [
              {
                label: '1. Dataset (Stimulus / Test Cases)',
                text: 'The inputs, scenarios, source documents, or real-world production logs used to elicit or observe system behavior. A dataset defines what slice of reality you are actually testing.',
              },
              {
                label: '2. Rubric (Criteria)',
                text: 'The observable definition of what counts as accurate, useful, safe, or failing. Good rubrics specify concrete observable conditions ("must not use causal verbs for observational studies") rather than vague adjectives ("be accurate").',
              },
              {
                label: '3. Judge (Scorer)',
                text: 'The mechanism that applies the rubric to produce scores: deterministic code assertions, a human domain reviewer, or a calibrated LLM grader—often combined in a hybrid pipeline.',
              },
            ],
          },
          {
            heading: 'Where Production Telemetry Fits',
            paragraphs: [
              'Teams deploying AI in production often confuse telemetry with an evaluation metric. Logging that an analyst edited a generated citation, clicked "regenerate," or abandoned a draft is valuable—but telemetry only supplies raw behavioral evidence.',
              'An explicit scoring rule is still required to determine how that evidence counts. Does a citation edit count as a factual error, a formatting preference, or an outdated source link? Without a written scoring rule and periodic human spot-checks, raw telemetry is easy to misinterpret: users may stop editing outputs not because accuracy improved, but because they gave up checking.',
            ],
            callout: {
              kind: 'example',
              title: 'Meridian example: Telemetry vs. Scoring Rule',
              body: 'Telemetry records: "Analyst deleted Citation #3 in 14% of briefs." Scoring rule defines: "Audit a stratified sample of 30 deleted citations per week; count a deletion as a source-fidelity failure only when the cited passage does not support the claim (excluding stylistic trims)."',
            },
          },
          {
            heading: 'Separating Empirical Facts, Policy Choices, and Recommendations',
            paragraphs: [
              'Clear evaluation writing keeps three kinds of statements distinct so stakeholders can debate priorities without arguing over facts:',
            ],
            bullets: [
              {
                label: 'Empirical observation',
                text: 'What the data showed under the tested setup (e.g., "Prompt v2 passed 18/20 private return cases and failed 2/20").',
              },
              {
                label: 'Normative / policy choice',
                text: 'What your team refuses to accept (e.g., "Any fabricated citation or unauthorized data leak blocks release").',
              },
              {
                label: 'Practical recommendation',
                text: 'The action justified by combining the observations with those priorities and constraints (e.g., "Hold launch until retrieval recall exceeds 90% on private packets").',
              },
            ],
          },
        ],
        keyTakeaways: [
          'Always specify Dataset (Stimulus), Rubric (Criteria), and Judge (Scorer) explicitly.',
          'Production telemetry supplies raw behavioral evidence—a scoring rule determines how that evidence counts.',
          'Keep empirical observations, normative policy choices, and deployment recommendations separate.',
        ],
      },
      {
        id: '1.3',
        code: 'Chapter 1.3',
        title: 'The Seven Layers & Units of Analysis',
        readMinutes: 7,
        summary:
          'Why most AI evaluation arguments happen because teams mix up layers or units of analysis—and how to map every question cleanly from Data & Inputs to Wider Impacts.',
        sections: [
          {
            heading: 'Two Scoping Choices That Define What You Measure',
            paragraphs: [
              'Before picking a metric or writing a single test case, two scoping choices determine what your evaluation can and cannot prove: the layer (where in the stack you are measuring) and the unit of analysis (what one data point represents when you aggregate or compare results).',
              'Most real-world evaluation failures are layer-mismatch errors: a team measures Layer 2 (model accuracy on isolated snippets) and uses that score to claim Layer 5 (analysts finish verified briefs faster) or Layer 6 (team ROI improved).',
            ],
            table: {
              headers: ['# · Layer', 'Core Question (Meridian Example)', 'Possible Unit of Analysis', 'Cross-Layer Caution'],
              rows: [
                ['1. Data & Inputs', 'Do source packets cover the evidence analysts actually encounter?', 'Source packet / input category', 'Clean, unrepresentative packets hide real-world parsing and coverage failures.'],
                ['2. Isolated Model', 'Are the model’s claims supported by the sources it receives?', 'Claim or response', 'High model scores do not prove product success—and workflow verification can catch occasional model errors.'],
                ['3. Component', 'Does retrieval surface the most relevant documents?', 'Search query / tool call', 'Good retrieval does not guarantee faithful synthesis or low user verification cost.'],
                ['4. Workflow / Agent', 'Does the system preserve citations across a full brief revision?', 'End-to-end run', 'Automated workflow completion does not prove users produce better final work or save total time.'],
                ['5. Human–AI Interaction', 'Can analysts catch and correct an unsupported conclusion?', 'Task session or analyst', 'A factually accurate model can still fail if the interface makes verification too costly.'],
                ['6. Organizational', 'Do teams produce verified briefs faster after adoption?', 'Team or team-week', 'Local team speedups can still add review bottlenecks, maintenance cost, or errors elsewhere.'],
                ['7. Wider Impacts', 'Does access to reliable research improve across language groups?', 'Language community / group', 'Product-level averages can conceal disparities across languages, regions, or affected groups.'],
              ],
            },
            diagram: 'scopes',
          },
          {
            heading: 'One Layer Can Hold Multiple Units of Analysis',
            paragraphs: [
              'Choosing a layer does not automatically fix your unit of analysis. At Layer 5 (Human–AI Interaction), suppose 20 analysts each complete 10 research-brief tasks. You now have 200 logged task outcomes—but those 200 outcomes are not 200 independent analysts. Each analyst has their own reading speed, skepticism level, and domain skill.',
              'If your question is "What fraction of briefs contained an unsupported claim?", the brief (task outcome) is your reporting unit—and you still account for analyst clustering when computing error bars. If your question is "Do analysts succeed more often with Interface B than Interface A?", each analyst’s paired success rate across the two interfaces makes the analyst (N = 20, not 200) your unit of analysis. Confusing these two units is the #1 cause of fake statistical significance in AI evaluations (covered in depth in Chapter 4.1).',
            ],
            callout: {
              kind: 'example',
              title: '20 analysts × 10 tasks',
              body: 'Recording 200 task outcomes gives you richer precision per analyst, but it does not turn 20 people into 200 independent people. Always name what one row represents when you aggregate or compare.',
            },
          },
          {
            heading: 'The Bidirectional Cross-Layer Rule',
            paragraphs: [
              'Passing a lower-layer eval alone cannot establish higher-layer success—but the relationship works in both directions, and understanding both saves enormous engineering time:',
            ],
            bullets: [
              {
                label: 'Lower-layer pass ≠ higher-layer win',
                text: 'A model with 96% factual accuracy at Layer 2 can still fail at Layer 5 if its UI buries source citations behind three clicks, making verification slower than doing the work manually.',
              },
              {
                label: 'Lower-layer imperfection ≠ higher-layer failure',
                text: 'A model that occasionally makes a subtle drafting mistake at Layer 2 can still power a highly reliable Layer 4/5 workflow if deterministic verifiers or clear inline source highlights let analysts spot and fix errors in seconds.',
              },
            ],
          },
        ],
        keyTakeaways: [
          'Always locate your evaluation across the 7 layers (Data & Inputs → Wider Impacts) and name the exact unit of analysis.',
          'One layer can contain multiple units (e.g., 200 task outcomes nested inside 20 analysts); never treat clustered trials as independent users.',
          'Lower-layer passes never guarantee higher-layer success, and higher-layer verification can compensate for occasional lower-layer errors.',
        ],
        toolLink: {
          tool: 'taxonomy-tool',
          label: 'Open Metrics Taxonomy Tool',
          description: 'Browse 29 evaluation metrics organized directly by these 7 layers and units of analysis.',
        },
      },
      {
        id: '1.4',
        code: 'Chapter 1.4',
        title: 'Validity & the Four Operating Rules',
        readMinutes: 6,
        summary:
          'How to tell whether a score actually supports the claim you want to make—and four practical rules that govern every real-world evaluation.',
        sections: [
          {
            heading: 'Validity: What a Score Actually Supports',
            paragraphs: [
              'Validity is not a fixed badge on a dataset; it concerns the claim you make from a score. A test can be 100% deterministic, repeatable, and fast—and still measure the wrong thing. Before trusting any evaluation result, ask two foundational questions (we expand this into the full 3-pillar framework in Chapter 4.3):',
            ],
            bullets: [
              {
                label: 'Construct validity — Are we measuring the actual goal?',
                text: 'A rubric intended to measure factual faithfulness can inadvertently reward fluent prose, verbosity, or polite hedging. In our return-policy example, a naive rule rewarding "any follow-up question" fails construct validity because it passes a bot that ignores what the customer just stated.',
              },
              {
                label: 'External validity — Do results generalize to the conditions we care about?',
                text: 'Clean, single-turn English prompts tell you very little about messy PDFs, multi-turn revisions, shifting production distributions, non-English queries, or time-pressured users.',
              },
            ],
          },
          {
            heading: 'The Four Operating Rules of Practical AI Evaluation',
            paragraphs: [
              'Across startups, research labs, and enterprise deployments, four operating rules prevent the vast majority of wasted effort and misleading launch decisions:',
            ],
            bullets: [
              {
                label: 'Rule 1 — Start with the decision',
                text: 'Every eval exists to reduce uncertainty for a specific decision (debug a prompt, pick a retriever, approve a pilot, audit a vendor). The decision determines the layer, the unit of analysis, the baseline, and the required statistical rigor.',
              },
              {
                label: 'Rule 2 — Treat the eval as the spec',
                text: 'Define concrete failure modes and grading criteria on a small set of real examples before iterating on prompts or architecture. Expect your criteria to sharpen during exploratory error analysis, then lock them before running confirmatory tests.',
              },
              {
                label: 'Rule 3 — Account for benchmark contamination',
                text: 'Public test cases frequently enter model training corpora or prompt heuristics. Public benchmarks are fine for rough orientation, but real deployment decisions require private, periodically refreshed cases drawn from your own domain.',
              },
              {
                label: 'Rule 4 — Watch for Goodhart’s Law',
                text: 'When a metric becomes an optimization target, it stops being a reliable measure. Optimizing a single quality score can blow up latency, dollar cost, verbosity, or human audit time. Always pair your primary metric with tradeoff guardrails.',
              },
            ],
            callout: {
              kind: 'warning',
              title: 'Goodhart’s Law in practice',
              body: 'If you optimize solely for "citation count" or "detailed answers," models quickly learn to pad responses with lengthy text and redundant citations—raising automated scores while increasing human verification time.',
            },
          },
        ],
        keyTakeaways: [
          'Repeatability is not validity: check construct validity (right goal?) and external validity (real-world transfer?).',
          'Start with the decision, treat the eval as the spec on real examples, use private refreshed sets against contamination, and pair primary metrics with tradeoff guardrails.',
        ],
        furtherReading: [
          { label: 'Google People + AI Guidebook', type: 'Industry guidance', url: 'https://pair.withgoogle.com/guidebook/' },
        ],
      },
    ],
    practiceLab: {
      title: 'Practice Lab 1: Run Your First Eval & Map the Layers',
      intro:
        'Put Module 1’s theory into action. First score two prompt versions interactively to see how tied aggregate scores hide regressions and construct-validity traps; then map the Meridian Research Assistant case study and author Case 3.',
      interactiveWidget: 'first-eval',
      caseStudy: {
        stageTitle: 'Meridian Workshop — Stage 1: Mapping Before Testing',
        narrative:
          'Meridian Corp wants an AI assistant to summarize empirical research papers for analysts. Before arguing over public model leaderboards, you map the system across layers: do our source packets represent real analyst PDFs (Layer 1: Data & Inputs), do generated claims match those sources (Layer 2: Isolated Model), does retrieval surface the right passages (Layer 3: Component), and can analysts catch unsupported claims without losing time (Layer 5: Human–AI Interaction)? You start with a crisp 5-excerpt check at Layer 2.',
        keyDecisions: [
          'Write an explicit observable rubric (every quantitative figure must match the source and preserve qualifiers) before iterating on prompts.',
          'Bound the claim: passing 5 excerpt checks gives Layer 2 evidence on claim faithfulness—not proof that analysts save time at Layer 5.',
        ],
      },
      misconceptions: [
        {
          myth: '“Unit tests already cover our AI features.”',
          reality:
            'Unit tests verify fixed deterministic contracts like JSON schemas. Evals measure performance across distributions of open-ended cases and repeated runs—even when each run is scored pass/fail.',
        },
        {
          myth: '“Passing a model benchmark means the product will work.”',
          reality:
            'Passing Layer 2 alone cannot establish Layer 4/5 success: a factually accurate model can still fail if retrieval misses key passages or the UI makes verification too costly.',
        },
      ],
      exercises: [
        {
          title: 'Exercise 1: Write Case 3, Name the Layer & Unit, and Bound the Claim',
          objective: 'Extend the return-policy eval with a third case, identify its layer and unit of analysis, and state construct/external validity limits.',
          scenario:
            'Using the return policy ("Unused items can be returned within 30 days"), you just scored Case 1 (12 days ago, condition unspecified) and Case 2 (12 days ago, item unused). Both Prompt v1 and Prompt v2 scored 1/2 overall, but v2 passed Case 1 and regressed on Case 2.',
          instructions: [
            'Write Case 3 testing a different failure mode of this same policy (for example, an item bought 45 days ago, or an item the customer says they already wore).',
            'State the observable pass rule, one concrete failing answer, the evaluation layer (from the 7 layers), and the unit of analysis.',
            'In 2 sentences, explain why Prompt v2 is not automatically better than v1 despite fixing Case 1, and state one external-validity limit of passing all three return cases.',
          ],
          requiredOutput: 'Case 3 (message, pass rule, sample failure, layer + unit) plus a 2-sentence interpretation.',
          evaluationCriteria: [
            'Case 3 tests the stated 30-day / unused rule without inventing unstated policies and correctly names Layer 2/4 and response as the unit.',
            'Calls out the Case 2 regression hidden by the tied 1/2 score and bounds external validity to 30-day returns.',
          ],
          strongExample:
            'Case 3 — Customer: "I bought this 45 days ago and never opened it. Can I return it?" Pass rule: State the item is outside the 30-day window and do not promise a return. Sample failure: "Since it is unused, you can return it." Layer & Unit: Isolated Model / Workflow response (1 customer reply = 1 unit). Interpretation: Prompt v2 fixed Case 1 by regressing on Case 2, so the tied 1/2 aggregate score hides a real trade-off; externally, passing clean 30-day return cases tells us nothing about lost accounts, billing disputes, or messy multi-turn chats.',
          reflectionQuestion: 'What single real input from your own system would immediately expose a weak rubric or prompt regression if you tested it today?',
        },
      ],
    },
    quiz: {
      intro: 'Test your mastery across Chapters 1.1–1.4 before moving to Module 2.',
      questions: [
        {
          id: 'm1-q1',
          question: 'Prompt v1 fails Case 1 and passes Case 2 (1/2). Prompt v2 passes Case 1 and fails Case 2 (1/2). What does the tied 1/2 score hide?',
          options: [
            'Nothing—identical total scores mean the two versions behave identically.',
            'Prompt v2 introduced a regression on Case 2 while fixing Case 1.',
            'Case 2 should be deleted so Prompt v2 scores 100%.',
          ],
          correctIndex: 1,
          correctExplanation: 'Case-level inspection shows Prompt v2 broke a case v1 handled correctly, even though both scored 1/2.',
          distractorNotes: [
            'A ignores per-case regressions hidden inside aggregate totals.',
            'C is cherry-picking, which destroys diagnostic value.',
          ],
        },
        {
          id: 'm1-q2',
          question: '20 analysts each complete 10 brief-writing tasks, and you compare each analyst’s success rate across two interfaces. What is your unit of analysis for that comparison?',
          options: [
            'The 200 individual task outcomes treated as 200 independent analysts.',
            'The analyst (20 analysts, each summarizing 10 tasks).',
            'Individual sentences inside each brief.',
          ],
          correctIndex: 1,
          correctExplanation: 'You logged 200 task outcomes, but comparing each analyst’s rate across two interfaces makes the analyst (N = 20) the unit of analysis.',
          distractorNotes: [
            'A treats clustered tasks as independent people, inflating statistical confidence.',
            'C is below the comparison unit.',
          ],
        },
        {
          id: 'm1-q3',
          question: 'Production logs show analysts edited 14% of AI-generated citations last week. Which statement accurately describes that telemetry signal?',
          options: [
            'It proves the model has a 14% hallucination rate.',
            'It supplies raw behavioral evidence; an explicit scoring rule and audit are still needed to determine how edits count.',
            'Telemetry cannot be used in AI evaluation.',
          ],
          correctIndex: 1,
          correctExplanation: 'Telemetry provides raw evidence (edits could be stylistic trims or real errors); a scoring rule determines how it counts.',
          distractorNotes: [
            'A conflates edits with hallucinations without a scoring rule.',
            'C is false: telemetry paired with scoring rules is a core production judge.',
          ],
        },
        {
          id: 'm1-q4',
          question: 'A rubric meant to measure factual accuracy inadvertently rewards longer, more polished responses. Which validity threat is this?',
          options: [
            'Construct validity failure (measuring polish/length instead of the actual goal).',
            'Benchmark contamination.',
            'Unit-test determinism.',
          ],
          correctIndex: 0,
          correctExplanation: 'Construct validity asks whether the test measures the real goal rather than irrelevant surface artifacts like verbosity or polish.',
          distractorNotes: [
            'B refers to test cases leaking into training data.',
            'C is unrelated.',
          ],
        },
      ],
    },
    researchEvidence: [],
  },

  /* ========================================================================
   * MODULE 2: Scoping & Datasets (Chapters 2.1 – 2.4)
   * ======================================================================== */
  {
    id: 'm2',
    number: 2,
    title: 'Scoping & Datasets',
    subtitle: 'Decision-first framing, baselines, pinned harnesses, error analysis, case types, and unbiased sampling',
    overview:
      'Turn Operating Rules 1–3 into concrete engineering practice. Across four focused chapters you will learn how to choose the right baseline (including simpler non-AI fixes), pin full harnesses against contamination, discover real failure modes via trace analysis before writing prompts, and separate challenge sets from representative traffic samples.',
    objectives: [
      'Scope an evaluation from a concrete decision—selecting layer, unit of analysis, and a credible baseline (current workflow, simpler non-AI fix, or prior pinned version).',
      'Pin the full execution harness, separate exploratory tuning from confirmatory testing, and guard against contamination with private refreshed cases.',
      'Apply trace and error analysis to build ordinary, ambiguous, and escalation/abstention test cases.',
      'Separate discovery, representative, challenge, and regression sampling so stress-test failure rates are never misread as everyday prevalence.',
    ],
    chapters: [
      {
        id: '2.1',
        code: 'Chapter 2.1',
        title: 'Starting With the Decision: Layer, Unit & Credible Baselines',
        readMinutes: 6,
        summary:
          'Why "evaluate this AI" is unanswerable until you name the decision—and why comparing against a credible simpler non-AI fix prevents expensive mistakes.',
        sections: [
          {
            heading: 'From Vague Request to Answerable Question',
            paragraphs: [
              '"Can you evaluate our new AI assistant?" is not an evaluation plan. An answerable question names six specifics: the system/harness, the task, the target population, the comparator baseline, the desired outcomes (including tradeoffs), and the decision that hinges on the result.',
              'Consider Meridian’s question: "For analysts synthesizing 5 empirical papers, does our pinned AI assistant improve blinded synthesis quality without increasing unsupported claims or total task time compared with our upgraded search + checklist workflow?" That single sentence immediately fixes the layer (Layer 5), unit of analysis (task session / analyst), comparator, and release gates.',
            ],
          },
          {
            heading: 'Three Legitimate Product Options (Do You Even Need AI?)',
            paragraphs: [
              'For workplace or product adoption decisions, comparing an AI prototype only against a broken legacy workflow guarantees misleading wins. Put three equally legitimate options on the table before running a single model call:',
            ],
            bullets: [
              {
                label: 'Option 1 — Keep the current workflow',
                text: 'Often optimal when error costs are high, volume is low, or existing tools already meet quality bars.',
              },
              {
                label: 'Option 2 — Ship a credible simpler non-AI change',
                text: 'Better full-text search, cleaner permissions, structured forms, or a 1-page review checklist. At Meridian, interviews showed 25 of 74 minutes were wasted hunting for PDFs and guessing headings—problems a non-AI fix solves at near-zero cost and zero hallucination risk.',
              },
              {
                label: 'Option 3 — Test AI against that upgraded baseline',
                text: 'Justified when a real bottleneck remains after low-hanging workflow friction is removed, and you verify AI beats the simpler fix cleanly.',
              },
            ],
            callout: {
              kind: 'rule',
              title: 'Scientific studies vs. product launch gates',
              body: 'Not every eval is a product-adoption decision. A scientific capability study at Layer 2 (e.g., probing how a model handles reasoning perturbations) is completely valid without shipping a product—just never present a Layer 2 capability result as a Layer 5 adoption proof.',
            },
          },
        ],
        keyTakeaways: [
          'Name the decision, layer, unit of analysis, task, population, and comparator before designing tests.',
          'Compare AI against a credible simpler non-AI fix (not just a broken legacy process); choosing the simpler fix is a strong evaluation win.',
        ],
      },
      {
        id: '2.2',
        code: 'Chapter 2.2',
        title: 'Pinning the Harness, Modes & Contamination Defense',
        readMinutes: 6,
        summary:
          'Why an agent eval tests far more than model weights, why exploratory tuning must never masquerade as confirmation, and how to defend against training leakage.',
        sections: [
          {
            heading: 'Pin the Entire Execution Harness',
            paragraphs: [
              'In modern AI applications, swapping a base model often moves scores less than changing the surrounding harness. As Anthropic’s agent-evaluation guidance emphasizes, an agent or RAG product is the model working together with its prompts, retrieval index, chunking rules, tool schemas, permissions, memory, temperature, and retry/stopping logic.',
              'If Version B gets 3 automatic retries with web search while Version A runs single-shot with a stale index, you are not comparing models—you are comparing harnesses. Pin every component version and record exact configuration hashes alongside every eval run.',
            ],
          },
          {
            heading: 'Exploratory vs. Confirmatory Modes',
            paragraphs: [
              'Good evaluation teams use both exploratory and confirmatory modes, but they never blur them together:',
            ],
            table: {
              headers: ['Mode', 'Primary Goal', 'How Criteria & Data Are Handled'],
              rows: [
                ['Exploratory', 'Discover failure modes, edge cases, user friction, and missing rubric rules.', 'Inspect outputs freely; refine prompts, datasets, and rubrics iteratively as new failure patterns appear.'],
                ['Confirmatory', 'Test a pre-specified claim or ship/no-ship decision rule.', 'Lock primary metrics, baselines, thresholds, and analysis plan BEFORE inspecting the held-out confirmatory set.'],
              ],
            },
            callout: {
              kind: 'warning',
              title: 'Overfitting to your own eval',
              body: 'If you tune prompts and rubrics over 15 iterations on the same 50 cases until pass rate hits 96%, that 96% is a training score—not an independent estimate of how the system will behave on next week’s unseen traffic.',
            },
          },
          {
            heading: 'Defending Against Contamination & Coverage Blind Spots',
            paragraphs: [
              'Public benchmarks routinely leak into pretraining corpora, post-training mixtures, or vendor prompt engineering. Even when training data provenance is opaque, treat high public-benchmark scores as unverified for deployment. Maintain a private, access-controlled domain set refreshed regularly from real inputs, and document explicitly what your test set does NOT cover (missing languages, document lengths, or user roles)—following HELM’s principle that a map of missing coverage is part of the result.',
            ],
          },
        ],
        keyTakeaways: [
          'Pin the full harness (model snapshot, prompts, retrieval index, tools, permissions, retries) on every run.',
          'Use exploratory runs to discover failures and refine specs, then lock criteria and run confirmatory checks on a fresh held-out set.',
          'Use private, periodically refreshed domain cases to defend against benchmark contamination, and document coverage exclusions explicitly.',
        ],
      },
      {
        id: '2.3',
        code: 'Chapter 2.3',
        title: 'Error Analysis First: Treating the Eval as the Spec',
        readMinutes: 6,
        summary:
          'How to build high-signal datasets by reading real traces before tuning prompts—and covering ordinary, ambiguous, and escalation cases.',
        sections: [
          {
            heading: 'Read Real Traces Before Writing Code or Prompts',
            paragraphs: [
              'Operating Rule 2 says treat the eval as the spec. The most common engineering mistake is jumping straight into prompt engineering or buying an off-the-shelf "hallucination metric" before looking at actual failure modes.',
              'Instead, pull 30–50 real user queries and full execution traces (inputs, retrieved chunks, tool calls, final answers) and read them line by line (trace and error analysis, as emphasized by Husain & Shankar). Tag concrete failure modes in plain language—for example, "invented causal claim from observational survey," "retrieved wrong fiscal quarter," or "answered confidently when document was missing." Those observed failure modes become your evaluation spec.',
            ],
          },
          {
            heading: 'Three Case Types Every Practical Suite Needs',
            paragraphs: [
              'Happy-path prompts make demos look great while leaving production brittle. Structure your Dataset (Stimulus) across three explicit situations, each paired with observable expected behavior:',
            ],
            bullets: [
              {
                label: '1. Ordinary cases',
                text: 'All required facts are clear and in-policy (e.g., unused item bought 10 days ago → confirm return directly without redundant questions; two clean RCTs → summarize effect sizes accurately).',
              },
              {
                label: '2. Ambiguous / borderline cases',
                text: 'A crucial detail is missing or borderline (e.g., "I opened the outer shipping box to check the color" → clarify item condition before promising a return; observational abstract using suggestive wording → preserve non-causal language).',
              },
              {
                label: '3. Escalation / abstention cases',
                text: 'High-stakes exceptions or out-of-corpus requests (e.g., a $650 damaged monitor or a question about a confidential M&A deal not in the corpus → escalate to a human or abstain cleanly rather than guess).',
              },
            ],
          },
          {
            heading: 'Matching Evidence Methods Across a Staged Pipeline',
            paragraphs: [
              'Fast automated checks catch regressions cheaply on every commit, while representative workflow trials and live monitoring establish real-world value. Match your method to the question you are asking:',
            ],
            diagram: 'pipeline',
            table: {
              headers: ['Method', 'What It Establishes', 'Main Limitation'],
              rows: [
                ['Benchmarks & executable tests', 'Performance on specified tasks or invariants.', 'Generalization beyond tested cases requires evidence.'],
                ['Trace & error analysis', 'Recurring failures across inputs, retrieval, and tool calls.', 'Logs may omit user intent or abandoned work.'],
                ['Adversarial testing / red teaming', 'Whether specific exploit or failure paths exist.', 'Does not estimate ordinary-use prevalence.'],
                ['Observed task studies & RCTs', 'Causal workflow impact and real user friction.', 'Study setting can differ from routine work.'],
                ['Field monitoring', 'Live behavior, incidents, cost, and drift in production.', 'Confounding and missing labels complicate inference.'],
              ],
            },
          },
        ],
        keyTakeaways: [
          'Inspect 30–50 real traces first so your evaluation criteria reflect real failure modes rather than generic guesses.',
          'Cover ordinary, ambiguous, and escalation/abstention cases with explicit observable expected behavior.',
          'Layer fast automated/trace gates early, workflow studies pre-launch, and live monitoring post-launch.',
        ],
        trackLink: {
          label: 'Optional Advanced Track A: RAG Evaluation',
          description: 'Need retrieval-specific metrics (Precision@k, Recall@k, MRR, NDCG@k) and a 100-item RAG dataset design?',
        },
      },
      {
        id: '2.4',
        code: 'Chapter 2.4',
        title: 'Sampling Without Bias: Challenge vs. Representative Sets',
        readMinutes: 5,
        summary:
          'Why mixing stress-test edge cases with everyday traffic samples ruins prevalence estimates—and how to use synthetic data honestly.',
        sections: [
          {
            heading: 'Four Distinct Sampling Purposes',
            paragraphs: [
              'Every dataset is a sample, and how you sampled it strictly controls what conclusions you can draw. Never lump four different sampling purposes into a single reported pass rate:',
            ],
            table: {
              headers: ['Sampling Purpose', 'What It Is Built For', 'What It Cannot Tell You'],
              rows: [
                ['Discovery sampling', 'Pulling unusual, complained-about, or broken traces to uncover new failure modes.', 'Cannot estimate everyday production failure rates.'],
                ['Representative sampling', 'Random or stratified sampling of real production traffic or target domain tasks.', 'Only valid for the population, period, and slices actually sampled.'],
                ['Challenge / adversarial sampling', 'Deliberately stressing hard edge cases, ambiguities, and attack paths.', 'A 40% failure rate here does NOT mean 40% of real users see failures.'],
                ['Regression collections', 'Preserving previously fixed bugs to guarantee new versions do not backslide.', 'Passing 100% of old bugs never proves new capabilities or unseen safety.'],
              ],
            },
            callout: {
              kind: 'warning',
              title: 'The complaint-enriched dataset trap',
              body: 'Building an eval set from support tickets and thumbs-down logs is fantastic for discovery and regression testing—but reporting its 38% failure rate to leadership as "our production error rate" is statistically wrong because failing cases were deliberately oversampled.',
            },
          },
          {
            heading: 'Using Synthetic Data Without Fooling Yourself',
            paragraphs: [
              'LLM-generated synthetic cases are fast and useful for probing specific edge conditions (e.g., generating 50 variations of multi-currency invoices or indirect prompt injections). However, synthetic data reflects the generator model’s style, vocabulary, and blind spots—often producing unnaturally clean phrasing that misses real-world typos, broken PDFs, and ambiguous user intent.',
              'Treat synthetic cases as a targeted probe or supplement—never as a substitute for real domain logs when estimating production performance. Always audit synthetic cases for realism and domain coverage.',
            ],
          },
        ],
        keyTakeaways: [
          'Report representative traffic samples separately from challenge, discovery, and regression suites.',
          'Only a representative sample estimates everyday production prevalence; challenge sets expose weaknesses fast.',
          'Use synthetic cases to probe specific scenarios, never to claim real-world prevalence.',
        ],
        furtherReading: [
          { label: 'Husain & Shankar: Error & Trace Analysis Guidance', type: 'Industry guidance', url: 'https://hamel.dev/blog/posts/evals/' },
        ],
      },
    ],
    practiceLab: {
      title: 'Practice Lab 2: Scope a Baseline & Author Real Test Cases',
      intro:
        'Apply Chapters 2.1–2.4 in two hands-on exercises: first scope a 3-option baseline decision for Meridian, then write ordinary, ambiguous, and escalation test cases with proper sampling boundaries.',
      caseStudy: {
        stageTitle: 'Meridian Workshop — Stages 2 & 3: Baseline Scoping & Private Case Suite',
        narrative:
          'Meridian analysts spend 74 minutes writing a 5-paper brief, losing 25 minutes hunting for PDFs in messy folders and guessing headings. You compare three baselines: (1) current workflow, (2) centralized full-text search + a mandatory 1-page Limitations checklist, and (3) a pinned RAG drafting harness tested against Option 2. Reading 40 real traces exposes three recurring flaws—causal verbs on surveys, omitted limitations, and guesses on missing files—so you build a private suite separating ordinary, ambiguous, and out-of-corpus escalation cases from a representative weekly sample.',
        keyDecisions: [
          'Test AI against the upgraded search + checklist baseline—not against broken folders.',
          'Keep challenge/edge-case packets reported separately from representative weekly analyst queries.',
        ],
      },
      misconceptions: [
        {
          myth: '“A 40% failure rate on our edge-case challenge suite means 40% of real users see failures.”',
          reality: 'Challenge sets intentionally oversample hard cases to surface weaknesses quickly; only a representative sample estimates everyday prevalence.',
        },
        {
          myth: '“Testing the base model is enough when evaluating a RAG or agent product.”',
          reality: 'Prompts, retrieval top-k, tool permissions, memory, and retry rules often swing performance more than swapping base models—always pin the full harness.',
        },
      ],
      exercises: [
        {
          title: 'Exercise 2A: Scope a Decision, Baseline & Contamination Guard',
          objective: 'Compare current workflow, a simpler non-AI fix, and AI, while specifying layer, unit, pinned harness, and contamination defense.',
          scenario:
            'At Meridian, analysts complain that summarizing 5 empirical PDFs takes too long and briefs omit study limitations. Two root causes appear in interviews: (a) PDFs are poorly indexed across shared drives, and (b) analysts have no standard template reminding them to include a Limitations section.',
          instructions: [
            'Specify three options: (1) Current workflow, (2) A credible simpler non-AI change addressing both root causes, and (3) AI assistance.',
            'Name the layer and unit of analysis required to decide whether AI beats Option 2, plus two harness parameters you must pin.',
            'State what evidence justifies stopping at Option 2 vs. testing AI, and one rule preventing contamination or exploratory overfitting.',
          ],
          requiredOutput: 'A concise 3-option scoping brief with layer, unit, pinned harness, decision rule, and contamination guard.',
          evaluationCriteria: [
            'Treats the simpler non-AI fix as a genuine baseline addressing indexing and templates.',
            'Matches Layer 5 (Human–AI) and task session/analyst unit to the launch decision and keeps private confirmatory packets held out from tuning.',
          ],
          strongExample:
            'Options: (1) Manual shared-drive search, no template; (2) Full-text PDF search + mandatory 1-page brief template with a Limitations section; (3) Pinned RAG drafting assistant tested against Option 2. Layer & Unit: Layer 5 (Human–AI Interaction), unit = task session / analyst; pin model snapshot, retrieval index/top-k, system prompt, and retry cap. Decision rule: Stop at Option 2 if search + template resolves retrieval delays and missing Limitations at zero hallucination risk; test AI only if synthesis drafting remains the bottleneck. Guardrail: Use newly collected private Meridian packets locked out from prompt tuning.',
          reflectionQuestion: 'In a project you work on, is AI currently compared against a strong non-AI baseline—or only against a broken process?',
        },
        {
          title: 'Exercise 2B: Write Ordinary, Ambiguous & Escalation Cases',
          objective: 'Author three distinct test cases with observable pass/fail criteria and explain challenge vs. representative sampling.',
          scenario:
            'Return-Policy Assistant rule: "Unused items can be returned within 30 days; damaged-on-arrival items and disputes over $500 must be escalated to a human agent."',
          instructions: [
            'Write 1 ordinary case, 1 ambiguous case (e.g., opened outer shipping box), and 1 escalation case (e.g., $650 damaged monitor), each with observable expected behavior.',
            'In 2 sentences, explain why 20 difficult/ambiguous cases are valuable—and why a 35% failure rate on those 20 cases cannot be reported as the everyday customer failure rate.',
          ],
          requiredOutput: 'Three cases with observable expected behaviors plus a 2-sentence sampling note.',
          evaluationCriteria: [
            'All three cases follow the policy and specify observable behavior.',
            'Accurately distinguishes challenge sampling (weakness discovery) from representative sampling (prevalence).',
          ],
          strongExample:
            '1) Ordinary: "Bought 10 days ago, sealed and unused. Can I return it?" Expected: Confirm eligibility directly without re-asking if used. 2) Ambiguous: "Bought 15 days ago; opened the outer box to check color, item unused." Expected: Clarify whether the product packaging/seal was opened before promising a return. 3) Escalation: "My $650 monitor arrived cracked 3 days ago." Expected: Escalate immediately to a human agent without auto-approving or auto-denying. Sampling note: 20 deliberately hard cases expose brittle rules fast, but because they oversample rare edge cases, a 35% failure rate cannot estimate everyday customer failure rates.',
          reflectionQuestion: 'Which failure mode in your own product is currently untested because your eval set only contains happy-path examples?',
        },
      ],
    },
    quiz: {
      intro: 'Check your understanding of Chapters 2.1–2.4 before moving to Module 3.',
      questions: [
        {
          id: 'm2-q1',
          question: 'Why compare an AI assistant against a credible simpler non-AI fix (like better search or a checklist) instead of only a broken legacy workflow?',
          options: [
            'Because comparing only against a broken workflow can credit AI for gains a cheaper, lower-risk non-AI fix would already deliver.',
            'Because non-AI baselines are legally required in all benchmarks.',
            'Because Layer 2 model evals cannot run without a UI.',
          ],
          correctIndex: 0,
          correctExplanation: 'A credible simpler comparator tests whether AI adds real value beyond straightforward workflow improvements.',
          distractorNotes: [
            'B and C are false.',
          ],
        },
        {
          id: 'm2-q2',
          question: 'Why must exploratory and confirmatory evaluation modes be kept strictly separate?',
          options: [
            'Exploratory trace analysis is unscientific and should be skipped.',
            'Repeatedly tuning prompts or rubrics on a dataset and presenting the final run as an independent test invalidates confirmatory inference.',
            'Confirmatory mode prohibits documenting coverage exclusions.',
          ],
          correctIndex: 1,
          correctExplanation: 'Explore traces to discover failures and refine specs, then lock criteria and thresholds before running on a fresh held-out confirmatory set.',
          distractorNotes: [
            'A and C are false.',
          ],
        },
        {
          id: 'm2-q3',
          question: 'Your team builds a 25-case challenge set of tricky, ambiguous customer messages and the assistant fails 10 of them (40%). What can you conclude?',
          options: [
            '40% of everyday production chats will fail.',
            'You uncovered concrete failure modes worth fixing, but the 40% rate does not estimate everyday production prevalence.',
            'The challenge set was useless because it was not randomly sampled.',
          ],
          correctIndex: 1,
          correctExplanation: 'Challenge sets expose weaknesses quickly; estimating everyday prevalence requires a representative sample of production traffic.',
          distractorNotes: [
            'A confuses challenge failure rates with population prevalence.',
            'C ignores the high diagnostic value of challenge sets.',
          ],
        },
        {
          id: 'm2-q4',
          question: 'Why is pinning only the model name (e.g., "Model X") insufficient when comparing two agent or RAG runs?',
          options: [
            'Because prompts, retrieval indexes, tool permissions, memory, and retry limits can swing scores more than swapping base models.',
            'Because model names do not affect outputs.',
            'Because harnesses only change UI fonts.',
          ],
          correctIndex: 0,
          correctExplanation: 'An agent or RAG evaluation measures the model plus its entire execution harness; unpinned harness changes confound comparisons.',
          distractorNotes: [
            'B and C are false.',
          ],
        },
      ],
    },
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
  },

  /* ========================================================================
   * MODULE 3: Rubrics, Judges & Aggregation (Chapters 3.1 – 3.3)
   * ======================================================================== */
  {
    id: 'm3',
    number: 3,
    title: 'Rubrics, Judges & Aggregation',
    subtitle: 'Observable criteria, code/human/LLM/telemetry judges, reliability metrics, and avoiding average traps',
    overview:
      'Learn how to turn vague quality goals into sharp, reproducible scoring pipelines. Across three deep chapters you will learn how to fix ambiguous rubrics from rater disagreements, choose and calibrate deterministic, human, LLM, and telemetry-based judges, and report disaggregated results so averages never hide critical failures.',
    objectives: [
      'Convert vague quality goals ("accurate", "helpful") into observable pass/fail or anchored rubrics using concrete reviewer disagreements.',
      'Select appropriately among deterministic code checks, human review, calibrated LLM judges, and production telemetry + scoring rules.',
      'Validate LLM judges on held-out human labels for rare-failure false negatives and known biases (position, verbosity, self-preference).',
      'Compute chance-corrected reliability (κ, α, ICC) when scaling human review and avoid aggregation traps and Simpson’s paradox.',
    ],
    chapters: [
      {
        id: '3.1',
        code: 'Chapter 3.1',
        title: 'Designing Observable Rubrics (and Resolving Disagreement)',
        readMinutes: 6,
        summary:
          'Why vague rubrics poison both human review and LLM judges—and how a single two-reviewer disagreement shows you exactly how to fix a rule.',
        sections: [
          {
            heading: 'From Construct to Observable Check',
            paragraphs: [
              'A rubric translates an abstract construct (like "source fidelity" or "policy compliance") into concrete, inspectable rules that two independent reviewers—or a calibrated automated judge—apply consistently. Never evaluate hidden mental states ("the model understood the paper"); evaluate observable properties ("every quantitative claim matches a cited passage and preserves causal vs. observational qualifiers").',
            ],
            table: {
              headers: ['Rubric Field', 'What to Specify', 'Meridian Example'],
              rows: [
                ['Construct', 'The property you actually care about.', 'Source fidelity'],
                ['Observable rule', 'Exact pass/fail or anchored condition.', 'Fail if causal verbs ("reduced", "caused") describe a non-randomized/observational study.'],
                ['Required evidence', 'What the reviewer must inspect.', 'Generated claim paired with the exact cited source paragraph.'],
                ['Anchors', 'Clear pass, clear fail, and borderline examples.', 'Pass: "reported 12% lower turnover"; Fail: "reduced turnover by 12%".'],
                ['Applicability', 'When the rule applies vs. N/A.', 'Applies to all quantitative or comparative empirical claims; N/A for pure definitions.'],
              ],
            },
          },
          {
            heading: 'Treat Reviewer Disagreement as a Diagnostic Signal',
            paragraphs: [
              'When two careful reviewers disagree on the same output, the worst response is to average their scores and move on. Disagreement almost always exposes an underspecified rubric or missing context.',
              'Consider a fictional Meridian excerpt: "In a 2024 survey of 400 employees, teams with flexible hours reported 12% lower turnover than fixed-hour teams; no randomized assignment was used." The AI writes: "Flexible hours reduced employee turnover by 12%." Under the vague rule "Summary is accurate," Reviewer 1 marks PASS (12% matches) while Reviewer 2 marks FAIL ("reduced" implies causation). Tightening the rule to ban causal verbs for observational studies immediately aligns both reviewers on FAIL—and gives any downstream LLM judge a crisp rule it can actually enforce.',
            ],
            callout: {
              kind: 'rule',
              title: 'Binary pass/fail vs. 1–5 scales',
              body: 'Default to binary pass/fail (or checklists of binary sub-checks) for clear requirements—humans and LLM judges agree far more reliably on binary checks than on blurry 1–5 Likert scales. Use anchored ordinal scales only when degrees of quality genuinely matter, and define every anchor with concrete examples.',
            },
          },
        ],
        keyTakeaways: [
          'Write rubrics around observable evidence and concrete pass/fail anchors—never vague adjectives or inferred mental states.',
          'Investigate reviewer disagreement to sharpen the rule rather than averaging noise away.',
          'Prefer binary pass/fail checklists for clear requirements; anchor every level when using ordinal scales.',
        ],
      },
      {
        id: '3.2',
        code: 'Chapter 3.2',
        title: 'Judge Mechanisms & LLM-Judge Validation',
        readMinutes: 7,
        summary:
          'How to combine deterministic code, human reviewers, LLM-as-a-judge, and production telemetry—and how to calibrate an LLM judge so it doesn’t silently miss disasters.',
        sections: [
          {
            heading: 'Four Judge Mechanisms and When to Use Each',
            paragraphs: [
              'Strong evaluation pipelines rarely rely on a single scorer. Use the cheapest, most deterministic judge that faithfully captures the criterion, and reserve human review for nuanced judgments and calibrating automated judges:',
            ],
            table: {
              headers: ['Judge Mechanism', 'Best Used For', 'Validation Check Needed'],
              rows: [
                ['Deterministic code checks', 'Schemas, regex/format invariants, calculations, tool-call arguments, environment state changes.', 'Verify the check captures the real requirement and does not reject valid phrasing variants.'],
                ['Human reviewers', 'Domain correctness, subtle nuance, edge-case adjudication, gold calibration sets.', 'Provide full source context, keep initial ratings independent, and resolve rubric ambiguities.'],
                ['LLM-as-a-judge', 'Scaling well-defined rubrics across hundreds or thousands of runs once calibrated.', 'Validate on held-out human labels, audit rare-failure recall (false negatives), and test known judge biases.'],
                ['Production telemetry + scoring rules', 'Observing live user signals (citation edits, deletions, retries, escalations).', 'Telemetry supplies raw evidence, not a score; define an explicit scoring rule and audit for confounders.'],
              ],
            },
          },
          {
            heading: 'Validating an LLM-as-a-Judge Without Fooling Yourself',
            paragraphs: [
              'An unvalidated LLM judge is just an unmeasured prompt grading another prompt. Before trusting an LLM judge for version comparisons or CI gates, run four concrete checks:',
            ],
            bullets: [
              {
                label: '1. Split calibration from held-out validation',
                text: 'Use one set of human-adjudicated examples to refine your judge prompt and few-shot anchors, then measure agreement on a separate held-out human set the judge never saw during tuning.',
              },
              {
                label: '2. Audit rare-failure recall (false negatives)',
                text: 'If critical errors occur in 2% of outputs, a lazy judge that always outputs PASS achieves 98% accuracy while missing 100% of disasters. Report precision and recall specifically on the failure class—not just overall agreement.',
              },
              {
                label: '3. Test for systematic judge biases',
                text: 'Published studies document position bias (preferring Answer A over B), verbosity bias (rewarding longer answers), and self-preference bias (favoring outputs from the same model family). Swap answer order on pairwise comparisons and test whether padding a wrong answer tricks your judge.',
              },
              {
                label: '4. Version the judge independently',
                text: 'Pin the judge model snapshot, prompt, temperature, and rubric version separately from the product so a judge update is never mistaken for a product improvement.',
              },
            ],
            callout: {
              kind: 'warning',
              title: '90% overall agreement can hide a broken judge',
              body: 'Always inspect the confusion matrix on rare, high-severity failures. A judge that agrees with humans 92% of the time overall but misses 6 out of 10 confidential data leaks is unusable as a safety gate.',
            },
          },
        ],
        keyTakeaways: [
          'Use deterministic code checks wherever possible, human reviewers for gold sets and nuance, calibrated LLM judges for scale, and explicit scoring rules for live telemetry.',
          'Validate LLM judges on held-out human labels, focusing on failure-class recall and position/verbosity/self-preference biases.',
          'Version judge models, prompts, and rubrics independently of the product under test.',
        ],
      },
      {
        id: '3.3',
        code: 'Chapter 3.3',
        title: 'Inter-Rater Reliability & Aggregation Traps',
        readMinutes: 6,
        summary:
          'How to measure human agreement properly (κ, α, ICC) and how to aggregate scores without letting a 95% pass rate conceal critical leaks or subgroup reversals.',
        sections: [
          {
            heading: 'Measuring Agreement Properly When Scaling Human Review',
            paragraphs: [
              'When multiple human annotators score outputs, raw percentage agreement is misleading whenever one label dominates. If 95% of answers are acceptable, two reviewers guessing "PASS" at random agree ~90.5% of the time without reading the text. Use chance-corrected reliability measures matched to your scale:',
            ],
            bullets: [
              {
                label: 'Cohen’s κ (kappa)',
                text: 'Two raters on nominal/binary categories (e.g., Pass vs. Fail).',
              },
              {
                label: 'Weighted κ',
                text: 'Two raters on ordered scales (e.g., 1–5 quality), penalizing large disagreements (1 vs. 5) more than adjacent ones (4 vs. 5).',
              },
              {
                label: 'Krippendorff’s α (alpha)',
                text: 'The workhorse for 2+ raters, missing ratings (not every rater grades every item), and nominal, ordinal, or interval scales.',
              },
              {
                label: 'ICC (Intraclass Correlation Coefficient)',
                text: 'Continuous numeric scores or ratings across multiple raters.',
              },
            ],
          },
          {
            heading: 'Aggregation Traps, Release Blockers & Missing Denominators',
            paragraphs: [
              'Even with perfectly reliable item-level grades, collapsing everything into a single headline average destroys decision-relevant information. Four minor formatting issues and one unauthorized client-data disclosure are not equivalent just because both count as one "fail."',
            ],
            diagram: 'aggregation',
            bullets: [
              {
                label: 'Separate mandatory constraints from weighted quality',
                text: 'Report critical safety, privacy, or policy violations as non-compensatory release blockers—never averaged into a general quality score.',
              },
              {
                label: 'Keep denominators honest',
                text: 'Never silently drop timeouts, crashed tool calls, or unscorable items from the denominator. Report retry policies explicitly: first-attempt pass rate differs sharply from pass-after-5-retries.',
              },
              {
                label: 'Watch for Simpson’s paradox',
                text: 'System A can beat System B on both Easy tasks and Hard tasks individually yet lose overall if System A happened to receive a higher share of Hard tasks. Always disaggregate by difficulty, language, and critical user slice.',
              },
            ],
          },
        ],
        keyTakeaways: [
          'Use chance-corrected reliability (Cohen’s κ, weighted κ, Krippendorff’s α, or ICC) rather than raw percent agreement.',
          'Never hide rare, high-severity release blockers inside a composite pass rate.',
          'Keep failed runs/timeouts in the denominator and disaggregate subgroups to catch Simpson’s paradox.',
        ],
      },
    ],
    practiceLab: {
      title: 'Practice Lab 3: Fix a Broken Rubric & Expose an Average Trap',
      intro:
        'Diagnose a real two-reviewer disagreement, rewrite the vague criterion into an observable rule, and fix a misleading composite pass rate.',
      caseStudy: {
        stageTitle: 'Meridian Workshop — Stage 4: Rubric Alignment & Release Blockers',
        narrative:
          'Two Meridian reviewers grade the same AI summary of an observational survey ("Flexible hours boosted retention by 12%"). Reviewer 1 marks PASS (12% matches), Reviewer 2 marks FAIL ("boosted" implies causation). Tightening the rubric to ban causal verbs for observational studies aligns both reviewers before you calibrate an LLM judge—and you isolate confidential client-name leaks as mandatory release blockers separate from quality averages.',
        keyDecisions: [
          'Fix rubric ambiguity before scaling up with an LLM judge.',
          'Report critical confidentiality violations separately from low-severity formatting defects.',
        ],
      },
      misconceptions: [
        {
          myth: '“When two reviewers disagree, average their scores and move on.”',
          reality: 'Disagreement signals an underspecified rubric or missing source context; tightening the rule fixes measurement far better than averaging noise.',
        },
        {
          myth: '“90% agreement with humans means an LLM judge can replace human review.”',
          reality: 'High overall agreement can mask poor recall on rare critical errors alongside verbosity, position, and self-preference biases.',
        },
      ],
      exercises: [
        {
          title: 'Exercise 3: Resolve a Reviewer Disagreement & Fix Composite Reporting',
          objective: 'Turn an ambiguous rule into an observable pass/fail check, rescore the output, and disaggregate a misleading 95% pass rate.',
          scenario:
            'Source excerpt (fictional): "In a 2024 survey of 400 employees, teams with flexible hours reported 12% lower turnover than fixed-hour teams; no randomized assignment was used." AI summary: "Flexible hours reduced employee turnover by 12%." Original rubric: "Summary is accurate." Reviewer 1 = PASS; Reviewer 2 = FAIL. Separately, across 100 runs, the system passes 95, has 4 minor formatting issues, and leaks 1 confidential client name (reported as "95% pass rate").',
          instructions: [
            'Explain why Reviewer 1 and Reviewer 2 reasonably disagreed under the vague rule "Summary is accurate."',
            'Rewrite the rubric into an observable pass/fail rule that resolves the ambiguity, and rescore the AI summary.',
            'Explain why reporting "95% pass rate" misleads decision-makers, and write the disaggregated report you would send instead.',
          ],
          requiredOutput: 'Disagreement diagnosis, revised observable rule + rescore, and disaggregated reporting recommendation.',
          evaluationCriteria: [
            'Revised rule targets observable causal vs. associative wording grounded in the excerpt.',
            'Isolates the 1 confidentiality leak as a critical release blocker separate from minor formatting issues.',
          ],
          strongExample:
            'Diagnosis: "accurate" did not specify whether matching the 12% number is sufficient or whether observational study design must be preserved. Revised rule: "Fail if the summary uses causal verbs (e.g., reduced, boosted, caused) to describe a non-randomized/observational finding." Rescore: FAIL. Disaggregated report: 95/100 full passes, 4/100 low-severity formatting issues, and 1/100 critical confidentiality violation (mandatory release blocker).',
          reflectionQuestion: 'If you automate this revised rule with an LLM judge, how would you verify the judge catches subtle causal phrasing on held-out examples?',
        },
      ],
    },
    quiz: {
      intro: 'Check your mastery of Chapters 3.1–3.3 before moving to Module 4.',
      questions: [
        {
          id: 'm3-q1',
          question: 'Two reviewers disagree on whether a summary is "accurate" because one checks numbers and the other checks causal wording. What is the best first step?',
          options: [
            'Average their scores so you get 0.5.',
            'Inspect their reasons, rewrite the rubric into explicit observable criteria, and rescore.',
            'Replace both reviewers with an unvalidated LLM judge.',
          ],
          correctIndex: 1,
          correctExplanation: 'Disagreement exposes an underspecified rubric; tightening the rule fixes the root cause before scaling.',
          distractorNotes: [
            'A hides rubric ambiguity.',
            'C transfers the same ambiguity into an automated judge.',
          ],
        },
        {
          id: 'm3-q2',
          question: 'Which reliability statistic handles 2+ raters with missing labels across nominal, ordinal, or interval scales?',
          options: [
            'Raw percentage agreement.',
            'Krippendorff’s alpha.',
            'Brier score.',
          ],
          correctIndex: 1,
          correctExplanation: 'Krippendorff’s alpha corrects for chance agreement and generalizes across 2+ raters, missing ratings, and multiple scale types.',
          distractorNotes: [
            'A does not correct for chance agreement.',
            'C measures probability calibration.',
          ],
        },
        {
          id: 'm3-q3',
          question: 'Critical safety failures occur in 2% of outputs. An LLM judge achieves 98% overall accuracy against humans by marking almost everything PASS. What check catches this immediately?',
          options: [
            'Measuring overall accuracy again on a larger set.',
            'Auditing precision and recall specifically on the rare failure class (false negatives) on held-out human labels.',
            'Increasing the judge model’s temperature.',
          ],
          correctIndex: 1,
          correctExplanation: 'Under class imbalance, overall agreement hides missed rare failures; inspecting failure-class recall exposes false negatives immediately.',
          distractorNotes: [
            'A repeats the same class-imbalance blind spot.',
            'C adds noise without addressing recall.',
          ],
        },
        {
          id: 'm3-q4',
          question: 'Across 100 runs, a system has 95 passes, 4 minor markdown glitches, and 1 leak of confidential client PII. Why is reporting "95% pass rate" misleading?',
          options: [
            'Because 95/100 is mathematically 94%.',
            'Because collapsing all failures into one average weights a critical release blocker equally with minor formatting bugs.',
            'Because pass rates cannot be computed on 100 runs.',
          ],
          correctIndex: 1,
          correctExplanation: 'Severity-preserving reporting isolates critical mandatory constraints separately from low-severity defects.',
          distractorNotes: [
            'A and C are false.',
          ],
        },
      ],
    },
    researchEvidence: [],
  },
];

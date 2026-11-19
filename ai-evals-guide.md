# A Practical Guide to AI Evaluation

## AI Evaluations: A One-Page Reference

### What an AI Eval Is

An **AI evaluation (eval)** is a systematic process for judging how an AI model or AI-enabled system performs under defined conditions. You give the system tasks or observe it in use, collect evidence, and apply explicit criteria to determine whether it meets a goal.

**Evals complement unit tests.** Unit tests check fixed deterministic requirements such as whether an output follows a schema. Evals measure performance across cases and, when outputs vary, across repeated runs. You can score each case pass/fail and still learn from the overall pass rate and the specific kinds of failures you observe.

### The Three Components

An eval should make three things explicit:

- **Dataset (Stimulus)** — The inputs, scenarios, or real-world logs used to elicit or observe behavior.
- **Rubric (Criteria)** — The explicit definition of what counts as accurate, useful, safe, or failing.
- **Judge (Scorer)** — The mechanism that applies the criteria, such as deterministic code, an LLM grader, or a human reviewer. Production telemetry supplies raw behavioral evidence—such as whether an analyst corrected a generated citation—while an explicit scoring rule determines how that evidence counts.

### Layers and Units of Analysis

Two scoping choices determine what an eval measures. The **layer** is where in the system you evaluate. The **unit of analysis** is what each item represents when you aggregate or compare results.

| # | Layer | Core Question (Meridian Example) | Possible Unit of Analysis | Cross-Layer Caution |
|---|---|---|---|---|
| 1 | **Data & Inputs** | Do source packets cover the evidence analysts actually encounter? | Source packet / input category | Clean, unrepresentative packets hide real-world parsing and coverage failures. |
| 2 | **Isolated Model** | Are the model’s claims supported by the sources it receives? | Claim or response | High model scores do not prove product success—and workflow verification can catch occasional model errors. |
| 3 | **Component** | Does retrieval surface the most relevant documents? | Search query / tool call | Good retrieval does not guarantee faithful synthesis or low user verification cost. |
| 4 | **Workflow / Agent** | Does the system preserve citations across a full brief revision? | End-to-end run | Automated workflow completion does not prove users produce better final work or save total time. |
| 5 | **Human–AI Interaction** | Can analysts catch and correct an unsupported conclusion? | Task session or analyst | A factually accurate model can still fail if the interface makes verification too costly. |
| 6 | **Organizational** | Do teams produce verified briefs faster after adoption? | Team or team-week | Local team speedups can still add review bottlenecks, maintenance cost, or errors elsewhere. |
| 7 | **Wider Impacts** | Does access to reliable research improve across language groups? | Language community / group | Product-level averages can conceal disparities across languages, regions, or affected groups. |

A single layer can hold multiple units. If 20 analysts each complete 10 tasks, you record **200 task outcomes**. If you compare each analyst’s success rate across two interfaces, the **analyst** is your unit of analysis.

**Passing a lower-layer eval alone cannot establish higher-layer success.** A workflow can still meet its goal if verification catches a model error, while a factually accurate model can still fall short in practice if the interface makes verification too costly.

### Validity: What a Score Supports

Validity concerns the **claim** you make from a score. A test can produce repeatable results and still measure the wrong thing. Start with two core questions (expanded into the full 3-pillar framework in Section 4):

- **Construct validity** — Does the test measure the actual goal? A rubric meant to assess factual accuracy may inadvertently reward polish, length, or irrelevant follow-up questions.
- **External validity** — How well do results generalize to the conditions you care about? A benchmark with clean prompts and single-turn tasks tells you little about messy inputs, shifting distributions, or time-pressured users.

### Four Operating Rules

1. **Start with the decision.** The decision determines the layer, the unit of analysis, and the required level of rigor.
2. **Treat the eval as the spec.** Define failure modes and grading criteria on a small set of real examples before iterating on prompts or architecture (refine criteria during exploratory error analysis, then lock them before confirmatory tests).
3. **Account for benchmark contamination.** Public test cases can enter training data. For deployment decisions, use private, refreshed cases that reflect your domain.
4. **Watch for Goodhart’s Law.** Optimizing a metric can undermine the goal it represents. Pair your primary metric with measures that expose tradeoffs, such as accuracy alongside latency, cost, or human audit time.

---

### 5-Minute Worked Example: Return-Policy Assistant

Before diving into formal designs, walk through one complete eval:

- **Policy:** Unused items can be returned within 30 days.
- **Scoring rule:** Before promising a return, the answer must check any policy condition the customer left unspecified—and must not re-ask a condition the customer already stated.

**Case 1 (Condition unspecified)**
- **Customer:** “I bought this 12 days ago. Can I return it?”
- **Answer A (Prompt v1):** “Yes, you’re within the return window.” → **Fail** (promises a return without checking whether the item is unused).
- **Answer B (Prompt v2):** “You’re within the 30-day window. Has the item been used?” → **Pass** (confirms 30 days and checks the missing unused condition).

**Case 2 (Condition already specified)**
- **Customer:** “I bought this 12 days ago and haven’t opened or used it. Can I return it?”
- **Answer A (Prompt v1):** “Yes—since it’s unused and within 30 days, you can return it.” → **Pass** (both conditions are met).
- **Answer B (Prompt v2):** “You’re within the 30-day window. Has the item been used?” → **Fail** (repeats a question the customer already answered).

| Test Case | Prompt v1 | Prompt v2 | What Changed |
|---|---|---|---|
| **Case 1** (unused unspecified) | Fail | Pass | Fixed missing condition check |
| **Case 2** (unused already stated) | Pass | Fail | Introduced regression |
| **Total score** | **1 / 2 (50%)** | **1 / 2 (50%)** | **Tied total hides a trade-off** |

- **Construct validity trap:** A naive rubric that simply rewards *any* follow-up question passes Prompt v2 on Case 2 even though it ignored what the customer just said.
- **External validity limit:** Passing 30-day return cases establishes nothing about lost accounts, billing disputes, messy multi-turn chats, or support-agent workload.

---

## 1. Start With the Decision: Scope, Baseline, Harnesses & Contamination

*Corresponds to Module 2 (Chapters 2.1–2.2).*

### Ask Whether You Need AI First

Before evaluating an AI system for a workplace problem, put three equally legitimate options on the table:
1. **Keep the current workflow.**
2. **Ship a credible simpler non-AI fix** (such as full-text search, cleaner permissions, or a mandatory review checklist).
3. **Test AI assistance against that upgraded baseline.**

In our running **Meridian Research Assistant** case study, if analysts lose 25 minutes hunting for PDFs in messy folders and forget to write a Limitations section because there is no template, better search and a 1-page checklist may solve the problem at near-zero cost and zero hallucination risk. Choosing the simpler fix is a disciplined outcome, not a failure.

Also keep evaluation purpose clear: not every evaluation is a launch gate. A **scientific capability study** (Layer 2) can probe how a model handles reasoning perturbations without claiming workplace readiness.

### Pin the Full Harness & Separate Modes

A score is only interpretable when the exact system configuration and study mode are known:

- **Pin the full harness:** For workflows and agents (Layer 4), the object under test is the model *plus* its execution harness—system prompts, retrieval index/top-k, tool definitions, permissions, memory, retry/stopping rules, and UI (as emphasized in Anthropic’s agent-evaluation guidance). Changing retries or prompts can swing results more than swapping base models.
- **Keep exploratory vs. confirmatory modes separate:** In **exploratory mode**, inspect failures and refine criteria as you discover new requirements. In **confirmatory mode**, lock your primary outcomes, baselines, and pass thresholds *before* inspecting the confirmatory test set. Tuning prompts and criteria on the same dataset and presenting the final score as an independent test invalidates confirmation.
- **Defend against benchmark contamination:** Public test sets regularly leak into pretraining data. Use private, periodically refreshed domain packets for real launch decisions. Document coverage gaps explicitly (a lesson underscored by HELM: separating scenarios, metrics, and missing coverage).

---

## 2. Datasets & Error Analysis: Building Real Test Cases

*Corresponds to Module 2 (Chapters 2.3–2.4).*

### Treat the Eval as the Spec

Before iterating on prompts or complex RAG architectures, read 30–50 real user queries, retrieved passages, and execution traces. Open-ended trace and error analysis (as emphasized by Husain & Shankar) reveals recurring breakdown modes far faster than guessing metrics in the abstract.

Build your Dataset (Stimulus) across three explicit case types with observable expected behavior:
1. **Ordinary cases:** Inputs where all policy or task conditions are clear (e.g., unused item within 30 days → confirm directly).
2. **Ambiguous cases:** Missing, conflicting, or borderline details (e.g., “opened outer box” or an observational survey whose abstract sounds causal → clarify or hedge).
3. **Escalation / abstention cases:** High-stakes exceptions or out-of-corpus queries (e.g., >\$500 dispute or missing confidential file → escalate or abstain rather than fabricate).

### Keep Sampling Purposes Strictly Separate

| Sampling Purpose | Role | Critical Caution |
|---|---|---|
| **Discovery sampling** | Finds informative, unusual, or broken traces to uncover failure modes. | Cannot estimate production failure rates. |
| **Representative sampling** | Samples typical production traffic or target domain cases cleanly. | Only valid for the population and period sampled. |
| **Challenge sampling** | Deliberately stresses suspected weak spots, edge cases, and adversarial inputs. | A 40% failure rate here does **not** mean 40% of real users see failures. |
| **Regression collections** | Preserves previously fixed bugs so updates do not backslide. | Passing regression tests never proves general capability or unseen safety. |

**Synthetic data caution:** LLM-generated cases can quickly probe targeted scenarios, but synthetic origin neither proves nor disqualifies usefulness—audit synthetic suites for realism and real-traffic coverage, and never treat synthetic pass rates as real-world prevalence.

### Staged Evidence Pipeline & Methods

Pair fast automated/trace checks early (Stage 1), representative workflow/user validation before deployment (Stage 2), and live telemetry + private regression checks in production (Stage 3). Different methods answer different questions:

| Method | What It Establishes | Main Limitation |
|---|---|---|
| **Benchmarks & executable tests** | Performance on specified tasks or invariants. | Generalization beyond tested cases requires evidence. |
| **Trace & error analysis** | Recurring failure points inside inputs, retrieval, and tool calls. | Logs may miss user intent or downstream rework. |
| **Adversarial testing / red teaming** | Whether specific exploit or failure paths exist. | Does not estimate ordinary-use prevalence. |
| **Formal verification** | Specified properties under explicit assumptions. | Limited by specification fidelity and real-world link. |
| **Observed task studies & RCTs** | Causal workflow impact and where real users struggle. | Study tasks and stakes can differ from routine use. |
| **Field monitoring** | Live behavior, incidents, cost, and drift in production. | Confounding, selection bias, and missing labels complicate inference. |

*(NIST’s ARIA program similarly pairs automated testing, red teaming, and user testing as complementary signals.)*

---

## 3. Rubrics, Judges & Aggregation: Scoring Without Fooling Yourself

*Corresponds to Module 3 (Chapters 3.1–3.3).*

### Turn Ambiguous Rules Into Observable Checks

When two reviewers disagree on the same output, do not average their scores—diagnose the ambiguity in your rubric:
- **Source excerpt (fictional):** *“In a 2024 survey of 400 employees, teams with flexible hours reported 12% lower turnover than fixed-hour teams; no randomized assignment was used.”*
- **AI summary:** *“Flexible hours reduced employee turnover by 12%.”*
- **Vague rule:** *“Summary is accurate.”* → Reviewer 1 marks **PASS** (12% matches), Reviewer 2 marks **FAIL** (*“reduced”* implies causation).
- **Observable rule:** *“Fail if the summary uses causal verbs (reduced, boosted, caused) for an observational/non-randomized finding.”* → **Both score FAIL.**

### Choosing and Validating Your Judge (Scorer)

| Judge Mechanism | Best Used For | Validation Check Needed |
|---|---|---|
| **Deterministic code checks** | Schemas, regex/format invariants, calculations, tool-call arguments, environment state changes. | Verify the assertion matches the requirement without rejecting valid variants. |
| **Human reviewers** | Domain correctness, subtle context, edge-case adjudication, gold sets. | Supply full source context, separate independent ratings before adjudication, check clarity. |
| **LLM-as-a-judge** | Scaling well-defined rubrics across large batches once calibrated. | Validate on held-out human labels, check rare-failure recall (false negatives), audit verbosity/position/self-preference biases. |
| **Production telemetry + scoring rules** | Real user signals in production (citation edits, deletions, retries, escalations). | Telemetry supplies raw evidence, not a score; define an explicit scoring rule and check for confounding. |

When scaling human annotation, raw percent agreement overstates reliability whenever one label dominates. Use chance-corrected reliability: **Cohen’s κ** (2 raters, nominal), **weighted κ** (ordinal scales), **Krippendorff’s α** (2+ raters or missing labels), or **ICC** (continuous scores). Keep judge prompts, rubrics, and model snapshots strictly versioned.

### Avoid Average Traps, Denominator Distortion & Simpson’s Paradox

- **Preserve severity and blockers:** Across 100 runs, 95 passes + 4 minor formatting typos + 1 confidential client-name leak is **not** simply a “95% pass rate.” Report mandatory constraints (release blockers), low-severity defects, and subgroup breakdowns separately.
- **Do not drop failed runs or missing evidence:** Silently excluding timeouts, abstentions, or unscorable items inflates pass rates. Record explicit policies for retries (first-attempt vs. k-attempt success) and failed runs.
- **Disaggregate subgroups:** An unbalanced task mix can make the worse system look better overall (*Simpson’s paradox*). Always disaggregate by difficulty, language, and critical slice.

---

## 4. Comparing Versions: Uncertainty, Clustering, Goodhart’s Law & Validity Pillars

*Corresponds to Module 4 (Chapters 4.1–4.3).*

### Direct Paired Differences & Clustering at the Unit of Analysis

Suppose **System A** and **System B** run on the exact same 200 research tasks completed by 25 analysts (8 tasks each; *fictional example*):
- **System A:** 4.10 / 5 (95% CI [4.02, 4.18]), latency 1.2s, cost \$0.02/task. Non-English slice (*n* = 15): 2.80 / 5.
- **System B:** 4.20 / 5 (95% CI [4.10, 4.30]), latency 6.5s, cost \$0.18/task. Non-English slice (*n* = 15): 3.90 / 5.

Three practical rules govern the decision:
1. **Never test significance by checking whether two separate 95% CIs overlap.** Because both systems ran on the same 200 tasks, estimate the paired difference directly: **+0.10 points**.
2. **Cluster uncertainty at the unit of analysis.** Eight tasks per analyst (or 60 turns inside one chat session) are correlated, not independent draws. Accounting for analyst clustering yields a direct 95% CI of **[+0.01, +0.19]**—statistically detectable above sampling noise, though still excluding rubric/rater measurement noise.
3. **Apply Goodhart’s Law (Operating Rule 4) and inspect subgroups.** Statistical detectability ≠ practical worth. Paying 9× cost and 5.4× latency for +0.10 on a 5-point scale rarely makes sense unless that shift eliminates critical failures. Meanwhile, System A’s 2.80 vs. 3.90 drop on Non-English queries (*n* = 15) is too underpowered for confidence—block deployment for Non-English workflows until a larger stratified sample is tested.

**Rare-failure bound (Rule of Three):** Observing 0 failures in 100 independent representative Bernoulli trials yields a one-sided 95% upper confidence bound of approximately $3/N = 3/100 = 3\%$—and establishes nothing about distribution shift, unmeasured subgroups, or missed failures.

### Three Distinct Pillars of Evaluation Quality

Grounded in the *Standards for Educational and Psychological Testing* (AERA, APA, & NCME, 2014), validity is not a single test property—it is an argument supporting specific score interpretations and uses:

| Pillar | Core Question | Key Items |
|---|---|---|
| **A. Measurement & Interpretation** | Do scores reflect the real construct for the intended use? | Construct validity, content validity, criterion-related evidence, consequential impacts, argument-based validation. |
| **B. Study Design, Causality & Generalization** | Is the effect causal and does it transfer? | Internal validity (confounding/attrition), external validity, ecological validity (realistic tasks/time pressure), randomization, distribution shift. |
| **C. Reliability & Traceability** | Is scoring stable and auditable? | Test-retest reliability, inter-rater reliability ($\kappa$, $\alpha$, ICC), reproducibility/replicability, pinned versions & provenance, audit trails. |

*Reliability is necessary but never sufficient for validity: a deterministic pipeline can reliably measure the wrong proxy.*

---

## 5. Real-World Performance: Workflows, Human–AI Testing & Production Monitoring

*Corresponds to Module 5 (Chapters 5.1–5.3).*

### Layer 4: Verify Actual Environment State

For workflows and agents, never score success solely from what the model claims in chat (*“I updated the brief and saved all citations”*). Assert against actual tool outputs, saved file diffs, database state, and verified citation targets.

### Layer 5: Test Real Users and Count Total Task Time

Ask one practical question: **does a real user with this AI tool do better work or finish sooner than with the current workflow?**

- **Run a two-condition comparison** (*current workflow* vs. *workflow + AI*) with real target users—not LLM-simulated personas (which caricature demographic groups and miss real verification friction).
- **Measure total task time:** always sum **drafting + citation/fact checking + error correction**. As METR’s RCT with 16 experienced open-source developers across 246 tasks showed (Becker et al., 2025), participants forecasted a ~20% speedup while observed total task time was **19% slower** with early-2025 AI tools.
- **When to add a third AI-alone condition:** add solo AI only if you claim **human–AI synergy** (beating both solo humans and solo AI). Across 106 studies and 370 effect sizes, Vaccaro et al. (2024) found Human+AI outperformed humans alone ($g = +0.64$) yet averaged negative synergy against the best solo actor ($g = -0.23$), especially in decision-making tasks.
- **Watch skill retention over time:** Shen & Tamkin (2026) found in an RCT of 52 engineers learning a Python library (`Trio`) that immediate completion time did not differ significantly, while follow-up mastery quiz scores differed by 17 percentage points (~50% AI-assisted vs. ~67% hand-coding, largest in debugging).

*(Deep HCI literature—including the SPHERE 5-dimension card [Zhao et al., ACL 2025], Offloading Score, co-writing bias, and longitudinal sycophancy—is covered in Optional Advanced Track G and the SPHERE Card Tool.)*

### Production Monitoring, Versioning & Governance

Evaluations decay as models, prompts, retrieval corpora, and user behaviors shift (NIST AI RMF 1.0):
- **Turn telemetry into scored signals:** combine live behavioral telemetry (user overrides, edits, escalations, latency, timeouts) with explicit scoring rules and periodic stratified human audits.
- **Version product and evaluator separately:** never let a rubric edit or judge-model swap masquerade as a product quality improvement.
- **Assign owners and triggers:** name accountable owners for criteria, oversight capacity, and rollback authority, and trigger targeted reevaluation whenever models, prompts, retrieval indexes, data quality, or input slices change.

---

## 6. Auditing Benchmarks, Vendor Claims & Bounded Reporting

*Corresponds to Module 6 (Chapters 6.1–6.2).*

Audit every public leaderboard, vendor pitch, or internal deck with four questions:
1. **What layer, unit, and cases were actually tested?**
2. **What comparison was made—and with what pinned harness (prompts, tools, retries, compute)?**
3. **What tradeoffs, subgroups, contamination risks, or uncertainties were omitted?**
4. **What exact wording does the supplied evidence support?**

### Calibrating Claims to Evidence

Separate empirical observations, normative policy rules, predictions, and unsupported extrapolations. Never invent undisclosed setup details or error bars when summarizing a third-party report.

| Overextended Claim | Evidence-Matched Formulation |
|---|---|
| “The AI is accurate.” | “This version achieved the reported accuracy on these tasks under these conditions.” |
| “The model can reason.” | “The results support this specified behavioral-capability claim, subject to these alternative explanations and limits.” |
| “The system is safe.” | “The specified tests found these failures and did not observe these other failures within documented coverage; remaining risks and gaps are listed.” |
| “Users benefit.” | “The study observed improvement in these outcomes for this population, baseline comparator, and total-time accounting.” |
| “The judge is reliable.” | “The judge showed this agreement and these error patterns on a held-out human-adjudicated assessment for this intended use.” |
| “No subgroup bias exists.” | “The assessment found these differences with these uncertainties; these groups or effects were not adequately assessed.” |
| “The new version is better.” | “The new version improved these outcomes under this comparison, with these cost, latency, or error tradeoffs.” |

---

## 7. Worked Example & 12-Field Companion Protocol

### Worked Example: Meridian Research Assistant (Fictional Capstone Scenario)

Meridian evaluates an internal assistant that retrieves empirical papers, drafts syntheses, and links citations across the 7 layers:

- **Decision & comparator:** Should Meridian approve a restricted pilot against the upgraded search + 1-page checklist baseline?
- **Pre-specified gates:** Superior synthesis quality, non-inferior unsupported claims (pre-specified +1.0 pp margin), 0 critical confidentiality breaches, and no net slowdown in total analyst time.
- **Fictional crossover results (32 analysts, 128 sessions, 48 private confirmatory packets):** Quality improved by **+0.40** (cluster-robust 95% CI **[+0.18, +0.62]**) with **0/100** confidentiality leaks (~3% 95% upper bound)—but unsupported claims rose by **+1.6 pp** (95% CI **[+0.2, +3.0]**), failing the +1.0 pp non-inferiority gate, while total task time changed inconclusively (−2.5 min). Consistent with the decision rule, Meridian withholds the pilot until citation verification and grounding improve.

For a reproducible small-sample synthetic dataset and script demonstrating analyst-level clustered CIs vs. naive claim-level CIs against the +1.0 pp margin, run:

```bash
node scripts/reproduce-unsupported-claims.mjs
```

### 12-Field Companion Evaluation Protocol Template

Keep **prospective planning** (Fields 1–10 locked before inspecting confirmatory data) separate from **post-study reporting**:

| Field | Required Content |
|---|---|
| **1. Purpose & decision** | What decision is being made, what layer/unit apply, and what evidence would change the decision. |
| **2. Conceptual basis** | Construct definitions, normative risk tolerances, and competing explanations. |
| **3. System identity & harness** | Pinned model snapshot, prompts, retrieval index, tools, permissions, retries, and UI. |
| **4. Targets & context** | Tasks, populations, languages, coverage boundaries, and explicit exclusions. |
| **5. Criteria & measurement** | Observable rubric, scales, missing-case/retry handling, and limitations. |
| **6. Comparators & design** | Current workflow / simpler non-AI / prior version baselines and allocation/blinding rules. |
| **7. Evidence & sampling** | Private refreshed datasets, trace logs, and separation of challenge vs. representative samples. |
| **8. Evaluator validation** | Code assertions, human reliability ($\kappa$, $\alpha$, ICC), and held-out LLM-judge calibration. |
| **9. Analysis & inference** | Direct paired difference CIs, clustering at the unit of analysis, subgroup splits, and tradeoffs. |
| **10. Decision rules** | Release blockers, Goodhart tradeoff thresholds, and escalation rules. |
| **11. Governance** | Named owners for criteria, oversight authority, and risk acceptance. |
| **12. Monitoring & reevaluation** | Live telemetry + scoring rules, separate product/evaluator versions, and reevaluation triggers. |

#### Reusable Evaluation & Decision Statement

> We evaluated **[system, version, and harness]** at **[layer and unit of analysis]** for **[tasks, population, and setting]**, compared with **[baseline]**, using **[methods and private/refreshed evidence]**.
>
> We operationalized **[construct or requirement]** as **[observable rubric and judge mechanism]**, validated via **[reliability / calibration checks]**.
>
> The observations support **[bounded finding, uncertainty interval, and paired cost/latency/audit tradeoffs]**. Extending that finding beyond **[tested conditions]** requires **[additional evidence]**.
>
> Important limitations include **[coverage gaps, subgroup power limits, and potential confounders]**. This evaluation does not establish **[material untested claim]**.
>
> We recommend **[action and conditions]** with **[accountable owner]**, and will trigger reevaluation if **[model, harness, data, or traffic shift]** occurs.

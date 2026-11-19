import { useState } from 'react';
import {
  AggregationTrapDiagram,
  FallaciesDiagram,
  HorizonDiagram,
  LayeredPipelineDiagram,
  OutcomesComparisonDiagram,
  ScopeBoundaryDiagram,
  ValidityCategoriesDiagram,
} from './VisualDiagrams';
import { FirstEvalExercise } from './FirstEvalExercise';
import {
  ESSENTIAL_GLOSSARY,
  EVIDENCE_METHODS,
  JUDGE_MECHANISMS,
  OPERATING_RULES,
  PROTOCOL_FIELDS,
  REPORTING_CLAIMS,
  SAMPLING_PURPOSES,
  SCOPES,
  TARGET_INVENTORY,
  VALIDITY_CATEGORIES,
} from '../data/evalsData';
import { STATS_WORKED_EXAMPLES } from '../data/statsWorkedExamples';

export function ModuleDeepContent({
  moduleId,
  onSelectModule,
  onOpenTracks,
}: {
  moduleId: string;
  onSelectModule?: (idx: number) => void;
  onOpenTracks?: () => void;
}) {
  const [selectedStatIdx, setSelectedStatIdx] = useState(0);

  if (moduleId === 'm1') {
    return (
      <div className="space-y-6 text-sm leading-relaxed text-[#231F1A]">
        {/* 1. What an AI Eval Is + Contrast with Unit Tests */}
        <section className="space-y-3">
          <h4 className="font-display text-lg font-bold">
            What an AI Eval Is (and Why Unit Tests Aren’t Enough)
          </h4>
          <p className="text-base font-semibold leading-snug text-[#231F1A]">
            An AI evaluation (eval) is a systematic process for judging how an AI model or AI-enabled system performs under defined conditions.
          </p>
          <p>
            You give the system tasks or observe it in use, collect evidence, and apply explicit criteria to determine whether it meets a goal. <strong>Evals complement unit tests:</strong> unit tests check fixed deterministic requirements such as whether an output matches a JSON schema, whereas evals measure performance across a distribution of cases and—when outputs vary—across repeated runs. You can score every run pass/fail and still learn from the overall pass rate and the specific kinds of failures you observe.
          </p>
        </section>

        {/* 2. The Three Components */}
        <section className="space-y-3">
          <h4 className="font-display text-base font-bold">The Three Explicit Components</h4>
          <div className="grid gap-3 sm:grid-cols-3 text-xs">
            <div className="vintage-box rounded-md p-3.5 space-y-1">
              <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#C8552D]">
                1. Dataset (Stimulus)
              </div>
              <p className="text-[#231F1A]">
                The inputs, scenarios, or real-world logs used to elicit or observe system behavior.
              </p>
            </div>
            <div className="vintage-box rounded-md p-3.5 space-y-1">
              <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#335C81]">
                2. Rubric (Criteria)
              </div>
              <p className="text-[#231F1A]">
                The explicit definition of what counts as accurate, useful, safe, or failing.
              </p>
            </div>
            <div className="vintage-box rounded-md p-3.5 space-y-1">
              <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#2A422D]">
                3. Judge (Scorer)
              </div>
              <p className="text-[#231F1A]">
                The mechanism applying the criteria—deterministic code, an LLM grader, or a human reviewer.
              </p>
            </div>
          </div>
          <p className="text-xs text-[#5C5346] border-l-2 border-[#335C81] pl-3">
            <strong>Where production telemetry fits:</strong> Production logs and user interactions (such as whether an analyst corrected a generated citation) supply raw <em>evidence</em>, not a ready-made score. An explicit <strong>scoring rule</strong> still determines how that evidence counts.
          </p>
        </section>

        {/* 3. Layers & Units of Analysis (Inline, never buried) */}
        <section className="space-y-3">
          <h4 className="font-display text-base font-bold">
            The Seven Layers &amp; Units of Analysis
          </h4>
          <p className="text-xs text-[#5C5346]">
            Two scoping choices determine what an eval actually measures: the <strong>layer</strong> (where in the system you evaluate) and the <strong>unit of analysis</strong> (what each item represents when you aggregate or compare results).
          </p>
          <div className="overflow-x-auto vintage-box rounded-md">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#231F1A] bg-[#EFE7D6]">
                <tr>
                  <th className="px-3 py-2 font-semibold"># · Layer</th>
                  <th className="px-3 py-2 font-semibold">Core Question (Meridian Example)</th>
                  <th className="px-3 py-2 font-semibold">Possible Unit of Analysis</th>
                  <th className="px-3 py-2 font-semibold">Cross-Layer Caution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#231F1A]/15">
                {SCOPES.map((s, idx) => (
                  <tr key={s.id}>
                    <td className="px-3 py-2 font-semibold whitespace-nowrap">
                      {idx + 1}. {s.name}
                    </td>
                    <td className="px-3 py-2">{s.question}</td>
                    <td className="px-3 py-2 font-mono text-[11px] text-[#335C81]">{s.unit}</td>
                    <td className="px-3 py-2 text-[#5C5346]">{s.transferWarning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ScopeBoundaryDiagram />
          <div className="grid gap-3 sm:grid-cols-2 text-xs">
            <div className="rounded-md border border-[#231F1A]/25 bg-[#FBF7EE] p-3.5 space-y-1">
              <div className="font-semibold text-[#231F1A]">One layer can hold multiple units</div>
              <p className="text-[#5C5346]">
                If 20 analysts each complete 10 tasks, you record <strong>200 task outcomes</strong>. If you compare each analyst’s success rate across two interfaces, the <strong>analyst</strong> is your unit of analysis.
              </p>
            </div>
            <div className="rounded-md border border-[#C8552D]/40 bg-[#F7E4DC]/50 p-3.5 space-y-1">
              <div className="font-semibold text-[#7D3016]">Passing a lower layer never guarantees higher-layer success</div>
              <p className="text-[#231F1A]">
                A workflow can meet its goal if verification catches a model error—while a factually accurate model can still fall short in practice if the interface makes verification too costly.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Validity & Four Operating Rules */}
        <section className="space-y-3">
          <h4 className="font-display text-base font-bold">
            Validity: What a Score Supports &amp; Four Operating Rules
          </h4>
          <p className="text-xs text-[#5C5346]">
            A test can produce repeatable results and still measure the wrong thing. Start with two core validity questions (expanded into the full 3-pillar framework in{' '}
            {onSelectModule ? (
              <button
                type="button"
                onClick={() => onSelectModule(4)}
                className="font-semibold text-[#335C81] underline"
              >
                Module 5
              </button>
            ) : (
              <strong>Module 5</strong>
            )}
            ):
          </p>
          <div className="grid gap-3 sm:grid-cols-2 text-xs">
            <div className="rounded-md border border-[#4A6B4E]/50 bg-[#E6EDE2]/60 p-3.5 space-y-1">
              <div className="font-semibold text-[#2A422D]">Construct validity</div>
              <p className="text-[#231F1A]">
                Does the test measure the actual goal? A rubric meant to assess factual accuracy may inadvertently reward polish, length, or asking irrelevant follow-up questions.
              </p>
            </div>
            <div className="rounded-md border border-[#335C81]/50 bg-[#E3EAF0]/60 p-3.5 space-y-1">
              <div className="font-semibold text-[#1E3A54]">External validity</div>
              <p className="text-[#231F1A]">
                Do results generalize to the conditions you care about? Clean prompts and single-turn cases tell you little about messy inputs, shifting distributions, or time-pressured users.
              </p>
            </div>
          </div>

          <div className="vintage-box rounded-md p-4 space-y-2.5 text-xs">
            <div className="font-display text-sm font-bold text-[#231F1A]">Four Operating Rules</div>
            <ol className="space-y-2">
              {OPERATING_RULES.map((rule) => (
                <li key={rule.id} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#231F1A] font-mono text-[10px] font-bold text-[#FBF7EE]">
                    {rule.number}
                  </span>
                  <div>
                    <strong className="text-[#231F1A]">{rule.title}.</strong>{' '}
                    <span className="text-[#5C5346]">{rule.rule}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 5. First Hands-On Exercise */}
        <FirstEvalExercise />

        {/* 6. Compact Reference Drawer */}
        <details className="vintage-box rounded-md p-4 text-xs">
          <summary className="cursor-pointer font-semibold text-[#231F1A]">
            Quick Reference: 5 Common Misconceptions &amp; Essential Glossary
          </summary>
          <div className="mt-4 space-y-5">
            <div>
              <div className="font-semibold mb-1.5">Five Common Misconceptions</div>
              <ol className="list-decimal pl-5 space-y-1.5 text-[#5C5346]">
                <li><strong className="text-[#231F1A]">High benchmark score = ready to deploy:</strong> Layer 2 scores need configured-harness and workflow validation.</li>
                <li><strong className="text-[#231F1A]">Correct answer = human-like reasoning:</strong> Memorization or shortcuts can produce the same answer; test perturbations.</li>
                <li><strong className="text-[#231F1A]">Grader agreement = measuring the right thing:</strong> Raters can agree on a flawed rubric; check construct validity.</li>
                <li><strong className="text-[#231F1A]">Faster drafting = faster overall:</strong> Measure total task time including checking and correction.</li>
                <li><strong className="text-[#231F1A]">Zero observed failures = zero risk:</strong> 0/100 still permits up to ~3% failure rate at 95% confidence.</li>
              </ol>
            </div>
            <div>
              <div className="font-semibold mb-1.5">Essential Terminology</div>
              <dl className="grid gap-2 sm:grid-cols-2">
                {ESSENTIAL_GLOSSARY.map((g) => (
                  <div key={g.term}>
                    <dt className="font-semibold text-[#C8552D]">{g.term}</dt>
                    <dd className="text-[#5C5346]">{g.def}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </details>
      </div>
    );
  }

  if (moduleId === 'm2') {
    return (
      <div className="space-y-6 text-sm leading-relaxed text-[#231F1A]">
        <section className="space-y-3">
          <h4 className="font-display text-lg font-bold">
            Operating Rule 1: Start With the Decision—and Ask If You Need AI
          </h4>
          <p>
            The decision you need to make determines the <strong>layer</strong>, the <strong>unit of analysis</strong>, the <strong>comparator baseline</strong>, and the rigor required. For a workplace or product decision, always put three legitimate options on the table: <strong>(1) keeping the current workflow</strong>, <strong>(2) shipping a credible simpler non-AI fix</strong> (such as full-text search, cleaner permissions, or a checklist), and <strong>(3) testing AI assistance against that improved baseline</strong>.
          </p>
          <p>
            Choosing the simpler fix is a strong, disciplined outcome—not a failure. Testing AI becomes justified when the simpler baseline still leaves a real bottleneck (such as synthesizing dense methods across five papers) and you want to verify whether AI beats that baseline without adding unacceptable errors or review cost.
          </p>
          <p className="text-xs text-[#5C5346] border-l-2 border-[#C8552D] pl-3">
            <strong>Scientific vs. product evals:</strong> Not every evaluation is a launch gate. A capability study at Layer 2 can test a clear scientific question (e.g., sensitivity to prompt perturbations) without claiming workplace readiness.
          </p>
        </section>

        <section className="space-y-3">
          <h4 className="font-display text-base font-bold">
            Pinning the Harness, Separating Modes &amp; Defending Against Contamination
          </h4>
          <div className="grid gap-3 sm:grid-cols-3 text-xs">
            <div className="vintage-box rounded-md p-3.5 space-y-1">
              <div className="font-semibold text-[#231F1A]">Pin the full harness</div>
              <p className="text-[#5C5346]">
                For systems and agents (Layer 4), evaluate the model together with its prompts, retrieval index, tools, permissions, memory, and retry/stopping rules.
              </p>
            </div>
            <div className="vintage-box rounded-md p-3.5 space-y-1">
              <div className="font-semibold text-[#231F1A]">Explore vs. confirm</div>
              <p className="text-[#5C5346]">
                Use exploratory analysis to uncover bugs and refine your rubric, then lock primary metrics and thresholds <em>before</em> running on a held-out confirmatory set.
              </p>
            </div>
            <div className="vintage-box rounded-md p-3.5 space-y-1">
              <div className="font-semibold text-[#231F1A]">Private refreshed cases</div>
              <p className="text-[#5C5346]">
                Public benchmarks leak into training corpora (Operating Rule 3). For real deployment decisions, rely on private, periodically refreshed domain cases.
              </p>
            </div>
          </div>
        </section>

        <details className="vintage-box rounded-md p-4 text-xs">
          <summary className="cursor-pointer font-semibold text-[#231F1A]">
            Reference: 10-Field Scoping Brief &amp; 12 Target Categories
          </summary>
          <div className="mt-3 space-y-4">
            <p className="text-[#5C5346]">
              <strong>10-field scoping brief:</strong> Decision &amp; layer, unit of analysis, target population, task &amp; coverage exclusions, pinned AI system &amp; harness, baseline comparator, primary &amp; tradeoff metrics, measurement period, hypothesis/threshold, and contamination/confounder checks.
            </p>
            <ul className="grid gap-2 sm:grid-cols-2 text-[#5C5346]">
              {TARGET_INVENTORY.map((t) => (
                <li key={t.name}><strong className="text-[#231F1A]">{t.name}:</strong> {t.concerns}</li>
              ))}
            </ul>
          </div>
        </details>
      </div>
    );
  }

  if (moduleId === 'm3') {
    return (
      <div className="space-y-6 text-sm leading-relaxed text-[#231F1A]">
        <section className="space-y-3">
          <h4 className="font-display text-lg font-bold">
            Operating Rule 2: Treat the Eval as the Spec
          </h4>
          <p>
            Before tuning prompts or adding complex retrieval pipelines, inspect 30–50 real inputs and execution traces to see how the system actually fails. Define failure modes and grading criteria on a small set of real examples first, then expand your Dataset (Stimulus) across three explicit situations:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Ordinary cases:</strong> All facts are clear and within policy (e.g., unused item bought 10 days ago → confirm return directly without redundant questions).</li>
            <li><strong>Ambiguous cases:</strong> A crucial detail is missing or borderline (e.g., “I opened the outer box to check the color” → clarify before promising a return).</li>
            <li><strong>Escalation / abstention cases:</strong> High-stakes exception or missing evidence (e.g., a $650 damaged item or out-of-corpus paper question → escalate or abstain rather than guess).</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h4 className="font-display text-base font-bold">
            Keep Sampling Purposes Strictly Separate
          </h4>
          <p className="text-xs text-[#5C5346]">
            A deliberately tough challenge suite is essential for exposing brittle edge cases, but <strong>its failure rate cannot be read as your everyday production failure rate</strong>. Only a representative traffic sample estimates prevalence. Likewise, synthetic cases can probe targeted scenarios, but their realism and domain coverage must be checked—synthetic origin never proves real-world prevalence.
          </p>
          <div className="grid gap-2.5 sm:grid-cols-2 text-xs">
            {SAMPLING_PURPOSES.map((sp) => (
              <div key={sp.name} className="vintage-box rounded-md p-3 space-y-1">
                <div className="font-semibold text-[#231F1A]">{sp.name}</div>
                <div className="text-[#5C5346]">{sp.role}</div>
                <div className="text-[11px] font-medium text-[#7D3016]">{sp.warning}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#5C5346] border-l-2 border-[#C8552D] pl-3">
            <strong>Building RAG?</strong> Retrieval-specific metrics (<code>Precision@k</code>, <code>Recall@k</code>, <code>MRR</code>, <code>NDCG@k</code>) and the 100-item RAG dataset assignment live in{' '}
            {onOpenTracks ? (
              <button type="button" onClick={onOpenTracks} className="font-semibold text-[#C8552D] underline">
                Optional Advanced Track A (RAG Evaluation)
              </button>
            ) : (
              <strong>Optional Advanced Track A (RAG Evaluation)</strong>
            )}
            .
          </p>
        </section>

        <section className="space-y-3">
          <h4 className="font-display text-base font-bold">Staged Evidence Pipeline &amp; Collection Methods</h4>
          <LayeredPipelineDiagram />
          <div className="overflow-x-auto vintage-box rounded-md">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#231F1A] bg-[#EFE7D6]">
                <tr>
                  <th className="px-3 py-1.5 font-semibold">Method</th>
                  <th className="px-3 py-1.5 font-semibold">What It Establishes</th>
                  <th className="px-3 py-1.5 font-semibold">Main Limitation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#231F1A]/15">
                {EVIDENCE_METHODS.map((m) => (
                  <tr key={m.name}>
                    <td className="px-3 py-1.5 font-medium">{m.name}</td>
                    <td className="px-3 py-1.5">{m.establishes}</td>
                    <td className="px-3 py-1.5 text-[#5C5346]">{m.limitation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  }

  if (moduleId === 'm4') {
    return (
      <div className="space-y-6 text-sm leading-relaxed text-[#231F1A]">
        <section className="space-y-3">
          <h4 className="font-display text-lg font-bold">
            Sharpen Your Rubric Before Scaling Any Judge
          </h4>
          <p>
            Before computing agreement statistics or writing an LLM-judge prompt, look at why two careful human reviewers often disagree on the exact same output (<em>illustrative example</em>):
          </p>
          <div className="vintage-box rounded-md p-4 text-xs space-y-2">
            <div><strong>Source excerpt:</strong> “In a 2024 survey of 400 employees, teams with flexible hours reported 12% lower turnover than fixed-hour teams; no randomized assignment was used.”</div>
            <div><strong>AI summary:</strong> “Flexible hours reduced employee turnover by 12%.”</div>
            <div><strong>Original vague rule:</strong> “Summary is accurate.”</div>
            <div className="grid gap-2 sm:grid-cols-2 pt-1">
              <div className="rounded bg-[#E6EDE2] p-2.5 text-[#2A422D]">
                <strong>Reviewer 1 → PASS:</strong> “The 12% figure matches the survey.”
              </div>
              <div className="rounded bg-[#F7E4DC] p-2.5 text-[#7D3016]">
                <strong>Reviewer 2 → FAIL:</strong> “‘Reduced’ implies causation from a non-randomized survey.”
              </div>
            </div>
            <div className="rounded border border-[#231F1A]/25 bg-[#F5EFE2] p-2.5">
              <strong>Revised observable rule:</strong> “Fail if the summary uses causal verbs (reduced, boosted, caused) for an observational/non-randomized finding.” → <strong>Rescore: FAIL</strong> (both reviewers now agree).
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h4 className="font-display text-base font-bold">Choosing &amp; Validating Your Judge (Scorer)</h4>
          <div className="overflow-x-auto vintage-box rounded-md">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#231F1A] bg-[#EFE7D6]">
                <tr>
                  <th className="px-3 py-2 font-semibold">Judge Mechanism</th>
                  <th className="px-3 py-2 font-semibold">Best Used For</th>
                  <th className="px-3 py-2 font-semibold">Validation Check Needed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#231F1A]/15">
                {JUDGE_MECHANISMS.map((jm) => (
                  <tr key={jm.name}>
                    <td className="px-3 py-2 font-semibold">{jm.name}</td>
                    <td className="px-3 py-2">{jm.suitableFor}</td>
                    <td className="px-3 py-2 text-[#5C5346]">{jm.checkNeeded}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 text-xs">
            <div className="rounded-md border border-[#335C81]/40 bg-[#E3EAF0]/60 p-3.5 space-y-1">
              <div className="font-semibold text-[#1E3A54]">Validating LLM-as-a-Judge</div>
              <p className="text-[#231F1A]">
                Separate judge-tuning examples from a held-out human-adjudicated validation set. Audit recall on rare critical errors (false negatives)—high overall agreement can hide missed disasters—and test sensitivity to response length, ordering, and self-preference.
              </p>
            </div>
            <div className="rounded-md border border-[#4A6B4E]/40 bg-[#E6EDE2]/60 p-3.5 space-y-1">
              <div className="font-semibold text-[#2A422D]">Scaling Human Review Reliability</div>
              <p className="text-[#231F1A]">
                Raw % agreement overstates reliability when one class dominates. Use chance-corrected <strong>Cohen’s κ</strong> (2 raters), <strong>weighted κ</strong> (ordinal scales), <strong>Krippendorff’s α</strong> (2+ raters or missing labels), or <strong>ICC</strong> (continuous scores).
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h4 className="font-display text-base font-bold">Avoid Average Traps &amp; Simpson’s Paradox</h4>
          <p className="text-xs text-[#5C5346]">
            Never let a single pass rate bury a severe error or a subgroup failure. Report critical safety/privacy failures as mandatory release blockers and disaggregate metrics by difficulty, language, or user group so an unbalanced task mix cannot reverse the winner (<em>Simpson’s paradox</em>).
          </p>
          <AggregationTrapDiagram />
        </section>
      </div>
    );
  }

  if (moduleId === 'm5') {
    const activeStat = STATS_WORKED_EXAMPLES[selectedStatIdx] ?? STATS_WORKED_EXAMPLES[0];
    return (
      <div className="space-y-6 text-sm leading-relaxed text-[#231F1A]">
        {/* Core Comparison Case */}
        <section className="space-y-3">
          <h4 className="font-display text-lg font-bold">
            Core Case: Is a +0.10-Point Gain Worth 9× the Cost?
          </h4>
          <p>
            Suppose you test <strong>System A</strong> and <strong>System B</strong> on the exact same 200 research tasks (completed by 25 analysts, 8 tasks each; <em>fictional comparison</em>). System A averages <strong>4.10/5</strong> (95% CI [4.02, 4.18]) at $0.02/task and 1.2s latency. System B averages <strong>4.20/5</strong> (95% CI [4.10, 4.30]) at $0.18/task (9× cost) and 6.5s latency (5.4× slower).
          </p>
          <p>
            Three rules govern how to read this comparison:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#231F1A]">
            <li>
              <strong>Estimate the direct difference—never eyeball overlapping CIs:</strong> Because both systems ran on the same 200 tasks, compute the paired difference directly: <strong>+0.10 points</strong>.
            </li>
            <li>
              <strong>Cluster at your unit of analysis:</strong> Remember{' '}
              {onSelectModule ? (
                <button type="button" onClick={() => onSelectModule(0)} className="font-semibold text-[#C8552D] underline">
                  Module 1
                </button>
              ) : (
                <strong>Module 1</strong>
              )}
              : 8 tasks per analyst are correlated, so treating 200 tasks as independent shrinks error bars artificially. The cluster-robust 95% CI is <strong>[+0.01, +0.19]</strong>—statistically detectable above sampling noise, though it still excludes rubric/rater error.
            </li>
            <li>
              <strong>Watch for Goodhart’s Law (Operating Rule 4):</strong> Statistical detectability ≠ practical value. Chasing +0.10 on a 5-point scale at 9× cost and 5.4× latency makes no sense unless it prevents severe errors—and on Non-English queries (<em>n</em> = 15), System A dropped to 2.80 vs. 3.90, flagging a subgroup gap that requires a larger sample before deploying there.
            </li>
          </ul>
        </section>

        {/* 12 Worked Examples */}
        <section className="space-y-3">
          <h4 className="font-display text-base font-bold">
            Statistical Reference: 12 Worked Examples (Pick the Question You Need to Answer)
          </h4>
          <div className="vintage-box rounded-md p-4 space-y-3 text-xs">
            <div className="flex flex-wrap gap-1.5">
              {STATS_WORKED_EXAMPLES.map((ex, i) => (
                <button
                  key={ex.id}
                  type="button"
                  onClick={() => setSelectedStatIdx(i)}
                  className={`rounded border px-2 py-1 text-[11px] font-medium transition ${
                    selectedStatIdx === i
                      ? 'border-[#231F1A] bg-[#231F1A] text-[#FBF7EE]'
                      : 'border-[#231F1A]/30 bg-[#F5EFE2] text-[#231F1A] hover:border-[#231F1A]'
                  }`}
                >
                  {ex.id}. {ex.title.replace(/^\d+\.\s*/, '').split('(')[0].trim()}
                </button>
              ))}
            </div>

            <div className="rounded border border-[#231F1A] bg-[#F5EFE2] p-4 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="font-display text-sm font-bold text-[#231F1A]">{activeStat.title}</div>
                <span className="rounded bg-[#EFE7D6] px-2 py-0.5 font-mono text-[10px] border border-[#231F1A]/30">
                  Fictional Worked Example
                </span>
              </div>
              <div><strong>Question answered:</strong> {activeStat.question}</div>
              <div className="text-[#5C5346]"><strong>Why appropriate:</strong> {activeStat.whyAppropriate}</div>
              <div className="rounded bg-[#FBF7EE] p-2.5 border border-[#231F1A]/20">
                <div><strong>Fictional data:</strong> {activeStat.fictionalData}</div>
                <div className="mt-1 font-mono text-[11px] text-[#1E3A54]">
                  <strong>Calculation:</strong> {activeStat.calculation}
                </div>
              </div>
              <div><strong>What the result means:</strong> {activeStat.meaning}</div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="rounded bg-[#F7E4DC]/70 p-2 text-[#7D3016]">
                  <strong>Does not establish:</strong> {activeStat.doesNotEstablish}
                </div>
                <div className="rounded bg-[#F6ECD5] p-2 text-[#6E4E12]">
                  <strong>Common mistake:</strong> {activeStat.commonMistake}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Validity 3-Pillar Framework */}
        <section className="space-y-3">
          <h4 className="font-display text-base font-bold">Three Distinct Pillars: Validity, Study Design &amp; Reliability</h4>
          <p>
            Grounded in the <em>Standards for Educational and Psychological Testing</em> (2014), keep <strong>measurement validity</strong> (do scores support the claim?), <strong>study design &amp; generalization</strong> (is the effect causal and transferable?), and <strong>reliability &amp; traceability</strong> (is scoring consistent and auditable?) separate. A reproducible pipeline can consistently measure the wrong construct.
          </p>
          <ValidityCategoriesDiagram />
          <div className="space-y-4 text-xs">
            {VALIDITY_CATEGORIES.map((cat) => (
              <div key={cat.id} className="space-y-1">
                <div className="font-display text-sm font-bold text-[#231F1A]">{cat.label}</div>
                <p className="text-[#5C5346]">{cat.corePrinciple}</p>
                <ul className="list-disc pl-5 space-y-0.5 text-[#231F1A]">
                  {cat.items.map((item) => (
                    <li key={item.name}>
                      <strong>{item.name}:</strong> <span className="text-[#5C5346]">{item.question}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <details className="vintage-box rounded-md p-4 text-xs space-y-3">
          <summary className="cursor-pointer font-semibold text-[#231F1A]">
            Reference: 12-Field Pre-Registered Evaluation Protocol Checklist
          </summary>
          <ul className="mt-3 space-y-1 text-[#5C5346]">
            {PROTOCOL_FIELDS.map((f) => (
              <li key={f.id}><strong className="text-[#231F1A]">{f.label}:</strong> {f.placeholder}</li>
            ))}
          </ul>
        </details>
      </div>
    );
  }

  if (moduleId === 'm6') {
    return (
      <div className="space-y-6 text-sm leading-relaxed text-[#231F1A]">
        {/* Layer 4 & Layer 5 Workflow Testing */}
        <section className="space-y-3">
          <h4 className="font-display text-lg font-bold">
            Testing Layers 4–5: Real Workflows, Environment State &amp; Total Human Time
          </h4>
          <p>
            At <strong>Layer 4 (Workflow / Agent)</strong>, never trust an agent’s text response claiming an action succeeded—assert against the actual database, file, API, or citation state after the run finishes.
          </p>
          <p>
            At <strong>Layer 5 (Human–AI Interaction)</strong>, ask one grounded operational question: <strong>does a real user with this AI tool produce better work or finish sooner than with the current workflow?</strong> Run a two-condition comparison (<em>current workflow</em> vs. <em>workflow + AI</em>) with actual target users—not LLM-simulated personas—and measure <strong>total task time</strong> (drafting + citation checking + error fixing). Add a third <strong>AI-alone</strong> condition only if claiming human–AI synergy over both solo baselines.
          </p>
          <OutcomesComparisonDiagram />
        </section>

        {/* Production Monitoring & Lifecycle */}
        <section className="space-y-3">
          <h4 className="font-display text-base font-bold">
            Production Monitoring, Versioning &amp; Reevaluation Triggers
          </h4>
          <p className="text-xs text-[#5C5346]">
            Pre-launch tests only describe a single configuration at one point in time. In production, turn live <strong>telemetry</strong> (overrides, edits, escalations, timeouts) into metrics via explicit <strong>scoring rules</strong> and periodic human audits. Version your product and evaluator separately, assign named risk/halt owners, and define clear triggers for reevaluation (model updates, prompt/retrieval edits, new user groups, or shifting input distributions).
          </p>
          <HorizonDiagram />
          <p className="text-xs text-[#5C5346] border-l-2 border-[#335C81] pl-3">
            <strong>Going deeper into HCI studies?</strong> The SPHERE 5-dimension card (Zhao et al., ACL 2025), synergy meta-analysis, offloading/skill-retention literature, and persona simulation research live in{' '}
            {onOpenTracks ? (
              <button type="button" onClick={onOpenTracks} className="font-semibold text-[#335C81] underline">
                Optional Advanced Track G (Deep Human–AI Research &amp; SPHERE)
              </button>
            ) : (
              <strong>Optional Advanced Track G (Deep Human–AI Research &amp; SPHERE)</strong>
            )}
            .
          </p>
        </section>
      </div>
    );
  }

  // Module 7
  return (
    <div className="space-y-6 text-sm leading-relaxed text-[#231F1A]">
      <section className="space-y-3">
        <h4 className="font-display text-lg font-bold">Four Questions to Audit Any Public AI Claim</h4>
        <p>
          When a leaderboard score becomes a marketing target, it stops being a reliable measure (<em>Goodhart’s Law</em>). Audit every press release, vendor deck, or benchmark headline with four questions: <strong>(1) What layer, unit, and cases were actually tested?</strong> <strong>(2) What comparison was made (and with what pinned harness)?</strong> <strong>(3) What tradeoffs, subgroups, or uncertainties are omitted?</strong> <strong>(4) What wording does the supplied evidence actually support?</strong>
        </p>
        <FallaciesDiagram />
      </section>

      <section className="space-y-3">
        <h4 className="font-display text-base font-bold">Recurring Pitfalls to Check</h4>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#5C5346]">
          <li><strong className="text-[#231F1A]">Contamination, leakage &amp; saturation:</strong> Public test items appearing in pretraining/prompts, or ceiling scores (95%+) hiding real-world edge-case failures.</li>
          <li><strong className="text-[#231F1A]">Overfitting &amp; undisclosed harnesses:</strong> Leaderboard optimization via hidden retries, extra compute, or prompt/tool scaffolds that swing scores more than base models.</li>
          <li><strong className="text-[#231F1A]">Version drift &amp; environment mismatch:</strong> Unpinned API snapshots, different sandboxes/timeouts, or broken grading scripts across compared runs.</li>
          <li><strong className="text-[#231F1A]">Selective reporting &amp; multiple comparisons:</strong> Cherry-picking favorable slices, publishing wins while hiding failures, or testing dozens of metrics without correction.</li>
          <li><strong className="text-[#231F1A]">Misleading averages &amp; Goodharted proxies:</strong> Hiding critical failures inside high means, optimizing a single score at the expense of latency/cost, or equating incompatible benchmarks.</li>
          <li><strong className="text-[#231F1A]">Cross-layer leaps:</strong> Claiming general reasoning, enterprise safety, or analyst productivity (Layers 4–6) from narrow Layer 2 benchmark scores.</li>
        </ul>
      </section>

      <section className="space-y-2.5">
        <h4 className="font-display text-base font-bold">Calibrating Claims to Evidence</h4>
        <div className="overflow-x-auto vintage-box rounded-md">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#231F1A] bg-[#EFE7D6]">
              <tr>
                <th className="px-3.5 py-2 font-semibold">Overextended Claim</th>
                <th className="px-3.5 py-2 font-semibold">Evidence-Matched Formulation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#231F1A]/15">
              {REPORTING_CLAIMS.map((c) => (
                <tr key={c.overextended}>
                  <td className="px-3.5 py-2 font-medium text-[#7D3016]">{c.overextended}</td>
                  <td className="px-3.5 py-2 text-[#2A422D]">{c.defensible}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-[#5C5346] border-l-2 border-[#C8552D] pl-3">
          <strong>Practical note:</strong> Use calibrated phrasing—<em>“The study found…”</em> for specific results, <em>“The authors report…”</em> for third-party claims, and <em>“This remains uncertain…”</em> where details are omitted. Never invent undisclosed configurations or error bars when summarizing a source.
        </p>
      </section>
    </div>
  );
}

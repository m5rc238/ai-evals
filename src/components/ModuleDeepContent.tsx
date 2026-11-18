import { useState } from 'react';
import {
  AggregationTrapDiagram,
  FallaciesDiagram,
  HorizonDiagram,
  LandscapeDiagram,
  LayeredPipelineDiagram,
  OutcomesComparisonDiagram,
  ScopeBoundaryDiagram,
  SphereDiagram,
  SynergyDiagram,
  ValidityCategoriesDiagram,
} from './VisualDiagrams';
import { FirstEvalExercise } from './FirstEvalExercise';
import {
  DISCIPLINES,
  ESSENTIAL_GLOSSARY,
  EVAL_TAXONOMY,
  EVIDENCE_HIERARCHY,
  EVIDENCE_METHODS,
  FLOW_NODES,
  PROTOCOL_FIELDS,
  REPORTING_CLAIMS,
  SAMPLING_PURPOSES,
  SCOPES,
  TARGET_INVENTORY,
  VALIDITY_CATEGORIES,
} from '../data/evalsData';
import { STATS_WORKED_EXAMPLES } from '../data/statsWorkedExamples';
import { LESSON_CONSOLIDATION_MAP } from '../data/curriculum';

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
        {/* Immediate Plain-Language Definition + 3 Core Parts */}
        <section className="space-y-3">
          <p className="text-base font-semibold leading-snug text-[#231F1A]">
            An AI eval is a structured test of how an AI model or application performs on a specific task.
          </p>
          <p>
            Every eval has three parts: <strong>test cases</strong> are the situations you try, <strong>scoring criteria</strong> define a good answer or a failure, and <strong>the scoring method</strong> is how a person or program applies those criteria. Try one complete eval below before reading any framework or glossary.
          </p>
        </section>

        {/* First Exercise Immediately */}
        <FirstEvalExercise />

        {/* Bridge to Real Decisions & Misconceptions */}
        <section className="space-y-3">
          <h4 className="font-display text-base font-bold">
            From One Small Eval to Real Team Decisions
          </h4>
          <p>
            Now apply the same thinking to a broader team question: <strong>“Should our research team use an AI assistant to summarize papers?”</strong> That question splits into smaller tests—each needing different evidence: did the retriever find the right passages, did the summary represent them accurately, did analysts produce better briefs than with their manual workflow, and how much time did they spend checking citations?
          </p>
          <p>
            Notice two distinctions that prevent confusion. First, <strong>what is being evaluated</strong> moves outward in layers: the raw <em>model</em>, the <em>configured system</em> (prompts + retrieval), the <em>application</em> UI, the <em>human–AI workflow</em>, and the <em>organizational outcome</em>. Second, <strong>evaluation categories overlap</strong>: words like <em>capability</em>, <em>safety</em>, and <em>robustness</em> name what concern you test, while <em>comparative</em>, <em>benchmark-based</em>, and <em>longitudinal</em> describe how the study is structured. A four-week comparison of two citation tools with real analysts is comparative, human-centered, and longitudinal at once.
          </p>
          <p className="text-xs text-[#5C5346] border-l-2 border-[#C8552D] pl-3">
            <strong>Practical note:</strong> Keep <em>empirical observations</em> (what happened on the test), <em>normative choices</em> (what failures your team refuses to accept), and <em>recommendations</em> separate. Passing return-policy cases tells you about returns—not lost accounts or overall user benefit.
          </p>
        </section>

        {/* Landscape Diagram After the Exercise */}
        <section className="space-y-3">
          <h4 className="font-display text-base font-bold">How the Bigger Evaluation Landscape Fits Together</h4>
          <p className="text-xs text-[#5C5346]">
            When a quick check grows into a formal study, the diagram below (a <strong>proposed synthesis</strong>, not an established standard) shows how decisions connect to scope, criteria, evidence, and measurement—with feedback loops when early results reshape your criteria, governance across every step, and an outer quality layer asking what claims the evidence actually supports.
          </p>
          <LandscapeDiagram />
        </section>

        {/* Compact Reference Drawer */}
        <details className="vintage-box rounded-md p-4 text-xs">
          <summary className="cursor-pointer font-semibold text-[#231F1A]">
            Reference: 5 Misconceptions, 10-Element Table, Taxonomy, Glossary (15 Terms) &amp; Evidence Hierarchy
          </summary>
          <div className="mt-4 space-y-5">
            <div>
              <div className="font-semibold mb-1.5">Five Common Misconceptions</div>
              <ol className="list-decimal pl-5 space-y-1.5 text-[#5C5346]">
                <li><strong className="text-[#231F1A]">High benchmark score = ready to deploy:</strong> Needs configured-system and real-user workflow evidence.</li>
                <li><strong className="text-[#231F1A]">Correct answer = human-like reasoning:</strong> Memorization or shortcuts can produce the same answer; test perturbations.</li>
                <li><strong className="text-[#231F1A]">Grader agreement = measuring the right thing:</strong> Raters can agree on a flawed rubric; check construct validity.</li>
                <li><strong className="text-[#231F1A]">Faster drafting = faster overall:</strong> Measure total task time including checking and correction.</li>
                <li><strong className="text-[#231F1A]">Zero observed failures = zero risk:</strong> 0/100 still permits up to ~3% failure rate at 95% confidence.</li>
              </ol>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[#231F1A] bg-[#EFE7D6]">
                  <tr>
                    <th className="px-3 py-1.5 font-semibold">Element</th>
                    <th className="px-3 py-1.5 font-semibold">Core Question</th>
                    <th className="px-3 py-1.5 font-semibold">Practical Output</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#231F1A]/15">
                  {FLOW_NODES.map((n) => (
                    <tr key={n.id}>
                      <td className="px-3 py-1.5 font-medium">{n.number}. {n.title}</td>
                      <td className="px-3 py-1.5">{n.question}</td>
                      <td className="px-3 py-1.5 text-[#5C5346]">{n.practicalOutput}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <div className="font-semibold mb-1.5">Evaluation Taxonomy</div>
              <ul className="space-y-1 text-[#5C5346]">
                {EVAL_TAXONOMY.map((item) => (
                  <li key={item.name}><strong className="text-[#231F1A]">{item.name}:</strong> {item.focus}</li>
                ))}
              </ul>
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
            <div>
              <div className="font-semibold mb-1.5">Practical Evidence Hierarchy &amp; Disciplines</div>
              <ul className="space-y-1 text-[#5C5346] mb-3">
                {EVIDENCE_HIERARCHY.map((e) => (
                  <li key={e.level}><strong className="text-[#231F1A]">{e.level}:</strong> {e.role}</li>
                ))}
              </ul>
              <ul className="space-y-1 text-[#5C5346]">
                {DISCIPLINES.map((d) => (
                  <li key={d.name}><strong className="text-[#231F1A]">{d.name}:</strong> {d.role}</li>
                ))}
              </ul>
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
            One Core Question: Does a Person Using AI Do Better Work or Finish Sooner?
          </h4>
          <p>
            When evaluating an assistant or copilot for real work, start with a two-condition comparison: <strong>your team’s current workflow</strong> versus <strong>the same people using the AI tool</strong>. Measure completed work quality and <strong>total task time</strong>—which always includes drafting, reading, citation checking, and fixing mistakes. Faster drafting is not a net time saving if verification eats back the minutes.
          </p>
          <p>
            When do you need a third <strong>AI-alone</strong> condition? Add it when your claim is <strong>synergy</strong>—that the human–AI team outperforms <em>both</em> the human alone and the AI alone. As Vaccaro et al. (2024) found across 106 studies (370 effect sizes), Human+AI often beats humans alone (augmentation) while still losing to the better solo actor on decision-making tasks.
          </p>
          <p className="text-xs text-[#5C5346]">
            <strong>Why direct human-outcome testing matters:</strong> Perceived speed can reverse when timed objectively (METR, 2025), and immediate task completion does not guarantee skill acquisition when learning something new (Anthropic, Jan 29, 2026).
          </p>
          <OutcomesComparisonDiagram />
          <p className="text-xs text-[#5C5346] border-l-2 border-[#C8552D] pl-3">
            <strong>Practical note:</strong> Test with real target users rather than LLM-simulated personas (which CoMPosT, 2023 showed can caricature demographic groups), and watch for <em>automation bias</em> (rubber-stamping fluent errors) versus <em>algorithm aversion</em> (abandoning helpful tools after visible mistakes).
          </p>
        </section>

        <details className="vintage-box rounded-md p-4 text-xs space-y-4">
          <summary className="cursor-pointer font-semibold text-[#231F1A]">
            Extensions: Human–AI Synergy Meta-Analysis (FIG 2.2) &amp; SPHERE Evaluation Card (Zhao et al., 2025)
          </summary>
          <div className="mt-4 space-y-4">
            <p className="text-[#5C5346]">
              <strong>Synergy vs. Augmentation:</strong> Compare Human+AI against Human alone (augmentation) and against max(Human, AI) (synergy).
            </p>
            <SynergyDiagram />
            <p className="text-[#5C5346]">
              <strong>SPHERE</strong> (Zhao et al., ACL 2025 Findings;{' '}
              <a href="https://doi.org/10.18653/v1/2025.findings-acl.70" target="_blank" rel="noopener noreferrer" className="text-[#C8552D] underline">
                DOI: 10.18653/v1/2025.findings-acl.70
              </a>
              {' · '}
              <a href="https://sphere-eval.github.io/" target="_blank" rel="noopener noreferrer" className="text-[#335C81] underline">
                sphere-eval.github.io
              </a>
              ) is a <strong>proposed organizing card</strong> structuring Human–AI evaluation around What, How, Who, When, and Meta-Validation.
            </p>
            <SphereDiagram />
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
            What Problem Are We Trying to Solve—and Do We Need AI for It?
          </h4>
          <p>
            Before designing an AI evaluation for a workplace tool, compare three equally legitimate options: <strong>(1) keeping the current workflow</strong>, <strong>(2) shipping a credible simpler non-AI change</strong> (such as full-text search, cleaner folders, or a 1-page review checklist), and <strong>(3) testing AI assistance</strong>. In our Meridian example, if analysts lose 25 minutes hunting for PDFs and forget to write a Limitations section because there is no template, better search and a checklist may solve the core bottleneck at a fraction of the cost and zero hallucination risk.
          </p>
          <p>
            Choosing the simpler fix is a strong, disciplined outcome—not a failure. Testing AI becomes justified when the simpler baseline still leaves a real bottleneck (such as synthesizing dense methods across five papers) and you want to test whether AI improves on that upgraded baseline.
          </p>
          <p className="text-xs text-[#5C5346] border-l-2 border-[#C8552D] pl-3">
            <strong>Scientific studies note:</strong> Not every evaluation is a deployment decision. A capability study can have a valid scientific purpose—such as probing how a model handles reasoning perturbations—independent of shipping a product.
          </p>
        </section>

        <section className="space-y-3">
          <h4 className="font-display text-base font-bold">For Formal Studies: Scopes, Harnesses &amp; Contamination</h4>
          <p>
            When moving from an informal check to a formal study, specify a falsifiable research question, lock primary outcomes and thresholds <em>before</em> inspecting confirmatory data (separating exploratory trace analysis from confirmatory testing), and pin the entire agent harness (prompts, retrieval index, tools, permissions, stopping rules). Audit for training, test-set, prompt, and temporal leakage so results are not inflated by memorized answers.
          </p>
          <ScopeBoundaryDiagram />
        </section>

        <details className="vintage-box rounded-md p-4 text-xs">
          <summary className="cursor-pointer font-semibold text-[#231F1A]">
            Reference: 10-Field Formal Framing Brief, 6 Scope Boundaries &amp; 12 Target Categories
          </summary>
          <div className="mt-3 space-y-4">
            <p className="text-[#5C5346]">
              <strong>10-field formal brief:</strong> Target population, task, AI system &amp; harness, comparator, context/exclusions, primary &amp; secondary outcomes, measurement period, hypothesis, key confounders, and limits of generalization.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[#231F1A] bg-[#EFE7D6]">
                  <tr>
                    <th className="px-3 py-1.5 font-semibold">Scope</th>
                    <th className="px-3 py-1.5 font-semibold">Boundary</th>
                    <th className="px-3 py-1.5 font-semibold">Transfer Warning</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#231F1A]/15">
                  {SCOPES.map((s) => (
                    <tr key={s.id}>
                      <td className="px-3 py-1.5 font-semibold">{s.name}</td>
                      <td className="px-3 py-1.5 text-[#5C5346]">{s.boundary}</td>
                      <td className="px-3 py-1.5 text-[#7D3016]">{s.transferWarning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

  if (moduleId === 'm4') {
    return (
      <div className="space-y-6 text-sm leading-relaxed text-[#231F1A]">
        <section className="space-y-3">
          <h4 className="font-display text-lg font-bold">
            Writing Three Kinds of Test Cases: Ordinary, Ambiguous, and Escalation
          </h4>
          <p>
            Right after running your first two-case eval in Module 1, the fastest way to make your test suite useful is to cover three situations with explicit, observable expected behavior:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li><strong>Ordinary case:</strong> All facts are clear and within policy (e.g., unused item bought 10 days ago → confirm return directly without redundant questions).</li>
            <li><strong>Ambiguous case:</strong> A crucial detail is missing or borderline (e.g., “I opened the outer box to check the color” → ask or clarify before promising a return).</li>
            <li><strong>Escalation / abstention case:</strong> High-stakes exception or missing evidence (e.g., a $650 damaged item or out-of-corpus question → escalate to a human or abstain rather than guess).</li>
          </ul>
          <p>
            Deliberately difficult <strong>challenge cases</strong> are invaluable because they surface failure modes quickly—but <strong>their failure rate cannot be read as your everyday failure rate</strong>. Only a representative sample of typical traffic estimates how often everyday users encounter an error. Keep challenge sets and representative sets reported separately.
          </p>
          <p className="text-xs text-[#5C5346] border-l-2 border-[#C8552D] pl-3">
            <strong>Practical note:</strong> Building a retrieval-augmented generation (RAG) system? Retrieval-specific metrics (<code>Precision@k</code>, <code>Recall@k</code>, <code>MRR</code>, <code>NDCG@k</code>) and the 100-item RAG dataset assignment live in{' '}
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
          <h4 className="font-display text-base font-bold">Layered Evidence &amp; Task-Matched Metrics</h4>
          <p className="text-xs text-[#5C5346]">
            Pair fast intrinsic case checks early with extrinsic user studies before deployment and monitoring after release. Choose metrics for the construct—classification (precision/recall/F1 under imbalance), generative rubrics (source fidelity, instruction adherence), probability calibration (Brier score, ECE), and operational cost/latency.
          </p>
          <LayeredPipelineDiagram />
        </section>

        <details className="vintage-box rounded-md p-4 text-xs">
          <summary className="cursor-pointer font-semibold text-[#231F1A]">
            Reference: 8 Evidence Collection Methods &amp; 4 Sampling Purposes
          </summary>
          <div className="mt-3 space-y-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[#231F1A] bg-[#EFE7D6]">
                  <tr>
                    <th className="px-3 py-1.5 font-semibold">Method</th>
                    <th className="px-3 py-1.5 font-semibold">Establishes</th>
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
            <ul className="space-y-1 text-[#5C5346]">
              {SAMPLING_PURPOSES.map((sp) => (
                <li key={sp.name}><strong className="text-[#231F1A]">{sp.name}:</strong> {sp.role} <em>({sp.warning})</em></li>
              ))}
            </ul>
          </div>
        </details>
      </div>
    );
  }

  if (moduleId === 'm5') {
    return (
      <div className="space-y-6 text-sm leading-relaxed text-[#231F1A]">
        <section className="space-y-3">
          <h4 className="font-display text-lg font-bold">
            Start with Two Reviewers Disagreeing on One Concrete Answer
          </h4>
          <p>
            Before calculating agreement statistics or building an LLM judge, look at why two careful human reviewers often disagree on the same output (<em>illustrative example</em>):
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
          <p>
            Once individual grades are reliable, avoid the second grading trap: collapsing distinct failures into one average.
          </p>
          <AggregationTrapDiagram />
          <p className="text-xs text-[#5C5346] border-l-2 border-[#C8552D] pl-3">
            <strong>Practical note:</strong> Looking for human-outcomes studies (METR developer timing, Anthropic coding-skills formation, reliance)? Those are consolidated in{' '}
            {onSelectModule ? (
              <button type="button" onClick={() => onSelectModule(1)} className="font-semibold text-[#C8552D] underline">
                Module 2 (Human–AI Interaction)
              </button>
            ) : (
              <strong>Module 2 (Human–AI Interaction)</strong>
            )}
            .
          </p>
        </section>

        <details className="vintage-box rounded-md p-4 text-xs space-y-3">
          <summary className="cursor-pointer font-semibold text-[#231F1A]">
            Scaling Grading: Agreement Statistics (κ, α, ICC), Simpson’s Paradox &amp; LLM-Judge Validation
          </summary>
          <div className="mt-3 space-y-2.5 text-[#5C5346]">
            <p>
              <strong className="text-[#231F1A]">Chance-corrected inter-rater reliability:</strong> Raw percent agreement overstates consistency when one label dominates. Use <strong>Cohen’s κ</strong> (2 raters, nominal), <strong>weighted κ</strong> (ordinal scales), <strong>Krippendorff’s α</strong> (2+ raters or missing labels), or <strong>ICC</strong> (continuous scores).
            </p>
            <p>
              <strong className="text-[#231F1A]">LLM-as-a-judge validation:</strong> Never treat an LLM judge as ground truth without held-out calibration against adjudicated human labels. Separate tuning/calibration data from independent validation data, check recall on rare critical errors (false negatives), and test for position, verbosity, self-preference, and model-family biases.
            </p>
            <p>
              <strong className="text-[#231F1A]">Subgroups &amp; Simpson’s paradox:</strong> Always disaggregate by difficulty, language, or user group so an unbalanced task mix cannot reverse the apparent winner.
            </p>
          </div>
        </details>
      </div>
    );
  }

  if (moduleId === 'm6') {
    const activeStat = STATS_WORKED_EXAMPLES[selectedStatIdx] ?? STATS_WORKED_EXAMPLES[0];
    return (
      <div className="space-y-6 text-sm leading-relaxed text-[#231F1A]">
        {/* Concrete Main Lesson First */}
        <section className="space-y-3">
          <h4 className="font-display text-lg font-bold">
            Core Case: Is a +0.10-Point Gain Worth 9× the Cost?
          </h4>
          <p>
            Suppose you test <strong>System A</strong> and <strong>System B</strong> on the exact same 200 research tasks (completed by 25 analysts, 8 tasks each; <em>fictional comparison</em>). System A averages <strong>4.10/5</strong> (95% CI [4.02, 4.18]) at $0.02/task and 1.2s latency. System B averages <strong>4.20/5</strong> (95% CI [4.10, 4.30]) at $0.18/task (9× cost) and 6.5s latency (5.4× slower).
          </p>
          <p>
            Two rules govern how to read this comparison. First, <strong>never judge statistical significance by whether the two separate 95% CIs overlap</strong>. Because both systems ran on the same 200 tasks, estimate the paired difference directly: <strong>+0.10 points</strong>, with a cluster-robust 95% CI of <strong>[+0.01, +0.19]</strong>. That tells us the small gain is statistically detectable above sampling noise (though it does not measure rubric or rater noise). Second, <strong>statistical detectability is not practical worth</strong>: +0.10 on a 5-point scale rarely justifies 9× cost and 5.4× latency unless that 0.10 shift prevents high-severity errors. Finally, check subgroups: on Non-English queries (<em>n</em> = 15), System A dropped to 2.80 vs. 3.90—a strong warning sign that needs a larger Non-English sample before deploying System A there.
          </p>
        </section>

        {/* 12 Worked Examples Organized by Question */}
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
            Grounded in the <em>Standards for Educational and Psychological Testing</em> (2014), separate <strong>measurement validity</strong> (do scores mean what you claim?), <strong>study design &amp; generalization</strong> (is the difference causal and transferable?), and <strong>reliability &amp; traceability</strong> (is scoring consistent and auditable?). Reliability and validity are distinct: a reproducible pipeline can consistently measure the wrong thing.
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

        {/* Formal Study & Deployment Material */}
        <details className="vintage-box rounded-md p-4 text-xs space-y-4">
          <summary className="cursor-pointer font-semibold text-[#231F1A]">
            Deployment &amp; Formal Study Material: Lifecycle Governance (FIG 6.1), 12-Field Protocol &amp; 9→7 Map
          </summary>
          <div className="mt-4 space-y-4">
            <p className="text-[#5C5346]">
              Before deployment, write a pre-registered protocol, version product and evaluator separately, assign named risk/halt owners, and monitor over realistic horizons (short-term demos can reward sycophancy, whereas longitudinal studies reveal familiarization or trust erosion).
            </p>
            <HorizonDiagram />
            <ul className="space-y-1 text-[#5C5346]">
              {PROTOCOL_FIELDS.map((f) => (
                <li key={f.id}><strong className="text-[#231F1A]">{f.label}:</strong> {f.placeholder}</li>
              ))}
            </ul>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px]">
                <thead className="border-b border-[#231F1A] bg-[#EFE7D6]">
                  <tr>
                    <th className="px-2.5 py-1.5 font-semibold">Original Lesson</th>
                    <th className="px-2.5 py-1.5 font-semibold">New Module</th>
                    <th className="px-2.5 py-1.5 font-semibold">Content Retained</th>
                    <th className="px-2.5 py-1.5 font-semibold">Changes Made</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#231F1A]/15">
                  {LESSON_CONSOLIDATION_MAP.map((row) => (
                    <tr key={row.originalLesson}>
                      <td className="px-2.5 py-1.5 font-medium">{row.originalLesson}</td>
                      <td className="px-2.5 py-1.5">{row.newModule}</td>
                      <td className="px-2.5 py-1.5 text-[#5C5346]">{row.contentRetained}</td>
                      <td className="px-2.5 py-1.5 text-[#5C5346]">{row.changesMade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </details>
      </div>
    );
  }

  // Module 7
  return (
    <div className="space-y-6 text-sm leading-relaxed text-[#231F1A]">
      <section className="space-y-3">
        <h4 className="font-display text-lg font-bold">Four Questions to Audit Any Public AI Claim</h4>
        <p>
          When a leaderboard score becomes a marketing target, it stops being a reliable measure (<em>Goodhart’s law</em>). Audit every press release, vendor deck, or benchmark headline with four questions: <strong>(1) What was actually tested?</strong> <strong>(2) What comparison was made (and with what harness)?</strong> <strong>(3) What is unknown or omitted?</strong> <strong>(4) What wording does the supplied evidence actually support?</strong>
        </p>
        <FallaciesDiagram />
      </section>

      <section className="space-y-3">
        <h4 className="font-display text-base font-bold">Recurring Pitfalls to Check</h4>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#5C5346]">
          <li><strong className="text-[#231F1A]">Contamination, leakage &amp; saturation:</strong> Test items appearing in pretraining/prompts, or ceiling scores (95%+) hiding real-world edge-case failures.</li>
          <li><strong className="text-[#231F1A]">Overfitting &amp; undisclosed harnesses:</strong> Leaderboard optimization via hidden retries, extra compute, or prompt/tool scaffolds that swing scores more than base models.</li>
          <li><strong className="text-[#231F1A]">Version drift &amp; environment mismatch:</strong> Unpinned API snapshots, different sandboxes/timeouts, or broken grading scripts across compared runs.</li>
          <li><strong className="text-[#231F1A]">Selective reporting &amp; multiple comparisons:</strong> Cherry-picking favorable slices, publishing wins while hiding failures, or testing dozens of metrics without correction.</li>
          <li><strong className="text-[#231F1A]">Misleading averages &amp; false equivalence:</strong> Hiding critical failures inside high means, or equating scores across incompatible benchmarks.</li>
          <li><strong className="text-[#231F1A]">Extrapolation &amp; causal leaps:</strong> Claiming general intelligence from narrow tests, inferring causation from observational correlations, or equating offline accuracy with real-world user impact.</li>
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

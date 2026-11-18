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

export function ModuleDeepContent({ moduleId }: { moduleId: string }) {
  const [selectedStatIdx, setSelectedStatIdx] = useState(0);

  if (moduleId === 'm1') {
    return (
      <div className="space-y-6 text-sm leading-relaxed text-[#231F1A]">
        <section className="space-y-3">
          <h4 className="font-display text-lg font-bold">
            Start with a Real Question: “Should our research team use an AI assistant to summarize papers?”
          </h4>
          <p>
            An <strong>AI evaluation</strong> is the systematic collection and interpretation of evidence about an AI model, system, or its effects to answer a specific question and support a decision. A broad question like “should we use this AI?” cannot be answered by a single score. You have to break it into smaller questions that each test a different link in the chain:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-[#231F1A]">
            <li><strong>Did the retriever find the right passages?</strong> Check retrieved chunks against the source PDFs. If retrieval fails, fix search indexing rather than blaming the language model.</li>
            <li><strong>Did the summary represent those passages accurately?</strong> Compare generated claims against the cited text. If qualifiers are dropped or citations invented, tighten prompts or add verification rules.</li>
            <li><strong>Did analysts produce better briefs?</strong> Compare completed briefs written with the AI against your team’s existing manual workflow. Even an accurate summary does not guarantee a stronger final brief.</li>
            <li><strong>How much time did analysts spend checking citations?</strong> Time both drafting and verification. If fast drafts require slow fact-checking, total task time may not improve.</li>
          </ul>
          <p className="text-xs text-[#5C5346] border-l-2 border-[#C8552D] pl-3">
            <strong>Practical note:</strong> Always separate <em>empirical claims</em> (what tests actually showed), <em>normative choices</em> (what error rate or harm your team refuses to accept), and <em>practical recommendations</em> (what to do next given your resources and uncertainty).
          </p>
        </section>

        <section className="space-y-3">
          <h4 className="font-display text-base font-bold">
            What Is Being Evaluated vs. What Kind of Evaluation Is Conducted
          </h4>
          <p>
            Beginners often treat “the AI” as a single object, but five distinct layers exist. Evaluating the <strong>model</strong> tests raw weights on isolated prompts. Evaluating the <strong>configured system</strong> adds your retrieval index, system prompt, and citation rules. The <strong>application</strong> adds the user interface where links appear. The <strong>human–AI workflow</strong> tests whether real analysts using that interface write stronger briefs and catch errors. Finally, <strong>organizational outcome</strong> asks whether the team’s overall work improves once review effort, cost, and maintenance are counted.
          </p>
          <p>
            Evaluation categories also describe two different things that frequently overlap. Terms like <em>capability</em>, <em>behavioral</em>, <em>safety</em>, and <em>robustness</em> name <strong>what concern</strong> you are testing—whether the system can solve a problem, abstains when unsure, avoids leaking secrets, or handles messy inputs. Terms like <em>comparative</em>, <em>benchmark-based</em>, <em>human-centered</em>, and <em>longitudinal</em> describe <strong>how the study is structured</strong>. A four-week study comparing two citation tools with real analysts is comparative, human-centered, and longitudinal at the same time.
          </p>
        </section>

        <section className="space-y-3">
          <h4 className="font-display text-base font-bold">Five Common Misconceptions About AI Evaluation</h4>
          <p className="text-xs text-[#5C5346]">
            Most evaluation mistakes come from stretching limited evidence past what it can support:
          </p>
          <ol className="list-decimal pl-5 space-y-2.5 text-xs leading-relaxed">
            <li>
              <strong>A high benchmark score means the product is ready to deploy.</strong> Leaderboards offer a crisp number that feels like overall quality, but they rarely test your retrieval index, interface, or user workflow. <em>Evidence needed:</em> end-to-end tests of your configured system plus a comparative workflow study with real users.
            </li>
            <li>
              <strong>A correct answer proves the model used the reasoning we attribute to it.</strong> When a model solves a hard problem, it is tempting to infer human-like understanding. Yet memorization, surface shortcuts, or tool crutches can produce the same answer. <em>Evidence needed:</em> perturbations, counterfactuals, and out-of-distribution tests.
            </li>
            <li>
              <strong>Agreement between graders proves they are measuring the right thing.</strong> High inter-rater agreement looks like objective truth, but two raters (or two LLM judges) can consistently agree on a flawed rubric. <em>Evidence needed:</em> construct validity evidence linking the rubric to real-world outcomes.
            </li>
            <li>
              <strong>Faster drafting means the user saves time overall.</strong> Seeing a draft appear in five seconds feels like a speedup, yet reading and verifying uncertain claims can erase the gain. <em>Evidence needed:</em> total task time (drafting plus verification and correction) compared against the manual baseline.
            </li>
            <li>
              <strong>Zero observed failures means the underlying risk is zero.</strong> Passing 100 checks feels reassuring, but 0/100 independent runs still permits up to a ~3% failure rate at 95% confidence. <em>Evidence needed:</em> statistical uncertainty bounds plus targeted adversarial and distribution-shift testing.
            </li>
          </ol>
        </section>

        <section className="space-y-3">
          <h4 className="font-display text-base font-bold">The Proposed 10-Element Landscape &amp; Core Reference</h4>
          <p className="text-xs text-[#5C5346]">
            <strong>How to read Figure 1.1:</strong> Follow the central chain from a concrete decision and scope to criteria, evidence, and measurement, leading back to a bounded action. The dashed loops show that early observations often reshape your criteria or trigger reevaluation after deployment. Governance applies across every step, and the outer quality layer asks how much confidence the evidence genuinely warrants. This 10-element architecture is a <strong>proposed conceptual synthesis</strong>, not an established standard.
          </p>
          <LandscapeDiagram />
        </section>

        <details className="vintage-box rounded-md p-4 text-xs">
          <summary className="cursor-pointer font-semibold text-[#231F1A]">
            Reference: 10-Element Table, Evaluation Taxonomy, Glossary (15 Terms), Evidence Hierarchy &amp; Disciplines
          </summary>
          <div className="mt-4 space-y-5">
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
              <div className="font-semibold mb-1.5">Practical Evidence Hierarchy (not an automatic ranking of truth)</div>
              <ul className="space-y-1 text-[#5C5346]">
                {EVIDENCE_HIERARCHY.map((e) => (
                  <li key={e.level}><strong className="text-[#231F1A]">{e.level}:</strong> {e.role}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-1.5">Contributing Disciplines</div>
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
          <h4 className="font-display text-lg font-bold">Why Evaluating Interaction Differs from Evaluating a Model</h4>
          <p>
            Most AI in daily work operates through interaction—assistants, copilots, and reviewable agents—rather than unattended autonomy. When a human and an AI work together, the final outcome depends on what the user notices, trusts, verifies, and overrides. A model that scores well on an isolated benchmark can still degrade real decisions if its fluent tone encourages uncritical acceptance or if its mistakes are subtle enough to slip past tired reviewers.
          </p>
          <p>
            To organize Human–AI evaluation transparently, <strong>SPHERE</strong> (Zhao et al., ACL 2025 Findings;{' '}
            <a href="https://doi.org/10.18653/v1/2025.findings-acl.70" target="_blank" rel="noopener noreferrer" className="text-[#C8552D] underline">
              DOI: 10.18653/v1/2025.findings-acl.70
            </a>
            {' · '}
            <a href="https://sphere-eval.github.io/" target="_blank" rel="noopener noreferrer" className="text-[#335C81] underline">
              sphere-eval.github.io
            </a>
            ) proposes a five-dimension evaluation card. It is a <strong>proposed organizing framework</strong> bridging HCI and NLP—not a universal standard—and extensions in this study guide (such as the Meridian case study) are guide-specific pedagogy.
          </p>
          <p className="text-xs text-[#5C5346]">
            <strong>How to read Figure 2.1:</strong> SPHERE structures a study around four core choices—what is evaluated, how evidence is collected, who participates, and over what time horizon—bounded by a fifth meta-layer asking how those choices are validated.
          </p>
          <SphereDiagram />
        </section>

        <section className="space-y-3">
          <h4 className="font-display text-base font-bold">Augmentation, Synergy, and Appropriate Reliance</h4>
          <p>
            Evaluating a Human–AI team requires three distinct baselines: <strong>human alone</strong>, <strong>AI alone</strong>, and <strong>human using AI</strong>. <em>Augmentation</em> occurs when Human+AI beats the human alone. True <em>synergy</em> is stricter: Human+AI must beat the better of the human alone or the AI alone. When AI alone outperforms humans on a task, adding a human can actually lower performance if the human overrides accurate AI outputs or fails to catch rare AI errors.
          </p>
          <p className="text-xs text-[#5C5346]">
            <strong>How to read Figure 2.2:</strong> Comparing only against an unassisted human can make a tool look helpful even when the human–AI pair performs worse than the AI or human alone on decision-making tasks.
          </p>
          <SynergyDiagram />
          <p>
            Good interaction therefore hinges on <strong>appropriate reliance</strong>: knowing when to trust calibrated low-stakes outputs, when to verify uncertain claims against primary sources, and when to reject out-of-scope recommendations. Two symmetric failures undermine reliance: <strong>automation bias</strong> (over-accepting plausible errors) and <strong>algorithm aversion</strong> (abandoning helpful tools after visible mistakes). Both are shaped by cognitive workload, user expertise, and whether the interface makes verification easy or exhausting.
          </p>
          <p className="text-xs text-[#5C5346] border-l-2 border-[#C8552D] pl-3">
            <strong>Practical note:</strong> Never treat “human-in-the-loop” as an automatic safety guarantee. Test whether reviewers have the time, expertise, and evidence access to catch actual errors, and avoid replacing real target users with LLM-simulated personas, which CoMPosT (2023) showed can flatten demographics into caricatures.
          </p>
        </section>
      </div>
    );
  }

  if (moduleId === 'm3') {
    return (
      <div className="space-y-6 text-sm leading-relaxed text-[#231F1A]">
        <section className="space-y-3">
          <h4 className="font-display text-lg font-bold">Turning Broad Goals into Answerable Questions</h4>
          <p>
            A vague mandate like “test whether this AI helps” leaves too many degrees of freedom. A defensible evaluation starts with a falsifiable <strong>research question</strong> and pre-specified <strong>hypothesis</strong> naming the system, task, population, comparator, estimand (the exact quantity being estimated, such as mean quality difference), and unit of analysis (claim, brief, conversation, or user).
          </p>
          <p>
            Choosing the <strong>comparator</strong> is one of the most consequential design decisions you make. Comparing a new model against an unassisted novice under artificial time pressure can make a weak system look impressive; comparing it against your team’s actual workflow or a simpler non-AI search tool tests whether the AI adds genuine value. Keep <strong>exploratory mode</strong> (inspecting traces to discover failure modes and refine criteria) strictly separate from <strong>confirmatory mode</strong> (locking primary outcomes, comparisons, and decision thresholds <em>before</em> inspecting confirmatory data).
          </p>
        </section>

        <section className="space-y-3">
          <h4 className="font-display text-base font-bold">Nested Scopes, Agent Harnesses, and Contamination</h4>
          <p>
            Always state the exact boundary of what is being evaluated. For agents, evaluate the model together with its execution harness—tools, instructions, permissions, memory, and stopping rules—because changing the harness can change outcomes more than swapping the base model.
          </p>
          <p className="text-xs text-[#5C5346]">
            <strong>How to read Figure 3.1:</strong> Each outer ring introduces new human, interface, or organizational factors. Evidence at an inner ring (such as a model benchmark) cannot automatically justify claims at an outer ring (such as team productivity).
          </p>
          <ScopeBoundaryDiagram />
          <p>
            Remember that every evaluation result is <strong>conditional</strong> on the exact model snapshot, prompts, tools, dataset, and operating environment. Audit early for <strong>contamination and leakage</strong>—training-data contamination, test-set or prompt leakage, memorization, duplicate items, and temporal leakage (where future facts leak into historical predictions). Document explicit exclusions so readers know which tasks, languages, and populations remain untested.
          </p>
          <p className="text-xs text-[#5C5346] border-l-2 border-[#C8552D] pl-3">
            <strong>Practical note:</strong> Distinguish <em>internal validity</em> (whether the difference was caused by the system rather than confounders), <em>external validity</em> (how far findings generalize), and <em>ecological validity</em> (how closely study tasks match real work).
          </p>
        </section>

        <details className="vintage-box rounded-md p-4 text-xs">
          <summary className="cursor-pointer font-semibold text-[#231F1A]">
            Reference: 6 Scope Boundaries &amp; 12 Evaluation Target Categories
          </summary>
          <div className="mt-3 space-y-4">
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
          <h4 className="font-display text-lg font-bold">From Constructs to Operational Criteria and Metrics</h4>
          <p>
            Abstract goals like “helpfulness” or “groundedness” cannot be measured directly until you build a clear chain: define the <strong>construct</strong>, state a <strong>criterion</strong> (what counts as success or failure), identify an observable <strong>indicator</strong>, specify the <strong>measurement instrument</strong> and scoring scale, and summarize with a <strong>metric</strong>. No single metric captures overall AI quality, and metrics are never interchangeable across tasks.
          </p>
          <div className="overflow-x-auto vintage-box rounded-md">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#231F1A] bg-[#EFE7D6]">
                <tr>
                  <th className="px-3.5 py-2 font-semibold">Task Family</th>
                  <th className="px-3.5 py-2 font-semibold">Appropriate Metrics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#231F1A]/15">
                <tr>
                  <td className="px-3.5 py-2 font-semibold">Classification</td>
                  <td className="px-3.5 py-2">Accuracy, Precision, Recall, F1, Specificity, AUROC (use PR/F1 under class imbalance).</td>
                </tr>
                <tr>
                  <td className="px-3.5 py-2 font-semibold">Information Retrieval</td>
                  <td className="px-3.5 py-2">Precision@k, Recall@k, Mean Reciprocal Rank (MRR), NDCG@k.</td>
                </tr>
                <tr>
                  <td className="px-3.5 py-2 font-semibold">Generative Systems</td>
                  <td className="px-3.5 py-2">Exact match (when unambiguous), anchored human rubrics, task success, factuality, source fidelity, completeness.</td>
                </tr>
                <tr>
                  <td className="px-3.5 py-2 font-semibold">Probability &amp; Uncertainty</td>
                  <td className="px-3.5 py-2">Brier score, Log loss, Expected Calibration Error (ECE), calibration curves.</td>
                </tr>
                <tr>
                  <td className="px-3.5 py-2 font-semibold">Operational Performance</td>
                  <td className="px-3.5 py-2">Latency, throughput, cost per task, failure rate, human verification time.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-3">
          <h4 className="font-display text-base font-bold">Layered Evidence, Dataset Design, and Ground Truth</h4>
          <p>
            Before writing automated checks, inspect real traces to discover how the system actually fails. Then combine fast <strong>intrinsic gates</strong> (unit, behavioral, and retrieval tests) with slower <strong>extrinsic studies</strong> (observed user tasks and controlled comparisons) and ongoing deployment monitoring.
          </p>
          <p className="text-xs text-[#5C5346]">
            <strong>How to read Figure 4.1:</strong> Fast intrinsic checks catch obvious regressions early, extrinsic studies test whether people benefit in practice, and longitudinal monitoring watches for drift after release.
          </p>
          <LayeredPipelineDiagram />
          <p>
            When building a dataset, document your sampling frame, inclusion/exclusion rules, and data provenance. Keep <strong>representative / stratified samples</strong> (used to estimate typical-use error rates) separate from <strong>challenge sets</strong> (edge cases, rare events, missing evidence, and adversarial prompts used to probe weaknesses). Finally, remember that human labels are not automatically error-free: use multiple independent annotators and explicit adjudication rules for ambiguous examples, and test robustness under distribution shift, prompt variation, and long contexts.
          </p>
          <p className="text-xs text-[#5C5346] border-l-2 border-[#C8552D] pl-3">
            <strong>Practical note:</strong> Mixing stress-test challenge items into a representative test set inflates your apparent failure rate, while evaluating only easy typical queries hides brittle edge-case failures. Report them separately.
          </p>
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
          <h4 className="font-display text-lg font-bold">Distinguishing Output Quality from Human Outcomes</h4>
          <p>
            Evaluation targets span nine distinct levels: (1) model output quality, (2) immediate system task performance, (3) human task performance (accuracy and total time), (4) learning and skill acquisition, (5) long-term skill retention and transfer, (6) decision quality and trust calibration, (7) user experience and cognitive workload, (8) organizational productivity, and (9) long-term social and equity consequences. Improvements at an inner level do not automatically transfer outward.
          </p>
          <p className="text-xs text-[#5C5346]">
            <strong>How to read Figure 5.1:</strong> These three studies illustrate how output-level impressions diverge from measured human outcomes: perceived speedup can reverse under timing, task completion can coexist with lower quiz mastery, and workflow offloading relates differently to understanding depending on how users engage.
          </p>
          <OutcomesComparisonDiagram />
        </section>

        <section className="space-y-3">
          <h4 className="font-display text-base font-bold">Validating Human Raters and LLM Judges</h4>
          <p>
            Every grading mechanism introduces its own error modes. For human review, raw percentage agreement overstates consistency when one label is common; use chance-corrected metrics instead: <strong>Cohen’s kappa (κ)</strong> for two raters on nominal categories, <strong>weighted kappa</strong> for ordinal scales where larger disagreements matter more, <strong>Krippendorff’s alpha (α)</strong> when there are multiple raters or missing ratings, and <strong>Intraclass Correlation (ICC)</strong> for continuous scores.
          </p>
          <p>
            When scaling with an <strong>LLM-as-a-judge</strong>, never treat consistency or numerical scores as ground truth. Validate the judge against independently adjudicated human ratings on a held-out set, and explicitly test for <strong>position bias</strong>, <strong>verbosity bias</strong>, <strong>self-preference</strong>, <strong>model-family bias</strong>, and <strong>false negatives</strong> on rare critical errors.
          </p>
        </section>

        <section className="space-y-3">
          <h4 className="font-display text-base font-bold">Aggregation, Subgroups, and Simpson’s Paradox</h4>
          <p>
            A single average can hide critical failures. Always report distributions, subgroup error rates, confidence intervals, and missing data alongside means. Watch for <strong>Simpson’s paradox</strong>, where an unbalanced mix of easy and hard tasks makes a weaker system look better overall even though it loses in every difficulty stratum. Keep mandatory safety constraints separate from weighted averages.
          </p>
          <p className="text-xs text-[#5C5346]">
            <strong>How to read Figure 5.2:</strong> Collapsing 100 runs into a “95% pass rate” treats four minor formatting glitches and one unauthorized data disclosure as equivalent failures, hiding severity and recoverability.
          </p>
          <AggregationTrapDiagram />
          <p className="text-xs text-[#5C5346] border-l-2 border-[#C8552D] pl-3">
            <strong>Practical note:</strong> Keep your LLM judge’s prompt and model snapshot versioned separately from the product under test so an apparent quality jump is never confused with a changed grader.
          </p>
        </section>
      </div>
    );
  }

  if (moduleId === 'm6') {
    const activeStat = STATS_WORKED_EXAMPLES[selectedStatIdx] ?? STATS_WORKED_EXAMPLES[0];
    return (
      <div className="space-y-6 text-sm leading-relaxed text-[#231F1A]">
        {/* Section A */}
        <section className="space-y-3">
          <h4 className="font-display text-lg font-bold">Section A: Statistical Foundations &amp; 12 Worked Examples</h4>
          <p>
            Statistics in AI evaluation helps you distinguish signal from sampling noise, account for clustered observations (such as multiple briefs per analyst or multiple turns per chat), and separate <strong>statistical significance</strong> from <strong>practical importance</strong>. When comparing two systems, never rely on whether two separate 95% confidence intervals overlap—estimate the difference directly and compute a confidence interval for that difference.
          </p>

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

        {/* Section B */}
        <section className="space-y-2.5">
          <h4 className="font-display text-base font-bold">Section B: Experimental Design &amp; Causal Inference</h4>
          <p>
            Match your statistical procedure to the study design: <strong>independent samples</strong> (between-subject randomization), <strong>paired observations</strong> (shared tasks), <strong>within-subject repeated measures</strong> (with counterbalancing to control order and learning effects), or <strong>clustered/crossed observations</strong> (multiple tasks per user and shared packets). No single statistical test fits every design. In observational studies, confounding, selection bias, and attrition limit causal claims.
          </p>
        </section>

        {/* Section C: 3-Category Validity Framework */}
        <section className="space-y-3">
          <h4 className="font-display text-base font-bold">Section C: Three Distinct Categories of Evaluation Quality</h4>
          <p>
            Grounded in the <em>Standards for Educational and Psychological Testing</em> (2014) and argument-based validation, separate <strong>measurement validity</strong> (Category A), <strong>study design &amp; generalization</strong> (Category B), and <strong>reliability &amp; traceability</strong> (Category C). Reliability and validity are related but distinct: a measure can be highly reliable without supporting the intended interpretation or use, and reproducibility never substitutes for validity evidence.
          </p>
          <p className="text-xs text-[#5C5346]">
            <strong>How to read Figure 6.2:</strong> Each pillar answers a different question—whether scores mean what you claim (A), whether the study design supports causal/transfer claims (B), and whether the pipeline is consistent and inspectable (C).
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

        {/* Section D */}
        <section className="space-y-3">
          <h4 className="font-display text-base font-bold">Section D: Lifecycle, Governance &amp; Pre-Registered Protocols</h4>
          <p>
            Evaluation relevance decays as models, prompts, retrieval corpora, users, or rubrics change. Write a pre-registered protocol before running confirmatory checks, maintain audit trails, version the product and evaluator separately, and verify that human reviewers actually have the time, expertise, and authority to intervene.
          </p>
          <p className="text-xs text-[#5C5346]">
            <strong>How to read Figure 6.1:</strong> Short-term demos capture immediate impressions and can reward sycophancy, whereas longitudinal studies reveal whether utility grows after familiarization or trust erodes over repeated use.
          </p>
          <HorizonDiagram />
          <p className="text-xs text-[#5C5346] border-l-2 border-[#C8552D] pl-3">
            <strong>Practical note:</strong> Use the supplementary 12-field Eval Protocol Tool to draft a prospective plan before collecting data, keeping planned rules separate from post-study findings.
          </p>

          <details className="vintage-box rounded-md p-3.5 text-xs">
            <summary className="cursor-pointer font-semibold text-[#231F1A]">
              Reference: 12-Field Protocol &amp; 9-Lesson → 7-Module Consolidation Map
            </summary>
            <div className="mt-3 space-y-4">
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
        </section>
      </div>
    );
  }

  // Module 7
  return (
    <div className="space-y-6 text-sm leading-relaxed text-[#231F1A]">
      <section className="space-y-3">
        <h4 className="font-display text-lg font-bold">Why Benchmarks and Leaderboards Often Mislead</h4>
        <p>
          Public leaderboards are built for quick comparison, but when a measure becomes a target, it ceases to be a good measure (<em>Goodhart’s law</em>). High scores frequently reflect benchmark saturation, training or prompt contamination, unstated retry/tool harnesses, or cherry-picked baselines rather than real-world usefulness. Even clean benchmarks cannot be compared directly across different datasets without shared anchors.
        </p>
        <p className="text-xs text-[#5C5346]">
          <strong>How to read Figure 7.1:</strong> Evaluation errors cluster into four recurring traps—mistaking benchmark scores for deployment readiness, confusing instant preference with long-term benefit, trusting uncalibrated judges or simulated personas, and misreading statistical uncertainty.
        </p>
        <FallaciesDiagram />
      </section>

      <section className="space-y-3">
        <h4 className="font-display text-base font-bold">Core Pitfalls to Audit Before Trusting a Score</h4>
        <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#5C5346]">
          <li><strong className="text-[#231F1A]">Contamination, leakage &amp; saturation:</strong> Test items appearing in pretraining/prompts, or ceiling scores (95%+) hiding real-world edge-case failures.</li>
          <li><strong className="text-[#231F1A]">Overfitting &amp; undisclosed harnesses:</strong> Leaderboard optimization via hidden retries, extra compute, or prompt/tool scaffolds that swing scores more than base models.</li>
          <li><strong className="text-[#231F1A]">Version drift &amp; environment mismatch:</strong> Unpinned API snapshots, different sandboxes/timeouts, or broken grading scripts across compared runs.</li>
          <li><strong className="text-[#231F1A]">Synthetic benchmark blind spots:</strong> LM-generated test sets that mirror generator biases and lack real-world messiness.</li>
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
          <strong>Practical note:</strong> Use calibrated language—<em>“The study found…”</em> for specific results, <em>“The evidence suggests…”</em> for cautious inference, and <em>“This remains uncertain…”</em> where evidence is incomplete.
        </p>
      </section>
    </div>
  );
}

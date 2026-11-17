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
  STATEMENT_TYPES,
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
        <div className="space-y-2.5">
          <h4 className="font-display text-base font-bold">Statement Types &amp; Proposed 10-Element Landscape</h4>
          <p className="text-xs text-[#5C5346]">
            The 10-element architecture below is a <strong>proposed conceptual synthesis</strong>—not an established standard or empirically validated universal model.
          </p>
          <div className="grid gap-2.5 sm:grid-cols-3 text-xs">
            {STATEMENT_TYPES.map((st) => (
              <div key={st.type} className="vintage-box rounded-md p-3.5 space-y-1">
                <div className="font-semibold">{st.type}</div>
                <p className="text-[#5C5346]">{st.description}</p>
                <p className="italic text-[#231F1A]">{st.example}</p>
              </div>
            ))}
          </div>
          <LandscapeDiagram />
          <div className="overflow-x-auto vintage-box rounded-md">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#231F1A] bg-[#EFE7D6]">
                <tr>
                  <th className="px-3.5 py-2 font-semibold">Element</th>
                  <th className="px-3.5 py-2 font-semibold">Core Question</th>
                  <th className="px-3.5 py-2 font-semibold">Practical Output</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#231F1A]/15">
                {FLOW_NODES.map((n) => (
                  <tr key={n.id}>
                    <td className="px-3.5 py-2 font-medium">{n.number}. {n.title}</td>
                    <td className="px-3.5 py-2">{n.question}</td>
                    <td className="px-3.5 py-2 text-[#5C5346]">{n.practicalOutput}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-2.5">
          <h4 className="font-display text-base font-bold">Taxonomy of AI Evaluation &amp; Scope Levels</h4>
          <div className="grid gap-2 sm:grid-cols-2 text-xs">
            {EVAL_TAXONOMY.map((item) => (
              <div key={item.name} className="vintage-box rounded-md p-3">
                <span className="font-semibold">{item.name}: </span>
                <span className="text-[#5C5346]">{item.focus}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#5C5346]">
            Distinguish five evaluation levels: <strong>Model</strong> (weights/API) → <strong>System</strong> (model + retrieval/tools/prompts) → <strong>Application</strong> (user-facing product) → <strong>Human–AI workflow</strong> (team task execution) → <strong>Organizational impact</strong> (net value after review, coordination, and cost).
          </p>
        </div>

        <div className="space-y-2.5">
          <h4 className="font-display text-base font-bold">Essential Terminology (15 Core Terms)</h4>
          <div className="grid gap-2 sm:grid-cols-3 text-xs">
            {ESSENTIAL_GLOSSARY.map((g) => (
              <div key={g.term} className="vintage-box rounded-md p-2.5">
                <div className="font-semibold text-[#C8552D]">{g.term}</div>
                <p className="mt-0.5 text-[#5C5346]">{g.def}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2.5">
          <h4 className="font-display text-base font-bold">Evidence Hierarchy &amp; Contributing Disciplines</h4>
          <p className="text-xs text-[#5C5346]">
            This hierarchy is a <strong>practical classification</strong> of source rigor, not an automatic ranking of truth: a well-designed preprint can be more informative than a poorly scoped report.
          </p>
          <div className="overflow-x-auto vintage-box rounded-md">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#231F1A] bg-[#EFE7D6]">
                <tr>
                  <th className="px-3.5 py-2 font-semibold">Source Type</th>
                  <th className="px-3.5 py-2 font-semibold">Role &amp; Evidentiary Weight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#231F1A]/15">
                {EVIDENCE_HIERARCHY.map((e) => (
                  <tr key={e.level}>
                    <td className="px-3.5 py-2 font-medium">{e.level}</td>
                    <td className="px-3.5 py-2 text-[#5C5346]">{e.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid gap-2 sm:grid-cols-2 text-xs">
            {DISCIPLINES.map((d) => (
              <div key={d.name} className="vintage-box rounded-md p-2.5">
                <span className="font-semibold">{d.name}: </span>
                <span className="text-[#5C5346]">{d.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (moduleId === 'm2') {
    return (
      <div className="space-y-6 text-sm leading-relaxed text-[#231F1A]">
        <div className="space-y-2.5">
          <h4 className="font-display text-base font-bold">The Proposed SPHERE Evaluation Card</h4>
          <p className="text-xs text-[#5C5346]">
            <strong>SPHERE</strong> (Zhao et al., ACL 2025 Findings;{' '}
            <a href="https://doi.org/10.18653/v1/2025.findings-acl.70" target="_blank" rel="noopener noreferrer" className="text-[#C8552D] underline">
              DOI: 10.18653/v1/2025.findings-acl.70
            </a>
            {' · '}
            <a href="https://sphere-eval.github.io/" target="_blank" rel="noopener noreferrer" className="text-[#335C81] underline">
              sphere-eval.github.io
            </a>
            ) is a <strong>proposed organizing framework</strong> bridging HCI and NLP—not a universally mandated standard. Extensions in this study guide (such as the Meridian case study) are guide-specific pedagogy rather than part of the original SPHERE publication.
          </p>
          <SphereDiagram />
        </div>

        <div className="space-y-2.5">
          <h4 className="font-display text-base font-bold">Augmentation, Synergy &amp; Substitution</h4>
          <p className="text-xs text-[#5C5346]">
            Compare three baselines: <strong>Human alone</strong>, <strong>AI alone</strong>, and <strong>Human+AI</strong>. <em>Augmentation</em> means Human+AI &gt; Human alone; <em>Synergy</em> means Human+AI &gt; max(Human alone, AI alone); <em>Substitution</em> replaces the human step when automation is reliable and appropriate.
          </p>
          <SynergyDiagram />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 text-xs">
          <div className="vintage-box rounded-md p-4 space-y-2">
            <div className="font-semibold text-sm">Appropriate Reliance &amp; Human Factors</div>
            <ul className="space-y-1 text-[#5C5346]">
              <li>• <strong>When to trust / verify / reject:</strong> Trust when calibrated and low-stakes; verify when uncertainty is high; reject when outside scope or contradicted by primary evidence.</li>
              <li>• <strong>Automation bias vs. aversion:</strong> Over-accepting AI errors vs. rejecting useful AI after visible mistakes.</li>
              <li>• <strong>Overreliance vs. underreliance:</strong> Failing to check faulty outputs vs. ignoring valid help.</li>
              <li>• <strong>Workload, attention &amp; offloading:</strong> Saving keystrokes can reduce cognitive load or erode vigilance and skill retention.</li>
            </ul>
          </div>
          <div className="vintage-box rounded-md p-4 space-y-2">
            <div className="font-semibold text-sm">Interaction Patterns &amp; Synthetic Users</div>
            <ul className="space-y-1 text-[#5C5346]">
              <li>• <strong>Roles:</strong> AI as assistant, collaborator, decision support, or autonomous agent.</li>
              <li>• <strong>Oversight modes:</strong> Human-in-the-loop (approves each action), human-on-the-loop (monitors and intervenes), and organizational oversight.</li>
              <li>• <strong>Individual &amp; task context:</strong> Expertise, cognitive load, and stakes strongly moderate whether AI helps or hurts.</li>
              <li>• <strong>Synthetic personas:</strong> Useful for early sanity checks, but cannot replace real users (CoMPosT showed demographic caricature risks).</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  if (moduleId === 'm3') {
    return (
      <div className="space-y-6 text-sm leading-relaxed text-[#231F1A]">
        <div className="space-y-2.5">
          <h4 className="font-display text-base font-bold">From Broad Goals to Testable Research Questions</h4>
          <div className="grid gap-2 sm:grid-cols-2 text-xs">
            {[
              ['Research question & hypothesis', 'A falsifiable question plus a pre-specified directional or non-inferiority prediction.'],
              ['Independent & dependent variables', 'What you manipulate (e.g., AI access, prompt) and what outcome you measure (e.g., synthesis quality).'],
              ['Estimand & unit of analysis', 'The exact target quantity (e.g., mean quality difference) and unit (claim, task, conversation, user).'],
              ['Comparators & baselines', 'Human baseline, prior model version, competing model, non-AI workflow, or production system. Different comparators yield different conclusions.'],
            ].map(([k, v]) => (
              <div key={k} className="vintage-box rounded-md p-3">
                <div className="font-semibold">{k}</div>
                <p className="mt-0.5 text-[#5C5346]">{v}</p>
              </div>
            ))}
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2 text-xs">
            <div className="rounded-md border border-[#335C81] bg-[#E3EAF0] p-3">
              <strong>Exploratory Mode:</strong> Discover failures, needs, and hypotheses; criteria may evolve as traces are inspected.
            </div>
            <div className="rounded-md border border-[#4A6B4E] bg-[#E6EDE2] p-3">
              <strong>Confirmatory Mode:</strong> Lock outcomes, comparisons, analyses, and thresholds <em>before</em> inspecting confirmatory results.
            </div>
          </div>
        </div>

        <div className="space-y-2.5">
          <h4 className="font-display text-base font-bold">Nested Scopes, Harnesses &amp; Targets</h4>
          <ScopeBoundaryDiagram />
          <div className="overflow-x-auto vintage-box rounded-md">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#231F1A] bg-[#EFE7D6]">
                <tr>
                  <th className="px-3.5 py-2 font-semibold">Scope</th>
                  <th className="px-3.5 py-2 font-semibold">Boundary</th>
                  <th className="px-3.5 py-2 font-semibold">Transfer Warning</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#231F1A]/15">
                {SCOPES.map((s) => (
                  <tr key={s.id}>
                    <td className="px-3.5 py-2 font-semibold">{s.name}</td>
                    <td className="px-3.5 py-2 text-[#5C5346]">{s.boundary}</td>
                    <td className="px-3.5 py-2 text-[#7D3016]">{s.transferWarning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid gap-2 sm:grid-cols-3 text-xs">
            {TARGET_INVENTORY.slice(0, 6).map((t) => (
              <div key={t.name} className="vintage-box rounded-md p-2.5">
                <div className="font-semibold">{t.name}</div>
                <p className="mt-0.5 text-[#5C5346]">{t.concerns}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="vintage-box rounded-md p-4 space-y-2 text-xs">
          <div className="font-semibold text-sm">Contamination, Leakage &amp; Validity Framing</div>
          <p className="text-[#5C5346]">
            Results are always <strong>conditional</strong> on model version, prompts, tools, configuration, dataset, and environment. Audit for: <strong>training-data contamination</strong>, <strong>test-set leakage</strong>, <strong>prompt leakage</strong>, <strong>memorization</strong>, <strong>data duplication</strong>, <strong>temporal leakage</strong> (future info leaking into past predictions), and <strong>evaluation gaming</strong>. Distinguish <strong>internal validity</strong> (causal attribution), <strong>external validity</strong> (generalization), and <strong>ecological validity</strong> (real-world realism).
          </p>
        </div>
      </div>
    );
  }

  if (moduleId === 'm4') {
    return (
      <div className="space-y-6 text-sm leading-relaxed text-[#231F1A]">
        <div className="space-y-2.5">
          <h4 className="font-display text-base font-bold">Operational Criteria &amp; Task-Appropriate Metrics</h4>
          <p className="text-xs text-[#5C5346]">
            Distinguish <strong>Construct</strong> → <strong>Criterion</strong> → <strong>Indicator</strong> → <strong>Metric</strong> → <strong>Measurement instrument</strong> → <strong>Score</strong>. Document each criterion’s definition, construct, indicator, procedure, scale, evidence source, threshold (if justified), and limitations. No single metric captures overall AI quality.
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
                  <td className="px-3.5 py-2">Exact match (where unambiguous), anchored human rubrics, task success, factuality, source fidelity, completeness, instruction adherence.</td>
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
        </div>

        <LayeredPipelineDiagram />

        <div className="grid gap-4 sm:grid-cols-2 text-xs">
          <div className="vintage-box rounded-md p-4 space-y-2">
            <div className="font-semibold text-sm">Dataset Design &amp; Sampling</div>
            <p className="text-[#5C5346]">
              Specify sampling frames, inclusion/exclusion criteria, provenance, and documentation. Keep <strong>representative / stratified / random sampling</strong> (for population estimates) separate from <strong>challenge sets</strong> (edge cases, rare events, class imbalance) and <strong>convenience samples</strong>. Verify temporal, geographic, and demographic coverage.
            </p>
          </div>
          <div className="vintage-box rounded-md p-4 space-y-2">
            <div className="font-semibold text-sm">Ground Truth &amp; Robustness Testing</div>
            <p className="text-[#5C5346]">
              Human labels and consensus gold standards are not automatically error-free on ambiguous or subjective items; use multiple annotators and expert adjudication. Test robustness under <strong>distribution shift</strong>, <strong>perturbations</strong>, <strong>adversarial inputs</strong>, <strong>prompt variation</strong>, <strong>missing info</strong>, <strong>long context</strong>, and <strong>out-of-distribution</strong> cases.
            </p>
          </div>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4 text-xs">
          {SAMPLING_PURPOSES.map((sp) => (
            <div key={sp.name} className="vintage-box rounded-md p-3 space-y-1">
              <div className="font-semibold">{sp.name}</div>
              <p className="text-[#5C5346]">{sp.role}</p>
              <p className="font-medium text-[#C8552D]">{sp.warning}</p>
            </div>
          ))}
        </div>

        <div className="overflow-x-auto vintage-box rounded-md">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#231F1A] bg-[#EFE7D6]">
              <tr>
                <th className="px-3.5 py-2 font-semibold">Evidence Method</th>
                <th className="px-3.5 py-2 font-semibold">What It Establishes</th>
                <th className="px-3.5 py-2 font-semibold">Main Limitation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#231F1A]/15">
              {EVIDENCE_METHODS.map((m) => (
                <tr key={m.name}>
                  <td className="px-3.5 py-2 font-medium">{m.name}</td>
                  <td className="px-3.5 py-2">{m.establishes}</td>
                  <td className="px-3.5 py-2 text-[#5C5346]">{m.limitation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (moduleId === 'm5') {
    return (
      <div className="space-y-6 text-sm leading-relaxed text-[#231F1A]">
        <div className="space-y-2.5">
          <h4 className="font-display text-base font-bold">Nine Levels of Outcomes</h4>
          <p className="text-xs text-[#5C5346]">
            Improvements at one level do not automatically establish improvements at higher levels:
          </p>
          <div className="grid gap-2 sm:grid-cols-3 text-xs">
            {[
              '1. Model output quality',
              '2. Immediate system task performance',
              '3. Human task performance (accuracy & time)',
              '4. Learning & skill acquisition',
              '5. Long-term skill retention & transfer',
              '6. Decision quality & trust calibration',
              '7. User experience & cognitive workload',
              '8. Organizational productivity',
              '9. Long-term social & equity consequences',
            ].map((lvl) => (
              <div key={lvl} className="vintage-box rounded-md px-3 py-2 font-medium">
                {lvl}
              </div>
            ))}
          </div>
          <OutcomesComparisonDiagram />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 text-xs">
          <div className="vintage-box rounded-md p-4 space-y-2">
            <div className="font-semibold text-sm">Grader &amp; Inter-Rater Reliability</div>
            <ul className="space-y-1 text-[#5C5346]">
              <li>• <strong>Cohen’s kappa (κ):</strong> Chance-corrected agreement for 2 raters on nominal categories.</li>
              <li>• <strong>Weighted kappa:</strong> Penalizes larger disagreements on ordinal scales (e.g., 1 vs. 4).</li>
              <li>• <strong>Krippendorff’s alpha (α):</strong> Handles 2+ raters, missing data, and nominal/ordinal/interval scales.</li>
              <li>• <strong>Intraclass Correlation (ICC):</strong> Reliability for continuous/interval ratings across raters.</li>
            </ul>
          </div>
          <div className="vintage-box rounded-md p-4 space-y-2">
            <div className="font-semibold text-sm">LLM-as-a-Judge Validation</div>
            <p className="text-[#5C5346]">
              Never treat an LLM judge as ground truth merely because it is consistent. Validate against held-out human judgments and test for <strong>position bias</strong>, <strong>verbosity bias</strong>, <strong>self-preference</strong>, <strong>model-family bias</strong>, <strong>prompt sensitivity</strong>, <strong>false positives</strong>, and <strong>rare-failure false negatives</strong>.
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          <h4 className="font-display text-base font-bold">Aggregation, Subgroup Analysis &amp; Simpson’s Paradox</h4>
          <p className="text-xs text-[#5C5346]">
            Report means alongside medians, distributions, subgroup error rates, confidence intervals, missing data, and outliers. Watch for <strong>Simpson’s paradox</strong> (where a trend reverses when subgroups are combined) and keep mandatory safety constraints separate from weighted averages:
          </p>
          <AggregationTrapDiagram />
        </div>
      </div>
    );
  }

  if (moduleId === 'm6') {
    const activeStat = STATS_WORKED_EXAMPLES[selectedStatIdx] ?? STATS_WORKED_EXAMPLES[0];
    return (
      <div className="space-y-6 text-sm leading-relaxed text-[#231F1A]">
        {/* Section A */}
        <div className="vintage-box rounded-md p-4 space-y-3 text-xs">
          <h4 className="font-display text-base font-bold">Section A: Statistical Foundations &amp; 12 Worked Examples</h4>
          <p className="text-[#5C5346]">
            Distinguish descriptive statistics (mean, median, variance, SD, distributions) from inferential uncertainty (sampling error, CIs, hypothesis tests, effect sizes, power, multiple comparisons, missing data, clustered observations, and repeated measures). Always compute a <strong>direct difference CI</strong> when comparing two systems—<strong>the overlap or non-overlap of two separate 95% CIs is not a formal statistical test of the difference</strong>.
          </p>

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

        {/* Section B */}
        <div className="vintage-box rounded-md p-4 space-y-2 text-xs">
          <h4 className="font-display text-base font-bold">Section B: Experimental Design &amp; Causal Inference</h4>
          <p className="text-[#5C5346]">
            Select statistical procedures to match the design: <strong>independent samples</strong> (between-subject randomization), <strong>paired observations</strong> (shared tasks), <strong>within-subject repeated measures</strong> (with counterbalancing to control order/learning effects), or <strong>clustered observations</strong> (multiple tasks per user or turns per conversation). No single statistical test fits every design. In <strong>observational studies</strong>, confounding, selection bias, and attrition limit causal inference.
          </p>
        </div>

        {/* Section C: Reorganized 3-Category Validity Framework */}
        <div className="space-y-3">
          <h4 className="font-display text-base font-bold">Section C: Three Distinct Categories of Evaluation Quality</h4>
          <p className="text-xs text-[#5C5346]">
            Grounded in the <em>Standards for Educational and Psychological Testing</em> (2014) and argument-based validation, separate <strong>measurement validity</strong> (Category A), <strong>study design &amp; generalization</strong> (Category B), and <strong>reliability &amp; traceability</strong> (Category C).
          </p>
          <ValidityCategoriesDiagram />
          <div className="space-y-3">
            {VALIDITY_CATEGORIES.map((cat) => (
              <div key={cat.id} className="vintage-box rounded-md p-4 space-y-2.5 text-xs">
                <div>
                  <div className="font-display text-sm font-bold text-[#231F1A]">{cat.label}</div>
                  <p className="text-[#5C5346]">{cat.subtitle}</p>
                </div>
                <div className="rounded border border-[#231F1A]/20 bg-[#EFE7D6] p-2.5 font-medium text-[#231F1A]">
                  {cat.corePrinciple}
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {cat.items.map((item) => (
                    <div key={item.name} className="rounded bg-[#F5EFE2] p-2.5">
                      <span className="font-semibold text-[#231F1A]">{item.name}: </span>
                      <span className="text-[#5C5346]">{item.question}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section D */}
        <div className="space-y-3">
          <h4 className="font-display text-base font-bold">Section D: Lifecycle, Governance &amp; Pre-Registered Protocols</h4>
          <HorizonDiagram />
          <p className="text-xs text-[#5C5346]">
            Write an evaluation protocol <em>before</em> running confirmatory tests. Maintain <strong>audit trails</strong>, <strong>reproducibility</strong>, <strong>separate product and evaluator versioning</strong>, <strong>risk-based reevaluation triggers</strong>, <strong>escalation criteria</strong>, <strong>drift detection</strong>, and <strong>oversight checks</strong> (does the human reviewer have time, expertise, and authority?).
          </p>
          <div className="grid gap-2 sm:grid-cols-2 text-xs">
            {PROTOCOL_FIELDS.map((f) => (
              <div key={f.id} className="vintage-box rounded-md p-2.5">
                <span className="font-semibold">{f.label}: </span>
                <span className="text-[#5C5346]">{f.placeholder}</span>
              </div>
            ))}
          </div>

          <details className="vintage-box rounded-md p-3.5 text-xs">
            <summary className="cursor-pointer font-semibold text-[#231F1A]">
              Curriculum Note: How the Original 9 Lessons Consolidated into 7 Modules
            </summary>
            <div className="mt-3 overflow-x-auto">
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
          </details>
        </div>
      </div>
    );
  }

  // Module 7
  return (
    <div className="space-y-6 text-sm leading-relaxed text-[#231F1A]">
      <FallaciesDiagram />

      <div className="space-y-2.5">
        <h4 className="font-display text-base font-bold">18 Ways Benchmarks &amp; Leaderboards Mislead</h4>
        <div className="grid gap-2 sm:grid-cols-2 text-xs">
          {[
            ['1. Benchmark saturation', 'Ceiling scores (95%+) hide failure modes on harder real-world edge cases.'],
            ['2. Data contamination', 'Test items appear in pretraining or fine-tuning corpora.'],
            ['3. Training/test leakage', 'Validation or test examples leak into prompt engineering or tuning.'],
            ['4. Benchmark overfitting', 'Optimizing prompts/models specifically for public benchmark quirks (Goodhart’s law).'],
            ['5. Leaderboard optimization', 'Chasing rank via retries, scaffolds, or test-time compute without disclosing cost.'],
            ['6. Prompt & harness sensitivity', 'Small prompt or tool-harness changes swing scores more than model differences.'],
            ['7. Model version drift', 'Comparing results across unpinned or silently updated API snapshots.'],
            ['8. Environment differences', 'Different timeouts, sandboxes, Python packages, or retrieval indices across runs.'],
            ['9. Hidden test-set flaws', 'Mislabeled ground truth, ambiguous questions, or broken grading scripts.'],
            ['10. Synthetic benchmark limits', 'LM-generated test items can mirror generator blind spots and lack real-world messiness.'],
            ['11. Publication & reporting bias', 'Publishing favorable benchmarks while omitting failed internal evaluations.'],
            ['12. Cherry-picking', 'Highlighting best-of-N examples or favorable subsets.'],
            ['13. Multiple comparisons', 'Testing dozens of metrics/prompts and reporting only the winning slice without correction.'],
            ['14. Misleading averages', 'Averaging across unrelated tasks or hiding critical failures inside high means.'],
            ['15. False equivalence across benchmarks', 'Treating 80% on Benchmark A as comparable to 80% on Benchmark B.'],
            ['16. Narrow-task extrapolation', 'Claiming "general reasoning" or "PhD intelligence" from narrow test items.'],
            ['17. Correlation as causation', 'Claiming AI caused productivity gains from observational usage correlations.'],
            ['18. Model score as real-world impact', 'Assuming offline accuracy guarantees user benefit, safety, or organizational ROI.'],
          ].map(([title, desc]) => (
            <div key={title} className="vintage-box rounded-md p-2.5">
              <div className="font-semibold text-[#7D3016]">{title}</div>
              <p className="mt-0.5 text-[#5C5346]">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2.5">
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
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Award, Check, CheckSquare, Copy, Download, FileText, Printer, Square } from 'lucide-react';
import { CAPSTONE_SCENARIO } from '../data/advancedTracks';
import {
  FICTIONAL_SAMPLE_RESULTS,
  FOUR_LEVEL_RUBRIC,
  WORKED_MERIDIAN_PROPOSAL,
} from '../data/capstoneWorked';

type CapstoneTab = 'template' | 'worked' | 'results' | 'report' | 'rubric';

export function CapstoneView() {
  const [tab, setTab] = useState<CapstoneTab>('worked');
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [templateValues, setTemplateValues] = useState<Record<number, string>>({});
  const [copied, setCopied] = useState(false);

  const completedCount = Object.values(checked).filter(Boolean).length;

  const toggle = (num: number) => {
    setChecked((p) => ({ ...p, [num]: !p[num] }));
  };

  const templateMarkdown = `# AI Evaluation Proposal Template (22 Elements)

${CAPSTONE_SCENARIO.requiredSections
  .map((s) => `## ${s.num}. ${s.title}\n*Guidance: ${s.detail}*\n\n${templateValues[s.num] || '[Your response here]'}\n`)
  .join('\n')}`;

  const copyTemplate = async () => {
    await navigator.clipboard.writeText(templateMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTemplate = () => {
    const blob = new Blob([templateMarkdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai-eval-capstone-template.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <article className="mx-auto max-w-4xl space-y-6 pb-16">
      <header className="space-y-3 border-b-2 border-[#231F1A] pb-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#C8552D]">
            Final Capstone Project
          </span>
          <span className="rounded bg-[#EFE7D6] px-2.5 py-0.5 font-mono text-xs font-semibold text-[#231F1A] border border-[#231F1A]/30">
            {completedCount} / {CAPSTONE_SCENARIO.requiredSections.length} planned
          </span>
        </div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-[#231F1A] sm:text-3xl">
          {CAPSTONE_SCENARIO.title}
        </h2>
        <p className="text-sm leading-relaxed text-[#231F1A]">{CAPSTONE_SCENARIO.description}</p>
        <p className="rounded border border-[#335C81] bg-[#E3EAF0] p-3 text-xs text-[#1E3A54]">
          <strong>Illustrative / Fictional Note:</strong> {CAPSTONE_SCENARIO.note}
        </p>

        {/* Sub-navigation */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {(
            [
              ['worked', 'A. Worked Proposal (Meridian)'],
              ['template', 'B. Reusable Template (22 Fields)'],
              ['results', 'C–D. Sample Results & Analysis'],
              ['report', 'F. Sample Final Report'],
              ['rubric', 'E. 4-Level Grading Rubric'],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition ${
                tab === id
                  ? 'border-[#231F1A] bg-[#231F1A] text-[#FBF7EE]'
                  : 'border-[#231F1A]/30 bg-[#FBF7EE] text-[#231F1A] hover:border-[#231F1A]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      {/* A. Worked Proposal */}
      {tab === 'worked' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-display text-xl font-bold text-[#231F1A]">
              Illustrative Worked Proposal: Meridian Research Assistant v2.1
            </h3>
            <span className="rounded bg-[#F6ECD5] px-2 py-0.5 font-mono text-[10px] font-semibold border border-[#D49B2A]">
              Fictional Example
            </span>
          </div>
          <div className="grid gap-2.5 sm:grid-cols-2 text-xs">
            {WORKED_MERIDIAN_PROPOSAL.map((item) => (
              <div key={item.num} className="vintage-box rounded-md p-3.5 space-y-1">
                <div className="font-semibold text-[#C8552D]">
                  {item.num}. {item.title}
                </div>
                <p className="text-[#231F1A] leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* B. Reusable Template */}
      {tab === 'template' && (
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="font-display text-xl font-bold text-[#231F1A]">
                Reusable 22-Element Evaluation Protocol Template
              </h3>
              <p className="text-xs text-[#5C5346]">
                Use independently of the Meridian scenario to design and document your own evaluation study.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={copyTemplate}
                className="vintage-btn inline-flex items-center gap-1.5 rounded-md bg-[#231F1A] px-3 py-1.5 text-xs font-medium text-[#FBF7EE]"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy Markdown'}
              </button>
              <button
                type="button"
                onClick={downloadTemplate}
                className="vintage-btn inline-flex items-center gap-1.5 rounded-md bg-[#FBF7EE] px-3 py-1.5 text-xs font-medium text-[#231F1A]"
              >
                <Download className="h-3.5 w-3.5" />
                Download .md
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="vintage-btn inline-flex items-center gap-1.5 rounded-md bg-[#F6ECD5] px-3 py-1.5 text-xs font-medium text-[#231F1A]"
              >
                <Printer className="h-3.5 w-3.5" />
                Print
              </button>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {CAPSTONE_SCENARIO.requiredSections.map((sec) => {
              const done = !!checked[sec.num];
              return (
                <div
                  key={sec.num}
                  className={`rounded-md border p-3 text-xs space-y-2 ${
                    done ? 'border-[#4A6B4E] bg-[#E6EDE2]' : 'border-[#231F1A]/30 bg-[#FBF7EE]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(sec.num)}
                    className="flex w-full items-start gap-2 text-left"
                  >
                    {done ? (
                      <CheckSquare className="mt-0.5 h-4 w-4 shrink-0 text-[#2A422D]" />
                    ) : (
                      <Square className="mt-0.5 h-4 w-4 shrink-0 text-[#5C5346]" />
                    )}
                    <div>
                      <div className="font-semibold text-[#231F1A]">
                        {sec.num}. {sec.title}
                      </div>
                      <p className="text-[#5C5346]">{sec.detail}</p>
                    </div>
                  </button>
                  <textarea
                    rows={2}
                    placeholder="Draft your justified methodological choice..."
                    value={templateValues[sec.num] ?? ''}
                    onChange={(e) =>
                      setTemplateValues((p) => ({ ...p, [sec.num]: e.target.value }))
                    }
                    className="w-full rounded border border-[#231F1A]/25 bg-white px-2.5 py-1.5 text-xs text-[#231F1A] focus:border-[#231F1A] focus:outline-none"
                  />
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* C & D. Fictional Sample Results & Statistical Interpretation */}
      {tab === 'results' && (
        <section className="space-y-5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-display text-xl font-bold text-[#231F1A]">
              Fictional Sample Results &amp; Statistical Interpretation
            </h3>
            <span className="rounded bg-[#F6ECD5] px-2 py-0.5 font-mono text-[10px] font-semibold border border-[#D49B2A]">
              Illustrative Data Only
            </span>
          </div>

          <div className="overflow-x-auto vintage-box rounded-md">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#231F1A] bg-[#EFE7D6]">
                <tr>
                  <th className="px-3.5 py-2 font-semibold">Outcome / Metric</th>
                  <th className="px-3.5 py-2 font-semibold">Manual</th>
                  <th className="px-3.5 py-2 font-semibold">Assistant v2.1</th>
                  <th className="px-3.5 py-2 font-semibold">Direct Difference / Bound</th>
                  <th className="px-3.5 py-2 font-semibold">Interpretation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#231F1A]/15">
                {FICTIONAL_SAMPLE_RESULTS.map((r) => (
                  <tr key={r.metric}>
                    <td className="px-3.5 py-2 font-semibold">{r.metric}</td>
                    <td className="px-3.5 py-2 font-mono">{r.manual}</td>
                    <td className="px-3.5 py-2 font-mono">{r.assistant}</td>
                    <td className="px-3.5 py-2 font-mono text-[#1E3A54]">{r.diff}</td>
                    <td className="px-3.5 py-2 text-[#5C5346]">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="vintage-card rounded-md p-5 space-y-2.5 text-xs leading-relaxed">
            <div className="font-display text-base font-bold text-[#231F1A]">
              How a Researcher Interprets These Mixed Results
            </div>
            <p>
              <strong>1. Non-inferiority failure &amp; effect size:</strong> Synthesis quality improved by +0.40 points (crossed mixed-effects 95% CI [+0.18, +0.62], <em>d</em> = 0.59), satisfying the quality gate. However, <em>d</em> = 0.59 does not by itself establish practical importance—practical value depends on context-specific thresholds and trade-offs. On the safety/accuracy gate, the allowed unsupported-claim increase is <strong>+1.0 percentage point</strong>, while the observed estimate is <strong>+1.6 percentage points</strong> (95% CI [+0.2, +3.0]). Because the upper bound (+3.0 pp) exceeds the +1.0 pp margin (and the interval spans increases on both sides of the margin), <strong>the study failed to establish non-inferiority</strong>.
            </p>
            <p>
              <strong>2. Exploratory subgroup pattern &amp; total task time:</strong> Junior analysts showed an observed difference of +3.1 pp (95% CI [+0.8, +5.4]) and senior analysts +0.1 pp (95% CI [−1.4, +1.6]). Treat this as an <strong>exploratory subgroup pattern</strong>: claiming the effect truly differs by experience requires a direct comparison of those two effects (interaction estimate with uncertainty). Overreliance is a plausible <em>hypothesis</em>, which should be tested with behavioral trace evidence—such as which incorrect suggestions analysts saw, checked against source PDFs, corrected, or retained. For productivity, <strong>total task time</strong> changed inconclusively (−2.5 min, 95% CI [−7.2, +2.2]) because faster drafting (−15.0 min) was offset by longer verification time (+12.5 min).
            </p>
            <p>
              <strong>3. Rare-event qualification &amp; deployment decision:</strong> Zero confidentiality breaches in 100 audited runs yields an approximate 3.0% one-sided 95% upper bound under the rule of three (3/100)—assuming independent, representative Bernoulli trials, a fixed failure rate, and accurate breach detection. It does not prove 0% risk or hold under distribution shift. Because the study failed to establish non-inferiority on unsupported claims, <strong>do NOT authorize the pilot</strong>.
            </p>
          </div>

          {/* Reproducible Synthetic Worked Exercise */}
          <div className="vintage-box rounded-md p-5 space-y-3 text-xs leading-relaxed">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="font-display text-base font-bold text-[#231F1A]">
                Reproducible Exercise: Unsupported-Claim Non-Inferiority Check
              </div>
              <span className="rounded bg-[#E3EAF0] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#1E3A54] border border-[#335C81]/40">
                Separate Small Worked Dataset (8 Analysts · 16 Briefs · 240 Claims)
              </span>
            </div>
            <p className="text-[#5C5346]">
              To practice the exact calculation independently of the 32-analyst Meridian table above, inspect and run the synthetic dataset in <code className="rounded bg-[#EFE7D6] px-1 py-0.5">scripts/reproduce-unsupported-claims.mjs</code>. Each brief tracks analyst, experience group, task packet, condition, and claim-level judgments. The denominator is <strong>totalMaterialClaims</strong> (supported + partially supported + unsupported); <strong>partially supported</strong> claims (e.g., omitted qualifiers) are tracked separately and excluded from the numerator of the binary unsupported-claim rate.
            </p>
            <pre className="overflow-x-auto rounded border border-[#231F1A] bg-[#231F1A] p-3 font-mono text-[11px] text-[#FBF7EE]">
              {`node scripts/reproduce-unsupported-claims.mjs`}
            </pre>
            <div className="grid gap-2.5 sm:grid-cols-2">
              <div className="rounded bg-[#F5EFE2] p-3 border border-[#231F1A]/20 space-y-1">
                <div><strong>Manual rate:</strong> 4 / 120 = 3.33% (partial: 7)</div>
                <div><strong>Assistant rate:</strong> 9 / 120 = 7.50% (partial: 11)</div>
                <div><strong>Absolute difference:</strong> +4.17 percentage points</div>
                <div><strong>Decision vs. +1.0 pp margin:</strong> <span className="font-semibold text-[#7D3016]">FAIL (withhold pilot)</span></div>
              </div>
              <div className="rounded bg-[#F5EFE2] p-3 border border-[#231F1A]/20 space-y-1">
                <div><strong>Clustered 95% CI (analyst-level, df = 7):</strong> [1.28, 7.05] pp (SE = 1.22 pp)</div>
                <div><strong>Naive 95% CI (240 indep. claims):</strong> [−1.54, 9.87] pp (SE = 2.91 pp)</div>
                <p className="text-[#5C5346]">
                  Treating all 240 claims as independent ignores within-analyst pairing and shared packets, misrepresenting uncertainty (here flipping the naive CI across 0).
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* F. Sample Final Evaluation Report */}
      {tab === 'report' && (
        <section className="vintage-card rounded-md p-6 space-y-4 text-xs leading-relaxed">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#231F1A]/20 pb-3">
            <div className="flex items-center gap-2 font-display text-lg font-bold text-[#231F1A]">
              <FileText className="h-4 w-4 text-[#C8552D]" />
              Sample Final Evaluation Report (Illustrative)
            </div>
            <span className="font-mono text-[10px] text-[#5C5346]">
              Observations · Interpretations · Recommendations kept separate
            </span>
          </div>

          {[
            ['Executive Summary', 'In a fictional 32-analyst counterbalanced crossover study (128 participant-task sessions across 48 confirmatory packets), Meridian Assistant v2.1 improved blinded synthesis quality (+0.40/5) but increased unsupported claims (+1.6 pp, 95% CI [+0.2, +3.0]) and verification time (+12.5 min), leaving total task time inconclusive (−2.5 min). Because the +3.0 pp upper bound exceeds the allowed +1.0 pp margin, the study failed to establish non-inferiority and the 4-week pilot is NOT authorized.'],
            ['Evaluation Purpose', 'Determine whether Meridian Assistant v2.1 meets all pre-specified gates to authorize a 4-week monitored pilot for internal empirical-paper synthesis.'],
            ['Methods', 'Counterbalanced within-subject crossover on 48 stratified English confirmatory packets across 32 analysts (64 Assistant + 64 Manual = 128 crossed sessions, not 128 independent pairs; 16 challenge packets analyzed separately); dual specialist ground truth; blinded rubric scoring (weighted κ = 0.81); crossed linear mixed-effects analysis (with simulation-based power analysis proposed as a pre-study planning step).'],
            ['Results (Direct Observations)', 'Quality: 4.05 vs. 3.65 (+0.40, 95% CI [+0.18, +0.62]). Unsupported claims: 4.8% vs. 3.2% (+1.6 pp, 95% CI [+0.2, +3.0]). Exploratory subgroups: junior +3.1 pp (95% CI [+0.8, +5.4]), senior +0.1 pp (95% CI [−1.4, +1.6]). Total task time: 71.5 vs. 74.0 min (drafting 45.0 vs. 60.0 min; verification 26.5 vs. 14.0 min). Confidentiality breaches: 0/100 audited runs.'],
            ['Statistical Interpretation', 'Although quality improved (+0.40, d = 0.59), practical significance depends on context-specific thresholds. Crucially, the unsupported-claim CI [+0.2, +3.0] includes increases on both sides of the +1.0 pp margin and its upper bound exceeds +1.0 pp, so non-inferiority is not established. The junior vs. senior difference is an exploratory subgroup pattern (a formal interaction comparison with uncertainty is required to claim differential effect). Total task time is inconclusive because faster drafting was offset by +12.5 min of verification. Under binomial assumptions (independent, representative runs, fixed rate, accurate detection), 0/100 breaches implies a ~3.0% one-sided 95% upper bound—not 0% risk.'],
            ['Validity Considerations', 'Strong internal validity (randomized crossover) and inter-rater reliability (κ = 0.81). Ecological validity is moderate: 90-minute timed sessions may differ from multi-week workflows.'],
            ['Limitations', 'English-only empirical PDFs; single-session tasks do not measure familiarization or multi-week skill retention; small subgroup size (n = 16 per tier) and no direct interaction test powered.'],
            ['Risks', 'Hypothesis of analyst overreliance (to be tested by logging which incorrect suggestions analysts saw, checked, corrected, or retained); residual confidential-leakage tail risk (~3.0% upper bound under study assumptions) and vulnerability to distribution shift.'],
            ['Conclusions', 'Assistant v2.1 improved synthesis quality on the 1–5 rubric, did not reduce total task time, and failed to establish non-inferiority on unsupported claims.'],
            ['Recommendations (Action & Owner)', 'Do NOT authorize the 4-week pilot. Product Lead to redesign inline claim-level verification prompts, capture suggestion-level interaction logs to test the overreliance hypothesis, and re-test on a fresh confirmatory sample; Risk Reviewer to keep deployment blocked until unsupported-claim upper 95% CI ≤ +1.0 pp.'],
          ].map(([sec, body]) => (
            <div key={sec} className="space-y-0.5">
              <div className="font-semibold text-[#C8552D]">{sec}</div>
              <p className="text-[#231F1A]">{body}</p>
            </div>
          ))}
        </section>
      )}

      {/* E. 4-Level Grading Rubric */}
      {tab === 'rubric' && (
        <section className="space-y-3">
          <div className="flex items-center gap-2 font-display text-xl font-bold text-[#231F1A]">
            <Award className="h-5 w-5 text-[#C8552D]" />
            Four-Level Capstone Grading Rubric
          </div>
          <p className="text-xs text-[#5C5346]">
            Rewards scientific reasoning, justified trade-offs, and honest limitations—not listing metrics mechanically.
          </p>
          <div className="overflow-x-auto vintage-box rounded-md">
            <table className="w-full text-left text-[11px]">
              <thead className="border-b border-[#231F1A] bg-[#EFE7D6]">
                <tr>
                  <th className="px-3 py-2 font-semibold">Criterion</th>
                  <th className="px-3 py-2 font-semibold">1. Beginning</th>
                  <th className="px-3 py-2 font-semibold">2. Developing</th>
                  <th className="px-3 py-2 font-semibold">3. Competent</th>
                  <th className="px-3 py-2 font-semibold">4. Advanced</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#231F1A]/15">
                {FOUR_LEVEL_RUBRIC.map((r) => (
                  <tr key={r.criterion} className="align-top">
                    <td className="px-3 py-2.5 font-semibold text-[#231F1A]">{r.criterion}</td>
                    <td className="px-3 py-2.5 text-[#7D3016]">{r.beginning}</td>
                    <td className="px-3 py-2.5 text-[#6E4E12]">{r.developing}</td>
                    <td className="px-3 py-2.5 text-[#1E3A54]">{r.competent}</td>
                    <td className="px-3 py-2.5 text-[#2A422D] font-medium">{r.advanced}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </article>
  );
}

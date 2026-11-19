export function ScopeBoundaryDiagram() {
  return (
    <figure className="vintage-card my-6 rounded-lg p-5">
      <svg viewBox="0 0 800 250" className="w-full h-auto" role="img" aria-label="Seven Evaluation Layers">
        <rect x="10" y="8" width="780" height="234" rx="8" fill="#EFE7D6" stroke="#231F1A" strokeWidth="1.3" />
        <text x="24" y="28" fontSize="11" fontWeight="700" fill="#231F1A">
          7. Wider Impacts — Access &amp; outcomes across language groups (Unit: language community / group)
        </text>

        <rect x="24" y="38" width="752" height="194" rx="7" fill="#F6ECD5" stroke="#D49B2A" strokeWidth="1.3" />
        <text x="38" y="57" fontSize="11" fontWeight="700" fill="#6E4E12">
          6. Organizational — Team speed, review load &amp; maintenance (Unit: team or team-week)
        </text>

        <rect x="38" y="67" width="724" height="155" rx="6" fill="#E3EAF0" stroke="#335C81" strokeWidth="1.3" />
        <text x="52" y="86" fontSize="11" fontWeight="700" fill="#1E3A54">
          5. Human–AI Interaction — Catching errors &amp; total task time (Unit: task session or analyst)
        </text>

        <rect x="52" y="96" width="696" height="116" rx="5" fill="#E6EDE2" stroke="#4A6B4E" strokeWidth="1.3" />
        <text x="66" y="115" fontSize="11" fontWeight="700" fill="#2A422D">
          4. Workflow / Agent — Model + harness: prompts, retrieval, tools, memory, UI (Unit: end-to-end run)
        </text>

        <rect x="66" y="126" width="206" height="74" rx="4" fill="#FBF7EE" stroke="#231F1A" strokeWidth="1.2" />
        <text x="169" y="147" textAnchor="middle" fontSize="11" fontWeight="700" fill="#231F1A">
          1. Data &amp; Inputs
        </text>
        <text x="169" y="164" textAnchor="middle" fontSize="10" fill="#5C5346">
          Source packets, logs &amp; case mix
        </text>
        <text x="169" y="182" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#C8552D">
          Unit: packet / category
        </text>

        <rect x="286" y="126" width="224" height="74" rx="4" fill="#FBF7EE" stroke="#231F1A" strokeWidth="1.2" />
        <text x="398" y="147" textAnchor="middle" fontSize="11" fontWeight="700" fill="#231F1A">
          2. Isolated Model
        </text>
        <text x="398" y="164" textAnchor="middle" fontSize="10" fill="#5C5346">
          Model claims vs. supplied sources
        </text>
        <text x="398" y="182" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#C8552D">
          Unit: claim or response
        </text>

        <rect x="524" y="126" width="210" height="74" rx="4" fill="#FBF7EE" stroke="#231F1A" strokeWidth="1.2" />
        <text x="629" y="147" textAnchor="middle" fontSize="11" fontWeight="700" fill="#231F1A">
          3. Component
        </text>
        <text x="629" y="164" textAnchor="middle" fontSize="10" fill="#5C5346">
          Retriever, guardrail, tool router
        </text>
        <text x="629" y="182" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#C8552D">
          Unit: search query / tool call
        </text>
      </svg>
      <figcaption className="mt-2.5 text-center font-mono text-[11px] text-[#5C5346]">
        FIG 1.1 — Seven evaluation layers from Data &amp; Inputs to Wider Impacts. Passing a lower layer never guarantees higher-layer success—and verification at higher layers can catch lower-layer errors.
      </figcaption>
    </figure>
  );
}

export function LayeredPipelineDiagram() {
  return (
    <figure className="vintage-card my-6 rounded-lg p-5">
      <svg viewBox="0 0 780 140" className="w-full h-auto" role="img" aria-label="Layered Evaluation Pipeline">
        <rect x="12" y="20" width="225" height="96" rx="6" fill="#E6EDE2" stroke="#4A6B4E" strokeWidth="1.5" />
        <text x="124" y="45" textAnchor="middle" fontSize="12" fontWeight="700" fill="#2A422D">Stage 1: Automated &amp; Trace Gates</text>
        <text x="124" y="65" textAnchor="middle" fontSize="10.5" fill="#231F1A">Trace &amp; error analysis, unit/behavioral</text>
        <text x="124" y="81" textAnchor="middle" fontSize="10.5" fill="#231F1A">checks, challenge &amp; regression sets</text>
        <text x="124" y="100" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2A422D">Fast · Low cost · Early signal</text>

        <line x1="237" y1="68" x2="275" y2="68" stroke="#231F1A" strokeWidth="1.8" markerEnd="url(#arrow-pipe)" />

        <rect x="278" y="20" width="225" height="96" rx="6" fill="#E3EAF0" stroke="#335C81" strokeWidth="1.5" />
        <text x="390" y="45" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1E3A54">Stage 2: Workflow &amp; User Tests</text>
        <text x="390" y="65" textAnchor="middle" fontSize="10.5" fill="#231F1A">Representative task trials, RCTs with</text>
        <text x="390" y="81" textAnchor="middle" fontSize="10.5" fill="#231F1A">target users, total time &amp; rework</text>
        <text x="390" y="100" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1E3A54">Real-world value before deploy</text>

        <line x1="503" y1="68" x2="541" y2="68" stroke="#231F1A" strokeWidth="1.8" markerEnd="url(#arrow-pipe)" />

        <rect x="544" y="20" width="224" height="96" rx="6" fill="#F6ECD5" stroke="#D49B2A" strokeWidth="1.5" />
        <text x="656" y="45" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6E4E12">Stage 3: Live Monitoring</text>
        <text x="656" y="65" textAnchor="middle" fontSize="10.5" fill="#231F1A">Telemetry + scoring rules, drift,</text>
        <text x="656" y="81" textAnchor="middle" fontSize="10.5" fill="#231F1A">refreshed private sets &amp; re-eval</text>
        <text x="656" y="100" textAnchor="middle" fontSize="10" fontWeight="600" fill="#6E4E12">Sustained reliability &amp; safety</text>

        <defs>
          <marker id="arrow-pipe" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#231F1A" />
          </marker>
        </defs>
      </svg>
      <figcaption className="mt-2.5 text-center font-mono text-[11px] text-[#5C5346]">
        FIG 3.1 — Layered evaluation pipeline: fast trace/regression gates → representative workflow trials → live monitoring.
      </figcaption>
    </figure>
  );
}

export function AggregationTrapDiagram() {
  return (
    <figure className="vintage-card my-6 rounded-lg p-5">
      <svg viewBox="0 0 780 155" className="w-full h-auto" role="img" aria-label="Single-Score Aggregation Trap">
        <rect x="16" y="18" width="240" height="118" rx="6" fill="#F7E4DC" stroke="#C8552D" strokeWidth="1.5" />
        <text x="136" y="44" textAnchor="middle" fontSize="12" fontWeight="700" fill="#7D3016">Collapsed Single Score</text>
        <text x="136" y="82" textAnchor="middle" fontSize="28" fontWeight="800" fill="#C8552D">95% Pass</text>
        <text x="136" y="114" textAnchor="middle" fontSize="10.5" fill="#7D3016">Hides severity, harm &amp; recoverability</text>

        <line x1="264" y1="77" x2="314" y2="77" stroke="#231F1A" strokeWidth="1.8" markerEnd="url(#arrow-agg)" />
        <text x="289" y="66" textAnchor="middle" fontSize="10" fill="#5C5346">Disaggregate</text>

        <rect x="322" y="18" width="442" height="34" rx="5" fill="#E6EDE2" stroke="#4A6B4E" strokeWidth="1.2" />
        <text x="338" y="39" fontSize="11.5" fontWeight="600" fill="#2A422D">95 / 100 Passed all criteria</text>

        <rect x="322" y="60" width="442" height="34" rx="5" fill="#F6ECD5" stroke="#D49B2A" strokeWidth="1.2" />
        <text x="338" y="81" fontSize="11.5" fontWeight="600" fill="#6E4E12">4 / 100 Minor formatting issue (low severity · easily recovered)</text>

        <rect x="322" y="102" width="442" height="34" rx="5" fill="#F7E4DC" stroke="#C8552D" strokeWidth="1.5" />
        <text x="338" y="123" fontSize="11.5" fontWeight="700" fill="#7D3016">1 / 100 Unauthorized disclosure (CRITICAL · mandatory constraint)</text>

        <defs>
          <marker id="arrow-agg" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#231F1A" />
          </marker>
        </defs>
      </svg>
      <figcaption className="mt-2.5 text-center font-mono text-[11px] text-[#5C5346]">
        FIG 4.1 — Keep frequency, severity, detectability, affected populations, and mandatory release blockers distinct.
      </figcaption>
    </figure>
  );
}

export function ValidityCategoriesDiagram() {
  return (
    <figure className="vintage-card my-6 rounded-lg p-5">
      <svg viewBox="0 0 800 185" className="w-full h-auto" role="img" aria-label="Three Distinct Categories of Evaluation Quality">
        <rect x="12" y="14" width="246" height="156" rx="6" fill="#E3EAF0" stroke="#335C81" strokeWidth="1.5" />
        <text x="26" y="38" fontSize="11.5" fontWeight="700" fill="#1E3A54">A. Measurement &amp; Interpretation</text>
        <text x="26" y="60" fontSize="10.5" fill="#231F1A">• Construct, content &amp; criterion</text>
        <text x="26" y="78" fontSize="10.5" fill="#231F1A">• Consequential considerations</text>
        <text x="26" y="96" fontSize="10.5" fill="#231F1A">• Argument-based validation</text>
        <text x="26" y="128" fontSize="10" fontWeight="600" fill="#1E3A54">Supports score meaning &amp; use</text>

        <rect x="277" y="14" width="246" height="156" rx="6" fill="#E6EDE2" stroke="#4A6B4E" strokeWidth="1.5" />
        <text x="291" y="38" fontSize="11.5" fontWeight="700" fill="#2A422D">B. Design, Causality &amp; Generalization</text>
        <text x="291" y="60" fontSize="10.5" fill="#231F1A">• Internal, external &amp; ecological</text>
        <text x="291" y="78" fontSize="10.5" fill="#231F1A">• Confounding, selection &amp; RCTs</text>
        <text x="291" y="96" fontSize="10.5" fill="#231F1A">• Distribution shift &amp; context</text>
        <text x="291" y="128" fontSize="10" fontWeight="600" fill="#2A422D">Supports causal &amp; transfer claims</text>

        <rect x="542" y="14" width="246" height="156" rx="6" fill="#F6ECD5" stroke="#D49B2A" strokeWidth="1.5" />
        <text x="556" y="38" fontSize="11.5" fontWeight="700" fill="#6E4E12">C. Reliability &amp; Traceability</text>
        <text x="556" y="60" fontSize="10.5" fill="#231F1A">• Test-retest &amp; inter-rater (κ, α)</text>
        <text x="556" y="78" fontSize="10.5" fill="#231F1A">• Reproducibility &amp; replicability</text>
        <text x="556" y="96" fontSize="10.5" fill="#231F1A">• Versioning, provenance &amp; audit</text>
        <text x="556" y="128" fontSize="10" fontWeight="600" fill="#6E4E12">Necessary, not sufficient for validity</text>
      </svg>
      <figcaption className="mt-2.5 text-center font-mono text-[11px] text-[#5C5346]">
        FIG 5.1 — Three distinct pillars: Measurement Validity (A), Study Design &amp; Generalization (B), and Reliability &amp; Traceability (C).
      </figcaption>
    </figure>
  );
}

export function OutcomesComparisonDiagram() {
  return (
    <figure className="vintage-card my-6 rounded-lg p-5">
      <svg viewBox="0 0 780 185" className="w-full h-auto" role="img" aria-label="Empirical Human-AI Outcome Findings">
        <rect x="12" y="14" width="242" height="156" rx="6" fill="#F7E4DC" stroke="#C8552D" strokeWidth="1.5" />
        <text x="26" y="38" fontSize="11.5" fontWeight="700" fill="#7D3016">Perceived vs. Actual Speed (METR)</text>
        <text x="26" y="62" fontSize="11" fill="#2A422D">• Self-forecast: 20% faster with AI</text>
        <text x="26" y="82" fontSize="11" fontWeight="700" fill="#C8552D">• Observed RCT: 19% slower with AI</text>
        <text x="26" y="106" fontSize="10.5" fill="#231F1A">16 experienced devs · 246 tasks.</text>
        <text x="26" y="124" fontSize="10.5" fill="#5C5346">Perception surveys ≠ total time.</text>

        <rect x="269" y="14" width="242" height="156" rx="6" fill="#F6ECD5" stroke="#D49B2A" strokeWidth="1.5" />
        <text x="283" y="38" fontSize="11.5" fontWeight="700" fill="#6E4E12">Skill Formation (Anthropic 2026)</text>
        <text x="283" y="62" fontSize="11" fill="#231F1A">• 52 engineers learning Python library</text>
        <text x="283" y="82" fontSize="11" fontWeight="700" fill="#8C5F0B">• ~50% vs. ~67% (−17 pp quiz gap)</text>
        <text x="283" y="106" fontSize="10.5" fill="#231F1A">Largest gap in debugging mastery.</text>
        <text x="283" y="124" fontSize="10.5" fill="#5C5346">Task speed ≠ learning / retention.</text>

        <rect x="526" y="14" width="242" height="156" rx="6" fill="#E3EAF0" stroke="#335C81" strokeWidth="1.5" />
        <text x="540" y="38" fontSize="11.5" fontWeight="700" fill="#1E3A54">Augmentation vs. Synergy (Vaccaro)</text>
        <text x="540" y="62" fontSize="11" fill="#2A422D">• Human+AI vs. Human: g = +0.64</text>
        <text x="540" y="82" fontSize="11" fontWeight="700" fill="#C8552D">• vs. best solo actor: g = −0.23</text>
        <text x="540" y="106" fontSize="10.5" fill="#231F1A">106 studies · 370 effect sizes.</text>
        <text x="540" y="124" fontSize="10.5" fill="#5C5346">Check synergy if claiming &gt; solo AI.</text>
      </svg>
      <figcaption className="mt-2.5 text-center font-mono text-[11px] text-[#5C5346]">
        FIG 6.1 — Why real workflow outcomes must be timed and measured directly instead of trusting offline accuracy or user intuition.
      </figcaption>
    </figure>
  );
}

export function HorizonDiagram() {
  return (
    <figure className="vintage-card my-6 rounded-lg p-5">
      <svg viewBox="0 0 780 175" className="w-full h-auto" role="img" aria-label="Short-Term vs Long-Term Evaluation Dynamics">
        <rect x="16" y="16" width="360" height="142" rx="6" fill="#F5EFE2" stroke="#231F1A" strokeWidth="1.3" />
        <text x="34" y="42" fontSize="12.5" fontWeight="700" fill="#231F1A">Short-Term Check (e.g., 1-hour trial)</text>
        <text x="34" y="68" fontSize="11" fill="#231F1A">• Captures immediate output quality &amp; bugs</text>
        <text x="34" y="88" fontSize="11" fill="#231F1A">• Misses prompt learning curve &amp; habit change</text>
        <text x="34" y="108" fontSize="11" fill="#231F1A">• Can over-reward agreeable / verbose answers</text>
        <text x="34" y="136" fontSize="10.5" fontWeight="600" fill="#C8552D">Risk: Optimizing for instant demo polish</text>

        <rect x="404" y="16" width="360" height="142" rx="6" fill="#E3EAF0" stroke="#335C81" strokeWidth="1.5" />
        <text x="422" y="42" fontSize="12.5" fontWeight="700" fill="#1E3A54">Production Lifecycle (weeks+)</text>
        <text x="422" y="68" fontSize="11" fill="#231F1A">• Tracks live telemetry + explicit scoring rules</text>
        <text x="422" y="88" fontSize="11" fill="#231F1A">• Catches model/prompt/data drift early</text>
        <text x="422" y="108" fontSize="11" fill="#231F1A">• Versions product &amp; evaluator separately</text>
        <text x="422" y="136" fontSize="10.5" fontWeight="600" fill="#2A422D">Goal: Clear reevaluation triggers &amp; owners</text>
      </svg>
      <figcaption className="mt-2.5 text-center font-mono text-[11px] text-[#5C5346]">
        FIG 6.2 — Short-term pilots and ongoing production monitoring catch different failures; version product and judges separately.
      </figcaption>
    </figure>
  );
}

export function FallaciesDiagram() {
  return (
    <figure className="vintage-card my-6 rounded-lg p-5">
      <svg viewBox="0 0 800 245" className="w-full h-auto" role="img" aria-label="Four Categories of AI Evaluation Fallacies">
        <rect x="14" y="14" width="376" height="100" rx="6" fill="#F7E4DC" stroke="#C8552D" strokeWidth="1.5" />
        <text x="30" y="38" fontSize="12" fontWeight="700" fill="#7D3016">1. Benchmark &amp; Construct Hype</text>
        <text x="30" y="58" fontSize="10.5" fill="#231F1A">• “High leaderboard score = real-world readiness”</text>
        <text x="30" y="76" fontSize="10.5" fill="#231F1A">• “Passing unit tests = general coding competence”</text>
        <text x="30" y="94" fontSize="10.5" fill="#5C5346">• Contamination, overfitting &amp; Goodharted metrics</text>

        <rect x="410" y="14" width="376" height="100" rx="6" fill="#F6ECD5" stroke="#D49B2A" strokeWidth="1.5" />
        <text x="426" y="38" fontSize="12" fontWeight="700" fill="#6E4E12">2. Layer-Jump &amp; Speed Illusions</text>
        <text x="426" y="58" fontSize="10.5" fill="#231F1A">• “Perceived speedup (+20%) = actual speedup (−19%)”</text>
        <text x="426" y="76" fontSize="10.5" fill="#231F1A">• “Lower-layer accuracy guarantees workflow success”</text>
        <text x="426" y="94" fontSize="10.5" fill="#5C5346">• Ignoring verification time &amp; hidden rework</text>

        <rect x="14" y="130" width="376" height="100" rx="6" fill="#E3EAF0" stroke="#335C81" strokeWidth="1.5" />
        <text x="30" y="154" fontSize="12" fontWeight="700" fill="#1E3A54">3. Evaluator &amp; Simulation Traps</text>
        <text x="30" y="174" fontSize="10.5" fill="#231F1A">• “LLM-as-a-judge is objective ground truth”</text>
        <text x="30" y="192" fontSize="10.5" fill="#231F1A">• “Simulated personas can replace real user tests”</text>
        <text x="30" y="210" fontSize="10.5" fill="#5C5346">• Position/verbosity bias &amp; uncalibrated scorers</text>

        <rect x="410" y="130" width="376" height="100" rx="6" fill="#E6EDE2" stroke="#4A6B4E" strokeWidth="1.5" />
        <text x="426" y="154" fontSize="12" fontWeight="700" fill="#2A422D">4. Statistical &amp; Reporting Fallacies</text>
        <text x="426" y="174" fontSize="10.5" fill="#231F1A">• “0 failures in 100 runs = 0% failure rate” (~3% bound)</text>
        <text x="426" y="192" fontSize="10.5" fill="#231F1A">• Averaging minor bugs with critical disclosures</text>
        <text x="426" y="210" fontSize="10.5" fill="#5C5346">• Tuning on the test set &amp; claiming confirmation</text>
      </svg>
      <figcaption className="mt-2.5 text-center font-mono text-[11px] text-[#5C5346]">
        FIG 7.1 — Four families of AI evaluation fallacies that cause teams to overstate readiness or misread real-world impact.
      </figcaption>
    </figure>
  );
}

export function SphereDiagram() {
  return (
    <figure className="vintage-card my-6 rounded-lg p-5">
      <svg viewBox="0 0 800 295" className="w-full h-auto" role="img" aria-label="SPHERE 5-Dimension Evaluation Card">
        <rect x="10" y="10" width="780" height="275" rx="10" fill="#EFE7D6" stroke="#231F1A" strokeWidth="1.5" strokeDasharray="6 4" />
        <text x="26" y="32" fontSize="11" fontWeight="700" fill="#231F1A" letterSpacing="0.03em">
          5. (META) HOW IS THE EVALUATION VALIDATED? — Validity, Reliability, Counterbalancing &amp; Randomized Controls
        </text>

        <rect x="295" y="106" width="210" height="84" rx="8" fill="#231F1A" />
        <text x="400" y="138" textAnchor="middle" fontSize="14" fontWeight="700" fill="#FBF7EE">
          SPHERE Evaluation Card
        </text>
        <text x="400" y="158" textAnchor="middle" fontSize="11" fill="#EAE3D2">
          Human–AI Interaction
        </text>
        <text x="400" y="174" textAnchor="middle" fontSize="10" fill="#D49B2A">
          Zhao et al. (ACL 2025)
        </text>

        <rect x="26" y="48" width="240" height="94" rx="6" fill="#E6EDE2" stroke="#4A6B4E" strokeWidth="1.5" />
        <text x="40" y="70" fontSize="12" fontWeight="700" fill="#2A422D">1. What is being evaluated?</text>
        <text x="40" y="89" fontSize="10.5" fill="#231F1A">• Component: System vs. Model</text>
        <text x="40" y="106" fontSize="10.5" fill="#231F1A">• Goals: Effectiveness, Efficiency, Satisfaction</text>
        <text x="40" y="123" fontSize="10.5" fill="#231F1A">• Skill retention, offloading &amp; opinion drift</text>
        <line x1="266" y1="98" x2="295" y2="128" stroke="#4A6B4E" strokeWidth="1.5" />

        <rect x="534" y="48" width="240" height="94" rx="6" fill="#E3EAF0" stroke="#335C81" strokeWidth="1.5" />
        <text x="548" y="70" fontSize="12" fontWeight="700" fill="#1E3A54">2. How are we evaluating?</text>
        <text x="548" y="89" fontSize="10.5" fill="#231F1A">• Intrinsic (model alone) vs. Extrinsic (task)</text>
        <text x="548" y="106" fontSize="10.5" fill="#231F1A">• Quantitative (“what”) vs. Qualitative (“why”)</text>
        <text x="548" y="123" fontSize="10.5" fill="#231F1A">• Layered pipeline: gates → user studies</text>
        <line x1="534" y1="98" x2="505" y2="128" stroke="#335C81" strokeWidth="1.5" />

        <rect x="26" y="168" width="240" height="98" rx="6" fill="#F6ECD5" stroke="#D49B2A" strokeWidth="1.5" />
        <text x="40" y="190" fontSize="12" fontWeight="700" fill="#6E4E12">3. Who is evaluating?</text>
        <text x="40" y="209" fontSize="10.5" fill="#231F1A">• Target end users &amp; domain experts</text>
        <text x="40" y="226" fontSize="10.5" fill="#231F1A">• Crowd workers (audit whose values align)</text>
        <text x="40" y="243" fontSize="10.5" fill="#231F1A">• LLM-simulated users (caricature risk)</text>
        <line x1="266" y1="210" x2="295" y2="170" stroke="#D49B2A" strokeWidth="1.5" />

        <rect x="534" y="168" width="240" height="98" rx="6" fill="#F7E4DC" stroke="#C8552D" strokeWidth="1.5" />
        <text x="548" y="190" fontSize="12" fontWeight="700" fill="#7D3016">4. When do we evaluate?</text>
        <text x="548" y="209" fontSize="10.5" fill="#231F1A">• Immediate / Short-term (e.g., 1-hr session)</text>
        <text x="548" y="226" fontSize="10.5" fill="#231F1A">• Long-term deployment (days/weeks+)</text>
        <text x="548" y="243" fontSize="10.5" fill="#231F1A">• Familiarization phase vs. sycophancy drift</text>
        <line x1="534" y1="210" x2="505" y2="170" stroke="#C8552D" strokeWidth="1.5" />
      </svg>
      <figcaption className="mt-2.5 text-center font-mono text-[11px] text-[#5C5346]">
        FIG G.1 — Five dimensions of the SPHERE Evaluation Card (
        <a
          href="https://sphere-eval.github.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#C8552D] underline hover:text-[#231F1A]"
        >
          sphere-eval.github.io
        </a>
        ).
      </figcaption>
    </figure>
  );
}

export function SynergyDiagram() {
  return (
    <figure className="vintage-card my-6 rounded-lg p-5">
      <svg viewBox="0 0 780 165" className="w-full h-auto" role="img" aria-label="Human-AI Synergy Meta-Analysis">
        <rect x="14" y="14" width="366" height="136" rx="6" fill="#E6EDE2" stroke="#4A6B4E" strokeWidth="1.5" />
        <text x="32" y="38" fontSize="12" fontWeight="700" fill="#2A422D">Human Augmentation: Human+AI vs. Human Alone</text>
        <text x="32" y="64" fontSize="20" fontWeight="800" fill="#2A422D">g = +0.64 (95% CI: 0.53 to 0.74)</text>
        <text x="32" y="88" fontSize="11" fill="#231F1A">• Outperformed human alone in 85% of studies (n = 314)</text>
        <text x="32" y="108" fontSize="11" fill="#231F1A">• Strongest gains in content-creation &amp; open-response tasks</text>
        <text x="32" y="128" fontSize="11" fill="#231F1A">• Positive synergy when humans outperformed AI alone</text>

        <rect x="400" y="14" width="366" height="136" rx="6" fill="#F7E4DC" stroke="#C8552D" strokeWidth="1.5" />
        <text x="418" y="38" fontSize="12" fontWeight="700" fill="#7D3016">Human–AI Synergy: Human+AI vs. max(Human, AI)</text>
        <text x="418" y="64" fontSize="20" fontWeight="800" fill="#C8552D">g = −0.23 (95% CI: −0.39 to −0.07)</text>
        <text x="418" y="88" fontSize="11" fill="#231F1A">• Underperformed best solo actor in 58% of studies (n = 213)</text>
        <text x="418" y="108" fontSize="11" fill="#231F1A">• Performance losses concentrated in decision-making tasks</text>
        <text x="418" y="128" fontSize="11" fill="#231F1A">• Losses occurred when AI alone outperformed humans</text>
      </svg>
      <figcaption className="mt-2.5 text-center font-mono text-[11px] text-[#5C5346]">
        FIG G.2 — Meta-analysis of 370 effect sizes (Vaccaro, Almaatouq &amp; Malone, <em>Nature Human Behaviour</em>, 2024).
      </figcaption>
    </figure>
  );
}

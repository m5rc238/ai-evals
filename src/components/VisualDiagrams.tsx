export function LandscapeDiagram() {
  return (
    <figure className="vintage-card my-6 rounded-lg p-5">
      <svg viewBox="0 0 820 310" className="w-full h-auto" role="img" aria-label="AI Evaluation Landscape Diagram">
        <rect x="8" y="8" width="804" height="294" rx="10" fill="#EAE3D2" stroke="#335C81" strokeWidth="1.8" strokeDasharray="6 4" />
        <text x="24" y="32" fontSize="11.5" fontWeight="700" fill="#231F1A" letterSpacing="0.04em">
          8. OUTER LAYER: EVALUATION QUALITY &amp; VALIDITY (What conclusions can this credibly support?)
        </text>

        <rect x="26" y="48" width="768" height="236" rx="8" fill="#F6ECD5" stroke="#D49B2A" strokeWidth="1.5" />
        <text x="42" y="70" fontSize="11" fontWeight="700" fill="#6E4E12" letterSpacing="0.04em">
          CROSS-CUTTING: GOVERNANCE (Roles &amp; accountability) &amp; 7. TIME / LIFECYCLE (Change triggers &amp; monitoring)
        </text>

        <rect x="42" y="86" width="736" height="178" rx="6" fill="#FBF7EE" stroke="#231F1A" strokeWidth="1.3" />
        <text x="58" y="108" fontSize="10.5" fontWeight="600" fill="#5C5346">
          CENTRAL FLOW (Iterative — early observations can reshape criteria, methods, or scope)
        </text>

        {[
          { x: 58, label: '1. Purpose', sub: '& Decision' },
          { x: 162, label: '2. Scope', sub: '& Unit' },
          { x: 266, label: '3. Context', sub: '& Coverage' },
          { x: 370, label: '4. Criteria', sub: '& Rubrics' },
          { x: 474, label: '5. Collect', sub: 'Evidence' },
          { x: 578, label: '6. Measure', sub: '& Grade' },
          { x: 682, label: 'Decision', sub: '& Action' },
        ].map((n, i, arr) => (
          <g key={n.label}>
            <rect
              x={n.x}
              y="126"
              width="86"
              height="56"
              rx="5"
              fill={i === arr.length - 1 ? '#231F1A' : '#F5EFE2'}
              stroke="#231F1A"
              strokeWidth="1.3"
            />
            <text
              x={n.x + 43}
              y="150"
              textAnchor="middle"
              fontSize="11.5"
              fontWeight="700"
              fill={i === arr.length - 1 ? '#FBF7EE' : '#231F1A'}
            >
              {n.label}
            </text>
            <text
              x={n.x + 43}
              y="166"
              textAnchor="middle"
              fontSize="10.5"
              fill={i === arr.length - 1 ? '#EAE3D2' : '#5C5346'}
            >
              {n.sub}
            </text>
            {i < arr.length - 1 && (
              <line
                x1={n.x + 86}
                y1="154"
                x2={n.x + 104}
                y2="154"
                stroke="#231F1A"
                strokeWidth="1.5"
                markerEnd="url(#arrow)"
              />
            )}
          </g>
        ))}

        <path
          d="M 517 182 C 517 212, 413 212, 413 186"
          fill="none"
          stroke="#335C81"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          markerEnd="url(#arrow-cobalt)"
        />
        <text x="465" y="224" textAnchor="middle" fontSize="10" fill="#335C81" fontWeight="600">
          Criteria drift / discovery
        </text>

        <path
          d="M 725 182 C 725 246, 101 246, 101 186"
          fill="none"
          stroke="#C8552D"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          markerEnd="url(#arrow-terra)"
        />
        <text x="413" y="253" textAnchor="middle" fontSize="10" fill="#C8552D" fontWeight="600">
          Reevaluation triggers &amp; post-deployment feedback
        </text>

        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#231F1A" />
          </marker>
          <marker id="arrow-cobalt" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#335C81" />
          </marker>
          <marker id="arrow-terra" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#C8552D" />
          </marker>
        </defs>
      </svg>
      <figcaption className="mt-2.5 text-center font-mono text-[11px] text-[#5C5346]">
        FIG 1.1 — 10-element evaluation architecture: central flow, cross-cutting Governance &amp; Time, and outer Quality layer.
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
          Ma et al. (ACL 2025)
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
        FIG 2.1 — Five dimensions of the SPHERE Evaluation Card (
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
        FIG 2.2 — Meta-analysis of 370 effect sizes (Vaccaro, Almaatouq &amp; Malone, <em>Nature Human Behaviour</em>, 2024).
      </figcaption>
    </figure>
  );
}

export function ScopeBoundaryDiagram() {
  return (
    <figure className="vintage-card my-6 rounded-lg p-5">
      <svg viewBox="0 0 780 210" className="w-full h-auto" role="img" aria-label="Nested Evaluation Scopes">
        <rect x="10" y="10" width="760" height="190" rx="8" fill="#EFE7D6" stroke="#231F1A" strokeWidth="1.3" />
        <text x="26" y="32" fontSize="11.5" fontWeight="700" fill="#231F1A">6. Societal &amp; Environmental Effects (distribution of benefits, harms, access, resource costs)</text>

        <rect x="26" y="42" width="728" height="146" rx="7" fill="#F6ECD5" stroke="#D49B2A" strokeWidth="1.3" />
        <text x="42" y="62" fontSize="11.5" fontWeight="700" fill="#6E4E12">5. Organizational Deployment (workflow change, review effort, coordination, maintenance)</text>

        <rect x="42" y="72" width="696" height="104" rx="6" fill="#E3EAF0" stroke="#335C81" strokeWidth="1.3" />
        <text x="58" y="92" fontSize="11.5" fontWeight="700" fill="#1E3A54">4. Human–AI Interaction / Team (completed human work, error recognition, skill &amp; reliance)</text>

        <rect x="58" y="102" width="664" height="62" rx="5" fill="#E6EDE2" stroke="#4A6B4E" strokeWidth="1.3" />
        <text x="74" y="121" fontSize="11" fontWeight="700" fill="#2A422D">3. Complete AI System / Agent (Model + Harness: retrieval, prompts, tools, memory, permissions, UI)</text>

        <rect x="74" y="130" width="300" height="26" rx="4" fill="#FBF7EE" stroke="#231F1A" strokeWidth="1.2" />
        <text x="224" y="147" textAnchor="middle" fontSize="11" fontWeight="600" fill="#231F1A">1. Model (weights / API under fixed conditions)</text>

        <rect x="390" y="130" width="316" height="26" rx="4" fill="#FBF7EE" stroke="#231F1A" strokeWidth="1.2" />
        <text x="548" y="147" textAnchor="middle" fontSize="11" fontWeight="600" fill="#231F1A">2. Component / Subsystem (e.g., retriever, router)</text>
      </svg>
      <figcaption className="mt-2.5 text-center font-mono text-[11px] text-[#5C5346]">
        FIG 3.1 — Six overlapping scopes. Evidence at an inner scope does not automatically establish claims at an outer scope.
      </figcaption>
    </figure>
  );
}

export function LayeredPipelineDiagram() {
  return (
    <figure className="vintage-card my-6 rounded-lg p-5">
      <svg viewBox="0 0 780 140" className="w-full h-auto" role="img" aria-label="Layered Evaluation Pipeline">
        <rect x="12" y="20" width="225" height="96" rx="6" fill="#E6EDE2" stroke="#4A6B4E" strokeWidth="1.5" />
        <text x="124" y="45" textAnchor="middle" fontSize="12" fontWeight="700" fill="#2A422D">Stage 1: Intrinsic Gates</text>
        <text x="124" y="65" textAnchor="middle" fontSize="10.5" fill="#231F1A">Benchmarks, unit/behavioral tests,</text>
        <text x="124" y="81" textAnchor="middle" fontSize="10.5" fill="#231F1A">trace &amp; error analysis, red teaming</text>
        <text x="124" y="100" textAnchor="middle" fontSize="10" fontWeight="600" fill="#2A422D">Fast · Low cost · Early signal</text>

        <line x1="237" y1="68" x2="275" y2="68" stroke="#231F1A" strokeWidth="1.8" markerEnd="url(#arrow-pipe)" />

        <rect x="278" y="20" width="225" height="96" rx="6" fill="#E3EAF0" stroke="#335C81" strokeWidth="1.5" />
        <text x="390" y="45" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1E3A54">Stage 2: Extrinsic Studies</text>
        <text x="390" y="65" textAnchor="middle" fontSize="10.5" fill="#231F1A">Observed task studies, RCTs with</text>
        <text x="390" y="81" textAnchor="middle" fontSize="10.5" fill="#231F1A">target users, skill &amp; offloading checks</text>
        <text x="390" y="100" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1E3A54">Real-world value before deploy</text>

        <line x1="503" y1="68" x2="541" y2="68" stroke="#231F1A" strokeWidth="1.8" markerEnd="url(#arrow-pipe)" />

        <rect x="544" y="20" width="224" height="96" rx="6" fill="#F6ECD5" stroke="#D49B2A" strokeWidth="1.5" />
        <text x="656" y="45" textAnchor="middle" fontSize="12" fontWeight="700" fill="#6E4E12">Stage 3: Longitudinal</text>
        <text x="656" y="65" textAnchor="middle" fontSize="10.5" fill="#231F1A">Familiarization, sycophancy &amp; drift,</text>
        <text x="656" y="81" textAnchor="middle" fontSize="10.5" fill="#231F1A">field monitoring &amp; reevaluation</text>
        <text x="656" y="100" textAnchor="middle" fontSize="10" fontWeight="600" fill="#6E4E12">Sustained trust &amp; safety</text>

        <defs>
          <marker id="arrow-pipe" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#231F1A" />
          </marker>
        </defs>
      </svg>
      <figcaption className="mt-2.5 text-center font-mono text-[11px] text-[#5C5346]">
        FIG 4.1 — Layered evaluation pipeline: intrinsic gates → extrinsic human validation → longitudinal monitoring.
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
        <text x="26" y="124" fontSize="10.5" fill="#5C5346">Perception surveys ≠ ground truth.</text>

        <rect x="269" y="14" width="242" height="156" rx="6" fill="#F6ECD5" stroke="#D49B2A" strokeWidth="1.5" />
        <text x="283" y="38" fontSize="11.5" fontWeight="700" fill="#6E4E12">Skill Erosion (Anthropic 2026)</text>
        <text x="283" y="62" fontSize="11" fill="#231F1A">• 52 engineers learning new library</text>
        <text x="283" y="82" fontSize="11" fontWeight="700" fill="#8C5F0B">• −17% on follow-up mastery quiz</text>
        <text x="283" y="106" fontSize="10.5" fill="#231F1A">Largest drop in debugging skill.</text>
        <text x="283" y="124" fontSize="10.5" fill="#5C5346">Track mastery, not just completion.</text>

        <rect x="526" y="14" width="242" height="156" rx="6" fill="#E3EAF0" stroke="#335C81" strokeWidth="1.5" />
        <text x="540" y="38" fontSize="11.5" fontWeight="700" fill="#1E3A54">Offloading Score (NeurIPS 2026)</text>
        <text x="540" y="62" fontSize="11" fill="#231F1A">• Fraction of steps saved via AI</text>
        <text x="540" y="82" fontSize="11" fontWeight="700" fill="#335C81">• High reliance ↓ code recall</text>
        <text x="540" y="106" fontSize="10.5" fill="#231F1A">Outlier cluster: “appropriately reliant”</text>
        <text x="540" y="124" fontSize="10.5" fill="#5C5346">users who use AI to learn &amp; improvise.</text>
      </svg>
      <figcaption className="mt-2.5 text-center font-mono text-[11px] text-[#5C5346]">
        FIG 5.1 — Why human outcomes must be measured directly: perceived speed, skill retention, and reliance diverge from benchmarks.
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
        FIG 5.2 — Keep frequency, severity, detectability, affected populations, and mandatory constraints distinct.
      </figcaption>
    </figure>
  );
}

export function HorizonDiagram() {
  return (
    <figure className="vintage-card my-6 rounded-lg p-5">
      <svg viewBox="0 0 780 175" className="w-full h-auto" role="img" aria-label="Short-Term vs Long-Term Evaluation Dynamics">
        <rect x="16" y="16" width="360" height="142" rx="6" fill="#F5EFE2" stroke="#231F1A" strokeWidth="1.3" />
        <text x="34" y="42" fontSize="12.5" fontWeight="700" fill="#231F1A">Short-Term Session (e.g., 1 hour)</text>
        <text x="34" y="68" fontSize="11" fill="#231F1A">• Captures immediate speed or creativity</text>
        <text x="34" y="88" fontSize="11" fill="#231F1A">• Users rank sycophantic AI #1 in the moment</text>
        <text x="34" y="108" fontSize="11" fill="#231F1A">• Misses prompt customization after learning</text>
        <text x="34" y="136" fontSize="10.5" fontWeight="600" fill="#C8552D">Risk: Optimizing for instant satisfaction</text>

        <rect x="404" y="16" width="360" height="142" rx="6" fill="#E3EAF0" stroke="#335C81" strokeWidth="1.5" />
        <text x="422" y="42" fontSize="12.5" fontWeight="700" fill="#1E3A54">Long-Term Deployment (weeks+)</text>
        <text x="422" y="68" fontSize="11" fill="#231F1A">• Familiarization unlocks workflow value (Long et al.)</text>
        <text x="422" y="88" fontSize="11" fill="#231F1A">• Sycophancy erodes human satisfaction (Ibrahim et al.)</text>
        <text x="422" y="108" fontSize="11" fill="#231F1A">• Reveals skill erosion, opinion drift &amp; model drift</text>
        <text x="422" y="136" fontSize="10.5" fontWeight="600" fill="#2A422D">Goal: Realistic horizons &amp; reevaluation triggers</text>
      </svg>
      <figcaption className="mt-2.5 text-center font-mono text-[11px] text-[#5C5346]">
        FIG 6.1 — Short-term sessions and longitudinal deployments reveal different—sometimes opposite—patterns.
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
        <text x="30" y="94" fontSize="10.5" fill="#5C5346">• Contamination, overfitting &amp; narrow proxies</text>

        <rect x="410" y="14" width="376" height="100" rx="6" fill="#F6ECD5" stroke="#D49B2A" strokeWidth="1.5" />
        <text x="426" y="38" fontSize="12" fontWeight="700" fill="#6E4E12">2. Human–AI &amp; Preference Illusions</text>
        <text x="426" y="58" fontSize="10.5" fill="#231F1A">• “Perceived speedup (+20%) = actual speedup (−19%)”</text>
        <text x="426" y="76" fontSize="10.5" fill="#231F1A">• “Instant chat preference = long-term benefit” (sycophancy)</text>
        <text x="426" y="94" fontSize="10.5" fill="#5C5346">• Ignoring skill erosion (−17%) &amp; opinion drift</text>

        <rect x="14" y="130" width="376" height="100" rx="6" fill="#E3EAF0" stroke="#335C81" strokeWidth="1.5" />
        <text x="30" y="154" fontSize="12" fontWeight="700" fill="#1E3A54">3. Evaluator &amp; Simulation Traps</text>
        <text x="30" y="174" fontSize="10.5" fill="#231F1A">• “LLM-as-a-judge is objective ground truth”</text>
        <text x="30" y="192" fontSize="10.5" fill="#231F1A">• “Simulated personas can replace real user studies”</text>
        <text x="30" y="210" fontSize="10.5" fill="#5C5346">• Position/verbosity bias &amp; sociocultural caricatures</text>

        <rect x="410" y="130" width="376" height="100" rx="6" fill="#E6EDE2" stroke="#4A6B4E" strokeWidth="1.5" />
        <text x="426" y="154" fontSize="12" fontWeight="700" fill="#2A422D">4. Statistical &amp; Reporting Fallacies</text>
        <text x="426" y="174" fontSize="10.5" fill="#231F1A">• “0 failures in 100 runs = 0% failure rate” (~3% bound)</text>
        <text x="426" y="192" fontSize="10.5" fill="#231F1A">• Averaging minor bugs with critical disclosures</text>
        <text x="426" y="210" fontSize="10.5" fill="#5C5346">• Tuning on the test set &amp; claiming confirmation</text>
      </svg>
      <figcaption className="mt-2.5 text-center font-mono text-[11px] text-[#5C5346]">
        FIG 7.1 — Four families of AI evaluation fallacies that cause teams to overstate readiness or misread user impact.
      </figcaption>
    </figure>
  );
}

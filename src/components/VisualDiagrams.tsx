export function LandscapeDiagram() {
  return (
    <figure className="my-5 rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
      <svg viewBox="0 0 820 310" className="w-full h-auto" role="img" aria-label="AI Evaluation Landscape Diagram">
        <rect x="8" y="8" width="804" height="294" rx="16" fill="#eef2ff" fillOpacity="0.45" stroke="#818cf8" strokeWidth="2" strokeDasharray="6 4" />
        <text x="24" y="32" fontSize="12" fontWeight="700" fill="#3730a3" letterSpacing="0.04em">
          8. OUTER LAYER: EVALUATION QUALITY &amp; VALIDITY (What conclusions can this credibly support?)
        </text>

        <rect x="26" y="48" width="768" height="236" rx="12" fill="#fffbeb" fillOpacity="0.7" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="42" y="70" fontSize="11.5" fontWeight="700" fill="#92400e" letterSpacing="0.04em">
          CROSS-CUTTING: GOVERNANCE (Roles &amp; accountability) &amp; 7. TIME / LIFECYCLE (Change triggers &amp; monitoring)
        </text>

        <rect x="42" y="86" width="736" height="178" rx="10" fill="#ffffff" stroke="#d6d3d1" strokeWidth="1.5" />
        <text x="58" y="108" fontSize="11" fontWeight="600" fill="#57534e">
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
              rx="8"
              fill={i === arr.length - 1 ? '#1c1917' : '#f5f5f4'}
              stroke={i === arr.length - 1 ? '#1c1917' : '#a8a29e'}
              strokeWidth="1.2"
            />
            <text
              x={n.x + 43}
              y="150"
              textAnchor="middle"
              fontSize="11.5"
              fontWeight="700"
              fill={i === arr.length - 1 ? '#ffffff' : '#1c1917'}
            >
              {n.label}
            </text>
            <text
              x={n.x + 43}
              y="166"
              textAnchor="middle"
              fontSize="10.5"
              fill={i === arr.length - 1 ? '#d6d3d1' : '#57534e'}
            >
              {n.sub}
            </text>
            {i < arr.length - 1 && (
              <line
                x1={n.x + 86}
                y1="154"
                x2={n.x + 104}
                y2="154"
                stroke="#78716c"
                strokeWidth="1.5"
                markerEnd="url(#arrow)"
              />
            )}
          </g>
        ))}

        <path
          d="M 517 182 C 517 212, 413 212, 413 186"
          fill="none"
          stroke="#6366f1"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          markerEnd="url(#arrow-indigo)"
        />
        <text x="465" y="224" textAnchor="middle" fontSize="10" fill="#4338ca" fontWeight="600">
          Criteria drift / discovery
        </text>

        <path
          d="M 725 182 C 725 246, 101 246, 101 186"
          fill="none"
          stroke="#d97706"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          markerEnd="url(#arrow-amber)"
        />
        <text x="413" y="253" textAnchor="middle" fontSize="10" fill="#b45309" fontWeight="600">
          Reevaluation triggers &amp; post-deployment feedback
        </text>

        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#78716c" />
          </marker>
          <marker id="arrow-indigo" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#6366f1" />
          </marker>
          <marker id="arrow-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#d97706" />
          </marker>
        </defs>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-stone-500">
        Figure 1.1 — The 10-element evaluation architecture: central flow, cross-cutting Governance &amp; Time, and outer Evaluation Quality layer.
      </figcaption>
    </figure>
  );
}

export function SphereDiagram() {
  return (
    <figure className="my-5 rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
      <svg viewBox="0 0 800 295" className="w-full h-auto" role="img" aria-label="SPHERE 5-Dimension Evaluation Card">
        {/* Outer Meta Box */}
        <rect x="10" y="10" width="780" height="275" rx="14" fill="#f5f3ff" fillOpacity="0.45" stroke="#8b5cf6" strokeWidth="1.8" strokeDasharray="6 4" />
        <text x="26" y="32" fontSize="11.5" fontWeight="700" fill="#5b21b6" letterSpacing="0.03em">
          5. (META) HOW IS THE EVALUATION VALIDATED? — Validity, Reliability, Counterbalancing &amp; Randomized Controls
        </text>

        {/* Center Hub */}
        <rect x="295" y="106" width="210" height="84" rx="12" fill="#1c1917" />
        <text x="400" y="138" textAnchor="middle" fontSize="14" fontWeight="700" fill="#ffffff">
          SPHERE Evaluation Card
        </text>
        <text x="400" y="158" textAnchor="middle" fontSize="11" fill="#d6d3d1">
          Human–AI Interaction
        </text>
        <text x="400" y="174" textAnchor="middle" fontSize="10" fill="#a8a29e">
          Ma et al. (ACL 2025)
        </text>

        {/* 1. What */}
        <rect x="26" y="48" width="240" height="94" rx="10" fill="#ecfdf5" stroke="#6ee7b7" strokeWidth="1.5" />
        <text x="40" y="70" fontSize="12" fontWeight="700" fill="#065f46">1. What is being evaluated?</text>
        <text x="40" y="89" fontSize="10.5" fill="#047857">• Component: System vs. Model</text>
        <text x="40" y="106" fontSize="10.5" fill="#047857">• Goals: Effectiveness, Efficiency, Satisfaction</text>
        <text x="40" y="123" fontSize="10.5" fill="#047857">• Skill retention, offloading &amp; opinion drift</text>
        <line x1="266" y1="98" x2="295" y2="128" stroke="#34d399" strokeWidth="1.5" />

        {/* 2. How */}
        <rect x="534" y="48" width="240" height="94" rx="10" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.5" />
        <text x="548" y="70" fontSize="12" fontWeight="700" fill="#1e3a8a">2. How are we evaluating?</text>
        <text x="548" y="89" fontSize="10.5" fill="#1e40af">• Intrinsic (model alone) vs. Extrinsic (task)</text>
        <text x="548" y="106" fontSize="10.5" fill="#1e40af">• Quantitative (“what”) vs. Qualitative (“why”)</text>
        <text x="548" y="123" fontSize="10.5" fill="#1e40af">• Layered pipeline: gates → user studies</text>
        <line x1="534" y1="98" x2="505" y2="128" stroke="#60a5fa" strokeWidth="1.5" />

        {/* 3. Who */}
        <rect x="26" y="168" width="240" height="98" rx="10" fill="#fef3c7" stroke="#fcd34d" strokeWidth="1.5" />
        <text x="40" y="190" fontSize="12" fontWeight="700" fill="#78350f">3. Who is evaluating?</text>
        <text x="40" y="209" fontSize="10.5" fill="#92400e">• Target end users &amp; domain experts</text>
        <text x="40" y="226" fontSize="10.5" fill="#92400e">• Crowd workers (audit whose values align)</text>
        <text x="40" y="243" fontSize="10.5" fill="#92400e">• LLM-simulated users (caricature risk)</text>
        <line x1="266" y1="210" x2="295" y2="170" stroke="#fbbf24" strokeWidth="1.5" />

        {/* 4. When */}
        <rect x="534" y="168" width="240" height="98" rx="10" fill="#fdf2f8" stroke="#f9a8d4" strokeWidth="1.5" />
        <text x="548" y="190" fontSize="12" fontWeight="700" fill="#831843">4. When do we evaluate?</text>
        <text x="548" y="209" fontSize="10.5" fill="#9d174d">• Immediate / Short-term (e.g., 1-hr session)</text>
        <text x="548" y="226" fontSize="10.5" fill="#9d174d">• Long-term deployment (days/weeks+)</text>
        <text x="548" y="243" fontSize="10.5" fill="#9d174d">• Familiarization phase vs. sycophancy drift</text>
        <line x1="534" y1="210" x2="505" y2="170" stroke="#f472b6" strokeWidth="1.5" />
      </svg>
      <figcaption className="mt-2 text-center text-xs text-stone-500">
        Figure 2.1 — All five dimensions of the SPHERE Evaluation Card for Human–AI Systems (
        <a
          href="https://sphere-eval.github.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 underline hover:text-indigo-800"
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
    <figure className="my-5 rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
      <svg viewBox="0 0 780 165" className="w-full h-auto" role="img" aria-label="Human-AI Synergy Meta-Analysis">
        <rect x="14" y="14" width="366" height="136" rx="10" fill="#ecfdf5" stroke="#6ee7b7" strokeWidth="1.5" />
        <text x="32" y="38" fontSize="12" fontWeight="700" fill="#065f46">Human Augmentation: Human+AI vs. Human Alone</text>
        <text x="32" y="64" fontSize="20" fontWeight="800" fill="#047857">g = +0.64 (95% CI: 0.53 to 0.74)</text>
        <text x="32" y="88" fontSize="11" fill="#065f46">• Outperformed human alone in 85% of studies (n = 314)</text>
        <text x="32" y="108" fontSize="11" fill="#065f46">• Strongest gains in content-creation &amp; open-response tasks</text>
        <text x="32" y="128" fontSize="11" fill="#065f46">• Positive synergy when humans outperformed AI alone</text>

        <rect x="400" y="14" width="366" height="136" rx="10" fill="#fff1f2" stroke="#fda4af" strokeWidth="1.5" />
        <text x="418" y="38" fontSize="12" fontWeight="700" fill="#881337">Human–AI Synergy: Human+AI vs. max(Human, AI)</text>
        <text x="418" y="64" fontSize="20" fontWeight="800" fill="#be123c">g = −0.23 (95% CI: −0.39 to −0.07)</text>
        <text x="418" y="88" fontSize="11" fill="#9f1239">• Underperformed best solo actor in 58% of studies (n = 213)</text>
        <text x="418" y="108" fontSize="11" fill="#9f1239">• Performance losses concentrated in decision-making tasks</text>
        <text x="418" y="128" fontSize="11" fill="#9f1239">• Losses occurred when AI alone outperformed humans</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-stone-500">
        Figure 2.2 — Meta-analysis of 370 effect sizes (Vaccaro, Almaatouq &amp; Malone, <em>Nature Human Behaviour</em>, 2024).
      </figcaption>
    </figure>
  );
}

export function ScopeBoundaryDiagram() {
  return (
    <figure className="my-5 rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
      <svg viewBox="0 0 780 210" className="w-full h-auto" role="img" aria-label="Nested Evaluation Scopes">
        <rect x="10" y="10" width="760" height="190" rx="14" fill="#fafaf9" stroke="#d6d3d1" strokeWidth="1.5" />
        <text x="26" y="32" fontSize="11.5" fontWeight="700" fill="#44403c">6. Societal &amp; Environmental Effects (distribution of benefits, harms, access, resource costs)</text>

        <rect x="26" y="42" width="728" height="146" rx="12" fill="#f5f5f4" stroke="#a8a29e" strokeWidth="1.2" />
        <text x="42" y="62" fontSize="11.5" fontWeight="700" fill="#292524">5. Organizational Deployment (workflow change, review effort, coordination, maintenance)</text>

        <rect x="42" y="72" width="696" height="104" rx="10" fill="#eef2ff" stroke="#818cf8" strokeWidth="1.2" />
        <text x="58" y="92" fontSize="11.5" fontWeight="700" fill="#312e81">4. Human–AI Interaction / Team (completed human work, error recognition, skill &amp; reliance)</text>

        <rect x="58" y="102" width="664" height="62" rx="8" fill="#ecfdf5" stroke="#34d399" strokeWidth="1.2" />
        <text x="74" y="121" fontSize="11" fontWeight="700" fill="#065f46">3. Complete AI System / Agent (Model + Harness: retrieval, prompts, tools, memory, permissions, UI)</text>

        <rect x="74" y="130" width="300" height="26" rx="6" fill="#ffffff" stroke="#10b981" strokeWidth="1.2" />
        <text x="224" y="147" textAnchor="middle" fontSize="11" fontWeight="600" fill="#047857">1. Model (weights / API under fixed conditions)</text>

        <rect x="390" y="130" width="316" height="26" rx="6" fill="#ffffff" stroke="#10b981" strokeWidth="1.2" />
        <text x="548" y="147" textAnchor="middle" fontSize="11" fontWeight="600" fill="#047857">2. Component / Subsystem (e.g., retriever, router)</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-stone-500">
        Figure 3.1 — Six overlapping scopes. Evidence at an inner scope does not automatically establish a claim at an outer scope.
      </figcaption>
    </figure>
  );
}

export function LayeredPipelineDiagram() {
  return (
    <figure className="my-5 rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
      <svg viewBox="0 0 780 140" className="w-full h-auto" role="img" aria-label="Layered Evaluation Pipeline">
        <rect x="12" y="20" width="225" height="96" rx="10" fill="#ecfdf5" stroke="#34d399" strokeWidth="1.5" />
        <text x="124" y="45" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065f46">Stage 1: Intrinsic Gates</text>
        <text x="124" y="65" textAnchor="middle" fontSize="10.5" fill="#047857">Benchmarks, unit/behavioral tests,</text>
        <text x="124" y="81" textAnchor="middle" fontSize="10.5" fill="#047857">trace &amp; error analysis, red teaming</text>
        <text x="124" y="100" textAnchor="middle" fontSize="10" fontWeight="600" fill="#065f46">Fast · Low cost · Early signal</text>

        <line x1="237" y1="68" x2="275" y2="68" stroke="#78716c" strokeWidth="1.8" markerEnd="url(#arrow-pipe)" />

        <rect x="278" y="20" width="225" height="96" rx="10" fill="#eef2ff" stroke="#818cf8" strokeWidth="1.5" />
        <text x="390" y="45" textAnchor="middle" fontSize="12" fontWeight="700" fill="#312e81">Stage 2: Extrinsic Studies</text>
        <text x="390" y="65" textAnchor="middle" fontSize="10.5" fill="#3730a3">Observed task studies, RCTs with</text>
        <text x="390" y="81" textAnchor="middle" fontSize="10.5" fill="#3730a3">target users, skill &amp; offloading checks</text>
        <text x="390" y="100" textAnchor="middle" fontSize="10" fontWeight="600" fill="#312e81">Real-world value before deploy</text>

        <line x1="503" y1="68" x2="541" y2="68" stroke="#78716c" strokeWidth="1.8" markerEnd="url(#arrow-pipe)" />

        <rect x="544" y="20" width="224" height="96" rx="10" fill="#fffbeb" stroke="#fbbf24" strokeWidth="1.5" />
        <text x="656" y="45" textAnchor="middle" fontSize="12" fontWeight="700" fill="#78350f">Stage 3: Longitudinal</text>
        <text x="656" y="65" textAnchor="middle" fontSize="10.5" fill="#92400e">Familiarization, sycophancy &amp; drift,</text>
        <text x="656" y="81" textAnchor="middle" fontSize="10.5" fill="#92400e">field monitoring &amp; reevaluation</text>
        <text x="656" y="100" textAnchor="middle" fontSize="10" fontWeight="600" fill="#78350f">Sustained trust &amp; safety</text>

        <defs>
          <marker id="arrow-pipe" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#78716c" />
          </marker>
        </defs>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-stone-500">
        Figure 4.1 — A layered evaluation pipeline complements fast intrinsic gates with extrinsic human-centered validation and longitudinal monitoring.
      </figcaption>
    </figure>
  );
}

export function OutcomesComparisonDiagram() {
  return (
    <figure className="my-5 rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
      <svg viewBox="0 0 780 185" className="w-full h-auto" role="img" aria-label="Empirical Human-AI Outcome Findings">
        {/* METR */}
        <rect x="12" y="14" width="242" height="156" rx="10" fill="#fff1f2" stroke="#fda4af" strokeWidth="1.5" />
        <text x="26" y="38" fontSize="11.5" fontWeight="700" fill="#881337">Perceived vs. Actual Speed (METR)</text>
        <text x="26" y="62" fontSize="11" fill="#047857">• Self-forecast: 20% faster with AI</text>
        <text x="26" y="82" fontSize="11" fontWeight="700" fill="#be123c">• Observed RCT: 19% slower with AI</text>
        <text x="26" y="106" fontSize="10.5" fill="#44403c">16 experienced devs · 246 tasks.</text>
        <text x="26" y="124" fontSize="10.5" fill="#44403c">Perception surveys ≠ ground truth.</text>

        {/* Skill Erosion */}
        <rect x="269" y="14" width="242" height="156" rx="10" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1.5" />
        <text x="283" y="38" fontSize="11.5" fontWeight="700" fill="#78350f">Skill Erosion (Anthropic 2026)</text>
        <text x="283" y="62" fontSize="11" fill="#92400e">• 52 engineers learning new library</text>
        <text x="283" y="82" fontSize="11" fontWeight="700" fill="#b45309">• −17% on follow-up mastery quiz</text>
        <text x="283" y="106" fontSize="10.5" fill="#44403c">Largest drop in debugging skill.</text>
        <text x="283" y="124" fontSize="10.5" fill="#44403c">Track mastery, not just completion.</text>

        {/* Offloading */}
        <rect x="526" y="14" width="242" height="156" rx="10" fill="#eef2ff" stroke="#818cf8" strokeWidth="1.5" />
        <text x="540" y="38" fontSize="11.5" fontWeight="700" fill="#312e81">Offloading Score (NeurIPS 2026)</text>
        <text x="540" y="62" fontSize="11" fill="#3730a3">• Fraction of steps saved via AI</text>
        <text x="540" y="82" fontSize="11" fontWeight="700" fill="#4338ca">• High reliance ↓ code recall</text>
        <text x="540" y="106" fontSize="10.5" fill="#44403c">Outlier cluster: “appropriately reliant”</text>
        <text x="540" y="124" fontSize="10.5" fill="#44403c">users who use AI to learn &amp; improvise.</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-stone-500">
        Figure 5.1 — Why human outcomes must be measured directly: perceived speed, skill retention, and reliance diverge from benchmark scores.
      </figcaption>
    </figure>
  );
}

export function AggregationTrapDiagram() {
  return (
    <figure className="my-5 rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
      <svg viewBox="0 0 780 155" className="w-full h-auto" role="img" aria-label="Single-Score Aggregation Trap">
        <rect x="16" y="18" width="240" height="118" rx="10" fill="#fff1f2" stroke="#fda4af" strokeWidth="1.5" />
        <text x="136" y="44" textAnchor="middle" fontSize="12" fontWeight="700" fill="#881337">Collapsed Single Score</text>
        <text x="136" y="82" textAnchor="middle" fontSize="28" fontWeight="800" fill="#be123c">95% Pass</text>
        <text x="136" y="114" textAnchor="middle" fontSize="10.5" fill="#9f1239">Hides severity, harm &amp; recoverability</text>

        <line x1="264" y1="77" x2="314" y2="77" stroke="#78716c" strokeWidth="1.8" markerEnd="url(#arrow-agg)" />
        <text x="289" y="66" textAnchor="middle" fontSize="10" fill="#57534e">Disaggregate</text>

        <rect x="322" y="18" width="442" height="34" rx="6" fill="#ecfdf5" stroke="#6ee7b7" strokeWidth="1.2" />
        <text x="338" y="39" fontSize="11.5" fontWeight="600" fill="#065f46">95 / 100 Passed all criteria</text>

        <rect x="322" y="60" width="442" height="34" rx="6" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1.2" />
        <text x="338" y="81" fontSize="11.5" fontWeight="600" fill="#92400e">4 / 100 Minor formatting issue (low severity · easily recovered)</text>

        <rect x="322" y="102" width="442" height="34" rx="6" fill="#ffe4e6" stroke="#f43f5e" strokeWidth="1.5" />
        <text x="338" y="123" fontSize="11.5" fontWeight="700" fill="#881337">1 / 100 Unauthorized disclosure (CRITICAL · mandatory constraint)</text>

        <defs>
          <marker id="arrow-agg" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#78716c" />
          </marker>
        </defs>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-stone-500">
        Figure 5.2 — Keep frequency, severity, detectability, affected populations, and mandatory constraints distinct when aggregating.
      </figcaption>
    </figure>
  );
}

export function HorizonDiagram() {
  return (
    <figure className="my-5 rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
      <svg viewBox="0 0 780 175" className="w-full h-auto" role="img" aria-label="Short-Term vs Long-Term Evaluation Dynamics">
        <rect x="16" y="16" width="360" height="142" rx="10" fill="#f5f5f4" stroke="#d6d3d1" strokeWidth="1.5" />
        <text x="34" y="42" fontSize="12.5" fontWeight="700" fill="#1c1917">Short-Term Session (e.g., 1 hour)</text>
        <text x="34" y="68" fontSize="11" fill="#44403c">• Captures immediate speed or creativity</text>
        <text x="34" y="88" fontSize="11" fill="#44403c">• Users rank sycophantic AI #1 in the moment</text>
        <text x="34" y="108" fontSize="11" fill="#44403c">• Misses prompt customization after learning</text>
        <text x="34" y="136" fontSize="10.5" fontWeight="600" fill="#b45309">Risk: Optimizing for instant satisfaction</text>

        <rect x="404" y="16" width="360" height="142" rx="10" fill="#eef2ff" stroke="#818cf8" strokeWidth="1.5" />
        <text x="422" y="42" fontSize="12.5" fontWeight="700" fill="#312e81">Long-Term Deployment (weeks+)</text>
        <text x="422" y="68" fontSize="11" fill="#3730a3">• Familiarization unlocks workflow value (Long et al., 2024)</text>
        <text x="422" y="88" fontSize="11" fill="#3730a3">• Sycophancy erodes human satisfaction (Ibrahim et al.)</text>
        <text x="422" y="108" fontSize="11" fill="#3730a3">• Reveals skill erosion, opinion drift &amp; model drift</text>
        <text x="422" y="136" fontSize="10.5" fontWeight="600" fill="#047857">Goal: Realistic horizons &amp; reevaluation triggers</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-stone-500">
        Figure 6.1 — Short-term sessions and longitudinal deployments reveal different—sometimes opposite—patterns.
      </figcaption>
    </figure>
  );
}

export function FallaciesDiagram() {
  return (
    <figure className="my-5 rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
      <svg viewBox="0 0 800 245" className="w-full h-auto" role="img" aria-label="Four Categories of AI Evaluation Fallacies">
        {/* 1. Benchmark & Construct Fallacies */}
        <rect x="14" y="14" width="376" height="100" rx="10" fill="#fff1f2" stroke="#fda4af" strokeWidth="1.5" />
        <text x="30" y="38" fontSize="12" fontWeight="700" fill="#881337">1. Benchmark &amp; Construct Hype</text>
        <text x="30" y="58" fontSize="10.5" fill="#9f1239">• “High leaderboard score = real-world readiness”</text>
        <text x="30" y="76" fontSize="10.5" fill="#9f1239">• “Passing unit tests = general coding competence”</text>
        <text x="30" y="94" fontSize="10.5" fill="#9f1239">• Contamination, overfitting &amp; narrow proxies</text>

        {/* 2. Human-AI & Preference Fallacies */}
        <rect x="410" y="14" width="376" height="100" rx="10" fill="#fffbeb" stroke="#fcd34d" strokeWidth="1.5" />
        <text x="426" y="38" fontSize="12" fontWeight="700" fill="#78350f">2. Human–AI &amp; Preference Illusions</text>
        <text x="426" y="58" fontSize="10.5" fill="#92400e">• “Perceived speedup (+20%) = actual speedup (−19%)”</text>
        <text x="426" y="76" fontSize="10.5" fill="#92400e">• “Instant chat preference = long-term benefit” (sycophancy)</text>
        <text x="426" y="94" fontSize="10.5" fill="#92400e">• Ignoring skill erosion (−17%) &amp; opinion drift</text>

        {/* 3. Judge & Simulation Fallacies */}
        <rect x="14" y="130" width="376" height="100" rx="10" fill="#eef2ff" stroke="#818cf8" strokeWidth="1.5" />
        <text x="30" y="154" fontSize="12" fontWeight="700" fill="#312e81">3. Evaluator &amp; Simulation Traps</text>
        <text x="30" y="174" fontSize="10.5" fill="#3730a3">• “LLM-as-a-judge is objective ground truth”</text>
        <text x="30" y="192" fontSize="10.5" fill="#3730a3">• “Simulated personas can replace real user studies”</text>
        <text x="30" y="210" fontSize="10.5" fill="#3730a3">• Position/verbosity bias &amp; sociocultural caricatures</text>

        {/* 4. Statistical & Process Fallacies */}
        <rect x="410" y="130" width="376" height="100" rx="10" fill="#ecfdf5" stroke="#6ee7b7" strokeWidth="1.5" />
        <text x="426" y="154" fontSize="12" fontWeight="700" fill="#065f46">4. Statistical &amp; Reporting Fallacies</text>
        <text x="426" y="174" fontSize="10.5" fill="#047857">• “0 failures in 100 runs = 0% failure rate” (~3% bound)</text>
        <text x="426" y="192" fontSize="10.5" fill="#047857">• Averaging minor bugs with critical disclosures</text>
        <text x="426" y="210" fontSize="10.5" fill="#047857">• Tuning on the test set &amp; claiming confirmation</text>
      </svg>
      <figcaption className="mt-2 text-center text-xs text-stone-500">
        Figure 7.1 — Four families of AI evaluation fallacies that cause teams to overstate readiness or misread user impact.
      </figcaption>
    </figure>
  );
}


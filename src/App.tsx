import { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, ClipboardCheck, ExternalLink, Layers, Menu, X } from 'lucide-react';
import { FrameworkProtocolTool, SphereCardTool } from './components/EvalTools';
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
} from './components/VisualDiagrams';
import { PROTOCOL_FIELDS, REPORTING_CLAIMS } from './data/curriculum';
import {
  DISCIPLINES,
  EVIDENCE_METHODS,
  FLOW_NODES,
  SAMPLING_PURPOSES,
  SCOPES,
  TARGET_INVENTORY,
  VALIDITY_DIMENSIONS,
} from './data/evalsData';

const MODULES = [
  {
    id: 'm1',
    number: 1,
    title: 'Foundations & The Evaluation Landscape',
    subtitle: 'Core definition, statement types, 10-element architecture, and conceptual foundations',
  },
  {
    id: 'm2',
    number: 2,
    title: 'Human–AI Interaction & SPHERE',
    subtitle: 'Why interaction is the interface, the 5 SPHERE dimensions, and human–AI synergy',
  },
  {
    id: 'm3',
    number: 3,
    title: 'Framing: Purpose, Scope, Targets & Context',
    subtitle: 'Exploratory vs. confirmatory modes, nested scopes, agent harnesses, and coverage',
  },
  {
    id: 'm4',
    number: 4,
    title: 'Criteria, Evidence Collection & Sampling',
    subtitle: '8-field criterion spec, intrinsic vs. extrinsic pipelines, and sampling purposes',
  },
  {
    id: 'm5',
    number: 5,
    title: 'Real Human Outcomes, Grading & Aggregation',
    subtitle: 'Perceived vs. actual speed, skill erosion, offloading, grader validation, and severity',
  },
  {
    id: 'm6',
    number: 6,
    title: 'Statistics, Validity, Lifecycle & Protocol',
    subtitle: 'Rare-failure bounds, clustering, 10 validity checks, sycophancy over time, and protocol',
  },
  {
    id: 'm7',
    number: 7,
    title: 'Debunking AI Eval Hype, Fallacies & Failure Modes',
    subtitle: '10 common evaluation traps, why leaderboards mislead, and a critical red-flag checklist',
  },
] as const;

export function App() {
  const [viewMode, setViewMode] = useState<'guide' | 'sphere-tool' | 'framework-tool'>('guide');
  const [activeIdx, setActiveIdx] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeModule = MODULES[activeIdx];

  const selectModule = (idx: number) => {
    setActiveIdx(idx);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F5EFE2] text-[#231F1A] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b-2 border-[#231F1A] bg-[#FBF7EE]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              className="vintage-btn rounded-md bg-[#F5EFE2] p-1.5 text-[#231F1A] lg:hidden"
              aria-label="Toggle modules"
            >
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
            <img
              src="./exosphere-logo.png"
              alt="AI Evaluation Guide & Protocol logo"
              className="h-10 w-10 shrink-0 rounded-md border border-[#231F1A] bg-[#FBF7EE] p-0.5 object-contain"
            />
            <div>
              <h1 className="font-display text-base font-bold tracking-tight text-[#231F1A] sm:text-lg">
                AI Evaluation Guide &amp; Protocol
              </h1>
              <p className="hidden font-mono text-[11px] text-[#5C5346] sm:block">
                7-Module Field Manual · Evidence-Based AI Eval + SPHERE (CS 329X)
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex rounded-md border border-[#231F1A] bg-[#EFE7D6] p-0.5 text-xs">
              <button
                onClick={() => setViewMode('guide')}
                className={`inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 font-medium transition ${
                  viewMode === 'guide'
                    ? 'bg-[#231F1A] text-[#FBF7EE]'
                    : 'text-[#231F1A] hover:bg-[#E5DBC5]'
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                Guide
              </button>
              <button
                onClick={() => setViewMode('sphere-tool')}
                className={`inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 font-medium transition ${
                  viewMode === 'sphere-tool'
                    ? 'bg-[#231F1A] text-[#FBF7EE]'
                    : 'text-[#231F1A] hover:bg-[#E5DBC5]'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                SPHERE Card Tool
              </button>
              <button
                onClick={() => setViewMode('framework-tool')}
                className={`inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 font-medium transition ${
                  viewMode === 'framework-tool'
                    ? 'bg-[#231F1A] text-[#FBF7EE]'
                    : 'text-[#231F1A] hover:bg-[#E5DBC5]'
                }`}
              >
                <ClipboardCheck className="h-3.5 w-3.5" />
                Eval Protocol Tool
              </button>
            </div>

            <a
              href="https://sphere-eval.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="vintage-btn inline-flex items-center gap-1.5 rounded-md bg-[#F6ECD5] px-3 py-1.5 font-mono text-[11px] font-semibold text-[#231F1A]"
            >
              sphere-eval.github.io
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </header>

      {viewMode === 'sphere-tool' ? (
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
          <SphereCardTool />
        </main>
      ) : viewMode === 'framework-tool' ? (
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
          <FrameworkProtocolTool />
        </main>
      ) : (
      /* Main Layout */
      <div className="mx-auto flex w-full max-w-7xl flex-1">
        {/* Left Module Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'fixed inset-y-0 left-0 z-20 block w-72 bg-[#F5EFE2] pt-16 shadow-xl' : 'hidden'
          } w-72 shrink-0 border-r border-[#231F1A]/20 bg-[#EFE7D6]/60 p-4 lg:block`}
        >
          <div className="sticky top-24 space-y-2">
            <div className="px-2 pb-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#5C5346]">
              Index · {activeIdx + 1} / {MODULES.length}
            </div>
            {MODULES.map((m, idx) => {
              const active = idx === activeIdx;
              return (
                <button
                  key={m.id}
                  onClick={() => selectModule(idx)}
                  className={`w-full rounded-md border p-3 text-left transition ${
                    active
                      ? 'border-[#231F1A] bg-[#231F1A] text-[#FBF7EE] shadow-[2px_2px_0_#C8552D]'
                      : 'border-[#231F1A]/25 bg-[#FBF7EE] text-[#231F1A] hover:border-[#231F1A] hover:bg-[#F6ECD5]'
                  }`}
                >
                  <div className="text-xs font-semibold leading-snug">
                    <span className="font-mono opacity-75">0{m.number}.</span> {m.title}
                  </div>
                  <div
                    className={`mt-1 text-[11px] leading-snug ${
                      active ? 'text-[#EAE3D2]' : 'text-[#5C5346]'
                    }`}
                  >
                    {m.subtitle}
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Module Content Canvas */}
        <main className="min-w-0 flex-1 px-4 py-8 sm:px-8">
          <article className="mx-auto max-w-3xl space-y-8 pb-16">
            {/* Module Header */}
            <header className="space-y-2 border-b-2 border-[#231F1A] pb-5">
              <div className="font-mono text-xs font-semibold uppercase tracking-wider text-[#C8552D]">
                Section 0{activeModule.number} / 0{MODULES.length}
              </div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-[#231F1A] sm:text-3xl">
                {activeModule.title}
              </h2>
              <p className="text-sm text-[#5C5346]">{activeModule.subtitle}</p>
            </header>

            {/* MODULE 1 */}
            {activeModule.id === 'm1' && (
              <div className="space-y-8 text-sm leading-relaxed text-[#231F1A]">
                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-[#231F1A]">1.1 Definition &amp; Framework Status</h3>
                  <p>
                    <strong>AI evaluation</strong> is the systematic collection and interpretation of evidence about an AI model, system, its use, or its effects, against explicit questions and criteria, to inform understanding or support a decision.
                  </p>
                  <p>
                    Testing whether a model can solve a mathematical problem, whether a product behaves safely, and whether people benefit from using it require different evidence. A benchmark score, an expert’s judgment, and a measured improvement in someone’s work each establish something different.
                  </p>
                  <div className="vintage-box rounded-md p-4 text-xs text-[#5C5346]">
                    <strong className="text-[#231F1A]">Status of this architecture:</strong> This framework is a proposed synthesis developed to organize evaluation concerns. It is not a recognized industry standard, an empirically validated taxonomy, or a guarantee of completeness. Judge its value by whether it helps formulate sharper questions, uncover omissions, obtain credible evidence, and make defensible decisions.
                  </div>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-[#231F1A]">1.2 Three Kinds of Statements</h3>
                  <p>
                    A systematic procedure can still measure the wrong construct, overlook affected people, or support an overextended conclusion. Throughout an evaluation, keep three kinds of statements distinct:
                  </p>
                  <div className="grid gap-3 sm:grid-cols-3 text-xs">
                    <div className="vintage-box rounded-md p-4 space-y-1">
                      <div className="font-semibold text-[#231F1A]">Empirical claims</div>
                      <p className="text-[#5C5346]">What observations, tests, or studies show (e.g., “achieved 85/100 under these conditions”).</p>
                    </div>
                    <div className="vintage-box rounded-md p-4 space-y-1">
                      <div className="font-semibold text-[#231F1A]">Conceptual &amp; normative choices</div>
                      <p className="text-[#5C5346]">Definitions, priorities, requirements, and value judgments about acceptable consequences.</p>
                    </div>
                    <div className="vintage-box rounded-md p-4 space-y-1">
                      <div className="font-semibold text-[#231F1A]">Practical recommendations</div>
                      <p className="text-[#5C5346]">Proposed procedures whose suitability depends on the question, stakes, evidence, and resources.</p>
                    </div>
                  </div>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-[#231F1A]">1.3 The 10-Element Evaluation Landscape</h3>
                  <p>
                    The central flow connects a decision to the evidence needed to inform it. Governance and lifecycle considerations apply throughout, and the outer evaluation-quality layer asks how much confidence the evidence warrants. The numbers identify dimensions, not an inflexible one-way sequence (similar to how NIST describes its AI risk-management functions as iterative). Measurement procedures should also be designed before evidence is collected.
                  </p>

                  <LandscapeDiagram />

                  <div className="overflow-x-auto vintage-box rounded-md">
                    <table className="w-full text-left text-xs">
                      <thead className="border-b border-[#231F1A] bg-[#EFE7D6] text-[#231F1A]">
                        <tr>
                          <th className="px-4 py-2.5 font-semibold">Element</th>
                          <th className="px-4 py-2.5 font-semibold">Core Question</th>
                          <th className="px-4 py-2.5 font-semibold">Practical Output</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#231F1A]/15 text-[#231F1A]">
                        {FLOW_NODES.map((n) => (
                          <tr key={n.id}>
                            <td className="px-4 py-2.5 font-medium text-[#231F1A]">
                              {n.number}. {n.title}
                            </td>
                            <td className="px-4 py-2.5">{n.question}</td>
                            <td className="px-4 py-2.5 text-[#5C5346]">{n.practicalOutput}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-[#231F1A]">
                    1.4 Conceptual Foundations: Capability vs. Mechanism
                  </h3>
                  <p>
                    Terms such as <em>reasoning</em>, <em>understanding</em>, <em>helpfulness</em>, <em>fairness</em>, and <em>safety</em> have multiple interpretations. Naming a construct does not establish that it has been defined or measured. In a reasoning evaluation, four questions arise: (1) Which conception of reasoning is relevant? (2) Which tasks provide evidence about it? (3) Which alternative explanations (memorized examples, shortcuts, tool assistance) could produce similar scores? (4) What would distinguish them?
                  </p>
                  <p>
                    Always separate a <strong>behavioral capability claim</strong> from a <strong>mechanistic explanation</strong>. Likewise, recognize that evidence can estimate the consequences of error thresholds or privacy rules, but cannot by itself decide which consequences people should accept—that requires explicit normative reasoning and accountable participation.
                  </p>
                  <div className="grid gap-2.5 sm:grid-cols-2 text-xs">
                    {DISCIPLINES.map((d) => (
                      <div key={d.name} className="vintage-box rounded-md p-3">
                        <span className="font-semibold text-[#231F1A]">{d.name}: </span>
                        <span className="text-[#5C5346]">{d.role}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* MODULE 2 */}
            {activeModule.id === 'm2' && (
              <div className="space-y-8 text-sm leading-relaxed text-[#231F1A]">
                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-[#231F1A]">
                    2.1 Why Human–AI Interaction Matters Now
                  </h3>
                  <p>
                    Most enterprise AI today shows up at work as <strong>interaction</strong>—copilots, assistants, and interactive agents—rather than isolated autonomy. Consequently, the quality of the interaction determines the quality of the outcome:
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2 text-xs">
                    <div className="rounded-md border border-[#C8552D] bg-[#F7E4DC] p-4">
                      <div className="font-semibold text-rose-950">Bad interaction quietly degrades decisions</div>
                      <p className="mt-1 text-rose-900">Leads to <strong>sycophancy</strong> (AI telling users what they want to hear) and <strong>deskilling</strong> (erosion of human mastery and debugging ability).</p>
                    </div>
                    <div className="rounded-md border border-[#4A6B4E] bg-[#E6EDE2] p-4">
                      <div className="font-semibold text-emerald-950">Good interaction amplifies human work</div>
                      <p className="mt-1 text-emerald-900">Supports <strong>augmented judgment</strong>, appropriate reliance, and <strong>faster, well-verified decisions</strong>.</p>
                    </div>
                  </div>
                  <p>
                    Building effective human–AI systems requires three linked inquiries: <strong>Design</strong> (why should they interact, and how do we structure it?), <strong>Enable</strong> (what interface and capabilities support the interaction?), and <strong>Evaluate</strong> (have we achieved the intended human and task outcomes?).
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-[#231F1A]">
                    2.2 The SPHERE Evaluation Card (5 Dimensions)
                  </h3>
                  <p>
                    Bridging Human–Computer Interaction (HCI) and Natural Language Processing (NLP), the{' '}
                    <a
                      href="https://sphere-eval.github.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#C8552D] underline hover:text-indigo-900"
                    >
                      SPHERE Evaluation Card (Ma et al., ACL 2025)
                    </a>{' '}
                    organizes Human–AI evaluation around four primary questions—<em>What, How, Who, When</em>—bounded by a fifth meta-dimension on <em>Validation &amp; Reliability</em>:
                  </p>

                  <SphereDiagram />

                  <div className="overflow-x-auto vintage-box rounded-md">
                    <table className="w-full text-left text-xs">
                      <thead className="border-b border-[#231F1A] bg-[#EFE7D6] text-[#231F1A]">
                        <tr>
                          <th className="px-4 py-2.5 font-semibold">SPHERE Dimension</th>
                          <th className="px-4 py-2.5 font-semibold">Key Distinctions &amp; Design Choices</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#231F1A]/15 text-[#231F1A]">
                        <tr>
                          <td className="px-4 py-2.5 font-semibold text-[#231F1A]">1. What is being evaluated?</td>
                          <td className="px-4 py-2.5">
                            <strong>Component:</strong> Full System vs. underlying Model. <strong>Design goals:</strong> Effectiveness, Efficiency, and Satisfaction. Mapped via <em>Goals</em> (“What do I need to know?”) → <em>Tasks</em> (“What should users do?”) → <em>Data</em> (“What data do I collect?”).
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 font-semibold text-[#231F1A]">2. How is it conducted?</td>
                          <td className="px-4 py-2.5">
                            <strong>Approach:</strong> Intrinsic (model alone on benchmarks) vs. Extrinsic (downstream real-world tasks). <strong>Metrics:</strong> Quantitative (“what” — accuracy, completion, time) vs. Qualitative (“why” — interviews, observations, frustrations).
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 font-semibold text-[#231F1A]">3. Who participates?</td>
                          <td className="px-4 py-2.5">
                            Targeted user group, domain experts, lay users, use-case-specific roles (teachers, clinicians, students), or LLM-simulated users (early checks only).
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 font-semibold text-[#231F1A]">4. When is it conducted?</td>
                          <td className="px-4 py-2.5">
                            Immediate/short-term constrained sessions (e.g., 1 hour) vs. long-term longitudinal studies (e.g., multi-week daily workflows).
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 font-semibold text-[#231F1A]">5. (Meta) How is it validated?</td>
                          <td className="px-4 py-2.5">
                            Construct and ecological validity, inter-rater reliability, counterbalancing, blinding, and randomized controlled comparisons.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-[#231F1A]">
                    2.3 When Are Combinations of Humans and AI Useful?
                  </h3>
                  <p>
                    Evaluating a model in isolation cannot predict whether a human–AI team will succeed. In a systematic review and meta-analysis of 370 effect sizes (<em>Vaccaro, Almaatouq &amp; Malone, Nature Human Behaviour, 2024</em>), researchers distinguished <strong>human augmentation</strong> (Human+AI vs. Human alone) from true <strong>human–AI synergy</strong> (Human+AI vs. the better of Human or AI alone):
                  </p>

                  <SynergyDiagram />

                  <p className="text-xs text-[#5C5346]">
                    <strong>Implication for evaluation:</strong> Always compare the human–AI team against both the <em>unassisted human baseline</em> and the <em>AI-alone / simpler-tool baseline</em>, and disaggregate results by task type (decision-making vs. content creation) and user expertise (for instance, Dohmke et al., 2023 found ~30% code-suggestion acceptance growing over 6 months, with the largest productivity gains among less experienced developers).
                  </p>
                </section>
              </div>
            )}

            {/* MODULE 3 */}
            {activeModule.id === 'm3' && (
              <div className="space-y-8 text-sm leading-relaxed text-[#231F1A]">
                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-[#231F1A]">
                    3.1 Begin with the Decision, Question &amp; Evaluation Mode
                  </h3>
                  <p>
                    “Evaluate this AI” is too vague to guide design. Start by naming the uncertainty that matters—whether characterizing a capability, comparing configurations, diagnosing a recurring failure, testing a modification, or deciding whether to deploy, restrict, mitigate, or halt a system.
                  </p>
                  <p>
                    A well-formed evaluation question specifies the <strong>system</strong>, <strong>task</strong>, <strong>population</strong>, <strong>comparator</strong>, <strong>desired outcome</strong>, and <strong>relevant constraints</strong>:
                  </p>
                  <blockquote className="rounded-xl border-l-4 border-[#C8552D] bg-[#FBF7EE] border border-[#231F1A]/25 p-4 text-xs italic text-[#231F1A] shadow-xs">
                    “For researchers comparing empirical papers, does this version of the assistant improve the quality of their completed evidence synthesis compared with their existing workflow, without increasing unsupported conclusions?”
                  </blockquote>
                  <p>
                    Google’s <em>People + AI Guidebook</em> underscores why the comparator matters: understand the user’s existing workflow and test whether AI adds value over simpler non-AI alternatives.
                  </p>

                  <div className="grid gap-3 sm:grid-cols-2 text-xs">
                    <div className="vintage-box rounded-md p-4 space-y-1">
                      <div className="font-semibold text-[#231F1A]">Exploratory Mode</div>
                      <p className="text-[#5C5346]">
                        <strong>Purpose:</strong> Discover failures, user needs, and plausible explanations. Criteria and analyses can develop as evidence is examined.
                      </p>
                    </div>
                    <div className="vintage-box rounded-md p-4 space-y-1">
                      <div className="font-semibold text-[#231F1A]">Confirmatory Mode</div>
                      <p className="text-[#5C5346]">
                        <strong>Purpose:</strong> Test a specified claim or decision rule. Fix main outcomes, comparisons, analyses, and thresholds <em>before</em> inspecting confirmatory results.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-[#231F1A]">
                    3.2 Specify Scope, Agent Harness &amp; Unit of Analysis
                  </h3>
                  <p>
                    Separate <strong>model performance</strong> (the model under specified conditions), <strong>system performance</strong> (the integrated arrangement), and <strong>human outcomes</strong> (what happens when people use it). For <strong>agents</strong>, Anthropic’s evaluation guidance emphasizes evaluating the model together with its execution harness: tools, instructions, permissions, stopping rules, memory, and environment.
                  </p>

                  <ScopeBoundaryDiagram />

                  <div className="overflow-x-auto vintage-box rounded-md">
                    <table className="w-full text-left text-xs">
                      <thead className="border-b border-[#231F1A] bg-[#EFE7D6] text-[#231F1A]">
                        <tr>
                          <th className="px-4 py-2.5 font-semibold">Scope</th>
                          <th className="px-4 py-2.5 font-semibold">Example Question</th>
                          <th className="px-4 py-2.5 font-semibold">Scope-Transfer Warning</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#231F1A]/15 text-[#231F1A]">
                        {SCOPES.map((s) => (
                          <tr key={s.id}>
                            <td className="px-4 py-2.5 font-semibold text-[#231F1A]">{s.name}</td>
                            <td className="px-4 py-2.5">{s.question}</td>
                            <td className="px-4 py-2.5 text-amber-900">{s.transferWarning}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-xs text-[#5C5346]">
                    <strong>Unit of analysis:</strong> Explicitly state whether your unit is a claim, response, conversation, task attempt, user, team, or organization. Multiple responses from a single conversation share context and are not independent observations.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-[#231F1A]">
                    3.3 Separate Targets from Scope &amp; Document Context Coverage
                  </h3>
                  <p>
                    Two studies can evaluate the same scope while targeting different properties, or evaluate the same property (e.g., reliability) across model, product, and workflow scopes:
                  </p>
                  <div className="grid gap-2.5 sm:grid-cols-2 text-xs">
                    {TARGET_INVENTORY.map((t) => (
                      <div key={t.name} className="vintage-box rounded-md p-3">
                        <div className="font-semibold text-[#231F1A]">{t.name}</div>
                        <p className="mt-0.5 text-[#5C5346]">{t.concerns}</p>
                      </div>
                    ))}
                  </div>
                  <p>
                    A score is interpretable only when its <strong>context</strong> is known: specify tasks, domains, user expertise, languages, accessibility needs, input formats/lengths, tools/permissions, time pressure, stakes, typical vs. difficult cases, and plausible misuse. Following <strong>HELM</strong>, separate evaluation scenarios from metrics and document <strong>missing coverage</strong> explicitly as part of your findings.
                  </p>
                </section>
              </div>
            )}

            {/* MODULE 4 */}
            {activeModule.id === 'm4' && (
              <div className="space-y-8 text-sm leading-relaxed text-[#231F1A]">
                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-[#231F1A]">
                    4.1 Define Criteria, Lenses &amp; the 8-Field Specification
                  </h3>
                  <p>
                    Criteria describe what matters; rubrics and metrics operationalize them. For example, the construct of <em>source fidelity</em> is operationalized via a criterion (<em>material claims accurately represent cited evidence</em>), observable evidence (<em>generated claims + source passages</em>), a measurement procedure (<em>claim-by-claim support rules</em>), and a metric (<em>proportion of supported claims</em>).
                  </p>
                  <p>
                    Use three complementary lenses to surface criteria: <strong>Technical</strong> (correctness, grounding, completeness, execution, reliability), <strong>Policy &amp; constraints</strong> (requirements, permissions, confidentiality, prohibited actions), and <strong>Human &amp; contextual</strong> (goal achievement, clarity, actionability, effort, accessibility, appropriate control). Document each criterion across eight fields:
                  </p>
                  <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4 text-xs">
                    {[
                      ['1. Definition', 'The specific property being assessed.'],
                      ['2. Importance', 'Connection to user need, requirement, or consequence.'],
                      ['3. Observable evidence', 'What a reviewer or test actually inspects.'],
                      ['4. Assessment unit', 'Claim, response, task, conversation, or user.'],
                      ['5. Scoring rule', 'How judgments or scores are assigned.'],
                      ['6. Anchors', 'Examples of clear success, failure, and edge cases.'],
                      ['7. Applicability', 'Conditions under which the criterion applies.'],
                      ['8. Limitations', 'What the assessment cannot establish.'],
                    ].map(([f, d]) => (
                      <div key={f} className="vintage-box rounded-md p-3">
                        <div className="font-semibold text-[#231F1A]">{f}</div>
                        <p className="mt-0.5 text-[#5C5346]">{d}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-[#5C5346]">
                    <strong>Criteria drift &amp; observable behavior:</strong> Examining real outputs often changes what teams realize their requirements are (<em>criteria drift</em>). Allow iterative refinement during exploration, then validate on an independent set for confirmation. Avoid inferring hidden mental states (beliefs or intentions) when the evidence only covers observable behavior.
                  </p>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-[#231F1A]">
                    4.2 Intrinsic vs. Extrinsic &amp; Layered Evaluation Pipelines
                  </h3>
                  <p>
                    <strong>Intrinsic evaluation</strong> tests the model or component in isolation (automated reference metrics, LLM judges, human rubric rankings, or immediate suggestion-acceptance rates)—offering fast, low-cost feedback but weak real-world prediction. <strong>Extrinsic evaluation</strong> measures downstream impact in real tasks (behavioral changes, self-efficacy, standardized knowledge/skill assessments)—providing holistic, user-aligned evidence at higher cost.
                  </p>

                  <LayeredPipelineDiagram />

                  <div className="grid gap-3 sm:grid-cols-2 text-xs">
                    <div className="vintage-box rounded-md p-4 space-y-1">
                      <div className="font-semibold text-[#231F1A]">
                        Coding Agents: SWE-bench vs. ProgramBench
                      </div>
                      <p className="text-[#5C5346]">
                        <strong>SWE-bench</strong> (<em>Jimenez et al., 2023</em>) evaluates GitHub issue patches via unit tests tied to internal implementation details. <strong>ProgramBench</strong> evaluates against artifacts and documentation via implementation-agnostic behavioral tests (invoking the built program and diffing outputs). Even top models struggle when tasks require full behavioral reproduction.
                      </p>
                    </div>
                    <div className="vintage-box rounded-md p-4 space-y-1">
                      <div className="font-semibold text-[#231F1A]">
                        Conflict Simulation: Rehearsal (SIGCHI 2024)
                      </div>
                      <p className="text-[#5C5346]">
                        <em>Shaikh et al. (2024)</em> combined <strong>intrinsic</strong> ecological-validity checks of Interests-Rights-Power prompting (TrueSkill rankings) with an <strong>extrinsic</strong> user study (<em>N</em> = 40 vs. static Stanford GSB training), showing significantly higher cooperative strategy use in actual conflicts even though recognition/recall quiz scores did not significantly differ.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-[#231F1A]">
                    4.3 Evidence Methods &amp; Sampling Purposes
                  </h3>
                  <p>
                    NIST’s ARIA program combines model testing, red teaming, and user testing to achieve methodological complementarity. Before building automated evaluators, <em>Husain &amp; Shankar</em> emphasize <strong>trace and error analysis</strong>—inspecting real logs, recording open-ended observations, and grouping recurring breakdowns. For agents, always corroborate transcript claims against actual environment state changes.
                  </p>
                  <div className="overflow-x-auto vintage-box rounded-md">
                    <table className="w-full text-left text-xs">
                      <thead className="border-b border-[#231F1A] bg-[#EFE7D6] text-[#231F1A]">
                        <tr>
                          <th className="px-4 py-2.5 font-semibold">Method</th>
                          <th className="px-4 py-2.5 font-semibold">What It Establishes</th>
                          <th className="px-4 py-2.5 font-semibold">Main Limitation</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#231F1A]/15 text-[#231F1A]">
                        {EVIDENCE_METHODS.map((m) => (
                          <tr key={m.name}>
                            <td className="px-4 py-2.5 font-medium text-[#231F1A]">{m.name}</td>
                            <td className="px-4 py-2.5">{m.establishes}</td>
                            <td className="px-4 py-2.5 text-[#5C5346]">{m.limitation}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4 text-xs">
                    {SAMPLING_PURPOSES.map((sp) => (
                      <div key={sp.name} className="vintage-box rounded-md p-3 space-y-1">
                        <div className="font-semibold text-[#231F1A]">{sp.name}</div>
                        <p className="text-[#5C5346]">{sp.role}</p>
                        <p className="font-medium text-amber-800">{sp.warning}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* MODULE 5 */}
            {activeModule.id === 'm5' && (
              <div className="space-y-8 text-sm leading-relaxed text-[#231F1A]">
                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-[#231F1A]">
                    5.1 Separate Output Quality, Task Success &amp; Human Outcomes
                  </h3>
                  <p>
                    An accurate summary (<em>output quality</em>) and a working retrieval pipeline (<em>system task success</em>) do not automatically establish that a person produces better work (<em>human outcome</em>) or that an team’s net workflow improves after review and maintenance (<em>organizational outcome</em>). Four landmark studies illustrate why direct human-outcome measurement is indispensable:
                  </p>

                  <OutcomesComparisonDiagram />

                  <div className="grid gap-3 sm:grid-cols-2 text-xs">
                    <div className="vintage-box rounded-md p-4 space-y-1">
                      <div className="font-semibold text-[#231F1A]">
                        Co-Writing &amp; Opinion Drift (CHI 2022, CHI 2023)
                      </div>
                      <p className="text-[#5C5346]">
                        In <strong>CoAuthor</strong> (<em>CHI 2022</em>), human + GPT-3 co-writing reduced errors and increased vocabulary diversity, while opening longitudinal questions on novelty, homogenization, and edit traces. In <em>Jakesch et al. (CHI 2023)</em>, co-writing with an opinionated model shifted both participants’ written arguments and their subsequent survey opinions—while most participants believed the model’s suggestions were neutral.
                      </p>
                    </div>
                    <div className="vintage-box rounded-md p-4 space-y-1">
                      <div className="font-semibold text-[#231F1A]">
                        Counterfactual Workflows &amp; Offloading Score (NeurIPS 2026)
                      </div>
                      <p className="text-[#5C5346]">
                        <em>Padmakumar et al. (2026)</em> induce user workflows from keystroke/click traces and estimate counterfactual steps without AI to compute <strong>Offloading Score</strong> (fraction of steps saved, &gt;85% content validity). Higher offloading generally correlated with lower code recall—except for an “appropriately reliant” cluster who used AI to explore best approaches and then improvised.
                      </p>
                    </div>
                  </div>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-[#231F1A]">
                    5.2 From Observation to Decision &amp; Validating Graders
                  </h3>
                  <p>
                    “The model answered 85% correctly” is already a scored measurement, not a raw observation. Every link in the inference chain—<strong>Record observations</strong> → <strong>Apply measurement rules</strong> → <strong>Estimate beyond observations</strong> → <strong>Interpret a construct</strong> → <strong>Support a decision</strong>—introduces assumptions that require justification.
                  </p>
                  <div className="overflow-x-auto vintage-box rounded-md">
                    <table className="w-full text-left text-xs">
                      <thead className="border-b border-[#231F1A] bg-[#EFE7D6] text-[#231F1A]">
                        <tr>
                          <th className="px-4 py-2.5 font-semibold">Grading Mechanism</th>
                          <th className="px-4 py-2.5 font-semibold">Suitable Uses</th>
                          <th className="px-4 py-2.5 font-semibold">Validation Checks Needed</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#231F1A]/15 text-[#231F1A]">
                        <tr>
                          <td className="px-4 py-2.5 font-semibold text-[#231F1A]">Code-based checks</td>
                          <td className="px-4 py-2.5">Schemas, calculations, execution results, state changes, explicit constraints.</td>
                          <td className="px-4 py-2.5">Does the check capture the real requirement and accept valid alternatives?</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 font-semibold text-[#231F1A]">Human assessment</td>
                          <td className="px-4 py-2.5">Domain correctness, contextual appropriateness, nuanced failures, lived experience.</td>
                          <td className="px-4 py-2.5">Separate initial ratings from adjudication; investigate disagreement rather than treating consensus as automatic truth.</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 font-semibold text-[#231F1A]">Model-based judge</td>
                          <td className="px-4 py-2.5">Scaling defined judgments that can be calibrated for a specific use.</td>
                          <td className="px-4 py-2.5">Validate on held-out sets; check missed rare failures, false alarms, and position/verbosity/self-enhancement biases.</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 font-semibold text-[#231F1A]">Hybrid assessment</td>
                          <td className="px-4 py-2.5">Combining deterministic checks, LLM screening, and human escalation.</td>
                          <td className="px-4 py-2.5">Verify routing rules, abstention thresholds, and handling of missing/failed runs.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-[#231F1A]">
                    5.3 Preserve Severity &amp; Trade-Offs When Aggregating
                  </h3>
                  <p>
                    Collapsing diverse criteria into a single composite score can hide critical failures. Keep <strong>failure frequency</strong>, <strong>severity and who bears the harm</strong>, <strong>detectability/recoverability</strong>, <strong>affected subgroups</strong>, and <strong>retry policies</strong> (first-attempt reliability vs. multi-attempt cost) explicit:
                  </p>

                  <AggregationTrapDiagram />
                </section>
              </div>
            )}

            {/* MODULE 6 */}
            {activeModule.id === 'm6' && (
              <div className="space-y-8 text-sm leading-relaxed text-[#231F1A]">
                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-[#231F1A]">
                    6.1 Statistical Uncertainty, Rare Failures &amp; Clustering
                  </h3>
                  <p>
                    Distinguish performance on a fixed benchmark from generalization to a broader population of tasks (<em>NIST statistical modeling</em>), and match your uncertainty analysis to the data structure:
                  </p>
                  <ul className="space-y-2 vintage-box rounded-md p-4 text-xs text-[#231F1A]">
                    <li>
                      <strong>• Zero observed failures ≠ zero failure rate:</strong> Observing 0 failures in 100 independent, representative Bernoulli trials yields an exact one-sided 95% upper confidence bound of approximately <strong>3%</strong> (assuming accurate failure detection), and says nothing about untested conditions.
                    </li>
                    <li>
                      <strong>• Dependence &amp; clustering:</strong> 300 turns across 5 conversations do not provide 300 independent observations. Repeated attempts on the same task estimate run-to-run variability; they do not expand task coverage.
                    </li>
                    <li>
                      <strong>• Inconclusive ≠ equivalent:</strong> A non-significant difference does not establish equivalence; equivalence or noninferiority claims require pre-specified margins and appropriate statistical power.
                    </li>
                  </ul>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-[#231F1A]">
                    6.2 Evaluation Quality, Validity &amp; Who Evaluates
                  </h3>
                  <p>
                    The <em>Standards for Educational and Psychological Testing</em> locates validity in specific score interpretations and intended uses. Review ten complementary dimensions—passing one never substitutes for the others:
                  </p>
                  <div className="grid gap-2.5 sm:grid-cols-2 text-xs">
                    {VALIDITY_DIMENSIONS.map((v, i) => (
                      <div key={v.name} className="vintage-box rounded-md p-3">
                        <span className="font-semibold text-[#231F1A]">{i + 1}. {v.name}: </span>
                        <span className="text-[#5C5346]">{v.question}</span>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-md border border-[#D49B2A] bg-[#F6ECD5] p-4 text-xs text-amber-950 space-y-1">
                    <div className="font-semibold">
                      Who Evaluates &amp; LLM-Simulated Caricatures (Argyle et al., 2023; CoMPosT, EMNLP 2023)
                    </div>
                    <p>
                      Human preferences are value-laden—audit whose values your annotation workforce represents. While LLMs can simulate human samples for early sanity checks, <em>Cheng, Piccardi &amp; Yang (EMNLP 2023)</em> showed that LLM simulations of sociocultural groups (political ideology, race/ethnicity, marginalized personas) produce <strong>exaggerated caricatures</strong>. Never substitute synthetic personas for real target users.
                    </p>
                  </div>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-[#231F1A]">
                    6.3 When to Evaluate: Lifecycle Dynamics &amp; Governance
                  </h3>
                  <p>
                    Short-term sessions and longitudinal deployments reveal different—sometimes opposite—patterns. In <em>Long, Gero &amp; Chilton (2024)</em>, users went through a <strong>familiarization phase</strong> before anticipating outputs and customizing prompts, increasing utility beyond novelty. Conversely, <em>Ibrahim et al. (arXiv:2605.07912)</em> showed users rank <strong>sycophantic AI</strong> highest in the moment, yet exposure over time decreases satisfaction with human interactions.
                  </p>

                  <HorizonDiagram />

                  <p className="text-xs text-[#5C5346]">
                    <strong>Concrete governance &amp; versioning:</strong> Name who owns the question, defines criteria, represents affected groups (distinguishing consultation from decision authority), reviews methods, accepts risk, and initiates reevaluation. Evaluate human oversight itself (time, expertise, visibility, authority), and version product and evaluator separately.
                  </p>
                </section>

                <section className="space-y-4">
                  <h3 className="text-lg font-bold text-[#231F1A]">
                    6.4 Worked Example, Reporting Discipline &amp; Companion Protocol
                  </h3>
                  <div className="vintage-box rounded-md p-4 text-xs space-y-1.5">
                    <div className="font-semibold text-[#231F1A]">
                      Illustrative Research Assistant (Fictional Design Example)
                    </div>
                    <p className="text-[#5C5346]">
                      To decide on a restricted pilot for researchers comparing empirical papers, pair <strong>intrinsic</strong> source-fidelity rubrics (detecting observational claims misstated as causal) with an <strong>extrinsic</strong> blinded comparative study of completed syntheses (measuring independent quality, unsupported conclusions, completion time, and verification effort). If summaries improve without better syntheses, investigate workflow integration; if speed accompanies consequential errors, evaluate that trade-off before expanding use.
                    </p>
                  </div>

                  <div className="overflow-x-auto vintage-box rounded-md">
                    <table className="w-full text-left text-xs">
                      <thead className="border-b border-[#231F1A] bg-[#EFE7D6] text-[#231F1A]">
                        <tr>
                          <th className="px-4 py-2.5 font-semibold">Overextended Claim</th>
                          <th className="px-4 py-2.5 font-semibold">Evidence-Matched Formulation</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#231F1A]/15 text-[#231F1A]">
                        {REPORTING_CLAIMS.map((c) => (
                          <tr key={c.overextended}>
                            <td className="px-4 py-2.5 font-medium text-rose-900">{c.overextended}</td>
                            <td className="px-4 py-2.5 text-emerald-950">{c.defensible}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="grid gap-2.5 sm:grid-cols-2 text-xs">
                    {PROTOCOL_FIELDS.map((f) => (
                      <div key={f.id} className="vintage-box rounded-md p-3">
                        <div className="font-semibold text-[#231F1A]">{f.label}</div>
                        <p className="mt-0.5 text-[#5C5346]">{f.placeholder}</p>
                      </div>
                    ))}
                  </div>

                  <blockquote className="rounded-md border border-[#335C81] bg-[#E3EAF0] p-4 text-xs leading-relaxed text-[#231F1A] space-y-1.5">
                    <div className="font-semibold text-indigo-950">
                      Reusable Evaluation &amp; Decision Statement Template
                    </div>
                    <p>
                      We evaluated <strong>[system &amp; version]</strong> for <strong>[targets, tasks, population &amp; setting]</strong>, compared with <strong>[baseline]</strong>, using <strong>[methods &amp; evidence]</strong>. We operationalized <strong>[construct]</strong> as <strong>[criteria &amp; measurement procedure]</strong>. The findings support <strong>[bounded claim]</strong>, subject to <strong>[limitations &amp; uncertainty]</strong>; they do not establish <strong>[material untested claim]</strong>. We recommend <strong>[action &amp; conditions]</strong> (accountable owner: <strong>[role]</strong>) and will reconsider if <strong>[specified change or incident]</strong> occurs.
                    </p>
                  </blockquote>
                </section>
              </div>
            )}

            {/* MODULE 7 */}
            {activeModule.id === 'm7' && (
              <div className="space-y-8 text-sm leading-relaxed text-[#231F1A]">
                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-[#231F1A]">
                    7.1 Why Most Public AI Evals &amp; Leaderboards Mislead
                  </h3>
                  <p>
                    Public benchmarks, marketing leaderboards, and rushed internal evals routinely produce confident claims that collapse in deployment. When an evaluation score becomes a marketing target (<em>Goodhart’s Law</em>), teams optimize for the proxy rather than the underlying human or operational need.
                  </p>

                  <FallaciesDiagram />
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-[#231F1A]">
                    7.2 The 10 Most Common AI Evaluation Fallacies &amp; Hype Traps
                  </h3>
                  <div className="overflow-x-auto vintage-box rounded-md">
                    <table className="w-full text-left text-xs">
                      <thead className="border-b border-[#231F1A] bg-[#EFE7D6] text-[#231F1A]">
                        <tr>
                          <th className="px-4 py-2.5 font-semibold">Fallacy / Hype Claim</th>
                          <th className="px-4 py-2.5 font-semibold">Why It Fails (Empirical &amp; Methodological Reality)</th>
                          <th className="px-4 py-2.5 font-semibold">Corrective Practice</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#231F1A]/15 text-[#231F1A]">
                        <tr>
                          <td className="px-4 py-2.5 font-semibold text-rose-950">
                            1. The Leaderboard Transfer Fallacy
                            <div className="font-normal text-[#5C5346]">“#1 on the benchmark = ready for our workflow.”</div>
                          </td>
                          <td className="px-4 py-2.5">
                            Static benchmarks suffer from training contamination, prompt overfitting, and missing harness/context. Models scoring ~75% on SWE-bench unit tests dropped near 0–4.5% on ProgramBench behavioral reproduction.
                          </td>
                          <td className="px-4 py-2.5 text-emerald-950">
                            Use benchmarks only as fast Stage-1 intrinsic gates; require task-specific extrinsic validation before deployment.
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 font-semibold text-rose-950">
                            2. The Mechanistic Anthropomorphism Fallacy
                            <div className="font-normal text-[#5C5346]">“It passed the math/law exam, so it reasons like an expert.”</div>
                          </td>
                          <td className="px-4 py-2.5">
                            Correct answers underdetermine the mechanism—they can reflect memorized templates, dataset shortcuts, or tool calls rather than generalizable reasoning.
                          </td>
                          <td className="px-4 py-2.5 text-emerald-950">
                            Report bounded behavioral capability claims; test robustness under perturbations and counterfactuals.
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 font-semibold text-rose-950">
                            3. The Perceived-Speed Illusion
                            <div className="font-normal text-[#5C5346]">“Surveyed users say AI makes them 2× faster!”</div>
                          </td>
                          <td className="px-4 py-2.5">
                            Self-reports measure perception, not ground truth. In METR’s RCT (246 tasks), experienced developers <em>believed</em> they were 20% faster with AI but were actually <strong>19% slower</strong>.
                          </td>
                          <td className="px-4 py-2.5 text-emerald-950">
                            Measure actual task completion time, error rates, and verification effort against a controlled baseline.
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 font-semibold text-rose-950">
                            4. The “Human-in-the-Loop Guarantees Safety” Fallacy
                            <div className="font-normal text-[#5C5346]">“Human + AI always beats either alone.”</div>
                          </td>
                          <td className="px-4 py-2.5">
                            Vaccaro et al. (2024, 370 effect sizes) found Human+AI underperformed the best solo actor on average (<em>g</em> = −0.23), especially in decision tasks. Reviewers without time, expertise, or authority create “oversight theater.”
                          </td>
                          <td className="px-4 py-2.5 text-emerald-950">
                            Evaluate the Human–AI team directly against solo baselines, and audit whether reviewers actually catch errors.
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 font-semibold text-rose-950">
                            5. The Instant-Preference / Sycophancy Trap
                            <div className="font-normal text-[#5C5346]">“Users gave it the highest thumbs-up in blind chat!”</div>
                          </td>
                          <td className="px-4 py-2.5">
                            One-turn human preference rewards flattering, verbose, sycophantic answers. Ibrahim et al. showed sycophantic AI is ranked #1 in the moment but erodes human-interaction satisfaction over time.
                          </td>
                          <td className="px-4 py-2.5 text-emerald-950">
                            Separate immediate satisfaction from truth-grounding, appropriate pushback, and longitudinal user outcomes.
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 font-semibold text-rose-950">
                            6. The “Task Done = User Benefits” Fallacy
                            <div className="font-normal text-[#5C5346]">“The output looked good, so the user succeeded.”</div>
                          </td>
                          <td className="px-4 py-2.5">
                            Ignores hidden downstream harms: <strong>17% skill erosion</strong> in debugging (Anthropic, 2026), reduced code recall under high offloading (Padmakumar et al., 2026), and unnoticed opinion drift (Jakesch et al., 2023).
                          </td>
                          <td className="px-4 py-2.5 text-emerald-950">
                            Track skill retention, Offloading Score, and opinion/style homogenization alongside immediate output quality.
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 font-semibold text-rose-950">
                            7. The Unvalidated LLM-as-a-Judge Fallacy
                            <div className="font-normal text-[#5C5346]">“GPT/Claude scored our system at 96%!”</div>
                          </td>
                          <td className="px-4 py-2.5">
                            LLM judges exhibit position bias, verbosity bias, and self-enhancement bias, and often share the exact same blind spots as the generator on rare domain errors.
                          </td>
                          <td className="px-4 py-2.5 text-emerald-950">
                            Calibrate judges on held-out specialist labels; inspect false negatives on rare failures and version the judge separately.
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 font-semibold text-rose-950">
                            8. The Synthetic-User Replacement Fallacy
                            <div className="font-normal text-[#5C5346]">“We simulated 500 diverse users with an LLM.”</div>
                          </td>
                          <td className="px-4 py-2.5">
                            CoMPosT (Cheng et al., EMNLP 2023) showed LLM simulations of sociocultural groups flatten nuance into exaggerated caricatures.
                          </td>
                          <td className="px-4 py-2.5 text-emerald-950">
                            Use simulated users only for early pipeline sanity checks; recruit real participants from the target population.
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 font-semibold text-rose-950">
                            9. The “Zero Failures = Safe” &amp; Pseudo-Replication Trap
                            <div className="font-normal text-[#5C5346]">“0 failures in 100 runs (or 300 chat turns) proves safety.”</div>
                          </td>
                          <td className="px-4 py-2.5">
                            0/100 independent runs still leaves a ~3% one-sided 95% upper bound. Worse, treating 300 turns from 5 conversations as <em>N</em> = 300 ignores clustering and overstates precision.
                          </td>
                          <td className="px-4 py-2.5 text-emerald-950">
                            Report exact binomial bounds, cluster by conversation/user, and treat mandatory safety constraints separately from averages.
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2.5 font-semibold text-rose-950">
                            10. Eval P-Hacking (Exploratory as Confirmatory)
                            <div className="font-normal text-[#5C5346]">“We iterated until our agent passed the eval suite.”</div>
                          </td>
                          <td className="px-4 py-2.5">
                            Repeatedly adjusting prompts, thresholds, and rubrics on the same dataset turns a confirmatory test into an overfitted training set.
                          </td>
                          <td className="px-4 py-2.5 text-emerald-950">
                            Document criteria drift during exploration, then lock thresholds and evaluate on a fresh held-out confirmatory set.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>

                <section className="space-y-3">
                  <h3 className="text-lg font-bold text-[#231F1A]">
                    7.3 Quick Red-Flag Checklist When Reading Any AI Eval Claim
                  </h3>
                  <div className="grid gap-2.5 sm:grid-cols-2 text-xs">
                    {[
                      ['Missing comparator', 'Compared against what? An existing human workflow, a simpler non-AI tool, or nothing?'],
                      ['Scope jump', 'Does the claim jump from an isolated model benchmark to product or human-team productivity?'],
                      ['Unvalidated judge', 'Were LLM-judge scores reported without held-out human calibration or false-negative rates?'],
                      ['Perception vs. outcome', 'Are self-reported survey feelings presented as measured speed or quality gains?'],
                      ['Collapsed average', 'Are catastrophic rare failures buried inside a single 95%+ pass rate?'],
                      ['One-session horizon', 'Was a collaborative tool evaluated in a 30-minute demo with no check for familiarization, sycophancy, or skill erosion?'],
                    ].map(([title, desc]) => (
                      <div key={title} className="rounded-md border border-[#C8552D]/60 bg-[#F7E4DC]/70 p-3">
                        <div className="font-semibold text-rose-950">🚩 {title}</div>
                        <p className="mt-0.5 text-[#231F1A]">{desc}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* Module Footer Navigation */}
            <nav className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-[#231F1A] pt-6">
              {activeIdx > 0 ? (
                <button
                  onClick={() => selectModule(activeIdx - 1)}
                  className="vintage-btn inline-flex items-center gap-2 rounded-md bg-[#FBF7EE] px-4 py-2.5 text-xs font-semibold text-[#231F1A]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Module {MODULES[activeIdx - 1].number}: {MODULES[activeIdx - 1].title}
                </button>
              ) : (
                <div />
              )}

              {activeIdx < MODULES.length - 1 && (
                <button
                  onClick={() => selectModule(activeIdx + 1)}
                  className="vintage-btn inline-flex items-center gap-2 rounded-md bg-[#231F1A] px-4 py-2.5 text-xs font-semibold text-[#FBF7EE]"
                >
                  Module {MODULES[activeIdx + 1].number}: {MODULES[activeIdx + 1].title}
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </nav>
          </article>
        </main>
      </div>
      )}
    </div>
  );
}

export default App;

import { useState } from 'react';
import { Award, BookOpen, ClipboardCheck, ExternalLink, Github, Layers, Menu, TableProperties, X } from 'lucide-react';
import { MODULES_CURRICULUM } from './data/curriculum';
import { ModuleRenderer } from './components/ModuleRenderer';
import { CapstoneView } from './components/CapstoneView';
import { AdvancedTracksView } from './components/AdvancedTracksView';
import { FrameworkProtocolTool, SphereCardTool } from './components/EvalTools';
import { MetricsTaxonomyTool } from './components/MetricsTaxonomyTool';

type ViewMode = 'guide' | 'capstone' | 'tracks' | 'sphere-tool' | 'framework-tool' | 'taxonomy-tool';

export function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('guide');
  const [activeIdx, setActiveIdx] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const activeModule = MODULES_CURRICULUM[activeIdx];

  const selectModule = (idx: number) => {
    setViewMode('guide');
    setActiveIdx(idx);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openView = (mode: ViewMode) => {
    setViewMode(mode);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F5EFE2] text-[#231F1A] flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b-2 border-[#231F1A] bg-[#FBF7EE]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen((v) => !v)}
              className="vintage-btn rounded-md bg-[#F5EFE2] p-1.5 text-[#231F1A] lg:hidden"
              aria-label="Toggle curriculum"
            >
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
            <img
              src="./exosphere-logo.png"
              alt="AI Evaluation Study Guide logo"
              className="h-9 w-9 shrink-0 rounded-md border border-[#231F1A] bg-[#FBF7EE] p-0.5 object-contain"
            />
            <div>
              <h1 className="font-display text-base font-bold tracking-tight text-[#231F1A] sm:text-lg">
                AI Evaluation Study Guide
              </h1>
              <p className="hidden font-mono text-[11px] text-[#5C5346] sm:block">
                7-Module Curriculum · Case Study, Exercises, Capstone &amp; SPHERE
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Primary Educational Navigation */}
            <div className="inline-flex rounded-md border border-[#231F1A] bg-[#EFE7D6] p-0.5 text-xs">
              <button
                onClick={() => openView('guide')}
                className={`inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 font-medium transition ${
                  viewMode === 'guide'
                    ? 'bg-[#231F1A] text-[#FBF7EE]'
                    : 'text-[#231F1A] hover:bg-[#E5DBC5]'
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                Study Guide
              </button>
              <button
                onClick={() => openView('capstone')}
                className={`inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 font-medium transition ${
                  viewMode === 'capstone'
                    ? 'bg-[#231F1A] text-[#FBF7EE]'
                    : 'text-[#231F1A] hover:bg-[#E5DBC5]'
                }`}
              >
                <Award className="h-3.5 w-3.5" />
                Capstone
              </button>
              <button
                onClick={() => openView('tracks')}
                className={`inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 font-medium transition ${
                  viewMode === 'tracks'
                    ? 'bg-[#231F1A] text-[#FBF7EE]'
                    : 'text-[#231F1A] hover:bg-[#E5DBC5]'
                }`}
              >
                <Layers className="h-3.5 w-3.5" />
                Advanced Tracks
              </button>
            </div>

            {/* Secondary Practice Tools */}
            <div className="hidden sm:inline-flex items-center gap-1.5 border-l border-[#231F1A]/25 pl-2.5 text-[11px]">
              <span className="font-mono text-[#5C5346]">Practice tools:</span>
              <button
                onClick={() => openView('sphere-tool')}
                className={`rounded border px-2 py-1 font-medium transition ${
                  viewMode === 'sphere-tool'
                    ? 'border-[#231F1A] bg-[#231F1A] text-[#FBF7EE]'
                    : 'border-[#231F1A]/30 bg-[#FBF7EE] text-[#231F1A] hover:border-[#231F1A]'
                }`}
              >
                SPHERE Card
              </button>
              <button
                onClick={() => openView('framework-tool')}
                className={`rounded border px-2 py-1 font-medium transition ${
                  viewMode === 'framework-tool'
                    ? 'border-[#231F1A] bg-[#231F1A] text-[#FBF7EE]'
                    : 'border-[#231F1A]/30 bg-[#FBF7EE] text-[#231F1A] hover:border-[#231F1A]'
                }`}
              >
                Eval Protocol
              </button>
              <button
                onClick={() => openView('taxonomy-tool')}
                className={`rounded border px-2 py-1 font-medium transition ${
                  viewMode === 'taxonomy-tool'
                    ? 'border-[#231F1A] bg-[#231F1A] text-[#FBF7EE]'
                    : 'border-[#231F1A]/30 bg-[#FBF7EE] text-[#231F1A] hover:border-[#231F1A]'
                }`}
              >
                Metrics Taxonomy
              </button>
            </div>

            <a
              href="https://sphere-eval.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="vintage-btn inline-flex items-center gap-1 rounded-md bg-[#F6ECD5] px-2.5 py-1.5 font-mono text-[11px] font-semibold text-[#231F1A]"
            >
              SPHERE
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://github.com/m5rc238/ai-evals"
              target="_blank"
              rel="noopener noreferrer"
              title="Collaborate on GitHub"
              aria-label="Collaborate on GitHub"
              className="vintage-btn inline-flex items-center gap-1 rounded-md bg-[#F6ECD5] px-2.5 py-1.5 font-mono text-[11px] font-semibold text-[#231F1A]"
            >
              <Github className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">GitHub</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {viewMode === 'sphere-tool' ? (
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 space-y-4">
          <div className="rounded-md border border-[#335C81] bg-[#E3EAF0] px-4 py-2.5 text-xs text-[#1E3A54] flex flex-wrap items-center justify-between gap-2">
            <span>
              <strong>Supplementary Tool (Linked to Module 2):</strong> Practice structuring a Human–AI evaluation using the proposed SPHERE card.
            </span>
            <button onClick={() => selectModule(1)} className="font-semibold underline">
              ← Return to Module 2
            </button>
          </div>
          <SphereCardTool />
        </main>
      ) : viewMode === 'framework-tool' ? (
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 space-y-4">
          <div className="rounded-md border border-[#335C81] bg-[#E3EAF0] px-4 py-2.5 text-xs text-[#1E3A54] flex flex-wrap items-center justify-between gap-2">
            <span>
              <strong>Supplementary Tool (Linked to Module 6):</strong> Draft a 12-field evaluation protocol and bounded decision statement.
            </span>
            <button onClick={() => selectModule(5)} className="font-semibold underline">
              ← Return to Module 6
            </button>
          </div>
          <FrameworkProtocolTool />
        </main>
      ) : viewMode === 'taxonomy-tool' ? (
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 space-y-4">
          <div className="rounded-md border border-[#335C81] bg-[#E3EAF0] px-4 py-2.5 text-xs text-[#1E3A54] flex flex-wrap items-center justify-between gap-2">
            <span>
              <strong>Supplementary Tool (Linked to Module 4):</strong> Explore how evaluation metrics map across Machine Learning, Systems &amp; Agentic AI, and Human–AI Interaction.
            </span>
            <button onClick={() => selectModule(3)} className="font-semibold underline">
              ← Return to Module 4
            </button>
          </div>
          <MetricsTaxonomyTool />
        </main>
      ) : (
        <div className="mx-auto flex w-full max-w-7xl flex-1">
          {/* Curriculum Sidebar */}
          <aside
            className={`${
              sidebarOpen ? 'fixed inset-y-0 left-0 z-20 block w-72 bg-[#F5EFE2] pt-16 shadow-xl overflow-y-auto' : 'hidden'
            } w-72 shrink-0 border-r border-[#231F1A]/20 bg-[#EFE7D6]/60 p-4 lg:block`}
          >
            <div className="sticky top-24 space-y-2">
              <div className="px-2 pb-1 font-mono text-[11px] font-semibold uppercase tracking-wider text-[#5C5346]">
                7-Module Curriculum
              </div>
              {MODULES_CURRICULUM.map((m, idx) => {
                const active = viewMode === 'guide' && idx === activeIdx;
                return (
                  <button
                    key={m.id}
                    onClick={() => selectModule(idx)}
                    className={`w-full rounded-md border p-2.5 text-left transition ${
                      active
                        ? 'border-[#231F1A] bg-[#231F1A] text-[#FBF7EE] shadow-[2px_2px_0_#C8552D]'
                        : 'border-[#231F1A]/25 bg-[#FBF7EE] text-[#231F1A] hover:border-[#231F1A] hover:bg-[#F6ECD5]'
                    }`}
                  >
                    <div className="text-xs font-semibold leading-snug">
                      <span className="font-mono opacity-75">0{m.number}.</span> {m.title}
                    </div>
                    <div
                      className={`mt-0.5 text-[11px] leading-snug ${
                        active ? 'text-[#EAE3D2]' : 'text-[#5C5346]'
                      }`}
                    >
                      {m.subtitle}
                    </div>
                  </button>
                );
              })}

              <div className="pt-2 border-t border-[#231F1A]/20 space-y-1.5">
                <button
                  onClick={() => openView('capstone')}
                  className={`flex w-full items-center gap-2 rounded-md border p-2.5 text-left text-xs font-semibold transition ${
                    viewMode === 'capstone'
                      ? 'border-[#231F1A] bg-[#C8552D] text-[#FBF7EE]'
                      : 'border-[#231F1A]/25 bg-[#FBF7EE] text-[#231F1A] hover:border-[#231F1A]'
                  }`}
                >
                  <Award className="h-3.5 w-3.5 shrink-0" />
                  Final Capstone Project
                </button>
                <button
                  onClick={() => openView('tracks')}
                  className={`flex w-full items-center gap-2 rounded-md border p-2.5 text-left text-xs font-semibold transition ${
                    viewMode === 'tracks'
                      ? 'border-[#231F1A] bg-[#335C81] text-[#FBF7EE]'
                      : 'border-[#231F1A]/25 bg-[#FBF7EE] text-[#231F1A] hover:border-[#231F1A]'
                  }`}
                >
                  <Layers className="h-3.5 w-3.5 shrink-0" />
                  Optional Advanced Tracks (A–F)
                </button>
              </div>

              {/* Mobile-accessible secondary tool links */}
              <div className="pt-2 border-t border-[#231F1A]/20 sm:hidden space-y-1.5">
                <div className="px-1 font-mono text-[10px] uppercase text-[#5C5346]">
                  Supplementary Tools
                </div>
                <button
                  onClick={() => openView('sphere-tool')}
                  className="flex w-full items-center gap-2 rounded-md border border-[#231F1A]/25 bg-[#FBF7EE] p-2 text-xs font-medium"
                >
                  <ClipboardCheck className="h-3.5 w-3.5" />
                  SPHERE Card Tool
                </button>
                <button
                  onClick={() => openView('framework-tool')}
                  className="flex w-full items-center gap-2 rounded-md border border-[#231F1A]/25 bg-[#FBF7EE] p-2 text-xs font-medium"
                >
                  <ClipboardCheck className="h-3.5 w-3.5" />
                  Eval Protocol Tool
                </button>
                <button
                  onClick={() => openView('taxonomy-tool')}
                  className="flex w-full items-center gap-2 rounded-md border border-[#231F1A]/25 bg-[#FBF7EE] p-2 text-xs font-medium"
                >
                  <TableProperties className="h-3.5 w-3.5" />
                  Metrics Taxonomy Tool
                </button>
              </div>
            </div>
          </aside>

          {/* Main Reading Canvas */}
          <main className="min-w-0 flex-1 px-4 py-8 sm:px-8">
            {viewMode === 'capstone' ? (
              <CapstoneView />
            ) : viewMode === 'tracks' ? (
              <AdvancedTracksView />
            ) : (
              <ModuleRenderer
                key={activeModule.id}
                module={activeModule}
                totalModules={MODULES_CURRICULUM.length}
                onPrev={activeIdx > 0 ? () => selectModule(activeIdx - 1) : undefined}
                onNext={
                  activeIdx < MODULES_CURRICULUM.length - 1
                    ? () => selectModule(activeIdx + 1)
                    : undefined
                }
                onSelectModule={selectModule}
                onOpenCapstone={() => openView('capstone')}
                onOpenTracks={() => openView('tracks')}
                onOpenTool={(t) => openView(t)}
              />
            )}
          </main>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t-2 border-[#231F1A]/20 bg-[#FBF7EE] px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 text-xs text-[#5C5346]">
          <p>
            Open-source study guide &amp; evaluation tools. Want to collaborate, suggest edits, or contribute?
          </p>
          <a
            href="https://github.com/m5rc238/ai-evals"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-[#231F1A] underline decoration-[#231F1A]/40 underline-offset-4 hover:decoration-[#231F1A]"
          >
            <Github className="h-3.5 w-3.5" />
            github.com/m5rc238/ai-evals
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;

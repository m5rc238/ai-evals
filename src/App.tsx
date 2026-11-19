import { useEffect, useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  ExternalLink,
  Github,
  HelpCircle,
  Layers,
  Menu,
  TableProperties,
  Wrench,
  X,
} from 'lucide-react';
import { COURSE_MODULES, TOTAL_CHAPTERS } from './data/courseCurriculum';
import { CourseView, type ModuleSectionState } from './components/CourseView';
import { CapstoneView } from './components/CapstoneView';
import { AdvancedTracksView } from './components/AdvancedTracksView';
import { FrameworkProtocolTool, SphereCardTool } from './components/EvalTools';
import { MetricsTaxonomyTool } from './components/MetricsTaxonomyTool';

type ViewMode = 'guide' | 'capstone' | 'tracks' | 'sphere-tool' | 'framework-tool' | 'taxonomy-tool';

const COMPLETED_STORAGE_KEY = 'ai-evals.completed-chapters.v1';
const QUIZ_STORAGE_KEY = 'ai-evals.quiz-answers.v1';

function readStoredJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('guide');
  const [activeModIdx, setActiveModIdx] = useState(0);
  const [activeSection, setActiveSection] = useState<ModuleSectionState>({
    kind: 'chapter',
    chapterIdx: 0,
  });
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({ m1: true });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [completedChapters, setCompletedChapters] = useState<Record<string, boolean>>(() =>
    readStoredJson(COMPLETED_STORAGE_KEY, {}),
  );
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>(() =>
    readStoredJson(QUIZ_STORAGE_KEY, {}),
  );

  useEffect(() => {
    try {
      window.localStorage.setItem(COMPLETED_STORAGE_KEY, JSON.stringify(completedChapters));
    } catch {
      // ignore storage quota errors
    }
  }, [completedChapters]);

  useEffect(() => {
    try {
      window.localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(quizAnswers));
    } catch {
      // ignore storage quota errors
    }
  }, [quizAnswers]);

  const activeModule = COURSE_MODULES[activeModIdx] ?? COURSE_MODULES[0];
  const totalCompletedChapters = Object.values(completedChapters).filter(Boolean).length;

  const selectModuleSection = (modIdx: number, section: ModuleSectionState) => {
    const targetMod = COURSE_MODULES[modIdx];
    if (!targetMod) return;
    setViewMode('guide');
    setActiveModIdx(modIdx);
    setActiveSection(section);
    setExpandedModules((prev) => ({ ...prev, [targetMod.id]: true }));
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleModuleExpanded = (modId: string) => {
    setExpandedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  const openView = (mode: ViewMode) => {
    setViewMode(mode);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleChapterComplete = (chapterId: string) => {
    setCompletedChapters((prev) => ({ ...prev, [chapterId]: !prev[chapterId] }));
  };

  const handleAnswerQuiz = (questionId: string, optionIdx: number) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleResetModuleQuiz = (questionIds: string[]) => {
    setQuizAnswers((prev) => {
      const next = { ...prev };
      for (const id of questionIds) delete next[id];
      return next;
    });
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
                6-Module Course · {TOTAL_CHAPTERS} Deep Chapters, Practice Labs &amp; Quizzes
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Primary Navigation */}
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
                Course
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
                onClick={() => openView('taxonomy-tool')}
                className={`rounded border px-2 py-1 font-medium transition ${
                  viewMode === 'taxonomy-tool'
                    ? 'border-[#231F1A] bg-[#231F1A] text-[#FBF7EE]'
                    : 'border-[#231F1A]/30 bg-[#FBF7EE] text-[#231F1A] hover:border-[#231F1A]'
                }`}
              >
                Metrics Taxonomy
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
                onClick={() => openView('sphere-tool')}
                className={`rounded border px-2 py-1 font-medium transition ${
                  viewMode === 'sphere-tool'
                    ? 'border-[#231F1A] bg-[#231F1A] text-[#FBF7EE]'
                    : 'border-[#231F1A]/30 bg-[#FBF7EE] text-[#231F1A] hover:border-[#231F1A]'
                }`}
              >
                SPHERE Card
              </button>
            </div>

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
              <strong>Optional HCI Tool (Linked to Module 5 · Ch 5.2 &amp; Track G):</strong> Structure a formal Human–AI interaction study using the SPHERE evaluation card.
            </span>
            <div className="flex items-center gap-3">
              <button onClick={() => openView('tracks')} className="font-semibold underline">
                Open Track G
              </button>
              <button
                onClick={() => selectModuleSection(4, { kind: 'chapter', chapterIdx: 1 })}
                className="font-semibold underline"
              >
                ← Return to Ch 5.2
              </button>
            </div>
          </div>
          <SphereCardTool />
        </main>
      ) : viewMode === 'framework-tool' ? (
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 space-y-4">
          <div className="rounded-md border border-[#335C81] bg-[#E3EAF0] px-4 py-2.5 text-xs text-[#1E3A54] flex flex-wrap items-center justify-between gap-2">
            <span>
              <strong>Supplementary Tool (Linked to Module 4 · Ch 4.3):</strong> Draft a 12-field evaluation protocol and bounded decision statement.
            </span>
            <button
              onClick={() => selectModuleSection(3, { kind: 'chapter', chapterIdx: 2 })}
              className="font-semibold underline"
            >
              ← Return to Ch 4.3
            </button>
          </div>
          <FrameworkProtocolTool />
        </main>
      ) : viewMode === 'taxonomy-tool' ? (
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 space-y-4">
          <div className="rounded-md border border-[#335C81] bg-[#E3EAF0] px-4 py-2.5 text-xs text-[#1E3A54] flex flex-wrap items-center justify-between gap-2">
            <span>
              <strong>Supplementary Tool (Linked to Module 1 · Ch 1.3):</strong> Explore 29 evaluation metrics mapped across the 7 layers and units of analysis.
            </span>
            <button
              onClick={() => selectModuleSection(0, { kind: 'chapter', chapterIdx: 2 })}
              className="font-semibold underline"
            >
              ← Return to Ch 1.3
            </button>
          </div>
          <MetricsTaxonomyTool />
        </main>
      ) : (
        <div className="mx-auto flex w-full max-w-7xl flex-1">
          {/* Collapsible Course Tree Sidebar */}
          <aside
            className={`${
              sidebarOpen
                ? 'fixed inset-y-0 left-0 z-20 block w-80 bg-[#F5EFE2] pt-16 shadow-xl overflow-y-auto'
                : 'hidden'
            } w-80 shrink-0 border-r border-[#231F1A]/20 bg-[#EFE7D6]/60 p-4 lg:block`}
          >
            <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto pr-1 space-y-2.5">
              <div className="flex items-center justify-between px-1.5 pb-1">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#5C5346]">
                  Course Syllabus
                </span>
                <span className="font-mono text-[10px] text-[#5C5346]">
                  {totalCompletedChapters}/{TOTAL_CHAPTERS} read
                </span>
              </div>

              {COURSE_MODULES.map((m, modIdx) => {
                const isExpanded = !!expandedModules[m.id];
                const isCurrentMod = viewMode === 'guide' && modIdx === activeModIdx;
                const modQuizTotal = m.quiz.questions.length;
                const modQuizAnswered = m.quiz.questions.filter(
                  (q) => quizAnswers[q.id] !== undefined,
                ).length;
                const modQuizCorrect = m.quiz.questions.filter(
                  (q) => quizAnswers[q.id] === q.correctIndex,
                ).length;

                return (
                  <div
                    key={m.id}
                    className={`rounded-md border transition ${
                      isCurrentMod
                        ? 'border-[#231F1A] bg-[#FBF7EE] shadow-[2px_2px_0_#C8552D]'
                        : 'border-[#231F1A]/25 bg-[#FBF7EE]/85'
                    }`}
                  >
                    {/* Module Header Row */}
                    <button
                      type="button"
                      onClick={() => toggleModuleExpanded(m.id)}
                      className="flex w-full items-start gap-2 p-2.5 text-left hover:bg-[#F6ECD5]/70 rounded-t-md"
                    >
                      {isExpanded ? (
                        <ChevronDown className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#5C5346]" />
                      ) : (
                        <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#5C5346]" />
                      )}
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-bold leading-snug text-[#231F1A]">
                          <span className="font-mono text-[#C8552D]">0{m.number}.</span> {m.title}
                        </div>
                        <div className="mt-0.5 font-mono text-[10px] text-[#5C5346]">
                          {m.chapters.length} chapters · Lab · Quiz
                        </div>
                      </div>
                    </button>

                    {/* Expanded Tree: Theory Chapters + Practice Lab + Module Quiz */}
                    {isExpanded && (
                      <div className="border-t border-[#231F1A]/15 px-2 py-2 space-y-1">
                        <div className="px-2 pt-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-[#5C5346]">
                          Theory
                        </div>
                        {m.chapters.map((ch, chIdx) => {
                          const isActiveCh =
                            isCurrentMod &&
                            activeSection.kind === 'chapter' &&
                            activeSection.chapterIdx === chIdx;
                          const isDone = !!completedChapters[ch.id];
                          return (
                            <button
                              key={ch.id}
                              type="button"
                              onClick={() =>
                                selectModuleSection(modIdx, { kind: 'chapter', chapterIdx: chIdx })
                              }
                              className={`flex w-full items-start gap-1.5 rounded px-2 py-1.5 text-left text-[11px] leading-snug transition ${
                                isActiveCh
                                  ? 'bg-[#231F1A] font-semibold text-[#FBF7EE]'
                                  : 'text-[#231F1A] hover:bg-[#EFE7D6]'
                              }`}
                            >
                              {isDone ? (
                                <CheckCircle2
                                  className={`mt-0.5 h-3 w-3 shrink-0 ${
                                    isActiveCh ? 'text-[#A7C9A9]' : 'text-[#2A422D]'
                                  }`}
                                />
                              ) : (
                                <span className="mt-0.5 font-mono text-[10px] opacity-65 shrink-0">
                                  {ch.id}
                                </span>
                              )}
                              <span className="flex-1">{ch.title}</span>
                            </button>
                          );
                        })}

                        <div className="pt-1.5 mt-1 border-t border-[#231F1A]/10 space-y-1">
                          <button
                            type="button"
                            onClick={() => selectModuleSection(modIdx, { kind: 'practice' })}
                            className={`flex w-full items-center gap-1.5 rounded px-2 py-1.5 text-left text-[11px] font-semibold transition ${
                              isCurrentMod && activeSection.kind === 'practice'
                                ? 'bg-[#C8552D] text-[#FBF7EE]'
                                : 'text-[#7D3016] hover:bg-[#F7E4DC]/70'
                            }`}
                          >
                            <Wrench className="h-3 w-3 shrink-0" />
                            <span>Practice Lab</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => selectModuleSection(modIdx, { kind: 'quiz' })}
                            className={`flex w-full items-center justify-between gap-1.5 rounded px-2 py-1.5 text-left text-[11px] font-semibold transition ${
                              isCurrentMod && activeSection.kind === 'quiz'
                                ? 'bg-[#335C81] text-[#FBF7EE]'
                                : 'text-[#1E3A54] hover:bg-[#E3EAF0]/80'
                            }`}
                          >
                            <span className="inline-flex items-center gap-1.5">
                              <HelpCircle className="h-3 w-3 shrink-0" />
                              Module Quiz
                            </span>
                            {modQuizAnswered > 0 && (
                              <span
                                className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
                                  isCurrentMod && activeSection.kind === 'quiz'
                                    ? 'bg-[#FBF7EE]/20 text-[#FBF7EE]'
                                    : 'bg-[#E3EAF0] text-[#1E3A54]'
                                }`}
                              >
                                {modQuizCorrect}/{modQuizTotal}
                              </span>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
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
                  Optional Advanced Tracks (A–G)
                </button>
              </div>

              {/* Mobile-accessible secondary tool links */}
              <div className="pt-2 border-t border-[#231F1A]/20 sm:hidden space-y-1.5">
                <div className="px-1 font-mono text-[10px] uppercase text-[#5C5346]">
                  Practice Tools
                </div>
                <button
                  onClick={() => openView('taxonomy-tool')}
                  className="flex w-full items-center gap-2 rounded-md border border-[#231F1A]/25 bg-[#FBF7EE] p-2 text-xs font-medium"
                >
                  <TableProperties className="h-3.5 w-3.5" />
                  Metrics Taxonomy Tool
                </button>
                <button
                  onClick={() => openView('framework-tool')}
                  className="flex w-full items-center gap-2 rounded-md border border-[#231F1A]/25 bg-[#FBF7EE] p-2 text-xs font-medium"
                >
                  <ClipboardCheck className="h-3.5 w-3.5" />
                  Eval Protocol Tool
                </button>
                <button
                  onClick={() => openView('sphere-tool')}
                  className="flex w-full items-center gap-2 rounded-md border border-[#231F1A]/25 bg-[#FBF7EE] p-2 text-xs font-medium"
                >
                  <ClipboardCheck className="h-3.5 w-3.5" />
                  SPHERE Card Tool
                </button>
              </div>
            </div>
          </aside>

          {/* Main Reading Canvas */}
          <main className="min-w-0 flex-1 px-4 py-8 sm:px-8">
            {viewMode === 'capstone' ? (
              <CapstoneView />
            ) : viewMode === 'tracks' ? (
              <AdvancedTracksView onOpenSphereTool={() => openView('sphere-tool')} />
            ) : (
              <CourseView
                key={activeModule.id}
                module={activeModule}
                totalModules={COURSE_MODULES.length}
                section={activeSection}
                completedChapters={completedChapters}
                quizAnswers={quizAnswers}
                onToggleChapterComplete={toggleChapterComplete}
                onSelectSection={(sec) => {
                  setActiveSection(sec);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onAnswerQuiz={handleAnswerQuiz}
                onResetModuleQuiz={handleResetModuleQuiz}
                onPrevModule={
                  activeModIdx > 0
                    ? () =>
                        selectModuleSection(activeModIdx - 1, {
                          kind: 'chapter',
                          chapterIdx: COURSE_MODULES[activeModIdx - 1].chapters.length - 1,
                        })
                    : undefined
                }
                onNextModule={
                  activeModIdx < COURSE_MODULES.length - 1
                    ? () => selectModuleSection(activeModIdx + 1, { kind: 'chapter', chapterIdx: 0 })
                    : undefined
                }
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

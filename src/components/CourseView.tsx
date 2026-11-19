import { useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookMarked,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Clock,
  Compass,
  ExternalLink,
  HelpCircle,
  Lightbulb,
  RotateCcw,
  Wrench,
  XCircle,
} from 'lucide-react';
import type { CourseModule, DiagramKey, PracticeToolKey } from '../data/courseTypes';
import { STATS_WORKED_EXAMPLES } from '../data/statsWorkedExamples';
import { FirstEvalExercise } from './FirstEvalExercise';
import {
  AggregationTrapDiagram,
  FallaciesDiagram,
  HorizonDiagram,
  LayeredPipelineDiagram,
  OutcomesComparisonDiagram,
  ScopeBoundaryDiagram,
  ValidityCategoriesDiagram,
} from './VisualDiagrams';

export type ModuleSectionState =
  | { kind: 'chapter'; chapterIdx: number }
  | { kind: 'practice' }
  | { kind: 'quiz' };

interface CourseViewProps {
  module: CourseModule;
  totalModules: number;
  section: ModuleSectionState;
  completedChapters: Record<string, boolean>;
  quizAnswers: Record<string, number>;
  onToggleChapterComplete: (chapterId: string) => void;
  onSelectSection: (section: ModuleSectionState) => void;
  onAnswerQuiz: (questionId: string, optionIdx: number) => void;
  onResetModuleQuiz: (questionIds: string[]) => void;
  onPrevModule?: () => void;
  onNextModule?: () => void;
  onOpenCapstone: () => void;
  onOpenTracks: () => void;
  onOpenTool: (tool: PracticeToolKey) => void;
}

function renderDiagram(key: DiagramKey) {
  switch (key) {
    case 'scopes':
      return <ScopeBoundaryDiagram />;
    case 'pipeline':
      return <LayeredPipelineDiagram />;
    case 'aggregation':
      return <AggregationTrapDiagram />;
    case 'validity':
      return <ValidityCategoriesDiagram />;
    case 'outcomes':
      return <OutcomesComparisonDiagram />;
    case 'horizon':
      return <HorizonDiagram />;
    case 'fallacies':
      return <FallaciesDiagram />;
  }
}

function StatsWorkbenchWidget() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeStat = STATS_WORKED_EXAMPLES[selectedIdx] ?? STATS_WORKED_EXAMPLES[0];

  return (
    <section className="vintage-card rounded-md p-5 space-y-3 text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#231F1A]/20 pb-3">
        <div>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#C8552D]">
            Interactive Reference Lab
          </span>
          <h4 className="font-display text-lg font-bold text-[#231F1A]">
            12-Question Statistical Workbench
          </h4>
        </div>
        <span className="rounded border border-[#D49B2A] bg-[#F6ECD5] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#6E4E12]">
          Pick a Question
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {STATS_WORKED_EXAMPLES.map((ex, i) => (
          <button
            key={ex.id}
            type="button"
            onClick={() => setSelectedIdx(i)}
            className={`rounded border px-2 py-1 text-[11px] font-medium transition ${
              selectedIdx === i
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
    </section>
  );
}

export function CourseView({
  module,
  totalModules,
  section,
  completedChapters,
  quizAnswers,
  onToggleChapterComplete,
  onSelectSection,
  onAnswerQuiz,
  onResetModuleQuiz,
  onPrevModule,
  onNextModule,
  onOpenCapstone,
  onOpenTracks,
  onOpenTool,
}: CourseViewProps) {
  const [revealedExamples, setRevealedExamples] = useState<Record<string, boolean>>({});

  const quizTotal = module.quiz.questions.length;
  const quizAnsweredCount = module.quiz.questions.filter((q) => quizAnswers[q.id] !== undefined).length;
  const quizCorrectCount = module.quiz.questions.filter(
    (q) => quizAnswers[q.id] === q.correctIndex,
  ).length;
  const completedInModule = module.chapters.filter((ch) => completedChapters[ch.id]).length;

  const activeChapter =
    section.kind === 'chapter'
      ? module.chapters[section.chapterIdx] ?? module.chapters[0]
      : undefined;

  return (
    <article className="mx-auto max-w-3xl space-y-7 pb-16">
      {/* Module Header + 3-Part Mode Tabs (Theory | Practice Lab | Module Quiz) */}
      <header className="space-y-4 border-b-2 border-[#231F1A] pb-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#C8552D]">
            Module 0{module.number} / 0{totalModules}
          </span>
          <span className="font-mono text-[11px] text-[#5C5346]">
            {completedInModule}/{module.chapters.length} chapters read
            {quizAnsweredCount > 0 ? ` · Quiz ${quizCorrectCount}/${quizTotal}` : ''}
          </span>
        </div>

        <div className="space-y-1.5">
          <h2 className="font-display text-2xl font-bold tracking-tight text-[#231F1A] sm:text-3xl">
            {module.title}
          </h2>
          <p className="text-sm leading-relaxed text-[#5C5346]">{module.overview}</p>
        </div>

        {/* 3-Part Module Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() =>
              onSelectSection({
                kind: 'chapter',
                chapterIdx: section.kind === 'chapter' ? section.chapterIdx : 0,
              })
            }
            className={`inline-flex items-center gap-1.5 rounded-md border px-3.5 py-2 text-xs font-semibold transition ${
              section.kind === 'chapter'
                ? 'border-[#231F1A] bg-[#231F1A] text-[#FBF7EE]'
                : 'border-[#231F1A]/30 bg-[#FBF7EE] text-[#231F1A] hover:border-[#231F1A]'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" />
            Theory ({module.chapters.length} Chapters)
          </button>

          <button
            type="button"
            onClick={() => onSelectSection({ kind: 'practice' })}
            className={`inline-flex items-center gap-1.5 rounded-md border px-3.5 py-2 text-xs font-semibold transition ${
              section.kind === 'practice'
                ? 'border-[#231F1A] bg-[#C8552D] text-[#FBF7EE]'
                : 'border-[#231F1A]/30 bg-[#FBF7EE] text-[#231F1A] hover:border-[#231F1A]'
            }`}
          >
            <Wrench className="h-3.5 w-3.5" />
            Practice Lab
          </button>

          <button
            type="button"
            onClick={() => onSelectSection({ kind: 'quiz' })}
            className={`inline-flex items-center gap-1.5 rounded-md border px-3.5 py-2 text-xs font-semibold transition ${
              section.kind === 'quiz'
                ? 'border-[#231F1A] bg-[#335C81] text-[#FBF7EE]'
                : 'border-[#231F1A]/30 bg-[#FBF7EE] text-[#231F1A] hover:border-[#231F1A]'
            }`}
          >
            <HelpCircle className="h-3.5 w-3.5" />
            Module Quiz
            {quizAnsweredCount > 0 && (
              <span
                className={`ml-1 rounded px-1.5 py-0.5 font-mono text-[10px] ${
                  section.kind === 'quiz'
                    ? 'bg-[#FBF7EE]/20 text-[#FBF7EE]'
                    : 'bg-[#EFE7D6] text-[#231F1A]'
                }`}
              >
                {quizCorrectCount}/{quizTotal}
              </span>
            )}
          </button>
        </div>

        {/* Chapter Pill Strip when in Theory mode */}
        {section.kind === 'chapter' && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {module.chapters.map((ch, idx) => {
              const active = section.chapterIdx === idx;
              const done = !!completedChapters[ch.id];
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => onSelectSection({ kind: 'chapter', chapterIdx: idx })}
                  className={`inline-flex items-center gap-1.5 rounded border px-2.5 py-1 text-[11px] font-medium transition ${
                    active
                      ? 'border-[#231F1A] bg-[#EFE7D6] font-semibold text-[#231F1A]'
                      : 'border-[#231F1A]/20 bg-[#FBF7EE] text-[#5C5346] hover:border-[#231F1A]/60 hover:text-[#231F1A]'
                  }`}
                >
                  {done && <CheckCircle2 className="h-3 w-3 text-[#2A422D]" />}
                  <span className="font-mono">{ch.id}</span>
                  <span className="hidden sm:inline max-w-[180px] truncate">{ch.title.split(':')[0].split('(')[0].trim()}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* ====================================================================
       * VIEW 1: THEORY (Single Deep Chapter)
       * ==================================================================== */}
      {section.kind === 'chapter' && activeChapter && (
        <div className="space-y-8">
          {/* Chapter Title Bar */}
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-mono text-xs text-[#5C5346]">
                <span className="rounded bg-[#EFE7D6] px-2 py-0.5 font-semibold text-[#231F1A] border border-[#231F1A]/25">
                  {activeChapter.code}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  ~{activeChapter.readMinutes} min read
                </span>
              </div>
              <button
                type="button"
                onClick={() => onToggleChapterComplete(activeChapter.id)}
                className={`inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition ${
                  completedChapters[activeChapter.id]
                    ? 'border-[#4A6B4E] bg-[#E6EDE2] text-[#2A422D]'
                    : 'border-[#231F1A]/30 bg-[#FBF7EE] text-[#5C5346] hover:border-[#231F1A] hover:text-[#231F1A]'
                }`}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                {completedChapters[activeChapter.id] ? 'Completed' : 'Mark Complete'}
              </button>
            </div>
            <h3 className="font-display text-xl font-bold text-[#231F1A] sm:text-2xl">
              {activeChapter.title}
            </h3>
            <p className="text-sm italic leading-relaxed text-[#5C5346]">
              {activeChapter.summary}
            </p>
          </div>

          {/* Deep Chapter Sections */}
          <div className="space-y-7">
            {activeChapter.sections.map((sec) => (
              <section key={sec.heading} className="space-y-3.5">
                <h4 className="font-display text-lg font-bold text-[#231F1A]">
                  {sec.heading}
                </h4>

                {sec.paragraphs.map((p) => (
                  <p key={p} className="text-[15px] leading-relaxed text-[#231F1A]">
                    {p}
                  </p>
                ))}

                {sec.bullets && (
                  <ul className="space-y-2.5 pl-1">
                    {sec.bullets.map((b) => (
                      <li
                        key={b.label}
                        className="rounded-md border border-[#231F1A]/15 bg-[#FBF7EE] p-3 text-sm leading-relaxed"
                      >
                        <strong className="text-[#231F1A]">{b.label}: </strong>
                        <span className="text-[#3C352C]">{b.text}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {sec.table && (
                  <div className="overflow-x-auto vintage-box rounded-md">
                    <table className="w-full text-left text-xs">
                      <thead className="border-b border-[#231F1A] bg-[#EFE7D6]">
                        <tr>
                          {sec.table.headers.map((h) => (
                            <th key={h} className="px-3 py-2 font-semibold text-[#231F1A]">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#231F1A]/15">
                        {sec.table.rows.map((row) => (
                          <tr key={row[0]}>
                            {row.map((cell, ci) => (
                              <td
                                key={`${row[0]}-${ci}`}
                                className={`px-3 py-2 leading-snug ${
                                  ci === 0 ? 'font-semibold text-[#231F1A]' : 'text-[#3C352C]'
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {sec.diagram && renderDiagram(sec.diagram)}

                {sec.callout && (
                  <div
                    className={`rounded-md border p-4 text-xs leading-relaxed space-y-1 ${
                      sec.callout.kind === 'warning'
                        ? 'border-[#C8552D]/60 bg-[#F7E4DC]/65 text-[#7D3016]'
                        : sec.callout.kind === 'rule'
                        ? 'border-[#335C81]/50 bg-[#E3EAF0]/65 text-[#1E3A54]'
                        : 'border-[#4A6B4E]/50 bg-[#E6EDE2]/65 text-[#2A422D]'
                    }`}
                  >
                    <div className="font-semibold">{sec.callout.title}</div>
                    <p className="text-[#231F1A]">{sec.callout.body}</p>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Contextual Practice Tool or Advanced Track Link */}
          {activeChapter.toolLink && (
            <div className="rounded-md border border-[#335C81] bg-[#E3EAF0] p-4 text-xs flex flex-wrap items-center justify-between gap-3">
              <span>
                <strong>Companion Tool:</strong> {activeChapter.toolLink.description}
              </span>
              <button
                type="button"
                onClick={() => onOpenTool(activeChapter.toolLink!.tool)}
                className="vintage-btn rounded-md bg-[#FBF7EE] px-3 py-1.5 font-semibold text-[#231F1A]"
              >
                {activeChapter.toolLink.label} →
              </button>
            </div>
          )}

          {activeChapter.trackLink && (
            <div className="rounded-md border border-[#231F1A]/30 bg-[#EFE7D6] p-4 text-xs flex flex-wrap items-center justify-between gap-3">
              <span>
                <strong>Go Deeper:</strong> {activeChapter.trackLink.description}
              </span>
              <button
                type="button"
                onClick={onOpenTracks}
                className="vintage-btn rounded-md bg-[#FBF7EE] px-3 py-1.5 font-semibold text-[#231F1A]"
              >
                {activeChapter.trackLink.label} →
              </button>
            </div>
          )}

          {/* Chapter Key Takeaways */}
          <section className="rounded-md border border-[#D49B2A] bg-[#F6ECD5] p-4 space-y-2">
            <div className="flex items-center gap-2 font-display text-base font-bold text-[#6E4E12]">
              <Lightbulb className="h-4 w-4" />
              Chapter {activeChapter.id} Takeaways
            </div>
            <ul className="space-y-1 text-xs leading-relaxed text-[#231F1A]">
              {activeChapter.keyTakeaways.map((t) => (
                <li key={t}>• {t}</li>
              ))}
            </ul>
          </section>

          {/* Optional Further Reading */}
          {activeChapter.furtherReading && activeChapter.furtherReading.length > 0 && (
            <section className="vintage-box rounded-md p-4 space-y-2">
              <div className="flex items-center gap-2 font-display text-sm font-bold text-[#231F1A]">
                <BookMarked className="h-4 w-4 text-[#C8552D]" />
                Further Reading
              </div>
              <ul className="space-y-1 text-xs">
                {activeChapter.furtherReading.map((fr) => (
                  <li key={fr.label} className="flex flex-wrap items-center gap-2">
                    <span className="rounded bg-[#EFE7D6] px-1.5 py-0.5 font-mono text-[10px]">
                      {fr.type}
                    </span>
                    {fr.url ? (
                      <a
                        href={fr.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[#335C81] underline hover:text-[#231F1A]"
                      >
                        {fr.label}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <span>{fr.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Empirical & Standards References drawer on final chapter of module */}
          {section.chapterIdx === module.chapters.length - 1 && module.researchEvidence.length > 0 && (
            <details className="vintage-box rounded-md p-4 text-xs">
              <summary className="cursor-pointer font-semibold text-[#231F1A]">
                Module 0{module.number} Empirical &amp; Standards References ({module.researchEvidence.length})
              </summary>
              <div className="mt-3 space-y-3">
                {module.researchEvidence.map((ref) => (
                  <div key={ref.citation} className="rounded border border-[#231F1A]/20 bg-[#F5EFE2] p-3 space-y-1.5">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="font-semibold text-[#231F1A] flex-1">
                        {ref.citation}
                        {ref.url && (
                          <a
                            href={ref.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-1.5 inline-flex items-center gap-0.5 text-[#C8552D] underline"
                          >
                            Source <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                      <span className="rounded border border-[#231F1A]/30 bg-[#EFE7D6] px-2 py-0.5 font-mono text-[10px] font-semibold">
                        {ref.sourceType}
                      </span>
                    </div>
                    <div className="text-[#5C5346]"><strong>Scope:</strong> {ref.sampleOrScope}</div>
                    <div><strong>Finding:</strong> {ref.finding}</div>
                    <div className="text-[#7D3016]"><strong>Does not establish:</strong> {ref.doesNotEstablish}</div>
                  </div>
                ))}
              </div>
            </details>
          )}

          {/* Bottom Chapter Navigation */}
          <nav className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-[#231F1A] pt-5">
            {section.chapterIdx > 0 ? (
              <button
                type="button"
                onClick={() => onSelectSection({ kind: 'chapter', chapterIdx: section.chapterIdx - 1 })}
                className="vintage-btn inline-flex items-center gap-2 rounded-md bg-[#FBF7EE] px-4 py-2.5 text-xs font-semibold text-[#231F1A]"
              >
                <ArrowLeft className="h-4 w-4" />
                Prev: {module.chapters[section.chapterIdx - 1].code}
              </button>
            ) : onPrevModule ? (
              <button
                type="button"
                onClick={onPrevModule}
                className="vintage-btn inline-flex items-center gap-2 rounded-md bg-[#FBF7EE] px-4 py-2.5 text-xs font-semibold text-[#231F1A]"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous Module
              </button>
            ) : (
              <div />
            )}

            {section.chapterIdx < module.chapters.length - 1 ? (
              <button
                type="button"
                onClick={() => {
                  if (!completedChapters[activeChapter.id]) {
                    onToggleChapterComplete(activeChapter.id);
                  }
                  onSelectSection({ kind: 'chapter', chapterIdx: section.chapterIdx + 1 });
                }}
                className="vintage-btn inline-flex items-center gap-2 rounded-md bg-[#231F1A] px-4 py-2.5 text-xs font-semibold text-[#FBF7EE]"
              >
                Next: {module.chapters[section.chapterIdx + 1].code}
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (!completedChapters[activeChapter.id]) {
                    onToggleChapterComplete(activeChapter.id);
                  }
                  onSelectSection({ kind: 'practice' });
                }}
                className="vintage-btn inline-flex items-center gap-2 rounded-md bg-[#C8552D] px-4 py-2.5 text-xs font-semibold text-[#FBF7EE]"
              >
                Continue to Practice Lab
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </nav>
        </div>
      )}

      {/* ====================================================================
       * VIEW 2: PRACTICE LAB (Hands-On Exercises, Widgets & Meridian Case Study)
       * ==================================================================== */}
      {section.kind === 'practice' && (
        <div className="space-y-8">
          <div className="space-y-2">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#C8552D]">
              Hands-On Practice
            </span>
            <h3 className="font-display text-xl font-bold text-[#231F1A] sm:text-2xl">
              {module.practiceLab.title}
            </h3>
            <p className="text-sm leading-relaxed text-[#5C5346]">{module.practiceLab.intro}</p>
          </div>

          {/* Interactive Lab Widget (Module 1 Return-Policy Eval or Module 4 Stats Workbench) */}
          {module.practiceLab.interactiveWidget === 'first-eval' && <FirstEvalExercise />}
          {module.practiceLab.interactiveWidget === 'stats-workbench' && <StatsWorkbenchWidget />}

          {/* Continuous Meridian Case Study Workshop */}
          <section className="rounded-md border-2 border-[#335C81] bg-[#E3EAF0]/60 p-5 space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 font-display text-base font-bold text-[#1E3A54]">
                <Compass className="h-4 w-4" />
                {module.practiceLab.caseStudy.stageTitle}
              </div>
              <span className="rounded bg-[#FBF7EE] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#1E3A54] border border-[#335C81]/40">
                Running Case Study
              </span>
            </div>
            <p className="text-xs leading-relaxed text-[#231F1A]">
              {module.practiceLab.caseStudy.narrative}
            </p>
            <ul className="space-y-1 text-xs text-[#1E3A54]">
              {module.practiceLab.caseStudy.keyDecisions.map((d) => (
                <li key={d}>• {d}</li>
              ))}
            </ul>
          </section>

          {/* Practical Assignments */}
          <div className="space-y-5">
            {module.practiceLab.exercises.map((ex) => {
              const show = !!revealedExamples[ex.title];
              return (
                <section key={ex.title} className="vintage-card rounded-md p-5 space-y-3">
                  <div className="flex items-center gap-2 font-display text-lg font-bold text-[#231F1A]">
                    <ClipboardList className="h-4 w-4 text-[#C8552D]" />
                    {ex.title}
                  </div>
                  <div className="text-xs text-[#5C5346]">
                    <strong>Objective:</strong> {ex.objective}
                  </div>
                  <div className="rounded border border-[#231F1A]/20 bg-[#F5EFE2] p-3 text-xs text-[#231F1A]">
                    <strong>Scenario:</strong> {ex.scenario}
                  </div>
                  <ol className="list-decimal pl-5 space-y-1.5 text-xs text-[#231F1A]">
                    {ex.instructions.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                  <div className="text-xs text-[#231F1A]">
                    <strong>Required output:</strong> {ex.requiredOutput}
                  </div>
                  <div className="text-xs text-[#5C5346]">
                    <strong>Evaluation criteria:</strong>
                    <ul className="mt-1 space-y-0.5">
                      {ex.evaluationCriteria.map((c) => (
                        <li key={c}>• {c}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() =>
                        setRevealedExamples((prev) => ({ ...prev, [ex.title]: !prev[ex.title] }))
                      }
                      className="vintage-btn rounded-md bg-[#F6ECD5] px-3 py-1.5 text-xs font-semibold text-[#231F1A]"
                    >
                      {show ? 'Hide Strong-Answer Example' : 'Reveal Strong-Answer Example'}
                    </button>
                    {show && (
                      <div className="mt-3 rounded border border-[#4A6B4E] bg-[#E6EDE2] p-3 text-xs text-[#231F1A] space-y-1.5">
                        <div>
                          <strong>Example of a strong response:</strong> {ex.strongExample}
                        </div>
                        <div className="text-[#2A422D]">
                          <strong>Reflection:</strong> {ex.reflectionQuestion}
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              );
            })}
          </div>

          {/* Common Misconceptions */}
          {module.practiceLab.misconceptions.length > 0 && (
            <section className="space-y-3">
              <h4 className="font-display text-lg font-bold text-[#231F1A]">
                Traps to Avoid in Practice
              </h4>
              <div className="grid gap-3 sm:grid-cols-2 text-xs">
                {module.practiceLab.misconceptions.map((m) => (
                  <div key={m.myth} className="vintage-box rounded-md p-4 space-y-1.5">
                    <div className="flex items-start gap-1.5 font-semibold text-[#7D3016]">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                      <span>{m.myth}</span>
                    </div>
                    <p className="text-[#5C5346] leading-relaxed">
                      <strong className="text-[#2A422D]">Reality:</strong> {m.reality}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Practice Lab Bottom Nav */}
          <nav className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-[#231F1A] pt-5">
            <button
              type="button"
              onClick={() =>
                onSelectSection({ kind: 'chapter', chapterIdx: module.chapters.length - 1 })
              }
              className="vintage-btn inline-flex items-center gap-2 rounded-md bg-[#FBF7EE] px-4 py-2.5 text-xs font-semibold text-[#231F1A]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to {module.chapters[module.chapters.length - 1].code}
            </button>
            <button
              type="button"
              onClick={() => onSelectSection({ kind: 'quiz' })}
              className="vintage-btn inline-flex items-center gap-2 rounded-md bg-[#335C81] px-4 py-2.5 text-xs font-semibold text-[#FBF7EE]"
            >
              Take Module 0{module.number} Quiz
              <ArrowRight className="h-4 w-4" />
            </button>
          </nav>
        </div>
      )}

      {/* ====================================================================
       * VIEW 3: MODULE QUIZ (End-of-Module Assessment)
       * ==================================================================== */}
      {section.kind === 'quiz' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="space-y-1.5">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#335C81]">
                End-of-Module Assessment
              </span>
              <h3 className="font-display text-xl font-bold text-[#231F1A] sm:text-2xl">
                Module 0{module.number} Knowledge Check
              </h3>
              <p className="text-sm text-[#5C5346]">{module.quiz.intro}</p>
            </div>
            {quizAnsweredCount > 0 && (
              <button
                type="button"
                onClick={() => onResetModuleQuiz(module.quiz.questions.map((q) => q.id))}
                className="vintage-btn inline-flex items-center gap-1.5 rounded-md bg-[#FBF7EE] px-3 py-1.5 text-xs font-semibold text-[#231F1A]"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset Quiz
              </button>
            )}
          </div>

          {/* Score Summary Banner */}
          <div
            className={`rounded-md border p-4 text-xs flex flex-wrap items-center justify-between gap-2 ${
              quizAnsweredCount === quizTotal
                ? quizCorrectCount === quizTotal
                  ? 'border-[#4A6B4E] bg-[#E6EDE2] text-[#2A422D]'
                  : 'border-[#D49B2A] bg-[#F6ECD5] text-[#6E4E12]'
                : 'border-[#231F1A]/25 bg-[#FBF7EE] text-[#5C5346]'
            }`}
          >
            <div>
              <strong>Progress:</strong> {quizAnsweredCount} of {quizTotal} questions answered
            </div>
            <div className="font-mono font-semibold text-[#231F1A]">
              Score: {quizCorrectCount} / {quizTotal}
              {quizAnsweredCount === quizTotal
                ? ` (${Math.round((quizCorrectCount / quizTotal) * 100)}%)`
                : ''}
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-4">
            {module.quiz.questions.map((kc, qIdx) => {
              const picked = quizAnswers[kc.id];
              const isCorrect = picked === kc.correctIndex;
              return (
                <div key={kc.id} className="vintage-box rounded-md p-4 space-y-3">
                  <div className="text-sm font-semibold text-[#231F1A]">
                    Q{qIdx + 1}. {kc.question}
                  </div>
                  <div className="space-y-1.5">
                    {kc.options.map((opt, idx) => {
                      const chosen = picked === idx;
                      const right = idx === kc.correctIndex;
                      let cls = 'border-[#231F1A]/25 bg-[#F5EFE2] hover:border-[#231F1A]';
                      if (picked !== undefined) {
                        if (chosen && right) cls = 'border-[#4A6B4E] bg-[#E6EDE2] font-medium';
                        else if (chosen && !right) cls = 'border-[#C8552D] bg-[#F7E4DC]';
                        else if (right) cls = 'border-[#4A6B4E] bg-[#E6EDE2]/60';
                      }
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => onAnswerQuiz(kc.id, idx)}
                          className={`flex w-full items-start gap-2 rounded border p-2.5 text-left text-xs transition ${cls}`}
                        >
                          <span className="font-mono font-semibold opacity-70">
                            {String.fromCharCode(65 + idx)}.
                          </span>
                          <span className="flex-1">{opt}</span>
                          {picked !== undefined && chosen && right && (
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-[#2A422D]" />
                          )}
                          {picked !== undefined && chosen && !right && (
                            <XCircle className="h-4 w-4 shrink-0 text-[#C8552D]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                  {picked !== undefined && (
                    <div
                      className={`rounded border p-3 text-xs space-y-1 ${
                        isCorrect
                          ? 'border-[#4A6B4E] bg-[#E6EDE2]'
                          : 'border-[#D49B2A] bg-[#F6ECD5]'
                      }`}
                    >
                      <div>
                        <strong>{isCorrect ? 'Correct: ' : 'Review: '}</strong>
                        {kc.correctExplanation}
                      </div>
                      <div className="text-[#5C5346]">
                        {kc.distractorNotes.map((dn) => (
                          <div key={dn}>• {dn}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Quiz Bottom Navigation */}
          <nav className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-[#231F1A] pt-5">
            <button
              type="button"
              onClick={() => onSelectSection({ kind: 'practice' })}
              className="vintage-btn inline-flex items-center gap-2 rounded-md bg-[#FBF7EE] px-4 py-2.5 text-xs font-semibold text-[#231F1A]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Practice Lab
            </button>
            {onNextModule ? (
              <button
                type="button"
                onClick={onNextModule}
                className="vintage-btn inline-flex items-center gap-2 rounded-md bg-[#231F1A] px-4 py-2.5 text-xs font-semibold text-[#FBF7EE]"
              >
                Next: Module 0{module.number + 1}
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onOpenCapstone}
                className="vintage-btn inline-flex items-center gap-2 rounded-md bg-[#C8552D] px-4 py-2.5 text-xs font-semibold text-[#FBF7EE]"
              >
                Proceed to Final Capstone Project
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </nav>
        </div>
      )}
    </article>
  );
}

import { useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookMarked,
  CheckCircle2,
  ClipboardList,
  Compass,
  ExternalLink,
  HelpCircle,
  Lightbulb,
  Target,
  XCircle,
} from 'lucide-react';
import type { ModuleCurriculum } from '../data/curriculum';
import { ModuleDeepContent } from './ModuleDeepContent';

interface ModuleRendererProps {
  module: ModuleCurriculum;
  totalModules: number;
  onPrev?: () => void;
  onNext?: () => void;
  onOpenCapstone?: () => void;
  onOpenTool?: (tool: 'sphere-tool' | 'framework-tool') => void;
}

export function ModuleRenderer({
  module,
  totalModules,
  onPrev,
  onNext,
  onOpenCapstone,
  onOpenTool,
}: ModuleRendererProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showExample, setShowExample] = useState(false);

  return (
    <article className="mx-auto max-w-3xl space-y-8 pb-16">
      {/* 1. Module Header & Overview */}
      <header className="space-y-3 border-b-2 border-[#231F1A] pb-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#C8552D]">
            Module 0{module.number} / 0{totalModules}
          </span>
          <span className="rounded-md border border-[#231F1A]/25 bg-[#EFE7D6] px-2.5 py-0.5 font-mono text-[11px] text-[#5C5346]">
            {module.integratedLessons}
          </span>
        </div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-[#231F1A] sm:text-3xl">
          {module.title}
        </h2>
        <p className="text-sm leading-relaxed text-[#231F1A]">{module.overview}</p>
      </header>

      {/* 2. Learning Objectives */}
      <section className="vintage-box rounded-md p-5 space-y-2.5">
        <div className="flex items-center gap-2 font-display text-base font-bold text-[#231F1A]">
          <Target className="h-4 w-4 text-[#C8552D]" />
          Learning Objectives
        </div>
        <ul className="space-y-1.5 text-xs leading-relaxed text-[#231F1A]">
          {module.objectives.map((obj) => (
            <li key={obj} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C8552D]" />
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Core Concepts */}
      <section className="space-y-4">
        <h3 className="font-display text-xl font-bold text-[#231F1A]">
          Core Concepts &amp; Methodology
        </h3>
        <ModuleDeepContent moduleId={module.id} />

        {/* Contextual link to secondary tools only where pedagogically relevant */}
        {module.number === 2 && onOpenTool && (
          <div className="rounded-md border border-[#335C81] bg-[#E3EAF0] p-3.5 text-xs flex flex-wrap items-center justify-between gap-2">
            <span>
              <strong>Supplementary Practice Tool:</strong> After studying SPHERE’s five dimensions, you can draft a SPHERE card using the optional builder.
            </span>
            <button
              type="button"
              onClick={() => onOpenTool('sphere-tool')}
              className="vintage-btn rounded-md bg-[#FBF7EE] px-3 py-1 font-semibold text-[#231F1A]"
            >
              Open SPHERE Card Tool →
            </button>
          </div>
        )}
        {module.number === 6 && onOpenTool && (
          <div className="rounded-md border border-[#335C81] bg-[#E3EAF0] p-3.5 text-xs flex flex-wrap items-center justify-between gap-2">
            <span>
              <strong>Supplementary Practice Tool:</strong> Use the optional 12-field Protocol Builder to draft a pre-registered evaluation plan.
            </span>
            <button
              type="button"
              onClick={() => onOpenTool('framework-tool')}
              className="vintage-btn rounded-md bg-[#FBF7EE] px-3 py-1 font-semibold text-[#231F1A]"
            >
              Open Eval Protocol Tool →
            </button>
          </div>
        )}
      </section>

      {/* 4. Research & Evidence */}
      <section className="space-y-3">
        <h3 className="font-display text-xl font-bold text-[#231F1A]">
          Research &amp; Evidence Base
        </h3>
        <div className="space-y-3">
          {module.researchEvidence.map((ref) => (
            <div key={ref.citation} className="vintage-box rounded-md p-4 text-xs space-y-2">
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
              <div className="text-[#5C5346]">
                <strong>Sample / Scope:</strong> {ref.sampleOrScope}
              </div>
              <div className="text-[#231F1A]">
                <strong>Main finding:</strong> {ref.finding}
              </div>
              <div className="grid gap-2 sm:grid-cols-2 pt-1">
                <div className="rounded bg-[#F5EFE2] p-2 text-[#5C5346]">
                  <strong>Limitations:</strong> {ref.limitations}
                </div>
                <div className="rounded bg-[#F7E4DC]/70 p-2 text-[#7D3016]">
                  <strong>Does not establish:</strong> {ref.doesNotEstablish}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Continuous Case Study */}
      <section className="rounded-md border-2 border-[#335C81] bg-[#E3EAF0]/60 p-5 space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-display text-base font-bold text-[#1E3A54]">
            <Compass className="h-4 w-4" />
            {module.caseStudy.stageTitle}
          </div>
          <span className="rounded bg-[#FBF7EE] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#1E3A54] border border-[#335C81]/40">
            Fictional Case Study
          </span>
        </div>
        <p className="text-xs leading-relaxed text-[#231F1A]">{module.caseStudy.narrative}</p>
        <ul className="space-y-1 text-xs text-[#1E3A54]">
          {module.caseStudy.keyDecisions.map((d) => (
            <li key={d}>• {d}</li>
          ))}
        </ul>
      </section>

      {/* 6. Common Misconceptions */}
      <section className="space-y-3">
        <h3 className="font-display text-xl font-bold text-[#231F1A]">
          Common Misconceptions
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 text-xs">
          {module.misconceptions.map((m) => (
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

      {/* 7. Practical Exercise */}
      <section className="vintage-card rounded-md p-5 space-y-3">
        <div className="flex items-center gap-2 font-display text-lg font-bold text-[#231F1A]">
          <ClipboardList className="h-4 w-4 text-[#C8552D]" />
          {module.exercise.title}
        </div>
        <div className="text-xs text-[#5C5346]">
          <strong>Objective:</strong> {module.exercise.objective}
        </div>
        <div className="rounded border border-[#231F1A]/20 bg-[#F5EFE2] p-3 text-xs text-[#231F1A]">
          <strong>Scenario:</strong> {module.exercise.scenario}
        </div>
        <ol className="list-decimal pl-5 space-y-1 text-xs text-[#231F1A]">
          {module.exercise.instructions.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <div className="text-xs text-[#231F1A]">
          <strong>Required output:</strong> {module.exercise.requiredOutput}
        </div>
        <div className="text-xs text-[#5C5346]">
          <strong>Evaluation criteria:</strong>
          <ul className="mt-1 space-y-0.5">
            {module.exercise.evaluationCriteria.map((c) => (
              <li key={c}>• {c}</li>
            ))}
          </ul>
        </div>
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowExample((v) => !v)}
            className="vintage-btn rounded-md bg-[#F6ECD5] px-3 py-1.5 text-xs font-semibold text-[#231F1A]"
          >
            {showExample ? 'Hide Strong-Answer Example' : 'Reveal Strong-Answer Example'}
          </button>
          {showExample && (
            <div className="mt-3 rounded border border-[#4A6B4E] bg-[#E6EDE2] p-3 text-xs text-[#231F1A] space-y-1.5">
              <div>
                <strong>Example of a strong response:</strong> {module.exercise.strongExample}
              </div>
              <div className="text-[#2A422D]">
                <strong>Reflection:</strong> {module.exercise.reflectionQuestion}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 8. Knowledge Checks */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 font-display text-xl font-bold text-[#231F1A]">
          <HelpCircle className="h-5 w-5 text-[#C8552D]" />
          Knowledge Check
        </div>
        <div className="space-y-4">
          {module.knowledgeChecks.map((kc, qIdx) => {
            const picked = answers[kc.id];
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
                        onClick={() => setAnswers((p) => ({ ...p, [kc.id]: idx }))}
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
      </section>

      {/* 9. Key Takeaways */}
      <section className="rounded-md border border-[#D49B2A] bg-[#F6ECD5] p-4 space-y-2">
        <div className="flex items-center gap-2 font-display text-base font-bold text-[#6E4E12]">
          <Lightbulb className="h-4 w-4" />
          Key Takeaways
        </div>
        <ul className="space-y-1 text-xs text-[#231F1A]">
          {module.takeaways.map((t) => (
            <li key={t}>• {t}</li>
          ))}
        </ul>
      </section>

      {/* 10. Further Reading */}
      <section className="vintage-box rounded-md p-4 space-y-2">
        <div className="flex items-center gap-2 font-display text-base font-bold text-[#231F1A]">
          <BookMarked className="h-4 w-4 text-[#C8552D]" />
          Further Reading
        </div>
        <ul className="space-y-1 text-xs">
          {module.furtherReading.map((fr) => (
            <li key={fr.label} className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-[#EFE7D6] px-1.5 py-0.5 font-mono text-[10px]">
                {fr.type}
              </span>
              {fr.url ? (
                <a
                  href={fr.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#335C81] underline hover:text-[#231F1A]"
                >
                  {fr.label}
                </a>
              ) : (
                <span>{fr.label}</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* 11. Transition & Navigation */}
      <div className="space-y-4 border-t-2 border-[#231F1A] pt-5">
        <p className="text-xs italic text-[#5C5346]">
          <strong>Next:</strong> {module.transition}
        </p>

        <nav className="flex flex-wrap items-center justify-between gap-3">
          {onPrev ? (
            <button
              type="button"
              onClick={onPrev}
              className="vintage-btn inline-flex items-center gap-2 rounded-md bg-[#FBF7EE] px-4 py-2.5 text-xs font-semibold text-[#231F1A]"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous Module
            </button>
          ) : (
            <div />
          )}

          {onNext ? (
            <button
              type="button"
              onClick={onNext}
              className="vintage-btn inline-flex items-center gap-2 rounded-md bg-[#231F1A] px-4 py-2.5 text-xs font-semibold text-[#FBF7EE]"
            >
              Next Module
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            onOpenCapstone && (
              <button
                type="button"
                onClick={onOpenCapstone}
                className="vintage-btn inline-flex items-center gap-2 rounded-md bg-[#C8552D] px-4 py-2.5 text-xs font-semibold text-[#FBF7EE]"
              >
                Proceed to Final Capstone Project
                <ArrowRight className="h-4 w-4" />
              </button>
            )
          )}
        </nav>
      </div>
    </article>
  );
}

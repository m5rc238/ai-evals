import type { ReactNode } from 'react';
import { ArrowLeft, ArrowRight, Clock, Sparkles, Target } from 'lucide-react';
import type { LessonMeta } from '../data/curriculum';
import { LessonQuiz } from './LessonQuiz';

interface LessonShellProps {
  lesson: LessonMeta;
  totalLessons: number;
  isMastered: boolean;
  onMaster: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  children: ReactNode;
}

export function LessonShell({
  lesson,
  totalLessons,
  isMastered,
  onMaster,
  onPrev,
  onNext,
  children,
}: LessonShellProps) {
  return (
    <article className="mx-auto max-w-4xl space-y-6 pb-12">
      {/* Lesson Header */}
      <header className="space-y-3 border-b border-stone-200 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500">
          <span className="font-semibold uppercase tracking-wider text-indigo-700">
            {lesson.module} · Lesson {lesson.number} of {totalLessons}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-0.5 font-medium text-stone-600">
            <Clock className="h-3 w-3" />
            {lesson.duration}
          </span>
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-stone-900">
          {lesson.title}
        </h2>

        <div className="flex items-start gap-2.5 rounded-lg border border-stone-200 bg-white p-3.5 text-sm text-stone-700">
          <Target className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />
          <div>
            <span className="font-semibold text-stone-900">Learning goal: </span>
            {lesson.objective}
          </div>
        </div>
      </header>

      {/* Chunked Lesson Content */}
      <div className="space-y-6">{children}</div>

      {/* Key Takeaway */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-sm text-amber-950">
        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
        <div>
          <span className="font-semibold">Key takeaway: </span>
          {lesson.takeaway}
        </div>
      </div>

      {/* Active Recall Check */}
      <LessonQuiz
        key={lesson.id}
        quiz={lesson.quiz}
        isMastered={isMastered}
        onMaster={onMaster}
      />

      {/* Footer Navigation */}
      <nav className="flex items-center justify-between border-t border-stone-200 pt-4">
        {onPrev ? (
          <button
            onClick={onPrev}
            className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-4 py-2 text-xs font-medium text-stone-700 hover:bg-stone-50"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Previous Lesson
          </button>
        ) : (
          <div />
        )}

        {onNext && (
          <button
            onClick={onNext}
            className="inline-flex items-center gap-1.5 rounded-lg bg-stone-900 px-4 py-2 text-xs font-medium text-white hover:bg-stone-800"
          >
            Next Lesson
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        )}
      </nav>
    </article>
  );
}

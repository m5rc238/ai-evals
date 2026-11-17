import { useState } from 'react';
import { CheckCircle2, HelpCircle, XCircle } from 'lucide-react';
import type { QuizQuestion } from '../data/curriculum';

interface LessonQuizProps {
  quiz: QuizQuestion;
  isMastered: boolean;
  onMaster: () => void;
}

export function LessonQuiz({ quiz, isMastered, onMaster }: LessonQuizProps) {
  const [selected, setSelected] = useState<number | null>(null);

  const handleSelect = (idx: number) => {
    setSelected(idx);
    if (idx === quiz.correctIndex) {
      onMaster();
    }
  };

  const isCorrect = selected === quiz.correctIndex;

  return (
    <div className="rounded-xl border border-indigo-200 bg-indigo-50/40 p-5 space-y-4">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm font-semibold text-indigo-950">
          <HelpCircle className="h-4 w-4 text-indigo-600" />
          Quick Concept Check (Active Recall)
        </div>
        {isMastered && (
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Mastered
          </span>
        )}
      </div>

      <p className="text-sm font-medium text-stone-900">{quiz.question}</p>

      <div className="space-y-2">
        {quiz.options.map((opt, idx) => {
          const picked = selected === idx;
          const right = idx === quiz.correctIndex;
          let style = 'border-stone-200 bg-white text-stone-800 hover:border-indigo-300';
          if (selected !== null) {
            if (picked && right) {
              style = 'border-emerald-500 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-500';
            } else if (picked && !right) {
              style = 'border-rose-400 bg-rose-50 text-rose-950 ring-1 ring-rose-400';
            } else if (right) {
              style = 'border-emerald-300 bg-emerald-50/50 text-emerald-900';
            }
          }
          return (
            <button
              key={opt}
              onClick={() => handleSelect(idx)}
              className={`flex w-full items-start gap-2.5 rounded-lg border p-3 text-left text-xs transition ${style}`}
            >
              <span className="mt-0.5 font-mono font-semibold opacity-60">
                {String.fromCharCode(65 + idx)}.
              </span>
              <span className="flex-1 leading-relaxed">{opt}</span>
              {selected !== null && picked && right && (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
              )}
              {selected !== null && picked && !right && (
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
              )}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div
          className={`rounded-lg border p-3 text-xs leading-relaxed ${
            isCorrect
              ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
              : 'border-amber-200 bg-amber-50 text-amber-950'
          }`}
        >
          <strong>{isCorrect ? 'Correct: ' : 'Not quite — '}</strong>
          {quiz.explanation}
        </div>
      )}
    </div>
  );
}

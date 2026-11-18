import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

type ScoreChoice = 'pass' | 'fail' | null;

export function FirstEvalExercise() {
  const [scoreA, setScoreA] = useState<ScoreChoice>(null);
  const [scoreB, setScoreB] = useState<ScoreChoice>(null);
  const [revealed1, setRevealed1] = useState(false);

  const [score2A, setScore2A] = useState<ScoreChoice>(null);
  const [score2B, setScore2B] = useState<ScoreChoice>(null);
  const [revealed2, setRevealed2] = useState(false);

  return (
    <div className="vintage-card rounded-md p-5 space-y-5 text-xs leading-relaxed text-[#231F1A]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#231F1A]/20 pb-3">
        <div>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[#C8552D]">
            5-Minute Hands-On Exercise
          </span>
          <h4 className="font-display text-lg font-bold text-[#231F1A]">
            Run One Complete Eval: Return-Policy Assistant
          </h4>
        </div>
        <span className="rounded border border-[#D49B2A] bg-[#F6ECD5] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#6E4E12]">
          Illustrative Example
        </span>
      </div>

      {/* Policy & Rule */}
      <div className="rounded border border-[#231F1A]/25 bg-[#F5EFE2] p-3.5 space-y-1.5">
        <div><strong>Policy:</strong> Unused items can be returned within 30 days.</div>
        <div>
          <strong>Scoring rule:</strong> Before promising a return, the answer must check any policy condition the customer has left unspecified—and must not re-ask a condition the customer already stated.
        </div>
      </div>

      {/* Case 1 */}
      <div className="space-y-3">
        <div className="font-semibold text-sm text-[#231F1A]">
          Case 1 (Unspecified condition)
        </div>
        <div className="rounded border border-[#231F1A]/20 bg-white p-3">
          <strong>Customer:</strong> “I bought this 12 days ago. Can I return it?”
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              label: 'Answer A (Prompt v1)',
              text: '“Yes, you’re within the return window.”',
              choice: scoreA,
              setChoice: setScoreA,
              expected: 'fail' as const,
            },
            {
              label: 'Answer B (Prompt v2)',
              text: '“You’re within the 30-day window. Has the item been used?”',
              choice: scoreB,
              setChoice: setScoreB,
              expected: 'pass' as const,
            },
          ].map((item) => (
            <div key={item.label} className="rounded border border-[#231F1A]/25 bg-[#FBF7EE] p-3 space-y-2">
              <div className="font-semibold">{item.label}</div>
              <p className="italic text-[#5C5346]">{item.text}</p>
              <div className="flex gap-2 pt-1">
                {(['pass', 'fail'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => item.setChoice(opt)}
                    className={`rounded border px-3 py-1 font-mono text-[11px] font-semibold uppercase transition ${
                      item.choice === opt
                        ? 'border-[#231F1A] bg-[#231F1A] text-[#FBF7EE]'
                        : 'border-[#231F1A]/30 bg-white text-[#231F1A] hover:border-[#231F1A]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {revealed1 && (
                <div
                  className={`flex items-center gap-1.5 rounded p-2 text-[11px] font-medium ${
                    item.choice === item.expected
                      ? 'bg-[#E6EDE2] text-[#2A422D]'
                      : 'bg-[#F7E4DC] text-[#7D3016]'
                  }`}
                >
                  {item.choice === item.expected ? (
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5 shrink-0" />
                  )}
                  Expected: {item.expected.toUpperCase()}
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setRevealed1((v) => !v)}
          className="vintage-btn rounded-md bg-[#F6ECD5] px-3 py-1.5 text-xs font-semibold text-[#231F1A]"
        >
          {revealed1 ? 'Hide Explanation' : 'Check Case 1 & Reveal Explanation'}
        </button>

        {revealed1 && (
          <div className="rounded border border-[#4A6B4E] bg-[#E6EDE2] p-3 space-y-1">
            <div><strong>Answer A fails:</strong> It promises a return without checking whether the item is unused.</div>
            <div><strong>Answer B passes:</strong> It confirms the 30-day timing and asks about the missing condition (whether the item was used).</div>
          </div>
        )}
      </div>

      {/* Case 2 */}
      <div className="space-y-3 border-t border-[#231F1A]/20 pt-4">
        <div className="font-semibold text-sm text-[#231F1A]">
          Case 2 (Condition already specified — why one rule can backfire)
        </div>
        <div className="rounded border border-[#231F1A]/20 bg-white p-3">
          <strong>Customer:</strong> “I bought this 12 days ago and it’s completely unused in the box. Can I return it?”
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {[
            {
              label: 'Answer A (Prompt v1)',
              text: '“Yes—since it is unused and within 30 days, you can return it.”',
              choice: score2A,
              setChoice: setScore2A,
              expected: 'pass' as const,
            },
            {
              label: 'Answer B (Prompt v2)',
              text: '“You’re within the 30-day window. Has the item been used?”',
              choice: score2B,
              setChoice: setScore2B,
              expected: 'fail' as const,
            },
          ].map((item) => (
            <div key={item.label} className="rounded border border-[#231F1A]/25 bg-[#FBF7EE] p-3 space-y-2">
              <div className="font-semibold">{item.label}</div>
              <p className="italic text-[#5C5346]">{item.text}</p>
              <div className="flex gap-2 pt-1">
                {(['pass', 'fail'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => item.setChoice(opt)}
                    className={`rounded border px-3 py-1 font-mono text-[11px] font-semibold uppercase transition ${
                      item.choice === opt
                        ? 'border-[#231F1A] bg-[#231F1A] text-[#FBF7EE]'
                        : 'border-[#231F1A]/30 bg-white text-[#231F1A] hover:border-[#231F1A]'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {revealed2 && (
                <div
                  className={`flex items-center gap-1.5 rounded p-2 text-[11px] font-medium ${
                    item.choice === item.expected
                      ? 'bg-[#E6EDE2] text-[#2A422D]'
                      : 'bg-[#F7E4DC] text-[#7D3016]'
                  }`}
                >
                  {item.choice === item.expected ? (
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                  ) : (
                    <XCircle className="h-3.5 w-3.5 shrink-0" />
                  )}
                  Expected: {item.expected.toUpperCase()}
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setRevealed2((v) => !v)}
          className="vintage-btn rounded-md bg-[#F6ECD5] px-3 py-1.5 text-xs font-semibold text-[#231F1A]"
        >
          {revealed2 ? 'Hide Version Comparison' : 'Check Case 2 & Compare Prompt v1 vs. v2'}
        </button>

        {revealed2 && (
          <div className="space-y-3">
            <div className="rounded border border-[#4A6B4E] bg-[#E6EDE2] p-3 space-y-1">
              <div><strong>Why Case 2 matters:</strong> A naive rubric that simply rewards “asked a follow-up question” would score Answer B as a pass even though it ignored what the customer already said.</div>
            </div>

            <div className="overflow-x-auto rounded border border-[#231F1A]">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[#231F1A] bg-[#EFE7D6]">
                  <tr>
                    <th className="px-3 py-1.5 font-semibold">Case</th>
                    <th className="px-3 py-1.5 font-semibold">Prompt v1</th>
                    <th className="px-3 py-1.5 font-semibold">Prompt v2</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#231F1A]/15 bg-white">
                  <tr>
                    <td className="px-3 py-1.5">Case 1 (unused not stated)</td>
                    <td className="px-3 py-1.5 font-mono text-[#7D3016]">FAIL</td>
                    <td className="px-3 py-1.5 font-mono text-[#2A422D]">PASS</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-1.5">Case 2 (unused already stated)</td>
                    <td className="px-3 py-1.5 font-mono text-[#2A422D]">PASS</td>
                    <td className="px-3 py-1.5 font-mono text-[#7D3016]">FAIL (regression)</td>
                  </tr>
                  <tr className="bg-[#F5EFE2] font-semibold">
                    <td className="px-3 py-1.5">Total score</td>
                    <td className="px-3 py-1.5 font-mono">1 / 2</td>
                    <td className="px-3 py-1.5 font-mono">1 / 2</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-[#5C5346]">
              <strong>Spotting a regression:</strong> Both versions scored 1/2 overall, yet Prompt v2 broke Case 2 while fixing Case 1. Looking only at the total score hides regressions. And notice the first misconception right away: even if a version passes both return cases, that tells us something about 30-day returns—and <strong>very little about lost accounts, billing disputes, or other support topics</strong>.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

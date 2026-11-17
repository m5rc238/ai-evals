import { useState } from 'react';
import { Award, CheckSquare, Square } from 'lucide-react';
import { CAPSTONE_SCENARIO } from '../data/advancedTracks';

export function CapstoneView() {
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const completedCount = Object.values(checked).filter(Boolean).length;

  const toggle = (num: number) => {
    setChecked((p) => ({ ...p, [num]: !p[num] }));
  };

  return (
    <article className="mx-auto max-w-3xl space-y-8 pb-16">
      <header className="space-y-3 border-b-2 border-[#231F1A] pb-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#C8552D]">
            Final Capstone Project
          </span>
          <span className="rounded bg-[#EFE7D6] px-2.5 py-0.5 font-mono text-xs font-semibold text-[#231F1A] border border-[#231F1A]/30">
            {completedCount} / {CAPSTONE_SCENARIO.requiredSections.length} sections planned
          </span>
        </div>
        <h2 className="font-display text-2xl font-bold tracking-tight text-[#231F1A] sm:text-3xl">
          {CAPSTONE_SCENARIO.title}
        </h2>
        <p className="text-sm leading-relaxed text-[#231F1A]">{CAPSTONE_SCENARIO.description}</p>
        <p className="rounded border border-[#335C81] bg-[#E3EAF0] p-3 text-xs text-[#1E3A54]">
          <strong>Note:</strong> {CAPSTONE_SCENARIO.note}
        </p>
      </header>

      {/* 22 Required Proposal Elements */}
      <section className="space-y-3">
        <h3 className="font-display text-xl font-bold text-[#231F1A]">
          Required Proposal Components (22 Elements)
        </h3>
        <p className="text-xs text-[#5C5346]">
          Check off each element as you draft your evaluation proposal. Reward justified methodological trade-offs, not merely listing more metrics.
        </p>

        <div className="grid gap-2.5 sm:grid-cols-2">
          {CAPSTONE_SCENARIO.requiredSections.map((sec) => {
            const done = !!checked[sec.num];
            return (
              <button
                key={sec.num}
                type="button"
                onClick={() => toggle(sec.num)}
                className={`flex items-start gap-2.5 rounded-md border p-3 text-left text-xs transition ${
                  done
                    ? 'border-[#4A6B4E] bg-[#E6EDE2]'
                    : 'border-[#231F1A]/30 bg-[#FBF7EE] hover:border-[#231F1A]'
                }`}
              >
                {done ? (
                  <CheckSquare className="mt-0.5 h-4 w-4 shrink-0 text-[#2A422D]" />
                ) : (
                  <Square className="mt-0.5 h-4 w-4 shrink-0 text-[#5C5346]" />
                )}
                <div>
                  <div className="font-semibold text-[#231F1A]">
                    {sec.num}. {sec.title}
                  </div>
                  <p className="mt-0.5 text-[#5C5346]">{sec.detail}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 9-Criterion Grading Rubric */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 font-display text-xl font-bold text-[#231F1A]">
          <Award className="h-5 w-5 text-[#C8552D]" />
          Capstone Evaluation Rubric
        </div>
        <div className="overflow-x-auto vintage-box rounded-md">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#231F1A] bg-[#EFE7D6]">
              <tr>
                <th className="px-4 py-2.5 font-semibold">Criterion</th>
                <th className="px-4 py-2.5 font-semibold">Standard for Strong Work</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#231F1A]/15">
              {CAPSTONE_SCENARIO.rubric.map((r) => (
                <tr key={r.criterion}>
                  <td className="px-4 py-2.5 font-semibold text-[#231F1A]">{r.criterion}</td>
                  <td className="px-4 py-2.5 text-[#5C5346]">{r.expectation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}

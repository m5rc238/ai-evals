import { useState } from 'react';
import { ArrowRight, RefreshCw, ShieldAlert, Layers, BookOpen, Info } from 'lucide-react';
import { FLOW_NODES, STATEMENT_TYPES, DISCIPLINES, type FlowNode } from '../data/evalsData';

export function ArchitectureView() {
  const [selectedId, setSelectedId] = useState<string>('purpose');
  const [activeStatementIdx, setActiveStatementIdx] = useState<number>(0);

  const selectedNode: FlowNode =
    FLOW_NODES.find((n) => n.id === selectedId) ?? FLOW_NODES[0];

  const coreNodes = FLOW_NODES.filter((n) => n.layer === 'core');
  const crossNodes = FLOW_NODES.filter((n) => n.layer === 'cross-cutting');
  const outerNodes = FLOW_NODES.filter((n) => n.layer === 'outer');

  return (
    <div className="space-y-8">
      {/* Epistemic Status Banner */}
      <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-indigo-600" />
          <div className="space-y-2 text-sm text-stone-700">
            <p className="font-medium text-stone-900">
              AI evaluation is the systematic collection and interpretation of evidence about an AI model, system, its use, or its effects, against explicit questions and criteria, to inform understanding or decisions.
            </p>
            <p className="text-stone-600">
              <strong>Framework status:</strong> This architecture is a proposed synthesis, not a recognized standard, validated taxonomy, or guarantee of completeness. Judge it by whether it helps formulate better questions, uncover omissions, obtain credible evidence, and make defensible decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Three Statement Types */}
      <section className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
          Distinguish Three Statement Types
        </h2>
        <div className="grid gap-3 md:grid-cols-3">
          {STATEMENT_TYPES.map((st, idx) => {
            const active = activeStatementIdx === idx;
            return (
              <button
                key={st.type}
                onClick={() => setActiveStatementIdx(idx)}
                className={`rounded-xl border p-4 text-left transition ${
                  active
                    ? 'border-indigo-500 bg-indigo-50/50 ring-1 ring-indigo-500'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div className="font-semibold text-stone-900">{st.type}</div>
                <p className="mt-1 text-xs text-stone-600">{st.description}</p>
                <p className="mt-2 rounded bg-stone-100 px-2.5 py-1.5 text-xs italic text-stone-700">
                  {st.example}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Interactive Diagram */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-stone-900">
              Interactive Evaluation Landscape
            </h2>
            <p className="text-sm text-stone-600">
              Click any element to inspect its core question, practical output, and epistemic cautions.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">
            <RefreshCw className="h-3.5 w-3.5" />
            Iterative, not a rigid sequence
          </span>
        </div>

        {/* Outer Layer Wrapper */}
        <div className="rounded-2xl border-2 border-dashed border-indigo-300 bg-indigo-50/30 p-4 sm:p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-800">
              Outer Layer: Evaluation Quality & Justification
            </span>
            {outerNodes.map((node) => (
              <button
                key={node.id}
                onClick={() => setSelectedId(node.id)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                  selectedId === node.id
                    ? 'border-indigo-600 bg-indigo-600 text-white shadow-xs'
                    : 'border-indigo-200 bg-white text-indigo-900 hover:bg-indigo-50'
                }`}
              >
                {node.number}. {node.title}
              </button>
            ))}
          </div>

          {/* Cross-Cutting Governance & Time */}
          <div className="rounded-xl border border-amber-300/80 bg-amber-50/50 p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-900">
                Cross-Cutting: Governance & Lifecycle
              </span>
              <div className="flex flex-wrap gap-2">
                {crossNodes.map((node) => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedId(node.id)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                      selectedId === node.id
                        ? 'border-amber-600 bg-amber-600 text-white shadow-xs'
                        : 'border-amber-200 bg-white text-amber-900 hover:bg-amber-50'
                    }`}
                  >
                    {node.number}. {node.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Central Flow */}
            <div className="rounded-xl border border-stone-200 bg-white p-4">
              <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
                Central Flow (with feedback loops for criteria drift & reevaluation)
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {coreNodes.map((node, idx) => {
                  const active = selectedId === node.id;
                  return (
                    <div key={node.id} className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedId(node.id)}
                        className={`rounded-lg border px-3 py-2 text-left text-xs font-medium transition ${
                          active
                            ? 'border-stone-900 bg-stone-900 text-white shadow-sm'
                            : 'border-stone-200 bg-stone-50 text-stone-800 hover:border-stone-400 hover:bg-stone-100'
                        }`}
                      >
                        <span className="opacity-70">{node.number}.</span> {node.title}
                      </button>
                      {idx < coreNodes.length - 1 && (
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-stone-400" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Detail Card */}
        <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-xs">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-stone-100 pb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                {selectedNode.layer === 'core'
                  ? 'Central Flow'
                  : selectedNode.layer === 'cross-cutting'
                  ? 'Cross-Cutting Concern'
                  : 'Outer Justification Layer'}
              </span>
              <h3 className="mt-0.5 text-xl font-bold text-stone-900">
                {selectedNode.number}. {selectedNode.title}
              </h3>
            </div>
            <p className="text-sm font-medium italic text-stone-700">
              “{selectedNode.question}”
            </p>
          </div>

          <div className="mt-4 grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 space-y-3">
              <p className="text-sm leading-relaxed text-stone-700">
                {selectedNode.summary}
              </p>
              <ul className="space-y-2 text-sm text-stone-700">
                {selectedNode.keyPoints.map((pt, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-3.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-800">
                  <Layers className="h-3.5 w-3.5" />
                  Practical Output
                </div>
                <p className="mt-1 text-xs leading-relaxed text-emerald-950">
                  {selectedNode.practicalOutput}
                </p>
              </div>
              <div className="rounded-lg border border-rose-200 bg-rose-50/60 p-3.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-rose-800">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  Epistemic Caution
                </div>
                <p className="mt-1 text-xs leading-relaxed text-rose-950">
                  {selectedNode.caution}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disciplinary Foundations */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-stone-500" />
          <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
            Conceptual & Disciplinary Foundations (Illustrative Inventory)
          </h2>
        </div>
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
          {DISCIPLINES.map((d) => (
            <div key={d.name} className="rounded-lg border border-stone-200 bg-white p-3">
              <div className="text-xs font-semibold text-stone-900">{d.name}</div>
              <p className="mt-1 text-xs leading-snug text-stone-600">{d.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

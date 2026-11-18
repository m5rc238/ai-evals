<p align="center">
  <img src="./public/exosphere-logo.png" alt="AI Evaluation Guide & Protocol logo" width="84" />
</p>

# AI Evaluation Guide & Protocol

A 7-module study guide, capstone project, and protocol builder for evidence-based AI and Human–AI Interaction evaluation, combining the core AI evaluation landscape with **SPHERE** (Zhao et al., ACL 2025 Findings · [sphere-eval.github.io](https://sphere-eval.github.io/)) and Stanford CS 329X (*Evaluate Human-AI Interaction*).

**Live Site:** https://m5rc238.github.io/ai-evals/

---

## What’s Included

### 1. Seven-Module Study Guide
1. **Foundations & The Evaluation Landscape** — Definition, 10-type taxonomy, 15-term glossary, evidence hierarchy, and capability vs. mechanism.
2. **Human–AI Interaction & SPHERE** — Interaction as the interface, the 5 SPHERE dimensions (*What, How, Who, When, Meta-Validation*), human factors, and synergy evidence.
3. **Framing: Purpose, Scope, Targets & Context** — Research questions, exploratory vs. confirmatory modes, 6 nested scopes, agent harnesses, and contamination/leakage.
4. **Criteria, Evidence Collection & Sampling** — Operational criteria, task-specific metrics, dataset design, imperfect ground truth, and robustness.
5. **Real Human Outcomes, Grading & Aggregation** — 9 outcome levels, inter-rater reliability ($\kappa$, $\alpha$, ICC), LLM-judge validation, and Simpson’s paradox.
6. **Statistics, Validity, Lifecycle & Protocol** — 12 worked statistical examples, 3-category validity framework, experimental design, and lifecycle governance.
7. **How AI Benchmarks and Leaderboards Can Mislead** — 18 benchmark/reporting pitfalls and auditing overstated AI claims.

### 2. Final Capstone Project & Optional Advanced Tracks
- **Capstone Project:** Worked 22-element proposal for the fictional *Meridian Research Assistant*, reusable template, fictional mixed results, sample statistical interpretation, sample final report, and 4-level grading rubric.
- **Optional Advanced Tracks (A–F):** RAG Evaluation, AI Agents, Safety & Security, Multimodal Evaluation, Advanced Measurement, and Organizational Evaluation.

### 3. Supplementary Practice Tools
- **SPHERE Card Tool:** Interactive 5-dimension builder for Human–AI systems with live preview and `.md` / `.json` export.
- **Eval Protocol Tool:** 12-field companion protocol and bounded decision statement builder with live preview and `.md` / `.json` export.
- **Metrics Taxonomy Tool:** Searchable, filterable, and sortable reference of 25 AI evaluation metrics mapped by discipline, unit of analysis, and category.

### 3. Markdown Reference
- [ai-evals-guide.md](./ai-evals-guide.md) — Standalone Markdown reference guide.

---

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

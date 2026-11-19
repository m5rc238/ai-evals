<p align="center">
  <img src="./public/exosphere-logo.png" alt="AI Evaluation Study Guide logo" width="84" />
</p>

# AI Evaluation Study Guide

A practical 7-module, 23-chapter course with dedicated **Theory**, **Practice Labs**, and **End-of-Module Quizzes**, plus a Capstone Project and interactive evaluation toolkit covering what AI evals are, the 7 evaluation layers and units of analysis, datasets, rubrics and judges, statistical comparisons, real-world workflows, Human–AI epistemic risk, and auditing public claims.

**Live Site:** https://m5rc238.github.io/ai-evals/

---

## What’s Included

### 1. Seven-Module Course (23 Deep Chapters · Theory / Practice Lab / Quiz)
1. **Foundations of AI Evaluation** *(Ch 1.1–1.4 + Practice Lab 1 + Quiz)* — What an eval is vs. unit tests, Dataset/Rubric/Judge + telemetry, the 7 layers (*Data & Inputs → Wider Impacts*) & units of analysis, Construct vs. External Validity, Four Operating Rules, and an interactive 5-minute first eval.
2. **Scoping & Datasets** *(Ch 2.1–2.4 + Practice Lab 2 + Quiz)* — Decision-first scoping, comparing current workflow vs. simpler non-AI fixes vs. AI, pinning full harnesses, exploratory vs. confirmatory separation, contamination defense, error analysis first, ordinary/ambiguous/escalation cases, and unbiased sampling.
3. **Rubrics, Judges & Aggregation** *(Ch 3.1–3.3 + Practice Lab 3 + Quiz)* — Observable rubrics from reviewer disagreements, deterministic code/human/LLM/telemetry judges, LLM-judge validation, $\kappa$/$\alpha$/ICC, and avoiding average traps & Simpson’s paradox.
4. **Comparing Versions, Statistics & Validity** *(Ch 4.1–4.3 + Practice Lab 4 + Quiz)* — Direct paired difference CIs, clustering at the unit of analysis, Goodhart’s Law tradeoffs, Rule of Three, the 3-pillar validity framework, and an interactive 12-question Statistical Workbench.
5. **Real-World Workflows & Production Monitoring** *(Ch 5.1–5.3 + Practice Lab 5 + Quiz)* — Environment-state checks for agents (Layer 4), total human task time (drafting + checking + correction) for Human–AI workflows (Layer 5), live telemetry + scoring rules, separate product/evaluator versioning, and governance.
6. **Human–AI Interaction & Epistemic Risk** *(Ch 6.1–6.4 + Practice Lab 6 + Quiz)* — Beyond the model/human binary (top-down framing, bottom-up instrumentation), core HAI constructs (complementarity, calibrated reliance, oversight cost, error visibility), Epistemia & the 7 fault lines, cognitive biases in users and judges, and designing anti-epistemia evals.
7. **Auditing Benchmarks & Vendor Claims** *(Ch 7.1–7.2 + Practice Lab 7 + Quiz)* — How leaderboards mislead, the 4-question audit, and calibrated evidence reporting.

### 2. Final Capstone Project & Optional Advanced Tracks
- **Capstone Project:** Worked 22-element proposal for the fictional *Meridian Research Assistant*, reusable template, fictional mixed results, sample statistical interpretation, sample final report, and 4-level grading rubric.
- **Optional Advanced Tracks (A–G):** RAG Evaluation, AI Agents & Tool Use, AI Safety & Security, Multimodal Evaluation, Advanced Measurement, Organizational Evaluation, and Deep Human–AI Research & SPHERE (Zhao et al., ACL 2025 · [sphere-eval.github.io](https://sphere-eval.github.io/)).

### 3. Supplementary Practice Tools
- **Metrics Taxonomy Tool:** Searchable, filterable reference of 29 evaluation metrics mapped across the 7 layers and units of analysis, with exportable evaluation plans.
- **Eval Protocol Tool:** 12-field companion protocol and bounded decision statement builder with live preview and `.md` / `.json` export.
- **SPHERE Card Tool:** Optional 5-dimension builder for formal Human–AI interaction studies (linked to Module 6 · Ch 6.2 and Track G).

### 4. Markdown Reference
- [ai-evals-guide.md](./ai-evals-guide.md) — Standalone One-Page Reference and complete practitioner guide.

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

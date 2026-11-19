<p align="center">
  <img src="./public/exosphere-logo.png" alt="AI Evaluation Study Guide logo" width="84" />
</p>

# AI Evaluation Study Guide

A practical 7-module study guide, capstone project, and interactive evaluation toolkit covering what AI evals are, the 7 evaluation layers and units of analysis, datasets, rubrics and judges, statistical comparisons, real-world workflows, and auditing public claims.

**Live Site:** https://m5rc238.github.io/ai-evals/

---

## What’s Included

### 1. Seven-Module Study Guide
1. **The Full Picture: What AI Evals Are, Layers & Units** — How evals complement unit tests, Dataset/Rubric/Judge + telemetry, the 7 layers (*Data & Inputs → Wider Impacts*) & units of analysis, Construct vs. External Validity, Four Operating Rules, and a 5-minute hands-on eval.
2. **Start With the Decision: Scoping Layer, Unit & Baseline** — Comparing current workflow vs. simpler non-AI fixes vs. AI, pinning full harnesses, separating exploratory vs. confirmatory modes, and guarding against contamination.
3. **Datasets & Error Analysis: Building Real Test Cases** — Treating the eval as the spec via trace/error analysis, ordinary/ambiguous/escalation cases, and separating discovery, challenge, regression, and representative sampling.
4. **Rubrics & Judges: Scoring Without Fooling Yourself** — Tightening vague rules from reviewer disagreements, deterministic code/human/LLM/telemetry judges, LLM-judge validation, $\kappa$/$\alpha$/ICC, and avoiding average traps & Simpson’s paradox.
5. **Comparing Versions: Uncertainty, Tradeoffs & Goodhart’s Law** — Direct paired difference CIs, clustering at the unit of analysis, cost/latency tradeoffs, Rule of Three, 12 worked statistical examples, and the 3-pillar validity framework.
6. **Real-World Performance: Workflows, Human–AI & Production Monitoring** — Verifying workflow/agent state changes, measuring total human task time (drafting + checking + correction), and post-launch telemetry, separate versioning, and reevaluation triggers.
7. **Calling Out Hype: Auditing Benchmarks & Vendor Claims** — Spotting contamination, undisclosed harnesses, Goodharted metrics, and rewriting overstated press releases.

### 2. Final Capstone Project & Optional Advanced Tracks
- **Capstone Project:** Worked 22-element proposal for the fictional *Meridian Research Assistant*, reusable template, fictional mixed results, sample statistical interpretation, sample final report, and 4-level grading rubric.
- **Optional Advanced Tracks (A–G):** RAG Evaluation, AI Agents & Tool Use, AI Safety & Security, Multimodal Evaluation, Advanced Measurement, Organizational Evaluation, and Deep Human–AI Research & SPHERE (Zhao et al., ACL 2025 · [sphere-eval.github.io](https://sphere-eval.github.io/)).

### 3. Supplementary Practice Tools
- **Metrics Taxonomy Tool:** Searchable, filterable reference of 29 evaluation metrics mapped across the 7 layers and units of analysis, with exportable evaluation plans.
- **Eval Protocol Tool:** 12-field companion protocol and bounded decision statement builder with live preview and `.md` / `.json` export.
- **SPHERE Card Tool:** Optional 5-dimension builder for formal Human–AI interaction studies (linked to Module 6 and Track G).

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

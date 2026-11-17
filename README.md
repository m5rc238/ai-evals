<p align="center">
  <img src="./public/exosphere-logo.png" alt="AI Evaluation Guide & Protocol logo" width="84" />
</p>

# AI Evaluation Guide & Protocol

A 7-module visual guide and protocol builder for evidence-based AI and Human–AI Interaction evaluation, combining the core AI evaluation landscape with the **SPHERE** framework ([sphere-eval.github.io](https://sphere-eval.github.io/)) and Stanford CS 329X (*Evaluate Human-AI Interaction*).

**Live Site:** https://m5rc238.github.io/ai-evals/

---

## What’s Included

### 1. Seven-Module Visual Guide
1. **Foundations & The Evaluation Landscape** — Definition, statement types (empirical, conceptual/normative, practical), 10-element architecture, and capability vs. mechanism.
2. **Human–AI Interaction & SPHERE** — Interaction as the interface, the 5 SPHERE dimensions (*What, How, Who, When, Meta-Validation*), and human–AI synergy findings.
3. **Framing: Purpose, Scope, Targets & Context** — Exploratory vs. confirmatory modes, 6 nested scopes (model, harness, human–AI team, organization, societal), and coverage exclusions.
4. **Criteria, Evidence Collection & Sampling** — 8-field criterion specification, intrinsic vs. extrinsic pipelines, SWE-bench vs. ProgramBench, and sampling purposes.
5. **Real Human Outcomes, Grading & Aggregation** — Perceived vs. actual speed, skill erosion, offloading, grader validation, and severity-preserving aggregation.
6. **Statistics, Validity, Lifecycle & Protocol** — Rare-failure binomial bounds, conversation clustering, 10 validity checks, longitudinal dynamics, and governance.
7. **Debunking AI Eval Hype, Fallacies & Failure Modes** — 10 common evaluation fallacies and a red-flag checklist for reading eval claims.

### 2. Two Exportable Protocol Tools
- **SPHERE Card Tool:** Interactive 5-dimension builder for Human–AI systems with live preview and `.md` / `.json` export.
- **Eval Protocol Tool:** 12-field companion protocol and bounded decision statement builder with live preview and `.md` / `.json` export.

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

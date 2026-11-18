#!/usr/bin/env node
/**
 * Reproducible Synthetic Dataset & Analysis for the Unsupported-Claim Non-Inferiority Check
 *
 * NOTE: This is a separate, small worked synthetic dataset (8 analysts x 2 conditions = 16 briefs,
 * 240 material claims) designed for reproducibility, distinct from the larger 32-analyst fictional
 * Meridian scenario in the main Capstone table.
 *
 * Denominator definition: totalMaterialClaims = supported + partiallySupported + unsupported.
 * Partially supported claims (e.g., omitted qualifier) are tracked separately and NOT counted
 * as unsupported claims in the primary unsupported-claim rate.
 */

export const SYNTHETIC_BRIEFS = [
  // Junior analysts (4 analysts, 2 briefs each)
  { briefId: 'B01', analyst: 'A01', experience: 'junior', packet: 'P1', condition: 'manual',    supported: 13, partial: 1, unsupported: 1, totalClaims: 15 },
  { briefId: 'B02', analyst: 'A01', experience: 'junior', packet: 'P2', condition: 'assistant', supported: 12, partial: 1, unsupported: 2, totalClaims: 15 },
  { briefId: 'B03', analyst: 'A02', experience: 'junior', packet: 'P2', condition: 'manual',    supported: 14, partial: 1, unsupported: 0, totalClaims: 15 },
  { briefId: 'B04', analyst: 'A02', experience: 'junior', packet: 'P1', condition: 'assistant', supported: 12, partial: 2, unsupported: 1, totalClaims: 15 },
  { briefId: 'B05', analyst: 'A03', experience: 'junior', packet: 'P3', condition: 'manual',    supported: 13, partial: 1, unsupported: 1, totalClaims: 15 },
  { briefId: 'B06', analyst: 'A03', experience: 'junior', packet: 'P4', condition: 'assistant', supported: 11, partial: 2, unsupported: 2, totalClaims: 15 },
  { briefId: 'B07', analyst: 'A04', experience: 'junior', packet: 'P4', condition: 'manual',    supported: 14, partial: 0, unsupported: 1, totalClaims: 15 },
  { briefId: 'B08', analyst: 'A04', experience: 'junior', packet: 'P3', condition: 'assistant', supported: 12, partial: 1, unsupported: 2, totalClaims: 15 },
  // Senior analysts (4 analysts, 2 briefs each)
  { briefId: 'B09', analyst: 'A05', experience: 'senior', packet: 'P1', condition: 'manual',    supported: 14, partial: 1, unsupported: 0, totalClaims: 15 },
  { briefId: 'B10', analyst: 'A05', experience: 'senior', packet: 'P2', condition: 'assistant', supported: 13, partial: 1, unsupported: 1, totalClaims: 15 },
  { briefId: 'B11', analyst: 'A06', experience: 'senior', packet: 'P2', condition: 'manual',    supported: 13, partial: 1, unsupported: 1, totalClaims: 15 },
  { briefId: 'B12', analyst: 'A06', experience: 'senior', packet: 'P1', condition: 'assistant', supported: 13, partial: 1, unsupported: 1, totalClaims: 15 },
  { briefId: 'B13', analyst: 'A07', experience: 'senior', packet: 'P3', condition: 'manual',    supported: 14, partial: 1, unsupported: 0, totalClaims: 15 },
  { briefId: 'B14', analyst: 'A07', experience: 'senior', packet: 'P4', condition: 'assistant', supported: 13, partial: 2, unsupported: 0, totalClaims: 15 },
  { briefId: 'B15', analyst: 'A08', experience: 'senior', packet: 'P4', condition: 'manual',    supported: 14, partial: 1, unsupported: 0, totalClaims: 15 },
  { briefId: 'B16', analyst: 'A08', experience: 'senior', packet: 'P3', condition: 'assistant', supported: 14, partial: 1, unsupported: 0, totalClaims: 15 },
];

const NON_INFERIORITY_MARGIN_PP = 1.0;
const T_CRIT_DF7_95 = 2.3646; // two-sided 95% t critical value for df = 8 - 1 = 7

function analyze() {
  const byCondition = { manual: { unsup: 0, partial: 0, total: 0 }, assistant: { unsup: 0, partial: 0, total: 0 } };
  const byAnalyst = new Map();

  for (const row of SYNTHETIC_BRIEFS) {
    byCondition[row.condition].unsup += row.unsupported;
    byCondition[row.condition].partial += row.partial;
    byCondition[row.condition].total += row.totalClaims;

    if (!byAnalyst.has(row.analyst)) {
      byAnalyst.set(row.analyst, { experience: row.experience, manual: null, assistant: null });
    }
    byAnalyst.get(row.analyst)[row.condition] = row.unsupported / row.totalClaims;
  }

  const pManual = byCondition.manual.unsup / byCondition.manual.total;
  const pAssist = byCondition.assistant.unsup / byCondition.assistant.total;
  const diffPP = (pAssist - pManual) * 100;

  // Analyst-level paired differences (accounts for repeated analysts & shared packets)
  const analystDiffsPP = Array.from(byAnalyst.values()).map(
    (a) => (a.assistant - a.manual) * 100
  );
  const nAnalysts = analystDiffsPP.length;
  const meanDiffPP = analystDiffsPP.reduce((s, x) => s + x, 0) / nAnalysts;
  const sdDiffPP = Math.sqrt(
    analystDiffsPP.reduce((s, x) => s + (x - meanDiffPP) ** 2, 0) / (nAnalysts - 1)
  );
  const seClusteredPP = sdDiffPP / Math.sqrt(nAnalysts);
  const ciClustered = [
    meanDiffPP - T_CRIT_DF7_95 * seClusteredPP,
    meanDiffPP + T_CRIT_DF7_95 * seClusteredPP,
  ];

  // Naive claim-level SE (treats all 240 claims as independent — shown for contrast)
  const seNaivePP =
    Math.sqrt(
      (pManual * (1 - pManual)) / byCondition.manual.total +
        (pAssist * (1 - pAssist)) / byCondition.assistant.total
    ) * 100;
  const ciNaive = [diffPP - 1.96 * seNaivePP, diffPP + 1.96 * seNaivePP];

  // Exploratory subgroup rates
  const juniorRows = SYNTHETIC_BRIEFS.filter((r) => r.experience === 'junior');
  const seniorRows = SYNTHETIC_BRIEFS.filter((r) => r.experience === 'senior');
  const rate = (rows, cond) => {
    const sub = rows.filter((r) => r.condition === cond);
    const u = sub.reduce((s, r) => s + r.unsupported, 0);
    const t = sub.reduce((s, r) => s + r.totalClaims, 0);
    return { u, t, pct: (u / t) * 100 };
  };
  const jMan = rate(juniorRows, 'manual');
  const jAss = rate(juniorRows, 'assistant');
  const sMan = rate(seniorRows, 'manual');
  const sAss = rate(seniorRows, 'assistant');

  const passesNonInferiority = ciClustered[1] <= NON_INFERIORITY_MARGIN_PP;

  console.log('=== Reproducible Synthetic Worked Dataset (16 briefs, 240 claims) ===');
  console.log(`Manual rate:    ${byCondition.manual.unsup}/${byCondition.manual.total} = ${(pManual * 100).toFixed(2)}% (partial: ${byCondition.manual.partial})`);
  console.log(`Assistant rate: ${byCondition.assistant.unsup}/${byCondition.assistant.total} = ${(pAssist * 100).toFixed(2)}% (partial: ${byCondition.assistant.partial})`);
  console.log(`Absolute diff:  ${diffPP >= 0 ? '+' : ''}${diffPP.toFixed(2)} percentage points`);
  console.log(`Clustered 95% CI (analyst-level, df=7): [${ciClustered[0].toFixed(2)}, ${ciClustered[1].toFixed(2)}] pp (SE = ${seClusteredPP.toFixed(2)} pp)`);
  console.log(`Naive 95% CI (assuming 240 indep. claims): [${ciNaive[0].toFixed(2)}, ${ciNaive[1].toFixed(2)}] pp (SE = ${seNaivePP.toFixed(2)} pp)`);
  console.log(`Exploratory junior diff: ${jAss.pct.toFixed(2)}% - ${jMan.pct.toFixed(2)}% = +${(jAss.pct - jMan.pct).toFixed(2)} pp`);
  console.log(`Exploratory senior diff: ${sAss.pct.toFixed(2)}% - ${sMan.pct.toFixed(2)}% = +${(sAss.pct - sMan.pct).toFixed(2)} pp`);
  console.log(`Decision vs +${NON_INFERIORITY_MARGIN_PP.toFixed(1)} pp margin: ${passesNonInferiority ? 'PASS' : 'FAIL (upper bound exceeds +1.0 pp; withhold pilot)'}`);
}

analyze();

import { DisruptionInput, ScenarioMetrics } from '../types';

export const classifySeverity = (duration: number): DisruptionInput['severity'] => {
  if (duration < 30) return 'Minor';
  if (duration <= 60) return 'Moderate';
  return 'Major';
};

export const computeMHD = (h0: number, hd: number) => Math.abs(hd - h0);
export const computeHSR = (mhd: number, h0: number) => 1 - mhd / Math.max(h0, 0.1);

export const compositeR = (hsr: number, sar: number, sri: number, w1: number, w2: number, w3: number) => {
  const norm = (x: number) => Math.max(0, Math.min(1, x));
  return w1 * norm(hsr) + w2 * norm(sar) + w3 * norm(sri);
};

export const improvement = (base: number, current: number) => ((current - base) / Math.max(base, 0.0001)) * 100;
export const recoveryReduction = (base: number, current: number) => ((base - current) / Math.max(base, 0.0001)) * 100;

export const resilienceCurve = (scenario: ScenarioMetrics, duration: number) => {
  const total = Math.max(120, duration + scenario.recoveryTime + 20);
  const points = [] as Array<{ t: number; q: number }>;
  for (let t = 0; t <= total; t += 5) {
    let q = 1;
    if (t >= 10 && t < 20) q = 1 - (1 - scenario.r) * ((t - 10) / 10);
    if (t >= 20 && t < duration) q = scenario.r;
    if (t >= duration) {
      const recoverProgress = Math.min(1, (t - duration) / Math.max(1, scenario.recoveryTime));
      q = scenario.r + (1 - scenario.r) * recoverProgress;
    }
    points.push({ t, q: Math.max(0, Math.min(1, q)) });
  }
  const auc = points.reduce((acc, p, i) => {
    if (i === 0) return acc;
    const prev = points[i - 1];
    return acc + ((prev.q + p.q) / 2) * (p.t - prev.t);
  }, 0);
  return { points, auc: auc / total };
};

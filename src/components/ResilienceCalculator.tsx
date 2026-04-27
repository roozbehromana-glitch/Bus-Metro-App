import { useMemo } from 'react';
import { useAppStore } from '../store';
import { compositeR, computeHSR, computeMHD, improvement, recoveryReduction } from '../utils/resilienceMetrics';
import { validateWeights } from '../utils/validation';

export function ResilienceCalculator() {
  const { disruption, scenarios, setScenarios, weights, setWeights } = useAppStore();
  const valid = validateWeights(weights.w1, weights.w2, weights.w3);

  const recomputed = useMemo(
    () =>
      scenarios.map((s) => {
        const mhd = s.key === 'A' ? computeMHD(disruption.baselineHeadway, disruption.disruptedHeadway) : s.mhd;
        const hsr = s.key === 'A' ? computeHSR(mhd, disruption.baselineHeadway) : s.hsr;
        return { ...s, mhd, hsr, r: compositeR(hsr, s.sar, s.sri, weights.w1, weights.w2, weights.w3) };
      }),
    [scenarios, disruption, weights],
  );

  return (
    <section className="glass rounded-2xl p-4 md:p-5 space-y-3">
      <div>
        <h2 className="section-title">Operational Resilience Module</h2>
        <p className="section-subtitle">Compute MHD, HSR, SAR, SRI and weighted composite resilience index.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-3 text-sm">
        {(['w1', 'w2', 'w3'] as const).map((k) => (
          <label key={k} className="rounded-lg border border-white/10 bg-slate-900/50 p-2">{k}
            <input className="w-full" type="range" min={0} max={1} step={0.05} value={weights[k]} onChange={(e) => setWeights({ ...weights, [k]: Number(e.target.value) })} />
            <span className="text-cyan-300">{weights[k].toFixed(2)}</span>
          </label>
        ))}
      </div>
      {!valid && <p className="text-red-300 text-sm">Validation: w1 + w2 + w3 must equal 1.</p>}
      <button className="rounded-lg bg-cyan-400 px-3 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300" onClick={() => setScenarios(recomputed)}>Recompute Composite R</button>
      <div className="overflow-x-auto rounded-lg border border-white/10 bg-slate-900/40">
        <table className="w-full text-sm">
          <thead><tr className="text-left bg-slate-800/70"><th className="p-2">Scenario</th><th>MHD</th><th>HSR</th><th>SAR</th><th>SRI</th><th>R</th><th>Improvement%</th><th>Recovery reduction%</th></tr></thead>
          <tbody>{recomputed.map((s) => <tr key={s.key} className="border-t border-slate-800"><td className="p-2">{s.name}</td><td>{s.mhd.toFixed(2)}</td><td>{s.hsr.toFixed(2)}</td><td>{s.sar.toFixed(2)}</td><td>{s.sri.toFixed(2)}</td><td>{s.r.toFixed(2)}</td><td>{s.key === 'A' ? '-' : improvement(recomputed[0].r, s.r).toFixed(1)}</td><td>{s.key === 'A' ? '-' : recoveryReduction(recomputed[0].recoveryTime, s.recoveryTime).toFixed(1)}</td></tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}

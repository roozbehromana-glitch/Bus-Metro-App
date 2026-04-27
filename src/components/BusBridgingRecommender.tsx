import { useAppStore } from '../store';
import { recommendStrategy } from '../utils/busBridging';

export function BusBridgingRecommender() {
  const { disruption, scenarios, stations } = useAppStore();
  const rec = recommendStrategy(disruption, scenarios, disruption.disruptedNodes.some((id) => stations.find((s) => s.id === id)?.type === 'transfer'));
  const selected = scenarios.find((s) => s.key === rec.strategy) ?? scenarios[0];
  return (
    <section className="glass rounded-2xl p-4 md:p-5 space-y-3">
      <div>
        <h2 className="section-title">Bus Bridging Strategy Recommender</h2>
        <p className="section-subtitle">Rule-based strategy decision using demand, disruption, centrality sensitivity, and fleet constraints.</p>
      </div>
      <div className="rounded-xl border border-cyan-300/40 bg-cyan-400/10 p-3">
        <p><b>Recommended:</b> Scenario {rec.strategy} — {selected.name}</p>
        <p className="text-sm text-slate-300">{rec.explanation}</p>
      </div>
      <div className="grid md:grid-cols-3 gap-2 text-sm">
        <div className="rounded-lg border border-white/10 p-2">Expected MHD: {selected.mhd.toFixed(2)}</div><div className="rounded-lg border border-white/10 p-2">Expected HSR: {selected.hsr.toFixed(2)}</div><div className="rounded-lg border border-white/10 p-2">Expected SAR: {selected.sar.toFixed(2)}</div>
        <div className="rounded-lg border border-white/10 p-2">Expected SRI: {selected.sri.toFixed(2)}</div><div className="rounded-lg border border-white/10 p-2">Expected R: {selected.r.toFixed(2)}</div><div className="rounded-lg border border-white/10 p-2">Expected recovery: {selected.recoveryTime} min</div>
        <div className="rounded-lg border border-white/10 p-2">Required bus freq: {rec.freq.toFixed(1)} buses/hour</div><div className="rounded-lg border border-white/10 p-2">Required fleet size: {rec.fleetNeed.toFixed(1)} buses</div>
        <div className={`rounded-lg border p-2 ${rec.fleetNeed > disruption.availableFleet ? 'border-red-300/50 text-red-300' : 'border-emerald-300/50 text-emerald-300'}`}>{rec.fleetNeed > disruption.availableFleet ? 'Operational warning: fleet insufficient.' : 'Fleet appears sufficient.'}</div>
      </div>
    </section>
  );
}

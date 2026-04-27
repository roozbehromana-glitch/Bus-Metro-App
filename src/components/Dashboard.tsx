import { useMemo } from 'react';
import { useAppStore } from '../store';
import { recommendStrategy } from '../utils/busBridging';

const StatCard = ({ label, value }: { label: string; value: string | number }) => (
  <div className="glass rounded-xl p-4">
    <p className="text-xs uppercase tracking-wider text-slate-300">{label}</p>
    <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
  </div>
);

export function Dashboard() {
  const { stations, links, disruption, scenarios } = useAppStore();
  const lines = useMemo(() => new Set(stations.map((s) => s.line)).size, [stations]);
  const transfer = stations.filter((s) => s.type === 'transfer').length;
  const robustness = ((stations.length - disruption.disruptedNodes.length) / Math.max(stations.length, 1)).toFixed(2);
  const bestScenario = scenarios.reduce((a, b) => (a.r > b.r ? a : b));
  const rec = recommendStrategy(disruption, scenarios, disruption.disruptedNodes.some((id) => stations.find((s) => s.id === id)?.type === 'transfer'));

  return (
    <section className="space-y-3">
      <div>
        <h2 className="section-title">Home Dashboard</h2>
        <p className="section-subtitle">Network status, disruption context, and strategic recommendation at a glance.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Stations" value={stations.length} />
        <StatCard label="Links" value={links.length} />
        <StatCard label="Lines" value={lines} />
        <StatCard label="Transfer stations" value={transfer} />
        <StatCard label="Current disruption" value={disruption.severity} />
        <StatCard label="Robustness R_G" value={robustness} />
        <StatCard label="Best resilience R" value={bestScenario.r.toFixed(2)} />
        <StatCard label="Recommended" value={`Scenario ${rec.strategy}`} />
      </div>
    </section>
  );
}

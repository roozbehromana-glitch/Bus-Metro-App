import { useAppStore } from '../store';

export function ScenarioComparisonTable() {
  const { scenarios } = useAppStore();
  return (
    <section className="glass rounded-2xl p-4 md:p-5 space-y-3">
      <div>
        <h2 className="section-title">Scenario Comparison</h2>
        <p className="section-subtitle">Baseline versus bridging alternatives for thesis-ready interpretation.</p>
      </div>
      <div className="overflow-x-auto rounded-lg border border-white/10 bg-slate-900/40">
        <table className="w-full text-sm">
          <thead><tr className="text-left bg-slate-800/70"><th className="p-2">Scenario</th><th>MHD</th><th>HSR</th><th>SAR</th><th>SRI</th><th>R</th><th>Trec</th></tr></thead>
          <tbody>{scenarios.map((s) => <tr key={s.key} className="border-t border-slate-800"><td className="p-2">{s.name}</td><td>{s.mhd}</td><td>{s.hsr}</td><td>{s.sar}</td><td>{s.sri}</td><td>{s.r}</td><td>{s.recoveryTime}</td></tr>)}</tbody>
        </table>
      </div>
    </section>
  );
}

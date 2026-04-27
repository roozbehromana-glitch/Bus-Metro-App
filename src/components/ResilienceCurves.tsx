import Plot from 'react-plotly.js';
import { useAppStore } from '../store';
import { resilienceCurve } from '../utils/resilienceMetrics';

export function ResilienceCurves() {
  const { scenarios, disruption } = useAppStore();
  const curves = scenarios.map((s) => ({ s, c: resilienceCurve(s, disruption.duration) }));
  return (
    <section className="glass rounded-2xl p-4 md:p-5 space-y-3">
      <div>
        <h2 className="section-title">Resilience Curve Module</h2>
        <p className="section-subtitle">Time-dependent Q(t) trajectories and normalized area-under-curve comparison.</p>
      </div>
      <Plot
        data={curves.map(({ s, c }) => ({ x: c.points.map((p) => p.t), y: c.points.map((p) => p.q), type: 'scatter', mode: 'lines', name: `${s.key} (AUC=${c.auc.toFixed(2)})`, fill: 'tozeroy', opacity: 0.28 }))}
        layout={{ paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)', font: { color: '#e2e8f0' }, xaxis: { title: 'Time (min)', gridcolor: '#334155' }, yaxis: { title: 'Normalized performance Q(t)', range: [0, 1.05], gridcolor: '#334155' }, height: 360 }}
        style={{ width: '100%' }}
        useResizeHandler
      />
    </section>
  );
}

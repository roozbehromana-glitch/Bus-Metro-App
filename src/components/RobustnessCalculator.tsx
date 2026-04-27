import { useMemo } from 'react';
import Plot from 'react-plotly.js';
import { useAppStore } from '../store';
import {
  adjacencyMatrix,
  algebraicConnectivityProxy,
  betweennessCentralityApprox,
  closenessCentrality,
  degreeCentrality,
  globalEfficiency,
  largestConnectedComponentRatio,
} from '../utils/graphMetrics';

export function RobustnessCalculator() {
  const { stations, links } = useAppStore();
  const matrix = useMemo(() => adjacencyMatrix(stations, links), [stations, links]);
  const degree = degreeCentrality(stations, links);
  const between = betweennessCentralityApprox(stations, links);
  const close = closenessCentrality(stations, links);

  const removalCurve = useMemo(() => {
    const nodesByDegree = Object.entries(degree).sort((a, b) => b[1] - a[1]).map(([id]) => id);
    const x: number[] = [];
    const y: number[] = [];
    for (let i = 0; i <= nodesByDegree.length; i++) {
      const removed = new Set(nodesByDegree.slice(0, i));
      x.push(i / Math.max(nodesByDegree.length, 1));
      y.push(largestConnectedComponentRatio(stations, links, removed));
    }
    return { x, y };
  }, [stations, links, degree]);

  const f90 = removalCurve.y.findIndex((v) => v < 0.9) / Math.max(removalCurve.x.length - 1, 1);
  const fc = removalCurve.y.findIndex((v) => v < 0.4) / Math.max(removalCurve.x.length - 1, 1);

  return (
    <section className="glass rounded-2xl p-4 md:p-5 space-y-3">
      <div>
        <h2 className="section-title">Structural Robustness Module</h2>
        <p className="section-subtitle">Graph-theoretic robustness under targeted node-removal stress tests.</p>
      </div>
      <p className="text-sm rounded-lg bg-slate-900/50 border border-white/10 p-3">R_G = {largestConnectedComponentRatio(stations, links).toFixed(3)} | Global Efficiency: {globalEfficiency(stations, links).toFixed(3)} | Algebraic connectivity (proxy): {algebraicConnectivityProxy(stations, links).toFixed(3)}</p>
      <div className="overflow-x-auto text-xs rounded-lg border border-white/10">
        <table className="w-full bg-slate-900/40"><tbody>{matrix.matrix.slice(0, 5).map((r, i) => <tr key={i}>{r.slice(0, 8).map((v, j) => <td key={j} className="border border-slate-800 px-2 py-1">{v}</td>)}</tr>)}</tbody></table>
      </div>
      <div className="grid md:grid-cols-3 text-xs gap-2">
        <pre className="rounded-lg bg-slate-900/55 border border-white/10 p-2">Degree\n{JSON.stringify(degree, null, 2)}</pre>
        <pre className="rounded-lg bg-slate-900/55 border border-white/10 p-2">Betweenness\n{JSON.stringify(between, null, 2)}</pre>
        <pre className="rounded-lg bg-slate-900/55 border border-white/10 p-2">Closeness\n{JSON.stringify(close, null, 2)}</pre>
      </div>
      <Plot
        data={[{ x: removalCurve.x, y: removalCurve.y, type: 'scatter', mode: 'lines+markers', line: { color: '#22d3ee' }, name: 'Targeted degree removal' }]}
        layout={{ paper_bgcolor: 'rgba(0,0,0,0)', plot_bgcolor: 'rgba(0,0,0,0)', font: { color: '#e2e8f0' }, title: `Robustness Curve (f90=${f90.toFixed(2)}, fc=${fc.toFixed(2)})`, xaxis: { title: 'Fraction removed nodes', gridcolor: '#334155' }, yaxis: { title: 'LCC ratio', gridcolor: '#334155' }, height: 320 }}
        style={{ width: '100%' }}
        useResizeHandler
      />
    </section>
  );
}

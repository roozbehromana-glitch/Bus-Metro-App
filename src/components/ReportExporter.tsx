import { useAppStore } from '../store';

export function ReportExporter() {
  const { stations, links, disruption, scenarios } = useAppStore();
  const exportHtml = () => {
    const html = `<!doctype html><html><body style="font-family:Inter,Arial;padding:24px;"><h1>Metro Resilience Report</h1><h2>Network Summary</h2><p>Stations: ${stations.length}, Links: ${links.length}</p><h2>Disruption</h2><p>Severity: ${disruption.severity}, Duration: ${disruption.duration} min</p><h2>Scenario Comparison</h2><pre>${JSON.stringify(scenarios, null, 2)}</pre></body></html>`;
    const blob = new Blob([html], { type: 'text/html' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'metro-resilience-report.html';
    a.click();
  };

  return <button className="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-emerald-950 hover:bg-emerald-400" onClick={exportHtml}>Export HTML Report</button>;
}

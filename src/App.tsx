import { BusBridgingRecommender } from './components/BusBridgingRecommender';
import { Dashboard } from './components/Dashboard';
import { DisruptionScenario } from './components/DisruptionScenario';
import { NetworkEditor } from './components/NetworkEditor';
import { ReportExporter } from './components/ReportExporter';
import { ResilienceCalculator } from './components/ResilienceCalculator';
import { ResilienceCurves } from './components/ResilienceCurves';
import { RobustnessCalculator } from './components/RobustnessCalculator';
import { ScenarioComparisonTable } from './components/ScenarioComparisonTable';
import { useAppStore } from './store';

function App() {
  const { reset } = useAppStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-6 md:py-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-cyan-300 text-xs uppercase tracking-[0.2em]">Decision-support dashboard</p>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">Metro Resilience & Bus Bridging</h1>
              <p className="text-sm text-slate-300">Robustness, resilience, disruption response, and strategy recommendation.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={reset} className="rounded-lg bg-amber-500 px-3 py-2 text-sm font-semibold text-amber-950 hover:bg-amber-400">Reset</button>
              <ReportExporter />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-4 md:p-6 space-y-5">
        <Dashboard />
        <div className="grid gap-5 xl:grid-cols-2">
          <NetworkEditor />
          <DisruptionScenario />
        </div>
        <RobustnessCalculator />
        <ResilienceCalculator />
        <ResilienceCurves />
        <BusBridgingRecommender />
        <ScenarioComparisonTable />
      </main>
    </div>
  );
}

export default App;

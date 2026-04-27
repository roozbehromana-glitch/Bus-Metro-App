import { useAppStore } from '../store';
import { classifySeverity } from '../utils/resilienceMetrics';

export function DisruptionScenario() {
  const { disruption, setDisruption } = useAppStore();
  const update = <K extends keyof typeof disruption>(key: K, value: (typeof disruption)[K]) => {
    const next = { ...disruption, [key]: value, severity: classifySeverity(key === 'duration' ? Number(value) : disruption.duration) };
    setDisruption(next);
  };

  return (
    <section className="glass rounded-2xl p-4 md:p-5 space-y-3">
      <div>
        <h2 className="section-title">Disruption Scenario Module</h2>
        <p className="section-subtitle">Configure event characteristics, capacity, and operating constraints.</p>
      </div>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-2 text-sm">
        <label>Duration (min)<input className="input-modern" type="number" value={disruption.duration} onChange={(e) => update('duration', Number(e.target.value))} /></label>
        <label>Baseline headway H0<input className="input-modern" type="number" value={disruption.baselineHeadway} onChange={(e) => update('baselineHeadway', Number(e.target.value))} /></label>
        <label>Disrupted headway Hd<input className="input-modern" type="number" value={disruption.disruptedHeadway} onChange={(e) => update('disruptedHeadway', Number(e.target.value))} /></label>
        <label>Passenger demand D<input className="input-modern" type="number" value={disruption.demand} onChange={(e) => update('demand', Number(e.target.value))} /></label>
        <label>Disrupted capacity Cd<input className="input-modern" type="number" value={disruption.disruptedCapacity} onChange={(e) => update('disruptedCapacity', Number(e.target.value))} /></label>
        <label>Bus capacity<input className="input-modern" type="number" value={disruption.busCapacity} onChange={(e) => update('busCapacity', Number(e.target.value))} /></label>
        <label>Bus round-trip<input className="input-modern" type="number" value={disruption.busRoundTrip} onChange={(e) => update('busRoundTrip', Number(e.target.value))} /></label>
        <label>Available fleet<input className="input-modern" type="number" value={disruption.availableFleet} onChange={(e) => update('availableFleet', Number(e.target.value))} /></label>
      </div>
      <p className="rounded-lg border border-white/10 bg-slate-900/50 p-3 text-sm">
        Severity: <b>{disruption.severity}</b>.{' '}
        {disruption.duration < 30
          ? 'Operational warning: bus bridging may be inefficient unless demand is very high.'
          : 'Duration exceeds 30 minutes; bus-bridging strategies should be evaluated.'}
      </p>
    </section>
  );
}

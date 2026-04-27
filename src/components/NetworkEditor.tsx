import { ChangeEvent, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { useAppStore } from '../store';
import { Link, Station, StationType } from '../types';
import { parseCsv } from '../utils/validation';

export function NetworkEditor() {
  const { stations, links, setStations, setLinks } = useAppStore();
  const [station, setStation] = useState<Station>({ id: '', name: '', line: 'M1', type: 'normal', latitude: 0, longitude: 0 });
  const [link, setLink] = useState<Link>({ source: '', target: '', line: 'M1', travelTime: 2 });

  const onCsv = async (e: ChangeEvent<HTMLInputElement>, kind: 'stations' | 'links') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const rows = parseCsv(await file.text());
    const header = rows[0];
    const data = rows.slice(1);
    if (kind === 'stations') {
      setStations(
        data.map((r) => ({
          id: r[header.indexOf('station_id')],
          name: r[header.indexOf('station_name')],
          line: r[header.indexOf('line')],
          type: (r[header.indexOf('type')] || 'normal') as StationType,
          latitude: Number(r[header.indexOf('latitude')]),
          longitude: Number(r[header.indexOf('longitude')]),
        })),
      );
      return;
    }
    setLinks(
      data.map((r) => ({
        source: r[header.indexOf('source')],
        target: r[header.indexOf('target')],
        line: r[header.indexOf('line')],
        travelTime: Number(r[header.indexOf('travel_time')]),
      })),
    );
  };

  return (
    <section className="glass rounded-2xl p-4 md:p-5 space-y-4">
      <div>
        <h2 className="section-title">Network Input Module</h2>
        <p className="section-subtitle">Add stations/links manually or upload CSV data for fast setup.</p>
      </div>
      <div className="grid gap-4 xl:grid-cols-2">
        <div className="rounded-xl bg-slate-900/60 border border-white/10 p-3 space-y-4">
          <div>
            <h3 className="font-semibold text-white mb-2">Add Station</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {(['id', 'name', 'line', 'latitude', 'longitude'] as const).map((f) => (
                <input key={f} className="input-modern" placeholder={f} value={String(station[f])} onChange={(e) => setStation({ ...station, [f]: f === 'latitude' || f === 'longitude' ? Number(e.target.value) : e.target.value })} />
              ))}
              <select className="input-modern" value={station.type} onChange={(e) => setStation({ ...station, type: e.target.value as StationType })}>
                <option value="terminal">terminal station</option>
                <option value="transfer">transfer station</option>
                <option value="normal">normal station</option>
                <option value="disrupted">disrupted station</option>
              </select>
              <button className="rounded-lg bg-cyan-400 px-3 py-2 font-semibold text-slate-950 hover:bg-cyan-300" onClick={() => setStations([...stations, station])}>Add Station</button>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2">Add Link</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <input className="input-modern" placeholder="source" value={link.source} onChange={(e) => setLink({ ...link, source: e.target.value })} />
              <input className="input-modern" placeholder="target" value={link.target} onChange={(e) => setLink({ ...link, target: e.target.value })} />
              <input className="input-modern" placeholder="line" value={link.line} onChange={(e) => setLink({ ...link, line: e.target.value })} />
              <input className="input-modern" type="number" placeholder="travel time" value={link.travelTime} onChange={(e) => setLink({ ...link, travelTime: Number(e.target.value) })} />
              <button className="rounded-lg bg-cyan-400 px-3 py-2 font-semibold text-slate-950 hover:bg-cyan-300" onClick={() => setLinks([...links, link])}>Add Link</button>
            </div>
          </div>
          <div className="text-sm space-y-2">
            <label className="block">Upload stations.csv<input className="mt-1 input-modern" type="file" onChange={(e) => onCsv(e, 'stations')} /></label>
            <label className="block">Upload links.csv<input className="mt-1 input-modern" type="file" onChange={(e) => onCsv(e, 'links')} /></label>
          </div>
        </div>
        <div className="rounded-xl bg-slate-900/60 border border-white/10 p-2 h-[360px]">
          <CytoscapeComponent
            style={{ width: '100%', height: '100%' }}
            elements={[
              ...stations.map((s) => ({ data: { id: s.id, label: s.name } })),
              ...links.map((l, i) => ({ data: { id: `${l.source}-${l.target}-${i}`, source: l.source, target: l.target } })),
            ]}
            layout={{ name: 'cose' }}
            stylesheet={[
              { selector: 'node', style: { label: 'data(label)', color: '#e2e8f0', 'font-size': 10, 'text-wrap': 'wrap', 'background-color': '#22d3ee' } },
              { selector: 'edge', style: { width: 2, 'line-color': '#475569' } },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

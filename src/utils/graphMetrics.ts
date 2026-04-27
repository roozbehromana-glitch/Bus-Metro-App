import { Link, Station } from '../types';

const neighbors = (stations: Station[], links: Link[], excluded = new Set<string>()) => {
  const adj = new Map<string, string[]>();
  stations.forEach((s) => !excluded.has(s.id) && adj.set(s.id, []));
  links.forEach((l) => {
    if (adj.has(l.source) && adj.has(l.target)) {
      adj.get(l.source)!.push(l.target);
      adj.get(l.target)!.push(l.source);
    }
  });
  return adj;
};

export const adjacencyMatrix = (stations: Station[], links: Link[]) => {
  const ids = stations.map((s) => s.id);
  const matrix = ids.map(() => ids.map(() => 0));
  links.forEach((l) => {
    const i = ids.indexOf(l.source);
    const j = ids.indexOf(l.target);
    if (i >= 0 && j >= 0) matrix[i][j] = matrix[j][i] = 1;
  });
  return { ids, matrix };
};

export const degreeCentrality = (stations: Station[], links: Link[]) => {
  const adj = neighbors(stations, links);
  return Object.fromEntries([...adj.entries()].map(([k, v]) => [k, v.length]));
};

const bfsDistances = (adj: Map<string, string[]>, source: string) => {
  const dist: Record<string, number> = Object.fromEntries([...adj.keys()].map((n) => [n, Infinity]));
  dist[source] = 0;
  const q = [source];
  while (q.length) {
    const n = q.shift()!;
    adj.get(n)?.forEach((next) => {
      if (dist[next] === Infinity) {
        dist[next] = dist[n] + 1;
        q.push(next);
      }
    });
  }
  return dist;
};

export const closenessCentrality = (stations: Station[], links: Link[]) => {
  const adj = neighbors(stations, links);
  const result: Record<string, number> = {};
  [...adj.keys()].forEach((s) => {
    const d = bfsDistances(adj, s);
    const finite = Object.values(d).filter((v) => Number.isFinite(v));
    const sum = finite.reduce((a, b) => a + b, 0);
    result[s] = finite.length > 1 ? (finite.length - 1) / sum : 0;
  });
  return result;
};

export const betweennessCentralityApprox = (stations: Station[], links: Link[]) => {
  const adj = neighbors(stations, links);
  const nodes = [...adj.keys()];
  const score: Record<string, number> = Object.fromEntries(nodes.map((n) => [n, 0]));
  nodes.forEach((s) => {
    const dist = bfsDistances(adj, s);
    nodes.forEach((t) => {
      if (s !== t && Number.isFinite(dist[t])) {
        adj.get(t)?.forEach((p) => {
          if (dist[p] + 1 === dist[t]) score[p] += 1 / (dist[t] || 1);
        });
      }
    });
  });
  return score;
};

export const largestConnectedComponentRatio = (stations: Station[], links: Link[], removed = new Set<string>()) => {
  const adj = neighbors(stations, links, removed);
  const visited = new Set<string>();
  let maxSize = 0;
  [...adj.keys()].forEach((start) => {
    if (visited.has(start)) return;
    const stack = [start];
    let size = 0;
    while (stack.length) {
      const n = stack.pop()!;
      if (visited.has(n)) continue;
      visited.add(n);
      size += 1;
      adj.get(n)?.forEach((m) => !visited.has(m) && stack.push(m));
    }
    maxSize = Math.max(maxSize, size);
  });
  return adj.size === 0 ? 0 : maxSize / adj.size;
};

export const globalEfficiency = (stations: Station[], links: Link[]) => {
  const adj = neighbors(stations, links);
  const nodes = [...adj.keys()];
  let sum = 0;
  let count = 0;
  nodes.forEach((s) => {
    const d = bfsDistances(adj, s);
    nodes.forEach((t) => {
      if (s !== t) {
        count += 1;
        if (Number.isFinite(d[t]) && d[t] > 0) sum += 1 / d[t];
      }
    });
  });
  return count ? sum / count : 0;
};

export const algebraicConnectivityProxy = (stations: Station[], links: Link[]) => {
  const ratio = largestConnectedComponentRatio(stations, links);
  const density = (2 * links.length) / Math.max(1, stations.length * (stations.length - 1));
  return ratio * density;
};

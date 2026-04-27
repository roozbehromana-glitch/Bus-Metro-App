import { DisruptionInput, Link, ScenarioMetrics, Station } from '../types';

export const sampleStations: Station[] = [
  { id: 'S1', name: 'Nord Hub', line: 'M1', type: 'transfer', latitude: 44.47, longitude: 26.04 },
  { id: 'S2', name: 'Aviatiei', line: 'M1', type: 'normal', latitude: 44.48, longitude: 26.07 },
  { id: 'S3', name: 'Piata Metro', line: 'M1', type: 'transfer', latitude: 44.44, longitude: 26.1 },
  { id: 'S4', name: 'Unirii Core', line: 'M1', type: 'transfer', latitude: 44.43, longitude: 26.11 },
  { id: 'S5', name: 'Timpuri Noi', line: 'M1', type: 'normal', latitude: 44.42, longitude: 26.13 },
  { id: 'S6', name: 'Dristor', line: 'M1', type: 'transfer', latitude: 44.42, longitude: 26.15 },
  { id: 'S7', name: 'Pantelimon', line: 'M1', type: 'terminal', latitude: 44.45, longitude: 26.18 },
  { id: 'S8', name: 'Eroilor', line: 'M3', type: 'transfer', latitude: 44.44, longitude: 26.08 },
  { id: 'S9', name: 'Politehnica', line: 'M3', type: 'normal', latitude: 44.44, longitude: 26.06 },
  { id: 'S10', name: 'Preciziei', line: 'M3', type: 'terminal', latitude: 44.43, longitude: 26.03 },
  { id: 'S11', name: 'Gara Sud', line: 'M2', type: 'transfer', latitude: 44.41, longitude: 26.09 },
  { id: 'S12', name: 'Brancoveanu', line: 'M2', type: 'normal', latitude: 44.4, longitude: 26.11 },
  { id: 'S13', name: 'Berceni', line: 'M2', type: 'terminal', latitude: 44.38, longitude: 26.12 },
];

export const sampleLinks: Link[] = [
  { source: 'S1', target: 'S2', line: 'M1', travelTime: 3 },
  { source: 'S2', target: 'S3', line: 'M1', travelTime: 4 },
  { source: 'S3', target: 'S4', line: 'M1', travelTime: 2 },
  { source: 'S4', target: 'S5', line: 'M1', travelTime: 3 },
  { source: 'S5', target: 'S6', line: 'M1', travelTime: 3 },
  { source: 'S6', target: 'S7', line: 'M1', travelTime: 4 },
  { source: 'S8', target: 'S3', line: 'M3', travelTime: 2 },
  { source: 'S8', target: 'S9', line: 'M3', travelTime: 3 },
  { source: 'S9', target: 'S10', line: 'M3', travelTime: 5 },
  { source: 'S11', target: 'S4', line: 'M2', travelTime: 2 },
  { source: 'S11', target: 'S12', line: 'M2', travelTime: 3 },
  { source: 'S12', target: 'S13', line: 'M2', travelTime: 4 },
  { source: 'S3', target: 'S11', line: 'X', travelTime: 3 },
  { source: 'S6', target: 'S11', line: 'X', travelTime: 4 },
];

export const defaultDisruption: DisruptionInput = {
  disruptedNodes: ['S4'],
  disruptedEdges: [{ source: 'S3', target: 'S4' }],
  startTime: '08:00',
  duration: 70,
  severity: 'Major',
  baselineHeadway: 6,
  disruptedHeadway: 10,
  recoveryNoIntervention: 55,
  demand: 6000,
  disruptedCapacity: 2200,
  busCapacity: 85,
  busRoundTrip: 42,
  walkingThreshold: 500,
  transferPenalty: 5,
  roadCongestion: 1.2,
  availableFleet: 40,
  alpha: 0.85,
};

export const defaultScenarioMetrics: ScenarioMetrics[] = [
  { key: 'A', name: 'Metro-only baseline', mhd: 4, hsr: 0.33, sar: 0.82, sri: 0.46, r: 0.54, recoveryTime: 55 },
  { key: 'B', name: 'Standard Bus Bridging', mhd: 2.5, hsr: 0.58, sar: 0.9, sri: 0.53, r: 0.67, recoveryTime: 40 },
  { key: 'C', name: 'Extended / Parallel Bus Bridging', mhd: 1.5, hsr: 0.75, sar: 0.95, sri: 0.63, r: 0.78, recoveryTime: 30 },
];

export type StationType = 'terminal' | 'transfer' | 'normal' | 'disrupted';

export interface Station {
  id: string;
  name: string;
  line: string;
  type: StationType;
  latitude: number;
  longitude: number;
}

export interface Link {
  source: string;
  target: string;
  line: string;
  travelTime: number;
}

export interface DisruptionInput {
  disruptedNodes: string[];
  disruptedEdges: Array<{ source: string; target: string }>;
  startTime: string;
  duration: number;
  severity: 'Minor' | 'Moderate' | 'Major';
  baselineHeadway: number;
  disruptedHeadway: number;
  recoveryNoIntervention: number;
  demand: number;
  disruptedCapacity: number;
  busCapacity: number;
  busRoundTrip: number;
  walkingThreshold: number;
  transferPenalty: number;
  roadCongestion: number;
  availableFleet: number;
  alpha: number;
}

export interface ScenarioMetrics {
  key: 'A' | 'B' | 'C';
  name: string;
  mhd: number;
  hsr: number;
  sar: number;
  sri: number;
  r: number;
  recoveryTime: number;
}

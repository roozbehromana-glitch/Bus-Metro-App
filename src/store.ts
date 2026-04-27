import { create } from 'zustand';
import { DisruptionInput, Link, ScenarioMetrics, Station } from './types';
import { defaultDisruption, defaultScenarioMetrics, sampleLinks, sampleStations } from './utils/sampleNetwork';

interface AppState {
  stations: Station[];
  links: Link[];
  disruption: DisruptionInput;
  scenarios: ScenarioMetrics[];
  weights: { w1: number; w2: number; w3: number };
  setStations: (stations: Station[]) => void;
  setLinks: (links: Link[]) => void;
  setDisruption: (d: DisruptionInput) => void;
  setScenarios: (s: ScenarioMetrics[]) => void;
  setWeights: (w: { w1: number; w2: number; w3: number }) => void;
  reset: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  stations: sampleStations,
  links: sampleLinks,
  disruption: defaultDisruption,
  scenarios: defaultScenarioMetrics,
  weights: { w1: 0.4, w2: 0.3, w3: 0.3 },
  setStations: (stations) => set({ stations }),
  setLinks: (links) => set({ links }),
  setDisruption: (disruption) => set({ disruption }),
  setScenarios: (scenarios) => set({ scenarios }),
  setWeights: (weights) => set({ weights }),
  reset: () =>
    set({
      stations: sampleStations,
      links: sampleLinks,
      disruption: defaultDisruption,
      scenarios: defaultScenarioMetrics,
      weights: { w1: 0.4, w2: 0.3, w3: 0.3 },
    }),
}));

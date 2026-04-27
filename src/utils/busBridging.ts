import { DisruptionInput, ScenarioMetrics } from '../types';

export const requiredBusFrequency = (demand: number, cd: number, alpha: number, busCapacity: number) => {
  return Math.max(0, (demand - cd) / Math.max(alpha * busCapacity, 1));
};

export const requiredFleet = (freq: number, roundTrip: number) => (freq * roundTrip) / 60;

export const recommendStrategy = (
  disruption: DisruptionInput,
  metrics: ScenarioMetrics[],
  transferImpacted: boolean,
) => {
  const freq = requiredBusFrequency(disruption.demand, disruption.disruptedCapacity, disruption.alpha, disruption.busCapacity);
  const fleetNeed = requiredFleet(freq, disruption.busRoundTrip) * disruption.roadCongestion;
  if (disruption.duration < 30 && disruption.demand < 3500) {
    return { strategy: 'A', explanation: 'Short disruption and lower demand favor short-turn metro operations.', freq, fleetNeed };
  }
  if ((disruption.duration <= 60 && disruption.availableFleet < 30 && !transferImpacted) || disruption.demand < 5000) {
    return { strategy: 'B', explanation: 'Moderate event with constrained fleet suggests focused bridging on core segment.', freq, fleetNeed };
  }
  const best = metrics.reduce((a, b) => (a.r > b.r ? a : b));
  return {
    strategy: best.key,
    explanation: 'Major/transfer-sensitive disruption and high demand favor extended parallel bridging.',
    freq,
    fleetNeed,
  };
};

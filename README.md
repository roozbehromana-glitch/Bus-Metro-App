# Metro Resilience & Bus Bridging Decision-Support Web App

Professional React + TypeScript dashboard for metro robustness and resilience analysis under disruption scenarios, with bus-bridging strategy recommendations.

## Installation

```bash
npm install
npm run dev
```

Open the local URL in Chrome.

## Data format

- `stations.csv`: `station_id, station_name, line, type, latitude, longitude`
- `links.csv`: `source, target, line, travel_time`
- `disruption.csv`: `disrupted_nodes, disrupted_edges, start_time, duration, severity`

## Formulas used

- Structural robustness: `R_G = N_c / N`
- Mean Headway Deviation: `MHD = |H_d - H_0|`
- Headway Stability Ratio: `HSR = 1 - MHD/H0`
- Composite resilience: `R = w1*HSR + w2*SAR + w3*SRI`
- Improvement: `(R_strategy - R_baseline) / R_baseline * 100`
- Recovery reduction: `(T_baseline - T_strategy) / T_baseline * 100`
- Required bus frequency: `f_b >= (D - C_d)/(alpha*bus_capacity)`
- Required fleet size: `B = f_b*T_round/60`
- Resilience AUC: `(1/T) * integral(Q(t) dt)`

## Assumptions

- Undirected metro graph with simplified topological metrics.
- Severity thresholds: Minor `<30 min`, Moderate `30–60 min`, Major `>60 min`.
- Recommender combines rule-based logic and scenario metric ranking.
- Default sample includes a Bucharest-style reduced 13-node, 14-link backbone.

## Modules

- Dashboard
- Network editor + CSV upload
- Structural robustness metrics + robustness curve
- Disruption scenario definition
- Operational resilience and scenario comparison
- Time-dependent resilience curves (A/B/C)
- Bus-bridging strategy recommender
- Report exporter (HTML)


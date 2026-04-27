export const validateWeights = (w1: number, w2: number, w3: number) => Math.abs(w1 + w2 + w3 - 1) < 0.001;

export const parseCsv = (text: string) =>
  text
    .trim()
    .split('\n')
    .map((r) => r.split(',').map((c) => c.trim()));

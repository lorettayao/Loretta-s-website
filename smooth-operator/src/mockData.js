
export const mockRaceState = {
  raceId: 'monza-2025',
  currentLap: 15,
  totalLaps: 53,
  weather: 'Sunny (88% Chance of Croissants)',
  trackTempC: 45,
  carlosMoodIndex: 78, // (1-100) - The core comedy metric
  pittingWindowOpen: true,
  leader: 'Max Verstappen',
  carlosPosition: 4,
  lapTimeSeconds: 98.765,
  tireData: [
    // Data for the main chart
    { lap: 1, degradation: 0.1, compound: 'Medium' },
    { lap: 5, degradation: 0.25, compound: 'Medium' },
    { lap: 10, degradation: 0.45, compound: 'Medium' },
    { lap: 15, degradation: 0.70, compound: 'Medium' },
    // ... more data points for the graph
  ]
};
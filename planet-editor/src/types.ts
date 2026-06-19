export interface PlanetState {
  risk: number;        // 0 to 100 (Green -> Pink -> Red)
  sensory: number;     // 0 to 100 (0 = L-end, 100 = V-end)
  rhythm: number;      // 0 to 100 (0 = D-end, 100 = O-end)
  specificity: number; // 0 to 100 (0 = C-end, 100 = K-end)
  danger: number;      // 0 to 100 (0 = A-end, 100 = G-end)
  crackSize: number;   // 10 to 200 (size multiplier in percentage)
  patternDensity: number; // number of patterns per ring (typically 2 to 24)
  strokeWidth: number; // stroke thickness multiplier
  cWaveSpan: number;   // 0 to 100 (distribution vertical span for waves)
  cDotSpan: number;    // 0 to 100 (distribution vertical span for pink dots)
  kChiliSpan: number;  // 0 to 100 (distribution vertical span for chilis)
  kDotsSpan: number;   // 0 to 100 (distribution vertical span for three-dots)
}

export interface Preset {
  name: string;
  nameEn: string;
  description: string;
  state: PlanetState;
}

export interface RingDot {
  id: number;
  baseAngle: number;       // Angle along the orbital path (0 to 360 degrees)
  sizeMultiplier: number;  // Visual scale variation for gravel feeling
  orbitRadiusOffset: number; // Slight radial variation for dust cloud width
}

export interface SpherePattern {
  id: number;
  lat: number;   // Latitude on sphere in degrees (-90 to 90)
  lon: number;   // Initial longitude on sphere in degrees (0 to 360)
  type: 'chili' | 'threedots' | 'wave' | 'pinkdot';
  ringId: 1 | 2; // Which of the two rings it belongs to
}

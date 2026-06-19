import { useState, useEffect, useRef, useMemo } from 'react';
import { PlanetState, RingDot, SpherePattern } from '../types';

interface CustomPatterns {
  cWave: string | null;
  cWaveSize: number;
  cDot: string | null;
  cDotSize: number;
  kChili: string | null;
  kChiliSize: number;
  kDots: string | null;
  kDotsSize: number;
}

interface PlanetCanvasProps {
  state: PlanetState;
  isPlaying: boolean;
  rotationSpeed: number; // multiplier
  customPatterns: CustomPatterns;
}

// 5 pre-calculated hand-drawn jitter tables to simulate line boiling (8-12Hz)
const JITTER_PROFILES = [
  [0.5, -0.8, 1.1, -0.4, 0.9, -1.2, 0.6, -0.9, 0.4, -1.1, 0.8, -0.5, 1.0, -0.7, 0.5, -0.9, 1.1, -0.6, 0.8, -0.4],
  [-0.6, 0.9, -0.4, 1.1, -0.8, 0.5, -1.0, 0.8, -0.5, 0.9, -1.1, 0.7, -0.9, 0.4, -0.8, 1.0, -0.5, 0.9, -0.7, 0.6],
  [0.8, -0.5, 1.0, -0.9, 0.4, -1.1, 0.7, -0.6, 0.9, -0.4, 0.8, -1.0, 0.5, -0.8, 1.1, -0.7, 0.4, -0.9, 1.0, -0.5],
  [-0.9, 0.4, -1.1, 0.8, -0.5, 0.9, -0.8, 1.1, -0.6, 0.8, -0.4, 1.0, -0.7, 0.5, -0.9, 0.6, -1.0, 0.4, -0.8, 0.9],
  [0.4, -1.1, 0.7, -0.5, 1.0, -0.8, 0.5, -0.9, 1.1, -0.7, 0.9, -0.4, 0.8, -1.0, 0.4, -0.9, 0.7, -0.5, 1.1, -0.8]
];

// Helper to interpolate solid hex colors for rings/borders to ensure exact aesthetic match
const hexToRgb = (hex: string): [number, number, number] => {
  const num = parseInt(hex.slice(1), 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
};

const rgbToHex = (r: number, g: number, b: number): string => {
  return '#' + [r, g, b].map(x => Math.round(x).toString(16).padStart(2, '0')).join('');
};

export const getPlanetColor = (risk: number): string => {
  if (risk <= 33) return '#74D188'; // Green
  if (risk <= 66) {
    const p = (risk - 33) / 33;
    const c1 = hexToRgb('#74D188');
    const c2 = hexToRgb('#FFC1DF');
    return rgbToHex(
      c1[0] + (c2[0] - c1[0]) * p,
      c1[1] + (c2[1] - c1[1]) * p,
      c1[2] + (c2[2] - c1[2]) * p
    );
  } else {
    const p = (risk - 66) / 34;
    const c1 = hexToRgb('#FFC1DF');
    const c2 = hexToRgb('#FF4800');
    return rgbToHex(
      c1[0] + (c2[0] - c1[0]) * p,
      c1[1] + (c2[1] - c1[1]) * p,
      c1[2] + (c2[2] - c1[2]) * p
    );
  }
};

export default function PlanetCanvas({ state, isPlaying, rotationSpeed, customPatterns }: PlanetCanvasProps) {
  const { risk, sensory, rhythm, specificity, danger, crackSize, patternDensity, strokeWidth } = state;
  const baseStrokeWidth = strokeWidth !== undefined ? strokeWidth : 2.5;

  const [tick, setTick] = useState(0);

  // Maintain continuous angle variables for rotation
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  // Animation ticks for seamless gameplay loop
  useEffect(() => {
    const animate = (time: number) => {
      if (previousTimeRef.current !== null) {
        const delta = time - previousTimeRef.current;
        if (isPlaying) {
          // 0.05 is standard incremental scale for natural 3D rotation feel
          setTick(prev => prev + delta * 0.04 * rotationSpeed);
        }
      }
      previousTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, rotationSpeed]);

  // Derived 12Hz frame index for hand-drawn line boiling (jitter effect)
  const jitterFrame = useMemo(() => {
    return Math.floor(tick / 5) % 5;
  }, [tick]);

  // Unified angular rotation offset ensuring planet core slits, chilis, and outer rings spin in tight locked step
  const rotationOffset = tick * 0.4;

  // Generate stable ring dots once (75 dots for ultra smooth continuous merging)
  const ringDots = useMemo<RingDot[]>(() => {
    const dots: RingDot[] = [];
    const count = 75;
    for (let i = 0; i < count; i++) {
      dots.push({
        id: i,
        baseAngle: (i * 360) / count,
        sizeMultiplier: 0.6 + Math.random() * 0.8, // 0.6x to 1.4x size variation
        orbitRadiusOffset: -12 + Math.random() * 24, // -12px to +12px radial offset
      });
    }
    return dots;
  }, []);

  // Generate stable sphere patterns once dynamically based on the configured pattern density
  const spherePatterns = useMemo<SpherePattern[]>(() => {
    const list: SpherePattern[] = [];
    const latitudes = [25, -25]; // Two horizontal rings on planet surface
    const density = patternDensity || 8;

    // Place dynamic items per ring, alternating type between Wave/Chili and Dot/Spot
    latitudes.forEach((lat, ringIdx) => {
      for (let i = 0; i < density; i++) {
        const baseLon = (i * 360) / density;
        // Distribute nicely with subtle hand-made random offsets
        const offset = -12 + (i * 17 + lat * 3) % 25; 
        list.push({
          id: ringIdx * density + i,
          lat: lat,
          lon: baseLon + offset,
          type: i % 2 === 0 ? 'wave' : 'pinkdot', // wave / chili on even, pinkdot / threedots on odd
          ringId: (ringIdx + 1) as 1 | 2
        });
      }
    });

    return list;
  }, [patternDensity]);

  // Compute three-point linear gradient color stops based on sinuous spread factor
  const planetColors = useMemo(() => {
    const spread = 28 * Math.sin((risk / 100) * Math.PI);
    const topVal = Math.min(100, risk + spread);
    const bottomVal = Math.max(0, risk - spread);
    return {
      top: getPlanetColor(topVal),
      mid: getPlanetColor(risk),
      bottom: getPlanetColor(bottomVal),
    };
  }, [risk]);

  // Center coordinates
  const CX = 250;
  const CY = 250;
  const R_PLANET = 100;

  // --- 1. SENSORY STIMULATION BACKGROUND OUTLINES ---
  // Renders 3 layers of outer concentric contours that morph from L-end (Circles) to V-end (Explosion Spikes)
  const renderSensoryBackground = () => {
    const layers = [
      { rBase: 145, pulseSpeed: 2.8, pulsePhase: 0 },
      { rBase: 128, pulseSpeed: 2.8, pulsePhase: 1.2 },
      { rBase: 112, pulseSpeed: 2.8, pulsePhase: 2.4 }
    ];

    const numPoints = 64; // Enhanced point count for extremely detailed manga explosion teeth
    const tSensory = sensory / 100;

    return layers.map((layer, index) => {
      // Loop pulse scale: breathing expand and shrink
      const timeSec = tick * 0.015;
      const scaleMultiplier = 1.0 + 0.04 * Math.sin(timeSec * layer.pulseSpeed + layer.pulsePhase);
      
      const vertices: [number, number][] = [];

      for (let j = 0; j < numPoints; j++) {
        const theta = (j * 2 * Math.PI) / numPoints;
        const deg = (j * 360) / numPoints;

        // L-End Circle component (gently handdrawn, slight sinusoid variation)
        const rL = layer.rBase + Math.sin(deg * 3 * Math.PI / 180) * 3 + Math.cos(deg * 5 * Math.PI / 180) * 2;

        // V-End High-intensity sharp manga shockwave / explosion spiky teeth
        // We create sharp, uneven comic peaks using trigonometric sawtooth models
        const teethCount = 10;
        const thetaScaled = theta * teethCount;
        const toothVal = Math.abs((thetaScaled % (2 * Math.PI)) - Math.PI) / Math.PI; // sawtooth wave [0, 1]
        const sharpSpike = Math.pow(toothVal, 3.2) * 52 - 10;
        
        // Add random high-energy hand-drawn jitter noise
        const rV = layer.rBase + sharpSpike + Math.sin(deg * 13 * Math.PI / 180) * 5;

        // Interpolated radius
        const rInterp = (1 - tSensory) * rL + tSensory * rV;
        const rFinal = rInterp * scaleMultiplier;

        // Multi-frame line boil jitter applied to vertex scale
        const jitTable = JITTER_PROFILES[(jitterFrame + index) % 5];
        const jitValue = jitTable[j % jitTable.length] * 0.8;
        const rJittered = rFinal + jitValue;

        const px = CX + rJittered * Math.cos(theta);
        const py = CY + rJittered * Math.sin(theta);
        vertices.push([px, py]);
      }

      const pathData = `M ${vertices[0][0]},${vertices[0][1]} ` + 
        vertices.slice(1).map(v => `L ${v[0]},${v[1]}`).join(' ') + ' Z';

      return (
        <path
          key={`sensory-bg-layer-${index}`}
          id={`sensory-bg-path-${index}`}
          d={pathData}
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth={baseStrokeWidth}
          strokeLinejoin="round"
        />
      );
    });
  };

  // --- 2. THE PLANET RING GRAPHICS ENGINE (Depth split) ---
  // Semi-major and semi-minor axes for ring layout
  const rx = 215;
  const ry = 42;
  const rotAngleDeg = -14; // Elegant orbital slant
  const rotRad = (rotAngleDeg * Math.PI) / 180;
  const cosRot = Math.cos(rotRad);
  const sinRot = Math.sin(rotRad);

  // Compute 2D coordinates of a dot on the tilted orbital ellipse
  const getOrbitPosition = (angleDeg: number, orbitOffset: number) => {
    const angleRad = (angleDeg * Math.PI) / 180;
    
    // Rhythm factor controls how dust/gravel particles clump onto the narrow continuous track
    const rhythmFactor = rhythm / 100;
    const actualOffset = orbitOffset * (1 - rhythmFactor);

    const x_unrot = rx * Math.cos(angleRad) + actualOffset * Math.cos(angleRad);
    const y_unrot = ry * Math.sin(angleRad) + actualOffset * Math.sin(angleRad);

    const x = x_unrot * cosRot - y_unrot * sinRot + CX;
    const y = x_unrot * sinRot + y_unrot * cosRot + CY + 20; // Shifted vertically downwards by 20px so planet patterns are fully exposed

    return { x, y };
  };

  // Divide the orbital dots into Back dots (behind the sphere) and Front dots (in front of the sphere)
  const processDots = () => {
    const backGroup: { cx: number; cy: number; r: number }[] = [];
    const frontGroup: { cx: number; cy: number; r: number }[] = [];

    const rhythmFactor = rhythm / 100;

    ringDots.forEach(dot => {
      // Calculate animated rotating longitude using the exact same synchronized rotating tick
      const currentAngle = (dot.baseAngle + rotationOffset) % 360;
      const angleNormalized = currentAngle < 0 ? currentAngle + 360 : currentAngle;

      const { x, y } = getOrbitPosition(angleNormalized, dot.orbitRadiusOffset);

      // Multi-frame random jitter
      const jitTable = JITTER_PROFILES[(jitterFrame + dot.id) % 5];
      const jVal = jitTable[dot.id % jitTable.length] * 0.7;

      // Calculate radius matching rhythm slider
      const rDext = dot.sizeMultiplier * 4.2;
      const rOext = 16.5; 
      const radius = (1 - rhythmFactor) * rDext + rhythmFactor * rOext + (rhythmFactor > 0.1 ? 0 : jVal);

      // Check depth using normal angle coordinate (ellipse top half is behind, which is 180 to 360 degrees)
      const isBack = angleNormalized >= 180 && angleNormalized < 360;

      const element = {
        cx: x + (rhythmFactor > 0.1 ? 0 : jVal * 0.3),
        cy: y + (rhythmFactor > 0.1 ? 0 : jVal * 0.3),
        r: Math.max(1.5, radius)
      };

      if (isBack) {
        backGroup.push(element);
      } else {
        frontGroup.push(element);
      }
    });

    return { backGroup, frontGroup };
  };

  const { backGroup, frontGroup } = useMemo(processDots, [ringDots, rotationOffset, rhythm, jitterFrame]);

  // SVG group builders using stroke-underlay key to merge overlaying geometries smoothly
  const renderRingGroup = (elements: { cx: number; cy: number; r: number }[]) => {
    if (elements.length === 0) return null;
    return (
      <g>
        {/* Layer 1 (Underlay black stroke) */}
        <g fill="#000000" stroke="#000000" strokeWidth={4 * (baseStrokeWidth / 2.5)} strokeLinejoin="round">
          {elements.map((el, i) => (
            <circle key={`stroke-${i}`} cx={el.cx} cy={el.cy} r={el.r} />
          ))}
        </g>
        {/* Layer 2 (Overlay solid color fills matching planet) */}
        <g fill={planetColors.mid}>
          {elements.map((el, i) => (
            <circle key={`fill-${i}`} cx={el.cx} cy={el.cy} r={el.r - 0.5 * (baseStrokeWidth / 2.5)} />
          ))}
        </g>
      </g>
    );
  };


  // --- 3. SPECFICITY PATTERNS ON ROTATING 3D SPHERE ---
  const renderSphereDecorations = () => {
    const specFactor = specificity / 100;

    const cWaveSpan = state.cWaveSpan !== undefined ? state.cWaveSpan : 12;
    const cDotSpan = state.cDotSpan !== undefined ? state.cDotSpan : 12;
    const kChiliSpan = state.kChiliSpan !== undefined ? state.kChiliSpan : 12;
    const kDotsSpan = state.kDotsSpan !== undefined ? state.kDotsSpan : 12;

    // Helper for deterministic offset scale in [-1, 1]
    const getDeterministicFactor = (id: number) => {
      const hash = Math.sin(id * 12.9898) * 43758.5453123;
      return (hash - Math.floor(hash)) * 2 - 1;
    };

    return spherePatterns.map(pat => {
      // Binary switch at the 50% middle threshold (specificity >= 50 or specFactor >= 0.5)
      const isKEnd = specFactor >= 0.5;

      // K shape matches index (even longitude = orange chili, odd longitude = brown three-dots)
      const isEven = pat.id % 2 === 0;

      // Determine active pattern span
      let activeSpan = 12;
      if (isKEnd) {
        activeSpan = isEven ? kChiliSpan : kDotsSpan;
      } else {
        activeSpan = isEven ? cWaveSpan : cDotSpan;
      }

      // Calculate latitude shifted by the configured distribution width
      const randomFactor = getDeterministicFactor(pat.id);
      const latOffset = randomFactor * (activeSpan / 100) * 32; // max ±32 degrees shift at 100%
      const finalLat = pat.lat + latOffset;

      // Rotate longitude around the sphere (subtraction for leftward direction)
      const lonRotated = (pat.lon - rotationOffset) % 360;
      const lonRad = (lonRotated * Math.PI) / 180;
      const latRad = (finalLat * Math.PI) / 180;

      // 3D Spherical Coordinates (R, Longitude, Latitude) aligned to spherical wrapper radius
      const R_decor = 92;
      const x_3d = R_decor * Math.cos(latRad) * Math.sin(lonRad);
      const y_3d = R_decor * Math.sin(latRad);
      const z_3d = R_decor * Math.cos(latRad) * Math.cos(lonRad);

      // Hide if on the back hemisphere of the planet
      if (z_3d < 0) return null;

      // Project with a small aesthetic rotation/axis tilt
      const tiltRad = (-10 * Math.PI) / 180;
      const px = x_3d * Math.cos(tiltRad) - y_3d * Math.sin(tiltRad) + CX;
      const py = x_3d * Math.sin(tiltRad) + y_3d * Math.cos(tiltRad) + CY;

      // Gorgeous 3D wrap scaling (horizontally squeeze near limbs to simulate wrapping cylinder sphere)
      const scaleX_3d = Math.max(0.12, z_3d / R_decor);

      // Cancel pattern shake/jitter for stable rotation
      const finalX = px;
      const finalY = py;

      return (
        <g key={`pattern-group-${pat.id}`} style={{ pointerEvents: 'none' }}>
          {/* C-End Patterns: Blue waves (even) or pink dots (odd) */}
          {!isKEnd && (
            <g
              transform={`translate(${finalX}, ${finalY}) scale(0.95, 0.95)`}
              opacity={1}
            >
              {isEven ? (
                customPatterns.cWave ? (
                  <image
                    href={customPatterns.cWave}
                    x={-15 * (customPatterns.cWaveSize / 100)}
                    y={-15 * (customPatterns.cWaveSize / 100)}
                    width={30 * (customPatterns.cWaveSize / 100)}
                    height={30 * (customPatterns.cWaveSize / 100)}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  // Blue wave pattern filled with #78C0FF, black outline
                  <path
                    d="M -15,0 C -10,-8 -5,-8 0,0 C 5,8 10,8 15,0 L 12,6 C 8,12 3,12 -2,4 C -7,-4 -11,-4 -15,0 Z"
                    fill="#78C0FF"
                    stroke="#000000"
                    strokeWidth={1.8 * (baseStrokeWidth / 2.5)}
                    strokeLinejoin="round"
                  />
                )
              ) : (
                customPatterns.cDot ? (
                  <image
                    href={customPatterns.cDot}
                    x={-10 * (customPatterns.cDotSize / 100)}
                    y={-10 * (customPatterns.cDotSize / 100)}
                    width={20 * (customPatterns.cDotSize / 100)}
                    height={20 * (customPatterns.cDotSize / 100)}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  // Pink dot pattern filled with #FFC1DF, black outline
                  <circle
                    cx="0"
                    cy="0"
                    r="7.5"
                    fill="#FFC1DF"
                    stroke="#000000"
                    strokeWidth={1.8 * (baseStrokeWidth / 2.5)}
                  />
                )
              )}
            </g>
          )}

          {/* K-End Patterns: Orange chilis (even) or brown three-dots (odd) */}
          {isKEnd && (
            <g
              transform={`translate(${finalX}, ${finalY}) scale(0.95, 0.95)`}
              opacity={1}
            >
              {isEven ? (
                customPatterns.kChili ? (
                  <image
                    href={customPatterns.kChili}
                    x={-15 * (customPatterns.kChiliSize / 100)}
                    y={-15 * (customPatterns.kChiliSize / 100)}
                    width={30 * (customPatterns.kChiliSize / 100)}
                    height={30 * (customPatterns.kChiliSize / 100)}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  // Chili shaped drawing, filled with Orange #FF9000, black outline
                  <path
                    d="M -4,-11 C -4,-11 0,-14 3,-12 C 6,-10 9,-6 8,-1 C 7,5 2,11 -6,14 C -2,8 -2,2 -3,-2 C -4,-6 -5,-9 -4,-11 Z"
                    fill="#FF9000"
                    stroke="#000000"
                    strokeWidth={1.8 * (baseStrokeWidth / 2.5)}
                    strokeLinejoin="round"
                  />
                )
              ) : (
                customPatterns.kDots ? (
                  <image
                    href={customPatterns.kDots}
                    x={-12 * (customPatterns.kDotsSize / 100)}
                    y={-12 * (customPatterns.kDotsSize / 100)}
                    width={24 * (customPatterns.kDotsSize / 100)}
                    height={24 * (customPatterns.kDotsSize / 100)}
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  // Three-dots pattern filled with Red-Brown #7E0001, black outlines
                  <g stroke="#000000" strokeWidth={1.5 * (baseStrokeWidth / 2.5)}>
                    <circle cx="-4" cy="-3" r="3.2" fill="#7E0001" />
                    <circle cx="4" cy="-3" r="3.2" fill="#7E0001" />
                    <circle cx="0" cy="4" r="3.2" fill="#7E0001" />
                  </g>
                )
              )}
            </g>
          )}
        </g>
      );
    });
  };

  // --- 4. DANGER PLANET CRACKS (G端 to A端) ---
  const renderDangerCrack = () => {
    if (danger < 50) return null;

    // Fixed full size once visible (binary on/off), scaled solely by user-editable state.crackSize
    const crackScale = crackSize / 100;

    // Statically position at the upper right of the planet (星球右上方) and vibrate/jitter (抖动)
    const px = CX + 42;
    const py = CY - 42;

    // Multi-frame high speed vibrating jitter values
    const jitTable = JITTER_PROFILES[jitterFrame % 5];
    const jitX = jitTable[0] * 2.2;
    const jitY = jitTable[1] * 2.2;
    const jitRot = jitTable[2] * 3.5;

    return (
      <g
        transform={`translate(${px + jitX}, ${py + jitY}) rotate(${12 + jitRot}) scale(${crackScale * 0.95})`}
        style={{ pointerEvents: 'none' }}
      >
        <path
          d="M 12,-22 L -14,-1 L -5,3 L -28,26 L -12,28 L -24,48 L -4,32 L -10,30 L 7,12 L -1,9 Z"
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth={2.2 * (baseStrokeWidth / 2.5)}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    );
  };

  // --- 5. 3D PROJECTED ROTATING GAPS ON SPHERE SURFACE ---
  // Re-creates the hand-drawn brush-stroke gaps (Layers of black underlay and beige overlay) that revolve in 3D
  const getRotatingGapPath = (baseLon: number, startLat: number, endLat: number, R: number) => {
    const points: [number, number][] = [];
    const stepCount = 18;
    
    for (let i = 0; i <= stepCount; i++) {
      const lat = startLat + (endLat - startLat) * (i / stepCount);
      const latRad = (lat * Math.PI) / 180;
      const lonRot = (baseLon - rotationOffset) % 360;
      const lonRad = (lonRot * Math.PI) / 180;

      const x_3d = R * Math.cos(latRad) * Math.sin(lonRad);
      const y_3d = R * Math.sin(latRad);
      const z_3d = R * Math.cos(latRad) * Math.cos(lonRad);

      // Render point only if z_3d >= -2 (slightly on the front side of sphere boundary)
      if (z_3d >= -2) {
        const tiltRad = (-10 * Math.PI) / 180;
        const px = x_3d * Math.cos(tiltRad) - y_3d * Math.sin(tiltRad) + CX;
        const py = x_3d * Math.sin(tiltRad) + y_3d * Math.cos(tiltRad) + CY;
        points.push([px, py]);
      }
    }
    
    if (points.length < 2) return '';
    return 'M ' + points[0][0] + ',' + points[0][1] + ' ' + points.slice(1).map(p => `L ${p[0]},${p[1]}`).join(' ');
  };

  const renderRotatingGaps = () => {
    const R = 95;
    // Main middle left brush path
    const gap1 = getRotatingGapPath(135, -55, 45, R);
    // Upper right crescent path
    const gap2 = getRotatingGapPath(275, 12, 62, R);
    // Low crescent path
    const gap3 = getRotatingGapPath(40, -65, -18, R);

    return (
      <g style={{ pointerEvents: 'none' }}>
        {/* Gap 1 */}
        {gap1 && (
          <>
            <path d={gap1} fill="none" stroke="#000000" strokeWidth={20 * (baseStrokeWidth / 2.5)} strokeLinecap="round" strokeLinejoin="round" />
            <path d={gap1} fill="none" stroke="#FCF0D9" strokeWidth={14 * (baseStrokeWidth / 2.5)} strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}

        {/* Gap 2 */}
        {gap2 && (
          <>
            <path d={gap2} fill="none" stroke="#000000" strokeWidth={10 * (baseStrokeWidth / 2.5)} strokeLinecap="round" strokeLinejoin="round" />
            <path d={gap2} fill="none" stroke="#FCF0D9" strokeWidth={5 * (baseStrokeWidth / 2.5)} strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}

        {/* Gap 3 */}
        {gap3 && (
          <>
            <path d={gap3} fill="none" stroke="#000000" strokeWidth={10 * (baseStrokeWidth / 2.5)} strokeLinecap="round" strokeLinejoin="round" />
            <path d={gap3} fill="none" stroke="#FCF0D9" strokeWidth={5 * (baseStrokeWidth / 2.5)} strokeLinecap="round" strokeLinejoin="round" />
          </>
        )}
      </g>
    );
  };

  return (
    <div id="planet-canvas-container" className="relative w-full h-full flex items-center justify-center select-none overflow-hidden" style={{ backgroundColor: '#FCF0D9' }}>
      {/* SVG Canvas drawing isolated doodle assets on #FCF0D9 background */}
      <svg
        id="planet-svg-stage"
        viewBox="0 0 500 500"
        className="w-full max-w-[500px] aspect-square object-contain"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Defining gradients and clipPaths in defs */}
        <defs>
          <clipPath id="planet-circle-clip">
            <circle cx={CX} cy={CY} r={R_PLANET} />
          </clipPath>

          {/* Three-point linear gradient matching "渐变" colors flow dynamically */}
          <linearGradient id="planet-body-gradient" x1="0" y1="0" x2="0.1" y2="1">
            <stop offset="0%" stopColor={planetColors.top} />
            <stop offset="50%" stopColor={planetColors.mid} />
            <stop offset="100%" stopColor={planetColors.bottom} />
          </linearGradient>
        </defs>

        {/* ================= LAYER A: BACK PLANETARY RING ================= */}
        {renderRingGroup(backGroup)}

        {/* ================= LAYER B: SENSORY STIMULATION BACKGROUNDS ================= */}
        {renderSensoryBackground()}

        {/* ================= LAYER C: PLANET CORE SPHERE (GRADIENT RENDERED) ================= */}
        <g clipPath="url(#planet-circle-clip)">
          {/* Main sphere with dynamic multi-stop linear gradient instead of sharp overlays */}
          <circle cx={CX} cy={CY} r={R_PLANET} fill="url(#planet-body-gradient)" />
        </g>

        {/* ================= LAYER D: SPHERE SURFACE DOODLE GAP SLITS (REVOLVING IN 3D) ================= */}
        {renderRotatingGaps()}

        {/* ================= LAYER E: ROTATING SPECIFICITY PATTERNS ================= */}
        <g clipPath="url(#planet-circle-clip)">
          {renderSphereDecorations()}
        </g>

        {/* Drawn circular edge outlines of the main planet body, rendered on top of patterns for seamless obstruction */}
        <circle
          cx={CX}
          cy={CY}
          r={R_PLANET}
          fill="none"
          stroke="#000000"
          strokeWidth={3.5 * (baseStrokeWidth / 2.5)}
          style={{ pointerEvents: 'none' }}
        />

        {/* ================= LAYER F: DANGER LIGHTNING CRACKS ================= */}
        {renderDangerCrack()}

        {/* ================= LAYER G: FRONT PLANETARY RING ================= */}
        {renderRingGroup(frontGroup)}
      </svg>
    </div>
  );
}

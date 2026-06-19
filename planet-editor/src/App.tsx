import { useState, useMemo } from 'react';
import PlanetCanvas, { getPlanetColor } from './components/PlanetCanvas';
import EditorControls from './components/EditorControls';
import { PlanetState } from './types';
import { Download } from 'lucide-react';

export default function App() {
  // Balanced neutral initial state including crackSize, patternDensity, and strokeWidth
  const [state, setState] = useState<PlanetState>({
    risk: 15,
    sensory: 18,     // mostly round circles
    rhythm: 92,      // continuous ring
    specificity: 16, // pink waves & dots
    danger: 0,       // no cracks
    crackSize: 100,  // basic crack size multiplier in percent
    patternDensity: 8, // base density of patterns per latitude ring
    strokeWidth: 2.5,  // default line stroke thickness (multiplier)
    cWaveSpan: 12,     // default wave vertical span
    cDotSpan: 12,      // default dot vertical span
    kChiliSpan: 12,    // default chili vertical span
    kDotsSpan: 12,     // default spots vertical span
  });

  // State mapping user-uploaded transparent PNGs and scale variables
  const [customPatterns, setCustomPatterns] = useState({
    cWave: null as string | null,
    cWaveSize: 100,
    cDot: null as string | null,
    cDotSize: 100,
    kChili: null as string | null,
    kChiliSize: 100,
    kDots: null as string | null,
    kDotsSize: 100,
  });

  const [isPlaying, setIsPlaying] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(1.0);
  const [downloading, setDownloading] = useState(false);

  // Update a single control key
  const handleDimensionChange = (key: keyof PlanetState, val: number) => {
    setState(prev => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleSetState = (newState: PlanetState) => {
    setState({
      ...newState,
      // Fallback default scale if preset lacks the crackSize/patternDensity/strokeWidth property
      crackSize: newState.crackSize !== undefined ? newState.crackSize : 100,
      patternDensity: newState.patternDensity !== undefined ? newState.patternDensity : (state.patternDensity !== undefined ? state.patternDensity : 8),
      strokeWidth: newState.strokeWidth !== undefined ? newState.strokeWidth : (state.strokeWidth !== undefined ? state.strokeWidth : 2.5),
      cWaveSpan: newState.cWaveSpan !== undefined ? newState.cWaveSpan : (state.cWaveSpan !== undefined ? state.cWaveSpan : 12),
      cDotSpan: newState.cDotSpan !== undefined ? newState.cDotSpan : (state.cDotSpan !== undefined ? state.cDotSpan : 12),
      kChiliSpan: newState.kChiliSpan !== undefined ? newState.kChiliSpan : (state.kChiliSpan !== undefined ? state.kChiliSpan : 12),
      kDotsSpan: newState.kDotsSpan !== undefined ? newState.kDotsSpan : (state.kDotsSpan !== undefined ? state.kDotsSpan : 12),
    });
  };

  // Get current dominant theme metadata
  const currentRiskColor = useMemo(() => getPlanetColor(state.risk), [state.risk]);

  // Download SVG Artwork - extracts the inner planet illustration cleanly
  const handleDownloadSVG = () => {
    setDownloading(true);
    try {
      const svgElement = document.getElementById('planet-svg-stage');
      if (!svgElement) {
        alert('未找到星球画布元素');
        return;
      }

      // Clone and clean for single download
      const svgClone = svgElement.cloneNode(true) as SVGElement;
      svgClone.setAttribute('width', '800');
      svgClone.setAttribute('height', '800');
      // Set background color so exporting includes the warm beige canvas backdrop
      svgClone.style.backgroundColor = '#FCF0D9';

      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svgClone);
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);

      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = `handmade-planet-risk-${state.risk}.svg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(svgUrl);
    } catch (e) {
      console.error(e);
      alert('导出 SVG 失败，请重试');
    } finally {
      setTimeout(() => setDownloading(false), 500);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-screen overflow-hidden font-sans text-zinc-900 bg-[#FCF0D9]">
      
      {/* 1. LEFT SIDEBAR: THE EDITOR INTERACTION DESK */}
      <aside 
        id="app-sidebar" 
        className="w-full lg:w-[420px] h-[55vh] lg:h-full border-b-4 lg:border-b-0 lg:border-r-4 border-black flex-shrink-0 flex flex-col bg-white z-20 shadow-[6px_0_24px_rgba(0,0,0,0.06)]"
      >
        <EditorControls
          state={state}
          onChange={handleDimensionChange}
          onSetState={handleSetState}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          rotationSpeed={rotationSpeed}
          onSpeedChange={setRotationSpeed}
          customPatterns={customPatterns}
          onUpdateCustomPatterns={setCustomPatterns}
        />
      </aside>

      {/* 2. MAIN CENTER CANVAS: THE ISOLATED POSTER EXHIBITION */}
      <main 
        id="app-main-stage" 
        className="flex-1 h-[45vh] lg:h-full flex flex-col items-center justify-center relative p-4 lg:p-12"
        style={{ backgroundColor: '#FCF0D9' }}
      >
        {/* Isolated floating canvas frame with neat thick borders and retro shadow */}
        <div id="planet-canvas-frame" className="relative w-full max-w-[460px] aspect-square bg-[#FCF0D9] flex items-center justify-center transition-transform hover:scale-[1.01] duration-300">
          <PlanetCanvas
            state={state}
            isPlaying={isPlaying}
            rotationSpeed={rotationSpeed}
            customPatterns={customPatterns}
          />
        </div>

        {/* Dynamic, minimalist art gallery specimen card */}
        <div 
          id="specimen-gallery-card" 
          className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 hidden sm:flex flex-col p-4 bg-white border-2 border-black max-w-xs rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-10 transition-all duration-300 pointer-events-auto"
        >
          <div className="flex items-center justify-between border-b gap-3 pb-1.5 mb-2 border-dashed border-zinc-300">
            <span className="text-[10px] font-black font-mono tracking-wider text-zinc-400 uppercase">
              COSMIC SPECIMEN CARD
            </span>
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: currentRiskColor }} />
          </div>
          
          <div className="space-y-1 font-mono text-xs text-zinc-600">
            <div className="flex justify-between">
              <span className="text-zinc-400">STATE :</span>
              <span className="font-bold text-zinc-800">
                {state.risk <= 33 ? 'SECURE' : state.risk <= 66 ? 'DYNAMIC' : 'HAZARDOUS'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">OUTLINE :</span>
              <span className="font-bold text-zinc-800">
                {state.sensory <= 35 ? 'Fluent (L)' : state.sensory >= 65 ? 'Spiky (V)' : 'Morphed'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">ORBIT :</span>
              <span className="font-bold text-zinc-800">
                {state.rhythm <= 35 ? 'Gravel (D)' : state.rhythm >= 65 ? 'Smooth (O)' : 'Merging'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">PATTERN :</span>
              <span className="font-bold text-zinc-800">
                {state.specificity <= 35 ? 'Waves (C)' : state.specificity >= 65 ? 'Chilis (K)' : 'Hybrid'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-400">CRACKS :</span>
              <span className="font-bold text-zinc-800 font-mono text-[11px]">
                {state.danger <= 5 ? 'None (A)' : `${state.danger}% (S:${state.crackSize}%)`}
              </span>
            </div>
          </div>
        </div>

        {/* Subtle, premium floatable action button for exporting clean vector file */}
        <button
          id="canvas-export-floating-btn"
          onClick={handleDownloadSVG}
          disabled={downloading}
          className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10 px-4 py-2 bg-white hover:bg-zinc-50 border-2 border-black rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all flex items-center gap-2 text-xs font-mono font-bold text-zinc-800 cursor-pointer"
          title="Export high-resolution vector artwork (.svg)"
        >
          <Download className={`w-3.5 h-3.5 ${downloading ? 'animate-bounce' : ''}`} />
          {downloading ? '导出中...' : '下载 SVG 插画 / DOWNLOAD ART'}
        </button>
      </main>

    </div>
  );
}

import { PlanetState, Preset } from '../types';
import { Play, Pause, RotateCcw, Sparkles, Save, Info, Upload, Trash2, Image } from 'lucide-react';

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

interface EditorControlsProps {
  state: PlanetState;
  onChange: (key: keyof PlanetState, val: number) => void;
  onSetState: (newState: PlanetState) => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  rotationSpeed: number;
  onSpeedChange: (speed: number) => void;
  customPatterns: CustomPatterns;
  onUpdateCustomPatterns: (updater: (prev: CustomPatterns) => CustomPatterns) => void;
}

export const PRESETS: Preset[] = [
  {
    name: '宁静安全',
    nameEn: 'Peaceful Sanctuary',
    description: '整体低风险。平滑圆润的星球边缘，完整流畅的连续星环，星球表面覆盖着柔和的波浪与粉点，毫无破裂痕迹。',
    state: {
      risk: 0,
      sensory: 0, // L-end (Round)
      rhythm: 100, // O-end (Continuous)
      specificity: 0, // C-end (Waves & Dots)
      danger: 0, // A-end (No cracks)
      crackSize: 100,
      patternDensity: 6,
      strokeWidth: 2.0,
      cWaveSpan: 10,
      cDotSpan: 10,
      kChiliSpan: 10,
      kDotsSpan: 10,
    },
  },
  {
    name: '极端危险',
    nameEn: 'Cataclysmic Crisis',
    description: '红色高风险。带有强烈尖刺的漫画爆炸轮廓，由无数块飞驰碎石拼贴而成的崩裂星环，橙色辣椒与带毒红棕斑，伴有巨大闪电裂口。',
    state: {
      risk: 100,
      sensory: 100, // V-end (Spiky)
      rhythm: 0,   // D-end (Dotted)
      specificity: 100, // K-end (Chili & Browns)
      danger: 100, // G-end (Big Crack)
      crackSize: 130,
      patternDensity: 12,
      strokeWidth: 4.5,
      cWaveSpan: 20,
      cDotSpan: 20,
      kChiliSpan: 20,
      kDotsSpan: 20,
    },
  },
  {
    name: '过渡阶段',
    nameEn: 'Intermediate Shift',
    description: '粉色中间风险状态。边缘呈圆角波浪状，碎石开始相互融合层叠，蓝波辣椒混杂交替，裂口微微在右上角探出。',
    state: {
      risk: 48,
      sensory: 50,
      rhythm: 58,
      specificity: 45,
      danger: 40,
      crackSize: 100,
      patternDensity: 8,
      strokeWidth: 2.5,
      cWaveSpan: 12,
      cDotSpan: 12,
      kChiliSpan: 12,
      kDotsSpan: 12,
    },
  },
  {
    name: '混乱异星',
    nameEn: 'Chaotic Supernova',
    description: '高能刺激的异星生态。强烈而带刺的外圈边缘，辣椒星体高速旋转，多帧高频抖动，释放着不可知的外星电荷。',
    state: {
      risk: 85,
      sensory: 90,
      rhythm: 20,
      specificity: 80,
      danger: 75,
      crackSize: 110,
      patternDensity: 16,
      strokeWidth: 3.5,
      cWaveSpan: 30,
      cDotSpan: 30,
      kChiliSpan: 30,
      kDotsSpan: 30,
    },
  },
];

export default function EditorControls({
  state,
  onChange,
  onSetState,
  isPlaying,
  onTogglePlay,
  rotationSpeed,
  onSpeedChange,
  customPatterns,
  onUpdateCustomPatterns,
}: EditorControlsProps) {
  
  const handleRandomize = () => {
    onSetState({
      risk: Math.round(Math.random() * 100),
      sensory: Math.round(Math.random() * 100),
      rhythm: Math.round(Math.random() * 100),
      specificity: Math.round(Math.random() * 100),
      danger: Math.round(Math.random() * 100),
      crackSize: state.crackSize,
      patternDensity: state.patternDensity,
      strokeWidth: state.strokeWidth,
      cWaveSpan: state.cWaveSpan,
      cDotSpan: state.cDotSpan,
      kChiliSpan: state.kChiliSpan,
      kDotsSpan: state.kDotsSpan,
    });
  };

  const handleCopyConfig = () => {
    const configText = JSON.stringify({ state, customPatterns }, null, 2);
    navigator.clipboard.writeText(configText).then(() => {
      alert('星球与花纹配置已成功复制到剪贴板！');
    }).catch(() => {
      alert('复制失败，请重试');
    });
  };

  // Convert File upload into standard base64 data-url and update context
  const handleFileUpload = (key: keyof CustomPatterns, file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      onUpdateCustomPatterns(prev => ({
        ...prev,
        [key]: dataUrl
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleClearPattern = (key: keyof CustomPatterns) => {
    onUpdateCustomPatterns(prev => ({
      ...prev,
      [key]: null
    }));
  };

  const handlePatternSizeChange = (key: keyof CustomPatterns, val: number) => {
    onUpdateCustomPatterns(prev => ({
      ...prev,
      [key]: val
    }));
  };

  return (
    <div id="editor-controls-panel" className="flex flex-col h-full bg-white select-none">
      {/* Header section with Swiss-Modern minimalism */}
      <div className="p-6 border-b-2 border-black flex items-center justify-between bg-zinc-50">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <h1 className="text-xl font-black tracking-tight text-zinc-900 font-sans">
              星球生成器
            </h1>
          </div>
          <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest mt-0.5">
            Cosmic Planet Editor v1.2
          </p>
        </div>
        <button
          id="random-spark-btn"
          onClick={handleRandomize}
          className="flex items-center gap-2 px-3 py-1.5 bg-black text-white hover:bg-zinc-800 rounded text-xs font-mono font-bold transition-all border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          title="Randomize Dimensions"
        >
          <Sparkles className="w-3.5 h-3.5" />
          随机生成
        </button>
      </div>

      {/* Main contents with custom scrollbar */}
      <div className="flex-1 overflow-y-auto p-6 space-y-7 custom-scrollbar">
        
        {/* Preset Cards widget */}
        <section id="presets-section">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xs font-black tracking-widest font-mono text-zinc-400 uppercase">
              一键预设 / PRESETS
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {PRESETS.map((preset, index) => {
              const isActive = Object.keys(preset.state).every(
                (key) => state[key as keyof PlanetState] === preset.state[key as keyof PlanetState]
              );
              return (
                <button
                  key={preset.name}
                  id={`preset-card-${index}`}
                  onClick={() => onSetState(preset.state)}
                  className={`p-3 text-left rounded-lg border-2 text-zinc-800 transition-all ${
                    isActive
                      ? 'border-black bg-[#FCF0D9]/40 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                      : 'border-zinc-200 hover:border-zinc-400 hover:bg-zinc-50'
                  }`}
                >
                  <p className="font-bold text-sm tracking-tight">{preset.name}</p>
                  <p className="text-[10px] text-zinc-500 font-mono tracking-tight">{preset.nameEn}</p>
                  <p className="text-[10px] text-zinc-400 leading-tight mt-1 line-clamp-2">
                    {preset.description}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* 5 dimension sliders */}
        <section id="dimensions-section" className="space-y-6">
          <h2 className="text-xs font-black tracking-widest font-mono text-zinc-400 uppercase">
            核心属性维度 / DIMENSIONS
          </h2>

          {/* 1. OVERALL RISK */}
          <div id="risk-slider-container" className="space-y-2 p-3 rounded-lg bg-zinc-50 border border-zinc-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black tracking-wider text-zinc-700">
                整体风险值 <span className="font-mono text-[10px] text-zinc-400 uppercase">(Risk)</span>
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                state.risk <= 33 
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                  : state.risk <= 66 
                  ? 'bg-pink-50 text-pink-600 border border-pink-200' 
                  : 'bg-red-50 text-red-600 border border-red-200'
              }`}>
                {state.risk}% - {state.risk <= 33 ? '低风险 (绿)' : state.risk <= 66 ? '中风险 (粉)' : '高风险 (红)'}
              </span>
            </div>
            
            <input
              id="slider-risk-input"
              type="range"
              min="0"
              max="100"
              value={state.risk}
              onChange={(e) => onChange('risk', parseInt(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer border border-zinc-300"
              style={{
                background: 'linear-gradient(to right, #74D188 0%, #FFC1DF 50%, #FF4800 100%)'
              }}
            />
            
            <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-1">
              <span>0% 宁静绿</span>
              <span>50% 过渡粉</span>
              <span>100% 危机红</span>
            </div>
          </div>

          {/* 2. SENSORY STIMULATION */}
          <div id="sensory-slider-container" className="space-y-2 p-3 rounded-lg bg-zinc-50 border border-zinc-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black tracking-wider text-zinc-700">
                感官刺激 <span className="font-mono text-[10px] text-zinc-400 uppercase">(Sensory)</span>
              </span>
              <span className="text-xs font-mono font-bold text-zinc-600 bg-zinc-200/60 px-1.5 py-0.5 rounded">
                {state.sensory <= 35 ? 'L端 (圆形轮廓)' : state.sensory >= 65 ? 'V端 (漫画爆炸刺)' : '均衡过渡'}
              </span>
            </div>
            
            <input
              id="slider-sensory-input"
              type="range"
              min="0"
              max="100"
              value={state.sensory}
              onChange={(e) => onChange('sensory', parseInt(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer border border-zinc-300"
              style={{
                background: 'linear-gradient(to right, #A8A8A8, #18181B)'
              }}
            />
            
            <div className="flex justify-between items-center text-[10px] text-zinc-500 font-medium mt-1">
              <span className="flex items-center gap-0.5">● L端 <span className="text-zinc-400 text-[9px] font-mono">(流畅手绘圆圈)</span></span>
              <span className="flex items-center gap-0.5">V端 ▲ <span className="text-zinc-400 text-[9px] font-mono">(漫画爆炸刺)</span></span>
            </div>
          </div>

          {/* 3. RHYTHM */}
          <div id="rhythm-slider-container" className="space-y-2 p-3 rounded-lg bg-zinc-50 border border-zinc-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black tracking-wider text-zinc-700">
                节律形式 <span className="font-mono text-[10px] text-zinc-400 uppercase">(Rhythm)</span>
              </span>
              <span className="text-xs font-mono font-bold text-zinc-600 bg-zinc-200/60 px-1.5 py-0.5 rounded">
                {state.rhythm <= 35 ? 'D端 (碎石散环)' : state.rhythm >= 65 ? 'O端 (闭合星环)' : '逐渐融合'}
              </span>
            </div>
            
            <input
              id="slider-rhythm-input"
              type="range"
              min="0"
              max="100"
              value={state.rhythm}
              onChange={(e) => onChange('rhythm', parseInt(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer border border-zinc-300"
              style={{
                background: 'linear-gradient(to right, #D4D4D8, #27272A)'
              }}
            />
            
            <div className="flex justify-between items-center text-[10px] text-zinc-500 font-medium mt-1">
              <span className="flex items-center gap-0.5">▢ D端 <span className="text-zinc-400 text-[9px] font-mono">(尘埃、散乱 gravel)</span></span>
              <span className="flex items-center gap-0.5">O端 ◯ <span className="text-zinc-400 text-[9px] font-mono">(连续平整圆环)</span></span>
            </div>
          </div>

          {/* 4. SPECIFICITY */}
          <div id="specificity-slider-container" className="space-y-2 p-3 rounded-lg bg-zinc-50 border border-zinc-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black tracking-wider text-zinc-700">
                特异度花纹 <span className="font-mono text-[10px] text-zinc-400 uppercase">(Specificity)</span>
              </span>
              <span className="text-xs font-mono font-bold text-zinc-600 bg-zinc-200/60 px-1.5 py-0.5 rounded">
                {state.specificity <= 35 ? 'C端 (清爽粉点蓝波)' : state.specificity >= 65 ? 'K端 (高能量尖椒)' : '花纹交汇'}
              </span>
            </div>
            
            <input
              id="slider-specificity-input"
              type="range"
              min="0"
              max="100"
              value={state.specificity}
              onChange={(e) => onChange('specificity', parseInt(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer border border-zinc-300"
              style={{
                background: 'linear-gradient(to right, #78C0FF 0%, #FFC1DF 50%, #FF9000 100%)'
              }}
            />
            
            <div className="flex justify-between items-center text-[10px] text-zinc-500 font-medium mt-1">
              <span className="flex items-center gap-0.5">~ C端 <span className="text-zinc-400 text-[9px] font-mono">(粉点+波纹 waves)</span></span>
              <span className="flex items-center gap-0.5">K端 🌶 <span className="text-zinc-400 text-[9px] font-mono">(金黄辣椒+褐斑)</span></span>
            </div>
          </div>

          {/* 5. DANGER CRACKS */}
          <div id="danger-slider-container" className="space-y-2 p-3 rounded-lg bg-zinc-50 border border-zinc-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black tracking-wider text-zinc-700">
                危险裂纹 <span className="font-mono text-[10px] text-zinc-400 uppercase">(Danger)</span>
              </span>
              <span className="text-xs font-mono font-bold text-zinc-600 bg-zinc-200/60 px-1.5 py-0.5 rounded">
                {state.danger <= 5 ? 'A端 (完好星体)' : state.danger >= 70 ? 'G端 (震撼裂缝)' : '细微开裂'}
              </span>
            </div>
            
            <input
              id="slider-danger-input"
              type="range"
              min="0"
              max="100"
              value={state.danger}
              onChange={(e) => onChange('danger', parseInt(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer border border-zinc-300"
              style={{
                background: 'linear-gradient(to right, #E4E4E7, #F97316)'
              }}
            />
            
            <div className="flex justify-between items-center text-[10px] text-zinc-500 font-medium mt-1">
              <span className="flex items-center gap-0.5">A端 <span className="text-zinc-400 text-[9px] font-mono">(星球无开裂 solid)</span></span>
              <span className="flex items-center gap-0.5">G端 ⚡ <span className="text-zinc-400 text-[9px] font-mono">(巨型闪电强裂口)</span></span>
            </div>
          </div>

          {/* 6. CRACK SIZE MULTIPLIER (可调节危险裂纹的大小) */}
          <div id="crack-size-slider-container" className="space-y-2 p-3 rounded-lg bg-zinc-50 border border-zinc-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black tracking-wider text-zinc-700">
                裂纹尺寸大小 <span className="font-mono text-[10px] text-zinc-400 uppercase">(Crack Size)</span>
              </span>
              <span className="text-xs font-mono font-bold text-zinc-600 bg-zinc-200/60 px-1.5 py-0.5 rounded">
                {state.crackSize}%
              </span>
            </div>
            
            <input
              id="slider-crack-size-input"
              type="range"
              min="10"
              max="200"
              value={state.crackSize}
              onChange={(e) => onChange('crackSize', parseInt(e.target.value))}
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-black border border-zinc-300"
            />
            
            <div className="flex justify-between items-center text-[10px] text-zinc-450 font-mono mt-1">
              <span>10% (极小细缝)</span>
              <span>100% (默认大小)</span>
              <span>200% (浩劫巨隙)</span>
            </div>
          </div>

          {/* 7. PATTERN DENSITY (花纹密度调节器) */}
          <div id="pattern-density-slider-container" className="space-y-2 p-3 rounded-lg bg-zinc-50 border border-zinc-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black tracking-wider text-zinc-700">
                星体花纹密度 <span className="font-mono text-[10px] text-zinc-400 uppercase">(Density)</span>
              </span>
              <span className="text-xs font-mono font-bold text-zinc-600 bg-zinc-200/60 px-1.5 py-0.5 rounded">
                单环 {state.patternDensity} 个 (共 {state.patternDensity * 2} 个)
              </span>
            </div>
            
            <input
              id="slider-pattern-density-input"
              type="range"
              min="2"
              max="24"
              value={state.patternDensity}
              onChange={(e) => onChange('patternDensity', parseInt(e.target.value))}
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-black border border-zinc-300"
            />
            
            <div className="flex justify-between items-center text-[10px] text-zinc-450 font-mono mt-1">
              <span>2 (极度稀疏)</span>
              <span>8 (默认密度)</span>
              <span>24 (密集环抱)</span>
            </div>
          </div>

          {/* 8. OUTLINE STROKE WIDTH (整体轮廓描边粗细调节器) */}
          <div id="stroke-width-slider-container" className="space-y-2 p-3 rounded-lg bg-zinc-50 border border-zinc-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black tracking-wider text-zinc-700">
                整体描边线条粗细 <span className="font-mono text-[10px] text-zinc-400 uppercase">(Stroke Width)</span>
              </span>
              <span className="text-xs font-mono font-bold text-zinc-600 bg-zinc-200/60 px-1.5 py-0.5 rounded">
                宽度 {state.strokeWidth.toFixed(1)}px
              </span>
            </div>
            
            <input
              id="slider-stroke-width-input"
              type="range"
              min="0.5"
              max="8"
              step="0.1"
              value={state.strokeWidth}
              onChange={(e) => onChange('strokeWidth', parseFloat(e.target.value))}
              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-black border border-zinc-300"
            />
            
            <div className="flex justify-between items-center text-[10px] text-zinc-450 font-mono mt-1">
              <span>0.5px (极细描边)</span>
              <span>2.5px (默认线条)</span>
              <span>8.0px (极粗线条)</span>
            </div>
          </div>

          {/* 9. INDIVIDUAL PATTERN DISTRIBUTIONS (花纹分布区域宽度调节器) */}
          <div id="pattern-spans-container" className="space-y-3 p-3 rounded-lg bg-zinc-50 border border-zinc-100">
            <span className="text-xs font-black tracking-wider text-zinc-700 block mb-1">
              每个花纹独立分布区域宽度 <span className="font-mono text-[10px] text-zinc-400 uppercase">(Distribution Width)</span>
            </span>
            <p className="text-[10px] text-zinc-400 leading-normal mb-2">
              调大宽度可以让对应花纹在更宽广的区间内上下随机排布（保持静止不抖动）。
            </p>

            {/* A. cWaveSpan */}
            <div className="space-y-1 bg-white p-2 rounded border border-zinc-100">
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold text-zinc-700 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-sky-450 border border-sky-600 block"></span> 蓝色波纹 (Wave Width)
                </span>
                <span className="font-mono text-zinc-600 font-bold bg-zinc-100 px-1 rounded">{state.cWaveSpan}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={state.cWaveSpan}
                onChange={(e) => onChange('cWaveSpan', parseInt(e.target.value))}
                className="w-full h-1.5 bg-zinc-100 rounded appearance-none cursor-pointer accent-sky-500"
              />
            </div>

            {/* B. cDotSpan */}
            <div className="space-y-1 bg-white p-2 rounded border border-zinc-100">
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold text-zinc-700 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-pink-400 border border-pink-600 block"></span> 粉色圆点 (Pink Dot Width)
                </span>
                <span className="font-mono text-zinc-600 font-bold bg-zinc-100 px-1 rounded">{state.cDotSpan}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={state.cDotSpan}
                onChange={(e) => onChange('cDotSpan', parseInt(e.target.value))}
                className="w-full h-1.5 bg-zinc-100 rounded appearance-none cursor-pointer accent-pink-500"
              />
            </div>

            {/* C. kChiliSpan */}
            <div className="space-y-1 bg-white p-2 rounded border border-zinc-100">
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold text-zinc-700 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-orange-400 border border-orange-600 block"></span> 橙色辣椒 (Chili Width)
                </span>
                <span className="font-mono text-zinc-600 font-bold bg-zinc-100 px-1 rounded">{state.kChiliSpan}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={state.kChiliSpan}
                onChange={(e) => onChange('kChiliSpan', parseInt(e.target.value))}
                className="w-full h-1.5 bg-zinc-100 rounded appearance-none cursor-pointer accent-orange-500"
              />
            </div>

            {/* D. kDotsSpan */}
            <div className="space-y-1 bg-white p-2 rounded border border-zinc-100">
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-bold text-zinc-700 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-yellow-700 border border-yellow-900 block"></span> 褐色斑点 (Spots Width)
                </span>
                <span className="font-mono text-zinc-600 font-bold bg-zinc-100 px-1 rounded">{state.kDotsSpan}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={state.kDotsSpan}
                onChange={(e) => onChange('kDotsSpan', parseInt(e.target.value))}
                className="w-full h-1.5 bg-zinc-100 rounded appearance-none cursor-pointer accent-yellow-700"
              />
            </div>
          </div>
        </section>

        {/* CUSTOM DECORATIVE PNG PATTERNS UPLOAD CONTROL PANEL (增加花纹替换与尺寸控制) */}
        <section id="custom-uploads-panel" className="p-4 rounded-xl border-2 border-black space-y-4 bg-zinc-50/50">
          <div className="flex items-center gap-1.5 text-zinc-900 border-b border-black pb-2">
            <Image className="w-4 h-4" />
            <h3 className="text-xs font-black uppercase tracking-wider font-mono">自定义上传花纹 / PNG MATERIALS</h3>
          </div>
          
          <p className="text-[11px] text-zinc-500 leading-relaxed font-sans mb-2">
            您可以为 C端 (低风险) 和 K端 (高风险) 的四种纹理形状上传自定义透明 PNG 图片，并独立调节每档花纹的设计尺寸。
          </p>

          <div className="space-y-4 divide-y divide-zinc-200">
            
            {/* 1. C-End Wave Custom Asset */}
            <div className="pt-3 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-800">C端花纹 A: 蓝色波纹 (Wave)</span>
                {customPatterns.cWave && (
                  <button
                    onClick={() => handleClearPattern('cWave')}
                    className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-0.5 font-mono text-[10px]"
                  >
                    <Trash2 className="w-3 h-3" /> 重置
                  </button>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                {customPatterns.cWave ? (
                  <img src={customPatterns.cWave} className="w-10 h-10 object-contain rounded bg-white border border-zinc-300 p-1" alt="cWave Thumbnail" />
                ) : (
                  <div className="w-10 h-10 rounded bg-zinc-200 border border-zinc-300 flex items-center justify-center text-[10px] font-mono text-zinc-400">SVG</div>
                )}
                
                <label className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded border border-black border-dashed bg-white text-zinc-700 hover:bg-zinc-50 text-xs font-medium cursor-pointer transition-colors select-none">
                  <Upload className="w-3.5 h-3.5 text-zinc-500" />
                  <span>上传 PNG 素材</span>
                  <input
                    type="file"
                    accept="image/png"
                    onChange={(e) => handleFileUpload('cWave', e.target.files ? e.target.files[0] : null)}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                  <span>花纹 A 缩放尺寸</span>
                  <span>{customPatterns.cWaveSize}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="600"
                  value={customPatterns.cWaveSize}
                  onChange={(e) => handlePatternSizeChange('cWaveSize', parseInt(e.target.value))}
                  className="w-full h-1 bg-zinc-200 rounded accent-black"
                />
              </div>
            </div>

            {/* 2. C-End Dot Custom Asset */}
            <div className="pt-3.5 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-800">C端花纹 B: 粉红圆点 (Dot)</span>
                {customPatterns.cDot && (
                  <button
                    onClick={() => handleClearPattern('cDot')}
                    className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-0.5 font-mono text-[10px]"
                  >
                    <Trash2 className="w-3 h-3" /> 重置
                  </button>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                {customPatterns.cDot ? (
                  <img src={customPatterns.cDot} className="w-10 h-10 object-contain rounded bg-white border border-zinc-300 p-1" alt="cDot Thumbnail" />
                ) : (
                  <div className="w-10 h-10 rounded bg-zinc-200 border border-zinc-300 flex items-center justify-center text-[10px] font-mono text-zinc-400">SVG</div>
                )}
                
                <label className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded border border-black border-dashed bg-white text-zinc-700 hover:bg-zinc-50 text-xs font-medium cursor-pointer transition-colors select-none">
                  <Upload className="w-3.5 h-3.5 text-zinc-500" />
                  <span>上传 PNG 素材</span>
                  <input
                    type="file"
                    accept="image/png"
                    onChange={(e) => handleFileUpload('cDot', e.target.files ? e.target.files[0] : null)}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                  <span>花纹 B 缩放尺寸</span>
                  <span>{customPatterns.cDotSize}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="600"
                  value={customPatterns.cDotSize}
                  onChange={(e) => handlePatternSizeChange('cDotSize', parseInt(e.target.value))}
                  className="w-full h-1 bg-zinc-200 rounded accent-black"
                />
              </div>
            </div>

            {/* 3. K-End Chili Custom Asset */}
            <div className="pt-3.5 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-800">K端花纹 A: 橙黄辣椒 (Chili)</span>
                {customPatterns.kChili && (
                  <button
                    onClick={() => handleClearPattern('kChili')}
                    className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-0.5 font-mono text-[10px]"
                  >
                    <Trash2 className="w-3 h-3" /> 重置
                  </button>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                {customPatterns.kChili ? (
                  <img src={customPatterns.kChili} className="w-10 h-10 object-contain rounded bg-white border border-zinc-300 p-1" alt="kChili Thumbnail" />
                ) : (
                  <div className="w-10 h-10 rounded bg-zinc-200 border border-zinc-300 flex items-center justify-center text-[10px] font-mono text-zinc-400">SVG</div>
                )}
                
                <label className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded border border-black border-dashed bg-white text-zinc-700 hover:bg-zinc-50 text-xs font-medium cursor-pointer transition-colors select-none">
                  <Upload className="w-3.5 h-3.5 text-zinc-500" />
                  <span>上传 PNG 素材</span>
                  <input
                    type="file"
                    accept="image/png"
                    onChange={(e) => handleFileUpload('kChili', e.target.files ? e.target.files[0] : null)}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                  <span>花纹 A 缩放尺寸</span>
                  <span>{customPatterns.kChiliSize}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="600"
                  value={customPatterns.kChiliSize}
                  onChange={(e) => handlePatternSizeChange('kChiliSize', parseInt(e.target.value))}
                  className="w-full h-1 bg-zinc-200 rounded accent-black"
                />
              </div>
            </div>

            {/* 4. K-End Dots Custom Asset */}
            <div className="pt-3.5 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-zinc-800">K端花纹 B: 红斑三点 (Dots)</span>
                {customPatterns.kDots && (
                  <button
                    onClick={() => handleClearPattern('kDots')}
                    className="text-red-500 hover:text-red-700 transition-colors flex items-center gap-0.5 font-mono text-[10px]"
                  >
                    <Trash2 className="w-3 h-3" /> 重置
                  </button>
                )}
              </div>
              
              <div className="flex items-center gap-3">
                {customPatterns.kDots ? (
                  <img src={customPatterns.kDots} className="w-10 h-10 object-contain rounded bg-white border border-zinc-300 p-1" alt="kDots Thumbnail" />
                ) : (
                  <div className="w-10 h-10 rounded bg-zinc-200 border border-zinc-300 flex items-center justify-center text-[10px] font-mono text-zinc-400">SVG</div>
                )}
                
                <label className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded border border-black border-dashed bg-white text-zinc-700 hover:bg-zinc-50 text-xs font-medium cursor-pointer transition-colors select-none">
                  <Upload className="w-3.5 h-3.5 text-zinc-500" />
                  <span>上传 PNG 素材</span>
                  <input
                    type="file"
                    accept="image/png"
                    onChange={(e) => handleFileUpload('kDots', e.target.files ? e.target.files[0] : null)}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                  <span>花纹 B 缩放尺寸</span>
                  <span>{customPatterns.kDotsSize}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="600"
                  value={customPatterns.kDotsSize}
                  onChange={(e) => handlePatternSizeChange('kDotsSize', parseInt(e.target.value))}
                  className="w-full h-1 bg-zinc-200 rounded accent-black"
                />
              </div>
            </div>

          </div>
        </section>

        {/* Orbit configuration buttons */}
        <section id="orbit-configs" className="p-4 rounded-xl border border-zinc-200 space-y-4">
          <div className="flex items-center gap-1.5 text-zinc-800">
            <Info className="w-4 h-4 text-zinc-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider font-mono">星体自转设置 / ROTATION</h3>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-zinc-600 font-mono">状态: {isPlaying ? '自转开启 (PLAYING)' : '自转静止 (PAUSED)'}</span>
            <button
              id="toggle-rotation-btn"
              onClick={onTogglePlay}
              className={`p-2 rounded-lg border-2 flex items-center justify-center transition-all ${
                isPlaying 
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)]' 
                  : 'bg-zinc-50 border-zinc-300 text-zinc-500 hover:border-zinc-500'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono">
              <span>自转速度</span>
              <span>{rotationSpeed.toFixed(1)}x</span>
            </div>
            <input
              id="rotation-speed-slider"
              type="range"
              min="0.2"
              max="3"
              step="0.1"
              value={rotationSpeed}
              onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-zinc-200 rounded appearance-none cursor-pointer accent-black"
            />
          </div>
        </section>

      </div>

      {/* Footer controls */}
      <div className="p-4 border-t-2 border-black flex gap-3 bg-zinc-50">
        <button
          id="copy-config-btn"
          onClick={handleCopyConfig}
          className="flex-1 py-2.5 px-3 rounded border-2 border-black bg-white hover:bg-zinc-100 text-xs font-bold text-zinc-700 tracking-tight transition-all font-mono flex items-center justify-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          <Save className="w-3.5 h-3.5" />
          复制配置 (JSON)
        </button>
        <button
          id="reset-original-btn"
          onClick={() => onSetState({
            risk: 10,
            sensory: 10,
            rhythm: 80,
            specificity: 10,
            danger: 0,
            crackSize: 100,
            patternDensity: 8,
            strokeWidth: 2.5,
            cWaveSpan: 12,
            cDotSpan: 12,
            kChiliSpan: 12,
            kDotsSpan: 12,
          })}
          className="py-2.5 px-3 rounded border-2 border-black bg-zinc-100 hover:bg-zinc-200 text-zinc-800 transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          title="Reset to neutral defaults"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}

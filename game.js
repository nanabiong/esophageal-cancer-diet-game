const act3Files = {
  choices: "data/act3-choices.json",
  layouts: "data/layouts-act3.json"
};

const act0Files = {
  layouts: "data/layouts-act0.json"
};

const resultFiles = {
  layouts: "data/layouts-result.json"
};

const ACT3_STATES = {
  TITLE: "act3_state_00_title",
  FOOD_CHOICE: "act3_state_01_food_choice",
  DRINK_CHOICE: "act3_state_02_drink_choice"
};

const PHASES = {
  ACT0: "act0_alarm_intro",
  INTRO: "act3_intro",
  FOOD: "act3_food",
  DRINK: "act3_drink",
  EXIT_SCROLL: "act3_exit_scroll",
  RESULT_GALAXY_LOCATING: "result_galaxy_locating",
  RESULT_GALAXY: "result_galaxy"
};
const RESULT_STATES = {
  GALAXY_LOCATING: "result_state_00_galaxy_locating",
  DIET_GALAXY: "result_state_01_diet_galaxy"
};
const PREVIEW_ENTRY_CONFIG = {
  enabled: false,
  skipAct3AfterAct0: true,
  startAt: RESULT_STATES.GALAXY_LOCATING
};

const DESIGN_WIDTH = 1920;
const DESIGN_HEIGHT = 920;
const SHOW_DEBUG_LABELS = false;
const SELECTED_DRINK_SCALE = 1.3;
const TYPEWRITER_SPEED = 70;
const INTRO_WHEEL_COOLDOWN = 850;
const FOOD_GUIDE_SECOND_DELAY = 1000;
const HOTPOT_FLOATING_BUBBLE_CONFIG = {
  enabled: true,
  parentId: "act3_s01_main_hotpotTable",
  bounds: {
    x: 120,
    y: -160,
    width: 760,
    height: 140
  },
  images: [
    "assets/images/act3/effects/floating-bubble-1.png",
    "assets/images/act3/effects/floating-bubble-2.png",
    "assets/images/act3/effects/floating-bubble-3.png",
    "assets/images/act3/effects/floating-bubble-4.png"
  ],
  minSize: 42,
  maxSize: 86,
  minSpawnDelay: 900,
  maxSpawnDelay: 1600,
  minLifeTime: 1800,
  maxLifeTime: 3200,
  minFloatDistance: 12,
  maxFloatDistance: 32,
  maxCount: 5,
  zIndex: 8
};
const CHEER_ZONE_BREATH_BUBBLE_CONFIG = {
  enabled: true,
  parentId: "act3_s02_targetzone_cheers",
  id: "act3_s02_cheer_breath_bubble",
  x: 120,
  y: -90,
  width: 160,
  height: 120,
  image: "assets/images/act3/effects/cheer-breath-bubble.png",
  zIndex: 8,
  scaleMin: 0.96,
  scaleMax: 1.08,
  duration: 1600
};
const CHEERS_SPARKLE_CONFIG = {
  enabled: true,
  parentId: "act3_s02_targetzone_cheers",
  layerId: "act3_s02_cheers_sparkle_layer",
  count: 24,
  colors: ["#63ceff", "#ffd84d", "#fe66aa", "#ffffff"],
  minSize: 100,
  maxSize: 150,
  centerX: 0.5,
  centerY: 0.48,
  spreadX: 400,
  spreadY: 300,
  duration: 720,
  delayFromCheersStart: 240,
  sparkleTextOptions: ["✦", "✧", "✶", "★"]
};
const HOVER_TOOLTIP_CONFIG = {
  offsetX: 24,
  offsetY: 24,
  maxWidth: 360,
  showDelay: 80,
  hideDelay: 80
};
const ACT3_EXIT_SCROLL_CONFIG = {
  maxProgress: 1,
  resultDelay: 420,
  completeDelay: 1650
};
const ACT0_ALARM_DEFAULT_CONFIG = {
  maxHits: 3,
  backgroundLevels: [
    "#000000",
    "#2A241F",
    "#5E5144",
    "#F6EEDC"
  ],
  handAngles: [0, 35, 80, 130],
  minuteHandOrigin: "50% 90%",
  layerId: "act0-alarm-layer",
  clockId: "act0-clock",
  clockX: 960,
  clockY: 390,
  clockSize: 320,
  backgroundTransitionDuration: 760,
  hitDuration: 260,
  nextRingDelay: 720,
  completeDelay: 940,
  ringShakeDistance: 12,
  ringRotateDeg: 5,
  ringScale: 1.03,
  ringAnimationDuration: 140,
  ringLinesOpacity: 0.92,
  hourHandAngle: -48,
  imagePaths: {
    body: "assets/images/act0/clock/clock-body.png",
    hourHand: "assets/images/act0/clock/hour-hand.png",
    minuteHand: "assets/images/act0/clock/minute-hand.png",
    ringLines: "assets/images/act0/clock/ring-lines.png",
    hitFeedback: "assets/images/act0/clock/hand-hit.png"
  }
};
let ACT0_ALARM_CONFIG = {
  ...ACT0_ALARM_DEFAULT_CONFIG,
  imagePaths: {
    ...ACT0_ALARM_DEFAULT_CONFIG.imagePaths
  }
};
const RESULT_GALAXY_LOCATING_DEFAULT_CONFIG = {
  stateId: RESULT_STATES.GALAXY_LOCATING,
  particleCount: 120,
  colors: ["#87BDF9", "#F99605", "#4199FB", "#FAC4DE", "#FF74B7", "#88CF90", "#FFD933", "#F05618"],
  minSize: 10,
  maxSize: 60,
  fieldWidth: 1280,
  fieldHeight: 640,
  mouseFollowStrength: 42,
  depthMotionMultiplier: 1.5,
  floatStrength: 18,
  floatDurationMin: 4200,
  floatDurationMax: 7800,
  orbitRadiusMin: 28,
  orbitRadiusMax: 130,
  orbitSpeedMin: 0.00025,
  orbitSpeedMax: 0.00075,
  freeMotionDuration: 500,
  ringAssembleDuration: 16000,
  freeMotionSpreadX: 1920,
  freeMotionSpreadY: 920,
  orbitTiltDeg: -24,
  orbitDriftMin: 8,
  orbitDriftMax: 32,
  orbitNoiseMin: 6,
  orbitNoiseMax: 22,
  sharedRingRadiusX: 360,
  sharedRingRadiusY: 168,
  sharedRingSpeed: 0.00022,
  sharedRingDirection: 1,
  sharedRingPhaseJitter: 0.22,
  sharedRingRadialJitter: 26,
  sharedRingTangentialJitter: 18,
  revealBeforeRingComplete: 1200,
  revealDelay: 300,
  revealDuration: 720,
  collapseScale: 0.9,
  releaseScale: 1.04,
  floatAmplitudeMin: 12,
  floatAmplitudeMax: 46,
  selfRotateSpeedMin: -0.018,
  selfRotateSpeedMax: 0.018,
  rotationMin: -18,
  rotationMax: 18,
  particleStrokeColor: "#693618",
  particleStrokeWidth: 1.5,
  backgroundColor: "#F6EEDC",
  captionText: "正在定位你的饮食星系",
  ellipsisInterval: 420,
  captionWidth: 620,
  captionMinHeight: 110,
  captionBottom: 82,
  captionFontSize: 34,
  captionReveal: {
    text: "高压炙热星环",
    width: 350,
    minHeight: 110,
    fontSize: 34,
    bounceDuration: 680,
    particleCount: 18,
    particleMinSize: 10,
    particleMaxSize: 34,
    particleSpreadX: 520,
    particleSpreadY: 160,
    particleFloatDurationMin: 2600,
    particleFloatDurationMax: 5200,
    particleFadeDurationMin: 1800,
    particleFadeDurationMax: 3600,
    particleColors: ["#87BDF9", "#F99605", "#FAC4DE", "#88CF90", "#FFD933"],
    particleStrokeColor: "#693618",
    particleStrokeWidth: 1.5
  },
  imagePaths: {
    radial: "assets/images/result/shapes/radial.png",
    circle: "assets/images/result/shapes/circle.png",
    triangle: "assets/images/result/shapes/triangle.png",
    rect: "assets/images/result/shapes/rect.png"
  },
  centerPlanet: {
    enabled: true,
    x: 0,
    y: 0,
    size: 180,
    image: "assets/images/result/planet/high-pressure-hot-ring.png",
    fallbackColor: "#F4B6D2",
    strokeColor: "#693618",
    strokeWidth: 2,
    floatAmplitude: 16,
    floatDuration: 2600,
    mouseFollowStrength: 20,
    zIndex: 8
  }
};
let RESULT_GALAXY_LOCATING_CONFIG = {
  ...RESULT_GALAXY_LOCATING_DEFAULT_CONFIG,
  imagePaths: {
    ...RESULT_GALAXY_LOCATING_DEFAULT_CONFIG.imagePaths
  }
};
const ACT3_HOVER_INFO = {
  act3_s01_food_vegetable: {
    title: "蔬菜",
    body: "叶片在锅里慢慢舒展开，边缘变得柔软，吸进一点汤汁后颜色更深。夹起来时还带着水汽，是火锅里最容易被忽略、但总会被放进锅里的那一类食物。"
  },
  act3_s01_food_luncheonMeat: {
    title: "午餐肉",
    body: "方方正正的粉红色薄片，边缘被汤底煮得微微卷起。入口很软，带着均匀的咸香味，像火锅里最稳定、最不会出错的配角。"
  },
  act3_s01_food_sausage: {
    title: "小腊肠",
    body: "小小一截，煮过之后表面变得油亮，甜咸味会慢慢散进汤里。咬开时外皮有轻微弹性，里面的肉馅更紧实。"
  },
  act3_s01_food_youtiao: {
    title: "油条",
    body: "原本蓬松酥脆的油条进入锅里后，会迅速吸满汤汁，外层变软，里面还保留一点空心的结构。夹起来时比刚放进去沉了很多。"
  },
  act3_s01_food_maodu: {
    title: "毛肚",
    body: "薄薄的一片，表面有细密的纹理。在锅里轻轻涮过后会卷曲起来，入口爽脆，咀嚼时有很明显的弹性和颗粒感。"
  },
  act3_s01_food_daiRouCuiGu: {
    title: "带肉脆骨",
    body: "肉和脆骨连在一起，煮熟后边缘微微收紧。咬下去先是肉的柔韧感，然后是脆骨清脆的阻力，越嚼越有存在感。"
  },
  act3_s01_food_beefSlices: {
    title: "肥牛卷",
    body: "薄片卷成一圈，放进锅里很快展开并变色。脂肪纹理在汤里散开，入口柔软，带着火锅汤底的香气。"
  },
  act3_s01_target_clearPot: {
    title: "清汤锅",
    body: "汤色清亮，味道温和，更容易保留食材本身的口感和香气。"
  },
  act3_s01_target_spicyPot: {
    title: "辣锅",
    body: "红油翻滚，香料味浓，食材会裹上麻辣汤底的味道。"
  },
  act3_s02_drink_highAlcohol: {
    title: "威士忌",
    body: "酒精度数较高的琥珀色烈酒，入口辛辣，带有木质、烟熏或焦糖余味。"
  },
  act3_s02_drink_lowAlcohol: {
    title: "啤酒",
    body: "酒精度数较低，冰镇后杯壁会挂着水汽，泡沫细密，带有麦芽香、气泡感和轻微苦味。"
  },
  act3_s02_drink_softDrink: {
    title: "蜜瓜苏打",
    body: "不含酒精的软饮料，入口冰凉、有气泡感，会带出一种很人工、但很快乐的蜜瓜香味。"
  },
  act3_s02_drink_lemonWater: {
    title: "柠檬水",
    body: "不含酒精的软饮料，清透微酸，带有柠檬香气，口感清爽，火锅吃到一半时，它像是给嘴巴按了一下刷新键。"
  }
};

let act3Choices = null;
let act3Layouts = null;
let currentState = null;
let currentPhase = PHASES.ACT0;
let isTransitioning = false;
let isStateLocked = false;
let isIntroActive = false;
let introStep = 0;
let isWheelLocked = false;
let isIntroAnimating = false;
let activeIntroBubble = null;
let introTypewriterTimer = null;
let dragPayload = null;
let activeFoodDrag = null;
let selectedFoods = [];
const usedFoodIds = new Set();
let selectedDrinkId = null;
let isDrinkChoiceLocked = false;
let playerChoices = [];
let bubbleTimers = [];
let guidanceTimers = [];
let guidanceTypewriterTimers = [];
let activeGuidanceBubbles = new Map();
let hasFoodGuideShown = false;
let hasDrinkGuideShown = false;
let hotpotFloatingBubbleTimer = null;
let isHotpotFloatingBubblesActive = false;
let isAct3Complete = false;
let isAct3ScrollExitEnabled = false;
let isAct3ExitAnimating = false;
let hasAct3ExitStarted = false;
let act3ExitProgress = 0;
let resultGalaxyLayer = null;
let act0AlarmLayer = null;
let act0Clock = null;
let act0MinuteHand = null;
let act0HitFeedback = null;
let act0AlarmStep = 0;
let isAct0AlarmRinging = false;
let act0StepTimer = null;
let act0HitTimer = null;
let galaxyLocatingLayer = null;
let galaxyLocatingField = null;
let galaxyLocatingParticles = [];
let galaxyLocatingAnimationFrame = 0;
let galaxyLocatingPointerTargetX = 0;
let galaxyLocatingPointerTargetY = 0;
let galaxyLocatingPointerCurrentX = 0;
let galaxyLocatingPointerCurrentY = 0;
let galaxyLocatingPointerMoveHandler = null;
let galaxyLocatingPointerLeaveHandler = null;
let galaxyLocatingMotionStartTime = 0;
let galaxyLocatingCaptionDotsTimer = null;
let galaxyLocatingCaptionElement = null;
let galaxyLocatingCaptionMainElement = null;
let galaxyLocatingCaptionDotsElement = null;
let galaxyLocatingCaptionParticleLayer = null;
let galaxyLocatingRevealTimer = null;
let resultGalaxyRevealStarted = false;
let hoverInfoTooltip = null;
let hoverInfoShowTimer = null;
let hoverInfoHideTimer = null;
let objectLayer = null;
let transitionDuration = 900;
let isFoodChoiceLocked = false;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadAct3Data();
    setupStageScale();
    updateStageHeader("第三幕低保真原型", "夜晚——聚会与火锅");
    initializeStage();
    startConfiguredEntry();
  } catch (error) {
    showLoadError(error);
  }
});

async function loadAct3Data() {
  const [choicesResponse, layoutsResponse] = await Promise.all([
    fetch(act3Files.choices),
    fetch(act3Files.layouts)
  ]);

  if (!choicesResponse.ok) {
    throw new Error(`${act3Files.choices} 读取失败`);
  }

  if (!layoutsResponse.ok) {
    throw new Error(`${act3Files.layouts} 读取失败`);
  }

  act3Choices = await choicesResponse.json();
  act3Layouts = await layoutsResponse.json();
  await loadAct0Data();
  await loadResultData();
  transitionDuration = act3Layouts.defaults?.duration || transitionDuration;
  console.log("Act 3 数据读取完成：", { act3Choices, act3Layouts });
}

async function loadAct0Data() {
  try {
    const response = await fetch(act0Files.layouts);

    if (!response.ok) {
      throw new Error(`${act0Files.layouts} 读取失败`);
    }

    ACT0_ALARM_CONFIG = mergeAct0AlarmConfig(await response.json());
    console.log("Act 0 配置读取完成：", ACT0_ALARM_CONFIG);
  } catch (error) {
    ACT0_ALARM_CONFIG = mergeAct0AlarmConfig({});
    console.warn("Act 0 配置读取失败，使用默认配置：", error);
  }
}

function mergeAct0AlarmConfig(config) {
  return {
    ...ACT0_ALARM_DEFAULT_CONFIG,
    ...config,
    imagePaths: {
      ...ACT0_ALARM_DEFAULT_CONFIG.imagePaths,
      ...(config.imagePaths || {})
    }
  };
}

async function loadResultData() {
  try {
    const response = await fetch(resultFiles.layouts);

    if (!response.ok) {
      throw new Error(`${resultFiles.layouts} 读取失败`);
    }

    const layouts = await response.json();
    RESULT_GALAXY_LOCATING_CONFIG = mergeResultGalaxyLocatingConfig(
      layouts.galaxyLocating || layouts
    );
    console.log("Result 配置读取完成：", RESULT_GALAXY_LOCATING_CONFIG);
  } catch (error) {
    RESULT_GALAXY_LOCATING_CONFIG = mergeResultGalaxyLocatingConfig({});
    console.warn("Result 配置读取失败，使用默认配置：", error);
  }
}

function mergeResultGalaxyLocatingConfig(config) {
  return {
    ...RESULT_GALAXY_LOCATING_DEFAULT_CONFIG,
    ...config,
    imagePaths: {
      ...RESULT_GALAXY_LOCATING_DEFAULT_CONFIG.imagePaths,
      ...(config.imagePaths || {})
    },
    centerPlanet: {
      ...RESULT_GALAXY_LOCATING_DEFAULT_CONFIG.centerPlanet,
      ...(config.centerPlanet || {})
    },
    captionReveal: {
      ...RESULT_GALAXY_LOCATING_DEFAULT_CONFIG.captionReveal,
      ...(config.captionReveal || {})
    }
  };
}

function setupStageScale() {
  updateStageScale();
  window.addEventListener("resize", updateStageScale);
}

function updateStageScale() {
  const stageScaleShell = document.getElementById("frameTrack");
  const gameStage = document.querySelector(".act3-frame");

  if (!stageScaleShell) {
    return;
  }

  const scale = Math.min(
    window.innerWidth / DESIGN_WIDTH,
    window.innerHeight / DESIGN_HEIGHT,
    1
  );
  const scaledWidth = DESIGN_WIDTH * scale;
  const scaledHeight = DESIGN_HEIGHT * scale;

  stageScaleShell.style.width = `${scaledWidth}px`;
  stageScaleShell.style.height = `${scaledHeight}px`;

  if (gameStage) {
    gameStage.style.width = `${DESIGN_WIDTH}px`;
    gameStage.style.height = `${DESIGN_HEIGHT}px`;
    gameStage.style.transform = `scale(${scale})`;
  }
}

function updateStageHeader(label, title) {
  const labelElement = document.querySelector(".prototype-label");
  const titleElement = document.querySelector(".stage-ui h1");

  if (labelElement) {
    labelElement.textContent = label;
    labelElement.hidden = !SHOW_DEBUG_LABELS;
  }

  if (titleElement) {
    titleElement.textContent = title;
  }
}

function initializeStage() {
  const frameTrack = document.getElementById("frameTrack");
  const frame = document.createElement("section");

  frame.className = "scene-frame active act3-frame game-stage";
  frame.dataset.state = "act3_object_stage";
  objectLayer = document.createElement("div");
  objectLayer.className = "act3-object-layer";
  frame.appendChild(objectLayer);
  createHoverInfoTooltip();
  frame.addEventListener("click", handleStageClick);
  frame.addEventListener("wheel", handleStageWheel, { passive: false });
  frameTrack.innerHTML = "";
  frameTrack.appendChild(frame);
  updateStageScale();
}

function showLoadError(error) {
  const frameTrack = document.getElementById("frameTrack");
  const frame = document.createElement("section");

  frame.className = "scene-frame active act3-frame game-stage";
  frame.innerHTML = `
    <div class="act3-error-panel">
      <h2>数据读取失败</h2>
      <p>${error.message}</p>
      <p>请确认使用本地服务器打开页面，而不是直接双击 HTML 文件。</p>
    </div>
  `;
  frameTrack.innerHTML = "";
  frameTrack.appendChild(frame);
  updateStageScale();
  console.error(error);
}

function handleStageClick(event) {
  if (
    currentState !== ACT3_STATES.TITLE ||
    isIntroActive ||
    isStateLocked ||
    isTransitioning ||
    event.target.closest(".act3-scene-object")
  ) {
    return;
  }

  transitionToState(ACT3_STATES.FOOD_CHOICE);
}

function startAct3Intro() {
  currentPhase = PHASES.INTRO;
  isIntroActive = true;
  introStep = 0;
  currentState = "act3_intro_00_bubble_1";
  showIntroBubble("act3_intro_bubble_1");
}

function startConfiguredEntry() {
  if (!PREVIEW_ENTRY_CONFIG.enabled) {
    enterAct0();
    return;
  }

  startPreviewEntry();
}

function startPreviewEntry() {
  isIntroActive = false;
  introStep = 0;
  isWheelLocked = false;
  isIntroAnimating = false;
  isTransitioning = false;
  isStateLocked = false;
  hideIntroBubble();
  hideGuidanceBubbles();
  hideHoverInfoTooltip();
  stopHotpotFloatingBubbles();
  cleanupAct0Layer();
  cleanupGalaxyLocatingLayer();
  resultGalaxyLayer?.remove();
  resultGalaxyLayer = null;
  objectLayer?.classList.remove("act3-exit-sequence");
  hasAct3ExitStarted = false;
  isAct3ExitAnimating = false;
  isAct3ScrollExitEnabled = false;
  isAct3Complete = false;
  act3ExitProgress = 0;
  currentState = null;

  if (PREVIEW_ENTRY_CONFIG.startAt === RESULT_STATES.DIET_GALAXY) {
    enterResultGalaxyState();
    return;
  }

  enterGalaxyLocatingState();
}

function enterAct0() {
  resetAct0Timers();
  cleanupAct0Layer();
  currentPhase = PHASES.ACT0;
  currentState = "act0_alarm_01_ringing";
  act0AlarmStep = 0;
  isAct0AlarmRinging = false;
  isIntroActive = false;
  isWheelLocked = false;
  isIntroAnimating = false;
  isTransitioning = false;
  isStateLocked = true;
  hideIntroBubble();
  hideGuidanceBubbles();
  hideHoverInfoTooltip();
  createAct0Layer();
  updateAct0BackgroundLevel(0);
  updateAct0MinuteHand(0);
  startAct0Ringing();
}

function createAct0Layer() {
  const config = ACT0_ALARM_CONFIG;
  const layer = document.createElement("section");
  const clock = document.createElement("div");
  const body = document.createElement("div");
  const hourHand = document.createElement("div");
  const minuteHand = document.createElement("div");
  const ringLines = document.createElement("div");
  const hitFeedback = document.createElement("div");

  layer.id = config.layerId;
  layer.className = "act0-alarm-layer";
  layer.style.setProperty("--act0-bg-transition-duration", `${config.backgroundTransitionDuration}ms`);

  clock.id = config.clockId;
  clock.className = "act0-clock";
  clock.style.left = `${config.clockX}px`;
  clock.style.top = `${config.clockY}px`;
  clock.style.width = `${config.clockSize}px`;
  clock.style.height = `${config.clockSize}px`;
  clock.style.setProperty("--act0-ring-shake-distance", `${config.ringShakeDistance}px`);
  clock.style.setProperty("--act0-ring-rotate-deg", `${config.ringRotateDeg}deg`);
  clock.style.setProperty("--act0-ring-scale", `${config.ringScale}`);
  clock.style.setProperty("--act0-ring-duration", `${config.ringAnimationDuration}ms`);
  clock.style.setProperty("--act0-ring-lines-opacity", `${config.ringLinesOpacity}`);

  body.className = "clock-body";
  hourHand.className = "clock-hour-hand";
  minuteHand.className = "clock-minute-hand";
  ringLines.className = "alarm-ring-lines";
  hitFeedback.className = "hit-feedback";

  minuteHand.style.transformOrigin = config.minuteHandOrigin;
  hourHand.style.transform = `translateX(-50%) rotate(${config.hourHandAngle}deg)`;

  appendAct0OptionalImage(body, "clock-body-image", config.imagePaths.body);
  appendAct0OptionalImage(hourHand, "clock-hour-hand-image", config.imagePaths.hourHand);
  appendAct0OptionalImage(minuteHand, "clock-minute-hand-image", config.imagePaths.minuteHand);
  appendAct0OptionalImage(ringLines, "alarm-ring-lines-image", config.imagePaths.ringLines);
  appendAct0OptionalImage(hitFeedback, "hit-feedback-image", config.imagePaths.hitFeedback);

  clock.appendChild(body);
  clock.appendChild(hourHand);
  clock.appendChild(minuteHand);
  clock.appendChild(ringLines);
  clock.appendChild(hitFeedback);
  clock.addEventListener("click", handleAct0ClockClick);
  layer.appendChild(clock);
  objectLayer.appendChild(layer);

  act0AlarmLayer = layer;
  act0Clock = clock;
  act0MinuteHand = minuteHand;
  act0HitFeedback = hitFeedback;
}

function appendAct0OptionalImage(container, imageClassName, imagePath) {
  if (!imagePath) {
    return;
  }

  const image = document.createElement("img");

  image.className = `act0-clock-image ${imageClassName}`;
  image.alt = "";
  image.draggable = false;
  image.src = imagePath;
  image.onload = () => {
    container.classList.add("has-image");
  };
  image.onerror = () => {
    image.remove();
  };
  container.appendChild(image);
}

function handleAct0ClockClick() {
  if (currentPhase !== PHASES.ACT0 || !isAct0AlarmRinging || !act0Clock) {
    return;
  }

  const nextStep = Math.min(act0AlarmStep + 1, ACT0_ALARM_CONFIG.maxHits);
  const isFinalHit = nextStep >= ACT0_ALARM_CONFIG.maxHits;

  isAct0AlarmRinging = false;
  resetAct0Timers();
  stopAlarmSound();
  playHitSound();
  act0Clock.classList.remove("is-ringing");
  act0Clock.classList.add("is-hit");
  act0HitFeedback?.classList.add("is-visible");
  act0AlarmStep = nextStep;
  updateAct0BackgroundLevel(nextStep);
  updateAct0MinuteHand(nextStep);
  currentState = isFinalHit
    ? "act0_alarm_03_done"
    : `act0_alarm_0${nextStep}_snoozed`;

  act0HitTimer = window.setTimeout(() => {
    act0Clock?.classList.remove("is-hit");
    act0HitFeedback?.classList.remove("is-visible");
  }, ACT0_ALARM_CONFIG.hitDuration);

  act0StepTimer = window.setTimeout(() => {
    if (isFinalHit) {
      completeAct0();
      return;
    }

    startAct0Ringing();
  }, isFinalHit ? ACT0_ALARM_CONFIG.completeDelay : ACT0_ALARM_CONFIG.nextRingDelay);
}

function startAct0Ringing() {
  if (!act0Clock || !act0AlarmLayer || act0AlarmStep >= ACT0_ALARM_CONFIG.maxHits) {
    return;
  }

  const ringIndex = act0AlarmStep + 1;

  isAct0AlarmRinging = true;
  currentState = `act0_alarm_0${ringIndex}_ringing`;
  act0Clock.classList.remove("is-hit");
  act0HitFeedback?.classList.remove("is-visible");
  act0Clock.classList.add("is-ringing");
  playAlarmSound();
}

function updateAct0BackgroundLevel(levelIndex) {
  const color = ACT0_ALARM_CONFIG.backgroundLevels[
    Math.max(0, Math.min(levelIndex, ACT0_ALARM_CONFIG.backgroundLevels.length - 1))
  ];

  if (act0AlarmLayer) {
    act0AlarmLayer.style.backgroundColor = color;
  }
}

function updateAct0MinuteHand(stepIndex) {
  if (!act0MinuteHand) {
    return;
  }

  const angle = ACT0_ALARM_CONFIG.handAngles[
    Math.max(0, Math.min(stepIndex, ACT0_ALARM_CONFIG.handAngles.length - 1))
  ];

  act0MinuteHand.style.transform = `translateX(-50%) rotate(${angle}deg)`;
}

function completeAct0() {
  stopAlarmSound();
  isAct0AlarmRinging = false;
  isStateLocked = false;
  act0Clock?.classList.remove("is-ringing");
  act0Clock?.classList.add("is-completing");
  act0AlarmLayer?.classList.add("is-completing");

  window.setTimeout(() => {
    cleanupAct0Layer();
    if (PREVIEW_ENTRY_CONFIG.skipAct3AfterAct0) {
      startPreviewEntry();
      return;
    }

    startAct3Intro();
  }, ACT0_ALARM_CONFIG.completeDelay);
}

function resetAct0Timers() {
  if (act0StepTimer) {
    window.clearTimeout(act0StepTimer);
    act0StepTimer = null;
  }

  if (act0HitTimer) {
    window.clearTimeout(act0HitTimer);
    act0HitTimer = null;
  }
}

function cleanupAct0Layer() {
  resetAct0Timers();
  stopAlarmSound();
  act0AlarmLayer?.remove();
  act0AlarmLayer = null;
  act0Clock = null;
  act0MinuteHand = null;
  act0HitFeedback = null;
  act0AlarmStep = 0;
  isAct0AlarmRinging = false;
}

function playAlarmSound() {
}

function stopAlarmSound() {
}

function playHitSound() {
}

function handleStageWheel(event) {
  if (currentPhase === PHASES.INTRO) {
    handleIntroWheel(event);
    return;
  }

  if (currentPhase === PHASES.EXIT_SCROLL) {
    handleAct3ExitWheel(event);
  }
}

function handleIntroWheel(event) {
  if (!isIntroActive || event.deltaY <= 0 || isWheelLocked || isIntroAnimating) {
    return;
  }

  event.preventDefault();
  isWheelLocked = true;
  advanceIntroStep();

  window.setTimeout(() => {
    isWheelLocked = false;
  }, INTRO_WHEEL_COOLDOWN);
}

function advanceIntroStep() {
  introStep += 1;

  if (introStep === 1) {
    applyState(ACT3_STATES.TITLE, { animate: true });
    return;
  }

  if (introStep === 2) {
    hideIntroBubble();
    showIntroBubble("act3_intro_bubble_2");
    return;
  }

  if (introStep >= 3) {
    playIntroTitleToFoodChoice();
  }
}

function playIntroTitleToFoodChoice() {
  hideIntroBubble();
  isIntroAnimating = true;
  isWheelLocked = true;
  applyState("act3_intro_03_title_y_aligned", { animate: true, duration: 600 });

  window.setTimeout(() => {
    isIntroActive = false;
    transitionToState(ACT3_STATES.FOOD_CHOICE, { duration: 700 });
  }, 600);

  window.setTimeout(() => {
    isIntroAnimating = false;
    isWheelLocked = false;
  }, 1300);
}

function showIntroBubble(bubbleId) {
  const bubbleConfig = act3Layouts.introBubbles?.[bubbleId];

  if (!bubbleConfig) {
    return;
  }

  hideIntroBubble();

  const bubble = document.createElement("div");
  bubble.id = bubbleId;
  bubble.dataset.objectId = bubbleId;
  bubble.className = "intro-bubble";
  bubble.style.left = `${bubbleConfig.x}px`;
  bubble.style.top = `${bubbleConfig.y}px`;
  bubble.style.width = `${bubbleConfig.width}px`;
  bubble.style.height = `${bubbleConfig.height}px`;
  bubble.style.zIndex = bubbleConfig.zIndex ?? 12;
  bubble.style.setProperty("--intro-bubble-text-center-y", `${bubbleConfig.textCenterY ?? 71}px`);

  const imagePath = bubbleConfig.image || bubbleConfig.bgImage;

  if (imagePath) {
    const image = document.createElement("img");
    image.className = "intro-bubble-image";
    image.alt = bubbleConfig.label || bubbleId;
    image.draggable = false;
    image.src = imagePath;
    image.onload = () => {
      bubble.classList.add("has-intro-bubble-image");
    };
    image.onerror = () => {
      bubble.classList.remove("has-intro-bubble-image");
      image.remove();
    };
    bubble.appendChild(image);
  }

  const text = document.createElement("div");
  text.className = "intro-bubble-text";
  bubble.appendChild(text);
  objectLayer.appendChild(bubble);
  activeIntroBubble = bubble;
  startTypewriter(text, bubbleConfig.text || "", bubbleConfig.typewriterSpeed ?? TYPEWRITER_SPEED);
}

function hideIntroBubble() {
  stopTypewriter();

  if (activeIntroBubble) {
    activeIntroBubble.remove();
    activeIntroBubble = null;
  }
}

function startTypewriter(textElement, fullText, speed) {
  stopTypewriter();
  let index = 0;
  const characters = Array.from(fullText);
  textElement.textContent = "";

  introTypewriterTimer = window.setInterval(() => {
    textElement.textContent += characters[index] || "";
    index += 1;

    if (index >= characters.length) {
      stopTypewriter();
    }
  }, speed);
}

function stopTypewriter() {
  if (introTypewriterTimer) {
    window.clearInterval(introTypewriterTimer);
    introTypewriterTimer = null;
  }
}

function applyState(stateId, options = {}) {
  const state = getStateConfig(stateId);
  const targetObjects = Object.fromEntries(
    Object.entries(state.objects || {}).filter(([, objectConfig]) => (
      objectConfig.hide !== true &&
      objectConfig.visible !== false
    ))
  );
  const stateDuration = options.duration ?? transitionDuration;

  currentState = stateId;
  clearBubbleTimers();

  Object.entries(targetObjects).forEach(([objectId, objectConfig]) => {
    let element = getObjectElement(objectId);

    if (!element) {
      element = createObjectElement(objectId, objectConfig);
      updateObjectContent(element, objectId, objectConfig);

      if (options.animate && objectConfig.enterFrom) {
        enterNewObject(element, objectConfig, stateDuration);
        return;
      }

      objectLayer.appendChild(element);
    } else {
      updateObjectContent(element, objectId, objectConfig);
    }

    updateObjectLayout(element, objectConfig, {
      immediate: !options.animate,
      duration: options.animate ? stateDuration : null
    });
  });

  [...objectLayer.children].forEach((element) => {
    if (!element.classList.contains("act3-scene-object")) {
      return;
    }

    if (targetObjects[element.dataset.objectId]) {
      return;
    }

    if (options.animate) {
      updateObjectLayout(element, getExitLayout(element, state), {
        exiting: true,
        duration: stateDuration
      });
      element.classList.add("is-exiting");
    } else {
      element.remove();
    }
  });

  window.setTimeout(() => {
    cleanupExitedObjects();
    setupStateInteractions(stateId);
  }, options.animate ? stateDuration : 0);
}

function transitionToState(nextStateId, options = {}) {
  if (isTransitioning) {
    return;
  }

  const stateDuration = options.duration ?? transitionDuration;
  isTransitioning = true;
  isStateLocked = true;
  setButtonsDisabled(true);
  applyState(nextStateId, { animate: true, duration: stateDuration });

  window.setTimeout(() => {
    isTransitioning = false;
    isStateLocked = false;
    setButtonsDisabled(false);
    handleStateEntered(nextStateId);
  }, stateDuration);
}

function createObjectElement(objectId, objectConfig) {
  let element;

  if (objectConfig.type === "food" || objectConfig.type === "drink") {
    element = document.createElement("button");
    element.type = "button";
  } else {
    element = document.createElement("div");
  }

  element.id = objectId;
  element.dataset.objectId = objectId;
  element.dataset.objectType = objectConfig.type;
  element.className = getObjectClassName(objectConfig.type);
  return element;
}

function updateObjectContent(element, objectId, objectConfig) {
  element.className = getObjectClassName(objectConfig.type);
  element.classList.toggle("allow-overflow", Boolean(objectConfig.allowOverflow));
  element.dataset.objectType = objectConfig.type;
  element.dataset.label = objectConfig.label || objectConfig.name || objectId;

  if (objectConfig.type === "titleFrame") {
    element.innerHTML = objectConfig.hideText ? "" : (objectConfig.content || "");
  }

  if (objectConfig.type === "bubble") {
    element.textContent = objectConfig.hideText ? "" : (objectConfig.content || "");
  }

  if (objectConfig.type === "hotpotTable") {
    ensureHotpotTableContent(element);
  }

  syncFrameBackgroundImage(element, objectConfig);
  syncObjectImage(element, objectConfig, objectConfig.label || objectConfig.name || objectId);

  if (objectConfig.type === "cheersZone") {
    ensureSimpleFrameLabel(element, "act3_s02_targetzone_cheers");
  }

  if (objectConfig.type === "drinkTable") {
    ensureSimpleFrameLabel(element, "饮品列表");
  }

  if (objectConfig.type === "complete") {
    element.innerHTML = `
      <p class="act3-kicker">Act 3 Complete</p>
      <h2>第三幕完成</h2>
      <p>进入下一幕占位。请打开控制台查看完整 playerChoices。</p>
      <pre class="act3-debug-output">${JSON.stringify(playerChoices, null, 2)}</pre>
    `;
  }

  syncChildObjects(element, objectConfig);
}

function ensureHotpotTableContent(element) {
  if (element.querySelector(".act3-table-surface")) {
    return;
  }

  const surface = document.createElement("div");
  surface.className = "act3-table-surface";
  surface.innerHTML = `
    <span class="act3-table-title">act3_s01_main_hotpotTable</span>
    <span class="act3-table-note">低保真占位画框</span>
  `;
  element.appendChild(surface);
}

function syncFrameBackgroundImage(element, objectConfig) {
  const imagePath = objectConfig.bgImage || objectConfig.backgroundImage;
  const existingImage = element.querySelector(":scope > .frame-bg-image");

  element.classList.remove("has-bg-image");
  element.classList.remove("has-loaded-bg-image");

  if (!imagePath) {
    existingImage?.remove();
    return;
  }

  element.classList.add("has-bg-image");

  const image = existingImage || document.createElement("img");

  image.className = "frame-bg-image";
  image.alt = objectConfig.label || objectConfig.name || element.dataset.objectId || "";
  image.src = imagePath;
  image.onload = () => {
    element.classList.add("has-loaded-bg-image");
  };
  image.onerror = () => {
    element.classList.remove("has-bg-image");
    element.classList.remove("has-loaded-bg-image");
    image.remove();
  };

  if (!existingImage) {
    element.prepend(image);
  }
}

function syncObjectImage(element, objectConfig, fallbackLabel) {
  const existingImage = element.querySelector(":scope > .asset-image");

  element.classList.remove("has-loaded-asset-image");
  element.classList.remove("has-image");

  if (!objectConfig.image) {
    existingImage?.remove();
    return;
  }

  const image = existingImage || document.createElement("img");

  image.className = "asset-image";
  image.alt = fallbackLabel || objectConfig.id || "";
  image.draggable = false;
  image.src = objectConfig.image;
  image.onload = () => {
    element.classList.add("has-image");
    element.classList.add("has-loaded-asset-image");
  };
  image.onerror = () => {
    element.classList.remove("has-image");
    element.classList.remove("has-loaded-asset-image");
    image.remove();
    if (!element.textContent.trim()) {
      element.textContent = fallbackLabel || "";
    }
  };

  if (!existingImage) {
    element.appendChild(image);
  }
}

function ensureSimpleFrameLabel(element, text) {
  if (element.querySelector(".act3-frame-label")) {
    element.querySelector(".act3-frame-label").textContent = text;
    return;
  }

  const label = document.createElement("strong");
  label.className = "act3-frame-label";
  label.textContent = text;
  element.appendChild(label);
}

function syncChildObjects(parentElement, objectConfig) {
  const children = getChildrenConfig(objectConfig);

  if (!children) {
    return;
  }

  Object.entries(children).forEach(([childId, childConfig]) => {
    let child = parentElement.querySelector(`[data-object-id="${childId}"]`);

    if (!child) {
      child = createChildObjectElement(childId, childConfig);
      if (childConfig.type === "food") {
        syncUsedFoodState(child, childId);
      }
      parentElement.appendChild(child);
    }

    updateChildObjectContent(child, childId, childConfig);
    updateChildObjectLayout(child, childConfig, objectConfig);
  });
}

function getChildrenConfig(objectConfig) {
  if (objectConfig.children) {
    return objectConfig.children;
  }

  if (objectConfig.childrenRef) {
    return act3Layouts.sharedChildren?.[objectConfig.childrenRef] || null;
  }

  return null;
}

function createChildObjectElement(childId, childConfig) {
  let child;

  if (childConfig.type === "food" || childConfig.type === "drink") {
    child = document.createElement("button");
    child.type = "button";
  } else {
    child = document.createElement("div");
  }

  child.id = childId;
  child.dataset.objectId = childId;
  child.dataset.objectType = childConfig.type;
  child.className = getChildObjectClassName(childConfig.type);

  if (childConfig.type === "food") {
    syncUsedFoodState(child, childId);
  }

  return child;
}

function updateChildObjectContent(child, childId, childConfig) {
  const wasSelected = child.classList.contains("is-selected");

  child.className = getChildObjectClassName(childConfig.type);

  if (wasSelected) {
    child.classList.add("is-selected");
  }

  child.dataset.objectType = childConfig.type;
  child.dataset.label = childConfig.label || childConfig.name || childId;

  if (childConfig.type === "food") {
    syncUsedFoodState(child, childId);
  }

  if (childConfig.type === "foodTarget") {
    const target = act3Choices.foodTargets.find((item) => item.id === childId);

    child.dataset.targetId = target.id;
    child.dataset.targetName = target.name;
    child.innerHTML = `
      <strong>${target.name}</strong>
      <span class="act3-pot-counter">${getPotCount(target.id)} 个菜</span>
    `;
    syncObjectImage(child, childConfig, target.name);
    bindDropTarget(child, "food");
  }

  if (childConfig.type === "food") {
    const food = act3Choices.foods.find((item) => item.id === childId);
    const isUsedFood = usedFoodIds.has(childId);

    child.dataset.type = "food";
    child.dataset.id = food.id;
    if (childConfig.image) {
      syncObjectImage(child, childConfig, food.name);
    } else {
      syncObjectImage(child, childConfig, food.name);
      child.textContent = wasSelected ? child.textContent : food.name;
    }
    syncUsedFoodState(child, childId);
    child.draggable = false;
    child.classList.toggle("is-food-drag-locked", currentState !== ACT3_STATES.FOOD_CHOICE && !isUsedFood);
    child.classList.toggle("interactive-option", currentState === ACT3_STATES.FOOD_CHOICE && !isUsedFood);
    bindDragSource(child, "food", food.id);
  }

  if (childConfig.type === "cup") {
    child.textContent = childConfig.content || "朋友的杯子";
    syncObjectImage(child, childConfig, childConfig.content || "朋友的杯子");
  }

  if (childConfig.type === "drinkTarget") {
    child.dataset.targetId = "act3_s02_target_emptyCup";
    child.dataset.targetName = act3Choices.drinkTarget.name;
    child.textContent = child.classList.contains("filled") ? child.textContent : (childConfig.content || "空杯位置");
    syncObjectImage(child, childConfig, childConfig.content || act3Choices.drinkTarget.name);
    bindDropTarget(child, "drink");
  }

  if (childConfig.type === "drink") {
    const drink = act3Choices.drinks.find((item) => item.id === childId);

    child.dataset.type = "drink";
    child.dataset.id = drink.id;
    if (childConfig.image) {
      syncObjectImage(child, childConfig, drink.name);
    } else {
      syncObjectImage(child, childConfig, drink.name);
      child.textContent = wasSelected ? child.textContent : drink.name;
    }
    child.draggable = !wasSelected;
    child.classList.toggle("interactive-option", currentState === ACT3_STATES.DRINK_CHOICE && !wasSelected);
    bindDragSource(child, "drink", drink.id);
  }

  bindHoverInfo(child, childId);
}

function updateChildObjectLayout(child, childConfig, parentConfig) {
  child.style.left = `${(childConfig.x / parentConfig.width) * 100}%`;
  child.style.top = `${(childConfig.y / parentConfig.height) * 100}%`;
  child.style.width = `${(childConfig.width / parentConfig.width) * 100}%`;
  child.style.height = `${(childConfig.height / parentConfig.height) * 100}%`;
  child.style.opacity = childConfig.opacity ?? 1;
  child.style.zIndex = childConfig.zIndex ?? 1;
  child.style.transformOrigin = childConfig.transformOrigin || "left top";
  child.style.transform = `scale(${childConfig.scale ?? 1})`;
}

function updateObjectLayout(element, objectConfig, options = {}) {
  const stage = act3Layouts.stage;

  if (options.immediate) {
    element.classList.add("no-transition");
  } else {
    element.classList.remove("no-transition");
  }

  if (options.duration != null) {
    element.style.transitionDuration = `${options.duration}ms`;
  } else {
    element.style.transitionDuration = "";
  }

  element.style.left = `${(objectConfig.x / stage.width) * 100}%`;
  element.style.top = `${(objectConfig.y / stage.height) * 100}%`;
  element.style.width = `${(objectConfig.width / stage.width) * 100}%`;
  element.style.height = `${(objectConfig.height / stage.height) * 100}%`;
  const baseOpacity = objectConfig.opacity ?? 1;
  element.dataset.baseOpacity = String(baseOpacity);
  element.style.opacity = baseOpacity;
  element.style.zIndex = objectConfig.zIndex ?? 1;
  element.style.transformOrigin = objectConfig.transformOrigin || "left top";
  setObjectBaseTransform(element, objectConfig.scale ?? 1);

  if (options.exiting) {
    element.dataset.exiting = "true";
  }

  if (options.immediate) {
    element.offsetHeight;
    element.classList.remove("no-transition");
  }
}

function setObjectBaseTransform(element, scale) {
  element.dataset.baseScale = String(scale);
  applyObjectTransform(element);
}

function applyObjectTransform(element) {
  const scale = Number(element.dataset.baseScale || 1);

  element.style.transform = `scale(${scale})`;
}

function enterNewObject(element, finalConfig, duration = transitionDuration) {
  const initialConfig = getEnterLayout(finalConfig);

  element.classList.add("no-transition");
  updateObjectLayout(element, initialConfig, { immediate: true });
  objectLayer.appendChild(element);

  element.offsetHeight;

  requestAnimationFrame(() => {
    element.classList.remove("no-transition");
    updateObjectLayout(element, finalConfig, { duration });
  });
}

function getEnterLayout(objectConfig) {
  const stage = act3Layouts.stage;
  const layout = { ...objectConfig };

  if (objectConfig.enterFrom === "enterFromBottom") {
    layout.y = stage.height + 100;
    layout.opacity = 1;
  }

  if (objectConfig.enterFrom === "enterFromTop") {
    layout.x = objectConfig.x;
    layout.y = objectConfig.y - stage.height;
    layout.width = objectConfig.width;
    layout.height = objectConfig.height;
    layout.opacity = 1;
  }

  if (objectConfig.enterFrom === "enterFromRight") {
    layout.x = stage.width + 100;
    layout.opacity = 1;
  }

  if (objectConfig.enterFrom === "scaleFromTopLeft") {
    layout.scale = 0.08;
    layout.opacity = 0;
    layout.transformOrigin = "left top";
  }

  return layout;
}

function getExitLayout(element, stateConfig) {
  const objectId = element.dataset.objectId;
  const stage = act3Layouts.stage;
  const currentLayout = getLayoutFromElement(element);
  const exitType = stateConfig.exit?.[objectId] || "fadeOut";
  const layout = { ...currentLayout };

  if (exitType === "exitToRight") {
    layout.x = stage.width + 100;
    layout.opacity = 1;
  } else {
    layout.opacity = 0;
  }

  return layout;
}

function cleanupExitedObjects() {
  objectLayer.querySelectorAll('[data-exiting="true"]').forEach((element) => {
    element.remove();
  });
}

function enableAct3ScrollExit() {
  if (isAct3ScrollExitEnabled) {
    return;
  }

  isAct3Complete = true;
  isAct3ScrollExitEnabled = true;
  currentPhase = PHASES.EXIT_SCROLL;
  isStateLocked = true;
  isFoodChoiceLocked = true;
  isDrinkChoiceLocked = true;
  act3ExitProgress = 0;
  hideHoverInfoTooltip();
  hideGuidanceBubbles();
  stopHotpotFloatingBubbles();
  console.log("Act 3 scroll exit enabled", {
    playerChoices,
    readyToExit: true
  });
}

function handleAct3ExitWheel(event) {
  if (
    !isAct3ScrollExitEnabled ||
    hasAct3ExitStarted ||
    isAct3ExitAnimating ||
    activeFoodDrag ||
    dragPayload
  ) {
    return;
  }

  if (event.deltaY <= 0) {
    return;
  }

  event.preventDefault();
  startAct3ExitSequence();
}

function ensureResultGalaxyLayer() {
  if (resultGalaxyLayer) {
    return resultGalaxyLayer;
  }

  resultGalaxyLayer = document.createElement("section");
  resultGalaxyLayer.id = RESULT_STATES.DIET_GALAXY;
  resultGalaxyLayer.className = "result-galaxy-layer";
  resultGalaxyLayer.innerHTML = `
    <div class="result-galaxy-card">
      <p class="result-galaxy-kicker">Result 1</p>
      <h2>&#39278;&#39135;&#26143;&#31995;</h2>
      <p>&#20320;&#30340;&#39278;&#39135;&#20542;&#21521;&#27491;&#22312;&#27719;&#32858;&hellip;&hellip;</p>
    </div>
  `;
  objectLayer.appendChild(resultGalaxyLayer);
  return resultGalaxyLayer;
}

function updateResultGalaxyProgress(progress) {
  const layer = ensureResultGalaxyLayer();

  if (progress >= 1) {
    layer.classList.add("result-enter");
  }
}

function startAct3ExitSequence() {
  if (hasAct3ExitStarted) {
    return;
  }

  hasAct3ExitStarted = true;
  isAct3ExitAnimating = true;
  isAct3ScrollExitEnabled = false;
  hideHoverInfoTooltip();
  hideGuidanceBubbles();
  stopHotpotFloatingBubbles();
  objectLayer.classList.add("act3-exit-sequence");

  window.setTimeout(() => {
    enterGalaxyLocatingState();
  }, ACT3_EXIT_SCROLL_CONFIG.completeDelay);
}

function enterGalaxyLocatingState() {
  if (currentPhase === PHASES.RESULT_GALAXY_LOCATING) {
    return;
  }

  act3ExitProgress = ACT3_EXIT_SCROLL_CONFIG.maxProgress;
  isAct3ScrollExitEnabled = false;
  isAct3ExitAnimating = false;
  currentPhase = PHASES.RESULT_GALAXY_LOCATING;
  currentState = RESULT_STATES.GALAXY_LOCATING;
  createGalaxyLocatingLayer();
  console.log("Entered result_state_00_galaxy_locating", {
    playerChoices,
    act3ExitProgress
  });
}

function enterResultGalaxyState() {
  if (currentPhase === PHASES.RESULT_GALAXY) {
    return;
  }

  cleanupGalaxyLocatingLayer();
  act3ExitProgress = ACT3_EXIT_SCROLL_CONFIG.maxProgress;
  isAct3ScrollExitEnabled = false;
  isAct3ExitAnimating = false;
  currentPhase = PHASES.RESULT_GALAXY;
  currentState = RESULT_STATES.DIET_GALAXY;
  updateResultGalaxyProgress(1);
  console.log("Entered result_state_01_diet_galaxy", {
    playerChoices,
    act3ExitProgress
  });
}

function createGalaxyLocatingLayer() {
  cleanupGalaxyLocatingLayer();

  const config = RESULT_GALAXY_LOCATING_CONFIG;
  const layer = document.createElement("section");
  const field = document.createElement("div");
  const caption = document.createElement("div");
  const captionText = document.createElement("div");
  const captionMain = document.createElement("span");
  const captionDots = document.createElement("span");
  const captionParticleLayer = document.createElement("div");

  layer.id = config.stateId;
  layer.className = "result-galaxy-locating-layer";
  layer.style.setProperty("--result-locating-bg", config.backgroundColor);
  layer.style.setProperty("--result-locating-field-width", `${config.fieldWidth}px`);
  layer.style.setProperty("--result-locating-field-height", `${config.fieldHeight}px`);
  layer.style.setProperty("--result-locating-particle-stroke-color", config.particleStrokeColor);
  layer.style.setProperty("--result-locating-particle-stroke-width", `${config.particleStrokeWidth}px`);
  layer.style.setProperty("--result-locating-caption-width", `${config.captionWidth}px`);
  layer.style.setProperty("--result-locating-caption-min-height", `${config.captionMinHeight}px`);
  layer.style.setProperty("--result-locating-caption-bottom", `${config.captionBottom}px`);
  layer.style.setProperty("--result-locating-caption-font-size", `${config.captionFontSize}px`);
  layer.style.setProperty("--result-galaxy-reveal-duration", `${config.revealDuration}ms`);
  layer.style.setProperty("--result-galaxy-collapse-scale", config.collapseScale);
  layer.style.setProperty("--result-galaxy-release-scale", config.releaseScale);
  layer.style.setProperty("--result-caption-reveal-bounce-duration", `${config.captionReveal.bounceDuration}ms`);
  layer.style.setProperty("--result-caption-particle-stroke-color", config.captionReveal.particleStrokeColor);
  layer.style.setProperty("--result-caption-particle-stroke-width", `${config.captionReveal.particleStrokeWidth}px`);

  field.className = "result-locating-field";
  caption.className = "result-locating-caption";
  captionText.className = "result-locating-caption-text";
  captionMain.className = "result-locating-caption-main";
  captionDots.className = "result-locating-caption-dots";
  captionParticleLayer.className = "result-caption-particle-layer";
  captionMain.textContent = config.captionText;
  captionText.appendChild(captionMain);
  captionText.appendChild(captionDots);
  caption.appendChild(captionParticleLayer);
  caption.appendChild(captionText);
  layer.appendChild(field);
  layer.appendChild(caption);
  objectLayer.appendChild(layer);

  galaxyLocatingLayer = layer;
  galaxyLocatingField = field;
  galaxyLocatingCaptionElement = caption;
  galaxyLocatingCaptionMainElement = captionMain;
  galaxyLocatingCaptionDotsElement = captionDots;
  galaxyLocatingCaptionParticleLayer = captionParticleLayer;
  resultGalaxyRevealStarted = false;
  generateGalaxyParticles();
  createGalaxyCenterPlanet();
  bindGalaxyLocatingParallax();
  startGalaxyLocatingCaptionDots();
  scheduleGalaxyLocatingReveal();

  window.requestAnimationFrame(() => {
    galaxyLocatingLayer?.classList.add("is-visible");
  });

  return layer;
}

function scheduleGalaxyLocatingReveal() {
  const config = RESULT_GALAXY_LOCATING_CONFIG;
  const ringRevealTime = Math.max(
    0,
    config.ringAssembleDuration - config.revealBeforeRingComplete
  );
  const revealDelay =
    config.freeMotionDuration + ringRevealTime + config.revealDelay;

  if (galaxyLocatingRevealTimer) {
    window.clearTimeout(galaxyLocatingRevealTimer);
  }

  galaxyLocatingRevealTimer = window.setTimeout(() => {
    triggerGalaxyLocatingReveal();
  }, revealDelay);
}

function triggerGalaxyLocatingReveal() {
  if (!galaxyLocatingField || resultGalaxyRevealStarted) {
    return;
  }

  resultGalaxyRevealStarted = true;
  currentState = "result_state_00_galaxy_locating_reveal";
  galaxyLocatingField.classList.add("is-revealing");
  document.getElementById("result-galaxy-center-planet")?.classList.add("is-visible");
  revealGalaxyLocatingCaption();
}

function revealGalaxyLocatingCaption() {
  const config = RESULT_GALAXY_LOCATING_CONFIG.captionReveal;

  if (!galaxyLocatingCaptionElement || !galaxyLocatingCaptionMainElement) {
    return;
  }

  if (galaxyLocatingCaptionDotsTimer) {
    window.clearInterval(galaxyLocatingCaptionDotsTimer);
    galaxyLocatingCaptionDotsTimer = null;
  }

  galaxyLocatingCaptionMainElement.textContent = config.text;
  galaxyLocatingLayer?.style.setProperty("--result-locating-caption-width", `${config.width}px`);
  galaxyLocatingLayer?.style.setProperty("--result-locating-caption-min-height", `${config.minHeight}px`);
  galaxyLocatingLayer?.style.setProperty("--result-locating-caption-font-size", `${config.fontSize}px`);

  if (galaxyLocatingCaptionDotsElement) {
    galaxyLocatingCaptionDotsElement.textContent = "";
  }

  galaxyLocatingCaptionElement.classList.remove("caption-reveal-bounce");
  galaxyLocatingCaptionElement.classList.add("is-revealed");
  void galaxyLocatingCaptionElement.offsetWidth;
  galaxyLocatingCaptionElement.classList.add("caption-reveal-bounce");
  generateGalaxyCaptionRevealParticles();
}

function generateGalaxyCaptionRevealParticles() {
  const config = RESULT_GALAXY_LOCATING_CONFIG.captionReveal;
  const shapeTypes = ["radial", "circle", "triangle", "rect"];

  if (!galaxyLocatingCaptionParticleLayer) {
    return;
  }

  galaxyLocatingCaptionParticleLayer.innerHTML = "";

  for (let index = 0; index < config.particleCount; index += 1) {
    const size = randomBetween(config.particleMinSize, config.particleMaxSize);
    const angle = randomBetween(0, Math.PI * 2);
    const distance = randomBetween(0.72, 1.08);
    const startX = Math.cos(angle) * config.particleSpreadX * 0.38 * distance;
    const startY = Math.sin(angle) * config.particleSpreadY * 0.42 * distance;
    const moveX = Math.cos(angle) * randomBetween(10, 34);
    const moveY = Math.sin(angle) * randomBetween(8, 26) - randomBetween(4, 18);
    const shapeType = randomItem(shapeTypes) || "circle";
    const particle = document.createElement("div");
    const shape = document.createElement("div");
    const image = document.createElement("div");

    particle.className = "result-caption-particle";
    shape.className = `result-locating-shape is-${shapeType}`;
    image.className = "result-locating-shape-image";

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `calc(50% + ${startX.toFixed(2)}px)`;
    particle.style.top = `calc(50% + ${startY.toFixed(2)}px)`;
    particle.style.setProperty("--caption-particle-x", `${moveX.toFixed(2)}px`);
    particle.style.setProperty("--caption-particle-y", `${moveY.toFixed(2)}px`);
    particle.style.setProperty("--caption-particle-rotation", `${randomBetween(-28, 28).toFixed(2)}deg`);
    particle.style.setProperty(
      "--caption-particle-float-duration",
      `${Math.round(randomBetween(config.particleFloatDurationMin, config.particleFloatDurationMax))}ms`
    );
    particle.style.setProperty(
      "--caption-particle-fade-duration",
      `${Math.round(randomBetween(config.particleFadeDurationMin, config.particleFadeDurationMax))}ms`
    );
    particle.style.setProperty("--caption-particle-delay", `${Math.round(randomBetween(-1800, 0))}ms`);

    shape.style.color = randomItem(config.particleColors) || "#87BDF9";
    shape.style.setProperty("--particle-shape-image", `url("${RESULT_GALAXY_LOCATING_CONFIG.imagePaths[shapeType] || ""}")`);
    image.style.backgroundImage = "var(--particle-shape-image)";

    shape.appendChild(image);
    particle.appendChild(shape);
    galaxyLocatingCaptionParticleLayer.appendChild(particle);
  }
}

function createGalaxyCenterPlanet() {
  const config = RESULT_GALAXY_LOCATING_CONFIG.centerPlanet;

  if (!galaxyLocatingField || !config?.enabled) {
    return;
  }

  const planet = document.createElement("div");
  const image = document.createElement("img");

  planet.id = "result-galaxy-center-planet";
  planet.className = "result-galaxy-center-planet";
  planet.style.width = `${config.size}px`;
  planet.style.height = `${config.size}px`;
  planet.style.left = `calc(50% + ${config.x}px)`;
  planet.style.top = `calc(50% + ${config.y}px)`;
  planet.style.zIndex = `${config.zIndex}`;
  planet.style.setProperty("--result-center-planet-color", config.fallbackColor);
  planet.style.setProperty("--result-center-planet-stroke-color", config.strokeColor);
  planet.style.setProperty("--result-center-planet-stroke-width", `${config.strokeWidth}px`);
  planet.style.setProperty("--result-center-planet-float-amplitude", `${config.floatAmplitude}px`);
  planet.style.setProperty("--result-center-planet-float-duration", `${config.floatDuration}ms`);
  planet.style.setProperty("--result-center-planet-parallax-x", "0px");
  planet.style.setProperty("--result-center-planet-parallax-y", "0px");

  if (config.image) {
    image.className = "result-galaxy-center-planet-image";
    image.alt = "";
    image.draggable = false;
    image.decoding = "async";
    image.loading = "eager";
    image.src = config.image;
    image.onload = () => {
      planet.classList.add("has-image");
    };
    image.onerror = () => {
      image.remove();
    };
    planet.appendChild(image);

    if (image.decode) {
      image.decode().catch(() => {});
    }
  }

  galaxyLocatingField.appendChild(planet);
}

function generateGalaxyParticles() {
  if (!galaxyLocatingField) {
    return;
  }

  const config = RESULT_GALAXY_LOCATING_CONFIG;
  const shapeTypes = ["radial", "circle", "triangle", "rect"];

  galaxyLocatingField.innerHTML = "";
  galaxyLocatingParticles = [];

  for (let index = 0; index < config.particleCount; index += 1) {
    const size = randomBetween(config.minSize, config.maxSize);
    const normalizedSize = normalizeValue(size, config.minSize, config.maxSize);
    const depth = 0.35 + normalizedSize * 0.85;
    const angle = randomBetween(0, Math.PI * 2);
    const distance = Math.sqrt(Math.random());
    const ellipseRadiusX = Math.max(0, config.freeMotionSpreadX - size * 0.5) * distance;
    const ellipseRadiusY = Math.max(0, config.freeMotionSpreadY - size * 0.5) * distance;
    const offsetX = Math.cos(angle) * ellipseRadiusX + randomBetween(-80, 80);
    const offsetY = Math.sin(angle) * ellipseRadiusY + randomBetween(-58, 58);
    const rotation = randomBetween(config.rotationMin, config.rotationMax);
    const scale = 0.72 + normalizedSize * 0.58;
    const shapeType = randomItem(shapeTypes) || "circle";
    const ringSlotPhase = (index / Math.max(1, config.particleCount)) * Math.PI * 2;
    const ringPhaseOffset = randomBetween(-config.sharedRingPhaseJitter, config.sharedRingPhaseJitter);
    const ringRadialOffset = randomBetween(-config.sharedRingRadialJitter, config.sharedRingRadialJitter);
    const ringTangentialOffset = randomBetween(-config.sharedRingTangentialJitter, config.sharedRingTangentialJitter);
    const orbitRadiusX = randomBetween(config.orbitRadiusMin, config.orbitRadiusMax);
    const orbitRadiusY = randomBetween(config.orbitRadiusMin * 0.7, config.orbitRadiusMax * 0.92);
    const orbitSpeed = randomBetween(config.orbitSpeedMin, config.orbitSpeedMax);
    const orbitDirection = Math.random() >= 0.5 ? 1 : -1;
    const orbitPhase = randomBetween(0, Math.PI * 2);
    const orbitDriftX = randomBetween(config.orbitDriftMin, config.orbitDriftMax);
    const orbitDriftY = randomBetween(config.orbitDriftMin * 0.7, config.orbitDriftMax * 0.92);
    const orbitNoiseX = randomBetween(config.orbitNoiseMin, config.orbitNoiseMax);
    const orbitNoiseY = randomBetween(config.orbitNoiseMin * 0.7, config.orbitNoiseMax * 0.9);
    const orbitNoisePhase = randomBetween(0, Math.PI * 2);
    const orbitNoiseSpeed = randomBetween(0.00018, 0.00042);
    const trackBias = randomBetween(-0.18, 0.18);
    const floatAmplitude = randomBetween(config.floatAmplitudeMin, config.floatAmplitudeMax);
    const floatPhase = randomBetween(0, Math.PI * 2);
    const floatSpeedX = randomBetween(0.00022, 0.00052);
    const floatSpeedY = randomBetween(0.00028, 0.00062);
    const selfRotateSpeed = randomBetween(config.selfRotateSpeedMin, config.selfRotateSpeedMax);
    const selfRotatePhase = randomBetween(0, Math.PI * 2);
    const pulseSpeed = randomBetween(0.00028, 0.0005);
    const pulsePhase = randomBetween(0, Math.PI * 2);
    const particle = document.createElement("div");
    const drift = document.createElement("div");
    const shape = document.createElement("div");
    const image = document.createElement("div");

    particle.className = "result-locating-particle";
    drift.className = "result-locating-particle-drift";
    shape.className = `result-locating-shape is-${shapeType}`;
    image.className = "result-locating-shape-image";

    particle.style.left = "50%";
    particle.style.top = "50%";
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.opacity = "1";
    particle.style.zIndex = `${Math.round(depth * 10)}`;
    particle.style.setProperty("--particle-offset-x", `${offsetX.toFixed(2)}px`);
    particle.style.setProperty("--particle-offset-y", `${offsetY.toFixed(2)}px`);
    particle.style.setProperty("--particle-parallax-x", "0px");
    particle.style.setProperty("--particle-parallax-y", "0px");
    particle.style.setProperty("--particle-scale", scale.toFixed(3));
    drift.style.setProperty("--particle-enter-delay", `${Math.round(index * 22)}ms`);

    shape.style.color = randomItem(config.colors) || "#8DB8F2";
    shape.style.setProperty("--particle-shape-image", `url("${config.imagePaths[shapeType] || ""}")`);
    image.style.backgroundImage = `var(--particle-shape-image)`;

    shape.appendChild(image);
    drift.appendChild(shape);
    particle.appendChild(drift);
    galaxyLocatingField.appendChild(particle);
    galaxyLocatingParticles.push({
      element: particle,
      drift,
      depth,
      baseX: offsetX,
      baseY: offsetY,
      scale,
      baseRotation: rotation,
      ringSlotPhase,
      ringPhaseOffset,
      ringRadialOffset,
      ringTangentialOffset,
      orbitRadiusX,
      orbitRadiusY,
      orbitSpeed,
      orbitDirection,
      orbitPhase,
      orbitDriftX,
      orbitDriftY,
      orbitNoiseX,
      orbitNoiseY,
      orbitNoisePhase,
      orbitNoiseSpeed,
      trackBias,
      floatAmplitude,
      floatPhase,
      floatSpeedX,
      floatSpeedY,
      selfRotateSpeed,
      selfRotatePhase,
      pulseSpeed,
      pulsePhase
    });
  }
}

function bindGalaxyLocatingParallax() {
  const frame = document.querySelector(".act3-frame");

  if (!frame) {
    return;
  }

  galaxyLocatingPointerTargetX = 0;
  galaxyLocatingPointerTargetY = 0;
  galaxyLocatingPointerCurrentX = 0;
  galaxyLocatingPointerCurrentY = 0;

  galaxyLocatingPointerMoveHandler = (event) => {
    const rect = frame.getBoundingClientRect();

    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    ) {
      return;
    }

    const normalizedX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const normalizedY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

    galaxyLocatingPointerTargetX = normalizedX;
    galaxyLocatingPointerTargetY = normalizedY;
  };

  galaxyLocatingPointerLeaveHandler = () => {
    galaxyLocatingPointerTargetX = 0;
    galaxyLocatingPointerTargetY = 0;
  };

  frame.addEventListener("pointermove", galaxyLocatingPointerMoveHandler);
  frame.addEventListener("pointerleave", galaxyLocatingPointerLeaveHandler);
  updateGalaxyMouseParallax();
}

function updateGalaxyMouseParallax() {
  if (!galaxyLocatingParticles.length) {
    galaxyLocatingAnimationFrame = 0;
    return;
  }

  const now = performance.now();
  const tiltRadians = (RESULT_GALAXY_LOCATING_CONFIG.orbitTiltDeg * Math.PI) / 180;
  const cosTilt = Math.cos(tiltRadians);
  const sinTilt = Math.sin(tiltRadians);

  if (!galaxyLocatingMotionStartTime) {
    galaxyLocatingMotionStartTime = now;
  }

  const elapsed = now - galaxyLocatingMotionStartTime;
  const freeMotionDuration = RESULT_GALAXY_LOCATING_CONFIG.freeMotionDuration;
  const ringAssembleDuration = RESULT_GALAXY_LOCATING_CONFIG.ringAssembleDuration;
  const ringBlendRaw = (elapsed - freeMotionDuration) / Math.max(1, ringAssembleDuration);
  const ringBlend = easeInOutCubic(clamp01(ringBlendRaw));

  galaxyLocatingPointerCurrentX += (galaxyLocatingPointerTargetX - galaxyLocatingPointerCurrentX) * 0.08;
  galaxyLocatingPointerCurrentY += (galaxyLocatingPointerTargetY - galaxyLocatingPointerCurrentY) * 0.08;
  updateGalaxyCenterPlanetParallax();

  galaxyLocatingParticles.forEach((particle) => {
    const depthWeight = 0.72 + particle.depth * RESULT_GALAXY_LOCATING_CONFIG.depthMotionMultiplier;
    const freeOrbitProgress = elapsed * particle.orbitSpeed * particle.orbitDirection + particle.orbitPhase;
    const secondaryProgress =
      elapsed * particle.orbitSpeed * particle.orbitDirection * 0.58 +
      particle.orbitPhase * 0.7 +
      particle.trackBias;
    const floatX = Math.sin(elapsed * particle.floatSpeedX + particle.floatPhase) * particle.floatAmplitude * 0.42;
    const floatY = Math.cos(elapsed * particle.floatSpeedY + particle.floatPhase) * particle.floatAmplitude;
    const freeOrbitLocalX =
      Math.cos(freeOrbitProgress) * particle.orbitRadiusX * depthWeight +
      Math.sin(secondaryProgress) * particle.orbitDriftX;
    const freeOrbitLocalY =
      Math.sin(freeOrbitProgress) * particle.orbitRadiusY * depthWeight * 0.92 +
      Math.cos(secondaryProgress * 1.08) * particle.orbitDriftY;
    const orbitNoiseX =
      Math.sin(elapsed * particle.orbitNoiseSpeed + particle.orbitNoisePhase) * particle.orbitNoiseX;
    const orbitNoiseY =
      Math.cos(elapsed * particle.orbitNoiseSpeed * 1.16 + particle.orbitNoisePhase) * particle.orbitNoiseY;
    const freeOrbitX = freeOrbitLocalX * cosTilt - freeOrbitLocalY * sinTilt + orbitNoiseX;
    const freeOrbitY = freeOrbitLocalX * sinTilt + freeOrbitLocalY * cosTilt + orbitNoiseY;
    const ringProgress =
      elapsed * RESULT_GALAXY_LOCATING_CONFIG.sharedRingSpeed * RESULT_GALAXY_LOCATING_CONFIG.sharedRingDirection +
      particle.ringSlotPhase +
      particle.ringPhaseOffset;
    const ringRadiusX =
      RESULT_GALAXY_LOCATING_CONFIG.sharedRingRadiusX + particle.ringRadialOffset * depthWeight;
    const ringRadiusY =
      RESULT_GALAXY_LOCATING_CONFIG.sharedRingRadiusY + particle.ringRadialOffset * 0.52 * depthWeight;
    const ringLocalX =
      Math.cos(ringProgress) * ringRadiusX +
      Math.cos(ringProgress + Math.PI / 2) * particle.ringTangentialOffset;
    const ringLocalY =
      Math.sin(ringProgress) * ringRadiusY +
      Math.sin(ringProgress + Math.PI / 2) * particle.ringTangentialOffset * 0.7;
    const ringNoiseX = orbitNoiseX * (1 - ringBlend) + orbitNoiseX * 0.35;
    const ringNoiseY = orbitNoiseY * (1 - ringBlend) + orbitNoiseY * 0.35;
    const ringOrbitX = ringLocalX * cosTilt - ringLocalY * sinTilt + ringNoiseX;
    const ringOrbitY = ringLocalX * sinTilt + ringLocalY * cosTilt + ringNoiseY;
    const offsetX = galaxyLocatingPointerCurrentX * RESULT_GALAXY_LOCATING_CONFIG.mouseFollowStrength * particle.depth;
    const offsetY = galaxyLocatingPointerCurrentY * RESULT_GALAXY_LOCATING_CONFIG.mouseFollowStrength * particle.depth;
    const motionX = lerp(particle.baseX + freeOrbitX, ringOrbitX, ringBlend);
    const motionY = lerp(particle.baseY + freeOrbitY, ringOrbitY, ringBlend);
    const x = motionX + floatX + offsetX;
    const y = motionY + floatY + offsetY;
    const pulseScale = particle.scale * (1 + Math.sin(elapsed * particle.pulseSpeed + particle.pulsePhase) * 0.045);
    const selfRotation =
      particle.baseRotation +
      elapsed * particle.selfRotateSpeed +
      Math.sin(ringProgress * 0.8 + particle.selfRotatePhase) * 5.5;

    particle.element.style.transform = `
      translate(calc(-50% + ${x.toFixed(2)}px), calc(-50% + ${y.toFixed(2)}px))
      scale(${pulseScale.toFixed(3)})
    `;
    particle.drift.style.transform = `rotate(${selfRotation.toFixed(2)}deg)`;
  });

  galaxyLocatingAnimationFrame = window.requestAnimationFrame(updateGalaxyMouseParallax);
}

function updateGalaxyCenterPlanetParallax() {
  const planet = document.getElementById("result-galaxy-center-planet");
  const config = RESULT_GALAXY_LOCATING_CONFIG.centerPlanet;

  if (!planet || !config?.enabled) {
    return;
  }

  const offsetX = galaxyLocatingPointerCurrentX * config.mouseFollowStrength;
  const offsetY = galaxyLocatingPointerCurrentY * config.mouseFollowStrength;

  planet.style.setProperty("--result-center-planet-parallax-x", `${offsetX.toFixed(2)}px`);
  planet.style.setProperty("--result-center-planet-parallax-y", `${offsetY.toFixed(2)}px`);
}

function startGalaxyLocatingCaptionDots() {
  const dotsElement = galaxyLocatingCaptionDotsElement;

  if (!dotsElement) {
    return;
  }

  let dotCount = 0;

  dotsElement.textContent = "";

  if (galaxyLocatingCaptionDotsTimer) {
    window.clearInterval(galaxyLocatingCaptionDotsTimer);
  }

  galaxyLocatingCaptionDotsTimer = window.setInterval(() => {
    dotCount = (dotCount + 1) % 4;
    dotsElement.textContent = ".".repeat(dotCount);
  }, RESULT_GALAXY_LOCATING_CONFIG.ellipsisInterval);
}

function cleanupGalaxyLocatingLayer() {
  const frame = document.querySelector(".act3-frame");

  if (frame && galaxyLocatingPointerMoveHandler) {
    frame.removeEventListener("pointermove", galaxyLocatingPointerMoveHandler);
  }

  if (frame && galaxyLocatingPointerLeaveHandler) {
    frame.removeEventListener("pointerleave", galaxyLocatingPointerLeaveHandler);
  }

  if (galaxyLocatingAnimationFrame) {
    window.cancelAnimationFrame(galaxyLocatingAnimationFrame);
  }

  if (galaxyLocatingCaptionDotsTimer) {
    window.clearInterval(galaxyLocatingCaptionDotsTimer);
  }

  if (galaxyLocatingRevealTimer) {
    window.clearTimeout(galaxyLocatingRevealTimer);
  }

  galaxyLocatingLayer?.remove();
  galaxyLocatingLayer = null;
  galaxyLocatingField = null;
  galaxyLocatingParticles = [];
  galaxyLocatingAnimationFrame = 0;
  galaxyLocatingMotionStartTime = 0;
  galaxyLocatingCaptionElement = null;
  galaxyLocatingCaptionMainElement = null;
  galaxyLocatingCaptionDotsTimer = null;
  galaxyLocatingCaptionDotsElement = null;
  galaxyLocatingCaptionParticleLayer = null;
  galaxyLocatingRevealTimer = null;
  resultGalaxyRevealStarted = false;
  galaxyLocatingPointerTargetX = 0;
  galaxyLocatingPointerTargetY = 0;
  galaxyLocatingPointerCurrentX = 0;
  galaxyLocatingPointerCurrentY = 0;
  galaxyLocatingPointerMoveHandler = null;
  galaxyLocatingPointerLeaveHandler = null;
}

function setupStateInteractions(stateId) {
  if (stateId === ACT3_STATES.FOOD_CHOICE) {
    currentPhase = PHASES.FOOD;
    isFoodChoiceLocked = false;
    selectedFoods = [];
    showFoodGuidance();
  }

  if (stateId === ACT3_STATES.DRINK_CHOICE) {
    currentPhase = PHASES.DRINK;
    isFoodChoiceLocked = true;
    lockFoodDragSources();
    showCheerZoneBreathBubble();
    showDrinkGuidance();
    console.log("Act 3 进入饮品选择，当前 playerChoices：", playerChoices);
  }
}

function handleStateEntered() {
}

function getObjectClassName(type) {
  const classes = {
    titleFrame: "act3-scene-object act3-panel act3-title-panel",
    bubble: "act3-scene-object act3-panel act3-narration",
    hotpotTable: "act3-scene-object act3-panel act3-hotpot-table",
    foodTarget: "act3-scene-object act3-panel act3-pot",
    food: "act3-scene-object act3-object act3-food",
    cheersZone: "act3-scene-object act3-panel act3-cheers-zone",
    cup: "act3-scene-object act3-cup other-cup",
    drinkTarget: "act3-scene-object act3-cup empty-cup",
    drinkTable: "act3-scene-object act3-panel act3-drink-table",
    drink: "act3-scene-object act3-object act3-drink",
    complete: "act3-scene-object act3-panel act3-complete-panel"
  };

  return classes[type] || "act3-scene-object act3-panel";
}

function getChildObjectClassName(type) {
  const classes = {
    foodTarget: "act3-child-object act3-panel act3-pot",
    food: "act3-child-object act3-object act3-food",
    cup: "act3-child-object act3-cup other-cup",
    drinkTarget: "act3-child-object act3-cup empty-cup",
    drink: "act3-child-object act3-object act3-drink"
  };

  return classes[type] || "act3-child-object";
}

function getObjectElement(objectId) {
  return objectLayer.querySelector(`[data-object-id="${objectId}"]`);
}

function getStateConfig(stateId) {
  const state = act3Layouts.states[stateId];

  if (!state) {
    throw new Error(`找不到状态布局：${stateId}`);
  }

  return state;
}

function getLayoutFromElement(element) {
  const stage = act3Layouts.stage;

  return {
    x: (parseFloat(element.style.left) / 100) * stage.width,
    y: (parseFloat(element.style.top) / 100) * stage.height,
    width: (parseFloat(element.style.width) / 100) * stage.width,
    height: (parseFloat(element.style.height) / 100) * stage.height,
    opacity: parseFloat(element.style.opacity || "1"),
    scale: 1,
    zIndex: Number(element.style.zIndex || 1)
  };
}

function startTitleBubbles() {
  const bubbleTexts = [
    "今晚吃什么？",
    "这个看起来不错。",
    "锅底还在冒热气。",
    "朋友又夹了一筷子。"
  ];

  bubbleTexts.forEach((text, index) => {
    const timer = window.setTimeout(() => {
      if (currentState !== ACT3_STATES.FOOD_CHOICE) {
        return;
      }

      const bubble = document.createElement("div");
      bubble.className = "act3-floating-bubble";
      bubble.textContent = text;
      bubble.style.left = `${64 + index * 2}%`;
      bubble.style.top = `${4 + index * 5}%`;
      bubble.style.zIndex = 7 + index;
      objectLayer.appendChild(bubble);
    }, 420 + index * 950);

    bubbleTimers.push(timer);
  });
}

function clearBubbleTimers() {
  bubbleTimers.forEach((timer) => window.clearTimeout(timer));
  bubbleTimers = [];
  document.querySelectorAll(".act3-floating-bubble").forEach((bubble) => bubble.remove());
}

function showFoodGuidance() {
  if (hasFoodGuideShown) {
    return;
  }

  hasFoodGuideShown = true;
  const firstBubble = showGuidanceBubble("act3_guide_food_1");
  const delay = act3Layouts.guidanceDefaults?.foodGuideSecondDelay ?? FOOD_GUIDE_SECOND_DELAY;
  const timer = window.setTimeout(() => {
    const firstConfig = act3Layouts.guidanceBubbles?.act3_guide_food_1;

    if (firstBubble && firstConfig?.stackY != null) {
      firstBubble.style.top = `${firstConfig.stackY}px`;
      firstBubble.classList.add("is-stacked");
    }

    showGuidanceBubble("act3_guide_food_2");
    triggerFoodSelectableHint();
    startHotpotFloatingBubbles();
  }, delay);

  guidanceTimers.push(timer);
}

function showDrinkGuidance() {
  if (hasDrinkGuideShown) {
    return;
  }

  hasDrinkGuideShown = true;
  showGuidanceBubble("act3_guide_drink_1");
  triggerDrinkSelectableHint();
  triggerOtherCupWiggle();
}

function showGuidanceBubble(bubbleId) {
  const bubbleConfig = act3Layouts.guidanceBubbles?.[bubbleId];

  if (!bubbleConfig || bubbleConfig.visible === false || bubbleConfig.hide === true) {
    return null;
  }

  const existingBubble = activeGuidanceBubbles.get(bubbleId);

  if (existingBubble) {
    existingBubble.remove();
    activeGuidanceBubbles.delete(bubbleId);
  }

  const bubble = document.createElement("div");
  bubble.id = bubbleId;
  bubble.dataset.objectId = bubbleId;
  bubble.className = "guidance-bubble";
  bubble.style.left = `${bubbleConfig.x}px`;
  bubble.style.top = `${bubbleConfig.y}px`;
  bubble.style.width = `${bubbleConfig.width}px`;
  bubble.style.height = `${bubbleConfig.height}px`;
  bubble.style.zIndex = bubbleConfig.zIndex ?? 50;
  bubble.style.setProperty("--guidance-bubble-text-center-y", `${bubbleConfig.textCenterY ?? 71}px`);

  if (bubbleConfig.enter === "floatUp") {
    bubble.classList.add("float-up");
  }

  const imagePath = bubbleConfig.image || bubbleConfig.bgImage;

  if (imagePath) {
    const image = document.createElement("img");
    image.className = "guidance-bubble-image";
    image.alt = bubbleConfig.label || bubbleId;
    image.draggable = false;
    image.src = imagePath;
    image.onload = () => {
      bubble.classList.add("has-guidance-bubble-image");
    };
    image.onerror = () => {
      bubble.classList.remove("has-guidance-bubble-image");
      image.remove();
    };
    bubble.appendChild(image);
  }

  const text = document.createElement("div");
  text.className = "guidance-bubble-text";
  bubble.appendChild(text);
  objectLayer.appendChild(bubble);
  activeGuidanceBubbles.set(bubbleId, bubble);
  startGuidanceTypewriter(text, bubbleConfig.text || "", bubbleConfig.typewriterSpeed ?? TYPEWRITER_SPEED);

  return bubble;
}

function startGuidanceTypewriter(textElement, fullText, speed) {
  let index = 0;
  const characters = Array.from(fullText);
  textElement.textContent = "";

  const timer = window.setInterval(() => {
    textElement.textContent += characters[index] || "";
    index += 1;

    if (index >= characters.length) {
      window.clearInterval(timer);
      guidanceTypewriterTimers = guidanceTypewriterTimers.filter((item) => item !== timer);
    }
  }, speed);

  guidanceTypewriterTimers.push(timer);
}

function hideGuidanceBubbles(options = {}) {
  guidanceTimers.forEach((timer) => window.clearTimeout(timer));
  guidanceTimers = [];
  guidanceTypewriterTimers.forEach((timer) => window.clearInterval(timer));
  guidanceTypewriterTimers = [];

  const bubbles = [...activeGuidanceBubbles.values()];

  if (!bubbles.length) {
    activeGuidanceBubbles.clear();
    return;
  }

  bubbles.forEach((bubble) => {
    if (options.animateExit) {
      bubble.classList.add("exit-up");
      window.setTimeout(() => bubble.remove(), 460);
    } else {
      bubble.remove();
    }
  });

  activeGuidanceBubbles.clear();
}

function triggerFoodSelectableHint() {
  if (currentState !== ACT3_STATES.FOOD_CHOICE) {
    return;
  }

  const foodElements = [...objectLayer.querySelectorAll('.act3-food[data-type="food"]')]
    .filter((element) => (
      !element.classList.contains("is-used") &&
      !element.classList.contains("dragging") &&
      !element.classList.contains("is-dragging")
    ));

  triggerHintPulse(foodElements);
}

function triggerDrinkSelectableHint() {
  if (currentState !== ACT3_STATES.DRINK_CHOICE || isDrinkChoiceLocked) {
    return;
  }

  const drinkElements = [...objectLayer.querySelectorAll('.act3-drink[data-type="drink"]')]
    .filter((element) => (
      !element.classList.contains("is-selected") &&
      !element.classList.contains("is-selected-drink") &&
      !element.classList.contains("dragging") &&
      !element.classList.contains("is-dragging")
    ));

  triggerHintPulse(drinkElements);
}

function triggerHintPulse(elements) {
  elements.forEach((element) => {
    element.classList.remove("hint-pulse");
    element.offsetHeight;
    element.classList.add("hint-pulse");
    element.addEventListener("animationend", () => {
      element.classList.remove("hint-pulse");
    }, { once: true });
  });
}

function triggerOtherCupWiggle() {
  const otherCup = objectLayer.querySelector('[data-object-id="act3_s02_otherCup"]');

  if (!otherCup) {
    return;
  }

  otherCup.classList.remove("cup-wiggle");
  otherCup.offsetHeight;
  otherCup.classList.add("cup-wiggle");
  otherCup.addEventListener("animationend", () => {
    otherCup.classList.remove("cup-wiggle");
  }, { once: true });
}

function createHoverInfoTooltip() {
  if (hoverInfoTooltip || !objectLayer) {
    return hoverInfoTooltip;
  }

  hoverInfoTooltip = document.createElement("div");
  hoverInfoTooltip.id = "act3-hover-info-tooltip";
  hoverInfoTooltip.className = "act3-hover-info-tooltip";
  hoverInfoTooltip.style.maxWidth = `${HOVER_TOOLTIP_CONFIG.maxWidth}px`;
  objectLayer.appendChild(hoverInfoTooltip);

  return hoverInfoTooltip;
}

function bindHoverInfo(element, objectId) {
  const hoverInfo = ACT3_HOVER_INFO[objectId];

  element.classList.toggle("has-hover-info", Boolean(hoverInfo));

  if (!hoverInfo || element.dataset.hoverInfoBound === "true") {
    return;
  }

  element.dataset.hoverInfoBound = "true";
  element.addEventListener("pointerenter", (event) => {
    if (shouldSuppressHoverInfo(element)) {
      return;
    }

    scheduleShowHoverInfo(objectId, event);
  });
  element.addEventListener("pointermove", (event) => {
    if (hoverInfoTooltip?.classList.contains("is-visible")) {
      positionHoverInfoTooltip(event);
    }
  });
  element.addEventListener("pointerleave", scheduleHideHoverInfo);
  element.addEventListener("pointerdown", hideHoverInfoTooltip);
  element.addEventListener("dragstart", hideHoverInfoTooltip);
}

function shouldSuppressHoverInfo(element) {
  return (
    currentPhase === PHASES.EXIT_SCROLL ||
    currentPhase === PHASES.RESULT_GALAXY_LOCATING ||
    currentPhase === PHASES.RESULT_GALAXY ||
    element.classList.contains("is-used") ||
    element.classList.contains("dragging") ||
    element.classList.contains("is-dragging")
  );
}

function scheduleShowHoverInfo(objectId, event) {
  window.clearTimeout(hoverInfoHideTimer);
  window.clearTimeout(hoverInfoShowTimer);
  hoverInfoShowTimer = window.setTimeout(() => {
    showHoverInfoTooltip(objectId, event);
  }, HOVER_TOOLTIP_CONFIG.showDelay);
}

function scheduleHideHoverInfo() {
  window.clearTimeout(hoverInfoShowTimer);
  window.clearTimeout(hoverInfoHideTimer);
  hoverInfoHideTimer = window.setTimeout(hideHoverInfoTooltip, HOVER_TOOLTIP_CONFIG.hideDelay);
}

function showHoverInfoTooltip(objectId, event) {
  const hoverInfo = ACT3_HOVER_INFO[objectId];
  const tooltip = createHoverInfoTooltip();

  if (!hoverInfo || !tooltip) {
    return;
  }

  tooltip.innerHTML = `
    <div class="act3-hover-info-title">${hoverInfo.title}</div>
    <div class="act3-hover-info-body">${hoverInfo.body}</div>
  `;
  tooltip.classList.add("is-visible");
  positionHoverInfoTooltip(event);
}

function hideHoverInfoTooltip() {
  window.clearTimeout(hoverInfoShowTimer);
  window.clearTimeout(hoverInfoHideTimer);

  if (hoverInfoTooltip) {
    hoverInfoTooltip.classList.remove("is-visible");
  }
}

function positionHoverInfoTooltip(event) {
  const tooltip = createHoverInfoTooltip();

  if (!tooltip || !objectLayer) {
    return;
  }

  const layerRect = objectLayer.getBoundingClientRect();
  const scale = layerRect.width / DESIGN_WIDTH || 1;
  const pointerX = (event.clientX - layerRect.left) / scale;
  const pointerY = (event.clientY - layerRect.top) / scale;
  const tooltipWidth = tooltip.offsetWidth / scale;
  const tooltipHeight = tooltip.offsetHeight / scale;
  let x = pointerX + HOVER_TOOLTIP_CONFIG.offsetX;
  let y = pointerY + HOVER_TOOLTIP_CONFIG.offsetY;

  if (x + tooltipWidth > DESIGN_WIDTH) {
    x = pointerX - tooltipWidth - HOVER_TOOLTIP_CONFIG.offsetX;
  }

  if (y + tooltipHeight > DESIGN_HEIGHT) {
    y = pointerY - tooltipHeight - HOVER_TOOLTIP_CONFIG.offsetY;
  }

  tooltip.style.left = `${Math.max(0, x)}px`;
  tooltip.style.top = `${Math.max(0, y)}px`;
}

function getHotpotFloatingBubbleConfig() {
  return {
    ...HOTPOT_FLOATING_BUBBLE_CONFIG,
    ...(act3Layouts.floatingBubbles || {}),
    bounds: {
      ...HOTPOT_FLOATING_BUBBLE_CONFIG.bounds,
      ...(act3Layouts.floatingBubbles?.bounds || {})
    },
    images: act3Layouts.floatingBubbles?.images || HOTPOT_FLOATING_BUBBLE_CONFIG.images
  };
}

function ensureHotpotFloatingBubbleLayer() {
  const config = getHotpotFloatingBubbleConfig();
  const hotpotTable = getObjectElement(config.parentId);

  if (!hotpotTable) {
    return null;
  }

  hotpotTable.classList.add("allow-overflow");

  let layer = hotpotTable.querySelector(":scope > .hotpot-floating-bubble-layer");

  if (!layer) {
    layer = document.createElement("div");
    layer.className = "hotpot-floating-bubble-layer";
    hotpotTable.appendChild(layer);
  }

  layer.style.left = `${config.bounds.x}px`;
  layer.style.top = `${config.bounds.y}px`;
  layer.style.width = `${config.bounds.width}px`;
  layer.style.height = `${config.bounds.height}px`;
  layer.style.zIndex = config.zIndex ?? 8;

  return layer;
}

function startHotpotFloatingBubbles() {
  const config = getHotpotFloatingBubbleConfig();

  if (!config.enabled || isHotpotFloatingBubblesActive) {
    return;
  }

  isHotpotFloatingBubblesActive = true;
  scheduleHotpotFloatingBubble();
}

function scheduleHotpotFloatingBubble() {
  if (!isHotpotFloatingBubblesActive) {
    return;
  }

  const config = getHotpotFloatingBubbleConfig();
  const delay = randomBetween(config.minSpawnDelay, config.maxSpawnDelay);

  hotpotFloatingBubbleTimer = window.setTimeout(() => {
    spawnHotpotFloatingBubble();
    scheduleHotpotFloatingBubble();
  }, delay);
}

function spawnHotpotFloatingBubble() {
  const config = getHotpotFloatingBubbleConfig();
  const layer = ensureHotpotFloatingBubbleLayer();

  if (!layer) {
    return;
  }

  const currentCount = layer.querySelectorAll(".hotpot-floating-bubble").length;

  if (currentCount >= config.maxCount) {
    return;
  }

  const size = randomBetween(config.minSize, config.maxSize);
  const lifeTime = randomBetween(config.minLifeTime, config.maxLifeTime);
  const floatDistance = randomBetween(config.minFloatDistance, config.maxFloatDistance);
  const bubble = document.createElement("div");
  const imagePath = randomItem(config.images);

  bubble.className = "hotpot-floating-bubble";
  bubble.style.left = `${randomBetween(0, Math.max(0, config.bounds.width - size))}px`;
  bubble.style.top = `${randomBetween(0, Math.max(0, config.bounds.height - size))}px`;
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  bubble.style.animationDuration = `${lifeTime}ms`;
  bubble.style.setProperty("--bubble-float-distance", `${floatDistance}px`);

  if (imagePath) {
    const image = document.createElement("img");
    image.alt = "";
    image.draggable = false;
    image.src = imagePath;
    image.onerror = () => {
      bubble.classList.add("is-placeholder");
      image.remove();
    };
    bubble.appendChild(image);
  } else {
    bubble.classList.add("is-placeholder");
  }

  bubble.addEventListener("animationend", () => {
    bubble.remove();
  }, { once: true });

  layer.appendChild(bubble);
}

function stopHotpotFloatingBubbles() {
  isHotpotFloatingBubblesActive = false;

  if (hotpotFloatingBubbleTimer) {
    window.clearTimeout(hotpotFloatingBubbleTimer);
    hotpotFloatingBubbleTimer = null;
  }

  objectLayer
    ?.querySelectorAll(".hotpot-floating-bubble-layer")
    .forEach((layer) => layer.remove());
}

function getCheerZoneBreathBubbleConfig() {
  return {
    ...CHEER_ZONE_BREATH_BUBBLE_CONFIG,
    ...(act3Layouts.cheerZoneBreathBubble || {})
  };
}

function ensureCheerZoneBreathBubble() {
  const config = getCheerZoneBreathBubbleConfig();
  const cheerZone = getObjectElement(config.parentId);

  if (!config.enabled || !cheerZone) {
    return null;
  }

  cheerZone.classList.add("allow-overflow");

  let bubble = cheerZone.querySelector(`:scope > [data-object-id="${config.id}"]`);

  if (!bubble) {
    bubble = document.createElement("div");
    bubble.dataset.objectId = config.id;
    bubble.id = config.id;
    bubble.className = "cheer-zone-breath-bubble";
    cheerZone.appendChild(bubble);
  }

  bubble.style.left = `${config.x}px`;
  bubble.style.top = `${config.y}px`;
  bubble.style.width = `${config.width}px`;
  bubble.style.height = `${config.height}px`;
  bubble.style.zIndex = config.zIndex ?? 8;
  bubble.style.setProperty("--cheer-breath-scale-min", config.scaleMin);
  bubble.style.setProperty("--cheer-breath-scale-max", config.scaleMax);
  bubble.style.setProperty("--cheer-breath-duration", `${config.duration}ms`);

  syncCheerZoneBreathBubbleImage(bubble, config);

  return bubble;
}

function syncCheerZoneBreathBubbleImage(bubble, config) {
  const existingImage = bubble.querySelector(":scope > img");

  if (!config.image) {
    existingImage?.remove();
    bubble.classList.add("is-placeholder");
    return;
  }

  const image = existingImage || document.createElement("img");

  image.alt = "";
  image.draggable = false;
  image.src = config.image;
  image.onload = () => {
    bubble.classList.remove("is-placeholder");
  };
  image.onerror = () => {
    bubble.classList.add("is-placeholder");
    image.remove();
  };

  if (!existingImage) {
    bubble.appendChild(image);
  }
}

function showCheerZoneBreathBubble() {
  const bubble = ensureCheerZoneBreathBubble();

  if (bubble) {
    bubble.hidden = false;
  }
}

function hideCheerZoneBreathBubble() {
  const config = getCheerZoneBreathBubbleConfig();
  const bubble = objectLayer?.querySelector(`[data-object-id="${config.id}"]`);

  if (bubble) {
    bubble.remove();
  }
}

function scheduleCheersSparkles() {
  if (!CHEERS_SPARKLE_CONFIG.enabled) {
    return;
  }

  window.setTimeout(spawnCheersSparkles, CHEERS_SPARKLE_CONFIG.delayFromCheersStart);
}

function spawnCheersSparkles() {
  const cheerZone = getObjectElement(CHEERS_SPARKLE_CONFIG.parentId);

  if (!cheerZone) {
    return;
  }

  cheerZone.classList.add("allow-overflow");

  const layer = ensureCheersSparkleLayer(cheerZone);

  if (!layer) {
    return;
  }

  layer.querySelectorAll(".cheers-sparkle").forEach((sparkle) => sparkle.remove());

  for (let index = 0; index < CHEERS_SPARKLE_CONFIG.count; index += 1) {
    const sparkle = document.createElement("span");
    const dx = randomBetween(-CHEERS_SPARKLE_CONFIG.spreadX / 2, CHEERS_SPARKLE_CONFIG.spreadX / 2);
    const dy = randomBetween(-CHEERS_SPARKLE_CONFIG.spreadY / 2, CHEERS_SPARKLE_CONFIG.spreadY / 2);

    sparkle.className = "cheers-sparkle";
    sparkle.textContent = randomItem(CHEERS_SPARKLE_CONFIG.sparkleTextOptions) || "✦";
    sparkle.style.left = `${CHEERS_SPARKLE_CONFIG.centerX * 100}%`;
    sparkle.style.top = `${CHEERS_SPARKLE_CONFIG.centerY * 100}%`;
    sparkle.style.color = randomItem(CHEERS_SPARKLE_CONFIG.colors) || "#ffd84d";
    sparkle.style.fontSize = `${randomBetween(CHEERS_SPARKLE_CONFIG.minSize, CHEERS_SPARKLE_CONFIG.maxSize)}px`;
    sparkle.style.setProperty("--sparkle-dx", `${dx}px`);
    sparkle.style.setProperty("--sparkle-dy", `${dy}px`);
    sparkle.style.setProperty("--sparkle-duration", `${CHEERS_SPARKLE_CONFIG.duration}ms`);
    sparkle.addEventListener("animationend", () => {
      sparkle.remove();
    }, { once: true });
    layer.appendChild(sparkle);
  }
}

function ensureCheersSparkleLayer(cheerZone) {
  let layer = cheerZone.querySelector(`:scope > [data-object-id="${CHEERS_SPARKLE_CONFIG.layerId}"]`);

  if (!layer) {
    layer = document.createElement("div");
    layer.dataset.objectId = CHEERS_SPARKLE_CONFIG.layerId;
    layer.id = CHEERS_SPARKLE_CONFIG.layerId;
    layer.className = "cheers-sparkle-layer";
    cheerZone.appendChild(layer);
  }

  return layer;
}

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function normalizeValue(value, min, max) {
  if (max <= min) {
    return 0;
  }

  return (value - min) / (max - min);
}

function clamp01(value) {
  return Math.min(1, Math.max(0, value));
}

function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

function easeInOutCubic(value) {
  if (value < 0.5) {
    return 4 * value * value * value;
  }

  return 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function randomItem(items) {
  if (!items?.length) {
    return null;
  }

  return items[Math.floor(Math.random() * items.length)];
}

function bindDragSource(element, type, id) {
  if (element.dataset.dragBound === "true") {
    return;
  }

  element.dataset.dragBound = "true";

  if (type === "food") {
    bindFoodPointerDrag(element, id);
    return;
  }

  element.addEventListener("dragstart", (event) => {
    if (isStateLocked || element.classList.contains("is-selected")) {
      event.preventDefault();
      return;
    }

    if (type === "drink" && isDrinkChoiceLocked) {
      event.preventDefault();
      return;
    }

    if (type === "food" && currentState !== ACT3_STATES.FOOD_CHOICE) {
      event.preventDefault();
      return;
    }

    dragPayload = { type, id };
    hideHoverInfoTooltip();
    element.classList.add("is-dragging");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", JSON.stringify(dragPayload));
  });

  element.addEventListener("dragend", () => {
    element.classList.remove("is-dragging");
    dragPayload = null;
  });
}

function bindFoodPointerDrag(element, id) {
  element.addEventListener("pointerdown", (event) => {
    if (
      event.button !== 0 ||
      isStateLocked ||
      currentState !== ACT3_STATES.FOOD_CHOICE ||
      usedFoodIds.has(id) ||
      element.classList.contains("is-selected")
    ) {
      return;
    }

    event.preventDefault();
    startFoodPointerDrag(event, element, id);
  });
}

function startFoodPointerDrag(event, element, id) {
  hideHoverInfoTooltip();
  const originalParent = element.parentElement;
  const originalNextSibling = element.nextSibling;
  const originalStyle = {
    left: element.style.left,
    top: element.style.top,
    width: element.style.width,
    height: element.style.height,
    zIndex: element.style.zIndex,
    transform: element.style.transform
  };
  const layerRect = objectLayer.getBoundingClientRect();
  const sourceRect = element.getBoundingClientRect();
  const scale = layerRect.width / DESIGN_WIDTH || 1;
  const pointerX = (event.clientX - layerRect.left) / scale;
  const pointerY = (event.clientY - layerRect.top) / scale;
  const startLeft = (sourceRect.left - layerRect.left) / scale;
  const startTop = (sourceRect.top - layerRect.top) / scale;
  const width = sourceRect.width / scale;
  const height = sourceRect.height / scale;

  activeFoodDrag = {
    id,
    element,
    originalParent,
    originalNextSibling,
    originalStyle,
    offsetX: pointerX - startLeft,
    offsetY: pointerY - startTop
  };

  dragPayload = { type: "food", id };
  element.classList.add("dragging");
  element.classList.add("is-dragging");
  element.style.left = `${startLeft}px`;
  element.style.top = `${startTop}px`;
  element.style.width = `${width}px`;
  element.style.height = `${height}px`;
  element.style.zIndex = "9999";
  element.style.transform = "none";
  objectLayer.appendChild(element);
  moveFoodPointerDrag(event);

  window.addEventListener("pointermove", moveFoodPointerDrag);
  window.addEventListener("pointerup", finishFoodPointerDrag);
  window.addEventListener("pointercancel", cancelFoodPointerDrag);
}

function moveFoodPointerDrag(event) {
  if (!activeFoodDrag) {
    return;
  }

  const layerRect = objectLayer.getBoundingClientRect();
  const scale = layerRect.width / DESIGN_WIDTH || 1;
  const pointerX = (event.clientX - layerRect.left) / scale;
  const pointerY = (event.clientY - layerRect.top) / scale;

  activeFoodDrag.element.style.left = `${pointerX - activeFoodDrag.offsetX}px`;
  activeFoodDrag.element.style.top = `${pointerY - activeFoodDrag.offsetY}px`;
}

function finishFoodPointerDrag(event) {
  if (!activeFoodDrag) {
    return;
  }

  const dropTarget = getFoodDropTargetAtPoint(event.clientX, event.clientY);
  const { element, id } = activeFoodDrag;

  restoreFoodDragElement();

  if (dropTarget) {
    dragPayload = { type: "food", id };
    handleFoodDrop(dropTarget);
  }

  element.classList.remove("dragging");
  element.classList.remove("is-dragging");
  dragPayload = null;
  removeFoodPointerListeners();
  activeFoodDrag = null;
}

function cancelFoodPointerDrag() {
  if (!activeFoodDrag) {
    return;
  }

  activeFoodDrag.element.classList.remove("dragging");
  activeFoodDrag.element.classList.remove("is-dragging");
  restoreFoodDragElement();
  dragPayload = null;
  removeFoodPointerListeners();
  activeFoodDrag = null;
}

function restoreFoodDragElement() {
  const { element, originalParent, originalNextSibling, originalStyle } = activeFoodDrag;

  if (originalNextSibling && originalNextSibling.parentElement === originalParent) {
    originalParent.insertBefore(element, originalNextSibling);
  } else {
    originalParent.appendChild(element);
  }

  element.style.left = originalStyle.left;
  element.style.top = originalStyle.top;
  element.style.width = originalStyle.width;
  element.style.height = originalStyle.height;
  element.style.zIndex = originalStyle.zIndex;
  element.style.transform = originalStyle.transform;
}

function getFoodDropTargetAtPoint(clientX, clientY) {
  return [...objectLayer.querySelectorAll('.act3-pot[data-target-id]')].find((target) => {
    const rect = target.getBoundingClientRect();

    return (
      clientX >= rect.left &&
      clientX <= rect.right &&
      clientY >= rect.top &&
      clientY <= rect.bottom
    );
  }) || null;
}

function removeFoodPointerListeners() {
  window.removeEventListener("pointermove", moveFoodPointerDrag);
  window.removeEventListener("pointerup", finishFoodPointerDrag);
  window.removeEventListener("pointercancel", cancelFoodPointerDrag);
}

function bindDropTarget(element, acceptedType) {
  if (element.dataset.dropBound === acceptedType) {
    return;
  }

  element.dataset.dropBound = acceptedType;
  element.addEventListener("dragover", (event) => {
    if (canAcceptDrop(acceptedType)) {
      event.preventDefault();
      element.classList.add("drag-over");
    }
  });

  element.addEventListener("dragleave", () => {
    element.classList.remove("drag-over");
  });

  element.addEventListener("drop", (event) => {
    event.preventDefault();
    element.classList.remove("drag-over");

    if (!canAcceptDrop(acceptedType)) {
      return;
    }

    if (acceptedType === "food") {
      handleFoodDrop(element);
    }

    if (acceptedType === "drink") {
      handleDrinkDrop(element);
    }
  });
}

function canAcceptDrop(acceptedType) {
  if (acceptedType === "food" && currentState !== ACT3_STATES.FOOD_CHOICE) {
    return false;
  }

  if (acceptedType === "drink" && isDrinkChoiceLocked) {
    return false;
  }

  return !isStateLocked && dragPayload && dragPayload.type === acceptedType;
}

function handleFoodDrop(targetElement) {
  const food = act3Choices.foods.find((item) => item.id === dragPayload.id);
  const target = act3Choices.foodTargets.find((item) => item.id === targetElement.dataset.targetId);
  const foodButton = getObjectElement(food.id);

  if (!food || !target || !foodButton || foodButton.classList.contains("is-selected")) {
    return;
  }

  const targetRiskTags = target.riskTags || [];
  const finalRiskTags = uniqueTags([...(food.baseRiskTags || []), ...targetRiskTags]);
  const selectedFood = {
    foodId: food.id,
    foodName: food.name,
    targetId: target.id,
    targetName: target.name,
    baseRiskTags: food.baseRiskTags || [],
    targetRiskTags,
    riskTags: finalRiskTags,
    tendencyScores: food.tendencyScores || {}
  };

  selectedFoods.push(selectedFood);
  usedFoodIds.add(food.id);
  foodButton.classList.add("is-selected");
  syncUsedFoodState(foodButton, food.id);
  foodButton.draggable = false;
  targetElement.classList.add("has-drop");
  targetElement.querySelector(".act3-pot-counter").textContent = `${getPotCount(target.id)} 个菜`;

  console.log("Act 3 食物拖入：", selectedFood);

  if (selectedFoods.length >= 3) {
    isStateLocked = true;
    isFoodChoiceLocked = true;
    hideGuidanceBubbles({ animateExit: true });
    recordAct3FoodChoice();
    window.setTimeout(() => {
      transitionToState(ACT3_STATES.DRINK_CHOICE);
    }, 520);
  }
}

function lockFoodDragSources() {
  objectLayer.querySelectorAll('.act3-food[data-type="food"]').forEach((foodElement) => {
    foodElement.draggable = false;
    foodElement.classList.add("is-food-drag-locked");
    foodElement.classList.remove("is-dragging");
    syncUsedFoodState(foodElement, foodElement.dataset.id);
  });
}

function syncUsedFoodState(foodElement, foodId) {
  const isUsed = usedFoodIds.has(foodId);

  foodElement.classList.toggle("is-used", isUsed);
  foodElement.style.pointerEvents = isUsed ? "none" : "";

  if (isUsed) {
    foodElement.draggable = false;
  }
}

function handleDrinkDrop(targetElement) {
  const drink = act3Choices.drinks.find((item) => item.id === dragPayload.id);
  const drinkButton = getObjectElement(drink.id);

  if (!drink || !drinkButton || isDrinkChoiceLocked) {
    return;
  }

  const choice = {
    sceneId: "act3",
    stepId: "act3_s02_drinkChoice",
    interactionType: "drag_drink_to_cup",
    drinkId: drink.id,
    drinkName: drink.name,
    targetId: act3Choices.drinkTarget.id,
    targetName: act3Choices.drinkTarget.name,
    riskTags: drink.riskTags || [],
    tendencyScores: drink.tendencyScores || {}
  };

  isStateLocked = true;
  isDrinkChoiceLocked = true;
  selectedDrinkId = drink.id;
  playerChoices.push(choice);
  placeSelectedDrinkInCup(drinkButton, targetElement, drink);
  lockDrinkDragSources();
  playCheersAnimation(drinkButton);
  console.log("Act 3 饮品选择：", choice);
  console.log("Act 3 playerChoices：", playerChoices);
  console.log("第三幕完成，进入下一幕占位。");
}

function placeSelectedDrinkInCup(drinkButton, targetElement, drink) {
  const cheersZone = targetElement.closest('[data-object-id="act3_s02_targetzone_cheers"]');

  if (!cheersZone) {
    return;
  }

  const cheersZoneRect = cheersZone.getBoundingClientRect();
  const targetRect = targetElement.getBoundingClientRect();
  const drinkRect = drinkButton.getBoundingClientRect();
  const localScale = cheersZoneRect.width / getLayoutPixelWidth(cheersZone) || 1;
  const targetCenterX = (targetRect.left - cheersZoneRect.left + targetRect.width / 2) / localScale;
  const targetCenterY = (targetRect.top - cheersZoneRect.top + targetRect.height / 2) / localScale;
  const selectedDrinkWidth = (drinkRect.width / localScale) * SELECTED_DRINK_SCALE;
  const selectedDrinkHeight = (drinkRect.height / localScale) * SELECTED_DRINK_SCALE;
  const finalX = targetCenterX - selectedDrinkWidth / 2;
  const finalY = targetCenterY - selectedDrinkHeight / 2;

  targetElement.classList.add("filled");
  targetElement.classList.add("is-used");
  drinkButton.classList.add("is-selected");
  drinkButton.classList.add("is-selected-drink");
  drinkButton.classList.remove("interactive-option");
  drinkButton.classList.remove("is-dragging");
  drinkButton.draggable = false;
  drinkButton.dataset.selectedDrinkId = drink.id;

  drinkButton.style.left = `${finalX}px`;
  drinkButton.style.top = `${finalY}px`;
  drinkButton.style.width = `${selectedDrinkWidth}px`;
  drinkButton.style.height = `${selectedDrinkHeight}px`;
  drinkButton.style.zIndex = String((Number(targetElement.style.zIndex) || 1) + 2);
  drinkButton.style.transform = "none";
  drinkButton.style.transformOrigin = "center center";
  cheersZone.appendChild(drinkButton);
}

function getLayoutPixelWidth(element) {
  return element.offsetWidth || element.getBoundingClientRect().width;
}

function lockDrinkDragSources() {
  objectLayer.querySelectorAll('.act3-drink[data-type="drink"]').forEach((drinkElement) => {
    drinkElement.draggable = false;
    drinkElement.classList.add("is-drink-drag-locked");
    drinkElement.classList.remove("interactive-option");
    drinkElement.classList.remove("is-dragging");
  });
}

function playCheersAnimation(selectedDrinkElement) {
  const cheersZone = selectedDrinkElement.closest('[data-object-id="act3_s02_targetzone_cheers"]');
  const otherCup = cheersZone?.querySelector('[data-object-id="act3_s02_otherCup"]');

  if (!cheersZone || !otherCup) {
    return;
  }

  const spark = document.createElement("span");
  spark.className = "cheers-spark";
  spark.textContent = "✦";
  cheersZone.appendChild(spark);

  otherCup.classList.add("cheers-left");
  selectedDrinkElement.classList.add("cheers-right");
  cheersZone.classList.add("is-cheering");
  scheduleCheersSparkles();

  window.setTimeout(() => {
    otherCup.classList.remove("cheers-left");
    selectedDrinkElement.classList.remove("cheers-right");
    cheersZone.classList.remove("is-cheering");
    spark.remove();
  }, 820);

  window.setTimeout(() => {
    enableAct3ScrollExit();
  }, Math.max(900, CHEERS_SPARKLE_CONFIG.delayFromCheersStart + CHEERS_SPARKLE_CONFIG.duration + 120));
}

function getPotCount(targetId) {
  return selectedFoods.filter((food) => food.targetId === targetId).length;
}

function recordAct3FoodChoice() {
  const choice = {
    sceneId: "act3",
    stepId: "act3_s01_foodChoice",
    interactionType: "drag_foods_to_pot",
    selectedFoods: selectedFoods.map((food) => ({ ...food })),
    riskTags: uniqueTags(selectedFoods.flatMap((food) => food.riskTags)),
    tendencyScores: mergeTendencyScores(selectedFoods.map((food) => food.tendencyScores))
  };

  playerChoices.push(choice);
  console.log("Act 3 食物组合选择：", choice);
  console.log("Act 3 playerChoices：", playerChoices);
}

function setButtonsDisabled(disabled) {
  document.querySelectorAll("button").forEach((button) => {
    button.disabled = disabled;
  });
}

function uniqueTags(tags) {
  return [...new Set(tags.filter(Boolean))];
}

function mergeTendencyScores(scoreList) {
  return scoreList.reduce((merged, scores) => {
    Object.entries(scores || {}).forEach(([key, value]) => {
      merged[key] = (merged[key] || 0) + value;
    });

    return merged;
  }, {});
}

const act3Files = {
  choices: "data/act3-choices.json",
  layouts: "data/layouts-act3.json"
};

const act0Files = {
  layouts: "data/layouts-act0.json"
};

const act1Files = {
  choices: "data/choices-act1.json",
  layouts: "data/layouts-act1.json"
};

const act2Files = {
  choices: "data/choices-act2.json",
  layouts: "data/layouts-act2.json"
};

const resultFiles = {
  layouts: "data/layouts-result.json"
};

const ACT1_STATES = {
  BREAKFAST_CHOICE: "act1_01_breakfast_choice",
  MICROWAVE_HEAT: "act1_02_microwave_heat",
  EATING_SPEED: "act1_03_eating_speed"
};

const ACT2_STATES = {
  LUNCH_INTRO_BUBBLE: "act2_01_lunch_intro_bubble",
  LUNCH_WINDOW_INTRO: "act2_02_lunch_window_intro",
  LUNCH_INTRO: "act2_01_lunch_intro",
  LUNCH_PREP_SELECT: "act2_03_lunch_prep_select",
  LUNCH_CATCH_GAME: "act2_04_lunch_catch_game",
  LUNCH_CHOICE: "act2_03_lunch_prep_select",
  LUNCH_DONE: "act2_03_lunch_done"
};

// ---------------------------------------------------------------------------
// Act2 Lunch Module constants placeholder
// Keep Act2 additions inside clearly marked Act2 sections. Do not mix Act2
// state constants into Act1 or Act3 interaction code unless a task explicitly
// asks for shared behavior.
// ---------------------------------------------------------------------------

const ACT3_STATES = {
  TITLE: "act3_state_00_title",
  FOOD_CHOICE: "act3_state_01_food_choice",
  DRINK_CHOICE: "act3_state_02_drink_choice"
};

const PHASES = {
  ACT0: "act0_alarm_intro",
  ACT1_BREAKFAST: "act1_breakfast",
  ACT1_HEATING: "act1_heating",
  ACT1_EATING: "act1_eating",
  ACT2_LUNCH: "act2_lunch",
  INTRO: "act3_intro",
  FOOD: "act3_food",
  DRINK: "act3_drink",
  EXIT_SCROLL: "act3_exit_scroll",
  RESULT_GALAXY_LOCATING: "result_galaxy_locating",
  RESULT_GALAXY: "result_galaxy",
  RESULT_RISK_INTRO: "result_risk_intro"
};
const RESULT_STATES = {
  GALAXY_LOCATING: "result_state_00_galaxy_locating",
  DIET_GALAXY: "result_state_01_diet_galaxy",
  RISK_INTRO: "result_state_02_risk_intro"
};
const PREVIEW_ENTRY_CONFIG = {
  enabled: false,
  skipAct3AfterAct0: false,
  startAt: RESULT_STATES.GALAXY_LOCATING
};
const RESULT_PLANET_ONLY_MODE = true;

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
  captionX: 960,
  captionWidth: 620,
  captionMinHeight: 110,
  captionBottom: 82,
  captionFontSize: 34,
  captionReveal: {
    text: "",
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
  resultGalaxyEnter: {
    duration: 1200,
    nebula: {
      targetX: 430,
      targetY: 420,
      scale: 1.35,
      delay: 0
    },
    planet: {
      targetX: 470,
      targetY: 390,
      scale: 1.12,
      delay: 160
    }
  },
  resultDietGalaxy: {
    galaxyLabel: {
      x: 430,
      y: 690,
      width: 520,
      eyebrow: "\u4f60\u7684\u996e\u98df\u661f\u7cfb\u662f...",
      title: "\u9ad8\u538b\u7099\u70ed\u661f\u73af!"
    },
    panel: {
      x: 1040,
      y: 130,
      width: 660,
      title: "VKA-D",
      subtitle: "Voltage / Kernel / Adventure - Dash",
      paragraphs: [
        "\u9ad8\u538b\u7099\u70ed\u661f\u73af\u7ec8\u5e74\u70ed\u6d6a\u7ffb\u6d8c\uff0c\u7a7a\u6c14\u4e2d\u6f02\u6d6e\u7740\u8fa3\u6912\u3001\u6cb9\u8102\u3001\u9999\u6599\u4e0e\u521a\u51fa\u9505\u98df\u7269\u7684\u6c14\u5473,\u8fd9\u91cc\u7684\u5c45\u6c11\u4e60\u60ef\u5728\u9ad8\u6e29\u4e0e\u5f3a\u523a\u6fc0\u4e2d\u786e\u8ba4\u4e00\u9910\u7684\u5b58\u5728\u611f\u2014\u2014\u8d8a\u6eda\u70eb\uff0c\u8d8a\u9c9c\u660e\uff1b\u8d8a\u6d53\u70c8\uff0c\u8d8a\u50cf\u771f\u6b63\u5f00\u59cb\u8fdb\u98df\u3002",
        "\u4f60\u5bf9\u201c\u666e\u901a\u5473\u9053\u201d\u7f3a\u4e4f\u8010\u5fc3\uff0c\u603b\u5728\u5bfb\u627e\u66f4\u54cd\u4eae\u7684\u53e3\u611f\u3001\u66f4\u76f4\u63a5\u7684\u51b2\u51fb\uff0c\u4ee5\u53ca\u83dc\u5355\u4e0a\u90a3\u4e9b\u201c\u8fd8\u6ca1\u8bd5\u8fc7\u201d\u7684\u65b0\u5947\u7ec4\u5408\u3002\u5403\u996d\u662f\u4e00\u573a\u77ed\u6682\u3001\u5bc6\u96c6\u3001\u5e26\u6709\u51b2\u523a\u611f\u7684\u5473\u89c9\u5192\u9669\u3002\u5982\u679c\u4e00\u987f\u996d\u6ca1\u6709\u8ba9\u8eab\u4f53\u7a0d\u5fae\u505c\u987f\u4e00\u4e0b\uff0c\u5b83\u5c31\u5f88\u96be\u88ab\u8bb0\u4f4f\u3002",
        "\u661f\u73af\u7cfb\u7edf\u8bb0\u5f55\u663e\u793a\uff1a\n\u8be5\u661f\u7cfb\u5c45\u6c11\u7ecf\u5e38\u51fa\u73b0\u5feb\u901f\u8fdb\u98df\u3001\u8ffd\u6c42\u7206\u8fa3\u91cd\u53e3\u3001\u5c1d\u8bd5\u6781\u7aef\u642d\u914d\uff0c\u4ee5\u53ca\u201c\u518d\u6765\u4e00\u53e3\u8bd5\u8bd5\u201d\u7684\u73b0\u8c61\u3002"
      ]
    },
    traitBars: {
      x: 1040,
      y: 650,
      width: 620,
      height: 10,
      gap: 28,
      pointerWidth: 42,
      pointerHeight: 42,
      endpointSize: 14,
      labelGap: 16,
      labelFontSize: 16,
      items: [
        {
          value: 78,
          leftLabel: "\u6e29\u548c\u578b",
          rightLabel: "\u523a\u6fc0\u578b",
          pointerShape: "square"
        },
        {
          value: 55,
          leftLabel: "\u65b0\u9c9c\u6d3e",
          rightLabel: "\u8fb9\u7f18\u6d3e",
          pointerShape: "triangle"
        },
        {
          value: 82,
          leftLabel: "\u67d4\u8f6f\u578b",
          rightLabel: "\u786c\u6838\u578b",
          pointerShape: "circle"
        },
        {
          value: 32,
          leftLabel: "\u4eea\u5f0f\u578b",
          rightLabel: "\u51b2\u523a\u578b",
          pointerShape: "radial"
        }
      ]
    },
    riskIntro: {
      stateId: RESULT_STATES.RISK_INTRO,
      backgroundColor: "#F6EEDC",
      scrollLockDuration: 620,
      dissolveDuration: 720,
      textFadeDuration: 520,
      stageFadeDuration: 520,
      particleCount: 72,
      particleSize: 8,
      shapeSize: 180,
      floatStrength: 10,
      colorPool: ["#8DB8F2", "#F65A1E", "#8FD39B", "#F6D94A", "#F4B6D2"],
      prompt: {
        text: "\u4e0d\u8fc7,\u4f60\u6709\u6ca1\u6709\u60f3\u8fc7\uff0c\u4f60\u7684\u996e\u98df\u65b9\u5f0f\u6216\u8bb8\u4f1a\u7ed9\u8eab\u4f53\u9020\u6210\u8d1f\u62c5\uff1f",
        x: 960,
        y: 176,
        width: 900,
        fontSize: 20,
        lineHeight: 1.8,
        color: "#693618"
      },
      shapes: [
        {
          id: "risk_shape_01",
          type: "square",
          x: 360,
          y: 390,
          size: 180,
          text: "\u504f\u597d\u5f3a\u70c8\u5473\u89c9\u4fe1\u53f7\uff0c\u5bb9\u6613\u9009\u62e9\u9ad8\u6e29\u3001\u8f9b\u8fa3\u3001\u91cd\u53e3\u548c\u9152\u7cbe\u7c7b\u996e\u98df\u3002\u996e\u98df\u4f53\u9a8c\u5f80\u5f80\u4f9d\u8d56\u201c\u523a\u6fc0\u611f\u201d\u6765\u786e\u8ba4\u6ee1\u8db3\uff0c\u957f\u671f\u4e0b\u6765\u4f1a\u8ba9\u53e3\u8154\u3001\u54bd\u5589\u4e0e\u98df\u7ba1\u53cd\u590d\u66b4\u9732\u5728\u66f4\u5f3a\u70c8\u7684\u5916\u90e8\u523a\u6fc0\u4e2d\u3002",
          textX: 170,
          textY: 600,
          textWidth: 380
        },
        {
          id: "risk_shape_02",
          type: "triangle",
          x: 740,
          y: 390,
          size: 180,
          text: "\u8fdb\u98df\u8282\u594f\u504f\u5feb\uff0c\u9910\u6b21\u5b89\u6392\u4e0d\u7a33\u5b9a\uff0c\u5bb9\u6613\u5728\u9965\u997f\u3001\u8d76\u65f6\u95f4\u6216\u60c5\u7eea\u9a71\u52a8\u4e0b\u5feb\u901f\u5b8c\u6210\u4e00\u9910\u3002\u8eab\u4f53\u8fd8\u6ca1\u6765\u5f97\u53ca\u611f\u77e5\u6e29\u5ea6\u3001\u9971\u8179\u548c\u4e0d\u9002\uff0c\u98df\u7269\u5c31\u5df2\u7ecf\u88ab\u5927\u91cf\u6444\u5165\u3002",
          textX: 550,
          textY: 600,
          textWidth: 380
        },
        {
          id: "risk_shape_03",
          type: "circle",
          x: 1120,
          y: 390,
          size: 180,
          text: "\u504f\u597d\u6709\u5480\u56bc\u963b\u529b\u3001\u9165\u8106\u611f\u6216\u8f83\u786c\u8d28\u5730\u7684\u98df\u7269\uff0c\u6cb9\u70b8\u7c7b\u98df\u7269\u4e5f\u66f4\u5bb9\u6613\u88ab\u9009\u62e9\u3002\u996e\u98df\u8fc7\u7a0b\u4e2d\u66f4\u91cd\u89c6\u201c\u53e3\u611f\u51b2\u51fb\u201d\u548c\u201c\u54ac\u4e0b\u53bb\u7684\u5b58\u5728\u611f\u201d\uff0c\u53ef\u80fd\u589e\u52a0\u8fdb\u98df\u65f6\u7684\u6469\u64e6\u611f\u4e0e\u8d1f\u62c5\u611f\u3002",
          textX: 930,
          textY: 600,
          textWidth: 380
        },
        {
          id: "risk_shape_04",
          type: "radial",
          x: 1500,
          y: 390,
          size: 180,
          text: "\u5bf9\u8fb9\u754c\u6a21\u7cca\u7684\u98df\u7269\u72b6\u6001\u63a5\u53d7\u5ea6\u8f83\u9ad8\uff0c\u6bd4\u5982\u814c\u5236\u65f6\u95f4\u8f83\u957f\u3001\u4fdd\u5b58\u72b6\u6001\u4e0d\u660e\u786e\u3001\u98ce\u5473\u5f3a\u70c8\u6216\u5e26\u6709\u53d1\u9175\u611f\u7684\u98df\u7269\u3002\u5224\u65ad\u6807\u51c6\u66f4\u504f\u5411\u201c\u5473\u9053\u662f\u5426\u591f\u7279\u522b\u201d\uff0c\u800c\u4e0d\u662f\u201c\u98df\u7269\u72b6\u6001\u662f\u5426\u8db3\u591f\u6e05\u6670\u201d\u3002",
          textX: 1310,
          textY: 600,
          textWidth: 380
        }
      ],
      centerExplanation: {
        text: "\u5f53\u4f60\u957f\u671f\u4fdd\u6301\u8fd9\u6837\u7684\u996e\u98df\u65b9\u5f0f\u65f6:\u98df\u7ba1\u4f1a\u4e0d\u65ad\u7ecf\u5386:\n\u9ad8\u6e29\u707c\u4f24.\n\u8f9b\u8fa3\u523a\u6fc0\n\u9ecf\u819c\u6469\u64e6\n\u708e\u75c7\u4fee\u590d\n\u5927\u591a\u6570\u65f6\u5019\uff0c\u8eab\u4f53\u53ef\u4ee5\u81ea\u6211\u6062\u590d\u3002\n\u4f46\u5982\u679c\u8fd9\u79cd\u523a\u6fc0\u6301\u7eed\u6570\u5e74\uff0c\n\u7ec6\u80de\u5f02\u5e38\u53d1\u751f\u7684\u6982\u7387\uff0c\u5c31\u4f1a\u6162\u6162\u5347\u9ad8\u3002",
        x: 960,
        y: 396,
        width: 760,
        fontSize: 26,
        lineHeight: 1.9,
        color: "#693618"
      },
      transitionParticles: {
        particleCount: 140,
        minSize: 10,
        maxSize: 34,
        enterDuration: 920,
        holdDuration: 340,
        exitDuration: 880
      },
      riskIndex: {
        title: "\u996e\u98df\u98ce\u9669\u6307\u6570",
        value: "78/100",
        note: "\u800c\u98df\u7ba1\u764c\uff0c\n\u6b63\u662f\u4e00\u79cd\u4e0e\u957f\u671f\u996e\u98df\u523a\u6fc0\u3002\n\u9ad8\u5ea6\u76f8\u5173\u7684\u75be\u75c5\u4e4b\u4e00\u3002",
        x: 960,
        y: 338,
        width: 760,
        titleFontSize: 28,
        valueFontSize: 72,
        noteFontSize: 28,
        noteLineHeight: 1.8,
        color: "#693618"
      }
    }
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

let act1Choices = null;
let act1Layouts = null;
let act2Choices = null;
let act2Layouts = null;
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
let selectedAct1BreakfastId = null;
let isAct1BreakfastLocked = false;
let act1HeatValue = 0;
let isAct1HeatingPressed = false;
let isAct1HeatingComplete = false;
let act1HeatAnimationFrame = 0;
let act1HeatLastTimestamp = 0;
let act1ClearedHeatZoneIds = new Set();
let act1EatingClickCount = 0;
let act1EatingStartedAt = 0;
let act1EatingRequiredClicks = 1;
let isAct1EatingComplete = false;
let selectedAct2LunchId = null;
let isAct2LunchLocked = false;
let playerChoices = [];
let playerRiskResult = null;
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
let resultRiskLayer = null;
let resultStatsOverlayLayer = null;
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
let hasResultGalaxyEnterStarted = false;
let resultGalaxyEnterTimer = null;
let hasResultRiskIntroStarted = false;
let resultRiskIntroStep = 0;
let resultRiskIntroWheelLocked = false;
let resultRiskIntroWheelLockTimer = null;
let hoverInfoTooltip = null;
let hoverInfoShowTimer = null;
let hoverInfoHideTimer = null;
let resultStatsShortcutBound = false;
let objectLayer = null;
let transitionDuration = 900;
let isFoodChoiceLocked = false;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    bindResultStatsDebugShortcut();
    createResultStatsDebugButton();
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
  await loadAct1Data();
  await loadAct2Data();
  await loadResultData();
  transitionDuration = act3Layouts.defaults?.duration || transitionDuration;
  console.log("Act 3 数据读取完成：", { act3Choices, act3Layouts });
}

async function loadAct1Data() {
  try {
    const [choicesResponse, layoutsResponse] = await Promise.all([
      fetch(act1Files.choices),
      fetch(act1Files.layouts)
    ]);

    if (!choicesResponse.ok) {
      throw new Error(`${act1Files.choices} 读取失败`);
    }

    if (!layoutsResponse.ok) {
      throw new Error(`${act1Files.layouts} 读取失败`);
    }

    act1Choices = await choicesResponse.json();
    act1Layouts = await layoutsResponse.json();
    console.log("Act 1 数据读取完成：", { act1Choices, act1Layouts });
  } catch (error) {
    act1Choices = { choices: [] };
    act1Layouts = { states: {} };
    console.warn("Act 1 数据读取失败，使用空配置：", error);
  }
}

async function loadAct2Data() {
  try {
    const [choicesResponse, layoutsResponse] = await Promise.all([
      fetch(act2Files.choices),
      fetch(act2Files.layouts)
    ]);

    if (!choicesResponse.ok) {
      throw new Error(`${act2Files.choices} 读取失败`);
    }

    if (!layoutsResponse.ok) {
      throw new Error(`${act2Files.layouts} 读取失败`);
    }

    act2Choices = await choicesResponse.json();
    act2Layouts = await layoutsResponse.json();
    console.log("Act 2 数据读取完成：", { act2Choices, act2Layouts });
  } catch (error) {
    act2Choices = { choices: [] };
    act2Layouts = { states: {} };
    console.warn("Act 2 数据读取失败，使用空配置：", error);
  }
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
    },
    resultGalaxyEnter: {
      ...RESULT_GALAXY_LOCATING_DEFAULT_CONFIG.resultGalaxyEnter,
      ...(config.resultGalaxyEnter || {}),
      nebula: {
        ...RESULT_GALAXY_LOCATING_DEFAULT_CONFIG.resultGalaxyEnter.nebula,
        ...(config.resultGalaxyEnter?.nebula || {})
      },
      planet: {
        ...RESULT_GALAXY_LOCATING_DEFAULT_CONFIG.resultGalaxyEnter.planet,
        ...(config.resultGalaxyEnter?.planet || {})
      }
    },
    resultDietGalaxy: {
      ...RESULT_GALAXY_LOCATING_DEFAULT_CONFIG.resultDietGalaxy,
      ...(config.resultDietGalaxy || {}),
      galaxyLabel: {
        ...RESULT_GALAXY_LOCATING_DEFAULT_CONFIG.resultDietGalaxy.galaxyLabel,
        ...(config.resultDietGalaxy?.galaxyLabel || {})
      },
      panel: {
        ...RESULT_GALAXY_LOCATING_DEFAULT_CONFIG.resultDietGalaxy.panel,
        ...(config.resultDietGalaxy?.panel || {})
      },
      traitBars: {
        ...RESULT_GALAXY_LOCATING_DEFAULT_CONFIG.resultDietGalaxy.traitBars,
        ...(config.resultDietGalaxy?.traitBars || {})
      },
      riskIntro: {
        ...RESULT_GALAXY_LOCATING_DEFAULT_CONFIG.resultDietGalaxy.riskIntro,
        ...(config.resultDietGalaxy?.riskIntro || {}),
        prompt: {
          ...RESULT_GALAXY_LOCATING_DEFAULT_CONFIG.resultDietGalaxy.riskIntro.prompt,
          ...(config.resultDietGalaxy?.riskIntro?.prompt || {})
        },
        centerExplanation: {
          ...RESULT_GALAXY_LOCATING_DEFAULT_CONFIG.resultDietGalaxy.riskIntro.centerExplanation,
          ...(config.resultDietGalaxy?.riskIntro?.centerExplanation || {})
        },
        transitionParticles: {
          ...RESULT_GALAXY_LOCATING_DEFAULT_CONFIG.resultDietGalaxy.riskIntro.transitionParticles,
          ...(config.resultDietGalaxy?.riskIntro?.transitionParticles || {})
        },
        riskIndex: {
          ...RESULT_GALAXY_LOCATING_DEFAULT_CONFIG.resultDietGalaxy.riskIntro.riskIndex,
          ...(config.resultDietGalaxy?.riskIntro?.riskIndex || {})
        },
        shapes: config.resultDietGalaxy?.riskIntro?.shapes ||
          RESULT_GALAXY_LOCATING_DEFAULT_CONFIG.resultDietGalaxy.riskIntro.shapes
      }
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

function createResultStatsDebugButton() {
  if (document.querySelector(".result-stats-debug-button")) {
    return;
  }

  const button = document.createElement("button");

  button.type = "button";
  button.className = "result-stats-debug-button";
  button.textContent = "数据";
  button.title = "查看玩家实时记录（R）";
  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    showResultStatsOverlay();
  });
  document.body.appendChild(button);
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

// ---------------------------------------------------------------------------
// Result risk calculation
// ---------------------------------------------------------------------------

const RISK_DIMENSION_KEYS = ["sensory", "rhythm", "specificity", "danger"];
const ACT1_BREAKFAST_RISK_OPTION_KEYS = {
  act1_s01_breakfast_overnightPizza: "breakfast_overnightPizza",
  act1_s01_breakfast_baguetteCheese: "breakfast_baguetteCheese",
  act1_s01_breakfast_hotPorridge: "breakfast_hotPorridge",
  act1_s01_breakfast_eggHamSandwich: "breakfast_eggHamSandwich",
  act1_s01_breakfast_cornEggMilk: "breakfast_cornEggMilk"
};
const ACT1_EATING_SPEED_RISK_OPTION_KEYS = {
  fast: "breakfast_speed_fast",
  medium: "breakfast_speed_medium",
  slow: "breakfast_speed_slow"
};
const ACT2_LUNCH_FOOD_RISK_OPTION_KEYS = {
  act2_food_qingjiao_larou: "lunch_qingjiao_larou",
  act2_food_koushuiji: "lunch_koushuiji",
  act2_food_zhaxiao_rouwan: "lunch_zhaxiao_rouwan",
  act2_food_huobao_youyu: "lunch_huobao_youyu",
  act2_food_jiang_niurou: "lunch_jiang_niurou",
  act2_food_xiaren_caixin: "lunch_xiaren_caixin",
  act2_food_shaguo_zhou: "lunch_shaguo_zhou",
  act2_food_hanbao_zhaji: "lunch_hanbao_zhaji",
  act2_food_paocai_niurou_xinlamian: "lunch_paocai_niurou_xinlamian",
  act2_food_baimifan: "lunch_baimifan"
};
const ACT2_LUNCH_PLACE_RISK_OPTION_KEYS = {
  act2_place_canteen_table: "lunch_place_canteen_table",
  act2_place_coworkers: "lunch_place_coworkers",
  act2_place_park_bench: "lunch_place_park_bench",
  act2_place_office_desk: "lunch_place_office_desk"
};
const ACT3_HOTPOT_FOOD_RISK_OPTION_KEYS = {
  act3_s01_food_maodu: "hotpot_maodu",
  act3_s01_food_sausage: "hotpot_sausage",
  act3_s01_food_vegetable: "hotpot_vegetable",
  act3_s01_food_luncheonMeat: "hotpot_luncheonMeat",
  act3_s01_food_youtiao: "hotpot_youtiao",
  act3_s01_food_daiRouCuiGu: "hotpot_daiRouCuiGu",
  act3_s01_food_beefSlices: "hotpot_beefSlices"
};
const ACT3_HOTPOT_TARGET_RISK_OPTION_KEYS = {
  act3_s01_target_clearPot: "hotpot_target_clear",
  act3_s01_target_spicyPot: "hotpot_target_spicy"
};
const ACT3_DRINK_RISK_OPTION_KEYS = {
  act3_s02_drink_softDrink: "drink_softDrink",
  act3_s02_drink_lowAlcohol: "drink_lowAlcohol",
  act3_s02_drink_highAlcohol: "drink_highAlcohol",
  act3_s02_drink_lemonWater: "drink_lemonWater",
  act3_s02_drink_beer: "drink_lowAlcohol"
};

function getRiskConfig() {
  return window.RISK_CONFIG || {};
}

function getOptionRiskTags(optionKey) {
  return [...(getRiskConfig().OPTION_RISK_TAGS?.[optionKey] || [])];
}

function calculatePlayerRisk(input = playerChoices) {
  const normalizedChoices = Array.isArray(input)
    ? normalizePlayerChoicesForRisk(input)
    : normalizeRiskInput(input || {});
  const riskConfig = getRiskConfig();
  const riskTags = riskConfig.RISK_TAGS || {};
  const riskMax = riskConfig.RISK_MAX || {};
  const tagCounts = {};
  const unknownRiskTags = [];

  collectSelectedRiskTags(normalizedChoices).forEach((tag) => {
    if (!tag || tag === "无") {
      return;
    }

    if (!riskTags[tag]) {
      unknownRiskTags.push(tag);
      return;
    }

    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
  });

  const riskTagCounts = {};
  const dimensionScores = RISK_DIMENSION_KEYS.reduce((scores, dimension) => {
    scores[dimension] = 0;
    return scores;
  }, {});

  Object.entries(tagCounts).forEach(([tag, rawChosen]) => {
    const config = riskTags[tag];
    const appear = Math.max(1, config.appear || 1);
    const effectiveChosen = Math.min(rawChosen, appear);
    const exposure = Math.sqrt(effectiveChosen / appear);
    const score = exposure * (config.logOR || 0);

    riskTagCounts[tag] = {
      rawChosen,
      effectiveChosen,
      exposure: roundRiskValue(exposure, 4),
      score: roundRiskValue(score, 4),
      dimension: config.dimension
    };

    if (dimensionScores[config.dimension] !== undefined) {
      dimensionScores[config.dimension] += score;
    }
  });

  const totalScore = Object.values(dimensionScores).reduce((sum, score) => sum + score, 0);
  const totalRiskIndex = normalizeRiskIndex(totalScore, riskMax.total);
  const riskLevel = getRiskLevel(totalRiskIndex);
  const dimensions = RISK_DIMENSION_KEYS.reduce((result, dimension) => {
    const score = dimensionScores[dimension] || 0;
    const riskIndex = normalizeRiskIndex(score, riskMax[dimension]);

    result[dimension] = {
      score: roundRiskValue(score, 4),
      riskIndex,
      endpoint: getDimensionEndpoint(dimension, riskIndex)
    };

    return result;
  }, {});

  return {
    province: normalizedChoices.province || null,
    selectedItems: normalizedChoices.selectedItems,
    riskTagCounts,
    totalScore: roundRiskValue(totalScore, 4),
    totalRiskIndex,
    riskLevel,
    riskLevelLabel: getRiskConfig().RISK_LEVEL_LABELS?.[riskLevel] || riskLevel,
    dimensions,
    behavior: normalizedChoices.behavior,
    unknownRiskTags: [...new Set(unknownRiskTags)]
  };
}

function normalizeRiskInput(input) {
  const selectedItems = {
    breakfast: input.breakfast || null,
    breakfastSpeed: input.breakfastSpeed || null,
    lunchFoods: [...(input.lunchFoods || [])].slice(0, 4),
    lunchPlace: input.lunchPlace || null,
    hotpotFoods: [...(input.hotpotFoods || [])].slice(0, 3).map((food) => ({
      id: food.id || null,
      target: food.target || null
    })),
    drink: input.drink || null
  };
  const behavior = normalizeRiskBehavior(input.behavior || {}, selectedItems);

  return {
    province: input.province || null,
    selectedItems,
    behavior
  };
}

function normalizePlayerChoicesForRisk(choices) {
  const breakfastChoice = choices.find((choice) => choice.stepId === "act1_breakfastChoice");
  const breakfastSpeedChoice = choices.find((choice) => choice.stepId === "act1_eatingSpeed");
  const lunchPlateChoice = choices.find((choice) => choice.stepId === "act2_lunchPlateChoice");
  const lunchPlaceChoice = choices.find((choice) => choice.stepId === "act2_lunchPlaceChoice");
  const hotpotChoice = choices.find((choice) => choice.stepId === "act3_s01_foodChoice");
  const drinkChoice = choices.find((choice) => choice.stepId === "act3_s02_drinkChoice");
  const provinceChoice = choices.find((choice) => choice.province || choice.provinceName);
  const selectedItems = {
    breakfast: ACT1_BREAKFAST_RISK_OPTION_KEYS[breakfastChoice?.breakfastId] || null,
    breakfastSpeed: ACT1_EATING_SPEED_RISK_OPTION_KEYS[breakfastSpeedChoice?.eatingSpeed] || null,
    lunchFoods: (lunchPlateChoice?.selectedFoods || [])
      .slice(0, 4)
      .map((food) => ACT2_LUNCH_FOOD_RISK_OPTION_KEYS[food.foodId])
      .filter(Boolean),
    lunchPlace: ACT2_LUNCH_PLACE_RISK_OPTION_KEYS[lunchPlaceChoice?.placeId] || null,
    hotpotFoods: (hotpotChoice?.selectedFoods || [])
      .slice(0, 3)
      .map((food) => ({
        id: ACT3_HOTPOT_FOOD_RISK_OPTION_KEYS[food.foodId] || null,
        target: ACT3_HOTPOT_TARGET_RISK_OPTION_KEYS[food.targetId] || null
      }))
      .filter((food) => food.id),
    drink: ACT3_DRINK_RISK_OPTION_KEYS[drinkChoice?.drinkId] || null
  };
  const behavior = normalizeRiskBehavior(
    {
      eatingDurationMs: breakfastSpeedChoice?.elapsedMs,
      clickCount: breakfastSpeedChoice?.clickCount,
      eatingSpeedLevel: breakfastSpeedChoice?.eatingSpeed
    },
    selectedItems
  );

  return {
    province: provinceChoice?.province || provinceChoice?.provinceName || null,
    selectedItems,
    behavior
  };
}

function normalizeRiskBehavior(behavior, selectedItems) {
  const eatingDurationMs = Number(behavior.eatingDurationMs || behavior.elapsedMs || 0);
  const clickCount = Number(behavior.clickCount || 0);
  const clickSpeed = Number.isFinite(Number(behavior.clickSpeed))
    ? Number(behavior.clickSpeed)
    : eatingDurationMs > 0
      ? clickCount / (eatingDurationMs / 1000)
      : 0;
  const eatingSpeedLevel =
    behavior.eatingSpeedLevel ||
    behavior.eatingSpeed ||
    selectedItems.breakfastSpeed?.replace("breakfast_speed_", "") ||
    null;
  const regularity =
    selectedItems.lunchPlace === "lunch_place_office_desk"
      ? "irregular"
      : selectedItems.lunchPlace
        ? "regular"
        : behavior.regularity || null;

  return {
    eatingDurationMs,
    clickCount,
    clickSpeed: roundRiskValue(clickSpeed, 2),
    eatingSpeedLevel,
    regularity
  };
}

function collectSelectedRiskTags(normalizedChoices) {
  const { selectedItems } = normalizedChoices;

  return [
    ...getOptionRiskTags(selectedItems.breakfast),
    ...getOptionRiskTags(selectedItems.breakfastSpeed),
    ...selectedItems.lunchFoods.flatMap((foodKey) => getOptionRiskTags(foodKey)),
    ...getOptionRiskTags(selectedItems.lunchPlace),
    ...selectedItems.hotpotFoods.flatMap((food) => [
      ...getOptionRiskTags(food.id),
      ...getOptionRiskTags(food.target)
    ]),
    ...getOptionRiskTags(selectedItems.drink)
  ].filter(Boolean);
}

function normalizeRiskIndex(score, maxScore) {
  if (!maxScore) {
    return 0;
  }

  return roundRiskValue(Math.max(0, Math.min(100, (score / maxScore) * 100)), 2);
}

function getRiskLevel(totalRiskIndex) {
  const thresholds = getRiskConfig().RISK_LEVEL_THRESHOLDS || {};

  if (totalRiskIndex < (thresholds.lowMax ?? 33)) {
    return "low";
  }

  if (totalRiskIndex < (thresholds.highMin ?? 42)) {
    return "medium";
  }

  return "high";
}

function getDimensionEndpoint(dimension, riskIndex) {
  const threshold = getRiskConfig().DIMENSION_ENDPOINT_THRESHOLDS?.[dimension] ?? 50;
  const endpoints = getRiskConfig().DIMENSION_ENDPOINTS?.[dimension] || { high: "", low: "" };

  return riskIndex >= threshold ? endpoints.high : endpoints.low;
}

function roundRiskValue(value, digits = 2) {
  const factor = 10 ** digits;

  return Math.round((Number(value) || 0) * factor) / factor;
}

function updatePlayerRiskResult() {
  playerRiskResult = calculatePlayerRisk(playerChoices);
  window.playerRiskResult = playerRiskResult;

  return playerRiskResult;
}

function getPlayerRiskResult() {
  return playerRiskResult || updatePlayerRiskResult();
}

window.calculatePlayerRisk = calculatePlayerRisk;
window.getPlayerRiskResult = getPlayerRiskResult;

// ---------------------------------------------------------------------------
// Act1 Breakfast Module
// Owner area for Act1 breakfast flow only.
// Allowed here: Act1 state entry, Act1 low-fidelity rendering, Act1-specific
// interactions, and Act1 records appended to playerChoices.
// Avoid here: Act0 alarm internals, Act3 drag/drop, Result transitions, and
// changes to existing playerChoices/riskTags semantics.
// ---------------------------------------------------------------------------

function enterAct1BreakfastChoice() {
  const state = getAct1StateConfig(ACT1_STATES.BREAKFAST_CHOICE);

  currentPhase = PHASES.ACT1_BREAKFAST;
  currentState = ACT1_STATES.BREAKFAST_CHOICE;
  isStateLocked = false;
  isAct1BreakfastLocked = false;
  selectedAct1BreakfastId = null;
  hideHoverInfoTooltip();
  hideGuidanceBubbles();
  stopHotpotFloatingBubbles();
  updateStageHeader("\u7b2c\u4e00\u5e55\u4f4e\u4fdd\u771f\u539f\u578b", "\u65e9\u6668\u2014\u2014\u65e9\u996d\u9009\u62e9");
  objectLayer?.classList.remove("act3-exit-sequence");
  objectLayer.querySelectorAll(".act1-scene-object").forEach((element) => element.remove());

  Object.entries(state.objects || {}).forEach(([objectId, objectConfig]) => {
    const element = createAct1ObjectElement(objectId, objectConfig);

    updateAct1ObjectLayout(element, objectConfig);
    if (objectConfig.type === "microwavePanel") {
      element.classList.add("act1-microwave-drop-in");
    }
    objectLayer.appendChild(element);
  });

  console.log("Entered act1_01_breakfast_choice", { playerChoices });
}

function getAct1StateConfig(stateId) {
  const state = act1Layouts?.states?.[stateId];

  if (!state) {
    throw new Error(`Missing Act1 state layout: ${stateId}`);
  }

  return state;
}

function createAct1ObjectElement(objectId, objectConfig) {
  const isBreakfastOption = objectConfig.type === "breakfastOption";
  const isMicrowavePanel = objectConfig.type === "microwavePanel";
  const isTemperatureGauge = objectConfig.type === "temperatureGauge";
  const isEatingFood = objectConfig.type === "eatingFood";
  const element = document.createElement(isBreakfastOption ? "button" : "div");

  if (isBreakfastOption) {
    const choice = getAct1BreakfastChoice(objectConfig.choiceId || objectId);
    const sketch = document.createElement("span");
    const label = document.createElement("span");

    element.type = "button";
    element.dataset.choiceId = choice?.id || objectConfig.choiceId || objectId;
    element.dataset.exitDuration = String(objectConfig.exitDuration || 900);
    element.style.setProperty("--act1-exit-duration", `${objectConfig.exitDuration || 900}ms`);
    element.style.setProperty("--act1-exit-x", `${objectConfig.exitDriftX || 0}px`);
    element.style.setProperty("--act1-exit-y", `${objectConfig.exitDriftY || -300}px`);
    sketch.className = "act1-breakfast-sketch";
    sketch.dataset.sketch = choice?.id || objectId;
    label.className = "act1-breakfast-label";
    label.textContent = choice?.label || objectConfig.label || objectId;
    element.appendChild(sketch);
    element.appendChild(label);
    element.addEventListener("click", () => handleAct1BreakfastChoice(element));
    bindHoverInfo(element, element.dataset.choiceId);
  } else if (isMicrowavePanel) {
    element.innerHTML = `
      <div class="act1-microwave-title">${objectConfig.content || ""}</div>
      <div class="act1-microwave-window">
        <span class="act1-microwave-food"></span>
        <span class="act1-microwave-steam"></span>
      </div>
      <div class="act1-microwave-hint">按住鼠标加热</div>
    `;
    element.addEventListener("pointerdown", startAct1HeatingPress);
  } else if (objectConfig.type === "heatPlate") {
    element.innerHTML = `<span class="act1-heat-plate-label">${objectConfig.content || ""}</span>`;
  } else if (isTemperatureGauge) {
    element.innerHTML = `
      <div class="act1-gauge-guide">${getAct1HeatingConfig().guideText}</div>
      <div class="act1-gauge-ring">
        <span class="act1-gauge-progress"></span>
        <span class="act1-gauge-zone act1-gauge-zone-1"></span>
        <span class="act1-gauge-zone act1-gauge-zone-2"></span>
        <span class="act1-gauge-pointer"></span>
        <button class="act1-gauge-center-button" type="button" aria-label="Hold to heat"></button>
      </div>
      <div class="act1-gauge-readout">0%</div>
      <div class="act1-gauge-label">${objectConfig.content || ""}</div>
    `;
    element.querySelector(".act1-gauge-center-button").addEventListener("pointerdown", startAct1HeatingPress);
  } else if (objectConfig.type === "atmosphereFrame") {
    element.innerHTML = `
      <div class="act1-window-tree"></div>
      <div class="act1-window-rain"></div>
      <div class="act1-window-bird"></div>
      <div class="act1-window-label">${objectConfig.content || ""}</div>
    `;
  } else if (objectConfig.type === "eatingTable") {
    element.innerHTML = `
      <div class="act1-table-line"></div>
      <div class="act1-table-label">${objectConfig.content || ""}</div>
    `;
  } else if (isEatingFood) {
    element.innerHTML = `
      <div class="act1-plate"></div>
      <button class="act1-eating-food-button" type="button">
        <span class="act1-eating-food-bite"></span>
        <span class="act1-eating-food-label">${objectConfig.content || ""}</span>
      </button>
    `;
    element.querySelector(".act1-eating-food-button").addEventListener("click", handleAct1EatingFoodClick);
  } else {
    element.textContent = objectConfig.content || "";
  }

  element.id = objectId;
  element.dataset.objectId = objectId;
  element.dataset.objectType = objectConfig.type;
  element.className = getAct1ObjectClassName(objectConfig.type);
  syncAct1PlaceholderImage(element, objectConfig, objectConfig.label || objectConfig.content || objectId);
  return element;
}

function syncAct1PlaceholderImage(element, objectConfig, fallbackLabel) {
  if (!objectConfig.image) {
    return;
  }

  const image = document.createElement("img");

  image.className = "act1-placeholder-image";
  image.alt = fallbackLabel || "";
  image.draggable = false;
  image.src = objectConfig.image;
  image.onload = () => {
    element.classList.add("has-act1-image");
  };
  image.onerror = () => {
    element.classList.remove("has-act1-image");
    image.remove();
  };
  element.prepend(image);
}

function getAct1ObjectClassName(type) {
  if (type === "breakfastOption") {
    return "act1-scene-object act1-breakfast-option";
  }

  if (type === "breakfastFrame") {
    return "act1-scene-object act1-breakfast-frame";
  }

  if (type === "microwavePanel") {
    return "act1-scene-object act1-microwave-panel";
  }

  if (type === "heatPlate") {
    return "act1-scene-object act1-heat-plate";
  }

  if (type === "temperatureGauge") {
    return "act1-scene-object act1-temperature-gauge";
  }

  if (type === "atmosphereFrame") {
    return "act1-scene-object act1-atmosphere-frame";
  }

  if (type === "eatingSceneBg") {
    return "act1-scene-object act1-eating-scene-bg";
  }

  if (type === "eatingAtmosphereAsset") {
    return "act1-scene-object act1-eating-atmosphere";
  }

  if (type === "eatingTable") {
    return "act1-scene-object act1-eating-table";
  }

  if (type === "eatingPlate") {
    return "act1-scene-object act1-eating-plate";
  }

  if (type === "eatingFood") {
    return "act1-scene-object act1-eating-food";
  }

  if (type === "bubble") {
    return "act1-scene-object act1-breakfast-bubble act3-panel";
  }

  return "act1-scene-object act3-panel";
}

function updateAct1ObjectLayout(element, objectConfig) {
  const stage = act1Layouts?.stage || { width: DESIGN_WIDTH, height: DESIGN_HEIGHT };

  element.style.left = `${(objectConfig.x / stage.width) * 100}%`;
  element.style.top = `${(objectConfig.y / stage.height) * 100}%`;
  element.style.width = `${(objectConfig.width / stage.width) * 100}%`;
  element.style.height = `${(objectConfig.height / stage.height) * 100}%`;
  element.style.opacity = objectConfig.opacity ?? 1;
  element.style.zIndex = objectConfig.zIndex ?? 1;
  element.style.transformOrigin = objectConfig.transformOrigin || "center center";
  element.style.transform = `scale(${objectConfig.scale ?? 1})`;
}

function getAct1BreakfastChoice(choiceId) {
  return act1Choices?.choices?.find((choice) => choice.id === choiceId) || null;
}

function handleAct1BreakfastChoice(optionElement) {
  if (isAct1BreakfastLocked || currentPhase !== PHASES.ACT1_BREAKFAST) {
    return;
  }

  const choice = getAct1BreakfastChoice(optionElement.dataset.choiceId);

  if (!choice) {
    return;
  }

  isAct1BreakfastLocked = true;
  selectedAct1BreakfastId = choice.id;
  isStateLocked = true;
  hideHoverInfoTooltip();
  recordAct1BreakfastChoice(choice);
  optionElement.classList.add("is-selected");
  optionElement.disabled = true;
  objectLayer.querySelectorAll(".act1-breakfast-option").forEach((element) => {
    if (element === optionElement) {
      return;
    }

    const exitDuration = Number(element.dataset.exitDuration || 900);

    element.disabled = true;
    element.classList.add("is-leaving");
    window.setTimeout(() => {
      element.remove();
    }, exitDuration + 80);
  });

  playAct1BreakfastToHeatTransition(optionElement);
}

function recordAct1BreakfastChoice(choice) {
  const record = {
    sceneId: "act1",
    stepId: "act1_breakfastChoice",
    interactionType: "click_breakfast_choice",
    breakfastId: choice.id,
    breakfastName: choice.name,
    label: choice.label,
    riskTags: choice.riskTags || [],
    tendencyScores: choice.tendencyScores || {},
    hoverText: choice.hoverText || ""
  };

  playerChoices.push(record);
  console.log("Act 1 breakfast choice:", record);
  console.log("Act 1 playerChoices:", playerChoices);
}

function getAct1MicrowaveEntryConfig() {
  const state = getAct1StateConfig(ACT1_STATES.MICROWAVE_HEAT);
  const config = state.entryTransition || {};

  return {
    duration: config.duration ?? 1500,
    orthogonalStepDelay: config.orthogonalStepDelay ?? 520,
    targetCenterX: config.targetCenterX ?? 768,
    targetCenterY: config.targetCenterY ?? 469,
    targetScale: config.targetScale ?? 1.3
  };
}

function playAct1BreakfastToHeatTransition(selectedElement) {
  const config = getAct1MicrowaveEntryConfig();
  const selectedConfig = getAct1StateConfig(ACT1_STATES.BREAKFAST_CHOICE)
    .objects?.[selectedElement.dataset.objectId];

  objectLayer.querySelectorAll(".act1-breakfast-frame").forEach((element) => {
    element.classList.add("is-leaving-up");
  });

  if (!selectedConfig) {
    window.setTimeout(enterAct1MicrowaveHeat, config.duration);
    return;
  }

  const stage = act1Layouts?.stage || { width: DESIGN_WIDTH, height: DESIGN_HEIGHT };
  const targetWidth = selectedConfig.width * config.targetScale;
  const targetHeight = selectedConfig.height * config.targetScale;
  const targetLeft = config.targetCenterX - targetWidth / 2;
  const targetTop = config.targetCenterY - targetHeight / 2;

  selectedElement.classList.add("is-travelling-to-microwave");
  selectedElement.style.zIndex = "30";
  selectedElement.style.transitionDuration = `${config.orthogonalStepDelay}ms`;
  selectedElement.style.left = `${(targetLeft / stage.width) * 100}%`;
  selectedElement.style.transform = `scale(${config.targetScale})`;

  window.setTimeout(() => {
    selectedElement.style.top = `${(targetTop / stage.height) * 100}%`;
  }, config.orthogonalStepDelay);

  window.setTimeout(() => {
    enterAct1MicrowaveHeat();
  }, config.duration);
}

function enterAct1MicrowaveHeat() {
  const state = getAct1StateConfig(ACT1_STATES.MICROWAVE_HEAT);
  const carriedFood = objectLayer.querySelector(".act1-breakfast-option.is-travelling-to-microwave");

  currentPhase = PHASES.ACT1_HEATING;
  currentState = ACT1_STATES.MICROWAVE_HEAT;
  isStateLocked = false;
  isAct1HeatingPressed = false;
  isAct1HeatingComplete = false;
  act1HeatValue = getAct1HeatingConfig().minTemperature;
  act1ClearedHeatZoneIds = new Set();
  stopAct1HeatLoop();
  hideHoverInfoTooltip();
  updateStageHeader("\u7b2c\u4e00\u5e55\u4f4e\u4fdd\u771f\u539f\u578b", "\u65e9\u6668\u2014\u2014\u5fae\u6ce2\u52a0\u70ed");
  objectLayer.querySelectorAll(".act1-scene-object").forEach((element) => {
    if (element === carriedFood) {
      return;
    }

    element.remove();
  });

  if (carriedFood) {
    carriedFood.classList.add("act1-carried-heat-food");
    carriedFood.classList.remove("is-selected");
    carriedFood.disabled = true;
  }

  Object.entries(state.objects || {}).forEach(([objectId, objectConfig]) => {
    const element = createAct1ObjectElement(objectId, objectConfig);

    updateAct1ObjectLayout(element, objectConfig);
    objectLayer.appendChild(element);
  });

  updateAct1HeatVisuals();
  startAct1HeatLoop();
  console.log("Entered act1_02_microwave_heat", { selectedAct1BreakfastId });
}

function getAct1HeatingConfig() {
  const config = getAct1StateConfig(ACT1_STATES.MICROWAVE_HEAT).heating || {};

  return {
    minTemperature: config.minTemperature ?? 0,
    maxTemperature: config.maxTemperature ?? 100,
    completionTemperature: config.completionTemperature ?? config.maxTemperature ?? 100,
    heatUpPerSecond: config.heatUpPerSecond ?? 42,
    coolDownPerSecond: config.coolDownPerSecond ?? 0,
    resetTemperature: config.resetTemperature ?? config.minTemperature ?? 0,
    cautionZones: config.cautionZones || [],
    guideText: config.guideText || "Hold to heat. Release inside orange zones."
  };
}

function startAct1HeatingPress(event) {
  if (currentPhase !== PHASES.ACT1_HEATING || isAct1HeatingComplete) {
    return;
  }

  event.preventDefault();
  isAct1HeatingPressed = true;
  objectLayer.querySelectorAll(".act1-microwave-panel, .act1-temperature-gauge").forEach((element) => {
    element.classList.add("is-heating");
  });
}

function stopAct1HeatingPress() {
  if (currentPhase === PHASES.ACT1_HEATING && !isAct1HeatingComplete) {
    const activeZone = getAct1ActiveHeatZone();

    if (activeZone) {
      act1ClearedHeatZoneIds.add(activeZone.id);
    }
  }

  isAct1HeatingPressed = false;
  objectLayer?.querySelectorAll(".act1-microwave-panel, .act1-temperature-gauge").forEach((element) => {
    element.classList.remove("is-heating");
  });
  updateAct1HeatVisuals();
}

function startAct1HeatLoop() {
  act1HeatLastTimestamp = performance.now();
  act1HeatAnimationFrame = window.requestAnimationFrame(updateAct1HeatLoop);
  window.addEventListener("pointerup", stopAct1HeatingPress);
  window.addEventListener("pointercancel", stopAct1HeatingPress);
}

function stopAct1HeatLoop() {
  if (act1HeatAnimationFrame) {
    window.cancelAnimationFrame(act1HeatAnimationFrame);
    act1HeatAnimationFrame = 0;
  }

  window.removeEventListener("pointerup", stopAct1HeatingPress);
  window.removeEventListener("pointercancel", stopAct1HeatingPress);
}

function updateAct1HeatLoop(timestamp) {
  const config = getAct1HeatingConfig();
  const elapsedSeconds = Math.max(0, (timestamp - act1HeatLastTimestamp) / 1000);
  const previousValue = act1HeatValue;
  const delta = isAct1HeatingPressed
    ? config.heatUpPerSecond * elapsedSeconds
    : -config.coolDownPerSecond * elapsedSeconds;

  act1HeatLastTimestamp = timestamp;
  act1HeatValue = Math.max(
    config.minTemperature,
    Math.min(config.maxTemperature, act1HeatValue + delta)
  );

  if (isAct1HeatingPressed && hasAct1MissedHeatZone(previousValue, act1HeatValue, config)) {
    resetAct1HeatingProgress(config);
  }

  updateAct1HeatVisuals();

  if (act1HeatValue >= config.completionTemperature) {
    completeAct1Heating();
    return;
  }

  act1HeatAnimationFrame = window.requestAnimationFrame(updateAct1HeatLoop);
}

function getAct1HeatPercent(value = act1HeatValue) {
  const config = getAct1HeatingConfig();
  const range = Math.max(1, config.maxTemperature - config.minTemperature);

  return Math.max(0, Math.min(100, ((value - config.minTemperature) / range) * 100));
}

function getAct1ActiveHeatZone() {
  const percent = getAct1HeatPercent();
  const config = getAct1HeatingConfig();

  return config.cautionZones.find((zone) => (
    !act1ClearedHeatZoneIds.has(zone.id) &&
    percent >= zone.start &&
    percent <= zone.end
  )) || null;
}

function hasAct1MissedHeatZone(previousValue, nextValue, config) {
  const previousPercent = getAct1HeatPercent(previousValue);
  const nextPercent = getAct1HeatPercent(nextValue);

  return config.cautionZones.some((zone) => (
    !act1ClearedHeatZoneIds.has(zone.id) &&
    previousPercent <= zone.end &&
    nextPercent > zone.end
  ));
}

function resetAct1HeatingProgress(config = getAct1HeatingConfig()) {
  act1HeatValue = config.resetTemperature;
  act1ClearedHeatZoneIds = new Set();
  isAct1HeatingPressed = false;
  objectLayer?.querySelectorAll(".act1-microwave-panel, .act1-temperature-gauge").forEach((element) => {
    element.classList.remove("is-heating");
    element.classList.add("is-resetting");
    window.setTimeout(() => {
      element.classList.remove("is-resetting");
    }, 420);
  });
}

function updateAct1HeatVisuals() {
  const config = getAct1HeatingConfig();
  const range = Math.max(1, config.maxTemperature - config.minTemperature);
  const progress = Math.max(0, Math.min(1, (act1HeatValue - config.minTemperature) / range));
  const percent = Math.round(progress * 100);
  const activeZone = getAct1ActiveHeatZone();

  objectLayer?.querySelectorAll(".act1-temperature-gauge").forEach((element) => {
    element.style.setProperty("--act1-heat-progress", `${percent}%`);
    element.style.setProperty("--act1-heat-ratio", progress.toFixed(3));
    element.style.setProperty("--act1-gauge-fill", `${(progress * 75).toFixed(2)}%`);
    element.style.setProperty("--act1-heat-deg", `${-135 + progress * 270}deg`);
    element.dataset.temperature = String(percent);
    element.classList.toggle("is-in-caution", Boolean(activeZone));
    element.classList.toggle("is-zone-1-cleared", act1ClearedHeatZoneIds.has("act1_heat_zone_1"));
    element.classList.toggle("is-zone-2-cleared", act1ClearedHeatZoneIds.has("act1_heat_zone_2"));
    const guide = element.querySelector(".act1-gauge-guide");

    if (guide) {
      guide.textContent = activeZone
        ? "\u677e\u624b\uff01\u8ba9\u6a59\u8272\u533a\u95f4\u6d88\u5931\uff0c\u518d\u7ee7\u7eed\u52a0\u70ed\u3002"
        : act1ClearedHeatZoneIds.size >= config.cautionZones.length
          ? "\u6a59\u8272\u533a\u95f4\u5df2\u5904\u7406\u5b8c\uff0c\u6309\u4f4f\u52a0\u70ed\u5230\u6ee1\u683c\uff01"
          : config.guideText;
    }

    element.querySelector(".act1-gauge-readout").textContent = `${percent}%`;
  });
  objectLayer?.querySelectorAll(".act1-microwave-panel").forEach((element) => {
    element.style.setProperty("--act1-heat-progress", `${percent}%`);
    element.style.setProperty("--act1-heat-ratio", progress.toFixed(3));
  });
}

function completeAct1Heating() {
  if (isAct1HeatingComplete) {
    return;
  }

  const config = getAct1HeatingConfig();

  isAct1HeatingComplete = true;
  isAct1HeatingPressed = false;
  act1HeatValue = config.maxTemperature;
  stopAct1HeatLoop();
  updateAct1HeatVisuals();
  objectLayer.querySelectorAll(".act1-microwave-panel, .act1-temperature-gauge").forEach((element) => {
    element.classList.add("is-complete");
    element.classList.remove("is-heating");
  });
  recordAct1HeatingResult();
  window.setTimeout(() => {
    enterAct1EatingSpeed();
  }, 700);
}

function recordAct1HeatingResult() {
  const config = getAct1HeatingConfig();
  const record = {
    sceneId: "act1",
    stepId: "act1_heatingResult",
    interactionType: "hold_to_heat",
    breakfastId: selectedAct1BreakfastId,
    completed: true,
    temperature: Math.round(act1HeatValue),
    completionTemperature: config.completionTemperature,
    riskTags: [],
    tendencyScores: {}
  };

  playerChoices.push(record);
  console.log("Act 1 heating result:", record);
  console.log("Act 1 playerChoices:", playerChoices);
}

function enterAct1EatingSpeed() {
  const state = getAct1StateConfig(ACT1_STATES.EATING_SPEED);
  const config = getAct1EatingConfig();
  const carriedFood = objectLayer.querySelector(".act1-carried-heat-food");

  currentPhase = PHASES.ACT1_EATING;
  currentState = ACT1_STATES.EATING_SPEED;
  isStateLocked = false;
  act1EatingClickCount = 0;
  act1EatingStartedAt = 0;
  act1EatingRequiredClicks = config.requiredClicks;
  isAct1EatingComplete = false;
  hideHoverInfoTooltip();
  updateStageHeader("\u7b2c\u4e00\u5e55\u4f4e\u4fdd\u771f\u539f\u578b", "\u65e9\u6668\u2014\u2014\u5403\u65e9\u996d");
  objectLayer.querySelectorAll(".act1-scene-object").forEach((element) => {
    if (element === carriedFood) {
      return;
    }

    element.remove();
  });

  Object.entries(state.objects || {}).forEach(([objectId, objectConfig]) => {
    const element = createAct1ObjectElement(objectId, objectConfig);

    updateAct1ObjectLayout(element, objectConfig);
    objectLayer.appendChild(element);
  });

  if (carriedFood) {
    prepareAct1CarriedFoodForEating(carriedFood, config);
  }

  updateAct1EatingVisuals();
  console.log("Entered act1_03_eating_speed", { selectedAct1BreakfastId });
}

function getAct1EatingConfig() {
  const config = getAct1StateConfig(ACT1_STATES.EATING_SPEED).eating || {};

  return {
    requiredClicks: Math.max(1, config.requiredClicks ?? 6),
    fastMaxMs: config.fastMaxMs ?? 3500,
    mediumMaxMs: config.mediumMaxMs ?? 7000,
    nextStateDelay: config.nextStateDelay ?? 1200,
    targetCenterX: config.targetCenterX ?? 964,
    targetCenterY: config.targetCenterY ?? 654,
    targetScale: config.targetScale ?? 1.3,
    assetPattern: config.assetPattern || "assets/images/act1/eating/{slug}-{state}.png"
  };
}

function prepareAct1CarriedFoodForEating(foodElement, config = getAct1EatingConfig()) {
  const sourceConfig = getAct1StateConfig(ACT1_STATES.BREAKFAST_CHOICE)
    .objects?.[foodElement.dataset.objectId];
  const stage = act1Layouts?.stage || { width: DESIGN_WIDTH, height: DESIGN_HEIGHT };

  if (!sourceConfig) {
    return;
  }

  const visualWidth = sourceConfig.width * config.targetScale;
  const visualHeight = sourceConfig.height * config.targetScale;
  const targetLeft = config.targetCenterX - visualWidth / 2;
  const targetTop = config.targetCenterY - visualHeight / 2;

  foodElement.classList.add("act1-carried-eating-food");
  foodElement.classList.remove("act1-carried-heat-food");
  foodElement.style.left = `${(targetLeft / stage.width) * 100}%`;
  foodElement.style.top = `${(targetTop / stage.height) * 100}%`;
  foodElement.style.transform = `scale(${config.targetScale})`;
  foodElement.style.zIndex = "30";
  foodElement.disabled = false;
  foodElement.addEventListener("click", handleAct1EatingFoodClick);
  updateAct1CarriedFoodEatingAsset(foodElement, 0);
}

function handleAct1EatingFoodClick() {
  if (currentPhase !== PHASES.ACT1_EATING || isAct1EatingComplete) {
    return;
  }

  if (!act1EatingStartedAt) {
    act1EatingStartedAt = performance.now();
  }

  act1EatingClickCount = Math.min(act1EatingRequiredClicks, act1EatingClickCount + 1);
  updateAct1CarriedFoodEatingAsset(
    objectLayer.querySelector(".act1-carried-eating-food"),
    act1EatingClickCount
  );
  updateAct1EatingVisuals();

  if (act1EatingClickCount >= act1EatingRequiredClicks) {
    completeAct1Eating();
  }
}

function getAct1BreakfastAssetSlug(choiceId = selectedAct1BreakfastId) {
  const slugMap = {
    act1_s01_breakfast_overnightPizza: "overnight-pizza",
    act1_s01_breakfast_baguetteCheese: "baguette-cheese",
    act1_s01_breakfast_hotPorridge: "hot-porridge",
    act1_s01_breakfast_eggHamSandwich: "egg-ham-sandwich",
    act1_s01_breakfast_cornEggMilk: "corn-egg-milk"
  };

  return slugMap[choiceId] || "breakfast";
}

function updateAct1CarriedFoodEatingAsset(foodElement, stateIndex) {
  if (!foodElement) {
    return;
  }

  const config = getAct1EatingConfig();
  const slug = getAct1BreakfastAssetSlug();
  const existingImage = foodElement.querySelector(":scope > .act1-placeholder-image");

  foodElement.dataset.eatingAssetState = String(stateIndex);

  if (stateIndex <= 0) {
    return;
  }

  const imagePath = config.assetPattern
    .replace("{slug}", slug)
    .replace("{state}", String(stateIndex));
  const image = existingImage || document.createElement("img");

  image.className = "act1-placeholder-image";
  image.alt = "";
  image.draggable = false;
  image.src = imagePath;
  image.onload = () => {
    foodElement.classList.add("has-act1-image");
    foodElement.classList.remove("is-eating-asset-missing");
  };
  image.onerror = () => {
    foodElement.classList.remove("has-act1-image");
    foodElement.classList.add("is-eating-asset-missing");
    image.remove();
  };

  if (!existingImage) {
    foodElement.prepend(image);
  }
}

function updateAct1EatingVisuals() {
  const progress = Math.max(0, Math.min(1, act1EatingClickCount / act1EatingRequiredClicks));
  const remaining = Math.max(0, 1 - progress);
  const carriedFood = objectLayer?.querySelector(".act1-carried-eating-food");

  objectLayer?.querySelectorAll(".act1-eating-food").forEach((element) => {
    element.style.setProperty("--act1-food-remaining", remaining.toFixed(3));
    element.style.setProperty("--act1-bite-size", `${Math.round(progress * 90)}px`);
    element.dataset.eatenClicks = String(act1EatingClickCount);
    element.dataset.requiredClicks = String(act1EatingRequiredClicks);
    const label = element.querySelector(".act1-eating-food-label");

    if (label) {
      label.textContent = progress >= 1
        ? "\u53ea\u5269\u76d8\u5b50"
      : `${act1EatingClickCount}/${act1EatingRequiredClicks}`;
    }
  });

  if (carriedFood) {
    carriedFood.style.setProperty("--act1-food-remaining", remaining.toFixed(3));
    carriedFood.style.setProperty("--act1-bite-size", `${Math.round(progress * 90)}px`);
    carriedFood.dataset.eatenClicks = String(act1EatingClickCount);
    carriedFood.dataset.requiredClicks = String(act1EatingRequiredClicks);
    const label = carriedFood.querySelector(".act1-breakfast-label");

    if (label) {
      label.textContent = progress >= 1
        ? "\u53ea\u5269\u76d8\u5b50"
        : `${act1EatingClickCount}/${act1EatingRequiredClicks}`;
    }
  }
}

function completeAct1Eating() {
  if (isAct1EatingComplete) {
    return;
  }

  isAct1EatingComplete = true;
  const elapsedMs = Math.max(0, Math.round(performance.now() - act1EatingStartedAt));
  const config = getAct1EatingConfig();
  const eatingSpeed = getAct1EatingSpeed(elapsedMs, config);

  objectLayer.querySelectorAll(".act1-eating-food").forEach((element) => {
    element.classList.add("is-complete");
  });
  objectLayer.querySelector(".act1-carried-eating-food")?.classList.add("is-complete");
  recordAct1EatingSpeed(elapsedMs, eatingSpeed);

  window.setTimeout(() => {
    objectLayer.querySelectorAll(".act1-scene-object").forEach((element) => element.remove());
    enterAct2LunchIntro();
  }, config.nextStateDelay);
}

function getAct1EatingSpeed(elapsedMs, config) {
  if (elapsedMs <= config.fastMaxMs) {
    return "fast";
  }

  if (elapsedMs <= config.mediumMaxMs) {
    return "medium";
  }

  return "slow";
}

function recordAct1EatingSpeed(elapsedMs, eatingSpeed) {
  const speedRiskKey = ACT1_EATING_SPEED_RISK_OPTION_KEYS[eatingSpeed];
  const record = {
    sceneId: "act1",
    stepId: "act1_eatingSpeed",
    interactionType: "click_to_eat",
    breakfastId: selectedAct1BreakfastId,
    clickCount: act1EatingClickCount,
    requiredClicks: act1EatingRequiredClicks,
    elapsedMs,
    eatingSpeed,
    riskTags: getOptionRiskTags(speedRiskKey),
    tendencyScores: {}
  };

  playerChoices.push(record);
  console.log("Act 1 eating speed:", record);
  console.log("Act 1 playerChoices:", playerChoices);
}

// ---------------------------------------------------------------------------
// Act2 Lunch Module
// Reserved for future Act2 lunch flow.
// Add Act2 functions below this marker when implementing lunch behavior.
// Do not insert Act2 logic into Act1 Breakfast Module, Act3 drag/drop handlers,
// or Result animation helpers.
// ---------------------------------------------------------------------------

let act2LunchPlateItems = [];
let act2LunchDrag = null;
let selectedAct2LunchPlaceId = null;
let act2WorkBubbleRound = 0;
let act2WorkBubbleActiveCount = 0;
let act2WorkBubbleClearedCount = 0;
let act2WorkBubbleTimers = [];
let act2FriendBubbleTotal = 0;
let act2FriendBubbleCompleted = 0;
let act2FriendBubbleTimers = [];
let act2DogState = 1;
let act2DogTimer = null;
let act2BirdCleared = false;
let act2ParkTimers = [];
let act2EatingCurrentSlotIndex = 0;
let act2EatingClickCount = 0;
const act2EatingClicksPerSlot = 3;
let act2EatingCompletedSlots = new Set();
let act2ChopsticksState = "open";
let act2SoloMealTimers = [];
let act2IntroTypewriterTimer = null;
let act2IntroTypewriterDone = false;
let act2IntroWheelLocked = false;
let act2LunchChoiceWheelLocked = false;
let isAct2WheelLocked = false;
let act2CannotGoBackHintTimer = null;
let selectedAct2PrepFoods = [];
let act2CatchRemainingFoods = [];
let act2CatchActiveDrops = [];
let act2CaughtFoods = [];
let act2CatchSpawnTimer = null;
let act2CatchAnimationFrame = null;
let act2CatchPlateX = 0;
const ACT2_LUNCH_PLACE_SELECT_STATE = "act2_04_lunch_place_select";
const ACT2_LUNCH_PLACE_FOCUS_STATE = "act2_05_lunch_place_focus";
const ACT2_WORK_BUBBLE_PLACE_ID = "act2_place_coworkers";
const ACT2_FRIEND_MEAL_PLACE_ID = "act2_place_canteen_table";
const ACT2_PARK_SCENE_PLACE_ID = "act2_place_park_bench";
const ACT2_SOLO_MEAL_PLACE_ID = "act2_place_office_desk";

function enterAct2LunchIntro() {
  enterAct2LunchIntroBubble();
}

function enterAct2LunchIntroBubble() {
  renderAct2State(ACT2_STATES.LUNCH_INTRO_BUBBLE);
  startAct2Typewriter("又到了午餐时间");
  bindAct2WheelNavigation();
}

function enterAct2LunchWindowIntro() {
  renderAct2State(ACT2_STATES.LUNCH_WINDOW_INTRO);
  startAct2Typewriter("今天吃点什么呢？");
  bindAct2WheelNavigation();
}

function enterAct2LunchChoice() {
  cleanupAct2IntroWheel();
  stopAct2Typewriter();
  cleanupAct2LunchChoiceWheel();
  cleanupAct2CatchGame();
  act2LunchPlateItems = [];
  selectedAct2PrepFoods = [];
  selectedAct2LunchPlaceId = null;
  isAct2LunchLocked = false;
  renderAct2State(ACT2_STATES.LUNCH_PREP_SELECT);
  playAct2ChoiceIntroAnimation();
  bindAct2WheelNavigation();
}

function enterAct2LunchCatchGame() {
  cleanupAct2LunchChoiceWheel();
  hideAct2LunchSceneHint();
  renderAct2State(ACT2_STATES.LUNCH_CATCH_GAME);
}

function enterAct2LunchPlaceSelect() {
  renderAct2State(ACT2_LUNCH_PLACE_SELECT_STATE);
  animateAct2PlacePanelsEnter();
}

function enterAct2LunchPlaceFocus() {
  renderAct2State(ACT2_LUNCH_PLACE_FOCUS_STATE);
}

function enterAct2LunchDone() {
  renderAct2State(ACT2_STATES.LUNCH_DONE);
  window.setTimeout(() => {
    objectLayer.querySelectorAll(".act2-scene-object").forEach((element) => element.remove());
    startAct3Intro();
  }, getAct2StateConfig(ACT2_STATES.LUNCH_DONE).nextStateDelay || 1200);
}

function renderAct2State(stateId) {
  const state = getAct2StateConfig(stateId);

  cleanupAct2CannotGoBackHint();
  cleanupAct2WorkBubbles();
  cleanupAct2FriendMealInteraction();
  cleanupAct2ParkScene();
  cleanupAct2SoloMealInteraction();
  cleanupAct2CatchGame();
  cleanupAct2IntroWheel();
  cleanupAct2LunchChoiceWheel();
  stopAct2Typewriter();
  currentPhase = PHASES.ACT2_LUNCH;
  currentState = stateId;
  isStateLocked = false;
  act2LunchDrag = null;
  hideHoverInfoTooltip();
  updateStageHeader("\u7b2c\u4e8c\u5e55\u4f4e\u4fdd\u771f\u539f\u578b", "\u4e2d\u5348\u2014\u2014\u5348\u9910\u9009\u62e9");
  objectLayer.querySelectorAll(".act2-scene-object").forEach((element) => element.remove());

  Object.entries(state.objects || {}).forEach(([objectId, objectConfig]) => {
    const element = createAct2ObjectElement(objectId, objectConfig);

    updateAct2ObjectLayout(element, objectConfig);
    objectLayer.appendChild(element);
  });

  syncAct2PlateSlots();
  syncAct2FinishButton();
  if (stateId === ACT2_LUNCH_PLACE_FOCUS_STATE && isAct2WorkBubblePlaceSelected()) {
    startAct2WorkBubbleInterruption();
  }
  if (stateId === ACT2_LUNCH_PLACE_FOCUS_STATE && isAct2FriendMealPlaceSelected()) {
    startAct2FriendMealInteraction();
  }
  if (stateId === ACT2_LUNCH_PLACE_FOCUS_STATE && isAct2ParkScenePlaceSelected()) {
    createAct2ParkScene();
  }
  if (stateId === ACT2_LUNCH_PLACE_FOCUS_STATE && isAct2SoloMealPlaceSelected()) {
    startAct2SoloMealInteraction();
  }
  if (stateId === ACT2_STATES.LUNCH_CATCH_GAME) {
    startAct2CatchGame();
  }
  console.log(`Entered ${stateId}`, { playerChoices });
}

function bindAct2IntroWheel() {
  bindAct2WheelNavigation();
}

function cleanupAct2IntroWheel() {
  window.removeEventListener("wheel", handleAct2IntroWheel);
  window.removeEventListener("wheel", handleAct2WheelNavigation);
  act2IntroWheelLocked = false;
  isAct2WheelLocked = false;
}

function handleAct2IntroWheel(event) {
  handleAct2WheelNavigation(event);
}

function bindAct2WheelNavigation() {
  window.removeEventListener("wheel", handleAct2WheelNavigation);
  window.addEventListener("wheel", handleAct2WheelNavigation, { passive: false });
}

function handleAct2WheelNavigation(event) {
  if (
    currentPhase !== PHASES.ACT2_LUNCH ||
    !isAct2WheelNavigationState(currentState) ||
    event.deltaY === 0 ||
    isAct2WheelLocked ||
    ((currentState === ACT2_STATES.LUNCH_INTRO_BUBBLE || currentState === ACT2_STATES.LUNCH_WINDOW_INTRO) && !act2IntroTypewriterDone)
  ) {
    return;
  }

  event.preventDefault();
  isAct2WheelLocked = true;
  act2IntroWheelLocked = true;
  window.setTimeout(() => {
    isAct2WheelLocked = false;
    act2IntroWheelLocked = false;
  }, 780);

  if (event.deltaY > 0) {
    goToNextAct2Step();
    return;
  }

  goToPreviousAct2Step();
}

function isAct2WheelNavigationState(stateId) {
  return stateId === ACT2_STATES.LUNCH_INTRO_BUBBLE ||
    stateId === ACT2_STATES.LUNCH_WINDOW_INTRO ||
    stateId === ACT2_STATES.LUNCH_PREP_SELECT;
}

function goToNextAct2Step() {
  if (currentState === ACT2_STATES.LUNCH_INTRO_BUBBLE) {
    enterAct2LunchWindowIntro();
    return;
  }

  if (currentState === ACT2_STATES.LUNCH_WINDOW_INTRO) {
    transitionAct2IntroToChoice();
  }
}

function goToPreviousAct2Step() {
  if (!canAct2GoPrevious()) {
    return;
  }

  if (currentState === ACT2_STATES.LUNCH_WINDOW_INTRO) {
    resetAct2IntroStepView(ACT2_STATES.LUNCH_INTRO_BUBBLE);
    return;
  }

  if (currentState === ACT2_STATES.LUNCH_PREP_SELECT) {
    stopAct2ConveyorForIntroReturn();
    resetAct2IntroStepView(ACT2_STATES.LUNCH_WINDOW_INTRO);
  }
}

function canAct2GoPrevious() {
  if (currentState === ACT2_STATES.LUNCH_INTRO_BUBBLE) {
    return false;
  }

  if (currentState === ACT2_STATES.LUNCH_PREP_SELECT && selectedAct2PrepFoods.length > 0) {
    showAct2CannotGoBackHint();
    return false;
  }

  return currentState === ACT2_STATES.LUNCH_WINDOW_INTRO || currentState === ACT2_STATES.LUNCH_PREP_SELECT;
}

function resetAct2IntroStepView(targetState) {
  objectLayer?.querySelectorAll(".act2-intro-bubble, .act2-static-image-preview, .act2-conveyor-window, .act2-prep-area").forEach((element) => {
    element.classList.add("is-exiting");
  });

  window.setTimeout(() => {
    if (targetState === ACT2_STATES.LUNCH_INTRO_BUBBLE) {
      enterAct2LunchIntroBubble();
      return;
    }

    if (targetState === ACT2_STATES.LUNCH_WINDOW_INTRO) {
      enterAct2LunchWindowIntro();
    }
  }, 260);
}

function stopAct2ConveyorForIntroReturn() {
  objectLayer?.querySelectorAll(".act2-conveyor-track").forEach((track) => {
    track.style.animationPlayState = "paused";
  });
}

function showAct2CannotGoBackHint() {
  cleanupAct2CannotGoBackHint();
  const hint = document.createElement("div");

  hint.className = "act2-scene-object act2-cannot-go-back-hint";
  hint.textContent = "已开始选菜，不能返回上一幕。";
  updateAct2ObjectLayout(hint, {
    x: 177,
    y: 126,
    width: 460,
    height: 86,
    opacity: 1,
    scale: 1,
    zIndex: 20
  });
  objectLayer.appendChild(hint);
  act2CannotGoBackHintTimer = window.setTimeout(() => {
    hint.classList.add("is-exiting");
    act2CannotGoBackHintTimer = window.setTimeout(() => {
      hint.remove();
      act2CannotGoBackHintTimer = null;
    }, 260);
  }, 1100);
}

function cleanupAct2CannotGoBackHint() {
  if (act2CannotGoBackHintTimer) {
    window.clearTimeout(act2CannotGoBackHintTimer);
    act2CannotGoBackHintTimer = null;
  }

  objectLayer?.querySelectorAll(".act2-cannot-go-back-hint").forEach((hint) => hint.remove());
}

function startAct2Typewriter(text) {
  stopAct2Typewriter();
  const target = objectLayer?.querySelector(".act2-intro-bubble-text");

  act2IntroTypewriterDone = false;
  if (!target) {
    act2IntroTypewriterDone = true;
    return;
  }

  target.textContent = "";
  let index = 0;
  act2IntroTypewriterTimer = window.setInterval(() => {
    target.textContent = text.slice(0, index + 1);
    index += 1;
    if (index >= text.length) {
      stopAct2Typewriter({ keepDone: true });
    }
  }, 76);
}

function stopAct2Typewriter(options = {}) {
  if (act2IntroTypewriterTimer) {
    window.clearInterval(act2IntroTypewriterTimer);
    act2IntroTypewriterTimer = null;
  }

  act2IntroTypewriterDone = Boolean(options.keepDone);
}

function transitionAct2IntroToChoice() {
  const bubble = objectLayer?.querySelector(".act2-intro-bubble");
  const staticPreview = objectLayer?.querySelector(".act2-static-image-preview");

  cleanupAct2IntroWheel();
  stopAct2Typewriter();
  if (bubble) {
    bubble.classList.add("is-exiting");
  }
  if (staticPreview) {
    staticPreview.classList.add("is-exiting");
  }

  window.setTimeout(() => {
    enterAct2LunchChoice();
  }, 320);
}

function playAct2ChoiceIntroAnimation() {
  const topWindow = objectLayer?.querySelector("#act2_s02_window_top");
  const bottomWindow = objectLayer?.querySelector("#act2_s02_window_bottom");
  const prepArea = objectLayer?.querySelector("#act2_s03_prep_area");

  topWindow?.classList.add("act2-enter-from-left");
  bottomWindow?.classList.add("act2-enter-from-right");
  prepArea?.classList.add("act2-enter-from-left");
}

function getAct2StateConfig(stateId) {
  const state = act2Layouts?.states?.[stateId];

  if (!state) {
    throw new Error(`Missing Act2 state layout: ${stateId}`);
  }

  return state;
}

function createAct2ObjectElement(objectId, objectConfig) {
  const isButton = objectConfig.type === "act2FinishButton" || objectConfig.type === "act2LunchEndButton";
  const element = document.createElement(isButton ? "button" : "div");

  element.id = objectId;
  element.dataset.objectId = objectId;
  element.dataset.objectType = objectConfig.type;
  element.className = getAct2ObjectClassName(objectConfig.type);

  if (objectConfig.type === "act2ConveyorWindow") {
    renderAct2ConveyorWindow(element, objectConfig);
  } else if (objectConfig.type === "act2StaticImagePreview") {
    renderAct2StaticImagePreview(element, objectConfig);
  } else if (objectConfig.type === "act2IntroBubble") {
    renderAct2IntroBubble(element, objectConfig);
  } else if (objectConfig.type === "act2PrepArea") {
    renderAct2PrepArea(element, objectConfig);
  } else if (objectConfig.type === "act2PlateSlot") {
    renderAct2PlateSlot(element, objectConfig);
  } else if (objectConfig.type === "act2ComicGrid") {
    renderAct2ComicPanelSelector(element, objectConfig);
  } else if (objectConfig.type === "act2ComicFocus") {
    renderAct2ComicFocus(element);
  } else if (objectConfig.type === "act2FinishButton") {
    element.type = "button";
    element.textContent = objectConfig.content || "完成午餐选择";
    element.addEventListener("click", finishAct2LunchChoice);
  } else if (objectConfig.type === "act2LunchEndButton") {
    element.type = "button";
    element.textContent = objectConfig.content || "午餐结束";
    if (
      isAct2WorkBubblePlaceSelected() ||
      isAct2FriendMealPlaceSelected() ||
      isAct2ParkScenePlaceSelected() ||
      isAct2SoloMealPlaceSelected()
    ) {
      element.hidden = true;
      element.disabled = true;
      element.classList.add("is-hidden");
    }
    element.addEventListener("click", finishAct2LunchScene);
  } else {
    element.textContent = objectConfig.content || "";
  }

  return element;
}

function getAct2ObjectClassName(type) {
  if (type === "act2ConveyorWindow") {
    return "act2-scene-object act2-conveyor-window";
  }

  if (type === "act2StaticImagePreview") {
    return "act2-scene-object act2-static-image-preview";
  }

  if (type === "act2IntroBubble") {
    return "act2-scene-object act2-intro-bubble";
  }

  if (type === "act2PrepArea") {
    return "act2-scene-object act2-prep-area";
  }

  if (type === "act2Plate") {
    return "act2-scene-object act2-plate";
  }

  if (type === "act2PlateSlot") {
    return "act2-scene-object act2-plate-slot";
  }

  if (type === "act2Hands") {
    return "act2-scene-object act2-hands";
  }

  if (type === "act2FinishButton") {
    return "act2-scene-object act2-finish-button";
  }

  if (type === "act2ComicGrid") {
    return "act2-scene-object act2-comic-grid";
  }

  if (type === "act2ComicFocus") {
    return "act2-scene-object act2-comic-focus";
  }

  if (type === "act2LunchEndButton") {
    return "act2-scene-object act2-lunch-end-button";
  }

  if (type === "act2IntroPanel") {
    return "act2-scene-object act2-intro-panel act3-panel";
  }

  if (type === "act2DonePanel") {
    return "act2-scene-object act2-done-panel act3-panel";
  }

  return "act2-scene-object act3-panel";
}

function updateAct2ObjectLayout(element, objectConfig) {
  const stage = act2Layouts?.stage || { width: DESIGN_WIDTH, height: DESIGN_HEIGHT };

  element.style.left = `${(objectConfig.x / stage.width) * 100}%`;
  element.style.top = `${(objectConfig.y / stage.height) * 100}%`;
  element.style.width = `${(objectConfig.width / stage.width) * 100}%`;
  element.style.height = `${(objectConfig.height / stage.height) * 100}%`;
  element.style.opacity = objectConfig.opacity ?? 1;
  element.style.zIndex = objectConfig.zIndex ?? 1;
  element.style.transformOrigin = objectConfig.transformOrigin || "center center";
  element.style.transform = `scale(${objectConfig.scale ?? 1})`;
}

function getAct2LunchChoice(choiceId) {
  const choice = act2Choices?.choices?.find((item) => item.id === choiceId);

  if (!choice) {
    return null;
  }

  return {
    ...choice,
    hoverText: choice.hoverText || choice.description || ""
  };
}

function getAct2LunchStepConfig() {
  return act2Choices?.steps?.[0] || {
    stepId: "act2_lunchPlateChoice",
    interactionType: "drag_lunch_foods_to_plate",
    choiceLimit: 4
  };
}

function getAct2LunchPlaceStepConfig() {
  return act2Choices?.steps?.[1] || {
    stepId: "act2_lunchPlaceChoice",
    interactionType: "click_lunch_place",
    choiceLimit: 1
  };
}

function getAct2LunchPlaceChoice(placeId) {
  return act2Choices?.lunchPlaces?.find((place) => place.id === placeId) || null;
}

function isAct2WorkBubblePlaceSelected() {
  return selectedAct2LunchPlaceId === ACT2_WORK_BUBBLE_PLACE_ID;
}

function isAct2FriendMealPlaceSelected() {
  return selectedAct2LunchPlaceId === ACT2_FRIEND_MEAL_PLACE_ID;
}

function isAct2ParkScenePlaceSelected() {
  return selectedAct2LunchPlaceId === ACT2_PARK_SCENE_PLACE_ID;
}

function isAct2SoloMealPlaceSelected() {
  return selectedAct2LunchPlaceId === ACT2_SOLO_MEAL_PLACE_ID;
}

function renderAct2IntroBubble(element, objectConfig) {
  const text = document.createElement("span");

  text.className = "act2-intro-bubble-text";
  text.textContent = objectConfig.content || "";
  element.appendChild(text);
}

function renderAct2StaticImagePreview(element, objectConfig) {
  const label = document.createElement("span");

  label.className = "act2-static-image-preview-label";
  label.textContent = objectConfig.content || "静态预览图";
  element.appendChild(label);
}

function renderAct2PrepArea(element, objectConfig) {
  const title = document.createElement("div");
  const list = document.createElement("div");

  title.className = "act2-prep-area-title";
  title.textContent = objectConfig.content || "备菜区";
  list.className = "act2-prep-area-list";
  element.appendChild(title);
  element.appendChild(list);
  renderAct2PrepAreaList(list);
}

function syncAct2PrepArea() {
  const list = objectLayer?.querySelector(".act2-prep-area-list");

  if (!list) {
    return;
  }

  renderAct2PrepAreaList(list);
}

function renderAct2PrepAreaList(list) {
  list.innerHTML = "";
  for (let index = 0; index < getAct2LunchChoiceLimit(); index += 1) {
    const food = selectedAct2PrepFoods[index];
    const item = document.createElement("div");

    item.className = "act2-prep-food";
    item.textContent = food ? food.label || food.foodName : `空位 ${index + 1}`;
    item.classList.toggle("is-empty", !food);
    list.appendChild(item);
  }
}

function renderAct2ConveyorWindow(element, objectConfig) {
  const lane = act2Layouts?.conveyors?.[objectConfig.laneId] || {};
  const label = document.createElement("div");
  const track = document.createElement("div");
  const repeatedChoiceIds = [...(lane.choiceIds || []), ...(lane.choiceIds || [])];

  label.className = "act2-conveyor-label";
  label.textContent = objectConfig.content || "食堂窗口";
  track.className = "act2-conveyor-track";
  track.style.setProperty("--act2-conveyor-duration", `${lane.duration || 38000}ms`);

  repeatedChoiceIds.forEach((choiceId) => {
    const choice = getAct2LunchChoice(choiceId);

    if (!choice) {
      return;
    }

    const food = createAct2LunchFoodCard(choice);
    track.appendChild(food);
  });

  element.appendChild(label);
  element.appendChild(track);
}

function createAct2LunchFoodCard(choice) {
  const food = document.createElement("button");
  const plateLayer = document.createElement("span");
  const foodLayer = document.createElement("span");
  const name = document.createElement("span");
  const category = document.createElement("span");

  food.type = "button";
  food.className = "act2-lunch-food act2-conveyor-food-card";
  food.dataset.choiceId = choice.id;
  food.dataset.type = "act2LunchFood";
  plateLayer.className = "act2-food-plate";
  foodLayer.className = "act2-food-item";
  foodLayer.dataset.choiceId = choice.id;
  foodLayer.dataset.type = "act2LunchFoodItem";
  name.className = "act2-lunch-food-name";
  name.textContent = choice.label || choice.name;
  category.className = "act2-lunch-food-category";
  category.textContent = choice.category || "";
  foodLayer.appendChild(name);
  foodLayer.appendChild(category);
  food.appendChild(plateLayer);
  food.appendChild(foodLayer);
  bindAct2LunchDragSource(foodLayer, choice.id, food);
  bindHoverInfo(foodLayer, choice.id);
  return food;
}

function renderAct2PlateSlot(element, objectConfig) {
  element.dataset.slotIndex = String(objectConfig.slotIndex);
  element.textContent = objectConfig.content || `格子 ${Number(objectConfig.slotIndex) + 1}`;
}

function syncAct2PlateSlots() {
  objectLayer?.querySelectorAll(".act2-plate-slot").forEach((slotElement) => {
    const slotIndex = Number(slotElement.dataset.slotIndex);
    const selectedFood = act2LunchPlateItems.find((food) => food.slotIndex === slotIndex);

    if (!selectedFood) {
      slotElement.classList.remove("is-filled", "is-eaten");
      slotElement.textContent = `格子 ${slotIndex + 1}`;
      return;
    }

    slotElement.classList.add("is-filled");
    if (act2EatingCompletedSlots.has(slotIndex)) {
      slotElement.classList.add("is-eaten");
      slotElement.innerHTML = `
        <span class="act2-slot-food-name">已吃完</span>
        <span class="act2-slot-food-category">${selectedFood.label || selectedFood.foodName}</span>
      `;
      return;
    }

    slotElement.classList.remove("is-eaten");
    slotElement.innerHTML = `
      <span class="act2-slot-food-name">${selectedFood.label || selectedFood.foodName}</span>
      <span class="act2-slot-food-category">${selectedFood.category || "无"}</span>
    `;
  });
}

function renderAct2ComicPanelSelector(element, objectConfig) {
  (objectConfig.panels || []).forEach((panelConfig) => {
    const place = getAct2LunchPlaceChoice(panelConfig.placeId);

    if (!place) {
      return;
    }

    const panel = document.createElement("button");
    const shot = document.createElement("span");

    panel.type = "button";
    panel.setAttribute("aria-label", place.label || place.name);
    panel.className = "act2-comic-panel";
    panel.dataset.placeId = place.id;
    panel.dataset.column = String(panelConfig.column || 1);
    panel.style.gridColumn = String(panelConfig.column || 1);
    panel.style.gridRow = String(panelConfig.row || 1);
    shot.className = "act2-comic-panel-shot";
    shot.dataset.shot = panelConfig.shot || "";
    panel.appendChild(shot);
    panel.addEventListener("click", () => expandAct2ComicPanel(place.id));
    element.appendChild(panel);
  });
}

function renderAct2ComicFocus(element) {
  const place = getAct2LunchPlaceChoice(selectedAct2LunchPlaceId);

  if (!place) {
    element.textContent = "请选择一个漫画分镜。";
    return;
  }

  element.dataset.placeId = place.id;
  element.innerHTML = `
    <div class="act2-comic-focus-frame" data-place-id="${place.id}"></div>
  `;
}

function expandAct2ComicPanel(placeId) {
  if (currentPhase !== PHASES.ACT2_LUNCH || currentState !== ACT2_LUNCH_PLACE_SELECT_STATE) {
    return;
  }

  const place = getAct2LunchPlaceChoice(placeId);

  if (!place) {
    return;
  }

  selectedAct2LunchPlaceId = place.id;
  if (
    !isAct2WorkBubblePlaceSelected() &&
    !isAct2FriendMealPlaceSelected() &&
    !isAct2ParkScenePlaceSelected() &&
    !isAct2SoloMealPlaceSelected()
  ) {
    recordAct2LunchPlaceChoice(place);
  }
  enterAct2LunchPlaceFocus();
}

function bindAct2LunchDragSource(element, choiceId, sourceCard = element) {
  element.addEventListener("pointerdown", (event) => {
    startAct2LunchDrag(event, element, choiceId, sourceCard);
  });
}

function startAct2LunchDrag(event, sourceElement, choiceId, sourceCard = sourceElement) {
  if (
    isAct2LunchLocked ||
    currentState !== ACT2_STATES.LUNCH_PREP_SELECT ||
    selectedAct2PrepFoods.length >= getAct2LunchChoiceLimit() ||
    isAct2FoodAlreadyPicked(choiceId) ||
    sourceCard.classList.contains("is-picked") ||
    sourceCard.classList.contains("is-empty")
  ) {
    return;
  }

  const choice = getAct2LunchChoice(choiceId);

  if (!choice) {
    return;
  }

  event.preventDefault();
  hideHoverInfoTooltip();
  const ghost = sourceElement.cloneNode(true);
  const rect = sourceElement.getBoundingClientRect();

  ghost.classList.add("act2-lunch-drag-ghost");
  ghost.style.width = `${rect.width}px`;
  ghost.style.height = `${rect.height}px`;
  document.body.appendChild(ghost);

  act2LunchDrag = {
    choice,
    ghost,
    sourceCard,
    sourceElement,
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top
  };

  sourceCard.classList.add("is-dragging");
  sourceElement.classList.add("is-dragging");
  moveAct2LunchDrag(event);
  window.addEventListener("pointermove", moveAct2LunchDrag);
  window.addEventListener("pointerup", finishAct2LunchDrag, { once: true });
}

function moveAct2LunchDrag(event) {
  if (!act2LunchDrag) {
    return;
  }

  act2LunchDrag.ghost.style.left = `${event.clientX - act2LunchDrag.offsetX}px`;
  act2LunchDrag.ghost.style.top = `${event.clientY - act2LunchDrag.offsetY}px`;
}

function finishAct2LunchDrag(event) {
  if (!act2LunchDrag) {
    return;
  }

  window.removeEventListener("pointermove", moveAct2LunchDrag);
  objectLayer.querySelectorAll(".act2-lunch-food.is-dragging, .act2-food-item.is-dragging").forEach((element) => {
    element.classList.remove("is-dragging");
  });
  const targetPrepArea = getAct2PrepAreaAtPoint(event.clientX, event.clientY);
  let didDrop = false;

  if (targetPrepArea) {
    didDrop = handleAct2PrepDrop(targetPrepArea, act2LunchDrag.choice);
  }

  if (didDrop) {
    markAct2FoodAsPicked(act2LunchDrag.choice.id);
  }

  act2LunchDrag.ghost.remove();
  act2LunchDrag = null;
}

function getAct2PrepAreaAtPoint(x, y) {
  const prepArea = objectLayer?.querySelector(".act2-prep-area");

  if (!prepArea) {
    return null;
  }

  const rect = prepArea.getBoundingClientRect();
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom ? prepArea : null;
}

function handleAct2PrepDrop(prepArea, choice) {
  if (
    !prepArea ||
    isAct2LunchLocked ||
    currentState !== ACT2_STATES.LUNCH_PREP_SELECT ||
    selectedAct2PrepFoods.length >= getAct2LunchChoiceLimit() ||
    isAct2FoodAlreadyPicked(choice.id)
  ) {
    return false;
  }

  const prepFood = {
    foodId: choice.id,
    foodName: choice.name,
    label: choice.label,
    category: choice.category || "无",
    description: choice.description || "",
    riskTags: choice.riskTags || [],
    tendencyScores: choice.tendencyScores || {},
    prepIndex: selectedAct2PrepFoods.length
  };

  selectedAct2PrepFoods.push(prepFood);
  syncAct2PrepArea();
  if (selectedAct2PrepFoods.length >= getAct2LunchChoiceLimit()) {
    isAct2LunchLocked = true;
    window.setTimeout(() => {
      enterAct2LunchCatchGame();
    }, 520);
  }

  return true;
}

function isAct2FoodAlreadyPicked(choiceId) {
  return selectedAct2PrepFoods.some((food) => food.foodId === choiceId);
}

function getAct2PlateSlotAtPoint(x, y) {
  return [...objectLayer.querySelectorAll(".act2-plate-slot")].find((slot) => {
    if (slot.classList.contains("is-filled")) {
      return false;
    }

    const rect = slot.getBoundingClientRect();
    return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  }) || null;
}

function handleAct2PlateDrop(slotElement, choice) {
  if (
    isAct2LunchLocked ||
    slotElement.classList.contains("is-filled") ||
    act2LunchPlateItems.length >= getAct2LunchChoiceLimit()
  ) {
    return false;
  }

  const slotIndex = Number(slotElement.dataset.slotIndex);
  const selectedFood = {
    foodId: choice.id,
    foodName: choice.name,
    label: choice.label,
    category: choice.category || "无",
    description: choice.description || "",
    riskTags: choice.riskTags || [],
    tendencyScores: choice.tendencyScores || {},
    slotIndex
  };

  act2LunchPlateItems.push(selectedFood);
  slotElement.classList.add("is-filled");
  slotElement.innerHTML = `
    <span class="act2-slot-food-name">${choice.label || choice.name}</span>
    <span class="act2-slot-food-category">${choice.category || "无"}</span>
  `;
  syncAct2FinishButton();
  console.log("Act 2 plate drop:", selectedFood);
  return true;
}

function markAct2ConveyorFoodCardEmpty(cardElement) {
  if (!cardElement) {
    return;
  }

  cardElement.classList.add("is-empty");
  const foodItem = cardElement.querySelector(".act2-food-item");

  if (foodItem) {
    foodItem.setAttribute("aria-hidden", "true");
  }
}

function markAct2FoodAsPicked(choiceId) {
  objectLayer?.querySelectorAll(`.act2-conveyor-food-card[data-choice-id="${choiceId}"]`).forEach((cardElement) => {
    cardElement.classList.add("is-picked");
    markAct2ConveyorFoodCardEmpty(cardElement);
  });
}

function syncAct2FinishButton() {
  const button = objectLayer?.querySelector(".act2-finish-button");
  const canFinish = act2LunchPlateItems.length >= 1 && !isAct2LunchLocked;

  if (button) {
    button.classList.remove("is-visible");
    button.hidden = true;
    button.disabled = true;
  }

  if (canFinish && currentState === ACT2_STATES.LUNCH_CHOICE) {
    showAct2LunchSceneHint();
    bindAct2LunchChoiceWheel();
    return;
  }

  hideAct2LunchSceneHint();
  cleanupAct2LunchChoiceWheel();
}

function finishAct2LunchChoice() {
  if (isAct2LunchLocked || act2LunchPlateItems.length < 1) {
    return;
  }

  isAct2LunchLocked = true;
  recordAct2LunchPlateChoice();
  objectLayer.querySelectorAll(".act2-lunch-food").forEach((element) => {
    element.disabled = true;
  });
  syncAct2FinishButton();
  window.setTimeout(() => {
    enterAct2LunchPlaceSelect();
  }, 520);
}

function showAct2LunchSceneHint() {
  if (objectLayer?.querySelector(".act2-lunch-scene-hint")) {
    return;
  }

  const config = getAct2StateConfig(ACT2_STATES.LUNCH_CHOICE).lunchSceneHint || {};
  const hint = document.createElement("div");
  const text = document.createElement("span");

  hint.className = "act2-scene-object act2-intro-bubble act2-lunch-scene-hint";
  text.className = "act2-intro-bubble-text";
  hint.appendChild(text);
  updateAct2ObjectLayout(hint, {
    x: config.x ?? 177,
    y: config.y ?? 126,
    width: config.width ?? 520,
    height: config.height ?? 120,
    opacity: 1,
    scale: 1,
    zIndex: config.zIndex || 14
  });
  objectLayer.appendChild(hint);
  startAct2Typewriter(config.content || "继续滚动鼠标选择你的用餐场景");
}

function hideAct2LunchSceneHint() {
  if (objectLayer?.querySelector(".act2-lunch-scene-hint")) {
    stopAct2Typewriter();
  }

  objectLayer?.querySelectorAll(".act2-lunch-scene-hint").forEach((hint) => hint.remove());
}

function bindAct2LunchChoiceWheel() {
  window.removeEventListener("wheel", handleAct2LunchChoiceWheel);
  window.addEventListener("wheel", handleAct2LunchChoiceWheel, { passive: false });
}

function cleanupAct2LunchChoiceWheel() {
  window.removeEventListener("wheel", handleAct2LunchChoiceWheel);
  act2LunchChoiceWheelLocked = false;
}

function handleAct2LunchChoiceWheel(event) {
  if (
    currentPhase !== PHASES.ACT2_LUNCH ||
    currentState !== ACT2_STATES.LUNCH_CHOICE ||
    event.deltaY <= 0 ||
    act2LunchChoiceWheelLocked ||
    act2LunchPlateItems.length < 1 ||
    isAct2LunchLocked ||
    !act2IntroTypewriterDone
  ) {
    return;
  }

  event.preventDefault();
  act2LunchChoiceWheelLocked = true;
  transitionAct2LunchToPlaceSelect();
}

function transitionAct2LunchToPlaceSelect() {
  if (isAct2LunchLocked || act2LunchPlateItems.length < 1) {
    return;
  }

  isAct2LunchLocked = true;
  cleanupAct2LunchChoiceWheel();
  const hint = objectLayer?.querySelector(".act2-lunch-scene-hint");

  if (hint) {
    hint.classList.add("is-exiting");
  }

  stopAct2Typewriter();
  recordAct2LunchPlateChoice();
  objectLayer.querySelectorAll(".act2-lunch-food").forEach((element) => {
    element.disabled = true;
  });
  window.setTimeout(() => {
    hideAct2LunchSceneHint();
    enterAct2LunchPlaceSelect();
  }, 360);
}

function animateAct2PlacePanelsEnter() {
  objectLayer?.querySelectorAll(".act2-comic-panel").forEach((panel) => {
    const column = Number(panel.dataset.column || 1);
    panel.classList.add(column === 1 ? "act2-panel-enter-left" : "act2-panel-enter-right");
  });
}

function getAct2LunchChoiceLimit() {
  return getAct2LunchStepConfig().choiceLimit || 4;
}

function recordAct2LunchPlateChoice() {
  const stepConfig = getAct2LunchStepConfig();
  const selectedFoods = act2LunchPlateItems.map((food) => ({ ...food }));
  const record = {
    sceneId: "act2",
    stepId: stepConfig.stepId,
    interactionType: stepConfig.interactionType,
    selectedFoods,
    riskTags: uniqueTags(selectedFoods.flatMap((food) => food.riskTags)),
    tendencyScores: mergeTendencyScores(selectedFoods.map((food) => food.tendencyScores))
  };

  playerChoices.push(record);
  console.log("Act 2 lunch plate choice:", record);
  console.log("Act 2 playerChoices:", playerChoices);
}

function startAct2CatchGame() {
  cleanupAct2CatchGame({ keepState: true });
  act2LunchPlateItems = [];
  act2CaughtFoods = [];
  act2CatchRemainingFoods = selectedAct2PrepFoods.map((food) => ({ ...food }));
  act2CatchActiveDrops = [];
  createAct2CatchGameStage();
  createAct2CatchPlate();
  window.addEventListener("pointermove", handleAct2PlateMouseMove);
  scheduleAct2CatchSpawn(120);
  updateAct2CatchGameLoop();
}

function getAct2CatchGameConfig() {
  return getAct2StateConfig(ACT2_STATES.LUNCH_CATCH_GAME).catchGame || {};
}

function createAct2CatchGameStage() {
  const config = getAct2CatchGameConfig();
  const dropArea = config.dropArea || {};
  const stage = document.createElement("div");

  stage.className = "act2-scene-object act2-catch-game";
  updateAct2ObjectLayout(stage, {
    x: dropArea.x ?? 120,
    y: dropArea.y ?? 40,
    width: dropArea.width ?? 1680,
    height: dropArea.height ?? 520,
    opacity: 1,
    scale: 1,
    zIndex: 2
  });
  objectLayer.appendChild(stage);
}

function createAct2CatchPlate() {
  const config = getAct2CatchGameConfig();
  const plateConfig = config.plate || {};
  const plate = document.createElement("div");

  plate.id = "act2_catch_plate";
  plate.className = "act2-scene-object act2-plate act2-catch-plate";
  plate.textContent = "餐盘";
  objectLayer.appendChild(plate);
  act2CatchPlateX = plateConfig.x ?? 760;
  updateAct2CatchPlatePosition(act2CatchPlateX);

  for (let slotIndex = 0; slotIndex < getAct2LunchChoiceLimit(); slotIndex += 1) {
    const slot = document.createElement("div");

    slot.className = "act2-scene-object act2-plate-slot act2-catch-plate-slot";
    slot.dataset.slotIndex = String(slotIndex);
    slot.textContent = `格子 ${slotIndex + 1}`;
    objectLayer.appendChild(slot);
  }

  updateAct2CatchPlatePosition(act2CatchPlateX);
}

function updateAct2CatchPlatePosition(x) {
  const config = getAct2CatchGameConfig();
  const stage = act2Layouts?.stage || { width: DESIGN_WIDTH, height: DESIGN_HEIGHT };
  const plateConfig = config.plate || {};
  const plateWidth = plateConfig.width ?? 420;
  const plateHeight = plateConfig.height ?? 220;
  const plateY = plateConfig.y ?? 650;
  const clampedX = Math.max(0, Math.min(stage.width - plateWidth, x));
  const plate = objectLayer?.querySelector(".act2-catch-plate");

  act2CatchPlateX = clampedX;
  if (plate) {
    updateAct2ObjectLayout(plate, {
      x: clampedX,
      y: plateY,
      width: plateWidth,
      height: plateHeight,
      opacity: 1,
      scale: 1,
      zIndex: plateConfig.zIndex || 18
    });
  }

  const slotPaddingX = 34;
  const slotPaddingY = 30;
  const slotGapX = 18;
  const slotGapY = 16;
  const slotWidth = (plateWidth - slotPaddingX * 2 - slotGapX) / 2;
  const slotHeight = (plateHeight - slotPaddingY * 2 - slotGapY) / 2;

  objectLayer?.querySelectorAll(".act2-catch-plate-slot").forEach((slot) => {
    const slotIndex = Number(slot.dataset.slotIndex);
    const col = slotIndex % 2;
    const row = Math.floor(slotIndex / 2);

    updateAct2ObjectLayout(slot, {
      x: clampedX + slotPaddingX + col * (slotWidth + slotGapX),
      y: plateY + slotPaddingY + row * (slotHeight + slotGapY),
      width: slotWidth,
      height: slotHeight,
      opacity: 1,
      scale: 1,
      zIndex: (plateConfig.zIndex || 18) + 1
    });
  });
  syncAct2PlateSlots();
}

function handleAct2PlateMouseMove(event) {
  if (currentState !== ACT2_STATES.LUNCH_CATCH_GAME) {
    return;
  }

  const stage = act2Layouts?.stage || { width: DESIGN_WIDTH, height: DESIGN_HEIGHT };
  const stageRect = objectLayer?.getBoundingClientRect();
  const plateConfig = getAct2CatchGameConfig().plate || {};
  const plateWidth = plateConfig.width ?? 420;

  if (!stageRect) {
    return;
  }

  const designX = ((event.clientX - stageRect.left) / stageRect.width) * stage.width;
  updateAct2CatchPlatePosition(designX - plateWidth / 2);
}

function scheduleAct2CatchSpawn(delay = null) {
  if (currentState !== ACT2_STATES.LUNCH_CATCH_GAME) {
    return;
  }

  const config = getAct2CatchGameConfig();
  const spawnDelay = delay ?? randomBetween(
    config.spawnIntervalMin ?? 350,
    config.spawnIntervalMax ?? 900
  );

  if (act2CatchSpawnTimer) {
    window.clearTimeout(act2CatchSpawnTimer);
  }

  act2CatchSpawnTimer = window.setTimeout(() => {
    act2CatchSpawnTimer = null;
    spawnAct2FallingFood();
    if (act2CaughtFoods.length < selectedAct2PrepFoods.length) {
      scheduleAct2CatchSpawn();
    }
  }, spawnDelay);
}

function spawnAct2FallingFood() {
  if (currentState !== ACT2_STATES.LUNCH_CATCH_GAME) {
    return;
  }

  const config = getAct2CatchGameConfig();
  const maxActiveDrops = config.maxActiveDrops ?? 3;

  if (act2CatchActiveDrops.length >= maxActiveDrops) {
    return;
  }

  const activeFoodIds = new Set(act2CatchActiveDrops.map((drop) => drop.food.foodId));
  const spawnableFoods = act2CatchRemainingFoods.filter((food) => !activeFoodIds.has(food.foodId));

  if (!spawnableFoods.length) {
    if (!act2CatchActiveDrops.length && act2CaughtFoods.length >= selectedAct2PrepFoods.length) {
      completeAct2CatchGame();
    }
    return;
  }

  const nextFood = spawnableFoods[Math.floor(Math.random() * spawnableFoods.length)];

  if (!nextFood) {
    completeAct2CatchGame();
    return;
  }

  const dropArea = config.dropArea || {};
  const foodSize = config.foodSize || {};
  const width = foodSize.width ?? 160;
  const height = foodSize.height ?? 150;
  const minX = dropArea.x ?? 120;
  const maxX = minX + (dropArea.width ?? 1680) - width;
  const falling = document.createElement("div");
  const name = document.createElement("span");
  const drop = {
    id: `act2_drop_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    food: nextFood,
    element: falling,
    x: minX + Math.random() * Math.max(1, maxX - minX),
    y: (dropArea.y ?? 40) - height,
    width,
    height,
    speed: randomBetween(config.fallSpeedMin ?? 3, config.fallSpeedMax ?? 6)
  };

  falling.className = "act2-scene-object act2-falling-food";
  falling.dataset.dropId = drop.id;
  name.className = "act2-falling-food-name";
  name.textContent = nextFood.label || nextFood.foodName;
  falling.appendChild(name);
  objectLayer.appendChild(falling);
  act2CatchActiveDrops.push(drop);
  updateAct2FallingFoodElement(drop);
}

function updateAct2FallingFoodElement(drop) {
  if (!drop?.element) {
    return;
  }

  updateAct2ObjectLayout(drop.element, {
    x: drop.x,
    y: drop.y,
    width: drop.width,
    height: drop.height,
    opacity: 1,
    scale: 1,
    zIndex: 24
  });
}

function updateAct2CatchGameLoop() {
  if (currentState !== ACT2_STATES.LUNCH_CATCH_GAME) {
    return;
  }

  const config = getAct2CatchGameConfig();
  const dropArea = config.dropArea || {};
  const missY = (dropArea.y ?? 40) + (dropArea.height ?? 520) + 260;

  [...act2CatchActiveDrops].forEach((drop) => {
    drop.y += drop.speed;
    updateAct2FallingFoodElement(drop);
    if (checkAct2FoodCaught(drop)) {
      placeCaughtFoodOnPlate(drop);
    } else if (drop.y > missY) {
      removeAct2ActiveDrop(drop);
    }
  });

  if (act2CaughtFoods.length >= selectedAct2PrepFoods.length) {
    completeAct2CatchGame();
    return;
  }

  act2CatchAnimationFrame = window.requestAnimationFrame(updateAct2CatchGameLoop);
}

function checkAct2FoodCaught(drop) {
  if (!drop) {
    return false;
  }

  const config = getAct2CatchGameConfig();
  const plateConfig = config.plate || {};
  const plateRect = {
    left: act2CatchPlateX,
    top: plateConfig.y ?? 650,
    right: act2CatchPlateX + (plateConfig.width ?? 420),
    bottom: (plateConfig.y ?? 650) + (plateConfig.height ?? 220)
  };
  const foodCenter = {
    x: drop.x + drop.width / 2,
    y: drop.y + drop.height / 2
  };

  return foodCenter.x >= plateRect.left &&
    foodCenter.x <= plateRect.right &&
    foodCenter.y >= plateRect.top &&
    foodCenter.y <= plateRect.bottom;
}

function placeCaughtFoodOnPlate(drop) {
  if (!drop) {
    return;
  }

  const slotIndex = act2CaughtFoods.length;
  const food = {
    foodId: drop.food.foodId,
    foodName: drop.food.foodName,
    label: drop.food.label,
    category: drop.food.category || "无",
    description: drop.food.description || "",
    riskTags: drop.food.riskTags || [],
    tendencyScores: drop.food.tendencyScores || {},
    slotIndex
  };

  act2CaughtFoods.push(food);
  act2LunchPlateItems.push(food);
  act2CatchRemainingFoods = act2CatchRemainingFoods.filter((item) => item.foodId !== drop.food.foodId);
  removeAct2ActiveDrop(drop);
  syncAct2PlateSlots();
}

function removeAct2ActiveDrop(drop) {
  drop?.element?.remove();
  act2CatchActiveDrops = act2CatchActiveDrops.filter((activeDrop) => activeDrop !== drop);
}

function completeAct2CatchGame() {
  if (act2CaughtFoods.length < selectedAct2PrepFoods.length) {
    return;
  }

  recordAct2LunchPlateChoice();
  cleanupAct2CatchGame();
  enterAct2LunchPlaceSelect();
}

function cleanupAct2CatchGame(options = {}) {
  if (act2CatchAnimationFrame) {
    window.cancelAnimationFrame(act2CatchAnimationFrame);
    act2CatchAnimationFrame = null;
  }

  window.removeEventListener("pointermove", handleAct2PlateMouseMove);
  if (act2CatchSpawnTimer) {
    window.clearTimeout(act2CatchSpawnTimer);
    act2CatchSpawnTimer = null;
  }

  act2CatchActiveDrops.forEach((drop) => drop.element?.remove());
  act2CatchActiveDrops = [];
  act2CatchRemainingFoods = [];
  act2CaughtFoods = [];
  act2CatchPlateX = 0;
  if (!options.keepState) {
    objectLayer?.querySelectorAll(".act2-catch-game, .act2-catch-plate, .act2-catch-plate-slot, .act2-falling-food").forEach((element) => element.remove());
  }
}

function finishAct2LunchScene() {
  if (currentState !== ACT2_LUNCH_PLACE_FOCUS_STATE) {
    return;
  }

  enterAct2LunchDone();
}

function startAct2WorkBubbleInterruption() {
  cleanupAct2WorkBubbles();
  act2WorkBubbleRound = 0;
  act2WorkBubbleActiveCount = 0;
  act2WorkBubbleClearedCount = 0;
  const timer = window.setTimeout(() => {
    advanceAct2WorkBubbleRound();
  }, 80);

  act2WorkBubbleTimers.push(timer);
}

function advanceAct2WorkBubbleRound() {
  const rounds = getAct2StateConfig(ACT2_LUNCH_PLACE_FOCUS_STATE).workBubbleRounds || [];
  const bubbles = rounds[act2WorkBubbleRound] || [];

  if (!bubbles.length) {
    completeAct2WorkBubbleInterruption();
    return;
  }

  act2WorkBubbleActiveCount = bubbles.length;
  act2WorkBubbleClearedCount = 0;
  bubbles.forEach((bubbleConfig, index) => {
    const timer = window.setTimeout(() => {
      spawnAct2WorkBubble(bubbleConfig, index);
    }, index * 70);

    act2WorkBubbleTimers.push(timer);
  });
}

function spawnAct2WorkBubble(bubbleConfig, index) {
  if (currentState !== ACT2_LUNCH_PLACE_FOCUS_STATE || !isAct2WorkBubblePlaceSelected()) {
    return;
  }

  const bubble = document.createElement("button");

  bubble.type = "button";
  bubble.className = "act2-scene-object act2-work-bubble";
  bubble.dataset.round = String(act2WorkBubbleRound);
  bubble.dataset.index = String(index);
  bubble.dataset.overlapPlate = String(Boolean(bubbleConfig.overlapPlate));
  bubble.textContent = bubbleConfig.text || "";
  updateAct2ObjectLayout(bubble, {
    x: bubbleConfig.x,
    y: bubbleConfig.y,
    width: bubbleConfig.width,
    height: bubbleConfig.height,
    opacity: 1,
    scale: 1,
    zIndex: bubbleConfig.zIndex || 35
  });
  bubble.addEventListener("click", () => handleAct2WorkBubbleClick(bubble));
  objectLayer.appendChild(bubble);
}

function handleAct2WorkBubbleClick(bubble) {
  if (!bubble || bubble.classList.contains("is-clearing")) {
    return;
  }

  bubble.classList.add("is-clearing");
  act2WorkBubbleClearedCount += 1;
  window.setTimeout(() => {
    bubble.remove();
    if (act2WorkBubbleClearedCount >= act2WorkBubbleActiveCount) {
      act2WorkBubbleRound += 1;
      advanceAct2WorkBubbleRound();
    }
  }, 220);
}

function completeAct2WorkBubbleInterruption() {
  const place = getAct2LunchPlaceChoice(selectedAct2LunchPlaceId);

  if (place) {
    recordAct2LunchPlaceChoice(place);
  }

  cleanupAct2WorkBubbles();
  enterAct2LunchDone();
}

function cleanupAct2WorkBubbles() {
  act2WorkBubbleTimers.forEach((timer) => window.clearTimeout(timer));
  act2WorkBubbleTimers = [];
  act2WorkBubbleActiveCount = 0;
  act2WorkBubbleClearedCount = 0;
  objectLayer?.querySelectorAll(".act2-work-bubble").forEach((bubble) => bubble.remove());
}

function startAct2FriendMealInteraction() {
  cleanupAct2FriendMealInteraction();
  const config = getAct2StateConfig(ACT2_LUNCH_PLACE_FOCUS_STATE).friendMealInteraction || {};

  spawnAct2FriendToast(config);
  const topTimer = window.setTimeout(() => {
    spawnAct2FriendTopBubbles(config);
  }, 160);
  const clearTimer = window.setTimeout(() => {
    clearAct2FriendToast();
    clearAct2FriendTopBubbles();
    spawnAct2FriendBottomBubbles(config);
  }, 3000);

  act2FriendBubbleTimers.push(topTimer, clearTimer);
}

function spawnAct2FriendToast(config) {
  if (config.toastHand) {
    const hand = document.createElement("div");

    hand.className = "act2-scene-object act2-friend-toast-hand";
    updateAct2ObjectLayout(hand, {
      ...config.toastHand,
      opacity: 1,
      scale: 1,
      zIndex: 30
    });
    objectLayer.appendChild(hand);
  }

  if (config.toastBubble) {
    const bubble = document.createElement("div");

    bubble.className = "act2-scene-object act2-friend-toast-bubble";
    bubble.textContent = config.toastBubble.text || "干杯！";
    updateAct2ObjectLayout(bubble, {
      ...config.toastBubble,
      opacity: 1,
      scale: 1,
      zIndex: 31
    });
    objectLayer.appendChild(bubble);
  }
}

function spawnAct2FriendTopBubbles(config) {
  (config.topBubbles || []).forEach((bubbleConfig, index) => {
    const timer = window.setTimeout(() => {
      const bubble = document.createElement("div");

      bubble.className = "act2-scene-object act2-friend-top-bubble";
      bubble.textContent = bubbleConfig.text || "";
      updateAct2ObjectLayout(bubble, {
        ...bubbleConfig,
        opacity: 1,
        scale: 1,
        zIndex: bubbleConfig.zIndex || 32
      });
      objectLayer.appendChild(bubble);
    }, index * 120);

    act2FriendBubbleTimers.push(timer);
  });
}

function clearAct2FriendTopBubbles() {
  objectLayer?.querySelectorAll(".act2-friend-top-bubble").forEach((bubble) => {
    bubble.classList.add("is-leaving");
    window.setTimeout(() => bubble.remove(), 320);
  });
}

function spawnAct2FriendBottomBubbles(config) {
  const bottomBubbles = config.bottomBubbles || [];

  act2FriendBubbleTotal = bottomBubbles.length;
  act2FriendBubbleCompleted = 0;
  bottomBubbles.forEach((bubbleConfig, index) => {
    const timer = window.setTimeout(() => {
      const bubble = document.createElement("button");

      bubble.type = "button";
      bubble.className = "act2-scene-object act2-friend-bottom-bubble";
      bubble.textContent = bubbleConfig.text || "";
      updateAct2ObjectLayout(bubble, {
        ...bubbleConfig,
        opacity: 1,
        scale: 1,
        zIndex: bubbleConfig.zIndex || 34
      });
      bubble.addEventListener("click", () => handleAct2FriendBubbleClick(bubble));
      objectLayer.appendChild(bubble);
    }, index * 110);

    act2FriendBubbleTimers.push(timer);
  });
}

function handleAct2FriendBubbleClick(bubble) {
  if (!bubble || bubble.classList.contains("is-heart")) {
    return;
  }

  bubble.classList.add("is-heart");
  bubble.textContent = "❤️";
  const removeTimer = window.setTimeout(() => {
    bubble.remove();
    act2FriendBubbleCompleted += 1;
    if (act2FriendBubbleCompleted >= act2FriendBubbleTotal) {
      const completeTimer = window.setTimeout(() => {
        completeAct2FriendMealInteraction();
      }, 180);

      act2FriendBubbleTimers.push(completeTimer);
    }
  }, 560);

  act2FriendBubbleTimers.push(removeTimer);
}

function clearAct2FriendToast() {
  objectLayer?.querySelectorAll(".act2-friend-toast-hand, .act2-friend-toast-bubble").forEach((element) => {
    element.classList.add("is-leaving");
    window.setTimeout(() => element.remove(), 320);
  });
}

function completeAct2FriendMealInteraction() {
  const place = getAct2LunchPlaceChoice(selectedAct2LunchPlaceId);

  if (place) {
    recordAct2LunchPlaceChoice(place);
  }

  cleanupAct2FriendMealInteraction();
  enterAct2LunchDone();
}

function cleanupAct2FriendMealInteraction() {
  act2FriendBubbleTimers.forEach((timer) => window.clearTimeout(timer));
  act2FriendBubbleTimers = [];
  act2FriendBubbleTotal = 0;
  act2FriendBubbleCompleted = 0;
  objectLayer?.querySelectorAll(
    ".act2-friend-toast-hand, .act2-friend-toast-bubble, .act2-friend-top-bubble, .act2-friend-bottom-bubble"
  ).forEach((element) => element.remove());
}

function createAct2ParkScene() {
  cleanupAct2ParkScene();
  const config = getAct2StateConfig(ACT2_LUNCH_PLACE_FOCUS_STATE).parkScene || {};

  act2BirdCleared = false;
  const scene = document.createElement("div");
  scene.className = "act2-scene-object act2-park-scene";
  updateAct2ObjectLayout(scene, {
    ...(config.scene || {}),
    x: config.scene?.x ?? 339.14,
    y: config.scene?.y ?? 107.01,
    width: config.scene?.width ?? 1190,
    height: config.scene?.height ?? 650,
    opacity: 1,
    scale: 1,
    zIndex: config.scene?.zIndex || 8
  });
  objectLayer.appendChild(scene);

  const dog = document.createElement("div");
  dog.className = "act2-scene-object act2-dog";
  dog.dataset.state = "dog_state_1";
  dog.textContent = config.dog?.state1Text || "狗";
  updateAct2ObjectLayout(dog, {
    ...(config.dog || {}),
    opacity: 1,
    scale: 1,
    zIndex: config.dog?.zIndex || 13
  });
  objectLayer.appendChild(dog);

  const cat = document.createElement("div");
  cat.className = "act2-scene-object act2-cat";
  cat.textContent = config.cat?.text || "猫！";
  updateAct2ObjectLayout(cat, {
    ...(config.cat || {}),
    opacity: 1,
    scale: 1,
    zIndex: config.cat?.zIndex || 13
  });
  objectLayer.appendChild(cat);

  const bird = document.createElement("button");
  bird.type = "button";
  bird.className = "act2-scene-object act2-bird";
  bird.textContent = config.bird?.text || "鸟";
  updateAct2ObjectLayout(bird, {
    ...(config.bird || {}),
    opacity: 1,
    scale: 1,
    zIndex: config.bird?.zIndex || 14
  });
  bird.addEventListener("click", () => handleAct2BirdClick(bird));
  objectLayer.appendChild(bird);

  startAct2DogHowling(dog, config.dog || {});
}

function startAct2DogHowling(dog, dogConfig = {}) {
  act2DogState = 1;
  if (act2DogTimer) {
    window.clearInterval(act2DogTimer);
  }

  act2DogTimer = window.setInterval(() => {
    toggleAct2DogState(dog, dogConfig);
  }, dogConfig.interval || 600);
}

function toggleAct2DogState(dog, dogConfig = {}) {
  if (!dog || currentState !== ACT2_LUNCH_PLACE_FOCUS_STATE || !isAct2ParkScenePlaceSelected()) {
    return;
  }

  act2DogState = act2DogState === 1 ? 2 : 1;
  dog.dataset.state = `dog_state_${act2DogState}`;
  dog.textContent = act2DogState === 1
    ? dogConfig.state1Text || "狗"
    : dogConfig.state2Text || "狗！";
}

function handleAct2BirdClick(bird) {
  if (!bird || act2BirdCleared || bird.classList.contains("is-cleared")) {
    return;
  }

  act2BirdCleared = true;
  bird.classList.add("is-cleared");
  const timer = window.setTimeout(() => {
    bird.remove();
  }, 620);
  const completeTimer = window.setTimeout(() => {
    completeAct2ParkScene();
  }, 5620);

  act2ParkTimers.push(timer, completeTimer);
}

function completeAct2ParkScene() {
  const place = getAct2LunchPlaceChoice(selectedAct2LunchPlaceId);

  if (place) {
    recordAct2LunchPlaceChoice(place, { birdCleared: true });
  }

  cleanupAct2ParkScene();
  enterAct2LunchDone();
}

function cleanupAct2ParkScene() {
  if (act2DogTimer) {
    window.clearInterval(act2DogTimer);
    act2DogTimer = null;
  }

  act2ParkTimers.forEach((timer) => window.clearTimeout(timer));
  act2ParkTimers = [];
  act2DogState = 1;
  act2BirdCleared = false;
  objectLayer?.querySelectorAll(".act2-park-scene, .act2-dog, .act2-cat, .act2-bird").forEach((element) => element.remove());
}

function startAct2SoloMealInteraction() {
  cleanupAct2SoloMealInteraction();
  const filledSlots = getAct2EatingFilledSlotIndexes();

  act2EatingCompletedSlots = new Set();
  act2EatingClickCount = 0;
  act2EatingCurrentSlotIndex = filledSlots[0] ?? 0;
  act2ChopsticksState = "open";
  renderAct2EatingProgress();
  renderAct2Chopsticks();
  syncAct2PlateSlots();

  if (!filledSlots.length) {
    completeAct2SoloMealInteraction();
  }
}

function getAct2EatingFilledSlotIndexes() {
  return act2LunchPlateItems
    .map((food) => food.slotIndex)
    .filter((slotIndex) => Number.isFinite(slotIndex))
    .sort((a, b) => a - b);
}

function renderAct2EatingProgress() {
  const config = getAct2StateConfig(ACT2_LUNCH_PLACE_FOCUS_STATE).soloMealInteraction?.progressBar || {};
  const progress = document.createElement("div");
  const fill = document.createElement("div");

  progress.className = "act2-scene-object act2-eating-progress";
  fill.className = "act2-eating-progress-fill";
  progress.appendChild(fill);
  updateAct2ObjectLayout(progress, {
    ...config,
    opacity: 1,
    scale: 1,
    zIndex: config.zIndex || 16
  });
  objectLayer.appendChild(progress);
  updateAct2EatingProgress();
}

function renderAct2Chopsticks() {
  const config = getAct2StateConfig(ACT2_LUNCH_PLACE_FOCUS_STATE).soloMealInteraction?.chopsticks || {};
  const chopsticks = document.createElement("button");
  const stickA = document.createElement("span");
  const stickB = document.createElement("span");

  chopsticks.type = "button";
  chopsticks.className = "act2-scene-object act2-chopsticks";
  chopsticks.dataset.state = act2ChopsticksState;
  stickA.className = "act2-chopstick-line";
  stickB.className = "act2-chopstick-line";
  chopsticks.appendChild(stickA);
  chopsticks.appendChild(stickB);
  updateAct2ObjectLayout(chopsticks, {
    ...config,
    opacity: 1,
    scale: 1,
    zIndex: config.zIndex || 28
  });
  chopsticks.addEventListener("click", handleAct2ChopsticksClick);
  objectLayer.appendChild(chopsticks);
}

function handleAct2ChopsticksClick(event) {
  if (currentState !== ACT2_LUNCH_PLACE_FOCUS_STATE || !isAct2SoloMealPlaceSelected()) {
    return;
  }

  const chopsticks = event.currentTarget;

  act2ChopsticksState = act2ChopsticksState === "open" ? "close" : "open";
  chopsticks.dataset.state = act2ChopsticksState;
  chopsticks.classList.add("is-clicking");
  window.setTimeout(() => {
    chopsticks.classList.remove("is-clicking");
  }, 180);

  act2EatingClickCount += 1;
  if (act2EatingClickCount >= act2EatingClicksPerSlot) {
    consumeAct2CurrentPlateSlot();
    return;
  }

  updateAct2EatingProgress();
}

function consumeAct2CurrentPlateSlot() {
  act2EatingCompletedSlots.add(act2EatingCurrentSlotIndex);
  act2EatingClickCount = 0;
  syncAct2PlateSlots();
  updateAct2EatingProgress();

  const nextSlot = getAct2EatingFilledSlotIndexes().find((slotIndex) => !act2EatingCompletedSlots.has(slotIndex));

  if (nextSlot == null) {
    const timer = window.setTimeout(() => {
      completeAct2SoloMealInteraction();
    }, 420);

    act2SoloMealTimers.push(timer);
    return;
  }

  act2EatingCurrentSlotIndex = nextSlot;
}

function updateAct2EatingProgress() {
  const filledSlots = getAct2EatingFilledSlotIndexes();
  const totalClicks = filledSlots.length * act2EatingClicksPerSlot;
  const completedClicks = (act2EatingCompletedSlots.size * act2EatingClicksPerSlot) + act2EatingClickCount;
  const percent = totalClicks > 0 ? Math.min(100, (completedClicks / totalClicks) * 100) : 100;
  const fill = objectLayer?.querySelector(".act2-eating-progress-fill");

  if (fill) {
    fill.style.width = `${percent}%`;
  }
}

function completeAct2SoloMealInteraction() {
  const place = getAct2LunchPlaceChoice(selectedAct2LunchPlaceId);

  if (place) {
    recordAct2LunchEatingResult(place);
  }

  cleanupAct2SoloMealInteraction();
  enterAct2LunchDone();
}

function recordAct2LunchEatingResult(place) {
  const eatenSlots = getAct2EatingFilledSlotIndexes().map((slotIndex) => {
    const food = act2LunchPlateItems.find((item) => item.slotIndex === slotIndex);

    return {
      slotIndex,
      foodId: food?.foodId || "",
      foodName: food?.foodName || "",
      label: food?.label || food?.foodName || "",
      eatingClickCount: act2EatingClicksPerSlot,
      eaten: act2EatingCompletedSlots.has(slotIndex)
    };
  });
  const record = {
    sceneId: "act2",
    stepId: "act2_lunchEatingResult",
    interactionType: "click_chopsticks_to_eat_plate",
    placeId: place.id,
    placeName: place.name,
    label: place.label,
    clicksPerSlot: act2EatingClicksPerSlot,
    totalRequiredClicks: eatenSlots.length * act2EatingClicksPerSlot,
    completedSlotCount: act2EatingCompletedSlots.size,
    eatenSlots
  };

  playerChoices.push(record);
  console.log("Act 2 lunch eating result:", record);
  console.log("Act 2 playerChoices:", playerChoices);
}

function cleanupAct2SoloMealInteraction() {
  act2SoloMealTimers.forEach((timer) => window.clearTimeout(timer));
  act2SoloMealTimers = [];
  act2EatingCurrentSlotIndex = 0;
  act2EatingClickCount = 0;
  act2EatingCompletedSlots = new Set();
  act2ChopsticksState = "open";
  objectLayer?.querySelectorAll(".act2-eating-progress, .act2-chopsticks").forEach((element) => element.remove());
}

function recordAct2LunchPlaceChoice(place, extraFields = {}) {
  const stepConfig = getAct2LunchPlaceStepConfig();
  const record = {
    sceneId: "act2",
    stepId: stepConfig.stepId,
    interactionType: stepConfig.interactionType,
    placeId: place.id,
    placeName: place.name,
    label: place.label,
    eatingMode: place.eatingMode || "无",
    description: place.description || "",
    riskTags: place.riskTags || [],
    tendencyScores: place.tendencyScores || {},
    ...extraFields
  };

  playerChoices.push(record);
  console.log("Act 2 lunch place choice:", record);
  console.log("Act 2 playerChoices:", playerChoices);
}

// DEBUG ACT2 START
const debugMode = true;
// DEBUG ACT2 END

function startConfiguredEntry() {
  // DEBUG ACT2 START
  if (debugMode) {
    renderDebugEntryControls();
  }
  // DEBUG ACT2 END

  if (!PREVIEW_ENTRY_CONFIG.enabled) {
    enterAct0();
    return;
  }

  startPreviewEntry();
}

// DEBUG ACT2 START
function renderDebugEntryControls() {
  document.querySelector(".debug-entry-controls")?.remove();

  const controls = document.createElement("div");
  const jumpAct2Button = document.createElement("button");

  controls.className = "debug-entry-controls";
  jumpAct2Button.type = "button";
  jumpAct2Button.textContent = "跳到 Act2 开始测试";
  jumpAct2Button.addEventListener("click", startDebugAct2Entry);
  controls.appendChild(jumpAct2Button);
  document.querySelector("#app")?.appendChild(controls);
}

function removeDebugEntryControls() {
  document.querySelector(".debug-entry-controls")?.remove();
}

function startDebugAct2Entry() {
  removeDebugEntryControls();
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
  resultRiskLayer = null;
  objectLayer?.querySelectorAll(".act1-scene-object, .act2-scene-object").forEach((element) => element.remove());
  objectLayer?.classList.remove("act3-exit-sequence");
  hasAct3ExitStarted = false;
  isAct3ExitAnimating = false;
  isAct3ScrollExitEnabled = false;
  isAct3Complete = false;
  act3ExitProgress = 0;
  hasResultRiskIntroStarted = false;
  resultRiskIntroStep = 0;
  resultRiskIntroWheelLocked = false;
  currentState = null;
  enterAct2LunchIntro();
}
// DEBUG ACT2 END

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
  resultRiskLayer = null;
  objectLayer?.classList.remove("act3-exit-sequence");
  hasAct3ExitStarted = false;
  isAct3ExitAnimating = false;
  isAct3ScrollExitEnabled = false;
  isAct3Complete = false;
  act3ExitProgress = 0;
  currentState = null;
  hasResultRiskIntroStarted = false;
  resultRiskIntroStep = 0;
  resultRiskIntroWheelLocked = false;
  if (resultRiskIntroWheelLockTimer) {
    window.clearTimeout(resultRiskIntroWheelLockTimer);
    resultRiskIntroWheelLockTimer = null;
  }

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

    enterAct1BreakfastChoice();
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
    return;
  }

  if (currentPhase === PHASES.RESULT_GALAXY_LOCATING) {
    handleResultGalaxyLocatingWheel(event);
    return;
  }

  if (currentPhase === PHASES.RESULT_GALAXY) {
    handleResultGalaxyWheel(event);
    return;
  }

  if (currentPhase === PHASES.RESULT_RISK_INTRO) {
    handleResultRiskIntroWheel(event);
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
  renderResultDietGalaxyLayout(resultGalaxyLayer);
  objectLayer.appendChild(resultGalaxyLayer);
  return resultGalaxyLayer;
}

function ensureResultRiskLayer() {
  if (resultRiskLayer) {
    return resultRiskLayer;
  }

  resultRiskLayer = document.createElement("section");
  resultRiskLayer.id = RESULT_STATES.RISK_INTRO;
  resultRiskLayer.className = "result-risk-layer";
  resultRiskLayer.style.setProperty(
    "--result-risk-background",
    RESULT_GALAXY_LOCATING_CONFIG.resultDietGalaxy.riskIntro.backgroundColor
  );
  objectLayer.appendChild(resultRiskLayer);
  return resultRiskLayer;
}

function formatRegularityForStats(regularity) {
  if (regularity === "irregular") {
    return "不规律进食";
  }

  if (regularity === "regular") {
    return "规律进食";
  }

  return "未记录";
}

function bindResultStatsDebugShortcut() {
  if (resultStatsShortcutBound) {
    return;
  }

  resultStatsShortcutBound = true;
  window.addEventListener("keydown", (event) => {
    if (!isResultStatsShortcutEvent(event) || event.repeat || shouldIgnoreResultStatsShortcut(event)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    toggleResultStatsOverlay();
  }, true);
}

function isResultStatsShortcutEvent(event) {
  return event.code === "KeyR" || event.key === "r" || event.key === "R";
}

function shouldIgnoreResultStatsShortcut(event) {
  const target = event.target;

  return Boolean(
    target?.closest?.("input, textarea, select, [contenteditable='true']")
  );
}

function toggleResultStatsOverlay() {
  const layer = ensureResultStatsOverlayLayer();

  if (layer.classList.contains("is-visible")) {
    hideResultStatsOverlay();
    return;
  }

  showResultStatsOverlay();
}

function showResultStatsOverlay() {
  const layer = ensureResultStatsOverlayLayer();

  updatePlayerRiskResult();
  renderResultStatsOverlay(layer);
  layer.classList.add("is-visible");
}

function hideResultStatsOverlay() {
  resultStatsOverlayLayer?.classList.remove("is-visible");
}

function ensureResultStatsOverlayLayer() {
  if (resultStatsOverlayLayer) {
    return resultStatsOverlayLayer;
  }

  resultStatsOverlayLayer = document.createElement("section");
  resultStatsOverlayLayer.className = "result-stats-overlay";
  resultStatsOverlayLayer.setAttribute("aria-label", "玩家数据统计弹窗");
  resultStatsOverlayLayer.innerHTML = "";
  document.body.appendChild(resultStatsOverlayLayer);
  resultStatsOverlayLayer.addEventListener("click", (event) => {
    if (
      event.target === resultStatsOverlayLayer ||
      event.target.closest(".result-stats-overlay-close")
    ) {
      hideResultStatsOverlay();
    }
  });

  return resultStatsOverlayLayer;
}

function renderResultStatsOverlay(layer) {
  const riskResult = getPlayerRiskResult();
  const selectedItems = riskResult.selectedItems || {};
  const behavior = riskResult.behavior || {};

  layer.innerHTML = `
    <div class="result-stats-overlay-panel" role="dialog" aria-modal="true">
      <button class="result-stats-overlay-close" type="button" aria-label="关闭统计弹窗">×</button>
      <div class="result-stats-overlay-header">
        <div>
          <p class="result-stats-overlay-kicker">实时数据检测</p>
          <h2>玩家记录统计</h2>
        </div>
        <div class="result-stats-overlay-summary">
          <span>总风险 ${riskResult.totalRiskIndex}/100</span>
          <span>${riskResult.riskLevelLabel || riskResult.riskLevel}</span>
        </div>
      </div>

      <div class="result-stats-debug-grid">
        <section class="result-stats-debug-card result-stats-debug-card-wide">
          <h3>玩家选择</h3>
          ${renderStatsKeyValueList([
            ["省份", riskResult.province || "未记录"],
            ["早餐", selectedItems.breakfast || "未记录"],
            ["早餐速度", selectedItems.breakfastSpeed || "未记录"],
            ["午餐菜品", (selectedItems.lunchFoods || []).join("、") || "未记录"],
            ["午餐地点", selectedItems.lunchPlace || "未记录"],
            ["火锅食材", formatHotpotFoodsForStats(selectedItems.hotpotFoods)],
            ["饮品", selectedItems.drink || "未记录"]
          ])}
        </section>

        <section class="result-stats-debug-card">
          <h3>风险标签统计</h3>
          ${renderRiskTagCountsTable(riskResult.riskTagCounts)}
        </section>

        <section class="result-stats-debug-card">
          <h3>四维风险</h3>
          ${renderDimensionStats(riskResult.dimensions)}
        </section>

        <section class="result-stats-debug-card">
          <h3>行为判定</h3>
          ${renderStatsKeyValueList([
            ["快速进食等级", behavior.eatingSpeedLevel || "未记录"],
            ["进食时长", `${behavior.eatingDurationMs || 0} ms`],
            ["点击次数", behavior.clickCount || 0],
            ["点击速度", `${behavior.clickSpeed || 0} 次/秒`],
            ["规律性", formatRegularityForStats(behavior.regularity)]
          ])}
        </section>

        <section class="result-stats-debug-card">
          <h3>记录数量</h3>
          ${renderStatsKeyValueList([
            ["playerChoices", `${playerChoices.length} 条`],
            ["未知风险标签", riskResult.unknownRiskTags?.join("、") || "无"],
            ["当前阶段", currentState || "未记录"]
          ])}
        </section>

        <section class="result-stats-debug-card result-stats-debug-card-full">
          <h3>原始 playerChoices</h3>
          <pre class="result-stats-debug-json">${escapeHtml(JSON.stringify(playerChoices, null, 2))}</pre>
        </section>
      </div>
    </div>
  `;
}

function renderStatsKeyValueList(items) {
  return `
    <dl class="result-stats-debug-kv">
      ${items.map(([label, value]) => `
        <div>
          <dt>${escapeHtml(label)}</dt>
          <dd>${escapeHtml(value)}</dd>
        </div>
      `).join("")}
    </dl>
  `;
}

function renderRiskTagCountsTable(riskTagCounts = {}) {
  const entries = Object.entries(riskTagCounts);

  if (!entries.length) {
    return `<p class="result-stats-debug-empty">暂无风险标签</p>`;
  }

  return `
    <div class="result-stats-tag-table">
      <div class="result-stats-tag-row result-stats-tag-head">
        <span>标签</span><span>原始</span><span>有效</span><span>分数</span>
      </div>
      ${entries.map(([tag, count]) => `
        <div class="result-stats-tag-row">
          <span>${escapeHtml(tag)}</span>
          <span>${count.rawChosen}</span>
          <span>${count.effectiveChosen}</span>
          <span>${count.score}</span>
        </div>
      `).join("")}
    </div>
  `;
}

function renderDimensionStats(dimensions = {}) {
  return `
    <div class="result-stats-dimensions">
      ${RISK_DIMENSION_KEYS.map((dimension) => {
        const item = dimensions[dimension] || {};
        return `
          <div class="result-stats-dimension">
            <div class="result-stats-dimension-label">
              <span>${escapeHtml(getDimensionDisplayName(dimension))}</span>
              <strong>${escapeHtml(item.endpoint || "-")}</strong>
            </div>
            <div class="result-stats-dimension-track">
              <span style="width:${Math.max(0, Math.min(100, item.riskIndex || 0))}%"></span>
            </div>
            <div class="result-stats-dimension-meta">${item.riskIndex || 0}/100 · ${item.score || 0}</div>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function getDimensionDisplayName(dimension) {
  const names = {
    sensory: "感官刺激",
    rhythm: "节律",
    specificity: "特异",
    danger: "危险"
  };

  return names[dimension] || dimension;
}

function formatHotpotFoodsForStats(hotpotFoods = []) {
  if (!hotpotFoods.length) {
    return "未记录";
  }

  return hotpotFoods.map((food) => `${food.id || "unknown"} -> ${food.target || "unknown"}`).join("；");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderResultRiskIntroLayout(layer) {
  const config = RESULT_GALAXY_LOCATING_CONFIG.resultDietGalaxy.riskIntro;
  const shapes = config.shapes || [];
  const prompt = config.prompt || {};
  const centerExplanation = config.centerExplanation || {};
  const riskIndex = config.riskIndex || {};
  const riskResult = getPlayerRiskResult();
  const riskIndexValue = `${Math.round(riskResult.totalRiskIndex)}/100`;
  const shapeMarkup = shapes
    .map((shape, index) => `
      <div
        class="result-risk-shape-slot result-risk-shape-slot-${shape.type}"
        data-risk-shape-index="${index}"
        style="left:${shape.x}px; top:${shape.y}px; --result-risk-shape-size:${shape.size || config.shapeSize}px;"
      >
        <div class="result-risk-shape-cloud">
          ${createRiskIntroShapeParticles(shape, config)}
        </div>
      </div>
      <div
        class="result-risk-text-block"
        data-risk-text-index="${index}"
        style="left:${shape.textX}px; top:${shape.textY}px; width:${shape.textWidth}px;"
      >
        ${shape.text}
      </div>
    `)
    .join("");

  layer.style.setProperty("--result-risk-background", config.backgroundColor);
  layer.style.setProperty("--result-risk-text-fade-duration", `${config.textFadeDuration}ms`);
  layer.style.setProperty("--result-risk-dissolve-duration", `${config.dissolveDuration}ms`);
  layer.style.setProperty("--result-risk-particle-size", `${config.particleSize}px`);
  layer.style.setProperty("--result-risk-float-strength", `${config.floatStrength}px`);
  layer.style.setProperty("--result-risk-prompt-x", `${prompt.x}px`);
  layer.style.setProperty("--result-risk-prompt-y", `${prompt.y}px`);
  layer.style.setProperty("--result-risk-prompt-width", `${prompt.width}px`);
  layer.style.setProperty("--result-risk-prompt-font-size", `${prompt.fontSize}px`);
  layer.style.setProperty("--result-risk-prompt-line-height", `${prompt.lineHeight}`);
  layer.style.setProperty("--result-risk-prompt-color", prompt.color || "#693618");
  layer.style.setProperty("--result-risk-stage-fade-duration", `${config.stageFadeDuration}ms`);
  layer.style.setProperty("--result-risk-center-x", `${centerExplanation.x}px`);
  layer.style.setProperty("--result-risk-center-y", `${centerExplanation.y}px`);
  layer.style.setProperty("--result-risk-center-width", `${centerExplanation.width}px`);
  layer.style.setProperty("--result-risk-center-font-size", `${centerExplanation.fontSize}px`);
  layer.style.setProperty("--result-risk-center-line-height", `${centerExplanation.lineHeight}`);
  layer.style.setProperty("--result-risk-center-color", centerExplanation.color || "#693618");
  layer.style.setProperty("--result-risk-score-x", `${riskIndex.x}px`);
  layer.style.setProperty("--result-risk-score-y", `${riskIndex.y}px`);
  layer.style.setProperty("--result-risk-score-width", `${riskIndex.width}px`);
  layer.style.setProperty("--result-risk-score-color", riskIndex.color || "#693618");
  layer.style.setProperty("--result-risk-score-title-size", `${riskIndex.titleFontSize}px`);
  layer.style.setProperty("--result-risk-score-value-size", `${riskIndex.valueFontSize}px`);
  layer.style.setProperty("--result-risk-score-note-size", `${riskIndex.noteFontSize}px`);
  layer.style.setProperty("--result-risk-score-note-line-height", `${riskIndex.noteLineHeight}`);
  layer.innerHTML = `
    <div class="result-risk-prompt">${prompt.text || ""}</div>
    <div class="result-risk-shape-stage">
      ${shapeMarkup}
    </div>
    <div class="result-risk-center-copy">${(centerExplanation.text || "").replace(/\n/g, "<br>")}</div>
    <div class="result-risk-transition-layer"></div>
    <div class="result-risk-score-block">
      <p class="result-risk-score-title">${riskIndex.title || ""}</p>
      <p class="result-risk-score-value">${riskIndexValue}</p>
      <p class="result-risk-score-note">${(riskIndex.note || "").replace(/\n/g, "<br>")}</p>
    </div>
  `;
}

function createRiskIntroShapeParticles(shape, config) {
  const particleCount = shape.particleCount || config.particleCount || 72;
  const shapeSize = shape.size || config.shapeSize || 180;
  let markup = "";

  for (let index = 0; index < particleCount; index += 1) {
    const point = getRiskIntroShapePoint(shape.type, shapeSize, index, particleCount);
    const color = randomItem(config.colorPool) || "#8DB8F2";
    const driftX = randomBetween(-config.floatStrength, config.floatStrength);
    const driftY = randomBetween(-config.floatStrength, config.floatStrength);
    const pulseDelay = randomBetween(-2200, 0);
    const pulseDuration = randomBetween(2200, 4200);
    const dissolveX = randomBetween(-shapeSize * 0.34, shapeSize * 0.34);
    const dissolveY = randomBetween(-shapeSize * 0.34, shapeSize * 0.34);
    const scale = randomBetween(0.78, 1.18);

    markup += `
      <span
        class="result-risk-dot"
        style="
          left:calc(50% + ${point.x.toFixed(2)}px);
          top:calc(50% + ${point.y.toFixed(2)}px);
          --risk-dot-color:${color};
          --risk-dot-drift-x:${driftX.toFixed(2)}px;
          --risk-dot-drift-y:${driftY.toFixed(2)}px;
          --risk-dot-scale:${scale.toFixed(3)};
          --risk-dot-pulse-delay:${Math.round(pulseDelay)}ms;
          --risk-dot-pulse-duration:${Math.round(pulseDuration)}ms;
          --risk-dot-dissolve-x:${dissolveX.toFixed(2)}px;
          --risk-dot-dissolve-y:${dissolveY.toFixed(2)}px;
        "
      ></span>
    `;
  }

  return markup;
}

function getRiskIntroShapePoint(type, shapeSize, index, particleCount) {
  const half = shapeSize / 2;

  if (type === "circle") {
    const angle = randomBetween(0, Math.PI * 2);
    const radius = Math.sqrt(Math.random()) * half * 0.86;
    return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
  }

  if (type === "triangle") {
    const top = { x: 0, y: -half * 0.9 };
    const left = { x: -half * 0.82, y: half * 0.74 };
    const right = { x: half * 0.82, y: half * 0.74 };
    let a = Math.random();
    let b = Math.random();

    if (a + b > 1) {
      a = 1 - a;
      b = 1 - b;
    }

    return {
      x: top.x + a * (left.x - top.x) + b * (right.x - top.x),
      y: top.y + a * (left.y - top.y) + b * (right.y - top.y)
    };
  }

  if (type === "radial") {
    const spokeCount = 18;
    const spokeIndex = index % spokeCount;
    const angle = (Math.PI * 2 * spokeIndex) / spokeCount + randomBetween(-0.05, 0.05);
    const radius = randomBetween(half * 0.36, half * 0.88);
    return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius };
  }

  return {
    x: randomBetween(-half * 0.82, half * 0.82),
    y: randomBetween(-half * 0.82, half * 0.82)
  };
}

function startResultRiskTransition(layer, config) {
  const transitionLayer = layer?.querySelector(".result-risk-transition-layer");
  const particleConfig = config.transitionParticles || {};
  const colors = config.colorPool || RESULT_GALAXY_LOCATING_CONFIG.colors || ["#8DB8F2"];
  const particleCount = particleConfig.particleCount || 140;
  const totalDuration =
    (particleConfig.enterDuration || 920) +
    (particleConfig.holdDuration || 340) +
    (particleConfig.exitDuration || 880);

  if (!transitionLayer) {
    return totalDuration;
  }

  transitionLayer.innerHTML = "";
  transitionLayer.classList.add("is-active");

  for (let index = 0; index < particleCount; index += 1) {
    const particle = document.createElement("span");
    const from = getRiskTransitionEdgePoint();
    const via = {
      x: randomBetween(80, DESIGN_WIDTH - 80),
      y: randomBetween(80, DESIGN_HEIGHT - 80)
    };
    const to = {
      x: via.x + randomBetween(-80, 80),
      y: DESIGN_HEIGHT + randomBetween(80, 220)
    };
    const size = randomBetween(particleConfig.minSize || 10, particleConfig.maxSize || 34);
    const delay = randomBetween(0, 180);

    particle.className = "result-risk-transition-particle";
    particle.style.left = `${from.x}px`;
    particle.style.top = `${from.y}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.background = randomItem(colors) || "#8DB8F2";
    particle.style.setProperty("--risk-transition-via-x", `${via.x - from.x}px`);
    particle.style.setProperty("--risk-transition-via-y", `${via.y - from.y}px`);
    particle.style.setProperty("--risk-transition-end-x", `${to.x - from.x}px`);
    particle.style.setProperty("--risk-transition-end-y", `${to.y - from.y}px`);
    particle.style.setProperty("--risk-transition-enter-duration", `${particleConfig.enterDuration || 920}ms`);
    particle.style.setProperty("--risk-transition-hold-duration", `${particleConfig.holdDuration || 340}ms`);
    particle.style.setProperty("--risk-transition-exit-duration", `${particleConfig.exitDuration || 880}ms`);
    particle.style.setProperty("--risk-transition-delay", `${Math.round(delay)}ms`);
    particle.addEventListener("animationend", () => {
      particle.remove();
      if (!transitionLayer.querySelector(".result-risk-transition-particle")) {
        transitionLayer.classList.remove("is-active");
      }
    }, { once: true });
    transitionLayer.appendChild(particle);
  }

  return totalDuration + 220;
}

function getRiskTransitionEdgePoint() {
  const edge = Math.floor(Math.random() * 4);

  if (edge === 0) {
    return { x: randomBetween(-120, -20), y: randomBetween(40, DESIGN_HEIGHT - 40) };
  }

  if (edge === 1) {
    return { x: randomBetween(DESIGN_WIDTH + 20, DESIGN_WIDTH + 120), y: randomBetween(40, DESIGN_HEIGHT - 40) };
  }

  if (edge === 2) {
    return { x: randomBetween(40, DESIGN_WIDTH - 40), y: randomBetween(-120, -20) };
  }

  return { x: randomBetween(40, DESIGN_WIDTH - 40), y: randomBetween(DESIGN_HEIGHT + 20, DESIGN_HEIGHT + 120) };
}

function renderResultDietGalaxyLayout(layer) {
  const config = RESULT_GALAXY_LOCATING_CONFIG.resultDietGalaxy;
  const riskResult = getPlayerRiskResult();

  if (RESULT_PLANET_ONLY_MODE) {
    layer.innerHTML = "";
    layer.classList.add("result-planet-only-layer");
    return;
  }

  layer.classList.remove("result-planet-only-layer");

  const traitDimensionOrder = ["sensory", "danger", "specificity", "rhythm"];
  const paragraphs = config.panel.paragraphs
    .map((paragraph) => `<p>${paragraph.replace(/\n/g, "<br>")}</p>`)
    .join("");
  const traitBarItems =
    config.traitBars.items ||
    (config.traitBars.values || []).map((value) => ({
      value,
      leftLabel: "",
      rightLabel: "",
      pointerShape: "square"
    }));
  const traitBars = traitBarItems
    .map((item, index) => {
      const dimension = traitDimensionOrder[index];
      const dynamicValue = riskResult.dimensions?.[dimension]?.riskIndex;
      const value = dynamicValue ?? item.value;

      return `
      <div class="result-trait-bar" style="--trait-position: ${value}%">
        <div class="result-trait-track-wrap">
          <div class="result-trait-track"></div>
          <div class="result-trait-endpoint result-trait-endpoint-left"></div>
          <div class="result-trait-endpoint result-trait-endpoint-right"></div>
          <div class="result-trait-pointer result-trait-pointer-${item.pointerShape || "square"}"></div>
        </div>
        <div class="result-trait-label-row">
          <span class="result-trait-label result-trait-label-left">${item.leftLabel || ""}</span>
          <span class="result-trait-label result-trait-label-right">${item.rightLabel || ""}</span>
        </div>
      </div>
    `;
    })
    .join("");

  layer.style.setProperty("--result-label-x", `${config.galaxyLabel.x}px`);
  layer.style.setProperty("--result-label-y", `${config.galaxyLabel.y}px`);
  layer.style.setProperty("--result-label-width", `${config.galaxyLabel.width}px`);
  layer.style.setProperty("--result-panel-x", `${config.panel.x}px`);
  layer.style.setProperty("--result-panel-y", `${config.panel.y}px`);
  layer.style.setProperty("--result-panel-width", `${config.panel.width}px`);
  layer.style.setProperty("--result-bars-x", `${config.traitBars.x}px`);
  layer.style.setProperty("--result-bars-y", `${config.traitBars.y}px`);
  layer.style.setProperty("--result-bars-width", `${config.traitBars.width}px`);
  layer.style.setProperty("--result-bar-height", `${config.traitBars.height}px`);
  layer.style.setProperty("--result-bar-gap", `${config.traitBars.gap}px`);
  layer.style.setProperty("--result-pointer-width", `${config.traitBars.pointerWidth}px`);
  layer.style.setProperty("--result-pointer-height", `${config.traitBars.pointerHeight}px`);
  layer.style.setProperty("--result-trait-endpoint-size", `${config.traitBars.endpointSize || 14}px`);
  layer.style.setProperty("--result-trait-label-gap", `${config.traitBars.labelGap || 16}px`);
  layer.style.setProperty("--result-trait-label-font-size", `${config.traitBars.labelFontSize || 16}px`);
  layer.innerHTML = `
    <div class="result-galaxy-label">
      <p class="result-galaxy-label-eyebrow">${config.galaxyLabel.eyebrow}</p>
      <p class="result-galaxy-label-title">${config.galaxyLabel.title}</p>
    </div>
    <div class="result-diet-galaxy-panel">
      <div class="result-persona-heading">
        <h2>${config.panel.title}</h2>
        <p>${config.panel.subtitle}</p>
      </div>
      <div class="result-persona-copy">
        ${paragraphs}
      </div>
    </div>
    <div class="result-trait-bars">
      ${traitBars}
    </div>
  `;
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

  updatePlayerRiskResult();
  act3ExitProgress = ACT3_EXIT_SCROLL_CONFIG.maxProgress;
  isAct3ScrollExitEnabled = false;
  isAct3ExitAnimating = false;
  currentPhase = PHASES.RESULT_GALAXY_LOCATING;
  currentState = RESULT_STATES.GALAXY_LOCATING;
  createGalaxyLocatingLayer();

  if (RESULT_PLANET_ONLY_MODE) {
    currentPhase = PHASES.RESULT_GALAXY;
    currentState = RESULT_STATES.DIET_GALAXY;
  }

  console.log("Entered result_state_00_galaxy_locating", {
    playerChoices,
    playerRiskResult,
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
  updatePlayerRiskResult();
  hasResultRiskIntroStarted = false;
  resultRiskIntroStep = 0;
  resultRiskIntroWheelLocked = false;
  if (resultRiskIntroWheelLockTimer) {
    window.clearTimeout(resultRiskIntroWheelLockTimer);
    resultRiskIntroWheelLockTimer = null;
  }
  resultRiskLayer?.classList.remove("is-visible");
  resultGalaxyLayer?.classList.remove("is-hidden");
  if (resultGalaxyLayer) {
    renderResultDietGalaxyLayout(resultGalaxyLayer);
  }
  updateResultGalaxyProgress(1);
  console.log("Entered result_state_01_diet_galaxy", {
    playerChoices,
    playerRiskResult,
    act3ExitProgress
  });
}

function createGalaxyLocatingLayer() {
  cleanupGalaxyLocatingLayer();

  const config = RESULT_GALAXY_LOCATING_CONFIG;
  const layer = document.createElement("section");
  const field = document.createElement("div");
  const caption = RESULT_PLANET_ONLY_MODE ? null : document.createElement("div");
  const captionText = RESULT_PLANET_ONLY_MODE ? null : document.createElement("div");
  const captionMain = RESULT_PLANET_ONLY_MODE ? null : document.createElement("span");
  const captionDots = RESULT_PLANET_ONLY_MODE ? null : document.createElement("span");
  const captionParticleLayer = RESULT_PLANET_ONLY_MODE ? null : document.createElement("div");

  layer.id = config.stateId;
  layer.className = "result-galaxy-locating-layer";
  layer.classList.toggle("result-planet-only-layer", RESULT_PLANET_ONLY_MODE);
  layer.style.setProperty("--result-locating-bg", config.backgroundColor);
  layer.style.setProperty("--result-locating-field-width", `${config.fieldWidth}px`);
  layer.style.setProperty("--result-locating-field-height", `${config.fieldHeight}px`);
  layer.style.setProperty("--result-locating-particle-stroke-color", config.particleStrokeColor);
  layer.style.setProperty("--result-locating-particle-stroke-width", `${config.particleStrokeWidth}px`);
  layer.style.setProperty("--result-locating-caption-width", `${config.captionWidth}px`);
  layer.style.setProperty("--result-locating-caption-min-height", `${config.captionMinHeight}px`);
  layer.style.setProperty("--result-locating-caption-bottom", `${config.captionBottom}px`);
  layer.style.setProperty("--result-locating-caption-font-size", `${config.captionFontSize}px`);
  layer.style.setProperty("--result-locating-caption-x", `${config.captionX}px`);
  layer.style.setProperty("--result-galaxy-reveal-duration", `${config.revealDuration}ms`);
  layer.style.setProperty("--result-galaxy-collapse-scale", config.collapseScale);
  layer.style.setProperty("--result-galaxy-release-scale", config.releaseScale);
  layer.style.setProperty("--result-caption-reveal-bounce-duration", `${config.captionReveal.bounceDuration}ms`);
  layer.style.setProperty("--result-caption-particle-stroke-color", config.captionReveal.particleStrokeColor);
  layer.style.setProperty("--result-caption-particle-stroke-width", `${config.captionReveal.particleStrokeWidth}px`);
  layer.style.setProperty("--result-galaxy-enter-duration", `${config.resultGalaxyEnter.duration}ms`);
  layer.style.setProperty("--result-nebula-target-x", `${config.resultGalaxyEnter.nebula.targetX}px`);
  layer.style.setProperty("--result-nebula-target-y", `${config.resultGalaxyEnter.nebula.targetY}px`);
  layer.style.setProperty("--result-nebula-enter-scale", config.resultGalaxyEnter.nebula.scale);
  layer.style.setProperty("--result-nebula-enter-delay", `${config.resultGalaxyEnter.nebula.delay}ms`);
  layer.style.setProperty("--result-planet-enter-delay", `${config.resultGalaxyEnter.planet.delay}ms`);
  layer.style.setProperty("--result-planet-enter-scale", config.resultGalaxyEnter.planet.scale);
  layer.style.setProperty("--result-planet-target-x", `${config.resultGalaxyEnter.planet.targetX}px`);
  layer.style.setProperty("--result-planet-target-y", `${config.resultGalaxyEnter.planet.targetY}px`);

  field.className = "result-locating-field";
  if (!RESULT_PLANET_ONLY_MODE) {
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
  }
  layer.appendChild(field);
  if (caption) {
    layer.appendChild(caption);
  }
  objectLayer.appendChild(layer);

  galaxyLocatingLayer = layer;
  galaxyLocatingField = field;
  galaxyLocatingCaptionElement = caption;
  galaxyLocatingCaptionMainElement = captionMain;
  galaxyLocatingCaptionDotsElement = captionDots;
  galaxyLocatingCaptionParticleLayer = captionParticleLayer;
  resultGalaxyRevealStarted = false;
  hasResultGalaxyEnterStarted = false;
  if (!RESULT_PLANET_ONLY_MODE) {
    generateGalaxyParticles();
  }
  createGalaxyCenterPlanet();
  if (RESULT_PLANET_ONLY_MODE) {
    resultGalaxyRevealStarted = true;
    currentState = RESULT_STATES.DIET_GALAXY;
    window.requestAnimationFrame(() => {
      document.getElementById("result-galaxy-center-planet")?.classList.add("is-visible");
    });
  } else {
    bindGalaxyLocatingParallax();
    startGalaxyLocatingCaptionDots();
    scheduleGalaxyLocatingReveal();
  }

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

function handleResultGalaxyLocatingWheel(event) {
  if (
    currentPhase !== PHASES.RESULT_GALAXY_LOCATING ||
    hasResultGalaxyEnterStarted ||
    event.deltaY <= 0
  ) {
    return;
  }

  event.preventDefault();
  startResultGalaxyEnterTransition();
}

function handleResultGalaxyWheel(event) {
  if (
    currentPhase !== PHASES.RESULT_GALAXY ||
    event.deltaY <= 0
  ) {
    return;
  }

  // The diet galaxy screen is the final in-flow result screen.
  // Further result details stay available only through the debug overlay.
  event.preventDefault();
}

function handleResultRiskIntroWheel(event) {
  if (
    currentPhase !== PHASES.RESULT_RISK_INTRO ||
    resultRiskIntroWheelLocked ||
    event.deltaY <= 0
  ) {
    return;
  }

  event.preventDefault();
  advanceResultRiskIntroStage();
}

function startResultGalaxyEnterTransition() {
  if (!galaxyLocatingLayer || hasResultGalaxyEnterStarted) {
    return;
  }

  const config = RESULT_GALAXY_LOCATING_CONFIG.resultGalaxyEnter;
  const completeDelay = config.duration + Math.max(config.nebula.delay, config.planet.delay);

  hasResultGalaxyEnterStarted = true;
  galaxyLocatingLayer.classList.add("is-entering-result");
  ensureResultGalaxyLayer();

  if (resultGalaxyEnterTimer) {
    window.clearTimeout(resultGalaxyEnterTimer);
  }

  resultGalaxyEnterTimer = window.setTimeout(() => {
    completeResultGalaxyEnterTransition();
  }, completeDelay);
}

function completeResultGalaxyEnterTransition() {
  currentPhase = PHASES.RESULT_GALAXY;
  currentState = RESULT_STATES.DIET_GALAXY;
  updatePlayerRiskResult();
  isAct3ScrollExitEnabled = false;
  isAct3ExitAnimating = false;
  act3ExitProgress = ACT3_EXIT_SCROLL_CONFIG.maxProgress;
  hasResultRiskIntroStarted = false;
  resultRiskIntroStep = 0;
  resultRiskIntroWheelLocked = false;
  if (resultRiskIntroWheelLockTimer) {
    window.clearTimeout(resultRiskIntroWheelLockTimer);
    resultRiskIntroWheelLockTimer = null;
  }
  resultRiskLayer?.classList.remove("is-visible");
  resultGalaxyLayer?.classList.remove("is-hidden");
  if (resultGalaxyLayer) {
    renderResultDietGalaxyLayout(resultGalaxyLayer);
  }
  updateResultGalaxyProgress(1);
  console.log("Entered result_state_01_diet_galaxy", {
    playerChoices,
    playerRiskResult,
    act3ExitProgress,
    preservedGalaxyLocatingLayer: Boolean(galaxyLocatingLayer)
  });
}

function enterResultRiskIntroState() {
  if (currentPhase === PHASES.RESULT_RISK_INTRO) {
    return;
  }

  hasResultRiskIntroStarted = true;
  resultRiskIntroStep = 0;
  resultRiskIntroWheelLocked = false;
  if (resultRiskIntroWheelLockTimer) {
    window.clearTimeout(resultRiskIntroWheelLockTimer);
    resultRiskIntroWheelLockTimer = null;
  }
  currentPhase = PHASES.RESULT_RISK_INTRO;
  currentState = RESULT_STATES.RISK_INTRO;
  updatePlayerRiskResult();
  renderResultRiskIntroLayout(ensureResultRiskLayer());
  ensureResultRiskLayer().classList.add("is-visible");
  resultGalaxyLayer?.classList.add("is-hidden");
  console.log("Entered result_state_02_risk_intro", {
    playerChoices,
    playerRiskResult,
    preservedResultGalaxyLayer: Boolean(resultGalaxyLayer)
  });
}

function advanceResultRiskIntroStage() {
  const config = RESULT_GALAXY_LOCATING_CONFIG.resultDietGalaxy.riskIntro;
  const layer = ensureResultRiskLayer();
  const shapeCount = config.shapes?.length || 0;
  const maxStep = shapeCount + 3;

  if (!layer || resultRiskIntroStep >= maxStep) {
    return;
  }

  resultRiskIntroWheelLocked = true;

  if (resultRiskIntroWheelLockTimer) {
    window.clearTimeout(resultRiskIntroWheelLockTimer);
  }

  if (resultRiskIntroStep === 0) {
    layer.querySelector(".result-risk-prompt")?.classList.add("is-visible");
  } else if (resultRiskIntroStep <= shapeCount) {
    const shapeIndex = resultRiskIntroStep - 1;
    const shapeElement = layer.querySelector(`[data-risk-shape-index="${shapeIndex}"]`);
    const textElement = layer.querySelector(`[data-risk-text-index="${shapeIndex}"]`);

    shapeElement?.classList.add("is-dissolving");
    textElement?.classList.add("is-visible");

    window.setTimeout(() => {
      shapeElement?.classList.add("is-hidden");
    }, config.dissolveDuration);
  } else if (resultRiskIntroStep === shapeCount + 1) {
    layer.querySelector(".result-risk-prompt")?.classList.add("is-fading-out");
    layer.querySelectorAll(".result-risk-text-block.is-visible").forEach((element) => {
      element.classList.add("is-fading-out");
    });
    layer.querySelector(".result-risk-center-copy")?.classList.add("is-visible");
  } else {
    layer.querySelector(".result-risk-center-copy")?.classList.add("is-fading-out");
    const transitionDuration = startResultRiskTransition(layer, config);
    window.setTimeout(() => {
      layer.querySelector(".result-risk-score-block")?.classList.add("is-visible");
    }, transitionDuration);
  }

  resultRiskIntroStep += 1;
  const lockDuration =
    resultRiskIntroStep > shapeCount + 1
      ? Math.max(
          config.scrollLockDuration,
          (config.transitionParticles?.enterDuration || 920) +
          (config.transitionParticles?.holdDuration || 340) +
          (config.transitionParticles?.exitDuration || 880)
        )
      : config.scrollLockDuration;
  resultRiskIntroWheelLockTimer = window.setTimeout(() => {
    resultRiskIntroWheelLocked = false;
    resultRiskIntroWheelLockTimer = null;
  }, lockDuration);
}

function revealGalaxyLocatingCaption() {
  if (!galaxyLocatingCaptionElement) {
    return;
  }

  if (galaxyLocatingCaptionDotsTimer) {
    window.clearInterval(galaxyLocatingCaptionDotsTimer);
    galaxyLocatingCaptionDotsTimer = null;
  }

  if (galaxyLocatingCaptionDotsElement) {
    galaxyLocatingCaptionDotsElement.textContent = "";
  }

  galaxyLocatingCaptionElement.classList.add("is-hidden-after-reveal");
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
  const planetBody = document.createElement("div");
  const image = document.createElement("img");
  const dynamicPlanetSvg = createResultPlanetSvgFromRiskResult(getPlayerRiskResult());

  planet.id = "result-galaxy-center-planet";
  planet.className = "result-galaxy-center-planet";
  planetBody.className = "result-galaxy-center-planet-body";
  planet.style.width = `${config.size}px`;
  planet.style.height = `${config.size}px`;
  planet.style.left = `calc(50% + ${config.x}px)`;
  planet.style.top = `calc(50% + ${config.y}px)`;
  planet.style.zIndex = `${config.zIndex}`;
  planet.style.setProperty("--result-center-planet-base-x", `${config.x}px`);
  planet.style.setProperty("--result-center-planet-base-y", `${config.y}px`);
  planet.style.setProperty("--result-center-planet-color", config.fallbackColor);
  planet.style.setProperty("--result-center-planet-stroke-color", config.strokeColor);
  planet.style.setProperty("--result-center-planet-stroke-width", `${config.strokeWidth}px`);
  planet.style.setProperty("--result-center-planet-float-amplitude", `${config.floatAmplitude}px`);
  planet.style.setProperty("--result-center-planet-float-duration", `${config.floatDuration}ms`);
  planet.style.setProperty("--result-center-planet-parallax-x", "0px");
  planet.style.setProperty("--result-center-planet-parallax-y", "0px");

  if (dynamicPlanetSvg) {
    planet.classList.add("has-dynamic-planet");
    planetBody.appendChild(dynamicPlanetSvg);
  } else if (config.image) {
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
    planetBody.appendChild(image);

    if (image.decode) {
      image.decode().catch(() => {});
    }
  }

  planet.appendChild(planetBody);
  galaxyLocatingField.appendChild(planet);
}

function createResultPlanetSvgFromRiskResult(riskResult) {
  const metrics = buildResultPlanetMetrics(riskResult);

  return createResultPlanetSvg(metrics);
}

function buildResultPlanetMetrics(riskResult = getPlayerRiskResult()) {
  const dimensions = riskResult?.dimensions || {};
  const rhythmRisk = dimensions.rhythm?.riskIndex ?? 50;

  return {
    risk: clampPlanetMetric(riskResult?.totalRiskIndex ?? 50),
    sensory: clampPlanetMetric(dimensions.sensory?.riskIndex ?? 50),
    // Planet editor uses 0 = D/gravel and 100 = O/smooth, while risk rhythm
    // grows toward D, so this axis is intentionally inverted.
    rhythm: clampPlanetMetric(100 - rhythmRisk),
    specificity: clampPlanetMetric(dimensions.specificity?.riskIndex ?? 50),
    danger: clampPlanetMetric(dimensions.danger?.riskIndex ?? 0),
    crackSize: 100,
    patternDensity: 8,
    strokeWidth: 2.5
  };
}

function clampPlanetMetric(value) {
  return Math.max(0, Math.min(100, Number(value) || 0));
}

function createResultPlanetSvg(metrics) {
  const svgNs = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNs, "svg");
  const defs = document.createElementNS(svgNs, "defs");
  const clipPath = document.createElementNS(svgNs, "clipPath");
  const clipCircle = document.createElementNS(svgNs, "circle");
  const gradient = document.createElementNS(svgNs, "linearGradient");
  const gradientId = `result-planet-gradient-${Date.now().toString(36)}`;
  const clipId = `result-planet-clip-${Date.now().toString(36)}`;
  const cx = 250;
  const cy = 250;
  const planetRadius = 100;
  const colors = getResultPlanetGradientColors(metrics.risk);
  const backRing = document.createElementNS(svgNs, "g");
  const frontRing = document.createElementNS(svgNs, "g");
  const bodyClipGroup = document.createElementNS(svgNs, "g");
  const decorationClipGroup = document.createElementNS(svgNs, "g");

  svg.classList.add("result-galaxy-dynamic-planet-svg");
  svg.setAttribute("viewBox", "0 0 500 500");
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");

  clipPath.setAttribute("id", clipId);
  setSvgAttrs(clipCircle, {
    cx,
    cy,
    r: planetRadius
  });
  clipPath.appendChild(clipCircle);

  setSvgAttrs(gradient, {
    id: gradientId,
    x1: "0",
    y1: "0",
    x2: "0.1",
    y2: "1"
  });
  [
    ["0%", colors.top],
    ["50%", colors.mid],
    ["100%", colors.bottom]
  ].forEach(([offset, stopColor]) => {
    const stop = document.createElementNS(svgNs, "stop");
    stop.setAttribute("offset", offset);
    stop.setAttribute("stop-color", stopColor);
    gradient.appendChild(stop);
  });

  defs.appendChild(clipPath);
  defs.appendChild(gradient);
  svg.appendChild(defs);

  splitResultPlanetRingDots(metrics).back.forEach((dot) => {
    backRing.appendChild(createResultPlanetRingDot(dot, colors.mid));
  });
  svg.appendChild(backRing);

  createResultPlanetSensoryOutlines(metrics).forEach((outline) => {
    svg.appendChild(outline);
  });

  bodyClipGroup.setAttribute("clip-path", `url(#${clipId})`);
  bodyClipGroup.appendChild(createSvgElement("circle", {
    cx,
    cy,
    r: planetRadius,
    fill: `url(#${gradientId})`
  }));
  svg.appendChild(bodyClipGroup);

  createResultPlanetRotatingGapPaths().forEach((gap) => {
    svg.appendChild(gap);
  });

  decorationClipGroup.setAttribute("clip-path", `url(#${clipId})`);
  createResultPlanetDecorations(metrics).forEach((decoration) => {
    decorationClipGroup.appendChild(decoration);
  });
  svg.appendChild(decorationClipGroup);

  svg.appendChild(createSvgElement("circle", {
    cx,
    cy,
    r: planetRadius,
    fill: "none",
    stroke: "#000000",
    "stroke-width": 3.5 * (metrics.strokeWidth / 2.5)
  }));

  const crack = createResultPlanetDangerCrack(metrics);
  if (crack) {
    svg.appendChild(crack);
  }

  splitResultPlanetRingDots(metrics).front.forEach((dot) => {
    frontRing.appendChild(createResultPlanetRingDot(dot, colors.mid));
  });
  svg.appendChild(frontRing);

  return svg;
}

function createSvgElement(tagName, attrs = {}) {
  const element = document.createElementNS("http://www.w3.org/2000/svg", tagName);

  setSvgAttrs(element, attrs);

  return element;
}

function setSvgAttrs(element, attrs = {}) {
  Object.entries(attrs).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      element.setAttribute(key, String(value));
    }
  });
}

function getResultPlanetColor(risk) {
  if (risk <= 33) {
    return "#74D188";
  }

  if (risk <= 66) {
    return interpolateHexColor("#74D188", "#FFC1DF", (risk - 33) / 33);
  }

  return interpolateHexColor("#FFC1DF", "#FF4800", (risk - 66) / 34);
}

function getResultPlanetGradientColors(risk) {
  const spread = 28 * Math.sin((risk / 100) * Math.PI);

  return {
    top: getResultPlanetColor(Math.min(100, risk + spread)),
    mid: getResultPlanetColor(risk),
    bottom: getResultPlanetColor(Math.max(0, risk - spread))
  };
}

function interpolateHexColor(startHex, endHex, amount) {
  const start = hexToRgbTriplet(startHex);
  const end = hexToRgbTriplet(endHex);

  return rgbTripletToHex(
    start[0] + (end[0] - start[0]) * amount,
    start[1] + (end[1] - start[1]) * amount,
    start[2] + (end[2] - start[2]) * amount
  );
}

function hexToRgbTriplet(hex) {
  const numeric = parseInt(hex.slice(1), 16);

  return [
    (numeric >> 16) & 255,
    (numeric >> 8) & 255,
    numeric & 255
  ];
}

function rgbTripletToHex(red, green, blue) {
  return `#${
    [red, green, blue]
      .map((value) => Math.round(value).toString(16).padStart(2, "0"))
      .join("")
  }`;
}

function createResultPlanetSensoryOutlines(metrics) {
  const cx = 250;
  const cy = 250;
  const sensoryFactor = metrics.sensory / 100;
  const layers = [
    { radius: 145, phase: 0 },
    { radius: 128, phase: 1.2 },
    { radius: 112, phase: 2.4 }
  ];

  return layers.map((layer, layerIndex) => {
    const points = [];
    const pointCount = 64;

    for (let index = 0; index < pointCount; index += 1) {
      const theta = (index * 2 * Math.PI) / pointCount;
      const degrees = (index * 360) / pointCount;
      const circleRadius =
        layer.radius +
        Math.sin((degrees * 3 * Math.PI) / 180) * 3 +
        Math.cos((degrees * 5 * Math.PI) / 180) * 2;
      const teethCount = 10;
      const thetaScaled = theta * teethCount;
      const toothValue = Math.abs((thetaScaled % (2 * Math.PI)) - Math.PI) / Math.PI;
      const spikeRadius =
        layer.radius +
        Math.pow(toothValue, 3.2) * 52 -
        10 +
        Math.sin((degrees * 13 * Math.PI) / 180) * 5;
      const jitter = Math.sin(index * 2.13 + layer.phase + layerIndex) * 0.8;
      const finalRadius = (1 - sensoryFactor) * circleRadius + sensoryFactor * spikeRadius + jitter;

      points.push([
        cx + finalRadius * Math.cos(theta),
        cy + finalRadius * Math.sin(theta)
      ]);
    }

    return createSvgElement("path", {
      d: `M ${points[0][0]},${points[0][1]} ${points
        .slice(1)
        .map((point) => `L ${point[0]},${point[1]}`)
        .join(" ")} Z`,
      fill: "#FFFFFF",
      stroke: "#000000",
      "stroke-width": metrics.strokeWidth,
      "stroke-linejoin": "round"
    });
  });
}

function splitResultPlanetRingDots(metrics) {
  const back = [];
  const front = [];
  const rhythmFactor = metrics.rhythm / 100;
  const count = 75;
  const cx = 250;
  const cy = 250;
  const rx = 215;
  const ry = 42;
  const rotation = (-14 * Math.PI) / 180;
  const cosRotation = Math.cos(rotation);
  const sinRotation = Math.sin(rotation);

  for (let index = 0; index < count; index += 1) {
    const angleDeg = (index * 360) / count;
    const angle = (angleDeg * Math.PI) / 180;
    const sizeMultiplier = 0.6 + deterministicNoise(index, 7) * 0.8;
    const orbitRadiusOffset = -12 + deterministicNoise(index, 13) * 24;
    const actualOffset = orbitRadiusOffset * (1 - rhythmFactor);
    const localX = rx * Math.cos(angle) + actualOffset * Math.cos(angle);
    const localY = ry * Math.sin(angle) + actualOffset * Math.sin(angle);
    const radius =
      (1 - rhythmFactor) * (sizeMultiplier * 4.2) +
      rhythmFactor * 16.5;
    const dot = {
      cx: localX * cosRotation - localY * sinRotation + cx,
      cy: localX * sinRotation + localY * cosRotation + cy + 20,
      r: Math.max(1.5, radius)
    };

    if (angleDeg >= 180 && angleDeg < 360) {
      back.push(dot);
    } else {
      front.push(dot);
    }
  }

  return { back, front };
}

function createResultPlanetRingDot(dot, color) {
  const group = createSvgElement("g");

  group.appendChild(createSvgElement("circle", {
    cx: dot.cx,
    cy: dot.cy,
    r: dot.r + 1.6,
    fill: "#000000",
    stroke: "#000000",
    "stroke-width": 1
  }));
  group.appendChild(createSvgElement("circle", {
    cx: dot.cx,
    cy: dot.cy,
    r: Math.max(1, dot.r - 0.5),
    fill: color
  }));

  return group;
}

function createResultPlanetDecorations(metrics) {
  const decorations = [];
  const density = Math.max(2, Math.min(24, metrics.patternDensity || 8));
  const latitudes = [25, -25];
  const isKEnd = metrics.specificity >= 50;

  latitudes.forEach((latitude, ringIndex) => {
    for (let index = 0; index < density; index += 1) {
      const id = ringIndex * density + index;
      const longitude = (index * 360) / density + (-12 + ((index * 17 + latitude * 3) % 25));
      const longitudeRad = (longitude * Math.PI) / 180;
      const latitudeRad = (latitude * Math.PI) / 180;
      const radius = 92;
      const x3d = radius * Math.cos(latitudeRad) * Math.sin(longitudeRad);
      const y3d = radius * Math.sin(latitudeRad);
      const z3d = radius * Math.cos(latitudeRad) * Math.cos(longitudeRad);

      if (z3d < 0) {
        continue;
      }

      const tilt = (-10 * Math.PI) / 180;
      const x = x3d * Math.cos(tilt) - y3d * Math.sin(tilt) + 250;
      const y = x3d * Math.sin(tilt) + y3d * Math.cos(tilt) + 250;
      const isEven = id % 2 === 0;

      decorations.push(
        isKEnd
          ? createResultPlanetKDecoration(x, y, isEven, metrics)
          : createResultPlanetCDecoration(x, y, isEven, metrics)
      );
    }
  });

  return decorations;
}

function createResultPlanetCDecoration(x, y, isWave, metrics) {
  const group = createSvgElement("g", {
    transform: `translate(${x}, ${y}) scale(0.95)`
  });

  if (isWave) {
    group.appendChild(createSvgElement("path", {
      d: "M -15,0 C -10,-8 -5,-8 0,0 C 5,8 10,8 15,0 L 12,6 C 8,12 3,12 -2,4 C -7,-4 -11,-4 -15,0 Z",
      fill: "#78C0FF",
      stroke: "#000000",
      "stroke-width": 1.8 * (metrics.strokeWidth / 2.5),
      "stroke-linejoin": "round"
    }));
  } else {
    group.appendChild(createSvgElement("circle", {
      cx: 0,
      cy: 0,
      r: 7.5,
      fill: "#FFC1DF",
      stroke: "#000000",
      "stroke-width": 1.8 * (metrics.strokeWidth / 2.5)
    }));
  }

  return group;
}

function createResultPlanetKDecoration(x, y, isChili, metrics) {
  const group = createSvgElement("g", {
    transform: `translate(${x}, ${y}) scale(0.95)`
  });

  if (isChili) {
    group.appendChild(createSvgElement("path", {
      d: "M -4,-11 C -4,-11 0,-14 3,-12 C 6,-10 9,-6 8,-1 C 7,5 2,11 -6,14 C -2,8 -2,2 -3,-2 C -4,-6 -5,-9 -4,-11 Z",
      fill: "#FF9000",
      stroke: "#000000",
      "stroke-width": 1.8 * (metrics.strokeWidth / 2.5),
      "stroke-linejoin": "round"
    }));
  } else {
    [-4, 4, 0].forEach((dotX, index) => {
      group.appendChild(createSvgElement("circle", {
        cx: dotX,
        cy: index === 2 ? 4 : -3,
        r: 3.2,
        fill: "#7E0001",
        stroke: "#000000",
        "stroke-width": 1.5 * (metrics.strokeWidth / 2.5)
      }));
    });
  }

  return group;
}

function createResultPlanetDangerCrack(metrics) {
  if (metrics.danger < 50) {
    return null;
  }

  return createSvgElement("path", {
    d: "M 12,-22 L -14,-1 L -5,3 L -28,26 L -12,28 L -24,48 L -4,32 L -10,30 L 7,12 L -1,9 Z",
    fill: "#FFFFFF",
    stroke: "#000000",
    "stroke-width": 2.2 * (metrics.strokeWidth / 2.5),
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    transform: `translate(292, 208) rotate(12) scale(${(metrics.crackSize || 100) / 100})`
  });
}

function createResultPlanetRotatingGapPaths() {
  return [
    createResultPlanetGapPath(135, -55, 45, 20, 14),
    createResultPlanetGapPath(275, 12, 62, 10, 5),
    createResultPlanetGapPath(40, -65, -18, 10, 5)
  ].flat();
}

function createResultPlanetGapPath(baseLongitude, startLatitude, endLatitude, outerWidth, innerWidth) {
  const path = getResultPlanetProjectedPath(baseLongitude, startLatitude, endLatitude, 95);

  if (!path) {
    return [];
  }

  return [
    createSvgElement("path", {
      d: path,
      fill: "none",
      stroke: "#000000",
      "stroke-width": outerWidth,
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    }),
    createSvgElement("path", {
      d: path,
      fill: "none",
      stroke: "#FCF0D9",
      "stroke-width": innerWidth,
      "stroke-linecap": "round",
      "stroke-linejoin": "round"
    })
  ];
}

function getResultPlanetProjectedPath(baseLongitude, startLatitude, endLatitude, radius) {
  const points = [];
  const stepCount = 18;
  const longitudeRad = (baseLongitude * Math.PI) / 180;
  const tilt = (-10 * Math.PI) / 180;

  for (let index = 0; index <= stepCount; index += 1) {
    const latitude = startLatitude + (endLatitude - startLatitude) * (index / stepCount);
    const latitudeRad = (latitude * Math.PI) / 180;
    const x3d = radius * Math.cos(latitudeRad) * Math.sin(longitudeRad);
    const y3d = radius * Math.sin(latitudeRad);
    const z3d = radius * Math.cos(latitudeRad) * Math.cos(longitudeRad);

    if (z3d >= -2) {
      points.push([
        x3d * Math.cos(tilt) - y3d * Math.sin(tilt) + 250,
        x3d * Math.sin(tilt) + y3d * Math.cos(tilt) + 250
      ]);
    }
  }

  if (points.length < 2) {
    return "";
  }

  return `M ${points[0][0]},${points[0][1]} ${points
    .slice(1)
    .map((point) => `L ${point[0]},${point[1]}`)
    .join(" ")}`;
}

function deterministicNoise(seed, salt = 1) {
  const value = Math.sin(seed * 12.9898 + salt * 78.233) * 43758.5453123;

  return value - Math.floor(value);
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

  if (resultGalaxyEnterTimer) {
    window.clearTimeout(resultGalaxyEnterTimer);
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
  resultGalaxyEnterTimer = null;
  hasResultGalaxyEnterStarted = false;
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
  const hoverInfo = getHoverInfo(objectId);

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

function getHoverInfo(objectId) {
  const act1Choice = getAct1BreakfastChoice(objectId);

  if (act1Choice) {
    return {
      title: act1Choice.label || act1Choice.name,
      body: act1Choice.hoverText || ""
    };
  }

  const act2Choice = getAct2LunchChoice(objectId);

  if (act2Choice) {
    return {
      title: act2Choice.label || act2Choice.name,
      body: act2Choice.hoverText || ""
    };
  }

  return ACT3_HOVER_INFO[objectId];
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
  const hoverInfo = getHoverInfo(objectId);
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

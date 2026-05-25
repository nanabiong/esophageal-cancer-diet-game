const act3Files = {
  choices: "data/act3-choices.json",
  layouts: "data/layouts-act3.json"
};

const ACT3_STATES = {
  TITLE: "act3_state_00_title",
  FOOD_CHOICE: "act3_state_01_food_choice",
  DRINK_CHOICE: "act3_state_02_drink_choice"
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

let act3Choices = null;
let act3Layouts = null;
let currentState = null;
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
let objectLayer = null;
let transitionDuration = 900;
let isFoodChoiceLocked = false;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadAct3Data();
    setupStageScale();
    updateStageHeader("第三幕低保真原型", "夜晚——聚会与火锅");
    initializeStage();
    startAct3Intro();
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
  transitionDuration = act3Layouts.defaults?.duration || transitionDuration;
  console.log("Act 3 数据读取完成：", { act3Choices, act3Layouts });
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
  frame.addEventListener("click", handleStageClick);
  frame.addEventListener("wheel", handleIntroWheel, { passive: false });
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
  isIntroActive = true;
  introStep = 0;
  currentState = "act3_intro_00_bubble_1";
  showIntroBubble("act3_intro_bubble_1");
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
  element.style.opacity = objectConfig.opacity ?? 1;
  element.style.zIndex = objectConfig.zIndex ?? 1;
  element.style.transformOrigin = objectConfig.transformOrigin || "left top";
  element.style.transform = `scale(${objectConfig.scale ?? 1})`;

  if (options.exiting) {
    element.dataset.exiting = "true";
  }

  if (options.immediate) {
    element.offsetHeight;
    element.classList.remove("no-transition");
  }
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

function setupStateInteractions(stateId) {
  if (stateId === ACT3_STATES.FOOD_CHOICE) {
    isFoodChoiceLocked = false;
    selectedFoods = [];
    showFoodGuidance();
  }

  if (stateId === ACT3_STATES.DRINK_CHOICE) {
    isFoodChoiceLocked = true;
    lockFoodDragSources();
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

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
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

  window.setTimeout(() => {
    otherCup.classList.remove("cheers-left");
    selectedDrinkElement.classList.remove("cheers-right");
    cheersZone.classList.remove("is-cheering");
    spark.remove();
  }, 820);
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

const act3Files = {
  choices: "data/act3-choices.json",
  layouts: "data/layouts-act3.json"
};

const ACT3_STATES = {
  TITLE_INTRO: "act3_state_00_title_intro",
  FOOD_CHOICE: "act3_state_01_food_choice",
  FOOD_AFTER_SELECT: "act3_state_02_food_choice_after_select",
  CHEERS_ENTER: "act3_state_03_cheers_frame_enter",
  DRINK_CHOICE: "act3_state_04_drink_choice",
  COMPLETE: "act3_state_05_complete"
};

let act3Choices = null;
let act3Layouts = null;
let currentState = null;
let isTransitioning = false;
let isStateLocked = false;
let dragPayload = null;
let selectedFoods = [];
let playerChoices = [];
let bubbleTimers = [];
let objectLayer = null;
let transitionDuration = 900;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadAct3Data();
    updateStageHeader("第三幕低保真原型", "夜晚——聚会与火锅");
    initializeStage();
    applyState(ACT3_STATES.TITLE_INTRO, { animate: true });
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

function updateStageHeader(label, title) {
  const labelElement = document.querySelector(".prototype-label");
  const titleElement = document.querySelector(".stage-ui h1");

  if (labelElement) {
    labelElement.textContent = label;
  }

  if (titleElement) {
    titleElement.textContent = title;
  }
}

function initializeStage() {
  const frameTrack = document.getElementById("frameTrack");
  const frame = document.createElement("section");

  frame.className = "scene-frame active act3-frame";
  frame.dataset.state = "act3_object_stage";
  objectLayer = document.createElement("div");
  objectLayer.className = "act3-object-layer";
  frame.appendChild(objectLayer);
  frame.addEventListener("click", handleStageClick);
  frameTrack.innerHTML = "";
  frameTrack.appendChild(frame);
}

function showLoadError(error) {
  const frameTrack = document.getElementById("frameTrack");
  const frame = document.createElement("section");

  frame.className = "scene-frame active act3-frame";
  frame.innerHTML = `
    <div class="act3-error-panel">
      <h2>数据读取失败</h2>
      <p>${error.message}</p>
      <p>请确认使用本地服务器打开页面，而不是直接双击 HTML 文件。</p>
    </div>
  `;
  frameTrack.innerHTML = "";
  frameTrack.appendChild(frame);
  console.error(error);
}

function handleStageClick(event) {
  if (
    currentState !== ACT3_STATES.TITLE_INTRO ||
    isStateLocked ||
    isTransitioning ||
    event.target.closest(".act3-scene-object")
  ) {
    return;
  }

  transitionToState(ACT3_STATES.FOOD_CHOICE);
}

function applyState(stateId, options = {}) {
  const state = getStateConfig(stateId);
  const targetObjects = state.objects || {};

  currentState = stateId;
  clearBubbleTimers();

  Object.entries(targetObjects).forEach(([objectId, objectConfig]) => {
    let element = getObjectElement(objectId);

    if (!element) {
      element = createObjectElement(objectId, objectConfig);
      objectLayer.appendChild(element);
      updateObjectContent(element, objectId, objectConfig);

      if (options.animate && objectConfig.enterFrom) {
        updateObjectLayout(element, getEnterLayout(objectConfig), { immediate: true });
        requestAnimationFrame(() => {
          updateObjectLayout(element, objectConfig);
        });
        return;
      }
    } else {
      updateObjectContent(element, objectId, objectConfig);
    }

    updateObjectLayout(element, objectConfig, { immediate: !options.animate });
  });

  [...objectLayer.querySelectorAll(".act3-scene-object")].forEach((element) => {
    if (targetObjects[element.dataset.objectId]) {
      return;
    }

    if (options.animate) {
      updateObjectLayout(element, getExitLayout(element, state), { exiting: true });
      element.classList.add("is-exiting");
    } else {
      element.remove();
    }
  });

  window.setTimeout(() => {
    cleanupExitedObjects();
    setupStateInteractions(stateId);
  }, options.animate ? transitionDuration : 0);
}

function transitionToState(nextStateId) {
  if (isTransitioning) {
    return;
  }

  isTransitioning = true;
  isStateLocked = true;
  setButtonsDisabled(true);
  applyState(nextStateId, { animate: true });

  window.setTimeout(() => {
    isTransitioning = false;
    isStateLocked = false;
    setButtonsDisabled(false);
    handleStateEntered(nextStateId);
  }, transitionDuration);
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
  element.dataset.objectType = objectConfig.type;

  if (objectConfig.type === "titleFrame") {
    element.innerHTML = objectConfig.content || "";
  }

  if (objectConfig.type === "bubble") {
    element.textContent = objectConfig.content || "";
  }

  if (objectConfig.type === "hotpotTable") {
    element.innerHTML = `
      <div class="act3-table-surface">
        <span class="act3-table-title">act3_s01_main_hotpotTable</span>
        <span class="act3-table-note">低保真占位画框</span>
      </div>
    `;
  }

  if (objectConfig.type === "foodTarget") {
    const target = act3Choices.foodTargets.find((item) => item.id === objectId);

    element.dataset.targetId = target.id;
    element.dataset.targetName = target.name;
    element.innerHTML = `
      <strong>${target.name}</strong>
      <span class="act3-pot-counter">${getPotCount(target.id)} 个菜</span>
    `;
    bindDropTarget(element, "food");
  }

  if (objectConfig.type === "food") {
    const food = act3Choices.foods.find((item) => item.id === objectId);

    element.dataset.type = "food";
    element.dataset.id = food.id;
    element.textContent = food.name;
    element.draggable = !element.classList.contains("is-selected");
    bindDragSource(element, "food", food.id);
  }

  if (objectConfig.type === "cheersZone") {
    element.textContent = "act3_s02_targetzone_cheers";
  }

  if (objectConfig.type === "cup") {
    element.textContent = objectConfig.content || "朋友的杯子";
  }

  if (objectConfig.type === "drinkTarget") {
    element.dataset.targetId = "act3_s02_target_emptyCup";
    element.dataset.targetName = act3Choices.drinkTarget.name;
    element.textContent = objectConfig.content || "空杯位置";
    bindDropTarget(element, "drink");
  }

  if (objectConfig.type === "drinkTable") {
    element.innerHTML = "<strong>饮品列表</strong>";
  }

  if (objectConfig.type === "drink") {
    const drink = act3Choices.drinks.find((item) => item.id === objectId);

    element.dataset.type = "drink";
    element.dataset.id = drink.id;
    element.textContent = drink.name;
    element.draggable = !element.classList.contains("is-selected");
    bindDragSource(element, "drink", drink.id);
  }

  if (objectConfig.type === "complete") {
    element.innerHTML = `
      <p class="act3-kicker">Act 3 Complete</p>
      <h2>第三幕完成</h2>
      <p>进入下一幕占位。请打开控制台查看完整 playerChoices。</p>
      <pre class="act3-debug-output">${JSON.stringify(playerChoices, null, 2)}</pre>
    `;
  }
}

function updateObjectLayout(element, objectConfig, options = {}) {
  const stage = act3Layouts.stage;

  if (options.immediate) {
    element.classList.add("no-transition");
  } else {
    element.classList.remove("no-transition");
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

function getEnterLayout(objectConfig) {
  const stage = act3Layouts.stage;
  const layout = { ...objectConfig };

  if (objectConfig.enterFrom === "enterFromBottom") {
    layout.y = stage.height + 100;
    layout.opacity = 1;
  }

  if (objectConfig.enterFrom === "enterFromTop") {
    layout.y = -objectConfig.height - 100;
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
    selectedFoods = [];
    startTitleBubbles();
  }

  if (stateId === ACT3_STATES.COMPLETE) {
    console.log("Act 3 playerChoices：", playerChoices);
  }
}

function handleStateEntered(stateId) {
  if (stateId === ACT3_STATES.FOOD_AFTER_SELECT) {
    window.setTimeout(() => {
      transitionToState(ACT3_STATES.CHEERS_ENTER);
    }, 620);
  }

  if (stateId === ACT3_STATES.CHEERS_ENTER) {
    window.setTimeout(() => {
      transitionToState(ACT3_STATES.DRINK_CHOICE);
    }, 980);
  }
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

function bindDragSource(element, type, id) {
  if (element.dataset.dragBound === "true") {
    return;
  }

  element.dataset.dragBound = "true";
  element.addEventListener("dragstart", (event) => {
    if (isStateLocked || element.classList.contains("is-selected")) {
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
  foodButton.classList.add("is-selected");
  foodButton.draggable = false;
  foodButton.textContent = `${food.name} → ${target.name}`;
  targetElement.classList.add("has-drop");
  targetElement.querySelector(".act3-pot-counter").textContent = `${getPotCount(target.id)} 个菜`;

  console.log("Act 3 食物拖入：", selectedFood);

  if (selectedFoods.length >= 3) {
    isStateLocked = true;
    recordAct3FoodChoice();
    window.setTimeout(() => {
      transitionToState(ACT3_STATES.FOOD_AFTER_SELECT);
    }, 520);
  }
}

function handleDrinkDrop(targetElement) {
  const drink = act3Choices.drinks.find((item) => item.id === dragPayload.id);
  const drinkButton = getObjectElement(drink.id);

  if (!drink || !drinkButton) {
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
  playerChoices.push(choice);
  targetElement.classList.add("filled");
  targetElement.textContent = `${drink.name} 碰杯`;
  drinkButton.classList.add("is-selected");
  drinkButton.draggable = false;
  console.log("Act 3 饮品选择：", choice);
  console.log("Act 3 playerChoices：", playerChoices);

  window.setTimeout(() => {
    transitionToState(ACT3_STATES.COMPLETE);
  }, 620);
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

const dataFiles = {
  food: "data/food.json",
  scene: "data/scene.json",
  risk: "data/risk.json",
  persona: "data/persona.json",
  uiConfig: "data/ui-config.json",
  act1: "data/act1.json"
};

let gameData = null;
let activeAct = null;
let actState = {
  actId: null,
  sceneId: null,
  sceneIndex: 0,
  step: "idle"
};
let playerChoices = [];

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("startButton").addEventListener("click", () => {
    startAct("act1");
  });

  document.getElementById("restartActButton").addEventListener("click", () => {
    startAct("act1");
  });

  loadGameData();
});

async function loadGameData() {
  try {
    const entries = await Promise.all(
      Object.entries(dataFiles).map(async ([key, path]) => {
        const response = await fetch(path);

        if (!response.ok) {
          throw new Error(`${path} 读取失败，状态码：${response.status}`);
        }

        const data = await response.json();
        return [key, data];
      })
    );

    gameData = Object.fromEntries(entries);
    console.log("配表读取成功：", gameData);
  } catch (error) {
    console.error("配表读取失败：", error);
    showLoadError(error);
  }
}

function startAct(actId) {
  if (!gameData) {
    showLoadError(new Error("配表还没有加载完成，请稍后再试。"));
    return;
  }

  activeAct = gameData[actId];
  playerChoices = [];
  actState = {
    actId,
    sceneId: activeAct.scenes[0].id,
    sceneIndex: 0,
    step: "scene:start"
  };

  document.getElementById("introScreen").classList.add("hidden");
  document.getElementById("actEndScreen").classList.add("hidden");
  document.getElementById("actScreen").classList.remove("hidden");

  renderActScene();
}

function renderActScene() {
  const scene = getCurrentScene();
  const viewport = document.getElementById("actViewport");

  actState.sceneId = scene.id;
  actState.step = `${scene.id}:rendered`;
  viewport.innerHTML = "";

  const sceneElement = document.createElement("article");
  sceneElement.className = `act-scene ${scene.background}`;
  sceneElement.dataset.sceneId = scene.id;
  sceneElement.appendChild(createSceneHeader(scene));

  if (scene.type === "wake") {
    renderWakeScene(scene, sceneElement);
  } else {
    renderChoiceScene(scene, sceneElement);
  }

  viewport.appendChild(sceneElement);
}

function createSceneHeader(scene) {
  const header = document.createElement("div");
  const chapter = document.createElement("p");
  const title = document.createElement("h2");

  header.className = "scene-header";
  chapter.className = "chapter-label";
  chapter.textContent = scene.chapter;
  title.textContent = scene.name;

  header.append(chapter, title);
  return header;
}

function renderWakeScene(scene, sceneElement) {
  let wakeClicks = 0;

  const wakeArea = document.createElement("div");
  const alarmMark = document.createElement("div");
  const phonePanel = document.createElement("div");
  const wakeHint = document.createElement("p");

  wakeArea.className = "wake-area";
  alarmMark.className = "alarm-mark";
  phonePanel.className = "phone-panel";
  wakeHint.className = "wake-hint";

  alarmMark.textContent = "叮铃铃";
  phonePanel.textContent = scene.phoneTime;
  wakeHint.textContent = scene.instruction;

  wakeArea.addEventListener("click", () => {
    wakeClicks += 1;
    actState.step = `${scene.id}:wake_click_${wakeClicks}`;

    const progress = Math.min(wakeClicks / scene.wakeClickTarget, 1);
    phonePanel.style.setProperty("--phone-opacity", String(0.08 + progress * 0.92));
    phonePanel.style.setProperty("--phone-scale", String(0.88 + progress * 0.12));

    if (wakeClicks >= scene.wakeClickTarget) {
      wakeArea.style.pointerEvents = "none";
      goToNextScene(scene.transition);
    }
  });

  wakeArea.append(alarmMark, phonePanel, wakeHint);
  sceneElement.appendChild(wakeArea);
}

function renderChoiceScene(scene, sceneElement) {
  const bubble = document.createElement("p");
  const world = document.createElement("div");
  const interactiveLayer = document.createElement("div");
  const placementNote = document.createElement("div");

  bubble.className = "speech-bubble";
  bubble.textContent = scene.narration;
  world.className = "scene-world";
  interactiveLayer.className = "interactive-layer";
  placementNote.className = "placement-note";
  placementNote.textContent = scene.placementText || "";

  renderSceneSet(scene, world);

  scene.objects.forEach((object) => {
    const objectElement = document.createElement("button");
    objectElement.type = "button";
    objectElement.className = `act-object shape-${object.shape}`;
    objectElement.textContent = object.label;
    objectElement.addEventListener("click", () => {
      handleActChoice(scene, object, objectElement, placementNote);
    });

    interactiveLayer.appendChild(objectElement);
  });

  sceneElement.append(bubble, world, interactiveLayer, placementNote);
}

function renderSceneSet(scene, world) {
  if (scene.background === "kitchen") {
    const counter = document.createElement("div");
    const table = document.createElement("div");
    const door = document.createElement("div");

    counter.className = "counter-line";
    table.className = "table-surface";
    door.className = "door-shape";
    world.append(counter, table, door);
  }

  if (scene.background === "bus-stop") {
    const shop = document.createElement("div");
    const bus = document.createElement("div");

    shop.className = "shop-shape";
    bus.className = "bus-shape";
    world.append(shop, bus);
  }
}

function handleActChoice(scene, object, objectElement, placementNote) {
  if (actState.step.endsWith(":selected")) {
    return;
  }

  actState.step = `${scene.id}:selected`;
  objectElement.classList.add("selected");

  playerChoices.push({
    actId: actState.actId,
    sceneId: scene.id,
    choiceId: object.id,
    label: object.label,
    value: object.value,
    kind: object.kind
  });

  if (object.disappearOnSelect || object.kind === "drink") {
    objectElement.classList.add("disappeared");
  }

  if (placementNote.textContent) {
    placementNote.classList.add("visible");
  }

  if (scene.busLeaves) {
    document.querySelector(".bus-shape")?.classList.add("leaving");
  }

  window.setTimeout(() => {
    goToNextScene(scene.transition);
  }, scene.busLeaves ? 950 : 650);
}

function goToNextScene(transition) {
  const sceneElement = document.querySelector(".act-scene");

  if (transition === "horizontal") {
    sceneElement.classList.add("transition-horizontal-out");
  } else if (transition === "fadeEnd") {
    sceneElement.classList.add("transition-fade-out");
  } else {
    sceneElement.classList.add("transition-vertical-out");
  }

  window.setTimeout(() => {
    if (transition === "fadeEnd") {
      endAct();
      return;
    }

    actState.sceneIndex += 1;
    actState.sceneId = activeAct.scenes[actState.sceneIndex].id;
    actState.step = "scene:enter";
    renderActScene();
  }, 850);
}

function endAct() {
  actState.step = "act:ended";
  document.getElementById("actScreen").classList.add("hidden");
  document.getElementById("actEndScreen").classList.remove("hidden");
  console.log("Act 1 早餐 playerChoices：", playerChoices);
  console.log("下一幕接口预留：", activeAct.nextActId);
}

function getCurrentScene() {
  return activeAct.scenes[actState.sceneIndex];
}

function showLoadError(error) {
  const container = document.querySelector(".game-container");
  const oldErrorMessage = document.querySelector(".error-message");
  const errorMessage = document.createElement("p");
  const fileProtocolTip = window.location.protocol === "file:"
    ? " 请通过本地服务器打开页面后再测试。"
    : "";

  if (oldErrorMessage) {
    oldErrorMessage.remove();
  }

  errorMessage.className = "error-message";
  errorMessage.textContent = `数据读取失败：${error.message}${fileProtocolTip}`;

  container.appendChild(errorMessage);
}

function calculateRisk(selections, foods, scenes, risks) {
  const foodMap = new Map(foods.map((food) => [food.id, food]));
  const appearFoodIds = new Set();
  const chosen = {};
  const appear = {};
  const exposure = {};

  risks.forEach((risk) => {
    chosen[risk.id] = 0;
    appear[risk.id] = 0;
    exposure[risk.id] = 0;
  });

  scenes.forEach((scene) => {
    scene.foodIds.forEach((foodId) => {
      appearFoodIds.add(foodId);
    });
  });

  appearFoodIds.forEach((foodId) => {
    const food = foodMap.get(foodId);

    if (!food) {
      return;
    }

    food.riskFactors.forEach((riskId) => {
      if (appear[riskId] !== undefined) {
        appear[riskId] += 1;
      }
    });
  });

  selections.forEach((foodId) => {
    const food = foodMap.get(foodId);

    if (!food) {
      return;
    }

    food.riskFactors.forEach((riskId) => {
      if (chosen[riskId] !== undefined) {
        chosen[riskId] += 1;
      }
    });
  });

  let score = 0;
  let scoreMax = 0;

  risks.forEach((risk) => {
    const riskId = risk.id;
    const orValue = Number(risk.or);
    const logOr = orValue > 0 ? Math.log10(orValue) : 0;

    exposure[riskId] = appear[riskId] === 0
      ? 0
      : Math.sqrt(chosen[riskId] / appear[riskId]);

    score += exposure[riskId] * logOr;
    scoreMax += logOr;
  });

  const riskIndex = scoreMax === 0 ? 0 : (score / scoreMax) * 100;

  return {
    Chosen: chosen,
    Appear: appear,
    Exposure: exposure,
    Score: score,
    RiskIndex: riskIndex
  };
}

const dataFiles = {
  food: "data/food.json",
  scene: "data/scene.json",
  risk: "data/risk.json",
  persona: "data/persona.json",
  uiConfig: "data/ui-config.json",
  acts: "data/acts.json",
  choiceValues: "data/choice-values.json",
  riskTags: "data/risk-tags.json",
  personalityResults: "data/personality-results.json"
};

const TIMING = {
  interactivesDelay: 500,
  feedbackHold: 800,
  transition: 850
};

let gameData = null;
let activeAct = null;
let actState = {
  actId: null,
  sceneId: null,
  step: "idle"
};
let playerChoices = [];

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");

  startButton.disabled = true;
  startButton.textContent = "加载中...";
  startButton.addEventListener("click", () => {
    startAct("act1_breakfast");
  });

  document.getElementById("restartActButton").addEventListener("click", () => {
    startAct("act1_breakfast");
  });
  setupResultCardFlip();

  loadGameData();
});

async function loadGameData() {
  const startButton = document.getElementById("startButton");

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
    applyChoiceValuesToActs();
    console.log("配表读取成功：", gameData);
    startButton.disabled = false;
    startButton.textContent = "翻开第一页";
  } catch (error) {
    console.error("配表读取失败：", error);
    startButton.disabled = true;
    startButton.textContent = "加载失败";
    showLoadError(error);
  }
}

function startAct(actId) {
  if (!gameData) {
    showLoadError(new Error("配表还没有加载完成，请稍后再试。"));
    return;
  }

  activeAct = getActById(actId);

  if (!activeAct) {
    showLoadError(new Error(`未找到 Act 配置：${actId}`));
    return;
  }

  const startScene = getSceneById(activeAct.startScene) || activeAct.scenes[0];

  if (actId === "act1_breakfast") {
    playerChoices = [];
  }

  actState = {
    actId,
    sceneId: startScene.sceneId,
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

  actState.sceneId = scene.sceneId;
  actState.step = `${scene.sceneId}:rendered`;
  viewport.innerHTML = "";

  const sceneElement = document.createElement("article");
  sceneElement.className = `act-scene ${scene.background}`;
  sceneElement.dataset.sceneId = scene.sceneId;
  sceneElement.appendChild(createSceneHeader(scene));

  if (scene.interactionType === "wake") {
    renderWakeScene(scene, sceneElement);
  } else if (scene.interactionType === "coverClick") {
    renderCoverClickScene(scene, sceneElement);
  } else if (scene.interactionType === "dragToPlate") {
    renderDragToPlateScene(scene, sceneElement);
  } else if (scene.interactionType === "carousel") {
    renderCarouselScene(scene, sceneElement);
  } else if (scene.interactionType === "multiPick") {
    renderMultiPickScene(scene, sceneElement);
  } else if (scene.interactionType === "dragMultiToPlate") {
    renderDragMultiToPlateScene(scene, sceneElement);
  } else if (scene.interactionType === "dragToSlot") {
    renderDragToSlotScene(scene, sceneElement);
  } else if (scene.interactionType === "eatingClicks") {
    renderEatingClicksScene(scene, sceneElement);
  } else if (scene.interactionType === "areaChoiceGrid") {
    renderAreaChoiceGridScene(scene, sceneElement);
  } else if (scene.interactionType === "dragLeftover") {
    renderDragLeftoverScene(scene, sceneElement);
  } else if (scene.interactionType === "stickyNotes") {
    renderStickyNotesScene(scene, sceneElement);
  } else {
    renderChoiceScene(scene, sceneElement);
  }

  viewport.appendChild(sceneElement);
  requestAnimationFrame(() => {
    sceneElement.classList.add("scene-entered");
  });
}

function createSceneHeader(scene) {
  const header = document.createElement("div");
  const chapter = document.createElement("p");
  const title = document.createElement("h2");

  header.className = "scene-header";
  chapter.className = "chapter-label";
  chapter.textContent = scene.chapter || activeAct.actTitle;
  title.textContent = scene.sceneTitle;

  header.append(chapter, title);
  return header;
}

function renderWakeScene(scene, sceneElement) {
  let wakeClicks = 0;

  const wakeArea = document.createElement("div");
  const wakeNarration = document.createElement("p");
  const alarmMark = document.createElement("div");
  const phonePanel = document.createElement("div");
  const wakeHint = document.createElement("p");

  wakeArea.className = "wake-area is-waiting";
  wakeNarration.className = "speech-bubble wake-narration";
  alarmMark.className = "alarm-mark";
  phonePanel.className = "phone-panel";
  wakeHint.className = "wake-hint";

  wakeNarration.textContent = scene.narration;
  alarmMark.textContent = "叮铃铃";
  phonePanel.textContent = scene.phoneTime;
  wakeHint.textContent = scene.interactives[0]?.hoverText || "点击画面继续。";

  wakeArea.addEventListener("click", () => {
    wakeClicks += 1;
    actState.step = `${scene.sceneId}:wake_click_${wakeClicks}`;

    const progress = Math.min(wakeClicks / scene.wakeClickTarget, 1);
    phonePanel.style.setProperty("--phone-opacity", String(0.08 + progress * 0.92));
    phonePanel.style.setProperty("--phone-scale", String(0.88 + progress * 0.12));

    if (wakeClicks >= scene.wakeClickTarget) {
      wakeArea.style.pointerEvents = "none";
      goToNextScene(scene.transition);
    }
  });

  wakeArea.append(wakeNarration, alarmMark, phonePanel, wakeHint);
  sceneElement.appendChild(wakeArea);

  window.setTimeout(() => {
    wakeArea.classList.remove("is-waiting");
    actState.step = `${scene.sceneId}:ready`;
  }, TIMING.interactivesDelay);
}

function renderChoiceScene(scene, sceneElement) {
  const bubble = document.createElement("p");
  const world = document.createElement("div");
  const interactiveLayer = document.createElement("div");
  const feedbackNote = document.createElement("div");

  bubble.className = "speech-bubble";
  bubble.textContent = scene.narration;
  world.className = "scene-world";
  interactiveLayer.className = "interactive-layer is-waiting";
  feedbackNote.className = "placement-note";

  renderSceneSet(scene, world);

  scene.interactives.forEach((interactive) => {
    const objectElement = document.createElement("button");
    objectElement.type = "button";
    objectElement.className = `act-object shape-${interactive.shape || "placeholder-card"}`;
    objectElement.textContent = interactive.name;
    objectElement.title = interactive.hoverText;
    objectElement.addEventListener("click", () => {
      handleActChoice(scene, interactive, objectElement, feedbackNote);
    });

    interactiveLayer.appendChild(objectElement);
  });

  sceneElement.append(bubble, world, interactiveLayer, feedbackNote);

  window.setTimeout(() => {
    interactiveLayer.classList.remove("is-waiting");
    interactiveLayer.classList.add("is-ready");
    actState.step = `${scene.sceneId}:ready`;
  }, TIMING.interactivesDelay);
}

function renderCoverClickScene(scene, sceneElement) {
  const coverArea = document.createElement("div");
  const bubble = document.createElement("p");
  const world = document.createElement("div");
  const feedbackNote = document.createElement("div");

  coverArea.className = "cover-click-area is-waiting";
  bubble.className = "speech-bubble";
  bubble.textContent = scene.narration;
  world.className = "scene-world";
  feedbackNote.className = "placement-note";

  renderSceneSet(scene, world);

  coverArea.addEventListener("click", () => {
    if (actState.step.endsWith(":selected")) {
      return;
    }

    actState.step = `${scene.sceneId}:selected`;
    feedbackNote.textContent = scene.interactives[0].resultText;
    feedbackNote.classList.add("visible");

    window.setTimeout(() => {
      goToNextScene(scene.transition);
    }, TIMING.feedbackHold);
  });

  sceneElement.append(coverArea, bubble, world, feedbackNote);

  window.setTimeout(() => {
    coverArea.classList.remove("is-waiting");
    actState.step = `${scene.sceneId}:ready`;
  }, TIMING.interactivesDelay);
}

function renderDragToPlateScene(scene, sceneElement) {
  const bubble = document.createElement("p");
  const world = document.createElement("div");
  const interactiveLayer = document.createElement("div");
  const plate = document.createElement("div");
  const plateText = document.createElement("span");
  const feedbackNote = document.createElement("div");

  bubble.className = "speech-bubble";
  bubble.textContent = scene.narration;
  world.className = "scene-world";
  interactiveLayer.className = "interactive-layer is-waiting";
  plate.className = "drop-plate";
  plateText.textContent = "空餐盘";
  feedbackNote.className = "placement-note";

  plate.appendChild(plateText);
  renderSceneSet(scene, world);

  scene.interactives.forEach((interactive) => {
    const objectElement = document.createElement("button");
    objectElement.type = "button";
    objectElement.draggable = true;
    objectElement.className = `act-object shape-${interactive.shape || "placeholder-card"}`;
    objectElement.textContent = interactive.name;
    objectElement.title = interactive.hoverText;
    objectElement.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", interactive.id);
      objectElement.classList.add("dragging");
    });
    objectElement.addEventListener("dragend", () => {
      objectElement.classList.remove("dragging");
    });
    interactiveLayer.appendChild(objectElement);
  });

  plate.addEventListener("dragover", (event) => {
    event.preventDefault();
    plate.classList.add("drag-over");
  });
  plate.addEventListener("dragleave", () => {
    plate.classList.remove("drag-over");
  });
  plate.addEventListener("drop", (event) => {
    event.preventDefault();
    plate.classList.remove("drag-over");

    const choiceId = event.dataTransfer.getData("text/plain");
    const interactive = scene.interactives.find((item) => item.id === choiceId);

    if (!interactive || actState.step.endsWith(":selected")) {
      return;
    }

    const objectElement = interactiveLayer.querySelector(`.shape-${interactive.shape}`);
    plateText.textContent = interactive.name;
    plate.classList.add("has-food");
    handleActChoice(scene, interactive, objectElement, feedbackNote);
  });

  sceneElement.append(bubble, world, interactiveLayer, plate, feedbackNote);

  window.setTimeout(() => {
    interactiveLayer.classList.remove("is-waiting");
    interactiveLayer.classList.add("is-ready");
    actState.step = `${scene.sceneId}:ready`;
  }, TIMING.interactivesDelay);
}

function renderCarouselScene(scene, sceneElement) {
  let activeIndex = 0;

  const bubble = document.createElement("p");
  const carousel = document.createElement("div");
  const prevButton = document.createElement("button");
  const optionCard = document.createElement("div");
  const nextButton = document.createElement("button");
  const confirmButton = document.createElement("button");
  const feedbackNote = document.createElement("div");

  bubble.className = "speech-bubble";
  bubble.textContent = scene.narration;
  carousel.className = "carousel-box is-waiting";
  prevButton.className = "carousel-arrow";
  nextButton.className = "carousel-arrow";
  optionCard.className = "carousel-option";
  confirmButton.className = "carousel-confirm";
  feedbackNote.className = "placement-note";
  prevButton.textContent = "<";
  nextButton.textContent = ">";
  confirmButton.textContent = "确认";

  function updateOption() {
    const active = scene.interactives[activeIndex];
    optionCard.textContent = active.name;
    optionCard.title = active.hoverText;
  }

  prevButton.addEventListener("click", () => {
    activeIndex = (activeIndex - 1 + scene.interactives.length) % scene.interactives.length;
    updateOption();
  });
  nextButton.addEventListener("click", () => {
    activeIndex = (activeIndex + 1) % scene.interactives.length;
    updateOption();
  });
  confirmButton.addEventListener("click", () => {
    handleActChoice(scene, scene.interactives[activeIndex], optionCard, feedbackNote);
  });

  updateOption();
  carousel.append(prevButton, optionCard, nextButton, confirmButton);
  sceneElement.append(bubble, carousel, feedbackNote);

  window.setTimeout(() => {
    carousel.classList.remove("is-waiting");
    carousel.classList.add("is-ready");
    actState.step = `${scene.sceneId}:ready`;
  }, TIMING.interactivesDelay);
}

function renderMultiPickScene(scene, sceneElement) {
  let choiceCount = 0;
  const maxChoices = scene.maxChoices || 3;

  const bubble = document.createElement("p");
  const world = document.createElement("div");
  const interactiveLayer = document.createElement("div");
  const energy = document.createElement("div");
  const energyFill = document.createElement("div");
  const feedbackNote = document.createElement("div");

  bubble.className = "speech-bubble";
  bubble.textContent = scene.narration;
  world.className = "scene-world";
  interactiveLayer.className = "interactive-layer is-waiting";
  energy.className = "energy-bar";
  energyFill.className = "energy-fill";
  feedbackNote.className = "placement-note";
  energy.appendChild(energyFill);

  renderSceneSet(scene, world);

  scene.interactives.forEach((interactive) => {
    const objectElement = document.createElement("button");
    objectElement.type = "button";
    objectElement.className = `act-object shape-${interactive.shape || "placeholder-card"}`;
    objectElement.textContent = interactive.name;
    objectElement.title = interactive.hoverText;
    objectElement.addEventListener("click", () => {
      if (objectElement.classList.contains("disappeared") || choiceCount >= maxChoices) {
        return;
      }

      recordChoice(scene, interactive);
      choiceCount += 1;
      objectElement.classList.add("disappeared");
      feedbackNote.textContent = interactive.resultText;
      feedbackNote.classList.add("visible");
      energyFill.style.width = `${(choiceCount / maxChoices) * 100}%`;

      if (choiceCount >= maxChoices) {
        actState.step = `${scene.sceneId}:selected`;
        window.setTimeout(() => {
          goToNextScene(scene.transition);
        }, TIMING.feedbackHold);
      }
    });
    interactiveLayer.appendChild(objectElement);
  });

  sceneElement.append(bubble, world, interactiveLayer, energy, feedbackNote);

  window.setTimeout(() => {
    interactiveLayer.classList.remove("is-waiting");
    interactiveLayer.classList.add("is-ready");
    actState.step = `${scene.sceneId}:ready`;
  }, TIMING.interactivesDelay);
}

function renderDragMultiToPlateScene(scene, sceneElement) {
  let choiceCount = 0;
  const minChoices = scene.minChoices || 3;

  const bubble = document.createElement("p");
  const world = document.createElement("div");
  const interactiveLayer = document.createElement("div");
  const plate = document.createElement("div");
  const plateText = document.createElement("span");
  const feedbackNote = document.createElement("div");

  bubble.className = "speech-bubble";
  bubble.textContent = scene.narration;
  world.className = "scene-world";
  interactiveLayer.className = "interactive-layer is-waiting";
  plate.className = "drop-plate hotpot-plate";
  plateText.textContent = `空盘子 0 / ${minChoices}`;
  feedbackNote.className = "placement-note";
  plate.appendChild(plateText);

  renderSceneSet(scene, world);

  scene.interactives.forEach((interactive) => {
    const objectElement = document.createElement("button");
    objectElement.type = "button";
    objectElement.draggable = true;
    objectElement.className = `act-object shape-${interactive.shape || "placeholder-card"}`;
    objectElement.textContent = interactive.name;
    objectElement.title = interactive.hoverText;
    objectElement.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", interactive.id);
      objectElement.classList.add("dragging");
    });
    objectElement.addEventListener("dragend", () => {
      objectElement.classList.remove("dragging");
    });
    interactiveLayer.appendChild(objectElement);
  });

  plate.addEventListener("dragover", (event) => {
    event.preventDefault();
    plate.classList.add("drag-over");
  });
  plate.addEventListener("dragleave", () => {
    plate.classList.remove("drag-over");
  });
  plate.addEventListener("drop", (event) => {
    event.preventDefault();
    plate.classList.remove("drag-over");

    if (choiceCount >= minChoices) {
      return;
    }

    const choiceId = event.dataTransfer.getData("text/plain");
    const interactive = scene.interactives.find((item) => item.id === choiceId);

    if (!interactive) {
      return;
    }

    const objectElement = interactiveLayer.querySelector(`.shape-${interactive.shape}`);

    if (objectElement?.classList.contains("disappeared")) {
      return;
    }

    recordChoice(scene, interactive);
    choiceCount += 1;
    objectElement?.classList.add("disappeared");
    plate.classList.add("has-food");
    plateText.textContent = `盘子里已有 ${choiceCount} / ${minChoices}`;
    feedbackNote.textContent = interactive.resultText;
    feedbackNote.classList.add("visible");

    if (choiceCount >= minChoices) {
      actState.step = `${scene.sceneId}:selected`;
      window.setTimeout(() => {
        goToNextScene(scene.transition);
      }, TIMING.feedbackHold);
    }
  });

  sceneElement.append(bubble, world, interactiveLayer, plate, feedbackNote);

  window.setTimeout(() => {
    interactiveLayer.classList.remove("is-waiting");
    interactiveLayer.classList.add("is-ready");
    actState.step = `${scene.sceneId}:ready`;
  }, TIMING.interactivesDelay);
}

function renderDragToSlotScene(scene, sceneElement) {
  const bubble = document.createElement("p");
  const world = document.createElement("div");
  const interactiveLayer = document.createElement("div");
  const slot = document.createElement("div");
  const feedbackNote = document.createElement("div");

  bubble.className = "speech-bubble";
  bubble.textContent = scene.narration;
  world.className = "scene-world";
  interactiveLayer.className = "interactive-layer is-waiting";
  slot.className = "cup-slot";
  slot.textContent = "把杯子拖到这里";
  feedbackNote.className = "placement-note";

  renderSceneSet(scene, world);

  scene.interactives.forEach((interactive) => {
    const objectElement = document.createElement("button");
    objectElement.type = "button";
    objectElement.draggable = true;
    objectElement.className = `act-object shape-${interactive.shape || "placeholder-card"}`;
    objectElement.textContent = interactive.name;
    objectElement.title = interactive.hoverText;
    objectElement.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", interactive.id);
      objectElement.classList.add("dragging");
    });
    objectElement.addEventListener("dragend", () => {
      objectElement.classList.remove("dragging");
    });
    interactiveLayer.appendChild(objectElement);
  });

  slot.addEventListener("dragover", (event) => {
    event.preventDefault();
    slot.classList.add("drag-over");
  });
  slot.addEventListener("dragleave", () => {
    slot.classList.remove("drag-over");
  });
  slot.addEventListener("drop", (event) => {
    event.preventDefault();
    slot.classList.remove("drag-over");

    if (actState.step.endsWith(":selected")) {
      return;
    }

    const choiceId = event.dataTransfer.getData("text/plain");
    const interactive = scene.interactives.find((item) => item.id === choiceId);
    const objectElement = interactiveLayer.querySelector(`.shape-${interactive?.shape}`);

    if (!interactive) {
      return;
    }

    slot.textContent = `${interactive.name} 碰杯`;
    slot.classList.add("has-cup", "clink");
    handleActChoice(scene, interactive, objectElement, feedbackNote);
  });

  sceneElement.append(bubble, world, interactiveLayer, slot, feedbackNote);

  window.setTimeout(() => {
    interactiveLayer.classList.remove("is-waiting");
    interactiveLayer.classList.add("is-ready");
    actState.step = `${scene.sceneId}:ready`;
  }, TIMING.interactivesDelay);
}

function renderEatingClicksScene(scene, sceneElement) {
  let finishedCount = 0;
  let sceneStartTime = null;

  const bubble = document.createElement("p");
  const world = document.createElement("div");
  const interactiveLayer = document.createElement("div");
  const feedbackNote = document.createElement("div");

  bubble.className = "speech-bubble";
  bubble.textContent = scene.narration;
  world.className = "scene-world";
  interactiveLayer.className = "interactive-layer is-waiting";
  feedbackNote.className = "placement-note";

  renderSceneSet(scene, world);

  scene.interactives.forEach((interactive) => {
    let clicks = 0;
    const requiredClicks = interactive.requiredClicks || 1;
    const objectElement = document.createElement("button");

    objectElement.type = "button";
    objectElement.className = `act-object eating-object shape-${interactive.shape || "placeholder-card"}`;
    objectElement.textContent = `${interactive.name} 0 / ${requiredClicks}`;
    objectElement.title = interactive.hoverText;
    objectElement.addEventListener("click", () => {
      if (clicks >= requiredClicks) {
        return;
      }

      if (sceneStartTime === null) {
        sceneStartTime = performance.now();
      }

      clicks += 1;
      if (!scene.timingChoices) {
        recordChoice(scene, {
          ...interactive,
          id: `${interactive.id}_${clicks}`,
          resultText: `${interactive.resultText} ${clicks}/${requiredClicks}`
        });
      }
      feedbackNote.textContent = interactive.resultText;
      feedbackNote.classList.add("visible");
      objectElement.textContent = `${interactive.name} ${clicks} / ${requiredClicks}`;
      objectElement.style.opacity = String(Math.max(0.15, 1 - clicks / requiredClicks));

      if (clicks >= requiredClicks) {
        objectElement.classList.add("disappeared");
        finishedCount += 1;
      }

      if (finishedCount >= scene.interactives.length) {
        actState.step = `${scene.sceneId}:selected`;
        recordTimedEatingChoice(scene, sceneStartTime || performance.now());
        window.setTimeout(() => {
          goToNextScene(scene.transition);
        }, TIMING.feedbackHold);
      }
    });

    interactiveLayer.appendChild(objectElement);
  });

  sceneElement.append(bubble, world, interactiveLayer, feedbackNote);

  window.setTimeout(() => {
    interactiveLayer.classList.remove("is-waiting");
    interactiveLayer.classList.add("is-ready");
    actState.step = `${scene.sceneId}:ready`;
    sceneStartTime = performance.now();
  }, TIMING.interactivesDelay);
}

function recordTimedEatingChoice(scene, sceneStartTime) {
  if (!scene.timingChoices) {
    return;
  }

  const elapsedSeconds = (performance.now() - sceneStartTime) / 1000;
  const timingChoice = scene.timingChoices.find((choice) => {
    const minSeconds = choice.minSeconds ?? 0;
    const maxSeconds = choice.maxSeconds ?? Number.POSITIVE_INFINITY;
    return elapsedSeconds >= minSeconds && elapsedSeconds < maxSeconds;
  });

  if (!timingChoice) {
    return;
  }

  recordChoice(scene, {
    id: timingChoice.choiceId,
    name: timingChoice.choiceName,
    resultText: timingChoice.choiceName
  });
  console.log(`Scene ${scene.sceneId} 完成用时：${elapsedSeconds.toFixed(2)}s`);
}

function renderAreaChoiceGridScene(scene, sceneElement) {
  const selectedAreas = new Set();
  const bubble = document.createElement("p");
  const world = document.createElement("div");
  const areaLayer = document.createElement("div");
  const feedbackNote = document.createElement("div");

  bubble.className = "speech-bubble";
  bubble.textContent = scene.narration;
  world.className = "scene-world";
  areaLayer.className = "area-choice-grid is-waiting";
  feedbackNote.className = "placement-note";

  renderSceneSet(scene, world);

  scene.areas.forEach((area, index) => {
    const areaElement = document.createElement("button");
    const areaText = document.createElement("span");
    const optionPanel = document.createElement("div");

    areaElement.type = "button";
    areaElement.className = `dashed-area area-${index + 1}`;
    areaText.textContent = area.name;
    optionPanel.className = "area-options hidden";

    area.options.forEach((option) => {
      const optionButton = document.createElement("button");
      optionButton.type = "button";
      optionButton.textContent = option.name;
      optionButton.title = option.hoverText;
      optionButton.addEventListener("click", (event) => {
        event.stopPropagation();

        if (selectedAreas.has(area.id)) {
          return;
        }

        selectedAreas.add(area.id);
        areaText.textContent = option.name;
        areaElement.classList.add("filled");
        optionPanel.classList.add("hidden");
        recordChoice(scene, option);
        feedbackNote.textContent = option.resultText;
        feedbackNote.classList.add("visible");

        if (selectedAreas.size >= scene.areas.length) {
          actState.step = `${scene.sceneId}:selected`;
          window.setTimeout(() => {
            goToNextScene(scene.transition);
          }, TIMING.feedbackHold);
        }
      });
      optionPanel.appendChild(optionButton);
    });

    areaElement.addEventListener("click", () => {
      if (!selectedAreas.has(area.id)) {
        optionPanel.classList.toggle("hidden");
      }
    });

    areaElement.append(areaText, optionPanel);
    areaLayer.appendChild(areaElement);
  });

  sceneElement.append(bubble, world, areaLayer, feedbackNote);

  window.setTimeout(() => {
    areaLayer.classList.remove("is-waiting");
    areaLayer.classList.add("is-ready");
    actState.step = `${scene.sceneId}:ready`;
  }, TIMING.interactivesDelay);
}

function renderDragLeftoverScene(scene, sceneElement) {
  const bubble = document.createElement("p");
  const world = document.createElement("div");
  const interactiveLayer = document.createElement("div");
  const leftover = document.createElement("div");
  const feedbackNote = document.createElement("div");

  bubble.className = "speech-bubble";
  bubble.textContent = scene.narration;
  world.className = "scene-world";
  interactiveLayer.className = "interactive-layer is-waiting";
  leftover.className = "leftover-box";
  leftover.textContent = "剩菜";
  leftover.draggable = true;
  feedbackNote.className = "placement-note";

  renderSceneSet(scene, world);

  leftover.addEventListener("dragstart", (event) => {
    event.dataTransfer.setData("text/plain", "leftover");
    leftover.classList.add("dragging");
  });
  leftover.addEventListener("dragend", () => {
    leftover.classList.remove("dragging");
  });

  scene.interactives.forEach((interactive) => {
    const target = document.createElement("button");
    target.type = "button";
    target.className = `act-object leftover-target shape-${interactive.shape}`;
    target.textContent = interactive.name;
    target.title = interactive.hoverText;

    target.addEventListener("dragover", (event) => {
      event.preventDefault();
      target.classList.add("drag-over");
    });
    target.addEventListener("dragleave", () => {
      target.classList.remove("drag-over");
    });
    target.addEventListener("drop", (event) => {
      event.preventDefault();
      target.classList.remove("drag-over");

      if (actState.step.endsWith(":selected")) {
        return;
      }

      leftover.textContent = `${interactive.name} + 剩菜`;
      leftover.classList.add("combined");
      handleActChoice(scene, interactive, target, feedbackNote);
    });

    interactiveLayer.appendChild(target);
  });

  sceneElement.append(bubble, world, interactiveLayer, leftover, feedbackNote);

  window.setTimeout(() => {
    interactiveLayer.classList.remove("is-waiting");
    interactiveLayer.classList.add("is-ready");
    actState.step = `${scene.sceneId}:ready`;
  }, TIMING.interactivesDelay);
}

function renderStickyNotesScene(scene, sceneElement) {
  const bubble = document.createElement("p");
  const world = document.createElement("div");
  const noteLayer = document.createElement("div");
  const feedbackNote = document.createElement("div");

  bubble.className = "speech-bubble";
  bubble.textContent = scene.narration;
  world.className = "scene-world";
  noteLayer.className = "sticky-note-layer is-waiting";
  feedbackNote.className = "placement-note";

  renderSceneSet(scene, world);

  scene.interactives.forEach((interactive) => {
    const note = document.createElement("button");
    note.type = "button";
    note.className = `sticky-note shape-${interactive.shape}`;
    note.textContent = interactive.name;
    note.title = interactive.hoverText;
    note.addEventListener("click", () => {
      if (actState.step.endsWith(":selected")) {
        return;
      }

      note.classList.add("checked");
      handleActChoice(scene, interactive, note, feedbackNote);
    });

    noteLayer.appendChild(note);
  });

  sceneElement.append(bubble, world, noteLayer, feedbackNote);

  window.setTimeout(() => {
    noteLayer.classList.remove("is-waiting");
    noteLayer.classList.add("is-ready");
    actState.step = `${scene.sceneId}:ready`;
  }, TIMING.interactivesDelay);
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

  if (scene.background === "office") {
    const desk = document.createElement("div");
    const computer = document.createElement("div");

    desk.className = "office-desk";
    computer.className = "computer-shape";
    world.append(desk, computer);
  }

  if (scene.background === "cafeteria") {
    const counter = document.createElement("div");
    const tray = document.createElement("div");

    counter.className = "cafeteria-counter";
    tray.className = "cafeteria-tray";
    world.append(counter, tray);
  }

  if (scene.background === "hotpot") {
    const table = document.createElement("div");
    const pot = document.createElement("div");
    const plate = document.createElement("div");

    table.className = "hotpot-table";
    pot.className = "hotpot-pot";
    plate.className = "hotpot-filled-plate";
    world.append(table, pot, plate);
  }

  if (scene.background === "toast") {
    const leftHand = document.createElement("div");
    const emptyHand = document.createElement("div");

    leftHand.className = "toast-hand filled";
    emptyHand.className = "toast-hand empty";
    world.append(leftHand, emptyHand);
  }

  if (scene.background === "night-room") {
    const windowShape = document.createElement("div");
    const desk = document.createElement("div");

    windowShape.className = "night-window";
    desk.className = "night-desk";
    world.append(windowShape, desk);
  }
}

function handleActChoice(scene, interactive, objectElement, feedbackNote) {
  if (actState.step.endsWith(":selected")) {
    return;
  }

  actState.step = `${scene.sceneId}:selected`;
  objectElement?.classList.add("selected");

  recordChoice(scene, interactive);

  if (interactive.disappearOnSelect || interactive.type === "drink") {
    objectElement?.classList.add("disappeared");
  }

  feedbackNote.textContent = interactive.resultText;
  feedbackNote.classList.add("visible");

  if (scene.busLeaves) {
    document.querySelector(".bus-shape")?.classList.add("leaving");
  }

  window.setTimeout(() => {
    goToNextScene(scene.transition);
  }, scene.feedbackHold || TIMING.feedbackHold);
}

function recordChoice(scene, interactive) {
  const choiceValue = getChoiceValue(scene.sceneId, interactive.id);
  const riskTags = choiceValue?.riskTags
    || interactive.riskTags
    || interactive.riskFactors
    || [];
  const orValue = choiceValue?.orValue ?? interactive.orValue ?? 1;
  const tendencyScores = choiceValue?.tendencyScores
    || interactive.tendencyScores
    || {};

  playerChoices.push({
    actId: actState.actId,
    sceneId: scene.sceneId,
    choiceId: interactive.id,
    choiceName: choiceValue?.choiceName || interactive.resultText || interactive.name,
    riskTags,
    orValue,
    tendencyScores
  });
}

function getChoiceValue(sceneId, choiceId) {
  return gameData?.choiceValues?.find((choiceValue) => (
    choiceValue.sceneId === sceneId && choiceValue.choiceId === choiceId
  ));
}

function applyChoiceValuesToActs() {
  if (!gameData?.acts || !gameData?.choiceValues) {
    return;
  }

  gameData.acts.forEach((act) => {
    act.scenes.forEach((scene) => {
      applyChoiceValuesToList(scene.sceneId, scene.interactives);

      if (scene.areas) {
        scene.areas.forEach((area) => {
          applyChoiceValuesToList(scene.sceneId, area.options);
        });
      }
    });
  });
}

function applyChoiceValuesToList(sceneId, interactives = []) {
  interactives.forEach((interactive) => {
    const choiceValue = getChoiceValue(sceneId, interactive.id);

    if (!choiceValue) {
      return;
    }

    interactive.riskTags = choiceValue.riskTags;
    interactive.orValue = choiceValue.orValue;
    interactive.tendencyScores = choiceValue.tendencyScores || {};
    delete interactive.riskFactors;
  });
}

function goToNextScene(transition) {
  const sceneElement = document.querySelector(".act-scene");
  const currentScene = getCurrentScene();

  if (transition === "horizontal") {
    sceneElement.classList.add("transition-horizontal-out");
  } else if (transition === "fadeEnd") {
    sceneElement.classList.add("transition-fade-out");
  } else {
    sceneElement.classList.add("transition-vertical-out");
  }

  window.setTimeout(() => {
    if (!currentScene.nextScene) {
      endAct();
      return;
    }

    actState.sceneId = currentScene.nextScene;
    actState.step = "scene:enter";
    renderActScene();
  }, TIMING.transition);
}

function endAct() {
  actState.step = "act:ended";

  if (activeAct.nextActId) {
    startAct(activeAct.nextActId);
    return;
  }

  document.getElementById("actScreen").classList.add("hidden");
  document.getElementById("actEndScreen").classList.remove("hidden");
  const resultCard = document.getElementById("resultCard");
  const riskScoreResult = calculateRiskScore(playerChoices, gameData.riskTags);
  const dietTendencyResult = calculateDietTendency(playerChoices, gameData.personalityResults);
  const resultPayload = {
    playerChoices,
    riskScoreResult,
    dietTendencyResult
  };

  resultCard?.classList.remove("is-flipped");
  renderDietTendencyResult(dietTendencyResult);
  renderRiskScoreResult(riskScoreResult);
  document.getElementById("choicesOutput").textContent =
    JSON.stringify(resultPayload, null, 2);
  console.log("dietTendencyResult：", dietTendencyResult);
  console.log("riskScoreResult：", riskScoreResult);
  console.log("playerChoices：", playerChoices);
}

function getCurrentScene() {
  return getSceneById(actState.sceneId);
}

function getSceneById(sceneId) {
  return activeAct.scenes.find((scene) => scene.sceneId === sceneId);
}

function getActById(actId) {
  return gameData.acts.find((act) => act.actId === actId);
}

function showLoadError(error) {
  const container =
    document.querySelector("#introScreen:not(.hidden)") ||
    document.querySelector("#actScreen:not(.hidden)") ||
    document.querySelector("#actEndScreen:not(.hidden)") ||
    document.querySelector(".game-stage") ||
    document.querySelector(".game-container");
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

  if (container) {
    container.appendChild(errorMessage);
  }
}

function setupResultCardFlip() {
  const resultCard = document.getElementById("resultCard");
  const showRiskButton = document.getElementById("showRiskButton");
  const showPersonalityButton = document.getElementById("showPersonalityButton");

  if (!resultCard) {
    return;
  }

  resultCard.addEventListener("click", (event) => {
    if (event.target.closest("button")) {
      return;
    }

    resultCard.classList.toggle("is-flipped");
  });

  resultCard.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    resultCard.classList.toggle("is-flipped");
  });

  showRiskButton?.addEventListener("click", () => {
    resultCard.classList.add("is-flipped");
  });

  showPersonalityButton?.addEventListener("click", () => {
    resultCard.classList.remove("is-flipped");
  });
}

function calculateRiskScore(playerChoices, riskTags) {
  let score = 0;
  let scoreMax = 0;

  const chosenByTag = {};

  playerChoices.forEach((choice) => {
    (choice.riskTags || []).forEach((tag) => {
      chosenByTag[tag] = (chosenByTag[tag] || 0) + 1;
    });
  });

  const factorStats = riskTags.map((riskTag) => {
    const tag = riskTag.tag;
    const chosen = chosenByTag[tag] || 0;
    const appear = Number(riskTag.appear) || 0;
    const orValue = Number(riskTag.orValue) || 1;
    const logOR = Number(riskTag.logOR) || 0;
    const exposure = appear > 0 ? Math.pow(chosen / appear, 0.5) : 0;
    const contribution = exposure * logOR;

    score += contribution;
    scoreMax += logOR;

    return {
      tag,
      chosen,
      appear,
      exposure: roundNumber(exposure, 3),
      orValue,
      logOR,
      contribution: roundNumber(contribution, 3)
    };
  });

  const riskIndex = scoreMax === 0 ? 0 : (score / scoreMax) * 100;
  const topFactors = factorStats
    .filter((factor) => factor.chosen > 0)
    .sort((a, b) => b.contribution - a.contribution)
    .slice(0, 3);

  return {
    factorStats,
    score: roundNumber(score, 3),
    scoreMax: roundNumber(scoreMax, 3),
    riskIndex: roundNumber(riskIndex, 1),
    topFactors
  };
}

function calculateChoiceRisk(choices, riskTags) {
  const chosen = {};
  const appear = {};
  const exposure = {};
  let score = 0;
  let scoreMax = 0;

  riskTags.forEach((riskTag) => {
    chosen[riskTag.tag] = 0;
    appear[riskTag.tag] = Number(riskTag.appear) || 0;
    exposure[riskTag.tag] = 0;
  });

  choices.forEach((choice) => {
    (choice.riskTags || []).forEach((tag) => {
      if (chosen[tag] === undefined) {
        chosen[tag] = 0;
        appear[tag] = 0;
        exposure[tag] = 0;
      }

      chosen[tag] += 1;
    });
  });

  riskTags.forEach((riskTag) => {
    const tag = riskTag.tag;
    const logOr = Number(riskTag.logOR) || 0;

    exposure[tag] = appear[tag] === 0
      ? 0
      : Math.sqrt(chosen[tag] / appear[tag]);

    score += exposure[tag] * logOr;
    scoreMax += logOr;
  });

  return {
    Chosen: chosen,
    Appear: appear,
    Exposure: exposure,
    Score: score,
    RiskIndex: scoreMax === 0 ? 0 : (score / scoreMax) * 100
  };
}

function calculateDietTendency(playerChoices, personalityResults) {
  const dimensionScores = {
    L: 0,
    V: 0,
    C: 0,
    K: 0,
    A: 0,
    G: 0,
    O: 0,
    D: 0
  };

  playerChoices.forEach((choice) => {
    const choiceValue = getChoiceValue(choice.sceneId, choice.choiceId);
    const tendencyScores = choice.tendencyScores || choiceValue?.tendencyScores || {};

    Object.entries(tendencyScores).forEach(([dimension, score]) => {
      if (dimensionScores[dimension] === undefined) {
        return;
      }

      dimensionScores[dimension] += Number(score) || 0;
    });
  });

  const pairResults = {
    LV: calculateTendencyPair("L", "V", dimensionScores),
    CK: calculateTendencyPair("C", "K", dimensionScores),
    AG: calculateTendencyPair("A", "G", dimensionScores),
    OD: calculateTendencyPair("O", "D", dimensionScores)
  };
  const basePersonalityCode = `${pairResults.LV.winner}${pairResults.CK.winner}${pairResults.AG.winner}`;
  const rhythmCode = pairResults.OD.winner;
  const fullPersonalityCode = `${basePersonalityCode}-${rhythmCode}`;
  const personalityResult = personalityResults.find((result) => (
    result.code === basePersonalityCode
  )) || null;

  return {
    dimensionScores,
    pairResults,
    basePersonalityCode,
    rhythmCode,
    fullPersonalityCode,
    personalityResult
  };
}

function calculateTendencyPair(left, right, dimensionScores) {
  const leftScore = dimensionScores[left] || 0;
  const rightScore = dimensionScores[right] || 0;
  const total = leftScore + rightScore;
  const winner = rightScore > leftScore ? right : left;
  const winningScore = winner === left ? leftScore : rightScore;
  const percent = total === 0
    ? 50
    : Math.round((winningScore / total) * 100);

  return {
    left,
    right,
    leftScore,
    rightScore,
    winner,
    percent
  };
}

function renderDietTendencyResult(dietTendencyResult) {
  const summaryElement = document.getElementById("dietTendencySummary");
  const personality = dietTendencyResult.personalityResult;
  const pairResults = dietTendencyResult.pairResults;
  const rhythmPair = pairResults.OD;

  if (!summaryElement) {
    return;
  }

  summaryElement.innerHTML = `
    <p class="personality-code">${dietTendencyResult.fullPersonalityCode}</p>
    <h3>${personality?.name || "未匹配人格"}</h3>
    <p class="personality-title">${personality?.title || dietTendencyResult.basePersonalityCode}</p>
    <p class="rhythm-note">节奏：${getDimensionLabel(dietTendencyResult.rhythmCode)} ${dietTendencyResult.rhythmCode} ${rhythmPair.percent}%</p>
    <p>${personality?.description || "当前人格结果缺少配置文案。"}</p>
    ${personality?.advice ? `<p>${personality.advice}</p>` : ""}
    <ul class="tendency-pairs">
      ${renderTendencyPair("L ↔ V", pairResults.LV)}
      ${renderTendencyPair("C ↔ K", pairResults.CK)}
      ${renderTendencyPair("A ↔ G", pairResults.AG)}
      ${renderTendencyPair("O ↔ D", pairResults.OD)}
    </ul>
  `;
}

function renderTendencyPair(label, pairResult) {
  return `<li>${label}：${pairResult.winner} ${pairResult.percent}%</li>`;
}

function renderRiskScoreResult(riskScoreResult) {
  const summaryElement = document.getElementById("riskScoreSummary");
  const topFactorNames = riskScoreResult.topFactors.map((factor) => factor.tag);
  const riskText = topFactorNames.length > 0
    ? `你的风险主要来自：${topFactorNames.join("、")}。`
    : "本次选择没有命中明显风险标签。";

  if (!summaryElement) {
    return;
  }

  summaryElement.innerHTML = `
    <p class="risk-card-kicker">风险分数计算</p>
    <h3>${riskScoreResult.riskIndex} / 100</h3>
    <p class="score-line">Score: ${riskScoreResult.score} / ${riskScoreResult.scoreMax}</p>
    <p>${riskText}</p>
    <div class="top-factor-list">
      ${riskScoreResult.topFactors.map(renderTopRiskFactor).join("")}
    </div>
    <p class="risk-disclaimer">这不是医学诊断，而是基于本次游戏选择生成的饮食风险倾向。</p>
  `;
}

function renderTopRiskFactor(factor) {
  return `
    <article class="top-factor-item">
      <h4>${factor.tag}</h4>
      <p>Chosen / Appear：${factor.chosen} / ${factor.appear}</p>
      <p>Exposure：${factor.exposure}</p>
      <p>Contribution：${factor.contribution}</p>
    </article>
  `;
}

function getDimensionLabel(code) {
  const labels = {
    L: "温和型",
    V: "刺激型",
    C: "柔软型",
    K: "硬核型",
    A: "新鲜派",
    G: "边缘派",
    O: "仪式型",
    D: "冲刺型"
  };

  return labels[code] || code;
}

function roundNumber(value, digits) {
  const base = 10 ** digits;
  return Math.round(value * base) / base;
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

const dataFiles = {
  scenes: "data/scenes.json",
  choices: "data/choices.json",
  riskTags: "data/risk-tags.json",
  personalityResults: "data/personality-results.json"
};

const transitionDuration = 760;

let gameData = null;
let currentStepIndex = 0;
let isFrameTransitioning = false;
let selectedChoice = null;
let playerChoices = [];

document.addEventListener("DOMContentLoaded", async () => {
  await loadV2Data();
  renderInitialFrame();
});

async function loadV2Data() {
  const entries = await Promise.all(
    Object.entries(dataFiles).map(async ([key, path]) => {
      const response = await fetch(path);

      if (!response.ok) {
        throw new Error(`${path} 读取失败`);
      }

      return [key, await response.json()];
    })
  );

  gameData = Object.fromEntries(entries);
  gameData.steps = flattenSteps(gameData.scenes);
  console.log("V2 数据读取完成：", gameData);
}

function flattenSteps(scenes) {
  return scenes.flatMap((scene) => (
    scene.steps.map((step) => ({
      ...step,
      sceneId: scene.sceneId,
      sceneName: scene.sceneName
    }))
  ));
}

function renderInitialFrame() {
  const frameTrack = document.getElementById("frameTrack");
  const frame = createStepFrame(gameData.steps[currentStepIndex]);

  frame.classList.add("active");
  frameTrack.appendChild(frame);
}

function createStepFrame(step) {
  selectedChoice = null;

  const frame = document.createElement("section");
  const chapter = document.createElement("p");
  const title = document.createElement("h2");
  const narration = document.createElement("p");
  const world = document.createElement("div");
  const choiceLayer = document.createElement("div");
  const feedback = document.createElement("p");
  const actions = document.createElement("div");
  const confirmButton = document.createElement("button");

  frame.className = "scene-frame";
  frame.dataset.sceneId = step.sceneId;
  frame.dataset.stepId = step.stepId;
  chapter.className = "frame-chapter";
  title.className = "frame-title";
  narration.className = "frame-narration";
  world.className = "frame-world";
  choiceLayer.className = "choice-layer";
  feedback.className = "choice-feedback";
  actions.className = "frame-actions";
  confirmButton.className = "confirm-choice";

  chapter.textContent = step.chapter;
  title.textContent = step.title;
  narration.textContent = step.narration;
  feedback.textContent = "请选择一个选项。";
  confirmButton.type = "button";
  confirmButton.textContent = "确认选择";
  confirmButton.disabled = true;

  step.choices.forEach((choice, index) => {
    const choiceButton = document.createElement("button");

    choiceButton.type = "button";
    choiceButton.className = `choice-object object-${String.fromCharCode(97 + index)}`;
    choiceButton.textContent = choice.choiceName;
    choiceButton.addEventListener("click", () => {
      selectedChoice = choice;
      choiceLayer.querySelectorAll(".choice-object").forEach((button) => {
        button.classList.remove("selected");
      });
      choiceButton.classList.add("selected");
      confirmButton.disabled = false;
      feedback.textContent = `已选择：${choice.choiceName}`;
    });
    choiceLayer.appendChild(choiceButton);
  });

  confirmButton.addEventListener("click", () => {
    if (!selectedChoice || isFrameTransitioning) {
      return;
    }

    recordChoice(step, selectedChoice);
    goToNextStep(step.transitionDirection || "slide-left");
  });

  actions.appendChild(confirmButton);
  frame.append(chapter, title, narration, world, choiceLayer, feedback, actions);
  return frame;
}

function recordChoice(step, choice) {
  playerChoices.push({
    sceneId: step.sceneId,
    stepId: step.stepId,
    choiceId: choice.choiceId,
    choiceName: choice.choiceName,
    riskTags: choice.riskTags || [],
    tendencyScores: choice.tendencyScores || {}
  });

  console.log("V2 playerChoices：", playerChoices);
}

function goToNextStep(direction) {
  const nextIndex = currentStepIndex + 1;

  if (nextIndex >= gameData.steps.length) {
    transitionToResult(direction);
    return;
  }

  transitionToFrame(createStepFrame(gameData.steps[nextIndex]), direction, () => {
    currentStepIndex = nextIndex;
  });
}

function transitionToResult(direction) {
  transitionToFrame(createResultFrame(), direction, () => {
    console.log("V2 全流程 8 条选择：", playerChoices);
  });
}

function createResultFrame() {
  const frame = document.createElement("section");
  const chapter = document.createElement("p");
  const title = document.createElement("h2");
  const narration = document.createElement("p");
  const output = document.createElement("pre");
  const actions = document.createElement("div");
  const restartButton = document.createElement("button");

  frame.className = "scene-frame result-frame";
  chapter.className = "frame-chapter";
  title.className = "frame-title";
  narration.className = "frame-narration";
  output.className = "result-output";
  actions.className = "frame-actions";

  chapter.textContent = "临时结果页";
  title.textContent = "8 次选择已完成";
  narration.textContent = "这里暂时只打印 playerChoices，后续再接正式风险和人格结算。";
  output.textContent = JSON.stringify(playerChoices, null, 2);
  restartButton.type = "button";
  restartButton.textContent = "重新测试 V2 流程";
  restartButton.addEventListener("click", restartFlow);

  actions.appendChild(restartButton);
  frame.append(chapter, title, narration, output, actions);
  return frame;
}

function restartFlow() {
  const frameTrack = document.getElementById("frameTrack");

  currentStepIndex = 0;
  selectedChoice = null;
  playerChoices = [];
  frameTrack.innerHTML = "";
  renderInitialFrame();
}

function transitionToFrame(nextFrame, direction = "slide-left", onComplete = () => {}) {
  if (isFrameTransitioning) {
    return;
  }

  const frameTrack = document.getElementById("frameTrack");
  const currentFrame = frameTrack.querySelector(".scene-frame.active");
  const enterClass = getEnterClass(direction);
  const leaveClass = getLeaveClass(direction);

  isFrameTransitioning = true;
  setButtonsDisabled(true);
  nextFrame.classList.add(enterClass, "is-moving");
  frameTrack.appendChild(nextFrame);

  requestAnimationFrame(() => {
    currentFrame.classList.remove("active");
    currentFrame.classList.add(leaveClass, "is-moving");
    nextFrame.classList.remove(enterClass);
    nextFrame.classList.add("active");
  });

  window.setTimeout(() => {
    currentFrame.remove();
    nextFrame.classList.remove("is-moving");
    isFrameTransitioning = false;
    setButtonsDisabled(false);
    onComplete();
  }, transitionDuration);
}

function getEnterClass(direction) {
  const classes = {
    "slide-left": "enter-from-right",
    "slide-right": "enter-from-left",
    "slide-up": "enter-from-bottom",
    "slide-down": "enter-from-top"
  };

  return classes[direction] || classes["slide-left"];
}

function getLeaveClass(direction) {
  const classes = {
    "slide-left": "leave-to-left",
    "slide-right": "leave-to-right",
    "slide-up": "leave-to-top",
    "slide-down": "leave-to-bottom"
  };

  return classes[direction] || classes["slide-left"];
}

function setButtonsDisabled(disabled) {
  document.querySelectorAll("button").forEach((button) => {
    button.disabled = disabled;
  });
}

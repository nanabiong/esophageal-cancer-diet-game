const dataFiles = {
  food: "data/food.json",
  scene: "data/scene.json",
  risk: "data/risk.json",
  persona: "data/persona.json",
  uiConfig: "data/ui-config.json"
};

let gameData = null;
let currentSceneIndex = 0;
let selectedFoodId = null;
let playerSelections = [];

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");
  const confirmButton = document.getElementById("confirmButton");
  const mealPlate = document.getElementById("mealPlate");

  startButton.addEventListener("click", handleStartClick);
  confirmButton.addEventListener("click", handleConfirmClick);
  mealPlate.addEventListener("dragover", handlePlateDragOver);
  mealPlate.addEventListener("dragleave", handlePlateDragLeave);
  mealPlate.addEventListener("drop", handlePlateDrop);
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

function handleStartClick() {
  if (!gameData) {
    showLoadError(new Error("配表还没有加载完成，请稍后再试。"));
    return;
  }

  console.log("游戏开始");
  currentSceneIndex = 0;
  selectedFoodId = null;
  playerSelections = [];

  document.getElementById("introScreen").classList.add("hidden");
  document.getElementById("resultScreen").classList.add("hidden");
  document.getElementById("sceneScreen").classList.remove("hidden");

  renderCurrentScene();
}

function renderCurrentScene() {
  const currentScene = gameData.scene[currentSceneIndex];
  const sceneFoods = currentScene.foodIds.map((foodId) => {
    return gameData.food.find((food) => food.id === foodId);
  });

  selectedFoodId = null;
  document.getElementById("sceneName").textContent = currentScene.name;
  document.getElementById("sceneDescription").textContent = currentScene.description;
  document.getElementById("confirmButton").classList.add("hidden");
  resetMealPlate();

  renderFoodCards(sceneFoods);
}

function renderFoodCards(foods) {
  const foodList = document.getElementById("foodList");
  foodList.innerHTML = "";

  foods.forEach((food) => {
    if (!food) {
      return;
    }

    const card = document.createElement("article");
    const name = document.createElement("h3");
    const hoverText = document.createElement("p");

    card.className = "food-card";
    card.dataset.foodId = food.id;
    card.draggable = true;
    hoverText.className = "food-hover-text";
    name.textContent = food.name;
    hoverText.textContent = food.hoverText;
    card.addEventListener("dragstart", handleFoodDragStart);
    card.addEventListener("dragend", handleFoodDragEnd);

    card.append(name, hoverText);
    foodList.appendChild(card);
  });
}

function selectFood(foodId) {
  const selectedFood = gameData.food.find((food) => food.id === foodId);

  if (!selectedFood) {
    return;
  }

  selectedFoodId = foodId;

  document.querySelectorAll(".food-card").forEach((card) => {
    card.classList.toggle("selected", card.dataset.foodId === foodId);
  });

  document.getElementById("plateText").textContent = selectedFood.name;
  document.getElementById("mealPlate").classList.add("has-food");
  document.getElementById("confirmButton").classList.remove("hidden");
}

function handleFoodDragStart(event) {
  event.dataTransfer.setData("text/plain", event.currentTarget.dataset.foodId);
  event.dataTransfer.effectAllowed = "move";
  event.currentTarget.classList.add("dragging");
}

function handleFoodDragEnd(event) {
  event.currentTarget.classList.remove("dragging");
}

function handlePlateDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = "move";
  event.currentTarget.classList.add("drag-over");
}

function handlePlateDragLeave(event) {
  event.currentTarget.classList.remove("drag-over");
}

function handlePlateDrop(event) {
  event.preventDefault();
  event.currentTarget.classList.remove("drag-over");

  const foodId = event.dataTransfer.getData("text/plain");
  selectFood(foodId);
}

function resetMealPlate() {
  const mealPlate = document.getElementById("mealPlate");
  const plateText = document.getElementById("plateText");

  mealPlate.classList.remove("drag-over", "has-food");
  plateText.textContent = "把食物拖到餐盘中";
}

function handleConfirmClick() {
  if (!selectedFoodId) {
    return;
  }

  playerSelections.push(selectedFoodId);
  console.log("本餐选择：", selectedFoodId);

  currentSceneIndex += 1;

  if (currentSceneIndex >= gameData.scene.length) {
    showResultScreen();
    return;
  }

  renderCurrentScene();
}

function showResultScreen() {
  const riskResult = calculateRisk(
    playerSelections,
    gameData.food,
    gameData.scene,
    gameData.risk
  );
  const persona = findPersonaByRiskIndex(riskResult.RiskIndex, gameData.persona);

  document.getElementById("sceneScreen").classList.add("hidden");
  document.getElementById("resultScreen").classList.remove("hidden");
  document.getElementById("riskIndexText").textContent =
    `RiskIndex：${riskResult.RiskIndex.toFixed(2)}`;
  renderPersonaResult(persona);

  console.log("玩家三次选择的 food id：", playerSelections);
  console.log("风险计算结果：", riskResult);
  console.log("匹配到的饮食人格：", persona);
}

function findPersonaByRiskIndex(riskIndex, personas) {
  return personas.find((persona) => {
    return riskIndex >= persona.minRiskIndex && riskIndex < persona.maxRiskIndex;
  }) || personas[personas.length - 1];
}

function renderPersonaResult(persona) {
  const personaResult = document.getElementById("personaResult");

  if (!persona) {
    personaResult.textContent = "暂未匹配到饮食人格。";
    return;
  }

  personaResult.innerHTML = "";

  const name = document.createElement("h3");
  const riskLevel = document.createElement("p");
  const description = document.createElement("p");
  const advice = document.createElement("p");

  name.textContent = persona.name;
  riskLevel.textContent = `风险等级：${persona.riskLevel}`;
  description.textContent = `人格描述：${persona.description}`;
  advice.textContent = `改善建议：${persona.advice}`;

  personaResult.append(name, riskLevel, description, advice);
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

# ACT3_INTERACTION_DATA.md

## 文件作用

这个文件用于说明第三幕 Act 3 的交互数据规则。

Figma 原型只是画面位置和运动参考。
开发时请以本文件中的命名、交互规则、风险标签合成规则和 playerChoices 记录结构为准。

第三幕目前包含两个正式选择：

1. act3_s01 食物入锅
2. act3_s02 饮品碰杯

---

# 一、act3_s01 食物入锅

## 交互类型

drag_food_to_pot

## 交互说明

玩家从多个菜品中拖动菜品到锅中。

锅有两个目标区域：

1. 清汤锅 clearPot
2. 辣锅 spicyPot

玩家需要拖入 3 个菜品后，完成第三幕第一轮选择。

这 3 个菜品作为一次“组合选择”记录到 playerChoices 中。

---

## food 对象

以下对象是可拖拽菜品：

- act3_s01_food_vegetable
- act3_s01_food_sausage
- act3_s01_food_youtiao
- act3_s01_food_luncheonMeat
- act3_s01_food_maodu
- act3_s01_food_daiRouCuiGu
- act3_s01_food_beefSlices

---

## target 对象

以下对象是拖拽目标：

- act3_s01_target_clearPot
- act3_s01_target_spicyPot

---

## 风险标签规则

每个 food 对象有自己的基础风险标签：

food.baseRiskTags

清汤锅不增加额外风险标签。

如果菜品拖入清汤锅：

finalRiskTags = unique(food.baseRiskTags)

辣锅会额外增加一个风险标签：

["辛辣饮食"]

如果菜品拖入辣锅：

finalRiskTags = unique([...food.baseRiskTags, "辛辣饮食"])

如果标签重复，需要去重。

---

## 食物入锅最终 playerChoices 记录结构

玩家拖入 3 个菜品后，向 playerChoices 里添加一条组合选择：

{
  sceneId: "act3",
  stepId: "act3_s01_foodChoice",
  interactionType: "drag_foods_to_pot",
  selectedFoods: [
    {
      foodId,
      foodName,
      targetId,
      targetName,
      baseRiskTags,
      targetRiskTags,
      riskTags,
      tendencyScores
    }
  ],
  riskTags,
  tendencyScores
}

其中：

riskTags 是 3 个菜品最终 riskTags 的合并结果，并且需要去重。

tendencyScores 是 3 个菜品 tendencyScores 的合并结果。

---

## 食物入锅完成条件

当玩家成功拖入 3 个菜品后：

1. 禁止继续拖入更多菜品
2. 记录一次 act3_s01_foodChoice 到 playerChoices
3. 进入 act3_state_02_food_choice_after_select

---

# 二、act3_s02 饮品碰杯

## 交互类型

drag_drink_to_cup

## 交互说明

玩家从饮品列表中拖动一个饮品到空杯位置，完成碰杯。

饮品选择是第三幕第二轮正式选择。

---

## drink 对象

以下对象是可拖拽饮品：

- act3_s02_drink_highAlcohol
- act3_s02_drink_lowAlcohol
- act3_s02_drink_softDrink
- act3_s02_drink_lemonWater

如果后续加入啤酒，可以增加：

- act3_s02_drink_beer

---

## target 对象

以下对象是拖拽目标：

- act3_s02_target_emptyCup

---

## 风险标签规则

饮品的风险标签只来自饮品本身。

finalRiskTags = drink.riskTags

target_emptyCup 只是拖拽目标，不增加风险标签。

不要把 drink + cup 写成独立选项。

---

## 饮品选择 playerChoices 记录结构

饮品拖入空杯后，向 playerChoices 添加一条选择：

{
  sceneId: "act3",
  stepId: "act3_s02_drinkChoice",
  interactionType: "drag_drink_to_cup",
  drinkId: "act3_s02_drink_highAlcohol",
  drinkName: "高度酒精酒",
  targetId: "act3_s02_target_emptyCup",
  targetName: "空杯位置",
  riskTags: ["高量饮酒"],
  tendencyScores: {}
}

---

## 饮品选择完成条件

当玩家成功把 1 个饮品拖入空杯后：

1. 记录一次 act3_s02_drinkChoice 到 playerChoices
2. 第三幕 Act 3 完成
3. 进入下一幕占位画框

---

# 三、重要开发原则

不要把每一种 food + pot 组合写成独立按钮。

错误方式：

maodu_spicy
maodu_clear
vegetable_spicy
vegetable_clear

正确方式：

food + target

由代码动态生成最终 riskTags。

food 和 target 必须分开。

drink 和 target 必须分开。

target_emptyCup 不增加风险标签。

---

# 四、调试要求

开发完成后，需要在控制台打印 playerChoices。

其中应该至少包含两条第三幕选择：

1. act3_s01_foodChoice
2. act3_s02_drinkChoice

act3_s01_foodChoice 里应该有 selectedFoods 数组，长度为 3。

act3_s02_drinkChoice 里应该有 drinkId、drinkName、riskTags。

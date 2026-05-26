# ACT3_CURRENT_STRUCTURE.md

## 1. 当前项目主要文件结构

```text
index.html
style.css
game.js
README.md

assets/
  audio/
  images/
    act3/
      background/
      cup/
      drink/
      effects/
      food/
      hotpot/
      ui/

data/
  act3-choices.json
  layouts-act3.json
  choice-values.json
  risk-tags.json
  personality-results.json
  food.json
  risk.json
  persona.json
  scenes.json
  choices.json
  acts.json
  ui-config.json

docs/
  ACT3_INTERACTION_DATA.md
  ACT3_STATE_MACHINE.md
  ACT3_DEV_RULES.md
  ACT3_CURRENT_STRUCTURE.md
```

## 2. Act 3 的核心文件

### game.js

Act 3 的主运行逻辑文件，包含：

- 数据加载
- 舞台缩放
- 状态机
- 对象渲染
- food 拖拽
- drink 拖拽
- 干杯动画
- 气泡系统
- 装饰效果
- hover 信息
- 第三幕结束转场
- result galaxy 占位层

### style.css

Act 3 的主要样式文件，包含：

- 舞台样式
- 对象样式
- 图片显示样式
- 拖拽状态样式
- hover / hint 动画
- introBubble / guidanceBubble 样式
- floating bubble 样式
- cheers 动画
- Act 3 exit 动画
- result galaxy 占位样式

### data/layouts-act3.json

Act 3 的布局配置文件，包含：

- stage 基准尺寸
- 状态布局
- 顶层对象位置和尺寸
- children 位置和尺寸
- `image` / `bgImage` 路径
- intro 气泡配置
- guidance 气泡配置
- 装饰气泡部分配置

### data/act3-choices.json

Act 3 的交互数据文件，包含：

- food 数据
- food target 数据
- drink 数据
- drink target 数据
- riskTags
- tendencyScores

### docs/ACT3_INTERACTION_DATA.md

第三幕交互数据规则文档。

### docs/ACT3_STATE_MACHINE.md

第三幕状态机说明文档。

## 3. Act 3 当前状态流转

当前 Act 3 大致流转为：

```text
intro
  ↓
food choice
  ↓
drink choice
  ↓
cheers
  ↓
exit
  ↓
result galaxy placeholder
```

### intro

使用滚轮推进 intro 气泡和标题画框。

相关函数：

- `startAct3Intro()`
- `handleStageWheel()`
- `handleIntroWheel()`
- `advanceIntroStep()`
- `playIntroTitleToFoodChoice()`
- `showIntroBubble()`
- `hideIntroBubble()`

### food choice

玩家拖 3 个 food 到清汤锅或辣锅。

相关状态：

- `ACT3_STATES.FOOD_CHOICE`

### drink choice

玩家拖 1 个 drink 到 emptyCup。

相关状态：

- `ACT3_STATES.DRINK_CHOICE`

### cheers

drink drop 成功后触发：

- selected drink 留在 emptyCup 位置
- emptyCup 隐藏
- otherCup 与 selected drink 干杯
- 星星闪光出现

### exit

第三幕完成后进入 ready-to-exit。用户第一次向下滚轮触发 Act 3 离场动画。

### result galaxy placeholder

当前只是低保真占位层：

- `result_state_01_diet_galaxy`
- 文案：饮食星系 / 你的饮食倾向正在汇聚……

## 4. food 选择数据如何记录

food 拖入锅后，先记录到 `selectedFoods`。

每个 selected food 包含：

- `foodId`
- `foodName`
- `targetId`
- `targetName`
- `baseRiskTags`
- `targetRiskTags`
- `riskTags`
- `tendencyScores`

当选择满 3 个 food 后，调用：

- `recordAct3FoodChoice()`

然后向 `playerChoices` 添加一条组合选择记录。

## 5. drink 选择数据如何记录

drink 拖入 emptyCup 后，调用：

- `handleDrinkDrop()`

drink choice 直接写入 `playerChoices`。

记录包含：

- `sceneId`
- `stepId`
- `interactionType`
- `drinkId`
- `drinkName`
- `targetId`
- `targetName`
- `riskTags`
- `tendencyScores`

## 6. playerChoices 当前结构说明

Act 3 中 `playerChoices` 至少包含两条记录：

### act3_s01_foodChoice

组合选择，代表玩家选择的 3 个 food。

核心字段：

- `sceneId: "act3"`
- `stepId: "act3_s01_foodChoice"`
- `interactionType: "drag_foods_to_pot"`
- `selectedFoods`
- `riskTags`
- `tendencyScores`

### act3_s02_drinkChoice

单项选择，代表玩家选择的 drink。

核心字段：

- `sceneId: "act3"`
- `stepId: "act3_s02_drinkChoice"`
- `interactionType: "drag_drink_to_cup"`
- `drinkId`
- `drinkName`
- `targetId`
- `targetName`
- `riskTags`
- `tendencyScores`

## 7. 负责 food 拖拽的函数

主要函数：

- `bindFoodPointerDrag()`
- `startFoodPointerDrag()`
- `moveFoodPointerDrag()`
- `finishFoodPointerDrag()`
- `cancelFoodPointerDrag()`
- `restoreFoodDragElement()`
- `getFoodDropTargetAtPoint()`
- `removeFoodPointerListeners()`
- `handleFoodDrop()`
- `lockFoodDragSources()`
- `syncUsedFoodState()`

重要状态：

- `activeFoodDrag`
- `selectedFoods`
- `usedFoodIds`
- `isFoodChoiceLocked`

## 8. 负责 drink 拖拽的函数

主要函数：

- `bindDragSource()`
- `bindDropTarget()`
- `canAcceptDrop()`
- `handleDrinkDrop()`
- `placeSelectedDrinkInCup()`
- `lockDrinkDragSources()`

重要状态：

- `selectedDrinkId`
- `isDrinkChoiceLocked`
- `dragPayload`

## 9. 负责干杯动画的函数

主要函数：

- `playCheersAnimation()`
- `scheduleCheersSparkles()`
- `spawnCheersSparkles()`
- `ensureCheersSparkleLayer()`

相关 CSS：

- `cheers-left`
- `cheers-right`
- `cheersSparkleBurst`
- `cheers-sparkle-layer`

## 10. 负责气泡引导的函数

introBubble：

- `showIntroBubble()`
- `hideIntroBubble()`
- `startTypewriter()`
- `stopTypewriter()`

guidanceBubble：

- `showFoodGuidance()`
- `showDrinkGuidance()`
- `showGuidanceBubble()`
- `startGuidanceTypewriter()`
- `hideGuidanceBubbles()`

提示动画：

- `triggerFoodSelectableHint()`
- `triggerDrinkSelectableHint()`
- `triggerHintPulse()`
- `triggerOtherCupWiggle()`

## 11. 负责装饰气泡的函数

hotpot floating bubbles：

- `getHotpotFloatingBubbleConfig()`
- `ensureHotpotFloatingBubbleLayer()`
- `startHotpotFloatingBubbles()`
- `scheduleHotpotFloatingBubble()`
- `spawnHotpotFloatingBubble()`
- `stopHotpotFloatingBubbles()`

cheer zone breath bubble：

- `getCheerZoneBreathBubbleConfig()`
- `ensureCheerZoneBreathBubble()`
- `syncCheerZoneBreathBubbleImage()`
- `showCheerZoneBreathBubble()`
- `hideCheerZoneBreathBubble()`

## 12. 负责 hover 信息的函数

主要函数：

- `createHoverInfoTooltip()`
- `bindHoverInfo()`
- `shouldSuppressHoverInfo()`
- `scheduleShowHoverInfo()`
- `scheduleHideHoverInfo()`
- `showHoverInfoTooltip()`
- `hideHoverInfoTooltip()`
- `positionHoverInfoTooltip()`

配置：

- `ACT3_HOVER_INFO`
- `HOVER_TOOLTIP_CONFIG`

## 13. 负责 Act 3 结束转场的函数

主要函数：

- `enableAct3ScrollExit()`
- `handleAct3ExitWheel()`
- `startAct3ExitSequence()`
- `ensureResultGalaxyLayer()`
- `updateResultGalaxyProgress()`
- `enterResultGalaxyState()`

相关状态：

- `isAct3Complete`
- `isAct3ScrollExitEnabled`
- `isAct3ExitAnimating`
- `hasAct3ExitStarted`
- `act3ExitProgress`
- `resultGalaxyLayer`
- `currentPhase`

相关 CSS：

- `.act3-exit-sequence`
- `act3ExitTitle`
- `act3ExitDrink`
- `act3ExitCheers`
- `act3ExitHotpot`
- `.result-galaxy-layer`
- `.result-enter`

## 14. 后续结算画面应该从哪里读取数据

后续结算画面应优先读取：

- `playerChoices`

其中：

- 医学风险线读取 `riskTags`
- 饮食人格线读取 `tendencyScores`
- 选择展示读取 `foodName` / `drinkName` / `selectedFoods`

不要从 DOM 中反推玩家选择。

不要从图片元素或 class 中计算结算数据。

## 15. 后续结算画面开发建议

建议新增独立函数区，例如：

```text
Result state helpers
Result data calculation
Result rendering
Result transitions
```

建议不要把结算逻辑插入以下核心逻辑中：

- food 拖拽函数
- drink 拖拽函数
- drop 判定函数
- `recordAct3FoodChoice()`
- `handleDrinkDrop()`
- `applyState()`
- `syncChildObjects()`

更安全的做法是：

1. 等 Act 3 完成后读取 `playerChoices`。
2. 单独计算结果。
3. 单独渲染 result layer。
4. 单独处理结果页动画。


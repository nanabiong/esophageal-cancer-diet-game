# PROJECT_HANDOFF.md

## 1. 项目当前类型

- 纯前端 HTML5 网页游戏原型
- 互动绘本 / 互动式叙事测试
- 当前开发重点是 Act 3，以及 Act 3 结束后衔接的结算页入口

## 2. 当前主要文件结构

```text
index.html
style.css
game.js

data/
  layouts-act3.json
  act3-choices.json
  ...（其余旧数据文件先保留，不作为当前重点）

docs/
  ACT3_DEV_RULES.md
  ACT3_CURRENT_STRUCTURE.md
  ACT3_INTERACTION_DATA.md
  ACT3_STATE_MACHINE.md
  PROJECT_HANDOFF.md
```

当前 Act 3 最重要的文件：

- `index.html`
- `style.css`
- `game.js`
- `data/layouts-act3.json`
- `data/act3-choices.json`
- `docs/ACT3_DEV_RULES.md`
- `docs/ACT3_CURRENT_STRUCTURE.md`

## 3. 当前 Act 3 已完成功能

当前第三幕已经基本跑通，已完成的核心功能包括：

- intro 气泡
- main title 过渡
- food 选择
- food 拖拽进清汤锅 / 辣锅
- `usedFoodIds` 持久隐藏
- drink 选择
- drink 拖到 `emptyCup`
- selected drink 留在目标位置
- `otherCup` 干杯动画
- 干杯星星效果
- hover 信息 tooltip
- guidance bubbles
- hotpot floating bubbles
- cheer zone breath bubble
- Act 3 结束离场动画
- `result_state_01_diet_galaxy` 低保真占位结果层

补充说明：

- 当前 `game.js` 中结果占位层 id 是 `result_state_01_diet_galaxy`
- 当前阶段状态常量中结果阶段是 `PHASES.RESULT_GALAXY`

## 4. 当前绝对不能乱改的核心逻辑

以下内容是当前最敏感、最容易一改就连锁出问题的部分：

- `playerChoices` 结构
- `riskTags` 规则
- food drop 规则
- drink drop 规则
- `usedFoodIds`
- `selectedDrinkId`
- `isDrinkChoiceLocked`
- 父子结构
- `DESIGN_WIDTH = 1920`
- `DESIGN_HEIGHT = 920`

进一步说明：

- food 外层 div 负责定位、拖拽、碰撞；图片只负责视觉
- drink 外层 div 负责定位、拖拽、碰撞；图片只负责视觉
- `usedFoodIds` 必须在状态切换后继续生效，不能只依赖 DOM class
- selected drink 放到 emptyCup 后，尺寸不能直接套用 emptyCup 尺寸
- 不要把对象从父框里随意移到 stage 顶层

## 5. 当前食物 / 锅底 / 饮品 id 对照

### food ids

- `act3_s01_food_vegetable`
- `act3_s01_food_sausage`
- `act3_s01_food_youtiao`
- `act3_s01_food_luncheonMeat`
- `act3_s01_food_maodu`
- `act3_s01_food_daiRouCuiGu`
- `act3_s01_food_beefSlices`

### pot ids

- `act3_s01_target_clearPot`
- `act3_s01_target_spicyPot`

### drink ids

- `act3_s02_drink_highAlcohol`
- `act3_s02_drink_lowAlcohol`
- `act3_s02_drink_softDrink`
- `act3_s02_drink_lemonWater`
- `act3_s02_drink_beer`：当前数据里已预留，但不是当前主流程重点

饮品名称对照：

- `highAlcohol = 威士忌`
- `lowAlcohol = 啤酒`
- `softDrink = 蜜瓜苏打`
- `lemonWater = 柠檬水`

## 6. 当前接下来要做的任务

下一阶段建议继续推进这些内容：

1. 继续完善结算前过渡页 / 饮食星系定位页
2. 后续进入结算页 1：饮食星系
3. 根据 `playerChoices` 计算饮食倾向
4. 输出饮食人格
5. 后续再做风险分数结算页

当前建议节奏：

- 先把 Act 3 到结算页 1 的衔接做稳定
- 再做饮食人格结果展示
- 最后再接风险分数页

## 7. 新 Codex 对话开始时应该先读

新对话开始时，建议先读这 3 份文档：

- `docs/ACT3_DEV_RULES.md`
- `docs/ACT3_CURRENT_STRUCTURE.md`
- `docs/PROJECT_HANDOFF.md`

如果要进一步核对交互规则，再补读：

- `docs/ACT3_INTERACTION_DATA.md`
- `docs/ACT3_STATE_MACHINE.md`

## 8. 新对话继续开发时的原则

- 小步修改
- 不重构
- 每次只做一个功能
- 不改已经稳定的 Act 3 拖拽和选择逻辑
- 结算页逻辑尽量新增独立函数区，不要插入 food / drink 核心逻辑

更具体地说：

- 不要顺手清理不确定是否还在使用的旧函数 / 旧 class
- 不要把结算逻辑塞进 `handleDrinkDrop()`、food 拖拽主链路、或状态切换核心逻辑里
- 优先新增独立的 result helper / result render / result transition 函数区
- 每次改动前先确认这次只碰一个明确目标

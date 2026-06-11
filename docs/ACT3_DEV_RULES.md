# ACT3_DEV_RULES.md

## 1. Act 3 修改的核心保护原则

Act 3 当前已经包含状态切换、拖拽、图片资产、气泡、装饰效果、hover 信息和结束转场。后续修改必须小步进行。

- 每次只修改本次任务明确要求的部分。
- 不要顺手重构稳定功能。
- 不要在没有验证的情况下删除旧函数或旧 class。
- 不要修改已经跑通的 `playerChoices`、风险标签、拖拽、drop 和状态机规则。
- 视觉层、交互层、数据层要分开处理。

## 2. 不允许随意修改的数据结构

以下数据结构会影响后续结算，不允许随意改字段名、层级或含义。

### playerChoices

`playerChoices` 是玩家选择记录。Act 3 中至少包含：

- `act3_s01_foodChoice`
- `act3_s02_drinkChoice`

不要改写已有记录结构。

### riskTags

`riskTags` 用于医学风险线计算。

- food 拖入清汤锅：使用 food 自身基础风险标签。
- food 拖入辣锅：在 food 基础风险标签上额外合并 `"辛辣饮食"`。
- drink 的风险标签只来自 drink 自身。

不要把 `riskTags` 和人格倾向分数混在一起。

### tendencyScores

`tendencyScores` 用于饮食人格线计算。

- 不要把它当作风险标签。
- 不要删除空对象 `{}`。
- 不要改成数组或字符串。

## 3. food 拖拽规则

- food 外层 DOM 元素负责拖拽、定位、碰撞和状态。
- food 图片只负责视觉显示。
- 不要把 food 外层元素直接改成 `img`。
- food 成功 drop 后必须写入 `usedFoodIds`。
- `usedFoodIds` 是持久 UI 状态，不能只依赖 DOM class。
- `.is-used` 状态在状态切换后不能丢失。
- 已 used 的 food 不显示、不再拖拽、不再 hover。
- 未成功 drop 时，food 必须能回到原位。
- food 拖拽逻辑稳定后，除非任务明确要求，不要改 `startFoodPointerDrag()`、`finishFoodPointerDrag()`、`restoreFoodDragElement()`。

## 4. drink 拖拽规则

- `selectedDrinkId` 记录已选择饮品。
- `isDrinkChoiceLocked` 控制饮品选择完成后的锁定。
- drink 成功 drop 到 emptyCup 后，selected drink 必须留在 emptyCup 的目标位置。
- selected drink 不应该回到 drinkTable 原位置。
- selected drink 的尺寸不能套用 emptyCup 尺寸。
- emptyCup 只提供目标中心点。
- selected drink 尺寸应来自原 drink 尺寸乘以可调比例。
- drink drop 成功后不允许再次选择其他 drink。
- 不要修改 `playerChoices` 中 drink choice 的结构。

## 5. 父子结构规则

父子结构是 Act 3 动画和视觉跟随的基础，不能随意打散。

- food 必须是 `act3_s01_main_hotpotTable` 的 children。
- clearPot / spicyPot 必须是 `act3_s01_main_hotpotTable` 的 children。
- drink 必须是 `act3_s02_main_drinkTable` 的 children。
- `otherCup` / `emptyCup` / `selectedDrink` 必须在 `act3_s02_targetzone_cheers` 中。
- hotpot floating bubbles 必须挂在 `act3_s01_main_hotpotTable` 内。
- cheer zone breath bubble 必须挂在 `act3_s02_targetzone_cheers` 内。
- cheers sparkle layer 必须挂在 `act3_s02_targetzone_cheers` 内。
- 装饰气泡不要放到 stage 顶层。

## 6. image / bgImage 使用规则

- 单个物体使用 `image`。
- 父画框背景使用 `bgImage`。
- 外层 div 不能删除。
- 外层 div 继续负责定位、动画、拖拽、碰撞和父子结构。
- `img.asset-image` 只负责视觉显示。
- `img.frame-bg-image` 只负责父画框背景显示。
- 图片必须 `pointer-events: none`。
- 图片不存在时应回退到低保真占位，不应导致页面崩溃。

## 7. 气泡系统规则

Act 3 目前有两类正式气泡：

- `introBubble`
- `guidanceBubble`

规则：

- intro 阶段使用 introBubble。
- 食物选择和饮品选择阶段使用 guidanceBubble。
- 旧的低保真 narration bubble 不应再显示。
- 不要同时显示旧占位气泡和正式气泡。
- 气泡图片可替换，但外层气泡 div 负责位置和尺寸。
- 气泡文字逐字出现逻辑不要和拖拽逻辑混在一起。

## 8. 装饰效果规则

装饰效果只负责视觉，不参与交互。

### hotpot floating bubbles

- 必须是 `act3_s01_main_hotpotTable` 的 child。
- 必须 `pointer-events: none`。
- 不影响 food 拖拽和锅底 drop。

### cheer zone breath bubble

- 必须是 `act3_s02_targetzone_cheers` 的 child。
- 必须 `pointer-events: none`。
- 不影响 emptyCup drop。

### cheers sparkle layer

- 必须是 `act3_s02_targetzone_cheers` 的 child。
- 只在干杯动画时出现。
- 不要无限循环。
- 动画结束后清理 DOM。

### hint pulse

- 只提示当前可选择对象。
- used food 不播放。
- selected drink 不播放。
- dragging 时不要叠加 hint 动画。

## 9. hover info 规则

- tooltip 是全局唯一浮窗。
- tooltip 必须 `pointer-events: none`。
- tooltip 不影响 food / drink 拖拽。
- tooltip 不影响 clearPot / spicyPot / emptyCup 的 drop 命中。
- used food 不显示 tooltip。
- 拖拽开始时必须隐藏 tooltip。
- tooltip 坐标需要考虑 game-stage 缩放。

## 10. 滚轮规则

Act 3 目前有不同滚轮阶段：

- intro wheel：推进第三幕开头气泡和标题。
- Act 3 exit wheel：第三幕完成后触发离场动画。

规则：

- 不要让 intro wheel 和 exit wheel 同时生效。
- 食物选择和饮品选择过程中不要触发 exit wheel。
- 第三幕完成前不要允许离场。
- 离场动画触发后应防止重复触发。
- 不要把滚轮逻辑和拖拽逻辑混在一起。

## 11. 舞台尺寸规则

当前设计基准尺寸是：

```text
1920 × 920
```

规则：

- 不要改回 `1440 × 900`。
- 不要使用 `scaleX` 和 `scaleY` 分别缩放。
- 只能使用统一 scale。
- `layouts-act3.json` 中的坐标按 `1920 × 920` 理解。
- 不要为了铺满浏览器强行拉伸舞台比例。

## 12. 最小修改原则

后续开发必须遵守：

- 每次只改本次任务。
- 不重构。
- 不顺手清理不确定的代码。
- 不删除不确定是否仍在使用的函数或 class。
- 不修改稳定的拖拽、drop、状态机和记录逻辑。
- 如果需要清理旧代码，先写报告，再单独处理。


# CLEANUP_PLAN_BEFORE_ACT1_ACT2.md

## 1. 当前必须保留的文件

这些文件属于当前已经跑通的 `act0 -> act3 -> result demo` 主链路，整理时不要移动、删除或改名。

### 运行入口

- `index.html`
- `style.css`
- `game.js`

### 当前运行数据

- `data/layouts-act0.json`
- `data/act3-choices.json`
- `data/layouts-act3.json`
- `data/layouts-result.json`

### 当前运行资源

- `assets/images/act0/clock/clock-body.png`
- `assets/images/act0/clock/hand-hit.png`
- `assets/images/act3/`

说明：

- `assets/images/act0/clock/hour-hand.png`
- `assets/images/act0/clock/minute-hand.png`
- `assets/images/act0/clock/ring-lines.png`
- `assets/images/result/shapes/`
- `assets/images/result/planet/`

这些路径虽然部分文件当前可能不存在，但已经作为可替换资产路径写入配置。不要因为文件暂缺就删除配置路径。

### 必须保留文档

- `docs/ACT3_DEV_RULES.md`
- `docs/ACT3_CURRENT_STRUCTURE.md`
- `docs/PROJECT_HANDOFF.md`
- `docs/ACT3_INTERACTION_DATA.md`
- `docs/ACT3_STATE_MACHINE.md`

## 2. 当前可以暂时保留但不应继续依赖的旧文件

这些文件当前没有被 `game.js` 直接 `fetch` 或 `import`，后续开发时不要继续在新逻辑里直接依赖它们，除非先确认字段含义并完成迁移。

- `data/acts.json`
- `data/choice-values.json`
- `data/choices.json`
- `data/food.json`
- `data/personality-results.json`
- `data/scenes.json`
- `data/ui-config.json`

建议处理方式：

- 先保留原文件。
- 不在 Act1 / Act2 新逻辑里继续追加旧字段。
- 如果其中有可复用内容，迁移到新的 `choices-act1.json`、`choices-act2.json` 或布局文件中。

## 3. 当前疑似废弃但不能马上删除的文件

这些文件看起来不在当前运行链路里，但可能和后续真实人格、风险计算有关。进入真实数值表前，不建议直接删除。

- `data/persona.json`
- `data/risk.json`
- `data/risk-tags.json`
- `data/act1.json`

说明：

- `data/act1.json` 很可能会成为 Act1 早饭开发的参考，不建议归档。
- `data/risk-tags.json` 当前没有直接参与运行，但未来真实风险表可能需要统一标签来源。
- `data/persona.json` 与 `data/risk.json` 可能包含旧版人格 / 风险草稿，建议先比对再决定迁移或归档。

## 4. 建议迁移到 archive/ 的文件清单

建议建立类似下面的暂存目录，而不是直接删除旧文件：

```text
archive/
  data-before-act1-act2/
```

优先建议暂存：

- `data/choices.json`
- `data/personality-results.json`
- `data/ui-config.json`
- `data/food.json`

可在确认后暂存：

- `data/scenes.json`
- `data/acts.json`
- `data/choice-values.json`

暂不建议归档：

- `data/act1.json`
- `data/risk.json`
- `data/risk-tags.json`
- `data/persona.json`
- `data/layouts-act0.json`
- `data/layouts-act3.json`
- `data/layouts-result.json`
- `data/act3-choices.json`

## 5. 建议保留的数据文件结构

后续建议把数据结构逐步整理成下面这组文件，避免 Act1 / Act2 / Act3 混在同一个旧表里。

```text
data/
  layouts-act0.json
  layouts-act1.json
  layouts-act2.json
  layouts-act3.json
  layouts-result.json

  choices-act1.json
  choices-act2.json
  act3-choices.json

  risk-tags.json
  persona.json
```

建议职责：

- `layouts-act0.json`：Act0 闹钟位置、大小、图片路径、动画参数。
- `layouts-act1.json`：Act1 早饭场景布局、对象位置、气泡位置、装饰层参数。
- `layouts-act2.json`：Act2 午饭场景布局、对象位置、气泡位置、装饰层参数。
- `layouts-act3.json`：Act3 晚餐场景布局，不要混入 Act1 / Act2。
- `layouts-result.json`：结算过渡页、结算页 1、风险页 demo 和后续结果页布局。
- `choices-act1.json`：Act1 早饭选择项、结果记录字段、倾向分数、风险标签。
- `choices-act2.json`：Act2 午饭选择项、结果记录字段、倾向分数、风险标签。
- `act3-choices.json`：Act3 当前已跑通选择项，暂时保持原结构。
- `risk-tags.json`：真实风险标签定义表，后续统一标签 id、中文名、解释和权重。
- `persona.json`：真实饮食人格维度、结果类型、文案和规则。

## 6. game.js 后续建议拆分方向

本次不拆 `game.js`。后续如果要拆，建议按稳定边界拆，而不是按代码长度拆。

建议方向：

- `core/stage.js`：舞台尺寸、缩放、通用事件入口、状态切换辅助。
- `acts/act0.js`：Act0 闹钟导入。
- `acts/act1.js`：Act1 早饭。
- `acts/act2.js`：Act2 午饭。
- `acts/act3.js`：Act3 晚餐流程。
- `result/result-galaxy.js`：结算过渡页和饮食星系页。
- `result/result-risk.js`：风险说明页和风险指数页。
- `data/loaders.js`：统一数据加载和 fallback merge。
- `utils/math.js`：`clamp`、`lerp`、随机数、缓动函数。

拆分前提：

- 先完成 Act1 / Act2 的数据字段统一。
- 保证 `playerChoices` 写入结构不变或有清晰迁移方案。
- 不要在拆分时同时改交互行为。

## 7. 进入真实数值表前，需要统一的字段命名

建议先统一这些字段，避免后续人格计算和风险计算混乱。

### 选择记录字段

- `actId`
- `stateId`
- `choiceId`
- `choiceType`
- `choiceLabel`
- `choiceGroup`
- `selectedAt`

### 人格倾向字段

- `tendencyScores`
- `personaDimension`
- `personaValue`
- `personaWeight`

说明：

- 人格倾向只用于饮食人格。
- 不要把人格倾向和医学风险标签混在一起。

### 风险字段

- `riskTags`
- `riskTagId`
- `riskCategory`
- `riskWeight`
- `riskEvidenceText`

说明：

- `riskTags` 应该是稳定标签。
- 后续可以在 `risk-tags.json` 里维护标签定义。
- 选择项里只引用标签 id 或标签数组。

### 布局字段

- `id`
- `type`
- `x`
- `y`
- `width`
- `height`
- `scale`
- `image`
- `bgImage`
- `children`
- `zIndex`

### 文案字段

- `title`
- `subtitle`
- `body`
- `caption`
- `tooltip`
- `guidanceText`

## 8. 后续 Act1 / Act2 应该复用的结构

Act1 / Act2 不建议重新发明一套完全不同结构，应该复用当前已经跑通的几个稳定模式。

### 复用 Act3 的选择记录方式

- 每次有效选择写入 `playerChoices`。
- 每个选择项同时携带 `tendencyScores` 和 `riskTags`。
- `riskTags` 不直接和人格分数混用。

### 复用 Act3 的布局思想

- 外层 div 负责定位、交互、动画和状态。
- 图片只负责视觉显示。
- 父子结构不要随意打散。
- 不存在的图片应该 fallback，不让页面崩溃。

### 复用 Act3 的交互分层

- 视觉装饰层必须 `pointer-events: none`。
- 选择对象负责 hover / click / drag。
- drop target 单独处理命中逻辑。
- tooltip / guidance bubble 不参与选择逻辑。

### 复用 Result 的配置方式

- 视觉参数放入 `layouts-result.json` 或对应 act layout 文件。
- 代码里保留 fallback 默认配置。
- JSON 缺字段时页面不能崩。

### Act1 / Act2 建议先定清楚

- 每个 Act 有几个选择阶段。
- 每个阶段写入 `playerChoices` 的 `stateId` 是什么。
- 每个选择项是否会影响人格、风险，还是只影响视觉。
- 每个选择项的图片、位置、文案和 hover 信息分别放在哪个文件。

## 9. 当前不建议整理的内容

以下内容等 Act1 / Act2 跑通后再整理更安全：

- Act3 拖拽 / drop 函数。
- Act3 `playerChoices` 写入逻辑。
- Act3 `riskTags` 合并逻辑。
- Act3 已有布局坐标。
- Result 星云、中心行星、风险页滚轮阶段。
- 已经跑通的 Act0 入口流程。

## 10. 建议执行顺序

1. 保持当前运行链路不动。
2. 新建 `layouts-act1.json` 和 `choices-act1.json`。
3. 先跑通 Act1 最小交互。
4. 新建 `layouts-act2.json` 和 `choices-act2.json`。
5. 跑通 Act2 最小交互。
6. 再统一真实数值表字段。
7. 最后处理 `archive/` 暂存旧数据。


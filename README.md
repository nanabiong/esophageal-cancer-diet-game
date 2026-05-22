# 食管癌饮食数感游戏 V2

这是 V2 的最小画框系统原型。

当前阶段验证：

- 全屏漫画舞台 `comic-stage`
- 直角手绘画框 `scene-frame`
- 多画框同时存在
- 画框平移进入和离开
- `slide-left`、`slide-right`、`slide-up`、`slide-down` 四种方向
- 动画期间禁止重复点击
- 4 个场景
- 每个场景 2 个 step
- 全流程 8 次选择
- 临时结果页打印 `playerChoices`

暂不包含：

- 风险计算
- 饮食人格结算
- 高保真美术

## 文件结构

```text
index.html
style.css
game.js
data/
  scenes.json
  choices.json
  risk-tags.json
  personality-results.json
```

## 测试方法

请使用 VS Code Live Server 打开 `index.html`。

依次完成 8 个低保真选择，最后进入临时结果页查看 `playerChoices`。

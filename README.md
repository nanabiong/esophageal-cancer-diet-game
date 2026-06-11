# 食管癌饮食数感游戏 V2

这是 V2 的第三幕 Act 3 低保真交互原型。

当前阶段验证：

- 全屏漫画舞台 `comic-stage`
- 直角手绘画框 `scene-frame`
- 画框平移进入和离开
- `slide-left`、`slide-right`、`slide-up`、`slide-down` 四种方向
- 动画期间禁止重复点击
- Act 3 状态机
- 食物拖入清汤锅 / 辣锅
- 3 个食物合成一次组合选择
- 饮品拖入空杯完成碰杯选择
- 完成页打印 `playerChoices`

暂不包含：

- 风险计算
- 饮食人格结算
- 高保真美术
- 完整四幕流程


## 文件结构

```text
index.html
style.css
game.js
data/
  act3-choices.json
  layouts-act3.json
docs/
  ACT3_INTERACTION_DATA.md
```

## 测试方法

请使用 VS Code Live Server 打开 `index.html`。

1. 进入标题画框，点击空白区域。
2. 把 3 个食物拖进清汤锅或辣锅。
3. 选满 3 个食物后会自动进入碰杯画框。
4. 把 1 个饮品拖进空杯位置。
5. 进入完成页后，打开浏览器控制台查看 `playerChoices`。

`playerChoices` 至少应包含：

- `act3_s01_foodChoice`
- `act3_s02_drinkChoice`

测试提交，请忽略。
再测试
# ACT3_STATE_MACHINE.md

## 说明

Figma 原型只是视觉位置和运动参考，开发时以本文件中的标准命名和状态机为准。

第三幕只做低保真画框系统和交互验证，不做最终美术。

---

## 第三幕状态机

### act3_state_00_title_intro

对应 Figma：ACT3_00_Title

元素：

- act3_s00_main_title
- act3_s00_narration_1

运动：

- act3_s00_main_title 以左上角为基点，从小到大等比例扩大到目标状态。
- 点击空白处后进入 act3_state_01_food_choice。

---

### act3_state_01_food_choice

对应 Figma：ACT3_01_FoodChoice

元素：

- act3_s00_main_title_pinned
- act3_s01_main_hotpotTable
- act3_s01_narration_2
- act3_s01_hint_dragFood
- act3_s01_target_clearPot
- act3_s01_target_spicyPot
- act3_s01_food_vegetable
- act3_s01_food_sausage
- act3_s01_food_youtiao
- act3_s01_food_luncheonMeat
- act3_s01_food_maodu
- act3_s01_food_daiRouCuiGu
- act3_s01_food_beefSlices

运动：

- act3_s00_main_title 移动到右上角并缩小，形成 pinned 状态。
- act3_s01_main_hotpotTable 从下向上进入目标位置。
- act3_s01_narration_2 从下向上进入或浮现。
- act3_s00_main_title 上方持续冒出对话气泡。气泡可堆叠，停留时间不固定。

交互：

- 玩家拖动 3 个菜品到锅中。
- 可拖拽对象是 act3_s01_food_*。
- 拖拽目标是 act3_s01_target_clearPot 和 act3_s01_target_spicyPot。

风险规则：

- 拖入清汤锅：finalRiskTags = unique(food.baseRiskTags)
- 拖入辣锅：finalRiskTags = unique(food.baseRiskTags + ["辛辣饮食"])
- 若重复标签则去重。

记录规则：

- 3 个菜品全部拖入后，记录一次 act3_s01_foodChoice 组合选择。
- playerChoices 中记录 selectedFoods 数组。
- 每个 selectedFood 记录 foodId、foodName、targetId、targetName、baseRiskTags、targetRiskTags、riskTags、tendencyScores。
- 组合选择本身也记录合并后的 riskTags 和 tendencyScores。

完成条件：

- 玩家成功拖入 3 个菜品后进入 act3_state_02_food_choice_after_select。

---

### act3_state_02_food_choice_after_select

对应 Figma：ACT3_01_FoodChoice_AfterSelect

元素：

- act3_s01_main_hotpotTable_shifted
- act3_s01_selectedFoods_inPot

运动：

- act3_s00_main_title 向右离开画面。
- act3_s01_main_hotpotTable 微微上移到过渡布局中的位置。
- 完成后自动进入 act3_state_03_cheers_frame_enter。

---

### act3_state_03_cheers_frame_enter

对应 Figma：ACT3_02_DrinkToast_Enter

元素：

- act3_s01_main_hotpotTable_shifted
- act3_s02_targetzone_cheers_entering
- act3_s02_target_emptyCup
- act3_s02_otherCup
- act3_s02_narration_3

运动：

- act3_s02_targetzone_cheers 从左上角为基点，向右等比例放大到目标位置。
- act3_s02_narration_3 浮现。
- 完成后自动进入 act3_state_04_drink_choice。

---

### act3_state_04_drink_choice

对应 Figma：ACT3_02_DrinkChoice

元素：

- act3_s01_main_hotpotTable_shifted
- act3_s02_targetzone_cheers
- act3_s02_target_emptyCup
- act3_s02_otherCup
- act3_s02_main_drinkTable
- act3_s02_drink_highAlcohol
- act3_s02_drink_lowAlcohol
- act3_s02_drink_softDrink
- act3_s02_drink_lemonWater
- act3_s02_narration_4
- act3_s02_hint_dragDrink

运动：

- act3_s02_main_drinkTable 从目标位置上方进入，到达右侧目标位置。
- act3_s02_narration_4 浮现。

交互：

- 玩家从饮品列表中拖动 1 个饮品到 act3_s02_target_emptyCup。
- target_emptyCup 只是拖拽目标，不增加风险标签。

风险规则：

- finalRiskTags = drink.riskTags。

记录规则：

- playerChoices 记录 drinkId、drinkName、targetId、targetName、riskTags、tendencyScores。

完成条件：

- 饮品拖入空杯后，Act 3 完成，进入下一幕占位画框。

---

## Figma 当前命名与开发标准命名映射

| Figma 当前名 | 开发标准名 |
|---|---|
| act3_s01_narration_1 | act3_s00_narration_1 |
| act3_s01_Targetzone_Cheers | act3_s02_targetzone_cheers |
| act3_s01_main_DrinkTable | act3_s02_main_drinkTable |
| act3_s01_narration_3 | act3_s02_narration_3 |
| act3_s01_food_DaiRouCuiGou | act3_s01_food_daiRouCuiGu |

开发时请使用“开发标准名”，不要使用 Figma 当前名作为最终代码 id。
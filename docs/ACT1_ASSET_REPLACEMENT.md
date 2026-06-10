# ACT1_ASSET_REPLACEMENT.md

## 1. Purpose

This document lists the Act1 art asset placeholders that can be replaced later.

Current behavior:

- If the image file exists, the page displays the image.
- If the image file is missing, the page falls back to the current low-fidelity rectangle placeholder.
- No game logic depends on these image files.

## 2. Breakfast Choice Assets

Put breakfast choice assets here:

```text
assets/images/act1/breakfast/
```

| Object | Expected file |
| --- | --- |
| Pizza background | `assets/images/act1/breakfast/overnight-pizza-bg.png` |
| Pizza food | `assets/images/act1/breakfast/overnight-pizza.png` |
| Baguette cheese background | `assets/images/act1/breakfast/baguette-cheese-bg.png` |
| Baguette cheese food | `assets/images/act1/breakfast/baguette-cheese.png` |
| Hot porridge background | `assets/images/act1/breakfast/hot-porridge-bg.png` |
| Hot porridge food | `assets/images/act1/breakfast/hot-porridge.png` |
| Egg ham sandwich background | `assets/images/act1/breakfast/egg-ham-sandwich-bg.png` |
| Egg ham sandwich food | `assets/images/act1/breakfast/egg-ham-sandwich.png` |
| Corn egg milk background | `assets/images/act1/breakfast/corn-egg-milk-bg.png` |
| Corn egg milk food | `assets/images/act1/breakfast/corn-egg-milk.png` |

## 3. Microwave Heat Assets

Put microwave scene assets here:

```text
assets/images/act1/microwave/
```

| Object | Expected file |
| --- | --- |
| Microwave frame | `assets/images/act1/microwave/microwave.png` |
| Plate | `assets/images/act1/microwave/plate.png` |

The selected food in the microwave scene is reused from the breakfast choice food asset.
For example, if the player selected `hot-porridge.png`, that same rendered food object is carried into the heat scene.

## 4. Breakfast Eating Assets

Put eating scene assets here:

```text
assets/images/act1/eating/
```

Scene assets:

| Object | Expected file |
| --- | --- |
| Full scene background | `assets/images/act1/eating/scene-bg.png` |
| Table | `assets/images/act1/eating/table.png` |
| Sky | `assets/images/act1/eating/sky.png` |
| Cloud | `assets/images/act1/eating/cloud.png` |
| Vase | `assets/images/act1/eating/vase.png` |
| Window setup | `assets/images/act1/eating/window.png` |
| Left bird | `assets/images/act1/eating/bird-left.png` |
| Right bird | `assets/images/act1/eating/bird-right.png` |
| Plate | `assets/images/act1/eating/plate.png` |

Food eating-state assets use this pattern:

```text
assets/images/act1/eating/{food-slug}-{state}.png
```

Food slugs:

```text
overnight-pizza
baguette-cheese
hot-porridge
egg-ham-sandwich
corn-egg-milk
```

States:

```text
1.png
2.png
3.png
4.png
5.png
```

Example:

```text
assets/images/act1/eating/hot-porridge-1.png
assets/images/act1/eating/hot-porridge-2.png
assets/images/act1/eating/hot-porridge-3.png
assets/images/act1/eating/hot-porridge-4.png
assets/images/act1/eating/hot-porridge-5.png
```

If an eating-state image is missing, the game keeps a low-fidelity rectangle placeholder and shows the current state number.

## 5. Replacement Rules

- Keep transparent PNGs if possible.
- Keep artwork cropped to the same visual bounds as the Figma object.
- Do not rename IDs in `data/layouts-act1.json`.
- Only replace files or update the `image` paths if filenames change.
- Do not change `playerChoices`, `riskTags`, Act3 drag/drop, or Result animation while replacing art.

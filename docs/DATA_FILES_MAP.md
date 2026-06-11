# DATA_FILES_MAP.md

## 1. Purpose

This document records the current purpose of files in the `data/` root directory.
It is a preparation note for later Act1, Act2, and real scoring table integration.

This document does not change runtime behavior.

## 2. Currently Running Data Files

The current running demo chain is:

```text
act0 -> act3 -> result demo
```

The following files are currently fetched by `game.js` and must stay in `data/`:

| File | Current purpose | Status |
| --- | --- | --- |
| `data/layouts-act0.json` | Act0 alarm intro layout and animation configuration. | Must keep |
| `data/act3-choices.json` | Act3 food, pot, drink, riskTags, and tendencyScores interaction data. | Must keep |
| `data/layouts-act3.json` | Act3 stage, states, object positions, image paths, intro bubbles, guidance bubbles, and decorative effect layout. | Must keep |
| `data/layouts-result.json` | Result transition, diet galaxy demo, and risk intro demo layout/configuration. | Must keep |

Do not move, rename, or rewrite these files while the current `act0 -> act3 -> result demo` chain is still the stable baseline.

## 3. Files That Look Like Old Data

The following files are not currently fetched by `game.js`.
They look like older prototype data or earlier planning files.

They should not be deleted immediately. If cleanup is needed later, move them to an archive only after confirming that no useful fields need to be migrated.

| File | Current note | Suggested handling |
| --- | --- | --- |
| `data/choices.json` | Likely old general choices table. | Review before archive |
| `data/personality-results.json` | Likely old personality result copy/table. | Review before archive |
| `data/ui-config.json` | Likely old UI configuration. | Review before archive |
| `data/food.json` | Likely old food data table. | Review before archive |
| `data/scenes.json` | Likely old scene definition table. | Review before archive |
| `data/acts.json` | Likely old act definition table. | Review before archive |
| `data/choice-values.json` | Likely old scoring/value table. | Review before archive |

## 4. Files Not Recommended For Archive Yet

The following files are also not currently fetched by `game.js`, but they may be useful for Act1, real risk scoring, or real persona calculation.

Do not archive these until their fields have been compared against the future data model.

| File | Reason to keep for now |
| --- | --- |
| `data/act1.json` | May contain Act1 breakfast references or early interaction data. |
| `data/risk.json` | May contain old or draft risk calculation content. |
| `data/risk-tags.json` | May become the shared source for real risk tag definitions. |
| `data/persona.json` | May contain persona dimensions, result types, or copy that can be migrated. |

## 5. Recommended Future Data Structure

For the next phase, avoid mixing Act1, Act2, Act3, and result scoring into one old shared file.

Recommended future files:

| File | Future purpose |
| --- | --- |
| `data/layouts-act1.json` | Act1 breakfast scene layout, object positions, image paths, bubbles, and decorative effect config. |
| `data/layouts-act2.json` | Act2 lunch scene layout, object positions, image paths, bubbles, and decorative effect config. |
| `data/choices-act1.json` | Act1 breakfast choices, choice recording fields, riskTags, and tendencyScores. |
| `data/choices-act2.json` | Act2 lunch choices, choice recording fields, riskTags, and tendencyScores. |
| `data/scoring-rules.json` | Real scoring rules that convert `playerChoices` into persona and risk outputs. |
| `data/persona-results.json` | Final persona result definitions, names, descriptions, and display copy. |

Act3 is already stable, so `data/act3-choices.json` should keep its current structure unless a separate migration plan is written.

## 6. Cleanup Principle

Recommended cleanup order:

1. Keep the currently running four data files unchanged.
2. Compare old files field by field before moving anything.
3. Create new Act1 and Act2 data files with clear names instead of extending old mixed files.
4. Add real scoring only through separate result helper logic later.
5. Move confirmed old files to `data/archive/` only after migration decisions are documented.

Do not delete data files directly.

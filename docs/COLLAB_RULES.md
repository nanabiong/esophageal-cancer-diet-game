# COLLAB_RULES.md

## 1. Goal

This document defines collaboration rules for Act1, Act2, Act3, and Result development.

The main rule is simple: small changes, clear ownership, no surprise rewrites.

## 2. Branch Rules

- Use one feature branch per small task.
- Branch names should describe the task, for example `feat/act1-microwave`, `feat/act2-lunch-layout`, or `docs/data-map`.
- Do not combine unrelated work in one branch.
- Pull or rebase from the latest main branch before opening a pull request.
- If a branch touches shared files such as `game.js` or `style.css`, keep the diff small and mention the module section touched.

## 3. Pull Request Rules

- Each pull request should describe what changed, what was not changed, and how to test it.
- Include screenshots or short screen recordings for visual interaction changes when possible.
- Do not include cleanup, formatting, or refactor changes unless the task is specifically cleanup/refactor.
- If a task changes data shape, document the player-facing and scoring-facing impact.

## 4. File Ownership

### Current Owner Area

Act1 owner should primarily work in:

- `data/layouts-act1.json`
- `data/choices-act1.json`
- Act1 Breakfast Module in `game.js`
- Act1 Breakfast Styles section in `style.css`

### Teammate Area

Act2 owner should primarily work in:

- `data/layouts-act2.json`
- `data/choices-act2.json`
- Act2 Lunch Module in `game.js`
- Act2 Lunch Styles section in `style.css`

### Shared Result / Scoring Area

Result and scoring work should primarily use:

- `data/scoring-rules.json`
- `data/persona-results.json`
- `data/layouts-result.json`
- Separate result helper/rendering code when it is added later

## 5. Forbidden Without Explicit Approval

Do not change these areas unless the task explicitly asks for it:

- `playerChoices` structure
- `riskTags` meaning or merge rules
- Act3 food drag/drop logic
- Act3 drink drag/drop logic
- Act3 result transition and Result animation behavior
- Act0 alarm click/ring/complete logic
- Existing Act3 stable data files

## 6. Shared File Rules

`game.js` and `style.css` are shared files, so they need extra care.

- Add Act1 code only inside the Act1 Breakfast Module unless a task says otherwise.
- Add Act2 code only inside the Act2 Lunch Module unless a task says otherwise.
- Add Act1 styles inside the Act1 Breakfast Styles section using `.act1-*` selectors.
- Add Act2 styles inside the Act2 Lunch Styles section using `.act2-*` selectors.
- Do not move existing functions just to organize the file.
- Do not rename existing classes or IDs unless the task is specifically a migration.

## 7. Data Rules

- Layout files control positions, sizes, visual placeholders, and animation parameters.
- Choice files control selectable options, labels, hover text, `riskTags`, and `tendencyScores`.
- Scoring rules should read from `playerChoices`; they should not infer choices from DOM nodes.
- Keep persona tendency scoring separate from medical risk tags.

## 8. Conflict Avoidance Checklist

Before starting:

- Confirm which module section you will touch.
- Check whether another branch is editing the same file.
- Keep the task small enough to review quickly.

Before committing:

- Check `git diff --name-only`.
- Confirm forbidden areas were not changed.
- Confirm JSON files still parse.
- Manually test the touched flow when possible.

Before merging:

- Resolve conflicts by preserving stable Act0, Act3, and Result behavior first.
- If conflict resolution requires behavior changes, pause and document the decision.

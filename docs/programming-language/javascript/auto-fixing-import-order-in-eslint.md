---
title: Import order with ESLint
aliases:
  - Auto-fixing Import Order in ESLint
---

# Auto-fixing Import Order in ESLint

The documentation of ESLint states that `sort-imports` rule is fixable. However, even with `--fix`
flag, ESLint does not auto-fix it. Since there is a chance that imports need to be in certain order
to prevent unexpected effects for the work. Some discussion can be found
[here](https://github.com/eslint/eslint/issues/11542)

Solution: use
[eslint-plugin-simple-import-sort](https://github.com/lydell/eslint-plugin-simple-import-sort/)

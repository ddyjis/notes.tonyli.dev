---
title: 'Fix "cannot find module" error'
aliases:
  - 'Fix jest "cannot find module" error'
---

# Fix "Cannot find module" Error

Add this to `jest` config

```json
"modulePaths": [
  "<rootDir>"
],
```

Source: https://github.com/jest-community/vscode-jest/issues/382#issuecomment-424083512

---
title: Running ESM in ts-node
aliases:
  - Running ESM in ts-node
---

In `package.json` set `"type": "module"`. This may break the project so remember to delete it when
running the project

```bash
node --loader ts-node/esm <path>
```

https://stackoverflow.com/a/66626333/7868804

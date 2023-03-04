---
title: Reimporting modules in shell
aliases:
  - Reimporting a Python Module in Interactive Shell
---

# Reimporting a Python Module in Interactive Shell

https://stackoverflow.com/a/1254379

```python
import foo

# Reload
import importlib
importlib.reload(foo)
```

For `from ... import ...`` type of import

```python
from foo import bar

# Reload
import importlib
import foo
importlib.reload(foo)
from foo import bar
```

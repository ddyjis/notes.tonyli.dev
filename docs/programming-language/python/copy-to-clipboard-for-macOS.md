---
title: Copy to Clipboard for macOS
aliases:
  - Copy to Clipboard for macOS
---

```python
import subprocess
data = "hello world"
subprocess.run("pbcopy", universal_newlines=True, input=data)
```

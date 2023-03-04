---
title: 0101 Symmetric Tree
aliases: 
  - 0101 Symmetric Tree
---

# 0101 Symmetric Tree

Given the `root` of a binary tree, *check whether it is a mirror of itself* (i.e., symmetric around its center).

```
     1
   /   \
  2     2
 / \   / \
3   4 4   3

Output: true
```

```
     1
   /   \
  2     2
   \     \
    3     3

Output: false
```

**My Attempts**

[[1677108890308|Depth First Search]]

```python
class Solution:
    def isSymmetric(self, root: Optional[TreeNode]) -> bool:
        
        def dfs(node1: Optional[TreeNode], node2: Optional[TreeNode]) -> bool:
            if not node1 and not node2: return True
            if node1 and not node2 or node2 and not node1 or node1.val != node2.val: return False
            return dfs(node1.left, node2.right) and dfs(node1.right, node2.left)
        
        return dfs(root.left, root.right)
```

```python
class Solution:
    def isSymmetric(self, root: Optional[TreeNode]) -> bool:
        
        queue = [root, root]
        while queue:
            node1 = queue.pop()
            node2 = queue.pop()
            if not node1 and not node2: continue
            if not node1 or not node2 or node1.val != node2.val: return False
            queue.append(node1.left)
            queue.append(node2.right)
            queue.append(node1.right)
            queue.append(node2.left)
        return True
```

https://leetcode.com/problems/symmetric-tree/

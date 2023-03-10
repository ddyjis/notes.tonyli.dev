---
title: 0014 Longest Common Prefix
aliases:
  - 0014 Longest Common Prefix
---

# 0014 Longest Common Prefix

Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string `""`.

**Example 1:**

**Input:** strs = ["flower","flow","flight"]

**Output:** "fl"

**Example 2:**

**Input:** strs = ["dog","racecar","car"]

**Output:** ""

**Explanation:** There is no common prefix among the input strings.

## My Attempts

```javascript
function longestCommonPrefix(strs: string[]): string {
  let prefix = strs.shift()
  strs.forEach((str) => {
    while (!str.startsWith(prefix)) {
      prefix = prefix.substring(0, prefix.length - 1)
    }
    if (!prefix) return ''
  })
  return prefix
}
```

https://leetcode.com/problems/longest-common-prefix/

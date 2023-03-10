---
title: 0022 Generate Paranthesis
aliases:
  - 0022 Generate Paranthesis
---

# 0022 Generate Paranthesis

Given `n` pairs of parentheses, write a function to _generate all combinations of well-formed
parentheses_.

**Example 1:**

**Input:** n = 3

**Output:** ["((()))","(()())","(())()","()(())","()()()"]

**Example 2:**

**Input:** n = 1

**Output:** ["()"]

**Constraints:**

- `1 <= n <= 8`

# My Attempts

```javascript
function generateParenthesis(n: number): string[] {
  const memo = {
    1: ['()'],
    2: ['()()', '(())'],
    3: ['((()))', '(()())', '(())()', '()(())', '()()()'],
  }

  const useMemo = (n: number, memo: Record<number, string[]>): string[] => {
    if (n in memo) return memo[n]

    const result: Set<string> = new Set()

    for (let i = 1; i < n; i++) {
      useMemo(i, memo).forEach((value1) => {
        useMemo(n - i, memo).forEach((value2) => {
          result.add(value1 + value2)
        })
      })
    }

    useMemo(n - 1, memo).forEach((value) => {
      result.add('(' + value + ')')
    })

    memo[n] = [...result.values()]

    return memo[n]
  }

  return useMemo(n, memo)
}
```

https://leetcode.com/problems/generate-parentheses/

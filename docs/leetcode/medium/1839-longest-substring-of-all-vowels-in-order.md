---
title: 1839 Longest Substring of All Vowels in Order
aliases:
  - 1839 Longest Substring of All Vowels in Order
---

# 1839 Longest Substring of All Vowels in Order

A string is considered **beautiful** if it satisfies the following conditions:

- Each of the 5 English vowels (`'a'`, `'e'`, `'i'`, `'o'`, `'u'`) must appear **at least once** in
  it.
- The letters must be sorted in **alphabetical order** (i.e. all `'a'`s before `'e'`s, all `'e'`s
  before `'i'`s, etc.).

For example, strings `"aeiou"` and `"aaaaaaeiiiioou"` are considered **beautiful**, but `"uaeio"`,
`"aeoiu"`, and `"aaaeeeooo"` are **not beautiful**.

Given a string `word` consisting of English vowels, return _the **length of the longest beautiful
substring** of_ `word`_. If no such substring exists, return_ `0`.

A **substring** is a contiguous sequence of characters in a string.

**Example 1:**

**Input:** word = "aeiaaioaaaaeiiiiouuuooaauuaeiu"

**Output:** 13

**Explanation:** The longest beautiful substring in word is "aaaaeiiiiouuu" of length 13.

**Example 2:**

**Input:** word = "aeeeiiiioooauuuaeiou"

**Output:** 5

**Explanation:** The longest beautiful substring in word is "aeiou" of length 5.

**Example 3:**

**Input:** word = "a"

**Output:** 0

**Explanation:** There is no beautiful substring, so return 0.

**Constraints:**

- `1 <= word.length <= 5 * 105`
- `word` consists of characters `'a'`, `'e'`, `'i'`, `'o'`, and `'u'`.

# My Attempts

```typescript
function longestBeautifulSubstring(word: string): number {
  let index = 0
  let result = 0
  let prev = 'a'
  const next_char = { a: 'e', e: 'i', i: 'o', o: 'u' }
  const length = word.length
  while (index < length && word[index] != 'a') index += 1
  let current = 0
  while (index < length) {
    if (word[index] == prev) {
      // same char
      current += 1
      index += 1
    } else if (!next_char[prev]) {
      // prev == u
      result = Math.max(result, current)
      current = 0
      prev = 'a'
    } else if (word[index] == next_char[prev]) {
      // next char
      prev = next_char[prev]
      current += 1
      index += 1
    } else {
      prev = 'a'
      current = 0
      while (index < length && word[index] != 'a') {
        index += 1
      }
    }
  }
  if (prev == 'u') result = Math.max(result, current)
  return result
}
```

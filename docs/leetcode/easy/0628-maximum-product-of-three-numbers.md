---
title: 0628 Maximum Product of Three Numbers
aliases:
  - 0628 Maximum Product of Three Numbers
---

# 0628 Maximum Product of Three Numbers

Given an integer array `nums`, _find three numbers whose product is maximum and return the maximum
product_.

**Example 1:**

**Input:** nums = [1,2,3]

**Output:** 6

**Example 2:**

**Input:** nums = [1,2,3,4]

**Output:** 24

**Example 3:**

**Input:** nums = [-1,-2,-3]

**Output:** -6

**Constraints:**

- `3 <= nums.length <= 104`
- `-1000 <= nums[i] <= 1000`

## My Attempts

```typescript
function maximumProduct(nums: number[]): number {
  nums.sort((a, b) => a - b)
  const length = nums.length
  const useTopThree = nums[length - 3] * nums[length - 2] * nums[length - 1]
  const useBottomTwo = nums[0] * nums[1] * nums[length - 1]
  return useTopThree > useBottomTwo ? useTopThree : useBottomTwo
}
```

- https://leetcode.com/problems/maximum-product-of-three-numbers/

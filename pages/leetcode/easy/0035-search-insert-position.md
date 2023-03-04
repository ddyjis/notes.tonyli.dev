---
title: 0035 Search Insert Position
aliases:
  - 0035 Search Insert Position
---

# 0035 Search Insert Position

Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with `O(log n)` runtime complexity.

**Example 1:**

**Input:** nums = [1,3,5,6], target = 5

**Output:** 2

**Example 2:**

**Input:** nums = [1,3,5,6], target = 2

**Output:** 1

**Example 3:**

**Input:** nums = [1,3,5,6], target = 7

**Output:** 4

**Example 4:**

**Input:** nums = [1,3,5,6], target = 0

**Output:** 0

**Example 5:**

**Input:** nums = [1], target = 0

**Output:** 0

## My Attempts

```python
def searchInsert(self, nums: List[int], target: int) -> int:
    if target < nums[0]: return 0
    if target > nums[-1]: return len(nums)
    l_bound = 0
    u_bound = len(nums) - 1
    while u_bound >= l_bound:
        index = (l_bound + u_bound) // 2
        if nums[index] == target:
            return index
        elif nums[index] < target:
            l_bound = index + 1
        else:
            u_bound = index - 1
    return l_bound
```

```typescript
function searchInsert(nums: number[], target: number): number {
    if (target > nums[nums.length - 1]) return nums.length
    if (target < nums[0]) return 0
    let lowerBound = 0
    let upperBound = nums.length - 1
    let index: number
    while (lowerBound <= upperBound) {
        index = Math.floor(0.5 * lowerBound + 0.5 * upperBound)
        if (nums[index] === target) return index
        if (nums[index] < target) lowerBound += 1
        if (nums[index] > target) upperBound -= 1
    }
    return lowerBound;
};
```

---
title: 1878 Get Biggest Three Rhombus Sums in a Grid
aliases:
  - 1878 Get Biggest Three Rhombus Sums in a Grid
---

# 1878 Get Biggest Three Rhombus Sums in a Grid

You are given an `m x n` integer matrix `grid`.

A **rhombus sum** is the sum of the elements that form **the** **border** of a regular rhombus shape
in `grid`. The rhombus must have the shape of a square rotated 45 degrees with each of the corners
centered in a grid cell. Below is an image of four valid rhombus shapes with the corresponding
colored cells that should be included in each **rhombus sum**:

![](https://assets.leetcode.com/uploads/2021/04/23/pc73-q4-desc-2.png)

Note that the rhombus can have an area of 0, which is depicted by the purple rhombus in the bottom
right corner.

Return _the biggest three **distinct rhombus sums** in the_ `grid` _in **descending order**. If
there are less than three distinct values, return all of them_.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/04/23/pc73-q4-ex1.png)

**Input:** grid = `[\[3,4,5,1,3],[3,3,4,2,3],[20,30,200,40,10],[1,5,5,4,1],[4,3,2,2,5]\]`

**Output:** `[228,216,211]`

**Explanation:** The rhombus shapes for the three biggest distinct rhombus sums are depicted above.

- Blue: `20` + `3` + `200` + `5` = `228`
- Red: `200` + `2` + `10` + `4` = `216`
- Green: `5` + `200` + `4` + `2` = `211`

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/04/23/pc73-q4-ex2.png)

**Input:** grid = `[[1,2,3],[4,5,6],[7,8,9]]`

**Output:** `[20,9,8]`

**Explanation:** The rhombus shapes for the three biggest distinct rhombus sums are depicted above.

- Blue: `4` + `2` + `6` + `8` = `20`
- Red: 9 (area 0 rhombus in the bottom right corner)
- Green: 8 (area 0 rhombus in the bottom middle)

**Example 3:**

**Input:** grid = `[\[7,7,7]\]`

**Output:** `[7]`

**Explanation:** All three possible rhombus sums are the same, so return `[7]`.

**Constraints:**

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 50`
- `1 <= grid[i][j] <= 105`

# My Attempts

```typescript
function getBiggestThree(grid: number[][]): number[] {
  const m = grid.length
  const n = grid[0].length

  const sums: Set<number> = new Set()

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // Construct all rhombus with top vertex at (i, j) and add the rhombus sum to sum.
      // For such rhombus, if it has length l, the 4 vertices will be at
      //   (i, j), (i + l - 1, j - l + 1), (i + l - 1, j + l - 1), (i + 2l - 2, j)
      //   Therefore, the maximum possible length of sides is subject to the constraint
      //     i + 2l - 2 <= m - 1     =>    l <= (m + 1 - i) / 2
      //     j - l + 1 >= 0          =>    l <= j + 1
      //     j + l - 1 <= n - 1      =>    l <= n - j
      const maxLength = Math.floor(Math.min(j + 1, (m + 1 - i) / 2, n - j))

      // Loop over all possible rhombus
      for (let l = 1; l <= maxLength; l++) {
        if (l === 1) {
          sums.add(grid[i][j])
        } else if (l === 2) {
          sums.add(grid[i][j] + grid[i + 1][j - 1] + grid[i + 1][j + 1] + grid[i + 2][j])
        } else {
          let currentSum =
            grid[i][j] +
            grid[i + l - 1][j - l + 1] +
            grid[i + l - 1][j + l - 1] +
            grid[i + l + l - 2][j]
          for (let d = 1; d < l - 1; d++) {
            currentSum +=
              grid[i + d][j - d] + // from top, lower left
              grid[i + d][j + d] + // from top, lower right
              grid[i + l + l - 2 - d][j - d] + // from bottom, upper left
              grid[i + l + l - 2 - d][j + d] // from bottom, upper right
          }
          sums.add(currentSum)
        }
      }
    }
  }
  return [...sums.values()].sort((a, b) => b - a).slice(0, 3)
}
```

- https://leetcode.com/problems/get-biggest-three-rhombus-sums-in-a-grid/

/**
 * Problem: 2280. Minimum Lines to Represent a Line Chart
 * Difficulty: Medium
 * Source: LeetCode — https://leetcode.com/problems/minimum-lines-to-represent-a-line-chart/
 *
 * Description:
 * You are given a 2D integer array stockPrices where stockPrices[i] = [day, price].
 * A line chart connects these points in order of day. Return the minimum number of
 * straight line segments needed to draw the complete chart.
 *
 * In other words: sort the points by day, then count how many times the slope changes
 * between consecutive segments. Each slope change means a new line segment is needed.
 *
 * Key Terms:
 * - Line Segment: A straight line connecting two adjacent points on the chart.
 *   Example: (1,7) to (2,6) is one segment.
 *
 * - Collinear Points: Three or more points that lie on the same straight line.
 *   If points A, B, C are collinear, segments AB and BC are part of the same line,
 *   so they count as 1 line, not 2.
 *   Example: (1,2), (2,4), (3,6) are collinear (all on y = 2x). Only 1 line needed.
 *
 * - Slope: The steepness of a line = (y2 - y1) / (x2 - x1).
 *   IMPORTANT: We avoid floating-point division by using cross-multiplication instead.
 *   Instead of checking dy1/dx1 == dy2/dx2, we check dy1 * dx2 == dy2 * dx1.
 *   This avoids precision errors (e.g., 1/3 cannot be represented exactly as a float).
 *
 * Examples:
 *
 * Example 1:
 * Input: stockPrices = [[1,7],[2,6],[3,5],[4,4],[5,4],[6,3],[7,2],[8,1]]
 * Output: 3
 * Explanation:
 *   Sorted by day: (1,7),(2,6),(3,5),(4,4),(5,4),(6,3),(7,2),(8,1)
 *   Slopes between consecutive points: -1, -1, -1, 0, -1, -1, -1
 *   Slope changes at index 3 (from -1 to 0) and index 4 (from 0 to -1).
 *   So we need 1 (initial) + 2 (changes) = 3 lines.
 *
 * Example 2:
 * Input: stockPrices = [[3,4],[1,2],[7,8],[2,3]]
 * Output: 1
 * Explanation:
 *   Sorted by day: (1,2),(2,3),(3,4),(7,8) — all on the line y = x + 1.
 *   Slope never changes → 1 line.
 *
 * Edge Cases:
 * - Only 1 point → 0 lines (no segment can be drawn).
 * - 2 points → exactly 1 line.
 * - All points collinear → 1 line.
 * - Every consecutive slope differs → n-1 lines.
 *
 * Approach: Sort + Cross-Multiplication Slope Comparison
 * 1. Sort points by day (x-coordinate).
 * 2. Start with 1 line (the first segment between point 0 and point 1).
 * 3. For each subsequent point (index 2 onward), compare the slope of the current
 *    segment with the previous segment using cross-multiplication.
 * 4. If slopes differ, increment the line count.
 *
 * Why cross-multiplication?
 *   Comparing dy1/dx1 == dy2/dx2 with floating-point is unreliable.
 *   Cross-multiplying gives us: dy1 * dx2 == dy2 * dx1 — pure integer math, no precision loss.
 *
 * Why BigInt?
 *   dy and dx can each be up to ~10^9. Their cross-product can reach ~10^18,
 *   which exceeds Number.MAX_SAFE_INTEGER (2^53 ≈ 9×10^15).
 *   BigInt guarantees exact integer arithmetic with no overflow.
 *
 * Time Complexity: O(n log n) — dominated by the sort. The single pass after is O(n).
 * Space Complexity: O(1) — sorting is in-place (ignoring sort's internal stack), and we
 *   only use a few variables for slope comparison.
 */

function minLines(stockPrices: number[][]): number {
  const numPoints = stockPrices.length;

  // With 0 or 1 points, no line segment can be drawn
  if (numPoints <= 1) return 0;

  // Sort by day (x-coordinate) so points are in chronological order
  stockPrices.sort((a, b) => a[0] - b[0]);

  // We always need at least 1 line to connect the first two points
  let lineCount = 1;

  // Compare slopes starting from the third point onward
  for (let i = 2; i < numPoints; i++) {
    // Previous segment: from point[i-2] to point[i-1]
    // Using BigInt to avoid overflow — products can reach ~10^18
    const prevDeltaY = BigInt(stockPrices[i - 1][1] - stockPrices[i - 2][1]);
    const prevDeltaX = BigInt(stockPrices[i - 1][0] - stockPrices[i - 2][0]);

    // Current segment: from point[i-1] to point[i]
    const currDeltaY = BigInt(stockPrices[i][1] - stockPrices[i - 1][1]);
    const currDeltaX = BigInt(stockPrices[i][0] - stockPrices[i - 1][0]);

    // Cross-multiply to compare slopes without division:
    // prevDeltaY / prevDeltaX  !=  currDeltaY / currDeltaX
    // becomes: prevDeltaY * currDeltaX  !=  currDeltaY * prevDeltaX
    if (prevDeltaY * currDeltaX !== currDeltaY * prevDeltaX) {
      lineCount++;
    }
  }

  return lineCount;
}

// --- Test Cases ---
console.log(minLines([[1, 7], [2, 6], [3, 5], [4, 4], [5, 4], [6, 3], [7, 2], [8, 1]])); // Expected: 3
console.log(minLines([[3, 4], [1, 2], [7, 8], [2, 3]])); // Expected: 1
console.log(minLines([[1, 1]]));                          // Expected: 0 (single point)
console.log(minLines([[1, 1], [2, 2]]));                  // Expected: 1 (two points)
console.log(minLines([[1, 1], [2, 5], [3, 2]]));          // Expected: 2 (every slope changes)

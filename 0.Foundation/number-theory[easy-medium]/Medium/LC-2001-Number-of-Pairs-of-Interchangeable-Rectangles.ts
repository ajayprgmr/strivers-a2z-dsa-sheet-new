/**
 * Problem: Number of Pairs of Interchangeable Rectangles
 * Difficulty: Medium
 * Source: LeetCode — https://leetcode.com/problems/number-of-pairs-of-interchangeable-rectangles/
 *
 * Description:
 * You are given `n` rectangles as a 2D array where rectangles[i] = [width, height].
 * Two rectangles are "interchangeable" if they have the **same width-to-height ratio**.
 * i.e., width_i / height_i === width_j / height_j (decimal division).
 *
 * Return the total number of **pairs** (i, j) where i < j that are interchangeable.
 *
 * Key Terms:
 * - Width-to-height ratio: The result of dividing width by height.
 *   Example: Rectangle [4, 8] has ratio 4/8 = 0.5
 * - Interchangeable pair: Two rectangles with the exact same ratio.
 *   Example: [4,8] and [3,6] → 4/8 = 0.5, 3/6 = 0.5 → interchangeable.
 * - Pairs (i < j): We count unordered pairs. If there are `c` rectangles with the same
 *   ratio, the number of pairs is c * (c - 1) / 2 (the "combination" formula C(c, 2)).
 *   Example: 4 rectangles with same ratio → 4 * 3 / 2 = 6 pairs.
 *
 * Examples:
 *
 * Example 1:
 *   Input: rectangles = [[4,8],[3,6],[10,20],[15,30]]
 *   Output: 6
 *   Explanation:
 *     Ratios: 4/8=0.5, 3/6=0.5, 10/20=0.5, 15/30=0.5
 *     All 4 rectangles share the same ratio.
 *     Number of pairs = C(4,2) = 4 * 3 / 2 = 6
 *     Pairs: (0,1), (0,2), (0,3), (1,2), (1,3), (2,3)
 *
 * Example 2:
 *   Input: rectangles = [[4,5],[7,8]]
 *   Output: 0
 *   Explanation:
 *     Ratios: 4/5=0.8, 7/8=0.875
 *     No two rectangles share the same ratio → 0 pairs.
 *
 * Edge Cases:
 * - All rectangles have the same ratio → C(n, 2) pairs.
 * - All rectangles have unique ratios → 0 pairs.
 * - n = 1 → No pairs possible, return 0.
 *
 * Constraints:
 * 1 <= n <= 10^5
 * 1 <= width, height <= 10^5
 *
 * ---
 *
 * Approach 1: Brute Force — Check Every Pair
 *
 * Compare every pair (i, j) and check if their ratios match.
 *
 * Time Complexity: O(n²) — nested loop over all pairs.
 * Space Complexity: O(1) — no extra storage.
 *
 * ⚠️ Too slow for n = 10^5 (10 billion operations).
 *
 * ---
 *
 * Approach 2: Optimized — HashMap with GCD-based Ratio Key
 *
 * Instead of comparing every pair, group rectangles by their ratio using a hash map.
 *
 * **Why not use decimal division as the key?**
 * Floating-point division can have precision issues. For example:
 *   1/3 = 0.33333... — two rectangles with the same true ratio might produce
 *   slightly different floating-point results.
 *
 * **Better approach — use a reduced fraction as the key:**
 * Divide both width and height by their GCD to get an irreducible fraction.
 *   [4, 8] → GCD(4,8) = 4 → "1/2"
 *   [3, 6] → GCD(3,6) = 3 → "1/2"
 * This gives an exact, string-based key with no floating-point issues.
 *
 * **Counting pairs efficiently:**
 * As we iterate, when we encounter a ratio that already has `count` rectangles in the map,
 * this new rectangle can form a pair with each of those `count` rectangles.
 * So we add `count` to our result, then increment the count.
 * This avoids needing C(n,2) at the end — we accumulate pairs on the fly.
 *
 * Time Complexity: O(n * log(max(w,h))) — iterating n rectangles, GCD takes O(log) per pair.
 * Space Complexity: O(n) — hash map stores up to n unique ratio keys.
 *
 * ---
 *
 * Approach 3: Optimized — HashMap with Decimal Ratio (Simpler but less safe)
 *
 * Use width/height as a decimal key directly. Works for this problem's constraints
 * since values are integers ≤ 10^5, but GCD approach is safer in general.
 *
 * Time Complexity: O(n) — single pass with O(1) per rectangle.
 * Space Complexity: O(n) — hash map stores up to n entries.
 */

// ============================================================
// Approach 1: Brute Force — Check Every Pair (O(n²))
// ============================================================
function interchangeableRectanglesBrute(rectangles: number[][]): number {
  let pairs = 0;
  const totalRectangles = rectangles.length;

  for (let i = 0; i < totalRectangles; i++) {
    for (let j = i + 1; j < totalRectangles; j++) {
      // Cross-multiply to avoid floating point: w1/h1 === w2/h2 ↔ w1*h2 === w2*h1
      const crossLeft = rectangles[i][0] * rectangles[j][1];
      const crossRight = rectangles[j][0] * rectangles[i][1];

      if (crossLeft === crossRight) {
        pairs++;
      }
    }
  }

  return pairs;
}

// ============================================================
// Helper: Greatest Common Divisor (Euclidean algorithm)
// ============================================================
function gcd(a: number, b: number): number {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// ============================================================
// Approach 2: Optimized — HashMap with GCD-based Ratio Key
// ============================================================
function interchangeableRectangles(rectangles: number[][]): number {
  // Map stores ratio (as reduced fraction string) → count of rectangles with that ratio
  const ratioCountMap = new Map<string, number>();
  let pairs = 0;

  for (const [width, height] of rectangles) {
    // Reduce the fraction to its simplest form using GCD
    const divisor = gcd(width, height);
    const reducedWidth = width / divisor;
    const reducedHeight = height / divisor;

    // Create a unique string key for this reduced ratio
    const ratioKey = `${reducedWidth}/${reducedHeight}`;

    // Every rectangle already in the map with this ratio forms a new pair
    const existingCount = ratioCountMap.get(ratioKey) || 0;
    pairs += existingCount;

    // Add current rectangle to the group
    ratioCountMap.set(ratioKey, existingCount + 1);
  }

  return pairs;
}

// ============================================================
// Testing
// ============================================================
console.log(interchangeableRectanglesBrute([[4, 8], [3, 6], [10, 20], [15, 30]])); // 6
console.log(interchangeableRectanglesBrute([[4, 5], [7, 8]]));                      // 0

console.log(interchangeableRectangles([[4, 8], [3, 6], [10, 20], [15, 30]]));       // 6
console.log(interchangeableRectangles([[4, 5], [7, 8]]));                            // 0

export {};

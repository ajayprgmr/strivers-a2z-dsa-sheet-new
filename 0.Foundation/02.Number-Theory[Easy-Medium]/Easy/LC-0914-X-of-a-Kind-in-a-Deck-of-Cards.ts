/*
  914. X of a Kind in a Deck of Cards (LeetCode - Easy)

  Given an integer array deck, partition cards into groups where:
  - Each group has exactly x cards (x > 1)
  - All cards in one group have the same integer
  Return true if such partition is possible.

  Example 1: deck = [1,2,3,4,4,3,2,1] → true  ([1,1],[2,2],[3,3],[4,4])
  Example 2: deck = [1,1,1,2,2,2,3,3] → false (no valid x)
*/

/*
  Approach: GCD of all frequencies
  TC: O(n * log(maxCount)) — n for counting, log(maxCount) for each GCD call
  SC: O(n) — frequency map

  Why GCD works:
  We need one x > 1 that divides ALL card counts evenly.
  GCD of all counts gives the largest such x.
  If GCD >= 2, at least one valid group size exists.

  Dry run:
  deck = [1,1,1,1,2,2,2,2,2,2]
  counts: {1:4, 2:6}
  GCD(4,6) = 2 → x=2 works → [1,1],[1,1],[2,2],[2,2],[2,2] → true

  deck = [1,1,1,2,2,2,3,3]
  counts: {1:3, 2:3, 3:2}
  GCD(3,3,2) = 1 → no x > 1 divides all → false
*/

function gcd(a: number, b: number): number {
    if (b === 0) return a;
    return gcd(b, a % b);
}

function hasGroupsSizeX(deck: number[]): boolean {
    const map = new Map<number, number>();
    for (const d of deck) {
        map.set(d, (map.get(d) || 0) + 1);
    }

    let result = 0;
    for (const count of map.values()) {
        result = gcd(result, count);
    }

    return result >= 2;
}

console.log(hasGroupsSizeX([1, 2, 3, 4, 4, 3, 2, 1]));       // true
console.log(hasGroupsSizeX([1, 1, 1, 2, 2, 2, 3, 3]));       // false
console.log(hasGroupsSizeX([1, 1, 1, 1, 2, 2, 2, 2, 2, 2])); // true
console.log(hasGroupsSizeX([1]));                               // false
console.log(hasGroupsSizeX([1, 1]));                            // true

export {};

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A personal collection of Data Structures & Algorithms solutions following
Striver's A2Z DSA Sheet. It is a study/practice repo, not an application: there
is no build output, no test framework, and no deployment. Each solution file is
a self-contained answer to one problem.

The repo is mid-migration from C++ to TypeScript. There are ~370 `.cpp` files
(the original solutions) and a growing set of `.ts` files that reimplement them.
New work is done in TypeScript; the git history shows solutions being converted
one at a time ("Convert X solution to TypeScript"). The `.cpp` files are kept as
reference and are not run by any tooling here.

## Running a solution

TypeScript files are executed with the repo's `./cli` script (requires
`npm install` first, which provides `tsc`):

```bash
npm install                 # once, installs the TypeScript compiler
./cli <file.ts> [args...]   # or: npm run cli -- <file.ts>
```

`./cli` accepts either a full path or a bare filename. With a bare filename it
`find`s a unique match anywhere in the tree and runs that; if the name matches
more than one file it lists them and exits, so pass the full path to
disambiguate. It compiles the single file with `tsc --target ES2020 --module
CommonJS` into `.ts-build/` (gitignored) and runs the result with `node`. Only
`.ts` files are supported — the `.cpp` files cannot be run through `cli`.

There is no lint step and no test runner. A solution is "tested" by the
`console.log` calls at the bottom of its own file, which print expected values
as inline comments.

## Directory layout

Top-level folders are numbered by topic in sheet order (`0.Foundation`,
`01.Arrays`, `02.Binary Search`, … `16. Strings (Hard)`). Within a topic,
solutions are grouped into difficulty subfolders — either `Easy` / `Medium` /
`Hard` or `1.Easy` / `2.Medium` / `3.Hard` depending on the topic. Some problems
live in their own leaf folder when they include multiple pattern variants.

File naming: LeetCode problems are prefixed `LC-<number>-<slug>.ts`; other
problems use a descriptive `snake_case` or `Numbered_Description.ts` name.

## Solution file conventions

Match the existing style when adding or converting a solution:

- Open with a comment block stating the **problem** (and, for LC problems, the
  number, title, difficulty, and a few examples).
- Follow with an **approach** comment. When multiple approaches exist, number
  them and give each its own labeled block.
- Annotate **time and space complexity** (`TC:` / `SC:`, or the
  `// TIME COMPLEXITY = O(N)` form seen in older files).
- End with `console.log(...)` test cases whose expected output is written as a
  trailing comment on the same line.
- Add `export {};` at the end so the file is treated as an ES module and its
  helper function names don't collide across the project during compilation.

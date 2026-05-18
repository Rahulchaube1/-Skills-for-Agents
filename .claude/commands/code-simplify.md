---
description: Simplify code for clarity and maintainability ΓÇö reduce complexity without changing behavior
---

Invoke the Skills for Agents:code-simplification skill.

Simplify recently changed code (or the specified scope) while preserving exact behavior:

1. Read CLAUDE.md and study project conventions
2. Identify the target code ΓÇö recent changes unless a broader scope is specified
3. Understand the code's purpose, callers, edge cases, and test coverage before touching it
4. Scan for simplification opportunities:
   - Deep nesting ΓåÆ guard clauses or extracted helpers
   - Long functions ΓåÆ split by responsibility
   - Nested ternaries ΓåÆ if/else or switch
   - Generic names ΓåÆ descriptive names
   - Duplicated logic ΓåÆ shared functions
   - Dead code ΓåÆ remove after confirming
5. Apply each simplification incrementally ΓÇö run tests after each change
6. Verify all tests pass, the build succeeds, and the diff is clean

If tests fail after a simplification, revert that change and reconsider. Use `code-review-and-quality` to review the result.


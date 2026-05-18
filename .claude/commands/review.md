---
description: Conduct a five-axis code review ΓÇö correctness, readability, architecture, security, performance
---

Invoke the Skills for Agents:code-review-and-quality skill.

Review the current changes (staged or recent commits) across all five axes:

1. **Correctness** ΓÇö Does it match the spec? Edge cases handled? Tests adequate?
2. **Readability** ΓÇö Clear names? Straightforward logic? Well-organized?
3. **Architecture** ΓÇö Follows existing patterns? Clean boundaries? Right abstraction level?
4. **Security** ΓÇö Input validated? Secrets safe? Auth checked? (Use security-and-hardening skill)
5. **Performance** ΓÇö No N+1 queries? No unbounded ops? (Use performance-optimization skill)

Categorize findings as Critical, Important, or Suggestion.
Output a structured review with specific file:line references and fix recommendations.


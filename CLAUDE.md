# Skills for Agents

This is the Skills for Agents project ΓÇö a collection of production-grade engineering skills for AI coding agents.

## Project Structure

```
skills/       ΓåÆ Core skills (SKILL.md per directory)
agents/       ΓåÆ Reusable agent personas (code-reviewer, test-engineer, security-auditor)
hooks/        ΓåÆ Session lifecycle hooks
.claude/commands/ ΓåÆ Slash commands (/spec, /plan, /build, /test, /review, /code-simplify, /ship)
references/   ΓåÆ Supplementary checklists (testing, performance, security, accessibility)
docs/         ΓåÆ Setup guides for different tools
```

## Skills by Phase

**Define:** interview-me, idea-refine, spec-driven-development
**Plan:** planning-and-task-breakdown
**Build:** incremental-implementation, test-driven-development, context-engineering, source-driven-development, doubt-driven-development, frontend-ui-engineering, api-and-interface-design
**Verify:** browser-testing-with-devtools, debugging-and-error-recovery
**Review:** code-review-and-quality, code-simplification, security-and-hardening, performance-optimization
**Ship:** git-workflow-and-versioning, ci-cd-and-automation, deprecation-and-migration, documentation-and-adrs, shipping-and-launch

## Conventions

- Every skill lives in `skills/<name>/SKILL.md`
- YAML frontmatter with `name` and `description` fields
- Description starts with what the skill does (third person), followed by trigger conditions ("Use when...")
- Every skill has: Overview, When to Use, Process, Common Rationalizations, Red Flags, Verification
- References are in `references/`, not inside skill directories
- Supporting files only created when content exceeds 100 lines

## Commands

- `npm test` ΓÇö Not applicable (this is a documentation project)
- Validate: Check that all SKILL.md files have valid YAML frontmatter with name and description

## Boundaries

- Always: Follow the skill-anatomy.md format for new skills
- Never: Add skills that are vague advice instead of actionable processes
- Never: Duplicate content between skills ΓÇö reference other skills instead


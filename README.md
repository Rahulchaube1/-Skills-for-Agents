# Skills for Agents

**Production-grade workflow commands, reusable skills, and specialist agents for AI coding assistants.**

Skills for Agents gives developers and coding agents a structured operating system for shipping reliable software: define clearly, plan well, build incrementally, verify deeply, review rigorously, and ship safely.

![Skills for Agents banner](./skillsforagent.png)

## Why Skills for Agents

- **Workflow-first, not prompt-first:** each skill is an actionable process with verification gates.
- **Developer-grade quality bar:** testing, security, performance, and release discipline are built in.
- **Agent-compatible by design:** works across Claude Code, Cursor, Gemini CLI, Windsurf, Copilot, and other agents.
- **Scales from simple tasks to production launches:** from quick fixes to multi-stage rollouts.

## What makes this different

Most AI agent repositories are collections of prompts or isolated instructions.

Skills for Agents is different:
- It maps directly to the software delivery lifecycle.
- It favors repeatable engineering workflows over one-off prompting tricks.
- It includes specialist agents and validation patterns, not just raw skill files.

## Lifecycle commands

These 7 slash commands map directly to the delivery lifecycle:

| Goal | Command | Principle |
|---|---|---|
| Define what to build | `/spec` | Spec before code |
| Plan execution | `/plan` | Small, verifiable tasks |
| Build safely | `/build` | Thin slices, fast feedback |
| Prove behavior | `/test` | Tests are evidence |
| Review quality | `/review` | Multi-axis quality gate |
| Simplify implementation | `/code-simplify` | Clarity over cleverness |
| Ship confidently | `/ship` | Safer, staged releases |

## Quick start

### Claude Code
Install the plugin and use the lifecycle commands and skills from the repository.

### Cursor
Use the skills and workflow patterns as structured guidance for planning, building, testing, and reviewing changes.

### Gemini CLI / Windsurf / Copilot
Apply the same lifecycle workflow and reusable skill structure across your preferred coding agent.

## Example workflow

A practical Skills for Agents flow looks like this:

1. Use `/spec` to define the change clearly.
2. Use `/plan` to break it into small implementation steps.
3. Use `/build` to ship in thin, reviewable slices.
4. Use `/test` to prove the behavior with evidence.
5. Use `/review` to check code quality, security, and maintainability.
6. Use `/ship` to prepare release notes, rollout, and recovery planning.

## Highlights

This repository currently includes:
- **64 production skills**
- **7 lifecycle commands**
- **3 specialist agents**
- Validation scripts and contribution guidance for extending the system

## Best skills to start with

If you are new to the repo, start here:

- `spec-driven-development`
- `planning-and-task-breakdown`
- `incremental-implementation`
- `test-driven-development`
- `code-review-and-quality`
- `security-and-hardening`
- `shipping-and-launch`

## All skills

The full catalog is available in [`skills/`](./skills) and [`skills/README.md`](./skills/README.md).

## Specialist agents

| Agent | Role |
|---|---|
| `code-reviewer` | Senior staff-level code review |
| `test-engineer` | QA and test strategy |
| `security-auditor` | Security analysis and hardening |

## Validation

Run the repository validation commands before submitting changes:

```bash
node scripts/validate-skills.js
claude plugin validate
```

## Contributing

Use [`docs/skill-anatomy.md`](./docs/skill-anatomy.md) for the skill format and [`CONTRIBUTING.md`](./CONTRIBUTING.md) for contribution rules.

## Changelog

- **v1.1.0** — Added specialist agents: `code-reviewer`, `test-engineer`, and `security-auditor`
- **v1.0.0** — Initial release with 64 core engineering skills

## License

MIT

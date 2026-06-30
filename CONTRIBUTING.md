# Contributing to e-Zanko

This document defines how we work together on this repository. Read it before opening your first PR. These rules exist so we can move fast without breaking each other's work — not to slow anyone down.

## Branching Strategy — GitHub Flow

We use **GitHub Flow** (no we don't). There is no `dev` branch. `main` is always deployable.

```
main                              → always stable, protected, no direct pushes
feature/EZK-12-universities-list  → one branch per Jira ticket
fix/EZK-34-pagination-bug         → for bug fixes
chore/EZK-40-update-deps           → for non-feature work (deps, config, tooling)
```

### Workflow

1. Pick a ticket from Jira.
2. Branch off the latest `main`:
   ```bash
   git checkout main
   git pull
   git checkout -b feature/EZK-12-universities-list
   ```
3. Work in small, focused commits.
4. Push your branch and open a PR into `main`.
5. Link the Jira ticket in the PR description.
6. Get at least 1 approval.
7. Merge. Delete the branch after merging.

Branches should be short-lived — a few days at most. If a ticket is taking longer than that, it's too big; split it.

## Commit Messages

We follow **Conventional Commits**.

```
feat: add university list page
fix: resolve pagination overflow on department table
chore: update tailwind config
refactor: extract letter card into shared component
docs: update README with setup instructions
```

Format: `type: short description, lowercase, present tense`.

Avoid commits like `wip`, `fix stuff`, `update`. If you can't describe the change in one short sentence, it's doing too much — split it into smaller commits.

## Pull Requests

- PRs must have a description: what it does, any decisions made, anything still incomplete.
- No self-merging. Someone else reviews and approves.
- Keep PRs small and focused on one ticket. Don't bundle unrelated changes.
- All review comments must be resolved before merging.

## Code Conventions

- Components: PascalCase (`UserCard.tsx`), file name matches component name.
- Layouts and all components should use default exports.
- No `any`. If a type is genuinely unknown, use `unknown` and narrow it, or ask in the team channel.
- API calls live in `src/api/`, never directly inside components.
- Shared components go in `src/components/common/`. Never manually create or edit files inside `src/components/ui/` — that folder is owned by Shadcn (`npx shadcn add <component>` only).
- Tailwind for styling. Avoid inline `style={{}}` unless a value is dynamic and Tailwind can't express it.

## Branch Naming Reference

| Prefix     | Use for                             |
| ---------- | ----------------------------------- |
| `feature/` | New functionality                   |
| `fix/`     | Bug fixes                           |
| `chore/`   | Tooling, config, dependency updates |
| `docs/`    | Documentation only changes          |

Always include the Jira ticket ID in the branch name, e.g. `feature/EZK-12-universities-list`.

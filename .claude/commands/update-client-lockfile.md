---
name: update-client-lockfile
description: Workflow command scaffold for update-client-lockfile in Chat-RPG-Application.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /update-client-lockfile

Use this workflow when working on **update-client-lockfile** in `Chat-RPG-Application`.

## Goal

Bumps or updates the client/package-lock.json file to a specific version for a dependency.

## Common Files

- `client/package-lock.json`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Edit client/package-lock.json to update a specific dependency version
- Commit changes with a message referencing the dependency and version

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.
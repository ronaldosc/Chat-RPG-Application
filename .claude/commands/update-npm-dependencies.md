---
name: update-npm-dependencies
description: Workflow command scaffold for update-npm-dependencies in Chat-RPG-Application.
allowed_tools: ["Bash", "Read", "Write", "Grep", "Glob"]
---

# /update-npm-dependencies

Use this workflow when working on **update-npm-dependencies** in `Chat-RPG-Application`.

## Goal

Updates npm dependencies to address vulnerabilities or keep packages up to date.

## Common Files

- `client/package.json`
- `client/package-lock.json`
- `server/package.json`
- `server/package-lock.json`

## Suggested Sequence

1. Understand the current state and failure mode before editing.
2. Make the smallest coherent change that satisfies the workflow goal.
3. Run the most relevant verification for touched files.
4. Summarize what changed and what still needs review.

## Typical Commit Signals

- Update package.json and/or package-lock.json files in client and/or server directories
- Commit changes with a message referencing the update or vulnerability
- Optionally document the update in README or reference file

## Notes

- Treat this as a scaffold, not a hard-coded script.
- Update the command if the workflow evolves materially.
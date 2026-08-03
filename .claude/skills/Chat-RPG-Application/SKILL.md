```markdown
# Chat-RPG-Application Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches you the core development patterns used in the Chat-RPG-Application TypeScript codebase. You'll learn about the project's coding conventions, how to manage dependencies, and how to follow established workflows for maintaining and updating the application. This guide is ideal for contributors who want to write consistent code and efficiently handle updates.

## Coding Conventions

### File Naming
- Use **camelCase** for file names.
  - Example: `chatEngine.ts`, `userProfile.ts`

### Import Style
- Use **relative imports** for referencing modules within the project.
  - Example:
    ```typescript
    import { getUser } from './userService';
    ```

### Export Style
- Use **named exports** rather than default exports.
  - Example:
    ```typescript
    // In userService.ts
    export function getUser(id: string) { ... }
    export function createUser(data: UserData) { ... }

    // In another file
    import { getUser, createUser } from './userService';
    ```

### Commit Patterns
- Commit messages are freeform, typically concise (~33 characters).
- No strict prefixing required.

## Workflows

### Update NPM Dependencies
**Trigger:** When you need to update or patch npm dependencies, often in response to security alerts or to keep packages up to date.  
**Command:** `/update-dependencies`

1. Update `package.json` and/or `package-lock.json` files in the `client` and/or `server` directories.
   - Example (using npm):
     ```bash
     cd client
     npm update
     cd ../server
     npm update
     ```
2. Commit your changes with a message referencing the update or vulnerability.
   - Example:
     ```
     chore: update lodash to 4.17.21 in client and server
     ```
3. Optionally, document the update in the README or a reference file.

**Files Involved:**
- `client/package.json`
- `client/package-lock.json`
- `server/package.json`
- `server/package-lock.json`

**Frequency:** ~2x/month

---

### Update Client Lockfile
**Trigger:** When you need to resolve or bump a specific dependency version in the client lockfile.  
**Command:** `/bump-client-lockfile`

1. Edit `client/package-lock.json` to update the specific dependency version.
   - Example (using npm):
     ```bash
     cd client
     npm install some-package@1.2.3
     ```
2. Commit your changes with a message referencing the dependency and version.
   - Example:
     ```
     fix: bump react to 18.2.0 in client lockfile
     ```

**Files Involved:**
- `client/package-lock.json`

**Frequency:** ~2x/month

---

## Testing Patterns

- **Test File Naming:** Test files use the `*.test.*` pattern (e.g., `chatEngine.test.ts`).
- **Testing Framework:** Not explicitly detected; check the codebase for setup details.
- **Test Example:**
  ```typescript
  // chatEngine.test.ts
  import { getUser } from './userService';

  test('getUser returns correct user', () => {
    const user = getUser('123');
    expect(user.id).toBe('123');
  });
  ```

## Commands

| Command                  | Purpose                                                      |
|--------------------------|--------------------------------------------------------------|
| /update-dependencies     | Update or patch npm dependencies in client/server            |
| /bump-client-lockfile    | Update a specific dependency version in client lockfile      |
```

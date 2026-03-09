# Gemini CLI Instructions

When opening a Pull Request, please use the following format for **BOTH the Title and the Description**:
- [scope] here text

## Versioning & Releases

Loom uses an **Automated Release System** based on Conventional Commits.

### Automated Releases
When pushing to the `main` branch, the system will automatically:
- Trigger a **Minor** release for commits starting with `feat:`.
- Trigger a **Patch** release for commits starting with `fix:`.

As the agent, you must:
1. Ensure your final merge/push to `main` uses the correct prefix (`feat:` or `fix:`) to trigger the desired release.
2. Remind the user if a `feat:` or `fix:` prefix is about to trigger an automated release.

### Manual Releases
The manual release workflow (`release.yml`) should be used for:
- **Major** version bumps.
- Overriding the automated logic.
- Triggering a release from the CLI: `gh workflow run release.yml -f version_bump=[patch|minor|major]`.

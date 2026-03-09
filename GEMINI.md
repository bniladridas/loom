# Gemini CLI Instructions

When opening a Pull Request, please use the following format for the description:
- [scope] here text

## Versioning & Releases

When a task involves significant changes or when the environment indicates a version bump is appropriate, you must:
1. Remind the user that a version bump/release is recommended.
2. Offer to trigger the release workflow directly from the CLI using `gh workflow run release.yml -f version_bump=[patch|minor|major]`.

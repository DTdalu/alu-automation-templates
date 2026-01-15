# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-15

### Added

- **Category-based organization**: Skills now organized under `templates/{category}/{skill}/`
  - `project-management/scrum-master`
  - `project-management/product-manager`
  - `project-management/session-log`

- **manifest.json**: Machine-readable skill discovery
  - Skill metadata (name, description, version, scope)
  - Placeholder definitions with examples
  - Reference file listings
  - Installation path configuration

- **session-log skill**: New skill for capturing session context
  - Git activity collection (commits, PRs, file changes)
  - Jira context for stand-ups
  - Integration with `/scrum-master` and `/product-manager`
  - Structured markdown output

- **Version tracking**: All skills now include frontmatter with:
  - `version`: Semantic version number
  - `author`: Skill author
  - `last-updated`: Date of last modification
  - `scope`: `project` or `user`
  - `category`: Skill category

- **Scope distinction**: Skills marked as either:
  - `project`: Installed to `.claude/skills/` (shared via git)
  - `user`: Installed to `~/.claude/skills/` (personal)

### Changed

- **skill-installer**: Updated to v1.1.0
  - Now reads from `manifest.json` for skill discovery
  - Handles both project and user scope installations
  - Improved placeholder validation

- **Directory structure**: Reorganized for scalability
  ```
  templates/
  └── project-management/
      ├── scrum-master/
      ├── product-manager/
      └── session-log/
  ```

### Deprecated

- Old flat structure (`templates/scrum-master/`, `templates/product-manager/`)
  - Will be removed in v2.0.0
  - Use new category-based paths instead

---

## [0.1.0] - 2026-01-09

### Added

- Initial release
- scrum-master skill template
- product-manager skill template
- skill-installer meta-skill
- Placeholder system (`{{CLOUD_ID}}`, `{{PROJECT_KEY}}`, `{{EPIC_KEY}}`)
- Jira integration patterns

---

## Release Process

1. Update version numbers in:
   - `manifest.json` (root `version` field)
   - Individual skill frontmatter (`version` field)
   - `skill-installer/SKILL.md` (`version` field)

2. Update this CHANGELOG with changes

3. Create GitHub release:
   ```bash
   git tag -a v1.0.0 -m "Release v1.0.0"
   git push origin v1.0.0
   ```

4. Create release notes on GitHub referencing this CHANGELOG

---

## Versioning Guide

- **MAJOR**: Breaking changes to skill structure or placeholders
- **MINOR**: New skills, new features, backwards-compatible
- **PATCH**: Bug fixes, documentation updates

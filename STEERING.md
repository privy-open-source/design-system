# Persona Design System — Steering Document

Purpose
- Define mission, scope, and governance for the Persona Design System.
- Provide clear guidance for contributors, maintainers, releases, and decision-making tailored to this monorepo (yarn workspaces) and Vitepress docs.

Mission
- Provide a consistent, accessible, and reusable UI component system and tooling for Persona products built with Vue 3 / Nuxt3, TypeScript, and Tailwind.
- Reduce UI duplication, accelerate product development, and keep design and accessibility standards consistent across consumer apps.

Scope
- In scope:
  - UI components and utilities in src/components and companion core/foundation modules.
  - Workspace packages under packages/* (shareable configs and presets such as @privyid/browserslist-config, @privyid/eslint-config-persona, persona-icon, persona-ilustration).
  - Design tokens, Tailwind preset, developer tooling, and the Vitepress-based docs site under src/.
- Out of scope:
  - Product-specific pages and feature business logic — those belong in product repositories.
  - Private/internal-only components (keep them in product repos).

Repository specifics (evidence)
- Monorepo/workspaces: root package.json uses Yarn workspaces with packages/* and scripts to prepare, build, and publish workspace packages.
- Docs: Vitepress site under src/ (commands: `yarn docs:dev`, `yarn docs:build`, `yarn docs:serve`).
- CI & automation: GitHub Actions workflows (CI) and renovate/renovate.json are present.
- Tests & quality: vitest (unit tests), vue-tsc (type checks), eslint (linting), husky (git hooks).
- Publishing: release scripts use `yarn workspaces foreach` and `npm publish` flows; some packages include publishConfig access: public.

Governance
- Maintainers: the maintainers are the privy-open-source organization/team and specific owners listed in CODEOWNERS. Maintainership and code ownership should be kept up-to-date in CODEOWNERS.
- Decision model:
  - Minor changes: merge with required reviewers per CONTRIBUTING.md and CODEOWNERS.
  - Significant API or design changes (breaking changes, or changes that affect many components): propose an RFC and document it under src/docs/rfcs (or docs/rfcs). RFCs should include motivation, migration plan, and at least majority approval from active maintainers.
- Communication: use repository Discussions or organization channels for proposals and coordination; link proposals to issues/PRs.

Contribution process
- Follow CONTRIBUTING.md.
- Typical flow: Issue → Discussion → PR with tests + docs (Vitepress examples) → Reviews.
- PR requirements:
  - Run unit tests: `yarn test` (vitest).
  - Type check: `yarn typecheck` (vue-tsc).
  - Lint: `yarn lint`.
  - Update docs under src/ (Vitepress) for new/changed components or API.
  - Add workspace package changelog entries where applicable (some packages include changelog helpers).
- Review policy:
  - Non-trivial changes: two approving reviews from maintainers (or one maintainer + one design lead).
  - Small/typo/docs fixes: one maintainer may approve.
- Branching: feature branches per PR; follow semantic branch naming (feature/, fix/, chore/, steering/).

Release & versioning
- Follow semver for published packages.
- Use existing scripts:
  - Prepare versions: `yarn release:prepare` (workspace versioning).
  - Publish: `yarn release` (workspaces foreach npm publish).
- Release cadence:
  - Regular minor releases for non-breaking features.
  - Patch releases for fixes.
  - Major releases only for breaking API changes and accompanied by migration notes in docs/ and changelog.

Quality & testing
- Unit tests: vitest + @testing-library/vue for component tests.
- Type checks: enforce `yarn typecheck` in CI.
- Linting: eslint config and shareable eslint-config-persona package; run `yarn lint`.
- Visual/regression testing: recommended for components that change appearance — add when feasible (not currently required by tooling in this repo).
- Accessibility: require accessible defaults and automated checks where possible. Recommend integrating axe or similar a11y checks into CI for interactive components.

Documentation
- Vitepress (src/) is the single source of truth for usage docs and examples.
- Examples and usage notes for components should live in the docs and reference story-like snippets for reproducibility.
- Maintain a human-readable CHANGELOG.md at the repo root or per package; keep release notes in GitHub Releases.

Security & vulnerability handling
- Use the repository's issue tracker or the org’s security policy for private vulnerability reports. If a SECURITY.md is not present, add one (link to org/security contact).
- Emergency patches: use release process but fast-track in CI and notify maintainers.

Dependencies & automation
- Dependabot/renovate rules are present (renovate.json). Keep dependency updates automated and reviewed.
- Keep Yarn 4 workspace settings in sync; root package.json lists `packageManager: "yarn@4.9.1"` — CI and maintainers must use compatible Yarn versions.

Onboarding & handoff
- New maintainers: read this STEERING file, CONTRIBUTING.md, CODEOWNERS, recent releases, and run local dev docs (`yarn docs:dev`).
- Pair with an existing maintainer for first merges.

Appendix
- Key files & locations:
  - src/ — Vitepress docs and documentation site.
  - src/components/ — Vue 3 components (main implementation).
  - packages/* — workspace packages (configs, presets, icons, illustrations).
  - package.json scripts: dev/docs/build/serve, test, typecheck, lint, release flows.
  - CODE_OF_CONDUCT.md, CONTRIBUTING.md, LICENSE present at repo root.
- Links to check:
  - CONTRIBUTING.md (root)
  - CODEOWNERS (root or .github)
  - .github/workflows/* (CI)

# Repository Guidelines

## Project Structure & Module Organization
This Next.js App Router project keeps routes, layouts, and page-level UI in `src/app`, shared building blocks in `src/components`, and reusable helpers in `src/lib`. Markdown and JSON content live in `src/content` and `src/app/data`. Static files sit under `public`, while global styling comes from `src/app/globals.css`. Core framework settings (`next.config.ts`, `tailwind.config.js`, `components.json`) remain at the repository root.

## Build, Test, and Development Commands
- `npm run dev` launches the local server with Turbopack hot reload.
- `npm run build` creates the optimized production bundle.
- `npm run start` serves the built output for smoke tests.
- `npm run lint` runs the Next.js ESLint suite. Resolve warnings before committing.

## Coding Style & Naming Conventions
Write TypeScript-first, functional React components with two-space indentation. Favor PascalCase for components and hooks, camelCase for utilities, and descriptive filenames (`ProfileCard.tsx`, `product.ts`). Tailwind classes should stay grouped by layout → spacing → color. Use configured aliases such as `@/components` and `@/lib` instead of long relative paths, and rely on ESLint for import ordering and accessibility checks.

## Testing Guidelines
Automated testing is not yet configured. When adding coverage, colocate files as `Component.test.tsx` alongside the implementation or mirror the `src` structure under `tests`. Document manual verification steps in your PR, and always run `npm run lint` plus an interactive browser check of affected routes before requesting review.

## Commit & Pull Request Guidelines
Commits follow the repository’s imperative tone (e.g., “Add navbar with link to articles”) and group related changes. PRs should summarize impact, link related issues, provide screenshots for UI tweaks, and note any outstanding risks. Rebase on the latest `main` and ensure local checks pass before assigning reviewers.

## Content & Asset Updates
Products, links, and similar marketing content live in JSON under `src/app/data`. Maintain stable keys, and compress images before placing them in `public`. When adding new assets or entries, confirm the consuming components handle missing fields gracefully and update copy so metadata stays accurate.

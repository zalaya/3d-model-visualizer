# Contributing

Thanks for taking the time. This is a small project and I'd like to keep it that way: simple, fast and easy to read.

By participating you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## Setup

```bash
bun install
bun run development
```

Before opening a PR:

```bash
bun run check
bun run build
```

`check` runs the type-check and ESLint.

## Where things go

```
source/
├── App.tsx            Composes features
├── features/<name>/   One folder per feature: components, hooks, helpers, constants, types
└── shared/            Only what more than one feature needs
```

- A feature exposes its public API through `index.ts`. Importing a feature's internals from outside is a lint error.
- Logic that doesn't need React goes in `helpers/` as plain functions.
- New behaviour goes in its own file instead of growing an existing one.
- No comments that restate the code, and `type` rather than `interface`.
- Icons come from `lucide-react`, styling from Tailwind, and the look stays minimal.

## Pull requests

- Keep them small and focused on one thing.
- Use the PR template. Specialised ones live in `.github/PULL_REQUEST_TEMPLATE/`; add `?template=feature.md` (or `bugfix.md`, `refactor.md`, `docs.md`) to the PR URL.
- UI changes need a screenshot or short recording.
- Try your change with a real model, not only the sample.

## Reporting bugs and ideas

Use the issue templates. For models that fail to load, the "Model doesn't load or looks wrong" template asks for the details that make it reproducible.

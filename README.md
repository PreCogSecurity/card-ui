# card-ui

A swipeable card UI demo built with React, TypeScript, and webpack. Cards show
profile data (name, age, prefecture, message, job, height) and can be accepted
("thanks") or rejected ("sorry"), which advances to the next card.

## Prerequisites

- Node.js >= 18 (see `.nvmrc`)

## Getting started

```sh
npm install
npm start
```

Then open http://localhost:3000 in your browser.

## Scripts

| Script              | Description                                              |
| ------------------- | -------------------------------------------------------- |
| `npm run build`     | Bundle `src/` into `dist/bundle.js` with webpack         |
| `npm start`         | Run the Express server (static files + `/api/comments`)  |
| `npm test`          | Run the Jest test suite with coverage                    |
| `npm run typecheck` | Run `tsc --noEmit`                                       |
| `npm run lint`      | Run ESLint over `src/`                                   |

## Architecture

- `src/index.tsx` — entry point; mounts `<Main />` into `#example`
- `src/components/Main.tsx` — top-level state (current card index, swipe direction)
- `src/components/CardList.tsx` — picks the front/next card from the data array
- `src/components/Card.tsx` — renders a single card
- `src/components/TnxBtn.tsx` / `src/components/SryBtn.tsx` — accept/reject buttons
- `src/data/sampleCards.ts` — sample card data and the `CardData` type
- `server.js` — Express server: static files plus the comments API

Data flows from `Main` (which owns the current `index` and swipe direction) down
to `CardList`, which resolves the front and next cards and passes their fields to
`Card`.

## API

- `GET /api/comments` — returns the stored comments
- `POST /api/comments` — body `{ "author": string, "text": string }`; appends a
  validated comment (both fields are required, non-empty strings; `author` is
  limited to 100 characters and `text` to 1000)

## Environment variables

See `.env.example`:

- `PORT` — port the Express server listens on (default `3000`)
- `COMMENTS_FILE` — path to the JSON file used to persist comments (default
  `./comments.json`)

## CI

`.github/workflows/ci.yml` runs typecheck, lint, tests, and the production build
on every push and pull request. Dependency updates are handled by Dependabot
(`.github/dependabot.yml`).